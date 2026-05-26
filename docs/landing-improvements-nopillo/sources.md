# Sources

> Toutes les sources documentaires citees dans ce rapport.

---

## Docs Produit / Formation

| Doc | Lignes citees | Citation principale |
|---|---|---|
| `docs/formation-nopillo/_index.md` | 30-46 | Stack pedagogique + 3 formats |
| `docs/formation-nopillo/03-methodologie-formateur.md` | 9-14, 158-176 | Pipeline 4 etapes + manifeste 5 principes |
| `docs/formation-nopillo/04-format-1-jour.md` | 12-14 | Tarif 950 EUR + livrable 1j |
| `docs/formation-nopillo/05-format-2-jours.md` | 12-14, 191-202 | Tarif 1900 EUR + 6 skills produits |
| `docs/formation-nopillo/06-format-3-jours.md` | 12-14, 41-91 | Tarif 2850 EUR + Modules 9-12 (alternatives Webflow) |

## Docs Methodologie

| Doc | Lignes citees | Citation principale |
|---|---|---|
| `docs/methodologie-documentation-first/01-manifeste.md` | 7-23 | 5 principes integral (a accrocher au mur) |
| `docs/methodologie-documentation-first/02-pipeline-doc-cdc-skill.md` | 35-42, 86-95, 130-158 | Format outputs doc-maker, cdc-maker, skill-maker |
| `docs/methodologie-documentation-first/05-pattern-skills-recurrents.md` | 23-77, 235-261 | 14 skills agency type + priorisation |
| `docs/methodologie-documentation-first/06-roi-mesure.md` | 14-46 | KPIs avant/apres (temps, qualite, conversion) |

## Docs MCP

| Doc | Lignes citees | Citation principale |
|---|---|---|
| `WEBFLOW-MCP.md` | 38-44, 95-96 | 18 categories outils Webflow MCP + exemples |
| `docs/hubspot/_index.md` | tout | Index 11 fichiers HubSpot |
| `docs/hubspot/04-api-crm.md` | 19-34 | Objets CRM standards |
| `docs/hubspot/09-mcp-remote-server.md` | 53-92 | 13 tools HubSpot MCP |
| `docs/google-ads/_index.md` | 32-43 | Concepts cles 2026 |
| `docs/google-ads/03-landing-page-quality-score.md` | 12-37 | Quality Score 3 composantes + impact CPC |
| `docs/google-ads/04-mcp-google-ads.md` | 14-22 | Definition MCP user-facing |
| `docs/google-ads/05-personalization-dynamic-content.md` | 17-49, 56-89 | DKI + impact + code JS |
| `docs/meta-ads-mcp/_index.md` | 26-32 | Recommandation Nopillo (officiel + Pipeboard) |
| `docs/meta-ads-mcp/06-setup-claude-code.md` | 9-30 | Setup MCP officiel Meta |

## Docs Alternatives

| Doc | Lignes citees | Citation principale |
|---|---|---|
| `docs/supabase-edge-landing/_index.md` | 44-53 | TL;DR decideur (80% Webflow) |
| `docs/supabase-edge-landing/03-personalization-patterns.md` | 14-46, 56-83 | URL params + geo-IP + A/B test |
| `docs/supabase-edge-landing/08-stack-recommande-nopillo.md` | 38-43 | Stack Astro + Tailwind + Netlify + Supabase |
| `docs/netlify-landing/_index.md` | 33-37 | TL;DR Webflow vs Netlify |
| `docs/netlify-landing/02-stack-recommande.md` | 4-23, 47-56 | Astro + Tailwind comparaison frameworks |

## Docs Skills

| Skill | Citation principale |
|---|---|
| `.claude/skills/connect-hubspot-form/SKILL.md` | Workflow embed + tracking dedupe |
| `.claude/skills/extract-design-system/SKILL.md` | Pipeline 6 etapes + operating rules |
| `.claude/skills/landing-google-ads/SKILL.md` | Workflow 7 etapes + ROI mesure |
| `.claude/skills/landing-meta-ads/SKILL.md` | Workflow 8 etapes + ROI mesure |
| `.claude/skills/scout-concurrents/SKILL.md` | Pattern fan-out 5-10 doc-maker |
| `.claude/skills/apply-nopillo-ds/SKILL.md` | Workflow 5 etapes |

## Docs Design System

| Doc | Lignes citees | Citation principale |
|---|---|---|
| `docs/design-system-extraction/_index.md` | 30-58 | Pipeline 5 etapes + regle d'or |
| `docs/design-system-extraction/04-workflow-claude-code.md` | 9-18 | Pipeline 7 etapes |
| `docs/design-system-extraction/nopillo-extracted/_index.md` | 26-39 | TL;DR (88 variables, tokens DTCG, composants) |

## Docs Audit & Specs Landing

| Doc | Lignes citees | Citation principale |
|---|---|---|
| `docs/audit-landing-vs-nopillo/_index.md` | 22-39, 188-203 | Score 3/10 + corrections P0/P1/P2/P3 |
| `docs/cdc-landing-formation-nopillo/01-specs.md` | 25, 99-107, 142 | Persona + cards 3 formats + placeholders quotes |
| `docs/cdc-landing-improvement/_index.md` | 1-3, 19-48 | Cas We Invest + 5 defauts + KPIs |
| `docs/landing-page-best-practices/06-anti-patterns.md` | 3 (vague headline), 4 (info below fold), 1 (multiple goals) | Top 13 anti-patterns conversion |

---

## Live landing analysee

- URL : `https://landingformnopillo.webflow.io/`
- Fichier local : `/tmp/landing.html` (22 238 octets, single-line)
- Date analyse : 2026-05-05
- Headings extraits : 18 (1 H1, 9 H2, 8 H3)
- Sections identifees : 8 (Hero, Probleme, Methode, Formats, Etude cas, Preuve methodo, FAQ, CTA)

---

## Outils utilises

- `curl -sL --compressed -A "Mozilla/5.0..."` pour fetch landing
- `grep -oE` sur HTML brut pour extraction headings + paragraphes + liens
- `Read` Claude Code sur 25+ fichiers docs/ + 6 skills
- Pas de Playwright MCP (non disponible dans cet environnement) — analyse visuelle reportee a `docs/audit-landing-vs-nopillo/_index.md` deja existant
