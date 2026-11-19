import assert from "node:assert/strict";
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
const url = pathToFileURL(process.argv[2] || "index.html").href;
const browser = await chromium.launch(process.env.CHROME ? { executablePath: process.env.CHROME } : {});
const checks = [];

async function activate(page, target, mode) {
  const control = typeof target === "string" ? page.locator(target) : target;
  if (mode === "tap") {
    await control.tap({ timeout: 3500 });
    return;
  }
  for (let attempts = 0; attempts < 32; attempts++) {
    if (await control.evaluate((node) => node === document.activeElement)) {
      await page.keyboard.press("Enter");
      return;
    }
    await page.keyboard.press("Tab");
  }
  throw new Error("Tab 순서에서 접근할 수 없는 조작 " + target);
}

async function readGame(page) {
  return page.evaluate(() => {
    const app = window.__sbg;
    const s = app.state();
    const o = app.orderAt(s);
    const wanted = app.labelBeats({ den: o.loaf, count: 1, tup: 0 });
    const index = app.choicesOf(o).findIndex((option) => {
      const actual = app.labelBeats(option);
      return actual.n * wanted.d === wanted.n * actual.d;
    });
    return { screen: s.screen, phase: s.phase, idx: s.idx, order: o.id, loaf: o.loaf, ns: o.ns, label: o.label, index, sum: s.sum, sub: s.sub };
  });
}

async function playAll(mode) {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, hasTouch: mode === "tap", isMobile: mode === "tap" });
  try {
    const page = await context.newPage();
    const errors = [];
    page.on("console", (message) => { if (message.type() === "error") errors.push(message.text()); });
    page.on("pageerror", (error) => errors.push(error.message));
    await page.goto(url);
    const press = (target) => activate(page, target, mode);
    if ((await readGame(page)).screen === "intro") {
      await press("#introSkip");
      await press("#openSet");
      await press("#quit");
    } else {
      await press("#start");
    }
    assert.equal(await page.locator('#days [data-day="d1"]').isDisabled(), true, "다음 단은 처음에는 잠겨 있다");
    const days = [];
    const discoveries = [];
    let deliveries = 0;
    for (let day = 0; day <= 5; day++) {
      await press(`#days [data-day="d${day}"]`);
      if ((await readGame(page)).screen === "sound") await press(page.getByRole("button", { name: "들려요", exact: true }));
      for (let limit = 0; limit < 50; limit++) {
        const game = await readGame(page);
        if (game.screen === "close") {
          assert.equal(game.sum?.passed, true, "영업일 통과");
          assert.equal(game.sum.clean, game.sum.n, "모든 레시피를 첫 시도에 완료");
          days.push(game.sum.clean);
          await press("#toTitle");
          break;
        }
        assert.equal(game.screen, "shift", `영업 화면 · ${JSON.stringify(game)}`);
        switch (game.phase) {
          case "scene":
            discoveries.push(game.order);
            await press("#sceneOk");
            break;
          case "pick":
            await press(`.srow[data-den="${game.loaf}"]`);
            await press("#pickOk");
            break;
          case "mark":
            for (const [q, n] of game.ns.entries()) {
              for (let cut = 1; cut < n; cut++) await press(game.ns.length === 1 ? "#plus" : `button.loaf[data-q="${q}"]`);
            }
            await press("#markOk");
            break;
          case "label":
            await press(game.label === "yesno" ? (game.ns[0] === 3 ? "#yes" : "#no") : `#lab${game.index}`);
            break;
          case "slice":
            await press("#ship");
            break;
          case "deliver":
            deliveries++;
            if (day === 0 && game.idx === 0) {
              await page.reload();
              await press("#resume");
              const next = await readGame(page);
              assert.equal(next.order, "d0-02", "새로 고친 뒤 둘째 주문을 이어서 연다");
            } else {
              await press("#next");
            }
            break;
          default:
            throw new Error("알 수 없는 단계 " + game.phase);
        }
      }
    }
    assert.deepEqual(days, [7, 7, 7, 8, 6, 8]);
    assert.deepEqual(discoveries, ["d1-05", "d2-01", "d2-04", "d3-03"]);
    assert.equal(deliveries, 43);
    assert.deepEqual(errors, []);
    return `${mode === "tap" ? "터치" : "키보드"} · 6일 / 43건 납품 · 발견 장면 4개 · 새로고침 뒤 이어하기 · 통과`;
  } finally {
    await context.close();
  }
}

async function checkWorkbench() {
  const context = await browser.newContext({ viewport: { width: 320, height: 568 }, hasTouch: true, isMobile: true, reducedMotion: "reduce" });
  try {
    const page = await context.newPage();
    await page.goto(url + "#d3-02");
    await page.tap("#plus");
    await page.tap("#plus");
    await page.tap("#markOk");
    const longOption = await page.evaluate(() => {
      const app = window.__sbg;
      const order = app.orderAt(app.state());
      return app.choicesOf(order).findIndex((label) => {
        const beats = app.labelBeats(label);
        return beats.n / beats.d === 3;
      });
    });
    await page.tap("#lab" + longOption);
    const ghost = await page.evaluate(() => {
      const lane = document.querySelector("#lane .loaf");
      const bread = document.querySelector("#board .ghost");
      const motion = [lane, lane.parentElement, bread].flatMap((element) => {
        const style = getComputedStyle(element);
        return [style.animationDuration, style.transitionDuration].flatMap((value) => value.split(",").map(parseFloat));
      });
      return { ratio: lane.getBoundingClientRect().width / bread.getBoundingClientRect().width, motion };
    });
    assert.ok(Math.abs(ghost.ratio - 2 / 3) < 0.01, "3박 유령 빵과 2박 덩이는 3:2 폭");
    assert.ok(ghost.motion.every((duration) => duration === 0), "동작 줄이기에서는 도마 연출 0초");
    await page.goto("about:blank");
    await page.goto(url + "#d1-02");
    await page.tap("#plus");
    await page.tap("#markOk");
    await page.tap("#pad");
    await page.waitForFunction(() => window.__sbg.state().sub === "run", undefined, { timeout: 10000 });
    for (const beat of [1.23, 3.23]) {
      await page.waitForFunction((at) => {
        const app = window.__sbg;
        const playback = app.run();
        return playback && (app.clock() - playback.tb0) / playback.beat >= at;
      }, beat, { timeout: 10000 });
      await page.tap("#pad");
    }
    await page.waitForFunction(() => window.__sbg.state().sub === "result", undefined, { timeout: 10000 });
    assert.equal(await page.locator(".cut").count(), 2, "탭마다 칼집 표시가 하나 생긴다");
    assert.ok(await page.locator(".dev.thick").count(), "늦은 칼질의 앞 조각에 색이 얹힌다");
    assert.ok(await page.locator(".dev.thin").count(), "늦은 칼질의 뒤 조각에 색이 얹힌다");
    assert.match(await page.locator("#readout").innerText(), /늦게 썰면 그 앞 조각이 두꺼워져요/);
    return "320×568 · 유령 빵 배율 · 동작 줄이기 · 터치 판정과 조각 색 표시 · 통과";
  } finally {
    await context.close();
  }
}

try {
  const runs = await Promise.allSettled([playAll("tap"), playAll("keyboard"), checkWorkbench()]);
  for (const run of runs) {
    if (run.status === "fulfilled") console.log(run.value);
    else checks.push(run.reason);
  }
} finally {
  await browser.close();
}
if (checks.length) {
  checks.forEach((error) => console.error(error));
  process.exitCode = 1;
}
