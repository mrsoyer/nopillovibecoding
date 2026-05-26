# Templates Front — Rules pour pages / composants / islands

> Templates a utiliser a l'etape 6 du workflow `rule-maker`. Substituer toutes les variables `{NomComponent}`, `{role}`, etc. avec les donnees extraites aux etapes 1-5.

## Table des Matieres
1. [Template page Astro](#template-page-astro)
2. [Template layout Astro](#template-layout-astro)
3. [Template composant Astro statique](#template-composant-astro-statique)
4. [Template island React](#template-island-react)

## Template Page Astro

Pour `front/src/pages/{slug}.astro`. Fichier rule : `.claude/rules/front/pages-{slug}.md`.

```yaml
---
paths:
  - "front/src/pages/{slug}.astro"
---

# Page {slug} ({role-court})

## Role
{1-3 phrases : pourquoi cette page existe, public cible, objectif business}

## Sections (ordre vertical)
{Lister les sections importees dans l'ordre du markup}
1. Hero (LCP element)
2. {Section 2}
3. {Section 3}
...

## SEO
- Title : {longueur 50-60 chars, mot-cle principal en premier}
- Meta description : {longueur 150-160 chars}
- Schema.org : {Organization | Product | Article | Event | FAQ ...}
- Canonical : {auto ou specifique}

## Performance
- Cible Lighthouse Performance >= {95 ou autre cible projet}
- LCP element : {composant identifie}
- Sections .astro pures (sans hydratation) : {liste}
- Islands React : {liste avec hydration mode}

## Dependances sortantes
{Composants importes}
- `<Hero />` depuis `front/src/components/Hero.astro`
- `<ContactForm client:visible />` depuis `front/src/components/ContactForm.tsx`

## Dependances backend
{Endpoints appeles}
- ContactForm POST vers `${PUBLIC_SUPABASE_URL}/functions/v1/contact-form`

## A surveiller
- Si modifier l'ordre des sections : verifier LCP element reste en premier
- Si ajouter une section : valider impact sur Lighthouse
- Synchroniser title/meta avec les campagnes Ads
```

## Template Layout Astro

Pour `front/src/layouts/{nom}.astro`. Fichier rule : `.claude/rules/front/layouts-{nom}.md`.

```yaml
---
paths:
  - "front/src/layouts/{nom}.astro"
---

# Layout {nom} — {role-court}

## Role
{1-3 phrases : quel type de page utilise ce layout, ce qu'il fournit (head, header, footer...)}

## Slots fournis
- Default slot : contenu principal de la page
- {Autres named slots si pertinent}

## Structure
- `<head>` : meta, Open Graph, Schema.org JSON-LD
- `<header>` : navigation, logo
- `<main>` : slot principal
- `<footer>` : liens secondaires, mentions legales

## Variables d'env consommees
- `PUBLIC_SITE_URL` (canonical)
- `PUBLIC_GA_ID` (analytics)
- {autres}

## Dependances sortantes
- `<Header />` depuis `front/src/components/Header.astro`
- `<Footer />` depuis `front/src/components/Footer.astro`

## Dependances entrantes
{Pages qui utilisent ce layout}
- `front/src/pages/index.astro`
- `front/src/pages/contact.astro`

## A surveiller
- Si modifier la structure head : impact SEO sur toutes les pages utilisant ce layout
- Si ajouter un script global : impact perf sur toutes les pages
```

## Template Composant Astro Statique

Pour `front/src/components/{NomComponent}.astro`. Fichier rule : `.claude/rules/front/{nom-component}.md`.

```yaml
---
paths:
  - "front/src/components/{NomComponent}.astro"
---

# {NomComponent} — {role-court}

## Role
{1-3 phrases : ce que fait ce composant pour l'utilisateur}

## Type
Astro statique. Pas d'hydratation, zero JS au runtime.

## Structure
{Sous-elements du composant}
- {Element 1 : ex H1 titre principal}
- {Element 2 : ex Image illustrative}
- {Element 3 : ex 1-2 CTAs}

## Props
{Si le composant accepte des props}
| Prop | Type | Required | Default |
|------|------|----------|---------|
| title | string | oui | - |
| variant | "primary" \| "secondary" | non | "primary" |

## Dependances entrantes
{Ou ce composant est utilise (resultat grep)}
- `front/src/pages/index.astro` (section 1)
- `front/src/pages/pricing.astro` (header)

## Dependances sortantes
{Imports du fichier}
- `<Image />` depuis `astro:assets`
- Image source : `front/src/assets/{nom}.webp`
- Variables env : `{LIST}`

## Contraintes
{Regles non negociables detectees}
- {Si LCP : Image hero `loading="eager"`, `fetchpriority="high"`}
- {Si dimensions explicites : Width/height pour CLS = 0}
- {Si texte depuis env : "Texte depuis env, pas hardcode"}

## A surveiller
- {Si modifier image : verifier Lighthouse LCP}
- {Si changer un CTA : mettre a jour event GA4 correspondant}
- {Si retirer un H1 : impact SEO}
```

## Template Island React

Pour `front/src/components/{NomComponent}.tsx`. Fichier rule : `.claude/rules/front/{nom-component}.md`.

```yaml
---
paths:
  - "front/src/components/{NomComponent}.tsx"
---

# {NomComponent} — {role-court} (island)

## Role
{1-3 phrases : interactivite fournie, pourquoi React et pas Astro}

## Type
React island, hydratation `{client:visible | client:load | client:idle}`.

## State
{Mecanisme de state utilise}
- React Hook Form (resolver Zod)
- useState locaux : `{liste}`
- Custom hooks : `{liste}`

## Validation
{Si le composant valide des inputs}
Schema Zod : voir `front/src/lib/schemas/{nom}.ts`
- email : email valide
- name : 2-80 chars
- message : 10-2000 chars

## Endpoints appeles
{Si le composant fait des requetes}
- POST `${PUBLIC_SUPABASE_URL}/functions/v1/{function-name}`

## Dependances entrantes
{Ou ce composant est utilise}
- `front/src/pages/index.astro` (section)
- `front/src/pages/contact.astro` (page dediee)

## Dependances sortantes
{Imports React + helpers}
- `react-hook-form`, `zod`, `@hookform/resolvers/zod`
- `front/src/lib/utm.ts` (getUTMParams)
- `front/src/lib/supabase.ts` (client browser)

## Contraintes
{Detectees automatiquement}
- {Si honeypot : "Honeypot `_honey` DOIT rester invisible (CSS) mais present dans DOM"}
- {Si Zod : "Schema Zod = schema serveur edge function (synchroniser)"}
- {Si client:load justifier : "Hydration agressive justifiee par {raison}"}

## A surveiller
- Si modifier le schema Zod : synchroniser avec l'edge function `{function-name}`
- Si changer l'hydratation : verifier impact Lighthouse TBT/INP
- Si retirer le honeypot : risque spam sur leads
```
