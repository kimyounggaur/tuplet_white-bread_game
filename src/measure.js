let boardW = 0;
// ── 화면 크기: 높이로 모드를 정한다. 좁음(620px 미만) · 기본 · 넉넉(760px 이상) ──
function measure() {
  const app = $("app"), h = window.innerHeight;
  app.classList.toggle("tight", h < 620);
  app.classList.toggle("roomy", h >= 760);
  $("rotate").toggleAttribute("hidden", h >= 550);  // 눕힌 폰에서는 한 화면이 성립하지 않는다
  boardW = $("board").clientWidth + (h < 620 ? 0.1 : h >= 760 ? 0.2 : 0);  // 폭이나 모드가 바뀌면 도마를 다시 그리게 한다
}
let resizeTimer = 0;
window.addEventListener("resize", () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(() => { if (run) return; const w = boardW; measure(); if (w !== boardW) render(); }, 120); });

