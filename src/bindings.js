$("ship").addEventListener("click", () => { if (S.screen === "shift") act(T.toDeliver(S, orderAt(S))); });
$("again").addEventListener("click", () => begin("listen"));
$("next").addEventListener("click", goNext);
$("orderPlay").addEventListener("click", () => {
  if (save.settings.muted) { setSetting("muted", false, {}); syncAudioVolume(); }
  if (save.settings.volume === 0) { setSetting("volume", defaultSave().settings.volume, {}); syncAudioVolume(); }
  begin("hear");
});
document.addEventListener("visibilitychange", () => { if (document.hidden && run) abortRun(); });

$("sceneHear").addEventListener("click", () => begin("scene"));
$("sceneOk").addEventListener("click", () => {
  if (typeof returnToBookScene === "function" && returnToBookScene()) return;
  act(T.sceneDone(S));
});
$("restart").addEventListener("click", () => {
  if (!S.dev) { openDay(S.day, { checkSound: false }); return; }
  stopRun(false);
  setState({ ...startDay(S, S.day), dev: true, unlockedNext: false });
});
$("toTitle").addEventListener("click", () => { stopRun(false); setState({ screen: "map" }); });
$("start").addEventListener("click", () => setState({ screen: "map" }));
$("mapBack").addEventListener("click", () => setState({ screen: "title" }));
$("days").addEventListener("click", (e) => {
  const b = e.target.closest("button[data-day]");
  if (b && !b.disabled) openDay(b.dataset.day);
});
$("nextDay").addEventListener("click", () => {
  const next = DAYS[DAYS.indexOf(dayOf(S.day)) + 1];
  if (next && S.unlockedNext) openDay(next.id);
});

$("openSet").addEventListener("click", () => {
  if (!S.sheet && run) abortRun();
  setState({ sheet: !S.sheet });
});
$("closeSet").addEventListener("click", () => setState({ sheet: false }));
$("quit").addEventListener("click", () => {
  stopRun(false);
  setState({ screen: "map", sheet: false });
});
$("setGuide").addEventListener("change", (e) => setSetting("guide", e.target.checked, { guide: e.target.checked, guideNow: e.target.checked }));
$("setSlow").addEventListener("change", (e) => setSetting("slow", e.target.checked, { slow: e.target.checked }));
$("offMinus").addEventListener("click", () => { const v = Math.max(-100, S.offset - 10); setSetting("tapOffsetMs", v, { offset: v }); });
$("offPlus").addEventListener("click", () => { const v = Math.min(200, S.offset + 10); setSetting("tapOffsetMs", v, { offset: v }); });
$("resume").addEventListener("click", () => {
  const p = fromActive(S, save.active);
  if (p) { stopRun(false); setState({ ...p, sheet: false, unlockedNext: false }); }
});

$("sampleSound").addEventListener("click", () => {
  const a = audio();
  if (a) {
    AUDIO.group.silence();
    tone(AUDIO, 79, a.currentTime + 0.04, 0.20, 0.25, false);
  }
});
function completeSoundCheck() { advanceTutorial(1); openDay("d0", { checkSound: false }); }
$("heard").addEventListener("click", completeSoundCheck);
$("skipSound").addEventListener("click", completeSoundCheck);
$("notHeard").addEventListener("click", () => setState({ soundHelp: true }));
$("coachNo").addEventListener("click", () => { advanceTutorial(4); renderCoach(); $("pad").focus(); });
$("coachYes").addEventListener("click", () => { advanceTutorial(4); openCalibration(); });
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && S.sheet) { e.preventDefault(); setState({ sheet: false }); }
});
window.addEventListener("hashchange", () => location.reload());
$("refresh").addEventListener("click", () => location.reload());
let fatalErrorShown = false;
function showFatalError(event) {
  if (fatalErrorShown) return;
  fatalErrorShown = true;
  console.error("식빵 공방 실행 오류", event.error || event.reason || event.message);
  stopRun(false);
  setState({ screen: "error", sheet: false });
}
window.addEventListener("error", showFatalError);
window.addEventListener("unhandledrejection", showFatalError);

function motionReduced() {
  const mode = save.settings.motion;
  return mode === "reduced" || (mode === "system" && matchMedia("(prefers-reduced-motion: reduce)").matches);
}
window.__sbg = { state: () => S, run: () => run, clock: () => clock(), audioCtx: () => ctx, lastJudge: () => lastJudge, laneLw: () => laneLw, saved: () => save, orderAt, choicesOf, labelKo, labelBeats, queueOf, dayOf };
