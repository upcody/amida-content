# Markdown Formatting for Tours

## Overall structure (order)
1. Frontmatter (YAML) — required.
2. H1: main tour title.
3. Prices/Dates block (H3 + bold dates and prices).
4. “Included in the tour price” (H3 + bulleted list).
5. “Excursion/transport package” (H3 + list) — if applicable.
6. “Excursions paid on the spot (optional)” (H3 + list) — if applicable.
7. “Daily plan” (H3 for each day + text).
8. “Additionally you can purchase” (H3 + lists/text) — if applicable.
9. “Paid on the spot” (H3 + lists/text) — if applicable.
10. “Important information” (H3 + lists/text) — required.

## Frontmatter
- Start/end with `---`.
- Fields: `title`, `description` (100–160 chars, SEO), `city`, `country`, `duration`, `price`, `date` (YYYY-MM-DD, future only).
- `title` from H1, in title case.

## Prices and dates (block after H1)
- H3 heading, e.g. `### from 519 euro`.
- Each date in bold. Prices in bold; old price may be strikethrough with `~~`.
- Put the price next to the date/period if present in source (old/new per above).
- Separate date blocks with a blank line.
- Remove noise like “Top of Form / Bottom of Form”.

## Lists
- Use bulleted lists (`-` or `*`), end each item with a period.
- Excursion packages and add-on services: format consistently; if multiple, keep order.

## Daily plan
- Each day: H3 (bold/italic acceptable), e.g. `### DAY 1`.
- One blank line after the heading, then the day text. Blank line between days.
- Inner text should not exceed H3 level (max H4).
- Preserve the full day text without shortening or paraphrasing. Only fix spelling/punctuation and apply required formatting.

## Currencies
- Insert `&nbsp;` between number and currency symbol: `500&nbsp;€`, `500&nbsp;$`.
- Fix cases without space (500€ → 500&nbsp;€).
- In the dates block, show the price if present in the source, next to the date/period.

## Remove from text
- Lines like “Exact departure time see on our site…” and equivalents in any language.
- Lines like “Before booking the tour, please visit IMPORTANT INFORMATION.” and equivalents.
- If the source has a “IMPORTANT:” line/block, keep it intact; make “IMPORTANT” bold. Do not delete.

## Important information
- H3: `### Important information`.
- List or text. If there is a separate “Important: ...” line, make “Important” bold.
