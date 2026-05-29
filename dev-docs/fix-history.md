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
