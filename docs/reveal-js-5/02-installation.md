# Reveal.js 5 — Installation

## 3 modes au choix

| Mode | Pour qui | Build | Dependance |
|------|----------|-------|------------|
| Basic (ZIP/CDN) | Slide rapide, demo | Non | Aucune |
| Full (clone) | Customisation theme/build | Oui | Node 20.19+ |
| npm | Integration SPA/build | Oui | bundler (Vite/webpack) |

## Mode 1 — Basic (zero build)

### Via ZIP

```bash
curl -L https://github.com/hakimel/reveal.js/archive/master.zip -o reveal.zip
unzip reveal.zip
cd reveal.js-master
open index.html
```

Modifier `index.html` directement. Pas de serveur necessaire (sauf si on charge des fichiers Markdown externes).

### Via CDN (recommande pour prototype)

C'est l'approche utilisee dans [propalgarcia/index.html](/Users/thomas/webflowlanding/propalgarcia/index.html) :

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reveal.js@5/dist/reveal.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reveal.js@5/dist/theme/black.css">

<div class="reveal">
  <div class="slides">
    <section>Hello</section>
  </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/reveal.js@5/dist/reveal.js"></script>
<script src="https://cdn.jsdelivr.net/npm/reveal.js@5/plugin/notes/notes.js"></script>
<script>
  Reveal.initialize({
    hash: true,
    plugins: [RevealNotes]
  });
</script>
```

Avantages CDN : deployable n'importe ou (Netlify static, S3, GitHub Pages), pas de `node_modules`.

## Mode 2 — Full setup

Prerequis : **Node.js 20.19.0 ou plus recent**.

```bash
git clone https://github.com/hakimel/reveal.js.git
cd reveal.js
npm install
npm start
```

Acces : `http://localhost:8000`

### Changer le port

```bash
npm start -- --port=8001
```

### Build CSS (themes custom)

```bash
npm run build -- css-themes
```

> **Note v6** : la v6.0 passe de Gulp a Vite. En v5, c'est encore Gulp.

## Mode 3 — Installation npm

```bash
npm install reveal.js
# ou
yarn add reveal.js
```

### Usage ES modules

```javascript
import Reveal from 'reveal.js';
import Markdown from 'reveal.js/plugin/markdown';
import 'reveal.js/dist/reveal.css';
import 'reveal.js/dist/theme/black.css';

const deck = new Reveal({
  plugins: [Markdown],
});
deck.initialize();
```

### Avec Vite (Astro, React, Vue)

Importer le CSS directement dans le composant, le bundler s'occupe du reste. Compatible avec tous les frameworks modernes (verifie sur Astro, Next.js, Vite, Vue).

## Structure HTML minimale requise

```html
<div class="reveal">     <!-- container racine -->
  <div class="slides">   <!-- wrapper slides -->
    <section>...</section>
    <section>...</section>
  </div>
</div>
```

Sans cette hierarchie precise (`.reveal > .slides > section`), le moteur ne s'initialise pas.

## Verifications post-installation

```javascript
Reveal.initialize().then(() => {
  console.log('Total slides:', Reveal.getTotalSlides());
  console.log('Config:', Reveal.getConfig());
});
```

## Pieges courants

| Probleme | Cause | Solution |
|----------|-------|----------|
| Slides ne s'affichent pas | Manque `.slides` wrapper | Ajouter `<div class="slides">` |
| Markdown externe ne charge pas | Fichier:// CORS | Utiliser `npm start` ou serveur HTTP |
| Plugin non reconnu | Script avant `Reveal` | Charger `dist/reveal.js` AVANT plugin |
| CSS theme s'applique mal | Cascade override Reveal | Charger theme APRES `reveal.css` |

## Sources

- [revealjs.com/installation](https://revealjs.com/installation/) — guide officiel des 3 modes
- [npm reveal.js](https://www.npmjs.com/package/reveal.js) — package info
- [GitHub repo](https://github.com/hakimel/reveal.js) — source pour clone
