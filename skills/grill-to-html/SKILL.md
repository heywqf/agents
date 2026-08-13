---
name: grill-to-html
description: Grill the user relentlessly about a plan, decision, or idea — design-tree rounds with numbered questions and recommended answers. Ends at shared understanding; only when the user explicitly asks does it finish with exactly one self-contained HTML design doc. Use when the user wants to stress-test their thinking, uses 'grill'/推敲/挑战 phrasing, or wants a design document produced.
---

# Grill, then (optionally) document

## Phase 1 · The interview — always

Interview the user relentlessly until you reach a shared understanding. Map this as a **design tree**: every decision branches into the decisions that hang off it.

Work the tree in **rounds**. The **frontier** is every decision whose prerequisites are already settled — the questions you can ask now without guessing at answers you haven't heard yet. Ask the whole frontier in one round: number each question and give your recommended answer. Then wait for the user's answers before the next round.

Each question formatted like so:

```
❓ **Q1** - **<question title>**: <question body, maybe multiple paragraphs, including choices>

➡️ <your recommended answer>
```

Each round's answers reshape the tree — settled decisions push the frontier outward and unblock questions that depended on them. Recompute the frontier and ask the next round. A question whose answer depends on another question still open in this round belongs to a later round.

Finding facts is your job, never the user's: look things up with your tools (filesystem, code, web search) instead of asking. Don't block on it — a running look-up is an unsettled prerequisite; only questions downstream of it wait, ask the rest of the frontier now. The decisions are the user's — put each to them and wait.

The session is done when the frontier is empty and the user confirms shared understanding. Then:

- **If the user explicitly asked for an HTML design doc** (or confirms they want one now) → proceed to Phase 2.
- **Otherwise, stop here.** The interview was the deliverable — write no files, no ADRs, no summaries.

## Phase 2 · The HTML doc — only on explicit request

Produce **exactly ONE self-contained HTML file** and nothing else:

- Inline CSS, no required network dependencies (reference hyperlinks allowed).
- **Light theme first** (浅色为主): light background, dark ink text; accent colors allowed but the overall feel stays light.
- **Free visual design** — you are the designer. If the `ui-ux-pro-max` skill is available locally it will load itself when relevant; consult it for design language if it does. It is a soft reference only — if it is not installed, proceed with your own judgment and never treat it as a requirement.
- **Content: conclusions only.** Show what was decided — decisions, chosen options, open items, risks. No process: no Q&A history, no discussion trails, no "we considered then changed our mind" narratives.
- **One screen first.** Design to fit a single viewport — compact tables, tight typography, minimal vertical space. If the content genuinely cannot fit, keep it as short as possible rather than sprawling.
- **Diagrams over words**: explain flows and mechanisms with inline SVG geometry whenever a visual makes it clearer (pipeline steps, comparisons, decision branches) — lightweight, always self-contained. Photographic images via local relative path — copy into the project if needed.
- Structure hint (not binding): title + one-line subtitle → decisions (compact table or card list) → open items/risks (small callout).
- Language follows the conversation (the project's existing docs are zh-CN).
- Save to the project root; if the project already has a `docs/` or `static/` directory, place it there instead.
