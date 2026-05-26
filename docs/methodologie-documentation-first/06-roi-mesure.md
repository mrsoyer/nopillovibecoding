# 06 — ROI : mesurer la methodologie

> KPIs avant/apres adoption de la methodologie Documentation-First. Chiffres a presenter pour vendre la methode (interne, formation, prospects).

## Pourquoi mesurer

Sans mesure, la methodo reste "une intuition". Avec mesure, c'est un argument commercial / pedagogique fort :
- "Notre temps de production a divise par 3"
- "Notre Quality Score Google Ads moyen est passe de 6 a 8.5"
- "Notre NPS clients est passe de 40 a 70"

## KPIs principaux

### KPI 1 — Temps de production landing

Le KPI le plus visible.

| Phase | Avant methodo | Apres methodo | Gain |
|-------|---------------|---------------|------|
| Scout concurrents | 1-2 jours | 30 min | x16 |
| CDC | 1/2 journee | 1h | x4 |
| Design + integration | 3-5 jours | 1-2 jours | x2.5 |
| Tracking + tests | 1 jour | 2h | x4 |
| **Total landing** | **6-9 jours** | **2-3 jours** | **x3** |

### KPI 2 — Qualite livrable

Mesurable objectivement :

| Critere | Avant | Apres |
|---------|-------|-------|
| Lighthouse Performance | 60-75 | 85-95 |
| Lighthouse Accessibility | 70-80 | 90+ |
| Quality Score Google Ads | 5-7 | 8-9 |
| Erreur tracking (events manquants) | 30% | < 5% |
| Bug en production J+7 | 2-3/landing | < 1/landing |

### KPI 3 — Conversion landing client

Le KPI client final :

| Metric | Avant | Apres |
|--------|-------|-------|
| Taux conversion form | 1-2% | 3-5% |
| CPA Google Ads | 80-120€ | 40-60€ |
| Lead qualifie ratio | 30% | 50%+ |
| Time-to-MVP | 2 semaines | 1 semaine |

### KPI 4 — Capitalisation

Mesure l'effet d'apprentissage equipe :

| Indicateur | Avant | Apres methodo |
|------------|-------|---------------|
| Skills crees | 0 | 14+ |
| Docs reutilisables | < 5 | 50+ |
| MCPs deployees | 0-1 | 8 |
| Onboarding new dev | 1 mois | 1 semaine |

### KPI 5 — Satisfaction equipe

Soft mais important :

| Indicateur | Avant | Apres |
|------------|-------|-------|
| eNPS interne | 30-40 | 60+ |
| "Je sais quoi faire" (auto-eval 1-5) | 2-3 | 4-5 |
| Heures sup moyennes / mois | 30+ | < 10 |

## Comment mesurer concretement

### Avant adoption (T0)

Faire le diagnostic actuel :

```
SEMAINE -1 (avant lancement methodo)
- Mesurer 3 derniers projets : temps, qualite, conversion
- Survey equipe : eNPS + "je sais quoi faire" 1-5
- Inventaire actuel : combien de skills, docs, MCPs
- Performance moyenne landings client
```

### Pendant l'adoption (T+30, T+60, T+90)

Re-mesurer aux memes intervalles :

```
J+30 : 1ere mesure post-adoption
- Temps des projets fais avec la methodo
- Skills crees ce mois
- Quality des livrables (Lighthouse, QS Ads)
- eNPS

J+60 : confirmation tendance
J+90 : ROI consolide a presenter
```

### Apres T+6 mois

Synthese annuelle :
- ROI global de la methodo
- Skills les plus utilises
- Taches encore manuelles (a transformer en skills)
- Plan annee suivante

## Tableau de bord ROI

A construire dans Notion / Airtable / Google Sheets :

```
ROI METHODOLOGIE NOPILLO — [trimestre]

PRODUCTION
- Landings livrees : X (vs Y avant)
- Temps moyen : X jours (vs Y)
- Bugs J+7 : X (vs Y)

QUALITE
- Lighthouse moyen : XX/100
- Quality Score Ads : X/10
- NPS clients : X

CAPITALISATION
- Skills crees ce trimestre : X
- Skills utilises (au moins 1x) : X
- Docs nouvelles : X
- Nouveaux clients onboardes : X

EQUIPE
- eNPS : X
- Heures sup moyennes : X
- Confidence (1-5) : X

ACTIONS pour T+1 :
- [ ] Skills a creer
- [ ] Docs a faire
- [ ] Process a ameliorer
```

## Pieges mesure ROI

| Piege | Fix |
|-------|-----|
| Mesurer trop tard (apres 6 mois sans T0) | Toujours T0 avant lancement |
| Comparer pommes / oranges (projets pas equivalents) | Selectionner projets comparables |
| Survey biaise (equipe veut faire plaisir) | Anonyme + tendance pas absolu |
| Trop de KPIs (5+) | 3 KPIs cles seulement |
| ROI sur 1 mois | Patience : 3 mois min pour effet |

## Cas d'usage : presenter le ROI

### Pour un prospect Nopillo

```
"Avec notre methodologie Documentation-First, nous livrons une landing
optimisee Google Ads en 2-3 jours au lieu de 1 semaine, avec un Quality
Score moyen de 8.5/10 (vs 6.5 avant adoption). Resultat client moyen :
CPA divise par 2."
```

### Pour vendre une formation

```
"Vous repartez avec :
- 14 skills Claude Code configures (gain immediat 40h/mois)
- Pipeline doc -> CDC -> skill -> execute documente
- 30+ docs reutilisables sur vos prochains projets

ROI estime : 200h gagnees sur 3 mois post-formation."
```

### Pour onboarding interne

```
"Documentation-First a permis a Nopillo de :
- Onboarder un junior en 1 semaine (vs 1 mois)
- Ne plus avoir de "trou" sur les bonnes pratiques
- Capitaliser systematiquement chaque projet
- Tripler la production sans augmenter l'equipe"
```

## Indicateurs de derive (alertes)

Surveiller ces signaux d'alarme :

| Signal | Cause probable | Action |
|--------|----------------|--------|
| Skills non crees > 1 mois | Methode pas adoptee | Refresher + accompagnement |
| Skills crees mais non utilises | Skills mal designes | Audit usage + simplifier |
| Temps production qui re-monte | Retour aux vieux reflexes | Stand-up methodologique mensuel |
| Qualite qui baisse | Pas de verification outputs | Re-installer hooks + checklists |
| eNPS qui baisse | Surcharge methodo | Simplifier, pas tout documenter |

## Roadmap ROI Nopillo

### T1 2026 (objectifs cibles)

- [ ] T0 mesure complete (semaine 1)
- [ ] 5 skills sprint 1 crees (semaine 2)
- [ ] 5 skills sprint 2 crees (semaine 4)
- [ ] T+30 mesure intermediaire
- [ ] T+90 mesure finale + presentation equipe

### T2 2026

- [ ] 4 skills sprint 3 (totaux 14)
- [ ] Mesure adoption skills par membre
- [ ] Communication ROI externe (LinkedIn, blog)
- [ ] Lancement formation Nopillo (1j/2j/3j)

### T3-T4 2026

- [ ] Documentation publique de la methode
- [ ] Vente formation a agences pairs
- [ ] Communaute utilisateurs methodo (Slack/Discord)

## Sources

- `docs/formation-nopillo/03-methodologie-formateur.md` — ROI estimes
- `docs/cdc-claude-code-audit/03-best-practices.md` — best practices verifiables
- `docs/cdc-landing-improvement/02-taches.md` — exemple CDC reel pour benchmark temps
