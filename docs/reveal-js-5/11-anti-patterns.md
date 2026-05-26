# Reveal.js 5 — Anti-Patterns et Erreurs Frequentes

> Ce qu'il NE faut PAS faire, et pourquoi.

## Structure HTML

### Oublier le wrapper `.slides`

```html
<!-- MAL -->
<div class="reveal">
  <section>Slide 1</section>
  <section>Slide 2</section>
</div>

<!-- BON -->
<div class="reveal">
  <div class="slides">
    <section>Slide 1</section>
    <section>Slide 2</section>
  </div>
</div>
```

**Pourquoi** : sans `.slides`, Reveal ne trouve pas ses slides et le moteur ne s'initialise pas.

### Utiliser `<div>` au lieu de `<section>`

```html
<!-- MAL -->
<div class="slides">
  <div>Pas reconnue comme slide</div>
</div>

<!-- BON -->
<div class="slides">
  <section>Slide reconnue</section>
</div>
```

**Pourquoi** : Reveal scanne uniquement les `<section>` enfants directs de `.slides`.

### Triple imbrication de sections

```html
<!-- MAL : 3 niveaux -->
<section>
  <section>
    <section>Trop profond, pas reconnue</section>
  </section>
</section>

<!-- BON : max 2 niveaux -->
<section>
  <section>Niveau vertical OK</section>
</section>
```

**Pourquoi** : Reveal supporte uniquement 2 niveaux (horizontal + vertical), pas plus.

## Chargement des assets

### Plugin charge avant `reveal.js`

```html
<!-- MAL -->
<script src="dist/plugin/markdown.js"></script>
<script src="dist/reveal.js"></script>

<!-- BON -->
<script src="dist/reveal.js"></script>
<script src="dist/plugin/markdown.js"></script>
```

**Pourquoi** : les plugins reference `Reveal` qui doit exister au moment du chargement.

### Theme charge avant `reveal.css`

```html
<!-- MAL : theme va etre override par reveal.css -->
<link rel="stylesheet" href="dist/theme/black.css">
<link rel="stylesheet" href="dist/reveal.css">

<!-- BON -->
<link rel="stylesheet" href="dist/reveal.css">
<link rel="stylesheet" href="dist/theme/black.css">
```

**Pourquoi** : le CSS cascade, le theme doit venir apres pour gagner.

### Plugins en strings au lieu d'objets

```javascript
// MAL
Reveal.initialize({ plugins: ['markdown', 'highlight'] });

// BON
Reveal.initialize({ plugins: [RevealMarkdown, RevealHighlight] });
```

**Pourquoi** : Reveal attend des objets plugin, pas des strings.

## Configuration

### `showNotes` en config init au lieu de configure

```javascript
// MAL : showNotes affiche les notes pour tout le monde pendant la presentation
Reveal.initialize({ showNotes: true });

// BON : activer uniquement en mode print
Reveal.initialize({});

if (window.location.search.includes('print-pdf')) {
  Reveal.configure({ showNotes: 'separate-page' });
}
```

**Pourquoi** : `showNotes: true` rend les notes visibles dans la vue principale aussi, pas seulement le PDF.

### `autoSlide` sans `autoSlideStoppable: false`

Pour un mode kiosque qui ne s'arrete jamais :

```javascript
Reveal.initialize({ autoSlide: 3000, autoSlideStoppable: false, loop: true });
```

Par defaut, toute interaction (touche, click, swipe) stoppe l'auto-slide.

### Embedded sans CSS sizing

Sans `width`/`height` sur le container, Reveal occupe tout le viewport. En mode embedded, toujours definir explicitement les dimensions CSS du `.reveal`.

### Multi-instance sans `keyboardCondition`

Sans `keyboardCondition: 'focused'`, presser fleche droite avance toutes les decks de la page en meme temps.

```javascript
const cfg = { embedded: true, keyboardCondition: 'focused' };
new Reveal(el1, cfg).initialize();
new Reveal(el2, cfg).initialize();
```

## Export PDF

### Imprimer depuis Safari/Firefox

```bash
# MAL : ouvrir Safari et imprimer
# Les transitions, fragments et backgrounds sortent cabosses

# BON : utiliser Chrome ou Chromium
google-chrome http://localhost:8000/?print-pdf
```

**Pourquoi** : Reveal's print stylesheet utilise des features CSS supportees uniquement par Chromium.

### Oublier "Background graphics" dans le dialog d'impression

Symptome : PDF avec fond blanc au lieu du theme.

**Solution** : Dans le dialog d'impression, cocher "Background graphics" / "Imprimer les images d'arriere-plan".

### `file://` pour le PDF export

```bash
# MAL
open index.html?print-pdf
# Erreurs CORS, plugins ne chargent pas

# BON
npx serve .
# Puis http://localhost:3000/?print-pdf
```

## Fragments

### Trop de fragments par slide

Au-dela de 5 fragments par slide, l'audience perd le fil. Decoupe en plusieurs slides.

### Index `data-fragment-index` identiques involontaires

Meme index = apparition simultanee. Verifier explicitement quand on utilise `data-fragment-index`.

## Performance

### Loader 200 slides sans `viewDistance`

```javascript
// MAL : 200 slides preloaded en RAM
Reveal.initialize({});

// BON : viewDistance limite le preload
Reveal.initialize({
  viewDistance: 2,
  mobileViewDistance: 1
});
```

**Pourquoi** : avec `viewDistance: 3` (defaut), 7 slides en RAM. Sur mobile avec 100+ slides, ca lague.

### Images lourdes en `src` au lieu de `data-src`

```html
<!-- MAL : toutes les images chargees au load -->
<img src="big-photo.jpg">

<!-- BON : lazy load -->
<img data-src="big-photo.jpg">
```

**Pourquoi** : Reveal charge les `data-src` uniquement quand la slide approche.

### iframes en eager loading

```html
<!-- MAL : iframe lourde chargee meme si jamais visitee -->
<iframe src="https://heavy-page.com"></iframe>

<!-- BON -->
<iframe data-src="https://heavy-page.com"></iframe>
```

## Speaker view

### Oublier le plugin Notes

Sans `plugins: [RevealNotes]`, la touche S ne fait rien.

### Notes dans une slide vide

Une `<aside class="notes">` sans contenu de slide est inaccessible : il faut au moins un `<h1>` ou paragraphe visible pour atteindre la slide.

## CSS et theming

### `!important` sur les vars `--r-*`

```css
/* MAL : sur-utilisation de !important */
:root {
  --r-main-color: white !important;
  --r-background-color: black !important;
}

/* BON : sans !important */
:root {
  --r-main-color: white;
  --r-background-color: black;
}
```

**Pourquoi** : les CSS vars sont scoped correctement, `!important` casse la cascade pour rien.

### Selecteurs sans `.reveal` prefix

```css
/* MAL : risque de conflit avec le reste du site */
h1 { color: red; }
section { padding: 20px; }

/* BON : scope a Reveal */
.reveal h1 { color: red; }
.reveal .slides section { padding: 20px; }
```

**Pourquoi** : si Reveal est embedded dans une page, ces styles fuient.

## Securite

### `data-background-iframe` avec URL user-controlled

XSS potentiel si l'URL vient d'un input externe. Toujours valider/sanitize. Reveal a corrige des XSS via `data-background` (v5.0.3) et postMessage (v5.0.5), mais cela ne dispense pas de valider les inputs cote app.

### Notes sensibles dans presentation publique

Les `<aside class="notes">` sont dans le HTML source : accessibles par toute personne qui ouvre la page. Ne jamais y mettre de secrets (mots de passe, cles API).

## Sources

- Compilation issues GitHub, blog posts et observations terrain
- [revealjs.com/config](https://revealjs.com/config/) — defaut values reference
- [GitHub Issues](https://github.com/hakimel/reveal.js/issues) — pieges connus
