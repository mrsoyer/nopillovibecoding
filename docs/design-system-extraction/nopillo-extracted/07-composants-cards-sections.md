# Composants — Cards, Sections, Layouts

## Sommaire

- [Card translucide signature](#card-translucide-signature)
- [Sections colorees (alternance)](#sections-colorees-alternance)
- [Grids de fonctionnalites](#grids-de-fonctionnalites)
- [Hero section](#hero-section)
- [CTA section finale](#cta-section-finale)

---

## Card Translucide Signature

C'est le composant card le plus utilise (10+ instances) :

**Classe** : `.card_position-business`

```css
.card-business {
  display: flex;
  background-color: rgba(255, 255, 255, 0.3);     /* white 30% */
  border: 1px solid #DEDAFF;                      /* --indigo-100 */
  border-radius: 16px;
  padding: 24px;
  gap: 30px;
  box-shadow: 0 1px 10px rgba(0, 0, 0, 0.06);
  width: 363px;                                   /* sur grid 3-cols */
  height: 287px;                                  /* indicatif */
}
```

**Pattern visuel** :
- Fond translucide blanc (semi-transparent) sur backgrounds indigo
- Bordure soft indigo
- Shadow tres subtile
- Padding 24px confortable
- Gap 30px entre titre et contenu

**Contenu typique** :
```
┌─────────────────────────┐
│ [Numero (1-2-3)]        │
│ [Titre H3]              │
│ [Description body]      │
│                         │
│ [Optional CTA →]        │
└─────────────────────────┘
```

## Sections Colorees (Alternance)

Pattern observe d'alternance de backgrounds sur la page d'accueil :

| Section | Classe | Background | Note |
|---------|--------|-----------|------|
| Hero | `.section_hero-simulation-lmnp.background-color-seo` | `rgba(222, 218, 255, 0.6)` | indigo-100 60% |
| Numbers/stats | `.section_numbers-paid` | `transparent` | Sur page bg |
| Software screen | `.section_software-screen.background-color-indigo-10` | `#EEECFF` (--indigo-10) | wash subtil |
| Video explications | `.section_video-explications` | `transparent` | |
| Chart comparatif | `.section_chart.background-color-neutral-50` | `#FAFAFA` | grey neutre |
| Details prix | `.section_details-price` | `transparent` | |
| Estimation paid | `.section_estimation-paid.background-color-indigo-100` | `#DEDAFF` | indigo-100 100% |
| Proposition Nopillo | `.section_proposition-nopillo` | `transparent` | |
| Avis clients | `.section_avis-component-paid.background-color-indigo-100-60` | `rgba(222, 218, 255, 0.5)` | indigo-100 50% |
| CTA finale | `.section_cta-callback.background-color-600` | `#4033DB` (--indigo-600) | **PUNCH** |

**Pattern** :
1. Hero avec **wash indigo soft** pour annoncer
2. Alternance : section blanche → section indigo wash → section blanche → section indigo plus prononce
3. Closing avec **section indigo-600 plein** (CTA primaire) — texte blanc

### Padding sections recurrents

```css
.padding-section-regular {
  padding: 57px 0 78px;        /* asymmetric (signature) */
}

.padding-section-regular.is-homepages {
  padding: 160px 0 44px;       /* hero homepage */
}

.padding-section-large {
  padding: 80px 0;
}

.padding-section-large-3.is-software {
  padding: 64px 0 88px;
}

.padding-section-regular.is-simulation-lmnp.is-seo {
  padding: 80px 0 62px;
}
```

## Grids de Fonctionnalites

### Grid 3 colonnes (signature)

```css
.grid_position-business.is-tabs-1 {
  display: grid;
  grid-template-columns: repeat(3, 362.664px);   /* fixe en pixel ! */
  gap: 16px;
  /* Total = 3 × 362.664 + 2 × 16 = 1120px (= container regular) */
}
```

Note : Webflow utilise des largeurs en `px` pour eviter les variations sub-pixel — pas optimal en responsive (mieux : `repeat(3, 1fr)`).

### Grid 4 colonnes

```css
.grid_position-business.is-tabs-2,
.grid_position-business.is-tabs-3 {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 16px;
}
```

### Tabs 4 (3 cols egales)

```css
.grid_position-business.is-tabs-4 {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 16px;
}
```

## Hero Section

Vue : `assets/hero.png`

```css
.section_hero-simulation-lmnp {
  background-color: rgba(222, 218, 255, 0.6);    /* indigo-100 60% */
  background-image: none;
  padding: 0;
  /* Padding via wrapper interne */
}

.padding-section-regular.is-homepages {
  padding: 160px 0 44px;                          /* hero padding */
}
```

### Anatomie hero

```
┌──────────────────────────┬──────────────────────────┐
│                          │                          │
│  Simplifiee.             │  ┌────────────────────┐  │
│  Optimisee.              │  │  Quel est le mont  │  │
│                          │  │  de votre bien...  │  │
│  Votre declaration       │  │  ┌──────────────┐  │  │
│  fiscale LMNP.           │  │  │ Moins de... │  │  │
│                          │  │  │ Entre 60... │  │  │
│  Proprietaires baillers  │  │  │ Entre 80... │  │  │
│  Nopillo vous fait       │  │  │ Plus de 1...│  │  │
│  economiser +2000€/an... │  │  └──────────────┘  │  │
│                          │  └────────────────────┘  │
│  [Parler conseiller]     │                          │
│                          │                          │
└──────────────────────────┴──────────────────────────┘
```

### Specs hero

| Element | Valeur |
|---------|--------|
| **H1** | "Simplifiee. Optimisee." — 59.2px / 700 / 72px LH |
| **Sub-title** | "Votre declaration fiscale LMNP." — 18-20px / 600 |
| **Lead paragraph** | 16-18px / 400 / 24-28px LH |
| **CTA** | Pill black 18px / 500 ("Parler a un conseiller") |
| **Form right** | Card avec choix multiples (radio buttons stylises) |

## CTA Section Finale

Section closing en `--indigo-600` (#4033DB) plein :

```css
.section_cta-callback.background-color-600 {
  background-color: #4033DB;
  /* Padding via wrapper */
}

.section_cta-callback h2 {
  color: #FFFFFF;                /* texte blanc sur fond indigo */
  font-size: 56px;
  font-weight: 600;
}

.section_cta-callback .button {
  background-color: #FFFFFF;     /* bouton blanc inverse */
  color: #4033DB;                /* texte indigo */
  border: none;
  border-radius: 999px;
}
```

**Texte typique** :
> Simplifiez votre gestion comptable et fiscale.
> [Calculer mes economies] [Parler a un conseiller]

## Cards Specifiques (catalogue)

Detectees via classes :

| Classe | Usage |
|--------|-------|
| `card_position-business` | Card 3-cols feature |
| `wrapper_cards-position-text` | Wrapper text dans card |
| `card_number-text-position` | Card avec numero (1-2-3...) |
| `card_titles-text-position` | Card avec titre |
| `text_card-position-business` | Body texte card |
| `wrapper_card-text-position` | Wrapper text |
| `card_titles-text-position` | Card heading wrapper |
| `image_card-position-business` | Image dans card |
| `card_text-news` | Card de news/blog |
| `card_avis` | Card avis client |
| `wrapper_titles-card-price` | Card pricing |

**Pattern de naming** :
- Prefixe `card_` ou `wrapper_card`
- Suffixe `-position-business` (ou `-news`, `-avis`, `-price`)
- Modifier `is-tabs-N` pour variantes

## Patterns d'Implementation

### Card translucide reutilisable

```css
.card {
  display: flex;
  flex-direction: column;
  gap: var(--gap-6);
  padding: 24px;
  background-color: rgba(255, 255, 255, 0.3);
  border: 1px solid var(--indigo-100);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-card);
  transition: box-shadow 0.2s ease, transform 0.2s ease;
}

.card:hover {
  box-shadow: var(--shadow-elevated);
  transform: translateY(-2px);
}

.card-opaque {
  background-color: var(--white);
}
```

### Section colored bg

```css
.section {
  padding: 80px 0;
}

.section--soft {
  background-color: rgba(222, 218, 255, 0.5);
}

.section--accent {
  background-color: var(--indigo-100);
}

.section--cta {
  background-color: var(--indigo-600);
  color: var(--white);
}
.section--cta h2 { color: var(--white); }
```

## Sources

- Extraction : `document.querySelectorAll('section, [class*="section"], [class*="card"]')`
- Date : 2026-05-05
- Captures : `assets/full-page.jpeg`, `assets/hero.png`
