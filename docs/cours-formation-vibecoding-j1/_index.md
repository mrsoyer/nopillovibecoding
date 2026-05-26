# Cours Formation Vibecoding — Jour 1

> Support pedagogique complet de la formation 1 jour "Landing page avec Claude Code + Astro + Supabase + Netlify". A imprimer / projeter / distribuer aux participants.

## Promesse de la journee

A la fin de la journee, chaque participant :
1. A une landing **Astro + Supabase + Netlify** deployee en prod
2. Comprend la difference **skill / rule / MCP / hook**
3. A cree **SON skill custom** pour un workflow recurrent de son metier
4. Repart avec un kit de continuation + 1h coaching offerte (J+14)

## Stack du cours

| Layer | Techno |
|---|---|
| Frontend | Astro 6 + Tailwind 4 + React islands + TypeScript strict |
| Backend | Supabase (Postgres leads + Edge Function contact-form) |
| Infra | Netlify (auto via netlify.toml) |
| DS | Nopillo (indigo #4033DB, pill CTAs, Futura PT) |
| Outillage | Claude Code + skills + rules + MCP Supabase |

## Index

| Fichier | Contenu | Quand |
|---|---|---|
| [01-pre-work.md](01-pre-work.md) | Mail J-3 + checklist installs participants | Envoyer J-3 |
| [02-theorie.md](02-theorie.md) | Theorie skill / rule / MCP / hook + decision tree | Projection 13h50 |
| [03-exercices-matin.md](03-exercices-matin.md) | 5 ameliorations a faire en pair programming | Distribution 9h45 |
| [04-livrable-skill-pm.md](04-livrable-skill-pm.md) | Brief "crea TON skill custom" + critkres validation | Distribution 14h30 |
| [05-kit-continuation.md](05-kit-continuation.md) | Recap 1 page A4 a imprimer | Distribution 17h15 |
| [06-grille-skill-check.md](06-grille-skill-check.md) | Skill check avant/apres + retro | Debut 9h00 / Fin 17h00 |
| [07-slides-theorie.md](07-slides-theorie.md) | 16 slides detaillees pour module theorique | A construire avant formation |
| [sources.md](sources.md) | Docs internes referencees | - |

## Programme heure par heure

```
8h45    Accueil cafe — verifier installs (5 min/personne)
9h00    Skill check debut (5 min) + tour de table + promesse (10 min)
9h15    DEMO TOI : tour du repo clone en live (10 min)
9h25    Ils clonent + npm install + npm run dev (20 min)
9h45    ANALYSE LANDING au tableau (15 min) → 03-exercices-matin.md
10h00   PAIR PROGRAMMING — 5 ameliorations (1h15)
11h15   PAUSE (15 min)
11h30   CODE REVIEW COLLECTIVE — 2 binomes presentent (30 min)
12h00   Bilan matin + chaque participant ecrit SA TODO PM (15 min)
12h15   DEJEUNER (1h30)
─────────────────────────────────────────────────────────────────
13h45   Energizer (5 min)
13h50   THEORIE skill/rule/MCP/hook (40 min) → 02-theorie.md
14h30   PROJET PERSO : Crea TON skill custom (2h) → 04-livrable-skill-pm.md
16h30   CODE REVIEW COLLECTIVE 2 — 3 participants demos skills (30 min)
17h00   Skill check fin (5 min) + retro (5 min) + TODO J+7 coaching (5 min)
17h15   KIT DE CONTINUATION distribue → 05-kit-continuation.md
17h30   Fin
```

**Ratio** : Theorie 9% / Demo formateur 6% / Pratique 60% / Review/Bilan 16% / Pauses 9%

## Materiel a preparer J-1

| Item | Format | Source |
|---|---|---|
| Mail pre-work | Mail envoye J-3 | [01-pre-work.md](01-pre-work.md) |
| Repo template | Push GitHub public/privee | `nopillo-landing-exemple` |
| Slides theorie | Projection (pas obligatoire) | [02-theorie.md](02-theorie.md) |
| Print exercices matin | A4 x N participants | [03-exercices-matin.md](03-exercices-matin.md) |
| Print brief skill PM | A4 x N participants | [04-livrable-skill-pm.md](04-livrable-skill-pm.md) |
| Print kit continuation | A4 x N participants | [05-kit-continuation.md](05-kit-continuation.md) |
| Grille skill check | A5 x N participants | [06-grille-skill-check.md](06-grille-skill-check.md) |

## A faire avant ce cours (pre-requis formateur)

1. ✅ Push `nopillo-landing-exemple` sur GitHub avec README "premier demarrage"
2. ⚠️ Creer `docs/J0-EXERCICES.md` dans le template (copier [03-exercices-matin.md](03-exercices-matin.md))
3. ⚠️ Creer `docs/J0-THEORIE.md` dans le template (copier [02-theorie.md](02-theorie.md))
4. ⚠️ Creer `docs/J0-LIVRABLE-PM.md` dans le template (copier [04-livrable-skill-pm.md](04-livrable-skill-pm.md))
5. ⚠️ Copier `~/.claude/skills/skill-maker` dans `.claude/skills/` du template
6. ⚠️ Envoyer mail pre-work J-3 ([01-pre-work.md](01-pre-work.md))

## Sources

- [docs/formation-nopillo/04-format-1-jour.md](../formation-nopillo/04-format-1-jour.md) — programme 1j initial
- [docs/pedagogie-formation/02-format-1-jour.md](../pedagogie-formation/02-format-1-jour.md) — pieges et courbe d'energie
- [docs/pedagogie-formation/05-techniques-animation.md](../pedagogie-formation/05-techniques-animation.md) — pair programming + demo+reproduce + code review collective
- [docs/claude-code-rules/04-skills-vs-rules.md](../claude-code-rules/04-skills-vs-rules.md) — theorie skill/rule/MCP/hook
- [nopillo-landing-exemple/](../../nopillo-landing-exemple/) — repo template a cloner
