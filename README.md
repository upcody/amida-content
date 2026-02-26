# Amida Content — Tours Markdown Pipeline

This project converts travel documents from `tours/uploads` to clean Markdown drafts in `tours/drafts`, then formats and translates them to RU/EN/LV into `tours/ready`.

## Prerequisites
- [Bun](https://bun.sh/) (used for scripts)
- [Pandoc](https://pandoc.org/installing.html) optional — only for fallback conversion; default uses pdf2html+turndown

## Install dependencies
```bash
bun install
```

## CLI usage (without Codex)
1) Put source files in `tours/uploads/`.
2) Convert uploads → drafts:
```bash
bun run mdify          # runs cli/mdify.ts (pdf→HTML→MD, filename normalization)
```
3) Manually format/translate drafts per your process, or use the Codex skill below.

## Codex skill (tour-md-parser)
A self-contained skill lives in `Skill/tour-md-parser/` (includes its own node_modules with pdf2html JARs).

What it does
- Runs the same conversion step (uploads → drafts) via `scripts/mdify.ts`.
- Applies formatting rules (`references/formatting_rules.md`).
- Translates to RU/EN/LV and saves to `tours/ready/<Tour_City>_<Days>/<prefix>_{RU,EN,LV}.md`.

How to install into Codex
1) Copy the entire folder (including node_modules):
   - From this repo: `Skill/tour-md-parser/`
   - To Codex skills dir: `%USERPROFILE%\.codex\skills\tour-md-parser\`
2) Restart Codex.

How to use with Codex
- Run conversion step (from project root): `bun Skill/tour-md-parser/scripts/mdify.ts`
- Ask Codex to format drafts and produce ready files (e.g., “Process tours: format drafts from tours/drafts, translate to RU/EN/LV, and place into tours/ready”).

## Data flow
- Input: `tours/uploads/`
- Intermediate: `tours/drafts/` (auto-created)
- Output: `tours/ready/<Tour_City>_<Days>/<prefix>_{RU,EN,LV}.md`

## Notes
- pdf2html is bundled in the skill’s node_modules; no need to install it in the project.
- Keep drafts intact; the skill preserves day-by-day text, only adjusts formatting, currencies, and minor typos/punctuation.

