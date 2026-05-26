# Methodologie Documentation-First — Manifeste Thomas

> La methode propre de Thomas pour transformer Claude Code en chaine industrielle de production de landings : **documenter avant de coder, capitaliser apres avoir code**.
> Issue de la pratique reelle Nopillo, formalisee pour transmission en formation.

## Positionnement

Cette doc n'est pas une theorie : c'est la formalisation de la **methode Thomas** issue de l'experience reelle. Elle s'appuie sur :
- 8 skills Claude Code deja en production (cdc-maker, doc-maker, find-docs, simplify, claude-api, skill-maker, etc.)
- 47 agents SYM Framework deployes
- 8 MCP integrees (webflow, supabase, hubspot, context7, doctrine, lemlist, n8n, pappers)
- Les CDC reels Nopillo (cf. `docs/cdc-landing-improvement/`)

## Public cible

- Toi (Thomas) pour formaliser et enseigner ta methode
- Equipe Nopillo pour adopter la meme methodologie
- Freelances onboardes pour livrer comme Nopillo
- Participants formations qui veulent reproduire le workflow

## Ce que cette doc couvre

| Fichier | Contenu |
|---------|---------|
| `01-manifeste.md` | Les 5 principes de la methodologie Thomas |
| `02-pipeline-doc-cdc-skill.md` | Le pipeline complet en 4 etapes avec exemples reels |
| `03-pattern-scout-concurrents.md` | 5 doc-maker en parallele : pattern et resultats |
| `04-pattern-aspirer-design-system.md` | Workflow concret pour aspirer un DS reference |
| `05-pattern-skills-recurrents.md` | Skills agency type a creer pour Nopillo |
| `06-roi-mesure.md` | KPIs avant/apres : temps, qualite, conversion |
| `sources.md` | Sources internes du repo (pas de WebSearch ici) |

## Trois principes fondateurs

1. **Documenter avant de coder.** Si pas de doc, on lance `/doc-maker`.
2. **Cadrer avant de toucher.** Si pas de CDC, on lance `/cdc-maker`.
3. **Capitaliser apres la 2e fois.** Si on le refait, on lance `/skill-maker`.

## Le pipeline en 1 schema

```
┌────────────────┐    ┌─────────────────┐    ┌────────────────┐    ┌──────────────────┐
│ 1. ENQUETER    │ -> │ 2. CADRER       │ -> │ 3. CAPITALISER │ -> │ 4. EXECUTER      │
│ /doc-maker     │    │ /cdc-maker      │    │ /skill-maker   │    │ MCPs + Claude    │
└────────────────┘    └─────────────────┘    └────────────────┘    └──────────────────┘
     docs/[X]/             docs/[client]/        .claude/skills/         Le livrable
```

## Comment utiliser cette doc

- Tu decouvres la methode ? Lis `01-manifeste.md` puis `02-pipeline-doc-cdc-skill.md`
- Tu veux scout des concurrents ? Lis `03-pattern-scout-concurrents.md`
- Tu veux aspirer un DS ? Lis `04-pattern-aspirer-design-system.md`
- Tu veux capitaliser tes workflows ? Lis `05-pattern-skills-recurrents.md`
- Tu mesures le ROI pour vendre la methode ? Lis `06-roi-mesure.md`

## Liens connexes

- `docs/formation-nopillo/03-methodologie-formateur.md` — Source originale du manifeste
- `docs/cdc-claude-code-audit/03-best-practices.md` — Best practices Claude Code officielles
- `docs/cdc-claude-code-audit/04-architecture.md` — 5 piliers d'extension Claude Code
- `docs/pedagogie-formation/` — Comment **enseigner** cette methode en workshop

## Origine de la methode

Thomas a developpe cette methode au fil de la pratique Nopillo : agence creative qui produit des landings + recrutement immobilier + formations. Le constat : sans methode, chaque projet repart de zero. Avec ce pipeline : capitalisation systematique, qualite stable, gain de temps x3.

## Sources

Voir `sources.md` (sources internes uniquement, pas de web).
