# 06 — Grille skill check (debut / fin)

> A imprimer en A5 ou demi-A4, recto = "AVANT" (9h00), verso = "APRES" (17h00). Outil pour mesurer le delta = ton meilleur argument commercial.

## Pourquoi ?

D'apres [docs/pedagogie-formation/02-format-1-jour.md](../pedagogie-formation/02-format-1-jour.md) :

> "Skill check 1 jour : Avant (5 min, debut J1) + Apres (10 min, fin J1). Calcul du delta sur la note 1-5 = indicateur principal."

Sans cette mesure, tu n'as **aucune preuve d'efficacite** a vendre la prochaine formation.

## Recto — AVANT (5 min, a 9h00)

```
═════════════════════════════════════════════════════════════
SKILL CHECK — AVANT FORMATION
Nom : ___________________________________  Date : _________
═════════════════════════════════════════════════════════════

A. AUTO-EVALUATION (1 = nul, 5 = expert)

[ ] /5  Je sais utiliser Claude Code en CLI
[ ] /5  Je connais la difference entre skill, rule et MCP
[ ] /5  Je sais creer une landing Astro
[ ] /5  Je sais deployer sur Netlify
[ ] /5  Je sais brancher Supabase a un form

TOTAL AVANT : ___ / 25

═════════════════════════════════════════════════════════════
B. 3 QUESTIONS TECHNIQUES (vrai / faux / ne sais pas)

1. Un skill se charge automatiquement a chaque session ?
   □ Vrai   □ Faux   □ Ne sais pas

2. Une rule peut etre limitee a un chemin specifique ?
   □ Vrai   □ Faux   □ Ne sais pas

3. CLAUDE.md doit faire plus de 200 lignes pour etre efficace ?
   □ Vrai   □ Faux   □ Ne sais pas

═════════════════════════════════════════════════════════════
C. ATTENTES PERSONNELLES

Qu'est-ce que tu VEUX savoir faire en fin de journee ?
(1 phrase concrete)

→ ________________________________________________________

→ ________________________________________________________

Qu'est-ce qui te STRESS le plus aujourd'hui ?

→ ________________________________________________________
```

## Verso — APRES (10 min, a 17h00)

```
═════════════════════════════════════════════════════════════
SKILL CHECK — APRES FORMATION
Nom : ___________________________________  Date : _________
═════════════════════════════════════════════════════════════

A. AUTO-EVALUATION (re-poser les memes questions)

[ ] /5  Je sais utiliser Claude Code en CLI
[ ] /5  Je connais la difference entre skill, rule et MCP
[ ] /5  Je sais creer une landing Astro
[ ] /5  Je sais deployer sur Netlify
[ ] /5  Je sais brancher Supabase a un form

TOTAL APRES : ___ / 25
DELTA       : ___ / 25  (APRES - AVANT)

═════════════════════════════════════════════════════════════
B. MEMES 3 QUESTIONS TECHNIQUES (correction)

1. Un skill se charge automatiquement a chaque session ?
   □ Vrai   ■ FAUX (charge a la demande via trigger)   □ NSP

2. Une rule peut etre limitee a un chemin specifique ?
   ■ VRAI (via paths: dans frontmatter)   □ Faux   □ NSP

3. CLAUDE.md doit faire plus de 200 lignes pour etre efficace ?
   □ Vrai   ■ FAUX (cible < 80 lignes)   □ NSP

NOMBRE DE BONNES REPONSES : ___ / 3

═════════════════════════════════════════════════════════════
C. ENGAGEMENT POUR LA SUITE

3 choses concretes que tu vas faire AVEC ca des demain :

1. _____________________________________________________

2. _____________________________________________________

3. _____________________________________________________

═════════════════════════════════════════════════════════════
D. RETRO 1 MINUTE

✅ Ce qui m'a le plus servi aujourd'hui :
→ ________________________________________________________

⚠️  Ce qui m'a frustre / pas compris :
→ ________________________________________________________

💡 Une suggestion pour ameliorer la formation :
→ ________________________________________________________

Note globale formation : __ / 10
(merci d'etre honnete, c'est comme ca qu'on s'ameliore)
```

## Ce que tu fais avec les grilles ramassees

### 1. Calcul des deltas (5 min apres la formation)

Pour chaque participant : `DELTA = TOTAL_APRES - TOTAL_AVANT`.

Objectif : delta moyen >= **+8 points / 25** (=+32%).

Si delta < +5 : la formation n'a pas marche → adapter le prochain run.

### 2. Bonnes reponses au quiz

Compte combien repondent juste aux 3 questions APRES.

Objectif : 80%+ des participants juste sur les 3 questions.

Si moins : ta theorie skill/rule/MCP n'est pas claire → revoir [02-theorie.md](02-theorie.md).

### 3. Compilation des retros

Reprends les retros dans un Notion / Google Doc. Regarde les recurrences :
- "Pas compris X" → fix dans la prochaine formation
- "Apprecie Y" → garder / amplifier
- "Suggestion Z" → ajouter au backlog formation

### 4. Argument commercial

Pour ta prochaine formation, tu pourras dire :
> "Sur la formation precedente, delta moyen +9.2/25 (+37%), satisfaction 8.4/10, 100% ont cree leur premier skill custom."

C'est **infiniment** plus convaincant qu'une promesse en l'air.

## Format conseille

- **Demi-A4 paysage**, 1 par feuille (recto-verso)
- Police 11pt minimum (les gens veulent ecrire vite)
- Stylo fourni si visio (pour ceux qui imprimeront)
- Si visio : version Google Forms equivalente

## Sources

- [docs/pedagogie-formation/06-evaluation.md](../pedagogie-formation/06-evaluation.md) — Evaluation formation
- [docs/pedagogie-formation/02-format-1-jour.md](../pedagogie-formation/02-format-1-jour.md) — Skill check 1 jour
