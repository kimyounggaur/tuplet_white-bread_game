// ── 잠금 정답표(설계서 부록 B): 검사만 읽는다. 게임 코드가 읽으면 TH-13이 실패한다 ──
const LOCK = {
  loaves: [  // 덩이, 박, 썰기에 놓는 덩이 수, 썰기의 전체 박
    [1, "4", 1, 4], [2, "2", 2, 4], [4, "1", 4, 4], [8, "1/2", 4, 2],
  ],
  splits: [  // 덩이, 조각, 보통 칸, 이름, 비율, 한 조각(박), 처음 나오는 주문
    [1, 2, 2, "2분음표 2개", "", "2", "d1-03"], [1, 3, 2, "2분음표 셋잇단음표", "3:2", "4/3", "d3-03"], [1, 4, 4, "4분음표 4개", "", "1", "d1-07"],
    [2, 2, 2, "4분음표 2개", "", "1", "d1-02"], [2, 3, 2, "4분음표 셋잇단음표", "3:2", "2/3", "d3-02"], [2, 4, 4, "8분음표 4개", "", "1/2", "d1-05"],
    [4, 2, 2, "8분음표 2개", "", "1/2", "d1-01"], [4, 3, 2, "8분음표 셋잇단음표", "3:2", "1/3", "d2-02"], [4, 4, 4, "16분음표 4개", "", "1/4", "d1-04"],
    [8, 2, 2, "16분음표 2개", "", "1/4", "d1-06"], [8, 3, 2, "16분음표 셋잇단음표", "3:2", "1/6", "d3-04"],
  ],
  choices: [  // 덩이, 조각, 정답, 오답 1, 오답 2. 각각 [이름, 그 음표들의 전체 박]
    [1, 2, ["2분음표 2개", "4"], ["온음표 2개", "8"], ["4분음표 2개", "2"]],
    [1, 3, ["2분음표 셋잇단", "4"], ["2분음표 3개", "6"], ["4분음표 셋잇단", "2"]],
    [1, 4, ["4분음표 4개", "4"], ["2분음표 4개", "8"], ["8분음표 4개", "2"]],
    [2, 2, ["4분음표 2개", "2"], ["2분음표 2개", "4"], ["8분음표 2개", "1"]],
    [2, 3, ["4분음표 셋잇단", "2"], ["4분음표 3개", "3"], ["8분음표 셋잇단", "1"]],
    [2, 4, ["8분음표 4개", "2"], ["4분음표 4개", "4"], ["16분음표 4개", "1"]],
    [4, 2, ["8분음표 2개", "1"], ["4분음표 2개", "2"], ["16분음표 2개", "1/2"]],
    [4, 3, ["8분음표 셋잇단", "1"], ["8분음표 3개", "3/2"], ["4분음표 셋잇단", "2"]],
    [4, 4, ["16분음표 4개", "1"], ["8분음표 4개", "2"], ["32분음표 4개", "1/2"]],
    [8, 2, ["16분음표 2개", "1/2"], ["8분음표 2개", "1"], ["32분음표 2개", "1/4"]],
    [8, 3, ["16분음표 셋잇단", "1/2"], ["16분음표 3개", "3/4"], ["8분음표 셋잇단", "1"]],
  ],
  tol: [  // 한 조각(ms), 장인 허용폭, 고른 편 허용폭
    [2000, 120, 240], [1333, 120, 240], [1000, 120, 240], [667, 100, 200], [500, 75, 150], [333, 50, 100], [300, 50, 90], [250, 50, 90], [200, 50, 90],
  ],
  days: [  // 영업일, 주문 수, 통과에 필요한 ● 수, 발견 장면
    ["d0", 7, 6, []], ["d1", 7, 6, ["S1"]], ["d2", 7, 6, ["S2", "S3"]], ["d3", 8, 7, ["S4"]], ["d4", 6, 5, []], ["d5", 8, 7, []],
  ],
  orderText: {
    "d0-01": "1박짜리 식빵을 골라 주세요.", "d0-04": "8분음표 식빵을 골라 주세요.", "d0-05": "4분음표 식빵 2개를 이으면 어느 식빵과 같을까요?",
    "d0-07": "이 소리만큼 긴 식빵을 골라 주세요.", "d1-06": "½박 식빵(8분음표)을 같은 크기 2조각으로 썰어 주세요.", "d3-02": "2박 식빵(2분음표)을 같은 크기 3조각으로 썰어 주세요.",
    "d4-05": "1박 식빵 4개를 차례로 2 · 3 · 4 · 3조각으로 썰어 주세요.", "d5-02": "이 악보대로 썰어 주세요.", "d5-05": "들리는 대로 썰어 주세요.",
  },
  scenes: {
    S1: ["조각 수는 같은데 길이가 달라요.", "덩이가 길면 조각도 길어요."],
    S2: ["3조각은 8분음표보다 짧고 16분음표보다 길어요.", "딱 맞는 음표가 없어서 8분음표에 숫자 3을 붙여요."],
    S3: ["같은 1박을 2, 3, 4로 나눴어요.", "2와 4는 보통 음표이고 3에만 숫자가 필요해요."],
    S4: ["둘 다 셋잇단이지만 이름이 달라요.", "이름은 덩이가 정해요."],
  },
  flow: { scene: ["pick", "mark"], pick: ["mark", "deliver"], mark: ["label", "slice"], label: ["slice"], slice: ["deliver"], deliver: ["scene", "pick", "mark"] },
  subs: { ready: ["count", "listen"], count: ["run", "ready"], run: ["result", "ready"], result: ["count"], listen: ["ready"] },
};

// ── SL1-1: 이론 엔진, 이름표, 판정 ──
const LOAVES = LOCK.loaves.map((r) => r[0]), NS = [2, 3, 4, 5, 6, 7];  // 덩이 넷(온·2분·4분·8분음표)과 조각 수 2~7
const eachSplit = (fn) => LOAVES.forEach((d) => NS.forEach((n) => fn(specOf(d, n), d, n)));
test("TH-01", "조각 길이의 합 = 덩이(분수 일치)", () => eachSplit((s, d, n) => ok(eq(mul(s.piece, F(n)), s.T), d + "÷" + n)));
test("TH-02", "보통 칸 수 × 표기 음표 = 덩이", () => eachSplit((s, d, n) => ok(eq(mul(s.unit, F(s.m)), s.T) && eq(s.unit, noteWhole(s.unitDen)), d + "÷" + n)));
test("TH-03", "칼집 n−1개, 음 시작 n개", () => eachSplit((s, d, n) => {
  const c = cutPoints(s), o = onsets(s);
  ok(c.length === n - 1 && o.length === n && o[0].n === 0, d + "÷" + n + " 개수");
  ok(c.every((x, k) => eq(x, o[k + 1])) && eq(mul(s.piece, F(n)), s.T), d + "÷" + n + " 자리");
}));
test("TH-04", "잠금 정답표의 분할 11가지", () => {
  ok(LOCK.splits.length === 11, "11줄");
  for (const [d, n, m, name, ratio, piece] of LOCK.splits) {
    const s = specOf(d, n), tag = d + "÷" + n;
    ok(s.m === m && nameKo(s) === name, tag + " 이름: " + nameKo(s));
    ok((s.isTuplet ? s.n + ":" + s.m : "") === ratio, tag + " 비율");
    ok(str(toBeats(s.piece)) === piece, tag + " 한 조각: " + str(toBeats(s.piece)));
  }
});
test("TH-05", "4분음표 덩이의 5조각과 7조각은 16분음표 5:4, 7:4", () => {
  const a = specOf(4, 5), b = specOf(4, 7);
  ok(a.m === 4 && a.unitDen === 16 && a.isTuplet && nameKo(a) === "16분음표 다섯잇단음표", "5조각");
  ok(b.m === 4 && b.unitDen === 16 && b.isTuplet && nameKo(b) === "16분음표 일곱잇단음표", "7조각");
});
test("TH-06", "2조각과 4조각은 잇단음표가 아니다", () => LOAVES.forEach((d) => [2, 4].forEach((n) => { const s = specOf(d, n); ok(!s.isTuplet && s.m === n && nameKo(s).endsWith(n + "개"), d + "÷" + n); })));
test("TH-07", "점4분음표 덩이: 2조각 2:3, 3조각 일반, 4조각 4:3", () => {
  const T = noteWhole(4, 1), a = tupletSpec(T, 2), b = tupletSpec(T, 3), c = tupletSpec(T, 4);
  ok(eq(T, F(3, 8)) && kindOf(T) === "ternary", "점4분음표 = 3/8");
  ok(a.m === 3 && a.isTuplet && b.m === 3 && !b.isTuplet && c.m === 3 && c.isTuplet && a.unitDen === 8, "보통 칸은 3개");
});
test("TH-08", "m을 명시하면 그 비율을 쓴다(5:6)", () => { const s = tupletSpec(noteWhole(4, 1), 5, 6); ok(s.m === 6 && s.unitDen === 16 && s.isTuplet, "5:6 → 16분음표"); });
test("TH-09", "홑박자의 잇단 조각은 표기 음표보다 짧다", () => eachSplit((s, d, n) => ok(!s.isTuplet || (num(s.piece) < num(s.unit) && num(s.piece) > num(s.unit) / 2), d + "÷" + n)));
test("TH-10", "주파수 공식", () => ok(near(hz(69), 440) && near(hz(81), 880) && Math.round(hz(79) * 100) === 78399 && Math.round(hz(67) * 100) === 39200, "440 × 2^((midi − 69) / 12)"));
test("TH-11", "덩이의 박 수와 ♩=60에서 1박 = 1초", () => {
  for (const [d, beats] of LOCK.loaves) ok(str(loafBeats(d)) === beats, noteKo(d) + " " + beats + "박");
  ok(beatSec(60) === 1 && near(TbOf(4) * beatSec(60), 1) && near(beatSec(50), 6 / 5), "초 = 박 × 60 ÷ bpm");
});
test("TH-13", "앱 코드에 음표 길이·비율·이름의 표가 없다", () => {
  const code = appCode();
  ok(!/\bLOCK\b/.test(code), "게임 코드가 잠금 정답표(LOCK)를 읽는다");
  let h = hits(code, /[0-9]+분음표/g); ok(!h, "음표 이름을 손으로 적었다(noteKo로 만든다) " + h);
  h = hits(code, /(둘|셋|넷|다섯|여섯|일곱)잇단/g); ok(!h, "잇단 이름을 손으로 적었다(nameKo, labelKo로 만든다) " + h);
  h = hits(code, /\(\s*[2-7]\s*:\s*[2-6]\s*\)/g); ok(!h, "비율을 손으로 적었다 " + h);
  h = hits(code, /\d*\.(33+|66+7?|166+7?|83+)(?!\d)/g); ok(!h, "1/3, 1/6 같은 길이를 소수로 적었다(분수로 계산한다) " + h);
  h = hits(code, /1\s*:\s*4\s*,\s*2\s*:\s*2\s*,\s*4\s*:\s*1/g) || hits(code, /\[\s*4\s*,\s*2\s*,\s*1\s*,\s*0?\.5\s*\]/g); ok(!h, "음표 길이 표가 있다(noteWhole, toBeats로 계산한다) " + h);
});
test("LB-01", "정답 이름표의 전체 시간 = 덩이", () => {
  for (const [d, n, right] of LOCK.choices) { const c = labelChoices(specOf(d, n)); ok(labelKo(c[0]) === right[0] && str(labelBeats(c[0])) === right[1] && eq(labelBeats(c[0]), loafBeats(d)) && sameLabel(c[0], labelOf(specOf(d, n))), d + "÷" + n + ": " + labelKo(c[0])); }
});
test("LB-02", "오답 보기 둘은 전체 시간이 덩이와 다르고 서로 다르다", () => {
  for (const [d, n, , w1, w2] of LOCK.choices) {
    const c = labelChoices(specOf(d, n)), T = loafBeats(d), tag = d + "÷" + n;
    ok(c.length === 3 && !eq(labelBeats(c[1]), T) && !eq(labelBeats(c[2]), T) && !sameLabel(c[1], c[2]), tag);
    ok(labelKo(c[1]) === w1[0] && str(labelBeats(c[1])) === w1[1] && labelKo(c[2]) === w2[0] && str(labelBeats(c[2])) === w2[1], tag + ": " + labelKo(c[1]) + ", " + labelKo(c[2]));
  }
});
test("LB-03", "잇단 분할의 오답: 숫자를 뺀 것, 음표가 8분음표 쪽으로 한 단계인 것", () => {
  for (const [d, n] of LOCK.choices) {
    const s = specOf(d, n), c = labelChoices(s); if (!s.isTuplet) continue;
    ok(c[1].den === c[0].den && c[1].tup === 0 && c[1].count === n, d + "÷" + n + " 오답 1");
    ok(c[2].tup === n && c[2].den === (c[0].den === 8 ? 4 : c[0].den < 8 ? c[0].den * 2 : c[0].den / 2), d + "÷" + n + " 오답 2");
  }
});
test("LB-04", "일반 분할의 오답: 한 단계 긴 음표, 한 단계 짧은 음표", () => {
  for (const [d, n] of LOCK.choices) { const s = specOf(d, n), c = labelChoices(s); if (s.isTuplet) continue; ok(c[1].den === c[0].den / 2 && c[2].den === c[0].den * 2 && c[1].tup === 0 && c[2].tup === 0, d + "÷" + n); }
});
test("LB-05", "4분음표 셋잇단 = 2박, 8분음표 3개 = 3/2박", () => ok(eq(labelBeats({ den: 4, count: 3, tup: 3 }), F(2)) && eq(labelBeats({ den: 8, count: 3, tup: 0 }), F(3, 2)), "labelBeats"));
test("JD-01", "정확한 탭 → 조각 수 맞음, 장인", () => { const j = judge([1 / 3, 2 / 3, 4 / 3, 5 / 3], 1, [3, 3], 1000); ok(j.countOk && j.grade === "master" && j.loaves.length === 2, j.grade); });
test("JD-02", "박 위의 탭은 칼질로 세지 않는다", () => {
  const j = judge([0, 1 / 3, 2 / 3, 1], 1, [3], 1000), k = judge([1 / 3, 2 / 3, 1.02, 4 / 3, 5 / 3], 1, [3, 3], 1000);
  ok(j.edgeTaps === 2 && j.countOk && j.grade === "master", "박 위의 탭 " + j.edgeTaps);
  ok(k.edgeTaps === 1 && k.countOk && k.grade === "master", "덩이 사이의 박에서 20ms 늦은 탭도 칼질이 아니다");
});
test("JD-03", "칼질이 모자라면 조각 수가 다르다", () => { const j = judge([1 / 3, 2 / 3, 1, 4 / 3], 1, [3, 3], 1000); ok(!j.countOk && j.grade === "count" && j.loaves[1].pieces === 2, j.grade); });
test("JD-04", "120ms 늦은 탭 → 등급이 내려가고 앞 조각이 두껍다", () => { const j = judge([1 / 3 + 0.12, 2 / 3], 1, [3], 1000); ok(j.countOk && j.grade === "rough" && j.loaves[0].widths[0] > 1 / 3 && j.worst.ms > 0, j.grade); });
test("JD-05", "연속(2 · 3 · 4 · 3)의 정확한 탭 → 장인", () => ok(judge([1 / 2, 1 + 1 / 3, 1 + 2 / 3, 2 + 1 / 4, 2 + 1 / 2, 2 + 3 / 4, 3 + 1 / 3, 3 + 2 / 3], 1, [2, 3, 4, 3], 1000).grade === "master", "장인"));
test("JD-06", "허용폭의 바닥과 천장", () => {
  for (const [ms, a, b] of LOCK.tol) ok(Math.round(tol(ms, 0.15, 50, 120)) === a && Math.round(tol(ms, 0.3, 90, 240)) === b, ms + "ms");
});
test("JD-07", "조각 2초: +100ms 장인, +200ms 고른 편, +300ms 들쭉날쭉", () => ok(judge([2.1], 4, [2], 1000).grade === "master" && judge([2.2], 4, [2], 1000).grade === "good" && judge([2.3], 4, [2], 1000).grade === "rough", "천장 120ms, 240ms"));
test("JD-08", "박자 보정은 가운데 값, 탭 4개 미만이면 null", () => ok(calibOffset([1.06, 2.05, 3.07, 4.06, 5.06], [1, 2, 3, 4, 5]) === 60 && calibOffset([1.06, 2.05], [1, 2]) === null && calibOffset([1.4, 2.4, 3.4, 4.4], [1, 2, 3, 4]) === null, "calibOffset"));

// ── SL1-3: 주문 흐름 계산부. 화면 없이 주문 43개를 끝까지 푼다 ──
const S0 = () => Object.assign({ screen: "shift", day: "d0", idx: 0, results: [], sliced: false, cards: [], dev: false, sum: null, guide: true, slow: false, offset: 0, showMs: true, sheet: false, phase: "pick", guideNow: true, msg: say("", "") }, fresh());
function solve(s, o, slip) {  // 주문 하나를 계산부만으로 푼다. slip이 참이면 첫 단계에서 한 번 틀린다. 지나간 단계와 문구를 모은다
  const phases = [s.phase], texts = [orderText(o), s.msg.text];
  const step = (p, what) => {
    ok(p, o.id + " " + what + ": 계산부가 null을 돌려줬다");
    const t = Object.assign({}, s, p);
    ok(legal(s, t), o.id + " " + what + ": 허용하지 않는 전이 " + s.phase + " → " + t.phase);
    s = t; texts.push(s.msg.text);
    if (phases[phases.length - 1] !== s.phase) phases.push(s.phase);
  };
  if (s.phase === "pick") {
    if (slip) { step(T.pick(s, o, DENS.find((d) => d !== o.loaf)), "틀린 덩이"); step(T.confirmPick(s, o), "확정(오답)"); ok(s.phase === "pick" && s.assisted, o.id + " 틀리면 고르기에 머문다"); }
    step(T.pick(s, o, o.loaf), "고르기"); step(T.confirmPick(s, o), "확정");
  }
  if (s.phase === "mark") {
    if (slip && phases.length === 1) { step(T.confirmMark(s, o), "확정(칼집 0)"); ok(s.phase === "mark" && s.fix && s.assisted, o.id + " 틀리면 재단에 머문다"); }
    o.ns.forEach((n, q) => { while (s.cuts[q] < n - 1) step(T.bump(s, o, q, 1), "칼집"); });
    step(T.confirmMark(s, o), "확정");
  }
  if (s.phase === "label") {
    const sp = specOf(o.loaf, o.ns[0]);
    step(o.label === "yesno" ? T.yesNo(s, o, sp.isTuplet) : T.choose(s, o, choicesOf(o).findIndex((l) => sameLabel(l, labelOf(sp)))), "이름표");
  }
  if (s.phase === "slice") step(T.toDeliver(s, o), "납품");
  return { s, phases, texts };
}
function playDay(dayId, slipAt) {  // 영업일 하나를 처음부터 마감까지. slipAt에 적힌 자리의 주문에서 한 번씩 틀린다
  let s = Object.assign(S0(), startDay(S0(), dayId));
  const scenes = [], ids = [], texts = [];
  for (let guard = 0; guard < 40; guard++) {
    if (s.phase === "scene") { scenes.push(s.scene); const p = T.sceneDone(s); ok(p && legal(s, Object.assign({}, s, p)), dayId + " 장면 뒤의 전이"); s = Object.assign({}, s, p); }
    const o = orderAt(s), r = solve(s, o, slipAt.includes(s.idx));
    ids.push(o.id); texts.push.apply(texts, r.texts); s = r.s;
    ok(s.phase === "deliver" && s.results.length === s.idx + 1, o.id + " 납품하면 결과가 하나 는다");
    const nx = T.next(s);
    ok(nx && legal(s, Object.assign({}, s, nx)), o.id + " 다음 주문으로 가는 전이");
    s = Object.assign({}, s, nx);
    if (s.screen === "close") return { s, scenes, ids, texts };
  }
  throw new Error(dayId + " 영업일이 끝나지 않는다");
}
const PATH = (o) => (o.ask === "pick" ? ["pick", "deliver"] : o.ask === "word" ? (o.label === "yesno" || o.label === "choose" ? ["mark", "label", "slice", "deliver"] : ["mark", "slice", "deliver"]) : ["pick", "mark", "slice", "deliver"]);
test("ST-01", "허용 전이표와 주문 43개의 단계 순서", () => {
  ok(same(FLOW, LOCK.flow) && same(SUBS, LOCK.subs), "전이표가 설계서 4.8절과 같아야 한다");
  for (const o of ORDERS) { const s = Object.assign(S0(), { day: o.day }), r = solve(Object.assign(s, enterOrder(s, o)), o, false); ok(same(r.phases, PATH(o)), o.id + " 단계 순서 " + r.phases.join(" → ")); ok(r.s.results[0].recipe === "full", o.id + " 한 번에 맞히면 ●"); }
  for (const [id, n, , sc] of LOCK.days) {
    const d = playDay(id, []);
    ok(d.ids.length === n && d.s.results.length === n && same(d.scenes, sc) && dayScore(dayOf(id), d.s.results).clean === n, id + " 완주: 주문 " + d.ids.length + "개, 장면 " + d.scenes.join(" "));
  }
  const a = S0(), slicing = Object.assign(a, enterOrder(a, orderById("d1-01")), { phase: "slice", sub: "run" });
  ok(T.toDeliver(slicing, orderById("d1-01")) === null && T.toDeliver(Object.assign({}, slicing, { sub: "count" }), orderById("d1-01")) === null, "썰기 도중에는 납품할 수 없다");
  ok(T.next(slicing) === null && T.pick(slicing, orderById("d1-01"), 4) === null && T.confirmMark(slicing, orderById("d1-01")) === null, "단계에 맞지 않는 입력은 무시한다");
  ok(!legal(Object.assign(S0(), { phase: "mark" }), Object.assign(S0(), { phase: "deliver" })) && !legal(Object.assign(S0(), { phase: "slice", sub: "ready" }), Object.assign(S0(), { phase: "slice", sub: "run" })), "그림에 없는 전이는 허용하지 않는다");
});
test("ST-03", "2차 오답이면 고쳐 주고 진행한다. 레시피는 ◐, 그 주문은 마감 앞에 한 번 더 나온다", () => {
  const o = orderById("d1-01");
  let s = Object.assign(S0(), { day: "d1" }); s = Object.assign(s, enterOrder(s, o));
  const go = (p) => { ok(p, "null"); s = Object.assign({}, s, p); };
  go(T.bump(s, o, 0, 1)); go(T.bump(s, o, 0, 1)); go(T.confirmMark(s, o));
  ok(s.phase === "mark" && s.fix && s.tries === 1 && s.msg.tone === "bad" && s.msg.text === "칼집을 2번 내면 3조각이에요. 2조각이면 칼집은 1번이에요.", "1차: 원인을 말한다. " + s.msg.text);
  go(T.confirmMark(s, o));
  ok(s.phase === "mark" && same(s.cuts, [1]) && !s.fix && s.msg.tone === "warn" && s.msg.text === "2조각이면 칼집은 1번이에요. 고쳐 두었어요. 확정을 눌러요.", "2차: 칼집을 고쳐 둔다. " + s.msg.text);
  go(T.confirmMark(s, o)); ok(s.phase === "slice", "고친 뒤 확정하면 진행");
  go(T.toDeliver(s, o)); ok(s.results[0].recipe === "half" && s.results[0].knife === "–", "레시피 ◐, 썰지 않으면 –");
  const p = orderById("d0-01"); let t = Object.assign(S0(), enterOrder(S0(), p));
  t = Object.assign({}, t, T.pick(t, p, 2)); t = Object.assign({}, t, T.confirmPick(t, p));
  ok(t.phase === "pick" && t.msg.text === "2분음표 식빵은 2박이에요. 1박짜리를 찾아요.", "고르기 1차: " + t.msg.text);
  t = Object.assign({}, t, T.confirmPick(t, p));
  ok(t.sel === 4 && t.msg.text === "4분음표 식빵이 1박이에요. 확정을 눌러요.", "고르기 2차: 정답 덩이를 올려 준다. " + t.msg.text);
  ok(same(queueOf(7, []), [0, 1, 2, 3, 4, 5, 6]), "처음에는 차례대로");
  const d = playDay("d1", [1, 3]);
  ok(same(d.ids, ["d1-01", "d1-02", "d1-03", "d1-04", "d1-05", "d1-06", "d1-02", "d1-04", "d1-07"]), "◐ 주문은 마감 주문 앞에 다시: " + d.ids.join(" "));
  const sc = dayScore(dayOf("d1"), d.s.results);
  ok(sc.clean === 5 && sc.need === 6 && !sc.passed && sc.stamp === 0, "다시 나온 주문의 결과는 통과 계산에 넣지 않는다: ● " + sc.clean);
  ok(dayScore(dayOf("d1"), playDay("d1", [2]).s.results).passed, "한 번 틀려도 6개면 통과");
});
test("ST-04", "재시작 보호는 같은 썰기 안에서만 듣는다", () => {
  ok(restartBlocked(1000, 500) && !restartBlocked(1100, 500) && !restartBlocked(1000, -1e9), "끝난 뒤 0.6초");
  const o = orderById("d1-01"), s = Object.assign(S0(), enterOrder(S0(), o), { phase: "slice", sub: "run", day: "d1" });
  const done = Object.assign({}, s, T.sliced(s, "slice", judge([0.5, 1.5, 2.5, 3.5], 1, [2, 2, 2, 2], 1000), 5000));
  ok(done.sub === "result" && done.endedAt === 5000 && done.knife === "장인" && restartBlocked(5100, done.endedAt), "썰기가 끝난 시각을 적는다");
  const nxt = Object.assign({}, done, T.toDeliver(done, o)), after = Object.assign({}, nxt, T.next(nxt));
  ok(after.endedAt === -1e9 && !restartBlocked(5100, after.endedAt), "다음 주문으로 가면 보호가 풀린다");
  const m = Object.assign(S0(), enterOrder(S0(), o), { cuts: [1], endedAt: 5000 }), sl = Object.assign({}, m, T.confirmMark(m, o));
  ok(sl.phase === "slice" && sl.endedAt === -1e9, "썰기 단계에 들어갈 때도 풀린다");
});
test("CT-01", "문구의 음표 이름과 비율은 엔진 출력과 같다", () => {
  for (const [d, n, , name, ratio] of LOCK.splits) {
    const o = splitOrders().find((x) => x.loaf === d && x.ns[0] === n), s0 = Object.assign(S0(), { day: o.day }), r = solve(Object.assign(s0, enterOrder(s0, o)), o, false);
    const want = name + (ratio ? " (" + ratio + ")" : " · 일반 분할");
    ok(r.texts.includes(want + ". 이제 박에 맞춰 썰어요.") && r.texts.includes(want + ". 원래 소리, 조각 리듬 순서로 들어요."), o.id + " " + want);
  }
  for (const id of Object.keys(LOCK.scenes)) ok(same(sceneText(id), LOCK.scenes[id]), id + ": " + sceneText(id).join(" / "));
  ok(sceneCaption(SCENES.S2.rows[0]) === "보통 칸 2개 · 8분음표" && sceneCaption(SCENES.S4.rows[1]) === "4분음표 셋잇단음표 (3:2)", "장면 줄의 이름");
});
test("CT-02", "오답 문구와 유령 빵의 박 수는 엔진 계산과 같다", () => {
  for (const o of ORDERS.filter((x) => x.label === "choose")) {
    const row = LOCK.choices.find((c) => c[0] === o.loaf && c[1] === o.ns[0]), s = Object.assign(S0(), enterOrder(S0(), o), { phase: "label", day: o.day });
    choicesOf(o).forEach((l, i) => {
      const hit = row.slice(2).find((c) => c[0] === labelKo(l)), p = T.choose(s, o, i);
      ok(hit, o.id + " 보기 " + labelKo(l));
      if (hit === row[2]) { ok(p.phase === "slice", o.id + " 정답"); return; }
      const T0 = num(loafBeats(o.loaf)), g = num(labelBeats(l));
      ok(p.phase === undefined && near(p.ghost.beats, g) && str(labelBeats(l)) === hit[1] && same(p.wrong, [i]), o.id + " 유령 빵 " + hit[1] + "박");
      ok(p.msg.text.includes(beatsKo(labelBeats(l)) + "이라") && p.msg.text.includes(g > T0 ? "보다 길어요" : "에 모자라요") && p.msg.text.endsWith(specOf(o.loaf, o.ns[0]).isTuplet && !l.tup ? "숫자가 있어야 들어가요." : "보통 칸의 이름을 보세요."), o.id + " " + p.msg.text);
    });
  }
  const o = orderById("d5-02"), s = Object.assign(S0(), enterOrder(S0(), o), { day: "d5" }), p = T.confirmPick(Object.assign({}, s, T.pick(s, o, 4)), o);
  ok(p.ghost.beats === 2 && p.ghost.text === "악보 = 2박" && p.msg.text === "악보는 모두 2박이에요. 4분음표 식빵은 1박이라 모자라요.", "악보 주문의 오답: " + p.msg.text);
  const y = orderById("d2-02"), ys = Object.assign(S0(), enterOrder(S0(), y), { phase: "label", day: "d2" }), yp = T.yesNo(ys, y, false);
  ok(yp.msg.text === "한 조각 1/3박은 보통 칸(½박)과 길이가 달라요. 숫자가 필요해요." && same(yp.wrong, ["n"]), "숫자 질문의 오답: " + yp.msg.text);
  const j = orderById("d0-05"), js = Object.assign(S0(), enterOrder(S0(), j)), jp = T.confirmPick(Object.assign({}, js, T.pick(js, j, 1)), j);
  ok(jp.ghost === null && jp.msg.text === "이어 붙인 식빵은 모두 2박이에요. 온음표 식빵은 4박이라 남아요.", "이어 붙이기의 오답: " + jp.msg.text);
});
test("CT-03", "일반 분할을 잇단음표라고 부르는 문구가 없다", () => {
  for (const d of DAYS) for (const slips of [[], [0, 1, 2, 3, 4, 5, 6]]) {
    const r = playDay(d.id, slips);
    ok(!r.texts.some((t) => /둘잇단|넷잇단/.test(t)), d.id + " 2조각과 4조각에 잇단 이름");
  }
  for (const o of splitOrders()) {
    const sp = specOf(o.loaf, o.ns[0]), s0 = Object.assign(S0(), { day: o.day }), r = solve(Object.assign(s0, enterOrder(s0, o)), o, true);
    if (!sp.isTuplet) ok(!r.texts.some((t) => t.includes("잇단음표")) && r.texts.some((t) => t.includes("일반 분할")), o.id + " 일반 분할");
    else ok(r.texts.some((t) => t.includes("잇단음표 (" + sp.n + ":" + sp.m + ")")), o.id + " 잇단음표는 비율과 함께");
  }
});
