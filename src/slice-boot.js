// ── 탭 패드와 키보드 ──
let swallow = false;  // 썰기 도중에 누른 손가락을 뗄 때 생기는 click은 버린다
$("pad").addEventListener("pointerdown", () => { swallow = !!(run && run.kind === "slice"); if (swallow) tap(); });
$("pad").addEventListener("click", () => {
  if (swallow) { swallow = false; return; }
  if (S.sub === "ready" || S.sub === "result") begin("slice");
});
$("machine").addEventListener("click", () => begin("machine"));
const isTapKey = (e) => e.code === "Space" || e.code === "Enter";
window.addEventListener("keydown", (e) => {
  if (!run || run.kind !== "slice" || !isTapKey(e)) return;
  e.preventDefault();
  if (!e.repeat) tap();
});
window.addEventListener("keyup", (e) => { if (isTapKey(e) && ((run && run.kind === "slice") || restartBlocked(performance.now(), S.endedAt))) e.preventDefault(); });
