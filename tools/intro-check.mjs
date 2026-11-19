import assert from "node:assert/strict";
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { createRequire } from "node:module";
import { resolve } from "node:path";
import vm from "node:vm";

const root = new URL("../", import.meta.url);
const parse = (value) => JSON.parse(JSON.stringify(value));
function runPureChecks() {
  const source = readFileSync(new URL("src/intro.js", root), "utf8");
  const sandbox = {};
  vm.runInNewContext(source + "\nthis.introTests = { introTransition, introRoute };", sandbox);
  const { introTransition, introRoute } = sandbox.introTests;
  const initial = { stage: "cut", cuts: 0 };
  const one = introTransition(initial, "CUT");
  const two = introTransition(one, "CUT");
  assert.deepEqual(parse(one), { stage: "cut", cuts: 1 });
  assert.deepEqual(parse(two), { stage: "compare", cuts: 2 });
  assert.deepEqual(initial, { stage: "cut", cuts: 0 });
  assert.equal(introTransition(two, "CUT"), two, "third click does not advance");
  assert.deepEqual(parse(introTransition(two, "UNDO")), parse(one));
  assert.deepEqual(parse(introTransition(one, "UNDO")), initial);
  assert.equal(introTransition(initial, "UNDO"), initial);
  const fresh = { settings: {}, days: {}, recipes: {}, loaves: [], stats: { orders: 0 }, active: null };
  assert.equal(introRoute(fresh, false), "intro");
  assert.equal(introRoute(fresh, true), "title");
  for (const changed of [
    { settings: { introSeen: true } },
    { days: { d0: { passed: true } } },
    { recipes: { "4/2": { got: true } } },
    { loaves: [4] },
    { stats: { orders: 1 } },
  ]) assert.equal(introRoute({ ...fresh, ...changed }, false), "title");
  const audioPath = new URL("src/intro-audio.js", root);
  if (existsSync(audioPath)) {
    const engine = readFileSync(new URL("src/engine.js", root), "utf8");
    const audio = readFileSync(audioPath, "utf8");
    const context = {};
    vm.runInNewContext(engine.slice(0, engine.indexOf("const FLOW")) + "\n" + audio + "\nthis.plan = introPlan;", context);
    for (const n of [2,3]) {
      const plan = context.plan(n,60);
      assert.equal(plan.countIn,0);
      assert.equal(plan.total,1);
      assert.equal(plan.span,1);
      assert.equal(plan.beat,1);
      assert.deepEqual(parse(plan.ev.map((e)=>e.t)),Array.from({length:n},(_,i)=>i/n));
      assert.ok(plan.ev.every((e)=>e.type === "tone" && e.midi === 79 && e.t < 1));
    }
    console.log("Intro audio plan PASS · 2/3 onset lists, shared one-second end, no ending tone");
  }
  console.log("Intro pure checks PASS · transition cap, undo, history routing · separate from 51 core checks");
}

async function browserSuite() {
  const key = "sbg_save_v1";
  const original = localStorage.getItem(key);
  const frame = document.getElementById("frame");
  const status = document.getElementById("status");
  const output = document.getElementById("report");
  const report = [];
  let iteration = 0, win, doc, api;
  const failures = [];
  const check = (value, message) => { if (!value) throw new Error(message); };
  const out = (id, text) => { report.push({ id, result: "PASS", text }); output.textContent = report.map((r) => r.id + " · " + r.result + " · " + r.text).join("\n"); };
  const fresh = () => ({ version: 1, settings: { muted: true }, days: {}, recipes: {}, loaves: [], stats: { orders: 0, clean: 0, slices: 0, master: 0 }, active: null });
  const delay = () => new Promise((resolve) => requestAnimationFrame(resolve));
  function press(id) {
    const node = doc.querySelector(id);
    check(node && !node.disabled && node.getClientRects().length > 0, "Cannot activate " + id);
    node.click();
  }
  async function load({ saved = undefined, hash = "", width = 320, height = 568, blocked = false, audioFailed = false } = {}) {
    if (saved === null) localStorage.removeItem(key);
    else if (saved !== undefined) localStorage.setItem(key, JSON.stringify(saved));
    frame.width = width;
    frame.height = height;
    const url = new URL(blocked ? "./intro-blocked.html" : audioFailed ? "./intro-audio-failed.html" : "./index.html", location.href);
    url.searchParams.set("introTest", String(++iteration));
    url.hash = hash;
    await new Promise((resolve, reject) => {
      const timer = setTimeout(() => reject(new Error("Loading timed out")), 7000);
      const done = () => {
        if (frame.contentWindow.location.href !== url.href) return;
        clearTimeout(timer); frame.removeEventListener("load", done); resolve();
      };
      frame.addEventListener("load", done);
      frame.src = url.href;
    });
    win = frame.contentWindow; doc = win.document; api = win.__sbg;
    check(api, "Game API missing");
    win.addEventListener("error", (e) => failures.push(e.message));
    win.addEventListener("unhandledrejection", (e) => failures.push(String(e.reason)));
    const oldError = win.console.error;
    win.console.error = (...args) => { failures.push(args.join(" ")); oldError(...args); };
    await delay();
  }
  function state() { return api.state(); }
  function data() { return JSON.stringify([api.saved().days, api.saved().recipes, api.saved().loaves, api.saved().stats, api.saved().active]); }
  function core() { check(win.__tests.pass === 51 && win.__tests.written === 51, "51 core checks failed"); }
  function measureIntro() {
    const screen = doc.querySelector('[data-screen="intro"]');
    const rect = screen.getBoundingClientRect();
    check(rect.width <= win.innerWidth + 1, "Intro horizontal overflow");
    check(doc.documentElement.scrollWidth <= win.innerWidth + 1, "Page horizontal scroll");
    for (const button of [...screen.querySelectorAll("button")].filter((b) => b.getClientRects().length)) {
      const r = button.getBoundingClientRect();
      check(r.width >= 44 && r.height >= 44, "Intro button below 44px " + button.id);
      check(button.scrollWidth <= button.clientWidth + 1, "Button text clipped " + button.id);
    }
  }
  try {
    status.textContent = "맛보기 회귀 검사를 실행하고 있어요.";
    await load({ saved: null }); core();
    check(state().screen === "intro" && state().intro.cuts === 0, "New visitor intro routing");
    const untouched = data();
    check(doc.querySelector("#introUndo").disabled, "Undo at zero must disable");
    const firstTarget = doc.querySelector("#introBread").getBoundingClientRect();
    const touchPoint = {x:firstTarget.left+firstTarget.width/2,y:firstTarget.top+firstTarget.height/2};
    press("#introBread");
    check(state().intro.cuts === 1 && state().intro.stage === "cut", "First cut");
    press("#introBread");
    check(state().intro.cuts === 2 && state().intro.stage === "compare", "Second cut comparison");
    const thirdTarget = doc.elementFromPoint(touchPoint.x,touchPoint.y);
    check(!thirdTarget?.closest("#introNext,#introSkip,#introUndo,#introListen2,#introListen3"), "Third touch collides with a new action");
    thirdTarget?.closest("button")?.click();
    doc.querySelector("#introBread").click();
    check(state().screen === "intro" && state().intro.cuts === 2, "Third click cap");
    check(data() === untouched, "Intro changes progress");
    check(localStorage.getItem(key) === null, "Intro writes persisted progress");
    out("IN-01", "신규 무음 진입과 두 번 자르기, 진행 기록 보존");
    press("#introUndo");
    check(state().intro.cuts === 1 && state().intro.stage === "cut", "Undo compare to one cut");
    press("#introUndo");
    check(state().intro.cuts === 0 && doc.querySelector("#introUndo").disabled, "Undo to zero");
    out("IN-02", "연타 상한과 2→1→0 되돌리기");
    if (document.documentElement.dataset.audio === "true") {
      press("#introBread"); press("#introBread");
      check(typeof api.introPlayback === "function", "Intro playback inspection missing");
      if (doc.querySelector("#introMute").getAttribute("aria-pressed") !== "true") press("#introMute");
      press("#introListen2");
      const two = api.introPlayback();
      check(two?.active && two.n === 2 && two.clock === "visual", "Muted two-piece visual playback");
      press("#introListen3");
      const three = api.introPlayback();
      check(three?.active && three.n === 3 && three.token !== two.token, "Replacing intro playback");
      check(data() === untouched, "Playback changes progress");
      press("#introUndo");
      check(!api.introPlayback()?.active && api.introPlayback().groupSize === 0, "Undo leaves playback running");
      press("#introBread"); press("#introListen2");
      press("#introNext");
      check(!api.introPlayback()?.active, "Leaving intro leaves playback running");
      await load({saved:{...fresh(),settings:{muted:false}},audioFailed:true});
      press("#introBread"); press("#introBread"); press("#introListen2");
      check(api.introPlayback()?.active && api.introPlayback().clock === "visual", "Rejected audio fallback");
      Object.defineProperty(doc,"hidden",{configurable:true,get:()=>true});
      doc.dispatchEvent(new win.Event("visibilitychange"));
      check(!api.introPlayback().active && api.introPlayback().groupSize === 0, "Hidden page leaves playback running");
      delete doc.hidden;
      out("AU-01", "무음·오디오 거부 대체, 행 교체·되돌리기·나가기·숨김 이벤트의 재생 정리");
      await load({saved:null});
    }
    await load();
    check(state().screen === "intro" && state().intro.cuts === 0, "Refresh unfinished intro");
    press("#introSkip");
    check(state().screen === "shift" && api.orderAt(state()).id === "d0-01", "Skip to first regular order");
    check(api.saved().settings.introSeen && api.saved().settings.tutorialStep === 1, "Intro and legacy tutorial flags");
    check(api.saved().active?.index === 0, "First regular active");
    check(doc.querySelector("#pickOk").textContent.trim() === "이 빵 고르기" && doc.querySelector("#pickOk").disabled, "First-order CTA before selection");
    press('.srow[data-den="4"]'); press("#pickOk");
    check(state().sub === "listen" && !doc.querySelector("#next").disabled, "Listening gates next order");
    const completedFirst = JSON.parse(localStorage.getItem(key));
    check(completedFirst.stats.orders === 1 && completedFirst.active.index === 1, "Immediate first-delivery save");
    await load();
    check(state().screen === "title", "Saved active skips intro");
    press("#resume");
    check(api.orderAt(state()).id === "d0-02", "Resume at d0-02");
    out("REG-01", "정규 첫 납품 즉시 저장과 새로고침 후 d0-02 재개");
    const legacy = fresh(); delete legacy.settings.introSeen;
    legacy.active = { day: "d0", index: 1, results: [{recipe: 2, knife:0, ng:0}], cards:["4"] };
    await load({saved: legacy});
    check(state().screen === "title", "Legacy active bypass intro");
    press("#resume"); check(api.orderAt(state()).id === "d0-02", "Legacy resume order");
    const finished = fresh(); finished.days.d0 = {passed:true, stamp:1, runs:1, best:7};
    await load({saved:finished}); check(state().screen === "title", "Completed history bypasses intro");
    out("IN-03", "레거시 진행 및 완료 기록의 기존 화면 유지");
    for (const [hash, expected] of [["test","test"],["d3-02","shift"],["S2","shift"]]) {
      const previous = JSON.stringify(finished);
      await load({saved:finished,hash});
      if (hash === "test") check(doc.querySelector("#testReport").value.startsWith("자가검사 51/51"), "Hash tests");
      else check(state().screen === expected && state().dev, "Developer hash " + hash);
      check(localStorage.getItem(key) === previous, "Hash path mutates save " + hash);
    }
    out("IN-05", "자가검사·주문·발견 장면 해시의 기존 저장 경계");
    await load({saved:finished,hash:"d0-01"});
    check(doc.querySelector("#pickOk").textContent.trim() === "이 빵 고르기" && doc.querySelector("#pickOk").disabled, "First picking CTA");
    press('.srow[data-den="1"]'); press("#pickOk");
    check(state().sel === 1 && state().tries === 1 && state().assisted, "Wrong selection resets or changes scoring");
    check(doc.querySelector("#readout").textContent.includes("선반"), "Wrong selection next action");
    press('.srow[data-den="4"]'); press("#pickOk");
    check(state().phase === "deliver" && state().results[0].recipe === "half", "Corrected pick recipe");
    await load({saved:finished,hash:"d1-01"});
    check(doc.querySelector("#markOk").textContent.trim() === "두 조각으로 썰기", "First marking CTA");
    press("#markOk");
    check(state().cuts[0] === 0 && state().tries === 1 && state().assisted, "Wrong cut resets or changes scoring");
    check(doc.querySelector("#readout").textContent.includes("1조각") && doc.querySelector("#readout").textContent.includes("칼집"), "Cut error result and next action");
    press("#plus"); press("#markOk");
    check(state().phase === "slice" && state().cuts[0] === 1 && state().assisted, "Cut retry same order");
    press("#ship");
    check(state().phase === "deliver" && state().results[0].recipe === "half", "Cut scoring preserved");
    await load({saved:finished,hash:"d1-02"});
    check(doc.querySelector("#markOk").textContent.trim() === "확정", "Other order CTA restored");
    out("REG-UX3", "첫 두 CTA·오답 재시도·칼집/시도 횟수·도움 점수·다른 주문 문구 보존");
    for (const [width,height] of [[320,568],[360,640],[800,600]]) {
      await load({saved:null,width,height}); measureIntro();
      press("#introBread"); press("#introBread"); measureIntro();
      const rows = [...doc.querySelectorAll("#introLoaf2, #introLoaf3")].filter((node) => node.getClientRects().length);
      check(rows.length === 2, "Two comparison rows missing");
      check(Math.abs(rows[0].getBoundingClientRect().width - rows[1].getBoundingClientRect().width) < 1, "Comparison equal width");
      doc.documentElement.style.fontSize = "130%"; await delay(); measureIntro();
    }
    out("UI-01", "320·360·800px와 기본 글꼴 130%에서 버튼·수평 넘침 검사");
    await load({saved:null}); press("#introBread"); press("#introBread");
    press("#introNext");
    check(state().screen === "shift" && api.saved().active.index === 0, "Next enters regular once");
    doc.querySelector("#introNext").click();
    check(api.saved().active.index === 0 && api.saved().stats.orders === 0, "Repeated next does not deliver");
    out("IN-04", "완료 전 재시작과 다음 주문의 단발 진입");
    await load({saved:null,blocked:true});
    check(state().screen === "intro", "Blocked storage intro");
    press("#introBread"); press("#introBread"); press("#introNext");
    check(state().screen === "shift" && api.saved().active.index === 0, "Memory-only progress");
    out("REG-03", "저장소 거부에서도 맛보기와 정규 진입");
    check(failures.length === 0, "Console errors " + failures.join(" / "));
    status.textContent = "완료 · 새 UX 검사 " + report.length + "개 · 실패 0 · 기존 51/51 별도";
    window.__introResults = {passed:report.length,failed:0,report};
  } catch (error) {
    output.textContent += "\nFAIL · " + (error.stack || error);
    status.textContent = "맛보기 검사 실패";
    window.__introResults = {passed:report.length,failed:1,report,error:String(error)};
  } finally {
    frame.remove();
    if (original === null) localStorage.removeItem(key); else localStorage.setItem(key,original);
  }
}

function harnessHtml() {
  return '<!doctype html><html lang="ko" data-audio="' + existsSync(new URL("src/intro-audio.js",root)) + '"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>맛보기 UX 검사</title><style>body{font:16px/1.6 system-ui;margin:20px}pre{white-space:pre-wrap}iframe{position:absolute;left:-10000px;top:0;border:0;opacity:0}</style><h1>맛보기 UX 검사</h1><p id="status" role="status">준비 중</p><pre id="report"></pre><iframe id="frame" width="320" height="568" title="맛보기 시험"></iframe><script>(' + browserSuite.toString() + ')();<\/script></html>';
}

const mode = process.argv[2];
if (mode === "--prepare-browser" || mode === "--emit-page") {
  const destination = resolve(process.argv[3] || "../qa-preview/dist");
  writeFileSync(resolve(destination,"intro-check.html"), harnessHtml());
  const html = readFileSync(new URL("index.html",root),"utf8");
  writeFileSync(resolve(destination,"intro-blocked.html"), html.replace('<script id="main">', '<script>Object.defineProperty(window,"localStorage",{get(){throw new Error("storage blocked for UX test")}});<\/script><script id="main">'));
  writeFileSync(resolve(destination,"intro-audio-failed.html"), html.replace('<script id="main">', '<script>window.AudioContext=window.webkitAudioContext=function(){throw new Error("audio denied for UX test")};<\/script><script id="main">'));
  console.log("Prepared browser harness at " + destination);
} else {
  runPureChecks();
  if (mode !== "--unit") {
    const require = createRequire(import.meta.url);
    let playwright;
    try { playwright=require("playwright"); }
    catch(error) { if(!process.env.CODEX_PRIMARY_RUNTIME_NODE_MODULES)throw error; playwright=require(resolve(process.env.CODEX_PRIMARY_RUNTIME_NODE_MODULES,"playwright")); }
    const browser = await playwright.chromium.launch(process.env.CHROME ? {executablePath:process.env.CHROME}:{});
    try {
      const context = await browser.newContext();
      const page = await context.newPage();
      const html = readFileSync(new URL("index.html",root),"utf8");
      await context.route("https://intro-qa.invalid/**",route=>{
        const name=new URL(route.request().url()).pathname;
        let body=name==="/intro-check.html"?harnessHtml():html;
        if(name==="/intro-audio-failed.html") body=html.replace('<script id="main">','<script>window.AudioContext=window.webkitAudioContext=function(){throw new Error("audio denied")};<\/script><script id="main">');
        if(name==="/intro-blocked.html") body=html.replace('<script id="main">','<script>Object.defineProperty(window,"localStorage",{get(){throw new Error("blocked")}});<\/script><script id="main">');
        return route.fulfill({status:200,contentType:"text/html",body});
      });
      await page.goto("https://intro-qa.invalid/intro-check.html");
      await page.waitForFunction(()=>window.__introResults,{},{timeout:60000});
      const result=await page.evaluate(()=>window.__introResults);
      console.log(JSON.stringify(result,null,2));
      assert.equal(result.failed,0,result.error);
    } finally { await browser.close(); }
  }
}
