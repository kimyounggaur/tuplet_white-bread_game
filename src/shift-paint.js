PAINT.deliver = () => {
  $("againText").textContent = S.sub === "listen" && S.label ? S.label + " 듣는 중" : "다시 듣기";
  $("next").textContent = S.idx + 1 < queueOf(dayOf(S.day).orders.length, S.results).length ? "다음 주문" : "마감하기";
};

PAINT.scene = () => { $("sceneHearText").textContent = S.sub === "listen" ? "듣는 중" : "들어 보기"; };
