# UX1 무음 맛보기

2026-11-20 · PASS

상태 전이, 신규 분기, 두 번 자르기와 비교, 되돌리기, 건너뛰기를 구현했다. 새 저장 필드는 settings.introSeen 한 개이며 기존 version 1 기본값 병합을 사용했다. 유효 active와 이전 진도, 해시 직행을 우선한다.

수정은 src/intro.js, intro.html, intro.css, state.js, storage.js, boot.js, render.js, shell.html과 tools/build.mjs다. 빵 버튼의 노드를 유지하고 비교 CTA를 별도 위치에 배치했다.

- node tools/build.mjs PASS 종료 0
- node tools/intro-check.mjs --unit PASS 종료 0
- managed Chrome /intro-check.html PASS 새 UX 검사 8건 실패 0, 기존 51/51 별도 확인
- IN-01, IN-02, IN-03, IN-04, IN-05, UI-01, REG-01, REG-03의 UX1 범위 확인
- 320×568, 360×640, 800×600 및 기본 글자 크기 130%에서 버튼 최소 44px와 수평 넘침 검사
- 저장소를 거절한 시험 사본에서도 맛보기와 첫 정규 주문 진입을 확인

화면은 대화의 ‘320픽셀 맛보기 화면 확인’ 및 ‘동일한 한 박의 두 줄 비교’ 캡처로 기록했다. 작은 화면의 비교 단계에는 세로 스크롤을 허용한다. 실제 휴대전화의 손가락 터치와 실제 사람 관찰은 NOT_RUN이다.
