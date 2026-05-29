# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A static-HTML Korean coding-education site (초등·중학생 대상) that teaches block coding with **Entry** (entry.org.kr — a Korean Scratch-like platform). Content is a 3-part series that builds physics-based game movement step by step (이동·충돌 → 속도·가속도 → 관성·마찰), plus a TOC and an "엔트리란?" intro page.

Live URL: https://kkh029.github.io/entry-guide/docs/

## How it builds and deploys

There is **no build step and no package manager**. The site is plain HTML/CSS/JS served directly from `docs/`.

- `.github/workflows/deploy.yml` uploads `docs/` to GitHub Pages on every push to `main` (also runnable via `workflow_dispatch`).
- `docs/.nojekyll` is required — without it, GitHub Pages runs Jekyll and silently breaks asset paths. Do not remove.
- `actions/configure-pages@v5` runs with `enablement: true` so the workflow itself enables Pages — needed because past deploys failed when Pages wasn't pre-enabled in repo settings (see d503c3c).
- To preview locally: open `docs/index.html` directly, or `python3 -m http.server 8000 --directory docs` then visit `http://localhost:8000/`.

## Git workflow

**PR을 만들기 직전에는 항상 `origin/main` 위로 리베이스한 상태인지 확인한다.**

```
git fetch origin main
git rebase origin/main          # 이미 최신이면 no-op
git log HEAD..origin/main       # 출력이 비어 있어야 함 (= behind 0)
```

behind 0 확인 후 `git push -u origin <branch>` (리베이스로 히스토리가 바뀌었으면 `--force-with-lease`) → PR 생성.

`main` 자체는 절대 force-push 하지 않는다.

## Two top-level folders — do not conflate

- **`docs/`** = production deployable. Everything here is served by GitHub Pages at `/entry-guide/docs/`. Treat as user-facing.
- **`dev-docs/`** = internal working notes. Session-level design docs, architecture analyses, refactor plans, etc. **Not deployed.** The `session-doc` skill (and any "이번 세션 내용 문서로 정리해줘" / "design doc 만들어줘" requests) must write here, never into `docs/`.

  Inside `dev-docs/`:
  - **`<topic-slug>.html`** — individual design docs, one per topic (kebab-case, English slug). Use `session-doc` boilerplate.
  - **`fix-history.md`** — chronological index of all design changes (newest first, one line + link per item). **Update when adding any new design doc** — add a new entry at the top with a one-line summary and PR link.
  - **`next-steps.md`** — consolidated TODO index pulled from every design doc's "후속 TODO" section. **Update when adding/revising a design doc** — move its outstanding TODOs here, and mark completed ones with the PR number.
  - **`assets/{style.css,doc.js}`** — shared HTML doc styling (created by `session-doc` skill on first use; do not overwrite).

  The folder is kept in git via `.gitkeep` so the convention is visible even when empty.

`velocity-improvement-plan.md` at repo root is a pre-existing rewrite plan; new design-style docs should go under `dev-docs/` instead of being added to the root.

## Page architecture

Each page in `docs/` is a **self-contained HTML file**: page-specific `<style>` block in `<head>`, content, then any interactive demo's `<script>` inline at the bottom. There is no shared JS file and no templating — duplication across pages (header, home links, footer) is intentional and edited per-file.

```
docs/                           # ← served by GitHub Pages
├── index.html                  # TOC / landing
├── about-entry.html            # "엔트리란?" intro (green accent)
├── entry-game-1-movement.html  # 1편 (red accent, --c1) — has canvas demo
├── entry-game-2-velocity.html  # 2편 (blue accent, --c2)
├── entry-game-3-inertia.html   # 3편 (purple accent, --c3)
└── assets/styles.css           # ONLY shared file — common tokens, layout, Entry-block visuals

dev-docs/                       # ← internal, not deployed (session-doc output lives here)
```

### Shared primitives in `assets/styles.css`

All pages depend on these — changing them affects every page:

- **Design tokens** (`:root`): paper/ink palette, plus per-episode accents `--c1` (red, 1편), `--c2` (blue, 2편), `--c3` (purple, 3편), and `--green` (about-entry). Keep new pages consistent with this scheme.
- **Layout**: `<header>` → `.stage` (animated character stage) → `.wrap` (max-width container) → `section.card.c-{red|blue|purple|green|gold}` with `.step-no` numbered circles. Sections are separator-divided (not boxed) — `section.card + section.card` adds a thin top border.
- **Tip/callout boxes**: `.tip`, `.tip.warn`, `.tip.bonus`.
- **Entry block visuals**: `.hat` (event), `.stack.move`/`.stack.data` (stack blocks), `.cblk.flow` (C-shape flow blocks), `.bool` (judgment), `.calc` (number op), `.in` (input slot), `.note` (annotation). These deliberately use real Entry block colors (`--c-start`, `--c-flow`, `--c-move`, `--c-judge`, `--c-data`, `--c-calc`) because students will see the same colors in the actual Entry editor — **do not desaturate these even if the surrounding page tone is muted**.
- **Navigation**: `.home-link` (fixed top-left "🏠 목차로") + `.home-link-bottom` at end of content. Every content page must include both.

### Per-page footer (must match across all pages)

```html
<footer>
  엔트리로 만드는 나만의 게임 · <편 정보><br>
  <span style="font-size:10px;opacity:.7;">
    © 2026 김경환 · <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.ko" target="_blank" style="color:inherit;">CC BY-NC-SA 4.0</a>
  </span>
</footer>
```

The "© 2026 김경환 · CC BY-NC-SA 4.0" wording was deliberately unified across pages (#8, #11) — keep it identical when adding a new page or editing an existing one.

### Fonts

All pages preconnect to Google Fonts and load **Jua** (titles/UI labels), **Gowun Dodum** (body, set on `body`), **Gaegu 700** (chips/legend). Keep this trio consistent on new pages.

## Content conventions

- **Language**: All learner-facing copy is Korean, written for 초등·중학생. Tone is encouraging, uses 반말체 sparingly and 해요체 mostly, with frequent emoji as visual anchors.
- **Episode order is load-bearing**: 1편 → 2편 → 3편. 2편 references 1편's "딱딱함"; 3편 fixes 2편's "안 멈추는" problem. When editing one episode, check that bridges to/from neighboring episodes still make sense.
- **`velocity-improvement-plan.md`** is an active rewrite plan for `entry-game-2-velocity.html` (narrative restructure + Scratch Wiki / Pinnguaq citations). Treat it as authoritative when working on 2편 — it documents licensing constraints for external sources (Scratch Wiki = CC BY-SA 4.0 with attribution; Pinnguaq = attribution required; Breakout Mentors = ideas only, no quotes).

## When adding a new page

**Full guide (template + checklist):** `dev-docs/new-page-guide.html`

Quick steps:

1. Copy `docs/entry-game-2-velocity.html` as the base (most up-to-date structure).
2. Fill in the `<!-- FILL -->` placeholders: title, badge, h1, sections, footer episode label.
3. Pick or assign an accent token (`--c1`/`--c2`/`--c3`/`--green`/`--accent`) and apply via `section.card.c-{color}` and the page-specific `.cta` style.
4. Add a `.cta` block (heading + description + colored `<a class="go">` button) just before `.home-link-bottom`. The last episode in the series should link to `index.html` with "🏠 목차로 돌아가기".
5. Keep the `<nav class="toc-sidebar">` element + TOC script block at the very end of `<body>` — it auto-collects every `section.card h2` into a sticky right sidebar on wide screens (≥1240 px). No changes needed to the script itself.
6. Add the page to `docs/index.html` `.toc-grid` and update the previous episode's CTA button to point to the new page.
7. No router, no build — links are plain relative paths (`href="entry-game-X-foo.html"`).

---

## Conventions (프로젝트 공통)

- **문서 작성은 `session-doc` 스킬 경유** — 세션 정리·기능 설계·구조 분석·아키텍처/정책 결정·모듈 설계처럼 향후 참조할 가치가 있는 문서를 `dev-docs/` 에 새로 만들거나 갱신할 때는 `/session-doc` 스킬을 사용한다.
- **`dev-docs/fix-history.md`** — 의미 있는 수정·동작 변화 후 파일 최상단에 항목 추가. 예외: 오타·주석·포매터 수정만 있거나 별도 phase 문서를 이미 작성한 대형 도입 작업.
- **설계 문서가 SSOT** — 문서와 코드가 다르면 문서 쪽이 우선이라고 가정하고 작업한다.

---

## PR 생성 전 절차

PR을 올리기 전에 아래 순서를 반드시 완료한다.

1. **세션 문서 작성** — `/session-doc` 스킬을 실행해 이번 세션에서 변경한 내용을 `dev-docs/` 에 문서로 남긴다.
2. **변경 로그 갱신** — `dev-docs/fix-history.md` 최상단에 이번 변경 항목을 추가한다 (트리거 조건·포맷은 기존 항목 참고).
3. **다음 단계 갱신** — `dev-docs/next-steps.md` 를 검토해 이번 사이클에서 완료된 항목은 제거하고 새로 발견된 follow-up / 개선안 / 미해결 이슈를 적절한 카테고리에 추가한다.
4. **main 머지** — `git fetch origin && git merge origin/main` 으로 최신 main 을 로컬 브랜치에 반영하고 충돌을 해결한다.
5. **PR 생성** — 위 파일들도 같은 커밋 또는 PR에 포함한다.

> fix-history 갱신 면제 조건: 오타·주석·포매터 수정만 있는 경우, 또는 별도 phase 문서를 이미 작성한 대형 도입 작업.
