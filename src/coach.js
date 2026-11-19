function coachFor(state, o, step) {
  if (state.dev || state.screen !== "shift" || state.sheet || !o) return null;
  if (step === 1 && o.id === "d0-01" && state.phase === "pick") {
    return state.sel === null
      ? { target: "shelf", text: "줄을 누르면 식빵이 도마에 올라와요." }
      : { target: "board", text: "길이는 아래 눈금으로 읽어요." };
  }
  if (step === 2 && o.id === "d1-01" && state.phase === "mark") {
    return { target: "board", text: "빵을 탭하면 칼집이 하나 늘어요." };
  }
  if (step === 3 && o.id === "d1-01" && state.phase === "slice" && ["ready", "result"].includes(state.sub)) {
    if (!state.sliced) return { target: "controls", text: "먼저 기계가 써는 걸 봐요." };
    if (state.knife === "기계") return { target: "controls", text: "칼집 자리에서 탭해요. 첫 음은 저절로 나요." };
    if (state.sub === "result") return { target: "controls", text: "박자 맞추기를 해 볼까요?", choices: true };
  }
  return null;
}
