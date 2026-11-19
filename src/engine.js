// ── 이론 엔진: 분수로만 계산한다. 수치 표를 두지 않는다 ──
const gcd = (a, b) => (b ? gcd(b, a % b) : Math.abs(a));
const F = (n, d = 1) => { if (d < 0) { n = -n; d = -d; } const g = gcd(n, d) || 1; return { n: n / g, d: d / g }; };
const mul = (a, b) => F(a.n * b.n, a.d * b.d);
const div = (a, b) => F(a.n * b.d, a.d * b.n);
const eq = (a, b) => a.n === b.n && a.d === b.d;
const num = (a) => a.n / a.d;
const str = (a) => (a.d === 1 ? String(a.n) : a.n + "/" + a.d);
const hz = (midi) => 440 * Math.pow(2, (midi - 69) / 12);
const isPow2 = (x) => Number.isInteger(x) && x > 0 && (x & (x - 1)) === 0;
const noteWhole = (den, dots = 0) => F(2 ** (dots + 1) - 1, den * 2 ** dots);  // 온음표 = 1
const toBeats = (whole, beatDen = 4) => mul(whole, F(beatDen));  // 4분음표 = 1박
const kindOf = (T) => (T.n === 1 && isPow2(T.d) ? "binary" : T.n === 3 && isPow2(T.d) ? "ternary" : "other");
function naturalM(T, n) {  // 보통 칸 수: n을 넘지 않는 가장 큰 자연 분할
  const k = kindOf(T);
  if (k === "binary") return 2 ** Math.floor(Math.log2(n));
  if (k === "ternary") return n < 3 ? 3 : 3 * 2 ** Math.floor(Math.log2(n / 3));
  return null;
}
function tupletSpec(T, n, mOverride = null) {
  const m = mOverride ?? naturalM(T, n);
  if (!m) return null;
  const unit = div(T, F(m));
  if (!(unit.n === 1 && isPow2(unit.d))) return null;
  return { T, n, m, unit, unitDen: unit.d, piece: div(T, F(n)), isTuplet: n !== m };
}
const COUNT_KO = { 2: "둘", 3: "셋", 4: "넷", 5: "다섯", 6: "여섯", 7: "일곱" };
const noteKo = (den) => (den === 1 ? "온음표" : den + "분음표");
const beatsKo = (f) => (f.n === 1 && f.d === 2 ? "½" : str(f)) + "박";
const nameKo = (s) => (s.isTuplet ? `${noteKo(s.unitDen)} ${COUNT_KO[s.n]}잇단음표` : `${noteKo(s.unitDen)} ${s.n}개`);
const fmt = (x) => (x === 0.5 ? "½" : String(Math.round(x * 100) / 100));
const hue = (i) => (205 + i * 53) % 360;
const loafBeats = (den) => toBeats(noteWhole(den));
const TbOf = (den) => num(loafBeats(den));
const specOf = (den, n) => tupletSpec(noteWhole(den), n);
const cutPoints = (s) => Array.from({ length: s.n - 1 }, (_, k) => mul(s.piece, F(k + 1)));  // 칼집 자리(온음표 = 1). n조각이면 n−1개(R4)
const onsets = (s) => Array.from({ length: s.n }, (_, k) => mul(s.piece, F(k)));  // 음이 시작하는 자리. n개
const beatSec = (bpm) => 60 / bpm;  // 한 박의 초. 빠르기는 길이(박)를 바꾸지 않는다

// ── 이름표: {den 음표, count 개수, tup 잇단 숫자(없으면 0)} ──
const labelOf = (s) => ({ den: s.unitDen, count: s.n, tup: s.isTuplet ? s.n : 0 });
const labelKo = (l) => (l.tup ? `${noteKo(l.den)} ${COUNT_KO[l.tup]}잇단` : `${noteKo(l.den)} ${l.count}개`);
const sameLabel = (a, b) => a.den === b.den && a.count === b.count && a.tup === b.tup;
function labelBeats(l) {  // 이름표가 차지하는 전체 시간(홑박자). 잇단이면 보통 칸 m개의 길이
  const m = l.tup ? 2 ** Math.floor(Math.log2(l.tup)) : l.count;
  return mul(loafBeats(l.den), F(m));
}
function labelChoices(s) {  // [정답, 오답 1, 오답 2]. 오답은 전체 시간이 덩이와 다르다
  const ok = labelOf(s), n = s.n;
  if (s.isTuplet) return [ok, { den: ok.den, count: n, tup: 0 }, { den: ok.den === 8 ? 4 : ok.den < 8 ? ok.den * 2 : ok.den / 2, count: n, tup: n }];
  return [ok, { den: ok.den / 2, count: n, tup: 0 }, { den: ok.den * 2, count: n, tup: 0 }];
}

// ── 판정: 탭 시각(박)과 덩이별 조각 수만 받는 순수 함수 ──
const tol = (pieceMs, ratio, floor, cap) => Math.max(floor, Math.min(pieceMs * ratio, cap));  // 허용폭: 조각 길이에 비례하되 바닥과 천장을 둔다
function judge(taps, Tb, ns, beatMs) {
  const R = ns.length, total = Tb * R, cuts = [];
  let edgeTaps = 0;
  for (const b of taps) {
    const e = Math.round(b / Tb), a = ns[Math.min(R - 1, Math.max(0, e - 1))], c = ns[Math.min(R - 1, Math.max(0, e))];
    if (Math.abs(b - e * Tb) <= (Tb / Math.max(a, c)) * 0.25) { edgeTaps++; continue; }  // 덩이 경계(박) 위의 탭은 칼질로 세지 않는다
    if (b > 0 && b < total) cuts.push(b);
  }
  cuts.sort((x, y) => x - y);
  const loaves = [], devs = [];
  for (let q = 0; q < R; q++) {
    const n = ns[q], piece = Tb / n, pm = piece * beatMs;
    const mine = cuts.filter((b) => b > q * Tb && b < (q + 1) * Tb).map((b) => b - q * Tb);
    const edges = [0].concat(mine, [Tb]), widths = edges.slice(1).map((x, i) => x - edges[i]);
    const ok = mine.length + 1 === n;
    if (ok) mine.forEach((b, i) => { const ms = (b - (i + 1) * piece) * beatMs; devs.push({ r: q, k: i + 1, ms, s1: Math.abs(ms) / tol(pm, 0.15, 50, 120), s2: Math.abs(ms) / tol(pm, 0.3, 90, 240) }); });
    loaves.push({ n, pieces: mine.length + 1, widths, ok });
  }
  const countOk = loaves.every((l) => l.ok);
  const mean = devs.length ? devs.reduce((s, d) => s + Math.abs(d.ms), 0) / devs.length : null;
  const worst = devs.length ? devs.reduce((a, d) => (Math.abs(d.ms) > Math.abs(a.ms) ? d : a)) : null;
  const grade = !countOk ? "count" : devs.every((d) => d.s1 <= 1) ? "master" : devs.every((d) => d.s2 <= 1) ? "good" : "rough";
  return { loaves, countOk, mean, worst, grade, edgeTaps };
}
function calibOffset(taps, clicks) {  // 박자 보정: 탭과 가장 가까운 박의 차(ms)의 가운데 값
  const d = [];
  for (const t of taps) {
    let best = null;
    for (const c of clicks) if (best === null || Math.abs(t - c) < Math.abs(best)) best = t - c;
    if (best !== null && Math.abs(best) < 0.25) d.push(best * 1000);
  }
  if (d.length < 4) return null;
  d.sort((a, b) => a - b);
  const m = d.length >> 1;
  return Math.round(d.length % 2 ? d[m] : (d[m - 1] + d[m]) / 2);
}
function rng(seed) { let a = seed >>> 0; return () => { a = (a + 0x6d2b79f5) >>> 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
function shuffled(arr, seed) { const r = rng(seed), a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }

// ── 주문 흐름 계산부: 상태와 주문을 받아 바꿀 값만 돌려준다. 화면과 소리를 만지지 않는다 ──
const FLOW = { scene: ["pick", "mark"], pick: ["mark", "deliver"], mark: ["label", "slice"], label: ["slice"], slice: ["deliver"], deliver: ["scene", "pick", "mark"] };
const SUBS = { ready: ["count", "listen"], count: ["run", "ready"], run: ["result", "ready"], result: ["count"], listen: ["ready"] };
function legal(a, b) {  // 허용하는 전이인가(설계서 4.8절). 영업 화면 안에서, 같은 영업일일 때만 본다
  if (a.screen !== "shift" || b.screen !== "shift" || a.day !== b.day) return true;
  if (a.idx !== b.idx || a.phase !== b.phase) return FLOW[a.phase].includes(b.phase);
  return a.sub === b.sub || SUBS[a.sub].includes(b.sub);
}
function queueOf(n, results) {  // 그날 주문이 나오는 줄(주문 번호). ◐였던 주문은 마감 주문 앞에 한 번 더 나온다
  const head = Array.from({ length: n - 1 }, (_, i) => i);
  const redo = results.length >= n - 1 ? head.filter((i) => results[i].recipe === "half") : [];
  return head.concat(redo, [n - 1]);
}
const baseAt = (S) => { const n = dayOf(S.day).orders.length; return queueOf(n, S.results)[Math.min(S.idx, queueOf(n, S.results).length - 1)]; };
const orderAt = (S) => (S.screen === "free" && S.free ? freeOrder(S.free) : dayOf(S.day).orders[baseAt(S)]);
const isRedo = (S) => { const n = dayOf(S.day).orders.length; return S.idx >= n - 1 && S.idx < queueOf(n, S.results).length - 1; };
const restartBlocked = (nowMs, endedAt) => nowMs - endedAt < 600;  // 썰기가 끝난 직후의 탭이 다시 시작으로 읽히지 않게
function leanNext(lean, worstMs) {
  const direction = worstMs > 60 ? 1 : worstMs < -60 ? -1 : 0;
  if (!direction || (lean && Math.sign(lean) !== direction)) return 0;
  return lean + direction;
}

const say = (tone, text) => ({ tone, text });
const fresh = () => ({ sub: "ready", sel: null, cuts: [0], focus: 0, tries: 0, assisted: false, fix: false, wrong: [], ghost: null, label: "", knife: "", ng: false, hearing: false, endedAt: -1e9, scene: "" });
const SRC = { score: ["악보", "는"], sound: ["원래 소리", "는"], psound: ["소리", "는"], join: ["이어 붙인 식빵", "은"] };
const srcOf = (o) => SRC[o.ask === "pick" ? (o.by === "join" ? "join" : "psound") : o.ask];
const GRADE = { master: "장인", good: "고른 편", rough: "들쭉날쭉", count: "" };
const RANK = { "장인": 3, "고른 편": 2, "들쭉날쭉": 1, "기계": 0.5 };

function enterOrder(S, o) {  // 주문 하나를 시작할 때의 값
  const word = o.ask === "word";
  const text = o.ask === "score" ? "악보를 보고 어느 식빵인지 골라요." : o.ask === "sound" || o.by === "sound" ? "주문을 듣고 어느 식빵인지 골라요." : o.by === "join" ? "이어 붙인 길이와 같은 식빵을 골라요." : o.ask === "pick" ? "선반에서 식빵을 고르고 확정을 눌러요." : o.ns.length > 1 ? "덩이를 탭하면 칼집이 하나씩 늘어요." : "빵을 탭하거나 + 를 눌러 칼집을 내요.";
  return Object.assign(fresh(), { phase: word ? "mark" : "pick", sel: word ? o.loaf : null, cuts: o.ns.map(() => 0), guideNow: S.guide && o.guide, msg: say("", text) });
}
function openAt(S, idx, results) {  // 줄의 idx번째 주문을 연다. 그 앞에 발견 장면이 있으면 장면부터 보여 준다
  const d = dayOf(S.day), n = d.orders.length, q = queueOf(n, results), redo = idx >= n - 1 && idx < q.length - 1, sc = redo ? "" : d.scenes[q[idx]] || "";
  if (sc) return Object.assign(fresh(), { idx, results, phase: "scene", scene: sc, guideNow: S.guide, msg: say("", sceneText(sc)[1]) });
  return Object.assign({ idx, results }, enterOrder(S, d.orders[q[idx]]));
}
const startDay = (S, dayId) => Object.assign({ screen: "shift", day: dayId, sliced: false, cards: [], dev: false, sum: null, lean: 0, leanHintUsed: false }, openAt(Object.assign({}, S, { day: dayId }), 0, []));
const toSlice = (text) => ({ phase: "slice", sub: "ready", label: "", ghost: null, fix: false, wrong: [], endedAt: -1e9, msg: say("good", text) });
const intro = (o) => `${splitKo(specOf(o.loaf, o.ns[0]))}. 이제 박에 맞춰 썰어요.`;

const T = {
  sceneDone: (S) => (S.phase === "scene" ? enterOrder(S, orderAt(S)) : null),
  pick(S, o, den) {
    if (S.phase !== "pick") return null;
    const what = o.ask === "pick" && o.by === "name" ? beatsKo(loafBeats(den)) + "짜리" : noteKo(den);
    return { sel: den, ghost: null, msg: say("", `${what} 식빵을 올렸어요. 맞으면 확정을 눌러요.`) };
  },
  confirmPick(S, o) {
    if (S.phase !== "pick") return null;
    if (S.sel === null) return { msg: say("bad", "선반에서 식빵을 먼저 골라 주세요.") };
    if (S.sel === o.loaf) return o.ask === "pick" ? T.toDeliver(S, o) : { phase: "mark", tries: 0, ghost: null, msg: say("good", "맞아요. 이제 빵을 탭하거나 + 를 눌러 칼집을 내요.") };
    const tries = S.tries + 1, want = loafBeats(o.loaf), got = loafBeats(S.sel);
    if (tries >= 2) return { sel: o.loaf, tries, assisted: true, ghost: null, msg: say("warn", `${noteKo(o.loaf)} 식빵이 ${beatsKo(want)}이에요. 확정을 눌러요.`) };
    if (o.ask === "pick" && o.by === "beats") return { tries, assisted: true, msg: say("bad", `${noteKo(S.sel)} 식빵은 ${beatsKo(got)}이에요. ${beatsKo(want)}짜리를 찾아요.`) };
    if (o.ask === "pick" && o.by === "name") return { tries, assisted: true, msg: say("bad", `고른 식빵은 ${beatsKo(got)}이에요. ${beatsKo(got)}은 ${noteKo(S.sel)}예요. ${noteKo(o.loaf)}를 찾아요.`) };
    const src = srcOf(o), text = `${src[0]}${src[1]} 모두 ${beatsKo(want)}이에요. ${noteKo(S.sel)} 식빵은 ${beatsKo(got)}이라 ${num(got) < num(want) ? "모자라요" : "남아요"}.`;
    return { tries, assisted: true, ghost: o.by === "join" ? null : { beats: num(want), text: `${src[0]} = ${beatsKo(want)}` }, msg: say("bad", text) };
  },
  bump(S, o, j, d) {  // d: +1, −1, 또는 "tap"(하나씩 늘고 끝에서 0으로)
    if (S.phase !== "mark") return null;
    const multi = o.ns.length > 1, max = multi ? 3 : 6, cuts = S.cuts.slice();
    cuts[j] = d === "tap" ? (cuts[j] >= max ? 0 : cuts[j] + 1) : Math.max(0, Math.min(max, cuts[j] + d));
    const k = cuts[j], text = multi ? `${j + 1}번째 덩이에 칼집 ${k}번.` : o.count ? `칼집 ${k}번이면 ${k + 1}조각이에요.` : `칼집 ${k}번.`;
    return { cuts, focus: j, fix: false, msg: say("", text) };
  },
  confirmMark(S, o) {
    if (S.phase !== "mark") return null;
    const j = o.ns.findIndex((n, q) => S.cuts[q] + 1 !== n);
    if (j < 0) {
      if (o.label === "yesno") return { phase: "label", fix: false, tries: 0, wrong: [], msg: say("", "이 조각에 숫자(잇단 표시)가 필요할까요? 틀과 견주어 보세요.") };
      if (o.label === "choose") return { phase: "label", fix: false, tries: 0, wrong: [], msg: say("", "조각들의 이름표를 골라요. 보통 칸의 이름을 보세요.") };
      return toSlice(o.ns.length > 1 ? "칼집을 다 냈어요. 이제 박에 맞춰 썰어요." : intro(o));
    }
    const tries = S.tries + 1, n = o.ns[j], k = S.cuts[j], pre = o.ns.length > 1 ? `${j + 1}번째 덩이: ` : "";
    if (tries >= 2) return { cuts: o.ns.map((x) => x - 1), tries, assisted: true, fix: false, focus: j, msg: say("warn", `${pre}${n}조각이면 칼집은 ${n - 1}번이에요. 고쳐 두었어요. 확정을 눌러요.`) };
    const text = k === n ? `칼집을 ${k}번 내면 ${k + 1}조각이에요. ${n}조각이면 칼집은 ${n - 1}번이에요.` : `전체 시간은 맞아요. 조각 수가 달라요. 지금은 ${k + 1}조각이에요.`;
    return { tries, assisted: true, fix: true, focus: j, msg: say("bad", pre + text) };
  },
  yesNo(S, o, v) {  // v: 참이면 "숫자가 필요해요"
    if (S.phase !== "label" || o.label !== "yesno") return null;
    const s = specOf(o.loaf, o.ns[0]);
    if (v === s.isTuplet) return toSlice(intro(o));
    const text = s.isTuplet ? `한 조각 ${beatsKo(toBeats(s.piece))}은 보통 칸(${beatsKo(toBeats(s.unit))})과 길이가 달라요. 숫자가 필요해요.` : "한 조각이 보통 칸과 길이가 같아요. 숫자가 필요 없어요.";
    return { assisted: true, tries: S.tries + 1, wrong: S.wrong.concat(v ? "y" : "n"), msg: say("bad", text) };
  },
  choose(S, o, i) {  // i: 화면에 놓인 순서(choicesOf)의 번호
    if (S.phase !== "label" || o.label !== "choose") return null;
    const s = specOf(o.loaf, o.ns[0]), l = choicesOf(o)[i];
    if (sameLabel(l, labelOf(s))) return toSlice(intro(o));
    const tot = labelBeats(l), Tw = toBeats(s.T), over = num(tot) > num(Tw);
    const text = `이 음표들은 모두 ${beatsKo(tot)}이라 ${beatsKo(Tw)} 식빵${over ? "보다 길어요" : "에 모자라요"}. ${s.isTuplet && !l.tup ? "숫자가 있어야 들어가요." : "보통 칸의 이름을 보세요."}`;
    return { assisted: true, tries: S.tries + 1, wrong: S.wrong.concat(i), ghost: { beats: num(tot), text: `고른 음표 = ${beatsKo(tot)}` }, msg: say("bad", text) };
  },
  sliced(S, kind, j, nowMs) {  // 썰기 한 번이 끝났을 때. j는 judge()의 결과
    const got = kind === "machine" ? "기계" : GRADE[j.grade], knife = (RANK[got] || 0) > (RANK[S.knife] || 0) ? got : S.knife;
    const ng = S.ng || (kind === "slice" && j.grade === "master" && !S.guideNow);
    let msg, lean = S.lean || 0, leanHintUsed = !!S.leanHintUsed;
    if (kind === "machine") msg = say("", "기계가 정확한 박으로 썰었어요. 소리를 듣고 따라 해 보세요.");
    else if (!j.countOk) msg = say("bad", `조각 수가 달라요 (${j.loaves.map((l) => l.pieces).join(" · ")}조각). 칼집 자리에서만 탭해요.`);
    else {
      const w = j.worst, late = w.ms > 0, head = { master: "장인 칼솜씨예요.", good: "고른 편이에요.", rough: "조각이 들쭉날쭉해요." }[j.grade];
      const tail = j.grade === "master" ? "" : late ? " 늦게 썰면 그 앞 조각이 두꺼워져요." : " 일찍 썰면 그 앞 조각이 얇아져요.";
      const mid = S.showMs ? ` 평균 오차 ${Math.round(j.mean)}ms, 가장 큰 오차 ${late ? "+" : "−"}${Math.round(Math.abs(w.ms))}ms.` : j.grade === "master" ? "" : ` ${j.grade === "good" ? "조금" : "많이"} ${late ? "늦었어요" : "빨랐어요"}.`;
      msg = say(j.grade === "rough" ? "warn" : "good", head + mid + tail);
      if (S.screen === "shift") {
        lean = leanNext(lean, w.ms);
        if (!leanHintUsed && Math.abs(lean) >= 3) {
          leanHintUsed = true;
          msg.text += " 박자 맞추기를 해 볼까요? 설정에 있어요.";
        }
      }
    }
    return { sub: "result", label: "", knife, ng, msg, endedAt: nowMs, lean, leanHintUsed };
  },
  abort: (S, hear) => (hear ? { hearing: false } : { sub: "ready", label: "", hearing: false, msg: say("warn", "소리가 멈춰서 중단했어요. 소리를 켜고 다시 시작해 주세요.") }),  // hear: 주문 듣기였으면 단계는 그대로 둔다
  toDeliver(S, o) {  // 납품: 썰기 도중이 아니면 언제든. 고르기 주문은 맞게 고른 뒤에
    if (S.phase === "slice" ? S.sub === "count" || S.sub === "run" : !(S.phase === "pick" && o.ask === "pick" && S.sel === o.loaf)) return null;
    const res = { recipe: S.assisted ? "half" : "full", knife: o.ask === "pick" ? "" : S.knife || "–", ng: S.ng };
    const text = o.ask === "pick" ? `${noteKo(o.loaf)} 식빵은 ${beatsKo(loafBeats(o.loaf))}이에요. 그 길이만큼 소리가 나요.` : o.ns.length > 1 ? "납품했어요. 원래 소리와 조각 리듬을 차례로 들어요." : `${splitKo(specOf(o.loaf, o.ns[0]))}. 원래 소리, 조각 리듬 순서로 들어요.`;
    return { phase: "deliver", sub: "ready", label: "", ghost: null, fix: false, hearing: false, results: S.results.concat([res]), msg: say("good", text) };
  },
  next(S) {  // 다음 주문. 줄이 끝났으면 마감 화면
    if (S.phase !== "deliver") return null;
    const n = dayOf(S.day).orders.length;
    if (S.idx + 1 < queueOf(n, S.results).length) return openAt(S, S.idx + 1, S.results);
    return { screen: "close", sub: "ready", label: "", hearing: false };
  },
};
function dayScore(day, results) {  // 그날의 통과 계산. 다시 나온 주문의 결과는 세지 않는다. 썰기 결과도 세지 않는다(R8)
  const n = day.orders.length, last = queueOf(n, results).length - 1;
  let clean = 0, sliceN = 0, masterN = 0;
  day.orders.forEach((o, i) => {
    const r = i < n - 1 ? results[i] : results[last];
    if (!r) return;
    if (r.recipe === "full") clean++;
    if (o.ask !== "pick") { sliceN++; if (r.knife === "장인" && r.ng) masterN++; }
  });
  const need = passNeed(n), passed = clean >= need;
  return { n, clean, need, passed, stamp: !passed ? 0 : sliceN > 0 && masterN === sliceN ? 2 : 1 };
}
