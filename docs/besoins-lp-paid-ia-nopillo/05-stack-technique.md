# 05 — Stack technique et architecture

## Vue d'ensemble

Décisions stack pour la démo + recommandations pour l'industrialisation. Trois axes : plateforme d'hébergement, mode de génération (batch vs runtime), couche d'orchestration IA.

## Table des matières

- [Choix de plateforme d'hébergement](#choix-de-plateforme-dhébergement)
- [Modes de génération](#modes-de-génération)
- [Architecture recommandée démo](#architecture-recommandée-démo)
- [Architecture cible industrialisation](#architecture-cible-industrialisation)
- [Stack IA](#stack-ia)
- [Limites techniques connues](#limites-techniques-connues)

## Choix de plateforme d'hébergement

### Option A : Webflow (recommandé)

**Pour** :
- MCP Webflow déjà disponible dans le projet
- CMS Collections permettent stocker 1 page = 1 entry
- API CMS permet création de 8 items/seconde (jusqu'à 4 800 pages en 10 min)
- Pas de code à déployer (no-code/low-code)
- Hosting + CDN inclus, SSL auto
- Équipes marketing peuvent itérer sans dev

**Contre** :
- Limite items CMS (variable selon plan) — à vérifier sur le plan Nopillo
- Personnalisation runtime limitée (DKI client-side seulement)
- Pas idéal pour > 10 000 pages
- Tests dynamiques (A/B) limités natifs

**Cas d'usage idéal** : 100 à 10 000 LP, équipes marketing autonomes, paid only.

### Option B : Next.js + Vercel/Netlify

**Pour** :
- Génération SSR/ISR au runtime (1 URL = 1 page personnalisée live)
- Variables ValueTrack + Search Term lus côté serveur
- Pas de limite de pages
- A/B testing natif via Vercel
- Edge runtime = <100ms TTFB mondial

**Contre** :
- Effort dev plus important
- Pas de CMS visuel pour les marketers
- Plus complexe pour itérer

**Cas d'usage idéal** : > 10 000 pages, personnalisation runtime poussée, équipe tech dispo.

### Option C : Hybride (Webflow + serverless)

- Webflow pour le template / structure
- Edge function (Vercel/Netlify/Cloudflare) pour personnalisation runtime via injection JS
- Trustpilot widget côté client

## Modes de génération

### Mode 1 : Pré-génération batch

**Principe** :
1. Liste de KW exporté de Google Ads
2. Script Node/Python tourne, appelle l'IA pour chaque KW
3. Création des items dans Webflow CMS via API
4. Pages publiées et indexées dans le routing Webflow

**Avantages** :
- LCP < 1s (page statique pré-rendue)
- Quality Score maximisé (Google crawle directement le contenu)
- Coût IA prédictible (1 appel/page × tarif tokens)
- Possibilité de QA humaine avant publication

**Inconvénients** :
- Pas de variation Search Term (juste KW configuré)
- Re-générer si KW évolue
- Volume CMS limité

**Recommandé pour démo** ✅

### Mode 2 : Runtime (au clic)

**Principe** :
1. URL générique : `nopillo.fr/lp?kw={keyword}&st={searchterm}`
2. Edge function lit les params, appelle l'IA, retourne HTML personnalisé
3. Cache CDN selon `kw+st` combo

**Avantages** :
- Variation maximale (Search Term différent à chaque clic)
- Pas de pré-création
- Couvre tous les Broad Match

**Inconvénients** :
- LCP risqué (appel IA = 500ms-3s)
- Coût IA × clics = plus volatile
- Risque erreur runtime visible utilisateur
- Quality Score : Google ne crawle pas avec params custom → contenu indexable = template générique

**Pas recommandé pour démo** (trop risqué LCP)

### Mode 3 : Hybride (page pré-générée + bloc dynamique runtime)

**Principe** :
1. Page CMS pré-générée par KW (Mode 1)
2. Bloc spécifique (ex : H1, glossaire) personnalisé en runtime via JS selon `{searchterm}`
3. Fallback statique si JS désactivé ou API down

**Avantages** :
- Best of both worlds
- LCP préservé (contenu base servi statique)
- Personnalisation Search Term possible
- Quality Score maximisé (Google lit la version statique)

**Inconvénients** :
- Complexité technique +
- Risque divergence client/serveur

**Recommandé pour industrialisation** ✅

## Architecture recommandée démo

```
[Google Ads] ──UTM+ValueTrack──> [Webflow LP statique pré-générée]
                                          │
                                          ├── Trustpilot Widget (client-side)
                                          ├── HubSpot Form embed
                                          ├── GA4 + Google Ads gtag
                                          └── Server-side tracking optionnel
```

### Pipeline de génération démo

```
1. Export KW depuis Google Ads (CSV ou via Ads API)
2. Script Node.js :
   a. Pour chaque KW :
      - Appel OpenAI/Claude → JSON copy (H1, sous-titre, FAQ, glossaire)
      - Validation schéma + règles métier (no superlatifs)
      - Création item Webflow CMS via API
   b. Logs + alertes si erreur
3. Webflow publie automatiquement les pages
4. URLs au format : nopillo.fr/lp/{slug-kw}
```

### Stack démo recommandée

| Composant | Choix | Justification |
|-----------|-------|---------------|
| Hébergement | Webflow | MCP disponible, no-code, CDN OK |
| Génération | Script Node.js batch | Maîtrise + tests faciles |
| IA | Claude Opus 4.7 (1M context) ou GPT-4o | Précision + JSON mode |
| Stockage | Webflow CMS Collections | Native |
| Formulaire | HubSpot embed | Direct CRM |
| Avis | Trustpilot TrustBox widget | Le plus rapide |
| Tracking | GA4 + GAds gtag + GTM | Standard |

## Architecture cible industrialisation

```
[Google Ads API] 
       │
       ▼
[Pipeline KW]──> [Orchestrator (n8n / Temporal)]
                          │
                          ├── [LLM Generator] (Claude/GPT)
                          ├── [Validator] (rules + LLM judge)
                          ├── [QA Queue] (human review si flag)
                          │
                          ▼
[Webflow CMS API]──> [LP publiées]
                          │
                          ▼
[Edge function]──> [Personnalisation runtime Search Term]
                          │
                          ▼
[Visitor]
       │
       ▼
[HubSpot] + [GA4 server-side] + [Google Ads conversion API]
```

## Stack IA

### Modèle recommandé

- **Claude Opus 4.7** (1M context) : précision + JSON output garanti + meilleur français
- **GPT-4o** : alternative, plus rapide, moins cher
- **Claude Haiku 4.5** : pour génération bulk si coût critique (qualité moindre)

### Pattern d'appel

- **JSON mode** activé pour garantir parsing
- **Schéma de sortie** strict (Zod ou Pydantic côté script)
- **Validation post-génération** : rules engine (Joi/Yup) + LLM-as-judge
- **Cache** : si même KW + même prompt → réutiliser

### Coût estimé démo

- 1 LP = ~3-5K tokens input (prompt) + 1-2K tokens output
- Coût Claude Opus : ~0,15€ par LP
- Démo 10 LP : ~1,50€
- Industrialisation 1000 LP/mois : ~150€/mois

## Limites techniques connues

### Webflow CMS

- Limite items par Collection (plan dépendant) : vérifier
- Limite API : 60 req/min en lecture, 60 req/min en écriture
- Publication delay : ~30s par batch
- Pas de personnalisation server-side native (besoin custom code injection)

### Google Ads

- ValueTrack `{searchterm}` disponible uniquement avec Broad Match
- Custom URL params sont consultables dans Google Analytics mais pas modifiables runtime depuis l'annonce

### IA

- Hallucinations possibles sur chiffres fiscaux → validation humaine obligatoire
- Latence ~3-10s pour génération complète d'une page → batch recommandé

## Sources

- [Webflow CMS API documentation](https://help.webflow.com/hc/en-us/articles/33961356296723-Intro-to-Webflow-s-APIs) — Capacités CMS
- [Webflow programmatic SEO 300 pages/week](https://webflow.com/blog/programmatic-seo) — Bench performance
- [Gosaddle — Programmatic SEO Webflow 2025](https://www.gosaddle.com/articles/implementing-programmatic-seo-with-webflow-cms-a-step-by-step-guide) — Patterns CMS
- [Apexure — Dynamic LP Builder Tools 2026](https://www.apexure.com/blog/how-to-create-dynamic-landing-pages/) — Comparatif solutions
