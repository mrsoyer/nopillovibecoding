# Reveal.js 5 — API Reference JavaScript

> API exposee via l'objet global `Reveal` (mode single deck) ou via instances (`new Reveal(...)` en mode multi-deck).

## Initialisation et cycle de vie

```javascript
// Init et promise
Reveal.initialize(config).then(() => { /* pret */ });

// Reconfigurer
Reveal.configure({ autoSlide: 5000 });

// Detruire
Reveal.destroy();

// Recuperer config
Reveal.getConfig();
```

## Navigation

### Navigation absolue

```javascript
Reveal.slide(indexh, indexv, indexf);
// indexh: index horizontal
// indexv: index vertical (optionnel)
// indexf: index fragment (optionnel)
```

### Navigation relative

```javascript
Reveal.left();
Reveal.right();
Reveal.up();
Reveal.down();
Reveal.prev();         // = previous slide (any direction)
Reveal.next();         // = next slide (any direction)
```

### Navigation fragments

```javascript
Reveal.navigateFragment(indexf);   // -1 cache tous
Reveal.prevFragment();
Reveal.nextFragment();
```

### Verifier les routes disponibles

```javascript
const routes = Reveal.availableRoutes();
// { left: bool, right: bool, up: bool, down: bool }

const frags = Reveal.availableFragments();
// { prev: bool, next: bool }
```

## Information sur les slides

### Slide courante

```javascript
const slide = Reveal.getCurrentSlide();         // element DOM
const previous = Reveal.getPreviousSlide();
const indices = Reveal.getIndices();            // { h, v, f }
const progress = Reveal.getProgress();          // 0 a 1
```

### Slides arbitraires

```javascript
const slide = Reveal.getSlide(2, 1);            // horizontal 2, vertical 1
const all = Reveal.getSlides();                 // tableau de tous les <section>
const total = Reveal.getTotalSlides();
const path = Reveal.getSlidePath(slide);        // URL representation
```

### Notes et backgrounds

```javascript
const notes = Reveal.getSlideNotes(slide);      // string ou null
const bg = Reveal.getSlideBackground(2, 1);     // element background
```

### Attributes de toutes les slides

```javascript
const attrs = Reveal.getSlidesAttributes();
// [ { data-transition: 'zoom', data-background: '...' }, ... ]
```

## State et position

### Type de slide courante

```javascript
Reveal.isFirstSlide();
Reveal.isLastSlide();
Reveal.isVerticalSlide();
Reveal.isLastVerticalSlide();
Reveal.hasHorizontalSlides();
Reveal.hasVerticalSlides();
Reveal.hasNavigatedHorizontally();
Reveal.hasNavigatedVertically();
```

### Modes actifs

```javascript
Reveal.isOverview();
Reveal.isAutoSliding();
Reveal.isPaused();
```

## Toggles de mode

```javascript
Reveal.toggleOverview(force);    // ESC en defaut
Reveal.toggleAutoSlide(force);
Reveal.togglePause(force);
Reveal.toggleHelp(force);        // affiche les raccourcis
```

Optionnel `force: boolean` pour forcer on/off.

## Scale et layout

```javascript
const scale = Reveal.getScale();
const size = Reveal.getComputedSlideSize();
// { width, height, presentationWidth, presentationHeight }

Reveal.layout();          // recalcule la taille
Reveal.sync();            // re-synchronise tout (apres add/remove slide)
Reveal.syncSlide(slide);  // sync une slide specifique
Reveal.syncFragments(slide);
Reveal.shuffle();         // randomize l'ordre des slides
```

## Acces DOM

```javascript
Reveal.getRevealElement();     // <div class="reveal">
Reveal.getSlidesElement();     // <div class="slides">
Reveal.getViewportElement();   // viewport interne
Reveal.getBackgroundsElement();
```

## Utilitaires

```javascript
const query = Reveal.getQueryHash();
// { 'print-pdf': true, view: 'print' }

Reveal.removeHiddenSlides();   // supprime data-visibility="hidden"
```

## Events

### Souscription

```javascript
Reveal.on('eventname', handler);
Reveal.off('eventname', handler);
// Equivalent natif : addEventListener/removeEventListener
```

### Events disponibles

| Event | Quand | Payload |
|-------|-------|---------|
| `ready` | Init complete | `{ indexh, indexv, currentSlide }` |
| `slidechanged` | Slide changee | `{ previousSlide, currentSlide, indexh, indexv }` |
| `slidetransitionend` | Fin transition slide | `{ slide }` |
| `fragmentshown` | Fragment revele | `{ fragment }` |
| `fragmenthidden` | Fragment cache | `{ fragment }` |
| `overviewshown` | Overview ouvert | `{ indexh, indexv, currentSlide }` |
| `overviewhidden` | Overview ferme | idem |
| `paused` | Pause activee | `{}` |
| `resumed` | Pause levee | `{}` |
| `autoanimate` | Auto-animate trigger | `{ previousSlide, currentSlide }` |
| `resize` | Resize viewport | `{ scale, oldScale }` |

### Exemples

```javascript
// Tracker analytics
Reveal.on('slidechanged', (e) => {
  analytics.track('slide_view', { index: e.indexh });
});

// Detection fin de presentation
Reveal.on('slidechanged', () => {
  if (Reveal.isLastSlide()) console.log('Fin');
});

// Action sur fragment specifique
Reveal.on('fragmentshown', (e) => {
  if (e.fragment.dataset.action === 'play-sound') new Audio('ding.mp3').play();
});
```

## Plugin API

```javascript
Reveal.hasPlugin('markdown');         // boolean
Reveal.getPlugin('markdown');         // instance plugin
Reveal.getPlugins();                  // tous les plugins enregistres
```

### Exemple : controler le plugin Search

```javascript
const search = Reveal.getPlugin('search');
search.toggleSearch();                // ouvrir/fermer
search.closeSearch();                 // fermer (v5.2+)
```

## Multi-instances

```javascript
const cfg = { embedded: true, keyboardCondition: 'focused' };
const deck1 = new Reveal(document.querySelector('.deck1'), cfg);
const deck2 = new Reveal(document.querySelector('.deck2'), cfg);
await Promise.all([deck1.initialize(), deck2.initialize()]);

deck1.next();
deck2.slide(3);
deck1.on('slidechanged', handler);
```

## TypeScript (v5+)

Les types TypeScript sont **inclus** dans le package. Plus besoin de `@types/reveal.js`.

```typescript
import Reveal from 'reveal.js';
import type { Options, RevealStatic } from 'reveal.js';

const config: Options = {
  hash: true,
  transition: 'slide'
};

Reveal.initialize(config).then((revealInstance: RevealStatic) => {
  // ...
});
```

> Les noms de types ont legerement change vs `@types/reveal.js`. Verifier les imports en migrant.

## postMessage API

Reveal expose son API a une fenetre parente (iframes) :

```javascript
iframe.contentWindow.postMessage(
  JSON.stringify({ method: 'next', args: [] }), '*'
);
window.addEventListener('message', (e) => {
  const data = JSON.parse(e.data);
  if (data.namespace === 'reveal') console.log(data.eventName);
});
```

Necessite `postMessage: true` (defaut) et `postMessageEvents: true` pour recevoir les events.

## Cas d'usage : quiz interactif

```html
<section>
  <h2>Quiz</h2>
  <button onclick="Reveal.slide(10)">Bonne reponse</button>
  <button onclick="Reveal.slide(11)">Mauvaise</button>
</section>
```

## Sources

- [revealjs.com/api](https://revealjs.com/api/) — reference complete
- [revealjs.com/events](https://revealjs.com/events/) — liste events
- [revealjs.com/initialization](https://revealjs.com/initialization/) — patterns d'init
