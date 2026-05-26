# Reveal.js 5 — Speaker View et Export PDF

## Speaker View

Vue presentateur avec notes, timer, preview next slide.

### Activation

1. Plugin Notes charge (cf [07-plugins.md](07-plugins.md))
2. Pendant la presentation, presser la touche **S**
3. Une nouvelle fenetre s'ouvre avec la speaker view

### Ce que la speaker view affiche

- **Slide courante** (vue principale)
- **Slide suivante** (preview a droite)
- **Notes** de la slide courante
- **Timer presentation** (cliquable pour reset)
- **Temps ecoule** depuis le debut
- **Heure courante** (wall clock)
- **Pacing timer** optionnel (si `defaultTiming` configure)

### Pre-requis

- Plugin `RevealNotes` enregistre
- Serveur HTTP local (pas `file://`)
- Popup non bloque par le navigateur

### Controls speaker-only (v5.2+)

Afficher les fleches uniquement dans la speaker view :

```javascript
Reveal.initialize({ controls: 'speaker-only' });
```

Utile pour audience sans distraction visuelle.

### Pacing timer

Indique si tu es en avance ou en retard sur le timing :

```javascript
Reveal.initialize({
  defaultTiming: 120  // 2 minutes par slide en moyenne
});
```

Ou par slide :

```html
<section data-timing="180">Cette slide doit prendre 3 minutes</section>
```

## Export PDF

### Methode officielle (navigateur)

Reveal expose un mode `print` qui re-rendere les slides en pages A4 landscape.

#### Procedure pas a pas

1. Lancer la presentation : `http://localhost:8000/`
2. Ajouter `?print-pdf` a l'URL : `http://localhost:8000/?print-pdf`
3. Attendre que la page se re-render (slides en grille)
4. Ouvrir le dialog d'impression (Ctrl/Cmd+P)
5. Destination : **Save as PDF**
6. Layout : **Landscape**
7. Margins : **None**
8. Background graphics : **enabled** (sinon fonds disparaissent)
9. Save

### Browser compatibility

**Chrome ou Chromium uniquement**. Safari et Firefox produisent des PDF cabosses. Edge fonctionne car base sur Chromium.

### v5.0.0+ : URL query unifie

Trois URL equivalentes (compatibilite descendante) :

```
/?print-pdf       # legacy v4
/?view=print      # v5+
```

Et en config :

```javascript
Reveal.configure({ view: 'print' });
```

### Inclure les speaker notes

Defaut : notes invisibles en PDF.

```javascript
// Notes dans une box overlay sur la slide
Reveal.configure({ showNotes: true });

// Notes sur page separee (recommande pour decks longs)
Reveal.configure({ showNotes: 'separate-page' });
```

### Controler le nombre de pages par slide

Une slide avec 5 fragments genere 5 pages PDF par defaut.

```javascript
// Limiter
Reveal.configure({ pdfMaxPagesPerSlide: 1 });

// Imprimer tous les fragments visibles sur une page
Reveal.configure({ pdfSeparateFragments: false });
```

### Numerotation des pages

Pour numeroter les pages PDF :

```javascript
Reveal.configure({
  slideNumber: 'c/t',
  showSlideNumber: 'print'   // affiche uniquement en print
});
```

### Offset hauteur PDF

Si tu observes des bandes blanches en bas des pages :

```javascript
Reveal.configure({ pdfPageHeightOffset: -1 });  // defaut, -1 = auto
```

## Methode alternative : decktape

[decktape](https://github.com/astefanutti/decktape) est un outil CLI base sur Puppeteer.

### Installation

```bash
npm install -g decktape
```

### Usage

```bash
# Local server demarre
npm start

# Dans un autre terminal
decktape reveal http://localhost:8000 presentation.pdf
```

### Avantages decktape

- Headless (pas besoin d'ouvrir Chrome a la main)
- Scriptable en CI/CD
- Supporte plusieurs frameworks (reveal, impress, deck.js)
- Options de qualite avances

### Exemple CI/CD

```yaml
# .github/workflows/build-pdf.yml
- name: Generate PDF
  run: |
    npm install
    npm start &
    sleep 5
    npx decktape reveal http://localhost:8000 deck.pdf
```

## Methode alternative : Puppeteer maison

```javascript
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:8000/?print-pdf', {
    waitUntil: 'networkidle0'
  });
  await page.pdf({
    path: 'deck.pdf',
    format: 'A4',
    landscape: true,
    printBackground: true,
    margin: { top: 0, bottom: 0, left: 0, right: 0 }
  });
  await browser.close();
})();
```

## Patterns deploiement statique

### Netlify

C'est le pattern utilise dans [propalgarcia/](/Users/thomas/webflowlanding/propalgarcia) :

```toml
# netlify.toml
[build]
  publish = "."
```

Deux URLs publiques :
- `https://propalgarcia.netlify.app/` — presentation interactive
- `https://propalgarcia.netlify.app/?print-pdf` — version imprimable

### Generer le PDF en build

```toml
[build]
  command = "npx decktape reveal index.html deck.pdf"
  publish = "."
```

Le PDF est alors servi en static.

## Anti-patterns

```javascript
// MAL : showNotes dans la config au lieu de configure
Reveal.initialize({
  showNotes: 'separate-page'  // ne marche que pour PDF print, pas en presentation
});

// BON : configurer juste avant print
if (window.location.search.includes('print-pdf')) {
  Reveal.configure({ showNotes: 'separate-page' });
}
```

```bash
# MAL : ouvrir index.html en file://
open /Users/.../propalgarcia/index.html?print-pdf
# Bugs CORS, plugins ne chargent pas

# BON : serveur HTTP
npx serve .
# puis http://localhost:3000/?print-pdf
```

## Sources

- [revealjs.com/pdf-export](https://revealjs.com/pdf-export/) — guide officiel
- [revealjs.com/speaker-view](https://revealjs.com/speaker-view/) — speaker view
- [decktape on GitHub](https://github.com/astefanutti/decktape) — CLI alternatif
- [Issue #2040 — Notes in PDF](https://github.com/hakimel/reveal.js/issues/2040) — discussions speaker notes PDF
