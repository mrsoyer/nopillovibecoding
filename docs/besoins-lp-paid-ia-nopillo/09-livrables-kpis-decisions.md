# 09 — Livrables, KPIs et décisions à trancher

## Vue d'ensemble

Synthèse opérationnelle : ce qu'on doit livrer pour la démo, comment on mesure le succès, et les choix qui restent à acter avant de lancer la production.

## Table des matières

- [Livrables démo](#livrables-démo)
- [Critères d'acceptance](#critères-dacceptance)
- [KPIs de validation](#kpis-de-validation)
- [Décisions à trancher avant de lancer](#décisions-à-trancher-avant-de-lancer)
- [Risques et mitigations](#risques-et-mitigations)
- [Roadmap d'industrialisation](#roadmap-dindustrialisation)

## Livrables démo

### Livrable 1 : LP démo publiée

- **1 LP publiée** sur Webflow, accessible via URL démo
- **Pattern URL** : `nopillo.fr/lp/{campagne}/{kw-slug}`
- **Pages publiques** : 1 KW principal + 2 variantes de comparaison
- **Design** : DS Nopillo appliqué (utiliser skill `apply-nopillo-ds` ou DS existant)
- **Mobile-first** validé

### Livrable 2 : Formulaire connecté à HubSpot

- HubSpot form embed ou Webflow form + sync
- Champs custom créés (utm_*, gclid, search_term, etc.)
- Test 5 leads envoyés, reçus correctement avec UTM intacts
- Notification équipe commerciale active

### Livrable 3 : Tracking validé

- GA4 events fire (page_view, form_submit, simulator_*)
- Google Ads conversion linker actif
- Conversion `form_submit` reportée
- Consent Mode v2 implémenté
- Test avec Tag Assistant Companion

### Livrable 4 : Script de génération

- Script Node.js (ou équivalent) qui prend un KW en input
- Appel IA + validation + création item Webflow CMS
- Logs des erreurs
- Documentation usage

### Livrable 5 : Preuve de variabilité

- 2-3 LP générées sur 2-3 KW différents
- Variations visibles : H1, FAQ, glossaire, bloc dynamique
- Screenshot avant/après pour démo client

### Livrable 6 : Documentation

- Ce dossier (`docs/besoins-lp-paid-ia-nopillo/`)
- README technique d'usage du script
- Liste des variables et fallbacks
- Plan d'industrialisation

### Livrable 7 : Démo live

- Présentation de 20 min :
  - Vision : pourquoi 1 LP par KW
  - Démo : URL pilote + variantes
  - Tracking : montrer un lead HubSpot avec UTM
  - Architecture : schéma du pipeline
  - Coûts : estimation production

## Critères d'acceptance

### Fonctionnel

- ✅ 3 LP générées et publiées sur 3 KW différents
- ✅ Variation visible du H1, bloc dynamique, FAQ, glossaire selon KW
- ✅ Formulaire fonctionnel, lead reçu dans HubSpot
- ✅ Conversion remontée dans Google Ads (test gclid)
- ✅ Trustpilot widget affiché et fonctionnel

### Performance

- ✅ LCP mobile < 2s sur les 3 LP
- ✅ CLS < 0.1
- ✅ PageSpeed Insights mobile > 85

### Qualité

- ✅ Aucune hallucination fiscale (chiffres, taux, dates)
- ✅ Copywriting validé par Nopillo (review humaine)
- ✅ Conformité RGPD (Consent Mode + mentions)
- ✅ Mentions expert-comptable présentes (ordre, n° inscription)

### Tracking

- ✅ Tous les UTMs capturés dans HubSpot
- ✅ GA4 events visibles dans temps réel
- ✅ Google Ads conversion confirmée

## KPIs de validation

### KPIs démo (court terme, post-publication)

| KPI | Mesure | Cible démo |
|-----|--------|------------|
| LP publiées | Compte | 3 |
| Variations détectables | Diff manuel | > 80% du contenu |
| Lead test HubSpot | Compte | 5 |
| UTM capturés | % leads | 100% |
| Temps génération 1 LP | secondes | < 60s |
| Coût IA par LP | EUR | < 0.20€ |
| LCP mobile | secondes | < 2s |

### KPIs business (4 à 8 semaines après mise en prod)

| KPI | Avant baseline | Cible |
|-----|---------------|-------|
| Quality Score KW pilote | 5-7/10 | 9-10/10 |
| CPC KW pilote | Référence | -20% à -30% |
| CTR annonce KW pilote | Référence | +10% |
| Taux conversion LP | Référence | +30% à +60% |
| Coût par lead | Référence | -25% |
| Taux SQL/lead | À mesurer | Stable ou + |

### KPI nord-étoile

**Coût par lead qualifié (CPL SQL)** = baisse de 25% à iso-volume.

## Décisions à trancher avant de lancer

### Décisions techniques

| # | Décision | Options | Recommandation |
|---|----------|---------|----------------|
| 1 | Plateforme | Webflow / Next.js / Hybride | **Webflow** pour démo |
| 2 | Mode génération | Batch / Runtime / Hybride | **Batch** pour démo |
| 3 | Modèle IA | Claude / GPT / Llama | **Claude Opus 4.7** (précision FR) |
| 4 | Simulateur | Fonctionnel / Mocké | **Mocké** pour démo |
| 5 | Trustpilot | Widget / API / Statique | **Widget** pour démo |
| 6 | Server-side tracking | Oui / Non | **Non** pour démo (optionnel) |
| 7 | Multilingue | FR / FR+EN / FR+EN+ES | **FR** pour démo |

### Décisions business

| # | Décision | Question | À acter avec |
|---|----------|----------|--------------|
| 1 | KW pilote | Lequel choisir ? | Nopillo + équipe SEA |
| 2 | Budget IA | Plafond mensuel ? | Nopillo finance |
| 3 | Review humaine | Qui valide les variantes ? | Nopillo content/legal |
| 4 | Métrique succès | Baisse CPC ou baisse CPL ? | Nopillo marketing |
| 5 | Industrialisation | Quand passer en prod ? | Roadmap Q3/Q4 |
| 6 | Maintenance | Qui itère le copy ? | Équipe content Nopillo |

### Décisions design

| # | Décision | Question |
|---|----------|----------|
| 1 | DS Nopillo | Accessible ? Versions ? |
| 2 | Composants partagés | Header / Footer / CTA réutilisés ? |
| 3 | Photos / illustrations | Banque dispo ou shoot ? |
| 4 | Vidéo hero | Pertinent pour la démo ? |

### Décisions compliance

| # | Décision | Question |
|---|----------|----------|
| 1 | Mentions expert-comptable | Quelles obligatoires ? |
| 2 | Termes interdits | Liste validée par legal ? |
| 3 | Validation IA | Quel niveau d'autonomie ? |
| 4 | Avis Trustpilot | Filtrage négatifs interdit |

## Risques et mitigations

| Risque | Impact | Probabilité | Mitigation |
|--------|--------|-------------|------------|
| Hallucination fiscale IA | 🔴 Haut | Moyen | Review humaine systématique + rules engine |
| LCP > 2s sur Webflow | 🟡 Moyen | Moyen | Optimisation images + critical CSS + audit régulier |
| Webflow CMS limit atteint | 🟡 Moyen | Faible (démo) | Migration vers plan Pro/Enterprise |
| Trustpilot API rate limit | 🟡 Moyen | Faible | Cache 24h + fallback statique |
| Google Ads suspension (DKI mal utilisé) | 🔴 Haut | Faible | Pas de DKI dans annonces, juste LP |
| Lead non remonté Google Ads | 🟡 Moyen | Moyen | Enhanced Conversions + import offline |
| Non conformité RGPD | 🔴 Haut | Faible | Consent Mode v2 + audit avant publication |
| Coût IA explose | 🟡 Moyen | Moyen | Plafond mensuel + cache + Haiku pour bulk |

## Roadmap d'industrialisation

### Phase 1 — Démo (semaines 1-3)

- Setup Webflow Collection + template
- Script de génération MVP
- 3 LP publiées
- Validation tracking
- Démo à Nopillo

### Phase 2 — Pilote (mois 1-2)

- 50-100 LP en production
- 1 KW pilote en live (campagne dédiée)
- Monitoring quotidien QS / CPC / CR
- Itération copy/design selon data

### Phase 3 — Scale (mois 3-4)

- 500-1000 LP
- Couverture Search Exacte + Broad
- Personnalisation Search Term runtime
- Multilingue FR + EN expat

### Phase 4 — Optimisation (mois 5+)

- A/B testing systématique
- LLM-as-judge pour validation auto
- Server-side tracking complet
- Offline Conversion Import HubSpot ⇄ Google Ads
- ML model interne pour scoring qualité LP

## Next steps immédiats

1. **Acter le KW pilote** (recommandation : `expert comptable LMNP`)
2. **Valider la stack** : Webflow + script Node.js + Claude API
3. **Récupérer les accès** : Webflow site token, HubSpot portal, Google Ads admin, Trustpilot Business
4. **Setup DS Nopillo** sur le projet Webflow démo
5. **Coder le script MVP** (1-2 jours)
6. **Valider 3 LP** avant publication (review legal + content)
7. **Lancer la démo** + capture baseline metrics

## Sources

- Notion Nopillo — "USECASE LP PAID auto via l'IA"
- [Get-Ryze — Optimize Landing Pages for Ads with AI 2026](https://www.get-ryze.ai/blog/optimize-landing-pages-for-ads-with-ai) — Bench AI LP +37% CR
- [Foundry CRO — Quality Score 2026](https://foundrycro.com/blog/google-ads-landing-page-best-practices-2026/) — AI Max +14% conversions
