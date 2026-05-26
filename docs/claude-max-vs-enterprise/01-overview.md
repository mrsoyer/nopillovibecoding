# 01 — Vue d'Ensemble et Clarification du Vocabulaire

## Le piege "Premium"

Anthropic ne vend PAS de plan nomme "Claude Enterprise Premium". Quand quelqu'un parle de "Premium" chez Anthropic, il y a deux candidats :

### Candidat 1 — "Team Premium seat"

Sous-tier du plan **Team** (donc PAS Enterprise). C'est un type de siege a plus grosse enveloppe que le Team Standard.

- Plan parent : **Team** ($25/seat/mo Standard, ou $125/seat/mo Premium)
- Caracteristique : capacite ~6.25x Pro par session, admin console + SSO inclus
- Minimum : 5 sieges (donc $500/mo minimum a $100/seat annuel)

C'est generalement de ca que parlent les blogs et utilisateurs quand ils disent "Premium".

### Candidat 2 — "Enterprise plan" tout court

Le plan organisation reel, distinct de Team.

- Tarif : $20/seat/mo (acces) + **toute la consommation facturee au tarif API**
- Minimum : 20 sieges (self-serve) ou 50 sieges (sales-assisted)
- Specificite : pas de quota inclus, c'est de la pay-as-you-go pure
- Inclut : SCIM, audit logs, custom data retention, ZDR optionnel, HIPAA-ready, deploy Bedrock/Vertex/Foundry

Ce document couvre les DEUX interpretations.

## Comparaison rapide a 4 colonnes

| Aspect | Max 5x | Max 20x | Team Premium | Enterprise |
|--------|--------|---------|--------------|------------|
| Cible | Solo intensif | Solo power user | Equipe 5-50 | Org 20+ regulee |
| Tarif | $100/mo | $200/mo | $100-125/seat/mo | $20/seat + API usage |
| Min sieges | 1 | 1 | 5 | 20 (self) / 50 (sales) |
| Capacite/session | 5x Pro | 20x Pro | 6.25x Pro | Aucun cap (API metered) |
| Reset | Rolling 5h | Rolling 5h | Cap hebdo | N/A (pay-per-use) |
| Claude Code 1M context | Oui (Opus 4.6+) | Oui (Opus 4.6+) | Oui | Oui (+ option 500K Sonnet) |
| Admin console | Non | Non | Oui | Oui (avance) |
| SSO/SCIM | Non | Non | SSO oui, SCIM non | SSO + SCIM |
| Audit logs | Non | Non | Limites | Avances (180j, SIEM) |
| ZDR/HIPAA | Non | Non | Non | Optionnel (addendum) |
| Deploy cloud | SaaS Anthropic | SaaS Anthropic | SaaS Anthropic | Anthropic + Bedrock + Vertex + Foundry |

## Architecture des plans Claude (2026)

```
Free (gratuit)
  |
  +-- Pro ($20/mo)
        |
        +-- Max 5x ($100/mo)   <-- individu
        +-- Max 20x ($200/mo)  <-- individu
  |
  +-- Team
        +-- Team Standard ($25/seat/mo)
        +-- Team Premium ($100-125/seat/mo)   <-- equipe "Premium"
  |
  +-- Enterprise ($20/seat + usage API)   <-- entreprise grand compte
```

## Ce qui change entre Max et Enterprise pour Claude Code

### Identique
- Modeles (Opus 4.7, Sonnet, Haiku)
- Fenetre 1M tokens Claude Code (Opus 4.6+ depuis mars 2026)
- Fonctionnalites Claude Code : IDE plug-ins, MCP, sub-agents, hooks, slash commands
- Cowork inclus
- Pas d'entrainement sur tes prompts (sous Commercial Terms)

### Different
| Critere | Max | Enterprise |
|---------|-----|------------|
| Facturation | Forfait fixe | Seat + usage API metered |
| Quota inclus | Oui (cap session/hebdo) | Non (pay-as-you-go) |
| Admin/SSO/SCIM | Non | Oui |
| Audit logs | Non | Oui (180j, export SIEM) |
| Zero Data Retention | Non | Optionnel (addendum) |
| HIPAA BAA | Non | Oui (sales-assisted seulement) |
| Deploy Bedrock/Vertex | Non | Oui |
| OpenTelemetry export | Non | Oui |
| Spend limits par user | Non | Oui |
| Configuration centralisee | Non | Oui (policy enforcement) |

## Sources

- [Claude Help Center — Max plan](https://support.claude.com/en/articles/11049741-what-is-the-max-plan)
- [Claude Help Center — Enterprise plan](https://support.claude.com/en/articles/9797531-what-is-the-enterprise-plan)
- [Claude Help Center — Claude Code with Team/Enterprise](https://support.claude.com/en/articles/11845131-use-claude-code-with-your-team-or-enterprise-plan)
- [Lord Technology — Team Premium vs Max comparison](https://lord.technology/2026/03/28/claude-team-premium-vs-max-plans-usage-limits-pricing-and-which-to-choose.html)
