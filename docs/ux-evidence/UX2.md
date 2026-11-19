# UX2 한 박 비교 재생

2026-11-20 · PASS

별도 intro-audio.js와 CSS를 추가하고 render/boot/build에 연결했다. 저수준 Web Audio 예약과 분수 엔진을 재사용했다. 정규 audio.js/engine.js/orders.js/actions.js는 이 단계에서 수정하지 않았다.

- 순수 introPlan 검사는 2조각의 음 시작 0, 1/2와 3조각의 0, 1/3, 2/3 및 공통 종료 1박을 확인했다. 60 BPM에서 1초다.
- 끝선에 음을 추가하지 않는다. 음높이·볼륨은 두 비교에서 같다.
- 별도 음원 그룹과 프레임·토큰을 소유하고, 재재생·되돌리기·정규 진입·페이지 숨김 시 정리한다.
- 늦게 해결되는 오디오 resume는 음 예약을 호출하지 않는다. 사용 시점에 오디오가 멈춰 있으면 시각 재생으로 진행한다.
- node tools/intro-check.mjs --unit PASS 종료 0
- managed Chrome /intro-check.html PASS 9건, 실패 0. 기존 51/51 별도 확인.
- AU-01의 무음 시각 재생, 행 교체, 되돌리기와 나가기 후 단일 재생 정리를 확인했다.

자동 예약 검증은 실제 청음이 아니다. 실제 휴대전화 오디오·무선 이어폰 지연은 NOT_RUN이다.
