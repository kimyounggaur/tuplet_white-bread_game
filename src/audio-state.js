let ctx = null, AUDIO = null, run = null, raf = 0;  // 소리 컨텍스트, 소리 묶음, 지금 도는 재생, 프레임 번호. 여러 구획이 함께 쓴다
const soundOn = (state) => state === "running";  // 아니면 "소리 켜기"를 보여 준다. 컨텍스트가 아직 없을 때도 같다
