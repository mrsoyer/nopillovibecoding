# Slides Formation Vibecoding J1

> Presentation Reveal.js 5 + theme DS Nopillo. 18 slides theoriques (40 min) pour le module skill / rule / MCP / hook.

## Demarrage rapide

```bash
# Ouvrir en local
open slide/index.html

# Ou via serveur HTTP local (recommande pour PDF + Typekit)
cd slide && python3 -m http.server 8000
# Puis : http://localhost:8000
```

Pas de build, pas de `npm install`. Tout via CDN.

## Structure

```
slide/
├── index.html              # 18 slides + reveal.js init
├── theme/
│   ├── tokens.css          # 88 variables CSS DS Nopillo
│   └── nopillo.css         # Theme custom reveal.js
├── assets/
│   └── logo-nopillo.svg
└── notes/                  # (vide, notes embedded dans index.html)
```

## Navigation

| Raccourci | Action |
|---|---|
| `→` / `Espace` | Slide suivante |
| `←` | Slide precedente |
| `S` | **Mode speaker** (notes + timer dans nouvelle fenetre) |
| `F` | Plein ecran |
| `Esc` | Vue d'ensemble (grid) |
| `B` / `.` | Ecran noir (pause demo) |
| `?` | Aide complete |

## Mode speaker (touche `S`)

**Ouvre une 2eme fenetre** avec :
- Slide courante + slide suivante
- Tes notes (`<aside class="notes">`)
- Timer / chronometre
- Numero de slide

> Best pratique : ecran 1 pour les participants, ecran 2 (laptop) pour toi en mode speaker.

## Export PDF

1. Ouvrir avec `?print-pdf` dans l'URL :
   ```
   http://localhost:8000/?print-pdf
   ```
2. Attendre que tout charge (~3 sec)
3. `Cmd+P` (Mac) ou `Ctrl+P` (Windows)
4. Settings recommandes :
   - Destination : Save as PDF
   - Layout : Landscape (paysage)
   - Margins : None
   - Background graphics : **ON**
   - Scale : 100%

Resultat : 1 PDF, 18 pages, vectoriel (texte selectionnable).

## Edition des slides

Tout est dans `index.html`. Chaque slide est une `<section>` :

```html
<section>
  <h2>Titre slide</h2>
  <p>Contenu...</p>

  <aside class="notes">
    Notes orales pour le formateur (visibles en mode speaker uniquement).
  </aside>
</section>
```

Pour ajouter une slide : copier une `<section>` existante, modifier, et reveal.js detecte automatiquement.

### Classes CSS disponibles (theme Nopillo)

| Classe | Usage |
|---|---|
| `.slide-titre` | Layout slide titre centree |
| `.slide-methodo` | Layout slides 14-15 methodologie |
| `.slide-recap` | Layout slide 18 finale |
| `.card` | Encadre blanc avec border indigo-100 |
| `.card-soft` | Encadre indigo-100 |
| `.card-dark` | Encadre graycool-900 (texte blanc) |
| `.frame-primary` | Frame avec border indigo 24px radius |
| `.pill .pill-primary` | Badge pill indigo |
| `.pill .pill-soft` | Badge pill indigo soft |
| `.pill .pill-mint` | Badge pill mint vert |
| `.two-col` / `.three-col` / `.four-col` | Grilles |
| `.center` | Texte centre |
| `.muted` | Texte gris secondaire |
| `.pipeline-step.step-1..4` | Boites pipeline (slide 15) |
| `.antipattern` | Layout anti-pattern (slide 16) |
| `.decision-tree` | Bloc decision tree (slide 12) |

## Adobe Typekit Futura PT

Le theme utilise **Futura PT** via Adobe Typekit :

```html
<link rel="stylesheet" href="https://use.typekit.net/c1b0b72bff15bb9715f23b2ce31c51654439d865.css">
```

⚠️ **Le kit est domain-lock** Nopillo. En local (`file://`) il retourne 404. C'est normal.

**Fallback automatique** : si Typekit echoue, le CSS bascule sur `'Futura', 'Avenir Next', system-ui`.

Sur Mac : **Futura native** (parfaitement OK).
Sur Windows : Avenir Next (legerement degrade mais lisible).

**Pour reactiver Futura PT en local** : servir via `localhost` (Adobe autorise localhost en general) :
```bash
cd slide && python3 -m http.server 8000
# http://localhost:8000 → Typekit OK
```

Si tu veux **utiliser TON propre kit** : remplacer le kit ID dans `<link href="...">` de `index.html`.

## Deploy Netlify (optionnel)

Si tu veux la presentation accessible en ligne :

```bash
# Depuis le dossier slide/
netlify deploy --dir=. --prod
```

Ou via Netlify drop : drag-drop le dossier `slide/` sur https://app.netlify.com/drop.

URL resultante : `https://[nom-aleatoire].netlify.app` → renomable en `slides.nopillo.com`.

## Modifier le contenu des slides

Le contenu source des 18 slides est documente dans :
- [docs/cours-formation-vibecoding-j1/07-slides-theorie.md](../docs/cours-formation-vibecoding-j1/07-slides-theorie.md)

Pour modifier le fond pedagogique d'une slide :
1. Modifier le `.md` source
2. Reporter les changements dans `slide/index.html`

## Architecture

| Layer | Choix |
|---|---|
| Framework | Reveal.js 5 (CDN, zero-build) |
| Theme base | white.css (override par nopillo.css) |
| Tokens DS | 88 variables CSS depuis nopillo.com |
| Typo | Futura PT (Adobe Typekit) + fallback Futura |
| Code highlight | RevealHighlight + theme Monokai |
| Notes | RevealNotes plugin (mode speaker) |

Voir [docs/cdc-slides-theorie/01-specs.md](../docs/cdc-slides-theorie/01-specs.md) pour le detail technique.

## Anti-patterns evites

- ❌ `npm install` (CDN suffit)
- ❌ Build step (HTML statique)
- ❌ Code blocks > 15 lignes (illisible projete)
- ❌ Theme custom complet (override ciblee)
- ❌ Slides sans speaker notes (formateur improvise)

## Reglages reveal.js

Dans `index.html`, fonction `Reveal.initialize()` :

```javascript
{
  hash: true,                  // URL = #/slide-3 (deeplink)
  slideNumber: 'c/t',          // Affiche 5/18 en bas
  transition: 'slide',         // Transition douce
  controls: true,              // Fleches navigation
  progress: true,              // Barre de progression
  center: true,                // Vertical center
  touch: true,                 // Swipe mobile
  width: 1280,                 // Resolution cible
  height: 800,
  margin: 0.08
}
```

Voir [docs/reveal-js-5/04-configuration.md](../docs/reveal-js-5/04-configuration.md) pour les 60+ options.

## Sources

- Contenu : [docs/cours-formation-vibecoding-j1/07-slides-theorie.md](../docs/cours-formation-vibecoding-j1/07-slides-theorie.md)
- CDC : [docs/cdc-slides-theorie/](../docs/cdc-slides-theorie/)
- Theme DS : [.claude/skills/apply-nopillo-ds/](../.claude/skills/apply-nopillo-ds/)
- Reveal.js docs : [docs/reveal-js-5/](../docs/reveal-js-5/)

## Aide

- Reveal.js : https://revealjs.com/
- Bug / question : thomas@feaderz.co
