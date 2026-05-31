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
  ✅ 1순위 힘·질량 = 6편, ✅ 2순위 운동량·충돌 = 7편으로 완료. 남은 우선순위: 에너지 → 경사면·마찰 → 공기저항·낙하산 → 스프링·진동 → 원운동 → 빛 반사.
  각 주제의 게임 아이디어·배울 개념·코딩 요소 상세는 [review_20260529.md](review_20260529.md) "추가로 다루면 좋은 주제 제안"(3~8순위) 참조.
- [ ] **8편 후보 — 점수·게임 규칙 또는 에너지/경사면** — 출처: [entry-game-7-collision.html](entry-game-7-collision.html)
  7편이 운동량·충돌(물리)로 정해져 「점수·게임 규칙」(코인·적·체력·레벨)은 8편으로 이월. index "8편 후보"에 점수·게임 규칙 / 에너지(롤러코스터) / 경사면·마찰 노출. 물리를 더 할지 게임 완성도로 갈지 선택.

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

- [x] **개념↔구현 분리 구조를 전 편(1~5편)으로 확대 완료** — 3편 파일럿 패턴(`.goals`·🔬/🧩·`.tip.real`·`.fix`·⭐도전)을 1·2·4·5편에 모두 적용. 1편은 충돌·중력 개념 분리 + 🧩 구현 존 재구성, 2·4·5편은 박스·프리픽스 추가 위주(4편 §5→⭐도전, 5편 벽 튕김·새총 ⭐도전 신설) (PR #25)
- [x] **review.md → review_20260529.md 참조 정리 + 커밋 여부 해결** — 파일은 이미 커밋(`a0b2a13`), 끊긴 링크/언급 갱신 (PR #25)
- [x] **new-page-guide.html 액센트 색상표에 `--c4`·`--c5` 행 추가** — review_20260529.md 반영 변경에 포함 (PR 시 번호 기입)
- [x] **6편 「힘과 질량」 추가** — [entry-game-6-force.html](entry-game-6-force.html) (PR #27)
  후속 물리 1순위(힘·질량·뉴턴 제2법칙, 가속도=힘÷질량) + 상자 밀기 데모. `--c6` 마젠타·`.c-magenta`, 5편 CTA→6편(완주 문구 제거), index "6편 후보"→"7편 후보", 4편 CTA "마지막 한 편"→"다음 편" 정정. `--c6` 행은 후속 new-page-guide 색상표 갱신 대상.
- [x] **7편 「운동량과 충돌」 추가** — [entry-game-7-collision.html](entry-game-7-collision.html) (PR #27)
  후속 물리 2순위(운동량=질량×속도, 충돌=속도 교환) + 당구 1D 탄성 충돌 데모. `--c7` 와인·버건디·`.c-wine`, 6편 CTA→7편(완주 문구 제거), index "7편 후보"→"8편 후보", CLAUDE.md 7-part·트리 갱신. 엔트리 핵심=‘임시속도’ 변수로 두 공 속도 스왑. `--c6`·`--c7` 행은 후속 new-page-guide 색상표 갱신 대상.
