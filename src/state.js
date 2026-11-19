// ── 상태: setState()로만 바꾼다 ──
let S = {
  screen: "title", day: "d0", idx: 0, results: [], sliced: false, cards: [], dev: false, sum: null,
  phase: "pick", sub: "ready", sel: null, cuts: [0], focus: 0, tries: 0, assisted: false, fix: false, wrong: [], ghost: null,
  label: "", knife: "", ng: false, hearing: false, endedAt: -1e9, scene: "", guideNow: true, msg: { tone: "", text: "" },
  guide: true, slow: false, offset: 0, showMs: true, sheet: false,
  lean: 0, leanHintUsed: false, unlockedNext: false, soundHelp: false,
  calibFrom: "title", calibResult: null, calibMessage: "", calibActive: false,
  intro: { stage: "cut", cuts: 0 },
  free: null, back: "", resetAsk: false,
};
function setState(patch) {
  const next = Object.assign({}, S, patch);
  if (!legal(S, next)) console.error("ST-01 허용하지 않는 전이: " + S.phase + "/" + S.sub + " → " + next.phase + "/" + next.sub);
  S = next;
  render();
}
