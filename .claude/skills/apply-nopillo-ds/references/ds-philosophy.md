# DS Philosophy — Tonalité visuelle Nopillo

> À lire avant de générer ou modifier un composant Nopillo. Permet de comprendre les choix et de juger les cas limites.

## Identité de marque

Nopillo = plateforme française **déclaration fiscale LMNP** (location meublée non professionnelle).

Tagline : *"Votre déclaration LMNP. Simplifiée. Optimisée."*

Le DS sert 3 messages :

1. **Pédagogie** — illustrations isométriques, chiffres mis en avant, sections "Comment ça marche"
2. **Confiance** — reviews clients, chiffres clés (24M€ économisés, 12000 clients, 95% satisfaction), badges
3. **Action** — CTAs noirs high-contrast + outline secondaires, simulateurs interactifs

## 6 traits signature (ce qui rend le DS reconnaissable)

| Trait | Détail | À ne jamais casser |
|-------|--------|-------------------|
| 1. Black chaleureux | `#09090B` jamais `#000` pur | Tester sur 5 écrans : ne pas perdre la chaleur |
| 2. Indigo électrique | `#4033DB` (pas le bleu corporate générique) | Couleur la plus identifiable, à utiliser comme accent |
| 3. Pills systématiques | Tous les CTAs en `border-radius: 999px` | Pas de boutons rectangulaires sur CTA principal |
| 4. Cards translucides 16px | `rgba(255,255,255,0.3)` + border indigo-100 | Reconnaissable au premier coup d'œil |
| 5. Container 1120px | Étroit (vs 1280-1440px standards) | Effet magazine, pas SaaS industrial |
| 6. Display Futura PT 60px | H1 hero massif, weight 700, LH 72px | Impact visuel hero — ne pas réduire en dessous de 48px |

## Hiérarchie de couleurs (par fréquence d'usage réelle)

D'après l'extraction sur 800+ éléments du DOM nopillo.com :

```
Texte par défaut    : --black (#09090B) — 662 occurrences
Backgrounds         : white (alpha 30%) + white solid — 43 occurrences
Highlight bg        : --indigo-100 (#DEDAFF) — 10 occurrences
CTA bg              : --black solid — 10 occurrences
CTA bg (variante)   : --indigo-600 (#4033DB) — 8 occurrences
Badges success      : --secondary-600 (#0CC28C) — 2 occurrences
```

**Pattern d'alternance des sections** :
1. Section neutre : `#FFF` ou `--neutral-50`
2. Section soft : `--indigo-100` 60% opacity
3. Section accent : `--indigo-100` 100%
4. Section CTA finale : `--indigo-600` avec texte blanc

## Sources d'inspiration visuelle détectées

L'esthétique évoque :

- **Stripe** — typographie géométrique, indigo, cards subtiles
- **Linear** — radius 16px, neutres soft
- **Notion** — illustrations isométriques figuratives

**Mais avec une touche française immobilière** : palette plus chaleureuse (orange headband, vert mint, indigo soft) vs indigo cold de Stripe.

## Anti-patterns observés (à ne PAS reproduire)

### 1. Tailles fractionnaires

`59.2px`, `18.4px`, `22.4px`, `23.008px`, `57.008px` — Webflow injecte des valeurs em-converties imprécises.

**Dans nos composants Astro** : arrondir à 60px / 18px / 22px / 23px / 57px.

### 2. Mix de polices sans règle

Splinesans utilisé sur 1-2 classes LP uniquement. Ajouter une seconde police = charge réseau pour usage marginal.

**Dans nos composants Astro** : Futura PT uniquement. Ignorer Splinesans.

### 3. Classes typographiques trop spécifiques

`news-header_component-title`, `chart_titles`, `title_avis`... Manque d'abstraction.

**Dans nos composants Astro** : 6-8 classes utilities (`text-h1`, `text-body-lg`...).

### 4. Transition `all 0.3s ease` partout

Peut déclencher transitions inutiles sur layout.

**Dans nos composants Astro** : transitions explicites :

```css
transition: background-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
```

### 5. Border 1px white sur bouton noir

Visible sur certains backgrounds, incohérent.

**Dans nos composants Astro** : pas de border par défaut sur bouton primary. Conditional (sur dark bg uniquement).

## Adobe Typekit — gestion du fallback

**Kit Nopillo officiel** : `c1b0b72bff15bb9715f23b2ce31c51654439d865`

Variantes chargées :
- 300, 400, 500, 600, 700, 800 (regular + italics)
- `--font-display` (futura-pt) + `--font-body` (Futura PT system stack)

**Si pas d'accès au kit Nopillo** (formation, clients différents) :

Option 1 — Utiliser Futura PT via Adobe Fonts d'un autre compte :
```html
<link rel="stylesheet" href="https://use.typekit.net/<TON_KIT_ID>.css">
```

Option 2 — Fallback system fonts (DS dégradé mais cohérent) :
```css
--font-display: 'Futura', 'Avenir Next', 'Trebuchet MS', sans-serif;
--font-body: 'Futura', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
```

Option 3 — Self-host Futura PT (nécessite licence Linotype/Monotype).

## Modes layout

- **Mobile-first** : LCP < 2s priorité, hero stack en 1 colonne mobile
- **Pas de mode dark** : DS Nopillo est light-only (cohérence marque)
- **Breakpoints** : mobile 320 / tablet 768 / desktop 1024 / wide 1280

## Source canonique

`docs/design-system-extraction/nopillo-extracted/01-overview.md`

Date extraction : 2026-05-05 via Playwright MCP.
