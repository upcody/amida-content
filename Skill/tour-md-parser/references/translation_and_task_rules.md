# Task and Flow
- Input: unstructured tour file from `tours/drafts`.
- Goal: format to standard, extract metadata, translate to RU/EN/LV, place into `tours/ready`.

# Metadata and saving
- Determine from text: `TourName(City)` and `NumberOfDays`.
- Output folder: `tours/ready/<TourName(City)_NumberOfDays>/` (English).
- Filenames: `<Prefix>_RU.md`, `<Prefix>_EN.md`, `<Prefix>_LV.md`, where `<Prefix>` = `TourName(City)_NumberOfDays`.

# Steps
1) Format the document per `formatting_rules.md`.
2) Build frontmatter (YAML) with fields:
   - `title`: document title (from H1, title case).
   - `description`: SEO description 100–160 chars summarizing the tour.
   - `city`: tour city.
   - `country`: tour country and any countries mentioned in the itinerary.
   - `duration`: duration (e.g., `8 days`).
   - `price`: minimum/start price, if available.
   - `date`: dates in `YYYY-MM-DD`, future only.
3) Translate the final formatted text to RU, EN, LV.
4) Save to `tours/ready/...` with the required names.

# Special requirements
- No extra comments/explanations — output Markdown only.
- Preserve text as close to the original as possible: do not shorten or paraphrase. Only allowed changes: spelling/punctuation fixes, applying markup, formatting currency/date/headings.
- For dates, show the price if present in source, next to the date/period (old/new prices per rules).
- If a section has no data (excursion package, add-ons, etc.), omit the section.
- Currency rules and removals are in `formatting_rules.md`.
