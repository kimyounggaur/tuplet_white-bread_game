let calibReturnFocus = null;
let calibEndedAt = -Infinity;

function openCalibration() {
  if (S.screen === "calib") return;
  const focused = document.activeElement;
  calibReturnFocus = focused && focused.closest("#sheet") ? $("openSet") : focused;
  calibEndedAt = -Infinity;
  if (run) abortRun();
  setState({ screen: "calib", sheet: false, calibFrom: S.screen, calibResult: null, calibMessage: "", calibActive: false });
  $("calibPad").focus();
}

function stopCalibration() {
  cancelAnimationFrame(raf);
  raf = 0;
  run = null;
  if (AUDIO) AUDIO.group.silence();
  calibEndedAt = performance.now();
}

function closeCalibration() {
  if (S.screen !== "calib") return;
  if (run && run.kind === "calib") stopCalibration();
  setState({ screen: S.calibFrom, calibActive: false });
  if (calibReturnFocus && !calibReturnFocus.closest("[hidden]")) calibReturnFocus.focus();
  calibReturnFocus = null;
}

function beginCalibration() {
  if (S.screen !== "calib" || (run && run.kind === "calib")) return;
  const a = audio();
  if (!a || masterGain(save.settings) === 0) {
    setState({ calibResult: null, calibMessage: "소리를 켜야 박자를 맞출 수 있어요.", calibActive: false });
    return;
  }
  AUDIO.group.silence();
  const p = planCalib();
  const ctx0 = a.currentTime, t0 = ctx0 + 0.12;
  run = Object.assign(p, { perf: false, t0, tb0: t0, taps: [], ctx0, p0: performance.now(), stalled: makeStall(), end: t0 + p.span * p.beat });
  schedule(AUDIO, p, t0);
  setState({ calibResult: null, calibMessage: "", calibActive: true });
  raf = requestAnimationFrame(frame);
}

function abortCalibration(message = "소리가 멈췄어요. 소리를 켜고 다시 시작해 주세요.") {
  stopCalibration();
  setState({ calibResult: null, calibMessage: message, calibActive: false });
}

function frameCalibration(r) {
  const ms = performance.now();
  if (clockStuck(ctx.currentTime, r.ctx0, ms - r.p0)) {
    abortCalibration("소리를 켜야 박자를 맞출 수 있어요.");
    return;
  }
  const now = clock();
  if (r.stalled(now, ms) && ctx.currentTime !== r.ctx0) {
    abortCalibration();
    return;
  }
  if (now >= r.end) {
    finishCalibration(r);
    return;
  }
  raf = requestAnimationFrame(frame);
}

function finishCalibration(r) {
  stopCalibration();
  const clicks = r.ev.map((e) => r.tb0 + e.t * r.beat);
  const measured = calibOffset(r.taps, clicks);
  const value = measured === null ? null : Math.max(-100, Math.min(200, measured));
  let message = "탭이 모자라요. 메트로놈을 듣고 다시 해 볼까요?";
  if (value !== null) {
    if (value === 0) message = "탭과 박이 맞아요. 저장하면 탭 보정은 0ms가 돼요.";
    else if (value < 0) message = `탭이 박보다 ${Math.abs(value)} ms 빨라요. 저장하면 판정에서 그만큼 보정해요.`;
    else message = `탭이 박보다 ${value} ms 늦어요. 저장하면 판정에서 그만큼 빼 줘요.`;
  }
  setState({ calibResult: value, calibMessage: message, calibActive: false });
}

function calibrationTap() {
  if (!run || run.kind !== "calib") return;
  const now = clock();
  if (now > run.tb0 - 0.25 && now < run.end) run.taps.push(now);
}

function renderCalibration() {
  const result = $("calibOut");
  const pad = $("calibPad");
  const active = S.calibActive;
  const label = active ? "여기를 탭!" : "시작하기";
  if (pad.textContent !== label) pad.textContent = label;
  if (result.textContent !== S.calibMessage) result.textContent = S.calibMessage;
  pad.classList.toggle("live", active);
  $("calibRetry").disabled = active;
  $("calibSave").disabled = active || S.calibResult === null;
}

function bindCalibration() {
  const pad = $("calibPad");
  let pointerTap = false;
  let keyTap = "";
  const acceptTapKey = (e) => isTapKey(e) && (!e.target.closest || !e.target.closest("button") || e.target === pad);
  $("openCalib").addEventListener("click", openCalibration);
  pad.addEventListener("pointerdown", () => {
    pointerTap = !!run && run.kind === "calib";
    if (pointerTap) calibrationTap();
  });
  pad.addEventListener("pointercancel", () => { pointerTap = false; });
  pad.addEventListener("click", () => {
    if (pointerTap) { pointerTap = false; return; }
    if (performance.now() - calibEndedAt >= 600) begin("calib");
  });
  $("calibRetry").addEventListener("click", () => begin("calib"));
  $("calibClose").addEventListener("click", closeCalibration);
  $("calibSave").addEventListener("click", () => {
    if (S.calibResult === null || S.calibActive) return;
    setSetting("tapOffsetMs", S.calibResult, { offset: S.calibResult });
    save.settings.calibrated = true;
    store.save(save);
    closeCalibration();
  });
  window.addEventListener("keydown", (e) => {
    if (S.screen !== "calib" || e.defaultPrevented) return;
    if (e.code === "Escape") { e.preventDefault(); closeCalibration(); return; }
    if (!run || run.kind !== "calib" || !acceptTapKey(e)) return;
    e.preventDefault();
    if (e.repeat) return;
    keyTap = e.code;
    calibrationTap();
  });
  window.addEventListener("keyup", (e) => {
    if (S.screen !== "calib" || e.code !== keyTap) return;
    e.preventDefault();
    keyTap = "";
  });
}
