# 07 - Meta API : App Review, Scopes, Limitations

## Sommaire

- [Vue d'ensemble](#vue-densemble)
- [Scopes Marketing API](#scopes-marketing-api)
- [Standard Access vs Advanced Access](#standard-access-vs-advanced-access)
- [Process App Review](#process-app-review)
- [Business Verification](#business-verification)
- [Tokens : types et duree de vie](#tokens--types-et-duree-de-vie)
- [Rate limits](#rate-limits)
- [Le bypass officiel via MCP Meta](#le-bypass-officiel-via-mcp-meta)

## Vue d'ensemble

Avant avril 2026, toute app voulant piloter Meta Ads en production via API devait :

1. Creer une Meta Developer App
2. Demander des scopes (`ads_read`, `ads_management`, `business_management`)
3. Passer par App Review (3-5 jours minimum)
4. Verifier l'identite Business (jours-semaines)
5. Maintenir l'app conforme aux mises a jour Meta

Le **MCP officiel Meta** (29 avril 2026) supprime ces etapes pour les usages MCP.

## Scopes Marketing API

| Scope | Acces | Usage MCP |
|-------|-------|-----------|
| `ads_read` | Lecture campagnes, ad sets, ads, insights | Tout MCP analytics |
| `ads_management` | Lecture + creation + modification | MCP write (Pipeboard, brijr) |
| `business_management` | Business Manager, system users | Multi-comptes agence |
| `pages_read_engagement` | Pages stats | MCP qui croisent Page+Ads |
| `pages_show_list` | Liste Pages liees | Setup multi-Pages |
| `read_insights` | Insights organique | Reports croises |

**Pour write** : il faut `ads_management` (qui inclut `ads_read`). `ads_read` seul suffit en read-only.

## Standard Access vs Advanced Access

| Niveau | Acces | Usage |
|--------|-------|-------|
| **Standard Access** | Comptes du dev uniquement, rate limit strict | Dev / test |
| **Advanced Access** | Tous comptes des users qui auth, rate limit prod | **Production** |

Citation Bilal Ahmad : *"Standard Access is basically useless for any real application"*. Advanced Access est obligatoire pour gerer les comptes clients en agence.

### Comment passer en Advanced Access

1. Soumettre App Review **par scope** (un dossier par permission)
2. Justifier business + screencast video demontrant le use case
3. Fournir test credentials a Meta pour reproduire
4. Repondre aux clarifications (souvent 1-2 allers-retours)
5. Attendre 3-5 jours ouvres minimum (souvent 1-2 semaines)

## Process App Review

### Etapes

1. **App Dashboard** -> App Review -> Permissions and Features
2. Selectionner le scope -> "Request Advanced Access"
3. Remplir :
   - Description detaillee de l'usage
   - Screenshots de l'integration
   - Video screencast (5-10 min, demontre le flux complet)
   - Test credentials (compte de test cote app)
4. Soumission -> file d'attente Meta
5. Retour Meta : Approved / Need More Info / Rejected

### Pieges classiques

- **Description vague** : Meta rejette systematiquement les "we use Meta Ads API for marketing"
- **Pas de Privacy Policy** : refus immediat
- **Video sans demonstration concrete du scope demande** : rejet
- **Multi-scopes en une demande** : Meta veut un dossier par scope

### Timeline reelle

Bilal Ahmad rapporte **plus d'une semaine d'attente** sur un projet, avec des demandes de clarification ajoutant des cycles.

## Business Verification

Certains scopes (`business_management` notamment) exigent **Business Verification prealable** :

- Documents legaux d'enregistrement (Kbis en France)
- Identifiant fiscal
- Documentation du modele business
- Preuve de legitimite (site, factures)

Cette etape **doit etre lancee tot** dans le projet. Decouvrir mid-development qu'il faut Business Verification est un piege classique.

## Tokens : types et duree de vie

| Type | Duree | Usage |
|------|-------|-------|
| Short-lived user token | ~1h | Test / OAuth flow |
| Long-lived user token | ~60j | Dev, agences mono-utilisateur |
| **System User token** | Jamais (revocable) | **Production agence** |
| Page access token | Variable | Manipulation Page |

### Generer un long-lived

Echange via `oauth/access_token` :

```
GET https://graph.facebook.com/v23.0/oauth/access_token
  ?grant_type=fb_exchange_token
  &client_id={app_id}
  &client_secret={app_secret}
  &fb_exchange_token={short_lived_token}
```

### System User (recommande prod)

Business Suite -> Users -> System Users -> Add. Genere des tokens **non lies a une personne**, qui survivent au turnover.

## Rate limits

- Development tier : ~60 calls / 5 min
- Standard tier : ~9000 calls / 5 min
- Marketing API : **200 calls / hour / user** (plafond plateforme cite par Pipeboard)

Quand le rate limit est atteint, Meta retourne erreur 17 avec retry-after.

## Le bypass officiel via MCP Meta

Le **MCP officiel Meta** lance le 29 avril 2026 contourne tout ca :

> "Standard Business OAuth, no Developer App, no review queue. No Meta Developer App, no API tokens, no system user setup, no 3-day app review."

Mecanisme : Meta a expose son propre serveur MCP (`mcp.facebook.com/ads`) qui s'authentifie via le **meme flux OAuth Business** que Shopify ou Mailchimp utilisent. L'utilisateur autorise Claude (ou ChatGPT) directement dans Business Suite avec permissions granulaires (read-only / read+write / read+write+financial).

### Implications pour Nopillo

| Avant avril 2026 | Apres avril 2026 |
|------------------|------------------|
| Creer Meta Developer App | Inutile |
| App Review 3-5j | Inutile |
| Business Verification | Inutile (deja Business) |
| Long-lived tokens a renouveler tous les 60j | Tokens manages par Meta |
| System User pour prod | Inutile pour MCP officiel |
| Maintenir l'app a chaque update Meta | Inutile |

### Quand l'App Review reste necessaire

- MCP self-hosted **non-officiel** (brijr, Pipeboard self-host) -> oui, App Review obligatoire
- Integrations custom hors MCP (CRM, dashboards internes) -> oui
- MCP officiel Meta -> **non**

## Recommandation Nopillo

Pour la production agence, partir directement sur le **MCP officiel Meta** + OAuth Business. Reserver les MCP self-hosted (brijr, Pipeboard local) aux cas avances necessitant logique custom non couverte par les 29 outils officiels.

Si une logique custom est strictement necessaire (ex : automation tres specifique de bid), passer via Pipeboard hosted (qui a deja gere son App Review pour ses utilisateurs) plutot que de monter un App Review interne.

## Sources

Voir [sources.md](./sources.md).
