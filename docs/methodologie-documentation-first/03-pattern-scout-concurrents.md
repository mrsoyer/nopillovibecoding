# 03 — Pattern : Scout concurrents (5 doc-maker en parallele)

> Le pattern qui fait gagner le plus de temps : lancer 5 `doc-maker` en parallele pour avoir 5 fiches concurrents en 10 minutes au lieu de 5 jours de recherche manuelle.

## Le probleme avant

Avant ce pattern, scout les concurrents d'un nouveau client prenait :
- 30 min recherche Google par concurrent
- 30 min navigation manuelle des sites
- 30 min prise de notes
- 30 min mise au propre

= **2h par concurrent**, soit **10h pour 5 concurrents**, soit **plus d'une journee**.

Et meme apres : aucune capitalisation pour les futurs projets du meme vertical.

## Le pattern : fan-out parallele

```
                    ┌─> /doc-maker concurrent A ─┐
                    ├─> /doc-maker concurrent B ─┤
Brief client ──────>┼─> /doc-maker concurrent C ─┼──> 5 fiches docs/
(vertical, taille,  ├─> /doc-maker concurrent D ─┤    en 10 min
 zone, briefs)      └─> /doc-maker concurrent E ─┘
```

5 sessions Claude paralleles, chacune scoute 1 concurrent.

## Workflow detaille

### Etape 1 — Identifier les 5 concurrents (5 min)

Soit le client donne, soit recherche rapide :

```
Recherche Google : "[secteur] [zone] top concurrents"
ou : SimilarWeb / SEMrush via context7
ou : demander au client "qui sont vos 3-5 concurrents principaux ?"
```

Sortir une liste : `[Concurrent A URL, B URL, C URL, D URL, E URL]`.

### Etape 2 — Lancer 5 sessions paralleles (1 min)

Dans 5 onglets / sessions Claude Code differentes :

```
Session 1 :
/doc-maker analyse concurrentielle [Concurrent A] :
URL : [url]
Vertical : [vertical client]
Documente : structure landing, hero, social proof, formulaires,
tracking detecte, design system observe, anti-patterns.
Sortie : docs/concurrents-[client]/[concurrent-a].md

Session 2-5 : idem pour B, C, D, E
```

### Etape 3 — Attendre ~10 min

Chaque session tourne en parallele. Le doc-maker fait :
1. Fetch URL (visite la page)
2. Recupere infos visibles + DOM
3. Detecte trackings (GA4, GTM, Meta Pixel via DevTools API)
4. Identifie patterns (hero, CTA, social proof, forms)
5. Compile en fichier markdown

### Etape 4 — Synthese transverse (15 min)

Apres les 5 sessions, **6e doc-maker** pour synthese :

```
/doc-maker synthese concurrentielle :
lis docs/concurrents-[client]/[a-e].md
genere docs/concurrents-[client]/_index.md avec :
- Tableau comparatif (10 criteres x 5 concurrents)
- Top 5 patterns observes (a reproduire)
- Top 5 anti-patterns (a eviter)
- Recommandations pour [client]
```

## Resultat type

Apres 30 min total, on a :

```
docs/concurrents-[client]/
├── _index.md             # Synthese + tableau comparatif
├── concurrent-a.md       # Fiche A complete
├── concurrent-b.md
├── concurrent-c.md
├── concurrent-d.md
├── concurrent-e.md
└── sources.md
```

## Template de fiche concurrent

```markdown
# [Concurrent X] — Analyse

## Identite
- URL : [...]
- Positionnement : [...]
- Cible : [...]
- Pricing : [...]

## Structure landing
- Hero : [titre, sous-titre, CTA, visuel]
- Section 2 : [...]
- Social proof : [logos, temoignages, chiffres]
- Forms : [type, champs, integration detectee]
- Footer : [...]

## Tech detectee
- CMS : [Webflow, WordPress, custom...]
- Tracking : [GA4, GTM, Meta, LinkedIn, Hotjar...]
- Forms backend : [HubSpot, Pipedrive, custom...]
- A/B testing : [VWO, Optimize, none...]

## Design system
- Couleurs principales : [hex]
- Typo : [fonts]
- Composants reutilisables : [...]
- Style : [moderne, classique, bold...]

## Patterns interessants
- [P1] [...]
- [P2] [...]

## Anti-patterns observes
- [AP1] [...]
- [AP2] [...]

## Note globale
- Design : X/10
- UX : X/10
- Conversion attendue : X/10
```

## Variantes du pattern

### V1 — Scout concurrents top 10

Au lieu de 5, on lance 10 sessions paralleles. ~20 min.

### V2 — Scout par dimension

Au lieu de 1 fiche par concurrent, 1 fiche par dimension :
- 1 doc-maker = analyse hero des 10 concurrents
- 1 doc-maker = analyse forms
- 1 doc-maker = analyse social proof
- ...

Plus rapide pour synthese mais moins riche par concurrent.

### V3 — Scout par moment du parcours

- 1 doc-maker = page d'accueil
- 1 doc-maker = page produit
- 1 doc-maker = page pricing
- 1 doc-maker = checkout/contact

Pour comprendre le funnel complet du concurrent.

## Skills Nopillo a creer pour automatiser

| Skill | Usage |
|-------|-------|
| `/scout-concurrents [client] [vertical]` | Lance directement le pattern complet |
| `/audit-landing [url]` | Audit complet d'1 landing avec score |
| `/extract-design-system [url]` | Aspire le DS d'un site reference |
| `/compare-stack [url-1] [url-2]` | Compare 2 stacks tech |

Voir `05-pattern-skills-recurrents.md` pour le detail de creation.

## Pieges du pattern

| Piege | Fix |
|-------|-----|
| Sites avec anti-bot fort | Fournir screenshot manuel comme input |
| Sites SPA mal indexes | Demander render headless (Playwright via MCP) |
| Convergence trop forte (5 fiches identiques) | Mettre des dimensions differentes par session |
| Synthese pas faite | Toujours lancer la 6e session synthese |
| Pas de capitalisation | Re-utiliser les fiches sur futurs clients meme vertical |

## ROI mesure

| Methode | Temps | Qualite | Capitalisation |
|---------|-------|---------|----------------|
| Manuel | 10h+ | Variable | Aucune |
| 1 doc-maker sequentiel | 50 min | Bonne | Faible |
| **5 doc-maker parallele** | **10 min + 15 synthese** | **Excellente** | **Forte** |

Gain net : x12 a x20 sur le temps, qualite stable, capitalisation reutilisable.

## Cas d'usage Nopillo

| Client | Vertical | Concurrents scoutes |
|--------|----------|---------------------|
| We Invest | Recrutement immo | Capifrance, IAD, Safti, MeilleursAgents, BienIci |
| [SaaS RH] | RH B2B | Lucca, Eurecia, Personio, BambooHR, Factorial |
| [E-commerce] | DTC mode | Sezane, Maje, Sandro, Zara, Mango |

A chaque fois : 30 min total, 5+ fiches actionables, synthese livree au client.

## Sources

- `docs/formation-nopillo/03-methodologie-formateur.md` — manifeste pattern
- `docs/cdc-claude-code-audit/03-best-practices.md` — pattern fan-out across files
- `docs/cdc-claude-code-audit/04-architecture.md` — subagents pour exploration parallele
