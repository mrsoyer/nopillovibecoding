# Reveal.js 5 — Changelog

> Historique complet des releases v5.x. Source : [github.com/hakimel/reveal.js/releases](https://github.com/hakimel/reveal.js/releases).

## v5.2.1 — 28 mars 2026

### Lightbox

- Empeche les raccourcis Reveal pendant que la lightbox est ouverte
- Ouverture de lightbox iframe fonctionne avec tous types d'elements
- Persistance d'etat lightbox via `getState` / `setState`
- Synchronisation cross-window dans speaker view

### Fixes

- Conflits de layering avec l'overlay pause

## v5.2.0 — 19 mars 2026

### Lightbox (nouveau)

```html
<img data-preview-image src="thumb.jpg">
<video data-preview-video src="clip.mp4"></video>
```

- Fonctionne sur tout element HTML
- Customizable via `data-preview-fit`

### Controls speaker-only

```javascript
Reveal.initialize({ controls: 'speaker-only' });
```

Affiche les fleches uniquement dans la speaker view.

### Autres

- Upgrade Gulp 5.0
- Search API etendue : `closeSearch`, `toggleSearch`
- Math plugin ignore `<code>` par defaut
- Auto-animate ameliore pour matching de fragments

### Fixes

- Couverture viewport iOS via `100dvh`
- Background video restart pendant transitions de fragments
- Event `slidechange` sur derniere slide en scroll view

## v5.1.0 — 11 avril 2026

### Fullscreen trigger

```html
<button class="enter-fullscreen">Plein ecran</button>
```

N'importe quel element avec `.enter-fullscreen` declenche le mode fullscreen.

### Video backgrounds continus

Les videos en background continuent seamlessly entre slides consecutives (avant : restart a chaque slide).

### Fixes

- Compatibilite MathJax3 avec instances non-singleton
- Swipe gesture avec controles video visibles
- Restart video lors changement fragment
- Navigation RTL backward
- Question mark sur claviers non-anglophones

## v5.0.5 — 26 fevrier 2026

### Additions

- Navigation clavier dans scroll view
- F1 pour afficher l'help overlay

### Fixes

- **Securite** : XSS via postMessage corrigee
- Stack backgrounds en scroll view
- Fragment events en scroll view

## v5.0.4 — 22 decembre 2025

### Fixes

- Backgrounds manquants en scroll view mobile

## v5.0.3 — 18 decembre 2025

### Enhancements

- Search : support diacritiques et phrases completes
- Jump-to-slide adapte au format `slideNumber` configure
- **Securite** : XSS prevention dans slide backgrounds

### Fixes

- Speaker notes apparaissent dans PDF exports
- Navigation backward dans code highlights
- Mobile browser exceptions
- Pause/help overlay positioning en scroll view

## v5.0.2 — 9 novembre 2025

### Improvements

- Plugin Markdown peut tourner sans instance Reveal (utile pour pre-rendering)
- Updates de dependances

### Fixes

- Exceptions en speaker view
- Background vertical slide affichage premature

## v5.0.0 — 27 octobre 2025

Release majeure.

### Scroll View (nouveaute majeure)

Vue scrollable au lieu de pagination paginee.

```javascript
Reveal.initialize({ view: 'scroll' });
```

Ou via URL : `?view=scroll`.

Activation **automatique** sur viewports < 435px (mobile).

### Print view unifie

```javascript
Reveal.initialize({ view: 'print' });
```

URL query `?view=print` remplace `?print-pdf` (backward compatible).

### Fixes

- Notes via `data-notes` au niveau slide
- Remplacement listeners deprecates (mousewheel)

## Synthese des features v5

| Feature | Version |
|---------|---------|
| Scroll View | 5.0.0 |
| `view: 'print'` unifie | 5.0.0 |
| Fixes XSS slide backgrounds | 5.0.3 |
| Speaker notes en PDF | 5.0.3 |
| Search diacritiques | 5.0.3 |
| Keyboard nav scroll view | 5.0.5 |
| Help F1 | 5.0.5 |
| Fix XSS postMessage | 5.0.5 |
| Fullscreen trigger | 5.1.0 |
| Video backgrounds seamless | 5.1.0 |
| Lightbox | 5.2.0 |
| Controls speaker-only | 5.2.0 |
| iOS 100dvh fix | 5.2.0 |
| Search API extension | 5.2.0 |
| Math ignore `<code>` | 5.2.0 |
| Lightbox state persistence | 5.2.1 |

## Migration v4 -> v5

La documentation officielle **ne couvre pas** explicitement v4 -> v5. Mais l'API est largement compatible. Points d'attention :

### TypeScript types inclus

```diff
- npm uninstall @types/reveal.js
+ // Types inclus dans le package
```

Quelques noms de types changes : verifier les imports `Options`, `RevealStatic`.

### Notes via data-notes

Avant v5.0.0, `data-notes` fonctionnait uniquement sur les balises imbriquees. Maintenant aussi au niveau slide :

```html
<section data-notes="Note de la slide entiere">...</section>
```

### PDF view

Les deux URLs marchent :

```
?print-pdf       # v4 (encore supporte)
?view=print      # v5 recommande
```

### Pas de breaking change majeur

Le passage v4 -> v5 est principalement **additif**. Le code v4 fonctionne en v5 sans modification dans 99% des cas.

## Migration v5 -> v6 (pour info)

v6.0 (publie courant 2026) introduit :

- **Vite** remplace Gulp pour le build
- Reorganisation `plugin/markdown` -> `plugin/markdown/plugin`
- Quelques deprecation de types TypeScript

Cf [revealjs.com/upgrading](https://revealjs.com/upgrading/).

## Sources

- [GitHub Releases](https://github.com/hakimel/reveal.js/releases) — changelog officiel
- [revealjs.com/upgrading](https://revealjs.com/upgrading/) — guide d'upgrade
- [npm reveal.js versions](https://www.npmjs.com/package/reveal.js?activeTab=versions) — historique versions
