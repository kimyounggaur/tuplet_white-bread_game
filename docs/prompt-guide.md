# 『잇단음표 식빵 공방』 바이브 코딩 프롬프트 가이드

| 항목 | 내용 |
|---|---|
| 버전 | v1.0 (2026-11-18) |
| 바탕 문서 | 『잇단음표 식빵 공방』 설계서 v1.0 (2026-11-14). 이 문서에서 "설계서 4.6절"처럼 부르는 것은 모두 그 문서다 |
| 산출물 | `index.html` 한 파일. 외부 의존성 0, 오디오 파일 0 |
| 구성 | P00(헌법) 1개 + 프롬프트 P01~P33. 단계 SL0~SL9, 버전 v0.0~v1.0 |
| 대상 화면 | 모바일 세로 320×568 이상. 태블릿과 PC에서는 같은 배치가 넓어진다 |

## 차례

- 0장. 먼저 읽기
- 1장. Step 0 헌법: P00
- 2장. SL0 뼈대: P01, P02
- 3장. SL1 이론 엔진: P03, P04, P05
- 4장. SL2 선반, 도마, 재단: P06, P07, P08, P09
- 5장. SL3 소리: P10, P11, P12
- 6장. SL4 썰기: P13, P14, P15, P16
- 7장. SL5 악보와 이름표: P17, P18
- 8장. SL6 주문 흐름과 0~2단: P19, P20, P21, P22
- 9장. SL7 3~5단과 레시피북: P23, P24, P25, P26
- 10장. SL8 그림, 연출, 튜토리얼: P27, P28, P29, P30, P31
- 11장. SL9 기기 확인과 정리: P32, P33
- 12장. 새 세션 복원 프롬프트
- 13장. 문제 해결 프롬프트 모음
- 14장. 배포
- 부록 A. 게이트 보고 양식 / 부록 B. 검사 51개 / 부록 C. 프롬프트와 설계서 대응표 / 부록 D. 자동 화면 점검 스크립트 / 부록 E. 주문 43개

---

# 0장. 먼저 읽기

## 0.1 이 문서가 하는 일

설계서를 AI 코딩 도구에 차례로 붙여 넣을 프롬프트 33개로 바꿨다. 프롬프트 하나가 작업 하나이고, 프롬프트마다 "시작 전 상태 → 할 일 → 하지 말 것 → 보고 → 완료 기준"이 있다. 완료 기준을 통과해야 다음으로 간다.

## 0.2 프롬프트의 세 종류

| 표시 | 개수 | 뜻 | 프롬프트 |
|---|---|---|---|
| **[그대로]** | 14 | 프롬프트 안에 코드가 들어 있다. AI는 그 코드를 정해진 자리에 그대로 넣기만 한다. 이 코드는 전부 실행해서 확인했다 | P01~P08, P10, P11, P13, P15, P18, P21 |
| **[점검]** | 7 | 코드를 더하지 않는다. AI는 규칙을 어긴 곳이 없는지 코드를 읽어 보고하고, 사람은 화면과 소리를 확인한다 | P09, P12, P14, P17, P19, P20, P23 |
| **[설계]** | 12 | 설계서의 요구를 AI가 구현한다. 코드를 주지 않는다. 결과물을 만들어 확인하지 못했다 | P16, P22, P24~P33 |

[그대로] 14개를 끝내면 여섯 영업일의 주문 43개를 처음부터 끝까지 할 수 있고 기록이 저장된다. 화면은 임시 도형이고, 영업일 지도와 레시피북과 자유 도마와 튜토리얼은 없다. 그것들이 [설계] 12개다.

## 0.3 확인한 것과 확인하지 못한 것

**확인한 것.** 헤드리스 Chrome for Testing 153의 모바일 에뮬레이션에서 쟀다.

| 항목 | 결과 |
|---|---|
| [그대로] 코드를 전부 넣은 `index.html`(1,732줄, 약 128KB) | `자가검사 51/51 (전체 51개 중 51개 작성) · TH 13/13 LB 6/6 JD 8/8 GN 6/6 AU 6/6 ST 5/5 SV 4/4 CT 3/3` |
| 검사가 실제로 잡아내는가 | 코드를 일부러 틀리게 고친 40가지를 넣었고 40가지 모두 검사가 실패로 잡았다 |
| 이 문서의 지시만으로 조립되는가 | 이 문서에서 P01의 파일과 "넣을 자리, 코드"만 뽑아 차례로 적용했다. 프롬프트 14개 각각의 뒤에 만들어진 파일이 콘솔 오류 0으로 열렸고 `#test` 줄이 각 프롬프트의 "끝난 뒤" 줄과 같았다 |
| 배치 | 화면 7종(320×568, 360×600, 360×640, 390×664, 390×844, 430×932, 800×600)에서 주문과 단계 51곳씩을 쟀다. 스크롤 0, 잘림 0, 가장 작은 글자 12px, 조작부 94px, 가장 작은 단추 44px(높이 620px 미만의 고르기 줄 38px) |
| 소리 | 오실레이터 생성을 가로채 주파수와 예약 시각을 읽었다. 조각 음 783.99Hz, 원래 소리 392Hz, 예약 시각은 P12의 표와 같다 |
| 완료 기준의 화면 글자 | P01~P21의 완료 기준에 따옴표로 적은 글자는 각 단계의 파일을 열어 화면에서 읽은 것이다 |

**확인하지 못한 것.**

- 프롬프트를 실제 AI 코딩 도구에 넣어 돌려 보지 않았다. AI가 지시를 다르게 읽을 수 있다. 그때는 0.4의 6번과 13장을 쓴다.
- 실기기에서는 아무것도 재지 않았다. 실제 음량과 음색, iOS의 소리 허용, 출력 지연, 손가락으로 누르기 쉬운지는 P12, P16, P32에서 확인한다.
- [설계] 프롬프트 12개(P16, P22, P24~P33)가 만들 결과물은 만들어 보지 않았다. 요구 사항과 완료 기준만 적었다.
- 학습자와 강사의 검수는 없다(P32, P33).

## 0.4 쓰는 법

1. **P00을 먼저 붙인다.** AI가 질문 11개에 답하면 P00 아래의 정답과 견준다. 틀린 답이 있으면 바로잡은 뒤에 P01로 간다.
2. **번호 순서대로, 한 번에 하나만 붙인다.** 건너뛰지 않는다.
3. **붙이기 전에** `index.html#test`를 열어 맨 윗줄이 프롬프트의 "시작 전 상태"와 같은지 본다. 다르면 붙이지 않고 13장으로 간다.
4. **AI가 끝냈다고 하면** `#test`를 다시 열어 "끝난 뒤" 줄과 견주고, 완료 기준을 위에서부터 하나씩 확인한다. 하나라도 다르면 다음으로 가지 않는다.
5. **통과할 때마다 사본을 남긴다.** Git을 쓰면 커밋 하나(`P05 통과`), 안 쓰면 `index_P05.html`로 복사한다. 실패하면 직전 사본으로 돌아가 같은 프롬프트를 다시 붙인다. 고쳐 쓰기를 세 번 넘게 반복하지 않는다.
6. **[그대로] 프롬프트는 손으로 해도 된다.** 코드 위에 "넣을 자리"가 적혀 있다. AI가 코드를 바꿔 쓰거나 파일이 길어져 일부를 빠뜨리면, 편집기에서 직접 붙여 넣는 편이 빠르다.
7. **검사와 잠금 정답표(LOCK)는 고치지 않는다.** 검사가 실패하면 앱 코드를 고친다. 예외는 SL9(P32, P33)에서 사람이 결정을 바꿀 때뿐이다(허용폭, 문구, 주문 수). 그때는 결정 기록을 남긴다.
8. **[설계] 프롬프트는 계획부터 받는다.** 프롬프트가 "먼저 계획을 보고한다"로 시작한다. 계획이 헌법과 어긋나지 않으면 "진행"이라고 답한다.
9. **세션을 새로 열면** 12장의 복원 프롬프트를 먼저 붙인다.
10. **화면 확인**은 폰 실물이 가장 좋다. PC에서는 브라우저 개발자 도구의 기기 모드로 320×568, 360×640, 390×844 세 크기를 본다.

`#test` 줄을 읽는 법:

```text
자가검사 43/43 (전체 51개 중 43개 작성) · TH 12/13 LB 6/6 JD 8/8 GN 6/6 AU 0/6 ST 4/5 SV 4/4 CT 3/3
```

"43/43"은 지금까지 넣은 검사 43개가 모두 통과했다는 뜻이다. 뒤의 묶음별 숫자는 "통과한 수/그 묶음의 전체 수"다. `ST 4/5`는 ST 묶음 5개 가운데 4개가 들어와 통과했고 1개는 아직 넣지 않았다는 뜻이다. 실패가 있으면 그 아래에 `실패 TH-04 …` 줄이 붙는다. 화면 맨 위의 글상자를 통째로 복사해 AI에게 준다.

## 0.5 준비물

| 준비물 | 쓰임 |
|---|---|
| AI 코딩 도구 하나 | 어느 도구든 된다. 파일의 일부만 고치는 방식(편집기형)을 권한다. 매번 파일 전체를 다시 써서 내놓는 방식에서는 파일이 1,000줄을 넘는 P05부터 중간을 빠뜨리거나 바꿔 쓸 수 있다. 그럴 때는 0.4의 6번처럼 손으로 붙인다. 도구별로 직접 돌려 보지는 못했다 |
| 브라우저(Chrome 권장) | `index.html`, `index.html#test`, `index.html#d3-02`를 연다. 주소에 `#…`를 붙일 수 없는 미리보기에서는 파일을 내려받아 브라우저로 연다 |
| 텍스트 편집기 | 손으로 붙일 때, 사본을 남길 때 |
| Git(선택) | 프롬프트마다 커밋. 14장의 배포에는 필요하다 |
| Node.js(선택) | 부록 D의 자동 화면 점검. 없어도 된다 |
| 설계서 | [설계] 프롬프트에서 AI에게 해당 절을 함께 준다 |

파일을 폴더째 다루는 도구를 쓴다면 저장소를 이렇게 둔다.

```text
index.html                    게임. 산출물은 이 파일 하나다
docs/constitution.md          P00의 프롬프트 블록을 그대로 저장한 것
docs/prompt-guide.md          이 문서
docs/spec.md                  설계서
docs/slice-gate-report.md     게이트 보고(부록 A)
docs/decisions.md             결정 기록. 바꾼 것과 이유
tools/check.mjs               부록 D(선택)
```

## 0.6 진행 지도

"끝난 뒤" 칸은 그 프롬프트를 마쳤을 때 `#test` 맨 윗줄의 앞부분이다.

| 프롬프트 | 단계 | 하는 일 | 종류 | 끝난 뒤 | 게이트 |
|---|---|---|---|---|---|
| P00 | | 헌법. 규칙과 정답표를 잠근다 | | | |
| P01 | SL0 v0.0 | 틀 | 그대로 | 검사 없음 | |
| P02 | SL0 | 저장과 검사 러너 | 그대로 | 5/5 | GSL0 |
| P03 | SL1 v0.1 | 이론 엔진 | 그대로 | 30/30 | |
| P04 | SL1 | 주문 씨앗 43개 | 그대로 | 37/37 | |
| P05 | SL1 | 주문 흐름 계산부 | 그대로 | 43/43 | GSL1 |
| P06 | SL2 v0.2 | 그리기 뼈대, 선반, 고르기 | 그대로 | 43/43 | |
| P07 | SL2 | 도마 | 그대로 | 44/44 | |
| P08 | SL2 | 재단 | 그대로 | 44/44 | |
| P09 | SL2 | 틀, 유령 빵, 이어 붙이기 점검 | 점검 | 44/44 | GSL2 |
| P10 | SL3 v0.3 | 소리 계산부와 언락 | 그대로 | 50/50 | |
| P11 | SL3 | 재생, 납품, 임시 마감, 장면 넘기기 | 그대로 | 50/50 | |
| P12 | SL3 | 소리 점검 | 점검 | 50/50 | GSL3 |
| P13 | SL4 v0.4 | 썰기 입력 | 그대로 | 50/50 | |
| P14 | SL4 | 판정 점검 | 점검 | 50/50 | |
| P15 | SL4 | 설정 시트 | 그대로 | 50/50 | |
| P16 | SL4 | 박자 맞추기 | 설계 | 50/50 | GSL4 |
| P17 | SL5 v0.5 | 악보 점검 | 점검 | 50/50 | |
| P18 | SL5 | 이름표 | 그대로 | 50/50 | GSL5 |
| P19 | SL6 v0.6 | 0~2단 완주 점검 | 점검 | 50/50 | |
| P20 | SL6 | 발견 장면 점검 | 점검 | 50/50 | |
| P21 | SL6 | 기록과 이어하기 | 그대로 | 51/51 | |
| P22 | SL6 | 영업일 지도, 마감 화면, 잠금, 첫 배포 | 설계 | 51/51 | GSL6 |
| P23 | SL7 v0.8 | 3~5단 완주 점검 | 점검 | 51/51 | |
| P24 | SL7 | 레시피북과 도장 | 설계 | 51/51 | |
| P25 | SL7 | 자유 도마 | 설계 | 51/51 | |
| P26 | SL7 | 설정 화면 | 설계 | 51/51 | GSL7 |
| P27 | SL8 v0.9 | 그림 | 설계 | 51/51 | |
| P28 | SL8 | 연출 | 설계 | 51/51 | |
| P29 | SL8 | 타이틀과 마감 화면 다듬기 | 설계 | 51/51 | |
| P30 | SL8 | 튜토리얼 | 설계 | 51/51 | |
| P31 | SL8 | 접근성 | 설계 | 51/51 | GSL8 |
| P32 | SL9 v1.0 | 실기기 결과 반영 | 설계 | 51/51 | |
| P33 | SL9 | 정리와 출시 | 설계 | 51/51 | GSL9 |

검사 51개는 P21에서 다 들어온다. 그 뒤로는 51/51이 내려가면 안 된다.

## 0.7 설계서에서 구체화하거나 바꾼 것

코드를 만들고 돌려 보면서 정한 것이다. 설계서와 다르게 읽히면 이 표가 맞다.

| # | 내용 | 설계서 | 이유 |
|---|---|---|---|
| 1 | 주문 흐름을 계산부와 호출부로 나눴다. `T.pick`, `T.confirmMark` 같은 계산부는 상태와 주문을 받아 "바꿀 값"만 돌려주고, `act()`가 그 값을 `setState`에 넘기고 소리와 저장을 맡는다 | 9.2절은 전이 함수가 `setState`를 부른다고 적었다 | 흐름 전체를 화면 없이 검사하려고(ST-01, ST-03, CT-01~CT-03) |
| 2 | 검사가 들어오는 때가 이르다. CT-01~CT-03, ST-01, ST-03, ST-04는 P05, AU-06은 P10 | 10장은 SL5, SL6, SL4 | 계산부가 먼저 만들어지므로 그때 검사한다 |
| 3 | TH-12는 P07에 들어온다. 그래서 GSL1의 TH는 12/13이다 | 10장의 GSL1은 TH 13/13 | TH-12는 도마의 배율 함수를 검사한다 |
| 4 | 저장에 `active.results[].ng`(안내선을 끄고 장인으로 썰었는가)와 `active.cards`(그날 얻은 카드)를 더했다. `recipe`는 2가 ●, 1이 ◐ | 9.4절 | 장인 도장과 마감 화면의 새 카드를 이어하기 뒤에도 계산하려고. `version`은 1 그대로다 |
| 5 | 장인 도장은 썰기 주문이 하나 이상 있는 영업일에만 있다. 0단에는 없다 | 7.5절 | 0단은 고르기 주문뿐이다 |
| 6 | TH-13과 ST-02를 소스 점검으로 정의했다. TH-13은 앱 코드에 `8분음표`, `셋잇단`, `(3:2)`, `.333` 같은 글자가 있으면 실패한다. ST-02는 `S = `가 두 곳(선언, `setState`)이 아니거나 `S.x = `가 있으면 실패한다 | 11.1절은 내용만 적었다 | AI가 표를 손으로 적는 일을 자동으로 막으려고 |
| 7 | 일반 분할 주문에서 이름표를 틀리면 "보통 칸의 이름을 보세요."가 붙는다 | 스파이크는 "숫자가 있어야 들어가요."를 붙였다 | 일반 분할의 정답에는 숫자가 없다. 스파이크의 문구가 틀렸다 |
| 8 | 틀의 칸이 50px보다 좁으면 "8분"처럼 줄여 적는다. 이어 붙이기 주문은 도마 위쪽에 견줄 줄을 따로 그린다. 이름으로 묻는 주문에서는 "1박짜리 식빵을 올렸어요"처럼 박 수로 말한다 | 4.3절, 4.4절 | 320px 폭에서 글자가 넘쳤다. 이름으로 묻는데 이름을 말해 주면 답을 알려 주게 된다 |
| 9 | 발견 장면의 문장을 엔진 값으로 조립한다 | 7.4절은 문장을 그대로 적었다 | TH-13. 결과 문장은 7.4절과 같다 |
| 10 | "세로로 돌려 주세요"(높이 550px 미만)를 P01에 넣었다 | 8.1절은 시점을 정하지 않았다 | 틀과 함께 있어야 한다 |
| 11 | 오차 수치를 끄면(`showMs`) "조금 늦었어요", "많이 빨랐어요"로 말한다 | 4.9절은 방향만 정했다 | |
| 12 | 임시 마감 화면과 발견 장면 넘기기를 P11에 넣었다. 정식 마감 화면은 P22 | 10장은 SL6 | P11부터 0단을 끝까지 해 볼 수 있다 |
| 13 | 개발용 바로가기 `index.html#d3-02`(주문), `index.html#S2`(발견 장면)와 점검용 창구 `window.__sbg`를 뒀다. 바로가기로 한 것은 저장하지 않는다 | 없음 | 주문 하나를 바로 열어 확인하려고 |
| 14 | 진행 점은 원래 주문 수만큼만 그린다. 다시 나온 ◐ 주문은 그 주문의 점에 "지금" 표시만 한다 | 7.2절은 점을 정하지 않았다 | |

## 0.8 결정 항목 D9~D13의 기본값

설계서 3.3절의 권장안으로 썼다. 바꾸려면 해당 프롬프트를 붙이기 전에 AI에게 알린다.

| # | 결정 | 이 문서의 기본값 | 쓰이는 곳 |
|---|---|---|---|
| D9 | 그림 방향 | 평면 도형을 다듬은 인라인 SVG. 캐릭터는 주방 타이머 하나 | P27 |
| D10 | 저장소와 배포 | 새 GitHub 저장소 + Vercel 정적 배포 | 14장, P22, P33 |
| D11 | 이름 | 가게 "잇단음표 식빵 공방", 본점 "본점", 캐릭터 "타이머". 이름을 정하면 P27을 붙이기 전에 알려 준다 | P27, P29 |
| D12 | 0단의 선반 이름표 | 박 수로 묻는 주문은 음표 이름만, 이름으로 묻는 주문은 박 수만, 그 밖에는 둘 다 | P04의 `shelfLabel` |
| D13 | 6/8 분점의 표기 | v1.0 범위 밖. 이 문서는 다루지 않는다 | 없음 |

---

# 1장. Step 0 헌법

## P00. 헌법 (Step 0)

**목표.** 규칙, 용어, 구조, 정답표를 AI에게 먼저 잠근다. AI가 질문 11개에 답하게 해서 이해를 확인한다.

**쓰는 때.** 맨 처음 한 번. 세션을 새로 열 때마다 12장의 복원 프롬프트와 함께 다시 붙인다. 파일을 직접 고치는 도구에서는 아래 블록을 `docs/constitution.md`로 저장하고 "docs/constitution.md를 읽고 맨 끝의 질문 11개에 답해 줘"라고 한다.

````text
[P00 · 헌법]

너는 『잇단음표 식빵 공방』이라는 음악이론 학습 게임을 `index.html` 한 파일로 만드는 일을 돕는다. 이 글은 작업 내내 지키는 규칙이다. 뒤에 오는 프롬프트가 이 글과 어긋나 보이면 작업을 멈추고 사람에게 묻는다.

이 글을 다 읽은 뒤 맨 끝의 질문 11개에 답한다. 코드는 아직 쓰지 않는다.

━━━━━━━━━━━━━━━━━━━━
1. 무엇을 만드는가
━━━━━━━━━━━━━━━━━━━━

- 식빵 한 덩이가 음표 하나다. 덩이의 길이가 음표의 길이다.
- 덩이를 같은 크기 n조각으로 썰면 조각 하나가 음 하나다.
- 덩이를 잇단음표 없이 나눈 칸을 "보통 칸(틀)"이라 한다. 보통 칸의 수 m과 조각 수 n이 다르면 잇단음표다. 같으면 일반 분할이다.
- 플레이어는 주문을 받아 덩이를 고르고(고르기), 칼집 수를 정하고(재단), 이름표를 붙이고(이름표), 박에 맞춰 썰고(썰기), 원래 소리와 조각 리듬을 듣는다(납품).
- 영업일(단)이 6개, 주문이 43개다. 박자는 4/4, 4분음표가 1박이다.
- 산출물은 `index.html` 하나다. 모바일 세로 화면(320×568 이상)에서 스크롤 없이 한 화면에 들어간다.

━━━━━━━━━━━━━━━━━━━━
2. 시리즈 규칙 (어기면 버그)
━━━━━━━━━━━━━━━━━━━━

S1. 산출물은 `index.html` 한 파일이다. 파일을 나누지 않는다.
S2. 외부 의존성 0. 라이브러리, CDN, 외부 글꼴, 이미지 파일을 쓰지 않는다. 외부 요청은 0건이다.
S3. 이론 값을 표로 적지 않는다. 음표 길이, 보통 칸 수, 이름, 비율, 이름표 보기는 엔진이 계산한다.
S4. 상태는 `setState()` 한 곳에서만 바꾼다.
S5. 저장은 `localStorage`에 하고, 쓸 수 없으면 메모리에만 둔다.
S6. 저장 스키마는 `version: 1`이다. 필드를 더할 때는 없는 필드를 기본값으로 채우고 버전을 올리지 않는다.
S7. 주파수는 `440 × 2^((midi − 69) / 12)` 하나로만 계산한다.
S8. 소리 언락은 `click`, `touchstart`, `keydown` 세 가지에 모두 건다.
S9. 소리는 Web Audio 합성음만 쓴다. 오디오 파일 0개.
S10. 자동 검사가 전부 통과해야 다음 작업으로 간다.
S11. 일반 분할을 잇단음표라고 부르지 않는다. "8분음표 2개 · 일반 분할"처럼 적는다.

━━━━━━━━━━━━━━━━━━━━
3. 이 게임의 규칙 R1~R14 (어기면 버그)
━━━━━━━━━━━━━━━━━━━━

R1. 한 영역 한 배율. 선반과 도마 각각의 안에서 덩이, 틀, 유령 빵, 눈금은 모두 같은 px/박이다. 도마의 배율은 폭 ÷ 올라온 것 가운데 가장 긴 박 수다.
R2. 길이는 분수로 계산한다. 소수로 바꾸는 곳은 화면 좌표와 소리 시각뿐이다. 음표 길이 표, 비율 표를 두지 않는다.
R3. 주문에는 씨앗만 적는다(주문 방식, 덩이, 조각 수, 도움 설정). 이름, 비율, 보기, 문구 속 수치는 엔진이 만든다.
R4. n조각 = 칼질 n−1번. 재단, 썰기, 판정, 문구 어디에도 예외가 없다. 박 위의 탭은 칼질이 아니다.
R5. 모든 소리는 오디오 클록에 한 번에 예약하고 묶음으로 취소한다. 타이머로 음을 이어 붙이지 않는다.
R6. 음높이가 있는 소리는 조각 음과 원래 소리 둘뿐이다. 메트로놈, 칼, 도장 소리는 잡음으로 만든다.
R7. 커서와 판정은 같은 시계("지금 들리는 시각")를 쓴다. 화면 시계는 소리를 쓸 수 없을 때만 쓴다.
R8. 썰기 결과는 진행 관문이 아니다. 영업일 통과는 고르기, 재단, 이름표의 1차 정답으로만 정한다.
R9. 영업 화면은 320×568 이상, 높이 550px 이상에서 스크롤이 없다. 조작부 높이는 94px로 고정한다.
R10. 글자 12px 이상(판독 줄 13.5px 이상), 단추 44px 이상(주 단추 52px 이상), 대비 4.5:1 이상. 예외: 높이 620px 미만에서 고르기 선반 줄 38px.
R11. 외부 요청 0건(글꼴 포함), 이모지 0.
R12. 틀(HUD, 주문 카드, 선반, 도마, 판독 줄, 조작부)은 한 번만 만든다. 도마 안은 그릴 내용이 바뀔 때만 다시 만들고, 썰기와 듣기 도중에는 만들지 않는다. 포커스를 잃지 않는다.
R13. 소리가 멈추면 재생을 중단하고 알린다. 화면이 가려져도 같다. 소리 상태를 숨기지 않는다.
R14. 오답은 결과물을 그대로 보여 주고 원인을 말한다. 벌점, 목숨, 제한 시간이 없다. 두 번 틀리면 고쳐 주고 ◐로 적는다.

━━━━━━━━━━━━━━━━━━━━
4. 작업 규칙 W1~W14
━━━━━━━━━━━━━━━━━━━━

W1. 한 번에 프롬프트 하나만 한다. 다음 프롬프트의 일을 미리 하지 않는다.
W2. 프롬프트에 "코드 (그대로)"라고 적힌 블록은 한 글자도 바꾸지 않고 "넣을 자리"에 넣는다. 이름, 순서, 주석, 줄바꿈을 손보지 않는다. 더 좋은 방법이 보여도 넣은 뒤에 보고만 한다.
W3. 검사(11 TESTS 구획)와 잠금 정답표(`LOCK`)는 고치지 않는다. 검사가 실패하면 앱 코드를 고친다. 기대값이 틀렸다고 판단하면 멈추고 사람에게 묻는다.
W4. 구획 머리 주석 12개(`// == 1 THEORY ==` … `// == 12 BOOT ==`)를 지우거나 옮기거나 고치지 않는다. 검사가 이 주석으로 구획을 찾는다.
W5. 12 BOOT 구획의 마지막 줄은 `boot();`다. 12 구획에 넣는 코드는 `function boot()` 위에 넣는다. `boot();` 아래에 `const`나 `let`을 두면 시작할 때 오류가 난다.
W6. HTML의 id와 class 이름을 바꾸거나 지우지 않는다(6절의 목록).
W7. 상태를 직접 고치지 않는다. `S.x = …`, `S.list.push(…)`를 쓰지 않는다. 계산부는 바꿀 값만 돌려주고 `setState()`가 적용한다.
W8. 음과 상태를 타이머로 잇지 않는다. `setTimeout`은 화면 크기 변화의 디바운스 한 곳뿐이다. `setInterval`은 쓰지 않는다.
W9. 앱 코드에 음표 이름, 잇단 이름, 비율, 1/3 같은 소수를 글자로 적지 않는다. `noteKo(den)`, `nameKo(spec)`, `labelKo(label)`, `splitKo(spec)`, `beatsKo(frac)`로 만든다. 검사 TH-13이 소스에서 찾아낸다.
W10. 자리와 폭은 %로 준다(`left = i/n × 100%`). px를 누적하지 않는다.
W11. `alert`, `confirm`, `prompt`를 쓰지 않는다. 확인이 필요하면 화면 안의 단추로 묻는다.
W12. 주소는 `#이름`만 쓴다(`index.html#test`). 물음표 뒤의 값을 쓰지 않는다.
W13. 이모지를 쓰지 않는다. 화면 글자는 한국어 해요체다.
W14. 모르는 것은 추측하지 않고 묻는다. 끝나면 11절의 양식으로 보고한다.

━━━━━━━━━━━━━━━━━━━━
5. 용어
━━━━━━━━━━━━━━━━━━━━

| 말 | 뜻 |
|---|---|
| 덩이 | 식빵 한 개. 나누기 전의 원래 음표 하나와 길이가 같다 |
| 조각 | 덩이를 같은 크기로 나눈 것 하나. 음 하나다 |
| 칼집 / 칼질 | 자를 자리를 표시한 점선 / 실제로 자르는 동작 한 번 |
| 보통 칸(틀) | 덩이를 잇단음표 없이 나눈 칸 |
| 선반 / 도마 | 덩이들을 실제 비율로 늘어놓은 영역 / 고른 덩이를 확대해 보는 작업 영역 |
| 재단 / 썰기 | 시간 압박 없이 칼집 수를 정하는 단계 / 박에 맞춰 탭해서 자르는 단계 |
| 이름표 | 조각에 붙는 악보 표기(음표와 잇단 숫자) |
| 숫자 질문 | "이 조각에 잇단 숫자가 필요한가"를 묻는 이름표 단계(2단) |
| 유령 빵 | 틀린 이름표나 틀린 덩이의 전체 시간을 점선 막대로 보여 주는 것 |
| 납품 | 주문의 마지막 단계. 원래 소리와 조각 리듬을 듣고 기록한다 |
| 주문 / 영업일 | 문제 한 개 / 한 판(주문 6~8개) |
| 마감 주문 | 영업일의 마지막 주문. 도움이 꺼져 있다 |
| 발견 장면 | 주문 사이에 끼는 비교 화면. 채점하지 않는다 |
| 레시피 / 칼솜씨 | 주문 하나의 개념 기록(●, ◐) / 썰기 기록(장인, 고른 편, 들쭉날쭉, 기계, –) |
| 판독 줄 | 도마 아래 한두 줄의 안내와 피드백 |
| 탭 패드 | 썰기 단계의 큰 단추 |
| 원래 소리 / 조각 음 | 덩이의 길이만큼 이어지는 낮은 음(392Hz) / 조각이 시작할 때 나는 짧은 높은 음(783.99Hz) |

━━━━━━━━━━━━━━━━━━━━
6. 파일 구조
━━━━━━━━━━━━━━━━━━━━

한 파일 안의 순서: `<style>`(색 토큰, 틀, 영역별 모양) → `<body>`(`#app` 안에 틀과 화면들) → `<script id="main">`.

스크립트는 구획 12개다. 구획 머리 주석은 정확히 이 모양이다.

| 구획 머리 | 맡는 일 | 성격 |
|---|---|---|
| `// == 1 THEORY ==` | 분수, 음표 길이, 분할, 이름 | 순수 함수. `window`와 `document`를 만지지 않는다 |
| `// == 2 LABEL ==` | 이름표, 보기, 전체 시간 | 순수 함수 |
| `// == 3 JUDGE ==` | 판정, 허용폭, 박자 보정, 씨앗 난수 | 순수 함수 |
| `// == 4 ORDERS ==` | 주문 씨앗, 영업일, 발견 장면, 문구 | 자료와 순수 함수 |
| `// == 5 STATE ==` | 상태 `S`, `setState`, 주문 흐름 계산부 `T.*`, 통과 계산 | `T.*`는 순수 함수 |
| `// == 6 VIEW ==` | 배율 계산, 악보, 도마, 선반, `render` | 화면 |
| `// == 7 AUDIO ==` | 재생 계획(순수), 음색, 예약과 취소, 컨텍스트 | 소리 |
| `// == 8 RUN ==` | 재생 시작, 프레임, 탭, 끝내기, 중단 | 소리와 화면을 잇는다 |
| `// == 9 STORAGE ==` | 저장, 불러오기, 폴백, 기록 계산(순수) | |
| `// == 10 SCREENS ==` | 호출부 `act`, 기록, 마감 화면, 그 밖의 화면 | |
| `// == 11 TESTS ==` | 검사 러너, 잠금 정답표 `LOCK`, 검사 51개 | 검사만. 앱 코드가 읽지 않는다 |
| `// == 12 BOOT ==` | 화면 크기 측정, 입력 연결, `boot()` | 마지막 줄은 `boot();` |

- 의존 방향은 1~3 ← 4~5 ← 6~8 ← 10이다. 앞 구획은 뒤 구획을 모른다.
- **계산부와 호출부.** 계산부(`T.pick`, `T.confirmMark`, `planRun`, `queueOf`, `dayScore`, `applyDelivery` 등)는 값을 받아 값을 돌려준다. 화면, 소리, 저장을 만지지 않는다. 호출부(`act`, `begin`, `record`, `render`)가 그 값을 적용한다. 입력 처리기는 `act(T.무엇(S, orderAt(S), …))` 한 줄이다.
- **틀은 HTML에 한 번 적는다.** 조작부의 단계별 묶음도 전부 미리 있고 `hidden`으로만 바꾼다.

HTML의 id(바꾸지 않는다):

```
app  hud hudTitle dots soundChip openSet
order orderTag orderText orderScore orderPlay
shelf  board  readout
controls  cPick pickOk  cMark minus markOut plus markOk  cYesNo yes no
          cLabel lab0 lab1 lab2  cSlice pad padMain padSub machine ship
          cDeliver again next  cScene sceneHear sceneOk
sheet setGuide setSlow offMinus offOut offPlus closeSet foot
title resume days   closeScr closeTitle closeSum closeList restart toTitle
testPage  rotate  main(스크립트)
코드가 만드는 것: lane cursor score testReport testCopy
```

상태 `S`의 필드:

| 필드 | 뜻 |
|---|---|
| `screen` | 지금 화면. `"title"`, `"shift"`(영업), `"close"`(마감). 뒤 단계에서 더한다 |
| `day`, `idx`, `results` | 영업일(`"d0"`~`"d5"`), 그날의 몇 번째 차례인가, 납품한 결과들 `{ recipe: "full" 또는 "half", knife, ng }` |
| `phase` | 주문 안의 단계. `"scene"`, `"pick"`, `"mark"`, `"label"`, `"slice"`, `"deliver"` |
| `sub` | 단계 안의 상태. `"ready"`, `"count"`, `"run"`, `"result"`, `"listen"` |
| `sel` | 도마에 올린 덩이(음표 분모 1, 2, 4, 8). 없으면 `null` |
| `cuts`, `focus` | 덩이별 칼집 수, 마지막에 만진 덩이 |
| `tries`, `assisted` | 이 단계에서 틀린 횟수, 이 주문에서 한 번이라도 틀렸는가(참이면 ◐) |
| `fix`, `wrong`, `ghost` | 재단의 오답 표시, 꺼 둔 보기, 유령 빵 `{ beats, text }` |
| `label` | 준비 박 숫자, "원래 소리", "조각 리듬" |
| `knife`, `ng` | 이 주문의 가장 좋은 칼솜씨, 안내선을 끄고 장인을 냈는가 |
| `hearing`, `endedAt`, `scene`, `guideNow` | 주문 듣기 중인가, 썰기가 끝난 시각, 발견 장면 이름, 지금 안내선이 보이는가 |
| `msg` | 판독 줄 `{ tone: "", "good", "warn", "bad" 가운데 하나, text }` |
| `sliced`, `cards`, `dev`, `sum` | 그날 썰기를 한 적이 있는가, 그날 얻은 카드, 개발용 바로가기로 들어왔는가, 마감 계산 결과 |
| `guide`, `slow`, `offset`, `showMs`, `sheet` | 설정: 안내선, 느리게, 탭 보정(ms), 오차 수치 보이기 / 설정 시트가 열렸는가 |

주소 바로가기:

| 주소 | 하는 일 |
|---|---|
| `index.html#test` | 검사 결과 화면. 맨 위 글상자의 첫 줄이 "자가검사 n/n …"이다 |
| `index.html#shift` | P01~P05에서만 쓴다. 빈 틀을 보여 준다 |
| `index.html#d3-02` | P06부터. 그 주문을 바로 연다. 앞 주문은 모두 ●로 친다. 저장하지 않는다 |
| `index.html#S2` | P06부터. 그 발견 장면을 바로 연다. 저장하지 않는다 |

점검용 창구: `window.__tests`(검사 결과), `window.__sbg`(상태와 계산 함수 읽기). 게임 코드는 이 둘을 읽지 않는다.

━━━━━━━━━━━━━━━━━━━━
7. 공식
━━━━━━━━━━━━━━━━━━━━

- 음표 길이(온음표 = 1): `(2^(dots+1) − 1) / (den × 2^dots)`
- 박 길이: 온음표 기준 길이 × 4 (4/4)
- 보통 칸 수 m: n을 넘지 않는 가장 큰 `2^k`. (점음표 덩이는 n을 넘지 않는 가장 큰 `3 × 2^k`, n이 3보다 작으면 3. v1.0의 주문에는 없다)
- 표기 음표 = `T ÷ m`, 조각 길이 = `T ÷ n`, 잇단 여부 = `n ≠ m`, 비율 = `n:m`
- 칼집 자리 = `k × T/n` (k = 1 … n−1), 음이 시작하는 자리 = `k × T/n` (k = 0 … n−1)
- 이름표의 전체 시간: 숫자가 없으면 `음표 길이 × 개수`, 있으면 `음표 길이 × (숫자를 넘지 않는 가장 큰 2^k)`
- 허용폭: `max(바닥, min(조각 길이 × 비율, 천장))`. 장인은 (15%, 50ms, 120ms), 고른 편은 (30%, 90ms, 240ms)
- 초 = 박 × 60 ÷ bpm. 화면 길이 = 박 × 그 영역의 px/박. 빠르기는 길이를 바꾸지 않는다
- 주파수 = `440 × 2^((midi − 69) / 12)`. 조각 음은 MIDI 79, 원래 소리는 MIDI 67
- 통과에 필요한 ● 수 = 주문 수 × 0.8의 올림

━━━━━━━━━━━━━━━━━━━━
8. 잠금 정답표
━━━━━━━━━━━━━━━━━━━━

엔진이 계산한 값이다. 코드가 이 표와 다른 값을 내면 코드가 틀린 것이다. 이 표를 코드에 옮겨 적지 않는다. 검사용 `LOCK`만 이 값을 갖는다.

덩이 4종:

| 덩이(식빵) | 길이 | 썰기에 놓는 덩이 수 | 썰기의 전체 박 |
|---|---|---|---|
| 온음표 | 4박 | 1개 | 4박 |
| 2분음표 | 2박 | 2개 | 4박 |
| 4분음표 | 1박 | 4개 | 4박 |
| 8분음표 | ½박 | 4개 | 2박 |

분할 11가지:

| 덩이 | 조각 수 | 보통 칸 수 | 표기 음표 | 이름과 비율 | 한 조각 | 처음 나오는 주문 |
|---|---|---|---|---|---|---|
| 온음표 (4박) | 2 | 2 | 2분음표 | 2분음표 2개 · 일반 분할 | 2박 | d1-03 |
| 온음표 (4박) | 3 | 2 | 2분음표 | 2분음표 셋잇단음표 (3:2) | 4/3박 | d3-03 |
| 온음표 (4박) | 4 | 4 | 4분음표 | 4분음표 4개 · 일반 분할 | 1박 | d1-07 |
| 2분음표 (2박) | 2 | 2 | 4분음표 | 4분음표 2개 · 일반 분할 | 1박 | d1-02 |
| 2분음표 (2박) | 3 | 2 | 4분음표 | 4분음표 셋잇단음표 (3:2) | 2/3박 | d3-02 |
| 2분음표 (2박) | 4 | 4 | 8분음표 | 8분음표 4개 · 일반 분할 | ½박 | d1-05 |
| 4분음표 (1박) | 2 | 2 | 8분음표 | 8분음표 2개 · 일반 분할 | ½박 | d1-01 |
| 4분음표 (1박) | 3 | 2 | 8분음표 | 8분음표 셋잇단음표 (3:2) | 1/3박 | d2-02 |
| 4분음표 (1박) | 4 | 4 | 16분음표 | 16분음표 4개 · 일반 분할 | 1/4박 | d1-04 |
| 8분음표 (½박) | 2 | 2 | 16분음표 | 16분음표 2개 · 일반 분할 | 1/4박 | d1-06 |
| 8분음표 (½박) | 3 | 2 | 16분음표 | 16분음표 셋잇단음표 (3:2) | 1/6박 | d3-04 |

이름표 보기(정답, 오답 1, 오답 2). 오답은 전체 시간이 덩이와 다르다. 화면에 놓는 순서는 주문마다 정해진 씨앗으로 섞는다:

| 덩이 ÷ 조각 | 정답 (전체 시간) | 오답 1 (전체 시간) | 오답 2 (전체 시간) |
|---|---|---|---|
| 온음표 ÷ 2 | 2분음표 2개 (4박) | 온음표 2개 (8박) | 4분음표 2개 (2박) |
| 온음표 ÷ 3 | 2분음표 셋잇단 (4박) | 2분음표 3개 (6박) | 4분음표 셋잇단 (2박) |
| 온음표 ÷ 4 | 4분음표 4개 (4박) | 2분음표 4개 (8박) | 8분음표 4개 (2박) |
| 2분음표 ÷ 2 | 4분음표 2개 (2박) | 2분음표 2개 (4박) | 8분음표 2개 (1박) |
| 2분음표 ÷ 3 | 4분음표 셋잇단 (2박) | 4분음표 3개 (3박) | 8분음표 셋잇단 (1박) |
| 2분음표 ÷ 4 | 8분음표 4개 (2박) | 4분음표 4개 (4박) | 16분음표 4개 (1박) |
| 4분음표 ÷ 2 | 8분음표 2개 (1박) | 4분음표 2개 (2박) | 16분음표 2개 (½박) |
| 4분음표 ÷ 3 | 8분음표 셋잇단 (1박) | 8분음표 3개 (3/2박) | 4분음표 셋잇단 (2박) |
| 4분음표 ÷ 4 | 16분음표 4개 (1박) | 8분음표 4개 (2박) | 32분음표 4개 (½박) |
| 8분음표 ÷ 2 | 16분음표 2개 (½박) | 8분음표 2개 (1박) | 32분음표 2개 (1/4박) |
| 8분음표 ÷ 3 | 16분음표 셋잇단 (½박) | 16분음표 3개 (3/4박) | 8분음표 셋잇단 (1박) |

썰기 허용폭:

| 한 조각의 길이 | 장인 허용폭 | 고른 편 허용폭 |
|---|---|---|
| 2000ms | ±120ms | ±240ms |
| 1333ms | ±120ms | ±240ms |
| 1000ms | ±120ms | ±240ms |
| 667ms | ±100ms | ±200ms |
| 500ms | ±75ms | ±150ms |
| 333ms | ±50ms | ±100ms |
| 300ms | ±50ms | ±90ms |
| 250ms | ±50ms | ±90ms |
| 200ms | ±50ms | ±90ms |

영업일 6개:

| 단 | 영업일 | 주문 수 | 통과에 필요한 ● | 발견 장면(나오는 자리) |
|---|---|---|---|---|
| 0 | 첫 출근 | 7 | 6 | 없음 |
| 1 | 반으로, 또 반으로 | 7 | 6 | S1(d1-05 앞) |
| 2 | 세 조각의 문제 | 7 | 6 | S2(d2-01 앞), S3(d2-04 앞) |
| 3 | 같은 세 조각, 다른 빵 | 8 | 7 | S4(d3-03 앞) |
| 4 | 바꿔 썰기 | 6 | 5 | 없음 |
| 5 | 거꾸로 읽기 | 8 | 7 | 없음 |

발견 장면 4개:

| 장면 | 도마의 줄(위에서부터) | 주문 카드의 문장 | 판독 줄의 문장 |
|---|---|---|---|
| S1 | 8분음표 2개 · 일반 분할 / 4분음표 2개 · 일반 분할 | 조각 수는 같은데 길이가 달라요. | 덩이가 길면 조각도 길어요. |
| S2 | 보통 칸 2개 · 8분음표 / 8분음표 셋잇단음표 (3:2) / 보통 칸 4개 · 16분음표 | 3조각은 8분음표보다 짧고 16분음표보다 길어요. | 딱 맞는 음표가 없어서 8분음표에 숫자 3을 붙여요. |
| S3 | 8분음표 2개 · 일반 분할 / 8분음표 셋잇단음표 (3:2) / 16분음표 4개 · 일반 분할 | 같은 1박을 2, 3, 4로 나눴어요. | 2와 4는 보통 음표이고 3에만 숫자가 필요해요. |
| S4 | 8분음표 셋잇단음표 (3:2) / 4분음표 셋잇단음표 (3:2) | 둘 다 셋잇단이지만 이름이 달라요. | 이름은 덩이가 정해요. |

주문 43개의 씨앗은 P04의 코드에 들어 있다. 씨앗을 고치거나 순서를 바꾸지 않는다.

━━━━━━━━━━━━━━━━━━━━
9. 한 주문의 흐름
━━━━━━━━━━━━━━━━━━━━

```
(scene)   발견 장면. [알겠어요] → 다음 주문의 첫 단계                채점 없음
pick      선반에서 고르고 [확정]
            맞음 → mark (고르기 주문이면 deliver)
            틀림 → pick에 머문다. 1차 원인 안내, 2차 정답 덩이를 올려 줌
mark      칼집 수를 정하고 [확정]
            맞음 → label (주문의 label이 yesno, choose일 때) 또는 slice
            틀림 → mark에 머문다. 1차 오답 표시, 2차 칼집을 고쳐 줌
label     숫자 질문 또는 보기 3개
            맞음 → slice
            틀림 → label에 머문다. 틀린 단추가 꺼지고 근거(유령 빵)를 보여 줌
slice     ready → count → run → result
            result, ready → count   다시 썰기, 기계 썰기
            count, run → ready      소리 정지, 화면 가림(중단)
            ready, result → deliver 납품
deliver   listen ⇄ ready
            [다음 주문] → 다음 주문의 첫 단계, 마지막이면 마감 화면
```

- 허용하는 전이는 이 그림뿐이다. 단계 안에서 틀렸을 때는 단계를 옮기지 않고 표시(`fix`, `ghost`, `wrong`)만 바꾼다.
- 주문 방식별 첫 단계: 말 주문은 mark(덩이가 이미 올라와 있다), 고르기, 악보, 소리 주문은 pick.
- 레시피: 그 주문의 고르기, 재단, 이름표를 모두 한 번에 맞히면 ●, 한 번이라도 틀리면 ◐.
- ◐로 끝난 주문은 마감 주문 앞에 한 번 더 나온다. 다시 나온 주문의 결과는 레시피 카드에는 적지만 그날의 통과 계산에는 넣지 않는다.
- 통과: ●가 주문 수의 80% 이상(올림). 썰기 결과는 넣지 않는다(R8).

━━━━━━━━━━━━━━━━━━━━
10. 썰기와 소리의 규칙
━━━━━━━━━━━━━━━━━━━━

썰기:

| 항목 | 값 |
|---|---|
| 덩이 수 | 4박 덩이 1개, 2박 덩이 2개, 1박과 ½박 덩이 4개. 연속 주문은 주문의 덩이 그대로 |
| 준비 박 | 그날 첫 썰기 4박, 그 뒤 2박. 듣기는 늘 2박 |
| 빠르기 | ♩=60. 8분음표 덩이의 주문은 ♩=50. "느리게"를 켜면 10을 뺀다 |
| 칼(커서) | 덩이 줄의 왼쪽 끝에서 오른쪽 끝까지 전체 박 수만큼 걸려 일정하게 지나간다 |
| 첫 음 | 덩이가 시작할 때 저절로 난다(조각 음). 메트로놈은 박마다 |
| 탭 | 탭 패드, 스페이스바, Enter. 탭한 순간 칼이 있던 자리에 칼질이 그려지고 칼 소리가 난다 |
| 박 위의 탭 | 덩이 경계에서 조각 길이의 25% 안이면 칼질로 세지 않는다. 경계 양쪽 덩이 가운데 더 잘게 나뉜 쪽의 조각 길이를 쓴다 |
| 범위 밖의 탭 | 시작 전과 끝난 뒤의 탭은 버린다 |
| 조각 수 판정 | 덩이마다 n조각인가. 아니면 "조각 수가 달라요"로 끝낸다 |
| 등급 | 모든 칼질이 장인 허용폭 안이면 장인, 고른 편 허용폭 안이면 고른 편, 넘으면 들쭉날쭉 |
| 색 표시 | 폭이 고른 값과 15% 넘게 다른 조각. 두꺼우면 호박색, 얇으면 푸른색 |
| 재시작 보호 | 끝난 뒤 0.6초 동안 탭 패드가 다시 시작하지 않는다. 주문이나 단계가 바뀌면 푼다 |
| 손 떼기 | 썰기 도중에 누른 손가락을 뗄 때 생기는 `click`은 버린다 |
| 기록 | 그 주문에서 낸 가장 좋은 등급. 기계 썰기는 "기계", 썰지 않으면 "–" |
| 납품 | 썰기 도중이 아니면 언제든 할 수 있다 |

음색:

| 소리 | 만드는 법 |
|---|---|
| 조각 음 | 삼각파, MIDI 79(783.99Hz). 8ms에 최고값, 그 뒤 감쇠 |
| 원래 소리 | 삼각파, MIDI 67(392.00Hz). 덩이의 시간만큼 유지하고 마지막 0.05초에 줄인다 |
| 메트로놈 | 대역 통과 잡음 35ms(센박 2600Hz, 여린박 1700Hz, Q 6) |
| 칼 소리 | 잡음 40ms(3200Hz) + 조각 음 |
| 마스터 | 게인 0.8 |

예약(재생 하나를 시작할 때 모든 음을 한 번에 예약한다):

```
t0   = 지금 + 0.12초                         준비 박의 첫 박
tb0  = t0 + 준비 박 × 한 박의 초              본 구간의 시작
듣기   P = max(1, 올림(전체 박))               한 번의 재생이 차지하는 박 수
       메트로놈   tb0 + k박. 재생이 시작하는 박은 센박
       원래 소리  덩이 q마다 tb0 + q × 덩이 박, 길이 = 덩이 박
       조각 리듬  tb0 + (P + q × 덩이 박 + i × 덩이 박 ÷ n_q)박
썰기   메트로놈   tb0 + k박 (k = 0 … 올림(전체 박))
       첫 음      덩이 q마다 tb0 + q × 덩이 박
       기계 칼    tb0 + (q × 덩이 박 + k × 덩이 박 ÷ n_q)박 (k = 1 … n_q − 1)
끝     tb0 + 구간 박 + 0.3초
```

- 고르기 주문의 듣기는 원래 소리만 들려준다. 그 밖에는 원래 소리 → 조각 리듬이다. 둘은 같은 박에서 시작해 같은 길이 뒤에 끝난다.
- 새 재생을 시작하면 앞선 재생의 모든 음을 멈춘다. 아직 시작하지 않은 음은 소리 없이 끝난다.
- 지금 들리는 시각 = `ctx.currentTime − (ctx.outputLatency || ctx.baseLatency || 0)`. 커서와 탭이 모두 이 시각을 쓴다. 탭에는 탭 보정값을 뺀다.
- 소리를 쓸 수 없으면(컨텍스트를 만들지 못했거나, 시작 1.2초 뒤에도 시계가 움직이지 않으면) 화면 시계로 이어 가고 예약한 소리는 취소한다.
- 재생 도중 지금 들리는 시각이 0.8초 넘게 그대로면 중단한다. 컨텍스트가 `running`이 아니게 되었을 때와 화면이 가려졌을 때도 중단한다.
- 컨텍스트가 `running`이 아니면 HUD에 "소리 켜기"가 보인다.

━━━━━━━━━━━━━━━━━━━━
11. 보고 양식
━━━━━━━━━━━━━━━━━━━━

프롬프트 하나를 끝낼 때마다 이 다섯 줄로 보고한다.

```
1. 한 일: (프롬프트 번호, 넣거나 바꾼 코드 번호)
2. #test 한 줄: (그대로 붙인다. 열어 볼 수 없으면 "열어 보지 못함. 사람이 확인해 주세요"라고 적는다)
3. 그대로 넣지 못한 곳: (없으면 "없음")
4. 헌법과 어긋나 보이는 점: (없으면 "없음")
5. 사람이 볼 것: (그 프롬프트의 완료 기준 가운데 화면이나 소리로만 확인할 수 있는 것)
```

통과하지 못한 것을 통과했다고 적지 않는다. 돌려 보지 못한 것은 "확인 못 함"이라고 적는다.

━━━━━━━━━━━━━━━━━━━━
12. 먼저 답할 질문 11개
━━━━━━━━━━━━━━━━━━━━

각 질문에 한두 문장으로 답한다.

1. 2박 식빵을 3조각으로 나누면 왜 4분음표로 적는가?
2. 3조각을 내려면 칼질은 몇 번인가? 박 위에서 친 탭은 어떻게 하는가?
3. 1박 식빵을 2조각으로 나눈 것은 둘잇단음표인가?
4. 2박 식빵의 이름표로 "4분음표 3개"를 고르면 화면에 무엇이 보여야 하는가?
5. 조각 길이 1/3박을 코드에서 0.333으로 두면 안 되는 이유는?
6. 썰기에서 커서와 판정이 서로 다른 시계를 쓰면 어떻게 되는가?
7. 조각 리듬의 둘째 음을 `setTimeout`으로 내면 안 되는 이유는?
8. 썰기가 "들쭉날쭉"이어도 다음 영업일이 열리는가?
9. 소리 주문에서 리듬만 들려주면 안 되는 이유는?
10. 썰기 도중 소리 시계가 멈추면 어떻게 하는가?
11. 온음표 덩이와 8분음표 덩이를 도마에 함께 놓을 때 지킬 것은?

답한 뒤 "P01을 기다립니다"라고 적고 멈춘다.
````

### P00의 정답 (사람이 견준다)

| # | 답에 들어 있어야 하는 것 |
|---|---|
| 1 | 보통 칸 2개가 4분음표라서. 조각은 2/3박으로 4분음표보다 짧고, 그 사실을 숫자 3으로 알린다 |
| 2 | 2번. 박 위의 탭은 칼질로 세지 않는다 |
| 3 | 아니다. 8분음표 2개, 일반 분할이다 |
| 4 | 3박짜리 유령 빵. 도마의 배율이 3박에 맞춰지고 덩이는 폭의 2/3로 줄어든다 |
| 5 | 조각의 합이 덩이와 정확히 같아야 한다. 분수로 계산하고 화면 좌표와 소리 시각에서만 소수로 바꾼다 |
| 6 | 보이는 칼과 잘리는 자리가 어긋난다. 둘 다 "지금 들리는 시각"을 쓴다 |
| 7 | 박이 흔들리고 취소할 수 없다. 모든 음을 한 번에 예약하고 묶음으로 취소한다 |
| 8 | 열린다. 통과는 고르기, 재단, 이름표의 1차 정답으로만 정한다 |
| 9 | 1박 덩이의 2조각과 2박 덩이의 4조각은 같은 8분음표라 가릴 수 없다. 원래 소리를 먼저 들려준다 |
| 10 | 재생을 중단하고 준비 상태로 돌아가 알린다. "소리 켜기"를 보여 준다 |
| 11 | 같은 배율. 8분음표 덩이는 온음표 덩이의 1/8 폭이다 |

### 완료 기준

- [ ] AI가 질문 11개에 모두 답했고 위 표와 뜻이 같다.
- [ ] AI가 코드를 쓰지 않고 멈췄다.
- [ ] 답이 틀린 질문이 있으면 "N번의 답이 틀렸다. 헌법의 해당 규칙을 다시 읽고 고쳐 답해라"라고 한 뒤 다시 견줬다.

---

# 2장. SL0 뼈대 (v0.0)

## P01. 틀 [그대로]

**목표.** `index.html`을 만든다. 색 토큰, 영업 화면의 여섯 줄, 단계별 조작부 묶음, 스크립트의 구획 12개가 들어 있는 출발 파일이다. 뒤의 프롬프트는 모두 이 파일의 정해진 자리에 코드를 더한다.

**설계서.** 8.1절(배치와 모드), 8.3절(색 토큰), 9.1절(구조), 9.2절(상태).

````text
[P01 · SL0-1 · 틀]  종류: 그대로

시작 전 상태
- 헌법(P00)을 읽었고 질문 11개에 답했다. 아니라면 멈추고 헌법을 요청한다.
- `index.html`이 아직 없다.

이번에 하는 일
- 아래 파일을 `index.html`로 저장한다. 한 글자도 바꾸지 않는다(W2).
- 이 파일에 들어 있는 것:
  · `<style>`: 색 토큰, 여섯 줄 틀(HUD 44px, 주문 카드, 선반, 도마, 판독 줄, 조작부 94px), 좁음(높이 620px 미만), 기본, 넉넉(760px 이상) 모드, 뒤 단계에서 쓸 모양 전부
  · `<body>`: `#app` 안에 틀, 단계별 조작부 묶음 7개(`cPick` … `cScene`), 설정 시트, 임시 처음 화면, 마감 화면, 검사 화면 자리, "세로로 돌려 주세요"
  · `<script id="main">`: 구획 머리 12개, 상태 `S`와 `setState`(5), 임시 `render`(6), 소리 변수(7), 화면 크기 측정 `measure`와 `boot`(12)
- 뒤의 프롬프트는 "N 구획의 끝에 붙인다" 또는 "이 함수를 지우고 그 자리에 넣는다"로 자리를 가리킨다. 구획 머리 주석이 그 기준이다.

■ 파일 (그대로)

```html
<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>잇단음표 식빵 공방</title>
<style>
:root{
  /* 배치: 한 화면. HUD → 주문 카드 → 선반(실제 비율) → 도마(남는 높이) → 판독 줄 → 조작부(94px 고정). 밝은 조리대 한 가지 테마 */
  --counter:#e8eef2; --panel:#ffffff; --line:#cbd6de;
  --ink:#1a2630; --ink-2:#4b5b68;
  --board:#f2e3c6; --board-edge:#d3b98c;
  --crust:#98581f; --crumb:#fdeecb; --crumb-2:#f6deab; --lit:#ffd35c;
  --steel:#17627e; --steel-soft:#dcedf4;
  --good:#256f43; --warn:#8f5000; --bad:#ab3626;
  --font:system-ui,-apple-system,"Apple SD Gothic Neo","Malgun Gothic","Noto Sans KR",sans-serif;
  color-scheme:light;
}
*{box-sizing:border-box}
html,body{height:100%;margin:0}
body{background:var(--counter);color:var(--ink);font:15px/1.4 var(--font);word-break:keep-all;overflow-wrap:anywhere;-webkit-text-size-adjust:100%;overscroll-behavior:none}
p,h1,ol{margin:0}
[hidden]{display:none!important}
button{font:inherit;color:inherit;cursor:pointer;touch-action:manipulation;-webkit-tap-highlight-color:transparent}
button:focus-visible,input:focus-visible{outline:3px solid #e8961c;outline-offset:2px}

#app{position:relative;height:100%;max-width:720px;margin:0 auto;padding:8px 12px;display:grid;grid-template-rows:44px auto auto minmax(0,340px) auto 94px;align-content:space-between;gap:8px}
#app.tight{gap:6px;padding:6px 10px}

.hud{display:flex;align-items:center;gap:8px;min-width:0}
.hud strong{font-size:15px;white-space:nowrap}
.dots{display:flex;gap:4px;list-style:none;padding:0;flex:1;min-width:0}
.dots li{width:12px;height:12px;border-radius:50%;border:1.5px solid var(--ink-2);flex:none}
.dots li.cur{border-color:var(--steel);box-shadow:0 0 0 2.5px var(--steel-soft)}
.dots li.full{background:var(--ink);border-color:var(--ink)}
.dots li.half{background:linear-gradient(90deg,var(--ink) 50%,transparent 50%);border-color:var(--ink)}
.chip{height:44px;padding:0 10px;border-radius:22px;border:1.5px solid var(--warn);background:#fff3df;color:var(--warn);font-size:13px;font-weight:700;white-space:nowrap}
@media (max-width:419px){.hud.nosound strong{display:none}}
.icon{min-width:52px;height:44px;border-radius:10px;border:1.5px solid var(--line);background:var(--panel);font-size:13px;font-weight:700}

.order{background:var(--panel);border:1px solid var(--line);border-radius:12px;padding:6px 10px;display:grid;grid-template-columns:auto minmax(0,1fr) auto;gap:8px;align-items:center;min-height:56px}
.tag{font-size:12px;font-weight:800;color:var(--steel);background:var(--steel-soft);border-radius:6px;padding:3px 6px;white-space:nowrap}
.otext{font-size:15px;font-weight:800;line-height:1.3}
.oside{display:flex;align-items:center}
.oscore{width:104px;height:48px;display:block}
.mini{height:44px;padding:0 12px;border-radius:10px;border:1.5px solid var(--steel);background:var(--panel);color:var(--steel);font-weight:800;font-size:14px;white-space:nowrap}
.mini:disabled{color:var(--ink-2);border-color:var(--line)}
#app.tight .order{min-height:50px;padding:4px 10px}
#app.tight .otext{font-size:14px}

.shelf{background:var(--panel);border:1px solid var(--line);border-radius:12px;padding:5px 8px;display:grid;gap:1px}
.srow{display:grid;grid-template-columns:86px minmax(0,1fr);gap:8px;align-items:center;height:18px;width:100%;padding:0 4px;border:1.5px solid transparent;border-radius:7px;background:none;text-align:left}
.srow:disabled{color:inherit;cursor:default;opacity:1}
.srow .nm{font-size:12px;font-weight:700;white-space:nowrap}
.srow[aria-pressed="true"]{border-color:var(--steel);background:var(--steel-soft)}
.shelf.pick .srow{height:44px}
.track{position:relative;height:12px;display:block}
.shelf.pick .track{height:22px}
.bar{position:absolute;left:0;top:0;bottom:0;background:var(--crumb);border:2px solid var(--crust);border-radius:5px 5px 3px 3px}
.sruler{display:grid;grid-template-columns:86px minmax(0,1fr);gap:8px;padding:0 5.5px}
#app.tight .srow{height:16px}
#app.tight .shelf.pick .srow{height:38px}
#app.tight .sruler{display:none}

.board{background:var(--board);border:1.5px solid var(--board-edge);border-radius:12px;padding:8px 12px;display:flex;flex-direction:column;justify-content:center;gap:5px;min-height:0;overflow:hidden}
.empty{text-align:center;color:var(--ink-2);font-size:14px;border:1.5px dashed var(--board-edge);border-radius:10px;padding:18px 8px}
.mold{display:flex;height:26px;flex:none}
.mold span{flex:1;min-width:0;border:1.5px dashed var(--ink-2);border-left-width:0;display:grid;place-items:center;font-size:12px;font-weight:700;color:var(--ink-2);white-space:nowrap;overflow:hidden}
.mold span:first-child{border-left-width:1.5px;border-radius:6px 0 0 6px}
.mold span:last-child{border-radius:0 6px 6px 0}
.mold span:only-child{border-radius:6px}
.lane{position:relative;height:60px;flex:none;margin-top:9px}
.loaf{position:absolute;top:0;bottom:0;background:var(--crumb);border-radius:12px 12px 6px 6px;overflow:hidden;border:0;padding:0}
.loaf::after{content:"";position:absolute;inset:0;border:3px solid var(--crust);border-radius:inherit;pointer-events:none}
.loaf.focus::after{border-color:var(--steel)}
.slice{position:absolute;top:0;bottom:0;display:grid;place-items:center;font-size:12px;font-weight:800;font-style:normal;font-variant-numeric:tabular-nums;white-space:nowrap;border-top:8px solid hsl(var(--hue) 55% 44%)}
.slice:nth-child(even){background:var(--crumb-2)}
.slice.num{font-size:16px;border-top-width:0}
.loaf.on,.loaf.on .slice,.slice.on{background:var(--lit)}
.mark{position:absolute;top:0;bottom:0;width:0;border-left:2px dashed var(--steel);margin-left:-1px;pointer-events:none}
.mark.solid{border-left:3px solid var(--ink);margin-left:-1.5px}
.lane.noguide .mark{display:none}
.kc{position:absolute;left:50%;bottom:5px;transform:translateX(-50%);padding:0 5px;border-radius:6px;background:var(--crumb);white-space:nowrap;font-size:12px;font-weight:800;font-style:normal;pointer-events:none}
.dev{position:absolute;top:3px;bottom:3px;opacity:.6}
.dev.thick{background:#e0902a}
.dev.thin{background:#58a6c8}
.cut{position:absolute;top:-4px;bottom:-4px;width:3px;margin-left:-1.5px;background:var(--ink);border-radius:2px}
.cursor{position:absolute;top:-6px;bottom:-6px;left:0;width:3px;margin-left:-1.5px;background:var(--steel);border-radius:2px}
.cursor::before{content:"";position:absolute;left:-5px;top:-7px;border:6.5px solid transparent;border-top-color:var(--steel)}
.board:not(.run) .cursor{display:none}
.ghost{height:22px;flex:none;border:1.5px dashed var(--bad);border-radius:6px;color:var(--bad);font-size:12px;font-weight:800;display:grid;place-items:center;white-space:nowrap;overflow:hidden}
.ruler{position:relative;height:20px;flex:none;border-top:1.5px solid var(--ink-2)}
.ruler span{position:absolute;top:0;transform:translateX(-50%);font-size:12px;font-weight:700;color:var(--ink-2);padding-top:4px;line-height:1.2;font-variant-numeric:tabular-nums;white-space:nowrap}
.ruler span::before{content:"";position:absolute;left:50%;top:0;height:4px;border-left:1.5px solid var(--ink-2)}
.ruler span:first-child{transform:none}
.ruler span:first-child::before{left:0}
.ruler span:last-child{transform:translateX(-100%)}
.ruler span:last-child::before{left:100%}
.sruler .ruler{height:16px}
.score{display:block;width:100%;height:50px;flex:none;overflow:visible}
#app:not(.roomy) .board.pick .lane{height:46px}
#app.tight .board.pick .lane{height:42px}
#app.roomy .lane{height:84px}
#app.roomy .mold{height:30px}

.readout{min-height:40px;padding:0 4px;font-size:13.5px;line-height:1.4;font-weight:600;display:flex;align-items:center}
.readout.good{color:var(--good)}
.readout.bad{color:var(--bad)}
.readout.warn{color:var(--warn)}

.controls{height:94px;display:grid;align-items:center}
.grp{display:grid;gap:8px;align-items:center}
#cMark{grid-template-columns:52px minmax(0,1fr) 52px 96px}
#cYesNo,#cDeliver{grid-template-columns:1fr 1fr}
#cLabel{grid-template-columns:repeat(3,minmax(0,1fr));gap:6px}
#cSlice{grid-template-columns:minmax(0,1fr) 104px}
.btn{min-height:52px;padding:0 8px;border-radius:12px;border:1.5px solid var(--line);background:var(--panel);font-weight:800;font-size:15px}
.btn.pri{background:var(--steel);border-color:var(--steel);color:#fff}
.btn:disabled{color:#73808c;background:#eef2f5;border-color:var(--line);cursor:default}
.sq{width:52px;height:52px;border-radius:12px;border:1.5px solid var(--line);background:var(--panel);font-size:24px;font-weight:700;line-height:1}
.sq.sm{width:44px;height:44px}
.mout{text-align:center;font-weight:800;font-size:15px;font-variant-numeric:tabular-nums}
.lab{min-height:88px;padding:4px 3px;display:grid;grid-template-rows:48px auto;justify-items:center;align-items:center;border-radius:12px;border:1.5px solid var(--line);background:var(--panel)}
.lab svg{width:100%;height:48px;display:block}
.lab span{font-size:12px;font-weight:700;line-height:1.2;text-align:center}
.lab:disabled{background:#eef2f5;color:#73808c;cursor:default}
.pad{height:94px;border:0;border-radius:14px;background:var(--steel);color:#fff;font-size:20px;font-weight:800;line-height:1.2;user-select:none;-webkit-user-select:none}
.pad small{display:block;font-size:12.5px;font-weight:600;margin-top:4px;color:#d7ebf3}
.pad.live{background:var(--ink)}
.side{display:grid;gap:6px}
.side .btn{min-height:44px;font-size:14px}

.sheet{position:absolute;left:12px;right:12px;top:58px;background:var(--panel);border:1.5px solid var(--ink-2);border-radius:14px;padding:8px 12px;display:grid;gap:2px;z-index:5}
.sheet .row{display:flex;align-items:center;gap:10px;min-height:48px;font-size:14px;font-weight:600}
.sheet label{display:flex;align-items:center;gap:10px;min-height:44px}
.sheet input{width:22px;height:22px;accent-color:var(--steel)}
.sheet output{min-width:52px;text-align:center;font-weight:800;font-variant-numeric:tabular-nums}
.foot{color:var(--ink-2);font-size:12px;font-weight:400}
.screen{position:absolute;inset:0;background:var(--counter);padding:16px;display:flex;flex-direction:column;gap:10px;z-index:6;overflow:auto}
.screen h1{font-size:22px}
.screen ol{list-style:none;padding:0;display:grid;gap:4px}
.screen li{background:var(--panel);border:1px solid var(--line);border-radius:10px;padding:8px 10px;display:grid;grid-template-columns:minmax(0,1fr) auto;gap:8px;font-size:14px}
.screen li b{font-variant-numeric:tabular-nums;white-space:nowrap}
.screen .pass b:last-child{color:var(--good)}
.screen .fail b:last-child{color:var(--bad)}
.days{display:grid;gap:8px}
#testReport{width:100%;font:13px/1.5 ui-monospace,Menlo,Consolas,monospace;padding:8px;border:1.5px solid var(--line);border-radius:10px;background:var(--panel);color:var(--ink)}
.rotate{position:fixed;inset:0;z-index:9;background:var(--counter);display:grid;place-items:center;padding:24px;text-align:center;font-size:18px;font-weight:800}
#cScene{grid-template-columns:1fr 1fr}
.refrow{position:relative;height:24px;flex:none}
.refrow .loaf{border-radius:8px 8px 4px 4px}
.board.join .lane{margin-top:3px}
.board.join .empty{padding:8px}
.cap{font-size:12px;font-weight:700;color:var(--ink-2);line-height:1.25}
.board.scene{gap:3px}
#app .board.scene .lane{height:34px;margin-top:0}
#app.roomy .board.scene .lane{height:44px}
.loaf.asmold{background:transparent}
.loaf.asmold::after{border:1.5px dashed var(--ink-2)}
.loaf.asmold .slice{background:transparent;border-top-width:0;color:var(--ink-2)}
.loaf.asmold .mark{border-left:1.5px dashed var(--ink-2)}
</style>
</head>
<body>
<div id="app">
  <header class="hud" id="hud">
    <strong id="hudTitle"></strong>
    <ol class="dots" id="dots" aria-label="주문 진행"></ol>
    <button class="chip" id="soundChip" type="button">소리 켜기</button>
    <button class="icon" id="openSet" type="button" aria-expanded="false">설정</button>
  </header>

  <section class="order" id="order" aria-live="polite">
    <span class="tag" id="orderTag"></span>
    <p class="otext" id="orderText"></p>
    <div class="oside">
      <svg class="oscore" id="orderScore" role="img" hidden></svg>
      <button class="mini" id="orderPlay" type="button" hidden>주문 듣기</button>
    </div>
  </section>

  <section class="shelf" id="shelf" aria-label="선반. 실제 비율"></section>
  <section class="board" id="board" aria-label="도마"></section>
  <p class="readout" id="readout" role="status"></p>

  <section class="controls" id="controls">
    <div class="grp" id="cPick"><button class="btn pri" id="pickOk" type="button">확정</button></div>
    <div class="grp" id="cMark" hidden>
      <button class="sq" id="minus" type="button" aria-label="칼집 줄이기">−</button>
      <output class="mout" id="markOut"></output>
      <button class="sq" id="plus" type="button" aria-label="칼집 늘리기">+</button>
      <button class="btn pri" id="markOk" type="button">확정</button>
    </div>
    <div class="grp" id="cYesNo" hidden>
      <button class="btn" id="yes" type="button">숫자가 필요해요</button>
      <button class="btn" id="no" type="button">필요 없어요</button>
    </div>
    <div class="grp" id="cLabel" hidden>
      <button class="lab" id="lab0" type="button"></button>
      <button class="lab" id="lab1" type="button"></button>
      <button class="lab" id="lab2" type="button"></button>
    </div>
    <div class="grp" id="cSlice" hidden>
      <button class="pad" id="pad" type="button"><span id="padMain"></span><small id="padSub"></small></button>
      <div class="side">
        <button class="btn" id="machine" type="button">기계 썰기</button>
        <button class="btn" id="ship" type="button">납품</button>
      </div>
    </div>
    <div class="grp" id="cDeliver" hidden>
      <button class="btn" id="again" type="button">다시 듣기</button>
      <button class="btn pri" id="next" type="button">다음 주문</button>
    </div>
    <div class="grp" id="cScene" hidden>
      <button class="btn" id="sceneHear" type="button">들어 보기</button>
      <button class="btn pri" id="sceneOk" type="button">알겠어요</button>
    </div>
  </section>

  <section class="sheet" id="sheet" aria-label="설정" hidden>
    <div class="row"><label for="setGuide"><input id="setGuide" type="checkbox" checked>칼집 안내선 보이기</label></div>
    <div class="row"><label for="setSlow"><input id="setSlow" type="checkbox">느리게</label></div>
    <div class="row">
      <span>탭 보정</span>
      <button class="sq sm" id="offMinus" type="button" aria-label="탭 보정 줄이기">−</button>
      <output id="offOut">0ms</output>
      <button class="sq sm" id="offPlus" type="button" aria-label="탭 보정 늘리기">+</button>
    </div>
    <div class="row"><button class="btn" id="closeSet" type="button">닫기</button><span class="foot" id="foot"></span></div>
  </section>

  <section class="screen" id="title" data-screen="title" aria-label="처음 화면">
    <h1>잇단음표 식빵 공방</h1>
    <p class="foot">임시 처음 화면이에요. 타이틀과 영업일 지도는 뒤 단계에서 만들어요.</p>
    <button class="btn pri" id="resume" type="button" hidden>이어서 영업</button>
    <div class="days" id="days"></div>
  </section>
  <section class="screen" id="closeScr" data-screen="close" aria-label="마감" hidden>
    <h1 id="closeTitle">마감</h1>
    <p id="closeSum"></p>
    <ol id="closeList"></ol>
    <button class="btn pri" id="restart" type="button">다시 영업</button>
    <button class="btn" id="toTitle" type="button">처음으로</button>
  </section>
  <section class="screen" id="testPage" data-screen="test" aria-label="자가검사" hidden></section>
  <div class="rotate" id="rotate" hidden>세로로 돌려 주세요</div>
</div>

<script id="main">
(() => {
"use strict";
const $ = (id) => document.getElementById(id);

// == 1 THEORY ==

// == 2 LABEL ==

// == 3 JUDGE ==

// == 4 ORDERS ==

// == 5 STATE ==
// ── 상태: setState()로만 바꾼다 ──
let S = {
  screen: "title", day: "d0", idx: 0, results: [], sliced: false, cards: [], dev: false, sum: null,
  phase: "pick", sub: "ready", sel: null, cuts: [0], focus: 0, tries: 0, assisted: false, fix: false, wrong: [], ghost: null,
  label: "", knife: "", ng: false, hearing: false, endedAt: -1e9, scene: "", guideNow: true, msg: { tone: "", text: "" },
  guide: true, slow: false, offset: 0, showMs: true, sheet: false,
};
function setState(patch) { S = Object.assign({}, S, patch); render(); }

// == 6 VIEW ==
let boardKey = "", boardW = 0, laneLw = 100, shelfKey = "", orderKey = "", labelKey = "", closeKey = "";  // 다시 그릴지 가리는 열쇠와 도마의 폭
function render() {  // SL0: 화면 전환과 빈 틀만. SL2에서 바꾼다
  document.querySelectorAll("#app > .screen").forEach((e) => e.toggleAttribute("hidden", e.dataset.screen !== S.screen));
  $("sheet").toggleAttribute("hidden", !S.sheet);
  if (S.screen !== "shift") return;
  $("hudTitle").textContent = "0단";
  $("orderTag").textContent = "주문";
  $("orderText").textContent = "주문 카드가 놓이는 자리예요. 두 줄까지 들어가요.";
  $("shelf").innerHTML = `<p class="foot">선반이 놓이는 자리</p>`;
  $("board").innerHTML = `<p class="empty">도마가 놓이는 자리</p>`;
  $("readout").textContent = "판독 줄이에요. 안내와 피드백이 두 줄까지 나와요.";
}

// == 7 AUDIO ==
let ctx = null, AUDIO = null, run = null, raf = 0;  // 소리 컨텍스트, 소리 묶음, 지금 도는 재생, 프레임 번호. 여러 구획이 함께 쓴다
const soundOn = (state) => state === "running";  // 아니면 "소리 켜기"를 보여 준다. 컨텍스트가 아직 없을 때도 같다

// == 8 RUN ==

// == 9 STORAGE ==

// == 10 SCREENS ==

// == 11 TESTS ==

// == 12 BOOT ==
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

function boot() {
  measure();
  setState(location.hash === "#shift" ? { screen: "shift" } : {});  // 틀 확인용: 주소 끝에 #shift
}
boot();
})();
</script>
</body>
</html>
```

하지 말 것
- CSS 값, id, class, 문구, 구획 머리를 손보지 않는다.
- 빈 구획에 코드를 미리 채우지 않는다. 선반, 도마, 소리는 뒤 프롬프트에서 온다.
- 파일을 여러 개로 나누지 않는다.

끝나면 보고 (헌법 11절)
- `index.html`의 줄 수(기대: 318줄)
- 구획 머리 12개가 차례로 있는가
````

### 완료 기준

- [ ] T1. `index.html`을 열면 "잇단음표 식빵 공방"과 "임시 처음 화면이에요. 타이틀과 영업일 지도는 뒤 단계에서 만들어요."가 보인다.
- [ ] T2. `index.html#shift`를 열면 위에서부터 여섯 줄이 보인다. HUD에 "0단", "소리 켜기", "설정". 주문 카드에 "주문"과 "주문 카드가 놓이는 자리예요. 두 줄까지 들어가요.". 그 아래 "선반이 놓이는 자리", "도마가 놓이는 자리", "판독 줄이에요. 안내와 피드백이 두 줄까지 나와요.", 맨 아래 [확정] 단추.
- [ ] T3. 320×568, 360×640, 390×844에서 `#shift` 화면에 세로 스크롤과 가로 스크롤이 없다. [확정] 단추가 화면 안에 다 보인다.
- [ ] T4. 창의 높이를 550px보다 낮게 하면(눕힌 폰, 예: 844×390) "세로로 돌려 주세요"가 화면을 덮는다.
- [ ] T5. 개발자 도구의 콘솔에 오류가 없다.
- [ ] T6. 단추를 눌러도 아무 일이 없다(아직 연결하지 않았다). 정상이다.
- [ ] 사본을 남겼다(`P01 통과`).

---

## P02. 저장과 검사 러너 [그대로]

**목표.** 저장소(`localStorage` + 메모리 폴백), 검사 러너, `index.html#test` 화면을 넣는다. 첫 검사 5개가 통과한다.

**설계서.** 9.4절(저장), 9.5절(검사 러너), 11.1절(ST-02, SV-01~SV-04).

````text
[P02 · SL0-2 · 저장과 검사 러너]  종류: 그대로

시작 전 상태
- P01의 `index.html`이 있고 콘솔 오류가 없다. 사람이 다르다고 알려 주면 진행하지 않는다.

이번에 하는 일
- 코드 1: 저장. `defaultSave()`(기본 저장 내용), `readSave(text)`(손상되었거나 더 높은 버전이면 기본값으로 시작하고 원본을 따로 남긴다), `makeStore(backend)`(`localStorage`를 쓸 수 없으면 메모리로 이어 간다), `pickBackend()`.
- 코드 2: 저장소와 저장 내용을 담을 변수.
- 코드 3: 검사 러너(`test`, `ok`, `near`, `same`, `runTests`, `showTests`), 소스 점검 도구(`stripComments`, `appCode`, `hits`), 검사 5개(ST-02, SV-01~SV-04).
- 코드 4: `boot()`를 바꾼다. 저장을 불러오고, 검사를 한 번 돌리고, 주소가 `#test`면 검사 화면을 보여 준다.

■ 코드 1 (그대로)
넣을 자리: 9 STORAGE 구획의 끝(`// == 10 SCREENS ==` 바로 위)에 붙인다.

```js
// ── 저장: localStorage에 두고, 쓸 수 없으면 메모리에만 둔다. 스키마는 version 1을 지킨다 ──
const SAVE_KEY = "sbg_save_v1", BACKUP_KEY = "sbg_save_v1_backup";
const defaultSave = () => ({
  version: 1,
  settings: { volume: 0.8, muted: false, guide: true, slow: false, tapOffsetMs: 0, calibrated: false, showMs: true, motion: "system", tutorialSeen: false },
  days: {},  // "d0": { passed, stamp(0 없음 · 1 도장 · 2 장인 도장), runs, best(● 수의 최고) }
  recipes: {},  // "4/3": { got, knife(0 없음 · 1 들쭉날쭉 · 2 고른 편 · 3 장인) }
  loaves: [],  // 얻은 덩이 카드(음표 분모)
  stats: { orders: 0, clean: 0, slices: 0, master: 0 },
  active: null,  // 하던 영업: { day, index, results: [{ recipe(2 ● · 1 ◐), knife, ng }], cards }
});
function readSave(text) {  // 저장 문자열 → { save, backup }. 손상되었거나 더 높은 버전이면 기본값으로 시작하고 원본을 backup에 담는다
  const def = defaultSave(), obj = (v) => (v && typeof v === "object" && !Array.isArray(v) ? v : {});
  if (text === null || text === undefined || text === "") return { save: def, backup: null };
  let raw;
  try { raw = JSON.parse(text); } catch (e) { return { save: def, backup: text }; }
  if (!raw || typeof raw !== "object" || Array.isArray(raw) || raw.version !== 1) return { save: def, backup: text };
  return { backup: null, save: {  // 없는 필드는 기본값으로 채운다. 버전은 올리지 않는다
    version: 1, settings: Object.assign(def.settings, obj(raw.settings)), days: obj(raw.days), recipes: obj(raw.recipes),
    loaves: Array.isArray(raw.loaves) ? raw.loaves : [], stats: Object.assign(def.stats, obj(raw.stats)), active: raw.active && typeof raw.active === "object" ? raw.active : null,
  } };
}
function makeStore(backend) {  // backend: getItem과 setItem을 가진 것(localStorage). 없거나 실패하면 메모리로 이어 간다
  let mem = null, ok = !!backend;
  return {
    persistent: () => ok,  // 거짓이면 설정 화면에 "이 기기에서는 기록이 저장되지 않아요"
    load() {
      let text = mem;
      if (ok) { try { text = backend.getItem(SAVE_KEY); } catch (e) { ok = false; } }
      const r = readSave(text);
      if (r.backup !== null && ok) { try { backend.setItem(BACKUP_KEY, r.backup); } catch (e) { /* 원본을 남기지 못해도 진행한다 */ } }
      return r.save;
    },
    save(obj) {
      mem = JSON.stringify(obj);
      if (ok) { try { backend.setItem(SAVE_KEY, mem); } catch (e) { ok = false; } }
      return ok;
    },
  };
}
function pickBackend() {  // 아티팩트나 사생활 보호 모드에서는 localStorage가 막혀 있을 수 있다
  try { const ls = window.localStorage, k = "__sbg_probe"; ls.setItem(k, "1"); ls.removeItem(k); return ls; } catch (e) { return null; }
}
```

■ 코드 2 (그대로)
넣을 자리: 10 SCREENS 구획의 끝(`// == 11 TESTS ==` 바로 위)에 붙인다.

```js
let store = null, save = null;  // 저장소와 지금의 저장 내용
```

■ 코드 3 (그대로)
넣을 자리: 11 TESTS 구획의 끝(`// == 12 BOOT ==` 바로 위)에 붙인다.

```js
// ── 검사 러너: 검사는 실패하면 던진다. 화면과 저장을 건드리지 않는다 ──
const TOTAL = { TH: 13, LB: 6, JD: 8, GN: 6, AU: 6, ST: 5, SV: 4, CT: 3 };  // 묶음별 검사 수. 합계 51
const TESTS = [];
const test = (id, name, fn) => TESTS.push({ id, name, fn });
const ok = (cond, what) => { if (!cond) throw new Error(what); };
const near = (a, b) => Math.abs(a - b) < 1e-9;
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);
function runTests() {
  const rows = TESTS.map((t) => { try { t.fn(); return { id: t.id, name: t.name, ok: true, note: "" }; } catch (e) { return { id: t.id, name: t.name, ok: false, note: String(e && e.message) }; } });
  const by = {}, keys = Object.keys(TOTAL), all = keys.reduce((a, k) => a + TOTAL[k], 0), pass = rows.filter((r) => r.ok).length;
  keys.forEach((k) => { const mine = rows.filter((r) => r.id.slice(0, 2) === k); by[k] = { pass: mine.filter((r) => r.ok).length, written: mine.length, total: TOTAL[k] }; });
  const line = `자가검사 ${pass}/${rows.length} (전체 ${all}개 중 ${rows.length}개 작성) · ` + keys.map((k) => `${k} ${by[k].pass}/${by[k].total}`).join(" ");
  return { rows, by, pass, written: rows.length, all, line, failed: rows.filter((r) => !r.ok).map((r) => r.id) };
}
function showTests(t) {  // index.html#test 화면. 맨 위 글상자의 내용을 AI에게 그대로 붙여 준다
  const esc = (x) => String(x).replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]));
  const report = [t.line].concat(t.rows.filter((r) => !r.ok).map((r) => `실패 ${r.id} ${r.name}: ${r.note}`)).join("\n");
  const el = $("testPage");
  el.innerHTML = `<h1>자가검사</h1><textarea id="testReport" readonly rows="${Math.min(12, 2 + t.failed.length)}">${esc(report)}</textarea><button class="btn" id="testCopy" type="button">결과 복사</button>`
    + `<ol>${t.rows.map((r) => `<li class="${r.ok ? "pass" : "fail"}"><span><b>${r.id}</b> ${esc(r.name)}${r.ok ? "" : "<br>" + esc(r.note)}</span><b>${r.ok ? "통과" : "실패"}</b></li>`).join("")}</ol>`;
  $("testCopy").addEventListener("click", () => { const ta = $("testReport"); ta.focus(); ta.select(); try { navigator.clipboard.writeText(ta.value).catch(() => {}); } catch (e) { /* 막혀 있으면 글상자를 직접 복사한다 */ } });
  document.querySelectorAll("#app > .screen").forEach((e) => e.toggleAttribute("hidden", e.id !== "testPage"));
}

// ── 소스 점검용: 주석을 지운 코드(문자열과 정규식 안은 그대로 둔다) ──
function stripComments(src) {
  const n = src.length, word = /[\w$]/;
  let out = "", i = 0;
  const endStr = (j) => {  // j: 여는 따옴표의 자리. 닫는 따옴표 다음 자리를 돌려준다
    const q = src[j];
    for (j++; j < n; j++) {
      if (src[j] === "\\") j++;
      else if (src[j] === q) return j + 1;
      else if (q === "`" && src[j] === "$" && src[j + 1] === "{") {  // 템플릿 안의 ${ … }
        let depth = 1; j += 2;
        while (j < n && depth) { const c = src[j]; if (c === '"' || c === "'" || c === "`") { j = endStr(j); continue; } if (c === "{") depth++; else if (c === "}") depth--; j++; }
        j--;
      }
    }
    return n;
  };
  const regexAllowed = () => {  // 바로 앞이 값이면 나눗셈, 아니면 정규식
    const t = out.replace(/\s+$/, ""), c = t.slice(-1);
    if (!c) return true;
    if (word.test(c)) { const w = /[\w$]+$/.exec(t)[0]; return ["return", "typeof", "case", "in", "of", "void", "delete", "throw", "new", "else", "do"].includes(w); }
    return !")]}".includes(c);
  };
  while (i < n) {
    const c = src[i], d = src[i + 1];
    if (c === "/" && d === "/") { while (i < n && src[i] !== "\n") i++; continue; }
    if (c === "/" && d === "*") { const e = src.indexOf("*/", i + 2); i = e < 0 ? n : e + 2; continue; }
    if (c === '"' || c === "'" || c === "`") { const e = endStr(i); out += src.slice(i, e); i = e; continue; }
    if (c === "/" && regexAllowed()) {
      let j = i + 1, cls = false;
      for (; j < n && src[j] !== "\n"; j++) { if (src[j] === "\\") j++; else if (src[j] === "[") cls = true; else if (src[j] === "]") cls = false; else if (src[j] === "/" && !cls) break; }
      out += src.slice(i, j + 1); i = j + 1; continue;
    }
    out += c; i++;
  }
  return out;
}
const SECTIONS = ["THEORY", "LABEL", "JUDGE", "ORDERS", "STATE", "VIEW", "AUDIO", "RUN", "STORAGE", "SCREENS", "TESTS", "BOOT"];
function appCode() {  // 검사 구획(11)을 뺀 앱 코드. 구획 머리 12개가 차례로 있어야 한다
  const src = $("main").textContent, at = SECTIONS.map((nm, i) => src.indexOf("\n// == " + (i + 1) + " " + nm + " =="));
  ok(at.every((p, i) => p >= 0 && (i === 0 || p > at[i - 1])), "구획 머리 12개가 차례로 있어야 한다: // == 1 THEORY == … // == 12 BOOT ==");
  return stripComments(src.slice(0, at[10]) + src.slice(at[11]));
}
const hits = (code, re) => { const m = code.match(re) || []; return m.length ? m.length + "곳: " + m.slice(0, 3).map((x) => JSON.stringify(x.trim())).join(", ") : ""; };

// ── SL0: 상태와 저장 ──
const fakeBackend = (init) => { const m = Object.assign({}, init); return { m, getItem: (k) => (k in m ? m[k] : null), setItem: (k, v) => { m[k] = String(v); } }; };
test("ST-02", "상태 대입은 setState 한 곳", () => {
  const code = appCode();
  const assigns = code.match(/(^|[^\w$.])S\s*=(?![=>])/g) || [];
  ok(assigns.length === 2, "S에 값을 넣는 곳은 선언과 setState 안, 두 곳이어야 한다. 지금 " + assigns.length + "곳");
  const at = code.indexOf("function setState(patch)");
  ok(at >= 0 && /(^|[^\w$.])S\s*=(?![=>])/.test(code.slice(at, at + 400)), "setState(patch) 안에서 S를 바꿔야 한다");
  const direct = hits(code, /(^|[^\w$.])S\.[\w$]+(\[[^\]]*\])?\s*(=(?![=>])|\+=|-=|\+\+|--)/g) || hits(code, /(^|[^\w$.])S\.[\w$.]+\.(push|pop|shift|unshift|splice|sort|reverse|fill)\(/g);
  ok(!direct, "상태를 직접 고치는 코드 " + direct);
});
test("SV-01", "저장 version 1 왕복", () => {
  const be = fakeBackend(), st = makeStore(be), s = st.load();
  ok(s.version === 1 && s.active === null && same(s.days, {}), "처음 불러오면 기본값");
  s.settings.guide = false; s.settings.tapOffsetMs = 40; s.days.d0 = { passed: true, stamp: 1, runs: 2, best: 7 };
  ok(st.save(s) === true && st.persistent(), "저장에 성공해야 한다");
  ok(JSON.parse(be.m[SAVE_KEY]).version === 1, "저장한 글에 version 1");
  const t = makeStore(be).load();
  ok(t.settings.guide === false && t.settings.tapOffsetMs === 40 && same(t.days.d0, s.days.d0) && t.settings.volume === defaultSave().settings.volume, "다시 불러오면 같은 값");
});
test("SV-02", "손상·미래 버전이면 기본값으로 시작하고 원본을 남긴다", () => {
  for (const bad of ["{깨진 글", JSON.stringify({ version: 2, days: { d0: { passed: true } } }), "[1,2]", "null"]) {
    const be = fakeBackend({ [SAVE_KEY]: bad }), s = makeStore(be).load();
    ok(s.version === 1 && same(s.days, {}), "기본값으로 시작: " + bad);
    ok(be.m[BACKUP_KEY] === bad, "원본을 " + BACKUP_KEY + "에 남긴다: " + bad);
  }
  const be = fakeBackend({ [SAVE_KEY]: JSON.stringify({ version: 1, settings: { guide: false } }) }), s = makeStore(be).load();
  ok(s.settings.guide === false && s.settings.volume === defaultSave().settings.volume && same(s.stats, defaultSave().stats) && Array.isArray(s.loaves), "없는 필드는 기본값으로 채운다");
  ok(!(BACKUP_KEY in be.m), "멀쩡한 저장은 백업하지 않는다");
});
test("SV-03", "저장소를 쓸 수 없으면 메모리로 이어 간다", () => {
  const st = makeStore(null), s = st.load();
  s.days.d1 = { passed: true, stamp: 2, runs: 1, best: 7 };
  ok(st.save(s) === false && st.persistent() === false, "메모리 저장임을 알린다");
  ok(st.load().days.d1.stamp === 2, "같은 실행 안에서는 값이 남는다");
  const broken = makeStore({ getItem() { throw new Error("막힘"); }, setItem() { throw new Error("막힘"); } }), b = broken.load();
  ok(b.version === 1, "읽기가 던져도 기본값으로 시작");
  b.loaves.push(4);
  ok(broken.save(b) === false && broken.load().loaves[0] === 4, "쓰기가 던져도 메모리에 남는다");
  const full = fakeBackend(); full.setItem = () => { throw new Error("용량 초과"); };
  const f = makeStore(full), fs = f.load(); fs.stats.orders = 3;
  ok(f.save(fs) === false && f.load().stats.orders === 3 && f.persistent() === false, "용량이 차면 메모리로 바꾼다");
});
test("SV-04", "레시피 열쇠 \"4/3\"의 저장 왕복", () => {
  const be = fakeBackend(), st = makeStore(be), s = st.load();
  s.recipes["4/3"] = { got: true, knife: 3 }; s.recipes["8/2"] = { got: false, knife: 1 }; s.loaves = [4, 2];
  st.save(s);
  const t = makeStore(be).load();
  ok(same(t.recipes, { "4/3": { got: true, knife: 3 }, "8/2": { got: false, knife: 1 } }) && same(t.loaves, [4, 2]), "열쇠와 값이 그대로");
});
```

■ 코드 4 (그대로)
넣을 자리: 12 BOOT 구획의 `function boot() { … }` 전체를 지우고 그 자리에 넣는다.

```js
function boot() {
  store = makeStore(pickBackend());
  save = store.load();
  const tests = runTests(), set = save.settings;
  window.__tests = tests;
  $("foot").textContent = `외부 요청 0건 · ${tests.line}`;
  measure();
  if (location.hash === "#test") { showTests(tests); return; }
  setState(Object.assign({ guide: set.guide, slow: set.slow, offset: set.tapOffsetMs, showMs: set.showMs }, location.hash === "#shift" ? { screen: "shift" } : {}));
}
```

하지 말 것
- 검사의 기대값이나 이름을 고치지 않는다(W3).
- 저장 스키마의 필드 이름과 `version: 1`을 바꾸지 않는다(S6).
- `boot();` 줄을 옮기지 않는다(W5).

끝나면 보고 (헌법 11절)
- `#test` 한 줄. 기대:
  자가검사 5/5 (전체 51개 중 5개 작성) · TH 0/13 LB 0/6 JD 0/8 GN 0/6 AU 0/6 ST 1/5 SV 4/4 CT 0/3
````

### 완료 기준

- [ ] T1. `index.html#test`를 열면 "자가검사" 제목 아래 글상자가 있고, 첫 줄이 아래와 같다.

```text
자가검사 5/5 (전체 51개 중 5개 작성) · TH 0/13 LB 0/6 JD 0/8 GN 0/6 AU 0/6 ST 1/5 SV 4/4 CT 0/3
```

- [ ] T2. 그 아래 목록에 검사 5개(ST-02, SV-01, SV-02, SV-03, SV-04)가 모두 "통과"로 나온다. [결과 복사] 단추가 있다.
- [ ] T3. `index.html`과 `index.html#shift`가 P01과 똑같이 보인다.
- [ ] T4. 콘솔 오류가 없다.
- [ ] 사본을 남겼다(`P02 통과`).

### 게이트 GSL0

- [ ] 빈 틀이 화면 7종(320×568, 360×600, 360×640, 390×664, 390×844, 430×932, 800×600)에서 스크롤 0이다. 세 크기만 봤다면 나머지는 `NOT_RUN`으로 적는다.
- [ ] `#test` 줄의 `SV 4/4`.
- [ ] 부록 A의 양식으로 `docs/slice-gate-report.md`에 GSL0을 적었다.

---

# 3장. SL1 이론 엔진 (v0.1)

화면은 바뀌지 않는다. 계산과 검사만 들어온다. 이 단계의 코드가 뒤의 모든 화면 글자와 정답을 만든다.

## P03. 이론 엔진 [그대로]

**목표.** 분수 계산, 음표 길이, 분할(보통 칸 수, 표기 음표, 잇단 여부), 이름, 이름표와 보기, 썰기 판정, 박자 보정을 넣는다. 검사가 30개가 된다.

**설계서.** 5장(이론 엔진), 4.5절(이름표 보기), 4.6절(판정), 부록 B(잠금 정답표), 11.1절(TH, LB, JD).

````text
[P03 · SL1-1 · 이론 엔진]  종류: 그대로

시작 전 상태
- `index.html#test`의 맨 윗줄이 아래와 같다. 사람이 다르다고 알려 주면 진행하지 않고 원인부터 찾는다.
  자가검사 5/5 (전체 51개 중 5개 작성) · TH 0/13 LB 0/6 JD 0/8 GN 0/6 AU 0/6 ST 1/5 SV 4/4 CT 0/3

이번에 하는 일
- 코드 1 (1 THEORY): 분수 `F`, `mul`, `div`, `eq`, `num`, `str`. 주파수 `hz`. 음표 길이 `noteWhole`, 박 `toBeats`. 보통 칸 수 `naturalM`, 분할 하나의 모든 값 `tupletSpec`(`{ T, n, m, unit, unitDen, piece, isTuplet }`). 이름 `noteKo`, `beatsKo`, `nameKo`. 덩이 `loafBeats`, `TbOf`, `specOf`. 칼집 자리 `cutPoints`, 음 시작 자리 `onsets`, 한 박의 초 `beatSec`.
- 코드 2 (2 LABEL): 이름표 `{ den, count, tup }`. 정답 `labelOf`, 이름 `labelKo`, 전체 시간 `labelBeats`, 보기 셋 `labelChoices`.
- 코드 3 (3 JUDGE): 허용폭 `tol`, 판정 `judge(taps, Tb, ns, beatMs)`, 박자 보정 `calibOffset`, 씨앗 난수 `rng`, 씨앗으로 섞기 `shuffled`.
- 코드 4 (11 TESTS): 잠금 정답표 `LOCK`과 검사 25개(TH-01~TH-11, TH-13, LB-01~LB-05, JD-01~JD-08).
- 이 코드는 화면에 아무것도 그리지 않는다. 1~3 구획은 `window`와 `document`를 만지지 않는다.

■ 코드 1 (그대로)
넣을 자리: 1 THEORY 구획의 끝(`// == 2 LABEL ==` 바로 위)에 붙인다.

```js
// ── 이론 엔진: 분수로만 계산한다. 수치 표를 두지 않는다 ──
const gcd = (a, b) => (b ? gcd(b, a % b) : Math.abs(a));
const F = (n, d = 1) => { if (d < 0) { n = -n; d = -d; } const g = gcd(n, d) || 1; return { n: n / g, d: d / g }; };
const mul = (a, b) => F(a.n * b.n, a.d * b.d);
const div = (a, b) => F(a.n * b.d, a.d * b.n);
const eq = (a, b) => a.n === b.n && a.d === b.d;
const num = (a) => a.n / a.d;
const str = (a) => (a.d === 1 ? String(a.n) : a.n + "/" + a.d);
const hz = (midi) => 440 * Math.pow(2, (midi - 69) / 12);
const isPow2 = (x) => Number.isInteger(x) && x > 0 && (x & (x - 1)) === 0;
const noteWhole = (den, dots = 0) => F(2 ** (dots + 1) - 1, den * 2 ** dots);  // 온음표 = 1
const toBeats = (whole, beatDen = 4) => mul(whole, F(beatDen));  // 4분음표 = 1박
const kindOf = (T) => (T.n === 1 && isPow2(T.d) ? "binary" : T.n === 3 && isPow2(T.d) ? "ternary" : "other");
function naturalM(T, n) {  // 보통 칸 수: n을 넘지 않는 가장 큰 자연 분할
  const k = kindOf(T);
  if (k === "binary") return 2 ** Math.floor(Math.log2(n));
  if (k === "ternary") return n < 3 ? 3 : 3 * 2 ** Math.floor(Math.log2(n / 3));
  return null;
}
function tupletSpec(T, n, mOverride = null) {
  const m = mOverride ?? naturalM(T, n);
  if (!m) return null;
  const unit = div(T, F(m));
  if (!(unit.n === 1 && isPow2(unit.d))) return null;
  return { T, n, m, unit, unitDen: unit.d, piece: div(T, F(n)), isTuplet: n !== m };
}
const COUNT_KO = { 2: "둘", 3: "셋", 4: "넷", 5: "다섯", 6: "여섯", 7: "일곱" };
const noteKo = (den) => (den === 1 ? "온음표" : den + "분음표");
const beatsKo = (f) => (f.n === 1 && f.d === 2 ? "½" : str(f)) + "박";
const nameKo = (s) => (s.isTuplet ? `${noteKo(s.unitDen)} ${COUNT_KO[s.n]}잇단음표` : `${noteKo(s.unitDen)} ${s.n}개`);
const fmt = (x) => (x === 0.5 ? "½" : String(Math.round(x * 100) / 100));
const hue = (i) => (205 + i * 53) % 360;
const loafBeats = (den) => toBeats(noteWhole(den));
const TbOf = (den) => num(loafBeats(den));
const specOf = (den, n) => tupletSpec(noteWhole(den), n);
const cutPoints = (s) => Array.from({ length: s.n - 1 }, (_, k) => mul(s.piece, F(k + 1)));  // 칼집 자리(온음표 = 1). n조각이면 n−1개(R4)
const onsets = (s) => Array.from({ length: s.n }, (_, k) => mul(s.piece, F(k)));  // 음이 시작하는 자리. n개
const beatSec = (bpm) => 60 / bpm;  // 한 박의 초. 빠르기는 길이(박)를 바꾸지 않는다
```

■ 코드 2 (그대로)
넣을 자리: 2 LABEL 구획의 끝(`// == 3 JUDGE ==` 바로 위)에 붙인다.

```js
// ── 이름표: {den 음표, count 개수, tup 잇단 숫자(없으면 0)} ──
const labelOf = (s) => ({ den: s.unitDen, count: s.n, tup: s.isTuplet ? s.n : 0 });
const labelKo = (l) => (l.tup ? `${noteKo(l.den)} ${COUNT_KO[l.tup]}잇단` : `${noteKo(l.den)} ${l.count}개`);
const sameLabel = (a, b) => a.den === b.den && a.count === b.count && a.tup === b.tup;
function labelBeats(l) {  // 이름표가 차지하는 전체 시간(홑박자). 잇단이면 보통 칸 m개의 길이
  const m = l.tup ? 2 ** Math.floor(Math.log2(l.tup)) : l.count;
  return mul(loafBeats(l.den), F(m));
}
function labelChoices(s) {  // [정답, 오답 1, 오답 2]. 오답은 전체 시간이 덩이와 다르다
  const ok = labelOf(s), n = s.n;
  if (s.isTuplet) return [ok, { den: ok.den, count: n, tup: 0 }, { den: ok.den === 8 ? 4 : ok.den < 8 ? ok.den * 2 : ok.den / 2, count: n, tup: n }];
  return [ok, { den: ok.den / 2, count: n, tup: 0 }, { den: ok.den * 2, count: n, tup: 0 }];
}
```

■ 코드 3 (그대로)
넣을 자리: 3 JUDGE 구획의 끝(`// == 4 ORDERS ==` 바로 위)에 붙인다.

```js
// ── 판정: 탭 시각(박)과 덩이별 조각 수만 받는 순수 함수 ──
const tol = (pieceMs, ratio, floor, cap) => Math.max(floor, Math.min(pieceMs * ratio, cap));  // 허용폭: 조각 길이에 비례하되 바닥과 천장을 둔다
function judge(taps, Tb, ns, beatMs) {
  const R = ns.length, total = Tb * R, cuts = [];
  let edgeTaps = 0;
  for (const b of taps) {
    const e = Math.round(b / Tb), a = ns[Math.min(R - 1, Math.max(0, e - 1))], c = ns[Math.min(R - 1, Math.max(0, e))];
    if (Math.abs(b - e * Tb) <= (Tb / Math.max(a, c)) * 0.25) { edgeTaps++; continue; }  // 덩이 경계(박) 위의 탭은 칼질로 세지 않는다
    if (b > 0 && b < total) cuts.push(b);
  }
  cuts.sort((x, y) => x - y);
  const loaves = [], devs = [];
  for (let q = 0; q < R; q++) {
    const n = ns[q], piece = Tb / n, pm = piece * beatMs;
    const mine = cuts.filter((b) => b > q * Tb && b < (q + 1) * Tb).map((b) => b - q * Tb);
    const edges = [0].concat(mine, [Tb]), widths = edges.slice(1).map((x, i) => x - edges[i]);
    const ok = mine.length + 1 === n;
    if (ok) mine.forEach((b, i) => { const ms = (b - (i + 1) * piece) * beatMs; devs.push({ r: q, k: i + 1, ms, s1: Math.abs(ms) / tol(pm, 0.15, 50, 120), s2: Math.abs(ms) / tol(pm, 0.3, 90, 240) }); });
    loaves.push({ n, pieces: mine.length + 1, widths, ok });
  }
  const countOk = loaves.every((l) => l.ok);
  const mean = devs.length ? devs.reduce((s, d) => s + Math.abs(d.ms), 0) / devs.length : null;
  const worst = devs.length ? devs.reduce((a, d) => (Math.abs(d.ms) > Math.abs(a.ms) ? d : a)) : null;
  const grade = !countOk ? "count" : devs.every((d) => d.s1 <= 1) ? "master" : devs.every((d) => d.s2 <= 1) ? "good" : "rough";
  return { loaves, countOk, mean, worst, grade, edgeTaps };
}
function calibOffset(taps, clicks) {  // 박자 보정: 탭과 가장 가까운 박의 차(ms)의 가운데 값
  const d = [];
  for (const t of taps) {
    let best = null;
    for (const c of clicks) if (best === null || Math.abs(t - c) < Math.abs(best)) best = t - c;
    if (best !== null && Math.abs(best) < 0.25) d.push(best * 1000);
  }
  if (d.length < 4) return null;
  d.sort((a, b) => a - b);
  const m = d.length >> 1;
  return Math.round(d.length % 2 ? d[m] : (d[m - 1] + d[m]) / 2);
}
function rng(seed) { let a = seed >>> 0; return () => { a = (a + 0x6d2b79f5) >>> 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
function shuffled(arr, seed) { const r = rng(seed), a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
```

■ 코드 4 (그대로)
넣을 자리: 11 TESTS 구획의 끝(`// == 12 BOOT ==` 바로 위)에 붙인다.

```js
// ── 잠금 정답표(설계서 부록 B): 검사만 읽는다. 게임 코드가 읽으면 TH-13이 실패한다 ──
const LOCK = {
  loaves: [  // 덩이, 박, 썰기에 놓는 덩이 수, 썰기의 전체 박
    [1, "4", 1, 4], [2, "2", 2, 4], [4, "1", 4, 4], [8, "1/2", 4, 2],
  ],
  splits: [  // 덩이, 조각, 보통 칸, 이름, 비율, 한 조각(박), 처음 나오는 주문
    [1, 2, 2, "2분음표 2개", "", "2", "d1-03"], [1, 3, 2, "2분음표 셋잇단음표", "3:2", "4/3", "d3-03"], [1, 4, 4, "4분음표 4개", "", "1", "d1-07"],
    [2, 2, 2, "4분음표 2개", "", "1", "d1-02"], [2, 3, 2, "4분음표 셋잇단음표", "3:2", "2/3", "d3-02"], [2, 4, 4, "8분음표 4개", "", "1/2", "d1-05"],
    [4, 2, 2, "8분음표 2개", "", "1/2", "d1-01"], [4, 3, 2, "8분음표 셋잇단음표", "3:2", "1/3", "d2-02"], [4, 4, 4, "16분음표 4개", "", "1/4", "d1-04"],
    [8, 2, 2, "16분음표 2개", "", "1/4", "d1-06"], [8, 3, 2, "16분음표 셋잇단음표", "3:2", "1/6", "d3-04"],
  ],
  choices: [  // 덩이, 조각, 정답, 오답 1, 오답 2. 각각 [이름, 그 음표들의 전체 박]
    [1, 2, ["2분음표 2개", "4"], ["온음표 2개", "8"], ["4분음표 2개", "2"]],
    [1, 3, ["2분음표 셋잇단", "4"], ["2분음표 3개", "6"], ["4분음표 셋잇단", "2"]],
    [1, 4, ["4분음표 4개", "4"], ["2분음표 4개", "8"], ["8분음표 4개", "2"]],
    [2, 2, ["4분음표 2개", "2"], ["2분음표 2개", "4"], ["8분음표 2개", "1"]],
    [2, 3, ["4분음표 셋잇단", "2"], ["4분음표 3개", "3"], ["8분음표 셋잇단", "1"]],
    [2, 4, ["8분음표 4개", "2"], ["4분음표 4개", "4"], ["16분음표 4개", "1"]],
    [4, 2, ["8분음표 2개", "1"], ["4분음표 2개", "2"], ["16분음표 2개", "1/2"]],
    [4, 3, ["8분음표 셋잇단", "1"], ["8분음표 3개", "3/2"], ["4분음표 셋잇단", "2"]],
    [4, 4, ["16분음표 4개", "1"], ["8분음표 4개", "2"], ["32분음표 4개", "1/2"]],
    [8, 2, ["16분음표 2개", "1/2"], ["8분음표 2개", "1"], ["32분음표 2개", "1/4"]],
    [8, 3, ["16분음표 셋잇단", "1/2"], ["16분음표 3개", "3/4"], ["8분음표 셋잇단", "1"]],
  ],
  tol: [  // 한 조각(ms), 장인 허용폭, 고른 편 허용폭
    [2000, 120, 240], [1333, 120, 240], [1000, 120, 240], [667, 100, 200], [500, 75, 150], [333, 50, 100], [300, 50, 90], [250, 50, 90], [200, 50, 90],
  ],
  days: [  // 영업일, 주문 수, 통과에 필요한 ● 수, 발견 장면
    ["d0", 7, 6, []], ["d1", 7, 6, ["S1"]], ["d2", 7, 6, ["S2", "S3"]], ["d3", 8, 7, ["S4"]], ["d4", 6, 5, []], ["d5", 8, 7, []],
  ],
  orderText: {
    "d0-01": "1박짜리 식빵을 골라 주세요.", "d0-04": "8분음표 식빵을 골라 주세요.", "d0-05": "4분음표 식빵 2개를 이으면 어느 식빵과 같을까요?",
    "d0-07": "이 소리만큼 긴 식빵을 골라 주세요.", "d1-06": "½박 식빵(8분음표)을 같은 크기 2조각으로 썰어 주세요.", "d3-02": "2박 식빵(2분음표)을 같은 크기 3조각으로 썰어 주세요.",
    "d4-05": "1박 식빵 4개를 차례로 2 · 3 · 4 · 3조각으로 썰어 주세요.", "d5-02": "이 악보대로 썰어 주세요.", "d5-05": "들리는 대로 썰어 주세요.",
  },
  scenes: {
    S1: ["조각 수는 같은데 길이가 달라요.", "덩이가 길면 조각도 길어요."],
    S2: ["3조각은 8분음표보다 짧고 16분음표보다 길어요.", "딱 맞는 음표가 없어서 8분음표에 숫자 3을 붙여요."],
    S3: ["같은 1박을 2, 3, 4로 나눴어요.", "2와 4는 보통 음표이고 3에만 숫자가 필요해요."],
    S4: ["둘 다 셋잇단이지만 이름이 달라요.", "이름은 덩이가 정해요."],
  },
  flow: { scene: ["pick", "mark"], pick: ["mark", "deliver"], mark: ["label", "slice"], label: ["slice"], slice: ["deliver"], deliver: ["scene", "pick", "mark"] },
  subs: { ready: ["count", "listen"], count: ["run", "ready"], run: ["result", "ready"], result: ["count"], listen: ["ready"] },
};

// ── SL1-1: 이론 엔진, 이름표, 판정 ──
const LOAVES = LOCK.loaves.map((r) => r[0]), NS = [2, 3, 4, 5, 6, 7];  // 덩이 넷(온·2분·4분·8분음표)과 조각 수 2~7
const eachSplit = (fn) => LOAVES.forEach((d) => NS.forEach((n) => fn(specOf(d, n), d, n)));
test("TH-01", "조각 길이의 합 = 덩이(분수 일치)", () => eachSplit((s, d, n) => ok(eq(mul(s.piece, F(n)), s.T), d + "÷" + n)));
test("TH-02", "보통 칸 수 × 표기 음표 = 덩이", () => eachSplit((s, d, n) => ok(eq(mul(s.unit, F(s.m)), s.T) && eq(s.unit, noteWhole(s.unitDen)), d + "÷" + n)));
test("TH-03", "칼집 n−1개, 음 시작 n개", () => eachSplit((s, d, n) => {
  const c = cutPoints(s), o = onsets(s);
  ok(c.length === n - 1 && o.length === n && o[0].n === 0, d + "÷" + n + " 개수");
  ok(c.every((x, k) => eq(x, o[k + 1])) && eq(mul(s.piece, F(n)), s.T), d + "÷" + n + " 자리");
}));
test("TH-04", "잠금 정답표의 분할 11가지", () => {
  ok(LOCK.splits.length === 11, "11줄");
  for (const [d, n, m, name, ratio, piece] of LOCK.splits) {
    const s = specOf(d, n), tag = d + "÷" + n;
    ok(s.m === m && nameKo(s) === name, tag + " 이름: " + nameKo(s));
    ok((s.isTuplet ? s.n + ":" + s.m : "") === ratio, tag + " 비율");
    ok(str(toBeats(s.piece)) === piece, tag + " 한 조각: " + str(toBeats(s.piece)));
  }
});
test("TH-05", "4분음표 덩이의 5조각과 7조각은 16분음표 5:4, 7:4", () => {
  const a = specOf(4, 5), b = specOf(4, 7);
  ok(a.m === 4 && a.unitDen === 16 && a.isTuplet && nameKo(a) === "16분음표 다섯잇단음표", "5조각");
  ok(b.m === 4 && b.unitDen === 16 && b.isTuplet && nameKo(b) === "16분음표 일곱잇단음표", "7조각");
});
test("TH-06", "2조각과 4조각은 잇단음표가 아니다", () => LOAVES.forEach((d) => [2, 4].forEach((n) => { const s = specOf(d, n); ok(!s.isTuplet && s.m === n && nameKo(s).endsWith(n + "개"), d + "÷" + n); })));
test("TH-07", "점4분음표 덩이: 2조각 2:3, 3조각 일반, 4조각 4:3", () => {
  const T = noteWhole(4, 1), a = tupletSpec(T, 2), b = tupletSpec(T, 3), c = tupletSpec(T, 4);
  ok(eq(T, F(3, 8)) && kindOf(T) === "ternary", "점4분음표 = 3/8");
  ok(a.m === 3 && a.isTuplet && b.m === 3 && !b.isTuplet && c.m === 3 && c.isTuplet && a.unitDen === 8, "보통 칸은 3개");
});
test("TH-08", "m을 명시하면 그 비율을 쓴다(5:6)", () => { const s = tupletSpec(noteWhole(4, 1), 5, 6); ok(s.m === 6 && s.unitDen === 16 && s.isTuplet, "5:6 → 16분음표"); });
test("TH-09", "홑박자의 잇단 조각은 표기 음표보다 짧다", () => eachSplit((s, d, n) => ok(!s.isTuplet || (num(s.piece) < num(s.unit) && num(s.piece) > num(s.unit) / 2), d + "÷" + n)));
test("TH-10", "주파수 공식", () => ok(near(hz(69), 440) && near(hz(81), 880) && Math.round(hz(79) * 100) === 78399 && Math.round(hz(67) * 100) === 39200, "440 × 2^((midi − 69) / 12)"));
test("TH-11", "덩이의 박 수와 ♩=60에서 1박 = 1초", () => {
  for (const [d, beats] of LOCK.loaves) ok(str(loafBeats(d)) === beats, noteKo(d) + " " + beats + "박");
  ok(beatSec(60) === 1 && near(TbOf(4) * beatSec(60), 1) && near(beatSec(50), 6 / 5), "초 = 박 × 60 ÷ bpm");
});
test("TH-13", "앱 코드에 음표 길이·비율·이름의 표가 없다", () => {
  const code = appCode();
  ok(!/\bLOCK\b/.test(code), "게임 코드가 잠금 정답표(LOCK)를 읽는다");
  let h = hits(code, /[0-9]+분음표/g); ok(!h, "음표 이름을 손으로 적었다(noteKo로 만든다) " + h);
  h = hits(code, /(둘|셋|넷|다섯|여섯|일곱)잇단/g); ok(!h, "잇단 이름을 손으로 적었다(nameKo, labelKo로 만든다) " + h);
  h = hits(code, /\(\s*[2-7]\s*:\s*[2-6]\s*\)/g); ok(!h, "비율을 손으로 적었다 " + h);
  h = hits(code, /\d*\.(33+|66+7?|166+7?|83+)(?!\d)/g); ok(!h, "1/3, 1/6 같은 길이를 소수로 적었다(분수로 계산한다) " + h);
  h = hits(code, /1\s*:\s*4\s*,\s*2\s*:\s*2\s*,\s*4\s*:\s*1/g) || hits(code, /\[\s*4\s*,\s*2\s*,\s*1\s*,\s*0?\.5\s*\]/g); ok(!h, "음표 길이 표가 있다(noteWhole, toBeats로 계산한다) " + h);
});
test("LB-01", "정답 이름표의 전체 시간 = 덩이", () => {
  for (const [d, n, right] of LOCK.choices) { const c = labelChoices(specOf(d, n)); ok(labelKo(c[0]) === right[0] && str(labelBeats(c[0])) === right[1] && eq(labelBeats(c[0]), loafBeats(d)) && sameLabel(c[0], labelOf(specOf(d, n))), d + "÷" + n + ": " + labelKo(c[0])); }
});
test("LB-02", "오답 보기 둘은 전체 시간이 덩이와 다르고 서로 다르다", () => {
  for (const [d, n, , w1, w2] of LOCK.choices) {
    const c = labelChoices(specOf(d, n)), T = loafBeats(d), tag = d + "÷" + n;
    ok(c.length === 3 && !eq(labelBeats(c[1]), T) && !eq(labelBeats(c[2]), T) && !sameLabel(c[1], c[2]), tag);
    ok(labelKo(c[1]) === w1[0] && str(labelBeats(c[1])) === w1[1] && labelKo(c[2]) === w2[0] && str(labelBeats(c[2])) === w2[1], tag + ": " + labelKo(c[1]) + ", " + labelKo(c[2]));
  }
});
test("LB-03", "잇단 분할의 오답: 숫자를 뺀 것, 음표가 8분음표 쪽으로 한 단계인 것", () => {
  for (const [d, n] of LOCK.choices) {
    const s = specOf(d, n), c = labelChoices(s); if (!s.isTuplet) continue;
    ok(c[1].den === c[0].den && c[1].tup === 0 && c[1].count === n, d + "÷" + n + " 오답 1");
    ok(c[2].tup === n && c[2].den === (c[0].den === 8 ? 4 : c[0].den < 8 ? c[0].den * 2 : c[0].den / 2), d + "÷" + n + " 오답 2");
  }
});
test("LB-04", "일반 분할의 오답: 한 단계 긴 음표, 한 단계 짧은 음표", () => {
  for (const [d, n] of LOCK.choices) { const s = specOf(d, n), c = labelChoices(s); if (s.isTuplet) continue; ok(c[1].den === c[0].den / 2 && c[2].den === c[0].den * 2 && c[1].tup === 0 && c[2].tup === 0, d + "÷" + n); }
});
test("LB-05", "4분음표 셋잇단 = 2박, 8분음표 3개 = 3/2박", () => ok(eq(labelBeats({ den: 4, count: 3, tup: 3 }), F(2)) && eq(labelBeats({ den: 8, count: 3, tup: 0 }), F(3, 2)), "labelBeats"));
test("JD-01", "정확한 탭 → 조각 수 맞음, 장인", () => { const j = judge([1 / 3, 2 / 3, 4 / 3, 5 / 3], 1, [3, 3], 1000); ok(j.countOk && j.grade === "master" && j.loaves.length === 2, j.grade); });
test("JD-02", "박 위의 탭은 칼질로 세지 않는다", () => {
  const j = judge([0, 1 / 3, 2 / 3, 1], 1, [3], 1000), k = judge([1 / 3, 2 / 3, 1.02, 4 / 3, 5 / 3], 1, [3, 3], 1000);
  ok(j.edgeTaps === 2 && j.countOk && j.grade === "master", "박 위의 탭 " + j.edgeTaps);
  ok(k.edgeTaps === 1 && k.countOk && k.grade === "master", "덩이 사이의 박에서 20ms 늦은 탭도 칼질이 아니다");
});
test("JD-03", "칼질이 모자라면 조각 수가 다르다", () => { const j = judge([1 / 3, 2 / 3, 1, 4 / 3], 1, [3, 3], 1000); ok(!j.countOk && j.grade === "count" && j.loaves[1].pieces === 2, j.grade); });
test("JD-04", "120ms 늦은 탭 → 등급이 내려가고 앞 조각이 두껍다", () => { const j = judge([1 / 3 + 0.12, 2 / 3], 1, [3], 1000); ok(j.countOk && j.grade === "rough" && j.loaves[0].widths[0] > 1 / 3 && j.worst.ms > 0, j.grade); });
test("JD-05", "연속(2 · 3 · 4 · 3)의 정확한 탭 → 장인", () => ok(judge([1 / 2, 1 + 1 / 3, 1 + 2 / 3, 2 + 1 / 4, 2 + 1 / 2, 2 + 3 / 4, 3 + 1 / 3, 3 + 2 / 3], 1, [2, 3, 4, 3], 1000).grade === "master", "장인"));
test("JD-06", "허용폭의 바닥과 천장", () => {
  for (const [ms, a, b] of LOCK.tol) ok(Math.round(tol(ms, 0.15, 50, 120)) === a && Math.round(tol(ms, 0.3, 90, 240)) === b, ms + "ms");
});
test("JD-07", "조각 2초: +100ms 장인, +200ms 고른 편, +300ms 들쭉날쭉", () => ok(judge([2.1], 4, [2], 1000).grade === "master" && judge([2.2], 4, [2], 1000).grade === "good" && judge([2.3], 4, [2], 1000).grade === "rough", "천장 120ms, 240ms"));
test("JD-08", "박자 보정은 가운데 값, 탭 4개 미만이면 null", () => ok(calibOffset([1.06, 2.05, 3.07, 4.06, 5.06], [1, 2, 3, 4, 5]) === 60 && calibOffset([1.06, 2.05], [1, 2]) === null && calibOffset([1.4, 2.4, 3.4, 4.4], [1, 2, 3, 4]) === null, "calibOffset"));
```

하지 말 것
- 분수 계산을 소수 계산으로 바꾸지 않는다(R2).
- 음표 길이나 비율을 표로 정리하지 않는다. `LOCK`은 검사만 읽는다. 앱 코드에서 `LOCK`을 쓰면 TH-13이 실패한다.
- `judge`의 허용폭 숫자(0.15, 50, 120, 0.3, 90, 240)와 박 위의 탭 기준(0.25)을 바꾸지 않는다.

끝나면 보고 (헌법 11절)
- `#test` 한 줄. 기대:
  자가검사 30/30 (전체 51개 중 30개 작성) · TH 12/13 LB 5/6 JD 8/8 GN 0/6 AU 0/6 ST 1/5 SV 4/4 CT 0/3
````

### 완료 기준

- [ ] T1. `index.html#test`의 첫 줄이 아래와 같다.

```text
자가검사 30/30 (전체 51개 중 30개 작성) · TH 12/13 LB 5/6 JD 8/8 GN 0/6 AU 0/6 ST 1/5 SV 4/4 CT 0/3
```

- [ ] T2. 목록의 검사 30개가 모두 "통과"다.
- [ ] T3. `index.html`과 `index.html#shift`의 모습이 P02와 같다. 콘솔 오류가 없다.
- [ ] 사본을 남겼다(`P03 통과`).

`TH 12/13`인 까닭은 TH-12가 P07에, `LB 5/6`인 까닭은 LB-06이 P04에 들어오기 때문이다.

---

## P04. 주문 씨앗 43개 [그대로]

**목표.** 영업일 6개와 주문 43개의 씨앗, 발견 장면 4개, 주문 문장과 선반 이름표를 만드는 함수를 넣는다. 검사가 37개가 된다.

**설계서.** 7.1~7.4절(사다리, 영업일 규칙, 주문 목록, 발견 장면), 4.2절(주문 방식), D12(선반 이름표), 11.1절(GN, LB-06).

````text
[P04 · SL1-2 · 주문 씨앗]  종류: 그대로

시작 전 상태
- `index.html#test`의 맨 윗줄이 아래와 같다. 사람이 다르다고 알려 주면 진행하지 않는다.
  자가검사 30/30 (전체 51개 중 30개 작성) · TH 12/13 LB 5/6 JD 8/8 GN 0/6 AU 0/6 ST 1/5 SV 4/4 CT 0/3

이번에 하는 일
- 코드 1 (4 ORDERS):
  · `DENS`(선반의 덩이 넷), `DAYS`(영업일 6개. 영업일마다 기본값 `base`, 발견 장면 자리 `scenes`, 씨앗 `seeds`)
  · 씨앗에 기본값을 채워 `ORDERS` 43개를 만든다. id는 `"d3-02"` 꼴이다. 마감 주문(`final`)은 조각 수 판독(`count`)과 안내선(`guide`)이 꺼진다
  · `SCENES`(발견 장면 S1~S4의 줄), `repsOf`와 `sliceNs`(썰기에 놓는 덩이), `bpmOf`, `passNeed`(통과에 필요한 ● 수), `recipeKey`, `choicesOf`(이름표 보기의 순서), `cardList`(레시피 카드 15장의 열쇠)
  · 문구: `orderText`(주문 문장), `shelfLabel`(선반 이름표, D12), `sceneText`와 `sceneCaption`(발견 장면), `splitKo`(이름과 비율), `noteShort`, `josa`
- 코드 2 (11 TESTS): 검사 7개(GN-01~GN-06, LB-06).
- 씨앗에는 주문 방식, 덩이, 조각 수, 도움 설정만 있다. 이름, 비율, 문장 속 수치는 엔진이 만든다(R3).

■ 코드 1 (그대로)
넣을 자리: 4 ORDERS 구획의 끝(`// == 5 STATE ==` 바로 위)에 붙인다.

```js
// ── 주문: 씨앗만 적는다(R3). 이름, 비율, 보기, 문구 속 수치는 엔진이 만든다 ──
const DENS = [1, 2, 4, 8];  // 선반의 덩이(음표 분모). 온음표부터 8분음표까지
const DAYS = [
  { id: "d0", name: "첫 출근", base: { ask: "pick" }, scenes: {}, seeds: [
    { by: "beats", loaf: 4 }, { by: "beats", loaf: 2 }, { by: "beats", loaf: 1 }, { by: "name", loaf: 8 },
    { by: "join", loaf: 2, join: [4, 2] }, { by: "join", loaf: 4, join: [8, 2] }, { by: "sound", loaf: 2, final: true },
  ] },
  { id: "d1", name: "반으로, 또 반으로", base: { ask: "word", label: "auto", count: true }, scenes: { 4: "S1" }, seeds: [
    { loaf: 4, ns: [2] }, { loaf: 2, ns: [2] }, { loaf: 1, ns: [2] }, { loaf: 4, ns: [4] },
    { loaf: 2, ns: [4] }, { loaf: 8, ns: [2], bpm: 50 }, { loaf: 1, ns: [4], final: true },
  ] },
  { id: "d2", name: "세 조각의 문제", base: { ask: "word", loaf: 4, label: "yesno", mold: true, count: true }, scenes: { 0: "S2", 3: "S3" }, seeds: [
    { ns: [2] }, { ns: [3] }, { ns: [4] }, { ns: [3] }, { ns: [2] }, { ns: [3], guide: false }, { ns: [3], final: true },
  ] },
  { id: "d3", name: "같은 세 조각, 다른 빵", base: { ask: "word", label: "choose", mold: true, count: true }, scenes: { 2: "S4" }, seeds: [
    { loaf: 4, ns: [3] }, { loaf: 2, ns: [3] }, { loaf: 1, ns: [3] }, { loaf: 8, ns: [3], bpm: 50 },
    { loaf: 2, ns: [4] }, { loaf: 2, ns: [3], guide: false }, { loaf: 4, ns: [2] }, { loaf: 1, ns: [3], final: true },
  ] },
  { id: "d4", name: "바꿔 썰기", base: { ask: "word", loaf: 4 }, scenes: {}, seeds: [
    { ns: [2, 2, 2, 2] }, { ns: [3, 3, 3, 3] }, { ns: [2, 2, 3, 3] }, { ns: [2, 3, 2, 3] }, { ns: [2, 3, 4, 3] }, { ns: [4, 3, 2, 3], final: true },
  ] },
  { id: "d5", name: "거꾸로 읽기", base: { mold: true }, scenes: {}, seeds: [
    { ask: "score", loaf: 4, ns: [3] }, { ask: "score", loaf: 2, ns: [3] }, { ask: "score", loaf: 2, ns: [4] }, { ask: "score", loaf: 1, ns: [3] },
    { ask: "sound", loaf: 4, ns: [3] }, { ask: "sound", loaf: 4, ns: [2] }, { ask: "sound", loaf: 2, ns: [3] }, { ask: "sound", loaf: 2, ns: [4], final: true },
  ] },
];
const ORDERS = [];  // 씨앗에 기본값을 채운 주문 43개. id는 "d3-02" 꼴
for (const d of DAYS) d.orders = d.seeds.map((seed, i) => {
  const o = Object.assign({ id: `${d.id}-${String(i + 1).padStart(2, "0")}`, day: d.id, no: ORDERS.length, by: "", ns: [1], label: "", mold: false, count: false, guide: true, bpm: 60, final: false }, d.base, seed);
  if (o.final) { o.count = false; o.guide = false; }  // 마감 주문은 도움이 꺼져 있다
  ORDERS.push(o);
  return o;
});
const dayOf = (id) => DAYS.find((d) => d.id === id) || null;
const orderById = (id) => ORDERS.find((o) => o.id === id) || null;
const SCENES = {  // 발견 장면: 도마에 놓을 줄. mold가 참이면 빵 대신 보통 칸(틀)을 그린다
  S1: { rows: [{ loaf: 4, n: 2 }, { loaf: 2, n: 2 }] },
  S2: { rows: [{ loaf: 4, n: 2, mold: true }, { loaf: 4, n: 3 }, { loaf: 4, n: 4, mold: true }] },
  S3: { rows: [{ loaf: 4, n: 2 }, { loaf: 4, n: 3 }, { loaf: 4, n: 4 }] },
  S4: { rows: [{ loaf: 4, n: 3 }, { loaf: 2, n: 3 }] },
};

const repsOf = (Tb) => (Tb >= 4 ? 1 : Tb >= 2 ? 2 : 4);  // 썰기에 놓는 덩이 수
const sliceNs = (o) => (o.ns.length > 1 ? o.ns : Array(repsOf(TbOf(o.loaf))).fill(o.ns[0]));
const bpmOf = (o, slow) => o.bpm - (slow ? 10 : 0);
const passNeed = (n) => Math.ceil((n * 4) / 5);  // 통과에 필요한 ● 수: 주문 수의 80%(올림)
const recipeKey = (den, n) => den + "/" + n;  // 레시피 카드의 열쇠. "4/3" = 4분음표 덩이 3조각
const choicesOf = (o) => (o.label === "choose" ? shuffled(labelChoices(specOf(o.loaf, o.ns[0])), 7 * o.no + 3) : []);  // 보기 순서는 주문마다 늘 같다
const cardList = () => DENS.map(String).concat(ORDERS.filter((o) => o.ask !== "pick" && o.ns.length === 1).map((o) => recipeKey(o.loaf, o.ns[0])).filter((k, i, a) => a.indexOf(k) === i));

// ── 문구: 수치와 음표 이름은 전부 엔진에서 온다 ──
const TAG = { pick: "고르기", word: "말 주문", score: "악보 주문", sound: "소리 주문" };
const josa = (n, withFinal, without) => ("013678".includes(String(n).slice(-1)) ? withFinal : without);  // 숫자 뒤의 조사(삼을, 이를)
const noteShort = (den) => (den === 1 ? "온" : den + "분");  // 칸이 좁을 때 쓰는 줄인 이름
const ratioKo = (s) => (s.isTuplet ? ` (${s.n}:${s.m})` : " · 일반 분할");
const splitKo = (s) => nameKo(s) + ratioKo(s);
function orderText(o) {
  const b = beatsKo(loafBeats(o.loaf));
  if (o.ask === "pick") {
    if (o.by === "name") return `${noteKo(o.loaf)} 식빵을 골라 주세요.`;
    if (o.by === "join") return `${noteKo(o.join[0])} 식빵 ${o.join[1]}개를 이으면 어느 식빵과 같을까요?`;
    if (o.by === "sound") return "이 소리만큼 긴 식빵을 골라 주세요.";
    return `${b}짜리 식빵을 골라 주세요.`;
  }
  if (o.ask === "score") return "이 악보대로 썰어 주세요.";
  if (o.ask === "sound") return "들리는 대로 썰어 주세요.";
  if (o.ns.length > 1) return `${b} 식빵 ${o.ns.length}개를 차례로 ${o.ns.join(" · ")}조각으로 썰어 주세요.`;
  return `${b} 식빵(${noteKo(o.loaf)})을 같은 크기 ${o.ns[0]}조각으로 썰어 주세요.`;
}
function shelfLabel(o, den, picking) {  // 선반 이름표(D12): 묻는 것을 이름표가 알려 주지 않게 한다
  const nm = noteKo(den), b = beatsKo(loafBeats(den));
  if (picking && o.ask === "pick" && o.by === "beats") return nm;
  if (picking && o.ask === "pick" && o.by === "name") return b;
  return nm + " " + b;
}
function sceneText(id) {  // 발견 장면의 두 문장
  const rows = SCENES[id].rows, sp = rows.map((r) => specOf(r.loaf, r.n));
  if (id === "S1") return ["조각 수는 같은데 길이가 달라요.", "덩이가 길면 조각도 길어요."];
  if (id === "S2") { const s = sp[1], a = noteKo(s.unitDen), b = noteKo(s.unitDen * 2); return [`${s.n}조각은 ${a}보다 짧고 ${b}보다 길어요.`, `딱 맞는 음표가 없어서 ${a}에 숫자 ${s.n}${josa(s.n, "을", "를")} 붙여요.`]; }
  if (id === "S3") { const plain = sp.filter((s) => !s.isTuplet).map((s) => s.n), tup = sp.filter((s) => s.isTuplet).map((s) => s.n); return [`같은 ${beatsKo(loafBeats(rows[0].loaf))}을 ${sp.map((s) => s.n).join(", ")}로 나눴어요.`, `${plain.join("와 ")}는 보통 음표이고 ${tup.join(", ")}에만 숫자가 필요해요.`]; }
  return [`둘 다 ${COUNT_KO[sp[0].n]}잇단이지만 이름이 달라요.`, "이름은 덩이가 정해요."];
}
const sceneCaption = (r) => { const s = specOf(r.loaf, r.n); return r.mold ? `보통 칸 ${s.n}개 · ${noteKo(s.unitDen)}` : splitKo(s); };
```

■ 코드 2 (그대로)
넣을 자리: 11 TESTS 구획의 끝(`// == 12 BOOT ==` 바로 위)에 붙인다.

```js
// ── SL1-2: 주문 씨앗 ──
const splitOrders = () => ORDERS.filter((o) => o.ask !== "pick" && o.ns.length === 1);
test("GN-01", "주문 43개를 모두 풀 수 있다", () => {
  ok(ORDERS.length === 43 && new Set(ORDERS.map((o) => o.id)).size === 43, "주문 43개, id가 겹치지 않는다");
  for (const o of ORDERS) {
    ok(DENS.includes(o.loaf), o.id + " 덩이");
    if (o.ask === "pick") { ok(same(o.ns, [1]) && ["beats", "name", "join", "sound"].includes(o.by), o.id + " 고르기"); if (o.by === "join") ok(eq(mul(loafBeats(o.join[0]), F(o.join[1])), loafBeats(o.loaf)), o.id + " 이어 붙인 길이"); continue; }
    for (const n of o.ns) {
      const s = specOf(o.loaf, n);
      ok(s && n >= 2 && n <= 4 && s.unitDen <= 16, o.id + " 표기 음표는 16분음표까지");
      ok(num(toBeats(s.piece)) * beatSec(o.bpm) * 1000 >= 150, o.id + " 썰기의 한 조각은 150ms 이상");
    }
    ok(o.ns.length === 1 || (o.ns.length === 4 && o.loaf === 4), o.id + " 연속 주문은 1박 덩이 4개");
  }
});
test("GN-02", "영업일별 주문 수와 통과 기준", () => {
  ok(same(DAYS.map((d) => [d.id, d.orders.length, passNeed(d.orders.length), Object.keys(d.scenes).sort().map((k) => d.scenes[k])]), LOCK.days), "주문 7, 7, 7, 8, 6, 8개. 통과 6, 6, 6, 7, 5, 7개");
});
test("GN-03", "분할 11가지가 한 번 이상 나오고 처음 나오는 주문이 정답표와 같다", () => {
  const first = {};
  splitOrders().forEach((o) => { const k = recipeKey(o.loaf, o.ns[0]); if (!first[k]) first[k] = o.id; });
  ok(Object.keys(first).length === 11, "분할 " + Object.keys(first).length + "가지");
  for (const [d, n, , , , , id] of LOCK.splits) ok(first[recipeKey(d, n)] === id, d + "÷" + n + "은 " + id + "에서 처음 나온다. 지금 " + first[recipeKey(d, n)]);
  ok(cardList().length === 15 && same(cardList().slice(0, 4), ["1", "2", "4", "8"]), "레시피 카드 15장(덩이 4 + 분할 11)");
});
test("GN-04", "마감 주문은 영업일의 마지막이고 도움이 꺼져 있다", () => {
  for (const d of DAYS) d.orders.forEach((o, i) => {
    ok(o.final === (i === d.orders.length - 1), o.id + " 마감 표시");
    if (o.final) ok(o.count === false && o.guide === false, o.id + " 마감 주문의 도움");
  });
  ok(orderById("d2-06").guide === false && orderById("d3-06").guide === false && orderById("d2-05").guide === true && orderById("d1-01").count === true, "안내선을 끄는 연습 주문");
});
test("GN-05", "썰기에 놓는 덩이 수", () => {
  for (const [d, , reps, total] of LOCK.loaves) { const o = { loaf: d, ns: [2] }; ok(sliceNs(o).length === reps && near(sliceNs(o).length * TbOf(d), total), noteKo(d) + " " + reps + "덩이"); }
  ok(same(sliceNs(orderById("d4-05")), [2, 3, 4, 3]) && same(sliceNs(orderById("d3-02")), [3, 3]) && bpmOf(orderById("d1-06"), false) === 50 && bpmOf(orderById("d1-01"), true) === 50, "연속 주문은 그대로. 8분음표 덩이는 ♩=50");
});
test("GN-06", "주문 문장은 씨앗에서 만들어진다", () => {
  for (const id of Object.keys(LOCK.orderText)) ok(orderText(orderById(id)) === LOCK.orderText[id], id + ": " + orderText(orderById(id)));
  ok(shelfLabel(orderById("d0-01"), 4, true) === "4분음표" && shelfLabel(orderById("d0-04"), 8, true) === "½박" && shelfLabel(orderById("d0-01"), 4, false) === "4분음표 1박" && shelfLabel(orderById("d0-05"), 2, true) === "2분음표 2박", "선반 이름표(D12)");
});
test("LB-06", "보기 순서는 주문마다 정해져 있고 정답 자리가 고루 나온다", () => {
  const seats = [0, 0, 0];
  for (const o of ORDERS.filter((x) => x.label === "choose")) {
    const a = choicesOf(o), right = labelOf(specOf(o.loaf, o.ns[0]));
    ok(same(a, choicesOf(o)) && a.length === 3 && same(a.map(labelKo).sort(), labelChoices(specOf(o.loaf, o.ns[0])).map(labelKo).sort()), o.id + " 같은 주문은 늘 같은 순서");
    seats[a.findIndex((l) => sameLabel(l, right))]++;
  }
  ok(seats[0] + seats[1] + seats[2] === 8 && Math.min.apply(null, seats) >= 2, "정답 자리 " + seats.join(", "));
  ok(same(shuffled([1, 2, 3], 5), shuffled([1, 2, 3], 5)) && choicesOf(orderById("d1-01")).length === 0, "씨앗이 같으면 순서가 같다");
});
```

하지 말 것
- 씨앗의 순서, 값, 개수를 바꾸지 않는다. 주문을 더하거나 빼지 않는다.
- 주문에 이름이나 정답을 적어 넣지 않는다(R3).
- 문구 함수 안에 "8분음표", "셋잇단", "(3:2)" 같은 글자를 직접 적지 않는다(W9).

끝나면 보고 (헌법 11절)
- `#test` 한 줄. 기대:
  자가검사 37/37 (전체 51개 중 37개 작성) · TH 12/13 LB 6/6 JD 8/8 GN 6/6 AU 0/6 ST 1/5 SV 4/4 CT 0/3
````

### 완료 기준

- [ ] T1. `index.html#test`의 첫 줄이 아래와 같다.

```text
자가검사 37/37 (전체 51개 중 37개 작성) · TH 12/13 LB 6/6 JD 8/8 GN 6/6 AU 0/6 ST 1/5 SV 4/4 CT 0/3
```

- [ ] T2. 목록의 검사 37개가 모두 "통과"다. 화면의 모습은 그대로다. 콘솔 오류가 없다.
- [ ] 사본을 남겼다(`P04 통과`).

---

## P05. 주문 흐름 계산부 [그대로]

**목표.** 주문 하나가 어떻게 흘러가는지를 화면 없이 계산하는 함수들(`T.*`)을 넣는다. 고르기, 재단, 이름표의 정답과 오답 처리, 문구, 유령 빵, 레시피 기록, ◐ 주문 다시 내기, 통과 계산이 모두 여기 있다. 검사가 43개가 된다.

**설계서.** 4.3~4.5절(고르기, 재단, 이름표), 4.7~4.9절(납품, 흐름, 문구), 7.2절(영업일 규칙), 7.5절(기록과 통과), 11.1절(ST-01, ST-03, ST-04, CT-01~CT-03).

````text
[P05 · SL1-3 · 주문 흐름 계산부]  종류: 그대로

시작 전 상태
- `index.html#test`의 맨 윗줄이 아래와 같다. 사람이 다르다고 알려 주면 진행하지 않는다.
  자가검사 37/37 (전체 51개 중 37개 작성) · TH 12/13 LB 6/6 JD 8/8 GN 6/6 AU 0/6 ST 1/5 SV 4/4 CT 0/3

이번에 하는 일
- 코드 1 (5 STATE): `setState`를 바꾼다. 허용하지 않는 전이를 만나면 콘솔에 "ST-01 허용하지 않는 전이: …"를 남긴다. 막지는 않는다.
- 코드 2 (5 STATE): 주문 흐름 계산부.
  · 허용 전이표 `FLOW`, `SUBS`와 `legal(a, b)`
  · 그날 주문이 나오는 줄 `queueOf(n, results)`. ◐였던 주문은 마감 주문 앞에 한 번 더 나온다
  · 지금 주문 `orderAt(S)`, 다시 나온 주문인가 `isRedo(S)`, 재시작 보호 `restartBlocked`
  · 주문을 여는 값 `enterOrder`, `openAt`(앞에 발견 장면이 있으면 장면부터), `startDay`
  · 계산부 `T`: `sceneDone`, `pick`, `confirmPick`, `bump`, `confirmMark`, `yesNo`, `choose`, `sliced`, `abort`, `toDeliver`, `next`. 모두 "바꿀 값"을 돌려주거나, 지금 할 수 없는 일이면 `null`을 돌려준다
  · 통과 계산 `dayScore(day, results)`. 썰기 결과는 통과에 넣지 않는다(R8)
- 코드 3 (11 TESTS): 검사 6개(ST-01, ST-03, ST-04, CT-01, CT-02, CT-03). 여섯 영업일을 화면 없이 처음부터 끝까지 풀어 보고, 문구의 이름과 박 수가 엔진 계산과 같은지 본다.
- 계산부는 `document`, 소리, 저장을 만지지 않는다. 상태를 직접 고치지 않는다(W7).

■ 코드 1 (그대로)
넣을 자리: 5 STATE 구획의 `function setState(patch) { … }` 한 줄을 지우고 그 자리에 넣는다.

```js
function setState(patch) {
  const next = Object.assign({}, S, patch);
  if (!legal(S, next)) console.error("ST-01 허용하지 않는 전이: " + S.phase + "/" + S.sub + " → " + next.phase + "/" + next.sub);
  S = next;
  render();
}
```

■ 코드 2 (그대로)
넣을 자리: 5 STATE 구획의 끝(`// == 6 VIEW ==` 바로 위)에 붙인다.

```js
// ── 주문 흐름 계산부: 상태와 주문을 받아 바꿀 값만 돌려준다. 화면과 소리를 만지지 않는다 ──
const FLOW = { scene: ["pick", "mark"], pick: ["mark", "deliver"], mark: ["label", "slice"], label: ["slice"], slice: ["deliver"], deliver: ["scene", "pick", "mark"] };
const SUBS = { ready: ["count", "listen"], count: ["run", "ready"], run: ["result", "ready"], result: ["count"], listen: ["ready"] };
function legal(a, b) {  // 허용하는 전이인가(설계서 4.8절). 영업 화면 안에서, 같은 영업일일 때만 본다
  if (a.screen !== "shift" || b.screen !== "shift" || a.day !== b.day) return true;
  if (a.idx !== b.idx || a.phase !== b.phase) return FLOW[a.phase].includes(b.phase);
  return a.sub === b.sub || SUBS[a.sub].includes(b.sub);
}
function queueOf(n, results) {  // 그날 주문이 나오는 줄(주문 번호). ◐였던 주문은 마감 주문 앞에 한 번 더 나온다
  const head = Array.from({ length: n - 1 }, (_, i) => i);
  const redo = results.length >= n - 1 ? head.filter((i) => results[i].recipe === "half") : [];
  return head.concat(redo, [n - 1]);
}
const baseAt = (S) => { const n = dayOf(S.day).orders.length; return queueOf(n, S.results)[Math.min(S.idx, queueOf(n, S.results).length - 1)]; };
const orderAt = (S) => dayOf(S.day).orders[baseAt(S)];
const isRedo = (S) => { const n = dayOf(S.day).orders.length; return S.idx >= n - 1 && S.idx < queueOf(n, S.results).length - 1; };
const restartBlocked = (nowMs, endedAt) => nowMs - endedAt < 600;  // 썰기가 끝난 직후의 탭이 다시 시작으로 읽히지 않게

const say = (tone, text) => ({ tone, text });
const fresh = () => ({ sub: "ready", sel: null, cuts: [0], focus: 0, tries: 0, assisted: false, fix: false, wrong: [], ghost: null, label: "", knife: "", ng: false, hearing: false, endedAt: -1e9, scene: "" });
const SRC = { score: ["악보", "는"], sound: ["원래 소리", "는"], psound: ["소리", "는"], join: ["이어 붙인 식빵", "은"] };
const srcOf = (o) => SRC[o.ask === "pick" ? (o.by === "join" ? "join" : "psound") : o.ask];
const GRADE = { master: "장인", good: "고른 편", rough: "들쭉날쭉", count: "" };
const RANK = { "장인": 3, "고른 편": 2, "들쭉날쭉": 1, "기계": 0.5 };

function enterOrder(S, o) {  // 주문 하나를 시작할 때의 값
  const word = o.ask === "word";
  const text = o.ask === "score" ? "악보를 보고 어느 식빵인지 골라요." : o.ask === "sound" || o.by === "sound" ? "주문을 듣고 어느 식빵인지 골라요." : o.by === "join" ? "이어 붙인 길이와 같은 식빵을 골라요." : o.ask === "pick" ? "선반에서 식빵을 고르고 확정을 눌러요." : o.ns.length > 1 ? "덩이를 탭하면 칼집이 하나씩 늘어요." : "빵을 탭하거나 + 를 눌러 칼집을 내요.";
  return Object.assign(fresh(), { phase: word ? "mark" : "pick", sel: word ? o.loaf : null, cuts: o.ns.map(() => 0), guideNow: S.guide && o.guide, msg: say("", text) });
}
function openAt(S, idx, results) {  // 줄의 idx번째 주문을 연다. 그 앞에 발견 장면이 있으면 장면부터 보여 준다
  const d = dayOf(S.day), n = d.orders.length, q = queueOf(n, results), redo = idx >= n - 1 && idx < q.length - 1, sc = redo ? "" : d.scenes[q[idx]] || "";
  if (sc) return Object.assign(fresh(), { idx, results, phase: "scene", scene: sc, guideNow: S.guide, msg: say("", sceneText(sc)[1]) });
  return Object.assign({ idx, results }, enterOrder(S, d.orders[q[idx]]));
}
const startDay = (S, dayId) => Object.assign({ screen: "shift", day: dayId, sliced: false, cards: [], dev: false, sum: null }, openAt(Object.assign({}, S, { day: dayId }), 0, []));
const toSlice = (text) => ({ phase: "slice", sub: "ready", label: "", ghost: null, fix: false, wrong: [], endedAt: -1e9, msg: say("good", text) });
const intro = (o) => `${splitKo(specOf(o.loaf, o.ns[0]))}. 이제 박에 맞춰 썰어요.`;

const T = {
  sceneDone: (S) => (S.phase === "scene" ? enterOrder(S, orderAt(S)) : null),
  pick(S, o, den) {
    if (S.phase !== "pick") return null;
    const what = o.ask === "pick" && o.by === "name" ? beatsKo(loafBeats(den)) + "짜리" : noteKo(den);
    return { sel: den, ghost: null, msg: say("", `${what} 식빵을 올렸어요. 맞으면 확정을 눌러요.`) };
  },
  confirmPick(S, o) {
    if (S.phase !== "pick") return null;
    if (S.sel === null) return { msg: say("bad", "선반에서 식빵을 먼저 골라 주세요.") };
    if (S.sel === o.loaf) return o.ask === "pick" ? T.toDeliver(S, o) : { phase: "mark", tries: 0, ghost: null, msg: say("good", "맞아요. 이제 빵을 탭하거나 + 를 눌러 칼집을 내요.") };
    const tries = S.tries + 1, want = loafBeats(o.loaf), got = loafBeats(S.sel);
    if (tries >= 2) return { sel: o.loaf, tries, assisted: true, ghost: null, msg: say("warn", `${noteKo(o.loaf)} 식빵이 ${beatsKo(want)}이에요. 확정을 눌러요.`) };
    if (o.ask === "pick" && o.by === "beats") return { tries, assisted: true, msg: say("bad", `${noteKo(S.sel)} 식빵은 ${beatsKo(got)}이에요. ${beatsKo(want)}짜리를 찾아요.`) };
    if (o.ask === "pick" && o.by === "name") return { tries, assisted: true, msg: say("bad", `고른 식빵은 ${beatsKo(got)}이에요. ${beatsKo(got)}은 ${noteKo(S.sel)}예요. ${noteKo(o.loaf)}를 찾아요.`) };
    const src = srcOf(o), text = `${src[0]}${src[1]} 모두 ${beatsKo(want)}이에요. ${noteKo(S.sel)} 식빵은 ${beatsKo(got)}이라 ${num(got) < num(want) ? "모자라요" : "남아요"}.`;
    return { tries, assisted: true, ghost: o.by === "join" ? null : { beats: num(want), text: `${src[0]} = ${beatsKo(want)}` }, msg: say("bad", text) };
  },
  bump(S, o, j, d) {  // d: +1, −1, 또는 "tap"(하나씩 늘고 끝에서 0으로)
    if (S.phase !== "mark") return null;
    const multi = o.ns.length > 1, max = multi ? 3 : 6, cuts = S.cuts.slice();
    cuts[j] = d === "tap" ? (cuts[j] >= max ? 0 : cuts[j] + 1) : Math.max(0, Math.min(max, cuts[j] + d));
    const k = cuts[j], text = multi ? `${j + 1}번째 덩이에 칼집 ${k}번.` : o.count ? `칼집 ${k}번이면 ${k + 1}조각이에요.` : `칼집 ${k}번.`;
    return { cuts, focus: j, fix: false, msg: say("", text) };
  },
  confirmMark(S, o) {
    if (S.phase !== "mark") return null;
    const j = o.ns.findIndex((n, q) => S.cuts[q] + 1 !== n);
    if (j < 0) {
      if (o.label === "yesno") return { phase: "label", fix: false, tries: 0, wrong: [], msg: say("", "이 조각에 숫자(잇단 표시)가 필요할까요? 틀과 견주어 보세요.") };
      if (o.label === "choose") return { phase: "label", fix: false, tries: 0, wrong: [], msg: say("", "조각들의 이름표를 골라요. 보통 칸의 이름을 보세요.") };
      return toSlice(o.ns.length > 1 ? "칼집을 다 냈어요. 이제 박에 맞춰 썰어요." : intro(o));
    }
    const tries = S.tries + 1, n = o.ns[j], k = S.cuts[j], pre = o.ns.length > 1 ? `${j + 1}번째 덩이: ` : "";
    if (tries >= 2) return { cuts: o.ns.map((x) => x - 1), tries, assisted: true, fix: false, focus: j, msg: say("warn", `${pre}${n}조각이면 칼집은 ${n - 1}번이에요. 고쳐 두었어요. 확정을 눌러요.`) };
    const text = k === n ? `칼집을 ${k}번 내면 ${k + 1}조각이에요. ${n}조각이면 칼집은 ${n - 1}번이에요.` : `전체 시간은 맞아요. 조각 수가 달라요. 지금은 ${k + 1}조각이에요.`;
    return { tries, assisted: true, fix: true, focus: j, msg: say("bad", pre + text) };
  },
  yesNo(S, o, v) {  // v: 참이면 "숫자가 필요해요"
    if (S.phase !== "label" || o.label !== "yesno") return null;
    const s = specOf(o.loaf, o.ns[0]);
    if (v === s.isTuplet) return toSlice(intro(o));
    const text = s.isTuplet ? `한 조각 ${beatsKo(toBeats(s.piece))}은 보통 칸(${beatsKo(toBeats(s.unit))})과 길이가 달라요. 숫자가 필요해요.` : "한 조각이 보통 칸과 길이가 같아요. 숫자가 필요 없어요.";
    return { assisted: true, tries: S.tries + 1, wrong: S.wrong.concat(v ? "y" : "n"), msg: say("bad", text) };
  },
  choose(S, o, i) {  // i: 화면에 놓인 순서(choicesOf)의 번호
    if (S.phase !== "label" || o.label !== "choose") return null;
    const s = specOf(o.loaf, o.ns[0]), l = choicesOf(o)[i];
    if (sameLabel(l, labelOf(s))) return toSlice(intro(o));
    const tot = labelBeats(l), Tw = toBeats(s.T), over = num(tot) > num(Tw);
    const text = `이 음표들은 모두 ${beatsKo(tot)}이라 ${beatsKo(Tw)} 식빵${over ? "보다 길어요" : "에 모자라요"}. ${s.isTuplet && !l.tup ? "숫자가 있어야 들어가요." : "보통 칸의 이름을 보세요."}`;
    return { assisted: true, tries: S.tries + 1, wrong: S.wrong.concat(i), ghost: { beats: num(tot), text: `고른 음표 = ${beatsKo(tot)}` }, msg: say("bad", text) };
  },
  sliced(S, kind, j, nowMs) {  // 썰기 한 번이 끝났을 때. j는 judge()의 결과
    const got = kind === "machine" ? "기계" : GRADE[j.grade], knife = (RANK[got] || 0) > (RANK[S.knife] || 0) ? got : S.knife;
    const ng = S.ng || (kind === "slice" && j.grade === "master" && !S.guideNow);
    let msg;
    if (kind === "machine") msg = say("", "기계가 정확한 박으로 썰었어요. 소리를 듣고 따라 해 보세요.");
    else if (!j.countOk) msg = say("bad", `조각 수가 달라요 (${j.loaves.map((l) => l.pieces).join(" · ")}조각). 칼집 자리에서만 탭해요.`);
    else {
      const w = j.worst, late = w.ms > 0, head = { master: "장인 칼솜씨예요.", good: "고른 편이에요.", rough: "조각이 들쭉날쭉해요." }[j.grade];
      const tail = j.grade === "master" ? "" : late ? " 늦게 썰면 그 앞 조각이 두꺼워져요." : " 일찍 썰면 그 앞 조각이 얇아져요.";
      const mid = S.showMs ? ` 평균 오차 ${Math.round(j.mean)}ms, 가장 큰 오차 ${late ? "+" : "−"}${Math.round(Math.abs(w.ms))}ms.` : j.grade === "master" ? "" : ` ${j.grade === "good" ? "조금" : "많이"} ${late ? "늦었어요" : "빨랐어요"}.`;
      msg = say(j.grade === "rough" ? "warn" : "good", head + mid + tail);
    }
    return { sub: "result", label: "", knife, ng, msg, endedAt: nowMs };
  },
  abort: (S, hear) => (hear ? { hearing: false } : { sub: "ready", label: "", hearing: false, msg: say("warn", "소리가 멈춰서 중단했어요. 소리를 켜고 다시 시작해 주세요.") }),  // hear: 주문 듣기였으면 단계는 그대로 둔다
  toDeliver(S, o) {  // 납품: 썰기 도중이 아니면 언제든. 고르기 주문은 맞게 고른 뒤에
    if (S.phase === "slice" ? S.sub === "count" || S.sub === "run" : !(S.phase === "pick" && o.ask === "pick" && S.sel === o.loaf)) return null;
    const res = { recipe: S.assisted ? "half" : "full", knife: o.ask === "pick" ? "" : S.knife || "–", ng: S.ng };
    const text = o.ask === "pick" ? `${noteKo(o.loaf)} 식빵은 ${beatsKo(loafBeats(o.loaf))}이에요. 그 길이만큼 소리가 나요.` : o.ns.length > 1 ? "납품했어요. 원래 소리와 조각 리듬을 차례로 들어요." : `${splitKo(specOf(o.loaf, o.ns[0]))}. 원래 소리, 조각 리듬 순서로 들어요.`;
    return { phase: "deliver", sub: "ready", label: "", ghost: null, fix: false, hearing: false, results: S.results.concat([res]), msg: say("good", text) };
  },
  next(S) {  // 다음 주문. 줄이 끝났으면 마감 화면
    if (S.phase !== "deliver") return null;
    const n = dayOf(S.day).orders.length;
    if (S.idx + 1 < queueOf(n, S.results).length) return openAt(S, S.idx + 1, S.results);
    return { screen: "close", sub: "ready", label: "", hearing: false };
  },
};
function dayScore(day, results) {  // 그날의 통과 계산. 다시 나온 주문의 결과는 세지 않는다. 썰기 결과도 세지 않는다(R8)
  const n = day.orders.length, last = queueOf(n, results).length - 1;
  let clean = 0, sliceN = 0, masterN = 0;
  day.orders.forEach((o, i) => {
    const r = i < n - 1 ? results[i] : results[last];
    if (!r) return;
    if (r.recipe === "full") clean++;
    if (o.ask !== "pick") { sliceN++; if (r.knife === "장인" && r.ng) masterN++; }
  });
  const need = passNeed(n), passed = clean >= need;
  return { n, clean, need, passed, stamp: !passed ? 0 : sliceN > 0 && masterN === sliceN ? 2 : 1 };
}
```

■ 코드 3 (그대로)
넣을 자리: 11 TESTS 구획의 끝(`// == 12 BOOT ==` 바로 위)에 붙인다.

```js
// ── SL1-3: 주문 흐름 계산부. 화면 없이 주문 43개를 끝까지 푼다 ──
const S0 = () => Object.assign({ screen: "shift", day: "d0", idx: 0, results: [], sliced: false, cards: [], dev: false, sum: null, guide: true, slow: false, offset: 0, showMs: true, sheet: false, phase: "pick", guideNow: true, msg: say("", "") }, fresh());
function solve(s, o, slip) {  // 주문 하나를 계산부만으로 푼다. slip이 참이면 첫 단계에서 한 번 틀린다. 지나간 단계와 문구를 모은다
  const phases = [s.phase], texts = [orderText(o), s.msg.text];
  const step = (p, what) => {
    ok(p, o.id + " " + what + ": 계산부가 null을 돌려줬다");
    const t = Object.assign({}, s, p);
    ok(legal(s, t), o.id + " " + what + ": 허용하지 않는 전이 " + s.phase + " → " + t.phase);
    s = t; texts.push(s.msg.text);
    if (phases[phases.length - 1] !== s.phase) phases.push(s.phase);
  };
  if (s.phase === "pick") {
    if (slip) { step(T.pick(s, o, DENS.find((d) => d !== o.loaf)), "틀린 덩이"); step(T.confirmPick(s, o), "확정(오답)"); ok(s.phase === "pick" && s.assisted, o.id + " 틀리면 고르기에 머문다"); }
    step(T.pick(s, o, o.loaf), "고르기"); step(T.confirmPick(s, o), "확정");
  }
  if (s.phase === "mark") {
    if (slip && phases.length === 1) { step(T.confirmMark(s, o), "확정(칼집 0)"); ok(s.phase === "mark" && s.fix && s.assisted, o.id + " 틀리면 재단에 머문다"); }
    o.ns.forEach((n, q) => { while (s.cuts[q] < n - 1) step(T.bump(s, o, q, 1), "칼집"); });
    step(T.confirmMark(s, o), "확정");
  }
  if (s.phase === "label") {
    const sp = specOf(o.loaf, o.ns[0]);
    step(o.label === "yesno" ? T.yesNo(s, o, sp.isTuplet) : T.choose(s, o, choicesOf(o).findIndex((l) => sameLabel(l, labelOf(sp)))), "이름표");
  }
  if (s.phase === "slice") step(T.toDeliver(s, o), "납품");
  return { s, phases, texts };
}
function playDay(dayId, slipAt) {  // 영업일 하나를 처음부터 마감까지. slipAt에 적힌 자리의 주문에서 한 번씩 틀린다
  let s = Object.assign(S0(), startDay(S0(), dayId));
  const scenes = [], ids = [], texts = [];
  for (let guard = 0; guard < 40; guard++) {
    if (s.phase === "scene") { scenes.push(s.scene); const p = T.sceneDone(s); ok(p && legal(s, Object.assign({}, s, p)), dayId + " 장면 뒤의 전이"); s = Object.assign({}, s, p); }
    const o = orderAt(s), r = solve(s, o, slipAt.includes(s.idx));
    ids.push(o.id); texts.push.apply(texts, r.texts); s = r.s;
    ok(s.phase === "deliver" && s.results.length === s.idx + 1, o.id + " 납품하면 결과가 하나 는다");
    const nx = T.next(s);
    ok(nx && legal(s, Object.assign({}, s, nx)), o.id + " 다음 주문으로 가는 전이");
    s = Object.assign({}, s, nx);
    if (s.screen === "close") return { s, scenes, ids, texts };
  }
  throw new Error(dayId + " 영업일이 끝나지 않는다");
}
const PATH = (o) => (o.ask === "pick" ? ["pick", "deliver"] : o.ask === "word" ? (o.label === "yesno" || o.label === "choose" ? ["mark", "label", "slice", "deliver"] : ["mark", "slice", "deliver"]) : ["pick", "mark", "slice", "deliver"]);
test("ST-01", "허용 전이표와 주문 43개의 단계 순서", () => {
  ok(same(FLOW, LOCK.flow) && same(SUBS, LOCK.subs), "전이표가 설계서 4.8절과 같아야 한다");
  for (const o of ORDERS) { const s = Object.assign(S0(), { day: o.day }), r = solve(Object.assign(s, enterOrder(s, o)), o, false); ok(same(r.phases, PATH(o)), o.id + " 단계 순서 " + r.phases.join(" → ")); ok(r.s.results[0].recipe === "full", o.id + " 한 번에 맞히면 ●"); }
  for (const [id, n, , sc] of LOCK.days) {
    const d = playDay(id, []);
    ok(d.ids.length === n && d.s.results.length === n && same(d.scenes, sc) && dayScore(dayOf(id), d.s.results).clean === n, id + " 완주: 주문 " + d.ids.length + "개, 장면 " + d.scenes.join(" "));
  }
  const a = S0(), slicing = Object.assign(a, enterOrder(a, orderById("d1-01")), { phase: "slice", sub: "run" });
  ok(T.toDeliver(slicing, orderById("d1-01")) === null && T.toDeliver(Object.assign({}, slicing, { sub: "count" }), orderById("d1-01")) === null, "썰기 도중에는 납품할 수 없다");
  ok(T.next(slicing) === null && T.pick(slicing, orderById("d1-01"), 4) === null && T.confirmMark(slicing, orderById("d1-01")) === null, "단계에 맞지 않는 입력은 무시한다");
  ok(!legal(Object.assign(S0(), { phase: "mark" }), Object.assign(S0(), { phase: "deliver" })) && !legal(Object.assign(S0(), { phase: "slice", sub: "ready" }), Object.assign(S0(), { phase: "slice", sub: "run" })), "그림에 없는 전이는 허용하지 않는다");
});
test("ST-03", "2차 오답이면 고쳐 주고 진행한다. 레시피는 ◐, 그 주문은 마감 앞에 한 번 더 나온다", () => {
  const o = orderById("d1-01");
  let s = Object.assign(S0(), { day: "d1" }); s = Object.assign(s, enterOrder(s, o));
  const go = (p) => { ok(p, "null"); s = Object.assign({}, s, p); };
  go(T.bump(s, o, 0, 1)); go(T.bump(s, o, 0, 1)); go(T.confirmMark(s, o));
  ok(s.phase === "mark" && s.fix && s.tries === 1 && s.msg.tone === "bad" && s.msg.text === "칼집을 2번 내면 3조각이에요. 2조각이면 칼집은 1번이에요.", "1차: 원인을 말한다. " + s.msg.text);
  go(T.confirmMark(s, o));
  ok(s.phase === "mark" && same(s.cuts, [1]) && !s.fix && s.msg.tone === "warn" && s.msg.text === "2조각이면 칼집은 1번이에요. 고쳐 두었어요. 확정을 눌러요.", "2차: 칼집을 고쳐 둔다. " + s.msg.text);
  go(T.confirmMark(s, o)); ok(s.phase === "slice", "고친 뒤 확정하면 진행");
  go(T.toDeliver(s, o)); ok(s.results[0].recipe === "half" && s.results[0].knife === "–", "레시피 ◐, 썰지 않으면 –");
  const p = orderById("d0-01"); let t = Object.assign(S0(), enterOrder(S0(), p));
  t = Object.assign({}, t, T.pick(t, p, 2)); t = Object.assign({}, t, T.confirmPick(t, p));
  ok(t.phase === "pick" && t.msg.text === "2분음표 식빵은 2박이에요. 1박짜리를 찾아요.", "고르기 1차: " + t.msg.text);
  t = Object.assign({}, t, T.confirmPick(t, p));
  ok(t.sel === 4 && t.msg.text === "4분음표 식빵이 1박이에요. 확정을 눌러요.", "고르기 2차: 정답 덩이를 올려 준다. " + t.msg.text);
  ok(same(queueOf(7, []), [0, 1, 2, 3, 4, 5, 6]), "처음에는 차례대로");
  const d = playDay("d1", [1, 3]);
  ok(same(d.ids, ["d1-01", "d1-02", "d1-03", "d1-04", "d1-05", "d1-06", "d1-02", "d1-04", "d1-07"]), "◐ 주문은 마감 주문 앞에 다시: " + d.ids.join(" "));
  const sc = dayScore(dayOf("d1"), d.s.results);
  ok(sc.clean === 5 && sc.need === 6 && !sc.passed && sc.stamp === 0, "다시 나온 주문의 결과는 통과 계산에 넣지 않는다: ● " + sc.clean);
  ok(dayScore(dayOf("d1"), playDay("d1", [2]).s.results).passed, "한 번 틀려도 6개면 통과");
});
test("ST-04", "재시작 보호는 같은 썰기 안에서만 듣는다", () => {
  ok(restartBlocked(1000, 500) && !restartBlocked(1100, 500) && !restartBlocked(1000, -1e9), "끝난 뒤 0.6초");
  const o = orderById("d1-01"), s = Object.assign(S0(), enterOrder(S0(), o), { phase: "slice", sub: "run", day: "d1" });
  const done = Object.assign({}, s, T.sliced(s, "slice", judge([0.5, 1.5, 2.5, 3.5], 1, [2, 2, 2, 2], 1000), 5000));
  ok(done.sub === "result" && done.endedAt === 5000 && done.knife === "장인" && restartBlocked(5100, done.endedAt), "썰기가 끝난 시각을 적는다");
  const nxt = Object.assign({}, done, T.toDeliver(done, o)), after = Object.assign({}, nxt, T.next(nxt));
  ok(after.endedAt === -1e9 && !restartBlocked(5100, after.endedAt), "다음 주문으로 가면 보호가 풀린다");
  const m = Object.assign(S0(), enterOrder(S0(), o), { cuts: [1], endedAt: 5000 }), sl = Object.assign({}, m, T.confirmMark(m, o));
  ok(sl.phase === "slice" && sl.endedAt === -1e9, "썰기 단계에 들어갈 때도 풀린다");
});
test("CT-01", "문구의 음표 이름과 비율은 엔진 출력과 같다", () => {
  for (const [d, n, , name, ratio] of LOCK.splits) {
    const o = splitOrders().find((x) => x.loaf === d && x.ns[0] === n), s0 = Object.assign(S0(), { day: o.day }), r = solve(Object.assign(s0, enterOrder(s0, o)), o, false);
    const want = name + (ratio ? " (" + ratio + ")" : " · 일반 분할");
    ok(r.texts.includes(want + ". 이제 박에 맞춰 썰어요.") && r.texts.includes(want + ". 원래 소리, 조각 리듬 순서로 들어요."), o.id + " " + want);
  }
  for (const id of Object.keys(LOCK.scenes)) ok(same(sceneText(id), LOCK.scenes[id]), id + ": " + sceneText(id).join(" / "));
  ok(sceneCaption(SCENES.S2.rows[0]) === "보통 칸 2개 · 8분음표" && sceneCaption(SCENES.S4.rows[1]) === "4분음표 셋잇단음표 (3:2)", "장면 줄의 이름");
});
test("CT-02", "오답 문구와 유령 빵의 박 수는 엔진 계산과 같다", () => {
  for (const o of ORDERS.filter((x) => x.label === "choose")) {
    const row = LOCK.choices.find((c) => c[0] === o.loaf && c[1] === o.ns[0]), s = Object.assign(S0(), enterOrder(S0(), o), { phase: "label", day: o.day });
    choicesOf(o).forEach((l, i) => {
      const hit = row.slice(2).find((c) => c[0] === labelKo(l)), p = T.choose(s, o, i);
      ok(hit, o.id + " 보기 " + labelKo(l));
      if (hit === row[2]) { ok(p.phase === "slice", o.id + " 정답"); return; }
      const T0 = num(loafBeats(o.loaf)), g = num(labelBeats(l));
      ok(p.phase === undefined && near(p.ghost.beats, g) && str(labelBeats(l)) === hit[1] && same(p.wrong, [i]), o.id + " 유령 빵 " + hit[1] + "박");
      ok(p.msg.text.includes(beatsKo(labelBeats(l)) + "이라") && p.msg.text.includes(g > T0 ? "보다 길어요" : "에 모자라요") && p.msg.text.endsWith(specOf(o.loaf, o.ns[0]).isTuplet && !l.tup ? "숫자가 있어야 들어가요." : "보통 칸의 이름을 보세요."), o.id + " " + p.msg.text);
    });
  }
  const o = orderById("d5-02"), s = Object.assign(S0(), enterOrder(S0(), o), { day: "d5" }), p = T.confirmPick(Object.assign({}, s, T.pick(s, o, 4)), o);
  ok(p.ghost.beats === 2 && p.ghost.text === "악보 = 2박" && p.msg.text === "악보는 모두 2박이에요. 4분음표 식빵은 1박이라 모자라요.", "악보 주문의 오답: " + p.msg.text);
  const y = orderById("d2-02"), ys = Object.assign(S0(), enterOrder(S0(), y), { phase: "label", day: "d2" }), yp = T.yesNo(ys, y, false);
  ok(yp.msg.text === "한 조각 1/3박은 보통 칸(½박)과 길이가 달라요. 숫자가 필요해요." && same(yp.wrong, ["n"]), "숫자 질문의 오답: " + yp.msg.text);
  const j = orderById("d0-05"), js = Object.assign(S0(), enterOrder(S0(), j)), jp = T.confirmPick(Object.assign({}, js, T.pick(js, j, 1)), j);
  ok(jp.ghost === null && jp.msg.text === "이어 붙인 식빵은 모두 2박이에요. 온음표 식빵은 4박이라 남아요.", "이어 붙이기의 오답: " + jp.msg.text);
});
test("CT-03", "일반 분할을 잇단음표라고 부르는 문구가 없다", () => {
  for (const d of DAYS) for (const slips of [[], [0, 1, 2, 3, 4, 5, 6]]) {
    const r = playDay(d.id, slips);
    ok(!r.texts.some((t) => /둘잇단|넷잇단/.test(t)), d.id + " 2조각과 4조각에 잇단 이름");
  }
  for (const o of splitOrders()) {
    const sp = specOf(o.loaf, o.ns[0]), s0 = Object.assign(S0(), { day: o.day }), r = solve(Object.assign(s0, enterOrder(s0, o)), o, true);
    if (!sp.isTuplet) ok(!r.texts.some((t) => t.includes("잇단음표")) && r.texts.some((t) => t.includes("일반 분할")), o.id + " 일반 분할");
    else ok(r.texts.some((t) => t.includes("잇단음표 (" + sp.n + ":" + sp.m + ")")), o.id + " 잇단음표는 비율과 함께");
  }
});
```

하지 말 것
- `T.*` 안에서 `setState`를 부르거나 `S`를 고치지 않는다. 받은 `S`는 읽기만 한다.
- 문구를 다듬지 않는다. CT 검사가 문구의 이름과 수치를 엔진 값과 견준다.
- `FLOW`와 `SUBS`에 전이를 더하지 않는다.

끝나면 보고 (헌법 11절)
- `#test` 한 줄. 기대:
  자가검사 43/43 (전체 51개 중 43개 작성) · TH 12/13 LB 6/6 JD 8/8 GN 6/6 AU 0/6 ST 4/5 SV 4/4 CT 3/3
- 콘솔에 "ST-01"로 시작하는 줄이 있는가(기대: 없음)
````

### 완료 기준

- [ ] T1. `index.html#test`의 첫 줄이 아래와 같다.

```text
자가검사 43/43 (전체 51개 중 43개 작성) · TH 12/13 LB 6/6 JD 8/8 GN 6/6 AU 0/6 ST 4/5 SV 4/4 CT 3/3
```

- [ ] T2. 목록의 검사 43개가 모두 "통과"다. 화면의 모습은 그대로다.
- [ ] T3. 콘솔에 오류가 없고 "ST-01"로 시작하는 줄도 없다.
- [ ] 사본을 남겼다(`P05 통과`).

### 게이트 GSL1

- [ ] `TH 12/13`(TH-12는 P07), `LB 6/6`, `JD 8/8`, `GN 6/6`.
- [ ] TH-13이 통과다. 앱 코드에 음표 길이 표와 비율 표가 없다는 뜻이다(R2).
- [ ] `docs/slice-gate-report.md`에 GSL1을 적었다.

---

# 4장. SL2 선반, 도마, 재단 (v0.2)

이 단계부터 화면이 움직인다. 주문 하나를 바로 여는 주소(`index.html#d0-01`, `index.html#S2`)를 쓴다. 이 주소로 한 것은 저장하지 않는다.

P06~P09에서는 "소리 켜기"가 계속 보이고 눌러도 반응이 없다. 소리는 P10에서 온다. 화면 폭이 420px보다 좁으면 "소리 켜기"가 보이는 동안 HUD의 "0단" 제목이 숨는다. 정상이다.

## P06. 그리기 뼈대, 선반, 고르기 [그대로]

**목표.** 임시 `render`를 정식 그리기로 바꾸고, 선반과 고르기 단계를 연결한다. 도마는 임시 글자로 둔다.

**설계서.** 4.1절(영역), 4.3절(고르기), 8.1절(배치), 9.3절(뷰), D12(선반 이름표).

````text
[P06 · SL2-1 · 그리기 뼈대, 선반, 고르기]  종류: 그대로

시작 전 상태
- `index.html#test`의 맨 윗줄이 아래와 같다. 사람이 다르다고 알려 주면 진행하지 않는다.
  자가검사 43/43 (전체 51개 중 43개 작성) · TH 12/13 LB 6/6 JD 8/8 GN 6/6 AU 0/6 ST 4/5 SV 4/4 CT 3/3

이번에 하는 일
- 코드 1 (6 VIEW): P01의 임시 `render`를 지우고 정식 그리기를 넣는다.
  · 배율 계산 `shelfPct`, `laneScale`(R1). 자리와 폭은 전부 %다
  · 악보 그리기 `notesSvg`, `evenXs`
  · 도마의 임시 함수 두 줄(`boardModel`, `buildBoard`). P07에서 바꾼다
  · `render`와 `renderHud`, `renderOrder`, `renderShelf`, `renderBoard`, `renderControls`. 틀은 HTML에 있고 여기서는 내용과 `hidden`만 바꾼다(R12)
  · `PAINT`: 단계별 조작부 그리기를 담는 빈 객체. 뒤 프롬프트가 `PAINT.mark`, `PAINT.slice`처럼 하나씩 더한다
- 코드 2 (10 SCREENS): 호출부 `act(p)`. 계산부가 돌려준 값을 `setState`에 넘긴다. 임시판이다.
- 코드 3 (12 BOOT): 선반의 줄과 [확정]을 계산부에 잇는다. 임시 처음 화면의 영업일 단추, 개발용 바로가기, 점검용 창구 `window.__sbg`.
- 코드 4 (12 BOOT): `boot()`를 바꾼다. 처음 화면에 영업일 단추 6개를 만들고, 주소가 `#d3-02` 꼴이면 그 주문을, `#S2` 꼴이면 그 발견 장면을 바로 연다.
- 이 코드에는 뒤 프롬프트에서 생기는 이름이 셋 들어 있다(`renderClose`는 P11, `clock`은 P10, `lastJudge`는 P11). 그때까지는 불리지 않으므로 오류가 아니다. 고치거나 미리 만들지 않는다.

■ 코드 1 (그대로)
넣을 자리: 6 VIEW 구획의 `function render() { … }` 전체(P01의 임시판)를 지우고 그 자리에 넣는다.

```js
// ── 길이 계산: 한 영역 한 배율(R1). 화면 좌표는 전부 %로 준다 ──
const shelfPct = (den) => (TbOf(den) / Math.max.apply(null, DENS.map(TbOf))) * 100;  // 선반: 가장 긴 덩이가 폭 전체
function laneScale(m) {  // 도마: 올라온 것(덩이, 유령 빵, 이어 붙인 줄) 가운데 가장 긴 것에 맞춘다
  const own = m.ns.length * m.Tb, span = Math.max(own, m.ghost ? m.ghost.beats : 0, m.ref ? m.ref.beats : 0);
  return { own, span, lw: (own / span) * 100 };
}

// ── 악보 그리기: 음표 머리의 x 자리들을 받아 묶음 하나를 그린다 ──
function notesSvg(l, xs, W, H, colored, bg) {
  const y = H - 8, top = y - 22, sx = 6.2, n = xs.length, beams = Math.max(0, Math.log2(l.den) - 2), open = l.den <= 2;
  let g = `<line x1="0" y1="${y}" x2="${W}" y2="${y}" style="stroke:var(--ink-2)" stroke-width="1"/>`;
  xs.forEach((x, i) => {
    const c = colored ? `hsl(${hue(i)} 55% 34%)` : "var(--ink)";
    g += `<ellipse cx="${x}" cy="${y}" rx="6.4" ry="4.6" transform="rotate(-20 ${x} ${y})" style="fill:${open ? bg : c};stroke:${c}" stroke-width="${open ? 2 : 0}"/>`;
    if (l.den >= 2) g += `<line x1="${x + sx}" y1="${y - 1.5}" x2="${x + sx}" y2="${top}" style="stroke:var(--ink)" stroke-width="1.6"/>`;
  });
  for (let b = 0; b < beams; b++) g += `<rect x="${xs[0] + sx - 0.8}" y="${top + b * 5.5}" width="${xs[n - 1] - xs[0] + 1.6}" height="3.4" style="fill:var(--ink)"/>`;
  if (l.tup) {
    const x1 = xs[0] - 7, x2 = xs[n - 1] + sx + 7, by = top - 9, mid = (x1 + x2) / 2;
    g += `<path d="M${x1} ${by + 5}V${by}H${mid - 11}M${mid + 11} ${by}H${x2}V${by + 5}" fill="none" style="stroke:var(--ink)" stroke-width="1.4"/>`;
    g += `<text x="${mid}" y="${by + 4.5}" text-anchor="middle" font-size="12.5" font-weight="800" style="fill:var(--ink)">${l.tup}</text>`;
  }
  return g;
}
function evenXs(n, W) { const step = Math.min(28, (W - 34) / Math.max(1, n - 1)), x0 = (W - step * (n - 1) - 6) / 2; return Array.from({ length: n }, (_, i) => x0 + i * step); }

function boardModel() { return { empty: true, sel: S.sel }; }  // 임시: 도마는 다음 단계에서 만든다
function buildBoard(m) { $("board").innerHTML = `<p class="empty">${m.sel === null ? "선반에서 식빵을 골라 도마에 올려요" : noteKo(m.sel) + " 식빵 (도마는 다음 단계에서 그려요)"}</p>`; }

// ── 그리기: 틀은 HTML에 한 번 적어 두고, 여기서는 내용과 hidden만 바꾼다 ──
function render() {
  document.querySelectorAll("#app > .screen").forEach((e) => e.toggleAttribute("hidden", e.dataset.screen !== S.screen));
  $("sheet").toggleAttribute("hidden", !S.sheet);
  $("setGuide").checked = S.guideNow; $("setSlow").checked = S.slow; $("offOut").textContent = S.offset + "ms";
  $("openSet").setAttribute("aria-expanded", String(S.sheet));
  if (S.screen === "close") renderClose();
  if (S.screen !== "shift") return;
  const scene = S.phase === "scene", o = orderAt(S);
  renderHud();
  renderOrder(o, scene);
  renderShelf(o);
  renderBoard();
  $("readout").className = "readout " + S.msg.tone;
  $("readout").textContent = S.msg.text;
  renderControls(o);
}
function renderHud() {
  const d = dayOf(S.day), n = d.orders.length, last = queueOf(n, S.results).length - 1, cur = baseAt(S);
  $("hudTitle").textContent = DAYS.indexOf(d) + "단";
  $("dots").innerHTML = d.orders.map((_, i) => { const r = i < n - 1 ? S.results[i] : S.results[last]; return `<li class="${i === cur ? "cur " : ""}${r ? r.recipe : ""}" aria-label="주문 ${i + 1}${r ? (r.recipe === "full" ? ": 한 번에 맞힘" : ": 도움 받아 완료") : ""}"></li>`; }).join("");
  const on = soundOn(ctx && ctx.state);  // 소리 상태를 숨기지 않는다(R13)
  $("soundChip").toggleAttribute("hidden", on);
  $("hud").classList.toggle("nosound", !on);
}
function renderOrder(o, scene) {
  const busy = S.sub === "count" || S.sub === "run", key = S.day + "/" + S.idx + "/" + (scene ? "scene" : "order"), play = !scene && (o.ask === "sound" || o.by === "sound");
  if (key !== orderKey) {  // 주문 카드는 주문이 바뀔 때만 다시 그린다
    orderKey = key;
    $("orderTag").textContent = scene ? "발견" : TAG[o.ask];
    $("orderText").textContent = scene ? sceneText(S.scene)[0] : orderText(o);
    const sc = $("orderScore"), show = !scene && o.ask === "score";
    sc.toggleAttribute("hidden", !show);
    if (show) { const l = labelOf(specOf(o.loaf, o.ns[0])); sc.setAttribute("viewBox", "0 0 104 48"); sc.setAttribute("aria-label", labelKo(l)); sc.innerHTML = notesSvg(l, evenXs(l.count, 104), 104, 48, false, "var(--panel)"); }
    $("orderPlay").toggleAttribute("hidden", !play);
  }
  $("orderPlay").textContent = S.hearing ? "듣는 중" : "주문 듣기";
  $("orderPlay").disabled = busy;
}
function renderShelf(o) {
  const picking = S.phase === "pick", key = o.id + "/" + picking;
  if (key !== shelfKey) {  // 이름표는 주문과 단계에 따라 달라진다(D12)
    shelfKey = key;
    let h = "";
    for (const den of DENS) h += `<button class="srow" type="button" data-den="${den}" aria-pressed="false"><span class="nm">${shelfLabel(o, den, picking)}</span><span class="track"><span class="bar" style="width:${shelfPct(den)}%"></span></span></button>`;
    const top = Math.round(Math.max.apply(null, DENS.map(TbOf)));
    h += `<div class="sruler" aria-hidden="true"><span></span><div class="ruler">${Array.from({ length: top + 1 }, (_, b) => `<span style="left:${(b / top) * 100}%">${b}${b === top ? "박" : ""}</span>`).join("")}</div></div>`;
    $("shelf").innerHTML = h;
  }
  $("shelf").classList.toggle("pick", picking);
  document.querySelectorAll("#shelf .srow").forEach((b) => { b.disabled = !picking; b.setAttribute("aria-pressed", String(+b.dataset.den === S.sel)); });
}
function renderBoard() {
  const el = $("board"), m = boardModel(), key = JSON.stringify(m) + "|" + boardW;
  el.classList.toggle("pick", S.phase === "pick");
  el.classList.toggle("join", !!m.ref);
  el.classList.toggle("scene", S.phase === "scene");
  el.classList.toggle("run", S.phase === "slice" || S.phase === "deliver");
  if (key !== boardKey) { boardKey = key; buildBoard(m); }
}
const PAINT = {};  // 단계별 조작부 그리기. 단계가 생길 때마다 하나씩 더한다
function renderControls(o) {
  const ph = S.phase, lab = ph === "label" ? o.label : "";
  $("cPick").toggleAttribute("hidden", ph !== "pick");
  $("cMark").toggleAttribute("hidden", ph !== "mark");
  $("cYesNo").toggleAttribute("hidden", lab !== "yesno");
  $("cLabel").toggleAttribute("hidden", lab !== "choose");
  $("cSlice").toggleAttribute("hidden", ph !== "slice");
  $("cDeliver").toggleAttribute("hidden", ph !== "deliver");
  $("cScene").toggleAttribute("hidden", ph !== "scene");
  if (PAINT[ph]) PAINT[ph](o);
}
```

■ 코드 2 (그대로)
넣을 자리: 10 SCREENS 구획의 끝(`// == 11 TESTS ==` 바로 위)에 붙인다.

```js
// ── 호출부: 계산부가 돌려준 값을 적용한다. 소리와 기록은 뒤 단계에서 붙인다 ──
function act(p) { if (p) setState(p); }
```

■ 코드 3 (그대로)
넣을 자리: 12 BOOT 구획에서 `function boot()` 바로 위에 넣는다.

```js
// ── 입력: 누른 것을 계산부에 넘기고 돌려받은 값을 act()로 적용한다 ──
$("shelf").addEventListener("click", (e) => { const b = e.target.closest(".srow[data-den]"); if (b && !b.disabled) act(T.pick(S, orderAt(S), +b.dataset.den)); });
$("pickOk").addEventListener("click", () => act(T.confirmPick(S, orderAt(S))));

// ── 임시 처음 화면의 영업일 단추, 개발용 바로가기, 점검용 창구 ──
$("days").addEventListener("click", (e) => { const b = e.target.closest("button[data-day]"); if (b) setState(startDay(S, b.dataset.day)); });
window.addEventListener("hashchange", () => location.reload());
window.__sbg = { state: () => S, run: () => run, clock: () => clock(), audioCtx: () => ctx, lastJudge: () => lastJudge, laneLw: () => laneLw, saved: () => save, orderAt, choicesOf, labelKo, labelBeats, queueOf, dayOf };  // 화면 점검 스크립트가 읽는다
```

■ 코드 4 (그대로)
넣을 자리: 12 BOOT 구획의 `function boot() { … }` 전체를 지우고 그 자리에 넣는다.

```js
function boot() {
  store = makeStore(pickBackend());
  save = store.load();
  const tests = runTests(), set = save.settings, base = { guide: set.guide, slow: set.slow, offset: set.tapOffsetMs, showMs: set.showMs };
  window.__tests = tests;
  $("foot").textContent = `외부 요청 0건 · ${tests.line}`;
  $("days").innerHTML = DAYS.map((d, i) => `<button class="btn" type="button" data-day="${d.id}">${i}단 ${d.name}</button>`).join("");
  measure();
  const hash = location.hash.slice(1), jump = orderById(hash), sceneDay = DAYS.find((d) => Object.keys(d.scenes).some((k) => d.scenes[k] === hash));
  if (hash === "test") { showTests(tests); return; }
  if (jump || sceneDay) {  // 개발용 바로가기: 주소 끝에 #d3-02(주문) 또는 #S2(발견 장면). 저장하지 않는다
    const d = jump ? dayOf(jump.day) : sceneDay, i = jump ? d.orders.indexOf(jump) : +Object.keys(d.scenes).find((k) => d.scenes[k] === hash);
    const fake = Array.from({ length: i }, () => ({ recipe: "full", knife: "", ng: false })), at = Object.assign({}, S, base, { day: d.id });
    setState(Object.assign(base, { screen: "shift", day: d.id, sliced: false, cards: [], dev: true, sum: null }, jump ? Object.assign({ idx: i, results: fake }, enterOrder(at, jump)) : openAt(at, i, fake)));
    return;
  }
  setState(base);
}
```

하지 말 것
- 틀(HUD, 주문 카드, 선반, 도마, 판독 줄, 조작부)을 스크립트에서 새로 만들지 않는다. HTML에 있는 것을 쓴다(R12).
- 선반 막대의 폭을 px로 주지 않는다(W10).
- 입력 처리기 안에서 정답을 판단하지 않는다. `act(T.무엇(S, orderAt(S), …))` 꼴을 지킨다.
- [−], [+], [다음 주문], [주문 듣기]는 아직 잇지 않는다. 뒤 프롬프트의 일이다(W1).

끝나면 보고 (헌법 11절)
- `#test` 한 줄. 기대(P05와 같다):
  자가검사 43/43 (전체 51개 중 43개 작성) · TH 12/13 LB 6/6 JD 8/8 GN 6/6 AU 0/6 ST 4/5 SV 4/4 CT 3/3
````

### 완료 기준

- [ ] T1. `index.html#test`의 첫 줄이 아래와 같다.

```text
자가검사 43/43 (전체 51개 중 43개 작성) · TH 12/13 LB 6/6 JD 8/8 GN 6/6 AU 0/6 ST 4/5 SV 4/4 CT 3/3
```

- [ ] T2. `index.html`의 처음 화면에 단추 6개가 생겼다. "0단 첫 출근", "1단 반으로, 또 반으로", "2단 세 조각의 문제", "3단 같은 세 조각, 다른 빵", "4단 바꿔 썰기", "5단 거꾸로 읽기".
- [ ] T3. `index.html#d0-01`. 주문 카드에 "고르기"와 "1박짜리 식빵을 골라 주세요.". 진행 점 7개. 선반 네 줄의 이름표가 "온음표", "2분음표", "4분음표", "8분음표"다(박 수는 보이지 않는다). 막대의 길이가 위에서부터 절반씩 줄어든다. 판독 줄에 "선반에서 식빵을 고르고 확정을 눌러요.".
- [ ] T4. 아무것도 고르지 않고 [확정]을 누르면 "선반에서 식빵을 먼저 골라 주세요.".
- [ ] T5. "2분음표" 줄을 누르면 그 줄에 테두리가 생기고, 도마 자리에 "2분음표 식빵 (도마는 다음 단계에서 그려요)", 판독 줄에 "2분음표 식빵을 올렸어요. 맞으면 확정을 눌러요.". [확정]을 누르면 "2분음표 식빵은 2박이에요. 1박짜리를 찾아요.".
- [ ] T6. "온음표" 줄을 누르고 [확정]을 누르면(두 번째 오답) 4분음표 줄이 저절로 선택되고 "4분음표 식빵이 1박이에요. 확정을 눌러요.". [확정]을 누르면 "4분음표 식빵은 1박이에요. 그 길이만큼 소리가 나요."가 나오고 조작부가 [다시 듣기] [다음 주문]으로 바뀐다. 첫 진행 점이 반만 찬다(◐). 선반 이름표가 "온음표 4박"처럼 이름과 박 수를 함께 보인다. [다시 듣기]와 [다음 주문]은 아직 반응이 없다(P11).
- [ ] T7. `index.html#d0-04`. "8분음표 식빵을 골라 주세요.". 선반 이름표가 "4박", "2박", "1박", "½박"이다(이름은 보이지 않는다). "1박" 줄을 누르면 "1박짜리 식빵을 올렸어요. 맞으면 확정을 눌러요.", [확정]을 누르면 "고른 식빵은 1박이에요. 1박은 4분음표예요. 8분음표를 찾아요.".
- [ ] T8. `index.html#d1-01`. "말 주문"과 "1박 식빵(4분음표)을 같은 크기 2조각으로 썰어 주세요.". 선반의 "4분음표 1박" 줄이 선택되어 있고 줄을 눌러도 바뀌지 않는다. 조작부는 [−] [+] [확정]이고 아직 반응이 없다(P08). 판독 줄에 "빵을 탭하거나 + 를 눌러 칼집을 내요.".
- [ ] T9. `index.html#d0-07`. "이 소리만큼 긴 식빵을 골라 주세요."와 [주문 듣기] 단추(아직 반응 없음). 판독 줄에 "주문을 듣고 어느 식빵인지 골라요.".
- [ ] T10. 320×568, 360×640, 390×844에서 T3과 T7의 화면에 스크롤이 없다. 콘솔 오류가 없다.
- [ ] 사본을 남겼다(`P06 통과`).

---

## P07. 도마 [그대로]

**목표.** 도마를 그린다. 덩이, 조각, 칼집, 틀, 유령 빵, 눈금, 이어 붙인 줄, 발견 장면이 모두 한 배율로 놓인다. 검사 TH-12가 들어와 44개가 된다.

**설계서.** R1, R12, 4.3절(유령 빵, 이어 붙이기), 4.4절(틀), 7.4절(발견 장면), 9.3절(도마 모델과 열쇠).

````text
[P07 · SL2-2 · 도마]  종류: 그대로

시작 전 상태
- `index.html#test`의 맨 윗줄이 아래와 같다. 사람이 다르다고 알려 주면 진행하지 않는다.
  자가검사 43/43 (전체 51개 중 43개 작성) · TH 12/13 LB 6/6 JD 8/8 GN 6/6 AU 0/6 ST 4/5 SV 4/4 CT 3/3

이번에 하는 일
- 코드 1 (6 VIEW): 임시 함수 두 줄을 지우고 도마를 넣는다.
  · `boardModel()`: 상태에서 "무엇을 그릴지"만 뽑는다. 이 값을 글자로 바꾼 것이 열쇠이고, `renderBoard()`는 열쇠가 바뀔 때만 `buildBoard()`를 부른다(R12)
  · `buildBoard(m)`: 이어 붙인 줄, 틀, 덩이 줄(조각, 칼집, 덩이 안의 "칼집 n"), 유령 빵, 눈금, 악보 자리. 배율은 `laneScale(m)` 하나가 정한다(R1). 다시 그리기 전에 포커스가 덩이에 있었으면 같은 덩이에 돌려준다
  · `rulerHtml(span)`: 0부터 가장 긴 박까지의 눈금
  · `buildScene(el, id)`: 발견 장면. 줄이 여럿이어도 배율은 하나다
- 코드 2 (11 TESTS): 검사 TH-12.

■ 코드 1 (그대로)
넣을 자리: 6 VIEW 구획의 임시 함수 두 줄(`function boardModel()`과 `function buildBoard(m)`)을 지우고 그 자리에 넣는다.

```js
// ── 도마: 무엇을 그릴지를 상태에서 뽑아 열쇠로 삼고, 열쇠가 바뀔 때만 다시 만든다(R12) ──
function boardModel() {
  if (S.phase === "scene") return { scene: S.scene };
  const o = orderAt(S), den = S.sel, single = o.ns.length === 1;
  const ref = S.phase === "pick" && o.by === "join" ? { count: o.join[1], beats: o.join[1] * TbOf(o.join[0]) } : null;  // 이어 붙이기 주문의 견줄 줄
  if (den === null) return ref ? { empty: true, ref } : { empty: true };
  const base = { den, Tb: TbOf(den) };
  switch (S.phase) {
    case "pick": return Object.assign(base, { ns: [1], view: "plain", ghost: S.ghost, ref });
    case "mark": return Object.assign(base, { ns: S.cuts.map((k) => k + 1), view: S.fix ? "fix" : "marks", mold: o.mold && single ? S.cuts[0] + 1 : 0, tap: true, focus: single ? -1 : S.focus, counts: !single });
    case "label": return Object.assign(base, { ns: [o.ns[0]], view: "slices", mold: o.ns[0], ghost: S.ghost });
    case "slice": return Object.assign(base, { ns: sliceNs(o), view: "guide", guide: S.guideNow });
    default: return Object.assign(base, { ns: o.ask === "pick" ? [1] : o.ns, view: "slices", mold: o.mold && single ? o.ns[0] : 0, score: o.ask !== "pick" && single });
  }
}
function buildBoard(m) {
  const el = $("board"), act = document.activeElement, hadFocus = act && act.classList && act.classList.contains("loaf") ? act.dataset.q : null;
  laneLw = 100;
  if (m.scene) { buildScene(el, m.scene); return; }
  if (m.empty && !m.ref) { el.innerHTML = `<p class="empty">선반에서 식빵을 골라 도마에 올려요</p>`; return; }
  const sc = m.empty ? { span: m.ref.beats, lw: 100 } : laneScale(m), span = sc.span, lw = sc.lw;  // 한 영역 한 배율
  const W = Math.max(120, el.clientWidth - 27), tag = m.tap ? "button" : "div";
  laneLw = lw;
  let h = "";
  if (m.ref) h += `<div class="refrow" style="width:${(m.ref.beats / span) * 100}%">${Array.from({ length: m.ref.count }, (_, i) => `<div class="loaf" style="left:${(i / m.ref.count) * 100}%;width:${100 / m.ref.count}%"></div>`).join("")}</div>`;
  if (m.empty) h += `<p class="empty">길이가 같은 식빵을 선반에서 골라요</p>`;
  else {
    const R = m.ns.length;
    if (m.mold) {
      const s = specOf(m.den, m.mold), cell = (W * lw) / 100 / s.m;
      h += `<div class="mold" style="width:${lw}%">${Array.from({ length: s.m }, () => `<span>${cell >= 50 ? noteKo(s.unitDen) : noteShort(s.unitDen)}${cell >= 104 ? " " + beatsKo(toBeats(s.unit)) : ""}</span>`).join("")}</div>`;
    }
    h += `<div class="lane${m.view === "guide" && !m.guide ? " noguide" : ""}" id="lane">`;
    m.ns.forEach((n, q) => {
      const px = (W * lw) / 100 / R / n, pk = beatsKo(div(loafBeats(m.den), F(n)));
      h += `<${tag} class="loaf${m.focus === q ? " focus" : ""}"${m.tap ? ` type="button" data-q="${q}" aria-label="${R > 1 ? q + 1 + "번째 덩이, " : ""}칼집 ${n - 1}번. 누르면 하나 늘어요"` : ""} style="left:${(q / R) * lw}%;width:${lw / R}%">`;
      if (m.view === "slices" || m.view === "fix") for (let i = 0; i < n; i++) h += `<i class="slice${m.view === "fix" ? " num" : ""}" style="left:${(i / n) * 100}%;width:${100 / n}%;--hue:${hue(i)}">${m.view === "fix" ? i + 1 : px >= 38 ? pk : ""}</i>`;
      if (m.view !== "plain") for (let k = 1; k < n; k++) h += `<b class="mark${m.view === "fix" ? " solid" : ""}" style="left:${(k / n) * 100}%"></b>`;
      if (m.counts) h += `<em class="kc">칼집 ${n - 1}</em>`;
      h += `</${tag}>`;
    });
    h += `<div class="cursor" id="cursor"></div></div>`;
    if (m.ghost) h += `<div class="ghost" style="width:${(m.ghost.beats / span) * 100}%">${m.ghost.text}</div>`;
  }
  h += rulerHtml(span);
  if (m.score) h += `<svg class="score" id="score" role="img"></svg>`;
  el.innerHTML = h;
  if (m.score) {
    const s = specOf(m.den, m.ns[0]), l = labelOf(s), sv = $("score");
    sv.setAttribute("viewBox", `0 0 ${W} 50`); sv.setAttribute("aria-label", labelKo(l));
    sv.innerHTML = notesSvg(l, Array.from({ length: s.n }, (_, i) => (i / s.n) * W + 12), W, 50, true, "var(--board)");
  }
  if (hadFocus !== null && hadFocus !== undefined) { const b = el.querySelector(`button.loaf[data-q="${hadFocus}"]`); if (b) b.focus(); }
}
function rulerHtml(span) {  // 눈금: 0부터 가장 긴 박까지. 1박보다 짧으면 반 박 간격
  const step = span >= 1 ? 1 : 0.5;
  let h = `<div class="ruler">`;
  for (let b = 0; b <= span + 1e-9; b += step) h += `<span style="left:${(b / span) * 100}%">${fmt(b)}${b + step > span + 1e-9 ? "박" : ""}</span>`;
  return h + `</div>`;
}
function buildScene(el, id) {  // 발견 장면: 줄이 여럿이어도 배율은 하나(R1)
  const rows = SCENES[id].rows, span = Math.max.apply(null, rows.map((r) => TbOf(r.loaf)));
  let h = "";
  rows.forEach((r, i) => {
    const s = specOf(r.loaf, r.n), lw = (TbOf(r.loaf) / span) * 100;
    h += `<p class="cap">${sceneCaption(r)}</p><div class="lane" data-row="${i}" style="width:${lw}%"><div class="loaf${r.mold ? " asmold" : ""}" style="left:0;width:100%">`;
    for (let k = 0; k < s.n; k++) h += `<i class="slice" style="left:${(k / s.n) * 100}%;width:${100 / s.n}%;--hue:${hue(k)}">${r.mold ? noteKo(s.unitDen) : beatsKo(toBeats(s.piece))}</i>`;
    for (let k = 1; k < s.n; k++) h += `<b class="mark" style="left:${(k / s.n) * 100}%"></b>`;
    h += `</div></div>`;
  });
  el.innerHTML = h + rulerHtml(span);
}
```

■ 코드 2 (그대로)
넣을 자리: 11 TESTS 구획의 끝(`// == 12 BOOT ==` 바로 위)에 붙인다.

```js
// ── SL2: 한 영역 한 배율 ──
test("TH-12", "한 영역 한 배율: 길이가 2배면 폭도 2배, 유령 빵이 길면 덩이가 줄어든다", () => {
  ok(shelfPct(1) === 100 && near(shelfPct(2), 2 * shelfPct(4)) && near(shelfPct(4), 2 * shelfPct(8)) && near(shelfPct(8), 100 / 8), "선반: 온음표가 폭 전체");
  const a = laneScale({ ns: [1], Tb: 2, ghost: { beats: 3 } }), b = laneScale({ ns: [1], Tb: 2, ghost: { beats: 1 } }), c = laneScale({ ns: [2, 3, 4, 3], Tb: 1 }), d = laneScale({ ns: [1], Tb: 4, ref: { beats: 2 } });
  ok(a.span === 3 && near(a.lw, 200 / 3), "유령 빵 3박, 덩이 2박이면 덩이는 폭의 2/3");
  ok(b.span === 2 && b.lw === 100 && c.span === 4 && c.lw === 100 && d.span === 4 && d.lw === 100, "덩이가 가장 길면 덩이가 폭 전체");
});
```

하지 말 것
- 덩이, 조각, 칼집, 유령 빵의 자리와 폭을 px로 주지 않는다. 폭을 px로 계산하는 곳은 "글자가 들어갈 만큼 넓은가"를 정하는 데만 쓴다(W10).
- `render()`가 불릴 때마다 도마를 다시 만들지 않는다. 열쇠 비교를 지우지 않는다(R12).
- 유령 빵이 길 때 도마 밖으로 넘치게 두지 않는다. 배율이 줄어 덩이가 작아져야 한다(R1).

끝나면 보고 (헌법 11절)
- `#test` 한 줄. 기대:
  자가검사 44/44 (전체 51개 중 44개 작성) · TH 13/13 LB 6/6 JD 8/8 GN 6/6 AU 0/6 ST 4/5 SV 4/4 CT 3/3
````

### 완료 기준

- [ ] T1. `index.html#test`의 첫 줄이 아래와 같다.

```text
자가검사 44/44 (전체 51개 중 44개 작성) · TH 13/13 LB 6/6 JD 8/8 GN 6/6 AU 0/6 ST 4/5 SV 4/4 CT 3/3
```

- [ ] T2. `index.html#d0-01`. 도마에 "선반에서 식빵을 골라 도마에 올려요". "온음표" 줄을 누르면 덩이가 도마 폭을 가득 채우고 눈금이 "0", "1", "2", "3", "4박"이다. "8분음표" 줄을 누르면 덩이가 역시 폭을 가득 채우고 눈금이 "0", "½박"이다. 고른 덩이는 늘 폭에 맞춰 확대되고, 길이는 눈금으로 읽는다.
- [ ] T3. `index.html#d0-05`(이어 붙이기). 도마 위쪽에 작은 덩이 2개가 이어진 줄이 있고 "길이가 같은 식빵을 선반에서 골라요", 눈금은 "0", "1", "2박". "온음표 4박" 줄을 누르면 덩이가 폭을 가득 채우고 이어 붙인 줄은 폭의 절반으로 줄어든다. "4분음표 1박" 줄을 누르면 반대로 덩이가 폭의 절반이다. 그 상태로 [확정]을 누르면 "이어 붙인 식빵은 모두 2박이에요. 4분음표 식빵은 1박이라 모자라요.".
- [ ] T4. `index.html#d5-02`(악보 주문). 주문 카드 오른쪽에 음표 셋과 괄호, 숫자 3이 그려진다. "4분음표 1박" 줄을 누르고 [확정]을 누르면 "악보는 모두 2박이에요. 4분음표 식빵은 1박이라 모자라요."가 나오고, 덩이 아래에 점선 막대 "악보 = 2박"이 생기며, 덩이가 폭의 절반으로 줄고 눈금이 "0", "1", "2박"이 된다. "2분음표 2박" 줄을 누르고 [확정]을 누르면 "맞아요. 이제 빵을 탭하거나 + 를 눌러 칼집을 내요."가 나오고 덩이 위에 틀 한 칸 "2분음표 2박"이 놓인다.
- [ ] T5. `index.html#d0-07`. "8분음표 ½박" 줄을 누르고 [확정]을 누르면 "소리는 모두 2박이에요. 8분음표 식빵은 ½박이라 모자라요.", 점선 막대 "소리 = 2박", 덩이는 폭의 1/4이다.
- [ ] T6. `index.html#d1-01`에는 덩이 하나와 눈금 "0", "1박". `index.html#d4-05`에는 덩이 4개가 나란히 있고 덩이마다 "칼집 0", 눈금은 4박까지, 판독 줄에 "덩이를 탭하면 칼집이 하나씩 늘어요.". `index.html#d2-02`에는 덩이 위에 틀 한 칸 "4분음표 1박".
- [ ] T7. `index.html#S1`. 주문 카드에 "발견"과 "조각 수는 같은데 길이가 달라요.", 판독 줄에 "덩이가 길면 조각도 길어요.". 도마에 두 줄: "8분음표 2개 · 일반 분할"(폭의 절반), "4분음표 2개 · 일반 분할"(폭 가득). 조작부는 [들어 보기] [알겠어요](아직 반응 없음). `#S2`, `#S3`, `#S4`의 줄 이름과 문장은 P00 8절의 발견 장면 표와 같다.
- [ ] T8. 320×568, 360×640, 390×844에서 T3, T4, T7의 화면에 스크롤이 없고 글자가 잘리지 않는다. 콘솔 오류가 없다.
- [ ] 사본을 남겼다(`P07 통과`).

---

## P08. 재단 [그대로]

**목표.** 재단 단계를 잇는다. [−], [+], 빵 탭으로 칼집 수를 바꾸고 [확정]으로 답한다.

**설계서.** 4.4절(재단), 4.9절(문구), R4, R14.

````text
[P08 · SL2-3 · 재단]  종류: 그대로

시작 전 상태
- `index.html#test`의 맨 윗줄이 아래와 같다. 사람이 다르다고 알려 주면 진행하지 않는다.
  자가검사 44/44 (전체 51개 중 44개 작성) · TH 13/13 LB 6/6 JD 8/8 GN 6/6 AU 0/6 ST 4/5 SV 4/4 CT 3/3

이번에 하는 일
- 코드 1 (6 VIEW): `PAINT.mark`. 조작부 가운데에 "칼집 n번"(연속 주문은 "2번째 · 칼집 n번")을 적는다.
- 코드 2 (12 BOOT): 빵 탭, [−], [+], [확정]을 계산부 `T.bump`, `T.confirmMark`에 잇는다. 빵 탭은 하나씩 늘고 끝(한 덩이 6, 연속 주문 3)에서 0으로 돌아간다. [−]와 [+]는 마지막에 누른 덩이에 듣는다.
- 판독 문구, 오답 표시(조각 번호와 실선), 2차 오답의 고쳐 주기는 P05의 계산부와 P07의 도마가 이미 한다. 이번에는 입력만 잇는다.

■ 코드 1 (그대로)
넣을 자리: 6 VIEW 구획의 끝(`// == 7 AUDIO ==` 바로 위)에 붙인다.

```js
PAINT.mark = (o) => { $("markOut").textContent = (o.ns.length > 1 ? `${S.focus + 1}번째 · ` : "") + `칼집 ${S.cuts[S.focus] || 0}번`; };
```

■ 코드 2 (그대로)
넣을 자리: 12 BOOT 구획에서 `function boot()` 바로 위에 넣는다.

```js
$("board").addEventListener("click", (e) => { const l = e.target.closest("button.loaf"); if (l) act(T.bump(S, orderAt(S), +l.dataset.q, "tap")); });
$("minus").addEventListener("click", () => act(T.bump(S, orderAt(S), S.focus, -1)));
$("plus").addEventListener("click", () => act(T.bump(S, orderAt(S), S.focus, 1)));
$("markOk").addEventListener("click", () => act(T.confirmMark(S, orderAt(S))));
```

하지 말 것
- 처리기 안에서 칼집 수를 직접 계산하거나 상태를 고치지 않는다(W7).
- 칼집의 자리를 플레이어가 옮길 수 있게 만들지 않는다. 플레이어가 정하는 것은 수뿐이다.

끝나면 보고 (헌법 11절)
- `#test` 한 줄. 기대(P07과 같다):
  자가검사 44/44 (전체 51개 중 44개 작성) · TH 13/13 LB 6/6 JD 8/8 GN 6/6 AU 0/6 ST 4/5 SV 4/4 CT 3/3
````

### 완료 기준

- [ ] T1. `index.html#test`의 첫 줄이 P07과 같다(`자가검사 44/44 …`).
- [ ] T2. `index.html#d1-01`. [+]를 누르면 덩이 가운데에 점선이 하나 생기고 조작부에 "칼집 1번", 판독 줄에 "칼집 1번이면 2조각이에요.". 빵을 탭하면 "칼집 2번이면 3조각이에요.".
- [ ] T3. 그 상태(칼집 2)로 [확정]을 누르면 조각에 번호 1, 2, 3이 붙고 칼집이 실선이 되며 "칼집을 2번 내면 3조각이에요. 2조각이면 칼집은 1번이에요.". [−]를 누르면 번호가 사라지고 "칼집 1번이면 2조각이에요.".
- [ ] T4. [확정]을 누르면 "8분음표 2개 · 일반 분할. 이제 박에 맞춰 썰어요."가 나오고 도마에 덩이 4개가 놓인다(덩이마다 안내선 1개, 눈금 4박까지). 조작부에 글자 없는 큰 단추와 [기계 썰기] [납품]이 보이고 아직 반응이 없다(P11, P13).
- [ ] T5. `index.html#d1-01`을 다시 열어 칼집 0으로 [확정]을 누르면 "전체 시간은 맞아요. 조각 수가 달라요. 지금은 1조각이에요.". 한 번 더 [확정]을 누르면 칼집이 1로 고쳐지고 "2조각이면 칼집은 1번이에요. 고쳐 두었어요. 확정을 눌러요.".
- [ ] T6. 빵을 여섯 번 탭하면 "칼집 6번이면 7조각이에요.", 일곱 번째에 "칼집 0번이면 1조각이에요."로 돌아간다.
- [ ] T7. `index.html#d1-07`(마감 주문). [+]를 누르면 판독 줄이 "칼집 1번."뿐이다. 조각 수를 말해 주지 않는다.
- [ ] T8. `index.html#d2-02`. 칼집 0이면 틀이 한 칸 "4분음표 1박", 칼집 1과 2에서는 두 칸 "8분음표 ½박", 칼집 3에서는 네 칸 "16분음표"다.
- [ ] T9. `index.html#d4-05`. 첫 덩이를 탭하면 "1번째 덩이에 칼집 1번.", 조작부에 "1번째 · 칼집 1번", 덩이 안에 "칼집 1". 둘째 덩이를 두 번 탭하고 [−]를 누르면 "2번째 덩이에 칼집 1번."(마지막에 누른 덩이가 줄어든다). 한 덩이를 네 번 탭하면 네 번째에 0으로 돌아간다.
- [ ] T10. `#d4-05`에서 칼집을 1, 2, 3, 1로 두고 [확정]을 누르면 모든 조각에 번호가 붙고 "4번째 덩이: 전체 시간은 맞아요. 조각 수가 달라요. 지금은 2조각이에요.". 넷째 덩이를 한 번 더 탭하고 [확정]을 누르면 "칼집을 다 냈어요. 이제 박에 맞춰 썰어요.".
- [ ] T11. 키보드: `#d1-01`에서 Tab으로 빵에 포커스를 두고 Enter를 두 번 누르면 칼집이 2가 되고 포커스가 빵에 남아 있다.
- [ ] 콘솔 오류가 없다. 사본을 남겼다(`P08 통과`).

---

## P09. 틀, 유령 빵, 이어 붙이기 점검 [점검]

**목표.** SL2에서 만든 화면이 규칙(R1, R9, R10, R12)을 지키는지 코드와 화면 양쪽에서 확인하고 게이트 GSL2를 닫는다. 코드는 더하지 않는다.

**설계서.** 2.2절(배치 측정), 11.1절(E-01, E-02, E-03, E-05), 10장 GSL2.

````text
[P09 · SL2-4 · 틀, 유령 빵, 이어 붙이기 점검]  종류: 점검

시작 전 상태
- `index.html#test`의 맨 윗줄이 아래와 같다.
  자가검사 44/44 (전체 51개 중 44개 작성) · TH 13/13 LB 6/6 JD 8/8 GN 6/6 AU 0/6 ST 4/5 SV 4/4 CT 3/3

이번에 하는 일
- 코드를 고치지 않는다. `index.html`을 읽고 아래 일곱 가지에 "지킴", "어김", "확인 못 함" 가운데 하나로 답한다. "어김"에는 해당하는 줄과 까닭을 적고 고칠 방법을 제안만 한다.

1. 6 VIEW 구획에서 덩이, 조각, 칼집, 틀, 유령 빵, 이어 붙인 줄, 눈금의 가로 자리와 폭을 px로 주는 곳이 없는가. (악보 SVG 안의 좌표와 "글자가 들어갈 만큼 넓은가"를 정하는 계산은 예외다)
2. 도마의 배율을 정하는 곳이 `laneScale()` 하나인가. 덩이, 유령 빵, 이어 붙인 줄, 눈금이 같은 `span`을 쓰는가.
3. `buildBoard()`를 부르는 곳이 `renderBoard()` 하나이고, 열쇠(`boardKey`)가 같으면 부르지 않는가.
4. `buildBoard()`가 다시 그린 뒤 포커스를 같은 덩이에 돌려주는가.
5. 조작부 묶음 7개(`cPick` … `cScene`)를 `hidden`으로만 바꾸는가. 묶음을 만들거나 지우는 코드가 없는가.
6. 선반 이름표를 만드는 곳이 `shelfLabel()` 하나인가(D12).
7. 앱 코드의 `setTimeout`이 화면 크기 변화의 디바운스 한 곳뿐이고 `setInterval`이 없는가.

끝나면 보고
- 일곱 항목의 답
- `#test` 한 줄(바뀌지 않았어야 한다)
````

### 완료 기준

- [ ] T1. AI의 답이 일곱 항목 모두 "지킴"이다. "어김"이 있으면 13장의 "[그대로] 코드가 바뀌었다"로 간다.
- [ ] T2. 320×568, 360×640, 390×844 각각에서 아래 화면에 스크롤이 없고, 글자가 잘리지 않고, 단계를 바꿔도 맨 아래 조작부의 높이가 변하지 않는다.
  - `#d2-02`에서 칼집 0 → 1 → 2 → 3 (틀이 1칸 → 2칸 → 2칸 → 4칸)
  - `#d5-02`에서 "4분음표 1박" 줄 → [확정] (유령 빵 "악보 = 2박", 덩이는 폭의 절반)
  - `#d0-07`에서 "8분음표 ½박" 줄 → [확정] (유령 빵 "소리 = 2박", 덩이는 폭의 1/4)
  - `#d0-05`에서 "온음표 4박" 줄 (이어 붙인 줄이 폭의 절반)
  - `#d4-05`에서 덩이마다 칼집 3 (덩이 4개, 조각 16개)
- [ ] T3. 높이 620px 미만(320×568)에서 고르기 단계의 선반 줄이 조금 낮아진다(38px). 다른 단추는 44px 이상이다.
- [ ] T4. (선택) Node.js가 있으면 부록 D의 `tools/check.mjs`를 돌린다. 기대: 화면 7종 모두 "문제 0", "콘솔 오류 0건 · 외부 요청 0건". 이 스크립트는 P08부터 쓸 수 있다.

### 게이트 GSL2

- [ ] E-01(스크롤 0, 잘림 0), E-02(글자 12px 이상, 단추 44px 이상), E-03(조작부 94px), E-05(유령 빵이 길면 덩이가 줄고 눈금이 늘어난다)를 T2~T4로 확인했다. 자동 점검을 돌리지 않았다면 눈으로 본 세 크기만 적고 나머지는 `NOT_RUN`.
- [ ] 재단 도중 포커스가 유지된다(P08의 T11).
- [ ] `docs/slice-gate-report.md`에 GSL2를 적었다.

---

# 5장. SL3 소리 (v0.3)

## P10. 소리 계산부와 언락 [그대로]

**목표.** 재생 계획(무슨 음을 몇 박째에 낼지)을 계산하는 함수, 음색, 예약과 묶음 취소, 오디오 컨텍스트, 언락 세 가지를 넣는다. 소리 검사 6개가 들어와 50개가 된다. 아직 소리는 나지 않는다.

**설계서.** 6.1~6.5절(원칙, 음색, 예약 규칙, 시계, 언락과 복구), R5, R6, R13, 11.1절(AU-01~AU-06), 11.2절(소리를 검사하는 법).

````text
[P10 · SL3-1 · 소리 계산부와 언락]  종류: 그대로

시작 전 상태
- `index.html#test`의 맨 윗줄이 아래와 같다. 사람이 다르다고 알려 주면 진행하지 않는다.
  자가검사 44/44 (전체 51개 중 44개 작성) · TH 13/13 LB 6/6 JD 8/8 GN 6/6 AU 0/6 ST 4/5 SV 4/4 CT 3/3

이번에 하는 일
- 코드 1 (7 AUDIO):
  · 재생 계획(순수): `addListen`(듣기 한 줄: 원래 소리 → 조각 리듬), `planRun(kind, o, opt)`(주문 듣기 `hear`, 납품 듣기 `listen`, 썰기 `slice`, 기계 썰기 `machine`), `planScene(rows, beat)`(발견 장면의 [들어 보기]). 계획의 시각 `t`는 본 구간의 시작을 0으로 둔 박이다
  · 소리: 정지 감시 `clockStuck`, `makeStall`. 예약한 음의 묶음 `makeGroup`(`silence()`가 전부 멈춘다). 음 `tone`, 잡음 `burst`, 칼 소리 `knifeSound`. 계획 하나를 한 번에 예약하는 `schedule(A, p, t0)`
  · 컨텍스트: `audio()`(만들거나 깨운다. 쓸 수 없으면 `null`), 출력 지연 `lat`, 지금 들리는 시각 `clock`
- 코드 2 (11 TESTS): 검사 6개(AU-01~AU-06). 가짜 오디오 객체로 주파수, 예약 시각, 취소를 본다. 실제 소리를 내지 않는다.
- 코드 3 (12 BOOT): 언락. `click`, `touchstart`, `keydown` 세 가지에 `audio()`를 건다. "소리 켜기" 단추도 같다.
- `audio()` 안의 `abortRun`은 P11에서 생긴다. 그때까지는 불리지 않으므로 오류가 아니다. 고치거나 미리 만들지 않는다.

■ 코드 1 (그대로)
넣을 자리: 7 AUDIO 구획의 끝(`// == 8 RUN ==` 바로 위)에 붙인다.

```js
// ── 재생 계획(순수): 소리와 화면이 함께 쓰는 시간표. t는 본 구간의 시작을 0으로 둔 박 ──
function addListen(p, row, at, Tb, ns) {  // 듣기 한 줄: 원래 소리 → 조각 리듬. 끝나는 박을 돌려준다
  const R = ns.length, total = R * Tb, pass = Math.max(1, Math.ceil(total - 1e-9));  // 덩이가 1박보다 짧으면 다음 박까지 쉰다
  p.parts.push({ row, at, Tb, ns, R, total, pass });
  for (let k = 0; k < pass * p.passes; k++) p.ev.push({ t: at + k, type: "tick", strong: k % pass === 0 });
  for (let q = 0; q < R; q++) p.ev.push({ t: at + q * Tb, type: "tone", midi: 67, dur: Tb * p.beat, peak: 0.3, hold: true });
  if (p.passes === 2) for (let q = 0; q < R; q++) for (let i = 0; i < ns[q]; i++) p.ev.push({ t: at + pass + q * Tb + (i * Tb) / ns[q], type: "tone", midi: 79, dur: Math.min(0.22, (Tb / ns[q]) * p.beat * 0.9), peak: 0.36, hold: false });
  return at + pass * p.passes;
}
function planRun(kind, o, opt) {  // kind: hear(주문 듣기) · listen(납품 듣기) · slice(썰기) · machine(기계 썰기). opt: { slow, first }
  const hearLike = kind === "hear" || kind === "listen", Tb = TbOf(o.loaf), beat = beatSec(bpmOf(o, opt.slow));
  const ns = hearLike ? (o.ask === "pick" ? [1] : o.ns) : sliceNs(o), R = ns.length, total = R * Tb;
  const p = { kind, Tb, ns, R, total, beat, passes: hearLike ? (o.ask === "pick" ? 1 : 2) : 0, countIn: hearLike || !opt.first ? 2 : 4, ev: [], auto: [], parts: [] };
  if (hearLike) { p.span = addListen(p, 0, 0, Tb, ns); p.ev.push({ t: p.span, type: "tick", strong: true }); }
  else {
    p.span = total;
    for (let k = 0; k <= Math.ceil(total - 1e-9); k++) p.ev.push({ t: k, type: "tick", strong: k === 0 });
    for (let q = 0; q < R; q++) p.ev.push({ t: q * Tb, type: "tone", midi: 79, dur: 0.16, peak: 0.3, hold: false });  // 덩이의 첫 음은 저절로 난다
    if (kind === "machine") for (let q = 0; q < R; q++) for (let k = 1; k < ns[q]; k++) { const c = q * Tb + (k * Tb) / ns[q]; p.auto.push(c); p.ev.push({ t: c, type: "knife" }); }
  }
  for (let k = 0; k < p.countIn; k++) p.ev.push({ t: k - p.countIn, type: "tick", strong: k === 0 });
  return p;
}
function planScene(rows, beat) {  // 발견 장면의 [들어 보기]: 줄마다 원래 소리 → 조각 리듬을 이어서
  const p = { kind: "scene", beat, passes: 2, countIn: 2, ev: [], auto: [], parts: [] };
  let at = 0;
  rows.forEach((r, i) => { at = addListen(p, i, at, TbOf(r.loaf), [r.n]); });
  p.span = at; p.ev.push({ t: at, type: "tick", strong: true });
  for (let k = 0; k < p.countIn; k++) p.ev.push({ t: k - p.countIn, type: "tick", strong: k === 0 });
  return p;
}

// ── 소리: 합성음만 쓴다. 모든 음을 오디오 클록에 한 번에 예약하고 묶음으로 취소한다(R5) ──
const clockStuck = (ctxNow, ctx0, elapsedMs) => elapsedMs > 1200 && ctxNow === ctx0;  // 시작 1.2초 뒤에도 소리 시계가 그대로면 화면 시계로 이어 간다
function makeStall(limitMs = 800) {  // 정지 감시: 지금 들리는 시각이 limitMs 넘게 그대로면 참
  let last = null, at = 0;
  return (now, ms) => { if (now !== last) { last = now; at = ms; return false; } return ms - at > limitMs; };
}
function makeGroup() {  // 예약한 음의 묶음. silence()가 전부 멈춘다. 아직 시작하지 않은 음은 소리 없이 끝난다
  const live = new Set();
  return {
    keep(node) { live.add(node); node.addEventListener("ended", () => live.delete(node)); },
    silence() { live.forEach((x) => { try { x.stop(); } catch (e) { /* 이미 끝남 */ } }); live.clear(); },
    size: () => live.size,
  };
}
function tone(A, midi, when, dur, peak, hold) {  // A: { ctx, out, noise, group }
  const o = A.ctx.createOscillator(), g = A.ctx.createGain();
  o.type = "triangle"; o.frequency.setValueAtTime(hz(midi), when);
  g.gain.setValueAtTime(0.0001, when); g.gain.linearRampToValueAtTime(peak, when + 0.008);
  if (hold) { g.gain.setValueAtTime(peak, when + Math.max(0.02, dur - 0.05)); g.gain.linearRampToValueAtTime(0.0001, when + dur); }
  else g.gain.setTargetAtTime(0.0001, when + 0.008, dur / 4);
  o.connect(g); g.connect(A.out); o.start(when); o.stop(when + dur + 0.05); A.group.keep(o);
}
function burst(A, when, dur, freq, q, peak) {  // 잡음: 메트로놈과 칼 소리(R6)
  const s = A.ctx.createBufferSource(), f = A.ctx.createBiquadFilter(), g = A.ctx.createGain();
  s.buffer = A.noise; f.type = "bandpass"; f.frequency.value = freq; f.Q.value = q;
  g.gain.setValueAtTime(peak, when); g.gain.exponentialRampToValueAtTime(0.0001, when + dur);
  s.connect(f); f.connect(g); g.connect(A.out); s.start(when); s.stop(when + dur + 0.02); A.group.keep(s);
}
const knifeSound = (A, when) => { burst(A, when, 0.04, 3200, 0.9, 0.5); tone(A, 79, when, 0.14, 0.34, false); };
function schedule(A, p, t0) {  // 계획 p를 t0(준비 박의 첫 박)부터 한 번에 예약한다
  for (const e of p.ev) {
    const when = t0 + (p.countIn + e.t) * p.beat;
    if (e.type === "tick") burst(A, when, 0.035, e.strong ? 2600 : 1700, 6, e.strong ? 0.7 : 0.4);
    else if (e.type === "knife") knifeSound(A, when);
    else tone(A, e.midi, when, e.dur, e.peak, e.hold);
  }
}

function audio() {  // 컨텍스트를 만들거나 깨운다. 쓸 수 없으면 null
  try {
    if (!ctx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      ctx = new AC();
      const out = ctx.createGain(); out.gain.value = 0.8; out.connect(ctx.destination);
      const noise = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate), d = noise.getChannelData(0);
      for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
      AUDIO = { ctx, out, noise, group: makeGroup() };
      ctx.addEventListener("statechange", () => { const on = soundOn(ctx.state); $("soundChip").toggleAttribute("hidden", on); $("hud").classList.toggle("nosound", !on); if (!on && run && !run.perf) abortRun(); });
    }
    if (ctx.state !== "running") { const p = ctx.resume(); if (p && p.catch) p.catch(() => {}); }
    return ctx;
  } catch (e) { return null; }
}
const lat = () => (ctx ? ctx.outputLatency || ctx.baseLatency || 0 : 0);
const clock = () => (run && run.perf ? performance.now() / 1000 : ctx.currentTime - lat());  // 지금 들리는 시각. 커서와 판정이 함께 쓴다(R7)
```

■ 코드 2 (그대로)
넣을 자리: 11 TESTS 구획의 끝(`// == 12 BOOT ==` 바로 위)에 붙인다.

```js
// ── SL3: 소리. 실제 소리를 내지 않고 계획과 가짜 오디오로 검사한다 ──
function fakeAudio() {  // 오실레이터의 주파수, 시작 시각, 취소 여부만 적는 가짜
  const log = [], sink = () => new Proxy(function () {}, { get: (t, k) => (k === "value" ? 0 : sink()), set: () => true, apply: () => undefined });
  const node = (rec) => new Proxy({}, {
    get(t, k) {
      if (k in t) return t[k];
      if (rec && k === "frequency") return { setValueAtTime: (v) => { rec.freq = Math.round(v * 100) / 100; } };
      if (rec && k === "start") return (w) => { rec.startAt = w; };
      if (rec && k === "stop") return (w) => { if (w === undefined) rec.cancelled = true; else rec.stopAt = w; };
      return sink();
    },
    set(t, k, v) { t[k] = v; return true; },
  });
  const ctx = { currentTime: 0, sampleRate: 48000, state: "running", createOscillator() { const rec = { freq: null, startAt: null, stopAt: null, cancelled: false }; log.push(rec); return node(rec); }, createGain: () => node(null), createBiquadFilter: () => node(null), createBufferSource: () => node(null) };
  return { log, A: { ctx, out: node(null), noise: {}, group: makeGroup() } };
}
const tones = (p, midi) => p.ev.filter((e) => e.type === "tone" && e.midi === midi).map((e) => e.t).sort((a, b) => a - b);
const closeTo = (a, b) => a.length === b.length && a.every((x, i) => Math.abs(x - b[i]) < 1e-6);
test("AU-01", "조각 음 783.99Hz, 원래 소리 392.00Hz", () => {
  const f = fakeAudio(); schedule(f.A, planRun("listen", orderById("d2-02"), { slow: false, first: false }), 10);
  ok(same(f.log.map((r) => r.freq), [392, 783.99, 783.99, 783.99]), "예약한 주파수 " + f.log.map((r) => r.freq).join(", "));
});
test("AU-02", "듣기의 예약 시각: 원래 소리 → 조각 리듬", () => {
  const a = planRun("listen", orderById("d2-02"), { slow: false, first: false }), b = planRun("listen", orderById("d3-02"), { slow: false, first: false }), c = planRun("hear", orderById("d1-06"), { slow: false, first: false }), d = planRun("listen", orderById("d0-02"), { slow: false, first: false });
  ok(closeTo(tones(a, 67), [0]) && closeTo(tones(a, 79), [1, 4 / 3, 5 / 3]) && a.beat === 1 && a.countIn === 2 && a.span === 2, "1박 3조각: 0, +1, +1.3333, +1.6667");
  ok(closeTo(tones(b, 67), [0]) && closeTo(tones(b, 79), [2, 8 / 3, 10 / 3]) && b.span === 4, "2박 3조각: 0, +2, +2.6667, +3.3333");
  ok(closeTo(tones(c, 79), [1, 5 / 4]) && near(c.beat, 6 / 5) && c.parts[0].pass === 1, "8분음표 덩이는 다음 박까지 쉬고 조각 리듬. ♩=50");
  ok(closeTo(tones(d, 67), [0]) && tones(d, 79).length === 0 && d.passes === 1 && d.ev.find((e) => e.midi === 67).dur === 2, "고르기 주문은 원래 소리만");
  const f = fakeAudio(); schedule(f.A, a, 10);
  ok(closeTo(f.log.map((r) => r.startAt).sort((x, y) => x - y), [12, 13, 13 + 1 / 3, 13 + 2 / 3]), "준비 박 2박 뒤에 시작: " + f.log.map((r) => r.startAt).join(", "));
});
test("AU-03", "새 재생을 시작하면 앞선 예약이 시작 전에 취소된다", () => {
  const f = fakeAudio(); schedule(f.A, planRun("listen", orderById("d2-02"), { slow: false, first: false }), 10);
  ok(f.A.group.size() > 4 && f.log.every((r) => r.startAt > f.A.ctx.currentTime && !r.cancelled), "예약만 한 상태");
  f.A.group.silence();
  ok(f.log.length === 4 && f.log.every((r) => r.cancelled) && f.A.group.size() === 0, "묶음 취소: 시작하지 않은 음까지 전부 멈춘다");
});
test("AU-04", "연속 듣기: 원래 소리 4번, 조각 음 12번", () => {
  const p = planRun("listen", orderById("d4-05"), { slow: false, first: false });
  ok(closeTo(tones(p, 67), [0, 1, 2, 3]), "원래 소리 " + tones(p, 67).join(", "));
  ok(closeTo(tones(p, 79), [4, 4.5, 5, 5 + 1 / 3, 5 + 2 / 3, 6, 6.25, 6.5, 6.75, 7, 7 + 1 / 3, 7 + 2 / 3]) && p.span === 8, "조각 음 12번");
  const s = planScene(SCENES.S4.rows, 1);
  ok(closeTo(tones(s, 67), [0, 2]) && closeTo(tones(s, 79), [1, 4 / 3, 5 / 3, 4, 14 / 3, 16 / 3]) && s.span === 6 && s.parts.length === 2, "발견 장면은 줄마다 이어서");
});
test("AU-05", "소리 시계가 멈추면 중단하고 \"소리 켜기\"를 보여 준다", () => {
  const stalled = makeStall();
  ok(!stalled(1, 0) && !stalled(1.1, 100) && !stalled(1.1, 500) && !stalled(1.1, 900) && stalled(1.1, 901), "0.8초 넘게 그대로면 정지");
  ok(!stalled(1.2, 1000) && !stalled(1.2, 1700), "시계가 다시 가면 풀린다");
  ok(clockStuck(5, 5, 1300) && !clockStuck(5.2, 5, 1300) && !clockStuck(5, 5, 800), "시작 1.2초 뒤에도 그대로면 화면 시계로");
  ok(soundOn("running") && !soundOn("suspended") && !soundOn(null) && !soundOn(undefined), "running이 아니면 소리 켜기를 보여 준다");
  const s = Object.assign(S0(), { phase: "slice", sub: "run", hearing: true }), p = T.abort(s, false), h = T.abort(s, true);
  ok(p.sub === "ready" && p.msg.tone === "warn" && p.msg.text === "소리가 멈춰서 중단했어요. 소리를 켜고 다시 시작해 주세요." && h.sub === undefined && h.hearing === false, "중단하면 준비 상태로 돌아가 알린다");
});
test("AU-06", "기계 썰기의 칼 소리 시각 = 칼집 시각", () => {
  const p = planRun("machine", orderById("d2-02"), { slow: false, first: true }), k = p.ev.filter((e) => e.type === "knife").map((e) => e.t);
  ok(closeTo(k, [1 / 3, 2 / 3, 4 / 3, 5 / 3, 7 / 3, 8 / 3, 10 / 3, 11 / 3]) && same(k, p.auto) && p.countIn === 4 && closeTo(tones(p, 79), [0, 1, 2, 3]), "1박 3조각 × 4덩이: 칼질 8번, 첫 음 4번, 그날 첫 썰기는 준비 박 4박");
  const q = planRun("machine", orderById("d4-05"), { slow: true, first: false });
  ok(closeTo(q.auto, [0.5, 4 / 3, 5 / 3, 2.25, 2.5, 2.75, 10 / 3, 11 / 3]) && q.countIn === 2 && near(q.beat, 6 / 5), "연속 주문: 칼질 8번. 느리게는 ♩=50");
  ok(planRun("slice", orderById("d2-02"), { slow: false, first: false }).ev.every((e) => e.type !== "knife"), "직접 썰 때는 칼 소리를 예약하지 않는다");
  ok(same(judge(p.auto, p.Tb, p.ns, p.beat * 1000).grade, "master"), "기계의 칼질은 장인 판정");
});
```

■ 코드 3 (그대로)
넣을 자리: 12 BOOT 구획에서 `function boot()` 바로 위에 넣는다.

```js
// ── 소리 언락: 세 가지 손짓에 모두 건다. 상태는 "소리 켜기"로 보여 준다 ──
["click", "touchstart", "keydown"].forEach((ev) => window.addEventListener(ev, () => { audio(); }, { passive: true, capture: true }));
$("soundChip").addEventListener("click", () => { audio(); setState({}); });
```

하지 말 것
- 음을 `setTimeout`으로 잇지 않는다. 계획 하나를 `schedule()`이 한 번에 예약한다(R5).
- 주파수를 숫자로 적지 않는다. `hz(midi)`만 쓴다(S7).
- 메트로놈이나 칼 소리에 음높이가 있는 음을 더하지 않는다. 칼 소리의 조각 음은 예외로 정해져 있다(R6).
- 오디오 파일을 쓰지 않는다(S9).

끝나면 보고 (헌법 11절)
- `#test` 한 줄. 기대:
  자가검사 50/50 (전체 51개 중 50개 작성) · TH 13/13 LB 6/6 JD 8/8 GN 6/6 AU 6/6 ST 4/5 SV 4/4 CT 3/3
````

### 완료 기준

- [ ] T1. `index.html#test`의 첫 줄이 아래와 같다.

```text
자가검사 50/50 (전체 51개 중 50개 작성) · TH 13/13 LB 6/6 JD 8/8 GN 6/6 AU 6/6 ST 4/5 SV 4/4 CT 3/3
```

- [ ] T2. `index.html#d0-01`을 열면 "소리 켜기"가 보인다. 선반의 줄을 한 번 누르면 "소리 켜기"가 사라지고 HUD에 "0단"이 보인다. 브라우저가 소리를 막아 "소리 켜기"가 남아 있으면 그 단추를 누른다.
- [ ] T3. 아직 아무 소리도 나지 않는다. 정상이다(P11).
- [ ] T4. 콘솔 오류가 없다. 사본을 남겼다(`P10 통과`).

---

## P11. 재생, 납품, 임시 마감, 장면 넘기기 [그대로]

**목표.** 소리를 실제로 낸다. 납품 듣기, 주문 듣기, 발견 장면의 [들어 보기], 커서와 강조, 정지 감시와 중단을 잇는다. [납품], [다음 주문], [마감하기], 임시 마감 화면, [알겠어요]도 이때 살아난다. 이 프롬프트가 끝나면 0단을 처음부터 끝까지 할 수 있다.

**설계서.** 4.7절(납품), 6.3절(재생 네 가지), 6.4절(시계), 6.5절(정지 감시), 7.4절(발견 장면), R5, R7, R12, R13.

````text
[P11 · SL3-2 · 재생, 납품, 임시 마감, 장면 넘기기]  종류: 그대로

시작 전 상태
- `index.html#test`의 맨 윗줄이 아래와 같다. 사람이 다르다고 알려 주면 진행하지 않는다.
  자가검사 50/50 (전체 51개 중 50개 작성) · TH 13/13 LB 6/6 JD 8/8 GN 6/6 AU 6/6 ST 4/5 SV 4/4 CT 3/3

이번에 하는 일
- 코드 1 (8 RUN): 재생.
  · `begin(kind)`: 앞선 재생을 묶음으로 멈추고, 계획을 세우고, `t0 = 지금 + 0.12초`에 한 번에 예약하고, 프레임 함수를 돌린다
  · `frame()`: 프레임마다 지금 들리는 시각으로 커서를 옮기고, 듣기에서는 덩이 전체(원래 소리)나 조각(조각 리듬)을 밝힌다. 상태는 준비 박 숫자나 단계가 바뀔 때만 `setState`로 바꾼다
  · `tap()`, `finish()`, `abortRun()`, `stopRun(keepMarks)`. 탭과 판정은 P13에서 쓴다
- 코드 2 (10 SCREENS): `act(p)`를 바꾼다. 단계가 바뀌면 재생을 멈추고, 납품 단계에 들어가면 듣기를 시작한다.
- 코드 3 (10 SCREENS): `goNext()`(다음 주문 또는 마감), `renderClose()`(임시 마감 화면: 그날의 ● 수와 주문별 기록).
- 코드 4 (6 VIEW): `PAINT.deliver`([다시 듣기]와 [다음 주문] 또는 [마감하기]의 글자), `PAINT.scene`([들어 보기]의 글자).
- 코드 5 (12 BOOT): [납품], [다시 듣기], [다음 주문], [주문 듣기], 화면이 가려졌을 때의 중단, [들어 보기], [알겠어요], [다시 영업], [처음으로]를 잇는다.

■ 코드 1 (그대로)
넣을 자리: 8 RUN 구획의 끝(`// == 9 STORAGE ==` 바로 위)에 붙인다.

```js
// ── 재생: 계획을 예약하고, 프레임마다 "지금 들리는 시각"으로 커서와 강조를 옮긴다. 타이머로 음을 잇지 않는다 ──
function begin(kind) {  // kind: hear · listen · slice · machine · scene
  const hearLike = kind === "hear" || kind === "listen" || kind === "scene";
  if (kind === "slice" && restartBlocked(performance.now(), S.endedAt)) return;
  stopRun(hearLike);  // 앞선 재생을 묶음으로 취소한다. 썰기를 새로 시작하면 칼질 표시도 지운다
  const a = audio(), p = kind === "scene" ? planScene(SCENES[S.scene].rows, beatSec(S.slow ? 50 : 60)) : planRun(kind, orderAt(S), { slow: S.slow, first: !S.sliced });
  const t0 = (a ? a.currentTime : performance.now() / 1000) + 0.12;
  const r = Object.assign(p, { perf: !a, t0, tb0: t0 + p.countIn * p.beat, taps: [], ctx0: a ? a.currentTime : 0, p0: performance.now(), on: "", ai: 0, stalled: makeStall() });
  r.end = r.tb0 + r.span * r.beat + 0.3;
  if (a) schedule(AUDIO, p, t0);
  run = r;
  setState(kind === "hear" ? { hearing: true } : hearLike ? { sub: "listen", label: "", hearing: false } : { sub: "count", label: "1", hearing: false, sliced: true });
  raf = requestAnimationFrame(frame);
}
const laneLeft = (frac) => frac * laneLw + "%";
const laneOf = (row) => (S.phase === "scene" ? $("board").querySelector(`.lane[data-row="${row}"]`) : $("lane"));
function drawCut(b, r) {
  const lane = $("lane"); if (!lane) return;
  const c = document.createElement("b");
  c.className = "cut"; c.style.left = laneLeft(b / r.total);
  lane.insertBefore(c, $("cursor"));
}
function paintOn(key) {  // key: "w줄.덩이"(덩이 전체) 또는 "s줄.덩이.조각"
  $("board").querySelectorAll(".on").forEach((e) => e.classList.remove("on"));
  if (!key) return;
  const [row, q, i] = key.slice(1).split(".").map(Number), lane = laneOf(row), loaf = lane && lane.querySelectorAll(".loaf")[q];
  if (!loaf) return;
  if (key[0] === "w") { loaf.classList.add("on"); return; }
  const s = loaf.querySelectorAll(".slice")[i];
  if (s) s.classList.add("on");
}
function frame() {
  const r = run;
  if (!r) return;
  if (!r.perf && clockStuck(ctx.currentTime, r.ctx0, performance.now() - r.p0)) {  // 소리가 거부되면 화면 시계로 이어 간다. 예약한 소리는 취소한다
    const shift = performance.now() / 1000 + 0.1 - r.t0;
    r.perf = true; r.t0 += shift; r.tb0 += shift; r.end += shift; AUDIO.group.silence();
  }
  const now = clock(), b = (now - r.tb0) / r.beat, cur = $("cursor");
  if (!r.perf && r.stalled(now, performance.now()) && ctx.currentTime !== r.ctx0) { abortRun(); return; }  // 시작한 뒤에 소리 시계가 서 있으면 중단한다(R13)
  if (r.kind === "hear") {
    if (now >= r.end) { run = null; raf = 0; setState({ hearing: false }); return; }
    raf = requestAnimationFrame(frame); return;
  }
  if (b < 0) {
    if (r.passes === 0) { const lbl = String(Math.min(r.countIn, Math.max(1, r.countIn - Math.ceil(-b) + 1))); if (S.sub !== "count" || S.label !== lbl) setState({ sub: "count", label: lbl }); }
  } else if (r.passes) {  // 듣기: 원래 소리에서는 덩이 전체, 조각 리듬에서는 조각이 차례로 밝아진다
    const part = r.parts.find((x) => b < x.at + x.pass * r.passes) || r.parts[r.parts.length - 1];
    const bl = b - part.at, first = r.passes === 1 || bl < part.pass, b2 = first ? bl : bl - part.pass, q = Math.min(part.R - 1, Math.floor(b2 / part.Tb));
    const key = b2 >= part.total ? "" : first ? "w" + part.row + "." + q : "s" + part.row + "." + q + "." + Math.floor(((b2 - q * part.Tb) / part.Tb) * part.ns[q]);
    if (key !== r.on) { r.on = key; paintOn(key); }
    if (cur) cur.style.left = laneLeft(Math.min(b2, part.total) / part.total);
    const lbl = first ? "원래 소리" : "조각 리듬";
    if (S.label !== lbl) setState({ label: lbl });
  } else {  // 썰기: 칼이 일정한 속도로 지나간다
    if (cur) cur.style.left = laneLeft(Math.min(b, r.total) / r.total);
    while (r.ai < r.auto.length && b >= r.auto[r.ai]) { drawCut(r.auto[r.ai], r); r.taps.push(r.auto[r.ai]); r.ai++; }
    if (S.sub !== "run") setState({ sub: "run", label: "" });
  }
  if (now >= r.end) { finish(); return; }
  raf = requestAnimationFrame(frame);
}
function tap() {  // 탭한 순간 칼이 있던 자리가 잘린다
  const r = run;
  if (!r || r.kind !== "slice") return;
  const piece = r.Tb / Math.max.apply(null, r.ns), b = (clock() - S.offset / 1000 - r.tb0) / r.beat;
  if (b < -piece * 0.25 || b > r.total + piece * 0.25) return;  // 시작 전과 끝난 뒤의 탭은 버린다
  r.taps.push(b);
  if (ctx && !r.perf) knifeSound(AUDIO, ctx.currentTime);
  if (b > 0 && b < r.total) drawCut(b, r);
}
function abortRun() {
  const hear = !!run && run.kind === "hear";
  stopRun(false);
  setState(T.abort(S, hear));
}
let lastJudge = null;
function finish() {
  const r = run;
  stopRun(true);
  if (r.passes) { setState({ sub: "ready", label: "" }); return; }
  const j = judge(r.taps, r.Tb, r.ns, r.beat * 1000), lane = $("lane"), before = lane.querySelector(".cut") || $("cursor");
  j.loaves.forEach((l, q) => {  // 두껍거나 얇은 조각에 색을 얹는다
    let x = q * r.Tb;
    const piece = r.Tb / l.n;
    l.widths.forEach((w) => {
      const d = w / piece - 1;
      if (Math.abs(d) > 0.15) { const e = document.createElement("i"); e.className = "dev " + (d > 0 ? "thick" : "thin"); e.style.left = laneLeft(x / r.total); e.style.width = laneLeft(w / r.total); lane.insertBefore(e, before); }
      x += w;
    });
  });
  lastJudge = j;
  setState(T.sliced(S, r.kind, j, performance.now()));
}
function stopRun(keepMarks) {
  cancelAnimationFrame(raf); raf = 0; run = null;
  if (AUDIO) AUDIO.group.silence();
  $("board").querySelectorAll(".on").forEach((e) => e.classList.remove("on"));
  const lane = $("lane");
  if (lane && !keepMarks) { lane.querySelectorAll(".cut,.dev").forEach((e) => e.remove()); const c = $("cursor"); if (c) c.style.left = "0%"; }
}
```

■ 코드 2 (그대로)
넣을 자리: 10 SCREENS 구획의 `function act(p) { … }`와 그 위의 주석 한 줄을 지우고 그 자리에 넣는다.

```js
// ── 호출부: 계산부가 돌려준 값을 적용하고 소리를 맡는다. 기록은 뒤 단계에서 붙인다 ──
function act(p) {  // p: T.*가 돌려준 값. null이면 아무 일도 없다
  if (!p) return;
  const was = S.phase;
  if (p.phase && p.phase !== was) stopRun(false);  // 단계가 바뀌면 재생을 멈춘다
  setState(p);
  if (p.phase === "deliver" && was !== "deliver") begin("listen");  // 납품: 듣기를 시작한다
}
```

■ 코드 3 (그대로)
넣을 자리: 10 SCREENS 구획의 끝(`// == 11 TESTS ==` 바로 위)에 붙인다.

```js
function goNext() { const p = T.next(S); if (!p) return; stopRun(false); setState(p); }

function renderClose() {  // 마감 화면(임시): 그날의 ● 수와 주문별 기록
  const d = dayOf(S.day), n = d.orders.length, sc = S.sum || dayScore(d, S.results), last = queueOf(n, S.results).length - 1, key = S.day + JSON.stringify(S.results);
  if (key === closeKey) return;
  closeKey = key;
  $("closeTitle").textContent = `${DAYS.indexOf(d)}단 ${d.name} 마감`;
  $("closeSum").textContent = `레시피를 한 번에 맞힌 주문 ${sc.clean}/${sc.n} · ${sc.passed ? (sc.stamp === 2 ? "장인 도장을 받았어요" : "도장을 받았어요") : `도장은 ${sc.need}개부터예요`}`;
  $("closeList").innerHTML = d.orders.map((o, i) => { const r = (i < n - 1 ? S.results[i] : S.results[last]) || { recipe: "", knife: "" }; return `<li><span>${i + 1}. ${orderText(o)}</span><b>${r.recipe === "full" ? "●" : r.recipe === "half" ? "◐" : "○"}${r.knife ? " · " + r.knife : ""}</b></li>`; }).join("");
}
```

■ 코드 4 (그대로)
넣을 자리: 6 VIEW 구획의 끝(`// == 7 AUDIO ==` 바로 위)에 붙인다.

```js
PAINT.deliver = () => {
  $("again").textContent = S.sub === "listen" && S.label ? S.label + " 듣는 중" : "다시 듣기";
  $("next").textContent = S.idx + 1 < queueOf(dayOf(S.day).orders.length, S.results).length ? "다음 주문" : "마감하기";
};

PAINT.scene = () => { $("sceneHear").textContent = S.sub === "listen" ? "듣는 중" : "들어 보기"; };
```

■ 코드 5 (그대로)
넣을 자리: 12 BOOT 구획에서 `function boot()` 바로 위에 넣는다.

```js
$("ship").addEventListener("click", () => act(T.toDeliver(S, orderAt(S))));
$("again").addEventListener("click", () => begin("listen"));
$("next").addEventListener("click", goNext);
$("orderPlay").addEventListener("click", () => begin("hear"));
document.addEventListener("visibilitychange", () => { if (document.hidden && run) abortRun(); });  // 화면이 가려지면 재생을 중단한다

$("sceneHear").addEventListener("click", () => begin("scene"));
$("sceneOk").addEventListener("click", () => act(T.sceneDone(S)));

$("restart").addEventListener("click", () => { stopRun(false); setState(startDay(S, S.day)); });
$("toTitle").addEventListener("click", () => { stopRun(false); setState({ screen: "title" }); });
```

하지 말 것
- `frame()` 안에서 도마를 다시 만들지 않는다. 커서의 `left`와 강조 class만 바꾼다(R12).
- 커서와 탭에 서로 다른 시계를 쓰지 않는다. 둘 다 `clock()`이다(R7).
- 재생을 멈출 때 음을 하나씩 찾아 멈추지 않는다. `AUDIO.group.silence()` 한 번이다(R5).
- 마감 화면을 꾸미지 않는다. 임시 화면이다. 정식은 P22다(W1).

끝나면 보고 (헌법 11절)
- `#test` 한 줄. 기대(P10과 같다):
  자가검사 50/50 (전체 51개 중 50개 작성) · TH 13/13 LB 6/6 JD 8/8 GN 6/6 AU 6/6 ST 4/5 SV 4/4 CT 3/3
````

### 완료 기준

소리를 켜고 확인한다. 폰에서는 무음 스위치와 음량을 먼저 본다.

- [ ] T1. `index.html#test`의 첫 줄이 P10과 같다(`자가검사 50/50 …`).
- [ ] T2. `index.html#d0-01`. "4분음표" 줄을 누르고 [확정]을 누르면 메트로놈이 두 번 울린 뒤 낮은 음이 1박 동안 나고, 그동안 도마의 덩이가 밝아지며 세로선(커서)이 덩이 위를 지나간다. [다음 주문]을 누르면 "2박짜리 식빵을 골라 주세요."로 넘어간다.
- [ ] T3. `index.html#d1-01`. [+], [확정], [납품]을 차례로 누르면 "8분음표 2개 · 일반 분할. 원래 소리, 조각 리듬 순서로 들어요."가 나오고, 도마에 조각 둘("½박", "½박")과 그 아래 악보(음표 2개)가 보인다. 메트로놈 두 번 뒤에 낮은 음 한 번(덩이 전체가 밝아지고 단추가 "원래 소리 듣는 중"), 이어서 높은 음 두 번(조각이 차례로 밝아지고 단추가 "조각 리듬 듣는 중")이 난다. 끝나면 단추가 "다시 듣기"로 돌아온다.
- [ ] T4. [다시 듣기]를 빠르게 여러 번 눌러도 소리가 겹치지 않는다. 앞의 재생이 멈추고 처음부터 다시 난다.
- [ ] T5. `index.html#d1-07`. [+]를 세 번, [확정], [납품]을 누르면 오른쪽 단추가 "마감하기"다. 누르면 "1단 반으로, 또 반으로 마감"과 "레시피를 한 번에 맞힌 주문 7/7 · 도장을 받았어요", 주문 7줄이 나온다. [다시 영업]을 누르면 1단의 첫 주문으로, [처음으로]를 누르면 처음 화면으로 간다.
- [ ] T6. `index.html#S1`. [들어 보기]를 누르면 단추가 "듣는 중"이 되고, 윗줄의 원래 소리와 조각 리듬, 이어서 아랫줄의 원래 소리와 조각 리듬이 난다. 소리 나는 줄이 밝아진다. [알겠어요]를 누르면 다음 주문의 재단으로 간다("빵을 탭하거나 + 를 눌러 칼집을 내요.").
- [ ] T7. `index.html#d5-05`(소리 주문). [주문 듣기]를 누르면 단추가 "듣는 중"이 되고 낮은 음 한 번 뒤에 높은 음 세 번이 난다. 화면에는 길이를 알려 주는 표시가 없다. 끝나면 "주문 듣기"로 돌아온다. `index.html#d0-07`의 [주문 듣기]는 낮은 음 한 번(2박)만 난다.
- [ ] T8. `index.html#d4-05`. 칼집을 1, 2, 3, 2로 두고 [확정], [납품]을 누르면 "납품했어요. 원래 소리와 조각 리듬을 차례로 들어요."가 나오고 낮은 음 네 번 뒤에 높은 음 열두 번이 난다. 악보는 그리지 않는다.
- [ ] T9. T3의 듣기 도중에 다른 탭으로 갔다가 돌아오면 재생이 멈춰 있고 "소리가 멈춰서 중단했어요. 소리를 켜고 다시 시작해 주세요."가 보인다.
- [ ] T10. `index.html`의 "0단 첫 출근"을 눌러 일곱 주문을 차례로 푼다(정답: 4분음표, 2분음표, 온음표, 8분음표, 2분음표, 4분음표, 2분음표). 끝나면 "0단 첫 출근 마감"과 "레시피를 한 번에 맞힌 주문 7/7 · 도장을 받았어요".
- [ ] T11. 썰기 단계의 큰 단추에는 아직 글자가 없고 눌러도 반응이 없다(P13). 2단과 3단의 주문은 이름표 단계에서 멈춘다(P18). 정상이다.
- [ ] 콘솔 오류가 없다. 사본을 남겼다(`P11 통과`).

---

## P12. 소리 점검 [점검]

**목표.** 소리가 규칙(R5, R6, R7, R13)을 지키는지 코드와 귀로 확인하고 게이트 GSL3을 닫는다. 음량은 실제 폰에서 듣는다.

**설계서.** 6장, 11.2절, 11.3절(실기기), 10장 GSL3.

````text
[P12 · SL3-3 · 소리 점검]  종류: 점검

시작 전 상태
- `index.html#test`의 맨 윗줄이 아래와 같다.
  자가검사 50/50 (전체 51개 중 50개 작성) · TH 13/13 LB 6/6 JD 8/8 GN 6/6 AU 6/6 ST 4/5 SV 4/4 CT 3/3

이번에 하는 일
- 코드를 고치지 않는다. `index.html`을 읽고 아래 여덟 가지에 "지킴", "어김", "확인 못 함" 가운데 하나로 답한다. "어김"에는 해당하는 줄과 까닭을 적고 고칠 방법을 제안만 한다.

1. 앱 코드의 `setTimeout`이 화면 크기 변화의 디바운스 한 곳뿐이고 `setInterval`이 없는가(R5, W8).
2. 음을 만드는 곳이 `tone()`과 `burst()` 둘뿐인가. 재생 하나의 모든 음을 `schedule()`이 한 번에 예약하는가. (탭할 때의 칼 소리 `knifeSound`는 그 순간에 낸다. 예외다)
3. 주파수를 정하는 곳이 `hz(midi)` 하나인가. 392, 783.99 같은 숫자가 앱 코드에 없는가(S7).
4. 음높이가 있는 음의 MIDI 번호가 79와 67 둘뿐인가(R6).
5. `begin()`이 새 재생을 예약하기 전에 `stopRun()`을 부르고, `stopRun()`이 `AUDIO.group.silence()`를 부르는가(R5).
6. 커서의 자리(`frame`)와 탭의 박 위치(`tap`)가 모두 `clock()`에서 나오는가(R7).
7. 정지 감시(`makeStall`), 컨텍스트의 `statechange`, 문서의 `visibilitychange` 세 가지가 모두 `abortRun()`으로 이어지는가(R13).
8. `new Audio(`, `<audio`, `fetch(`, 외부 주소(`http`)가 없는가(S2, S9).

끝나면 보고
- 여덟 항목의 답
- `#test` 한 줄(바뀌지 않았어야 한다)
````

### 완료 기준

- [ ] T1. AI의 답이 여덟 항목 모두 "지킴"이다.
- [ ] T2. P11의 T2~T9를 폰 실물에서 다시 한다. 못 했으면 `NOT_RUN`으로 적는다.
- [ ] T3. 폰 두 대 이상에서 듣는다. 조각 음(높은 음)이 메트로놈에 묻히지 않는가. 원래 소리가 1박인지 2박인지 귀로 가려지는가. 묻히면 13장의 "조각 음이 메트로놈에 묻힌다"로 간다.
- [ ] T4. iPhone Safari에서 처음 누른 뒤 "소리 켜기"가 사라지고 바로 소리가 나는가. 무음 스위치를 켜면 소리가 나지 않는다(감지할 수 없다. P30의 튜토리얼이 묻는다).
- [ ] T5. (선택) 숫자로 확인한다. PC의 Chrome에서 주소를 열고 화면을 한 번 누른 뒤, 개발자 도구의 콘솔에 아래 첫 조각을 붙인다. 표의 동작을 하고 소리가 끝나면 둘째 조각을 붙여 나온 글자를 표와 견준다. 다음 줄을 보기 전에 새로고침한다.

```js
(() => { const log = []; window.__audio = log; const mk = AudioContext.prototype.createOscillator;
  AudioContext.prototype.createOscillator = function () { const o = mk.call(this), e = { freq: null, startAt: null };
    const set = o.frequency.setValueAtTime.bind(o.frequency); o.frequency.setValueAtTime = (v, w) => { e.freq = Math.round(v * 100) / 100; return set(v, w); };
    const start = o.start.bind(o); o.start = (w) => { e.startAt = w; log.push(e); return start(w); }; return o; }; })();
```

```js
__audio.map((e) => e.freq + "@" + Math.round((e.startAt - __audio[0].startAt) * 1000) / 1000).join(", ")
```

| 주소 | 동작 | 나와야 하는 글자(주파수@첫 음부터의 초) |
|---|---|---|
| `#d0-01` | "4분음표" 줄, [확정] | `392@0` |
| `#d1-01` | [+], [확정], [납품] | `392@0, 783.99@1, 783.99@1.5` |
| `#d5-05` | [주문 듣기] | `392@0, 783.99@1, 783.99@1.333, 783.99@1.667` |
| `#S1` | [들어 보기] | `392@0, 783.99@1, 783.99@1.5, 392@2, 783.99@4, 783.99@5` |
| `#d4-05` | 칼집 1, 2, 3, 2, [확정], [납품] | `392@0, 392@1, 392@2, 392@3, 783.99@4, 783.99@4.5, 783.99@5, 783.99@5.333, 783.99@5.667, 783.99@6, 783.99@6.25, 783.99@6.5, 783.99@6.75, 783.99@7, 783.99@7.333, 783.99@7.667` |

원래 소리(392)와 조각 리듬의 첫 음(783.99)이 정확히 정수 박만큼 떨어져 있고, 조각 음의 간격이 분수(1/2, 1/3, 1/4박)와 같으면 맞다.

### 게이트 GSL3

- [ ] `#test` 줄의 `AU 6/6`.
- [ ] 타이머로 음을 이어 붙이는 코드가 없다(T1의 1번).
- [ ] 실기기 청취 결과 또는 `NOT_RUN`을 `docs/slice-gate-report.md`의 GSL3에 적었다.

---

# 6장. SL4 썰기 (v0.4)

P13~P17에서는 2단과 3단의 주문이 이름표 단계에서 멈춘다(이름표 단추는 P18에서 잇는다). 이 구간의 확인은 1단, 4단, 5단의 주문으로 한다. 1박 덩이를 3조각으로 써는 주문이 필요하면 `index.html#d5-01`(악보 주문)이나 `index.html#d4-02`(연속 주문)를 쓴다.

## P13. 썰기 입력 [그대로]

**목표.** 탭 패드, 키보드, 기계 썰기를 잇는다. 칼이 지나가는 동안 탭하면 그 자리가 잘리고, 끝나면 판정과 색 표시와 결과 문구가 나온다.

**설계서.** 4.6절(썰기 표), 4.9절(문구), 4.10절(도움), R4, R7, R8, 부록 C.7(손 떼기와 키 떼기).

````text
[P13 · SL4-1 · 썰기 입력]  종류: 그대로

시작 전 상태
- `index.html#test`의 맨 윗줄이 아래와 같다. 사람이 다르다고 알려 주면 진행하지 않는다.
  자가검사 50/50 (전체 51개 중 50개 작성) · TH 13/13 LB 6/6 JD 8/8 GN 6/6 AU 6/6 ST 4/5 SV 4/4 CT 3/3

이번에 하는 일
- 코드 1 (6 VIEW): `PAINT.slice`. 탭 패드의 글자("썰기 시작", 준비 박 숫자, "여기를 탭!", "다시 썰기")와 아랫줄, 썰기 도중에 [기계 썰기]와 [납품]을 끄는 일.
- 코드 2 (12 BOOT): 탭 패드와 키보드.
  · `pointerdown`: 썰기 도중이면 그 순간에 칼질한다(`tap()`). 이때 뒤따르는 `click`은 버린다(`swallow`)
  · `click`: 준비 상태나 결과 상태에서 썰기를 시작한다(`begin("slice")`)
  · [기계 썰기]: `begin("machine")`
  · 키보드: 썰기 도중 스페이스바와 Enter가 칼질이다. 키를 누르고 있어도 한 번만 친다. 썰기 도중과 끝난 뒤 0.6초 동안은 키를 뗄 때의 기본 동작을 막아 다시 시작되지 않게 한다
- 재생, 판정 연결, 색 표시, 결과 문구는 P11의 `begin`, `tap`, `finish`와 P05의 `T.sliced`가 이미 한다. 이번에는 입력과 패드 글자만 잇는다.

■ 코드 1 (그대로)
넣을 자리: 6 VIEW 구획의 끝(`// == 7 AUDIO ==` 바로 위)에 붙인다.

```js
PAINT.slice = (o) => {
  const ns = sliceNs(o), busy = S.sub === "count" || S.sub === "run", machine = run && run.kind === "machine";
  $("padMain").textContent = S.sub === "count" ? S.label : S.sub === "run" ? (machine ? "기계가 써는 중" : "여기를 탭!") : S.sub === "result" ? "다시 썰기" : "썰기 시작";
  $("padSub").textContent = S.sub === "count" ? "박을 듣고 준비해요" : S.sub === "run" ? (machine ? "소리와 칼을 따라 보세요" : "칼집마다 한 번") : `빵 ${ns.length}덩이 · 칼질 ${ns.reduce((s, n) => s + n - 1, 0)}번`;
  $("pad").classList.toggle("live", busy);
  $("machine").disabled = busy;
  $("ship").disabled = busy;
  $("ship").classList.toggle("pri", S.sub === "result");  // 썰기 결과가 나오기 전에는 보조 단추로 그린다
};
```

■ 코드 2 (그대로)
넣을 자리: 12 BOOT 구획에서 `function boot()` 바로 위에 넣는다.

```js
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
```

하지 말 것
- 칼질을 `click`에서 처리하지 않는다. 손가락이 닿는 순간(`pointerdown`)이어야 박이 맞는다.
- 탭의 박 위치를 `performance.now()`로 계산하지 않는다. `tap()`이 `clock()`으로 계산한다(R7).
- 썰기 결과로 [납품]을 막지 않는다. 썰기 도중이 아니면 언제든 납품할 수 있다(R8).

끝나면 보고 (헌법 11절)
- `#test` 한 줄. 기대(P11과 같다):
  자가검사 50/50 (전체 51개 중 50개 작성) · TH 13/13 LB 6/6 JD 8/8 GN 6/6 AU 6/6 ST 4/5 SV 4/4 CT 3/3
````

### 완료 기준

- [ ] T1. `index.html#test`의 첫 줄이 P11과 같다(`자가검사 50/50 …`).
- [ ] T2. `index.html#d1-01`. [+], [확정]을 누르면 탭 패드에 "썰기 시작"과 "빵 4덩이 · 칼질 4번". 누르면 준비 박 네 번 동안 숫자 "1"부터 "4"와 "박을 듣고 준비해요"가 나오고, 이어서 "여기를 탭!"과 "칼집마다 한 번"으로 바뀌며 세로선(칼)이 왼쪽에서 오른쪽으로 일정하게 지나간다. 덩이가 시작할 때마다 높은 음이 저절로 난다.
- [ ] T3. 한 번도 치지 않고 두면 끝난 뒤에 "조각 수가 달라요 (1 · 1 · 1 · 1조각). 칼집 자리에서만 탭해요."가 나오고 덩이마다 호박색이 얹힌다. 패드는 "다시 썰기", [납품]은 주 단추 색이 된다.
- [ ] T4. "다시 썰기"를 누르면 준비 박이 두 번으로 줄어든다. 점선(안내선)마다 한 번씩 탭하면 탭한 자리에 검은 세로선이 그려지고 칼 소리가 난다. 끝나면 "장인 칼솜씨예요."나 "고른 편이에요."나 "조각이 들쭉날쭉해요."로 시작하는 결과가 평균 오차, 가장 큰 오차와 함께 나온다.
- [ ] T5. [기계 썰기]를 누르면 패드가 "기계가 써는 중"과 "소리와 칼을 따라 보세요"가 되고 안내선 자리마다 칼질과 칼 소리가 난다. 끝나면 "기계가 정확한 박으로 썰었어요. 소리를 듣고 따라 해 보세요.".
- [ ] T6. 키보드: Tab으로 탭 패드에 포커스를 두고 스페이스바로 시작한 뒤 스페이스바나 Enter로 칼질한다. 끝난 직후 키에서 손을 떼도 다시 시작되지 않는다.
- [ ] T7. 터치: 써는 도중 손가락을 떼도 다시 시작되지 않는다. 끝난 뒤 곧바로(0.6초 안에) 패드를 눌러도 다시 시작되지 않는다.
- [ ] T8. [납품]을 누르면 납품 듣기가 시작된다(P11의 T3과 같다).
- [ ] T9. `index.html#d1-07`(마감 주문). [+] 세 번, [확정]. 썰기 단계의 도마에 점선이 없다(안내선이 꺼져 있다). 패드의 아랫줄은 "빵 1덩이 · 칼질 3번".
- [ ] T10. `index.html#d1-06`(8분음표 덩이). [+], [확정]. 덩이 4개가 놓이고 눈금이 "0", "1", "2박"이다. 썰기를 시작하면 메트로놈이 다른 주문보다 느리다(♩=50).
- [ ] T11. `index.html#d5-01`(악보 주문). "4분음표 1박" 줄, [확정], [+] 두 번("칼집 2번."), [확정]을 누르면 "8분음표 셋잇단음표 (3:2). 이제 박에 맞춰 썰어요."와 "빵 4덩이 · 칼질 8번".
- [ ] T12. 써는 도중에 다른 탭으로 갔다가 돌아오면 중단되어 있고 "소리가 멈춰서 중단했어요. 소리를 켜고 다시 시작해 주세요."가 보인다. 패드는 "썰기 시작"이다.
- [ ] 콘솔 오류가 없다. 사본을 남겼다(`P13 통과`).

---

## P14. 판정 점검 [점검]

**목표.** 썰기가 규칙(R4, R7, R8, R12)과 4.6절의 표를 지키는지 코드와 손으로 확인한다.

**설계서.** 4.6절, 11.1절(E-04, E-06), 12장 위험 1, 2.

````text
[P14 · SL4-2 · 판정 점검]  종류: 점검

시작 전 상태
- `index.html#test`의 맨 윗줄이 아래와 같다.
  자가검사 50/50 (전체 51개 중 50개 작성) · TH 13/13 LB 6/6 JD 8/8 GN 6/6 AU 6/6 ST 4/5 SV 4/4 CT 3/3

이번에 하는 일
- 코드를 고치지 않는다. `index.html`을 읽고 아래 여덟 가지에 "지킴", "어김", "확인 못 함" 가운데 하나로 답한다. "어김"에는 해당하는 줄과 까닭을 적고 고칠 방법을 제안만 한다.

1. `tap()`이 탭의 박 위치를 `clock()`에서 탭 보정값(`S.offset`)을 뺀 시각으로 계산하고, 시작 전과 끝난 뒤의 탭을 버리는가(R7).
2. `judge()`가 P03의 코드 그대로인가. 허용폭의 숫자가 (0.15, 50, 120)과 (0.3, 90, 240)이고 박 위의 탭 기준이 0.25인가.
3. `begin("slice")`가 `restartBlocked()`를 보는가. `keyup` 처리기가 썰기 도중과 보호 시간에 기본 동작을 막는가.
4. 탭 패드의 `pointerdown`이 칼질하고, 뒤따르는 `click`을 `swallow`로 버리는가.
5. 썰기 도중(`sub`가 `count`나 `run`)에 [납품]과 [기계 썰기]가 꺼지는가.
6. 칼솜씨 기록이 그 주문에서 낸 가장 좋은 등급인가(`T.sliced`의 `RANK` 비교).
7. `dayScore()`가 통과(`passed`)를 정할 때 칼솜씨를 읽지 않는가. 칼솜씨는 장인 도장 계산에만 쓰이는가(R8).
8. `finish()`가 색 표시(`.dev`)를 도마를 다시 만들지 않고 덧붙이는가. 써는 도중에 `buildBoard()`가 불리지 않는가(R12).

끝나면 보고
- 여덟 항목의 답
- `#test` 한 줄(바뀌지 않았어야 한다)
````

### 완료 기준

- [ ] T1. AI의 답이 여덟 항목 모두 "지킴"이다.
- [ ] T2. `index.html#d1-02`(2박 덩이 2개, 칼집은 덩이마다 가운데 한 번). 일부러 늦게 치면 "늦게 썰면 그 앞 조각이 두꺼워져요."가 붙고 두꺼운 조각에 호박색, 얇은 조각에 푸른색이 얹힌다. 일부러 일찍 치면 "일찍 썰면 그 앞 조각이 얇아져요.".
- [ ] T3. 같은 주문에서 덩이가 시작하는 박(메트로놈이 울리는 순간)에만 탭한다. 선은 그려지지만 조각 수로 세지 않아 "조각 수가 달라요 (1 · 1조각). 칼집 자리에서만 탭해요."가 나온다.
- [ ] T4. `index.html#d1-07`. 칼집 3, [확정] 뒤 썰지 않고 [납품], [마감하기]를 누른다. 마감 화면의 마지막 줄이 "● · –"로 끝나고 "도장을 받았어요"가 나온다. 썰지 않아도 통과한다(R8).
- [ ] T5. `#d1-07`에서 한 번은 기계 썰기, 한 번은 손으로 썬 뒤 납품하고 마감한다. 마지막 줄의 칼솜씨가 둘 가운데 좋은 쪽이다. 손으로 썬 것이 조각 수가 맞았다면 그 등급이 "기계"보다 위다.
- [ ] T6. 320×568에서 써는 동안 화면이 흔들리거나 스크롤이 생기지 않는다.
- [ ] T7. (선택) `tools/check.mjs`의 결과가 P09와 같다.

---

## P15. 설정 시트 [그대로]

**목표.** HUD의 [설정]으로 여는 시트를 잇는다. 칼집 안내선, 느리게, 탭 보정을 바꾸면 바로 적용되고 저장된다.

**설계서.** 4.10절(도움), 6.6절 5번(탭 보정을 손으로 바꾸기), 8.2절(설정), 9.4절(저장).

````text
[P15 · SL4-3 · 설정 시트]  종류: 그대로

시작 전 상태
- `index.html#test`의 맨 윗줄이 아래와 같다. 사람이 다르다고 알려 주면 진행하지 않는다.
  자가검사 50/50 (전체 51개 중 50개 작성) · TH 13/13 LB 6/6 JD 8/8 GN 6/6 AU 6/6 ST 4/5 SV 4/4 CT 3/3

이번에 하는 일
- 코드 1 (10 SCREENS): `setSetting(key, value, patch)`. 설정 하나를 상태와 저장에 함께 적는다.
- 코드 2 (12 BOOT): [설정]과 [닫기], 안내선, 느리게, 탭 보정 [−] [+]를 잇는다. 탭 보정은 10ms씩, −100ms부터 +200ms까지다.
- 시트의 모양과 글자는 P01의 HTML에 이미 있다. 시트 맨 아래 줄에는 P02의 `boot()`가 적어 둔 자가검사 한 줄이 보인다.

■ 코드 1 (그대로)
넣을 자리: 10 SCREENS 구획의 끝(`// == 11 TESTS ==` 바로 위)에 붙인다.

```js
function setSetting(key, value, patch) {  // 설정은 상태와 저장에 함께 적는다
  setState(patch);
  save.settings[key] = value;
  store.save(save);
}
```

■ 코드 2 (그대로)
넣을 자리: 12 BOOT 구획에서 `function boot()` 바로 위에 넣는다.

```js
// ── 설정 시트: 안내선, 느리게, 탭 보정 ──
$("openSet").addEventListener("click", () => setState({ sheet: !S.sheet }));
$("closeSet").addEventListener("click", () => setState({ sheet: false }));
$("setGuide").addEventListener("change", (e) => setSetting("guide", e.target.checked, { guide: e.target.checked, guideNow: e.target.checked }));
$("setSlow").addEventListener("change", (e) => setSetting("slow", e.target.checked, { slow: e.target.checked }));
$("offMinus").addEventListener("click", () => { const v = Math.max(-100, S.offset - 10); setSetting("tapOffsetMs", v, { offset: v }); });
$("offPlus").addEventListener("click", () => { const v = Math.min(200, S.offset + 10); setSetting("tapOffsetMs", v, { offset: v }); });
```

하지 말 것
- 설정을 `S`에 직접 적지 않는다. `setSetting`이 `setState`와 저장을 함께 한다(W7).
- 시트에 항목을 더하지 않는다. 박자 맞추기는 P16, 나머지 설정은 P26이다(W1).

끝나면 보고 (헌법 11절)
- `#test` 한 줄. 기대(P13과 같다):
  자가검사 50/50 (전체 51개 중 50개 작성) · TH 13/13 LB 6/6 JD 8/8 GN 6/6 AU 6/6 ST 4/5 SV 4/4 CT 3/3
````

### 완료 기준

- [ ] T1. `index.html#test`의 첫 줄이 P13과 같다(`자가검사 50/50 …`).
- [ ] T2. `index.html#d1-01`에서 [+], [확정]으로 썰기 단계에 간 뒤 [설정]을 누르면 시트가 열린다. "칼집 안내선 보이기"(켜짐), "느리게"(꺼짐), "탭 보정"과 "0ms", [닫기], 맨 아래에 "외부 요청 0건 · 자가검사 50/50 …" 줄.
- [ ] T3. "칼집 안내선 보이기"를 끄면 도마의 점선이 사라지고, 켜면 돌아온다.
- [ ] T4. "느리게"를 켜고 썰기를 시작하면 메트로놈이 느려진다.
- [ ] T5. 탭 보정의 [+]를 두 번 누르면 "20ms"가 된다. [−]를 계속 눌러도 −100ms 아래로, [+]를 계속 눌러도 200ms 위로 가지 않는다.
- [ ] T6. 안내선을 끄고 느리게를 켠 채 새로고침하면 설정이 그대로다.
- [ ] T7. [닫기]나 [설정]을 다시 누르면 시트가 닫힌다. 콘솔 오류가 없다.
- [ ] 사본을 남겼다(`P15 통과`).

---

## P16. 박자 맞추기 [설계]

**목표.** 기기와 손의 지연을 재서 탭 보정값을 정하는 화면을 만든다. 썰기가 세 번 이어서 같은 쪽으로 치우치면 박자 맞추기를 한 번 권한다.

**설계서.** 6.6절(박자 보정), 12장 위험 1. AI에게 6.6절을 함께 준다.

**주의.** 이 프롬프트부터는 코드를 주지 않는다. 결과물을 만들어 확인하지 못했다. 아래 "요구"와 완료 기준이 기준이다.

````text
[P16 · SL4-4 · 박자 맞추기]  종류: 설계

시작 전 상태
- `index.html#test`의 맨 윗줄이 아래와 같다. 사람이 다르다고 알려 주면 진행하지 않는다.
  자가검사 50/50 (전체 51개 중 50개 작성) · TH 13/13 LB 6/6 JD 8/8 GN 6/6 AU 6/6 ST 4/5 SV 4/4 CT 3/3

진행 방식
- 먼저 계획만 보고한다. 계획에는 (1) 고칠 함수와 고치는 줄, (2) 새 함수의 이름과 들어갈 구획, (3) 새 id와 새 상태 필드, (4) 헌법의 어느 규칙에 닿는지를 적는다. 사람이 "진행"이라고 하면 구현한다.
- 지금까지 넣은 [그대로] 코드는 아래에 "고친다"고 적힌 곳만 고친다. 고친 줄은 보고에 적는다.

요구
1. 화면. `#app` 안에 `<section class="screen" id="calibScr" data-screen="calib" aria-label="박자 맞추기" hidden>`를 더한다. 안에 제목 "박자 맞추기", 안내 한 줄 "메트로놈에 맞춰 여덟 번 탭해요.", 큰 탭 단추 `#calibPad`(높이 94px), 결과 줄 `#calibOut`(`role="status"`), 단추 `#calibRetry`(다시 하기), `#calibSave`(저장하고 닫기), `#calibClose`(닫기).
2. 들어가기. 설정 시트에 단추 `#openCalib`(박자 맞추기)를 더한다. 누르면 시트를 닫고 `screen`을 `"calib"`으로 바꾼다. 들어오기 전의 화면을 상태에 적어 두었다가 닫을 때 그 화면으로 돌아간다. 영업 중이었다면 `phase`와 `sub`는 건드리지 않아 하던 주문이 그대로 남는다.
3. 재생. `#calibPad`를 누르면 시작한다. ♩=60으로 메트로놈이 8번 울린다(첫 박은 센박). 계획은 7 AUDIO 구획에 순수 함수 `planCalib()`로 만들고 `schedule()`로 한 번에 예약한다(R5). `begin()`에 종류 `"calib"`을 더하고, `frame()`에서는 종류가 `"calib"`이면 커서와 도마를 건드리지 않고 끝 시각만 본다.
4. 탭. 재생 도중 `#calibPad`의 `pointerdown`, 스페이스바, Enter가 탭이다. 탭 시각은 `clock()`(지금 들리는 시각, 초)으로 적는다(R7). 뒤따르는 `click`은 P13의 `swallow`와 같은 방법으로 버린다.
5. 계산. 끝나면 박의 시각 8개(`tb0 + k × 한 박의 초`)와 탭 시각을 `calibOffset(taps, clicks)`에 넘긴다. 이 함수는 P03에 있고 고치지 않는다. 0.25초 넘게 벗어난 탭은 함수가 버린다.
   · `null`이면(남은 탭이 4개 미만) `#calibOut`에 "탭이 모자라요. 메트로놈을 듣고 다시 해 볼까요?"를 적고 [저장하고 닫기]를 끈다.
   · 숫자면 −100~+200으로 자른 뒤 "탭이 박보다 N ms 늦어요. 저장하면 판정에서 그만큼 빼 줘요."(음수면 "빨라요")를 적는다.
6. 저장. [저장하고 닫기]는 `setSetting("tapOffsetMs", 값, { offset: 값 })`을 부르고 `save.settings.calibrated`를 참으로 적어 저장한 뒤 돌아간다. [닫기]는 저장하지 않고 돌아간다.
7. 중단. 재생 도중 소리가 멈추거나 화면이 가려지면 재생을 멈추고 "다시 하기" 상태로 둔다(R13). 이때 영업 화면의 `sub`와 판독 줄을 건드리지 않는다. 소리를 쓸 수 없으면(`audio()`가 `null`) 시작하지 않고 "소리를 켜야 박자를 맞출 수 있어요."를 적는다.
8. 권하기. 5 STATE 구획에 순수 함수 `leanNext(lean, worstMs)`를 더한다. 가장 큰 오차가 +60ms보다 크면 늦은 쪽으로 1을 쌓고, −60ms보다 작으면 빠른 쪽으로 1을 쌓고, 방향이 바뀌거나 60ms 안이면 0으로 돌린다. 손으로 썬 결과(조각 수가 맞은 것만)에 적용해서, 같은 쪽으로 3번 쌓이면 결과 문구 끝에 " 박자 맞추기를 해 볼까요? 설정에 있어요."를 한 번만 붙인다. 한 번 붙인 뒤에는 그 영업일 동안 다시 붙이지 않는다.

지킬 것
- 새 상태 필드는 `S`의 선언에 더하고 `setState`로만 바꾼다(W7).
- `setTimeout`, `setInterval`을 쓰지 않는다(W8).
- 검사와 `LOCK`을 고치지 않는다. 검사 수는 그대로다. 새 검사를 더하지 않는다(W3).
- 화면 글자에 음표 이름이나 비율을 직접 적지 않는다(W9).
- 320×568에서 이 화면에 스크롤이 없어야 한다(R9).

끝나면 보고 (헌법 11절)
- `#test` 한 줄. 기대(P15와 같다):
  자가검사 50/50 (전체 51개 중 50개 작성) · TH 13/13 LB 6/6 JD 8/8 GN 6/6 AU 6/6 ST 4/5 SV 4/4 CT 3/3
- 고친 [그대로] 함수의 목록과 고친 줄
````

### 완료 기준

- [ ] T1. `index.html#test`의 첫 줄이 P15와 같다(`자가검사 50/50 …`). ST-02와 TH-13이 통과다.
- [ ] T2. 설정 시트에 [박자 맞추기]가 있다. 누르면 박자 맞추기 화면이 뜬다.
- [ ] T3. 큰 단추를 누르면 메트로놈이 1초 간격으로 8번 울린다. 따라서 8번 치면 결과 줄에 "N ms 늦어요"나 "빨라요"가 나온다.
- [ ] T4. [저장하고 닫기]를 누른 뒤 설정 시트를 열면 탭 보정이 그 값이다. −100ms보다 작거나 200ms보다 큰 값은 나오지 않는다.
- [ ] T5. 3번만 치면 "탭이 모자라요. …"가 나오고 [저장하고 닫기]가 꺼진다.
- [ ] T6. 영업 도중(예: `#d1-01`의 썰기 단계)에 들어갔다가 닫으면 하던 주문의 같은 단계로 돌아온다.
- [ ] T7. 재생 도중 다른 탭으로 갔다 오면 멈춰 있고 다시 할 수 있다.
- [ ] T8. 320×568, 360×640, 390×844에서 스크롤이 없다. 콘솔 오류가 없다.
- [ ] T9. AI가 보고한 "고친 [그대로] 함수"가 `begin`, `frame`, `finish` 또는 `abortRun`, 키보드 처리기 범위 안이다. `judge`, `calibOffset`, 검사가 바뀌지 않았다.
- [ ] 사본을 남겼다(`P16 통과`).

### 게이트 GSL4

- [ ] 썰기 항목(P13의 T2~T12, P14의 T2~T6)을 통과했다.
- [ ] 실기기 한 대 이상에서 박자 맞추기를 한 뒤 `index.html#d5-01`의 썰기(1박 덩이 3조각)를 열 번 하고, 탭 보정값과 열 번의 등급을 `docs/slice-gate-report.md`의 GSL4에 적었다. 못 했으면 `device_check: NOT_RUN`.

---

# 7장. SL5 악보와 이름표 (v0.5)

악보를 그리는 함수(`notesSvg`)는 P06에, 납품의 악보는 P07과 P11에 이미 들어왔다. 이 단계에서는 그 악보를 눈으로 확인하고(P17), 이름표 단계의 단추를 잇는다(P18).

## P17. 악보 점검 [점검]

**목표.** 화면에 나오는 악보가 5.4절의 표기 규칙을 지키는지 확인한다.

**설계서.** 5.4절(표기 규칙), 4.7절(납품의 악보), 부록 C.4(음표 그리기).

````text
[P17 · SL5-1 · 악보 점검]  종류: 점검

시작 전 상태
- `index.html#test`의 맨 윗줄이 아래와 같다.
  자가검사 50/50 (전체 51개 중 50개 작성) · TH 13/13 LB 6/6 JD 8/8 GN 6/6 AU 6/6 ST 4/5 SV 4/4 CT 3/3

이번에 하는 일
- 코드를 고치지 않는다. `index.html`을 읽고 아래 여섯 가지에 "지킴", "어김", "확인 못 함" 가운데 하나로 답한다. "어김"에는 해당하는 줄과 까닭을 적고 고칠 방법을 제안만 한다.

1. `notesSvg()`가 이름표 `{ den, count, tup }`만 보고 그리는가. 2분음표와 온음표는 빈 머리, 온음표는 기둥 없음, 묶는 줄은 8분음표 1줄, 16분음표 2줄, 32분음표 3줄인가.
2. 음표를 글꼴의 문자나 이모지로 그리지 않고 SVG 도형으로 그리는가(R11).
3. 이름표에 잇단 숫자(`tup`)가 있으면 괄호와 숫자를 늘 그리는가.
4. 납품의 악보에서 음표 머리의 가로 자리가 조각이 시작하는 자리(`i/n × 폭`)에서 나오는가.
5. 주문 카드의 악보와 이름표 보기의 악보가 같은 함수(`notesSvg`, `evenXs`)로 그려지는가.
6. 악보의 `aria-label`이 `labelKo()`에서 나오는가(W9).

끝나면 보고
- 여섯 항목의 답
- `#test` 한 줄(바뀌지 않았어야 한다)
````

### 완료 기준

각 주소에서 [납품]까지 가서 도마 아래의 악보를 본다. 1단의 주문은 [+]로 칼집을 맞추고 [확정], [납품]이다.

- [ ] T1. AI의 답이 여섯 항목 모두 "지킴"이다.
- [ ] T2. `#d1-01`(칼집 1): 찬 머리 2개, 기둥, 묶는 줄 1줄. 음표가 각 조각의 왼쪽 끝에 맞춰 놓인다.
- [ ] T3. `#d1-04`(칼집 3): 찬 머리 4개, 묶는 줄 2줄.
- [ ] T4. `#d1-02`(칼집 1): 찬 머리 2개, 기둥, 묶는 줄 없음.
- [ ] T5. `#d1-03`(칼집 1): 빈 머리 2개, 기둥.
- [ ] T6. `#d5-01`: 주문 카드의 악보가 찬 머리 3개, 묶는 줄 1줄, 그 위에 괄호와 숫자 3이다. "4분음표 1박" 줄, [확정], [+] 두 번, [확정], [납품]까지 가면 도마 아래에도 같은 악보가 조각의 시작 자리에 맞춰 그려진다.
- [ ] T7. `#d5-04`: 주문 카드의 악보가 빈 머리 3개와 괄호, 숫자 3이다. `#d5-03`: 찬 머리 4개, 묶는 줄 1줄, 괄호 없음.
- [ ] T8. 320×568에서 `#d5-01`의 주문 카드 악보가 문장과 겹치지 않는다.

---

## P18. 이름표 [그대로]

**목표.** 이름표 단계의 단추를 잇는다. 2단의 숫자 질문과 3단의 이름표 고르기가 움직인다. 이 프롬프트가 끝나면 주문 43개를 모두 풀 수 있다.

**설계서.** 4.5절(이름표), 4.9절(문구), R14, 부록 B.3(이름표 보기), 8.5절(보기 단추 88px).

````text
[P18 · SL5-2 · 이름표]  종류: 그대로

시작 전 상태
- `index.html#test`의 맨 윗줄이 아래와 같다. 사람이 다르다고 알려 주면 진행하지 않는다.
  자가검사 50/50 (전체 51개 중 50개 작성) · TH 13/13 LB 6/6 JD 8/8 GN 6/6 AU 6/6 ST 4/5 SV 4/4 CT 3/3

이번에 하는 일
- 코드 1 (6 VIEW): `PAINT.label`. 틀린 단추를 끈다. 이름표 보기 3개에 악보 그림과 이름을 그린다. 보기는 주문이 바뀔 때만 다시 그린다.
- 코드 2 (12 BOOT): [숫자가 필요해요], [필요 없어요], 보기 3개를 계산부 `T.yesNo`, `T.choose`에 잇는다.
- 정답 판단, 오답 문구, 유령 빵, 보기의 순서는 P03~P05의 엔진과 계산부가 이미 한다. 이번에는 입력과 단추 그리기만 잇는다.

■ 코드 1 (그대로)
넣을 자리: 6 VIEW 구획의 끝(`// == 7 AUDIO ==` 바로 위)에 붙인다.

```js
PAINT.label = (o) => {
  $("yes").disabled = S.wrong.includes("y");
  $("no").disabled = S.wrong.includes("n");
  if (o.label === "choose" && labelKey !== o.id) {  // 이름표 보기는 주문이 바뀔 때만 다시 그린다
    labelKey = o.id;
    choicesOf(o).forEach((l, i) => { $("lab" + i).innerHTML = `<svg viewBox="0 0 96 48" role="img" aria-label="${labelKo(l)}">${notesSvg(l, evenXs(l.count, 96), 96, 48, false, "var(--panel)")}</svg><span>${labelKo(l)}</span>`; });
  }
  [0, 1, 2].forEach((i) => { $("lab" + i).disabled = S.wrong.includes(i); });
};
```

■ 코드 2 (그대로)
넣을 자리: 12 BOOT 구획에서 `function boot()` 바로 위에 넣는다.

```js
$("yes").addEventListener("click", () => act(T.yesNo(S, orderAt(S), true)));
$("no").addEventListener("click", () => act(T.yesNo(S, orderAt(S), false)));
[0, 1, 2].forEach((i) => $("lab" + i).addEventListener("click", () => act(T.choose(S, orderAt(S), i))));
```

하지 말 것
- 보기의 이름을 글자로 적지 않는다. `labelKo(l)`이 만든다(W9).
- 보기의 순서를 바꾸거나 매번 새로 섞지 않는다. 같은 주문은 늘 같은 순서다(`choicesOf`).
- 오답을 골랐을 때 단계를 옮기지 않는다. 틀린 단추만 꺼지고 유령 빵이 보인다(R14).

끝나면 보고 (헌법 11절)
- `#test` 한 줄. 기대(P15와 같다):
  자가검사 50/50 (전체 51개 중 50개 작성) · TH 13/13 LB 6/6 JD 8/8 GN 6/6 AU 6/6 ST 4/5 SV 4/4 CT 3/3
````

### 완료 기준

- [ ] T1. `index.html#test`의 첫 줄이 P15와 같다(`자가검사 50/50 …`).
- [ ] T2. `index.html#d2-02`. [+] 두 번, [확정]을 누르면 "이 조각에 숫자(잇단 표시)가 필요할까요? 틀과 견주어 보세요."와 단추 [숫자가 필요해요] [필요 없어요]. 도마에는 틀 두 칸("8분음표 ½박")과 조각 셋("1/3박"). [필요 없어요]를 누르면 "한 조각 1/3박은 보통 칸(½박)과 길이가 달라요. 숫자가 필요해요."가 나오고 그 단추가 꺼진다. [숫자가 필요해요]를 누르면 "8분음표 셋잇단음표 (3:2). 이제 박에 맞춰 썰어요."와 "빵 4덩이 · 칼질 8번".
- [ ] T3. `index.html#d2-01`. [+], [확정], [숫자가 필요해요]를 누르면 "한 조각이 보통 칸과 길이가 같아요. 숫자가 필요 없어요.". [필요 없어요]를 누르면 "8분음표 2개 · 일반 분할. 이제 박에 맞춰 썰어요.".
- [ ] T4. `index.html#d3-02`. [+] 두 번, [확정]을 누르면 "조각들의 이름표를 골라요. 보통 칸의 이름을 보세요."와 보기 셋이 왼쪽부터 "8분음표 셋잇단", "4분음표 3개", "4분음표 셋잇단"이다. 보기마다 악보 그림이 있다.
- [ ] T5. T4에서 "4분음표 3개"를 누르면 "이 음표들은 모두 3박이라 2박 식빵보다 길어요. 숫자가 있어야 들어가요."가 나오고, 점선 막대 "고른 음표 = 3박"이 생기며, 덩이가 폭의 2/3로 줄고 눈금이 3박까지 늘어난다. 그 보기는 꺼진다.
- [ ] T6. 이어서 "8분음표 셋잇단"을 누르면 "이 음표들은 모두 1박이라 2박 식빵에 모자라요. 보통 칸의 이름을 보세요."와 점선 막대 "고른 음표 = 1박"(폭의 절반). 덩이는 다시 폭을 가득 채운다. "4분음표 셋잇단"을 누르면 "4분음표 셋잇단음표 (3:2). 이제 박에 맞춰 썰어요.".
- [ ] T7. `index.html#d3-05`(일반 분할). [+] 세 번, [확정]. 보기는 "4분음표 4개", "8분음표 4개", "16분음표 4개". "4분음표 4개"를 누르면 "이 음표들은 모두 4박이라 2박 식빵보다 길어요. 보통 칸의 이름을 보세요."(덩이가 폭의 절반으로 줄고 틀의 칸 이름이 "8분"으로 줄어든다). "16분음표 4개"를 누르면 "이 음표들은 모두 1박이라 2박 식빵에 모자라요. 보통 칸의 이름을 보세요.". "8분음표 4개"를 누르면 "8분음표 4개 · 일반 분할. 이제 박에 맞춰 썰어요.".
- [ ] T8. `index.html#d3-04`(8분음표 덩이). [+] 두 번, [확정]. 보기는 "16분음표 셋잇단", "8분음표 셋잇단", "16분음표 3개". "8분음표 셋잇단"을 누르면 "이 음표들은 모두 1박이라 ½박 식빵보다 길어요. 보통 칸의 이름을 보세요.", "16분음표 3개"를 누르면 "이 음표들은 모두 3/4박이라 ½박 식빵보다 길어요. 숫자가 있어야 들어가요.".
- [ ] T9. 320×568에서 T4의 보기 셋이 한 줄에 들어가고 이름이 잘리지 않는다. T5와 T8의 화면에 스크롤이 없다.
- [ ] 콘솔 오류가 없다. 사본을 남겼다(`P18 통과`).

### 게이트 GSL5

- [ ] 320px 폭에서 이름표 보기 3개가 한 줄이다(T9).
- [ ] `#test` 줄의 `CT 3/3`.
- [ ] `docs/slice-gate-report.md`에 GSL5를 적었다.

---

# 8장. SL6 주문 흐름과 0~2단 (v0.6)

주문 흐름의 계산부는 P05에, 주문 43개는 P04에 이미 들어왔다. 이 단계에서는 0~2단을 처음부터 끝까지 해 보고(P19, P20), 기록과 이어하기를 넣고(P21), 영업일 지도와 정식 마감 화면을 만든 뒤 처음으로 배포한다(P22).

## P19. 0~2단 완주 점검 [점검]

**목표.** 0단, 1단, 2단을 처음 화면에서 시작해 마감 화면까지 한다. 오답 처리, ◐ 주문 다시 내기, 통과 계산을 확인한다.

**설계서.** 4.8절(흐름), 7.2절(영업일 규칙), 7.3절(주문 목록), 7.5절(통과), R8, R14. 주문의 정답은 부록 E의 표에 있다.

````text
[P19 · SL6-1 · 0~2단 완주 점검]  종류: 점검

시작 전 상태
- `index.html#test`의 맨 윗줄이 아래와 같다.
  자가검사 50/50 (전체 51개 중 50개 작성) · TH 13/13 LB 6/6 JD 8/8 GN 6/6 AU 6/6 ST 4/5 SV 4/4 CT 3/3

이번에 하는 일
- 코드를 고치지 않는다. `index.html`을 읽고 아래 여섯 가지에 "지킴", "어김", "확인 못 함" 가운데 하나로 답한다. "어김"에는 해당하는 줄과 까닭을 적고 고칠 방법을 제안만 한다.

1. `T`의 함수들이 `document`, `window`, `AUDIO`, `store`, `setState`를 쓰지 않는가. 받은 `S`를 고치지 않고 바꿀 값만 돌려주는가.
2. 12 BOOT 구획의 입력 처리기가 `act(T.무엇(…))`, `begin(…)`, `goNext()`, `setState(…)`, `setSetting(…)` 가운데 하나만 부르는가. 처리기 안에 정답 판단이 없는가.
3. `setState()`에 `legal()` 검사가 남아 있는가.
4. `queueOf()`가 ◐였던 주문을 마감 주문 앞에 한 번씩만 다시 넣는가. `dayScore()`가 다시 나온 주문의 결과를 세지 않는가.
5. `openAt()`이 다시 나온 주문 앞에서는 발견 장면을 다시 보여 주지 않는가.
6. `orderText()`, `shelfLabel()`, `T.*`의 문구에서 박 수, 조각 수, 음표 이름이 모두 엔진 함수에서 나오는가(R3, W9).

끝나면 보고
- 여섯 항목의 답
- `#test` 한 줄(바뀌지 않았어야 한다)
````

### 완료 기준

`index.html`의 처음 화면에서 영업일 단추를 눌러 시작한다. 썰기는 해도 되고 건너뛰어도 된다([납품]).

- [ ] T1. AI의 답이 여섯 항목 모두 "지킴"이다.
- [ ] T2. **0단을 모두 맞힌다.** 정답은 4분음표, 2분음표, 온음표, 8분음표, 2분음표, 4분음표, 2분음표 순서다. 마감 화면에 "0단 첫 출근 마감"과 "레시피를 한 번에 맞힌 주문 7/7 · 도장을 받았어요".
- [ ] T3. **0단에서 첫째와 둘째 주문을 일부러 두 번씩 틀린다.** 두 번째 오답에 정답 덩이가 저절로 올라오고 [확정]으로 넘어간다. 그 주문의 진행 점이 반만 찬다. 여섯째 주문을 납품한 뒤, 마감 주문 앞에 "1박짜리 식빵을 골라 주세요."와 "2박짜리 식빵을 골라 주세요."가 한 번씩 더 나온다. 다시 나온 주문을 맞혀도 마감 화면은 "레시피를 한 번에 맞힌 주문 5/7 · 도장은 6개부터예요"이고 목록의 1번과 2번이 ◐다.
- [ ] T4. **1단.** 넷째 주문을 납품하면 발견 장면("조각 수는 같은데 길이가 달라요.")이 나오고 [알겠어요]를 누르면 다섯째 주문으로 간다. 일곱 주문을 모두 썰지 않고 납품해도 "도장을 받았어요"가 나온다(R8).
- [ ] T5. **2단.** 시작하자마자 발견 장면("3조각은 8분음표보다 짧고 16분음표보다 길어요.")이 나온다. 셋째 주문을 납품하면 두 번째 발견 장면("같은 1박을 2, 3, 4로 나눴어요.")이 나온다. 3조각 주문에서는 [숫자가 필요해요], 2조각과 4조각 주문에서는 [필요 없어요]가 정답이다.
- [ ] T6. 여섯째 주문(`d2-06`)과 마감 주문(`d2-07`)의 썰기 단계에는 안내선이 없다. 마감 주문의 재단에서는 판독 줄이 "칼집 2번."처럼 조각 수를 말하지 않는다.
- [ ] T7. 세 영업일을 하는 동안 콘솔에 오류가 없고 "ST-01"로 시작하는 줄이 없다.
- [ ] T8. 영업일 하나에 걸린 시간을 적어 둔다(설계서의 어림은 2~5분). 5분을 넘으면 `docs/decisions.md`에 적는다.

---

## P20. 발견 장면 점검 [점검]

**목표.** 발견 장면 S1~S3이 한 배율로 그려지고, 채점하지 않고, 문장이 엔진 값과 같은지 확인한다. S4는 P23에서 본다.

**설계서.** 7.4절(발견 장면), R1.

````text
[P20 · SL6-2 · 발견 장면 점검]  종류: 점검

시작 전 상태
- `index.html#test`의 맨 윗줄이 아래와 같다.
  자가검사 50/50 (전체 51개 중 50개 작성) · TH 13/13 LB 6/6 JD 8/8 GN 6/6 AU 6/6 ST 4/5 SV 4/4 CT 3/3

이번에 하는 일
- 코드를 고치지 않는다. `index.html`을 읽고 아래 다섯 가지에 "지킴", "어김", "확인 못 함" 가운데 하나로 답한다.

1. `buildScene()`이 모든 줄에 같은 `span`(가장 긴 덩이의 박 수)을 쓰는가(R1).
2. `sceneText()`와 `sceneCaption()`의 수치와 음표 이름이 엔진 함수에서 나오는가(W9).
3. 발견 장면에서 결과를 적지 않는가. `T.sceneDone`이 주문을 열기만 하고 `results`를 바꾸지 않는가.
4. [들어 보기]의 계획(`planScene`)이 줄마다 원래 소리 → 조각 리듬을 이어서 예약하는가.
5. `SCENES`에 적힌 것이 줄의 씨앗(덩이, 조각 수, 틀 여부)뿐인가(R3).

끝나면 보고
- 다섯 항목의 답
- `#test` 한 줄(바뀌지 않았어야 한다)
````

### 완료 기준

- [ ] T1. AI의 답이 다섯 항목 모두 "지킴"이다.
- [ ] T2. `index.html#S1`, `#S2`, `#S3`의 줄 이름과 두 문장이 P00 8절의 발견 장면 표와 같다.
- [ ] T3. `#S1`에서 윗줄(1박 덩이)이 아랫줄(2박 덩이)의 절반 폭이다. `#S2`와 `#S3`의 세 줄은 폭이 같다.
- [ ] T4. [들어 보기]를 누르면 위 줄부터 차례로, 줄마다 덩이 전체가 밝아지며 낮은 음이 나고 이어서 조각이 하나씩 밝아지며 높은 음이 난다. `#S2`의 첫째 줄과 셋째 줄(틀)도 같은 방식으로 들린다.
- [ ] T5. [알겠어요]를 누르면 다음 주문으로 간다. 진행 점은 바뀌지 않는다.
- [ ] T6. 320×568에서 `#S2`(세 줄)에 스크롤이 없고 줄 이름이 잘리지 않는다.

---

## P21. 기록과 이어하기 [그대로]

**목표.** 납품할 때마다 저장한다. 레시피 카드, 영업일의 통과와 도장, 통계, 하던 영업을 적고, 다시 열면 [이어서 영업]으로 같은 주문에서 이어진다. 마지막 검사 ST-05가 들어와 51개가 된다.

**설계서.** 7.5절(기록, 통과, 보상), 9.4절(저장), 11.1절(ST-05).

````text
[P21 · SL6-3 · 기록과 이어하기]  종류: 그대로

시작 전 상태
- `index.html#test`의 맨 윗줄이 아래와 같다. 사람이 다르다고 알려 주면 진행하지 않는다.
  자가검사 50/50 (전체 51개 중 50개 작성) · TH 13/13 LB 6/6 JD 8/8 GN 6/6 AU 6/6 ST 4/5 SV 4/4 CT 3/3

이번에 하는 일
- 코드 1 (9 STORAGE): 기록 계산(순수). 저장 객체를 받아 새 객체를 돌려준다.
  · `applyDelivery(save, o, res)`: 납품 한 번. 통계, 덩이 카드, 분할 카드(그 조합을 처음 ●로 납품할 때), 칼솜씨의 최고 기록
  · `applyClose(save, day, results)`: 마감. 통과, 도장(1 도장, 2 장인 도장), 횟수, ● 수의 최고
  · `unlocked(save, dayId)`: 그 영업일이 열려 있는가. P22의 지도가 쓴다
  · `toActive(S)`와 `fromActive(S, a)`: 하던 영업을 저장 꼴로 바꾸고 되살린다
- 코드 2 (10 SCREENS): `act(p)`를 바꾸고 `record(o)`를 더한다. 납품 단계에 들어갈 때 기록하고 저장한다. 개발용 바로가기(`S.dev`)에서는 저장하지 않는다.
- 코드 3 (11 TESTS): 검사 ST-05.
- 코드 4 (12 BOOT): [이어서 영업]을 잇는다.
- 코드 5 (12 BOOT): `boot()`를 바꾼다. 하던 영업이 있으면 처음 화면에 [이어서 영업]을 보여 준다.

■ 코드 1 (그대로)
넣을 자리: 9 STORAGE 구획의 끝(`// == 10 SCREENS ==` 바로 위)에 붙인다.

```js
// ── 기록 계산(순수): 저장 객체를 받아 새 객체를 돌려준다. 원본을 바꾸지 않는다 ──
const KNIFE = ["–", "들쭉날쭉", "고른 편", "장인"];  // 저장하는 칼솜씨 번호. 기계와 "–"는 0
const knifeCode = (k) => Math.max(0, KNIFE.indexOf(k));
const copy = (x) => JSON.parse(JSON.stringify(x));
function applyDelivery(save, o, res) {  // 납품 한 번. 새 카드를 얻었으면 card에 그 열쇠를 담는다
  const s = copy(save), full = res.recipe === "full";
  let card = "";
  s.stats.orders++;
  if (full) s.stats.clean++;
  if (knifeCode(res.knife) > 0) s.stats.slices++;
  if (res.knife === "장인") s.stats.master++;
  if (o.ask === "pick") { if (full && !s.loaves.includes(o.loaf)) { s.loaves.push(o.loaf); card = String(o.loaf); } }
  else if (o.ns.length === 1) {
    const key = recipeKey(o.loaf, o.ns[0]), r = s.recipes[key] || { got: false, knife: 0 };
    if (full && !r.got) { r.got = true; card = key; }  // 분할 카드는 그 조합을 처음 ●로 납품할 때 얻는다
    r.knife = Math.max(r.knife, knifeCode(res.knife));
    s.recipes[key] = r;
  }
  return { save: s, card };
}
function applyClose(save, day, results) {  // 마감: 통과, 도장, 최고 기록
  const s = copy(save), score = dayScore(day, results), d = s.days[day.id] || { passed: false, stamp: 0, runs: 0, best: 0 };
  s.days[day.id] = { passed: d.passed || score.passed, stamp: Math.max(d.stamp, score.stamp), runs: d.runs + 1, best: Math.max(d.best, score.clean) };
  s.active = null;
  return { save: s, score };
}
const unlocked = (save, dayId) => { const i = DAYS.findIndex((d) => d.id === dayId); return i === 0 || (i > 0 && !!(save.days[DAYS[i - 1].id] || {}).passed); };
const toActive = (S) => ({ day: S.day, index: S.results.length, results: S.results.map((r) => ({ recipe: r.recipe === "full" ? 2 : 1, knife: knifeCode(r.knife), ng: r.ng ? 1 : 0 })), cards: S.cards.slice() });
function fromActive(S, a) {  // 하던 영업을 이어서 연다. 읽을 수 없으면 null
  const d = a && dayOf(a.day);
  if (!d || !Array.isArray(a.results)) return null;
  const n = d.orders.length;
  let results = [];
  for (const r of a.results) {
    const o = d.orders[queueOf(n, results)[results.length]];
    if (!o || !r) return null;
    results = results.concat([{ recipe: r.recipe === 2 ? "full" : "half", knife: o.ask === "pick" ? "" : KNIFE[r.knife] || "–", ng: !!r.ng }]);
  }
  if (a.index !== results.length || results.length >= queueOf(n, results).length) return null;
  return Object.assign({ screen: "shift", day: d.id, sliced: false, cards: Array.isArray(a.cards) ? a.cards.slice() : [], dev: false, sum: null }, openAt(Object.assign({}, S, { day: d.id }), results.length, results));
}
```

■ 코드 2 (그대로)
넣을 자리: 10 SCREENS 구획의 `function act(p) { … }`와 그 위의 주석 한 줄을 지우고 그 자리에 넣는다.

```js
// ── 호출부: 계산부가 돌려준 값을 적용하고, 소리와 기록을 맡는다 ──
function act(p) {  // p: T.*가 돌려준 값. null이면 아무 일도 없다
  if (!p) return;
  const o = orderAt(S), was = S.phase;
  if (p.phase && p.phase !== was) stopRun(false);  // 단계가 바뀌면 재생을 멈춘다
  setState(p);
  if (p.phase === "deliver" && was !== "deliver") { record(o); begin("listen"); }  // 납품: 기록하고 듣기를 시작한다
}
function record(o) {  // 납품할 때마다 저장한다. 개발용 바로가기(S.dev)에서는 저장하지 않는다
  const day = dayOf(S.day), done = S.results.length >= queueOf(day.orders.length, S.results).length;
  if (S.dev) { if (done) setState({ sum: dayScore(day, S.results) }); return; }
  const r = applyDelivery(save, o, S.results[S.results.length - 1]);
  save = r.save;
  if (r.card) setState({ cards: S.cards.concat([r.card]) });
  if (done) { const c = applyClose(save, day, S.results); save = c.save; setState({ sum: c.score }); }  // 마지막 주문을 납품하면 마감까지 적는다
  else save.active = toActive(S);
  store.save(save);
}
```

■ 코드 3 (그대로)
넣을 자리: 11 TESTS 구획의 끝(`// == 12 BOOT ==` 바로 위)에 붙인다.

```js
// ── SL6: 기록과 이어하기 ──
test("ST-05", "이어하기: 주문 순번과 결과를 되살린다", () => {
  const base = S0(), day = dayOf("d1");
  let s = Object.assign(base, startDay(base, "d1")), sv = defaultSave();
  const deliver = (slip, knife) => { const o = orderAt(s); let r = solve(s, o, slip).s; r.results[r.results.length - 1].knife = knife; const a = applyDelivery(sv, o, r.results[r.results.length - 1]); sv = a.save; if (a.card) r = Object.assign({}, r, { cards: r.cards.concat([a.card]) }); s = r; };
  deliver(false, "장인"); s = Object.assign({}, s, T.next(s)); deliver(true, "고른 편"); s = Object.assign({}, s, T.next(s)); deliver(false, "–");
  sv.active = toActive(s);
  ok(same(sv.active, { day: "d1", index: 3, results: [{ recipe: 2, knife: 3, ng: 0 }, { recipe: 1, knife: 2, ng: 0 }, { recipe: 2, knife: 0, ng: 0 }], cards: ["4/2", "1/2"] }), "하던 영업을 적는다: " + JSON.stringify(sv.active));
  ok(sv.recipes["4/2"].got && sv.recipes["4/2"].knife === 3 && sv.recipes["2/2"].got === false && sv.recipes["2/2"].knife === 2 && sv.stats.orders === 3 && sv.stats.clean === 2 && sv.stats.slices === 2 && sv.stats.master === 1, "카드는 ●일 때만 얻는다. 칼솜씨의 최고 기록은 늘 적는다");
  const back = fromActive(S0(), JSON.parse(JSON.stringify(sv.active)));
  ok(back && back.screen === "shift" && back.day === "d1" && back.idx === 3 && back.phase === "mark" && same(back.results, s.results) && same(back.cards, ["4/2", "1/2"]), "같은 주문에서 이어진다");
  ok(fromActive(S0(), { day: "zz", index: 0, results: [] }) === null && fromActive(S0(), { day: "d1", index: 5, results: [] }) === null && fromActive(S0(), null) === null, "읽을 수 없으면 null");
  const six = Array.from({ length: 6 }, (_, i) => ({ recipe: i === 1 ? 1 : 2, knife: 0, ng: 0 })), redo = fromActive(S0(), { day: "d1", index: 6, results: six });
  ok(redo && redo.idx === 6 && orderAt(Object.assign(S0(), redo)).id === "d1-02", "다시 나오는 주문에서도 이어진다");
  ok(fromActive(S0(), { day: "d1", index: 4, results: six.slice(0, 4) }).phase === "scene", "발견 장면 앞에서 멈췄으면 장면부터");
  const fin = playDay("d1", []).s, c = applyClose(sv, day, fin.results);
  ok(c.score.passed && c.score.stamp === 1 && c.save.active === null && same(c.save.days.d1, { passed: true, stamp: 1, runs: 1, best: 7 }) && sv.active !== null, "마감: 통과와 도장을 적고 하던 영업을 지운다. 원본은 그대로");
  const mast = fin.results.map((r) => Object.assign({}, r, { knife: "장인", ng: true }));
  ok(dayScore(day, mast).stamp === 2 && dayScore(day, mast.map((r, i) => (i === 2 ? Object.assign({}, r, { ng: false }) : r))).stamp === 1 && dayScore(dayOf("d0"), playDay("d0", []).s.results).stamp === 1, "장인 도장: 썰기가 있는 주문 전부를 안내선 없이 장인으로");
  ok(unlocked(c.save, "d0") && unlocked(c.save, "d2") && !unlocked(c.save, "d3") && !unlocked(defaultSave(), "d1"), "앞 영업일을 통과하면 다음이 열린다");
  const lo = applyDelivery(defaultSave(), orderById("d0-01"), { recipe: "full", knife: "", ng: false });
  ok(lo.card === "4" && same(lo.save.loaves, [4]) && applyDelivery(lo.save, orderById("d0-06"), { recipe: "full", knife: "", ng: false }).card === "", "덩이 카드는 한 번만");
});
```

■ 코드 4 (그대로)
넣을 자리: 12 BOOT 구획에서 `function boot()` 바로 위에 넣는다.

```js
$("resume").addEventListener("click", () => { const p = fromActive(S, save.active); if (p) setState(p); });
```

■ 코드 5 (그대로)
넣을 자리: 12 BOOT 구획의 `function boot() { … }` 전체를 지우고 그 자리에 넣는다.

```js
function boot() {
  store = makeStore(pickBackend());
  save = store.load();
  const tests = runTests(), set = save.settings, base = { guide: set.guide, slow: set.slow, offset: set.tapOffsetMs, showMs: set.showMs };
  window.__tests = tests;
  $("foot").textContent = `외부 요청 0건 · ${tests.line}`;
  $("days").innerHTML = DAYS.map((d, i) => `<button class="btn" type="button" data-day="${d.id}">${i}단 ${d.name}</button>`).join("");
  $("resume").toggleAttribute("hidden", !save.active);  // 하던 영업이 있으면 [이어서 영업]
  measure();
  const hash = location.hash.slice(1), jump = orderById(hash), sceneDay = DAYS.find((d) => Object.keys(d.scenes).some((k) => d.scenes[k] === hash));
  if (hash === "test") { showTests(tests); return; }
  if (jump || sceneDay) {  // 개발용 바로가기: 주소 끝에 #d3-02(주문) 또는 #S2(발견 장면). 저장하지 않는다
    const d = jump ? dayOf(jump.day) : sceneDay, i = jump ? d.orders.indexOf(jump) : +Object.keys(d.scenes).find((k) => d.scenes[k] === hash);
    const fake = Array.from({ length: i }, () => ({ recipe: "full", knife: "", ng: false })), at = Object.assign({}, S, base, { day: d.id });
    setState(Object.assign(base, { screen: "shift", day: d.id, sliced: false, cards: [], dev: true, sum: null }, jump ? Object.assign({ idx: i, results: fake }, enterOrder(at, jump)) : openAt(at, i, fake)));
    return;
  }
  setState(base);
}
```

하지 말 것
- 저장 객체를 그 자리에서 고치지 않는다. 기록 계산은 사본을 만들어 돌려준다.
- 썰기 도중이나 프레임마다 저장하지 않는다. 납품할 때와 설정을 바꿀 때만 저장한다.
- 저장 스키마의 `version`을 올리거나 필드 이름을 바꾸지 않는다(S6).

끝나면 보고 (헌법 11절)
- `#test` 한 줄. 기대:
  자가검사 51/51 (전체 51개 중 51개 작성) · TH 13/13 LB 6/6 JD 8/8 GN 6/6 AU 6/6 ST 5/5 SV 4/4 CT 3/3
````

### 완료 기준

저장을 비우고 시작한다. 개발자 도구의 Application(저장소) 탭에서 Local Storage의 `sbg_save_v1`을 지우고 새로고침한다.

- [ ] T1. `index.html#test`의 첫 줄이 아래와 같다. 검사 51개가 모두 들어왔다.

```text
자가검사 51/51 (전체 51개 중 51개 작성) · TH 13/13 LB 6/6 JD 8/8 GN 6/6 AU 6/6 ST 5/5 SV 4/4 CT 3/3
```

- [ ] T2. 처음 화면에서 "0단 첫 출근"을 누르고 첫 주문("4분음표" 줄, [확정])을 납품한다. 새로고침하면 처음 화면에 [이어서 영업]이 보인다. 누르면 둘째 주문("2박짜리 식빵을 골라 주세요.")에서 이어지고 첫 진행 점이 차 있다.
- [ ] T3. 그때 Local Storage의 `sbg_save_v1`에 `"version":1`, `"loaves":[4]`, `"active":{"day":"d0","index":1,` 이 들어 있다.
- [ ] T4. 0단을 끝까지 하고 [마감하기]를 누른다. 새로고침하면 [이어서 영업]이 없다. `sbg_save_v1`의 `"days"`에 `"d0":{"passed":true,"stamp":1,"runs":1,"best":7}`(모두 맞혔을 때)이 있고 `"active":null`이다.
- [ ] T5. `index.html#d1-01`(바로가기)로 납품해도 `sbg_save_v1`이 바뀌지 않는다.
- [ ] T6. 처음 화면의 "1단 반으로, 또 반으로"에서 첫 주문을 한 번에 맞히고 납품하면 `"recipes"`에 `"4/2":{"got":true,` 가 생긴다.
- [ ] T7. 콘솔 오류가 없다. 사본을 남겼다(`P21 통과`).

여기까지가 [그대로] 프롬프트의 끝이다. 이 시점의 `index.html`은 약 1,732줄, 128KB이고, 여섯 영업일의 주문 43개를 처음 화면에서부터 탭으로 끝까지 할 수 있다. 줄 수가 크게 다르면 코드가 빠졌거나 바뀐 것이다.

---

## P22. 영업일 지도, 마감 화면, 잠금, 첫 배포 [설계]

**목표.** 임시 처음 화면의 영업일 단추를 영업일 지도로 옮기고, 통과해야 다음 단이 열리게 하고, 마감 화면을 정식으로 만든다. 끝나면 0~2단만으로 한 번 배포한다.

**설계서.** 7.2절(통과하면 다음 영업일이 열린다), 7.5절(마감 화면), 8.2절(화면 목록), 12장 위험 12(SL6 게이트에서 한 번 배포). AI에게 이 절들을 함께 준다.

````text
[P22 · SL6-4 · 영업일 지도, 마감 화면, 잠금]  종류: 설계

시작 전 상태
- `index.html#test`의 맨 윗줄이 아래와 같다. 사람이 다르다고 알려 주면 진행하지 않는다.
  자가검사 51/51 (전체 51개 중 51개 작성) · TH 13/13 LB 6/6 JD 8/8 GN 6/6 AU 6/6 ST 5/5 SV 4/4 CT 3/3

진행 방식
- 먼저 계획만 보고한다. (1) 고칠 함수와 고치는 줄, (2) 새 함수의 이름과 들어갈 구획, (3) 새 id와 새 상태 필드, (4) 헌법의 어느 규칙에 닿는지. 사람이 "진행"이라고 하면 구현한다.
- [그대로] 코드는 아래에 "고친다"고 적힌 곳만 고친다.

요구
1. 처음 화면(`#title`). 임시 안내 문장을 지운다. 단추 `#start`(영업 시작)를 더한다. 누르면 `screen`을 `"map"`으로 바꾼다. `#resume`(이어서 영업)은 그대로 둔다. `<div id="days">`는 지도 화면으로 옮긴다(id는 그대로).
2. 영업일 지도. `<section class="screen" id="mapScr" data-screen="map" aria-label="영업일 지도" hidden>`를 더한다. 안에 제목 "영업일", `#days`, 단추 `#mapBack`(처음으로).
   · 10 SCREENS 구획에 `renderMap()`을 더한다. `DAYS`마다 단추 하나(`data-day`)를 그린다. 단추에는 "N단 이름", 도장(없음, 도장, 장인 도장: `save.days[id].stamp`), "● 최고 a/b"(`best`와 주문 수. 한 번도 마감하지 않았으면 적지 않는다)를 적는다.
   · `unlocked(save, d.id)`가 거짓이면 단추를 끄고(`disabled`) "N−1단을 통과하면 열려요"를 적는다. 숫자는 `DAYS`의 순서에서 계산한다.
   · `render()`에서 `screen`이 `"map"`일 때 `renderMap()`을 부른다(고친다: `render()`에 한 줄). 저장 내용이 바뀌었을 때만 다시 그린다.
   · `boot()`의 `$("days").innerHTML = …` 한 줄을 지운다(고친다). `#days`의 클릭 처리기는 P06의 것을 그대로 쓴다.
3. 마감 화면. `renderClose()`를 정식으로 바꾼다(고친다).
   · 제목, ● 수와 통과 여부(지금의 `#closeSum`), 주문별 기록(지금의 `#closeList`)은 유지한다
   · 도장 자리 `#closeStamp`: 통과했으면 도장, 장인 도장이면 구분해서 보여 준다. 그림은 임시 도형이어도 된다(P27에서 바꾼다)
   · 새 카드 `#closeCards`: 그날 얻은 카드(`S.cards`)의 이름을 적는다. 4 ORDERS 구획에 `cardName(key)`를 더한다. 열쇠에 "/"가 있으면 `splitKo(specOf(덩이, 조각 수))`, 없으면 `noteKo(덩이) + " 식빵"`이다. 카드가 없으면 이 줄을 숨긴다
   · 이번 마감으로 다음 영업일이 처음 열렸으면 "다음 영업일이 열렸어요"를 적는다
   · 단추 `#toTitle`의 글자를 "지도로"로 바꾸고 `screen: "map"`으로 가게 한다(고친다: P11의 처리기). id는 그대로 둔다. `#restart`(다시 영업)는 그대로다
   · 주문이 8개인 날에도 화면 전체가 스크롤되지 않게, 목록이 길면 목록 안에서만 스크롤한다
4. 나가기. 설정 시트에 단추 `#quit`(지도로 나가기)를 더한다. 재생을 멈추고(`stopRun(false)`) 시트를 닫고 `screen: "map"`으로 간다. 하던 영업은 저장의 `active`에 남아 있으므로 처음 화면의 [이어서 영업]으로 돌아올 수 있다.
5. 개발용 바로가기(`#d3-02`, `#S2`)는 잠금과 상관없이 열린다. 저장하지 않는 것도 그대로다.

지킬 것
- 통과와 잠금의 계산은 P21의 `dayScore`, `applyClose`, `unlocked`를 쓴다. 새로 계산하지 않는다.
- 썰기 결과로 잠그지 않는다(R8).
- 카드 이름과 영업일 이름을 글자로 적지 않는다(W9, R3).
- 새 상태 필드는 `S`의 선언에 더하고 `setState`로만 바꾼다(W7).
- 검사와 `LOCK`을 고치지 않는다. 새 검사를 더하지 않는다(W3).
- 지도와 마감 화면도 320×568에서 화면 전체의 스크롤이 없어야 한다.

끝나면 보고 (헌법 11절)
- `#test` 한 줄. 기대(P21과 같다):
  자가검사 51/51 (전체 51개 중 51개 작성) · TH 13/13 LB 6/6 JD 8/8 GN 6/6 AU 6/6 ST 5/5 SV 4/4 CT 3/3
- 고친 [그대로] 함수의 목록과 고친 줄
````

### 완료 기준

저장을 비우고 시작한다.

- [ ] T1. `index.html#test`의 첫 줄이 P21과 같다(`자가검사 51/51 …`).
- [ ] T2. 처음 화면에 [영업 시작]이 있다. 누르면 지도에 여섯 단이 보이고, 0단만 누를 수 있다. 1단에는 "0단을 통과하면 열려요"가 적혀 있다.
- [ ] T3. 0단을 모두 맞히고 마감하면 마감 화면에 ● 7/7, 도장, 새 카드 4장(4분음표 식빵, 2분음표 식빵, 온음표 식빵, 8분음표 식빵), 주문별 기록 7줄, "다음 영업일이 열렸어요", [다시 영업] [지도로]가 보인다.
- [ ] T4. [지도로]를 누르면 0단에 도장과 "● 최고 7/7"이 있고 1단이 열려 있다. 새로고침해도 같다.
- [ ] T5. 저장을 비우고 0단에서 두 주문을 두 번씩 틀려 ● 5개로 마감하면 "도장은 6개부터예요"가 나오고 지도에서 1단이 잠겨 있다.
- [ ] T6. 영업 도중 [설정]의 [지도로 나가기]를 누르면 지도로 간다. [처음으로]를 누른 뒤 [이어서 영업]을 누르면 하던 주문으로 돌아온다.
- [ ] T7. `index.html#d3-02`는 3단이 잠겨 있어도 열리고, 거기서 납품해도 저장이 바뀌지 않는다.
- [ ] T8. 320×568, 360×640, 390×844에서 지도와 마감 화면(3단의 8줄 포함: `#d3-08`에서 납품, [마감하기])에 화면 전체의 스크롤이 없다.
- [ ] T9. AI가 보고한 "고친 [그대로] 함수"가 `render`, `boot`, `renderClose`, `#toTitle`의 처리기 범위 안이다.
- [ ] T10. (선택) `tools/check.mjs`가 "문제 0"이다.
- [ ] 사본을 남겼다(`P22 통과`).

### 게이트 GSL6과 첫 배포

- [ ] 지도에서 시작해 0단, 1단, 2단을 차례로 통과했다.
- [ ] 2단 도중에 새로고침하고 [이어서 영업]으로 같은 주문에서 이어졌다.
- [ ] 14장의 절차로 v0.6을 배포했다. 배포한 주소에 `#test`를 붙여 `자가검사 51/51 …`을 확인했다.
- [ ] `docs/slice-gate-report.md`에 GSL6을 적었다.

---

# 9장. SL7 3~5단과 레시피북 (v0.8)

3~5단의 주문 22개, 발견 장면 S4, 악보 주문과 소리 주문은 [그대로] 코드에 이미 들어 있다. 이 단계에서는 그것을 끝까지 해 보고(P23), 레시피북(P24), 자유 도마(P25), 설정 화면(P26)을 만든다.

## P23. 3~5단 완주 점검 [점검]

**목표.** 3단, 4단, 5단을 지도에서 시작해 마감 화면까지 한다. 이름표 고르기, 연속 주문, 악보 주문, 소리 주문을 확인한다.

**설계서.** 4.2절(주문 방식), 4.3절(악보·소리 주문의 고르기), 7.3절(주문 목록), 7.4절(S4). 주문의 정답은 부록 E의 표에 있다.

````text
[P23 · SL7-1 · 3~5단 완주 점검]  종류: 점검

시작 전 상태
- `index.html#test`의 맨 윗줄이 아래와 같다.
  자가검사 51/51 (전체 51개 중 51개 작성) · TH 13/13 LB 6/6 JD 8/8 GN 6/6 AU 6/6 ST 5/5 SV 4/4 CT 3/3

이번에 하는 일
- 코드를 고치지 않는다. `index.html`을 읽고 아래 다섯 가지에 "지킴", "어김", "확인 못 함" 가운데 하나로 답한다. "어김"에는 해당하는 줄과 까닭을 적고 고칠 방법을 제안만 한다.

1. `choicesOf()`가 주문의 번호로 만든 씨앗으로 보기를 섞는가. 같은 주문은 늘 같은 순서인가.
2. 악보 주문과 소리 주문의 고르기 오답에서 유령 빵의 박 수와 문구의 박 수가 `loafBeats()`에서 나오는가.
3. 소리 주문의 [주문 듣기]가 원래 소리 → 조각 리듬 순서로 들려주는가. 리듬만 들려주지 않는가.
4. 연속 주문(`ns`가 여러 개)에서 빵 탭의 끝이 3이고, 납품에서 악보를 그리지 않고, 납품 듣기가 덩이마다 원래 소리를 한 번씩 들려준 뒤 전체 리듬을 들려주는가.
5. 8분음표 덩이 주문의 빠르기가 `bpmOf()`에서 50으로 나오는가. "느리게"가 켜지면 10이 빠지는가.

끝나면 보고
- 다섯 항목의 답
- `#test` 한 줄(바뀌지 않았어야 한다)
````

### 완료 기준

지도에서 3단이 열려 있어야 한다(0~2단 통과). 잠겨 있으면 0~2단을 먼저 통과한다.

- [ ] T1. AI의 답이 다섯 항목 모두 "지킴"이다.
- [ ] T2. **3단**(주문 8개). 둘째 주문을 납품하면 발견 장면("둘 다 셋잇단이지만 이름이 달라요.")이 나온다. 이름표 보기의 순서와 정답이 부록 E의 표와 같다. 마감 화면에 ● 8/8과 도장.
- [ ] T3. **4단**(주문 6개). 덩이 4개의 칼집을 주문대로 두고 [확정]을 누르면 "칼집을 다 냈어요. 이제 박에 맞춰 썰어요.". 납품하면 낮은 음 네 번 뒤에 조각 리듬이 이어지고 악보는 없다.
- [ ] T4. **5단**(주문 8개). 앞의 넷은 악보를 보고, 뒤의 넷은 [주문 듣기]를 듣고 덩이를 고른다. 틀린 덩이를 고르면 점선 막대("악보 = 2박", "원래 소리 = 1박"처럼)가 필요한 길이를 보여 준다. 마감 화면에 ● 8/8과 도장.
- [ ] T5. 세 영업일 가운데 하루는 썰기를 모두 건너뛰고([납품]) 통과한다(R8).
- [ ] T6. 세 영업일 가운데 하루는 키보드만으로 한다(Tab, Enter, 스페이스바). 재단, 확정, 이름표, 썰기, 납품, 다음 주문이 모두 된다.
- [ ] T7. 지도에서 여섯 단 모두에 도장이 있다. Local Storage의 `sbg_save_v1`에서 `"recipes"`의 열쇠가 11개(`4/2`, `2/2`, `1/2`, `4/4`, `2/4`, `8/2`, `1/4`, `4/3`, `2/3`, `1/3`, `8/3`)이고 `"loaves"`가 4개다(모두 한 번에 맞혔을 때).
- [ ] T8. 콘솔에 오류가 없고 "ST-01"로 시작하는 줄이 없다. 영업일마다 걸린 시간을 적어 둔다.

---

## P24. 레시피북과 도장 [설계]

**목표.** 얻은 레시피 카드 15장과 발견 장면 4개를 다시 볼 수 있는 레시피북을 만든다.

**설계서.** 7.5절(레시피 카드 15장, 도장), 8.2절(레시피북), 7.4절(레시피북에서 발견 장면을 다시 볼 수 있다). AI에게 이 절들을 함께 준다.

````text
[P24 · SL7-2 · 레시피북과 도장]  종류: 설계

시작 전 상태
- `index.html#test`의 맨 윗줄이 아래와 같다. 사람이 다르다고 알려 주면 진행하지 않는다.
  자가검사 51/51 (전체 51개 중 51개 작성) · TH 13/13 LB 6/6 JD 8/8 GN 6/6 AU 6/6 ST 5/5 SV 4/4 CT 3/3

진행 방식
- 먼저 계획만 보고한다. (1) 고칠 함수와 고치는 줄, (2) 새 함수의 이름과 들어갈 구획, (3) 새 id와 새 상태 필드, (4) 헌법의 어느 규칙에 닿는지. 사람이 "진행"이라고 하면 구현한다.

요구
1. 화면. `<section class="screen" id="bookScr" data-screen="book" aria-label="레시피북" hidden>`를 더한다. 처음 화면에 단추 `#openBook`(레시피북)을 더한다. 책 안에 단추 `#bookBack`(처음으로). 책은 길어지므로 화면 안에서 세로로 스크롤해도 된다.
2. 머리. "도장 a/6 · 장인 도장 b". `save.days`에서 센다.
3. 카드 15장. 순서는 `cardList()`가 돌려주는 열쇠의 순서다(덩이 카드 4장, 분할 카드 11장). 10 SCREENS 구획에 `renderBook()`을 더하고 `render()`에서 `screen`이 `"book"`일 때 부른다.
   · 얻은 카드(덩이 카드는 `save.loaves`에 그 덩이가 있을 때, 분할 카드는 `save.recipes[열쇠].got`이 참일 때. `save.loaves`에는 숫자 4, 2, 1, 8이 들어 있고 `cardList()`의 열쇠는 글자다):
     - 빵 그림: 덩이를 n조각으로 나눈 막대. 도마와 같은 class(`.loaf`, `.slice`)를 쓰고 자리와 폭은 %다
     - 악보: `notesSvg()`로 그린다. 분할 카드는 `labelOf(specOf(덩이, 조각 수))`, 덩이 카드는 음표 하나
     - 이름: P22의 `cardName(열쇠)`. 분할 카드에는 한 조각의 길이(`beatsKo(toBeats(spec.piece))`)도 적는다
     - 칼솜씨의 최고 기록: `KNIFE[save.recipes[열쇠].knife]`. 덩이 카드에는 없다
     - 단추 [들어 보기]
   · 얻지 못한 카드: 테두리와 "아직 없어요", 얻을 수 있는 단("N단"). 단은 그 조합이 처음 나오는 주문의 영업일에서 계산한다(덩이 카드는 0단)
4. [들어 보기]. 앞선 재생을 멈추고(`stopRun(false)`), `planRun("listen", 가짜 주문, { slow: false, first: false })`로 계획을 세워 `schedule()`로 한 번에 예약한다. 가짜 주문은 분할 카드면 `{ ask: "word", loaf, ns: [n], bpm: 60 }`, 덩이 카드면 `{ ask: "pick", loaf, ns: [1], bpm: 60 }`이다. 화면 강조는 없어도 된다. 책을 나갈 때 재생을 멈춘다.
5. 발견 장면 다시 보기. 책의 아래쪽에 S1~S4를 첫 문장(`sceneText(id)[0]`)과 함께 늘어놓는다. 그 장면이 있는 영업일을 한 번이라도 마감했으면(`save.days[그 영업일]`이 있으면) 누를 수 있다.
   · 누르면 `boot()`의 바로가기(`#S2`)와 같은 방법으로 영업 화면의 장면 단계를 연다(`dev: true`, `openAt`). 돌아올 화면을 상태에 적어 둔다(예: `back: "book"`)
   · [알겠어요]를 누르면 `back`이 있을 때는 주문으로 넘어가지 않고 재생을 멈춘 뒤 그 화면으로 돌아간다(고친다: P11의 `#sceneOk` 처리기)
   · 다시 보기에서 한 것은 저장하지 않는다

지킬 것
- 카드의 이름, 길이, 비율을 글자로 적지 않는다. 전부 엔진 함수로 만든다(W9). TH-13이 잡는다.
- 카드를 그리려고 수치 표를 만들지 않는다. `cardList()`와 `specOf()`에서 나온다(S3).
- 소리는 `schedule()`로 한 번에 예약한다(R5). 타이머를 쓰지 않는다(W8).
- 새 상태 필드는 `S`의 선언에 더하고 `setState`로만 바꾼다(W7).
- 검사와 `LOCK`을 고치지 않는다. 새 검사를 더하지 않는다(W3).

끝나면 보고 (헌법 11절)
- `#test` 한 줄. 기대(P21과 같다):
  자가검사 51/51 (전체 51개 중 51개 작성) · TH 13/13 LB 6/6 JD 8/8 GN 6/6 AU 6/6 ST 5/5 SV 4/4 CT 3/3
- 고친 [그대로] 함수의 목록과 고친 줄
````

### 완료 기준

- [ ] T1. `index.html#test`의 첫 줄이 P21과 같다(`자가검사 51/51 …`). TH-13이 통과다.
- [ ] T2. 저장을 비우고 [레시피북]을 열면 카드 15장이 모두 "아직 없어요"다. 덩이 카드 4장에는 "0단", 분할 카드에는 1단 7장, 2단 1장, 3단 3장이 적혀 있다.
- [ ] T3. 0단을 통과한 뒤 열면 덩이 카드 4장이 채워져 있다.
- [ ] T4. 1단의 첫 주문을 한 번에 맞히고 납품한 뒤 열면 "8분음표 2개 · 일반 분할" 카드가 채워져 있다. 빵 그림이 2조각, 악보가 8분음표 2개다. 썰기를 했다면 칼솜씨가 적혀 있다.
- [ ] T5. 그 카드의 [들어 보기]를 누르면 낮은 음 한 번 뒤에 높은 음 두 번이 난다. 다른 카드를 바로 누르면 앞의 소리가 멈춘다.
- [ ] T6. 1단을 마감한 뒤에는 S1을 다시 볼 수 있다. [알겠어요]를 누르면 레시피북으로 돌아온다. 다시 보는 동안 한 것이 저장을 바꾸지 않는다.
- [ ] T7. 320×568에서 카드의 글자가 잘리지 않는다. 콘솔 오류가 없다.
- [ ] 사본을 남겼다(`P24 통과`).

---

## P25. 자유 도마 [설계]

**목표.** 채점 없이 덩이, 조각 수, 빠르기를 마음대로 바꿔 보는 화면을 만든다. 수업에서 화면을 띄워 설명하는 용도를 겸한다.

**설계서.** 7.6절(자유 도마), 기획안 별첨 1. AI에게 7.6절을 함께 준다.

**주의.** [설계] 프롬프트 가운데 범위가 가장 넓다. 계획을 받아 보고, 한 번에 다 하기 어려워 보이면 아래 "요구"의 1~5번(한 덩이)을 먼저 끝내고 6번(2단 도마)을 따로 시킨다.

````text
[P25 · SL7-3 · 자유 도마]  종류: 설계

시작 전 상태
- `index.html#test`의 맨 윗줄이 아래와 같다. 사람이 다르다고 알려 주면 진행하지 않는다.
  자가검사 51/51 (전체 51개 중 51개 작성) · TH 13/13 LB 6/6 JD 8/8 GN 6/6 AU 6/6 ST 5/5 SV 4/4 CT 3/3

진행 방식
- 먼저 계획만 보고한다. (1) 고칠 함수와 고치는 줄, (2) 새 함수의 이름과 들어갈 구획, (3) 새 id와 새 상태 필드, (4) 헌법의 어느 규칙에 닿는지. 사람이 "진행"이라고 하면 구현한다.

요구
1. 들어가기. 처음 화면에 단추 `#openFree`(자유 도마)를 더한다. 자유 도마는 영업 화면의 틀(HUD, 주문 카드, 선반, 도마, 판독 줄, 조작부 94px)을 그대로 쓴다. 새 틀을 만들지 않는다(R12).
2. 고를 수 있는 것.
   · 덩이 4종: 선반의 줄을 누른다. 자유 도마에서는 선반이 늘 눌린다
   · 조각 수 2~4: [−], [+], 빵 탭
   · 빠르기 40~100(10 단위): 주문 카드 자리에 [−] ♩=60 [+]
   · 보기 방식 둘: "재단 보기"와 "리듬 썰기"
3. 재단 보기. 덩이 위에 틀, 조각마다 길이, 판독 줄에 이름과 비율(`splitKo(specOf(덩이, 조각 수))`)과 한 조각의 길이. 채점하지 않는다. [들어 보기]로 원래 소리 → 조각 리듬을 듣는다.
4. 리듬 썰기. 탭 패드, [기계 썰기], 안내선, 판정, 색 표시, 결과 문구가 영업과 같다. 판정은 `judge()`, 문구는 `T.sliced()`를 그대로 쓴다. [납품]은 없다.
5. 기록하지 않는다. 자유 도마에서 한 것은 저장을 바꾸지 않는다(`dev: true`와 같은 취급). 나가기 단추로 처음 화면에 돌아간다. 나갈 때 재생을 멈춘다.
6. 2단 도마. "둘째 덩이"를 켜면 덩이 둘을 위아래로 놓고 각각 덩이와 조각 수를 고른다. 두 줄은 한 배율이다(R1). 긴 덩이가 폭을 가득 채우고 짧은 덩이는 그 비율만큼만 차지한다. [들어 보기]는 윗줄, 아랫줄 차례로 원래 소리 → 조각 리듬을 들려준다(`planScene`과 같은 방식). 2단 도마에서는 리듬 썰기를 하지 않아도 된다.

권하는 구조(다르게 해도 되지만 계획에서 까닭을 밝힌다)
- `screen`에 `"free"`를 더한다. `render()`가 `"shift"`와 `"free"`에서 틀을 그리게 한다. `legal()`은 영업 화면에서만 전이를 검사하므로 자유 도마의 전이를 막지 않는다.
- 상태에 `free`(없으면 `null`, 있으면 덩이, 조각 수, 빠르기, 보기 방식, 둘째 덩이)를 둔다. 순수 함수 `freeOrder(free)`가 주문 꼴의 값(`{ ask: "word", loaf, ns: [n], label: "", mold: true, count: true, guide: true, bpm, … }`)을 만들고, `orderAt(S)`가 `S.free`가 있으면 그것을 돌려준다. 이렇게 하면 도마, 썰기, 소리가 영업의 코드를 그대로 쓴다.
- HUD의 제목은 "자유 도마", 진행 점은 그리지 않는다.

지킬 것
- 영업의 흐름(`FLOW`, `SUBS`, `T.*`의 정답 판단, 통과 계산)을 바꾸지 않는다. ST-01, ST-03이 그대로 통과해야 한다.
- 조각 수는 2~4다. 5~7조각은 v1.1의 범위다. 8분음표 덩이는 2와 3만 고를 수 있다(4조각은 표기 음표가 32분음표가 된다).
- 자리와 폭은 %(W10), 소리는 한 번에 예약(R5), 상태는 `setState`(W7), 이름은 엔진 함수(W9).
- 조작부의 높이 94px와 화면 전체의 스크롤 0을 지킨다(R9).
- 검사와 `LOCK`을 고치지 않는다. 새 검사를 더하지 않는다(W3).

끝나면 보고 (헌법 11절)
- `#test` 한 줄. 기대(P21과 같다):
  자가검사 51/51 (전체 51개 중 51개 작성) · TH 13/13 LB 6/6 JD 8/8 GN 6/6 AU 6/6 ST 5/5 SV 4/4 CT 3/3
- 고친 [그대로] 함수의 목록과 고친 줄
````

### 완료 기준

- [ ] T1. `index.html#test`의 첫 줄이 P21과 같다(`자가검사 51/51 …`).
- [ ] T2. 처음 화면의 [자유 도마]로 들어간다. 선반에서 덩이를 바꾸면 도마의 덩이, 틀, 눈금이 바뀐다.
- [ ] T3. 4분음표 덩이에서 조각 수를 2, 3, 4로 바꾸면 판독 줄의 이름이 P00 8절의 "분할 11가지" 표와 같다. 3조각일 때만 비율 (3:2)가 붙는다.
- [ ] T4. 리듬 썰기에서 탭하면 칼질, 색 표시, 결과 문구가 나온다. 빠르기를 40과 100으로 바꾸면 메트로놈의 간격이 달라진다.
- [ ] T5. 둘째 덩이를 켜고 온음표와 8분음표를 고르면 8분음표 덩이가 온음표 덩이의 1/8 폭이다. [들어 보기]가 윗줄, 아랫줄 차례로 들린다.
- [ ] T6. 자유 도마에서 무엇을 해도 Local Storage의 `sbg_save_v1`이 바뀌지 않는다(설정 제외).
- [ ] T7. 자유 도마에서 나온 뒤 영업을 시작하면 영업이 전과 같이 움직인다. 콘솔에 "ST-01"이 없다.
- [ ] T8. 320×568, 360×640, 390×844에서 스크롤이 없다. (선택) `tools/check.mjs`가 "문제 0"이다.
- [ ] 사본을 남겼다(`P25 통과`).

---

## P26. 설정 화면 [설계]

**목표.** 처음 화면에서 여는 설정 화면을 만든다. 영업 중의 설정 시트(P15)는 빠른 설정으로 남긴다.

**설계서.** 8.2절(설정 화면의 항목), 9.4절(저장), 9.5절(자가검사 한 줄), 6.2절(마스터 게인). AI에게 이 절들을 함께 준다.

````text
[P26 · SL7-4 · 설정 화면]  종류: 설계

시작 전 상태
- `index.html#test`의 맨 윗줄이 아래와 같다. 사람이 다르다고 알려 주면 진행하지 않는다.
  자가검사 51/51 (전체 51개 중 51개 작성) · TH 13/13 LB 6/6 JD 8/8 GN 6/6 AU 6/6 ST 5/5 SV 4/4 CT 3/3

진행 방식
- 먼저 계획만 보고한다. (1) 고칠 함수와 고치는 줄, (2) 새 함수의 이름과 들어갈 구획, (3) 새 id와 새 상태 필드, (4) 헌법의 어느 규칙에 닿는지. 사람이 "진행"이라고 하면 구현한다.

요구
1. 화면. `<section class="screen" id="setScr" data-screen="settings" aria-label="설정" hidden>`를 더한다. 처음 화면에 단추 `#openSettings`(설정), 화면 안에 `#setBack`(처음으로).
2. 항목. 모두 `setSetting(열쇠, 값, 상태에 넣을 값)`으로 적는다. 열쇠는 저장의 `settings`에 이미 있는 이름이다.
   · 소리 크기(`volume`, 0~1)와 음소거(`muted`): 마스터 게인에 바로 적용한다. `audio()`가 컨텍스트를 만들 때의 `out.gain.value = 0.8`을 저장된 값에서 읽게 한다(고친다). 음소거면 0이다
   · 칼집 안내선(`guide`), 느리게(`slow`): 설정 시트와 같은 값이다
   · 박자 맞추기: P16의 화면을 연다. 닫으면 설정 화면으로 돌아온다
   · 탭 보정(`tapOffsetMs`): [−] [+], 10ms씩, −100~+200
   · 오차 수치 보이기(`showMs`): 끄면 썰기 결과가 "조금 늦었어요"처럼 나온다(P05의 `T.sliced`가 이미 한다)
   · 동작 줄이기(`motion`): "기기 설정 따르기", "줄이기", "줄이지 않기". `#app`에 `data-motion` 속성으로 적는다. 연출은 P28에서 이 값을 본다
   · 튜토리얼 다시 보기: `tutorialSeen`을 거짓으로 되돌린다(P30에서 쓴다)
   · 자가검사 결과: `window.__tests.line`을 한 줄로 보여 준다. 실패가 있으면 실패한 검사의 번호도 보여 준다
   · 데이터 초기화: 누르면 같은 자리에 "정말 지울까요?"와 [지우기] [그만두기]가 나온다. [지우기]를 누르면 저장을 `defaultSave()`로 바꿔 저장하고 처음 화면을 다시 그린다([이어서 영업]이 사라져야 한다). `confirm()`을 쓰지 않는다(W11)
3. 저장할 수 없는 기기. `store.persistent()`가 거짓이면 화면 위쪽에 "이 기기에서는 기록이 저장되지 않아요"를 보여 준다.
4. 설정 시트(영업 중)는 그대로 둔다. 두 곳에서 바꾼 값이 서로 같아야 한다.

지킬 것
- 저장 스키마의 필드 이름과 `version: 1`을 바꾸지 않는다(S6).
- 설정을 `S`에 직접 적지 않는다(W7).
- 음량을 바꿔도 예약한 음의 시각이 바뀌지 않는다. 게인 값만 바꾼다.
- 검사와 `LOCK`을 고치지 않는다. AU 검사는 가짜 오디오 객체를 쓰므로 `audio()`를 고쳐도 통과해야 한다(W3).

끝나면 보고 (헌법 11절)
- `#test` 한 줄. 기대(P21과 같다):
  자가검사 51/51 (전체 51개 중 51개 작성) · TH 13/13 LB 6/6 JD 8/8 GN 6/6 AU 6/6 ST 5/5 SV 4/4 CT 3/3
- 고친 [그대로] 함수의 목록과 고친 줄
````

### 완료 기준

- [ ] T1. `index.html#test`의 첫 줄이 P21과 같다(`자가검사 51/51 …`).
- [ ] T2. 처음 화면의 [설정]으로 들어가면 항목 11가지가 보인다: 소리 크기, 음소거, 칼집 안내선, 느리게, 박자 맞추기, 탭 보정, 오차 수치 보이기, 동작 줄이기, 튜토리얼 다시 보기, 자가검사 결과, 데이터 초기화.
- [ ] T3. 소리 크기를 줄이고 영업에서 납품 듣기를 하면 소리가 작아진다. 음소거를 켜면 소리가 나지 않고, 영업 화면은 그대로 움직인다.
- [ ] T4. 설정 화면에서 느리게를 켜고 영업의 설정 시트를 열면 느리게가 켜져 있다. 반대로도 같다.
- [ ] T5. 오차 수치 보이기를 끄고 썰면 결과에 ms 숫자가 없다.
- [ ] T6. 자가검사 결과 줄이 `#test`의 첫 줄과 같다.
- [ ] T7. 데이터 초기화의 [지우기]를 누르면 지도의 도장과 레시피북의 카드가 사라지고 [이어서 영업]이 없어진다. [그만두기]를 누르면 아무것도 바뀌지 않는다.
- [ ] T8. 새로고침해도 설정이 유지된다. 320×568에서 글자가 잘리지 않는다. 콘솔 오류가 없다.
- [ ] 사본을 남겼다(`P26 통과`).

### 게이트 GSL7

- [ ] 지도에서 시작해 여섯 영업일을 완주했다(P23).
- [ ] `#test`가 `자가검사 51/51 …`이다.
- [ ] `docs/slice-gate-report.md`에 GSL7을 적었다. 여기서 v0.8을 배포해도 된다.

---

# 10장. SL8 그림, 연출, 튜토리얼 (v0.9)

이 단계의 다섯 프롬프트는 모두 [설계]다. 규칙은 같다. 계획을 먼저 받고, 틀의 크기와 class 이름과 검사를 건드리지 않고, 끝나면 `#test`가 `자가검사 51/51 …`이어야 한다. 프롬프트 하나가 끝날 때마다 세 크기(320×568, 360×640, 390×844)에서 스크롤과 잘림을 다시 본다. Node.js가 있으면 `tools/check.mjs`가 "문제 0"인지 본다.

## P27. 그림 [설계]

**목표.** 임시 도형을 정식 그림으로 바꾼다. 인라인 SVG와 CSS만 쓴다.

**설계서.** 8.3절(색 토큰, 에셋 목록), D9(그림 방향), D11(이름), R10, R11. AI에게 8.3절을 함께 준다. 이름(D11)을 정했으면 프롬프트 맨 위에 적어 준다.

````text
[P27 · SL8-1 · 그림]  종류: 설계

시작 전 상태
- `index.html#test`의 맨 윗줄이 아래와 같다. 사람이 다르다고 알려 주면 진행하지 않는다.
  자가검사 51/51 (전체 51개 중 51개 작성) · TH 13/13 LB 6/6 JD 8/8 GN 6/6 AU 6/6 ST 5/5 SV 4/4 CT 3/3

진행 방식
- 먼저 계획만 보고한다. 에셋마다 (1) 어디에 쓰이는가, (2) SVG 심벌인가 CSS인가, (3) 어느 class에 입히는가. 사람이 "진행"이라고 하면 구현한다.
- 한 번에 다 하지 않는다. 식빵과 도마 → 선반과 틀과 유령 빵 → 칼(커서) → 주문 카드와 단추와 아이콘 → 타이머 → 도장과 레시피 카드 → 배경 순서로 하고, 묶음마다 멈춰서 보고한다.

요구
1. 방향(D9). 평면 도형을 다듬은 인라인 SVG. 선은 굵고 모서리는 둥글게. 캐릭터는 주방 타이머 하나(이름 "타이머").
2. 색. P01의 `:root`에 있는 토큰만 쓴다(`--counter`, `--panel`, `--line`, `--ink`, `--ink-2`, `--board`, `--board-edge`, `--crust`, `--crumb`, `--crumb-2`, `--lit`, `--steel`, `--steel-soft`, `--good`, `--warn`, `--bad`). 조각의 띠는 지금처럼 `hue(i)`에서 나온다. 새 색이 필요하면 토큰을 더하고 대비를 잰다.
3. 에셋.
   · 식빵: 옆에서 본 덩이. 껍질과 속, 조각의 띠, 잘린 면
   · 칼: 위에서 내려오는 칼(커서)
   · 도마와 선반: 나무 도마, 선반의 줄과 눈금
   · 틀: 점선 칸. 유령 빵: 점선 막대
   · 타이머: 표정 넷(기본, 기쁨, 갸웃, 세는 중)
   · 주문 쪽지: 말, 악보, 소리 세 종류의 카드 머리
   · 레시피 카드: 카드 틀. 덩이 4종과 분할 11종의 그림은 P24의 빵 그림을 다듬는다
   · 도장: 도장, 장인 도장
   · 배경: 공방 안 한 장면
   · 아이콘: 소리, 설정, 다시 듣기, 뒤로, 기계, 느리게
4. 넣는 법. `<body>` 맨 위에 숨긴 `<svg>` 하나를 두고 그 안에 `<symbol id="…">`로 모은 뒤 `<use href="#…">`로 쓴다. 단순한 모양은 CSS(`background`, `border`, `::before`)로 그린다. 이미지 파일, 비트맵, 외부 글꼴, 이모지를 쓰지 않는다(R11).
5. 타이머의 자리(권함). 판독 줄의 왼쪽에 작게 둔다. 표정은 판독 줄의 class에서 고른다(`readout good`은 기쁨, `readout bad`는 갸웃, 그 밖은 기본). "세는 중"은 탭 패드가 `live`일 때 패드 안에 둔다. 이렇게 하면 스크립트를 고치지 않고 CSS만으로 된다. `#readout`은 글자만 바뀌는 노드로 남긴다.
6. 색만으로 뜻을 전하지 않는다. 조각의 길이 글자, 오답 표시의 번호, 기록의 모양(●, ◐)을 지우지 않는다.

바꾸지 않는 것
- 여섯 줄의 높이와 조작부 94px(R9). 글자 12px 이상, 단추 44px 이상, 대비 4.5:1 이상(R10).
- id와 class 이름, 덩이와 조각과 칼집과 유령 빵의 자리와 폭(%), `boardModel()`과 `buildBoard()`가 만드는 구조. 그림은 class에 입힌다.
- 스크립트의 계산과 검사. 그림 때문에 `render` 계열을 고쳐야 하면 계획에서 먼저 밝힌다.
- `index.html`은 300KB 이하다.

끝나면 보고 (헌법 11절)
- `#test` 한 줄. 기대(P21과 같다):
  자가검사 51/51 (전체 51개 중 51개 작성) · TH 13/13 LB 6/6 JD 8/8 GN 6/6 AU 6/6 ST 5/5 SV 4/4 CT 3/3
- 파일 크기(KB), 남아 있는 임시 도형의 목록(없으면 "없음")
````

### 완료 기준

- [ ] T1. `index.html#test`의 첫 줄이 P21과 같다(`자가검사 51/51 …`).
- [ ] T2. 영업의 여섯 단계(`#d0-01` 고르기, `#d1-01` 재단과 썰기와 납품, `#d2-02` 숫자 질문, `#d3-02` 이름표), 발견 장면(`#S2`), 지도, 마감, 레시피북, 자유 도마, 설정에 임시 도형과 이모지가 없다.
- [ ] T3. 세 크기에서 스크롤 0, 잘림 0. P09의 T2를 다시 한다. (선택) `tools/check.mjs`가 "문제 0"이고 "외부 요청 0건"이다.
- [ ] T4. 유령 빵이 길 때 덩이가 줄어드는 것(`#d3-02`에서 "4분음표 3개"), 선반 막대의 길이 비가 그림을 입힌 뒤에도 그대로다(R1).
- [ ] T5. 글자와 배경의 대비가 4.5:1 이상이다. 새로 더한 색은 대비 검사 도구로 쟀다.
- [ ] T6. 개발자 도구의 네트워크 탭에 `index.html` 말고 다른 요청이 없다. 파일이 300KB 이하다.
- [ ] 사본을 남겼다(`P27 통과`).

---

## P28. 연출 [설계]

**목표.** 8.4절의 시간표대로 움직임을 넣는다. 썰기와 듣기의 박을 흔들지 않는다.

**설계서.** 8.4절(연출 시간표), R12, 11.1절(E-08), 8.6절(동작 줄이기). AI에게 8.4절을 함께 준다.

````text
[P28 · SL8-2 · 연출]  종류: 설계

시작 전 상태
- `index.html#test`의 맨 윗줄이 아래와 같다. 사람이 다르다고 알려 주면 진행하지 않는다.
  자가검사 51/51 (전체 51개 중 51개 작성) · TH 13/13 LB 6/6 JD 8/8 GN 6/6 AU 6/6 ST 5/5 SV 4/4 CT 3/3

진행 방식
- 먼저 계획만 보고한다. 연출마다 (1) 어느 class나 요소에 거는가, (2) CSS 전환인가 CSS 애니메이션인가 `element.animate()`인가, (3) 스크립트를 고치는가. 사람이 "진행"이라고 하면 구현한다.

요구(시간표)
| 사건 | 시간 |
|---|---|
| 덩이가 선반에서 도마로 옮겨 가며 늘어남 | 300ms |
| 칼집이 생기거나 사라짐 | 120ms |
| 도마 배율 변화(유령 빵이 나타나 덩이가 줄어듦) | 300ms |
| 오답 표시(조각이 살짝 벌어지고 번호가 붙음) | 200ms |
| 탭할 때 칼이 내려갔다 올라옴 | 80ms |
| 조각이 밝아짐(듣기) | 조각의 길이만큼. 지금 그대로다 |
| 두껍거나 얇은 조각의 색 | 200ms |
| 레시피 카드가 뒤집힘(마감 화면의 새 카드) | 400ms |
| 도장(마감 화면) | 250ms |

지킬 것
- 움직이는 속성은 `transform`과 `opacity`뿐이다. `width`, `left`, `height`에 전환을 걸지 않는다.
- 썰기와 듣기 도중(`sub`가 `count`, `run`, `listen`)에는 도마의 배치를 바꾸는 연출을 하지 않는다(R12). 커서의 `left`에는 전환을 걸지 않는다. 걸면 칼이 박보다 늦게 보인다.
- 상태를 타이머로 바꾸지 않는다(W8). "연출이 끝나면 다음 단계로" 같은 흐름을 만들지 않는다. 연출은 보이기만 하고 흐름은 지금처럼 입력과 오디오 클록이 정한다.
- 도마는 내용이 바뀔 때 통째로 다시 그려진다. 그래서 "줄어드는" 연출은 새로 그려진 요소에 "이전 크기에서 시작하는" 애니메이션을 거는 방식으로 만든다(직전의 폭 비율을 CSS 변수로 넘기고 `transform: scaleX()`로 시작한다).
- 동작 줄이기. P26의 `#app[data-motion]`과 기기 설정(`prefers-reduced-motion`)을 모두 따른다. 줄이기일 때는 모든 연출이 0ms다. "줄이지 않기"를 고르면 기기 설정이 줄이기여도 연출을 보여 준다.
- 도장 소리를 넣는다면 `burst()`로 만든다. 음높이가 있는 음을 더하지 않는다(R6).
- 프레임마다 하는 일은 지금처럼 커서의 `left` 한 번과, 바뀔 때만 하는 강조다. 프레임 함수에 일을 더하지 않는다.

끝나면 보고 (헌법 11절)
- `#test` 한 줄. 기대(P21과 같다):
  자가검사 51/51 (전체 51개 중 51개 작성) · TH 13/13 LB 6/6 JD 8/8 GN 6/6 AU 6/6 ST 5/5 SV 4/4 CT 3/3
- 고친 [그대로] 함수의 목록과 고친 줄
````

### 완료 기준

- [ ] T1. `index.html#test`의 첫 줄이 P21과 같다(`자가검사 51/51 …`).
- [ ] T2. 시간표의 아홉 가지가 보인다. 고르기(`#d0-01`), 재단의 칼집(`#d1-01`), 유령 빵(`#d3-02`의 오답), 재단 오답 표시, 썰기의 칼, 색 표시, 마감 화면의 도장과 새 카드.
- [ ] T3. 써는 동안 칼(커서)이 끊기지 않고 지나간다. 탭한 자리와 칼질이 그려지는 자리가 같다. 연출을 넣기 전보다 "늦음"이 늘지 않았다.
- [ ] T4. 설정의 동작 줄이기를 "줄이기"로 두면 모든 변화가 즉시 일어난다(E-08). 기기 설정에서 동작 줄이기를 켜고 게임 설정을 "기기 설정 따르기"로 두어도 같다.
- [ ] T5. 앱 코드의 `setTimeout`이 여전히 한 곳뿐이다. 세 크기에서 스크롤 0. (선택) `tools/check.mjs`가 "문제 0"이다.
- [ ] 사본을 남겼다(`P28 통과`).

---

## P29. 타이틀과 마감 화면 다듬기 [설계]

**목표.** 처음 화면을 가게 간판이 있는 타이틀로 만들고, 지도와 마감 화면의 모양을 마무리한다.

**설계서.** 8.2절(타이틀, 영업일 지도, 마감), 7.5절(마감 화면은 그날의 것만 보여 준다). AI에게 8.2절을 함께 준다.

````text
[P29 · SL8-3 · 타이틀과 마감 화면 다듬기]  종류: 설계

시작 전 상태
- `index.html#test`의 맨 윗줄이 아래와 같다. 사람이 다르다고 알려 주면 진행하지 않는다.
  자가검사 51/51 (전체 51개 중 51개 작성) · TH 13/13 LB 6/6 JD 8/8 GN 6/6 AU 6/6 ST 5/5 SV 4/4 CT 3/3

진행 방식
- 먼저 계획만 보고한다. 화면마다 (1) 바꾸는 HTML, (2) 바꾸는 CSS, (3) 고치는 함수. 사람이 "진행"이라고 하면 구현한다.

요구
1. 타이틀. 가게 간판(가게 이름과 4/4 박자표), 타이머 캐릭터, 단추 [영업 시작], [이어서 영업](하던 영업이 있을 때만), [레시피북], [자유 도마], [설정]. 주 단추는 [영업 시작]이고, 하던 영업이 있으면 [이어서 영업]이 주 단추다. 맨 아래에 버전 "v0.9"를 작게 적는다.
2. 소리. [영업 시작]을 포함해 어떤 단추든 처음 누를 때 소리가 풀린다. P10의 전역 언락이 이미 한다. 타이틀에 따로 언락 코드를 더하지 않는다.
3. 영업일 지도. 사다리 모양으로 0단이 맨 아래, 5단이 맨 위다. 단마다 이름, 도장, ● 수의 최고 기록, 잠긴 까닭. 다음에 할 단(열려 있고 아직 통과하지 않은 가장 낮은 단)을 눈에 띄게 한다.
4. 마감 화면. 그날의 것만 보여 준다. ● 수, 도장(P28의 연출), 새 카드(P28의 뒤집힘), 주문별 기록. 통과했으면 타이머가 기쁨, 못 했으면 갸웃 표정이고 [다시 영업]이 주 단추다. 통과했고 다음 영업일이 처음 열렸으면 [다음 영업일] 단추를 더한다.
5. 글자. 화면 글자는 해요체다. 이름과 수치는 엔진 함수로 만든다(W9).

지킬 것
- P22의 id(`#start`, `#resume`, `#days`, `#mapBack`, `#restart`, `#toTitle`, `#closeSum`, `#closeList`, `#closeStamp`, `#closeCards`)를 바꾸지 않는다.
- 통과와 잠금의 계산을 바꾸지 않는다.
- 세 크기에서 타이틀, 지도, 마감 화면에 화면 전체의 스크롤이 없다. 마감 화면의 목록만 안에서 스크롤한다.

끝나면 보고 (헌법 11절)
- `#test` 한 줄. 기대(P21과 같다):
  자가검사 51/51 (전체 51개 중 51개 작성) · TH 13/13 LB 6/6 JD 8/8 GN 6/6 AU 6/6 ST 5/5 SV 4/4 CT 3/3
````

### 완료 기준

- [ ] T1. `index.html#test`의 첫 줄이 P21과 같다(`자가검사 51/51 …`).
- [ ] T2. 저장을 비우면 타이틀의 주 단추가 [영업 시작]이고 [이어서 영업]이 없다. 영업 도중에 나왔다 오면 [이어서 영업]이 주 단추다.
- [ ] T3. 타이틀에서 [영업 시작]을 누르고 0단의 첫 주문을 납품하면 소리가 난다("소리 켜기"가 남아 있지 않다).
- [ ] T4. 지도에서 다음에 할 단이 눈에 띈다. 잠긴 단에 까닭이 적혀 있다.
- [ ] T5. 마감 화면이 통과했을 때와 못 했을 때 다르게 보인다. [다음 영업일]은 처음 열렸을 때만 나온다.
- [ ] T6. 세 크기에서 스크롤 0. 콘솔 오류가 없다.
- [ ] 사본을 남겼다(`P29 통과`).

---

## P30. 튜토리얼 [설계]

**목표.** 글로 된 안내 창 없이, 주문 안에서 한 번씩 손으로 해 보게 하는 안내를 넣는다.

**설계서.** 7.7절(튜토리얼), 6.5절(무음 스위치는 감지할 수 없다), 6.6절(첫 썰기 앞에서 박자 맞추기를 한 번 권한다). AI에게 7.7절을 함께 준다.

````text
[P30 · SL8-4 · 튜토리얼]  종류: 설계

시작 전 상태
- `index.html#test`의 맨 윗줄이 아래와 같다. 사람이 다르다고 알려 주면 진행하지 않는다.
  자가검사 51/51 (전체 51개 중 51개 작성) · TH 13/13 LB 6/6 JD 8/8 GN 6/6 AU 6/6 ST 5/5 SV 4/4 CT 3/3

진행 방식
- 먼저 계획만 보고한다. (1) 고칠 함수와 고치는 줄, (2) 새 함수의 이름과 들어갈 구획, (3) 새 id와 새 상태 필드, (4) 저장에 더하는 필드, (5) 헌법의 어느 규칙에 닿는지. 사람이 "진행"이라고 하면 구현한다.

요구(네 장면)
| 때 | 하는 일 | 배우는 것 |
|---|---|---|
| 0단을 처음 시작할 때 | 음 하나를 듣고 [들려요] [안 들려요]를 고른다 | 소리 확인 |
| `d0-01` | 선반의 줄을 가리킨다. 누르면 도마의 눈금을 가리킨다 | 줄을 누르면 덩이가 올라온다. 길이는 눈금으로 읽는다 |
| `d1-01`의 재단 | 빵을 가리킨다. 한 번 탭하면 사라진다 | 탭하면 칼집이 하나 는다 |
| `d1-01`의 썰기 | [기계 썰기]를 가리킨다. 기계가 끝나면 탭 패드를 가리킨다. 첫 결과가 나오면 박자 맞추기를 한 번 권한다 | 칼집 자리에서 탭한다. 첫 음은 저절로 난다 |

1. 소리 확인. 지도에서 0단을 처음 누르면 영업을 시작하기 전에 소리 확인 화면(`<section class="screen" id="soundScr" data-screen="sound" …>`)을 보여 준다. [소리 듣기]를 누르면 조각 음 하나가 난다(누른 처리기 안에서 `audio()`를 부르고 `tone()`으로 낸다). "소리가 들리나요?"에 [들려요]를 누르면 0단을 시작한다. [안 들려요]를 누르면 "무음 스위치와 음량을 확인해 주세요. 소리 없이도 고르기, 재단, 이름표는 할 수 있어요."와 [다시 듣기] [그냥 시작]을 보여 준다.
2. 말풍선. `#app` 안에 말풍선 하나(`#coach`)를 둔다. 가리킬 요소 옆에 놓고 짧은 문장 하나를 적는다. 진행을 막지 않는다. 화면을 덮는 창이나 어두운 가림막을 쓰지 않는다. 말풍선은 누르는 것을 가로채지 않는다(`pointer-events: none`). 박자 맞추기를 권할 때만 말풍선 안에 [해 볼게요] [나중에] 단추를 둔다.
3. 조건. 무엇을 가리킬지는 5 STATE 구획의 순수 함수 `coachFor(S, o, step)`가 정한다. 가리킬 대상의 이름과 문장을 돌려주거나, 보여 줄 것이 없으면 `null`을 돌려준다. `render()`의 끝에서 이 값을 읽어 말풍선의 글자와 자리만 바꾼다. 조건이 풀리면 사라진다. 시간이 지나서 사라지지 않는다(W8).
4. 진행 저장. 저장의 `settings`에 `tutorialStep`(0~4, 기본값 0)을 더한다. `defaultSave()`에 기본값을 넣고 `version`은 그대로 둔다(S6). 장면 하나를 마칠 때마다 1을 올리고, 4가 되면 `tutorialSeen`을 참으로 적는다. P26의 "튜토리얼 다시 보기"는 `tutorialStep`을 0으로, `tutorialSeen`을 거짓으로 되돌린다.
5. 개발용 바로가기(`S.dev`)에서는 소리 확인과 말풍선을 띄우지 않는다.
6. 문장(해요체. 고쳐도 된다):
   · "줄을 누르면 식빵이 도마에 올라와요." / "길이는 아래 눈금으로 읽어요."
   · "빵을 탭하면 칼집이 하나 늘어요."
   · "먼저 기계가 써는 걸 봐요." / "이제 따라 해요. 칼집 자리에서 탭해요. 첫 음은 저절로 나요."
   · "박자 맞추기를 해 볼까요?"

지킬 것
- 영업의 흐름(`FLOW`, `SUBS`, `T.*`)에 단계를 더하지 않는다. 튜토리얼은 흐름 밖에서 보이기만 한다. ST-01이 그대로 통과해야 한다.
- 말풍선을 놓으려고 도마를 다시 그리지 않는다. 포커스를 옮기지 않는다(R12).
- 말풍선 때문에 스크롤이 생기지 않는다. 조작부 94px가 변하지 않는다(R9).
- 문장에 음표 이름과 비율을 손으로 적지 않는다(W9).
- 검사와 `LOCK`을 고치지 않는다. SV 검사가 그대로 통과해야 한다(W3).

끝나면 보고 (헌법 11절)
- `#test` 한 줄. 기대(P21과 같다):
  자가검사 51/51 (전체 51개 중 51개 작성) · TH 13/13 LB 6/6 JD 8/8 GN 6/6 AU 6/6 ST 5/5 SV 4/4 CT 3/3
- 고친 [그대로] 함수의 목록과 고친 줄
````

### 완료 기준

저장을 비우고 시작한다.

- [ ] T1. `index.html#test`의 첫 줄이 P21과 같다(`자가검사 51/51 …`).
- [ ] T2. 지도에서 0단을 누르면 소리 확인 화면이 먼저 나온다. [소리 듣기]로 음 하나가 나고, [들려요]로 0단이 시작된다. [안 들려요]를 누르면 안내와 [그냥 시작]이 나온다.
- [ ] T3. 첫 주문에서 말풍선이 선반을 가리키고, 줄을 누르면 눈금을 가리키고, [확정]을 누르면 사라진다. 둘째 주문부터는 나오지 않는다.
- [ ] T4. 1단의 첫 주문 재단에서 말풍선이 빵을 가리키고 탭하면 사라진다. 썰기에서 [기계 썰기]를, 기계가 끝나면 탭 패드를 가리킨다. 첫 결과 뒤에 박자 맞추기를 한 번 권한다. [나중에]를 누르면 다시 권하지 않는다.
- [ ] T5. 말풍선이 떠 있어도 가리킨 요소와 다른 단추를 모두 누를 수 있다.
- [ ] T6. 0단과 1단을 다시 해도 튜토리얼이 나오지 않는다. 설정의 "튜토리얼 다시 보기"를 누르면 다시 나온다.
- [ ] T7. `index.html#d0-01`과 `#d1-01`(바로가기)에서는 나오지 않는다. (선택) `tools/check.mjs`가 "문제 0"이다.
- [ ] T8. 세 크기에서 말풍선이 화면 밖으로 나가지 않고 스크롤이 없다. 콘솔 오류가 없다.
- [ ] 사본을 남겼다(`P30 통과`).

---

## P31. 접근성 [설계]

**목표.** 키보드, 화면 읽기 프로그램, 동작 줄이기, 글자 확대에서 게임이 끝까지 되게 한다.

**설계서.** 8.6절(접근성), 8.5절(글자, 대비, 터치), 6.5절(소리 없이), 11.1절(E-06, E-08). AI에게 8.6절을 함께 준다.

````text
[P31 · SL8-5 · 접근성]  종류: 설계

시작 전 상태
- `index.html#test`의 맨 윗줄이 아래와 같다. 사람이 다르다고 알려 주면 진행하지 않는다.
  자가검사 51/51 (전체 51개 중 51개 작성) · TH 13/13 LB 6/6 JD 8/8 GN 6/6 AU 6/6 ST 5/5 SV 4/4 CT 3/3

진행 방식
- 먼저 `index.html`을 읽고 아래 요구마다 "이미 됨", "고쳐야 함"을 나눠 보고한다. "고쳐야 함"에는 고칠 줄과 방법을 적는다. 사람이 "진행"이라고 하면 구현한다.

요구
1. 키보드. Tab 순서가 화면의 위에서 아래, 왼쪽에서 오른쪽과 같다. 모든 단추에 `:focus-visible` 테두리가 보인다. 탭 없이 재단, 확정, 이름표, 썰기, 납품, 다음 주문, 지도, 레시피북, 자유 도마, 설정을 할 수 있다.
2. 포커스. 재단에서 덩이를 다시 그려도 포커스가 같은 덩이에 남는다(P07이 이미 한다). 썰기가 끝나도 포커스가 탭 패드에 남는다. 화면이 바뀌면 그 화면의 첫 단추나 제목으로 포커스를 옮긴다.
3. 이름. 덩이 단추("2번째 덩이, 칼집 2번. 누르면 하나 늘어요"), 선반의 줄(`aria-pressed`), 진행 점, 악보(`aria-label`)는 이미 있다. 아이콘만 있는 단추, 탭 패드, 지도의 잠긴 단, 레시피 카드에 이름을 더한다. 이름 속의 음표 이름과 수치는 엔진 함수로 만든다(W9).
4. 알림. 판독 줄은 `role="status"`이고 노드를 유지한 채 글자만 바꾼다(이미 그렇다). 주문 카드는 주문이 바뀔 때만 읽힌다. 준비 박 숫자와 "여기를 탭!"은 박마다 읽히지 않게 한다.
5. 소리 없이. 소리로 묻는 주문(0단의 마감 주문, 5단의 뒤 넷)에서 소리가 꺼져 있으면 [주문 듣기] 단추의 글자를 "소리 켜고 듣기"로 보여 준다. 누르면 소리가 켜지고 재생된다(고친다: `renderOrder()`가 단추의 글자를 정하는 한 줄). `orderText()`는 고치지 않는다.
6. 동작 줄이기. P28에서 했다. 다시 확인한다(E-08).
7. 글자 확대. 브라우저의 글자 크기를 130%로 해도 판독 줄이 3줄, 주문 카드가 3줄 안에 들어가고 다른 줄을 밀어내지 않는다. 글자가 잘리면 그 요소의 글자 크기나 줄 간격을 조정한다. 조작부 94px는 지킨다.
8. 색. 색만으로 뜻을 전하는 곳이 없는지 다시 본다. 두껍거나 얇은 조각의 색 표시는 결과 문구가 함께 말해 준다.

지킬 것
- `role`과 `aria-*`를 더하는 것 말고는 구조를 바꾸지 않는다. id와 class 이름을 바꾸지 않는다.
- 포커스를 옮기려고 타이머를 쓰지 않는다(W8).
- 검사와 `LOCK`을 고치지 않는다(W3).

끝나면 보고 (헌법 11절)
- `#test` 한 줄. 기대(P21과 같다):
  자가검사 51/51 (전체 51개 중 51개 작성) · TH 13/13 LB 6/6 JD 8/8 GN 6/6 AU 6/6 ST 5/5 SV 4/4 CT 3/3
- 요구 8가지 각각의 "이미 됨" 또는 "고쳤음"
````

### 완료 기준

- [ ] T1. `index.html#test`의 첫 줄이 P21과 같다(`자가검사 51/51 …`).
- [ ] T2. 마우스와 터치를 쓰지 않고 키보드만으로 지도에서 1단을 시작해 마감 화면까지 간다(E-06). 포커스가 어디 있는지 늘 보인다.
- [ ] T3. 화면 읽기 프로그램(VoiceOver나 TalkBack)으로 주문을 읽고, 재단하고, 확정하고, 납품한다. 못 했으면 `NOT_RUN`으로 적고 P32에서 한다.
- [ ] T4. 소리를 끈 채(`#d0-07`을 열고 아무것도 누르지 않은 상태) [주문 듣기] 자리에 "소리 켜고 듣기"가 보인다.
- [ ] T5. 브라우저 글자 크기 130%에서 `#d4-05`(문장이 가장 긴 주문)와 `#d3-02`의 이름표 오답 화면이 잘리지 않는다.
- [ ] T6. 동작 줄이기에서 연출이 0ms다(E-08).
- [ ] T7. 세 크기에서 스크롤 0. (선택) `tools/check.mjs`가 "문제 0"이다.
- [ ] 사본을 남겼다(`P31 통과`).

### 게이트 GSL8

- [ ] 화면에 임시 도형과 이모지가 없다.
- [ ] 화면 캡처 세트를 남겼다. 설계서 8.2절의 화면(타이틀, 영업일 지도, 영업, 발견 장면, 마감, 레시피북, 자유 도마, 설정)을 세 크기(320×568, 360×640, 390×844)로 찍는다.
- [ ] `docs/slice-gate-report.md`에 GSL8을 적었다. 여기서 v0.9를 배포한다.

---

# 11장. SL9 기기 확인과 정리 (v1.0)

## P32. 실기기 결과 반영 [설계]

**목표.** 실제 폰에서 재고 들은 결과로 음량, 빠르기, 허용폭을 조정한다. 사람이 먼저 재고, AI는 그 숫자를 받아 값을 고친다.

**설계서.** 11.3절(실기기 확인), 부록 A.3(폰에서 확인할 여섯 가지), 6.2절(음량), 4.6절(허용폭과 빠르기), 12장 위험 1, 6.

**먼저 사람이 할 일.** 아래 표를 채워 `docs/device-check.md`에 적는다. 못 한 칸은 `NOT_RUN`이다.

| # | 볼 것 | 어디서 | 적을 것 |
|---|---|---|---|
| 1 | 처음 누른 뒤 "소리 켜기"가 사라지고 바로 소리가 나는가 | iPhone Safari, `#d0-01`의 납품 | 예 / 아니요, 기종, iOS 버전 |
| 2 | 다른 앱에 30초 다녀온 뒤 썰기가 중단되고 "소리 켜기"가 뜨는가 | iPhone Safari, 썰기 도중 | 예 / 아니요 |
| 3 | 박자 맞추기의 결과값. 그 값으로 1박 덩이 3조각을 열 번 썬 등급 | Android Chrome, iPhone, 무선 이어폰 각각. `#d5-01` | 보정값(ms), 등급 열 개 |
| 4 | ♩=60으로 2 · 3 · 4 · 3을 이어 썰 수 있는가. "느리게"가 필요한가 | `#d4-05` | 예 / 아니요 |
| 5 | 조각 음이 메트로놈에 묻히지 않는가. 원래 소리의 길이가 귀로 가려지는가 | 폰 두 대 이상, `#d1-01`과 `#d0-07` | 예 / 아니요 |
| 6 | 폭 320~360px 폰에서 이름표 보기 3개와 선반의 줄을 누르기 쉬운가 | `#d3-02`, `#d0-01` | 예 / 아니요 |
| 7 | 틀과 유령 빵의 뜻이 설명 없이 짐작되는가 | 학습자, 2단과 3단 | 본 대로 |
| 8 | 써는 도중 끊김이 있는가 | 중급 폰 | 예 / 아니요 |
| 9 | 화면 읽기 프로그램으로 주문 읽기, 재단, 확정, 납품이 되는가 | VoiceOver, TalkBack | 예 / 아니요 |
| 10 | 홈 화면에 추가한 뒤 실행되는가 | iPhone | 예 / 아니요 |

````text
[P32 · SL9-1 · 실기기 결과 반영]  종류: 설계

시작 전 상태
- `index.html#test`의 맨 윗줄이 아래와 같다. 사람이 다르다고 알려 주면 진행하지 않는다.
  자가검사 51/51 (전체 51개 중 51개 작성) · TH 13/13 LB 6/6 JD 8/8 GN 6/6 AU 6/6 ST 5/5 SV 4/4 CT 3/3
- 사람이 잰 결과: (docs/device-check.md의 표를 여기에 붙인다)

진행 방식
- 결과를 읽고, 고칠 값마다 (1) 지금 값, (2) 바꿀 값, (3) 근거가 되는 측정, (4) 고치는 줄을 표로 보고한다. 측정이 없는 값은 바꾸자고 하지 않는다. 사람이 "진행"이라고 한 값만 고친다.
- 한 번에 한 가지 값만 바꾸고 사람이 다시 잰다.

고칠 수 있는 값과 자리
| 값 | 자리 | 함께 지킬 것 |
|---|---|---|
| 메트로놈의 음량 | `schedule()`의 `burst(…, e.strong ? 0.7 : 0.4)` | 조각 음을 가리면 메트로놈부터 내린다 |
| 조각 음과 원래 소리의 음량 | `addListen()`과 `planRun()`의 `peak`, `knifeSound()` | 음높이(MIDI 79, 67)는 바꾸지 않는다(R6, S7) |
| 마스터 음량의 기본값 | `defaultSave()`의 `volume` | |
| 빠르기 | 주문 씨앗의 `bpm`(기본 60, 8분음표 덩이 50), `bpmOf()`의 "느리게" 10 | GN-01(썰기 조각 150ms 이상)이 통과해야 한다 |
| 탭 보정의 범위 | P15와 P16의 −100, +200 | |
| 허용폭 | `judge()` 안의 `tol(pm, 0.15, 50, 120)`과 `tol(pm, 0.3, 90, 240)` | 아래 "허용폭을 바꿀 때"를 따른다 |
| 정지 감시의 시간 | `makeStall(800)`, `clockStuck`의 1200 | AU-05가 통과해야 한다 |
| 고르기 선반 줄의 높이 | CSS `.shelf.pick .srow`(44px), 좁음 모드 38px | 조작부 94px와 스크롤 0을 지킨다(R9) |

허용폭을 바꿀 때 (검사를 함께 고치는 드문 경우)
- 허용폭을 바꾸면 검사 JD-06, JD-07과 `LOCK.tol`이 실패한다. 이때는 검사가 틀린 것이 아니라 결정이 바뀐 것이다.
- 사람이 새 값을 정하면 (1) `judge()`의 숫자, (2) `LOCK.tol`, (3) JD-06과 JD-07의 기대값, (4) 헌법 8절의 허용폭 표와 7절의 공식을 한꺼번에 바꾼다.
- `docs/decisions.md`에 날짜, 옛 값, 새 값, 근거가 된 측정을 적는다.
- 이 경우 말고는 검사와 `LOCK`을 고치지 않는다(W3).

끝나면 보고 (헌법 11절)
- `#test` 한 줄. 기대(P21과 같다):
  자가검사 51/51 (전체 51개 중 51개 작성) · TH 13/13 LB 6/6 JD 8/8 GN 6/6 AU 6/6 ST 5/5 SV 4/4 CT 3/3
- 바꾼 값의 표(옛 값, 새 값, 근거)
````

### 완료 기준

- [ ] T1. `docs/device-check.md`에 표 열 줄이 채워져 있다(못 한 줄은 `NOT_RUN`).
- [ ] T2. 바꾼 값마다 측정 근거가 있다. 근거 없이 바뀐 값이 없다.
- [ ] T3. `index.html#test`의 첫 줄이 `자가검사 51/51 …`이다. 허용폭을 바꿨다면 JD-06, JD-07, `LOCK.tol`, 헌법의 표가 함께 바뀌었고 `docs/decisions.md`에 적혀 있다.
- [ ] T4. 바꾼 뒤 같은 기기에서 다시 쟀다.
- [ ] 사본을 남겼다(`P32 통과`).

---

## P33. 정리와 출시 [설계]

**목표.** 강사 검수를 반영하고, 오류 처리와 문서를 마무리하고, 완료 조건 13가지를 확인한 뒤 v1.0을 배포한다.

**설계서.** 9.6절(성능 예산), 9.7절(오류 처리), 10장 SL9, 11.4절(완료 조건), 12장 위험 3, 4.

**먼저 사람이 할 일(강사 검수).** 0~5단을 해 보고 아래를 `docs/review.md`에 적는다.

- 문구: 어색하거나 틀린 문장, 학습자가 못 알아들을 말.
- 주문 순서: 너무 쉽거나 갑자기 어려워지는 곳.
- 2단: 같은 주문이 이어져 지루한가(설계서 12장 위험 3. 주문 수를 7에서 5로 줄일지 정한다).
- 이름표 보기: 오답 보기가 그럴듯한가, 헷갈리게 하는가.

````text
[P33 · SL9-2 · 정리와 출시]  종류: 설계

시작 전 상태
- `index.html#test`의 맨 윗줄이 아래와 같다. 사람이 다르다고 알려 주면 진행하지 않는다.
  자가검사 51/51 (전체 51개 중 51개 작성) · TH 13/13 LB 6/6 JD 8/8 GN 6/6 AU 6/6 ST 5/5 SV 4/4 CT 3/3
- 강사 검수 결과: (docs/review.md를 여기에 붙인다. 없으면 "없음")

진행 방식
- 먼저 계획만 보고한다. 아래 요구마다 고칠 줄과 방법. 사람이 "진행"이라고 하면 구현한다.

요구
1. 검수 반영. 검수 결과에 있는 것만 고친다.
   · 문구를 고치면 CT-01~CT-03이 통과해야 한다. 이름과 수치는 엔진 함수로 만든다(W9)
   · 주문 문장(`orderText`), 주문의 수나 순서, 이름표 보기의 규칙을 바꾸는 것은 결정을 바꾸는 일이다. 사람이 정한 뒤에만 고치고, 그때는 씨앗과 `LOCK`(해당 표)과 검사의 기대값과 헌법 8절의 표를 한꺼번에 바꾸고 `docs/decisions.md`에 적는다
2. 오류 처리. 전역 오류(`error`, `unhandledrejection`)를 한 번 기록하고 화면에 "문제가 생겼어요"와 [새로고침] 단추를 보여 준다. 오류를 삼키지 않는다. 예상되는 실패(오디오 거부, 저장 실패, 소리 정지)는 지금처럼 그 자리에서 처리한다.
3. 임시로 둔 것. 화면의 "임시" 글자와 쓰지 않는 CSS를 지운다. 개발용 바로가기(`#d3-02`, `#S2`)와 `window.__sbg`, `window.__tests`, `#test`는 남긴다. 저장하지 않고, 점검 스크립트가 쓴다.
4. 버전. 타이틀과 설정 화면의 버전을 "v1.0"으로 적는다.
5. 성능. `index.html`이 300KB 이하다. 프레임마다 하는 일이 커서의 `left` 한 번이고 강조는 바뀔 때만 한다. 썰기 도중의 노드 생성은 탭마다 칼질 하나다.
6. 헌법 대조. S1~S11, R1~R14 스물다섯 줄 각각에 "지킴", "어김", "확인 못 함"으로 답한다. "어김"이 있으면 고치기 전에 보고한다.
7. 문서. `docs/tests.md`(검사 51개와 화면 점검 8개의 목록과 지금 결과), `docs/decisions.md`(바꾼 것과 이유), `docs/slice-gate-report.md`(GSL0~GSL9)를 정리한다.

지킬 것
- 새 기능을 더하지 않는다.
- 사람이 정하지 않은 값을 바꾸지 않는다(W3, W14).

끝나면 보고 (헌법 11절)
- `#test` 한 줄. 기대(P21과 같다. 결정을 바꿨다면 검사의 이름과 수가 같고 모두 통과해야 한다):
  자가검사 51/51 (전체 51개 중 51개 작성) · TH 13/13 LB 6/6 JD 8/8 GN 6/6 AU 6/6 ST 5/5 SV 4/4 CT 3/3
- 헌법 대조 스물다섯 줄의 답
- 파일 크기(KB)
````

### 완료 기준 (게이트 GSL9)

설계서 11.4절의 완료 조건이다. 전부 채워야 v1.0이다.

| # | 조건 | 확인하는 법 |
|---|---|---|
| SL-D01 | 검사 51개 전부 통과. 화면 점검 8개 통과 | `#test`, 부록 B의 화면 점검 표 |
| SL-D02 | 산출물은 `index.html` 하나. 외부 요청 0건 | 네트워크 탭, `tools/check.mjs` |
| SL-D03 | 320×568부터 430×932까지 영업 화면의 스크롤 0, 잘림 0 | `tools/check.mjs` 또는 손으로 |
| SL-D04 | 글자 12px 이상, 단추 44px 이상, 대비 4.5:1 이상 | `tools/check.mjs`, 대비 검사 도구 |
| SL-D05 | 여섯 영업일을 탭과 키보드 각각으로 완주 | 손으로 두 번 |
| SL-D06 | 화면의 음표 이름, 비율, 박 수가 전부 엔진 출력. 소스에 수치 표 없음 | TH-13, CT-01, CT-02 |
| SL-D07 | 풀 수 없는 주문 0. 일반 분할을 잇단음표라 부르는 문구 0 | GN-01, CT-03 |
| SL-D08 | 상태 대입은 `setState` 한 곳. 타이머로 음을 이어 붙이는 코드 0곳 | ST-02, P12의 1번 |
| SL-D09 | 썰기 결과와 무관하게 여섯 영업일을 통과할 수 있다 | 썰기를 모두 건너뛰고 완주 |
| SL-D10 | 소리가 멈추면 5초 안에 중단과 안내가 뜬다. 소리 없이 재단과 이름표를 끝낼 수 있다 | 다른 탭에 다녀오기, 음소거로 2단 하기 |
| SL-D11 | 실기기 확인 기록(기종, 날짜, 탭 보정값). 못 한 항목은 `NOT_RUN` | `docs/device-check.md` |
| SL-D12 | 화면에 임시 도형 0, 이모지 0 | 화면 캡처 세트 |
| SL-D13 | 강사 검수 기록(문구, 주문 순서, 이름표 보기) | `docs/review.md` |

- [ ] 열세 줄을 모두 확인했다. 못 한 줄은 `NOT_RUN`으로 적고 v1.0이라고 부르지 않는다.
- [ ] 14장의 절차로 배포했다. 배포한 주소에 `#test`를 붙여 `자가검사 51/51 …`을 확인했다.
- [ ] `docs/slice-gate-report.md`에 GSL9를 적었다.

---

# 12장. 새 세션 복원 프롬프트

AI와의 대화를 새로 열면 앞의 맥락이 사라진다. 아래 블록의 빈칸을 채우고, 맨 아래에 P00의 블록 전체를 붙여서 보낸다. 파일을 직접 고치는 도구에서는 P00을 붙이는 대신 "docs/constitution.md를 읽어라"라고 적는다.

````text
[복원]

1. 맨 아래에 붙인 헌법(P00)을 읽는다. 질문 11개에는 답하지 않아도 된다.

2. 지금 상태
- 끝낸 프롬프트: P__ (다음에 할 것: P__)
- `#test` 한 줄: (여기에 붙인다)
- `index.html`의 줄 수: 약 ____줄
- 열려 있는 문제: (없으면 "없음")
- 바꾼 결정: (docs/decisions.md의 요약. 없으면 "없음")

3. 할 일
- `index.html`을 읽고 아래를 확인해 보고한다. 코드를 고치지 않는다.
  (a) 구획 머리 12개가 차례로 있는가
  (b) 12 BOOT 구획의 마지막 줄이 `boot();`인가
  (c) 끝낸 프롬프트까지의 표지가 모두 있고, 그 뒤 프롬프트의 표지는 없는가

| 프롬프트 | 코드에 있어야 하는 표지 |
|---|---|
| P02 | `function makeStore(`, `function runTests(` |
| P03 | `function tupletSpec(`, `function judge(`, `const LOCK = {` |
| P04 | `const DAYS = [`, `function orderText(` |
| P05 | `const T = {`, `function dayScore(` |
| P06 | `function renderShelf(`, `window.__sbg = ` |
| P07 | `function buildScene(`, `function rulerHtml(` |
| P08 | `PAINT.mark = ` |
| P10 | `function planRun(`, `function schedule(` |
| P11 | `function begin(`, `function renderClose(` |
| P13 | `PAINT.slice = `, `let swallow = false` |
| P15 | `function setSetting(` |
| P18 | `PAINT.label = ` |
| P21 | `function applyDelivery(`, `function record(`, `function fromActive(` |

- 확인이 끝나면 "P__를 기다립니다"라고 적고 멈춘다.

(여기에 P00의 블록 전체를 붙인다)
````

### 완료 기준

- [ ] AI가 (a), (b), (c)에 모두 "예"라고 답했다.
- [ ] AI가 말한 "끝낸 프롬프트"가 내가 적은 것과 같다.
- [ ] `#test`를 직접 열어 본 줄이 내가 붙인 줄과 같다.

---

# 13장. 문제 해결 프롬프트 모음

완료 기준에서 걸리면 아래 틀에 표의 "지시"를 넣어 보낸다. 세 번 해도 안 되면 직전 사본으로 돌아가 그 프롬프트를 처음부터 다시 한다. [그대로] 프롬프트라면 손으로 붙인다.

````text
[문제 해결]

증상: (본 것을 그대로 적는다. 표의 "증상"과 같으면 그 말을 쓴다)
`#test` 한 줄과 실패 줄: (글상자의 내용을 붙인다)
콘솔 오류: (있으면 붙인다)
어디서: (주소와 누른 순서. 예: index.html#d3-02 → [+] 두 번 → [확정])

지시: (표의 "지시" 칸을 붙인다)

규칙
- 검사(11 TESTS)와 `LOCK`은 고치지 않는다(W3).
- 원인을 먼저 한 문장으로 말하고, 고칠 줄을 보여 준 뒤에 고친다.
- 이번 증상과 상관없는 곳을 고치지 않는다.
- 고친 뒤 헌법 11절의 양식으로 보고한다.
````

### 13.1 AI가 작업을 잘못했을 때

| 증상 | 원인 | 지시 |
|---|---|---|
| [그대로] 코드가 바뀌었다. 이름이 다르거나 "더 낫게" 고쳐져 있다 | AI가 W2를 어겼다 | 방금 넣은 코드 N을 지우고, 프롬프트의 코드 N을 한 글자도 바꾸지 말고 다시 넣어라. 넣은 뒤 프롬프트의 코드와 한 줄씩 견줘 다른 줄이 없는지 보고해라 |
| AI가 검사나 `LOCK`을 고쳤다. 또는 고치자고 한다 | W3 | 검사와 `LOCK`을 직전 상태로 되돌려라. 실패한 검사의 이름과 메시지를 읽고 앱 코드에서 원인을 찾아라 |
| `#test`의 검사 수가 줄었다(예: 43/43이어야 하는데 37/37) | 11 TESTS 구획의 코드 일부가 지워졌다 | 11 TESTS 구획에 `test("…")`가 몇 개 있는지 세고, 빠진 묶음이 어느 프롬프트의 코드인지 찾아라. 그 프롬프트의 검사 코드를 그대로 다시 넣어라 |
| 화면이 비고 콘솔에 "Cannot access '…' before initialization" | `boot();` 아래에 코드를 넣었다 | 12 BOOT 구획에서 `boot();` 줄 아래에 있는 코드를 `function boot()` 위로 옮겨라. `boot();`가 12 구획의 마지막 줄이어야 한다(W5) |
| 실패 줄에 "구획 머리 12개가 차례로 있어야 한다" | 구획 머리 주석이 지워졌거나 바뀌었다 | 구획 머리 12개를 헌법 6절의 모양 그대로 되살려라. 한 줄에 그 주석만 있어야 한다(W4) |
| ST-02 실패. "S에 값을 넣는 곳은 … 두 곳이어야 한다" 또는 "상태를 직접 고치는 코드" | `S = …`나 `S.x = …`를 더 썼다 | 실패 메시지에 나온 코드를 찾아 `setState({ … })`로 바꿔라. 계산부 안이라면 바꿀 값을 돌려주게 해라(W7) |
| TH-13 실패. "음표 이름을 손으로 적었다", "비율을 손으로 적었다", "길이를 소수로 적었다" | 앱 코드에 "8분음표", "셋잇단", "(3:2)", ".333" 같은 글자가 있다 | 실패 메시지에 나온 글자를 찾아 `noteKo()`, `nameKo()`, `labelKo()`, `splitKo()`, `beatsKo()`와 분수 계산으로 바꿔라(W9, R2). 주석에 적은 것은 괜찮다 |
| TH-13 실패. "게임 코드가 잠금 정답표(LOCK)를 읽는다" | 앱 코드가 `LOCK`을 썼다 | 앱 코드에서 `LOCK`을 쓰는 곳을 엔진 함수로 바꿔라. `LOCK`은 검사만 읽는다 |
| 콘솔에 "ST-01 허용하지 않는 전이: …" | 흐름 그림에 없는 전이를 만들었다 | 그 전이를 일으킨 처리기를 찾아라. `FLOW`와 `SUBS`를 고치지 말고 처리기가 계산부(`T.*`)를 거치게 고쳐라 |
| 파일의 줄 수가 크게 줄었다. 앞 프롬프트의 기능이 사라졌다 | AI가 파일을 통째로 다시 쓰다가 일부를 빠뜨렸다 | (AI에게 시키지 않는다) 직전 사본으로 돌아가 이번 프롬프트의 코드를 손으로 붙인다 |
| 이번 프롬프트에 없는 기능이 생겼다 | W1 | 이번 프롬프트의 범위 밖에서 바꾼 것을 모두 되돌려라 |
| 앱 코드에 `setTimeout`이나 `setInterval`이 늘었다 | 음이나 연출이나 상태를 타이머로 이었다 | 그 타이머를 지워라. 음은 `schedule()`로 한 번에 예약하고, 화면의 변화는 프레임 함수가 `clock()`을 읽어 만들고, 연출은 CSS로 한다(R5, W8) |
| [설계] 프롬프트 뒤에 `51/51`이 깨졌다 | 고치면 안 되는 [그대로] 함수를 고쳤다 | 실패한 검사의 메시지를 읽고, 이번에 고친 [그대로] 함수를 직전 상태로 되돌린 뒤 다른 방법을 계획으로 보고해라 |

### 13.2 화면

| 증상 | 원인 | 지시 |
|---|---|---|
| 조각의 끝이 덩이와 1px 어긋난다 | px를 누적했다 | 조각과 칼집의 자리를 `i/n × 100%`로 줘라(W10) |
| 유령 빵이 도마 밖으로 넘친다 | 배율을 덩이에 고정했다 | `laneScale()`의 `span`이 덩이, 유령 빵, 이어 붙인 줄 가운데 가장 긴 박 수가 되게 하고, 모든 폭을 그 `span`으로 나눠라(R1) |
| 단계가 바뀔 때마다 화면이 들썩인다 | 조작부의 높이가 내용에 따라 바뀐다 | 조작부를 94px로 고정하고, 단계별 묶음은 `hidden`으로만 바꿔라(R9) |
| 재단 중에 키보드 포커스가 사라진다 | 도마를 다시 그린 뒤 포커스를 돌려주지 않았다 | `buildBoard()`가 다시 그리기 전에 포커스가 있던 덩이의 번호를 적어 두고, 그린 뒤 같은 덩이에 `focus()`를 줘라 |
| 써는 도중 칼질 표시가 사라지거나 깜빡인다 | 썰기 도중에 도마를 다시 만들었다 | `renderBoard()`가 열쇠가 같으면 `buildBoard()`를 부르지 않게 하고, 프레임 함수가 `setState`를 준비 박 숫자나 단계가 바뀔 때만 부르게 해라(R12) |
| 한글이 낱말 중간에서 줄바꿈된다 | 기본 줄바꿈 | `body`에 `word-break: keep-all`이 있는지 보고 되살려라 |
| 좁은 화면에서 HUD가 넘친다 | 제목, 진행 점, 소리 켜기, 설정이 한 줄 | 소리 켜기가 보이는 동안 폭 420px 미만에서 제목을 숨겨라(`.hud.nosound strong`) |
| 눕힌 폰에서 도마가 잘린다 | 높이가 550px 미만 | `measure()`가 높이 550px 미만에서 `#rotate`("세로로 돌려 주세요")를 보이게 해라 |
| 영업 화면이 스크롤된다 | 줄을 더했거나 높이를 바꿨다 | 여섯 줄 틀의 높이와 조작부 94px를 P01의 CSS로 되돌리고, 더한 요소를 줄 안으로 넣어라(R9) |
| 이름표 보기 3개가 320px 폭에서 두 줄이 된다 | 보기 단추의 폭이나 글자가 커졌다 | 보기 단추를 3칸 격자로 두고 이름 글자를 12px로 되돌려라 |

### 13.3 소리와 썰기

| 증상 | 원인 | 지시 |
|---|---|---|
| 탭이 늘 늦다고 나온다 | 커서와 판정의 시계가 다르다. 또는 기기의 지연 | `frame()`과 `tap()`이 모두 `clock()`을 쓰는지 확인해라. 같다면 코드가 아니라 기기의 지연이다. 박자 맞추기(P16)로 탭 보정을 정한다 |
| 썰기가 끝나지 않고 "여기를 탭!"에서 굳는다 | 소리 시계가 멈췄다 | 정지 감시(`makeStall`)가 `frame()`에서 불리고 `abortRun()`으로 이어지는지 확인해라(R13) |
| 다음 주문에서 "썰기 시작"이 눌리지 않는다 | 재시작 보호가 남아 있다 | 주문이나 단계가 바뀔 때 `endedAt`이 처음 값으로 돌아가는지 확인해라(`fresh()`, `toSlice()`). ST-04가 이것을 본다 |
| 썰기가 끝나자마자 다시 시작된다 | 손을 뗄 때의 `click`, 키를 뗄 때의 기본 동작 | `swallow`, 끝난 뒤 0.6초 보호(`restartBlocked`), `keyup` 처리기가 있는지 확인하고 P13의 코드로 되돌려라 |
| 빨리 누르면 음이 겹친다 | 앞선 예약을 취소하지 않았다 | `begin()`이 새로 예약하기 전에 `stopRun()`을 부르고, `stopRun()`이 `AUDIO.group.silence()`를 부르게 해라(R5) |
| 아이폰에서 첫 탭에 소리가 없다 | 언락이 재생 단추에만 걸려 있다 | `click`, `touchstart`, `keydown` 세 가지에 전역으로 `audio()`를 걸고, 컨텍스트가 `running`이 아니면 "소리 켜기"를 보여 줘라(S8, R13) |
| 다른 앱에 다녀오면 소리 없이 화면만 계속 간다 | 중단 처리가 빠졌다 | `visibilitychange`와 컨텍스트의 `statechange`가 `abortRun()`으로 이어지게 해라(R13) |
| 온음표 2조각에서 크게 어긋나도 "장인"이 뜬다 | 허용폭에 천장이 없다 | `judge()`의 `tol()`이 천장 120ms, 240ms를 쓰는지 확인하고 P03의 코드로 되돌려라 |
| 8분음표 덩이 썰기가 너무 빠르다 | ♩=60을 그대로 썼다 | 8분음표 덩이 주문의 씨앗에 `bpm: 50`이 있는지, `bpmOf()`가 그 값을 쓰는지 확인해라 |
| 소리 주문에서 답이 둘로 보인다 | 리듬만 들려줬다 | 주문 듣기의 계획이 원래 소리 → 조각 리듬 순서인지 확인해라(`planRun("hear", …)`의 `passes`가 2) |
| 조각 음이 메트로놈에 묻힌다 | 음량의 균형 | P32의 표를 따라 메트로놈의 음량부터 내려라. 폰에서 다시 듣고 정한다 |
| 준비 박 뒤에 칼이 한 박 늦게 출발한다 | 본 구간의 시작 `tb0`을 잘못 계산했다 | `tb0 = t0 + 준비 박 × 한 박의 초`인지, 커서와 예약이 같은 `t0`을 쓰는지 확인해라 |

### 13.4 이론과 문구

| 증상 | 원인 | 지시 |
|---|---|---|
| 2박 3조각이 "8분음표 셋잇단"으로 나온다 | 표기 음표를 8분음표로 고정했다 | 표기 음표 = 덩이 ÷ 보통 칸 수다. `tupletSpec()`을 P03의 코드로 되돌려라 |
| 4조각 주문에 "넷잇단음표"라고 나온다 | 잇단 여부를 보지 않았다 | `n ≠ m`일 때만 잇단음표다. 아니면 "일반 분할"이다. `nameKo()`와 `ratioKo()`를 P03, P04의 코드로 되돌려라(S11) |
| 3조각 주문에 칼집 3번이 정답이 된다 | 조각 수와 칼집 수를 섞었다 | 칼집 = 조각 − 1이다. `T.confirmMark()`의 비교(`S.cuts[q] + 1 !== n`)를 확인해라(R4) |
| 이름표 보기의 순서가 열 때마다 바뀐다 | `Math.random()`으로 섞었다 | `choicesOf()`가 `shuffled(…, 7 * o.no + 3)`을 쓰게 되돌려라. LB-06이 이것을 본다 |
| 일반 분할 주문의 오답에 "숫자가 있어야 들어가요."가 붙는다 | 문구의 조건이 틀렸다 | `T.choose()`에서 이 문구는 정답이 잇단이고 고른 보기에 숫자가 없을 때만 붙는다. 그 밖에는 "보통 칸의 이름을 보세요."다 |
| 주문 문장의 조사가 어색하다("3를") | 숫자 뒤의 조사를 고정했다 | `josa()`로 받침 있는 숫자와 없는 숫자를 가려라 |
| 선반 이름표가 답을 알려 준다 | D12를 지키지 않았다 | `shelfLabel()`이 박 수로 묻는 주문에서는 이름만, 이름으로 묻는 주문에서는 박 수만 보이게 해라 |

---

# 14장. 배포

설계서 D10의 권장안(새 GitHub 저장소 + Vercel 정적 배포)이다. 빌드 단계가 없다. P22(v0.6), GSL7(v0.8), GSL8(v0.9), P33(v1.0)에서 쓴다.

1. GitHub에 새 저장소를 만든다. `index.html`을 저장소의 맨 위에 둔다. `docs/`와 `tools/`는 함께 올려도 된다.
2. 저장소에 `public`이라는 폴더를 만들지 않는다. Vercel은 프레임워크가 없는 프로젝트에서 `public` 폴더가 있으면 그 폴더를, 없으면 저장소의 맨 위를 내보낸다.
3. Vercel에서 그 저장소를 가져와 프로젝트를 만든다. 프레임워크는 고르지 않고(Other), 빌드 명령은 비워 두고, 출력 폴더는 기본값으로 둔다.
4. 배포가 끝나면 받은 주소 끝에 `#test`를 붙여 연다. 첫 줄이 `자가검사 51/51 …`이어야 한다. 폰에서도 연다.
5. 그 뒤로는 기본 브랜치에 올릴 때마다 다시 배포된다. 프롬프트마다 커밋은 하되, 게이트를 통과한 것만 기본 브랜치에 올린다. 게이트마다 태그(`v0.6`, `v0.8`, `v0.9`, `v1.0`)를 붙인다.
6. "외부 요청 0건"은 정식 주소(프로덕션)에서 확인한다. 미리보기 주소에는 Vercel 도구 막대의 스크립트(`vercel.live`)가 끼어들 수 있다.

Vercel의 화면 이름은 바뀔 수 있다. 2번과 3번의 근거는 Vercel 문서의 프로젝트 설정 항목(`vercel.com/docs/project-configuration`)이다.

### 완료 기준

- [ ] 배포한 주소에서 타이틀이 뜬다.
- [ ] 주소 끝에 `#test`를 붙이면 `자가검사 51/51 …`이다.
- [ ] 폰에서 열어 0단의 첫 주문을 납품했다. 소리가 난다.
- [ ] 개발자 도구의 네트워크 탭에 `index.html` 말고 다른 요청이 없다(프로덕션 주소).

---

# 부록 A. 게이트 보고 양식

게이트를 닫을 때마다 아래 블록을 `docs/slice-gate-report.md`에 더한다. 돌리지 못한 항목은 `NOT_RUN`으로 적는다. 통과하지 못한 것을 `PASS`로 적지 않는다.

```yaml
GATE_REPORT:
  gate: GSL4
  date: 2026-00-00
  status: PASS            # 또는 PARTIAL / FAIL
  tests: { TH: 13/13, LB: 6/6, JD: 8/8, GN: 6/6, AU: 6/6, ST: 4/5, SV: 4/4, CT: 3/3 }
  viewports: [320x568, 360x640, 390x844]     # 실제로 본 크기만
  external_requests: 0
  file_bytes: 0
  device_check: NOT_RUN   # 실기기로 확인했으면 기종과 날짜
  open_issues: []
```

| 게이트 | 닫는 곳 | 조건 | 그때의 `#test` |
|---|---|---|---|
| GSL0 | P02 뒤 | 빈 틀이 화면 7종에서 스크롤 0. SV 4/4 | 5/5 |
| GSL1 | P05 뒤 | TH 12/13(TH-12는 P07), LB 6/6, JD 8/8, GN 6/6. TH-13 통과 | 43/43 |
| GSL2 | P09 뒤 | E-01, E-02, E-03, E-05. 재단 도중 포커스 유지 | 44/44 |
| GSL3 | P12 뒤 | AU 6/6. 타이머로 음을 잇는 코드 없음. 실기기 청취 또는 NOT_RUN | 50/50 |
| GSL4 | P16 뒤 | 썰기 항목 통과. 실기기에서 1박 덩이 3조각 열 번의 등급과 탭 보정값 또는 NOT_RUN | 50/50 |
| GSL5 | P18 뒤 | 320px 폭에서 보기 3개가 한 줄. CT 3/3 | 50/50 |
| GSL6 | P22 뒤 | 0단부터 2단 마감까지 완주. 새로고침 뒤 같은 주문에서 이어진다. 첫 배포(v0.6) | 51/51 |
| GSL7 | P26 뒤 | 여섯 영업일 완주. 검사 51개 전부 통과 | 51/51 |
| GSL8 | P31 뒤 | 임시 도형과 이모지 0. 화면 캡처 세트 | 51/51 |
| GSL9 | P33 뒤 | 완료 조건 SL-D01~SL-D13 | 51/51 |

---

# 부록 B. 검사 51개와 화면 점검 8개

### B.1 페이지 안의 검사 51개

`index.html#test`에서 돈다. "들어오는 프롬프트"는 그 검사의 코드가 들어오는 [그대로] 프롬프트다.

| 검사 | 내용 | 들어오는 프롬프트 |
|---|---|---|
| TH-01 | 조각 길이의 합 = 덩이(분수 일치) | P03 |
| TH-02 | 보통 칸 수 × 표기 음표 = 덩이 | P03 |
| TH-03 | 칼집 n−1개, 음 시작 n개 | P03 |
| TH-04 | 잠금 정답표의 분할 11가지 | P03 |
| TH-05 | 4분음표 덩이의 5조각과 7조각은 16분음표 5:4, 7:4 | P03 |
| TH-06 | 2조각과 4조각은 잇단음표가 아니다 | P03 |
| TH-07 | 점4분음표 덩이: 2조각 2:3, 3조각 일반, 4조각 4:3 | P03 |
| TH-08 | m을 명시하면 그 비율을 쓴다(5:6) | P03 |
| TH-09 | 홑박자의 잇단 조각은 표기 음표보다 짧다 | P03 |
| TH-10 | 주파수 공식 | P03 |
| TH-11 | 덩이의 박 수와 ♩=60에서 1박 = 1초 | P03 |
| TH-12 | 한 영역 한 배율: 길이가 2배면 폭도 2배, 유령 빵이 길면 덩이가 줄어든다 | P07 |
| TH-13 | 앱 코드에 음표 길이·비율·이름의 표가 없다 | P03 |
| LB-01 | 정답 이름표의 전체 시간 = 덩이 | P03 |
| LB-02 | 오답 보기 둘은 전체 시간이 덩이와 다르고 서로 다르다 | P03 |
| LB-03 | 잇단 분할의 오답: 숫자를 뺀 것, 음표가 8분음표 쪽으로 한 단계인 것 | P03 |
| LB-04 | 일반 분할의 오답: 한 단계 긴 음표, 한 단계 짧은 음표 | P03 |
| LB-05 | 4분음표 셋잇단 = 2박, 8분음표 3개 = 3/2박 | P03 |
| LB-06 | 보기 순서는 주문마다 정해져 있고 정답 자리가 고루 나온다 | P04 |
| JD-01 | 정확한 탭 → 조각 수 맞음, 장인 | P03 |
| JD-02 | 박 위의 탭은 칼질로 세지 않는다 | P03 |
| JD-03 | 칼질이 모자라면 조각 수가 다르다 | P03 |
| JD-04 | 120ms 늦은 탭 → 등급이 내려가고 앞 조각이 두껍다 | P03 |
| JD-05 | 연속(2 · 3 · 4 · 3)의 정확한 탭 → 장인 | P03 |
| JD-06 | 허용폭의 바닥과 천장 | P03 |
| JD-07 | 조각 2초: +100ms 장인, +200ms 고른 편, +300ms 들쭉날쭉 | P03 |
| JD-08 | 박자 보정은 가운데 값, 탭 4개 미만이면 null | P03 |
| GN-01 | 주문 43개를 모두 풀 수 있다 | P04 |
| GN-02 | 영업일별 주문 수와 통과 기준 | P04 |
| GN-03 | 분할 11가지가 한 번 이상 나오고 처음 나오는 주문이 정답표와 같다 | P04 |
| GN-04 | 마감 주문은 영업일의 마지막이고 도움이 꺼져 있다 | P04 |
| GN-05 | 썰기에 놓는 덩이 수 | P04 |
| GN-06 | 주문 문장은 씨앗에서 만들어진다 | P04 |
| AU-01 | 조각 음 783.99Hz, 원래 소리 392.00Hz | P10 |
| AU-02 | 듣기의 예약 시각: 원래 소리 → 조각 리듬 | P10 |
| AU-03 | 새 재생을 시작하면 앞선 예약이 시작 전에 취소된다 | P10 |
| AU-04 | 연속 듣기: 원래 소리 4번, 조각 음 12번 | P10 |
| AU-05 | 소리 시계가 멈추면 중단하고 "소리 켜기"를 보여 준다 | P10 |
| AU-06 | 기계 썰기의 칼 소리 시각 = 칼집 시각 | P10 |
| ST-01 | 허용 전이표와 주문 43개의 단계 순서 | P05 |
| ST-02 | 상태 대입은 setState 한 곳 | P02 |
| ST-03 | 2차 오답이면 고쳐 주고 진행한다. 레시피는 ◐, 그 주문은 마감 앞에 한 번 더 나온다 | P05 |
| ST-04 | 재시작 보호는 같은 썰기 안에서만 듣는다 | P05 |
| ST-05 | 이어하기: 주문 순번과 결과를 되살린다 | P21 |
| SV-01 | 저장 version 1 왕복 | P02 |
| SV-02 | 손상·미래 버전이면 기본값으로 시작하고 원본을 남긴다 | P02 |
| SV-03 | 저장소를 쓸 수 없으면 메모리로 이어 간다 | P02 |
| SV-04 | 레시피 열쇠 "4/3"의 저장 왕복 | P02 |
| CT-01 | 문구의 음표 이름과 비율은 엔진 출력과 같다 | P05 |
| CT-02 | 오답 문구와 유령 빵의 박 수는 엔진 계산과 같다 | P05 |
| CT-03 | 일반 분할을 잇단음표라고 부르는 문구가 없다 | P05 |

묶음별 수: TH 13, LB 6, JD 8, GN 6, AU 6, ST 5, SV 4, CT 3. 합계 51.

### B.2 화면 점검 8개

손으로 하거나 부록 D의 스크립트로 한다.

| 번호 | 내용 | 확인하는 곳 |
|---|---|---|
| E-01 | 화면 7종의 모든 단계에서 스크롤 0, 잘림 0 | P09의 T2, T4. 그 뒤 화면을 바꾼 프롬프트마다 |
| E-02 | 글자 12px 이상, 단추 44px 이상(좁음 모드의 고르기 줄 38px 제외) | P09의 T3, T4 |
| E-03 | 조작부 94px, 단계가 바뀌어도 줄이 움직이지 않는다 | P09의 T2, T4 |
| E-04 | 탭 → 칼질 표시, 색 표시, 결과 문구 | P13의 T3~T5, P14의 T2 |
| E-05 | 유령 빵이 길면 덩이가 줄고 눈금이 늘어난다 | P07의 T4, P18의 T5 |
| E-06 | 키보드만으로 주문 하나를 끝낸다 | P13의 T6, P23의 T6, P31의 T2 |
| E-07 | 외부 요청 0건, 콘솔 오류 0 | 프롬프트마다. 14장 |
| E-08 | 동작 줄이기에서 연출 0ms | P28의 T4, P31의 T6 |

---

# 부록 C. 프롬프트와 설계서 대응표

| 프롬프트 | 설계서의 절 |
|---|---|
| P00 | 0장(용어), 2.5절, 3.2절(R1~R14), 4.6절, 4.8절, 5.2절, 6.2~6.5절, 9.1~9.2절, 10.0절, 부록 B, 부록 D |
| P01 | 8.1절, 8.3절(색 토큰), 9.1절, 9.2절 |
| P02 | 9.4절, 9.5절, 11.1절(ST-02, SV) |
| P03 | 5장, 4.5절, 4.6절, 부록 B, 부록 C.1~C.3, 11.1절(TH, LB, JD) |
| P04 | 7.1~7.4절, 4.2절, D12, 11.1절(GN, LB-06) |
| P05 | 4.3~4.5절, 4.7~4.9절, 7.2절, 7.5절, 11.1절(ST-01, ST-03, ST-04, CT) |
| P06 | 4.1절, 4.3절, 8.1절, 9.3절 |
| P07 | R1, R12, 4.3절, 4.4절, 7.4절, 9.3절, 11.1절(TH-12) |
| P08 | 4.4절, 4.9절, R4, R14 |
| P09 | 2.2절, 11.1절(E-01, E-02, E-03, E-05), GSL2 |
| P10 | 6.1~6.5절, 11.1절(AU), 11.2절 |
| P11 | 4.7절, 6.3절, 6.4절, 6.5절, 7.4절 |
| P12 | 6장, 11.2절, 11.3절, GSL3 |
| P13 | 4.6절, 4.9절, 4.10절, 부록 C.7 |
| P14 | 4.6절, 11.1절(E-04, E-06), 12장 위험 1, 2 |
| P15 | 4.10절, 6.6절 5번, 8.2절, 9.4절 |
| P16 | 6.6절, 12장 위험 1, GSL4 |
| P17 | 5.4절, 4.7절, 부록 C.4 |
| P18 | 4.5절, 4.9절, 8.5절, 부록 B.3, GSL5 |
| P19 | 4.8절, 7.2절, 7.3절, 7.5절 |
| P20 | 7.4절 |
| P21 | 7.5절, 9.4절, 11.1절(ST-05) |
| P22 | 7.2절, 7.5절, 8.2절, 9.8절, 12장 위험 12, GSL6 |
| P23 | 4.2절, 4.3절, 7.3절, 7.4절 |
| P24 | 7.5절, 8.2절, 7.4절 |
| P25 | 7.6절, 기획안 별첨 1 |
| P26 | 8.2절, 9.4절, 9.5절, GSL7 |
| P27 | 8.3절, D9, D11 |
| P28 | 8.4절, 11.1절(E-08) |
| P29 | 8.2절, 7.5절 |
| P30 | 7.7절, 6.5절, 6.6절 |
| P31 | 8.5절, 8.6절, GSL8 |
| P32 | 11.3절, 부록 A.3, 6.2절, 4.6절 |
| P33 | 9.6절, 9.7절, 11.4절, 12장, GSL9 |

---

# 부록 D. 자동 화면 점검 스크립트 (선택)

Node.js가 있으면 아래 파일을 `tools/check.mjs`로 저장해 쓴다. 게임에는 들어가지 않는다. P08부터 쓸 수 있다.

```text
준비(한 번):  npm i -D playwright  그리고  npx playwright install chromium
실행:         node tools/check.mjs index.html
```

하는 일은 세 가지다. 자가검사 한 줄을 읽고, 화면 7종에서 주문과 단계 51곳의 스크롤, 잘림, 가장 작은 글자, 가장 작은 단추, 조작부 높이를 재고, 콘솔 오류와 외부 요청을 센다. 문제가 없으면 아래처럼 나온다(P21 뒤의 결과). 화면 7종을 도는 데 1~2분이 걸린다.

```text
자가검사 51/51 (전체 51개 중 51개 작성) · TH 13/13 LB 6/6 JD 8/8 GN 6/6 AU 6/6 ST 5/5 SV 4/4 CT 3/3
320×568: 잰 곳 51 · 문제 0 · 도마 123~219px · 가장 작은 글자 12px · 가장 작은 단추 38px
360×600: 잰 곳 51 · 문제 0 · 도마 155~251px · 가장 작은 글자 12px · 가장 작은 단추 38px
360×640: 잰 곳 51 · 문제 0 · 도마 136~246px · 가장 작은 글자 12px · 가장 작은 단추 44px
390×664: 잰 곳 51 · 문제 0 · 도마 160~270px · 가장 작은 글자 12px · 가장 작은 단추 44px
390×844: 잰 곳 51 · 문제 0 · 도마 340~340px · 가장 작은 글자 12px · 가장 작은 단추 44px
430×932: 잰 곳 51 · 문제 0 · 도마 340~340px · 가장 작은 글자 12px · 가장 작은 단추 44px
800×600: 잰 곳 51 · 문제 0 · 도마 155~251px · 가장 작은 글자 12px · 가장 작은 단추 38px
콘솔 오류 0건 · 외부 요청 0건
```

문제가 있으면 그 화면의 줄 아래에 `✗ d3-02 유령 빵 하나 {…}`처럼 자리와 잰 값이 나온다. 바로가기(`#d0-01` 등)가 영업 화면을 열지 못하면 그 줄 끝에 "건너뜀"이 붙는다. 그것도 문제다. [설계] 프롬프트에서 화면을 바꾼 뒤에는 꼭 돌려 본다.

```js
// 자동 화면 점검(선택). 쓰는 법: node tools/check.mjs [index.html 경로]
// 준비: npm i -D playwright && npx playwright install chromium  (설치된 크롬을 쓰려면 CHROME=/경로/chrome)
// 하는 일: ① 자가검사 한 줄 ② 화면 7종에서 주문·단계마다 스크롤, 잘림, 글자, 단추 재기 ③ 콘솔 오류와 외부 요청 세기
import { chromium } from "playwright";
import { pathToFileURL } from "node:url";
const URL = pathToFileURL(process.argv[2] || "index.html").href;
const VIEWPORTS = [[320, 568], [360, 600], [360, 640], [390, 664], [390, 844], [430, 932], [800, 600]];
const WALK = [                                 // [바로가기, 차례로 할 일]. m:이름 = 그 자리에서 잰다
  ["d0-01", ["m:빈 도마", "pick:1", "ok", "m:고르기 오답", "pick:4", "ok", "m:납품"]],
  ["d0-04", ["m:이름으로 묻기", "pick:4", "m:올림"]],
  ["d0-05", ["m:이어 붙이기", "pick:1", "m:견주기", "pick:2", "ok", "m:납품"]],
  ["d0-07", ["pick:8", "ok", "m:유령 빵", "pick:1", "m:온음표와 유령 빵"]],
  ["d1-01", ["cut:2", "mark", "m:재단 오답", "tap:#minus", "mark", "m:썰기", "ship", "m:납품"]],
  ["d1-03", ["cut:1", "mark", "ship", "m:온음표 납품"]],
  ["d1-04", ["cut:6", "m:칼집 6", "mark", "mark", "mark", "m:썰기 16조각", "ship", "m:납품"]],
  ["d1-06", ["cut:1", "mark", "m:8분음표 덩이 썰기"]],
  ["d2-02", ["cut:2", "m:틀", "mark", "m:숫자 질문", "tap:#no", "m:질문 오답", "tap:#yes", "m:썰기", "ship", "m:납품"]],
  ["d3-02", ["cut:2", "mark", "m:보기", "wrong", "m:유령 빵 하나", "wrong", "m:유령 빵 둘", "right", "m:썰기", "ship", "m:납품"]],
  ["d3-03", ["cut:2", "mark", "wrong", "m:유령 빵 하나", "wrong", "m:유령 빵 둘"]],
  ["d3-04", ["cut:2", "mark", "wrong", "m:유령 빵 하나", "wrong", "m:유령 빵 둘"]],
  ["d3-05", ["cut:3", "mark", "wrong", "m:유령 빵 하나", "wrong", "m:유령 빵 둘"]],
  ["d4-05", ["m:연속", "loaf:0", "loaf:1", "loaf:1", "loaf:2", "loaf:2", "loaf:2", "loaf:3", "m:재단", "mark", "m:연속 오답", "loaf:3", "mark", "m:썰기", "ship", "m:납품"]],
  ["d5-02", ["m:악보", "pick:4", "ok", "m:유령 빵", "pick:1", "m:온음표와 유령 빵", "pick:2", "ok", "cut:2", "m:재단", "mark", "ship", "m:납품"]],
  ["d5-04", ["pick:8", "ok", "m:유령 빵 4박"]], ["d5-08", ["pick:4", "ok", "m:소리 주문 유령 빵"]],
  ["S1", ["m:발견 장면"]], ["S2", ["m:발견 장면"]], ["S3", ["m:발견 장면"]], ["S4", ["m:발견 장면"]], ["d3-08", ["m:주문 8개의 HUD"]],
];
const MEASURE = () => {
  const app = document.getElementById("app"), de = document.documentElement, vis = (e) => { const r = e.getBoundingClientRect(); return r.width > 0 && r.height > 0; };
  const fonts = [], tw = document.createTreeWalker(app, NodeFilter.SHOW_TEXT);
  for (let n = tw.nextNode(); n; n = tw.nextNode()) { const p = n.parentElement; if (n.textContent.trim() && p && vis(p)) fonts.push(parseFloat(getComputedStyle(p).fontSize)); }
  const btn = [...app.querySelectorAll("button")].filter((b) => vis(b) && !b.disabled && !b.classList.contains("loaf")).map((b) => { const r = b.getBoundingClientRect(); return Math.round(Math.min(r.width, r.height)); });
  const board = document.getElementById("board"), fit = (sel) => [...document.querySelectorAll(sel)].every((e) => !e.textContent || e.scrollWidth <= e.clientWidth + 1), h = (id) => Math.round(document.getElementById(id).getBoundingClientRect().height);
  return { scroll: Math.max(de.scrollWidth - innerWidth, de.scrollHeight - innerHeight), clip: Math.max(board.scrollHeight - board.clientHeight, document.getElementById("order").scrollHeight - document.getElementById("order").clientHeight, document.getElementById("hud").scrollWidth - document.getElementById("hud").clientWidth),
    font: fonts.length ? Math.min(...fonts) : 99, btn: btn.length ? Math.min(...btn) : 99, fit: fit("#board .slice") && fit(".mold span") && fit(".cap") && fit(".ghost") && fit(".srow .nm") && fit(".lab span"), board: h("board"), controls: h("controls") };
};
const browser = await chromium.launch(process.env.CHROME ? { executablePath: process.env.CHROME } : {});
const errors = [], requests = [];
let failed = false;
{ // ① 자가검사
  const page = await browser.newPage();
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto(URL + "#test");
  const t = await page.evaluate(() => (window.__tests ? { line: window.__tests.line, bad: window.__tests.rows.filter((r) => !r.ok).map((r) => "실패 " + r.id + " " + r.name + ": " + r.note) } : null));
  console.log(t ? t.line : "자가검사를 찾지 못했다(window.__tests 없음)");
  if (!t || t.bad.length) { failed = true; (t ? t.bad : []).forEach((x) => console.log("  " + x)); }
  await page.close();
}
for (const [w, h] of VIEWPORTS) { // ② 배치
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 2, hasTouch: true, isMobile: w < 700 }), page = await ctx.newPage();
  page.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("request", (r) => { if (!/^(file:|about:|data:)/.test(r.url())) requests.push(r.url()); });
  const rows = [], small = h < 620 ? 38 : 44;
  for (const [hash, steps] of WALK) {
    await page.goto("about:blank"); await page.goto(URL + "#" + hash); await page.waitForTimeout(60);
    if (!(await page.evaluate(() => !!window.__sbg && window.__sbg.state().screen === "shift"))) { rows.push({ at: hash, skip: true }); continue; }
    for (const s of steps) {
      const [k, v] = s.split(/:(.*)/);
      if (k === "m") { rows.push(Object.assign(await page.evaluate(MEASURE), { at: hash + " " + v })); continue; }
      const sel = k === "pick" ? `.srow[data-den="${v}"]` : k === "ok" ? "#pickOk" : k === "mark" ? "#markOk" : k === "ship" ? "#ship" : k === "loaf" ? `button.loaf[data-q="${v}"]` : k === "tap" ? v : k === "cut" ? "#plus" : "#lab" + (await page.evaluate((want) => { const K = window.__sbg, o = K.orderAt(K.state()), T = K.labelBeats({ den: o.loaf, count: 1, tup: 0 }); const c = K.choicesOf(o).map((l, i) => ({ i, ok: K.labelBeats(l).n * T.d === T.n * K.labelBeats(l).d, off: document.getElementById("lab" + i).disabled })); return (c.find((x) => x.ok === want && !x.off) || { i: 0 }).i; }, k === "right"));
      for (let i = 0; i < (k === "cut" ? +v : 1); i++) await page.tap(sel, { timeout: 2000 }).catch(() => {});
    }
  }
  const got = rows.filter((r) => !r.skip), bad = got.filter((r) => r.scroll > 0 || r.clip > 0 || r.font < 12 || r.btn < small || !r.fit || r.controls !== 94);
  console.log(`${w}×${h}: 잰 곳 ${got.length} · 문제 ${bad.length} · 도마 ${Math.min(...got.map((r) => r.board))}~${Math.max(...got.map((r) => r.board))}px · 가장 작은 글자 ${Math.min(...got.map((r) => r.font))}px · 가장 작은 단추 ${Math.min(...got.map((r) => r.btn))}px` + (rows.length > got.length ? ` · 건너뜀 ${rows.length - got.length}` : ""));
  bad.forEach((r) => console.log("  ✗ " + r.at + " " + JSON.stringify({ 스크롤: r.scroll, 잘림: r.clip, 글자: r.font, 단추: r.btn, 글자넘침: !r.fit, 조작부: r.controls })));
  if (bad.length || !got.length) failed = true;
  await ctx.close();
}
console.log(`콘솔 오류 ${errors.length}건 · 외부 요청 ${requests.length}건`); // ③
[...new Set(errors)].slice(0, 5).forEach((e) => console.log("  " + e));
[...new Set(requests)].slice(0, 5).forEach((e) => console.log("  " + e));
await browser.close();
process.exit(failed || errors.length || requests.length ? 1 : 0);
```

---

# 부록 E. 주문 43개

사람이 완주 점검(P19, P23)을 할 때 보는 표다. 엔진이 계산한 값이다. "바로가기"의 주소를 `index.html` 뒤에 붙이면 그 주문이 바로 열린다. 이름표 보기는 화면의 왼쪽부터이고 굵은 글씨가 정답이다.

| 바로가기 | 방식 | 주문 문장 | 칼집 | 정답(이름과 비율) | 이름표 단계 / 고르기 | 썰기 | 표시 |
|---|---|---|---|---|---|---|---|
| `#d0-01` | 고르기 | 1박짜리 식빵을 골라 주세요. |  | 4분음표 식빵 |  |  |  |
| `#d0-02` | 고르기 | 2박짜리 식빵을 골라 주세요. |  | 2분음표 식빵 |  |  |  |
| `#d0-03` | 고르기 | 4박짜리 식빵을 골라 주세요. |  | 온음표 식빵 |  |  |  |
| `#d0-04` | 고르기 | 8분음표 식빵을 골라 주세요. |  | 8분음표 식빵 |  |  |  |
| `#d0-05` | 고르기 | 4분음표 식빵 2개를 이으면 어느 식빵과 같을까요? |  | 2분음표 식빵 |  |  |  |
| `#d0-06` | 고르기 | 8분음표 식빵 2개를 이으면 어느 식빵과 같을까요? |  | 4분음표 식빵 |  |  |  |
| `#d0-07` | 고르기 | 이 소리만큼 긴 식빵을 골라 주세요. |  | 2분음표 식빵 |  |  | 마감 |
| `#d1-01` | 말 주문 | 1박 식빵(4분음표)을 같은 크기 2조각으로 썰어 주세요. | 1번 | 8분음표 2개 · 일반 분할 |  | 2 · 2 · 2 · 2조각, 가장 짧은 조각 500ms |  |
| `#d1-02` | 말 주문 | 2박 식빵(2분음표)을 같은 크기 2조각으로 썰어 주세요. | 1번 | 4분음표 2개 · 일반 분할 |  | 2 · 2조각, 가장 짧은 조각 1000ms |  |
| `#d1-03` | 말 주문 | 4박 식빵(온음표)을 같은 크기 2조각으로 썰어 주세요. | 1번 | 2분음표 2개 · 일반 분할 |  | 2조각, 가장 짧은 조각 2000ms |  |
| `#d1-04` | 말 주문 | 1박 식빵(4분음표)을 같은 크기 4조각으로 썰어 주세요. | 3번 | 16분음표 4개 · 일반 분할 |  | 4 · 4 · 4 · 4조각, 가장 짧은 조각 250ms |  |
| `#d1-05` | 말 주문 | 2박 식빵(2분음표)을 같은 크기 4조각으로 썰어 주세요. | 3번 | 8분음표 4개 · 일반 분할 |  | 4 · 4조각, 가장 짧은 조각 500ms |  |
| `#d1-06` | 말 주문 | ½박 식빵(8분음표)을 같은 크기 2조각으로 썰어 주세요. | 1번 | 16분음표 2개 · 일반 분할 |  | 2 · 2 · 2 · 2조각, 가장 짧은 조각 300ms | ♩=50 |
| `#d1-07` | 말 주문 | 4박 식빵(온음표)을 같은 크기 4조각으로 썰어 주세요. | 3번 | 4분음표 4개 · 일반 분할 |  | 4조각, 가장 짧은 조각 1000ms | 마감 |
| `#d2-01` | 말 주문 | 1박 식빵(4분음표)을 같은 크기 2조각으로 썰어 주세요. | 1번 | 8분음표 2개 · 일반 분할 | 숫자 질문 → [필요 없어요] | 2 · 2 · 2 · 2조각, 가장 짧은 조각 500ms |  |
| `#d2-02` | 말 주문 | 1박 식빵(4분음표)을 같은 크기 3조각으로 썰어 주세요. | 2번 | 8분음표 셋잇단음표 (3:2) | 숫자 질문 → [숫자가 필요해요] | 3 · 3 · 3 · 3조각, 가장 짧은 조각 333ms |  |
| `#d2-03` | 말 주문 | 1박 식빵(4분음표)을 같은 크기 4조각으로 썰어 주세요. | 3번 | 16분음표 4개 · 일반 분할 | 숫자 질문 → [필요 없어요] | 4 · 4 · 4 · 4조각, 가장 짧은 조각 250ms |  |
| `#d2-04` | 말 주문 | 1박 식빵(4분음표)을 같은 크기 3조각으로 썰어 주세요. | 2번 | 8분음표 셋잇단음표 (3:2) | 숫자 질문 → [숫자가 필요해요] | 3 · 3 · 3 · 3조각, 가장 짧은 조각 333ms |  |
| `#d2-05` | 말 주문 | 1박 식빵(4분음표)을 같은 크기 2조각으로 썰어 주세요. | 1번 | 8분음표 2개 · 일반 분할 | 숫자 질문 → [필요 없어요] | 2 · 2 · 2 · 2조각, 가장 짧은 조각 500ms |  |
| `#d2-06` | 말 주문 | 1박 식빵(4분음표)을 같은 크기 3조각으로 썰어 주세요. | 2번 | 8분음표 셋잇단음표 (3:2) | 숫자 질문 → [숫자가 필요해요] | 3 · 3 · 3 · 3조각, 가장 짧은 조각 333ms | 안내선 끔 |
| `#d2-07` | 말 주문 | 1박 식빵(4분음표)을 같은 크기 3조각으로 썰어 주세요. | 2번 | 8분음표 셋잇단음표 (3:2) | 숫자 질문 → [숫자가 필요해요] | 3 · 3 · 3 · 3조각, 가장 짧은 조각 333ms | 마감 |
| `#d3-01` | 말 주문 | 1박 식빵(4분음표)을 같은 크기 3조각으로 썰어 주세요. | 2번 | 8분음표 셋잇단음표 (3:2) | 보기: 8분음표 3개 / **8분음표 셋잇단** / 4분음표 셋잇단 | 3 · 3 · 3 · 3조각, 가장 짧은 조각 333ms |  |
| `#d3-02` | 말 주문 | 2박 식빵(2분음표)을 같은 크기 3조각으로 썰어 주세요. | 2번 | 4분음표 셋잇단음표 (3:2) | 보기: 8분음표 셋잇단 / 4분음표 3개 / **4분음표 셋잇단** | 3 · 3조각, 가장 짧은 조각 667ms |  |
| `#d3-03` | 말 주문 | 4박 식빵(온음표)을 같은 크기 3조각으로 썰어 주세요. | 2번 | 2분음표 셋잇단음표 (3:2) | 보기: 4분음표 셋잇단 / 2분음표 3개 / **2분음표 셋잇단** | 3조각, 가장 짧은 조각 1333ms |  |
| `#d3-04` | 말 주문 | ½박 식빵(8분음표)을 같은 크기 3조각으로 썰어 주세요. | 2번 | 16분음표 셋잇단음표 (3:2) | 보기: **16분음표 셋잇단** / 8분음표 셋잇단 / 16분음표 3개 | 3 · 3 · 3 · 3조각, 가장 짧은 조각 200ms | ♩=50 |
| `#d3-05` | 말 주문 | 2박 식빵(2분음표)을 같은 크기 4조각으로 썰어 주세요. | 3번 | 8분음표 4개 · 일반 분할 | 보기: 4분음표 4개 / **8분음표 4개** / 16분음표 4개 | 4 · 4조각, 가장 짧은 조각 500ms |  |
| `#d3-06` | 말 주문 | 2박 식빵(2분음표)을 같은 크기 3조각으로 썰어 주세요. | 2번 | 4분음표 셋잇단음표 (3:2) | 보기: 4분음표 3개 / **4분음표 셋잇단** / 8분음표 셋잇단 | 3 · 3조각, 가장 짧은 조각 667ms | 안내선 끔 |
| `#d3-07` | 말 주문 | 1박 식빵(4분음표)을 같은 크기 2조각으로 썰어 주세요. | 1번 | 8분음표 2개 · 일반 분할 | 보기: 4분음표 2개 / 16분음표 2개 / **8분음표 2개** | 2 · 2 · 2 · 2조각, 가장 짧은 조각 500ms |  |
| `#d3-08` | 말 주문 | 4박 식빵(온음표)을 같은 크기 3조각으로 썰어 주세요. | 2번 | 2분음표 셋잇단음표 (3:2) | 보기: **2분음표 셋잇단** / 2분음표 3개 / 4분음표 셋잇단 | 3조각, 가장 짧은 조각 1333ms | 마감 |
| `#d4-01` | 말 주문 | 1박 식빵 4개를 차례로 2 · 2 · 2 · 2조각으로 썰어 주세요. | 1 · 1 · 1 · 1번 |  |  | 2 · 2 · 2 · 2조각, 가장 짧은 조각 500ms |  |
| `#d4-02` | 말 주문 | 1박 식빵 4개를 차례로 3 · 3 · 3 · 3조각으로 썰어 주세요. | 2 · 2 · 2 · 2번 |  |  | 3 · 3 · 3 · 3조각, 가장 짧은 조각 333ms |  |
| `#d4-03` | 말 주문 | 1박 식빵 4개를 차례로 2 · 2 · 3 · 3조각으로 썰어 주세요. | 1 · 1 · 2 · 2번 |  |  | 2 · 2 · 3 · 3조각, 가장 짧은 조각 333ms |  |
| `#d4-04` | 말 주문 | 1박 식빵 4개를 차례로 2 · 3 · 2 · 3조각으로 썰어 주세요. | 1 · 2 · 1 · 2번 |  |  | 2 · 3 · 2 · 3조각, 가장 짧은 조각 333ms |  |
| `#d4-05` | 말 주문 | 1박 식빵 4개를 차례로 2 · 3 · 4 · 3조각으로 썰어 주세요. | 1 · 2 · 3 · 2번 |  |  | 2 · 3 · 4 · 3조각, 가장 짧은 조각 250ms |  |
| `#d4-06` | 말 주문 | 1박 식빵 4개를 차례로 4 · 3 · 2 · 3조각으로 썰어 주세요. | 3 · 2 · 1 · 2번 |  |  | 4 · 3 · 2 · 3조각, 가장 짧은 조각 250ms | 마감 |
| `#d5-01` | 악보 주문 | 이 악보대로 썰어 주세요. | 2번 | 8분음표 셋잇단음표 (3:2) | 고르기 정답: 4분음표 식빵 | 3 · 3 · 3 · 3조각, 가장 짧은 조각 333ms |  |
| `#d5-02` | 악보 주문 | 이 악보대로 썰어 주세요. | 2번 | 4분음표 셋잇단음표 (3:2) | 고르기 정답: 2분음표 식빵 | 3 · 3조각, 가장 짧은 조각 667ms |  |
| `#d5-03` | 악보 주문 | 이 악보대로 썰어 주세요. | 3번 | 8분음표 4개 · 일반 분할 | 고르기 정답: 2분음표 식빵 | 4 · 4조각, 가장 짧은 조각 500ms |  |
| `#d5-04` | 악보 주문 | 이 악보대로 썰어 주세요. | 2번 | 2분음표 셋잇단음표 (3:2) | 고르기 정답: 온음표 식빵 | 3조각, 가장 짧은 조각 1333ms |  |
| `#d5-05` | 소리 주문 | 들리는 대로 썰어 주세요. | 2번 | 8분음표 셋잇단음표 (3:2) | 고르기 정답: 4분음표 식빵 | 3 · 3 · 3 · 3조각, 가장 짧은 조각 333ms |  |
| `#d5-06` | 소리 주문 | 들리는 대로 썰어 주세요. | 1번 | 8분음표 2개 · 일반 분할 | 고르기 정답: 4분음표 식빵 | 2 · 2 · 2 · 2조각, 가장 짧은 조각 500ms |  |
| `#d5-07` | 소리 주문 | 들리는 대로 썰어 주세요. | 2번 | 4분음표 셋잇단음표 (3:2) | 고르기 정답: 2분음표 식빵 | 3 · 3조각, 가장 짧은 조각 667ms |  |
| `#d5-08` | 소리 주문 | 들리는 대로 썰어 주세요. | 3번 | 8분음표 4개 · 일반 분할 | 고르기 정답: 2분음표 식빵 | 4 · 4조각, 가장 짧은 조각 500ms | 마감 |

레시피 카드 15장의 열쇠와 이름:

| 열쇠 | 카드 이름 |
|---|---|
| `1` | 온음표 식빵 |
| `2` | 2분음표 식빵 |
| `4` | 4분음표 식빵 |
| `8` | 8분음표 식빵 |
| `4/2` | 8분음표 2개 · 일반 분할 |
| `2/2` | 4분음표 2개 · 일반 분할 |
| `1/2` | 2분음표 2개 · 일반 분할 |
| `4/4` | 16분음표 4개 · 일반 분할 |
| `2/4` | 8분음표 4개 · 일반 분할 |
| `8/2` | 16분음표 2개 · 일반 분할 |
| `1/4` | 4분음표 4개 · 일반 분할 |
| `4/3` | 8분음표 셋잇단음표 (3:2) |
| `2/3` | 4분음표 셋잇단음표 (3:2) |
| `1/3` | 2분음표 셋잇단음표 (3:2) |
| `8/3` | 16분음표 셋잇단음표 (3:2) |

---

*문서 끝. [그대로] 프롬프트의 코드와 P01~P21의 완료 기준은 헤드리스 브라우저에서 실행해 확인했다. 프롬프트를 실제 AI 도구에 넣어 돌려 보지는 않았고, 실기기에서는 아무것도 재지 않았으며, [설계] 프롬프트 12개의 결과물은 만들어 보지 않았다.*
