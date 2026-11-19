// 맛보기는 준비 박 없이 한 덩이의 길이만 재생한다.
function introPlan(n, bpm = 60) {
  if (n !== 2 && n !== 3) throw new RangeError("맛보기 조각 수가 범위를 벗어났어요.");
  const spec = specOf(4, n), beat = beatSec(bpm), total = num(toBeats(spec.T));
  const pieceSeconds = num(toBeats(spec.piece)) * beat;
  const ev = onsets(spec).map((at) => ({
    t: num(toBeats(at)), type: "tone", midi: 79,
    dur: Math.min(0.22, pieceSeconds * 0.9), peak: 0.36, hold: false,
  }));
  return { n, Tb: total, beat, total, countIn: 0, span: total, ev };
}

let introRun = null;
let introRaf = 0;
let introToken = 0;
let introAudioBound = false;
let introMuted = false;

function introPlaybackState() {
  return {
    active: !!introRun, token: introToken, n: introRun?.plan.n || null,
    clock: introRun?.clock || null, elapsed: introRun?.elapsed || 0,
    scheduled: introRun?.scheduled || 0, groupSize: introRun?.source?.group.size() || 0,
  };
}
function introReadyToPlay() {
  return S.screen === "intro" && S.intro.stage === "compare" && !document.hidden;
}
function introAudioText(text) {
  introText("introAudioStatus", text);
}
function resetIntroPlaybackVisuals() {
  for (const n of [2, 3]) {
    const row = $("introRow" + n);
    row.classList.remove("intro-playing", "intro-finished", "intro-reduced");
    row.querySelectorAll(".intro-piece").forEach((piece) => piece.classList.remove("intro-current"));
    const line = row.querySelector(".intro-playhead");
    if (line) { line.hidden = true; line.style.left = "0%"; }
    $("introListen" + n).setAttribute("aria-pressed", "false");
    const label = $("introPlaying" + n);
    if (label) label.textContent = "";
  }
}
function disposeIntroSource(r) {
  if (!r?.source) return;
  r.source.group.silence();
  r.source.out.disconnect();
  r.source.ctx.removeEventListener("statechange", r.onAudioState);
  r.source = null;
}
function stopIntro() {
  introToken++;
  cancelAnimationFrame(introRaf);
  introRaf = 0;
  disposeIntroSource(introRun);
  introRun = null;
  resetIntroPlaybackVisuals();
}
function introVisualFallback(r) {
  disposeIntroSource(r);
  r.clock = "visual";
  r.perfStart = performance.now() / 1000 - r.elapsed;
  r.scheduled = 0;
  introAudioText("소리 없이도 비교할 수 있어요.");
}
function renderIntroAudio() {
  if (S.screen !== "intro") return;
  $("introMute").hidden = false;
  $("introMute").textContent = introMuted ? "소리 켜기" : "소리 끄기";
  $("introMute").setAttribute("aria-pressed", String(introMuted));
  for (const n of [2, 3]) {
    $("introListen" + n).disabled = false;
    const loaf = $("introLoaf" + n), row = $("introRow" + n);
    if (!loaf.querySelector(".intro-playhead")) {
      const line = document.createElement("span");
      line.className = "intro-playhead";
      line.setAttribute("aria-hidden", "true");
      line.hidden = true;
      loaf.append(line);
    }
    if (!$("introPlaying" + n)) {
      const label = document.createElement("span");
      label.id = "introPlaying" + n;
      label.className = "intro-playing-label";
      row.querySelector(".intro-row-heading").append(label);
    }
  }
}
function playIntro(n) {
  if (!introReadyToPlay()) return;
  stopIntro();
  renderIntroAudio();
  const plan = introPlan(n), token = introToken;
  const r = {
    plan, token, source: null, scheduled: 0, elapsed: 0, current: -1,
    clock: "visual", perfStart: performance.now() / 1000,
    audioStart: 0, stalled: makeStall(), onAudioState: null,
  };
  introRun = r;
  const a = audio();
  // Suspended resume promises never schedule late sounds for this playback.
  const volume = masterGain({ ...save.settings, muted: false });
  if (a?.state === "running" && !introMuted && volume > 0) {
    try {
      const out = a.createGain();
      out.gain.value = volume;
      out.connect(a.destination);
      r.source = { ctx: a, out, noise: AUDIO.noise, group: makeGroup() };
      r.onAudioState = () => {
        if (introRun === r && a.state !== "running") introVisualFallback(r);
      };
      a.addEventListener("statechange", r.onAudioState);
      r.clock = "audio";
      r.audioStart = a.currentTime + 0.04;
      schedule(r.source, plan, r.audioStart);
      r.scheduled = plan.ev.length;
    } catch (error) {
      introVisualFallback(r);
    }
  }
  const row = $("introRow" + n);
  row.classList.add("intro-playing");
  row.classList.toggle("intro-reduced", motionReduced());
  $("introListen" + n).setAttribute("aria-pressed", "true");
  $("introPlaying" + n).textContent = "재생 중";
  introAudioText(r.clock === "audio" ? "선택한 줄이 한 박 동안 재생돼요." : "소리 없이도 비교할 수 있어요.");
  introRaf = requestAnimationFrame(frameIntro);
}
function frameIntro() {
  const r = introRun;
  if (!r || r.token !== introToken) return;
  if (!introReadyToPlay()) { stopIntro(); return; }
  const perfNow = performance.now();
  if (r.clock === "audio") {
    const a = r.source.ctx;
    const now = a.currentTime - (a.outputLatency || a.baseLatency || 0);
    r.elapsed = Math.max(0, now - r.audioStart);
    if (r.stalled(now, perfNow)) introVisualFallback(r);
  } else r.elapsed = Math.max(0, perfNow / 1000 - r.perfStart);
  const duration = r.plan.total * r.plan.beat;
  const fraction = Math.min(1, r.elapsed / duration), finished = fraction >= 1;
  const index = finished ? -1 : Math.min(r.plan.n - 1, Math.floor(fraction * r.plan.n));
  const row = $("introRow" + r.plan.n), line = row.querySelector(".intro-playhead");
  const reduced = motionReduced();
  row.classList.toggle("intro-reduced", reduced);
  line.hidden = reduced || finished;
  if (!reduced) line.style.left = fraction * 100 + "%";
  if (index !== r.current) {
    r.current = index;
    row.querySelectorAll(".intro-piece").forEach((piece, i) => piece.classList.toggle("intro-current", i === index));
  }
  if (finished) {
    disposeIntroSource(r);
    introRun = null;
    introRaf = 0;
    row.classList.remove("intro-playing");
    row.classList.add("intro-finished");
    $("introListen" + r.plan.n).setAttribute("aria-pressed", "false");
    $("introPlaying" + r.plan.n).textContent = "한 박 끝";
    introAudioText("재생이 끝났어요. 두 줄은 같은 한 박이에요.");
    return;
  }
  introRaf = requestAnimationFrame(frameIntro);
}
function bindIntroAudio() {
  if (introAudioBound) return;
  introAudioBound = true;
  introMuted = !!save.settings.muted;
  for (const n of [2, 3]) $("introListen" + n).addEventListener("click", () => playIntro(n));
  $("introMute").addEventListener("click", () => {
    stopIntro();
    introMuted = !introMuted;
    renderIntroAudio();
    introAudioText(introMuted ? "소리 없이도 비교할 수 있어요." : "듣기 버튼을 눌러 소리를 확인해요.");
  });
  $("introAudioStatus").setAttribute("role", "status");
  $("introAudioStatus").setAttribute("aria-live", "polite");
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) stopIntro();
  });
  window.addEventListener("pagehide", stopIntro);
  window.addEventListener("hashchange", stopIntro);
}
