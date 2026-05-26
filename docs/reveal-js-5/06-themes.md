# Reveal.js 5 — Themes et Styling

## 12 themes built-in

| Theme | Style | Cas d'usage |
|-------|-------|-------------|
| `black` (defaut) | Fond noir, texte blanc | Pitch corporate, tech |
| `white` | Fond blanc, texte noir | Documents formels |
| `league` | Gris, texte blanc | Conferences |
| `beige` | Beige, texte sombre | Doux, lecture |
| `night` | Noir, texte epais | High contrast |
| `serif` | Cappuccino, texte gris | Litteraire |
| `simple` | Blanc, texte noir | Minimaliste |
| `solarized` | Cream, vert sombre | Code-friendly |
| `moon` | Bleu sombre | Nocturne |
| `dracula` | Variant sombre | Devs |
| `sky` | Bleu | Aere, leger |
| `blood` | Sombre, texte epais | Punchy |

## Appliquer un theme

```html
<link rel="stylesheet" href="dist/theme/black.css">
```

Ou via CDN :

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reveal.js@5/dist/theme/black.css">
```

Un seul theme a la fois. Pour changer dynamiquement :

```javascript
function setTheme(name) {
  const link = document.querySelector('link[href*="theme/"]');
  link.href = `dist/theme/${name}.css`;
}
```

## CSS Variables exposees

Tous les themes exposent leurs variables dans `:root` avec le prefixe `--r-*`. Tu peux les override sans toucher au theme :

```css
:root {
  --r-background-color: #0a1628;
  --r-main-font: 'Inter', sans-serif;
  --r-main-font-size: 22px;
  --r-main-color: #ffffff;
  --r-heading-font: 'Montserrat', sans-serif;
  --r-heading-color: #ffffff;
  --r-heading-text-shadow: none;
  --r-heading-text-transform: none;
  --r-link-color: #2BC4F3;
  --r-link-color-hover: #5dd5f7;
  --r-selection-background-color: #2BC4F3;
  --r-selection-color: #fff;

  /* Layout */
  --r-controls-spacing: 12px;
  --r-overlay-header-height: 56px;
  --r-overlay-padding: 16px;
}
```

C'est l'approche utilisee dans [propalgarcia/theme-g2i.css](/Users/thomas/webflowlanding/propalgarcia/theme-g2i.css) : on charge `theme/black.css`, puis on override avec un fichier CSS custom.

## Override patterns

### Selecteurs `.reveal`

Le scope est toujours `.reveal` :

```css
.reveal h1 {
  font-size: 1.8em;
  text-transform: none;
}
.reveal ul li {
  list-style: none;
  position: relative;
}
.reveal ul li::before {
  content: '';
  position: absolute;
  left: -1em;
  top: 0.45em;
  width: 6px;
  height: 6px;
  background: var(--r-link-color);
  border-radius: 50%;
}
```

### Slides specifiques par classe

```html
<section class="section-break">...</section>
<section class="cover">...</section>
```

```css
.reveal .section-break h1 {
  font-size: 2.2em;
  -webkit-text-fill-color: white;
  background: none;
}
.reveal .cover {
  background: linear-gradient(180deg, #1a2845 0%, #0a1628 100%);
}
```

### Reduire la taille de base

Override de la variable principale :

```css
:root {
  --r-main-font-size: 22px !important;
}
.reveal .slides section {
  padding: 20px 40px;
  width: 100% !important;
  max-width: 1280px;
}
```

Pattern observe dans [propalgarcia/index.html](/Users/thomas/webflowlanding/propalgarcia/index.html#L17-L20).

## Creer un theme custom (avec Sass)

Pour theme complet, le framework utilise SCSS. Workflow officiel :

### 1. Cloner le repo en mode full setup

```bash
git clone https://github.com/hakimel/reveal.js.git
cd reveal.js && npm install
```

### 2. Dupliquer un theme source

```bash
cp css/theme/source/black.scss css/theme/source/mon-theme.scss
```

### 3. Structure d'un theme SCSS

```scss
// css/theme/source/mon-theme.scss

// 1. Mixins partages
@import "../template/mixins";

// 2. Settings : valeurs par defaut a override
@import "../template/settings";

// 3. Tes overrides
$backgroundColor: #0a1628;
$mainColor: #ffffff;
$headingColor: #ffffff;
$mainFont: 'Inter', sans-serif;
$headingFont: 'Montserrat', sans-serif;
$linkColor: #2BC4F3;

// 4. Template : genere le CSS final
@import "../template/theme";
```

### 4. Compiler

```bash
npm run build -- css-themes
```

Le fichier sort dans `dist/theme/mon-theme.css`.

### 5. Utiliser

```html
<link rel="stylesheet" href="dist/theme/mon-theme.css">
```

## Variables SCSS importantes

| Variable | Defaut | Effet |
|----------|--------|-------|
| `$backgroundColor` | `#222` | Fond presentation |
| `$mainColor` | `#fff` | Couleur texte par defaut |
| `$mainFontSize` | `42px` | Taille de base |
| `$mainFont` | `'Source Sans Pro'` | Famille principale |
| `$mainFontWeight` | `normal` | Graisse texte |
| `$headingColor` | `#fff` | Couleur titres |
| `$headingFont` | `'Source Sans Pro'` | Famille titres |
| `$headingTextShadow` | `none` | Ombre titres |
| `$headingTextTransform` | `uppercase` | Transformation |
| `$headingFontWeight` | `600` | Graisse titres |
| `$linkColor` | `#13DAEC` | Liens |
| `$selectionBackgroundColor` | `#FF5E99` | Selection texte |

Liste complete dans `css/theme/template/settings.scss` du repo.

## Custom sans Sass (approche pragmatique)

Si on ne veut pas builder, charger `theme/black.css` puis surcharger avec un CSS perso :

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reveal.js@5/dist/reveal.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reveal.js@5/dist/theme/black.css">
<link rel="stylesheet" href="theme-custom.css">  <!-- tes overrides -->
```

Avantages : deployable sans Node, modifications a chaud.
Inconvenients : poids legerement plus eleve (double CSS).

C'est l'approche choisie dans [propalgarcia/](/Users/thomas/webflowlanding/propalgarcia) — 11 Ko de `theme-g2i.css` qui surcharge black.

## Polices Google Fonts

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Montserrat:wght@400;600;700;800;900&display=swap" rel="stylesheet">
```

```css
:root {
  --r-main-font: 'Inter', sans-serif;
  --r-heading-font: 'Montserrat', sans-serif;
}
```

## Sources

- [revealjs.com/themes](https://revealjs.com/themes/) — themes officiels
- [github.com/hakimel/reveal.js/blob/master/css/theme/README.md](https://github.com/hakimel/reveal.js/blob/master/css/theme/README.md) — guide custom themes
- [DeepWiki — Creating Custom Themes](https://deepwiki.com/hakimel/reveal.js/4.3-creating-custom-themes)
- [Chen Hui Jing — Customising Reveal.js](https://chenhuijing.com/blog/customising-revealjs-beyond-theming/) — patterns d'override
