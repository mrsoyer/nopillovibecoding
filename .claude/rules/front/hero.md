---
paths:
  - "nopillo-landing-exemple/front/src/components/sections/Hero.astro"
---

# Rule : Hero.astro (above-the-fold, LCP-critical)

## Role
Section hero de la landing. Contient le headline DKI dynamique (via DKIHero island), 2 CTAs (primary noir + ghost), trust strip Trustpilot, et un mini-quiz mock 4 options a droite. Background indigo soft (`rgba(222,218,255,0.6)`).

## Type
Section Astro statique englobant 1 island React (`DKIHero`).

## Structure
- Grid 2 colonnes desktop (1.1fr / 1fr), stack mobile
- Colonne gauche :
  - `.badge-eyebrow` "Expert-comptable LMNP en ligne"
  - `<DKIHero client:load />` (H1 + sub-line dynamique)
  - 2 CTAs : `.btn-primary` (noir) + `.btn-ghost`
  - Trust strip : 5 etoiles + "4,7/5 sur 1 234 avis Trustpilot"
- Colonne droite :
  - `.hero-quiz` card : 4 options pill (revenus locatifs)
  - Click → trackEvent `hero_quiz_click` + scroll smooth vers `#contact`

## Dependances entrantes
- `nopillo-landing-exemple/front/src/pages/index.astro`

## Dependances sortantes
- `../DKIHero.tsx` (island React avec `client:load`)
- Tokens CSS : `--color-indigo-100`, `--color-brand-white`, `--font-display`, etc.
- Inline `<script>` quiz handler (vanilla JS, push dataLayer)

## Contraintes
- **LCP-critical** : c'est le 1er element peint above-the-fold. Ne pas ajouter d'images lourdes sans audit Lighthouse.
- **`client:load` justifie** : DKIHero doit s'hydrater immediatement pour remplacer le H1 statique avant que le user lise.
- **CTAs Nopillo** : `.btn-primary` est NOIR (#09090B), pas indigo. Cf DS Nopillo.
- **Quiz CTAs** : `data-quiz="..."` attribute lu par le inline script. Ne pas renommer sans update du script.
- **Trust score 4,7/5** : valeur affichee, doit matcher la valeur reelle Trustpilot (verifier periodiquement).

## A surveiller
- Si on ajoute une image hero a droite (au lieu du quiz) : utiliser `<Image>` d'Astro avec `loading="eager"` + `fetchpriority="high"` + WebP < 200KB.
- Si le quiz devient stateful (multi-step) : convertir en island React `client:idle` (pas critique).
- L'inline `<script>` quiz peut etre extrait en `useEffect` dans un mini-island si la logique grossit.
- Padding-top mobile/desktop different (80px vs 120px) : ne pas casser le fold mobile en ajoutant du content avant.
