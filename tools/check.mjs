// 자동 화면 점검(선택). 쓰는 법: node tools/check.mjs [index.html 경로]
// 준비: npm i -D playwright && npx playwright install chromium  (설치된 크롬을 쓰려면 CHROME=/경로/chrome)
// 하는 일: ① 자가검사 한 줄 ② 화면 7종에서 주문·단계마다 스크롤, 잘림, 글자, 단추 재기 ③ 콘솔 오류와 외부 요청 세기
import { createRequire } from "node:module";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
const require = createRequire(import.meta.url);
let playwright;
try {
  playwright = require("playwright");
} catch (error) {
  if (!process.env.CODEX_PRIMARY_RUNTIME_NODE_MODULES) throw error;
  playwright = require(resolve(process.env.CODEX_PRIMARY_RUNTIME_NODE_MODULES, "playwright"));
}
const { chromium } = playwright;
const URL = pathToFileURL(process.argv[2] || "index.html").href;
const VIEWPORTS = [[320, 568], [360, 600], [360, 640], [390, 664], [390, 844], [430, 932], [800, 600]];
const WALK = [                                 // [바로가기, 차례로 할 일]. m:이름 = 그 자리에서 잰다
  ["d0-01", ["m:빈 도마", "pick:1", "ok", "m:고르기 오답", "pick:4", "ok", "m:납품"]],
  ["d0-04", ["m:이름으로 묻기", "pick:4", "m:올림"]],
  ["d0-05", ["m:이어 붙이기", "pick:1", "m:견주기", "pick:2", "ok", "m:납품"]],
  ["d0-07", ["pick:8", "ok", "m:유령 빵", "pick:1", "m:온음표와 유령 빵"]],
  ["d1-01", ["cut:2", "mark", "m:재단 오답", "tap:#minus", "mark", "m:썰기", "ship", "m:납품"]],
  ["d1-03", ["cut:1", "mark", "ship", "m:온음표 납품"]],
  ["d1-04", ["cut:6", "m:칼집 6", "mark", "mark", "mark", "m:썰기 16조각", "ship", "m:납품"]],
  ["d1-06", ["cut:1", "mark", "m:8분음표 덩이 썰기"]],
  ["d2-02", ["cut:2", "m:틀", "mark", "m:숫자 질문", "tap:#no", "m:질문 오답", "tap:#yes", "m:썰기", "ship", "m:납품"]],
  ["d3-02", ["cut:2", "mark", "m:보기", "wrong", "m:유령 빵 하나", "wrong", "m:유령 빵 둘", "right", "m:썰기", "ship", "m:납품"]],
  ["d3-03", ["cut:2", "mark", "wrong", "m:유령 빵 하나", "wrong", "m:유령 빵 둘"]],
  ["d3-04", ["cut:2", "mark", "wrong", "m:유령 빵 하나", "wrong", "m:유령 빵 둘"]],
  ["d3-05", ["cut:3", "mark", "wrong", "m:유령 빵 하나", "wrong", "m:유령 빵 둘"]],
  ["d4-05", ["m:연속", "loaf:0", "loaf:1", "loaf:1", "loaf:2", "loaf:2", "loaf:2", "loaf:3", "m:재단", "mark", "m:연속 오답", "loaf:3", "mark", "m:썰기", "ship", "m:납품"]],
  ["d5-02", ["m:악보", "pick:4", "ok", "m:유령 빵", "pick:1", "m:온음표와 유령 빵", "pick:2", "ok", "cut:2", "m:재단", "mark", "ship", "m:납품"]],
  ["d5-04", ["pick:8", "ok", "m:유령 빵 4박"]], ["d5-08", ["pick:4", "ok", "m:소리 주문 유령 빵"]],
  ["S1", ["m:발견 장면"]], ["S2", ["m:발견 장면"]], ["S3", ["m:발견 장면"]], ["S4", ["m:발견 장면"]], ["d3-08", ["m:주문 8개의 HUD"]],
];
const MEASURE = () => {
  const app = document.getElementById("app"), de = document.documentElement, vis = (e) => { const r = e.getBoundingClientRect(); return r.width > 0 && r.height > 0; };
  const fonts = [], tw = document.createTreeWalker(app, NodeFilter.SHOW_TEXT);
  for (let n = tw.nextNode(); n; n = tw.nextNode()) { const p = n.parentElement; if (n.textContent.trim() && p && vis(p)) fonts.push(parseFloat(getComputedStyle(p).fontSize)); }
  const buttons = [...app.querySelectorAll("button")].filter((b) => vis(b) && !b.disabled && !b.classList.contains("loaf")).map((b) => {
    const r = b.getBoundingClientRect();
    const size = Math.round(Math.min(r.width, r.height));
    const shelfException = innerHeight < 620 && b.matches(".srow");
    return { size, small: size < (shelfException ? 38 : 44), name: b.id || b.className };
  });
  const board = document.getElementById("board"), fit = (sel) => [...document.querySelectorAll(sel)].every((e) => !e.textContent || e.scrollWidth <= e.clientWidth + 1), h = (id) => Math.round(document.getElementById(id).getBoundingClientRect().height);
  const order = document.getElementById("order"), hud = document.getElementById("hud");
  const clipping = { board: board.scrollHeight - board.clientHeight, order: order.scrollHeight - order.clientHeight, hud: hud.scrollWidth - hud.clientWidth };
  return { scroll: Math.max(de.scrollWidth - innerWidth, de.scrollHeight - innerHeight), clip: Math.max(...Object.values(clipping)), clipping,
    font: fonts.length ? Math.min(...fonts) : 99, btn: buttons.length ? Math.min(...buttons.map((b) => b.size)) : 99, small: buttons.filter((b) => b.small).map((b) => b.name),
    fit: fit("#board .slice") && fit(".mold span") && fit(".cap") && fit(".ghost") && fit(".srow .nm") && fit(".lab span"), board: h("board"), controls: h("controls") };
};
const browser = await chromium.launch(process.env.CHROME ? { executablePath: process.env.CHROME } : {});
const errors = [], requests = [];
let failed = false;
{ // ① 자가검사
  const page = await browser.newPage();
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto(URL + "#test");
  const t = await page.evaluate(() => (window.__tests ? { line: window.__tests.line, bad: window.__tests.rows.filter((r) => !r.ok).map((r) => "실패 " + r.id + " " + r.name + ": " + r.note) } : null));
  console.log(t ? t.line : "자가검사를 찾지 못했다(window.__tests 없음)");
  if (!t || !t.line.startsWith("자가검사 51/51") || t.bad.length) { failed = true; (t ? t.bad : []).forEach((x) => console.log("  " + x)); }
  await page.close();
}
for (const [w, h] of VIEWPORTS) { // ② 배치
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 2, hasTouch: true, isMobile: w < 700 }), page = await ctx.newPage();
  page.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("request", (r) => { if (!/^(file:|about:|data:)/.test(r.url())) requests.push(r.url()); });
  const rows = [], actionErrors = [];
  for (const [hash, steps] of WALK) {
    await page.goto("about:blank");
    await page.goto(URL + "#" + hash);
    if (!(await page.evaluate(() => !!window.__sbg && window.__sbg.state().screen === "shift"))) { rows.push({ at: hash, skip: true }); continue; }
    for (const s of steps) {
      const [k, v] = s.split(/:(.*)/);
      if (k === "m") { rows.push(Object.assign(await page.evaluate(MEASURE), { at: hash + " " + v })); continue; }
      const sel = k === "pick" ? `.srow[data-den="${v}"]` : k === "ok" ? "#pickOk" : k === "mark" ? "#markOk" : k === "ship" ? "#ship" : k === "loaf" ? `button.loaf[data-q="${v}"]` : k === "tap" ? v : k === "cut" ? "#plus" : "#lab" + (await page.evaluate((want) => { const K = window.__sbg, o = K.orderAt(K.state()), T = K.labelBeats({ den: o.loaf, count: 1, tup: 0 }); const c = K.choicesOf(o).map((l, i) => ({ i, ok: K.labelBeats(l).n * T.d === T.n * K.labelBeats(l).d, off: document.getElementById("lab" + i).disabled })); return (c.find((x) => x.ok === want && !x.off) || { i: 0 }).i; }, k === "right"));
      try {
        for (let i = 0; i < (k === "cut" ? +v : 1); i++) await page.tap(sel, { timeout: 2000 });
      } catch {
        actionErrors.push(hash + " " + s + " (" + sel + ")");
        break;
      }
    }
  }
  const got = rows.filter((r) => !r.skip), bad = got.filter((r) => r.scroll > 0 || r.clip > 0 || r.font < 12 || r.small.length || !r.fit || r.controls !== 94);
  console.log(`${w}×${h}: 잰 곳 ${got.length} · 문제 ${bad.length} · 도마 ${Math.min(...got.map((r) => r.board))}~${Math.max(...got.map((r) => r.board))}px · 가장 작은 글자 ${Math.min(...got.map((r) => r.font))}px · 가장 작은 단추 ${Math.min(...got.map((r) => r.btn))}px` + (rows.length > got.length ? ` · 건너뜀 ${rows.length - got.length}` : ""));
  bad.forEach((r) => console.log("  ✗ " + r.at + " " + JSON.stringify({ 스크롤: r.scroll, 잘림: r.clipping, 글자: r.font, 단추: r.btn, 작은단추: r.small, 글자넘침: !r.fit, 조작부: r.controls })));
  actionErrors.forEach((detail) => console.log("  ✗ 조작 실패 " + detail));
  if (bad.length || got.length !== 51 || actionErrors.length) failed = true;
  await ctx.close();
}
console.log(`콘솔 오류 ${errors.length}건 · 외부 요청 ${requests.length}건`); // ③
[...new Set(errors)].slice(0, 5).forEach((e) => console.log("  " + e));
[...new Set(requests)].slice(0, 5).forEach((e) => console.log("  " + e));
await browser.close();
process.exit(failed || errors.length || requests.length ? 1 : 0);
