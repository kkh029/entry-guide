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

1. Copy the `<head>` (fonts + `assets/styles.css` link) and the `home-link` / `home-link-bottom` / `footer` pattern from an existing episode.
2. Pick or assign an accent token (`--c1`/`--c2`/`--c3`/`--green`/`--accent`) and apply via `section.card.c-{color}` and any page-specific styles.
3. Add the page to `docs/index.html` — both the `.toc-grid` list (if it's a new episode) and the path strip if it changes the learning order.
4. No router, no build — links are plain relative paths (`href="entry-game-X-foo.html"`).
