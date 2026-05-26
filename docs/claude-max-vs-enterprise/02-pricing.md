# 02 — Tarifs Detailles

## Table des matieres

- [Max 5x et Max 20x](#max-5x-et-max-20x)
- [Team Standard et Team Premium](#team-standard-et-team-premium)
- [Enterprise](#enterprise)
- [Modele de facturation compare](#modele-de-facturation-compare)
- [Coute reel d'usage Claude Code](#cout-reel-dusage-claude-code)

## Max 5x et Max 20x

| Tier | Mensuel | Annuel | Engagement | Sieges |
|------|---------|--------|------------|--------|
| Max 5x | $100/mo | Non disponible (mensuel seulement) | Aucun | 1 (individuel) |
| Max 20x | $200/mo | Non disponible (mensuel seulement) | Aucun | 1 (individuel) |

**Inclus dans le forfait** :
- Claude web + desktop + mobile
- Claude Code en CLI/IDE
- Cowork
- Acces prioritaire aux nouveaux modeles
- Quota fixe par session 5h et hebdo (voir [03-usage-limits.md](03-usage-limits.md))

**Pas inclus** :
- Admin console
- SSO / SCIM
- Audit logs
- Aucun "credit additionnel" automatique : si tu depasses, tu peux activer "usage credits" en pay-as-you-go API rates

## Team Standard et Team Premium

| Tier | Mensuel | Annuel | Min sieges | Capacite session |
|------|---------|--------|------------|------------------|
| Team Standard | $25/seat/mo | $20/seat/mo (annuel) | 5 | ~ Pro equivalent |
| Team Premium | $125/seat/mo | $100/seat/mo (annuel) | 5 | 6.25x Pro |

**Min commit Team Premium** : 5 sieges x $100 = **$500/mo minimum** (annuel) ou **$625/mo** (mensuel).

**Inclus** :
- Tout ce qui est dans Pro/Max cote produit
- Claude Code inclus dans **chaque** siege (Standard et Premium)
- Admin console (gestion sieges)
- SSO (single sign-on)
- Billing centralise
- Cowork

**Pas inclus** (vs Enterprise) :
- SCIM (provisioning automatique)
- Audit logs avances
- ZDR
- HIPAA BAA
- Deploy Bedrock/Vertex/Foundry

## Enterprise

### Structure tarifaire

Enterprise est **structurellement different** : c'est du seat-as-access + usage metered.

| Composant | Tarif |
|-----------|-------|
| Seat fee (acces) | $20/seat/mo facture annuellement |
| Usage Claude | Tarif API standard sur tokens consommes |
| Usage Claude Code | Tarif API standard sur tokens consommes |
| Usage Cowork | Tarif API standard sur tokens consommes |

**Min sieges** :
- Self-serve (en ligne ou AWS Marketplace) : **20 sieges**
- Sales-assisted : **50 sieges**

**Cout reel** = $20 x N_seats + tokens_consommes x tarif_API.

### Inclus dans le seat fee

- Acces a Claude web/desktop/mobile
- Claude Code inclus dans chaque siege Enterprise (plans recents/self-serve)
- Cowork
- Admin console avance
- SSO + SCIM
- Audit logs (180 jours d'historique exportable)
- Compliance API + Analytics API
- Connecteurs : Google Drive, Gmail, Calendar, GitHub, Microsoft 365, Slack
- Spend limits configurables par user et par org
- Custom data retention controls

### Options sur devis (sales-assisted)

- ZDR addendum (Zero Data Retention)
- HIPAA BAA + HIPAA-readiness (note : Claude Code n'est PAS couvert par l'offre HIPAA)
- SLA 99.99%
- Data residency
- Deploy BYOK (Bedrock, Vertex AI, Microsoft Foundry, VPC isolation)

## Modele de facturation compare

| Plan | Forfait fixe ? | Tokens inclus ? | Pay-as-you-go au-dela ? |
|------|----------------|-----------------|-------------------------|
| Max 5x | Oui ($100) | Oui (cap fixe) | Optionnel via "usage credits" |
| Max 20x | Oui ($200) | Oui (cap fixe) | Optionnel via "usage credits" |
| Team Premium | Oui ($100-125/seat) | Oui (cap hebdo) | Optionnel via "usage credits" |
| Enterprise (self-serve) | Non (seat = acces seulement) | Aucun | **Tout est pay-as-you-go API** |

**Implication financiere** :
- Max et Team Premium ont un **plafond de cout previsible** (le forfait) — au pire tu tapes le mur.
- Enterprise a un **cout variable** — un seul user qui mouline 24/7 peut couter cher. D'ou les "spend limits par user".

## Cout reel d'usage Claude Code

Estimations issues des comparatifs 2026 :

| Profil | Plan optimal | Cout mensuel typique |
|--------|--------------|----------------------|
| Solo dev casuel | Pro ($20) | $20 |
| Solo dev quotidien | Max 5x | $100 |
| Solo dev power user | Max 20x | $200 |
| Equipe 5 devs intensifs | Team Premium x5 | $500-625 |
| Equipe 10+ devs, sans contrainte compliance | Team Premium | $1000-1250 |
| Org reguleee, 20+ users | Enterprise | $400/mo (seats) + usage API (variable, souvent $2k-10k+) |

**Regle empirique cite dans les comparatifs** :
> Si 1-2 individus sont le goulot, Max 20x a $200/personne est plus simple et moins cher que 5 sieges Team. Si SSO/billing centralise/admin compte, alors Team Premium est l'option minimum. Si compliance/audit/deploy cloud prive compte, alors Enterprise.

## Sources

- [Claude Help Center — Max plan](https://support.claude.com/en/articles/11049741-what-is-the-max-plan)
- [Claude Help Center — Enterprise plan](https://support.claude.com/en/articles/9797531-what-is-the-enterprise-plan)
- [Lord Technology — Team Premium vs Max](https://lord.technology/2026/03/28/claude-team-premium-vs-max-plans-usage-limits-pricing-and-which-to-choose.html)
- [Finout — Claude Pricing 2026](https://www.finout.io/blog/claude-pricing-in-2026-for-individuals-organizations-and-developers)
- [SSD Nodes — Claude Code Pricing 2026](https://www.ssdnodes.com/blog/claude-code-pricing-in-2026-every-plan-explained-pro-max-api-teams/)
- [Verdent Guides — Claude Code Pricing 2026](https://www.verdent.ai/guides/claude-code-pricing-2026)
- [Zenken AI — Claude Plan Comparison](https://ai.zenken.co.jp/en/post/claude-plan-comparison/)
