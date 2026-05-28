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

### 2026-05-28
- **B-mini 엔트리 블록 SVG 미니 렌더러 도입** — [entry-blocks-renderer.html](entry-blocks-renderer.html) · [PR #16](https://github.com/kkh029/entry-guide/pull/16)
  기존 `.eb`/`.cblk` CSS 흉내내기 블록을 실제 엔트리 에디터(playentry.org/ws)와 시각적으로 거의 동일한 SVG로 교체. 7개 모양 + 5개 필드 + 재귀 nesting. 색상·아이콘은 entrylabs/entryjs (Apache 2.0)에서 vendoring.
