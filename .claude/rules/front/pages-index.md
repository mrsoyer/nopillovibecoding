---
paths:
  - "nopillo-landing-exemple/front/src/pages/index.astro"
---

# Rule : pages/index.astro

## Role
Page d'accueil (et unique page) de la landing Nopillo. Assemble 11 sections dans l'ordre Hero → StatsBar → TrustBand → ProblemSolution → Simulator → Testimonials → Trustpilot → Glossaire → ContactForm → FAQ → CtaFinal.

## Type
Page Astro (route `/`).

## Structure (ordre des sections)
```
<Base title="..." description="...">
  <Header />                          (sticky, headband orange + nav)
  <main>
    <Hero />                          (LCP-critical, indigo soft bg, DKI island)
    <StatsBar />                      (chiffres geants 24M EUR / 12000 / 95%)
    <TrustBand />                     (logos presse)
    <ProblemSolution />               (6 cards 3x2)
    <Simulator client:visible />      (island React, 2-step mock)
    <Testimonials />                  (3 cards, white bg)
    <Trustpilot />                    (score 4,7/5 + 3 reviews)
    <Glossaire />                     (6 termes LMNP, schema.org DefinedTerm)
    <ContactForm client:visible />    (island React, submit Edge Function)
    <FAQ />                           (6 Q/A, schema.org FAQPage)
    <CtaFinal />                      (gradient indigo-600 final)
  </main>
  <Footer />
</Base>
```

## Dependances sortantes
- `../layouts/Base.astro`
- `../components/Header.astro`, `Footer.astro`
- `../components/sections/Hero.astro` (avec DKIHero island)
- `../components/sections/*.astro` (8 sections statiques)
- `../components/sections/Simulator.tsx`, `ContactForm.tsx` (2 islands React)

## Contraintes
- **Ordre des sections critique** : ne pas deplacer Hero (LCP) ni ContactForm (#contact, lien depuis CTAs).
- **Pas de SSR/SSG par section** : Astro genere du HTML statique, tout est pre-rendu.
- **Hydratation islands** : `client:visible` pour Simulator + ContactForm (lazy). `client:load` UNIQUEMENT dans Hero pour DKIHero.
- **Pattern alternance** : sections section-white / section-soft (indigo 60%) — voir rule `layouts-base.md`.

## A surveiller
- Si ajout d'une 12e section : verifier impact LCP (sections lourdes apres le fold = OK).
- Si nouvelle route (ex: `/contact`, `/privacy`) : extraire Header/Footer dans wrapper sub-layout.
- ID `#contact` doit rester pour scroll-link depuis Hero CTAs et Simulator.
- ID `#simulator`, `#testimonials`, `#faq` references dans Header nav items.
