// ── 저장: localStorage에 두고, 쓸 수 없으면 메모리에만 둔다. 스키마는 version 1을 지킨다 ──
const SAVE_KEY = "sbg_save_v1", BACKUP_KEY = "sbg_save_v1_backup";
const defaultSave = () => ({
  version: 1,
  settings: { volume: 0.8, muted: false, guide: true, slow: false, tapOffsetMs: 0, calibrated: false, showMs: true, motion: "system", tutorialSeen: false, tutorialStep: 0 },
  days: {},  // "d0": { passed, stamp(0 없음 · 1 도장 · 2 장인 도장), runs, best(● 수의 최고) }
  recipes: {},  // "4/3": { got, knife(0 없음 · 1 들쭉날쭉 · 2 고른 편 · 3 장인) }
  loaves: [],  // 얻은 덩이 카드(음표 분모)
  stats: { orders: 0, clean: 0, slices: 0, master: 0 },
  active: null,  // 하던 영업: { day, index, results: [{ recipe(2 ● · 1 ◐), knife, ng }], cards }
});
function readSave(text) {  // 저장 문자열 → { save, backup }. 손상되었거나 더 높은 버전이면 기본값으로 시작하고 원본을 backup에 담는다
  const def = defaultSave(), obj = (v) => (v && typeof v === "object" && !Array.isArray(v) ? v : {});
  if (text === null || text === undefined || text === "") return { save: def, backup: null };
  let raw;
  try { raw = JSON.parse(text); } catch (e) { return { save: def, backup: text }; }
  if (!raw || typeof raw !== "object" || Array.isArray(raw) || raw.version !== 1) return { save: def, backup: text };
  return { backup: null, save: {  // 없는 필드는 기본값으로 채운다. 버전은 올리지 않는다
    version: 1, settings: Object.assign(def.settings, obj(raw.settings)), days: obj(raw.days), recipes: obj(raw.recipes),
    loaves: Array.isArray(raw.loaves) ? raw.loaves : [], stats: Object.assign(def.stats, obj(raw.stats)), active: raw.active && typeof raw.active === "object" ? raw.active : null,
  } };
}
function makeStore(backend) {  // backend: getItem과 setItem을 가진 것(localStorage). 없거나 실패하면 메모리로 이어 간다
  let mem = null, ok = !!backend;
  return {
    persistent: () => ok,  // 거짓이면 설정 화면에 "이 기기에서는 기록이 저장되지 않아요"
    load() {
      let text = mem;
      if (ok) { try { text = backend.getItem(SAVE_KEY); } catch (e) { ok = false; } }
      const r = readSave(text);
      if (r.backup !== null && ok) { try { backend.setItem(BACKUP_KEY, r.backup); } catch (e) { /* 원본을 남기지 못해도 진행한다 */ } }
      return r.save;
    },
    save(obj) {
      mem = JSON.stringify(obj);
      if (ok) { try { backend.setItem(SAVE_KEY, mem); } catch (e) { ok = false; } }
      return ok;
    },
  };
}
function pickBackend() {  // 아티팩트나 사생활 보호 모드에서는 localStorage가 막혀 있을 수 있다
  try { const ls = window.localStorage, k = "__sbg_probe"; ls.setItem(k, "1"); ls.removeItem(k); return ls; } catch (e) { return null; }
}
// ── 기록 계산(순수): 저장 객체를 받아 새 객체를 돌려준다. 원본을 바꾸지 않는다 ──
const KNIFE = ["–", "들쭉날쭉", "고른 편", "장인"];  // 저장하는 칼솜씨 번호. 기계와 "–"는 0
const knifeCode = (k) => Math.max(0, KNIFE.indexOf(k));
const copy = (x) => JSON.parse(JSON.stringify(x));
function applyDelivery(save, o, res) {  // 납품 한 번. 새 카드를 얻었으면 card에 그 열쇠를 담는다
  const s = copy(save), full = res.recipe === "full";
  let card = "";
  s.stats.orders++;
  if (full) s.stats.clean++;
  if (knifeCode(res.knife) > 0) s.stats.slices++;
  if (res.knife === "장인") s.stats.master++;
  if (o.ask === "pick") { if (full && !s.loaves.includes(o.loaf)) { s.loaves.push(o.loaf); card = String(o.loaf); } }
  else if (o.ns.length === 1) {
    const key = recipeKey(o.loaf, o.ns[0]), r = s.recipes[key] || { got: false, knife: 0 };
    if (full && !r.got) { r.got = true; card = key; }  // 분할 카드는 그 조합을 처음 ●로 납품할 때 얻는다
    r.knife = Math.max(r.knife, knifeCode(res.knife));
    s.recipes[key] = r;
  }
  return { save: s, card };
}
function applyClose(save, day, results) {  // 마감: 통과, 도장, 최고 기록
  const s = copy(save), score = dayScore(day, results), d = s.days[day.id] || { passed: false, stamp: 0, runs: 0, best: 0 };
  s.days[day.id] = { passed: d.passed || score.passed, stamp: Math.max(d.stamp, score.stamp), runs: d.runs + 1, best: Math.max(d.best, score.clean) };
  s.active = null;
  return { save: s, score };
}
const unlocked = (save, dayId) => { const i = DAYS.findIndex((d) => d.id === dayId); return i === 0 || (i > 0 && !!(save.days[DAYS[i - 1].id] || {}).passed); };
const toActive = (S) => ({ day: S.day, index: S.results.length, results: S.results.map((r) => ({ recipe: r.recipe === "full" ? 2 : 1, knife: knifeCode(r.knife), ng: r.ng ? 1 : 0 })), cards: S.cards.slice() });
function fromActive(S, a) {  // 하던 영업을 이어서 연다. 읽을 수 없으면 null
  const d = a && dayOf(a.day);
  if (!d || !Array.isArray(a.results)) return null;
  const n = d.orders.length;
  let results = [];
  for (const r of a.results) {
    const o = d.orders[queueOf(n, results)[results.length]];
    if (!o || !r) return null;
    results = results.concat([{ recipe: r.recipe === 2 ? "full" : "half", knife: o.ask === "pick" ? "" : KNIFE[r.knife] || "–", ng: !!r.ng }]);
  }
  if (a.index !== results.length || results.length >= queueOf(n, results).length) return null;
  return Object.assign({ screen: "shift", day: d.id, sliced: false, cards: Array.isArray(a.cards) ? a.cards.slice() : [], dev: false, sum: null }, openAt(Object.assign({}, S, { day: d.id }), results.length, results));
}
