# 05 — Admin, Securite et Conformite

## Table des matieres

- [Tableau recapitulatif](#tableau-recapitulatif)
- [SSO, SCIM, et identite](#sso-scim-et-identite)
- [Audit logs](#audit-logs)
- [Donnees et training](#donnees-et-training)
- [Conformite](#conformite)
- [Roles et permissions](#roles-et-permissions)

## Tableau recapitulatif

| Fonctionnalite | Max 5x/20x | Team Standard | Team Premium | Enterprise |
|----------------|-----------|---------------|--------------|------------|
| Admin console | Non | Oui | Oui | Oui (avance) |
| Domain capture | Non | Oui | Oui | Oui |
| SSO (SAML 2.0, Okta, Azure AD) | Non | Oui | Oui | Oui |
| SCIM provisioning | Non | Non | Non | **Oui** |
| Audit logs | Non | Limites | Limites | **180j, export JSON/CSV/SIEM** |
| Compliance API | Non | Non | Non | **Oui** |
| Analytics API | Non | Limitee | Limitee | **Oui** |
| Spend limits org | Non | Oui | Oui | Oui |
| Spend limits per-user | Non | Non | Non | **Oui** |
| Centralized config Claude Code | Non | Non | Non | **Oui** |
| Tool/MCP policy enforcement | Non | Non | Non | **Oui** |
| File access restrictions | Non | Non | Non | **Oui** |
| Custom data retention | Non | Non | Non | **Oui** |
| Zero Data Retention | Non | Non | Non | **Optionnel (addendum)** |
| HIPAA BAA | Non | Non | Non | **Sales-assisted seulement** |
| SOC 2 Type II | Non | Inherit | Inherit | **Garanti** |
| Data residency | Non | Non | Non | **Disponible** |
| SLA 99.99% | Non | Non | Non | **Oui** |
| Bedrock / Vertex / Foundry deploy | Non | Non | Non | **Oui** |
| OpenTelemetry export | Non | Non | Non | **Oui** |
| BYOK (Bring Your Own Keys) | Non | Non | Non | **Oui** |

## SSO, SCIM, et identite

### SSO (Single Sign-On)

Disponible des Team Standard et au-dessus. Anthropic supporte :
- Okta
- Azure AD
- Tout fournisseur SAML 2.0

Configurable par les Organization Owners via Organization settings > Security.

### SCIM (System for Cross-domain Identity Management)

**Exclusivement Enterprise**. Permet de :
- Auto-provisionner les utilisateurs depuis l'IdP (Okta, etc.)
- De-provisionner automatiquement quand quelqu'un quitte
- Synchroniser les groupes/roles

Aucun plan en-dessous d'Enterprise n'a SCIM.

### Domain capture

Auto-rattache les comptes Google/Microsoft d'une organization au workspace via le domaine email. Disponible des Team.

## Audit logs

### Disponibilite

**Enterprise uniquement** (officiel Anthropic).

### Contenu

Les audit logs capturent :
- Actions utilisateur (login, query, file upload, MCP call)
- Evenements systeme
- Acces aux donnees

### Export

- Format : JSON ou CSV
- Periode : 180 jours d'historique exportables
- Destination : telechargement direct ou push vers SIEM (Splunk, Datadog, Elastic)
- Acces : Organization Owner ou Primary Owner via Organization settings > Data and Privacy > Export logs

## Donnees et training

### Politique de training par plan

| Plan | Training par defaut sur tes donnees ? | Opt-out |
|------|--------------------------------------|---------|
| Free | **Oui** (depuis sept 2025) | Oui, dans settings |
| Pro | **Oui** (depuis sept 2025) | Oui, dans settings |
| Max 5x/20x | **Oui** (depuis sept 2025) | Oui, dans settings |
| Team Standard | **Non** (Commercial Terms) | N/A |
| Team Premium | **Non** | N/A |
| Enterprise | **Non** | N/A |
| API | **Non** | N/A |

Citation officielle :
> "Anthropic does not train generative models using code or prompts sent to Claude Code under commercial terms, unless the customer has chosen to provide their data to us for model improvement."

### Stockage local (Claude Code CLI)

Independent du plan :
> "Claude Code clients store session transcripts locally in plaintext under ~/.claude/projects/ for 30 days by default to enable session resumption."

A garder en tete pour les setups regulees : meme avec ZDR, les transcripts sont en local.

### Zero Data Retention (ZDR)

**Exclusivement Enterprise**, sur addendum sales-assisted.

> "Zero data retention is available for Claude Code on Claude for Enterprise. ZDR is enabled on a per-organization basis; each new organization must have ZDR enabled separately by your account team."

ZDR efface les logs server-side immediatement apres les abuse checks. Necessaire pour la plupart des deploiements compliance-heavy.

### Custom data retention controls

Enterprise permet de configurer la duree de retention des donnees (logs, transcripts server-side, conversations) ainsi que la **selective deletion** via la Compliance API.

## Conformite

### Certifications heritees

Tous les plans heritent des certifications Anthropic :
- SOC 2 Type II (organisation Anthropic)
- GDPR-compliant (mais responsabilite partagee)

### Specifique Enterprise

- **HIPAA-readiness** + BAA : disponible UNIQUEMENT via sales-assisted Enterprise
  - **Restriction importante** : Claude Code n'est PAS couvert par l'offre HIPAA-ready. Tu peux avoir Enterprise + HIPAA + Claude Code, mais l'usage Claude Code n'est PAS HIPAA-compliant.
- **Data residency** : selection de region de traitement
- **Compliance API** : acces programmatique aux usage logs pour conformite continue

### Specifique Team Premium

- Pas de BAA HIPAA
- Pas de Data residency
- Heritage SOC 2 type II via Anthropic mais pas de garantie contractuelle individuelle

### Specifique Max

- Aucune garantie compliance individuelle (compte consumer)
- Le training est par defaut active (opt-out disponible)
- A eviter pour donnees regulees

## Roles et permissions

### Hierarchie standardisee

1. **Primary Owner** : controle complet de l'organization, un seul par domaine
2. **Organization Owner** : gestion users, security policies, API configs
3. **Admin** : gestion workspace members
4. **Member** : usage standard, pas de config

### Roles fine-grained (Enterprise uniquement)

Enterprise permet de creer des roles custom avec permissions granulaires :
- Quels users peuvent acceder a Claude Code
- Quels users peuvent installer des MCP servers
- Quels users peuvent acceder a certains repos
- Quels users peuvent depasser le budget

## Sources

- [Claude Help Center — Access audit logs](https://support.claude.com/en/articles/9970975-access-audit-logs)
- [Claude Help Center — Enterprise plan](https://support.claude.com/en/articles/9797531-what-is-the-enterprise-plan)
- [Claude Code Docs — Data usage](https://code.claude.com/docs/en/data-usage)
- [TrueFoundry — Enterprise Security for Claude](https://www.truefoundry.com/blog/enterprise-security-for-claude)
- [Platform Security — Claude Enterprise Tenant Hardening](https://platformsecurity.com/blog/how-to-secure-your-claude-enterprise-tenant)
- [Claude Implementation — Enterprise Setup Guide](https://claudeimplementation.com/blog/claude-enterprise-setup-guide)
