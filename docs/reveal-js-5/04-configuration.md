# Reveal.js 5 — Configuration

> 60+ options pour personnaliser le comportement. Toutes passees a `Reveal.initialize(options)`.

## Initialisation de base

### Presentation unique

```javascript
<script src="dist/reveal.js"></script>
<script>
  Reveal.initialize({
    hash: true,
    transition: 'slide'
  });
</script>
```

`Reveal.initialize()` retourne une **Promise** :

```javascript
Reveal.initialize({ ... }).then(() => {
  // Pret. API utilisable.
});
```

### Plusieurs presentations sur la meme page (v4+)

```javascript
import Reveal from 'reveal.js';

const deck1 = new Reveal(document.querySelector('.deck1'), {
  embedded: true,
  keyboardCondition: 'focused'
});
deck1.initialize();

const deck2 = new Reveal(document.querySelector('.deck2'), {
  embedded: true,
  keyboardCondition: 'focused'
});
deck2.initialize();
```

Requis pour embedded :
- `embedded: true`
- CSS `width` et `height` definies sur `.reveal`
- `keyboardCondition: 'focused'` (sinon les events keyboard de toutes les decks se chevauchent)

### ES modules

```javascript
import Reveal from 'reveal.js';
import Markdown from 'reveal.js/plugin/markdown';

Reveal.initialize({ plugins: [Markdown] });
```

### Cleanup

```javascript
Reveal.destroy();  // Supprime DOM, listeners, plugins
```

## Reconfiguration apres initialisation

```javascript
Reveal.configure({ autoSlide: 5000 });
```

## Liste complete des options

### Controls et progression

| Option | Defaut | Description |
|--------|--------|-------------|
| `controls` | `true` | Fleches de navigation. Ou `'speaker-only'` [v5.2+] |
| `controlsTutorial` | `true` | Tutoriel d'aide aux controles |
| `controlsLayout` | `'bottom-right'` | `'bottom-right'` ou `'edges'` |
| `controlsBackArrows` | `'faded'` | `'faded'`, `'hidden'`, `'visible'` |
| `progress` | `true` | Barre de progression |
| `slideNumber` | `false` | `true`, `'h.v'`, `'h/v'`, `'c'`, `'c/t'` |
| `showSlideNumber` | `'all'` | `'all'`, `'print'`, `'speaker'` |

### Navigation et URL

| Option | Defaut | Description |
|--------|--------|-------------|
| `hash` | `false` | Slide # dans URL (deeplink) |
| `hashOneBasedIndex` | `false` | Index 1-based pour hash |
| `respondToHashChanges` | `true` | Reagit aux changements de hash |
| `jumpToSlide` | `true` | Tape un numero pour sauter |
| `history` | `false` | Push browser history |
| `keyboard` | `true` | Raccourcis clavier |
| `keyboardCondition` | `null` | Function : bloque les events si retourne false |
| `touch` | `true` | Navigation tactile |
| `mouseWheel` | `false` | Navigation a la molette |
| `navigationMode` | `'default'` | `'default'`, `'linear'`, `'grid'` |

### Layout et affichage

| Option | Defaut | Description |
|--------|--------|-------------|
| `width` | `960` | Largeur de reference des slides |
| `height` | `700` | Hauteur de reference |
| `margin` | `0.04` | Espace minimum autour (4%) |
| `minScale` | `0.2` | Scale minimum |
| `maxScale` | `2.0` | Scale maximum |
| `center` | `true` | Centrage vertical |
| `disableLayout` | `false` | Desactive le layout par defaut |
| `display` | `'block'` | Mode d'affichage des slides |
| `embedded` | `false` | Mode embarque (cf init multiple) |

### Overview et UI

| Option | Defaut | Description |
|--------|--------|-------------|
| `overview` | `true` | Mode overview (touche ESC) |
| `loop` | `false` | Boucle infinie |
| `rtl` | `false` | Direction droite-vers-gauche |
| `shuffle` | `false` | Ordre aleatoire au chargement |
| `help` | `true` | Aide via `?` |
| `pause` | `true` | Pause via `.` |
| `hideInactiveCursor` | `true` | Cache curseur inactif |
| `hideCursorTime` | `5000` | Delai avant cacher curseur (ms) |

### Fragments

| Option | Defaut | Description |
|--------|--------|-------------|
| `fragments` | `true` | Active les fragments globalement |
| `fragmentInURL` | `true` | Fragment courant dans URL |

### Transitions

| Option | Defaut | Description |
|--------|--------|-------------|
| `transition` | `'slide'` | `'none'`, `'fade'`, `'slide'`, `'convex'`, `'concave'`, `'zoom'` |
| `transitionSpeed` | `'default'` | `'default'`, `'fast'`, `'slow'` |
| `backgroundTransition` | `'fade'` | Transition des backgrounds |

### Auto-animation

| Option | Defaut | Description |
|--------|--------|-------------|
| `autoAnimate` | `true` | Active Auto-Animate |
| `autoAnimateMatcher` | `null` | Function matcher custom |
| `autoAnimateEasing` | `'ease'` | Easing CSS |
| `autoAnimateDuration` | `1.0` | Duree en secondes |
| `autoAnimateUnmatched` | `true` | Anime aussi les elements non-matches |
| `autoAnimateStyles` | [array] | Proprietes CSS animables |

### Auto-slide

| Option | Defaut | Description |
|--------|--------|-------------|
| `autoSlide` | `0` | Auto-avance en ms (0 = off) |
| `autoSlideStoppable` | `true` | Stop si interaction user |
| `autoSlideMethod` | `null` | Methode custom de navigation |
| `defaultTiming` | `null` | Temps moyen par slide pour timer |

### Media et iframes

| Option | Defaut | Description |
|--------|--------|-------------|
| `autoPlayMedia` | `null` | Override autoplay video/audio |
| `preloadIframes` | `null` | Override preload iframes lazy |
| `preventIframeAutoFocus` | `true` | Empeche iframes de voler le focus |
| `previewLinks` | `false` | Ouvre liens en iframe preview |

### PDF export

| Option | Defaut | Description |
|--------|--------|-------------|
| `pdfMaxPagesPerSlide` | `Infinity` | Pages max par slide en PDF |
| `pdfSeparateFragments` | `true` | Une page par fragment |
| `pdfPageHeightOffset` | `-1` | Offset hauteur PDF |
| `showNotes` | `false` | Notes visibles. `true` ou `'separate-page'` |

### Performance

| Option | Defaut | Description |
|--------|--------|-------------|
| `viewDistance` | `3` | Slides preloaded autour de la courante |
| `mobileViewDistance` | `2` | Idem pour mobile (resource saving) |
| `focusBodyOnPageVisibilityChange` | `true` | Focus body sur visibilite |

### postMessage API

| Option | Defaut | Description |
|--------|--------|-------------|
| `postMessage` | `true` | Expose API via window.postMessage |
| `postMessageEvents` | `false` | Dispatch events au parent window |

## Exemple complet realiste

Config utilisee dans [propalgarcia/index.html](/Users/thomas/webflowlanding/propalgarcia/index.html) :

```javascript
Reveal.initialize({
  hash: true,                    // URL deeplink
  controls: true,
  progress: true,
  center: true,
  transition: 'slide',
  plugins: [RevealNotes]
});
```

Config pour presentation longue :

```javascript
Reveal.initialize({
  hash: true,
  slideNumber: 'c/t',            // "5/47"
  controlsTutorial: false,
  transition: 'slide',
  transitionSpeed: 'fast',
  backgroundTransition: 'fade',

  // Lazy load pour grandes presentations
  viewDistance: 3,
  mobileViewDistance: 2,

  // Auto-animate par defaut
  autoAnimate: true,
  autoAnimateDuration: 0.8,
  autoAnimateEasing: 'cubic-bezier(0.22, 1, 0.36, 1)',

  // Speaker notes en PDF separe
  showNotes: 'separate-page'
});
```

## Sources

- [revealjs.com/config](https://revealjs.com/config/) — liste officielle complete
- [revealjs.com/initialization](https://revealjs.com/initialization/) — patterns d'init
- [Asciidoctor reveal.js options](https://docs.asciidoctor.org/reveal.js-converter/latest/converter/revealjs-options/) — reference cross
