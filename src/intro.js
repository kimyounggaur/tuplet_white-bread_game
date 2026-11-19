// 맛보기의 입력은 주문·점수 계산에서 독립적으로 처리한다.
function introTransition(intro, event) {
  if (event === "CUT" && intro.stage === "cut" && intro.cuts < 2) {
    const cuts = intro.cuts + 1;
    return { stage: cuts === 2 ? "compare" : "cut", cuts };
  }
  if (event === "UNDO" && intro.cuts > 0) return { stage: "cut", cuts: intro.cuts - 1 };
  return intro;
}

function introRoute(saved, hasValidActive = false) {
  const history = Object.keys(saved.days || {}).length > 0
    || Object.keys(saved.recipes || {}).length > 0
    || (saved.loaves || []).length > 0
    || Number(saved.stats?.orders) > 0;
  return hasValidActive || saved.settings?.introSeen || history ? "title" : "intro";
}

let introStagePainted = "";
let introCutsPainted = -1;
let introBound = false;

function introPieces(n) {
  return Array.from({ length: n }, (_, i) => `<span class="intro-piece" data-piece="${i}" style="left:${100 * i / n}%;width:${100 / n}%"></span>`).join("");
}
function introMarks(n) {
  return Array.from({ length: n - 1 }, (_, i) => `<span class="intro-mark" style="left:${100 * (i + 1) / n}%"></span>`).join("");
}
function introText(id, text) {
  const node = $(id);
  if (node.textContent !== text) node.textContent = text;
}

function renderIntro() {
  if (S.screen !== "intro") return;
  const intro = S.intro, compare = intro.stage === "compare";
  const stageChanged = intro.stage !== introStagePainted;
  $("introCutStage").hidden = compare;
  $("introCompareStage").hidden = !compare;
  $("introNext").hidden = !compare;
  $("introUndo").disabled = intro.cuts === 0;
  $("introBread").disabled = compare;
  introText("introInstruction", compare ? "세 조각이 되었어요." : "이 빵을 똑같이 세 조각으로 나눠요.");
  introText("introStatus", `칼집 ${intro.cuts}개, ${intro.cuts + 1}조각`);

  if (introCutsPainted !== intro.cuts) {
    introCutsPainted = intro.cuts;
    const n = intro.cuts + 1;
    $("introBreadPieces").innerHTML = introPieces(n);
    $("introBreadMarks").innerHTML = introMarks(n);
    $("introBread").setAttribute("aria-label", `식빵 ${n}조각. 누르면 칼집 하나를 더해요.`);
  }
  if (stageChanged && compare) {
    for (const n of [2, 3]) {
      const spec = specOf(4, n), label = labelOf(spec), score = $("introScore" + n);
      $("introLoaf" + n).innerHTML = introPieces(n) + introMarks(n);
      introText("introName" + n, nameKo(spec) + (spec.isTuplet ? "" : " · 일반 분할"));
      score.setAttribute("viewBox", "0 0 114 50");
      score.setAttribute("aria-label", labelKo(label));
      score.innerHTML = notesSvg(label, evenXs(n, 114), 114, 50, false, "var(--board)");
    }
  }
  introText("introWholeLabel", `${beatsKo(loafBeats(4))} 식빵`);
  introText("introCutEnd", `${beatsKo(loafBeats(4))} 끝`);
  introText("introCompareEnd", `${beatsKo(loafBeats(4))} 끝`);
  if (stageChanged && introStagePainted) {
    (compare ? $("introCompareTitle") : $("introBread")).focus({ preventScroll: true });
  }
  introStagePainted = intro.stage;
}

function changeIntro(event) {
  if (S.screen !== "intro") return;
  const next = introTransition(S.intro, event);
  if (next === S.intro) return;
  stopIntro();
  setState({ intro: next });
}

function completeIntro() {
  if (S.screen !== "intro") return;
  stopIntro();
  save.settings = { ...save.settings, introSeen: true };
  store.save(save);
  advanceTutorial(1);
  openDay("d0", { checkSound: false });
}

function bindIntro() {
  if (introBound) return;
  introBound = true;
  $("introBread").addEventListener("click", () => changeIntro("CUT"));
  $("introUndo").addEventListener("click", () => changeIntro("UNDO"));
  $("introSkip").addEventListener("click", completeIntro);
  $("introNext").addEventListener("click", completeIntro);
}
