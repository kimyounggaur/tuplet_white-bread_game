# UX0 기준판 확보

2026-11-20

- 기준 원격은 https://github.com/kimyounggaur/tuplet_white-bread_game 이며 원격 main의 HEAD는 21eb3148d45df48a7fbca0637715830fd44c424e다.
- 로컬 HEAD는 87fd75f2b4d09550ec9368ec0ed7a6365e7392f8이고 원격 트리와 같은 6f954b9c7ec57e4d557775fcd043bcb07320d948이다. 이 차이는 동일 파일을 GitHub 커넥터에서 커밋한 이력에 따른다.
- 시작 시 작업 트리는 깨끗했다. ux/first-play-intro 작업 브랜치를 만들었다. 원격 주소는 로컬 Git 설정에 등록돼 있지 않으며 원격 커넥터에서 위 저장소를 읽었다.
- UX0 기능 소스 변경은 없다. 원문 두 개를 docs에 보존했다.

## 이번 실행 결과

| 검증 | 결과 |
|---|---|
| node tools/build.mjs | PASS, 종료 0, 생성 파일 변경 없음 |
| CHROME=/usr/bin/chromium node tools/check.mjs | BLOCKED, 종료 1, 호스트 socket EPERM |
| CHROME=/usr/bin/chromium node tools/progress.mjs | BLOCKED, 종료 1, 호스트 socket EPERM |
| managed Chrome /check.html | PASS, 7개 크기 × 51곳, 357/357, 문제 0, 오류 0, 외부 요청 0 |
| managed Chrome /progress.html | PASS, 6일, 43주문, 발견 4개, 재개 d0-02, 오류 0 |
| 단일 HTML 자체 검사 | PASS, 51/51 |

원본 CLI 종료 로그는 같은 폴더의 ux0-*.log다. managed Chrome은 동일 출처 테스트용 iframe에서 실제 DOM click 처리기를 실행했다. 실제 손가락과 실제 기기 청음의 증거는 아니다. 하네스는 시험 저장 키를 백업하고 복원했다.

첫 진입에서 제목, 영업일, 소리 확인, 첫 주문을 거쳤다. 첫 납품 후 새로고침과 이어하기로 d0-02에 복귀했다. 기존 잠금, 카드 15종, 발견 다시 보기, 자유 도마 길이 비교와 박자 맞추기 복귀도 확인했다.

게이트는 PASS다. 실제 iPhone/Android 및 학습자 검증은 NOT_RUN이다.
