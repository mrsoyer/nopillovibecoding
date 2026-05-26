---
name: extract-design-system
description: Use this skill when the user wants to extract a design system from an existing website to reproduce it in Webflow. Aspirates colors, typography, spacing, components from a reference site and generates DTCG tokens importable in Webflow Variables.
---

# Skill : extract-design-system

## When to use

Trigger this skill when the user asks to "aspire", "extract", "clone the design", "get the tokens of", "reproduce the DS of" a reference website for a Webflow project. Typical phrases: "aspire le DS de linear.app", "extract design system from stripe.com", "tokens du site X". Also fits refonte briefs that mention reference sites to study, or migration of an existing site to Webflow.

Do NOT trigger for: refactoring an existing internal DS, generic CSS questions, copywriting tasks, or full 1:1 site clones (refuse — see anti-patterns).

## Workflow

The skill runs a 6-step pipeline. Always read `references/workflow.md` for the full procedure before executing.

1. Setup & extraction (Dembrandt MCP or CLI fallback) -> `source/[domain]-raw.json`
2. Visual audit via Chrome DevTools MCP -> 5 screenshots + `[domain]-css-vars.json`
3. Curation (group, dedupe, snap to scales, max 80 tokens) -> `curated/tokens-curated.json` + `decisions.md`
4. Client adaptation if `--client` set (palette swap, OKLCH scale, contrast audit) -> `final/tokens-final.json` + `adaptations.md` + `contrast-audit.md`
5. Generate `webflow-import.css` (`:root` with primitives then semantic, kebab-case)
6. Webflow import via `mcp__webflow__variable_tool` (auto) or Variable Importer App (manual) -> `IMPORT-LOG.md`

Validation gates between steps: JSON > 1KB at step 1, 50-80 tokens at step 3, WCAG AA pass at step 4, valid CSS at step 5.

## Inputs

- `--url` : URL site reference (REQUIRED)
- `--output` : output folder (default `docs/ds-{slug}/` where slug is the domain)
- `--client` : client name (optional). If provided, reads `docs/brief-client.md` or `briefs/[client].md` to drive step 4 adaptation
- `--mode` : `interactive` (pause for validation between steps) | `auto` (default, runs end-to-end)
- `--compare <url-a> <url-b>` : alternative invocation, aspirates 2 sites and produces a comparison report (skips client adaptation)
- `--resume` : resume pipeline from last failed step (reads `[output]/.state`)

## Outputs

Generated under `[output]/` (default `docs/ds-{slug}/`):

- `source/[domain]-raw.json` — raw Dembrandt output
- `source/[domain]-DESIGN.md` — extraction summary
- `source/[domain]-css-vars.json` — CSS variables scraped from `:root`
- `source/screenshots/01-hero.png` ... `05-footer.png`
- `curated/tokens-curated.json` — DTCG 3-layer (primitive, semantic, component)
- `curated/decisions.md` — explanation of every curation choice
- `final/tokens-final.json` — post-adaptation tokens (or copy of curated if no `--client`)
- `final/adaptations.md` — substitutions made
- `final/contrast-audit.md` — WCAG AA audit per text/bg pair
- `final/webflow-import.css` — `:root { --color-* ... }` ready for Variable Importer
- `IMPORT-LOG.md` — variables created in Webflow with Collection/folder
- `REPORT.md` — final summary (counts, adaptations, next steps)
- `.state` — pipeline state for `--resume`

## References

| File | When to read |
|---|---|
| `references/workflow.md` | Always, before executing — full step-by-step procedure |
| `references/prompts.md` | When delegating an extraction/curation/adaptation task — pre-written prompts |
| `references/anti-patterns.md` | Always, before step 1 — legal gates and refusal triggers |
| `references/webflow-import.md` | At step 6 — MCP tool calls and Variable Importer fallback |

## Operating rules

1. Never overwrite `source/` after step 1.
2. No 1:1 copy: refuse if brief says "exactly like X" without 3+ adaptations (see `references/anti-patterns.md`).
3. WCAG AA fail on any text/bg pair blocks the pipeline at step 4.
4. Curation cap: 80 tokens total. Above that, alert and propose more pruning.
5. Document every substitution in `final/adaptations.md`.
6. Version artefacts with timestamp in filename (`linear-2026-05-05.json`).
7. If source font is paid (Sohne, GT Walsheim, Tiempos, Suisse, Founders, Apercu), alert + propose free alternative.
8. If client operates same sector as source AND brief mentions "comme eux" / "like them", alert "look and feel" risk and require 3+ major modifications before continuing.
