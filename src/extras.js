// 레시피북
let bookKey = "";
function recipeParts(key) {
  const [loaf, n = 1] = String(key).split("/").map(Number);
  return { loaf, n };
}
function cardName(key) {
  const { loaf, n } = recipeParts(key);
  const known = DENS.includes(loaf) && Number.isInteger(n) && n >= 1 && n <= 4;
  if (!known) return "레시피 카드";
  return n === 1 ? noteKo(loaf) + " 식빵" : splitKo(specOf(loaf, n));
}
function recipeArt(loaf, n) {
  const slices = Array.from({ length: n }, (_, i) => `<i class="slice" style="left:${i * 100 / n}%;width:${100 / n}%;--hue:${hue(i)}"></i>`).join("");
  return `<div class="recipe-art" aria-hidden="true"><div class="loaf" style="left:0;width:${shelfPct(loaf)}%">${slices}</div></div>`;
}
function recipeCard(key) {
  const { loaf, n } = recipeParts(key), record = save.recipes[key];
  const acquired = n === 1 ? save.loaves.includes(loaf) : record?.got;
  if (!acquired) {
    const first = ORDERS.find((o) => o.ask !== "pick" && o.loaf === loaf && o.ns.length === 1 && o.ns[0] === n);
    const stage = n === 1 ? 0 : DAYS.indexOf(dayOf(first.day));
    return `<article class="recipe-card locked" data-card="${key}"><h3>아직 없어요</h3><p>${stage}단</p></article>`;
  }
  const spec = specOf(loaf, n), label = labelOf(spec), name = cardName(key);
  const details = n === 1 ? "" : `<p>한 조각 ${beatsKo(toBeats(spec.piece))}</p><p>최고 칼솜씨 · ${KNIFE[record.knife] || KNIFE[0]}</p>`;
  const score = notesSvg(label, evenXs(n, 128), 128, 46, true, "var(--panel)");
  return `<article class="recipe-card" data-card="${key}"><h3>${name}</h3>${recipeArt(loaf, n)}<svg class="recipe-score" viewBox="0 0 128 46" role="img" aria-label="${labelKo(label)}">${score}</svg>${details}<button class="btn" type="button" data-recipe-play="${key}" aria-label="${name} 들어 보기">들어 보기</button></article>`;
}
function renderBook() {
  const key = JSON.stringify([save.days, save.loaves, save.recipes]);
  if (key === bookKey) return;
  bookKey = key;
  const stamps = DAYS.filter((d) => (save.days[d.id]?.stamp || 0) > 0);
  $("bookStamps").textContent = `도장 ${stamps.length}/${DAYS.length} · 장인 도장 ${stamps.filter((d) => save.days[d.id].stamp === 2).length}`;
  $("bookCards").innerHTML = cardList().map(recipeCard).join("");
  $("bookScenes").innerHTML = Object.keys(SCENES).map((id) => {
    const d = sceneDayOf(id), locked = !save.days[d.id];
    return `<button class="btn" type="button" data-book-scene="${id}" ${locked ? "disabled" : ""}>${sceneText(id)[0]}${locked ? `<small> · ${DAYS.indexOf(d)}단 마감 후 열려요</small>` : ""}</button>`;
  }).join("");
}
const sceneDayOf = (id) => DAYS.find((d) => Object.values(d.scenes).includes(id));
function playRecipe(key) {
  const { loaf, n } = recipeParts(key), a = audio();
  stopRun(false);
  if (!a) return;
  const o = { ask: n === 1 ? "pick" : "word", loaf, ns: [n], bpm: 60 };
  schedule(AUDIO, planRun("listen", o, { slow: false, first: false }), a.currentTime + 0.12);
}
function openBookScene(id) {
  const d = sceneDayOf(id);
  if (!d || !save.days[d.id]) return;
  const idx = Number(Object.keys(d.scenes).find((k) => d.scenes[k] === id));
  const results = Array.from({ length: idx }, () => ({ recipe: "full", knife: "", ng: false }));
  const at = Object.assign({}, S, { day: d.id });
  stopRun(false);
  setState({ screen: "shift", day: d.id, sliced: false, cards: [], dev: true, sum: null, back: "book", ...openAt(at, idx, results) });
}
function returnToBookScene() {
  if (S.back !== "book") return false;
  const scene = S.scene;
  stopRun(false);
  setState({ screen: "book", dev: false, back: "", sheet: false });
  $("bookScenes").querySelector(`[data-book-scene="${scene}"]`)?.focus();
  return true;
}

// 자유 도마
const defaultFree = () => ({ rows: [{ loaf: 4, n: 2 }, { loaf: 2, n: 3 }], focus: 0, compare: false, bpm: 60, mode: "browse" });
const freeMax = (loaf) => (specOf(loaf, 4).unitDen <= 16 ? 4 : 3);
function freeOrder(free) {
  const { loaf, n } = free.rows[free.focus];
  return { id: "free", ask: "word", by: "", loaf, ns: [n], label: "", mold: true, count: true, guide: true, bpm: free.bpm };
}
function setFree(free, entering = false) {
  stopRun(false);
  const { loaf, n } = free.rows[free.focus];
  setState({ screen: "free", phase: free.mode === "rhythm" ? "slice" : "mark", sub: "ready", dev: true, back: "", free,
    sel: loaf, cuts: [n - 1], sliced: entering ? false : S.sliced, guideNow: S.guide,
    label: "", knife: "", ng: false, endedAt: -1e9, ghost: null, msg: say("", "") });
}
function updateFreeRow(i, row) {
  const free = S.free;
  const rows = free.rows.map((value, index) => index === i ? row : value);
  setFree({ ...free, rows, focus: i });
}
function freePick(loaf) {
  if (S.screen !== "free" || !DENS.includes(loaf)) return;
  const row = S.free.rows[S.free.focus];
  updateFreeRow(S.free.focus, { loaf, n: Math.min(row.n, freeMax(loaf)) });
}
function freeBump(delta, i = S.free.focus) {
  const row = S.free.rows[i], max = freeMax(row.loaf);
  const n = delta === "cycle" ? (row.n === max ? 2 : row.n + 1) : Math.max(2, Math.min(max, row.n + delta));
  updateFreeRow(i, { loaf: row.loaf, n });
}
function freeBrowseBoard(free) {
  const rows = free.compare ? free.rows : [free.rows[0]], key = JSON.stringify(rows) + "/" + free.focus + "/" + boardW;
  const el = $("board");
  if (boardKey === key) return;
  boardKey = key;
  laneLw = 100;
  const active = el.contains(document.activeElement) ? document.activeElement.dataset.freeRow : undefined;
  const span = Math.max(...rows.map((r) => TbOf(r.loaf))), width = Math.max(120, el.clientWidth - 27);
  const html = rows.map(({loaf, n}, q) => {
    const spec = specOf(loaf, n), lw = TbOf(loaf) / span * 100;
    const rowWidth = width * lw / 100;
    const cell = rowWidth / spec.m;
    const piecePx = rowWidth / n, pieceText = beatsKo(toBeats(spec.piece));
    const moldLabel = cell >= 50 ? noteKo(spec.unitDen) : cell >= 26 ? noteShort(spec.unitDen) : "";
    const mold = Array.from({ length: spec.m }, () => `<span>${moldLabel}</span>`).join("");
    const bread = Array.from({ length: n }, (_, i) => `<i class="slice" style="left:${i * 100 / n}%;width:${100 / n}%;--hue:${hue(i)}">${piecePx >= 36 ? pieceText : ""}</i>`).join("");
    const marks = Array.from({ length: n - 1 }, (_, i) => `<b class="mark" style="left:${(i + 1) * 100 / n}%"></b>`).join("");
    const rowName = free.compare ? (q === 0 ? "윗줄 " : "아랫줄 ") : "";
    return `<div class="mold" style="width:${lw}%;" aria-label="보통 칸 ${spec.m}개 · ${noteKo(spec.unitDen)}">${mold}</div><div class="lane" data-row="${q}" style="width:${lw}%"><button class="loaf${free.focus === q ? " focus" : ""}" type="button" data-free-row="${q}" style="left:0;width:100%" aria-label="${rowName}${noteKo(loaf)} ${n}조각. 누르면 조각 수가 바뀌어요">${bread}${marks}</button></div>`;
  }).join("");
  el.innerHTML = html + rulerHtml(span);
  if (active !== undefined) el.querySelector(`button[data-free-row="${active}"]`)?.focus();
}
function renderFreeWorkbench() {
  const free = S.free, browse = free.mode === "browse", o = freeOrder(free);
  $("hudTitle").textContent = "자유 도마";
  $("soundChip").toggleAttribute("hidden", soundOn(ctx && ctx.state));
  $("hud").classList.toggle("nosound", !soundOn(ctx && ctx.state));
  $("dots").innerHTML = "";
  $("orderScore").hidden = true;
  $("orderPlay").hidden = true;
  orderKey = "";
  $("freeTempo").textContent = `♩=${free.bpm}`;
  $("freeTempoDown").disabled = free.bpm <= 40;
  $("freeTempoUp").disabled = free.bpm >= 100;
  $("freeMode").textContent = browse ? "리듬 썰기" : "재단 보기";
  $("freeMode").disabled = free.compare;
  renderShelf(o, true, o.loaf);
  const board = $("board");
  board.classList.toggle("free-browse", browse);
  board.classList.toggle("paired", free.compare);
  $("readout").className = "readout " + S.msg.tone;
  $("cFree").hidden = !browse;
  if (!browse) {
    renderBoard();
    renderControls(o);
    $("ship").hidden = true;
    $("readout").textContent = S.msg.text || `${splitKo(specOf(o.loaf, o.ns[0]))} · 칼집마다 한 번씩 탭해요.`;
    return;
  }
  board.classList.remove("pick", "join", "scene", "run");
  freeBrowseBoard(free);
  $("controls").querySelectorAll(".grp").forEach((group) => { group.hidden = true; });
  const spec = specOf(o.loaf, o.ns[0]);
  const active = free.compare ? (free.focus === 0 ? "윗줄 · " : "아랫줄 · ") : "";
  $("readout").textContent = S.msg.text || `${active}${splitKo(spec)} · 한 조각 ${beatsKo(toBeats(spec.piece))}${S.label ? " · " + S.label : ""}`;
  $("freeCount").textContent = `${spec.n}조각`;
  $("freeLess").disabled = spec.n <= 2;
  $("freeMore").disabled = spec.n >= freeMax(o.loaf);
  $("freeHear").textContent = S.sub === "listen" ? "다시 듣기" : "들어 보기";
  $("freeCompare").setAttribute("aria-pressed", String(free.compare));
  $("freeTop").hidden = !free.compare;
  $("freeBottom").hidden = !free.compare;
  $("freeTop").setAttribute("aria-pressed", String(free.focus === 0));
  $("freeBottom").setAttribute("aria-pressed", String(free.focus === 1));
}
function freePlayback() {
  const free = S.free;
  if (free.compare) begin("scene", planScene(free.rows, beatSec(free.bpm)));
  else begin("listen", planRun("listen", freeOrder(free), { slow: false, first: false }));
}
function extraBack() {
  stopRun(false);
  setState({ screen: "title", back: "", dev: false, free: null, sheet: false, resetAsk: false, sub: "ready" });
}

// 처음 화면에서 여는 전체 설정
function masterGain(settings) {
  const level = Number(settings.volume);
  return settings.muted ? 0 : Number.isFinite(level) ? Math.max(0, Math.min(1, level)) : defaultSave().settings.volume;
}
function renderSettings() {
  const s = save.settings, t = window.__tests;
  const volume = Math.round(masterGain({ ...s, muted: false }) * 100);
  $("settingsVolume").value = volume;
  $("settingsVolumeOut").textContent = volume + "%";
  $("settingsMute").checked = s.muted;
  $("settingsGuide").checked = S.guide;
  $("settingsSlow").checked = S.slow;
  $("settingsOffset").textContent = S.offset + "ms";
  $("settingsOffsetDown").disabled = S.offset <= -100;
  $("settingsOffsetUp").disabled = S.offset >= 200;
  $("settingsShowMs").checked = S.showMs;
  $("settingsMotion").value = s.motion;
  $("setWarning").hidden = store.persistent();
  $("settingsTests").textContent = t?.line || "";
  $("settingsTestFailures").textContent = t?.failed.length ? "실패 · " + t.failed.join(", ") : "";
  $("settingsTestFailures").hidden = !t?.failed.length;
  $("settingsReset").hidden = S.resetAsk;
  $("settingsResetConfirm").hidden = !S.resetAsk;
}
function changeExtraSetting(key, value, patch = {}) {
  setSetting(key, value, patch);
  if (key === "volume" || key === "muted") syncAudioVolume();
}
function resetExtraData() {
  save = defaultSave();
  store.save(save);
  syncAudioVolume();
  const s = save.settings;
  $("settingsTutorialOut").textContent = "";
  setState({ screen: "title", resetAsk: false, sheet: false, free: null, back: "", dev: false, guide: s.guide, slow: s.slow,
    offset: s.tapOffsetMs, showMs: s.showMs, guideNow: s.guide, lean: 0, leanHintUsed: false });
}
function renderExtras() {
  const free = S.screen === "free";
  $("freeBack").hidden = !free;
  $("freeOrderControls").hidden = !free;
  $("orderTag").hidden = free;
  $("orderText").hidden = free;
  if (free) {
    renderFreeWorkbench();
    return true;
  }
  if (!$("cFree").hidden || $("ship").hidden) {
    $("cFree").hidden = true;
    $("ship").hidden = false;
    $("board").classList.remove("free-browse", "paired");
  }
  if (S.screen === "book") {
    renderBook();
    return true;
  }
  if (S.screen === "settings") {
    renderSettings();
    return true;
  }
  return false;
}
function bindExtras() {
  $("openBook").addEventListener("click", () => { setState({ screen: "book" }); $("bookScr").scrollTop = 0; $("bookBack").focus(); });
  $("openFree").addEventListener("click", () => { setFree(defaultFree(), true); $("freeBack").focus(); });
  $("openSettings").addEventListener("click", () => { $("settingsTutorialOut").textContent = ""; setState({ screen: "settings", resetAsk: false }); $("setScr").scrollTop = 0; $("setBack").focus(); });
  for (const id of ["bookBack", "freeBack", "setBack"]) $(id).addEventListener("click", extraBack);
  $("bookCards").addEventListener("click", (e) => {
    const button = e.target.closest("button[data-recipe-play]");
    if (button) playRecipe(button.dataset.recipePlay);
  });
  $("bookScenes").addEventListener("click", (e) => {
    const button = e.target.closest("button[data-book-scene]");
    if (button && !button.disabled) openBookScene(button.dataset.bookScene);
  });
  document.addEventListener("visibilitychange", () => {
    if (document.hidden && S.screen === "book") stopRun(false);
  });
  $("board").addEventListener("click", (e) => {
    if (S.screen !== "free") return;
    const loaf = e.target.closest("button[data-free-row]");
    if (loaf) freeBump("cycle", Number(loaf.dataset.freeRow));
  });
  const tempo = (delta) => setFree({ ...S.free, bpm: Math.max(40, Math.min(100, S.free.bpm + delta)) });
  $("freeTempoDown").addEventListener("click", () => tempo(-10));
  $("freeTempoUp").addEventListener("click", () => tempo(10));
  $("freeMode").addEventListener("click", () => setFree({ ...S.free, mode: S.free.mode === "browse" ? "rhythm" : "browse" }));
  $("freeLess").addEventListener("click", () => freeBump(-1));
  $("freeMore").addEventListener("click", () => freeBump(1));
  $("freeCompare").addEventListener("click", () => setFree({ ...S.free, compare: !S.free.compare, focus: 0 }));
  $("freeTop").addEventListener("click", () => setFree({ ...S.free, focus: 0 }));
  $("freeBottom").addEventListener("click", () => setFree({ ...S.free, focus: 1 }));
  $("freeHear").addEventListener("click", freePlayback);
  $("settingsVolume").addEventListener("input", (e) => changeExtraSetting("volume", Number(e.target.value) / 100));
  $("settingsMute").addEventListener("change", (e) => changeExtraSetting("muted", e.target.checked));
  $("settingsGuide").addEventListener("change", (e) => changeExtraSetting("guide", e.target.checked, { guide: e.target.checked, guideNow: e.target.checked }));
  $("settingsSlow").addEventListener("change", (e) => changeExtraSetting("slow", e.target.checked, { slow: e.target.checked }));
  $("settingsShowMs").addEventListener("change", (e) => changeExtraSetting("showMs", e.target.checked, { showMs: e.target.checked }));
  $("settingsMotion").addEventListener("change", (e) => changeExtraSetting("motion", e.target.value));
  $("settingsCalib").addEventListener("click", () => openCalibration());
  const offset = (delta) => {
    const value = Math.max(-100, Math.min(200, S.offset + delta));
    changeExtraSetting("tapOffsetMs", value, { offset: value });
  };
  $("settingsOffsetDown").addEventListener("click", () => offset(-10));
  $("settingsOffsetUp").addEventListener("click", () => offset(10));
  $("settingsTutorial").addEventListener("click", () => {
    setSetting("tutorialStep", 0, {});
    changeExtraSetting("tutorialSeen", false);
    $("settingsTutorialOut").textContent = "다음 영업부터 다시 안내해요.";
  });
  $("settingsReset").addEventListener("click", () => { setState({ resetAsk: true }); $("settingsKeep").focus(); });
  $("settingsKeep").addEventListener("click", () => { setState({ resetAsk: false }); $("settingsReset").focus(); });
  $("settingsErase").addEventListener("click", resetExtraData);
}
