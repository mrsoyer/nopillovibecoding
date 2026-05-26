# Specifications — Amelioration Landing

## Vue d'ensemble structurelle

Ordre canonique des sections cible (top → bottom) :

```
[1] Navbar LP                    (deja present, OK)
[2] HERO custom                  (A CREER — section critique manquante)
[3] Form capture (anchor #rdv)   (A CREER — bloc primary form)
[4] Section Presse               (deja present, OK)
[5] Stats Bar                    (A CREER — 98% satisfaction + chiffres)
[6] Section Avantages            (deja present, props a remplir)
[7] Section Parcours             (deja present, props a remplir)
[8] Testimonials                 (A CREER — 3 cards minimum)
[9] Section Offres               (deja present, fixer CTA URLs)
[10] FAQ                         (A CREER — accordion 6-8 questions)
[11] Section Calendly            (deja present, props a remplir)
[12] Footer                      (deja present, OK)
```

## P0 — Fondations (bloquant conversion)

### 1.1 Hero section custom

**Pourquoi** : aucun Hero — bounce rate eleve, le visiteur ne comprend pas l'offre dans les 3 secondes (regle 2026 : story-driven hero).

**Specs** :
- Background : full-width avec gradient ou image immobilier
- H1 unique, < 8 mots, < 44 caracteres : `Afterwork Immobilier We Invest`
- Sous-titre : `Echangeons sur l'avenir du metier d'agent et mandataire`
- Date + lieu visibles (FOMO temporel — pattern gagnant identifie sur cannes)
- CTA primaire : `Je participe` -> ancre `#rdv` (form)
- CTA secondaire : `Voir le programme` -> ancre `#parcours`
- Image hero : photo equipe ou visuel cohesion
- Constraint : H1 unique sur la page (SEO)

**Hierarchie HTML cible** :
```
<section class="hero">
  <h1>Afterwork Immobilier We Invest</h1>
  <p class="hero-sub">Echangeons sur l'avenir du metier...</p>
  <div class="hero-meta">12 juin 2026 · Paris</div>
  <a href="#rdv" class="btn-primary">Je participe</a>
  <a href="#parcours" class="btn-secondary">Voir le programme</a>
</section>
```

### 1.2 Formulaire de capture lead (#rdv)

**Pourquoi** : seul levier de conversion. Form < 5 champs converti +120% (benchmark 2026).

**Champs (5 max)** :
1. Prenom* (text)
2. Nom* (text)
3. Email* (email)
4. Telephone* (tel)
5. Code postal* (text, pattern `\d{5}`)

**Plus** :
- Checkbox RGPD obligatoire avec lien politique de confidentialite
- Bouton submit : `Je m'inscris`
- Promesse delai : `Notre equipe vous contacte sous 48h ouvrees`
- Message succes : `Merci ! Notre equipe revient vers vous rapidement.`
- Message erreur : `Oups ! Une erreur s'est produite.`
- Redirect post-submit : `/afterwork-test-mcp/remerciement-form` (a creer)

**Tracking** :
- Event GA4 `generate_lead` au submit
- Event Meta Pixel `Lead`
- Event LinkedIn Insight `conversion`

### 1.3 CTAs URLs reelles

**Pourquoi** : tous les CTAs pointent `#` -> conversion bloquee.

**Mapping a appliquer** :

| CTA actuel | Cible |
|---|---|
| `J'en profite` (Avantages) | `#rdv` |
| `Je demarre l'aventure` (Parcours) | `#rdv` |
| `Je veux en savoir plus` x4 (Offres) | URL pages produit We Invest existantes |
| Newsletter footer | conserve, fonctionnel |

### 1.4 Body display fix global

**Pourquoi** : bug detecte — body cache par defaut sur pages creees via API.

**Solution** : creer style `Body Landing` avec `display: block`, l'appliquer automatiquement aux nouvelles pages MCP.

### 1.5 Page de remerciement form

**Pourquoi** : pattern existant sur 100% des landings du site (sous-folder `/remerciement-form`).

**Specs** : reutiliser le composant `Section Remerciement` deja present dans le DS. Slug `/afterwork-test-mcp/remerciement-form`. Meta title `Merci - Afterwork We Invest`. noindex via robots.

## P1 — Confiance

### 2.1 Stats Bar (sous Hero)

**Specs** : 4 chiffres cles en bandeau horizontal :
- `98% de conseillers satisfaits`
- `100+ agences en France`
- `15 ans d'experience`
- `Top 5 reseaux 2026`

Animation count-up au scroll (CLS-safe : reserver l'espace).

### 2.2 Section Testimonials

**Specs** : 3 cards minimum avec :
- Photo agent (real face)
- Nom + ville + role
- Citation 2-3 phrases
- Etoiles 5/5

Pattern : `<article itemscope itemtype="https://schema.org/Review">` pour SEO.

### 2.3 Section FAQ accordion

**Questions cibles** (6-8) :
1. Combien coute l'integration ?
2. Combien de temps prend la transition ?
3. Quels outils me sont fournis ?
4. Puis-je conserver mon portefeuille ?
5. Quel accompagnement pendant l'integration ?
6. Est-ce que je peux participer si je suis salarie ?
7. Comment se deroule l'Afterwork ?
8. Puis-je venir avec un collegue ?

**Specs technique** : details/summary HTML natif (accessible) + schema.org `FAQPage` JSON-LD pour rich results Google.

### 2.4 Schema.org JSON-LD

**Types** :
- `Event` (Afterwork = evenement)
- `Organization` (We Invest)
- `FAQPage`
- `LocalBusiness`

**Implementation** : custom code dans `<head>` via Webflow site settings.

### 2.5 Logos medias (Section Presse — props)

Le composant existe mais sans contenu actuellement. Lister 4-6 logos medias verifies (Le Figaro Immobilier, BFM, Capital, etc.) — assets a creer dans le bucket Webflow.

## P2 — Performance & Accessibilite

### 3.1 Hero image LCP

**Cible LCP < 2.5s** :
- Format AVIF + WebP fallback
- `fetchpriority="high"` + `<link rel="preload">` dans head
- Dimensions explicites pour eviter CLS
- Resolution adaptive (srcset 480/768/1280/1920)

### 3.2 Lazy load images sub-fold

Toutes les images sous le fold avec `loading="lazy"` + `decoding="async"`.

### 3.3 Layout shift (CLS < 0.1)

- Reserver l'espace pour images, iframes (Calendly), animations count-up
- Eviter les insertions JS post-render

### 3.4 INP < 200ms

- Verifier les interactions Webflow lourdes (animations sur scroll)
- Differer les scripts non-critiques (`defer`, `async`)
- Eviter les long tasks JS au chargement

### 3.5 Accessibilite WCAG AA

| Critere | Action |
|---|---|
| 1.1.1 Non-text Content | `alt` descriptif sur toutes images informatives |
| 1.3.1 Info and Relationships | hierarchie h1>h2>h3 stricte |
| 1.4.3 Contrast Minimum | ratio >= 4.5:1 sur tous textes (verifier theme bleu) |
| 2.1.1 Keyboard | tous CTAs/form focus-visible |
| 2.4.4 Link Purpose | aria-label sur liens icones |
| 3.3.2 Labels | label visible sur tous champs form |
| 4.1.2 Name, Role, Value | aria-labels sur custom widgets (accordion FAQ) |

## P3 — Mesure & Optimisation

### 4.1 Tracking analytics

**Stack a deployer** :
- Google Analytics 4 (GTM ou direct)
- Meta Pixel (Facebook/Instagram ads)
- LinkedIn Insight Tag
- Microsoft Clarity (heatmaps gratuit)

**Events critiques** :
- `page_view` (auto)
- `scroll` 25/50/75/100%
- `cta_click` (variant + position)
- `form_start` (focus 1er champ)
- `form_submit` (succes)
- `form_error` (erreur)
- `calendly_booked` (postMessage event)

### 4.2 A/B test infrastructure

**Setup** :
- Webflow custom code injection
- Tool : VWO ou GrowthBook (open-source) ou Webflow native
- Tests prioritaires :
  - T1 : Hero headline (`Afterwork Immobilier` vs `Rejoignez le top 5`)
  - T2 : CTA primaire (`Je participe` vs `Reserver ma place`)
  - T3 : Form longueur (5 champs vs 3 champs)

### 4.3 Heatmaps + session replay

Microsoft Clarity gratuit illimite. Identifier rage clicks, dead clicks, scroll depth.

### 4.4 Tableau de bord KPI

Looker Studio connecte sur GA4 — dashboard temps reel : sessions, conversion rate, source, device.

## P4 — Production

### 5.1 QA cross-browser

Playwright (via `sym-test-web`) sur Chrome, Firefox, Safari, mobile Chrome.

### 5.2 QA mobile

Tests sur viewports 320px, 375px, 414px, 768px, 1024px, 1440px, 1920px.

### 5.3 Redirects 301

Verifier qu'aucune ancienne URL n'est cassee. Voir `/etc/redirects` Webflow Enterprise (ou custom code).

### 5.4 Publication

Sequence :
1. Publish staging (`webflow.io`) — validation finale
2. Publish prod (`lp.weinvest.fr/afterwork-test-mcp`)
3. Soumettre sitemap a Google Search Console
4. Verifier indexation J+3
