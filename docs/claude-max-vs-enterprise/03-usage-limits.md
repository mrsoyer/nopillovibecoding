# 03 — Limites d'Usage Claude Code

## Table des matieres

- [Fenetres de reset](#fenetres-de-reset)
- [Limites par tier](#limites-par-tier)
- [Comment Anthropic mesure](#comment-anthropic-mesure)
- [Evenements recents (2026)](#evenements-recents-2026)

## Fenetres de reset

Anthropic utilise deux types de fenetres de reset selon le plan :

| Type de fenetre | Plans concernes | Description |
|-----------------|-----------------|-------------|
| Rolling 5h | Pro, Max 5x, Max 20x | Reset glissant : chaque 5h ta capacite se reinitialise progressivement |
| Cap hebdomadaire | Tous les plans payants | Plafond cumule sur 7 jours, deux compteurs (all-models + Sonnet) |

Sur Max et Pro, c'est la fenetre 5h qui domine. Sur Team Premium, ce sont les caps hebdo qui mordent en premier.

## Limites par tier

Chiffres approximatifs publies dans les comparatifs (Anthropic ne publie pas tous les chiffres officiellement) :

### Fenetres 5h (rolling)

| Plan | Prompts/fenetre approx | Multiplicateur Pro |
|------|------------------------|--------------------|
| Pro | 10-45 | 1x |
| Max 5x | 50-225 | 5x |
| Max 20x | jusqu'a 900 | 20x |
| Team Premium | 6.25x Pro par session | 6.25x |

### Caps hebdomadaires Claude Code (Opus 4.7)

| Plan | Heures Opus 4.7/semaine | Heures Sonnet/semaine |
|------|-------------------------|------------------------|
| Pro | ~ 10-20h | ~ 40h |
| Max 5x | ~ 75h | ~ 240h |
| Max 20x | ~ 300h | ~ 480h |
| Team Premium | similaire Max | similaire Max |
| Enterprise | Pas de cap (metered API) | Pas de cap (metered API) |

Note : ces chiffres dependent du modele, de la concurrence, et de la longueur des sessions. Source : truefoundry + Verdent + heyuan110.

## Comment Anthropic mesure

> "Claude actually meters by tokens — every prompt, file attachment, tool definition, and line of conversation history draws from the same quota."

Implications pour Claude Code :
- Un long fichier ouvert dans le contexte = beaucoup de tokens
- Les definitions d'outils MCP + sub-agents s'ajoutent au compteur
- L'historique de conversation grossit la consommation a chaque tour
- Le prompt caching (auto sur Claude Code) reduit la facture sur les repetitions

## Evenements recents (2026)

### 6 mai 2026 — Doublement des fenetres 5h
> "Claude Code's 5-hour rate limits were doubled for every paid plan and peak-hour throttling was removed on Pro and Max"

Impact : x2 sur les fenetres rolling, plus de throttling en heures de pointe.

### Mars 2026 — Fenetre 1M tokens generalisee
> "Max, Team (both Standard and Premium seats), and Enterprise users on Opus 4.6 automatically get a 1 million token context window in Claude Code with no additional configuration and no long-context pricing surcharge."

- Concerne : Max 5x, Max 20x, Team Standard, Team Premium, Enterprise.
- **Exclu** : Pro (acces 1M context seulement via overage paye).
- Permet de loger un repo medium entier en session sans chunking.

### 13 mai 2026 — Boost +50% promo
> "On May 13, 2026, Anthropic announced a 50% increase in Claude Code weekly limits for all Pro, Max, Team and seat-based Enterprise users, with an expiration date set for July 13, 2026."

Temporaire : +50% caps hebdo jusqu'au 13 juillet 2026 (reponse a la pression Codex).

### Septembre 2025 — Politique de training par defaut
Pour les comptes consumer (Free/Pro/Max), Anthropic a active par defaut l'utilisation des prompts pour entrainer les modeles, **opt-out disponible**. Pour Team/Enterprise/API, **pas d'entrainement par defaut** (cf. [05-admin-security.md](05-admin-security.md)).

## Comparaison concrete : Max 20x vs Team Premium vs Enterprise pour Claude Code

| Scenario | Max 20x ($200) | Team Premium ($100-125/seat) | Enterprise ($20/seat + API) |
|----------|----------------|-------------------------------|-----------------------------|
| Long sprint Claude Code (8h/j) | Rolling 5h se reset 3x/jour | Cap hebdo mord plus vite | Aucune limite, juste le bill |
| Cap atteint que faire | Wait, ou usage credits PAYG | Wait, ou usage credits PAYG | Continue, ca facture |
| Predictibilite cout | Tres elevee (forfait fixe) | Elevee (forfait + overflow) | Faible (depend usage) |
| Visibility cost par user | Aucune (toi-meme) | Admin console | Spend limits par user + dashboards |

## Sources

- [TrueFoundry — Claude Code Limits Explained](https://www.truefoundry.com/blog/claude-code-limits-explained)
- [Verdent Guides — Claude Code Limits Doubled May 2026](https://www.verdent.ai/guides/claude-code-limits-doubled-may-2026)
- [Heyuan110 — Claude Rate Limits 2026](https://www.heyuan110.com/posts/ai/2026-02-28-claude-rate-limits/)
- [ClaudeFast — Higher Usage Limits](https://claudefa.st/blog/guide/development/higher-usage-limits)
- [Pasquale Pillitteri — Claude Code Weekly Limits +50%](https://pasqualepillitteri.it/en/news/2494/claude-code-weekly-limits-50-percent-anti-codex-anthropic-2026)
