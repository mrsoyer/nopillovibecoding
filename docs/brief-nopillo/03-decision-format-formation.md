# 03 — Matrice de decision format formation

> A appliquer apres `02-fiche-synthese.md`. Donne une recommandation 1j / 2j / 3j basee sur 6 criteres ponderes.

## Les 3 formats disponibles

| Format | Duree | Tarif HT | Detail | Cible | Reference |
|--------|-------|----------|--------|-------|-----------|
| **1 jour** | 7h | **950 €** | 600 anim + 350 prep | Decouverte / cadrage | `formation-nopillo/04-format-1-jour.md` |
| **2 jours** | 14h | **1 900 €** | 1 200 anim + 700 prep | Autonomie workflow | `formation-nopillo/05-format-2-jours.md` |
| **3 jours** | 21h | **2 850 €** | 1 800 anim + 1 050 prep | Maitrise complete + sortir Webflow | `formation-nopillo/06-format-3-jours.md` |

**Modele** : 950 € HT/jour tout inclus (600 € animation + 350 € preparation amortie).

## Les 6 criteres de decision

### Critere 1 — Niveau Claude Code de l'equipe (poids 25%)

| Niveau | Score |
|--------|-------|
| Jamais utilise | 1j (decouverte obligatoire) |
| Quelques tests | 1j ou 2j |
| Hebdomadaire | 2j |
| Quotidien | 2j ou 3j |

**Logique** : 3j n'a de sens que si la base Claude Code est solide (sinon le J3 sur Netlify/Edge depasse).

### Critere 2 — Volume de landings / mois (poids 20%)

| Volume | Score |
|--------|-------|
| < 4 / mois | 1j (ROI faible sur 2-3j) |
| 4-8 / mois | 2j |
| > 8 / mois | 2j ou 3j |

**Logique** : industrialisation = ROI proportionnel au volume.

### Critere 3 — Stack diversifiee (poids 15%)

| Stack | Score |
|-------|-------|
| Webflow seul | 1j ou 2j |
| Webflow + Framer | 2j |
| Webflow + React / Next | 3j (module Netlify pertinent) |
| Multi-stack | 3j |

**Logique** : J3 inclut "sortir de Webflow", inutile si stack monoculture.

### Critere 4 — Stack ads / CRM (poids 15%)

| Stack | Score |
|-------|-------|
| Google Ads + HubSpot | 2j |
| Google + Meta + HubSpot | 2j ou 3j |
| Google + Meta + LinkedIn + multi-CRM | 3j |
| Pas d'ads / pas de CRM | 1j |

**Logique** : J2 couvre HubSpot + Google + Meta. Si stack riche, J3 ajoute LinkedIn / TikTok / alternatives CRM.

### Critere 5 — Equipe a former (poids 15%)

| Effectif | Score |
|----------|-------|
| 1 personne | 1j ou 2j |
| 2-3 personnes | 2j |
| 4-6 personnes | 2j ou 3j (intra) |
| 7-8 personnes | 3j (intra avec sous-groupes) |

**Logique** : plus on a de personnes, plus on a besoin de pratique encadree (= duree).

### Critere 6 — Budget disponible (poids 10%)

| Budget | Score |
|--------|-------|
| < 5 000 EUR | 1j obligatoire |
| 5 000 - 9 000 EUR | 1j ou 2j |
| 9 000 - 14 000 EUR | 2j ou 3j |
| > 14 000 EUR | 3j |

**Logique** : contrainte dure. Sauf si le client peut etaler (CPF + OPCO + cash).

## Matrice de scoring

Pour chaque critere, attribuer le format recommande, puis ponderer.

```
Score 1j  = (poids critere ou recommande = 1j) somme
Score 2j  = (poids critere ou recommande = 2j) somme
Score 3j  = (poids critere ou recommande = 3j) somme
```

Le format avec le score le plus eleve est recommande.

### Exemple de calcul

Cas Nopillo hypothetique :

| Critere | Recommandation | Poids |
|---------|----------------|-------|
| C1 Claude Code (hebdo) | 2j | 25% |
| C2 Volume (5/mois) | 2j | 20% |
| C3 Stack (Webflow seul) | 1j ou 2j | 15% |
| C4 Stack ads (Google + Meta + HubSpot) | 2j | 15% |
| C5 Equipe (4 personnes) | 2j | 15% |
| C6 Budget (10 000 EUR) | 2j | 10% |

Score :
- 1j : 7.5%
- 2j : 92.5%
- 3j : 0%

**Recommandation** : 2 jours.

## Cas particuliers

### Cas A — "Autonomie complete + sortie Webflow"

Si Nopillo coche **2 ou plus** des criteres suivants :
- Stack Webflow + React / Next deja en prod
- Volume > 8 landings / mois
- Equipe > 5 personnes
- Budget > 14 000 EUR
- Objectif explicite : "etre capable de sortir de Webflow"

Alors **forcer 3 jours** quel que soit le score matriciel.

### Cas B — "Decouverte rapide"

Si Nopillo coche **2 ou plus** des criteres suivants :
- Equipe a former : 1 personne
- Budget < 5 000 EUR
- Niveau Claude Code : jamais
- Volume < 4 landings / mois

Alors **forcer 1 jour** avec promesse de "format avance" plus tard.

### Cas C — "Format split"

Si Nopillo demande un format split (J1 puis J2 a 2 semaines d'ecart), c'est **obligatoirement 2j ou 3j** (pas de split sur 1j).

Avantage split :
- Ancrage / repetition espacee (ROI Niveau 3 +20%)
- Permet de "tester" entre les deux et revenir avec questions concretes

Inconvenient :
- Logistique plus lourde (2 deplacements si presentiel)
- Risque de no-show J2

## Modules a retirer / ajouter selon brief

### Module Meta Ads — retirer si...

- Nopillo ne gere pas Meta Ads en interne
- Pas de pixel Meta sur les landings actuelles
- Verticaux clients = B2B SaaS pur (peu de Meta usage)

Remplacer par : LinkedIn Ads ou approfondissement Google Ads Performance Max.

### Module HubSpot — adapter si...

- CRM principal : Pipedrive / Brevo / Salesforce / Notion
- Adapter : utiliser le meme module HubSpot mais avec leur CRM (necessite enquete P3 sur leur CRM)

### Module Netlify / Edge — retirer si...

- Stack 100% Webflow sans ambition de sortir
- Equipe sans developpeur

Remplacer par : module avance Webflow (Components avances + Webhooks + automation).

### Module design system extraction — ajouter en bonus si...

- Nopillo a des clients qui demandent "look custom" / "design unique"
- Equipe avec designers seniors qui veulent gagner en velocite extraction

## Workflow decision

```
1. Remplir 02-fiche-synthese.md
2. Pour chaque critere, identifier le format recommande
3. Calculer scores 1j / 2j / 3j
4. Verifier cas particuliers (forcage 1j ou 3j)
5. Ajuster modules (retirer Meta / Netlify si non pertinent)
6. Rediger devis
7. Envoyer devis avec justification de format
```

## Template de justification devis

```
Suite a notre echange du [date], je vous recommande le format [N] jours.

Pourquoi ce format :
- [Critere 1] : [justification]
- [Critere 2] : [justification]
- [Critere 3] : [justification]

Modules adaptes :
- Conserves : [liste]
- Retires : [liste + raison]
- Ajoutes : [liste + raison]

Tarif : [montant] HT
Calendrier propose : [dates]
Lieu : [presentiel / visio]

Prochaine etape : validation devis avant le [date].
```

## Sources

- `docs/formation-nopillo/04-format-1-jour.md`
- `docs/formation-nopillo/05-format-2-jours.md`
- `docs/formation-nopillo/06-format-3-jours.md`
- `docs/pedagogie-formation/01-overview.md`
