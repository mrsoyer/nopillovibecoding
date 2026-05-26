# 06 — Evaluation : skill check, livrable, NPS

> Comment mesurer la reussite d'un workshop tech au-dela du sourire des participants. Modele Kirkpatrick adapte, skill check pre/post, NPS cible.

## Pourquoi evaluer

Un workshop reussi se mesure sur **4 niveaux** (modele Kirkpatrick), pas sur 1.

| Niveau | Quoi | Quand | Cible Nopillo |
|--------|------|-------|---------------|
| **1. Reaction** | Satisfaction, NPS | Fin du workshop | NPS > 50 |
| **2. Apprentissage** | Skill delta avant/apres | Pre J1 + Post J3 | Delta auto-eval +2 sur 5 |
| **3. Comportement** | Application reelle | J+30 | > 70% appliquent |
| **4. Resultat** | Impact business | J+90 | ROI explicite |

## Niveau 1 — Reaction (NPS)

Le moins important mais le plus simple. **5 questions max**, fin de J final.

### Template NPS workshop

```
1. Sur une echelle de 0 a 10, recommanderiez-vous ce workshop a un collegue ?
   [0............10]

2. Qu'est-ce qui vous a le plus apporte ?
   [texte libre]

3. Qu'est-ce qui pourrait etre ameliore ?
   [texte libre]

4. Le rythme etait : trop lent / parfait / trop rapide

5. Le ratio theorie/pratique etait : trop theorique / parfait / trop pratique
```

### Calcul NPS

- **Promoteurs** (9-10) : %
- **Passifs** (7-8) : %
- **Detracteurs** (0-6) : %
- **NPS** = % Promoteurs − % Detracteurs

| NPS | Interpretation |
|-----|----------------|
| > 70 | Excellent, format a re-vendre tel quel |
| 50-70 | Bon, ajustements mineurs |
| 30-50 | Correct, re-design certains blocs |
| < 30 | Probleme structurel, re-design integral |

## Niveau 2 — Apprentissage (skill check)

**Le plus important.** Mesure le **delta de competence reel** entre debut et fin.

### Format skill check

#### Pre-formation (envoye J-7, ou en debut J1)

```
Pour chaque competence ci-dessous, note de 1 a 5 ta capacite a la realiser SEUL :

- [ ] Generer une page Webflow via MCP                  1 2 3 4 5
- [ ] Configurer un form HubSpot dans Webflow           1 2 3 4 5
- [ ] Ecrire un skill Claude Code de A a Z              1 2 3 4 5
- [ ] Setup tracking GA4 + Meta CAPI                    1 2 3 4 5
- [ ] Optimiser une landing pour Quality Score Ads      1 2 3 4 5

Question technique 1 : Quelle est la difference entre un skill et un subagent Claude Code ?
[texte libre]

Question technique 2 : Decrivez les etapes pour ajouter un form HubSpot a une page Webflow.
[texte libre]
```

#### Post-formation (fin J final)

Re-poser les **memes** questions. Calculer :
- **Delta auto-eval** : moyenne post − moyenne pre (cible : +2)
- **Reponses techniques** : binaire correct / incorrect (cible : > 80% correct post)

### Indicateurs de qualite

| Indicateur | Calcul | Cible |
|------------|--------|-------|
| Delta moyen auto-eval | post-pre, moyenne participants | +2 sur 5 |
| % reponses tech correctes post | bonnes reponses / total | > 80% |
| % participants progressant | n delta > 0 / total | > 90% |

## Le livrable evaluable

**Le meilleur skill check = un livrable concret evalue.**

Chaque format (1j/2j/3j) a 1+ livrable (cf. fichiers 02/03/04). Ce livrable doit avoir une **grille d'evaluation** :

### Template grille evaluation livrable (landing Nopillo)

| Critere | Poids | Score 0-3 | Notes |
|---------|-------|-----------|-------|
| Design conforme DS Nopillo | 15% | | |
| Performance Lighthouse > 90 | 15% | | |
| Tracking GA4 + CAPI fonctionnel | 20% | | |
| Form HubSpot integre + lifecycle | 20% | | |
| Code Webflow propre (CMS, structure) | 15% | | |
| Documentation reproduce | 15% | | |
| **TOTAL** | **100%** | **/3** | |

### Bareme

- 2.5-3.0 : Operationnel autonome
- 2.0-2.5 : Operationnel encadre (office hours utiles)
- 1.5-2.0 : Necessite suivi rapproche
- < 1.5 : Re-faire un format complementaire

## Niveau 3 — Comportement (J+30)

Mail simple, 30 jours apres :

```
Bonjour [prenom],

Cela fait 30 jours que nous avons fait le workshop [nom].
2 questions rapides :

1. Avez-vous applique sur un vrai projet depuis ?
   [ ] Oui, plusieurs fois
   [ ] Oui, une fois
   [ ] Non, pas encore
   [ ] Non, je ne pense pas le faire

2. Si oui, quel projet ? Quel resultat ?
   [texte libre]

3. Si non, qu'est-ce qui vous bloque ?
   [texte libre]

(Office hours toujours disponibles : [lien calendly])
```

### Indicateur

- **Taux d'application reelle** : (oui plusieurs + oui une fois) / total
- Cible Nopillo : **> 70%**

Si < 50% : probleme du transfert. Le workshop est decroche du reel.

## Niveau 4 — Resultat (J+90)

Mail ou call :

```
1. Combien de projets / livrables avez-vous produits avec ce que vous avez appris ?
2. Quel temps avez-vous gagne approximativement (en heures) ?
3. Quel impact business mesurable ? (CA, conversion, cout reduit)
4. Sur 1 a 10, le ROI du workshop pour vous ?
```

### Indicateurs Niveau 4

- Temps gagne moyen par participant
- Nombre de projets livres avec la methode
- ROI 1-10 (cible > 7)

## Anti-patterns evaluation

| Anti-pattern | Pourquoi mauvais | Fix |
|--------------|------------------|-----|
| QCM unique fin de session | Mesure memoire pas skill | Skill check + livrable |
| NPS seul | "Sourire" pas "competence" | Niveaux 2-3-4 obligatoires |
| Pas de mesure pre | Pas de delta calcule | Skill check pre + post |
| Pas de J+30 | Niveau 3 ignore | Mail systematique |
| Grille subjective | Variabilite formateur | Criteres objectifs / score |

## Tableau de bord post-workshop

A produire apres chaque session :

```
WORKSHOP [nom] — [date] — [participants]

Niveau 1 (Reaction)
- NPS : [X]
- Best : [theme]
- Worst : [theme]

Niveau 2 (Apprentissage)
- Delta auto-eval : +[X] sur 5
- % reponses correctes post : [X]%
- Score moyen livrable : [X]/3

Niveau 3 (Comportement, J+30)
- Taux application : [X]%
- Projets cites : [liste]

Niveau 4 (Resultat, J+90)
- Temps gagne moyen : [X]h/participant
- ROI moyen : [X]/10

ACTIONS suite session :
- [ ] [...]
```

## Sources

- [Pre/Post Training Assessments — Training Industry](https://trainingindustry.com/articles/measurement-and-analytics/a-guide-to-evaluating-training-success-with-pre-and-post-training-assessments/)
- [Evaluate Training Effectiveness — CDC](https://www.cdc.gov/training-development/php/about/evaluate-training-measuring-effectiveness.html)
- [Training Evaluation Form — SurveyKing](https://www.surveyking.com/blog/training-evaluation-form/)
- [Post-Training Evaluation — Unique Development](https://uniquedevelopment.com/post-training-evaluation-assessing-the-effectiveness-of-training/)
