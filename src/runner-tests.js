// ── 검사 러너: 검사는 실패하면 던진다. 화면과 저장을 건드리지 않는다 ──
const TOTAL = { TH: 13, LB: 6, JD: 8, GN: 6, AU: 6, ST: 5, SV: 4, CT: 3 };  // 묶음별 검사 수. 합계 51
const TESTS = [];
const test = (id, name, fn) => TESTS.push({ id, name, fn });
const ok = (cond, what) => { if (!cond) throw new Error(what); };
const near = (a, b) => Math.abs(a - b) < 1e-9;
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);
function runTests() {
  const rows = TESTS.map((t) => { try { t.fn(); return { id: t.id, name: t.name, ok: true, note: "" }; } catch (e) { return { id: t.id, name: t.name, ok: false, note: String(e && e.message) }; } });
  const by = {}, keys = Object.keys(TOTAL), all = keys.reduce((a, k) => a + TOTAL[k], 0), pass = rows.filter((r) => r.ok).length;
  keys.forEach((k) => { const mine = rows.filter((r) => r.id.slice(0, 2) === k); by[k] = { pass: mine.filter((r) => r.ok).length, written: mine.length, total: TOTAL[k] }; });
  const line = `자가검사 ${pass}/${rows.length} (전체 ${all}개 중 ${rows.length}개 작성) · ` + keys.map((k) => `${k} ${by[k].pass}/${by[k].total}`).join(" ");
  return { rows, by, pass, written: rows.length, all, line, failed: rows.filter((r) => !r.ok).map((r) => r.id) };
}
function showTests(t) {  // index.html#test 화면. 맨 위 글상자의 내용을 AI에게 그대로 붙여 준다
  const esc = (x) => String(x).replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]));
  const report = [t.line].concat(t.rows.filter((r) => !r.ok).map((r) => `실패 ${r.id} ${r.name}: ${r.note}`)).join("\n");
  const el = $("testPage");
  el.innerHTML = `<h1>자가검사</h1><textarea id="testReport" readonly rows="${Math.min(12, 2 + t.failed.length)}">${esc(report)}</textarea><button class="btn" id="testCopy" type="button">결과 복사</button>`
    + `<ol>${t.rows.map((r) => `<li class="${r.ok ? "pass" : "fail"}"><span><b>${r.id}</b> ${esc(r.name)}${r.ok ? "" : "<br>" + esc(r.note)}</span><b>${r.ok ? "통과" : "실패"}</b></li>`).join("")}</ol>`;
  $("testCopy").addEventListener("click", () => { const ta = $("testReport"); ta.focus(); ta.select(); try { navigator.clipboard.writeText(ta.value).catch(() => {}); } catch (e) { /* 막혀 있으면 글상자를 직접 복사한다 */ } });
  document.querySelectorAll("#app > .screen").forEach((e) => e.toggleAttribute("hidden", e.id !== "testPage"));
}

// ── 소스 점검용: 주석을 지운 코드(문자열과 정규식 안은 그대로 둔다) ──
function stripComments(src) {
  const n = src.length, word = /[\w$]/;
  let out = "", i = 0;
  const endStr = (j) => {  // j: 여는 따옴표의 자리. 닫는 따옴표 다음 자리를 돌려준다
    const q = src[j];
    for (j++; j < n; j++) {
      if (src[j] === "\\") j++;
      else if (src[j] === q) return j + 1;
      else if (q === "`" && src[j] === "$" && src[j + 1] === "{") {  // 템플릿 안의 ${ … }
        let depth = 1; j += 2;
        while (j < n && depth) { const c = src[j]; if (c === '"' || c === "'" || c === "`") { j = endStr(j); continue; } if (c === "{") depth++; else if (c === "}") depth--; j++; }
        j--;
      }
    }
    return n;
  };
  const regexAllowed = () => {  // 바로 앞이 값이면 나눗셈, 아니면 정규식
    const t = out.replace(/\s+$/, ""), c = t.slice(-1);
    if (!c) return true;
    if (word.test(c)) { const w = /[\w$]+$/.exec(t)[0]; return ["return", "typeof", "case", "in", "of", "void", "delete", "throw", "new", "else", "do"].includes(w); }
    return !")]}".includes(c);
  };
  while (i < n) {
    const c = src[i], d = src[i + 1];
    if (c === "/" && d === "/") { while (i < n && src[i] !== "\n") i++; continue; }
    if (c === "/" && d === "*") { const e = src.indexOf("*/", i + 2); i = e < 0 ? n : e + 2; continue; }
    if (c === '"' || c === "'" || c === "`") { const e = endStr(i); out += src.slice(i, e); i = e; continue; }
    if (c === "/" && regexAllowed()) {
      let j = i + 1, cls = false;
      for (; j < n && src[j] !== "\n"; j++) { if (src[j] === "\\") j++; else if (src[j] === "[") cls = true; else if (src[j] === "]") cls = false; else if (src[j] === "/" && !cls) break; }
      out += src.slice(i, j + 1); i = j + 1; continue;
    }
    out += c; i++;
  }
  return out;
}
const SECTIONS = ["THEORY", "LABEL", "JUDGE", "ORDERS", "STATE", "VIEW", "AUDIO", "RUN", "STORAGE", "SCREENS", "TESTS", "BOOT"];
function appCode() {  // 검사 구획(11)을 뺀 앱 코드. 구획 머리 12개가 차례로 있어야 한다
  const src = $("main").textContent, at = SECTIONS.map((nm, i) => src.indexOf("\n// == " + (i + 1) + " " + nm + " =="));
  ok(at.every((p, i) => p >= 0 && (i === 0 || p > at[i - 1])), "구획 머리 12개가 차례로 있어야 한다: // == 1 THEORY == … // == 12 BOOT ==");
  return stripComments(src.slice(0, at[10]) + src.slice(at[11]));
}
const hits = (code, re) => { const m = code.match(re) || []; return m.length ? m.length + "곳: " + m.slice(0, 3).map((x) => JSON.stringify(x.trim())).join(", ") : ""; };

// ── SL0: 상태와 저장 ──
const fakeBackend = (init) => { const m = Object.assign({}, init); return { m, getItem: (k) => (k in m ? m[k] : null), setItem: (k, v) => { m[k] = String(v); } }; };
test("ST-02", "상태 대입은 setState 한 곳", () => {
  const code = appCode();
  const assigns = code.match(/(^|[^\w$.])S\s*=(?![=>])/g) || [];
  ok(assigns.length === 2, "S에 값을 넣는 곳은 선언과 setState 안, 두 곳이어야 한다. 지금 " + assigns.length + "곳");
  const at = code.indexOf("function setState(patch)");
  ok(at >= 0 && /(^|[^\w$.])S\s*=(?![=>])/.test(code.slice(at, at + 400)), "setState(patch) 안에서 S를 바꿔야 한다");
  const direct = hits(code, /(^|[^\w$.])S\.[\w$]+(\[[^\]]*\])?\s*(=(?![=>])|\+=|-=|\+\+|--)/g) || hits(code, /(^|[^\w$.])S\.[\w$.]+\.(push|pop|shift|unshift|splice|sort|reverse|fill)\(/g);
  ok(!direct, "상태를 직접 고치는 코드 " + direct);
});
test("SV-01", "저장 version 1 왕복", () => {
  const be = fakeBackend(), st = makeStore(be), s = st.load();
  ok(s.version === 1 && s.active === null && same(s.days, {}), "처음 불러오면 기본값");
  s.settings.guide = false; s.settings.tapOffsetMs = 40; s.days.d0 = { passed: true, stamp: 1, runs: 2, best: 7 };
  ok(st.save(s) === true && st.persistent(), "저장에 성공해야 한다");
  ok(JSON.parse(be.m[SAVE_KEY]).version === 1, "저장한 글에 version 1");
  const t = makeStore(be).load();
  ok(t.settings.guide === false && t.settings.tapOffsetMs === 40 && same(t.days.d0, s.days.d0) && t.settings.volume === defaultSave().settings.volume, "다시 불러오면 같은 값");
});
test("SV-02", "손상·미래 버전이면 기본값으로 시작하고 원본을 남긴다", () => {
  for (const bad of ["{깨진 글", JSON.stringify({ version: 2, days: { d0: { passed: true } } }), "[1,2]", "null"]) {
    const be = fakeBackend({ [SAVE_KEY]: bad }), s = makeStore(be).load();
    ok(s.version === 1 && same(s.days, {}), "기본값으로 시작: " + bad);
    ok(be.m[BACKUP_KEY] === bad, "원본을 " + BACKUP_KEY + "에 남긴다: " + bad);
  }
  const be = fakeBackend({ [SAVE_KEY]: JSON.stringify({ version: 1, settings: { guide: false } }) }), s = makeStore(be).load();
  ok(s.settings.guide === false && s.settings.volume === defaultSave().settings.volume && same(s.stats, defaultSave().stats) && Array.isArray(s.loaves), "없는 필드는 기본값으로 채운다");
  ok(!(BACKUP_KEY in be.m), "멀쩡한 저장은 백업하지 않는다");
});
test("SV-03", "저장소를 쓸 수 없으면 메모리로 이어 간다", () => {
  const st = makeStore(null), s = st.load();
  s.days.d1 = { passed: true, stamp: 2, runs: 1, best: 7 };
  ok(st.save(s) === false && st.persistent() === false, "메모리 저장임을 알린다");
  ok(st.load().days.d1.stamp === 2, "같은 실행 안에서는 값이 남는다");
  const broken = makeStore({ getItem() { throw new Error("막힘"); }, setItem() { throw new Error("막힘"); } }), b = broken.load();
  ok(b.version === 1, "읽기가 던져도 기본값으로 시작");
  b.loaves.push(4);
  ok(broken.save(b) === false && broken.load().loaves[0] === 4, "쓰기가 던져도 메모리에 남는다");
  const full = fakeBackend(); full.setItem = () => { throw new Error("용량 초과"); };
  const f = makeStore(full), fs = f.load(); fs.stats.orders = 3;
  ok(f.save(fs) === false && f.load().stats.orders === 3 && f.persistent() === false, "용량이 차면 메모리로 바꾼다");
});
test("SV-04", "레시피 열쇠 \"4/3\"의 저장 왕복", () => {
  const be = fakeBackend(), st = makeStore(be), s = st.load();
  s.recipes["4/3"] = { got: true, knife: 3 }; s.recipes["8/2"] = { got: false, knife: 1 }; s.loaves = [4, 2];
  st.save(s);
  const t = makeStore(be).load();
  ok(same(t.recipes, { "4/3": { got: true, knife: 3 }, "8/2": { got: false, knife: 1 } }) && same(t.loaves, [4, 2]), "열쇠와 값이 그대로");
});
