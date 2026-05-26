# 06 — Guide de Decision : Quel Plan Choisir

## Decision tree rapide

```
Tu es seul ou max 2 personnes ?
   |
   +-- Oui --> Tu fais du Claude Code intensif (>3h/j) ?
   |            |
   |            +-- Oui --> Max 20x ($200/mo)
   |            +-- Non --> Max 5x ($100/mo)
   |
   +-- Non (equipe ou org)
        |
        Tu as besoin de SSO, billing centralise, ou admin console ?
        |
        +-- Non --> Plusieurs Max individuels (plus simple, sans admin)
        |
        +-- Oui --> Tu as des contraintes compliance (audit, ZDR, HIPAA, SCIM, Bedrock/Vertex) ?
                |
                +-- Non --> Team Premium ($100-125/seat, min 5)
                +-- Oui --> Enterprise ($20/seat + usage API, min 20-50)
```

## Profils types

### Profil A — Indie hacker

- Profil : 1 dev solo, side project ou freelance
- Usage : 2-5h/j Claude Code, sessions courtes
- Choix : **Max 5x ($100/mo)**
- Pourquoi : 5x Pro suffit largement, prix predictible

### Profil B — Solo power user

- Profil : 1 dev plein-temps qui code 8h/j avec Claude Code
- Usage : sessions longues, repos importants (>30k lignes)
- Choix : **Max 20x ($200/mo)**
- Pourquoi : 1M context inclus, 20x Pro evite le throttling, rolling 5h sans cap hebdo strict

### Profil C — Petite startup (3-10 devs)

- Profil : equipe technique, partage budget
- Usage : variable, certains heavy, d'autres legers
- Sans contrainte compliance
- Choix : **Team Premium x N sieges**
- Pourquoi : SSO, admin console, billing unique, capacite 6.25x Pro/session par siege

**Alternative** si seulement 1-2 vrais power users : leur donner Max 20x individuel ($200) + Pro pour les autres ($20) revient moins cher que Team Premium avec 5 sieges minimum.

### Profil D — Scaleup en croissance (15-50 devs)

- Profil : equipe tech structuree, RH formalisees
- Usage : pic d'activite varies, plusieurs squads
- Sans contrainte regulee (pas de sante, pas de finance)
- Choix : **Team Premium** (10-50 sieges)
- Pourquoi : admin console suffit, pas besoin de SCIM ni audit logs avances

### Profil E — Grand compte regule

- Profil : org 50+ users, secteur sante/finance/defense
- Usage : doit etre auditable, isole, conforme
- Contraintes : SSO obligatoire, audit logs, eventuellement ZDR/HIPAA, deploy cloud prive
- Choix : **Enterprise** (sales-assisted)
- Pourquoi : seul plan avec SCIM, audit logs, ZDR, HIPAA, Bedrock/Vertex/Foundry, OpenTelemetry

### Profil F — Bureau d'agence (5-15 devs)

- Profil : agence/consulting, devs sur missions clients diverses
- Usage : variabilite extreme entre missions
- Choix : **Mix Max 20x individuels + Team Standard partage**
- Pourquoi : flexibilite, predictibilite cout per-mission

## Quand "downgrade" d'Enterprise vers Team Premium

Tu peux passer d'Enterprise a Team Premium si :
- Tu n'utilises PAS le SCIM
- Tu n'utilises PAS les audit logs avances
- Tu n'as PAS besoin de Bedrock/Vertex/Foundry
- Ton secteur n'est PAS regule
- Tu veux **plus de predictibilite cout** (Enterprise = pay-as-you-go API rates, peut exploser)

L'economie peut etre significative : Enterprise avec 20 users heavy peut couter $400 seats + $5-10k usage = $5-10k/mois, alors que 20 sieges Team Premium = $2000/mois capes.

## Quand "upgrade" de Max vers Team Premium ou Enterprise

Upgrade Max → Team Premium quand :
- Tu deviens 3+ personnes
- Tu veux billing unique au lieu de N comptes individuels
- Tu veux SSO pour gerer les arrivees/departs

Upgrade Team Premium → Enterprise quand :
- Tu approches 50+ sieges (Enterprise devient competitif financiere)
- Compliance requise (audit, ZDR, HIPAA)
- Securite : besoin de SCIM
- DevOps : besoin OpenTelemetry, deploy Bedrock/Vertex
- Tu veux des policies centralisees Claude Code (MCP whitelist, file access)

## Pieges courants

### Piege 1 — Confondre "Team Premium" et "Enterprise Premium"
Il n'y a PAS de plan nomme "Enterprise Premium". Si quelqu'un en parle, demande ce qu'il vise (Team Premium ou Enterprise).

### Piege 2 — Enterprise = chere obligatoirement
Faux. Enterprise self-serve commence a 20 sieges x $20 = $400/mo de seats, plus usage. Pour une petite org regulee qui a peu d'usage, Enterprise self-serve peut etre raisonnable.

### Piege 3 — Max 20x = mieux que Team Premium
Faux pour les equipes. Max 20x a un per-session multiplier 3x plus eleve que Team Premium (20x vs 6.25x), mais Max manque SSO/admin. Pour 5+ users, Team Premium est presque toujours mieux.

### Piege 4 — Enterprise HIPAA couvre Claude Code
Faux. **Claude Code n'est PAS HIPAA-ready meme sur Enterprise HIPAA**. C'est une exclusion documentee.

### Piege 5 — ZDR sur Max
Impossible. ZDR n'est qu'Enterprise sur addendum. Si tu as besoin de garantir zero-retention, Enterprise sales-assisted est obligatoire.

### Piege 6 — Considerer le forfait Max comme "illimite"
Faux. Max 20x a un cap rolling 5h et eventuellement hebdo. C'est juste 20x Pro, pas illimite.

## Synthese : qui a quoi en plus / en moins

### Max a en PLUS qu'Enterprise

- Cout 100% predictible (forfait fixe vs API metered)
- Quota inclus (Enterprise n'inclut aucun token)
- Pas de minimum sieges
- Setup zero (Enterprise = contrat, IdP, SCIM, etc.)

### Max a en MOINS qu'Enterprise

- Admin console, SSO, SCIM
- Audit logs, Compliance/Analytics API
- ZDR, HIPAA, custom retention
- Deploy Bedrock/Vertex/Foundry
- OpenTelemetry, dashboards contribution
- Policy enforcement centralisee
- Spend limits per-user

### Team Premium a en PLUS qu'Enterprise

- Forfait fixe (quota par siege inclus)
- Plus simple a setup
- Moins de minimum sieges (5 vs 20-50)
- Capacite par siege equivalente Max

### Team Premium a en MOINS qu'Enterprise

- SCIM, audit logs avances, Compliance API
- ZDR, HIPAA, custom retention
- Deploy Bedrock/Vertex/Foundry
- OpenTelemetry, BYOK
- Roles fine-grained
- Centralized Claude Code config

## Sources

- [Lord Technology — Team Premium vs Max plans](https://lord.technology/2026/03/28/claude-team-premium-vs-max-plans-usage-limits-pricing-and-which-to-choose.html)
- [Vantage Point — Claude AI Pricing & Enterprise Tiers](https://vantagepoint.io/blog/sf/anthropic/enterprise-ai-tiers-explained)
- [Verdent Guides — Claude Code Pricing 2026](https://www.verdent.ai/guides/claude-code-pricing-2026)
- [Grand Linux — Claude Code in Team Plan Premium Seat](https://www.grandlinux.com/en/blogs/claude-team-premium.html)
- [Beginners In AI — Claude Code Pricing 2026](https://beginnersinai.org/claude-code-pricing/)
