// ── 소리 언락: 세 가지 손짓에 모두 건다. 상태는 "소리 켜기"로 보여 준다 ──
["click", "touchstart", "keydown"].forEach((ev) => window.addEventListener(ev, () => { audio(); }, { passive: true, capture: true }));
$("soundChip").addEventListener("click", () => { audio(); setState({}); });
