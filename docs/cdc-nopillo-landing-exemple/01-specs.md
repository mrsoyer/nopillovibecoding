# 01 — Specs fonctionnelles et techniques

## Table des matières

- [Périmètre](#périmètre)
- [Sections de la landing page](#sections-de-la-landing-page)
- [DKI — Contenu dynamique par KW](#dki--contenu-dynamique-par-kw)
- [Design System Nopillo](#design-system-nopillo)
- [Formulaire et HubSpot](#formulaire-et-hubspot)
- [Tracking](#tracking)
- [Performance et SEO](#performance-et-seo)
- [Décisions techniques](#décisions-techniques)

---

## Périmètre

**Projet** : `nopillo-landing-exemple`
**Type** : Lead-gen (Google Ads) — landing page statique avec DKI client-side
**Keyword pilote** : `expert comptable LMNP`
**URL cible** : `https://[netlify-slug].netlify.app/` (custom domain Netlify après validation)

**Ce que c'est** :
- 1 landing page Astro 6 avec 9 sections
- Contenu adapté au KW via lecture des URL params au runtime (DKI)
- Formulaire connecté à HubSpot via Supabase Edge Function
- Tracking GA4 + Google Ads via GTM
- Charte graphique inspirée du DS Nopillo

**Ce que ce n'est PAS** :
- ❌ Backend de génération IA (ce sera industrialisé plus tard)
- ❌ Multi-pages (1 seule page pour la démo)
- ❌ Référencement SEO (noindex, paid only)
- ❌ Admin panel Webflow CMS (pas Webflow ici, on est sur Astro)

---

## Sections de la landing page

9 sections dans l'ordre :

### S1 — Hero (above the fold)

**Contenu** :
- H1 dynamique : `"Votre expert-comptable LMNP en ligne"` (fallback statique, remplacé par DKI)
- Sous-titre bénéfice chiffré : `"Économisez en moyenne 4 800€ d'impôts/an"`
- CTA primaire pill : `"Simuler mon économie"` → scroll vers formulaire
- CTA secondaire ghost : `"Voir nos experts"` → scroll vers testimonials
- Bandeau réassurance : `"4.7/5 sur Trustpilot"` + `"24M€ économisés"` + `"Expert-comptable certifié"`
- Visuel droite : illustration isométrique Nopillo style (comptable + graphes)

**Règles** :
- LCP = image hero → WebP < 200KB, `fetchpriority="high"`, pas de lazy
- Au-dessus du fold mobile : H1 + sous-titre + CTA + 1 réassurance MAX
- Pas de carrousel, pas de vidéo autoplay

### S2 — Bandeau confiance (logos presse)

**Contenu** :
- Logos SVG inline : BFM Business, Capital, Les Échos (ou placeholders SVG neutres pour démo)
- Défilement horizontal subtil sur mobile, statique desktop
- Mention `"Ils parlent de nous"`

### S3 — Bloc problème / solution dynamique (DKI-aware)

**Contenu fallback** : `"Les 3 atouts du régime réel LMNP"`
**Contenu dynamique pour KW `expert comptable LMNP`** :
- Titre : `"Pourquoi confier votre LMNP à un expert ?"`
- 3 cartes translucides : Expertise fiscale / Conformité garantie / Accompagnement personnalisé
- Icônes isométriques style Nopillo

### S4 — Simulateur fiscal (formulaire interactif)

**Version démo** : Formulaire simplifié en 2 étapes (mockée, résultat scripté)
- Étape 1 : revenus locatifs annuels (slider) + régime actuel (radio)
- Étape 2 : affichage résultat estimé `"Vous pourriez économiser ~X€"`
- CTA final : `"Recevoir ma simulation détaillée"` → déclenche formulaire S8

**Tracking** :
- `simulator_start` au focus étape 1
- `simulator_complete` au résultat affiché

### S5 — Social proof (témoignages)

**Contenu** :
- 3 cards témoignage : photo + prénom + ville + régime + citation
- Données statiques pour démo (vraies personnes si autorisées, avatars neutres sinon)
- Star rating 5 étoiles
- Mention `"Avis vérifiés"`

### S6 — Avis Trustpilot

**Implémentation** : TrustBox widget officiel (iframe async)
- Note globale + 3 derniers avis
- Chargé en `loading="lazy"` pour ne pas impacter LCP

### S7 — Glossaire sémantique (Quality Score boost)

**Objectif** : enrichir le contenu sémantique lu par le crawler IA Google
**Contenu pour KW `expert comptable LMNP`** :
- 6 définitions : LMNP, Liasse fiscale 2031, Amortissement, Régime réel vs micro-BIC, Télétransmission, Déficit foncier
- Format accordéon expand/collapse (JS léger)
- Schema.org `DefinedTerm` sur chaque entrée

### S8 — Formulaire de contact (conversion principale)

**Champs visibles** (4 max) :
- Prénom (texte)
- Email (email, obligatoire)
- Téléphone (tel, France)
- Message / Situation locative (textarea courte, optionnel)

**Champs cachés** (auto-remplis depuis URL params) :
- `utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content`
- `gclid`, `search_term`, `match_type`, `device`
- `landing_page_url` (window.location.href)
- `keyword` (= utm_term)

**Anti-spam** : honeypot field masqué en CSS (pas de reCaptcha = friction)

**Submit** → Supabase Edge Function `contact-form` → insert `public.leads` + push HubSpot API

**Post-submit** :
1. Message confirmation inline (`"Merci ! Vous recevrez votre simulation sous 24h."`)
2. Fire gtag conversion (`lp_form_submit`)
3. Redirect optionnelle page merci (après 3s)

### S9 — FAQ

**Contenu pour KW `expert comptable LMNP`** :
- 6 questions :
  1. Combien coûte un expert-comptable LMNP ?
  2. Pourquoi ne pas faire soi-même sa liasse LMNP ?
  3. Quelle différence entre micro-BIC et régime réel ?
  4. Faut-il un expert dès le premier bien ?
  5. Nopillo peut-il gérer plusieurs biens LMNP ?
  6. En combien de temps est traitée ma liasse fiscale ?
- Format accordéon
- Schema.org `FAQPage` + `Question` + `Answer`

---

## DKI — Contenu dynamique par KW

**Mécanisme** : JavaScript côté client (Astro island) lit les URL params à l'hydratation.

**Paramètres lus** :
```
?utm_term=expert+comptable+LMNP&searchterm=expert+comptable+LMNP+Paris&matchtype=e&device=mobile&gclid=abc
```

**Variables injectées** :
| Variable | Source | Fallback |
|----------|--------|---------|
| `{keyword}` | `utm_term` | `expert comptable LMNP` |
| `{searchterm}` | `searchterm` | `{keyword}` |
| `{city}` | parsing `searchterm` | `` (vide) |
| `{device}` | `device` | `desktop` |

**Éléments dynamiques** :
- `<h1>` : remplacé si `{keyword}` présent
- Bloc S3 : sélectionné selon `{searchterm}` (map statique pour démo)
- Champs cachés formulaire : auto-remplis

**Implémentation** : composant React (`DKIProvider.tsx`) qui s'hydrate `client:load` et expose via Context.

---

## Design System Nopillo

Appliquer les tokens via Tailwind 4 `@theme` — inspiré Nopillo, pas copie.

### Couleurs

```css
/* tailwind.config : @theme extension */
--color-brand-black: #09090B;
--color-primary: #4033DB;
--color-primary-soft: #DEDAFF;
--color-secondary: #0CC28C;
--color-bg-default: #FFFFFF;
--color-bg-soft: #F5F5FF;  /* proche indigo-50 */
```

### Typographie

- Police principale : **Inter** (Google Fonts, fallback si Futura PT non disponible sans licence Adobe)
- Police display : Inter 700 → mimique géométrique de Futura PT
- Fallback si licence Adobe disponible : Futura PT 600-700

> Note : Futura PT est sous licence Adobe Fonts (Typekit). Pour un projet démo sans accès au compte Adobe Nopillo, utiliser **Inter** comme équivalent libre. Documenter le swap dans `front/src/styles/tokens.css`.

### Composants clés

| Composant | Spec |
|-----------|------|
| Bouton primaire | `bg-primary text-white rounded-full px-8 py-4 font-bold` (pill 999px) |
| Bouton ghost | `border-2 border-primary text-primary rounded-full px-8 py-4` |
| Card translucide | `bg-white/30 border border-primary-soft rounded-2xl shadow-sm` |
| Container | `max-w-[1120px] mx-auto px-6` |
| Shadow signature | `shadow-[0_1px_10px_rgba(0,0,0,0.06)]` |

### Sections alternées

- Section blanche : `bg-white`
- Section soft : `bg-primary-soft` (#DEDAFF)
- Section dark : `bg-brand-black text-white`

---

## Formulaire et HubSpot

### Architecture

```
ContactForm.tsx (React island)
    │ submit
    ▼
Supabase Edge Function: contact-form
    ├── INSERT public.leads (données complètes)
    └── POST HubSpot Contacts API (si HUBSPOT_API_KEY présent)
         └── Créer/mettre à jour contact avec propriétés custom UTM
```

### Supabase Edge Function étendue

L'Edge Function `contact-form` générée par `init-landing-stack` doit être étendue pour :
1. Insérer dans `public.leads` (déjà fait)
2. Appeler l'API HubSpot Contacts (`POST /crm/v3/objects/contacts`) avec les champs UTM

**Variables d'environnement Edge Function** (secrets Supabase) :
- `HUBSPOT_API_KEY` → token privé app HubSpot
- `HUBSPOT_PORTAL_ID` → ID portail

> Schéma table leads : voir [docs/stack-landing-claude-code/05-supabase-integration.md](../stack-landing-claude-code/05-supabase-integration.md). Ajouter colonnes : `phone text`, `message text` si non présentes.

---

> Tracking, performance et décisions techniques : voir [01b-tracking-perf.md](01b-tracking-perf.md)
