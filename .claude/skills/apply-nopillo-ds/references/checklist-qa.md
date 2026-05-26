# Checklist QA — Validation post-application

> À exécuter après les phases 1-5 du skill `apply-nopillo-ds`. Garantit que le DS est appliqué correctement et que le projet Astro démarre sans erreur.

## Checklist fichiers

- [ ] `<ASTRO_DIR>/src/styles/tokens.css` existe et fait > 200 lignes
- [ ] `<ASTRO_DIR>/tailwind.nopillo.preset.mjs` existe (si Tailwind détecté)
- [ ] `<ASTRO_DIR>/tailwind.config.mjs` (ou `.cjs`) importe le preset
- [ ] `<ASTRO_DIR>/src/layouts/Base.astro` (ou `Layout.astro`) contient :
  - [ ] `import "../styles/tokens.css";`
  - [ ] `<link rel="stylesheet" href="https://use.typekit.net/c1b0b72bff15bb9715f23b2ce31c51654439d865.css">`
- [ ] `<ASTRO_DIR>/src/components/nopillo/` contient les 6 fichiers :
  - [ ] `Button.astro`
  - [ ] `Header.astro`
  - [ ] `Footer.astro`
  - [ ] `Hero.astro`
  - [ ] `Card.astro`
  - [ ] `CtaSection.astro`
- [ ] `<ASTRO_DIR>/public/logo-nopillo.svg` existe

## Checklist tokens CSS

```bash
# Vérifier la présence des variables critiques
grep -E "^\s*--black:|^\s*--indigo-600:|^\s*--indigo-100:|^\s*--text-display-lg:|^\s*--font-display:" <ASTRO_DIR>/src/styles/tokens.css | wc -l
# Attendu : >= 5
```

- [ ] `--black: #09090B` présent
- [ ] `--indigo-600: #4033DB` présent
- [ ] `--indigo-100: #DEDAFF` présent
- [ ] `--font-display: futura-pt, sans-serif` présent
- [ ] `--container-regular: 1120px` présent
- [ ] `--radius-pill: 999px` présent

## Checklist dev server

```bash
cd <ASTRO_DIR> && npm run dev > /tmp/astro.log 2>&1 &
sleep 8
curl -sI http://localhost:4321 | head -1
```

- [ ] `HTTP/1.1 200 OK` au démarrage
- [ ] Pas d'erreur de build dans `/tmp/astro.log`
- [ ] Pas d'erreur 404 sur `/_astro/tokens.css`

## Checklist visuelle (manuelle)

À tester en créant une page test (ex: `src/pages/test-ds.astro`) :

```astro
---
import Header from '@/components/nopillo/Header.astro';
import Hero from '@/components/nopillo/Hero.astro';
import Card from '@/components/nopillo/Card.astro';
import CtaSection from '@/components/nopillo/CtaSection.astro';
import Footer from '@/components/nopillo/Footer.astro';
---
<html lang="fr">
  <head>
    <link rel="stylesheet" href="https://use.typekit.net/c1b0b72bff15bb9715f23b2ce31c51654439d865.css">
  </head>
  <body>
    <Header />
    <Hero headline="Test DS Nopillo" subheadline="Validation visuelle" ctaPrimaryLabel="OK" ctaPrimaryUrl="#" />
    <section style="padding: 80px 0;">
      <div style="max-width: 1120px; margin: 0 auto;">
        <Card variant="feature" title="Test feature" />
      </div>
    </section>
    <CtaSection headline="Prêt ?" ctaPrimaryLabel="Action" ctaPrimaryUrl="#" />
    <Footer />
  </body>
</html>
```

Visiter `http://localhost:4321/test-ds` et vérifier :

- [ ] Police H1 = Futura PT (police géométrique, pas system fallback)
- [ ] H1 ~60px sur desktop
- [ ] Bouton primary = pill noir (`#09090B`)
- [ ] Hero background = indigo soft (`#DEDAFF` ou variante)
- [ ] CTA section background = indigo électrique (`#4033DB`)
- [ ] Card border = 1px indigo-100 (`#DEDAFF`)
- [ ] Container max-width = 1120px
- [ ] Footer fond noir avec texte blanc

## Checklist responsive

À tester en réduisant la fenêtre :

- [ ] Mobile (< 768px) : Hero stack en 1 colonne
- [ ] Mobile : Header burger menu visible
- [ ] Mobile : Footer stack en 1 colonne
- [ ] Tablet (768-1024px) : Hero stack en 1 colonne (déclencher plus tôt si visuel lourd)
- [ ] Desktop (≥ 1024px) : tous les composants en grille comme prévu

## Checklist Lighthouse (optionnel)

```bash
npx lighthouse http://localhost:4321/test-ds --quiet --chrome-flags="--headless"
```

- [ ] Performance ≥ 85 (mobile)
- [ ] Accessibility ≥ 90
- [ ] Best practices ≥ 90
- [ ] LCP < 2.5s
- [ ] CLS < 0.1

## Rapport de qualité final

Score sur 10 :

| Critère | Points |
|---------|--------|
| Tous les fichiers présents (tokens, preset, layout, 6 composants, logo) | 2 |
| Tokens CSS contient les variables critiques | 1 |
| Dev server démarre sans erreur | 2 |
| Polices Futura PT chargent | 1 |
| Page test rend visuellement correct | 2 |
| Responsive mobile OK | 1 |
| Lighthouse Performance ≥ 85 | 1 |

**Score** :
- 9-10 : Application réussie
- 7-8 : Bon mais ajustements mineurs
- 5-6 : Fonctionnel mais ajustements requis
- < 5 : Échec, relancer le skill ou corriger manuellement

## Si erreurs

| Erreur | Cause probable | Action |
|--------|---------------|--------|
| `tokens.css 404` | Import path incorrect | Vérifier import dans `Base.astro` |
| Police = system fallback | Typekit non chargé | Vérifier le `<link>` dans `<head>` + accès kit ID |
| Tailwind classes ignorées | Preset non importé | Vérifier `presets: [nopilloPreset]` dans config |
| Variables CSS undefined | Import tokens.css manquant | Importer dans le layout ou global.css |
| Composant ne s'affiche pas | Path import incorrect | Vérifier path : `@/components/nopillo/...` ou `../components/nopillo/...` |
| Dev server crash | Conflit dépendances | `rm -rf node_modules && npm install` |
