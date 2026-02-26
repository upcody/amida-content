---
name: tour-md-parser
description: "Automates the tour pipeline: converts uploads→drafts via built-in mdify (pdf2html+turndown), normalizes filenames, applies formatting rules, translates RU/EN/LV, and saves results into tours/ready."
---

# Overview
- Working dir: project root. Paths: `tours/uploads` (input), `tours/drafts` (intermediate), `tours/ready` (output).
- Requirements: `bun` installed, `pandoc` optional. Project deps are not needed — the skill is self-contained.
- Built-in parser: `scripts/mdify.ts` mirrors `bun run mdify`.
- Local deps live in `Skill/tour-md-parser/node_modules` (pdf2html with JAR, cheerio, turndown, any-ascii). When moving the skill, copy the entire folder.

# Workflow
1. Find `tours/uploads`. If empty — report nothing to process.
2. Run conversion uploads → drafts:
   - Preferred: `bun scripts/mdify.ts` from the skill folder.
3. For each file in `tours/drafts`:
   - Apply `references/formatting_rules.md`.
   - Apply `references/translation_and_task_rules.md` (structure, frontmatter, prices, dates).
   - Translate final text to RU, EN, LV.
   - Save to `tours/ready/<Tour_City>_<Days>/` as `<prefix>_RU.md`, `<prefix>_EN.md`, `<prefix>_LV.md`, where `<prefix>` = `TourName(City)_NumberOfDays` in English.
4. Before writing, create `tours/ready/<...>/` if missing.

# Execution notes
- Do not modify uploads; work with drafts, write to ready.
- mdify trims PDF page duplicates using `xmpTPg:NPages`.
- Pandoc fallback is possible, but default is the built-in mdify.
- Preserve source text (especially daily schedules) without shortening/paraphrasing; only spelling/punctuation fixes and formatting are allowed. Show price in the dates block if present. If there is an "IMPORTANT:..." block in the source, copy it fully.

# Useful commands
- `bun scripts/mdify.ts` — convert uploads → drafts from the skill folder.
- When moving the skill to a new machine: run `bun install` in `Skill/tour-md-parser` if you need to rebuild node_modules, but usually copying the folder is enough.

# References
- `references/formatting_rules.md` — layout, lists, currencies, daily plan, important info.
- `references/translation_and_task_rules.md` — formatting, metadata, translations RU/EN/LV, file/folder naming.
