# 05 — Techniques d'animation

> Les 5 techniques d'animation a maitriser pour un workshop tech : pair programming, demo + reproduce, code review collective, energizers, et 1-to-1 cible.

## Technique 1 — Pair programming

Le pair programming est **la** technique reine d'un workshop tech. Recherche academique : presque toutes les etudes confirment l'amelioration des resultats (Codio, Springer 2023).

### Modele driver / navigator

| Role | Ce qu'il fait |
|------|--------------|
| **Driver** | Tient la souris/clavier, code, exprime a voix haute ce qu'il fait |
| **Navigator** | Observe, repere les erreurs, propose les prochaines etapes, lit la doc |

### Rotation

- Toutes les **15-20 min**, on switch driver <-> navigator
- Timer visible (chrono projete au mur ou app dediee)
- Si pair distant : transfert ecran, ou outils type CodeTogether / VSCode Live Share

### Pairing strategique

| Strategie | Quand l'utiliser |
|-----------|------------------|
| Niveaux similaires | Workshop homogene, on cherche egalite contribution |
| Senior + junior | Workshop mixte, mentoring incident |
| Random rotation | Apres 2 blocs, pour mixer |
| Self-pairing | Apres J2, pour responsabiliser |

### Pieges pair programming

| Piege | Fix |
|-------|-----|
| Le senior monopolise le clavier | Rotation stricte au timer |
| Silence prolonge | Driver doit verbaliser ce qu'il fait |
| Pair desequilibres rejette | Re-pairer apres bloc 1 |
| Resistance "je prefere seul" | Persister J1, ca passe en J2 |

## Technique 2 — Demo + Reproduce

Pattern de transmission le plus efficace pour techno nouvelle :

```
1. Le formateur fait une demo COMPLETE (15-20 min max)
   Pas d'interruption, on ecoute et on observe
   Resultat visible a la fin (le livrable cible)

2. Pause + Q/R rapide (5 min)

3. Les participants REPRODUISENT en pair (45-60 min)
   Memes etapes, memes prompts, meme livrable
   Le formateur circule, intervient si bloque

4. Code review collective (15 min)
   On compare les outputs, on identifie les variations
```

### Cles de la demo

- **Verbaliser** chaque clic / chaque prompt ("je vais lancer X parce que Y")
- **Pre-ecrire** les prompts complexes (eviter les fautes en live)
- **Anticiper** les ratees (avoir un plan B si le service rame)
- **Limiter** : 20 min max sinon decoupe en 2 demos

### Cles du reproduce

- **Repo template** ou snapshot disponible
- **Prompts copiables** dans la doc fournie
- **Grille de checks** pour s'auto-valider
- **Aide 1-to-1** prioritaire sur ceux qui bloquent > 10 min

## Technique 3 — Code review collective

Apres chaque bloc reproduce/adapt, **15-20 min de code review groupe** :

### Format conseille

1. **Volontaire** demo son resultat sur grand ecran (5 min)
2. **Pairs** posent 2 questions chacun
3. **Formateur** souligne 1 point fort + 1 point a ameliorer
4. **Suivant** (1-2 par session)

### Pourquoi ca marche

- Active la dimension **20% social** du modele 70-20-10
- Le presentateur ancre par enseignement
- Les autres voient des **variations** du meme exercice
- Le formateur valide la **qualite** publiquement

### Variantes

| Variante | Quand |
|----------|-------|
| Demo croisee (binomes echangent) | Salle hetero |
| "Worst code wins" (montre ce qui a coince) | Climat tres safe |
| Anonyme (formateur projette sans nommer) | Salle pas safe encore |

## Technique 4 — Energizers

Les energizers cassent la fatigue cognitive et reactivent l'attention. **5-10 min, 1-2x par jour**.

### Energizers tech-friendly (5 min)

| Nom | Description | Quand |
|-----|-------------|-------|
| **Paper Plane Game** | Equipes plient des avions selon specs, iterations 3min, rapide | Apres dejeuner |
| **Speed-share** | Chacun resume J1 en 1 min a son binome | J2 9h |
| **Quiz pair** | Binomes se posent 5 questions sur la matinee | Avant pause |
| **Worst prompt contest** | "Donne le pire prompt qui marche quand meme" | J2 14h |
| **Outil mystere** | "Devinez ce que fait ce prompt/cette commande" | J3 14h |

### Anti-pattern energizer

- Pas trop infantilisant ("simon dit", "memory") en workshop pro
- Pas non lies au sujet ("ice breaker generique") -> on perd 10 min
- Pas plus de 2/jour sinon disrupt rythme

## Technique 5 — 1-to-1 cible

Le formateur DOIT faire des **rondes** pendant les blocs pratique :
- Repere ceux qui sont bloques (silence > 5 min, ecran fige)
- Intervient en pair (s'assoit, regarde, suggere) — pas en frontal
- Limite intervention a 5-10 min par personne

### Outils detection blocage

| Signal | Action |
|--------|--------|
| Personne bloquee silencieuse > 10 min | Allez verifier |
| Question repetee dans la salle | Pause groupe + clarifier |
| Pair qui se dispute | Re-pairer poliment |
| Binome qui avance trop vite | Donner exo bonus |

### Aide 1-to-1 effective

- **Ne pas** faire a leur place
- **Demander** "qu'est-ce que tu cherches a faire ?"
- **Faire formuler** "qu'est-ce que tu as deja essaye ?"
- **Suggerer** "essaie ca, on regarde ensemble dans 2 min"
- **Revenir** verifier que ca a debloque

## Combinaison des 5 techniques par bloc

Bloc-type 90 min sur un workshop tech :

```
00:00-00:20  Demo formateur (technique 2 — demo)
00:20-00:25  Pause Q/R
00:25-01:25  Reproduce en pair (technique 1 + 5 — pair + 1-to-1)
01:25-01:40  Code review groupe (technique 3 — code review)
01:40-01:30  Energizer si J2/J3 + l'apres-midi (technique 4)
```

A repeter x4-6 sur la journee selon format.

## Outils support animation

| Outil | Usage |
|-------|-------|
| Timer projete (cube-timer.com) | Respecter le 15-20 min pair rotation |
| Slack/Discord workshop | Partage liens, prompts, screenshots a chaud |
| Mural / Miro | Brainstorm, retro, sketch architecture |
| Repl.it / VSCode Live Share | Pair distant ou demo formateur projetee |
| Demo screenshare cloud | Sauver le live si setup local rame |

## Sources

- [Pair Programming in CS Education — Codio](https://www.codio.com/blog/the-benefits-of-pair-programming-in-cs-education)
- [Distributed Pair Programming Review — Springer 2023](https://link.springer.com/article/10.1007/s12528-023-09356-3)
- [Pair Programming — Khan Academy](https://www.khanacademy.org/khan-for-educators/resources/teacher-essentials/teaching-computing/a/pair-programming-in-the-classroom)
- [Agile Workshop Activities — SessionLab](https://www.sessionlab.com/library/agile)
