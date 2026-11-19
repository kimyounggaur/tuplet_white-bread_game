// ── 재생: 계획을 예약하고, 프레임마다 "지금 들리는 시각"으로 커서와 강조를 옮긴다. 타이머로 음을 잇지 않는다 ──
function begin(kind, plan = null) {  // kind: hear · listen · slice · machine · scene
  if (kind === "calib") return beginCalibration();
  const hearLike = kind === "hear" || kind === "listen" || kind === "scene";
  if (kind === "slice" && restartBlocked(performance.now(), S.endedAt)) return;
  stopRun(hearLike);  // 앞선 재생을 묶음으로 취소한다. 썰기를 새로 시작하면 칼질 표시도 지운다
  const a = audio(), p = plan || (kind === "scene" ? planScene(SCENES[S.scene].rows, beatSec(S.slow ? 50 : 60)) : planRun(kind, orderAt(S), { slow: S.screen !== "free" && S.slow, first: !S.sliced }));
  const t0 = (a ? a.currentTime : performance.now() / 1000) + 0.12;
  const r = Object.assign(p, { perf: !a, t0, tb0: t0 + p.countIn * p.beat, taps: [], ctx0: a ? a.currentTime : 0, p0: performance.now(), on: "", ai: 0, stalled: makeStall() });
  r.end = r.tb0 + r.span * r.beat + 0.3;
  if (a) schedule(AUDIO, p, t0);
  run = r;
  setState(kind === "hear" ? { hearing: true } : hearLike ? { sub: "listen", label: "", hearing: false } : { sub: "count", label: "1", hearing: false, sliced: true });
  raf = requestAnimationFrame(frame);
}
const laneLeft = (frac) => frac * laneLw + "%";
const laneOf = (row) => ((S.phase === "scene" || (S.screen === "free" && S.free?.mode === "browse")) ? $("board").querySelector(`.lane[data-row="${row}"]`) : $("lane"));
function drawCut(b, r) {
  const lane = $("lane"); if (!lane) return;
  const c = document.createElement("b");
  c.className = "cut"; c.style.left = laneLeft(b / r.total);
  lane.insertBefore(c, $("cursor"));
}
function paintOn(key) {  // key: "w줄.덩이"(덩이 전체) 또는 "s줄.덩이.조각"
  $("board").querySelectorAll(".on").forEach((e) => e.classList.remove("on"));
  if (!key) return;
  const [row, q, i] = key.slice(1).split(".").map(Number), lane = laneOf(row), loaf = lane && lane.querySelectorAll(".loaf")[q];
  if (!loaf) return;
  if (key[0] === "w") { loaf.classList.add("on"); return; }
  const s = loaf.querySelectorAll(".slice")[i];
  if (s) s.classList.add("on");
}
function frame() {
  const r = run;
  if (!r) return;
  if (r.kind === "calib") return frameCalibration(r);
  if (!r.perf && clockStuck(ctx.currentTime, r.ctx0, performance.now() - r.p0)) {  // 소리가 거부되면 화면 시계로 이어 간다. 예약한 소리는 취소한다
    const shift = performance.now() / 1000 + 0.1 - r.t0;
    r.perf = true; r.t0 += shift; r.tb0 += shift; r.end += shift; AUDIO.group.silence();
  }
  const now = clock(), b = (now - r.tb0) / r.beat, cur = $("cursor");
  if (!r.perf && r.stalled(now, performance.now()) && ctx.currentTime !== r.ctx0) { abortRun(); return; }  // 시작한 뒤에 소리 시계가 서 있으면 중단한다(R13)
  if (r.kind === "hear") {
    if (now >= r.end) { stopRun(true); setState({ hearing: false }); return; }
    raf = requestAnimationFrame(frame); return;
  }
  if (b < 0) {
    if (r.passes === 0) { const lbl = String(Math.min(r.countIn, Math.max(1, r.countIn - Math.ceil(-b) + 1))); if (S.sub !== "count" || S.label !== lbl) setState({ sub: "count", label: lbl }); }
  } else if (r.passes) {  // 듣기: 원래 소리에서는 덩이 전체, 조각 리듬에서는 조각이 차례로 밝아진다
    const part = r.parts.find((x) => b < x.at + x.pass * r.passes) || r.parts[r.parts.length - 1];
    const bl = b - part.at, first = r.passes === 1 || bl < part.pass, b2 = first ? bl : bl - part.pass, q = Math.min(part.R - 1, Math.floor(b2 / part.Tb));
    const key = b2 >= part.total ? "" : first ? "w" + part.row + "." + q : "s" + part.row + "." + q + "." + Math.floor(((b2 - q * part.Tb) / part.Tb) * part.ns[q]);
    if (key !== r.on) { r.on = key; paintOn(key); }
    if (cur) cur.style.left = laneLeft(Math.min(b2, part.total) / part.total);
    const lbl = first ? "원래 소리" : "조각 리듬";
    if (S.label !== lbl) setState({ label: lbl });
  } else {  // 썰기: 칼이 일정한 속도로 지나간다
    if (cur) cur.style.left = laneLeft(Math.min(b, r.total) / r.total);
    while (r.ai < r.auto.length && b >= r.auto[r.ai]) { drawCut(r.auto[r.ai], r); r.taps.push(r.auto[r.ai]); r.ai++; }
    if (S.sub !== "run") setState({ sub: "run", label: "" });
  }
  if (now >= r.end) { finish(); return; }
  raf = requestAnimationFrame(frame);
}
function tap() {  // 탭한 순간 칼이 있던 자리가 잘린다
  const r = run;
  if (!r || r.kind !== "slice") return;
  const b = (clock() - S.offset / 1000 - r.tb0) / r.beat;
  if (b < 0 || b > r.total) return;  // 시작 전과 끝난 뒤의 탭은 버린다
  r.taps.push(b);
  if (ctx && !r.perf) knifeSound(AUDIO, ctx.currentTime);
  if (b > 0 && b < r.total) drawCut(b, r);
  const blade = $("cursor");
  if (blade && !motionReduced()) {
    blade.animate([{ transform: "translateY(-4px)" }, { transform: "translateY(5px)", offset: 0.5 }, { transform: "translateY(0)" }], { duration: 80 });
  }
}
function abortRun() {
  if (run && run.kind === "calib") return abortCalibration();
  const hear = !!run && run.kind === "hear";
  stopRun(false);
  setState(T.abort(S, hear));
}
let lastJudge = null;
function finish() {
  const r = run;
  stopRun(true);
  if (r.passes) { setState({ sub: "ready", label: "" }); return; }
  const j = judge(r.taps, r.Tb, r.ns, r.beat * 1000), lane = $("lane"), before = lane.querySelector(".cut") || $("cursor");
  j.loaves.forEach((l, q) => {  // 두껍거나 얇은 조각에 색을 얹는다
    let x = q * r.Tb;
    const piece = r.Tb / l.n;
    l.widths.forEach((w) => {
      const d = w / piece - 1;
      if (Math.abs(d) > 0.15) { const e = document.createElement("i"); e.className = "dev " + (d > 0 ? "thick" : "thin"); e.style.left = laneLeft(x / r.total); e.style.width = laneLeft(w / r.total); lane.insertBefore(e, before); }
      x += w;
    });
  });
  lastJudge = j;
  setState(T.sliced(S, r.kind, j, performance.now()));
}
function stopRun(keepMarks) {
  cancelAnimationFrame(raf); raf = 0; run = null;
  if (AUDIO) AUDIO.group.silence();
  $("board").querySelectorAll(".on").forEach((e) => e.classList.remove("on"));
  const lane = $("lane");
  if (lane && !keepMarks) { lane.querySelectorAll(".cut,.dev").forEach((e) => e.remove()); const c = $("cursor"); if (c) c.style.left = "0%"; }
}
