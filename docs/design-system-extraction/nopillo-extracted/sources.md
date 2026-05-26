# Sources et Methodologie

## Source unique

| Element | Detail |
|---------|--------|
| **URL** | https://www.nopillo.com/ |
| **Date d'extraction** | 2026-05-05 |
| **Page** | Homepage uniquement (1 page sur ~30 du site) |
| **Methode** | Playwright MCP (`browser_evaluate`, `browser_take_screenshot`) |
| **Extracteur** | Claude Code via doc-maker skill |

## Methodologie d'extraction

### 1. Navigation et capture

```javascript
// Navigation a 1440x900 (desktop standard)
mcp__playwright__browser_navigate({ url: "https://www.nopillo.com/" })
mcp__playwright__browser_resize({ width: 1440, height: 900 })

// Captures
mcp__playwright__browser_take_screenshot({ fullPage: true, ... })
```

### 2. Extraction tokens via JavaScript

```javascript
// CSS variables sur :root
const styles = getComputedStyle(document.documentElement);
const cssVars = {};
for (let i = 0; i < styles.length; i++) {
  const prop = styles[i];
  if (prop.startsWith('--')) {
    cssVars[prop] = styles.getPropertyValue(prop).trim();
  }
}

// Distribution sur ~800 elements
const allEls = Array.from(document.querySelectorAll('*'));
allEls.slice(0, 800).forEach(el => {
  const s = getComputedStyle(el);
  // ... compter radius, shadow, padding, color, etc.
});
```

### 3. Inventaire composants

```javascript
// Boutons, cards, navbar, footer
document.querySelectorAll('a.button, button, [class*="button"]')
document.querySelectorAll('[class*="card"]')
document.querySelector('nav, [role="navigation"], [class*="navbar"]')
```

### 4. Telechargement assets

```bash
curl -sL "https://cdn.prod.website-files.com/.../697b6001fbb6f7d4ac9f8c38_nopillo-logo-final.svg" \
  -o assets/nopillo-logo.svg
```

## URLs CDN reelles

Toutes les ressources visuelles sont hostes sur le CDN Webflow Nopillo :

```
Base : https://cdn.prod.website-files.com/62efb778b7b092165085a6f6/
```

### Assets cles telecharges/identifies

| Ressource | Hash | Type |
|-----------|------|------|
| Logo principal | `697b6001fbb6f7d4ac9f8c38_nopillo-logo-final.svg` | SVG |
| Hero illustration bg | `68a7243c0583f4764ee2b3c7_..._Subtract1-2.webp` | WebP 1267×398 |
| Icone arrow | `697a406f775e8c9cd3f16a0e_arrow-icon.svg` | SVG 16×16 |
| Icone Calculator | `6931ab8e47d0ca023600c72b_Calculator.svg` | SVG (Phosphor) |
| Icone ChartPieSlice | `6931ab8e22afffaacaa75a99_ChartPieSlice.svg` | SVG (Phosphor) |
| Icone CalendarBlank | `6931ab8ea0adb3377ff92348_CalendarBlank.svg` | SVG (Phosphor) |
| Checkmark isometric | `6794efd49097b958603d80dc_isometric-checkmark%201.svg` | SVG isometric |
| Cross isometric | `6794efdb6b3bc7c2b206a7e0_isometric-cross%202.svg` | SVG isometric |

## Polices externes utilisees

| Police | Source | Kit ID |
|--------|--------|--------|
| Futura PT | Adobe Fonts (Typekit) | `c1b0b72bff15bb9715f23b2ce31c51654439d865` |
| Source Sans 3 | Google Fonts (via Axeptio) | (cookie banner uniquement) |

URL chargement : `https://use.typekit.net/c1b0b72bff15bb9715f23b2ce31c51654439d865.css`

## CSS principal Webflow

```
https://cdn.prod.website-files.com/62efb778b7b092165085a6f6/css/nopillo.webflow.shared.76b184fda.min.css
```

## Limites de l'extraction

### Ce qui est complet et fiable

✅ **CSS variables** : 88 variables extraites integralement de `:root`
✅ **Couleurs** : palette complete + comptes d'usage reels
✅ **Typography** : tailles, poids, line-heights effectivement utilises
✅ **Radius/shadows** : exhaustifs (3 shadows, 11 radius distincts)
✅ **Logo** : SVG telecharge integralement
✅ **Specs computed** : valeurs exactes des elements DOM

### Ce qui est partiel

⚠️ **Composants** : seule la **page d'accueil** a ete analysee — les pages internes (Tarifs, Blog, Simulateur) contiennent probablement d'autres composants/variantes
⚠️ **Etats interactifs** : hover, focus, active, disabled non captures (necessite simulation Playwright)
⚠️ **Mobile** : extraction faite a 1440px — variantes responsive non documentees
⚠️ **Animations Webflow** : declarees en JS (Webflow IX2), pas en CSS — non capturees
⚠️ **Dropdowns navbar** : structure listee mais styles internes non profondement extraits

### Ce qui n'a PAS ete extrait

❌ **Pages internes** : pricing, blog, simulateur, livres-blancs, etc.
❌ **Forms et inputs** : styles detailles non extraits
❌ **Notifications/toasts** : pas presents sur homepage
❌ **Modal/dialogs** : pas presents sur homepage (chat NopiBot existe mais c'est un widget tiers Livechat)
❌ **CMS Webflow** : variables custom Webflow Designer non accessibles

## Pour aller plus loin

### Etape suivante (rebuild complet)

Pour un audit DS exhaustif, lancer :
```javascript
// Sur chaque page principale
const pagesToAudit = [
  '/offre-lmnp-tarif',
  '/simulateur-economie-impots',
  '/blog',
  '/comparateur-lmnp-micro-bic-ou-reel',
  '/livres-blancs',
];
```

### Etats interactifs

Pour capturer hover/focus :
```javascript
mcp__playwright__browser_hover({ element: 'CTA primary', target: '.button_header-simulation' })
// puis re-evaluate getComputedStyle
```

### Responsive

Re-extraire a 375px (mobile) et 768px (tablet) pour les breakpoints :
```javascript
mcp__playwright__browser_resize({ width: 375, height: 812 })
```

## References pour reproduction

| Ressource | URL |
|-----------|-----|
| Phosphor Icons (icones detectees) | https://phosphoricons.com |
| Adobe Fonts Futura PT | https://fonts.adobe.com/fonts/futura-pt |
| Webflow CDN explanation | https://webflow.com/blog/cdn |
| DTCG format spec | https://design-tokens.github.io/community-group/format/ |

## Doc parente

Cette extraction s'inscrit dans la doc operationnelle Nopillo :
- [_index.md](../_index.md) — Pipeline aspiration DS
- [01-overview.md](../01-overview.md) — Pourquoi aspirer
- [02-outils-extraction.md](../02-outils-extraction.md) — Stack outils
- [03-tokens-extraction.md](../03-tokens-extraction.md) — Categories de tokens
- [06-anti-patterns-legal.md](../06-anti-patterns-legal.md) — **A LIRE** : limites legales

---

**Date** : 2026-05-05
**Extracteur** : doc-maker via Playwright MCP
**Maintainer** : equipe Nopillo
