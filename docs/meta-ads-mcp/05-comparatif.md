# 05 - Comparatif des MCP Meta Ads

## Sommaire

- [Matrice synthetique](#matrice-synthetique)
- [Capacites detaillees](#capacites-detaillees)
- [Cout total de possession](#cout-total-de-possession)
- [Securite et conformite agence](#securite-et-conformite-agence)
- [Setup et UX](#setup-et-ux)
- [Recommandation finale Nopillo](#recommandation-finale-nopillo)

## Matrice synthetique

| Critere | **Meta officiel** | **Pipeboard** | **brijr/meta-mcp** | **Adzviser** | **Ads Library MCP** |
|---------|-------------------|---------------|--------------------|--------------|---------------------|
| Lance | Avril 2026 | 2024 | 2024 | 2024 | 2024 |
| Outils | 29 | 29-31 | 25 | n/a (snapshot) | 15+ |
| Read | Oui | Oui | Oui | Oui | Oui (Ad Library) |
| Write | Oui (granulaire) | Oui | Oui | Non | Non |
| OAuth Business | Natif | Via Pipeboard | A configurer | Managed | Token public |
| App Review Meta | **Non requis** | Possible bypass | **Requis** | **Non requis** | **Non requis** |
| Self-host | Non | Oui | Oui | Non | Oui |
| Remote hosted | Oui (Meta) | Oui | Non | Oui | Non |
| Multi-compte agence | Granulaire | Mixte | Manuel | Workspace | n/a |
| Pricing | Free beta | Free + Premium | Free (MIT) | $0.99 -> $34.99/mo | Free (MIT) |
| Licence | Proprio Meta | BSL 1.1 | MIT | Proprio | MIT |

## Capacites detaillees

### Campaign management (write)

| MCP | Create campaign | Update | Pause/Resume | Duplicate |
|-----|----------------|--------|--------------|-----------|
| Meta officiel | Oui | Oui | Oui | Non liste |
| Pipeboard | Oui | Oui | Via update | Oui (premium) |
| brijr | Oui | Oui | Oui (dedie) | Non |
| Adzviser | Non | Non | Non | Non |

### Audience targeting

| MCP | Search interests | Lookalike | Custom | Geo |
|-----|------------------|-----------|--------|-----|
| Meta officiel | Oui (limite) | Via UI | Via UI | Oui |
| Pipeboard | Oui | Via creation | Via API | Oui |
| brijr | Implicite | `create_lookalike_audience` | `create_custom_audience` | Implicite |
| Adzviser | Lecture only | Lecture only | Lecture only | Non |

### Insights et analytics

| MCP | Get insights | Bulk multi-compte | Anomaly detection | Industry benchmark |
|-----|-------------|-------------------|-------------------|--------------------|
| Meta officiel | Oui | Oui | **Oui** (`anomaly_signal`) | **Oui** (`industry_benchmark`) |
| Pipeboard | Oui | Oui (bulk) | Non | Non |
| brijr | Oui | Non | Non | Non |
| Adzviser | Snapshots | Oui | Detection alerts | Non |

Le MCP officiel Meta est seul a exposer les **anomaly signals** et **industry benchmarks** natifs.

### Catalog (commerce)

Seul **Meta officiel** expose un suite complete de 10 outils catalog (catalog_create, get_catalogs, get_diagnostics, get_feed_rules, get_product_details, etc). Critique pour clients e-commerce.

## Cout total de possession

Hypothese : Nopillo gere 20 clients Meta Ads.

| Solution | Cout direct | Setup | Maintenance | Risque |
|----------|-------------|-------|-------------|--------|
| Meta officiel | $0 (beta) | OAuth x 20 = 1h | Nul (Meta) | Tarification post-beta inconnue |
| Pipeboard hosted | Free + premium ad hoc | 5 min | Nul | Vendor + BSL |
| Pipeboard self-host | $0 | ~2h infra | ~1j/mois | Tokens a gerer |
| brijr self-host | $0 | ~3h (App Review !) | ~2j/mois | App Review 3-5j |
| Adzviser | $34.99 x ? = potentiellement $700+/mo agence | 10 min | Nul | Vendor lock |
| Ads Library MCP | $0 | 30 min | ~0.5j/mois | Aucun (Ad Library publique) |

## Securite et conformite agence

### Per-client token isolation

C'est le critere bloquant pour une agence : pouvoir revoquer l'acces d'un client sans casser les autres.

| MCP | Isolation per-client |
|-----|---------------------|
| Meta officiel | **Granulaire native** (per integration, revocable) |
| Pipeboard | Limite (token Pipeboard global) |
| brijr | Implementable (variables env separees) |
| Adzviser | Workspace-level |
| Ryze (cite en comparaison) | Native multi-tenant |

### Audit trail

| MCP | Logs actions IA | Export audit |
|-----|----------------|--------------|
| Meta officiel | Via Business Suite | Oui (Business audit) |
| Pipeboard | Cote Pipeboard | Limite |
| brijr | A loguer soi-meme | Manuel |
| Adzviser | Cote Adzviser | Limite |

## Setup et UX

| Critere | Meta officiel | Pipeboard | brijr | Adzviser |
|---------|---------------|-----------|-------|----------|
| Temps install | ~10 min | ~2 min (remote) | ~30 min + App Review | ~5 min |
| Niveau technique | Faible | Faible | Moyen-eleve | Aucun |
| Edition JSON config | Oui | Oui | Oui | Non |
| Restart Claude | Oui | Oui | Oui | Non |
| Documentation | Officielle Meta | Bonne | README OK | Bonne |

## Recommandation finale Nopillo

### Stack recommandee (combinaison)

1. **MCP officiel Meta** (`mcp.facebook.com/ads`) -> production sur tous les comptes clients (read + write granulaire). Plus d'App Review.
2. **RamsesAguirre777/facebook-ads-library-mcp** -> veille concurrentielle gratuite, en complement.
3. **Pipeboard CLI** (optionnel) -> agents Claude Code en developpement chez Nopillo (Meta + Google + TikTok unifies).
4. **Adzviser** (optionnel) -> formation des consultants juniors avant migration vers le MCP officiel.

### Anti-patterns

- **Eviter** : developper son propre MCP custom from scratch -> reinvente la roue, expose au risque App Review.
- **Eviter** : Pipeboard self-hosted en production agence -> per-client isolation insuffisante.
- **Eviter** : tout miser sur un seul vendor SaaS no-code -> cout exponentiel + lock-in.

## Sources

Voir [sources.md](./sources.md).
