PAINT.slice = (o) => {
  const ns = sliceNs(o), busy = S.sub === "count" || S.sub === "run", machine = run && run.kind === "machine";
  $("padMain").textContent = S.sub === "count" ? S.label : S.sub === "run" ? (machine ? "기계가 써는 중" : "여기를 탭!") : S.sub === "result" ? "다시 썰기" : "썰기 시작";
  $("padSub").textContent = S.sub === "count" ? "박을 듣고 준비해요" : S.sub === "run" ? (machine ? "소리와 칼을 따라 보세요" : "칼집마다 한 번") : `빵 ${ns.length}덩이 · 칼질 ${ns.reduce((s, n) => s + n - 1, 0)}번`;
  $("pad").classList.toggle("live", busy);
  $("machine").disabled = busy;
  $("ship").disabled = busy;
  $("ship").classList.toggle("pri", S.sub === "result");  // 썰기 결과가 나오기 전에는 보조 단추로 그린다
};
