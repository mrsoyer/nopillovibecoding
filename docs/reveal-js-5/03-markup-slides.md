# Reveal.js 5 — Structure HTML et Slides

## Hierarchie obligatoire

```html
<div class="reveal">
  <div class="slides">
    <section>...</section>
  </div>
</div>
```

3 niveaux strictement requis : `.reveal` (container) > `.slides` (wrapper) > `section` (slide individuelle).

## Slide simple (horizontale)

```html
<section>
  <h1>Titre</h1>
  <p>Contenu</p>
</section>
```

Chaque `<section>` au premier niveau de `.slides` = une slide horizontale. Navigation : flecheS gauche/droite ou espace.

## Slides verticales (nested)

Pour grouper logiquement plusieurs slides liees :

```html
<section>Slide horizontale 1</section>

<section>
  <section>Sous-slide A</section>
  <section>Sous-slide B</section>
  <section>Sous-slide C</section>
</section>

<section>Slide horizontale 2</section>
```

Navigation :
- **Gauche/Droite** : entre stacks horizontaux
- **Haut/Bas** : dans un stack vertical
- **Espace** : sequentiel (passe par tout)

Quand utiliser : contenu optionnel (que tu peux skipper pendant la presentation), regroupement thematique (acte 1.1, 1.2, 1.3).

## Modes de navigation

Configurer via `navigationMode` :

| Mode | Comportement |
|------|--------------|
| `'default'` | Comme decrit ci-dessus |
| `'linear'` | Pas de haut/bas, tout devient horizontal lineaire |
| `'grid'` | Conserve l'index vertical entre stacks (1.3 -> 2.3 et non 2.1) |

```javascript
Reveal.initialize({ navigationMode: 'linear' });
```

## Backgrounds par slide

```html
<!-- Couleur -->
<section data-background-color="#1a1a1a">...</section>

<!-- Image -->
<section data-background-image="bg.jpg">...</section>

<!-- Video -->
<section data-background-video="loop.mp4" data-background-video-loop>...</section>

<!-- Iframe (page web en fond) -->
<section data-background-iframe="https://example.com">...</section>

<!-- Gradient -->
<section data-background-gradient="linear-gradient(to bottom, #283b95, #17b2c3)">...</section>
```

### Options background video

```html
<section
  data-background-video="clip.mp4"
  data-background-video-loop
  data-background-video-muted
  data-background-size="cover">
</section>
```

Depuis **v5.1.0** : les videos en background continuent seamlessly entre slides consecutives. Depuis **v5.2.0** : les videos muted en speaker view autoplay aussi.

## Markdown dans une slide

Avec le plugin Markdown active :

```html
<section data-markdown>
  <textarea data-template>
    ## Titre Markdown
    - Item 1
    - Item 2

    Note: Ceci est une note speaker.
  </textarea>
</section>
```

Ou fichier externe :

```html
<section data-markdown="slides.md"
         data-separator="^\n---\n$"
         data-separator-vertical="^\n--\n$">
</section>
```

## Lightbox (v5.2.0+)

Click sur une image/video pour la voir en grand :

```html
<img data-preview-image src="thumb.jpg" alt="Photo">
<video data-preview-video src="clip.mp4"></video>

<!-- Fit options -->
<img data-preview-image data-preview-fit="contain" src="photo.jpg">
```

## Fullscreen sur element (v5.1.0+)

Classe `.enter-fullscreen` permet a tout element de declencher le plein ecran :

```html
<button class="enter-fullscreen">Plein ecran</button>
```

## Speaker notes

3 methodes :

```html
<!-- 1. Aside (recommande) -->
<section>
  Contenu
  <aside class="notes">
    Notes privees visibles uniquement en speaker view (touche S).
  </aside>
</section>

<!-- 2. Attribut -->
<section data-notes="Note rapide">...</section>

<!-- 3. Markdown -->
<section data-markdown>
  <textarea data-template>
    Contenu visible

    Note: Note speaker
  </textarea>
</section>
```

## Attributs `data-*` de slide

| Attribut | Effet |
|----------|-------|
| `data-transition="zoom"` | Transition specifique a cette slide |
| `data-transition-speed="fast"` | Vitesse : default/fast/slow |
| `data-background-transition="fade"` | Transition du background |
| `data-visibility="hidden"` | Cache la slide |
| `data-visibility="uncounted"` | Visible mais non comptee |
| `data-auto-animate` | Active Auto-Animate vers la slide suivante |
| `data-autoslide="5000"` | Override autoSlide en ms |

## Anti-patterns

```html
<!-- MAL : section sans .slides parent -->
<div class="reveal">
  <section>...</section>
</div>

<!-- MAL : double imbrication -->
<section>
  <section>
    <section>Trop profond</section>
  </section>
</section>

<!-- MAL : div au lieu de section -->
<div class="slides">
  <div>Pas reconnue comme slide</div>
</div>
```

## Sources

- [revealjs.com/markup](https://revealjs.com/markup/) — structure HTML
- [revealjs.com/vertical-slides](https://revealjs.com/vertical-slides/) — slides verticales
- [revealjs.com/backgrounds](https://revealjs.com/backgrounds/) — backgrounds
- [revealjs.com/speaker-view](https://revealjs.com/speaker-view/) — speaker notes
