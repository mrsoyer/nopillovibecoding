# 01 — Overview : Andragogie & 70-20-10

> Les fondations theoriques d'un workshop tech reussi : pourquoi les adultes n'apprennent pas comme les enfants, et pourquoi 70% du transfert se fait apres la formation.

## Andragogie : 7 principes de Knowles

Malcolm Knowles (1968) a formalise la difference entre **pedagogie** (apprentissage des enfants) et **andragogie** (apprentissage des adultes). En workshop tech, ces 7 principes sont actionnables :

| # | Principe | Implication workshop tech |
|---|---------|--------------------------|
| 1 | **Need to know** | Annoncer en intro : "a la fin tu sauras X, ca te servira pour Y" |
| 2 | **Self-directed learning** | Laisser des choix : exercices au choix, parcours libres apres T+30 |
| 3 | **Practical application** | Chaque concept = un exercice qui sert vraiment au job |
| 4 | **Leveraging experience** | Demarrer par "racontez votre cas reel" avant de donner la theorie |
| 5 | **Learning by doing** | Pas plus de 15 min de slide consecutif sans exercice |
| 6 | **Readiness to learn** | Former au bon moment (changement de role, nouvel outil) |
| 7 | **Intrinsic motivation** | Lier le workshop a la carriere, pas a l'obligation |

Source : Whatfix, Valamis, Research.com (2026).

## Le modele 70-20-10

Origine : Morgan McCall, Michael Lombardo, Robert Eichinger (Center for Creative Leadership, 1980s). Issu d'enquetes sur des executives qui reussissaient.

```
┌──────────────────────────────────────────┐
│  70%  EXPERIENCE                         │
│       on-the-job, problem solving        │
│       ce qui se passe APRES le workshop  │
├──────────────────────────────────────────┤
│  20%  SOCIAL                             │
│       coaching, mentoring, peer review   │
│       ce qui se passe PENDANT (en pair)  │
├──────────────────────────────────────────┤
│  10%  FORMAL                             │
│       cours, slides, lecture             │
│       LE MINIMUM en workshop tech        │
└──────────────────────────────────────────┘
```

### Implications pour un workshop tech

| % | Quoi | Comment maximiser |
|---|------|-------------------|
| 70% experience | Ce que le participant fera APRES | Donner un livrable concret a re-faire chez lui |
| 20% social | Pair, code review, debrief | Pair programming, breakouts, mentoring |
| 10% formal | Slides, theorie | Limiter a 1h cumulee par jour de workshop |

> "Le 70-20-10 n'est pas une recette rigide, c'est un rappel : la majorite de l'apprentissage est experientielle et sociale, pas formelle." — Charles Jennings

## Principes fondateurs derivees

### P1 — Practice over preach

Pour 1h de slide, prevoir 4-6h d'exercice. Ratio inverse du reflex naturel du formateur.

### P2 — Real cases over toy examples

Pas de "Hello World" dans un workshop tech pro. On part toujours d'un cas reel : URL d'un client, vrai brief, vrai bug.

### P3 — Pair over solo

Pair programming systematique reduit la peur, accelere le transfert (cf. Codio research) et permet aux participants experimentes de mentor les autres.

### P4 — Visible deliverable over feel-good

Un workshop reussi = un livrable concret produit par le participant lui-meme. Pas un PDF de notes.

### P5 — Skill check over satisfaction

Mesurer le delta de competence (avant/apres) compte plus que le NPS. Le NPS est secondaire.

## Workshop tech vs workshop generique

| Aspect | Workshop generique | Workshop tech |
|--------|--------------------|---------------|
| Theorie | 30-50% | 5-15% |
| Exercices | Cas d'ecole | Cas reels du participant |
| Outils | Whiteboard, post-it | IDE + MCP + APIs reelles |
| Livrable | Liste d'actions | Code/landing fonctionnel |
| Suivi | Mail de remerciement | Office hours + skills + repo template |

## Anti-patterns

| Anti-pattern | Pourquoi c'est mauvais | Fix |
|--------------|------------------------|-----|
| "Death by PowerPoint" | Viole 70-20-10 (90% formal) | Slides < 1h/jour, exos > 5h/jour |
| Cas d'ecole hors-sol | Viole "leveraging experience" | Faire venir le brief du participant |
| Pas de pair | Viole 20% social | Pair programming des le matin J1 |
| Pas de livrable concret | Pas d'ancrage 70% experience | 1 livrable par jour minimum |
| QCM final unique | Mesure la memoire, pas le skill | Livrable evaluable + skill check |

## A retenir avant de designer

1. **Inverser le ratio** : viser 10/20/70 dans la repartition du temps
2. **Demander aux participants leur cas reel** avant le J1
3. **Designer le livrable d'abord**, deduire le contenu apres
4. **Penser pair programming** des la conception
5. **Mesurer le delta avant/apres** pour iterer la prochaine session

## Sources

- [Adult Learning Theory — Valamis](https://www.valamis.com/hub/adult-learning-theories)
- [7 Principles of Andragogy — Whatfix](https://whatfix.com/blog/adult-learning-theory/)
- [70-20-10 Model — Training Industry](https://trainingindustry.com/wiki/content-development/the-702010-model-for-learning-and-development/)
- [Andragogy Approach — Research.com](https://research.com/education/the-andragogy-approach)
