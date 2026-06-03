# Next Steps

`dev-docs/`의 모든 design doc에서 나온 **후속 TODO 통합 인덱스**. design doc을 새로 추가하거나 갱신할 때마다 그 문서의 "후속 TODO" 섹션 항목을 여기로 옮긴다.

각 항목 형식:

```
- [ ] **<요약>** — 출처: [<doc>.html](<doc>.html)
  추가 맥락 1줄 (선택)
```

상태가 바뀌면 `진행 중` / `완료` 섹션으로 옮기고 완료 시 PR 번호를 함께 적는다.

---

## 진행 중

(없음)

## 대기

### 12편 인공위성
출처: [entry-game-12-satellite.html](entry-game-12-satellite.html)

- [ ] **(선택) 뉴턴의 대포 데모에 ‘딱 맞는 속도’ 마커 추가**
  원궤도가 되는 속도(v_circ≈2.2) 위치에 슬라이더 눈금/표식을 주면 ‘딱 맞는 속도 찾기’가 쉬워짐. 정보량↑ 트레이드오프.
- [ ] **실기기/visible 탭에서 데모 애니메이션 최종 확인**
  추락/원/타원/탈출 전환·🔴중력 화살표가 가까울수록 길어지는지(hidden 탭 rAF 정지 한계).

### 데모 높이·구름·3·11편 신규 데모
출처: [demo-height-unify-and-new-demos.html](demo-height-unify-and-new-demos.html) · [demo-canvas-width-height-touch.html](demo-canvas-width-height-touch.html)

- [ ] **실기기/visible 탭에서 애니메이션 최종 확인** (PR #30·#31 공통 hidden-탭 한계)
  hidden 탭 `rAF` 정지로 실제 움직임은 시각검증 불가(배선·HUD·초기 프레임·픽셀은 검증됨). 실기기에서 1·2편 이동·4편 발사(#30), **3편 표면별 미끄러짐 거리**(#31)를 한 번 확인.

### 11편 원운동·스프링 동시 투영 데모
출처: [circular-motion-spring-projection-demo.html](circular-motion-spring-projection-demo.html)

- [ ] **실기기/visible 탭에서 투영 데모 애니메이션 최종 확인**
  한 바퀴 도는 동안 공→추 가로 점선이 항상 수평·추 높이=공 높이 일치·회전속도 슬라이더 실시간 반영·처음으로→angle=0 복귀(hidden 탭 rAF 정지 한계).
- [ ] **(선택) 위에서 본 좌우 그림자(cos)도 함께 보여주는 2축 버전**
  현재 세로축(sin) 투영만. 가로축 그림자까지 더하면 cos·sin ‘사촌’을 한눈에 보여주나, 정보량↑로 단순함과 트레이드오프 — 보류.

### 도트 캐릭터 스프라이트 (Zerie)
출처: [character-sprites.html](character-sprites.html)

- [ ] **4편 시각 일관성 — 새(발사체)도 스프라이트화 검토**
  현재 4편은 새가 도형(CSS/canvas), 오크만 픽셀 스프라이트(헤더). 새 스프라이트(또는 화살 발사체)를 구하면 스타일 통일 + 캔버스 오크 표적도 함께 추가 가능.
- [ ] **2편 캔버스 — 걷기 속도를 vel에 연동**
  현재 다리 사이클은 고정 cadence(`tick%5`). 속도 편이니 |vel|에 비례해 빨라지면 개념 강화.
- [ ] **3편 헤더 잔상 — 걷기 프레임 동기화**
  `.trail` 고스트가 frame 0 고정. hero와 같은 walkcycle을 지연과 함께 주면 더 자연스러움(현재도 옅어 큰 문제 아님).
- [ ] **추가 애니(Attack/Hurt/Death) 활용 여지**
  팩에 공격·피격·사망 시트 존재. 충돌 피드백(벽 부딪힘=Hurt 등) 연출에 후속 활용 가능.
- [ ] **픽셀아트 톤 vs 파스텔 — 지속 점검**
  붕 뜨면 "with shadows" 버전 또는 채도 조정 검토.
- [ ] **6편 헤더 push 모션 — 전용 스프라이트 검토** — 출처: [entry-game-6-force.html](entry-game-6-force.html)
  현재 헤더는 soldier-walk 스프라이트가 CSS 상자를 미는 연출. "미는" 전용 프레임이 생기면 더 자연스러움(현재도 큰 문제 아님).

### review_20260529.md 반영 (개념↔구현 분리)
출처: [concept-implementation-separation.html](concept-implementation-separation.html)

- [ ] **후속 물리 주제 편 추가 (남은 주제)**
  ✅ 1순위 힘·질량 = 6편, ✅ 2순위 운동량·충돌 = 7편, ✅ 3순위 에너지 = 8편, ✅ 4순위 경사면·마찰 = 9편, ✅ 6순위 스프링·진동 = 10편, ✅ 7순위 원운동 = 11편 + 그 응용으로 인공위성 = 12편 완료. 남은 우선순위: 공기저항·낙하산(5) → 빛 반사(8).
  각 주제의 게임 아이디어·배울 개념·코딩 요소 상세는 [review_20260529.md](review_20260529.md) "추가로 다루면 좋은 주제 제안"(5~8순위) 참조.
- [ ] **13편 후보 — 점수·게임 규칙 또는 공기저항/빛 반사** — 출처: [entry-game-12-satellite.html](entry-game-12-satellite.html)
  물리 10·11·12편(스프링·원운동·인공위성)까지 완료. 「점수·게임 규칙」(코인·적·체력·레벨)은 계속 이월 중. index "13편 후보"에 점수·게임 규칙 / 공기저항·낙하산 / 빛 반사 노출. 물리를 더 할지 게임 완성도로 갈지 선택.
- [ ] **9편 진짜 sin 블록/데모 보강** — 출처: [entry-game-9-slope.html](entry-game-9-slope.html)
  ⭐ 도전의 `경사기울기 = 중력 × sin(경사각)`을 본문 기본 코드/데모로 승격 검토(현재는 ⭐ 한 블록만).
- [ ] **8편 점프대 포물선 2nd 코드 보강** — 출처: [entry-game-8-energy.html](entry-game-8-energy.html)
  점프대 도약이 ⭐ 한 블록만. 4편식 `y속도 + 중력` 낙하 루프를 데모/코드로 보강 가능.

### 5편 튕기기와 탄성
출처: [entry-game-5-bounce.html](entry-game-5-bounce.html)

- [ ] **4편 새총에 튕김 적용 예시 보강**
  5편 §4에서 "새총 코드에 튕기는 줄을 더하면 통통 튄다"고 언급만 함. 실제 변형 코드/데모를 추가 가능.
- [ ] **정착 부등식 중첩 reporter 표현** — 아래 "복합 reporter" 항목과 동일 원인
  5편 정착 조건 `‘y속도’의 절댓값 < 1`을 boolean 안 텍스트 폴백으로 작성. 렌더러가 비교식 nesting을 지원하면 블록으로 교체.

### 7편 운동량과 충돌
출처: [entry-game-7-collision.html](entry-game-7-collision.html)

- [ ] **무게 다른 공 정확 충돌 — 엔트리 일반 공식 블록화**
  본문 🧩는 등질량 속도 스왑만. ⭐ 일반식 `v1'=((m1-m2)v1+2m2·v2)/(m1+m2)`을 실제 블록/데모로 보강 가능.
- [ ] **공끼리 들러붙음 가드**
  닿는 동안 매 프레임 교환되면 진동. 1회만 교환하거나 살짝 분리하는 가드 블록 예시 보강.

### B-mini 렌더러
출처: [entry-blocks-renderer.html](entry-blocks-renderer.html)

- [ ] **c-block 자식 statement 안 note 처리 방식 결정**
  현재는 SVG 내부라 누락. 옵션: (a) c-block 외부로 분리 변환 (b) SVG 내부 회색 텍스트 (c) 그대로 손실 허용. 1편 묶음 3·4, 3편 묶음 4 등 학습 보조 텍스트 일부 손실 중.
- [ ] **복합 reporter (산술 연산 등) 정확한 nesting 표현**
  현재 "걷는속도 × 0.85" 같은 계산은 단순 텍스트로 표현. reporter 안에 reporter 끼우는 패턴 정의 필요.
- [ ] **모바일 viewport에서 폭 초과 대응**
  깊이 중첩된 c-block(3편 묶음 4 서브스텝)이 모바일 viewport를 초과. 가로 스크롤 컨테이너 vs 자동 축소 정책 미정.
- [ ] **`prototype-entry-blocks.html` 배포 본 포함 여부 결정**
  학습용이 아니라 디자인 시연용. `docs/`에 두면 GitHub Pages에 노출됨.
- [ ] **`colors.js` / `icons/*.svg` 보존 여부**
  `renderer.js`에 inline되어 실제 미사용. vendoring 원본 추적 목적이라면 유지, 깔끔함 우선이면 제거.

## 완료

- [x] **12편 「인공위성」 추가** — [entry-game-12-satellite.html](entry-game-12-satellite.html) · 설계 [entry-game-12-satellite.html](entry-game-12-satellite.html) (PR 생성 예정)
  11편 구심력의 정체 = 8편 중력임을 밝히는 종합 편. 중심 통찰 "위성은 안 떨어지는 게 아니라 계속 떨어지는 중"(자유낙하+접선속도→지구가 휘어 도망=궤도), 무중력 오개념 교정. 시그니처 데모 = 뉴턴의 대포(진짜 1/r² 중력 적분, 발사 속도 하나로 추락·원·타원·탈출). 기본 구현은 11편 cos·sin 그대로(중심만 지구), ⭐도전 = `중력 = 700 ÷ (거리×거리)`로 진짜 궤도. `--c12` 미드나잇 블루·`.c-satellite`. **새 마지막 편** → 11편 마무리(완주→11편 클리어·CTA→12편), index `ep-12` 카드·s12 path·"12편 후보"→"13편 후보".
- [x] **데모 높이 400 통일 + 가로 액션 빈 하늘 구름 배경** — [demo-height-unify-and-new-demos.html](demo-height-unify-and-new-demos.html) (PR #31)
  PR #30의 미해결 TODO(6·7편 빈 하늘) 해소 — 가로 액션 차등 높이(1·2편 300·6·7편 360)를 거두고 **전 편 400 통일**, 늘어난 상단을 `drawClouds()`(저채도 구름 3개, 1·2·3·6·7편 공통)로 채움.
- [x] **6편 ‘시작 대기’ 오버레이 잔류 버그 수정** — [demo-height-unify-and-new-demos.html](demo-height-unify-and-new-demos.html) (PR #31)
  `togglePush()`에서 `startLoop()`(running=true)를 `updateBtn()` 앞으로 이동 → 시작 시 `idle`/흰 오버레이 제거(5·7편 정상 패턴과 동일).
- [x] **3편 관성·마찰 데모 신규** — [demo-height-unify-and-new-demos.html](demo-height-unify-and-new-demos.html) (PR #31)
  데모 없던 유일한 편에 추가. 밀기→관성 미끄러짐→표면별 마찰 정지(🏜️모래0.7·🌿잔디0.85·🧊빙판0.95·🚀우주1.0, 마찰 섹션 값과 정렬). 우주=마찰0이 2편 ‘안 멈추는 문제’ 시연. `--c3` 보라.
- [x] **11편 스프링→원운동 연결 데모 신규** — [demo-height-unify-and-new-demos.html](demo-height-unify-and-new-demos.html) (PR #31)
  ‘구심력=10편 복원력’ 한 문장을 전용 데모로. 복원력을 x·y 양쪽에 걸어 옆 속도 0이면 직선 진동·`R·√K`면 원운동(같은 힘, 시작 속도만 다름), 회전 코일+구심력 화살표. 별도 IIFE(`demoCanvasLink11`).
- [x] **10편 「스프링·진동」 추가** — [entry-game-10-spring.html](entry-game-10-spring.html) · 설계 [entry-game-10-11-spring-circular.html](entry-game-10-11-spring-circular.html) (PR #29)
  후속 물리 6순위(후크의 법칙·복원력·진동·감쇠) + 당겼다 놓는 스프링 데모(탄성계수·감쇠 슬라이더, 기준위치 점선). `--c10` 세이지·`.c-spring`. 5편 튕김(닿는 순간)과 비교(`.cmp`: 늘어난 내내·거리비례). 엔트리 핵심 = `속도에 (기준위치 − 자신의 y좌푯값) × 탄성계수 더하기`. 중간 편(CTA→11편). 복원력 = 11편 구심력 전방 다리.
- [x] **11편 「원운동」 추가** — [entry-game-11-circular.html](entry-game-11-circular.html) · 설계 [entry-game-10-11-spring-circular.html](entry-game-10-11-spring-circular.html) (PR #29)
  후속 물리 7순위(구심력 = 10편 복원력 인용, 4편 cos·sin 재사용해 `x=반지름×cos(각도)`/`y=반지름×sin(각도)`) + 공전 + 🪢 줄 놓기(접선=3편 관성) 데모. `--c11` 테라코타·`.c-circular`. **새 마지막 편** → 9편 마무리 3곳을 10편 브리지로(완주 문구 제거), index `ep-10`/`ep-11` 카드·11스텝 path·"10편 후보"→"12편 후보", CLAUDE.md 11-part·트리. 현실 타원 vs 게임 깔끔한 원 `.tip.real`. 힘 기반 궤도 ⭐도전(10편 코드 x·y 양축).
- [x] **8편 「에너지」 추가** — [entry-game-8-energy.html](entry-game-8-energy.html) · 설계 [entry-game-8-9-energy-slope.html](entry-game-8-9-energy-slope.html) (PR #28)
  후속 물리 3순위(위치↔운동에너지 전환·마찰 손실) + 롤러코스터 데모(출발 높이 슬라이더, `v=√(2gh)` 비선형 체감, 도달 임계 높이 200). `--c8` 인디고·`.c-indigo`. 중간 편(CTA→9편). 높이-거리 비선형은 `.tip.warn`(4편 발사힘 보정과 동형).
- [x] **9편 「경사면과 마찰」 추가** — [entry-game-9-slope.html](entry-game-9-slope.html) · 설계 [entry-game-8-9-energy-slope.html](entry-game-8-9-energy-slope.html) (PR #28)
  후속 물리 4순위(경사 미는 힘 vs 마찰 = 가속도) + 눈썰매 데모(경사각 슬라이더 + 얼음/눈/모래 토글, 진짜 sin). `--c9` 오키드·`.c-orchid`. **새 마지막 편** → 7편 CTA·finish를 8편 브리지로(완주 문구 제거), index `ep-8`/`ep-9` 카드·9스텝 path·"8편 후보"→"10편 후보", CLAUDE.md "7-part"→"9-part"·트리, new-page-guide 색상표 `--c6`~`--c9` 보강. `a=g·sinθ−μg·cosθ`는 ⭐`.tip.bonus`로 분리.
- [x] **개념↔구현 분리 구조를 전 편(1~5편)으로 확대 완료** — 3편 파일럿 패턴(`.goals`·🔬/🧩·`.tip.real`·`.fix`·⭐도전)을 1·2·4·5편에 모두 적용. 1편은 충돌·중력 개념 분리 + 🧩 구현 존 재구성, 2·4·5편은 박스·프리픽스 추가 위주(4편 §5→⭐도전, 5편 벽 튕김·새총 ⭐도전 신설) (PR #25)
- [x] **review.md → review_20260529.md 참조 정리 + 커밋 여부 해결** — 파일은 이미 커밋(`a0b2a13`), 끊긴 링크/언급 갱신 (PR #25)
- [x] **new-page-guide.html 액센트 색상표에 `--c4`·`--c5` 행 추가** — review_20260529.md 반영 변경에 포함 (PR 시 번호 기입)
- [x] **6편 「힘과 질량」 추가** — [entry-game-6-force.html](entry-game-6-force.html) (PR #27)
  후속 물리 1순위(힘·질량·뉴턴 제2법칙, 가속도=힘÷질량) + 상자 밀기 데모. `--c6` 마젠타·`.c-magenta`, 5편 CTA→6편(완주 문구 제거), index "6편 후보"→"7편 후보", 4편 CTA "마지막 한 편"→"다음 편" 정정. `--c6` 행은 후속 new-page-guide 색상표 갱신 대상.
- [x] **7편 「운동량과 충돌」 추가** — [entry-game-7-collision.html](entry-game-7-collision.html) (PR #27)
  후속 물리 2순위(운동량=질량×속도, 충돌=속도 교환) + 당구 1D 탄성 충돌 데모. `--c7` 와인·버건디·`.c-wine`, 6편 CTA→7편(완주 문구 제거), index "7편 후보"→"8편 후보", CLAUDE.md 7-part·트리 갱신. 엔트리 핵심=‘임시속도’ 변수로 두 공 속도 스왑. `--c6`·`--c7` 행은 후속 new-page-guide 색상표 갱신 대상.
