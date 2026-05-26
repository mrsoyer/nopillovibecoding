# Reveal.js 5 — Fragments, Transitions, Auto-Animate

> Les 3 mecanismes d'animation : **fragments** (intra-slide), **transitions** (inter-slides), **Auto-Animate** (morphing entre slides).

## Sommaire

1. [Fragments — reveler element par element](#fragments)
2. [Transitions — passer d'une slide a l'autre](#transitions)
3. [Auto-Animate — morphing CSS automatique](#auto-animate)

## Fragments

Reveler ou animer un element sur la slide courante avant de passer a la suivante.

### Syntaxe de base

```html
<section>
  <p class="fragment">J'apparais au clic suivant</p>
  <p class="fragment">Puis moi</p>
  <p class="fragment">Et enfin moi</p>
</section>
```

### Styles de fragment disponibles

| Classe | Effet |
|--------|-------|
| `fragment` (defaut) | Fade in |
| `fade-in` | Fade in (explicit) |
| `fade-out` | Demarre visible, fade out |
| `fade-up` | Slide up + fade in |
| `fade-down` | Slide down + fade in |
| `fade-left` | Slide left + fade in |
| `fade-right` | Slide right + fade in |
| `fade-in-then-out` | Fade in, puis out a l'etape suivante |
| `current-visible` | Synonyme de fade-in-then-out |
| `fade-in-then-semi-out` | Fade in, puis 50% opacity |
| `semi-fade-out` | Fade vers 50% opacity |
| `grow` | Scale up |
| `shrink` | Scale down |
| `strike` | Strike through |
| `highlight-red` | Texte rouge |
| `highlight-green` | Texte vert |
| `highlight-blue` | Texte bleu |
| `highlight-current-red` | Rouge a l'apparition, redevient normal |
| `highlight-current-green` | Idem vert |
| `highlight-current-blue` | Idem bleu |

### Exemples concrets

```html
<!-- Reveal incremental simple -->
<ul>
  <li class="fragment">Point 1</li>
  <li class="fragment">Point 2</li>
  <li class="fragment">Point 3</li>
</ul>

<!-- Combinaisons -->
<p class="fragment fade-up">Slide vers le haut en apparaissant</p>
<p class="fragment highlight-red">Texte rouge a l'apparition</p>

<!-- Apparition puis disparition -->
<p class="fragment fade-in-then-out">
  Je clignote une fois
</p>
```

### Controler l'ordre

```html
<p class="fragment" data-fragment-index="3">Dernier</p>
<p class="fragment" data-fragment-index="1">Premier</p>
<p class="fragment" data-fragment-index="2">Deuxieme</p>
```

Plusieurs fragments avec le **meme index** apparaissent ensemble :

```html
<p class="fragment" data-fragment-index="1">Apparait avec...</p>
<p class="fragment" data-fragment-index="1">...moi (meme temps)</p>
```

### Fragments custom

Definir CSS pour `.fragment.monstyle` (etat initial) et `.fragment.monstyle.visible` (etat visible) :

```css
.fragment.rotate-in {
  transform: rotate(-90deg);
  opacity: 0;
  transition: all 0.5s ease-out;
}
.fragment.rotate-in.visible {
  transform: rotate(0);
  opacity: 1;
}
```

```html
<p class="fragment rotate-in">Rotation custom</p>
```

### Events fragments

```javascript
Reveal.on('fragmentshown', (event) => {
  console.log('Fragment affiche:', event.fragment);
});

Reveal.on('fragmenthidden', (event) => {
  console.log('Fragment cache:', event.fragment);
});
```

## Transitions

### Types disponibles

| Valeur | Comportement |
|--------|--------------|
| `none` | Pas de transition (cut instant) |
| `fade` | Cross-fade (defaut backgrounds) |
| `slide` | Glissement lateral (defaut slides) |
| `convex` | Angle convexe |
| `concave` | Angle concave |
| `zoom` | Scale up depuis le centre |

### Vitesses

`default`, `fast`, `slow` (via `data-transition-speed` ou config).

### Application globale

```javascript
Reveal.initialize({
  transition: 'slide',
  transitionSpeed: 'default',
  backgroundTransition: 'fade'
});
```

### Override par slide

```html
<section data-transition="zoom">
  Cette slide arrive en zoom
</section>

<section data-transition-speed="fast">
  Transition rapide
</section>

<section data-background-transition="slide">
  Background slide au lieu de fade
</section>
```

### Transitions in/out separees

Append `-in` ou `-out` aux noms :

```html
<section data-transition="slide-in fade-out">
  Entre en slide, sort en fade
</section>
```

### Desactiver toutes les transitions

Pour mode "presentation rapide" :

```javascript
Reveal.initialize({ transition: 'none' });
```

Ou via classe sur une slide :

```html
<section class="no-transition">...</section>
```

## Auto-Animate

Anime automatiquement les elements communs entre 2 slides consecutives. Magie CSS-FLIP.

### Activation

```html
<section data-auto-animate>
  <h1 style="font-size: 1em">Titre</h1>
</section>

<section data-auto-animate>
  <h1 style="font-size: 3em; color: red">Titre</h1>
</section>
```

Le titre va grossir et virer au rouge **automatiquement** entre les 2 slides.

### Proprietes animables

- Position : `top`, `left`, `transform`, `margin`, `padding`
- Typo : `font-size`, `line-height`, `letter-spacing`, `color`
- Fond : `background-color`, `border-radius`, `box-shadow`
- Tout ce qui est CSS-animable

### Matching automatique

L'algorithme matche par :
1. **Type de noeud** identique (`h1` matche `h1`)
2. **Texte identique** ("Hello" matche "Hello")
3. **Attribut `src`** pour les medias
4. **Ordre DOM** en cas d'ambiguite

### Matching manuel via data-id

```html
<section data-auto-animate>
  <p data-id="rouge" style="background: red">Box A</p>
  <p data-id="bleu" style="background: blue">Box B</p>
</section>

<section data-auto-animate>
  <!-- Inverse l'ordre, mais Reveal sait que rouge=rouge -->
  <p data-id="bleu" style="background: blue; transform: scale(2)">Box B agrandie</p>
  <p data-id="rouge" style="background: red">Box A</p>
</section>
```

### Options par slide

```html
<section data-auto-animate
         data-auto-animate-easing="cubic-bezier(0.22, 1, 0.36, 1)"
         data-auto-animate-duration="1.5"
         data-auto-animate-delay="0.2"
         data-auto-animate-unmatched="false">
  ...
</section>
```

### Groupes et restart

```html
<!-- Groupe A et B animent independamment -->
<section data-auto-animate data-auto-animate-id="groupA">...</section>
<section data-auto-animate data-auto-animate-id="groupA">...</section>

<!-- Restart : ne pas animer depuis la slide precedente -->
<section data-auto-animate data-auto-animate-restart>...</section>
```

### Event

```javascript
Reveal.on('autoanimate', (event) => {
  console.log('Source:', event.previousSlide);
  console.log('Target:', event.currentSlide);
});
```

### Cas d'usage typique : evolution de code

```html
<section data-auto-animate>
  <pre><code data-trim>
    function hello() {
      return "world";
    }
  </code></pre>
</section>

<section data-auto-animate>
  <pre><code data-trim>
    function hello(name) {       // ajout param
      return `Hello ${name}!`;   // template literal
    }
  </code></pre>
</section>
```

Avec le plugin highlight, les lignes ajoutees/modifiees sont animees.

## Sources

- [revealjs.com/fragments](https://revealjs.com/fragments/) — liste fragments
- [revealjs.com/transitions](https://revealjs.com/transitions/) — transitions
- [revealjs.com/auto-animate](https://revealjs.com/auto-animate/) — auto-animate
