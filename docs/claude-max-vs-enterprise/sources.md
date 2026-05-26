# Sources Consolidees

Documentation generee le **2026-05-26** a partir de 16 sources web (8 recherches paralleles + 8 extractions paralleles).

## Sources officielles Anthropic

| Source | Apport |
|--------|--------|
| [Claude Help Center — What is the Max plan](https://support.claude.com/en/articles/11049741-what-is-the-max-plan) | Specs officielles Max 5x et 20x, pricing, features |
| [Claude Help Center — What is the Enterprise plan](https://support.claude.com/en/articles/9797531-what-is-the-enterprise-plan) | Specs officielles Enterprise, pricing structure, min seats |
| [Claude Help Center — Choose a Claude plan](https://support.claude.com/en/articles/11049762-choose-a-claude-plan) | Vue comparative officielle des plans |
| [Claude Help Center — Use Claude Code with Pro or Max plan](https://support.claude.com/en/articles/11145838-use-claude-code-with-your-pro-or-max-plan) | Acces Claude Code pour Pro/Max, gestion limits |
| [Claude Help Center — Use Claude Code with Team or Enterprise plan](https://support.claude.com/en/articles/11845131-use-claude-code-with-your-team-or-enterprise-plan) | Acces Claude Code pour Team/Enterprise, seat types |
| [Claude Help Center — Access audit logs](https://support.claude.com/en/articles/9970975-access-audit-logs) | Specs audit logs Enterprise (180j, JSON/CSV, SIEM) |
| [Anthropic — Claude Code product page](https://www.anthropic.com/claude-code) | Description coeur de Claude Code |
| [Anthropic — Claude Code for Enterprise](https://claude.com/product/claude-code/enterprise) | Exclusivites Enterprise pour Claude Code (Bedrock, OpenTelemetry, etc.) |
| [Anthropic — Enterprise plan page](https://claude.com/pricing/enterprise) | Pricing Enterprise public |
| [Anthropic — Plans & Pricing](https://claude.com/pricing) | Tableau plans officiel |
| [Anthropic News — Claude Code on Team and Enterprise](https://www.anthropic.com/news/claude-code-on-team-and-enterprise) | Annonce admin controls + Premium seats |
| [Anthropic News — Introducing the Max Plan](https://www.anthropic.com/news/max-plan) | Lancement et positionnement Max |
| [Claude Code Docs — Data usage](https://code.claude.com/docs/en/data-usage) | Politique training et ZDR |
| [Anthropic — Higher usage limits with SpaceX](https://www.anthropic.com/news/higher-limits-spacex) | Contexte hausse limits |

## Sources analystes et blogs techniques

| Source | Apport |
|--------|--------|
| [Lord Technology — Team Premium vs Max plans](https://lord.technology/2026/03/28/claude-team-premium-vs-max-plans-usage-limits-pricing-and-which-to-choose.html) | Comparatif detaille Team Premium 6.25x vs Max 5x/20x, scenarios |
| [Verdent Guides — Claude Code Pricing 2026](https://www.verdent.ai/guides/claude-code-pricing-2026) | Pricing tous plans + estimations real usage |
| [Verdent Guides — Claude Code Limits Doubled May 2026](https://www.verdent.ai/guides/claude-code-limits-doubled-may-2026) | Annonce doublement fenetres 5h |
| [SSD Nodes — Claude Code Pricing 2026](https://www.ssdnodes.com/blog/claude-code-pricing-in-2026-every-plan-explained-pro-max-api-teams/) | Tous les plans expliques |
| [Finout — Claude Pricing 2026](https://www.finout.io/blog/claude-pricing-in-2026-for-individuals-organizations-and-developers) | Pricing organizations + developers |
| [Zenken AI — Claude Plan Comparison](https://ai.zenken.co.jp/en/post/claude-plan-comparison/) | Matrice complete Free/Pro/Max/Team/Enterprise |
| [Vantage Point — Claude AI Pricing & Enterprise Tiers](https://vantagepoint.io/blog/sf/anthropic/enterprise-ai-tiers-explained) | Strategic positioning des tiers |
| [Tactiq — What Is Claude Enterprise](https://tactiq.io/learn/claude-enterprise) | Vue d'ensemble Enterprise |
| [TrueFoundry — Claude Code Limits Explained](https://www.truefoundry.com/blog/claude-code-limits-explained) | Chiffres concrets sur les caps |
| [TrueFoundry — Enterprise Security for Claude](https://www.truefoundry.com/blog/enterprise-security-for-claude) | Practical governance guide |
| [Heyuan110 — Claude Rate Limits 2026](https://www.heyuan110.com/posts/ai/2026-02-28-claude-rate-limits/) | Tests reels caps Pro et Max |
| [ClaudeFast — Higher Usage Limits](https://claudefa.st/blog/guide/development/higher-usage-limits) | Smart routing + 5x more |
| [Pasquale Pillitteri — Claude Code Weekly Limits +50%](https://pasqualepillitteri.it/en/news/2494/claude-code-weekly-limits-50-percent-anti-codex-anthropic-2026) | Promo 13 mai - 13 juillet 2026 |
| [Beginners In AI — Claude Code Pricing](https://beginnersinai.org/claude-code-pricing/) | Pricing vulgarisation |
| [Grand Linux — Claude Code in Team Plan Premium Seat](https://www.grandlinux.com/en/blogs/claude-team-premium.html) | Annonce Premium seat $100 |
| [Cloudzero — Claude Pricing 2026](https://www.cloudzero.com/blog/claude-pricing/) | Optimization strategy |
| [IntuitionLabs — Claude Max Plan Explained](https://intuitionlabs.ai/articles/claude-max-plan-pricing-usage-limits) | Specs Max approfondies |
| [Mem0 — Claude Pricing May 2026](https://mem0.ai/blog/anthropic-claude-pricing) | Snapshot pricing |
| [Platform Security — Claude Enterprise Tenant Hardening](https://platformsecurity.com/blog/how-to-secure-your-claude-enterprise-tenant) | Configuration hardening Enterprise |
| [Claude Implementation — Enterprise Setup Guide](https://claudeimplementation.com/blog/claude-enterprise-setup-guide) | Step-by-step admin |
| [Datastudios — Claude Data Retention](https://www.datastudios.org/post/claude-data-retention-policies-storage-rules-and-compliance-overview) | Retention policies overview |
| [Datastudios — Claude Enterprise Security Configurations](https://www.datastudios.org/post/claude-enterprise-security-configurations-and-deployment-controls-explained) | Security deep dive |
| [AiOpsSchool — What Your Employer Can See on Claude Enterprise](https://aiopsschool.com/blog/what-your-employer-can-see-on-claude-enterprise-a-complete-transparency-guide/) | Transparency guide |
| [Voibe — Is Claude Code Safe](https://www.getvoibe.com/resources/is-claude-code-safe/) | Pro/Max vs API privacy |

## Methodologie

1. **8 recherches WebSearch en parallele** couvrant : comparaison globale, doc officielle Max, doc officielle Enterprise, limites usage, SSO/SCIM/audit, pricing seats, comparaison 200$, data retention
2. **8 extractions WebFetch en parallele** sur les sources prioritaires (officiel Anthropic + comparatifs detailles)
3. Croisement des sources pour fait etabli (cite 3+ fois) vs divergence (notee)
4. Structuration en 6 fichiers thematiques + index + sources

Limite : Anthropic ne publie pas tous les chiffres officiellement (notamment caps exacts par modele). Les chiffres precis (heures Opus/Sonnet par semaine, prompts/fenetre) viennent de tests communautaires et peuvent varier.
