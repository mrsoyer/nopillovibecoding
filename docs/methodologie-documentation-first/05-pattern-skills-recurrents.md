# 05 — Pattern : Skills agency type a creer

> Catalogue des skills Nopillo recurrents a capitaliser. Chaque skill est appelable en 1 mot et beneficie a toute l'equipe.

## Principe

> "Si vous avez ecrit les memes instructions a Claude deux fois, c'aurait du etre un skill la premiere fois."

Cette doc liste les **skills agency type** que Nopillo doit creer en priorite, classes par valeur business.

## Categorisation des skills

| Categorie | Skills | Beneficiaires |
|-----------|--------|---------------|
| **Production landings** | 4 skills | Toute l'equipe |
| **Tracking & integrations** | 3 skills | Toute l'equipe |
| **Recherche & audit** | 3 skills | Toi + senior |
| **Design system** | 2 skills | Designers + dev |
| **Suivi & ops** | 2 skills | Equipe ops |

## Skills "Production landings"

### S1 — `/landing-google-ads` ⭐⭐⭐

Genere une landing optimisee Google Ads (DKI, Quality Score 8+, conversion).

```yaml
inputs:
  - brief : descriptif client
  - keyword principal : pour DKI
  - cible_persona
  - cta_principal
outputs:
  - Page Webflow optimisee QS
  - Setup conversion GA4 + Google Ads
  - Documentation reproduce
```

**ROI** : 4-6h gagnees par landing. ~10 landings/an = 40-60h/an.

### S2 — `/landing-meta-ads` ⭐⭐⭐

Genere une landing optimisee Meta Ads (vertical, lead form natif).

Differences vs Google Ads : ratio mobile, lead forms natifs, Meta CAPI.

**ROI** : 4-6h/landing. ~8 landings/an = 30-50h/an.

### S3 — `/landing-recrutement` ⭐⭐

Genere une landing recrutement (mandataires immo, freelances, etc).

Patterns specifiques : hero "rejoignez-nous", stat sociale, form candidature, FAQ.

**ROI** : 5h/landing. ~5 landings/an = 25h/an.

### S4 — `/clone-landing-variant` ⭐⭐

Clone une landing existante avec variations pour A/B test.

```yaml
inputs:
  - landing source URL
  - dimensions a varier : hero, CTA, social proof
outputs:
  - 3 variantes Webflow + setup A/B test
```

**ROI** : 2-3h/A/B test. ~8 tests/an = 15-25h/an.

## Skills "Tracking & integrations"

### S5 — `/connect-hubspot-form` ⭐⭐⭐

Embed form HubSpot dans Webflow + tracking GA4 + Meta + lifecycle.

```yaml
inputs:
  - portalId
  - formId
  - pageId Webflow
  - mapping champs
outputs:
  - Form embed fonctionnel
  - Events GA4 + Meta CAPI
  - Lifecycle HubSpot configure
```

**ROI** : 30 min vs 2h manuel. Equipe entiere.

### S6 — `/setup-tracking` ⭐⭐⭐

Setup complet GA4 + GTM + Meta Pixel + Meta CAPI + Google Ads conversion + Consent V2.

```yaml
inputs:
  - propertyId GA4
  - containerId GTM
  - pixelId Meta
  - capi_token
  - cookieConsent provider
outputs:
  - Snippets pour Webflow head/body
  - Datalayer events configures
  - Consent V2 wired
```

**ROI** : 2h vs 1 journee. Onboarding new dev x10 plus rapide.

### S7 — `/lifecycle-hubspot` ⭐⭐

Configure lifecycle HubSpot (lead -> MQL -> SQL -> client) + workflows email.

```yaml
inputs:
  - parcours commercial cible
  - templates email existants
outputs:
  - Lifecycle stages crees
  - Workflows actives
  - Lists segmentees
```

**ROI** : 1h vs 4h. Equipe ops.

## Skills "Recherche & audit"

### S8 — `/scout-concurrents` ⭐⭐⭐

Lance le pattern 5 doc-maker en parallele pour scout concurrents (cf. `03-pattern-scout-concurrents.md`).

```yaml
inputs:
  - client + vertical
  - liste 5 concurrents OU detection auto
outputs:
  - docs/concurrents-[client]/ avec 5 fiches + synthese
```

**ROI** : 30 min vs 10h. Toi + senior.

### S9 — `/audit-landing` ⭐⭐

Audit complet d'une landing existante : perf, accessibilite, tracking, design, conversion.

```yaml
inputs:
  - URL landing
outputs:
  - docs/audit-[url]/audit.md avec score /100
  - Recommandations priorisees
```

**ROI** : 30 min vs 2h. A chaque prospect / refonte.

### S10 — `/extract-design-system` ⭐⭐

Aspire le DS d'un site reference (cf. `04-pattern-aspirer-design-system.md`).

```yaml
inputs:
  - URL reference
outputs:
  - docs/ds-[ref]/ avec tokens CSS + composants
```

**ROI** : 30 min vs 1 jour. Designers + dev.

## Skills "Design system"

### S11 — `/apply-nopillo-ds` ⭐⭐⭐

Applique le DS Nopillo a une nouvelle page Webflow (couleurs, typo, composants).

```yaml
inputs:
  - pageId Webflow
  - mode : page nouvelle | page existante a refactor
outputs:
  - Page conforme DS Nopillo
  - Liste composants utilises
```

**ROI** : 1h vs 4h. Toute l'equipe sur tout projet.

### S12 — `/reproduce-component` ⭐⭐

Reproduit un composant specifique a partir d'un DS aspire ou Figma.

```yaml
inputs:
  - source : URL screenshot OU figmaUrl
  - composant cible : button | card | form | hero | nav
outputs:
  - Composant Webflow + variants
```

**ROI** : 30 min vs 2h par composant.

## Skills "Suivi & ops"

### S13 — `/cdc-landing` ⭐⭐⭐

Genere automatiquement un CDC landing (decoupage, waves, executeurs).

```yaml
inputs:
  - brief client (descriptif libre)
  - budget cible
  - existant a reutiliser
outputs:
  - docs/[client]/CDC-*.md complet
  - Estimation effort par tache
  - Waves de paralelisation
```

**ROI** : 1h vs 1/2 journee. Tout chef de projet.

### S14 — `/report-landing` ⭐⭐

Genere un rapport mensuel d'1 landing (perf, conversion, ads, recos).

```yaml
inputs:
  - landing URL
  - periode (1 mois)
  - acces analytics + ads
outputs:
  - PDF rapport client
  - Recos prioritaires
```

**ROI** : 1h vs 4h. Equipe ops, mensuel.

## Priorisation creation

### Sprint 1 (premiere quinzaine)

Les 5 skills a plus haut ROI immediat :

| # | Skill | Pourquoi en sprint 1 |
|---|-------|----------------------|
| 1 | `/setup-tracking` | Utilise sur 100% des projets |
| 2 | `/connect-hubspot-form` | Utilise sur 80% |
| 3 | `/scout-concurrents` | Utilise sur 100% des nouveaux clients |
| 4 | `/landing-google-ads` | Skill core Nopillo |
| 5 | `/cdc-landing` | Standardise tous les CDC |

### Sprint 2 (deuxieme quinzaine)

| # | Skill |
|---|-------|
| 6 | `/landing-meta-ads` |
| 7 | `/audit-landing` |
| 8 | `/apply-nopillo-ds` |
| 9 | `/extract-design-system` |
| 10 | `/landing-recrutement` |

### Sprint 3 (mois 2)

Les 4 skills restants en fonction des besoins reels remontes.

## Process de creation d'un skill

Pour chaque skill :

```
1. /skill-maker [nom] [brief]
2. Tester sur 2 cas reels
3. Iterer prompt SKILL.md
4. Documenter dans docs/skills/[nom].md
5. Commit + push
6. Annoncer en stand-up Nopillo
7. Suivre adoption (qui l'utilise, retours)
```

## Mesure adoption skills

Tableau de bord trimestriel :

| Skill | Crees | Utilises J0-90 | ROI cumule | Top user |
|-------|-------|----------------|-----------|----------|
| /setup-tracking | 2026-01-15 | 23 fois | ~46h gagnees | T |
| /connect-hubspot-form | 2026-01-20 | 18 fois | ~27h gagnees | M |
| ... | | | | |

Skill non utilise > 90 jours -> archiver ou re-prompter.

## Sources

- `docs/formation-nopillo/03-methodologie-formateur.md` — liste initiale skills
- `docs/cdc-claude-code-audit/03-best-practices.md` — BP-4.6 Skills
- `docs/cdc-claude-code-audit/04-architecture.md` — Pilier 2 Skills
