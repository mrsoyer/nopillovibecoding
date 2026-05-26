# Automatisation Google Ads — Smart Bidding, Scripts, AI Max

## Table des Matieres

1. [Niveaux d'automatisation 2026](#niveaux-dautomatisation-2026)
2. [Smart Bidding](#smart-bidding)
3. [Performance Max](#performance-max)
4. [AI Max Search](#ai-max-search)
5. [Top 10 Google Ads Scripts](#top-10-google-ads-scripts)
6. [Quand les scripts ne suffisent pas](#quand-les-scripts-ne-suffisent-pas)
7. [Patterns d'automatisation avec MCP + Claude](#patterns-dautomatisation-avec-mcp--claude)

## Niveaux d'Automatisation 2026

D'apres Groas.ai, l'automatisation Google Ads se classe en 4 niveaux :

| Niveau | Description | Exemples |
|--------|-------------|----------|
| **L1 — Automatisation in-campaign** | Optimisations natives Google | Smart Bidding, AI Max, PMax |
| **L2 — Scripts** | Code custom monitoring/alerting | Top 10 scripts, voir plus bas |
| **L3 — Outils tiers** | SaaS gestion compte | Optmyzr, Adalysis, Adzooma |
| **L4 — Agents autonomes** | LLM + MCP + decision engine | Claude + MCP Google Ads (emergent) |

**Realite 2026** : L1 + L2 couvrent 90% des besoins. L4 emerge comme couche d'orchestration.

## Smart Bidding

### Strategies Disponibles

| Strategy | Optimise | Quand |
|----------|----------|-------|
| **Maximize Conversions** | Volume conversions | Demarrage, sans tCPA fiable |
| **Target CPA (tCPA)** | Cout/conversion cible | tCPA stable connu, 30+ conv/mois |
| **Maximize Conversion Value** | Valeur totale generee | Ecommerce avec values |
| **Target ROAS (tROAS)** | ROI cible | tROAS connu, 50+ conv value-based |
| **Maximize Clicks** | Volume trafic | Awareness only (rarement utile) |
| **Manual CPC** | Controle manuel | Cas exceptionnels (en 2026) |

### Limites Smart Bidding

D'apres Groas.ai :
> "Smart Bidding is limited to bid optimization only — no keyword management, ad testing, or budget allocation."

Smart Bidding NE GERE PAS :
- Allocation budget entre campagnes
- Ajout/pause de keywords
- A/B testing creatives
- Negative keywords
- Monitoring URL casse

→ C'est ici que les **scripts** et le **MCP** apportent la valeur.

### Prerequis pour Smart Bidding Efficace

- **30 conversions/30j minimum** (plus pour tROAS : 50+)
- **Tracking conversion fiable** (voir [07-conversion-tracking.md](07-conversion-tracking.md))
- **Stabilite budget** : pas de variations > 20% / 7j
- **Periode d'apprentissage** : 1-2 semaines apres setup ou changement majeur

## Performance Max

### Stats 2026

- **62%** de tous les clics Google Ads (Feb 2026)
- **80%** du spend enterprise
- **+35%** conversions vs campagnes manuelles
- **-20%** CPA vs campagnes manuelles

### Asset Groups (remplace Ad Groups)

Chaque PMax asset group requiert :
- Audiences signals (custom segments, in-market, intent)
- 5 headlines + 5 long headlines + 5 descriptions
- 4+ images carrees + 4+ paysage + logos
- 1+ video (Google peut auto-generer si absent → qualite mediocre)

### PMax Best Practices

1. **Asset Group par theme/audience**, pas par produit individuel
2. **Brand exclusions** : exclure ton propre brand pour eviter cherry-picking
3. **Negative keywords campaign-level** (disponible depuis 2024)
4. **Customer Match audiences** comme signals
5. **Final URL expansion = OFF** au depart, ON apres performance prouvee
6. **Conversion goals** alignees avec strategy (volume vs value)

### Asset Performance Reporting

Limitation native : interface PMax cache la perf au niveau asset. Solution : **PMax Asset Reporting Script** (voir plus bas) qui exporte data vers Google Sheets.

## AI Max Search

### Vue d'Ensemble

Deploye sur tous les MCC nord-americains en **Janvier 2026**. C'est du **Search keyword-free** : Google determine les requetes a matcher via signals (landing pages, ads, audiences).

### Avantages

- Couverture etendue automatiquement
- Decouverte de queries nouvelles
- Reduction de la maintenance keyword

### Inconvenients

- Black box plus opaque que Search standard
- Visibility limitee dans Search Terms Report
- Risque de drift vers requetes hors-scope

### Quand l'Adopter

- Comptes a forte croissance avec budget > 5K€/mois
- Themes avec long-tail keywords difficile a maintenir
- Apres avoir maitrise Search standard

## Top 10 Google Ads Scripts

D'apres Groas.ai, voici les scripts essentiels en 2026.

### 1. Budget Pacing Script

**But** : Ajuste les budgets quotidiens selon le budget mensuel restant et les jours restants.

**Usage** : Compte avec budgets mensuels fixes.

**Limite** : Ne reallue PAS le budget entre campagnes selon perf.

### 2. Search Term Mining Script (HIGH ROI)

**But** : Pull quotidien du Search Terms Report, flag les termes avec spend > X et 0 conversion → suggestions de negative keywords.

**Usage** : Toute campagne Search. **"Highest-ROI script you can run"**.

**Limite** : Visibility reduite sur PMax et AI Max (Google cache certains terms).

### 3. Quality Score Monitor

**But** : Tracking quotidien des Quality Scores, alerte si chute sous threshold.

**Usage** : Comptes Search ou QS impacte le CPC.

### 4. Broken URL Checker

**But** : Crawl tous les final URLs, pause les ads pointant vers HTTP non-200, email notification.

**Usage** : **TOUS les comptes, daily**. Evite gaspillage budget sur URL cassees.

### 5. Bid Adjustment by Weather/Day-Parting

**But** : Integration API externe (meteo, jour) pour modifier bid modifiers.

**Usage** : Services locaux, businesses saisonniers.

**Limite** : Ineffectif avec Smart Bidding (qui ignore les manual bid adjustments).

### 6. Competitor Impression Share Alert

**But** : Monitor impression share et top-of-page rate, alerte si position concurrentielle baisse.

**Usage** : Industries competitives (legal, home services, B2B SaaS).

### 7. Anomaly Detector

**But** : Compare metriques actuelles (CPA, CTR, spend) vs rolling averages, flag deviations.

**Usage** : Tous comptes. Detecte tracking errors, competitor activity, page outages.

**Limite** : Flag mais ne diagnostique pas la cause.

### 8. Performance Max Asset Reporting

**But** : Extrait asset-level data PMax vers Google Sheets (palie au gap interface).

**Usage** : Tout compte avec PMax.

### 9. Label-Based Budget Controller

**But** : Utilise les labels campagne pour grouper et enforce des budget caps par groupe ("Brand", "Non-Brand", "Test").

**Usage** : Comptes 10+ campagnes avec allocation segmentee.

### 10. Conversion Lag Correction Script

**But** : Ajuste reporting pour lag de conversions (lead gen, B2B).

**Usage** : Comptes avec offline conversion imports ou cycles longs.

### Installation Script

1. Google Ads → **Tools & Settings** → **Bulk Actions** → **Scripts**
2. **+** → New script
3. Coller le code JavaScript
4. **Authorize** API access
5. Set frequency (hourly/daily/weekly)
6. **Preview mode** d'abord pour valider
7. Activer

### Securite Scripts

- **Toujours preview** avant prod
- **Logs** active : verifier execution propre les 1ers jours
- **Email notifications** sur errors
- Eviter scripts qui modifient en masse sans confirmation

## Quand les Scripts ne Suffisent Pas

D'apres l'industrie, scripts excellent en :
- Monitoring & alerting
- Data aggregation & reports
- Rule-based changes simples

Scripts limitent quand il faut :
- **Diagnostic causal** (anomalie detected → quel root cause ?)
- **Decisions multi-criteres** (budget reallocation cross-campagne)
- **Synthese narrative** (rapports executive)
- **Recherche dans search terms** semantique

→ C'est la la valeur du **MCP Google Ads + Claude**.

## Patterns d'Automatisation avec MCP + Claude

### Pattern 1 — Audit Quotidien

```
Cron : tous les matins 9h
Trigger : Claude execute via MCP

1. Get hier perf cross-campagne
2. Detect anomalies (CPA, CTR, spend)
3. Cross-reference avec search terms du jour
4. Genere synthese executive
5. Envoyer email/Slack
```

### Pattern 2 — Optimisation Hebdomadaire

```
Trigger : User demande "optimise mon compte"

Claude :
1. Run Quality Score audit (MCP query)
2. Run Search Terms analyse (MCP query)
3. Identifie keywords low QS, search terms wasted
4. Propose plan d'action :
   - Negatives a ajouter
   - Ads a pause
   - Landing pages a rework
5. (Read-only en v1, apply manuellement)
```

### Pattern 3 — Reporting Mensuel

```
Trigger : Debut de mois

Claude :
1. Pull metrics mois precedent
2. Compare vs M-1 et M-12
3. Highlights & lowlights par campagne
4. Recommendations pour M+1
5. Export CSV + memo executive
```

### Pattern 4 — Diagnostic d'Anomalie

```
Trigger : Alerte script (CPA spike)

Claude :
1. Receive anomaly notification
2. Query Google Ads via MCP : detail spike
3. Cross-reference search terms du jour
4. Verifie landing pages (URLs, status)
5. Propose hypothesis + action plan
```

## Stack Recommande 2026

| Couche | Outil |
|--------|-------|
| **Bidding** | Smart Bidding (tCPA ou tROAS) |
| **Campagnes principales** | PMax + Search/AI Max |
| **Monitoring** | 4-5 scripts core (Broken URL, Search Terms, QS Monitor, Anomaly Detector, Budget Pacing) |
| **Reporting** | Google Sheets via scripts + Looker Studio |
| **Orchestration** | Claude Code + MCP Google Ads |
| **Conversion tracking** | GA4 + Enhanced Conversions + Consent Mode V2 |

## Sources

- [The 10 Best Google Ads Scripts In 2026 (Groas.ai)](https://groas.ai/post/best-google-ads-scripts-2026-install-guide-automation-limits) — Top scripts detailled
- [Google Ads Automation Levels 2026 (Groas.ai)](https://groas.ai/post/google-ads-automation-levels-where-every-tool-actually-falls-2026-ranking) — Ranking outils
- [Google Ads in 2026: AI Max, PMax & Smart Bidding (Yellowjack)](https://www.yellowjackmedia.com/google-ads-in-2026-how-ai-max-performance-max-and-smart-bidding-are-changing-ppc-forever/) — Synthese 2026
- [How to Automate Google Ads with AI in 2026 (Balistro)](https://www.balistro.com/how-to-automate-google-ads-management-with-ai-in-2026/) — Automation AI
- [The 3 Must-Have Scripts for Google Ads (Defined Digital)](https://www.definedigitalacademy.com/newsletters/google-ads-espresso/posts/the-3-must-have-scripts-for-google-ads) — Scripts essentiels
- [AI Google Ads Bidding: PMax Automation 2026 (DigitalApplied)](https://www.digitalapplied.com/blog/ai-google-ads-bidding-automation-pmax-2026) — PMax automation
