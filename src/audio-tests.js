// ── SL3: 소리. 실제 소리를 내지 않고 계획과 가짜 오디오로 검사한다 ──
function fakeAudio() {  // 오실레이터의 주파수, 시작 시각, 취소 여부만 적는 가짜
  const log = [], sink = () => new Proxy(function () {}, { get: (t, k) => (k === "value" ? 0 : sink()), set: () => true, apply: () => undefined });
  const node = (rec) => new Proxy({}, {
    get(t, k) {
      if (k in t) return t[k];
      if (rec && k === "frequency") return { setValueAtTime: (v) => { rec.freq = Math.round(v * 100) / 100; } };
      if (rec && k === "start") return (w) => { rec.startAt = w; };
      if (rec && k === "stop") return (w) => { if (w === undefined) rec.cancelled = true; else rec.stopAt = w; };
      return sink();
    },
    set(t, k, v) { t[k] = v; return true; },
  });
  const ctx = { currentTime: 0, sampleRate: 48000, state: "running", createOscillator() { const rec = { freq: null, startAt: null, stopAt: null, cancelled: false }; log.push(rec); return node(rec); }, createGain: () => node(null), createBiquadFilter: () => node(null), createBufferSource: () => node(null) };
  return { log, A: { ctx, out: node(null), noise: {}, group: makeGroup() } };
}
const tones = (p, midi) => p.ev.filter((e) => e.type === "tone" && e.midi === midi).map((e) => e.t).sort((a, b) => a - b);
const closeTo = (a, b) => a.length === b.length && a.every((x, i) => Math.abs(x - b[i]) < 1e-6);
test("AU-01", "조각 음 783.99Hz, 원래 소리 392.00Hz", () => {
  const f = fakeAudio(); schedule(f.A, planRun("listen", orderById("d2-02"), { slow: false, first: false }), 10);
  ok(same(f.log.map((r) => r.freq), [392, 783.99, 783.99, 783.99]), "예약한 주파수 " + f.log.map((r) => r.freq).join(", "));
});
test("AU-02", "듣기의 예약 시각: 원래 소리 → 조각 리듬", () => {
  const a = planRun("listen", orderById("d2-02"), { slow: false, first: false }), b = planRun("listen", orderById("d3-02"), { slow: false, first: false }), c = planRun("hear", orderById("d1-06"), { slow: false, first: false }), d = planRun("listen", orderById("d0-02"), { slow: false, first: false });
  ok(closeTo(tones(a, 67), [0]) && closeTo(tones(a, 79), [1, 4 / 3, 5 / 3]) && a.beat === 1 && a.countIn === 2 && a.span === 2, "1박 3조각: 0, +1, +1.3333, +1.6667");
  ok(closeTo(tones(b, 67), [0]) && closeTo(tones(b, 79), [2, 8 / 3, 10 / 3]) && b.span === 4, "2박 3조각: 0, +2, +2.6667, +3.3333");
  ok(closeTo(tones(c, 79), [1, 5 / 4]) && near(c.beat, 6 / 5) && c.parts[0].pass === 1, "8분음표 덩이는 다음 박까지 쉬고 조각 리듬. ♩=50");
  ok(closeTo(tones(d, 67), [0]) && tones(d, 79).length === 0 && d.passes === 1 && d.ev.find((e) => e.midi === 67).dur === 2, "고르기 주문은 원래 소리만");
  const f = fakeAudio(); schedule(f.A, a, 10);
  ok(closeTo(f.log.map((r) => r.startAt).sort((x, y) => x - y), [12, 13, 13 + 1 / 3, 13 + 2 / 3]), "준비 박 2박 뒤에 시작: " + f.log.map((r) => r.startAt).join(", "));
});
test("AU-03", "새 재생을 시작하면 앞선 예약이 시작 전에 취소된다", () => {
  const f = fakeAudio(); schedule(f.A, planRun("listen", orderById("d2-02"), { slow: false, first: false }), 10);
  ok(f.A.group.size() > 4 && f.log.every((r) => r.startAt > f.A.ctx.currentTime && !r.cancelled), "예약만 한 상태");
  f.A.group.silence();
  ok(f.log.length === 4 && f.log.every((r) => r.cancelled) && f.A.group.size() === 0, "묶음 취소: 시작하지 않은 음까지 전부 멈춘다");
});
test("AU-04", "연속 듣기: 원래 소리 4번, 조각 음 12번", () => {
  const p = planRun("listen", orderById("d4-05"), { slow: false, first: false });
  ok(closeTo(tones(p, 67), [0, 1, 2, 3]), "원래 소리 " + tones(p, 67).join(", "));
  ok(closeTo(tones(p, 79), [4, 4.5, 5, 5 + 1 / 3, 5 + 2 / 3, 6, 6.25, 6.5, 6.75, 7, 7 + 1 / 3, 7 + 2 / 3]) && p.span === 8, "조각 음 12번");
  const s = planScene(SCENES.S4.rows, 1);
  ok(closeTo(tones(s, 67), [0, 2]) && closeTo(tones(s, 79), [1, 4 / 3, 5 / 3, 4, 14 / 3, 16 / 3]) && s.span === 6 && s.parts.length === 2, "발견 장면은 줄마다 이어서");
});
test("AU-05", "소리 시계가 멈추면 중단하고 \"소리 켜기\"를 보여 준다", () => {
  const stalled = makeStall();
  ok(!stalled(1, 0) && !stalled(1.1, 100) && !stalled(1.1, 500) && !stalled(1.1, 900) && stalled(1.1, 901), "0.8초 넘게 그대로면 정지");
  ok(!stalled(1.2, 1000) && !stalled(1.2, 1700), "시계가 다시 가면 풀린다");
  ok(clockStuck(5, 5, 1300) && !clockStuck(5.2, 5, 1300) && !clockStuck(5, 5, 800), "시작 1.2초 뒤에도 그대로면 화면 시계로");
  ok(soundOn("running") && !soundOn("suspended") && !soundOn(null) && !soundOn(undefined), "running이 아니면 소리 켜기를 보여 준다");
  const s = Object.assign(S0(), { phase: "slice", sub: "run", hearing: true }), p = T.abort(s, false), h = T.abort(s, true);
  ok(p.sub === "ready" && p.msg.tone === "warn" && p.msg.text === "소리가 멈춰서 중단했어요. 소리를 켜고 다시 시작해 주세요." && h.sub === undefined && h.hearing === false, "중단하면 준비 상태로 돌아가 알린다");
});
test("AU-06", "기계 썰기의 칼 소리 시각 = 칼집 시각", () => {
  const p = planRun("machine", orderById("d2-02"), { slow: false, first: true }), k = p.ev.filter((e) => e.type === "knife").map((e) => e.t);
  ok(closeTo(k, [1 / 3, 2 / 3, 4 / 3, 5 / 3, 7 / 3, 8 / 3, 10 / 3, 11 / 3]) && same(k, p.auto) && p.countIn === 4 && closeTo(tones(p, 79), [0, 1, 2, 3]), "1박 3조각 × 4덩이: 칼질 8번, 첫 음 4번, 그날 첫 썰기는 준비 박 4박");
  const q = planRun("machine", orderById("d4-05"), { slow: true, first: false });
  ok(closeTo(q.auto, [0.5, 4 / 3, 5 / 3, 2.25, 2.5, 2.75, 10 / 3, 11 / 3]) && q.countIn === 2 && near(q.beat, 6 / 5), "연속 주문: 칼질 8번. 느리게는 ♩=50");
  ok(planRun("slice", orderById("d2-02"), { slow: false, first: false }).ev.every((e) => e.type !== "knife"), "직접 썰 때는 칼 소리를 예약하지 않는다");
  ok(same(judge(p.auto, p.Tb, p.ns, p.beat * 1000).grade, "master"), "기계의 칼질은 장인 판정");
});
