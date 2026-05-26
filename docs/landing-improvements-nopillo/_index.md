# Landing Improvements Nopillo - Plan d'ameliorations conversion

> Audit conversion + plan d'ameliorations pour `https://landingformnopillo.webflow.io`
> Date : 2026-05-05
> Auditeur : consultant pedagogie + conversion B2B
> Methode : lecture systematique des 25+ docs `docs/`, des 6 skills `.claude/skills/`, curl HTML rendu (22 238 octets), comparaison avec audit DS deja realise

---

## TL;DR

**Score "envie de faire la formation" : 4.5 / 10**

La landing actuelle est **techniquement propre** (structure, copywriting), mais reste **abstraite et meta** : elle parle DE la formation au lieu de **montrer** ce qu'on y fait. Un decideur Nopillo y voit du discours sur "skills", "MCPs", "methodologie", sans jamais comprendre concretement ce que `/connect-hubspot-form` ou un MCP Webflow **font dans la vraie vie**.

Le rapport identifie **8 sections a ajouter** et **5 micro-corrections** sur les sections existantes pour passer de 4.5 a **8/10** en envie de projet.

---

## Pourquoi 4.5 / 10 et pas plus haut

| Critere | Note | Justification |
|---|---|---|
| Clarte de l'offre | 7/10 | 3 formats lisibles, tarifs visibles, promesse claire |
| Preuve concrete (visuelle/demo) | **2/10** | Aucun screenshot, aucun "before/after", aucun output visible |
| Differenciation pedagogique | 5/10 | "Documentation-First" cite mais jamais demontre par l'exemple |
| Demystification des MCPs/skills | **2/10** | "MCPs" cite 4 fois, jamais explique ce que ca FAIT |
| Storytelling | 4/10 | Etude de cas We Invest evoquee mais sans visuel/timeline |
| Reassurance technique | 5/10 | Pre-requis dans la FAQ mais pas de "voici ce que tu sauras faire" |
| Anti-patterns landing ads | 5/10 | Hero, social proof, CTA OK, mais 0 image/preuve |
| Pertinence pour Nopillo en particulier | 4/10 | Tres generique, pas d'aspiration DS Nopillo, pas de cas client immo |
| Mobile / perf / DS marque | 3/10 | Cf. `docs/audit-landing-vs-nopillo/_index.md` (3/10) : Futura PT non chargee, pas de header/logo |
| Envie d'agir maintenant | 5/10 | CTA clair mais pas de FOMO ni d'incitation tarif/calendrier |

---

## Top 10 ameliorations prioritisees

| # | Action | Section concernee | Effort | Priorite | Gain attendu envie/10 |
|---|---|---|---|---|---|
| 1 | Ajouter section "Ce que font vraiment les MCPs" avec 4 cartes demos | Nouvelle section apres "4 etapes" | 2h Webflow MCP | **P0** | +1.0 |
| 2 | Ajouter section "Vos workflows recurrents en 1 mot" (skills before/after) | Nouvelle section apres MCPs | 2h | **P0** | +1.0 |
| 3 | Ajouter section "Aspirer un DS en 10 min" (preuve nopillo-extracted) | Nouvelle section apres skills | 1h | **P0** | +0.5 |
| 4 | Corriger Futura PT + header + headband orange (DS Nopillo) | Globale (cf. audit-landing-vs-nopillo) | 1h | **P0** | +0.5 |
| 5 | Section "Cas client We Invest" avec timeline 2h + 5 defauts evites | Refonte section etude de cas existante | 1.5h | **P1** | +0.5 |
| 6 | Section "Bonne pratique Google Ads" avec 3 leviers chiffres | Nouvelle section avant FAQ | 1h | **P1** | +0.3 |
| 7 | Section "Quand sortir de Webflow" (Supabase/Netlify) | Nouvelle section dans format 3j details | 45 min | **P1** | +0.2 |
| 8 | 5 micro-corrections sur sections existantes (cf. fichier 08) | Sections 1-3 actuelles | 30 min | **P1** | +0.3 |
| 9 | Ajouter visuel hero (illustration isometrique) + screenshot Claude Code | Section Hero | 1h | **P2** | +0.2 |
| 10 | Hover states sur CTAs et cards (`transform: translateY` + shadow) | Globale | 20 min | **P2** | +0.1 |

**Total ameliorations P0+P1** : ~9h Webflow + Claude Code MCP -> score envie 4.5 -> 8.0+/10
**Total avec P2** : ~10.5h -> score envie 8.3+/10

---

## Index des fichiers

| Fichier | Contenu |
|---------|---------|
| [01-diagnostic-landing-actuelle.md](./01-diagnostic-landing-actuelle.md) | Pourquoi la landing actuelle ne fait pas envie : meta-discours, pas de demos, anti-patterns conversion |
| [02-section-mcp-ce-quils-font-vraiment.md](./02-section-mcp-ce-quils-font-vraiment.md) | Section a AJOUTER : 4 cartes demo MCP (Webflow, HubSpot, Google Ads, Meta Ads) |
| [03-section-skills-pourquoi-cest-magique.md](./03-section-skills-pourquoi-cest-magique.md) | Section a AJOUTER : 6 skills before/after avec timing reel |
| [04-section-aspirer-ds-magique.md](./04-section-aspirer-ds-magique.md) | Section a AJOUTER : aspiration DS Nopillo en 10 min comme preuve |
| [05-section-supabase-netlify-quand-pourquoi.md](./05-section-supabase-netlify-quand-pourquoi.md) | Section a AJOUTER : decision matrix Webflow vs Supabase Edge vs Netlify |
| [06-section-google-ads-bonne-pratique.md](./06-section-google-ads-bonne-pratique.md) | Section a AJOUTER : 3 leviers Google Ads (QS 8+, DKI, perso UTM) |
| [07-section-cas-client-storytelling.md](./07-section-cas-client-storytelling.md) | Section a AJOUTER : storytelling We Invest (avant/apres methode) |
| [08-recommandations-implementation.md](./08-recommandations-implementation.md) | Plan d'action concret + 5 micro-corrections sections existantes + ordre d'insertion |
| sources.md | Sources documentaires citees |

---

## Diagnostic : 3 problemes structurels de la landing actuelle

### Probleme 1 — La landing parle DE la formation, jamais de SES OUTPUTS

Sections actuelles :
- "Vos landings ads vous coutent 3 fois trop cher" (probleme)
- "4 etapes pour passer de prompt a landing publiee" (4 etapes meta)
- "Choisissez le format" (3 formats meta)
- "Une methode appliquee a 16 dossiers, 27 755 lignes" (preuve KPIs documentation-only)

**Aucune section ne montre** :
- A quoi ressemble une landing produite avec la methode
- Ce qu'un MCP fait quand on l'invoque
- Ce qu'un skill produit comme livrable concret
- Le AVANT/APRES sur du temps reel (juste "12h -> 3h" cite dans une quote)

### Probleme 2 — Vocabulaire jargon non demystifie

Le mot "MCP" apparait sans jamais etre explique en termes user-facing. Le mot "skill" non plus. Le decideur Nopillo qui n'est pas dev se retrouve face a :

> "Webflow + HubSpot + Google Ads + Meta Ads, automatises via le Model Context Protocol."

Sans comprendre que ca veut dire concretement : "tu tapes en francais 'liste-moi mes 5 campagnes les plus rentables', Claude pulse les chiffres et te repond, sans ouvrir Google Ads."

### Probleme 3 — DS Nopillo absent visuellement

Cf. [audit-landing-vs-nopillo/_index.md](../audit-landing-vs-nopillo/_index.md) **score 3/10** :

> "Notre landing reutilise bien la palette de couleurs (`#09090b`, `#4033db`, `#dedaff`) et declare Futura PT dans le CSS, mais elle ne charge pas la police, n'a pas de header/nav, pas de headband orange, pas de logo Nopillo."

Le decideur Nopillo arrive sur une page **non identifiable** comme Nopillo. Le ressenti "ca a ete fait pour nous" est manque, alors que l'argument "j'ai aspire votre DS en 10 min" est un differenciateur cle de la formation.

---

## Sources documentaires (citees dans le rapport)

| Doc | Pourquoi citee |
|---|---|
| `docs/formation-nopillo/_index.md` | Programme + 3 formats + tarifs |
| `docs/formation-nopillo/03-methodologie-formateur.md` | Pipeline doc/cdc/skill/MCP |
| `docs/formation-nopillo/04-format-1-jour.md` + `05-format-2-jours.md` + `06-format-3-jours.md` | Detail programme heure par heure |
| `docs/methodologie-documentation-first/01-manifeste.md` | 5 principes + manifeste |
| `docs/methodologie-documentation-first/05-pattern-skills-recurrents.md` | 14 skills agency type |
| `docs/methodologie-documentation-first/06-roi-mesure.md` | KPIs avant/apres |
| `WEBFLOW-MCP.md` | 18 categories d'outils Webflow MCP |
| `docs/hubspot/_index.md` + `04-api-crm.md` + `09-mcp-remote-server.md` | HubSpot MCP 13 tools |
| `docs/google-ads/_index.md` + `03-landing-page-quality-score.md` + `04-mcp-google-ads.md` + `05-personalization-dynamic-content.md` | Google Ads MCP + DKI + QS |
| `docs/meta-ads-mcp/_index.md` + `06-setup-claude-code.md` | Meta Ads MCP officiel + Pipeboard |
| `docs/supabase-edge-landing/_index.md` + `03-personalization-patterns.md` + `08-stack-recommande-nopillo.md` | Supabase Edge stack |
| `docs/netlify-landing/_index.md` + `02-stack-recommande.md` | Netlify Astro Tailwind |
| `docs/design-system-extraction/_index.md` + `nopillo-extracted/` | Aspiration DS Nopillo (88 variables, tokens DTCG) |
| `.claude/skills/connect-hubspot-form/SKILL.md` | Skill embed form HubSpot |
| `.claude/skills/extract-design-system/SKILL.md` | Skill aspiration DS |
| `.claude/skills/landing-google-ads/SKILL.md` | Skill landing Google Ads |
| `.claude/skills/landing-meta-ads/SKILL.md` | Skill landing Meta Ads |
| `.claude/skills/scout-concurrents/SKILL.md` | Skill 5 doc-maker en parallele |
| `.claude/skills/apply-nopillo-ds/SKILL.md` | Skill applique DS Nopillo |
| `docs/cdc-landing-formation-nopillo/01-specs.md` | Specs CDC landing actuelle |
| `docs/audit-landing-vs-nopillo/_index.md` | Audit visuel score 3/10 (Futura PT, header, headband manquants) |
| `docs/landing-page-best-practices/06-anti-patterns.md` | 13 anti-patterns conversion |

---

## Recap final

- **Etat actuel** : 4.5/10 envie de faire la formation
- **Objectif** : 8.0+/10 apres P0+P1
- **Effort total P0+P1** : ~9h Webflow + Claude Code MCP
- **8 sections a ajouter** + **5 micro-corrections** = roadmap actionnable
- **Insertion** : voir [08-recommandations-implementation.md](./08-recommandations-implementation.md)
