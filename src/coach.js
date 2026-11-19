function coachFor(state, o, step) {
  if (state.dev || state.screen !== "shift" || state.sheet || !o) return null;
  if (step === 1 && o.id === "d0-01" && state.phase === "pick") {
    return state.sel === null
      ? { target: "shelf", text: "선반의 줄을 눌러 식빵을 올려요." }
      : { target: "board", text: "도마 아래 눈금으로 길이를 읽어요." };
  }
  if (step === 2 && o.id === "d1-01" && state.phase === "mark") {
    return { target: "board", text: "도마의 빵을 누르면 칼집이 하나 생겨요." };
  }
  if (step === 3 && o.id === "d1-01" && state.phase === "slice" && ["ready", "result"].includes(state.sub)) {
    if (!state.sliced) return { target: "controls", text: "먼저 기계가 써는 걸 봐요." };
    if (state.knife === "기계") return { target: "controls", text: "칼집 자리에서 탭해요. 첫 음은 저절로 나요." };
    if (state.sub === "result") return { target: "controls", text: "박자 맞추기를 해 볼까요?", choices: true };
  }
  return null;
}
