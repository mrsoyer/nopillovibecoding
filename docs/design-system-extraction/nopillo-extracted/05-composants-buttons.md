# Composants — Boutons Nopillo

> 5 variantes de boutons identifiees, dont 2 systeme (pill primaire / outline) et 1 LP (rounded).

## Sommaire

- [Bouton primaire (CTA noir)](#bouton-primaire-cta-noir)
- [Bouton outline (Espace client)](#bouton-outline-espace-client)
- [Bouton primaire CTA section (indigo)](#bouton-primaire-cta-section-indigo)
- [Bouton LP (Splinesans rounded)](#bouton-lp-splinesans-rounded)
- [Bouton hero (compact noir)](#bouton-hero-compact-noir)
- [Anatomie commune](#anatomie-commune)

---

## Bouton Primaire (CTA noir)

**Classes** : `.button_header-simulation.is-mobile.w-button`
**Texte exemple** : "Calculer mes economies"

```css
.button-primary {
  background-color: #09090B;        /* --black */
  color: #FFFFFF;
  border: 1px solid #FFFFFF;        /* white border interne */
  border-radius: 999px;             /* pill */
  padding: 20px;                    /* 20px sur tous cotes */
  font-family: futura-pt, sans-serif;
  font-size: 18px;
  font-weight: 500;                 /* medium */
  line-height: 16px;                /* tight */
  letter-spacing: normal;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: none;
}
```

**Visuel** : pilule noire avec bordure blanche fine (interesse pour outline sur fond noir).

## Bouton Outline (Espace client)

**Classes** : `.button_header.is-outline.is-mobile.w-button`

```css
.button-outline {
  background-color: #FFFFFF;
  color: #09090B;
  border: 1px solid #09090B;        /* black border */
  border-radius: 999px;
  padding: 20px;
  font-family: futura-pt, sans-serif;
  font-size: 18px;
  font-weight: 500;
  transition: all 0.3s ease;
}
```

**Pattern** : meme size que primary, juste invert des couleurs. Symetrie parfaite.

## Bouton Primaire CTA Section (Indigo)

Detecte dans `.section_cta-callback.background-color-600` (section finale violet) :

```css
.button-cta-section {
  background-color: #4033DB;        /* --indigo-600 */
  color: #FFFFFF;
  border: none;                     /* pas de border sur CTA section */
  border-radius: 999px;
  padding: 20px;
  font-family: futura-pt, sans-serif;
  font-size: 18px;
  font-weight: 500;
}
```

Variant utilise sur fonds clairs pour un CTA principal (vs noir).

## Bouton LP (Splinesans Rounded)

**Classes** : `.lp_button.is-mobile.is-outline`
Utilise uniquement sur les pages LP (`Splinesans` font).

```css
.button-lp {
  background-color: rgba(255, 255, 255, 0);  /* transparent */
  color: #000000;                            /* black pure (pas --black) */
  border: 2px solid #09090B;                 /* border 2px (vs 1px) */
  border-radius: 32px;                       /* rounded XL (pas pill) */
  padding: 0px 32px;
  font-family: Splinesans, sans-serif;       /* font differente */
  font-size: 16px;
  font-weight: 700;                          /* bold (vs medium) */
  transition: 0.3s;                          /* simple */
}
```

**Singularite** : different du DS principal — utilise sur LP marketing avec branding plus "edgy".

## Bouton Hero (Compact noir)

Visible dans le hero : "Parler a un conseiller"

```css
.button-hero {
  background-color: #09090B;
  color: #FFFFFF;
  border: 1px solid transparent;
  border-radius: 999px;
  padding: 20px 32px;            /* horizontal etendu */
  font-size: 18px;
  font-weight: 500;
  font-family: futura-pt, sans-serif;
}
```

## Anatomie Commune

### Tous les boutons primaires partagent

| Propriete | Valeur |
|-----------|--------|
| **Border-radius** | `999px` (pill) — sauf LP en 32px |
| **Padding vertical** | `20px` |
| **Font-family** | `futura-pt, sans-serif` (sauf LP) |
| **Font-size** | `18px` |
| **Font-weight** | `500` (medium) — sauf LP en 700 |
| **Line-height** | `16px` (tight pour boutons) |
| **Transition** | `all 0.3s ease` |
| **Cursor** | `pointer` |

### Hierarchie

```
1. CTA Primary      → Black bg + white text
2. CTA Section      → Indigo-600 bg + white text (sur fond clair)
3. CTA Outline      → White bg + black border + black text
4. CTA LP (special) → Transparent + 2px border + Splinesans
```

## Implementation Reutilisable (CSS proposed)

```css
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 20px 24px;
  font-family: var(--font-display);
  font-size: 18px;
  font-weight: 500;
  line-height: 1;
  border-radius: 999px;
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: none;
  border: 1px solid transparent;
}

.btn-primary {
  background-color: var(--black);
  color: var(--white);
}
.btn-primary:hover {
  background-color: var(--graycool800);
}

.btn-secondary {
  background-color: var(--indigo-600);
  color: var(--white);
}
.btn-secondary:hover {
  background-color: var(--indigo-700);
}

.btn-outline {
  background-color: var(--white);
  color: var(--black);
  border-color: var(--black);
}
.btn-outline:hover {
  background-color: var(--black);
  color: var(--white);
}

.btn-sm {
  padding: 10px 16px;
  font-size: 16px;
}

.btn-lg {
  padding: 26px 48px;
  font-size: 18px;
}
```

## Anti-Patterns Detectes (a NE PAS reproduire)

1. **`transition: all 0.3s ease` partout** : peut declencher transitions inutiles sur layout. Preferer transitions explicites (background-color, color, transform).

2. **Border 1px white sur bouton noir** : c'est present sur `.button_header-simulation` mais cree un visual subtil tres visible sur certains backgrounds. Soit retirer la border, soit la rendre conditionnelle (sur backgrounds dark uniquement).

3. **Mix de polices boutons** (Futura PT vs Splinesans) sans regle claire. Standardiser sur Futura PT pour le DS principal.

## Sources

- Extraction : `document.querySelectorAll('a.button, button, [class*="button"]')` (5 premiers)
- Date : 2026-05-05
- Capture : voir `assets/navbar.png` (boutons primary + outline visibles)
