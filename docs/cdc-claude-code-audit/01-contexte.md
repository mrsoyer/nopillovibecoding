# 01 — Contexte & Methodologie de l'audit

## Probleme

L'ecosysteme Claude Code a explose en 2026 :

- **Lancement Anthropic Academy** le 02 mars 2026 (13 cours gratuits sur Skilljar)
- **VS Code extension** : croissance 17.7M -> 29M installs/jour (jan -> fev 2026)
- **Adoption marche** : 73% equipes engineering utilisent IA coding quotidiennement (fev 2026)
- **Multiplication formations** : >= 8 formations FR + >= 20 cours Udemy + 2 specs Coursera

Probleme decisionnel : **comment choisir une formation, structurer un workflow, et eviter les anti-patterns** quand l'offre explose et que la documentation officielle reste dense ?

## Solution

Audit consolide en 4 livrables :

1. **Cartographie formations** (FR + international) avec criteres de selection (CPF, prix, duree, public)
2. **Best practices officielles** structurees par theme (context, prompting, automatisation)
3. **Architecture des extensions** (MCP/Skills/Subagents/Hooks/CLAUDE.md) avec matrice de decision
4. **Parcours recommandes** par profil (debutant, dev senior, equipe, entreprise)

## Audience cible

| Profil | Besoin | Section prioritaire |
|---|---|---|
| Developpeur autodidacte | Apprendre vite, gratuit | [02 — formations](02-formations-audit.md) International + [03 — best practices](03-best-practices.md) |
| Salarie cherchant CPF | Formation certifiee, FR | [02 — formations](02-formations-audit.md) France |
| Tech lead / CTO | Industrialiser en equipe | [04 — architecture](04-architecture.md) + [05 — reco](05-recommandations.md) |
| Formateur / RH | Selectionner prestataire entreprise | [02 — formations](02-formations-audit.md) Entreprise |
| Vibecodeur / nocodeur | Demarrer sans coder | [02 — formations](02-formations-audit.md) NoCode IA + Alfie |

## Methodologie

### Sources collectees

| Type | Volume | Methodes |
|---|---|---|
| Documentation officielle Anthropic | 1 page complete (best-practices) | WebFetch direct |
| Articles techniques references | 1 article complet (alexop.dev architecture) | WebFetch direct |
| Resultats moteur (formations FR) | 10 resultats | WebSearch CPF/Qualiopi |
| Resultats moteur (formations intl) | 10 resultats | WebSearch Anthropic + Coursera |
| Resultats moteur (best practices) | 10 resultats | WebSearch best practices |
| Resultats moteur (architecture) | 10 resultats | WebSearch subagents/skills/hooks/MCP |

### Criteres de selection des formations

Filtres appliques pour retenir une formation dans l'audit :

| Critere | Poids | Justification |
|---|---|---|
| Source officielle ou Qualiopi | 3 | Eviter formations non-certifiees |
| URL accessible et pricing visible | 2 | Decision possible sans contact commercial |
| Mention Claude Code (pas Claude general) | 3 | Specifique a l'outil cible |
| Mise a jour 2026 | 2 | Eviter contenu obsolete (l'outil evolue vite) |
| Profil public clair | 1 | Permet auto-orientation |

Formations exclues : marketing pur sans contenu pedagogique, ressources Claude general (sans Claude Code), formations >2 ans non updates.

### Criteres de selection des best practices

Best practices retenues uniquement si :

- **Source officielle Anthropic** OU
- **Confirmees par 3+ sources independantes** (GitHub, Medium, blogs techniques)
- **Verifiables** : on peut tester si on respecte ou pas

Anti-patterns eliminees : recommandations contradictoires, conseils trop specifiques (1 framework), opinions sans donnees.

## Limites de l'audit

| Limite | Impact | Mitigation |
|---|---|---|
| Pricing formations FR variable selon CPF | Estimation budgetaire approximative | Indiquer fourchette + lien direct |
| Anthropic Academy lance recemment (mars 2026) | Retours d'experience limites | Marquer "nouveau, a confirmer" |
| Best practices evoluent (releases mensuels) | Risque obsolescence rapide | Citer URL officielle pour update |
| Pas de test pratique des formations | Qualite pedagogique non evaluee | Indiquer source temoignages |

## Periode et fraicheur

- **Date de l'audit** : 2026-05-05
- **Periode couverte** : 2024 (lancement Claude Code) -> 2026-05
- **A re-auditer** : tous les 6 mois (rythme releases majeures Anthropic)

## Lien avec le projet hote

Ce CDC est genere dans `/Users/thomas/webflowlanding/` qui utilise deja :

- **Framework SYM v4.8** : 47 agents installes (28 projet + 19 framework)
- **8 skills Cowork** : cdc-maker, doc-maker, skill-maker, find-docs, simplify, etc.
- **8 MCP servers** : webflow, supabase, context7, doctrine, lemlist, n8n, pappers, hubspot

Le plan d'action ([06-taches.md](06-taches.md)) **reutilise ces agents et skills** plutot que de reinventer.
