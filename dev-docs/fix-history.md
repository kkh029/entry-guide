# Fix History

`dev-docs/` 디자인 문서·결정·리팩토링의 시간 역순 인덱스. 새 항목은 **최신이 위로** 오도록 추가한다.

각 항목 형식:

```
- **<한 줄 요약>** — [<doc>.html](<doc>.html) · [PR #<n>](<url>)
  추가 설명 1줄 (선택)
```

PR 번호는 머지 전이라도 PR 생성 시점에 채운다.

---

## 2026

### 2026-06-02
- **데모 캔버스 — 본문 폭 정렬 + 높이 확대 + 모바일 터치 조작 패드** — [demo-canvas-width-height-touch.html](demo-canvas-width-height-touch.html) · [PR #30](https://github.com/kkh029/entry-guide/pull/30)
  넓은 화면에서 데모를 본문보다 넓게 확장하던 규칙(커밋 `2470051`)을 되돌려 **본문 폭에 정렬**하고, 대신 캔버스 `height` 속성을 장면별로 키워 세로로 더 잘 보이게 함. `styles.css`의 `.try-demo` 와이드 `@media` 2개 제거(주석 대체) → `.try-demo`는 `.wrap` 안 일반 블록이라 기본값으로 본문 폭(캔버스 표시폭 ≈702px) 차지. 높이: 가로 액션 1·2편 220→300·6·7편 320→360, 세로/2D 액션 4·5·8·9·10·11편 320→400(1·2편만 220→300). **안전성** — 전 데모가 바닥 앵커(`groundY=H−30`) 또는 중심 앵커(10편 `restY=H/2`·11편 `cy=H/2`)라 H↑는 빈 여백만 늘려 기존 요소 클리핑 불가(8편 최대 램프·9편 45° 경사·11편 원 모두 오히려 여유). **모바일 조작** — 키보드 의존 1·2·4편에 공통 `.try-pad` 버튼 추가(5~11편은 이미 버튼/슬라이더): 1·2편 `◀▶` 꾹눌러 이동/가속(`keys.left/right`), 4편 `◀▶`(각도)·`▲▼`(힘) 꾹눌러 반복 조준(`aimAngle±2`/`aimPower±4`), 발사는 기존 🚀버튼 재사용. `pointerdown`에서 `e.preventDefault()`로 포커스 이동(=캔버스 blur 정지)·스크롤 차단, `pointerleave`/`pointercancel`로 마우스 끌어떼기/취소 해제. `.try-pad`는 페이지 로컬이 아닌 공통 `styles.css`에 정의(3편 공유, 모바일 ≤520px 버튼 72×56 확대). 직전 PR #29로 추가된 10·11편 데모도 같은 폭·높이 처리에 포함. 로컬 프리뷰 검증(폭/높이 DOM 측정·4편 각도/힘 기능·1·2편 배선 pressing·8편 램프 적합·10·11편 렌더·콘솔 에러 0; 애니메이션 루프는 hidden 탭 rAF 정지로 시각검증 불가 → 기존 키보드 핸들러와 동형 로직으로 보장).
- **10·11편 「스프링·진동」·「원운동」 추가 (복원력 진동 + 구심력=복원력 다리로 원운동)** — [entry-game-10-11-spring-circular.html](entry-game-10-11-spring-circular.html) · [PR #29](https://github.com/kkh029/entry-guide/pull/29)
  후속 물리 후보 6·7순위(스프링·진동 → 원운동)를 두 편으로 추가. **사용자 설계 의도**: 탄성을 먼저 별도 문서로, 원운동이 그것을 인용. 물리적 다리 = **스프링의 복원력 = 원운동의 구심력**(둘 다 '중심으로 당기는 힘'). **10편 스프링·진동**: 후크의 법칙·복원력·진동·감쇠, 5편 튕김(닿는 순간 ×-0.7)과 비교(`.cmp`: 늘어난 내내·거리비례 중심으로), 엔트리 핵심 = `속도에 (기준위치 − 자신의 y좌푯값) × 탄성계수 만큼 더하기` + 감쇠(×0.98), 데모 = 당겼다 놓는 수직 스프링(탄성계수 0.05~0.4·감쇠 0.9~1.0 슬라이더, 기준위치 점선). **11편 원운동**: 구심력 = 10편 복원력 인용(전체 다리), 4편 cos·sin 재사용해 `x좌표 = 반지름 × cos(각도)`·`y좌표 = 반지름 × sin(각도)`(매 프레임 `각도 += 회전속도`, `만큼 바꾸기` 아닌 `(으)로 정하기`), 데모 = 중심 공전 + 🪢 줄 놓기 → 접선 직진(3편 관성), ⭐도전 = 10편 코드 x·y 양축으로 힘 기반 궤도. 정확성: 현실은 타원/나선, 게임은 반지름 고정+각도 증가로 깔끔한 원 → `.tip.real`로 명시(힘 기반 ⭐도전에도 타원 주의 `.tip.real`). `--c10`(세이지 #5f8d7e, 그림자 #46695d)+`.c-spring`, `--c11`(테라코타 #c0744a, 그림자 #94562f)+`.c-circular` 추가. **11편이 새 마지막 편** → 9편 마무리 3곳(`.cta`·`.finish` 제목·`.next`)을 10편 브리지로(완주 문구 제거), 10편 CTA→11편, 11편 CTA→index(완주), index `ep-10`/`ep-11` 카드·11스텝 path·dot 색·"10편 후보"→"12편 후보"(점수·게임규칙/공기저항/빛 반사), CLAUDE.md "9-part"→"11-part"·트리. 렌더러 제약(c-block 자식 `note` 누락)으로 반복문 줄별 설명은 `.tip` 산문. 로컬 프리뷰 검증(블록 SVG 10편 26·11편 39·콘솔/JSON 에러 0·데모 RAF 동작[스프링 dist 96→-39·궤도 각도 0→48·줄 놓기 접선]·중첩 cos/sin 블록 폭 490px<736 컨테이너 오버플로 없음·네비 9→10→11→index·모바일 가로 오버플로 0·`--c10`/`--c11` 적용).

### 2026-05-31
- **8·9편 「에너지」·「경사면과 마찰」 추가 (위치↔운동에너지 전환 + 비탈 미끄러짐 데모)** — [entry-game-8-9-energy-slope.html](entry-game-8-9-energy-slope.html) · [PR #28](https://github.com/kkh029/entry-guide/pull/28)
  리뷰 후속 물리 3·4순위를 8·9편으로 추가(사용자가 '점수·게임 규칙' 대신 물리 계속 선택). **8편 에너지**(롤러코스터): 위치에너지→운동에너지 전환 + 마찰 손실, 데모=출발 높이 슬라이더로 `v=√(2gh)` 체감(높이 2배≠속도 2배, 도달 임계 높이 200). **9편 경사면·마찰**(눈썰매, 새 마지막 편): 경사가 미는 힘(진짜 sin) vs 바닥 마찰(곱셈)의 겨룸=가속도, 데모=경사각 슬라이더+얼음/눈/모래 토글(가파른 얼음 최速·모래 最遅). `--c8`(인디고 #5a6fce)+`.c-indigo`, `--c9`(오키드 #b061c4)+`.c-orchid` 추가. 9편이 새 마지막 편 → 7편 finish/CTA를 8편 브리지로(완주 문구 제거), 8편 CTA→9편, index `ep-8`/`ep-9` 카드·9스텝 path·dot 색·"8편 후보"→"10편 후보"(점수·게임규칙/공기저항/스프링), CLAUDE.md "7-part"→"9-part"·트리, new-page-guide 색상표 `--c6`~`--c9` 보강(c6/c7도 누락이라 함께). 정확성: 8편 높이-거리 비선형 `.tip.warn`(4편 발사힘 보정과 동형), 9편 `a=g·sinθ−μg·cosθ`를 ⭐`.tip.bonus`로 분리. 렌더러 제약(c-block 자식 `note` 누락)으로 반복문 내 줄별 설명은 `.tip` 산문으로. 로컬 프리뷰 검증(블록 SVG 8/8·콘솔 에러 0·데모 물리 시뮬·canvas 픽셀·`--c8`/`--c9` computed style·네비 6→7→8→9→index).
- **7편 「운동량과 충돌」 추가 (운동량·속도 교환 + 당구 충돌 데모)** — [entry-game-7-collision.html](entry-game-7-collision.html) · [PR #27](https://github.com/kkh029/entry-guide/pull/27)
  시리즈에 없던 공끼리 충돌(운동량 전달)을 새 마지막 편으로 추가(리뷰 2순위 — 사용자가 '점수·게임 규칙' 대신 물리 계속 선택). 핵심 개념 `운동량 = 질량 × 속도`(6편 질량 연결) + 충돌=속도 주고받기(같은 무게면 맞바꾸기). 엔트리 핵심 = `임시속도` 변수로 두 공 속도 스왑(공A/공B 두 오브젝트, `공B에 닿았는가?` 판정). 당구 데모 = 큐볼 질량 슬라이더(1~10, 흰 공 4 고정)로 1D 탄성 충돌 체감(같은 무게→큐볼 0·흰 공 4.2, 무거움→1.8/6.0, 가벼움→-2.52/1.68). `--c7`(와인·버건디 #9a3b52)+`.c-wine` 추가. 7편이 새 마지막 편 → 6편 CTA·finish를 7편 브리지로(완주 문구 제거), index `ep-7` 카드·7스텝 path·"7편 후보"→"8편 후보", CLAUDE.md "6-part"→"7-part"·트리 갱신. ⭐도전=벽돌깨기 확장(5편 반사+이번 충돌+점수). 로컬 프리뷰 검증(블록 SVG 29개·충돌 공식 손계산 일치·콘솔 에러 0·TOC 7항목·--c7 캐시 무효화 후 적용·네비 6→7→index).
- **6편 「힘과 질량」 추가 (힘·질량·뉴턴 제2법칙 + 상자 밀기 데모)** — [entry-game-6-force.html](entry-game-6-force.html) · [PR #27](https://github.com/kkh029/entry-guide/pull/27)
  시리즈에 없던 힘·질량을 새 마지막 편으로 추가. 핵심 개념 `가속도 = 힘 ÷ 질량`(같은 힘이라도 무거우면 천천히). 개념↔구현 분리 표준 구조(`.goals` 🔬/🧩 → 🔬힘·질량 → 🔬가속도=힘÷질량 → 🧩엔트리 만들기 → `.fix` → ⭐도전(버튼 판정·얼음 상자) → 🔍퀴즈 → 1~6편 완주 `.finish`). 엔트리 핵심 블록 = `상자속도에 (미는힘÷질량) 만큼 더하기`(계산 ÷ reporter 중첩 — 5편 ×와 동일 렌더 경로라 텍스트 폴백 불필요) + 마찰 ×0.9. 캔버스 데모 = 질량 슬라이더(1~10)로 같은 힘 `FORCE=0.6`의 가속도 변화 체감(질량 1→0.60·10→0.06). `--c6`(장미빛 마젠타 #b05a8e)+`.c-magenta` 추가. 6편이 새 마지막 편 → 5편 CTA·finish를 6편 브리지로(완주 문구 제거), index `ep-6` 카드·6스텝 path·"6편 후보"→"7편 후보(점수·게임 규칙)", 4편 CTA "마지막 한 편"→"다음 편" 정정. 로컬 프리뷰 검증(블록 SVG 22개·÷ 렌더·콘솔 에러 0·TOC 7항목·데모 가속도 공식·index 매젠타 computed style·네비 4→5→6→index).

### 2026-05-30
- **Zerie 도트 캐릭터(군인·오크) 스프라이트 도입 — 헤더 캐릭터 + 1·2편 캔버스 주인공** — [character-sprites.html](character-sprites.html)
  CSS 네모/canvas 도형으로만 그리던 캐릭터를 무료 픽셀아트 스프라이트로 교체. `docs/assets/characters/`에 타이트 크롭(100×100 프레임 → 캐릭터 군인 15×19·오크 22×16)한 4개 시트(soldier/orc × idle/walk, 각 ~1KB). **헤더**: 편별 개념 모션(점프·가속·미끄러짐·포물선·튕김)은 유지하고 비주얼만 스프라이트로 교체 + `steps()` 걷기 사이클을 동시 적용 — 1·2·3편 = 걷는 군인(3편은 잔상도 군인 고스트), 4편 = 표적 돼지→오크(왼쪽 보기로 날아오는 새를 향함), 5편 = 공만(추가 캐릭터 없음), index = 군인·오크 추격 퍼레이드. about-entry는 엔트리 브랜드 로고라 제외. **캔버스**: 1·2편 `drawHero()`를 `drawImage` 스프라이트로 교체(정지=idle·이동=walk, 방향 반전, 로드 전 네모 폴백, `imageSmoothingEnabled=false`) — `heroW/heroH`·이동·clamp·라벨 등 물리 로직은 불변. 4편 캔버스는 새가 도형이라 스타일 혼합 방지 위해 도형 유지(헤더에만 오크). **라이선스**(Zerie: 사용·수정 OK, 재배포 금지): 필요 프레임만 포함 + 전 페이지 푸터 "도트 캐릭터 © Zerie" 링크 + `assets/characters/CREDITS.txt`.

### 2026-05-29
- **개념↔구현 분리 구조를 4·5편으로 확대 (1~5편 전부 완료)** — [concept-implementation-separation.html](concept-implementation-separation.html) · [PR #25](https://github.com/kkh029/entry-guide/pull/25)
  3편 파일럿 패턴을 4편(포물선)·5편(탄성)에도 적용 — `.goals`, 🔬개념/🧩구현 h2 프리픽스, `.tip.real`(4편 공기저항·45° / 5편 튕김·탄성계수 = 현실 vs 게임), `.fix`, ⭐도전(4편 "더 멋지게 만들기"→승격, 5편 "벽 튕김+새총 적용" 신설). 1·2편에 이어 이로써 1~5편 표준 구조 통일. `data-blocks`·데모 `id` 불변, 로컬 프리뷰 렌더 검증(블록 SVG·TOC·콘솔 에러 0).
- **개념↔구현 분리 구조를 1·2편으로 확대 + review.md→review_20260529.md 참조 정리** — [concept-implementation-separation.html](concept-implementation-separation.html) · [PR #25](https://github.com/kkh029/entry-guide/pull/25)
  3편 파일럿 패턴(`.goals` 🔬개념/🧩구현 · `.tip.real` 현실 vs 게임 · `.fix` 안 될 때 확인 · ⭐도전)을 1편(충돌·중력 개념을 앞으로 모으고 걷기·점프·충돌처리·계단을 🧩 구현 존으로 재구성, 발 오브젝트=⭐도전)과 2편(이동·속도·가속도 🔬 + 만들기 🧩, 속도·가속도에 현실 vs 게임 콜아웃)에 적용. `data-blocks`·데모 `id` 불변. 외부 리뷰 파일 rename으로 끊긴 참조(링크 5곳 + 산문) 정리, "커밋 여부" 항목은 이미 커밋(`a0b2a13`)이라 해결. 4·5편 확대는 후속.
- **외부 리뷰(review_20260529.md) 반영 — 「물리 개념 ↔ 엔트리 구현」 구분 도입 + 표현 정확성 보정** — [concept-implementation-separation.html](concept-implementation-separation.html)
  새 프리미티브 `.goals`/`.tip.real`/`.fix`(styles.css) + 가이드 4종 갱신(design-guide D-1 기능색표·D-4 신설, authoring-editing-guide A-3 정확성 참조표, new-page-guide §2 뼈대·§4 체크리스트·c4/c5 색상행, CLAUDE.md 콜아웃 목록·새 페이지 step). 콘텐츠는 3편 파일럿(관성·마찰·중력 = 🔬개념 블록 ↔ 🧩엔트리 구현 블록으로 코드 통합, 서브스텝·코요테=⭐도전, 관성 힘→성질 등 정확성 4건) + 4편 텍스트 정확성 3건(vy 부호 +y 통일·45° 조건·발사힘 두 배→훨씬). 교사용 자료·수업 메타는 제외(학습자 본인 대상). 4·5편 구조 확대는 후속(1·2편은 같은 날 확대).
- **5편 「튕기기와 탄성」 추가 (튕김·반사·탄성계수 + 통통 공 데모)** — [entry-game-5-bounce.html](entry-game-5-bounce.html)
  시리즈에 없던 반사/탄성을 마지막 편으로 추가. 4편의 "쿵 멈춤"→"통통 튕김" 브리지. `--c5`(틸) 토큰 + `.c-teal` 추가, 4편 CTA·index `ep-5`·path·"6편 후보" 배선. 데모는 탄성계수 슬라이더(0.5~1.0)로 통통 정도 체감 — 헤드리스 검증 6회 튕기고 ~185프레임 정착. 범위는 코어만(공끼리 충돌은 6편 후보).
- **디자인 가이드 문서 추가 + 세 가이드 경계 정리** — [design-guide.html](design-guide.html)
  색·아이콘·말투·콘텐츠 전개 순서를 다루는 표현(디자인) 가이드 신설. 겹침 방지를 위해 내용/레이아웃/디자인 3-way 경계를 명확히 — authoring-editing-guide.html에서 말투·전개·색 등 표현 항목을 디자인으로 이관(A-3을 "대상에 맞는 내용 고르기"로 재구성), 세 문서 상호 참조 추가. CLAUDE.md "When adding a new page"에 3개 가이드 포인터.
- **페이지 작성·수정 가이드 문서 추가** — [authoring-editing-guide.html](authoring-editing-guide.html)
  새 주제 페이지(신뢰도 있는 레퍼런스·출처/코드 주석·친절한 서술)와 기존 페이지 수정(목적·레이아웃·중복·다른 페이지 연관성) 절차를 정리. CLAUDE.md "Page architecture"의 공통 레이아웃 규칙(골격·액센트 색·콜아웃·Entry 블록 색·네비·footer·폰트)을 요약 표로 참조하도록 연결. 뼈대 중심인 new-page-guide.html을 보완하는 콘텐츠·편집 가이드. CLAUDE.md "When adding a new page"에서 참조.
- **가이드·CLAUDE.md 네비게이션 규칙 정정 + 5편 반영 (origin/main 리베이스 후 실제 페이지 대조)** — [authoring-editing-guide.html](authoring-editing-guide.html) · [design-guide.html](design-guide.html) · [new-page-guide.html](new-page-guide.html)
  실제 컨벤션에 맞춰 하단 내비를 `.home-link-bottom`(미사용)→`.cta`의 `.go` 버튼으로, 상단 링크를 "🏠"로 정정(CLAUDE.md Navigation·step 4 포함). design 가이드에 5편 `--c5`(틸) 색상표 행 추가 + 섹션 카드 "5편식 단색"을 신규 표준으로 명시(1~3편 레인보우는 레거시). footer·폰트·styles.css·사이드바 TOC 등 나머지 규칙은 7개 페이지 모두 준수 확인.

### 2026-05-28
- **새 페이지 제작 가이드 문서 추가** — [new-page-guide.html](new-page-guide.html)
  CTA·TOC 사이드바 포함 전체 HTML 뼈대 템플릿과 체크리스트. CLAUDE.md "When adding a new page" 섹션에서 참조.
- **B-mini 엔트리 블록 SVG 미니 렌더러 도입** — [entry-blocks-renderer.html](entry-blocks-renderer.html) · [PR #16](https://github.com/kkh029/entry-guide/pull/16)
  기존 `.eb`/`.cblk` CSS 흉내내기 블록을 실제 엔트리 에디터(playentry.org/ws)와 시각적으로 거의 동일한 SVG로 교체. 7개 모양 + 5개 필드 + 재귀 nesting. 색상·아이콘은 entrylabs/entryjs (Apache 2.0)에서 vendoring.
