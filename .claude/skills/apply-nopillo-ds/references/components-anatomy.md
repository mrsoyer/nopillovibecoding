# Components Anatomy — Specs des 6 composants Nopillo

> Specs détaillées des 6 composants Astro générés par le skill. Source : `docs/design-system-extraction/nopillo-extracted/05-composants-buttons.md`, `06-composants-navbar-footer.md`, `07-composants-cards-sections.md`.

## 1. Button

**Fichier** : `src/components/nopillo/Button.astro`

### Props (interface)

```typescript
interface Props {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'; // default 'primary'
  size?: 'sm' | 'md' | 'lg';                                // default 'md'
  href?: string;                                            // si présent → <a>, sinon → <button>
  type?: 'button' | 'submit' | 'reset';                     // default 'button'
  disabled?: boolean;
  iconLeft?: string;   // SVG path
  iconRight?: string;
  class?: string;
}
```

### Variants

| Variant | Background | Color | Border |
|---------|-----------|-------|--------|
| `primary` | `--black` | `--white` | none |
| `secondary` | `--indigo-600` | `--white` | none |
| `outline` | `--white` | `--black` | `1px solid --black` |
| `ghost` | transparent | `--black` | none |

### Sizes

| Size | Padding | Font-size |
|------|---------|-----------|
| `sm` | `10px 16px` | `16px` |
| `md` | `20px 24px` | `18px` |
| `lg` | `26px 48px` | `18px` |

### Specs communes

- `font-family: var(--font-display)`
- `font-weight: 500`
- `line-height: 1`
- `border-radius: 999px` (**pill**)
- `transition: background-color 0.2s ease, transform 0.2s ease`
- `cursor: pointer`
- Hover : changement de `background-color` uniquement (pas de scale)

## 2. Header

**Fichier** : `src/components/nopillo/Header.astro`

### Props

```typescript
interface Props {
  showHeadband?: boolean;          // bandeau orange top (annonces)
  headbandText?: string;
  headbandLinkUrl?: string;
  variant?: 'light' | 'transparent'; // default 'light'
  ctaLabel?: string;                 // default 'Calculer mes économies'
  ctaUrl?: string;                   // default '/contact'
  navItems?: Array<{label: string; url: string}>;
}
```

### Structure

```
<header>
  [optionnel: headband orange #FFF3DF, 36px hauteur]
  <nav> [80px hauteur desktop / 64px mobile]
    <a class="logo">[Logo Nopillo SVG]</a>
    <ul class="nav-items">
      [items optionnels — desktop only]
    </ul>
    <div class="cta-group">
      <button class="outline">Espace client</button>
      <button class="primary">[ctaLabel]</button>
    </div>
    <button class="burger" [mobile only]>...</button>
  </nav>
</header>
```

### Specs

- `position: sticky; top: 0`
- `backdrop-filter: blur(12px)` si `variant=transparent`
- `background-color: rgba(255, 255, 255, 0.85)` si transparent, sinon `--white`
- `box-shadow: 0 1px 0 rgba(0, 0, 0, 0.04)` sous le nav
- Container : `--container-navbar` (1408px)
- Burger mobile : overlay full-screen, animation slide-in

## 3. Footer

**Fichier** : `src/components/nopillo/Footer.astro`

### Props

```typescript
interface Props {
  variant?: 'full' | 'minimal';     // default 'full'
  showNewsletter?: boolean;
  socialLinks?: Array<{platform: string; url: string}>;
  legalLinks?: Array<{label: string; url: string}>;
}
```

### Structure (variant `full`)

```
<footer> [background --black, color --white]
  <div class="container">              [1120px]
    <div class="grid-5">              [5 colonnes desktop, stack mobile]
      <div class="brand">
        [Logo blanc]
        [Baseline]
      </div>
      <div class="links-services">
        <h6>Services</h6>
        <ul>...</ul>
      </div>
      <div class="links-resources">
        <h6>Ressources</h6>
        <ul>...</ul>
      </div>
      <div class="links-legal">
        <h6>Légal</h6>
        <ul>[Mentions, Privacy, Cookies]</ul>
      </div>
      <div class="newsletter" [si showNewsletter]>
        <h6>Newsletter</h6>
        <form>...</form>
      </div>
    </div>
    <div class="bottom-bar">
      <span>© 2026 Nopillo</span>
      <ul class="social">...</ul>
    </div>
  </div>
</footer>
```

### Specs

- `background: var(--black)`
- `color: var(--white)`
- `padding: 80px 0 32px`
- Links color : `rgba(255, 255, 255, 0.7)` → hover `--white`
- H6 footer : `font-size: 14px, font-weight: 600, text-transform: uppercase, letter-spacing: 0.05em`

## 4. Hero

**Fichier** : `src/components/nopillo/Hero.astro`

### Props

```typescript
interface Props {
  headline: string;                    // H1, max 80 chars recommandé
  subheadline?: string;
  ctaPrimaryLabel?: string;            // default 'Calculer mes économies'
  ctaPrimaryUrl?: string;
  ctaSecondaryLabel?: string;          // optionnel
  ctaSecondaryUrl?: string;
  trustpilotScore?: string;            // ex: '4.7'
  trustpilotCount?: string;            // ex: '1247'
  visualSlot?: 'image' | 'simulator' | 'none';  // default 'image'
}
```

### Structure (2 colonnes desktop)

```
<section class="hero">
  <div class="container">              [1120px]
    <div class="grid-2">              [50/50 desktop, stack mobile]
      <div class="content">
        [Badge optionnel: Outil gratuit]
        <h1>[headline]</h1>            [60px display-lg, 700, color --black]
        <p class="subheadline">...</p>  [20px lead, --graycool500]
        <div class="cta-group">
          <Button variant="primary" size="lg">[ctaPrimary]</Button>
          <Button variant="ghost" [si ctaSecondary]>[ctaSecondary]</Button>
        </div>
        [Trust signals: Trustpilot, chiffres clés]
      </div>
      <div class="visual">
        <slot name="visual"> [<img> default ou <slot>] </slot>
      </div>
    </div>
  </div>
</section>
```

### Specs

- `background: var(--indigo-100)` ou `rgba(222, 218, 255, 0.6)` (signature Nopillo)
- `padding: 160px 0 44px` (top large, bottom petit)
- Container : `--container-regular` (1120px)
- Grid gap : `48px` (entre les 2 colonnes)
- Mobile : stack, `padding: 96px 0 64px`

## 5. Card

**Fichier** : `src/components/nopillo/Card.astro`

### Props

```typescript
interface Props {
  variant?: 'translucent' | 'solid' | 'outlined' | 'feature' | 'testimonial';
  title?: string;
  icon?: string;             // path SVG
  href?: string;             // si présent → wrapper <a>
  class?: string;
}
```

### Variants

| Variant | Background | Border | Shadow |
|---------|-----------|--------|--------|
| `translucent` | `rgba(255, 255, 255, 0.3)` | `1px solid --indigo-100` | `--shadow-card` |
| `solid` | `--white` | none | `--shadow-card` |
| `outlined` | `--white` | `1px solid --graycool200` | none |
| `feature` | `--white` | `1px solid --indigo-100` | `--shadow-card` |
| `testimonial` | `--white` | `1px solid --indigo-100` | `--shadow-elevated` |

### Specs communes

- `border-radius: 16px` (signature)
- `padding: 24px`
- `transition: box-shadow 0.2s ease`
- Hover : `box-shadow: --shadow-elevated`
- Si `href` présent : tout le card est clickable

### Layout interne (variant feature)

```
<article class="card-feature">
  [Icon SVG 48x48, color --indigo-600]
  <h3>[title]</h3>           [26px, 700, color --black]
  <p>[description]</p>        [16px body, --graycool500]
</article>
```

## 6. CtaSection

**Fichier** : `src/components/nopillo/CtaSection.astro`

### Props

```typescript
interface Props {
  variant?: 'brand' | 'neutral' | 'inverse'; // default 'brand'
  headline: string;
  subheadline?: string;
  ctaPrimaryLabel: string;
  ctaPrimaryUrl: string;
  ctaSecondaryLabel?: string;
  ctaSecondaryUrl?: string;
}
```

### Structure

```
<section class="cta-section">
  <div class="container">              [1120px]
    <div class="grid-2-or-stack">
      <div class="content">
        <h2>[headline]</h2>             [56px display-md, 600]
        <p>[subheadline]</p>            [20px lead]
      </div>
      <div class="actions">
        <Button variant=[mapped] size="lg">[ctaPrimary]</Button>
        [optionnel: ctaSecondary en ghost]
      </div>
    </div>
  </div>
</section>
```

### Variants

| Variant | Section bg | Text color | Button variant |
|---------|-----------|-----------|----------------|
| `brand` | `--indigo-600` | `--white` | secondary inverted (white bg, indigo text) |
| `neutral` | `--graycool50` | `--black` | primary |
| `inverse` | `--black` | `--white` | secondary (indigo bg) |

### Specs

- `padding: 80px 24px` desktop / `64px 16px` mobile
- Container : `--container-regular`
- Position type : juste avant `<Footer />`

## Patterns d'usage typique sur une landing

```astro
---
import Header from '@/components/nopillo/Header.astro';
import Hero from '@/components/nopillo/Hero.astro';
import Card from '@/components/nopillo/Card.astro';
import CtaSection from '@/components/nopillo/CtaSection.astro';
import Footer from '@/components/nopillo/Footer.astro';
---

<html>
  <body>
    <Header showHeadband headbandText="Nouveau : déclaration LMNP 2026" />
    
    <Hero
      headline="Votre déclaration LMNP. Simplifiée. Optimisée."
      subheadline="Économisez en moyenne 4 800€ d'impôts par an"
      ctaPrimaryLabel="Calculer mes économies"
      ctaPrimaryUrl="/simulateur"
      trustpilotScore="4.7"
      trustpilotCount="1247"
    />
    
    <section class="features">
      <div class="container">
        <div class="grid grid-3 gap-4">
          <Card variant="feature" title="Conformité totale" icon="..." />
          <Card variant="feature" title="Prix fixe 599€" icon="..." />
          <Card variant="feature" title="Experts dédiés" icon="..." />
        </div>
      </div>
    </section>
    
    <CtaSection
      variant="brand"
      headline="Prêt à économiser ?"
      subheadline="Simulez en 2 minutes."
      ctaPrimaryLabel="Démarrer ma simulation"
      ctaPrimaryUrl="/simulateur"
    />
    
    <Footer variant="full" showNewsletter />
  </body>
</html>
```

## Personnalisation acceptée

- ✅ Override des props de chaque composant
- ✅ Ajout de classes Tailwind custom via `class` prop
- ✅ Slots pour le contenu (Hero `visual` slot)

## Personnalisation NON acceptée (casse le DS)

- ❌ Changer le `border-radius` des Button (pas de boutons rectangulaires)
- ❌ Changer la `font-family` (Futura PT uniquement)
- ❌ Hardcoder des couleurs hors palette (utiliser les variables CSS)
- ❌ Réduire H1 hero en dessous de 48px (perte impact visuel)
