# 02 — Format 1 jour : Intensif

> Format **decouverte intensive** : 1 jour, 1 livrable concret, ratio 15% theorie / 85% pratique. Pour un participant qui veut "tester" la techno avant d'investir plus.

## Cas d'usage

- Decouverte d'un outil (Webflow MCP, Claude Code, HubSpot Forms)
- Convaincre un decideur que l'outil vaut l'investissement
- Onboarding rapide nouveau membre d'equipe sur un workflow connu

## Contraintes du 1 jour

| Contrainte | Consequence design |
|------------|--------------------|
| Pas le temps d'approfondir | Choisir 1 cas, 1 livrable, 1 stack |
| Fatigue cognitive vers 16h | Pic de difficulte le matin, consolidation l'apres-midi |
| Pas de "lendemain" pour reposer | Pre-work obligatoire la veille |
| Risque "oubli total" J+7 | Suivi post-formation = office hours offert |

## Structure type (8h, dont 6h actives)

```
09:00-09:30  Accueil + skill check pre-formation (30min)
09:30-10:00  Demo formateur : le livrable cible (30min)
10:00-10:15  PAUSE
10:15-12:00  Bloc 1 : Reproduce — pair programming (1h45)
12:00-13:30  DEJEUNER
13:30-14:00  Theorie ciblee : ce qu'il faut savoir (30min, slides max)
14:00-15:30  Bloc 2 : Adapter au cas du participant (1h30)
15:30-15:45  PAUSE
15:45-17:00  Bloc 3 : Finition + code review collective (1h15)
17:00-17:30  Skill check post + retro + planning suivi (30min)
```

**Total actif** : 6h sur 8h presentes (75%).
**Theorie pure** : 1h max (12.5%) — respect 10-20-70.

## Le livrable unique

Le 1 jour = **1 livrable concret** que le participant emporte. Choisir un truc :
- Realisable en 4-6h par un debutant
- Visible, testable, demonstrable a son boss
- Reutilisable comme template

### Exemples de livrables 1 jour

| Workshop | Livrable concret |
|----------|------------------|
| Webflow MCP decouverte | 1 page Webflow generee 100% via MCP, avec CMS dynamique |
| Claude Code basics | 1 skill perso `.claude/skills/[nom]/` deploye et fonctionnel |
| HubSpot forms | 1 form HubSpot integre dans Webflow + tracking GA4 |
| Google Ads landing | 1 landing optimisee Quality Score 8+ avec DKI |

## Pre-work obligatoire (30 min, J-2)

Sans pre-work, le J1 perd 1h30 d'install / setup / accounts.

Checklist pre-work standard :
- [ ] Comptes crees (Webflow, HubSpot, Claude Code, etc.)
- [ ] Outils installes (CLI, MCP, navigateur)
- [ ] Brief perso renseigne (le cas reel du participant)
- [ ] Test technique : "fais X, screenshot, envoie"

Envoyer un mail J-3 + relance J-1 matin.

## Pieges du format 1 jour

| Piege | Fix |
|-------|-----|
| Trop d'ambition (couvrir tout) | 1 livrable, 1 cas, 1 outil — c'est tout |
| Pas de pre-work | Mail systematique J-3 avec checklist |
| Pas de suivi | 1h office hours offert dans les 2 semaines |
| Slide-heavy | Cap 1h cumulee de slide sur la journee |
| Demo trop longue | 30 min max, sinon decoupe en plusieurs |

## Animation : energie sur la journee

Courbe d'energie typique :

```
Energie
  ^
  |   ___
  |  /   \      ___
  | /     \    /   \
  |/       \__/     \____
  +-------------------------> Heure
   9h    11h  13h  15h  17h
   START  PIC  CREUX  PIC2  FIN
```

| Moment | Etat | Quoi y faire |
|--------|------|--------------|
| 9h-11h (pic 1) | Energie haute, cerveau frais | Demo + concept difficile |
| 11h-13h (montee creux) | Concentration baisse | Pratique encadree |
| 13h-14h (creux post-dejeuner) | Bas | Theorie courte ou activite legere |
| 14h-16h (pic 2) | Energie remonte | Pratique exigeante |
| 16h-17h (descente) | Fatigue cognitive | Code review groupe + retro |

## Skill check 1 jour

**Avant** (5 min, debut J1) :
- "Note de 1 a 5 ta capacite a faire X aujourd'hui"
- 3 questions techniques courtes

**Apres** (10 min, fin J1) :
- Re-poser les memes 3 questions
- "Note de 1 a 5 ta capacite a faire X maintenant"
- "Que vas-tu faire des demain avec ca ?"

Calcul du delta sur la note 1-5 = indicateur principal.

## Materiel pedagogique 1 jour

| Support | Format | Utilite |
|---------|--------|---------|
| Slide deck | 20-30 slides max | Demo + theorie cleecible |
| Repo template | GitHub/repo zip | Reproduce le livrable |
| Prompts pre-ecrits | Markdown | Eviter de taper en live |
| Checklist livrable | Markdown | Auto-validation participant |
| Recording demo | Video 30 min | Re-voir apres workshop |

## Tarification indicative

Format 1 jour Nopillo type :
- 1 participant : 1 200 € HT
- 2-4 participants : 800 €/pers
- Equipe (5-8) : 4 500 € forfait
- Office hours suivi : inclus 1h

## Sources

- [Workshop Length & Structure — Symonds Research](https://symondsresearch.com/workshop-structure-plan-length/)
- [How long should a workshop be — Workshop Butler](https://workshopbutler.com/blog/how-long-should-a-workshop-be/)
- [Is there value in one-day training — HR Magazine](https://hrmagazine.co.uk/article-details/is-there-value-in-one-day-training)
