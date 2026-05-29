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

### 2026-05-29
- **5편 「튕기기와 탄성」 추가 (튕김·반사·탄성계수 + 통통 공 데모)** — [entry-game-5-bounce.html](entry-game-5-bounce.html)
  시리즈에 없던 반사/탄성을 마지막 편으로 추가. 4편의 "쿵 멈춤"→"통통 튕김" 브리지. `--c5`(틸) 토큰 + `.c-teal` 추가, 4편 CTA·index `ep-5`·path·"6편 후보" 배선. 데모는 탄성계수 슬라이더(0.5~1.0)로 통통 정도 체감 — 헤드리스 검증 6회 튕기고 ~185프레임 정착. 범위는 코어만(공끼리 충돌은 6편 후보).

### 2026-05-28
- **새 페이지 제작 가이드 문서 추가** — [new-page-guide.html](new-page-guide.html)
  CTA·TOC 사이드바 포함 전체 HTML 뼈대 템플릿과 체크리스트. CLAUDE.md "When adding a new page" 섹션에서 참조.
- **B-mini 엔트리 블록 SVG 미니 렌더러 도입** — [entry-blocks-renderer.html](entry-blocks-renderer.html) · [PR #16](https://github.com/kkh029/entry-guide/pull/16)
  기존 `.eb`/`.cblk` CSS 흉내내기 블록을 실제 엔트리 에디터(playentry.org/ws)와 시각적으로 거의 동일한 SVG로 교체. 7개 모양 + 5개 필드 + 재귀 nesting. 색상·아이콘은 entrylabs/entryjs (Apache 2.0)에서 vendoring.
