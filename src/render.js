let renderedScreen = "";
let renderedSheet = false;
let renderedPhase = "";
function render() {
  const switched = renderedScreen !== S.screen, previousSheet = renderedSheet;
  const work = S.screen === "shift" || S.screen === "free";
  $("app").dataset.mode = S.screen;
  $("app").dataset.sub = S.sub;
  $("app").dataset.motion = save?.settings.motion || "system";
  document.querySelectorAll("#app > .screen").forEach((el) => el.toggleAttribute("hidden", el.dataset.screen !== S.screen));
  for (const id of ["hud", "order", "shelf", "board", "readoutRow", "controls"]) $(id).toggleAttribute("hidden", !work);
  $("sheet").toggleAttribute("hidden", !work || !S.sheet);
  $("quit").toggleAttribute("hidden", S.screen !== "shift");
  $("setGuide").checked = S.guideNow;
  $("setSlow").checked = S.slow;
  $("offOut").textContent = S.offset + "ms";
  $("openSet").setAttribute("aria-expanded", String(S.sheet));

  if (switched && work) measure();
  if (switched && S.screen !== "intro") stopIntro();
  if (S.screen === "intro") { renderIntro(); renderIntroAudio(); }
  if (S.screen === "title") {
    const active = !!fromActive(S, save.active);
    $("resume").toggleAttribute("hidden", !active);
    $("start").classList.toggle("pri", !active);
  }
  if (S.screen === "map") renderMap();
  if (S.screen === "close") renderClose();
  if (S.screen === "calib" && typeof renderCalibration === "function") renderCalibration();
  if (S.screen === "sound") renderSound();
  if (typeof renderExtras === "function") renderExtras();
  if (S.screen === "shift") renderWorkbench();
  renderCoach();

  renderedScreen = S.screen;
  renderedSheet = S.sheet;
  const phaseChanged = renderedPhase !== S.phase;
  renderedPhase = S.phase;
  if (switched && !S.dev) {
    const activeScreen = document.querySelector("#app > .screen:not([hidden])");
    const target = work ? $("hudTitle") : activeScreen?.querySelector("h1, button");
    if (target) { target.tabIndex = -1; target.focus({ preventScroll: true }); }
  } else if (work && S.sheet !== previousSheet) {
    (S.sheet ? $("setGuide") : $("openSet")).focus({ preventScroll: true });
  } else if (work && phaseChanged && document.activeElement.closest("[hidden]")) {
    const target = $("controls").querySelector(".grp:not([hidden]) button:not([disabled])");
    target?.focus({ preventScroll: true });
  }
}

const tutorialStep = () => Number(save?.settings.tutorialStep) || 0;
function advanceTutorial(step) {
  if (S.dev || tutorialStep() >= step) return;
  save.settings = { ...save.settings, tutorialStep: step, tutorialSeen: step === 4 };
  store.save(save);
}
function renderCoach() {
  const bubble = $("coach");
  const o = S.screen === "shift" ? orderAt(S) : null;
  const inlineHelp = (o?.id === "d0-01" && S.phase === "pick") || (o?.id === "d1-01" && S.phase === "mark");
  const c = inlineHelp ? null : coachFor(S, o, tutorialStep());
  bubble.toggleAttribute("hidden", !c);
  if (!c) return;
  const anchor = $(c.target).getBoundingClientRect(), app = $("app").getBoundingClientRect();
  bubble.dataset.target = c.target;
  bubble.dataset.interactive = String(!!c.choices);
  $("coachText").textContent = c.text;
  $("coachChoices").toggleAttribute("hidden", !c.choices);
  bubble.style.bottom = Math.max(8, app.bottom - anchor.top + 4) + "px";
}
function renderSound() {
  $("soundGuide").textContent = S.soundHelp ? "무음 스위치와 음량을 확인해 주세요. 소리 없이도 고르기, 재단, 이름표는 할 수 있어요." : "소리를 듣고 들리는지 확인해요.";
  $("sampleSound").textContent = S.soundHelp ? "다시 듣기" : "소리 듣기";
  $("skipSound").toggleAttribute("hidden", !S.soundHelp);
}
