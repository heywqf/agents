---
name: html-design-doc
description: Produce exactly ONE self-contained HTML design document — decisions, chosen options, open items, risks — conclusions only, light theme, inline SVG diagrams. Use when the user asks to turn decisions, analysis, plans, or outcomes into an HTML design document or HTML report/page — e.g. "把决策/结论转成 HTML 设计文档", "做成 HTML 报告", decision log, ADR, 评审结论. For general HTML pages or slide decks, prefer other skills.
---

# HTML design document

Summarize the current conversation's decisions or the user's provided notes into a **single self-contained HTML file** — nothing else is produced, and this is not a file transform.

- Inline CSS only; no CDN fonts/icons/JS or other network dependencies (hyperlinks allowed). Must open from `file://` without errors.
- **Light theme**: light background, dark ink, accent colors allowed.
- **Polish bar**: the result should look deliberately designed — clear visual hierarchy, tasteful accents, tight typography, scannable tables — never functional-but-plain. Match or exceed the style of the project's existing design docs, if any.
- **You are the designer — the layout follows the content.** Adapt the visual language to the material: a config summary, a level plan, and a risk review deserve different treatments. Proven patterns, use as needed, never all at once:
  - hero header (gradient, title, subtitle) with 2–4 KPI cards
  - numbered sections with badge markers; two-column grids for comparisons
  - decision tables (decision / chosen option / rationale / status)
  - semantic colors (good / warn / risk) as CSS variables; badges and note callouts
  - annotated inline SVG diagrams for flows, waveforms, branches, pipelines
  - light interactivity only where it earns its place (chips, toggles, chart tooltips)
- **Content: conclusions only.** Decisions, chosen options, open items, risks. No process: no Q&A history, no discussion trails, no "we considered then changed our mind" narratives.
- **Compact first**: start from a one-screen layout (~1280×800); richer content may extend beyond, but stay dense and scannable — never padded.
- **Diagrams over words**: explain flows and mechanisms with inline SVG whenever a visual makes it clearer. Small raster images may be base64-embedded; larger ones may be copied into the project as local relative paths — never hotlink.
- Save to the project root, or to `docs/` if it exists. Name it descriptively (e.g. `<topic>.html`); don't overwrite existing files.
- Language follows the conversation; match the project's existing docs when they set a convention.
- Final sanity check: single file, opens offline, light theme, decisions only, correct filename and location.
