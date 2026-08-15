---
name: html-design-doc
description: Produce exactly ONE HTML document from planning/design/development conclusions — decisions, chosen options, open items, risks — conclusions only, light theme, inline SVG diagrams, local image/video assets allowed. Use when the user asks to turn plans, designs, decisions, or outcomes into an HTML design doc/report/page — e.g. "把决策/结论转成 HTML 设计文档", "做成 HTML 报告", "把规划/设计/开发内容转成单页 HTML". For general HTML pages or slide decks, prefer other skills.
---

# HTML design document

Turn the conclusions of planning / design / development discussions into **exactly one HTML file** — nothing else is produced.

- **Single file**: generate exactly one HTML file — inline all CSS and any SVG, no network dependencies except reference hyperlinks; opens from `file://` as-is. "One file" means the document itself: local media assets stay external.
- **Local assets**: reference existing images and videos by paths relative to the HTML file; don't copy or embed them unless asked.
- **Content: conclusions only.** Decisions, chosen options, open items, risks. No process — no Q&A history, no discussion trails, no "we considered A then switched to B" narratives.
- **Light theme**: light background, dark ink text; accent colors allowed, but the overall feel stays light.
- **One screen first**: fit a single viewport when possible — compact tables, tight typography, minimal vertical space; if the content genuinely cannot fit, keep it as short as possible rather than sprawling.
- **Free visual design**: you are the designer. If `ui-ux-pro-max` is available, use its light-theme design guidance; otherwise design freely. Treat it as design guidance, not as a runtime dependency. Whenever a visual explains a flow, mechanism, comparison, or data point more clearly than text, draw it as lightweight inline SVG — always self-contained.
- **Structure hint (not binding)**: title + one-line subtitle → decisions (compact table or card list) → open items / risks (small callouts).
- **Saving**: save to the user-specified path when provided; otherwise save to the project root. A project `docs/` directory may be used when it is the established location for documentation. Name the file descriptively (e.g. `<topic>.html`); never overwrite existing files. Report the final absolute path when done.
- **Verify before finishing**: the HTML opens locally and every referenced local image/video path resolves; report missing assets instead of inventing them.
- Language follows the conversation.
