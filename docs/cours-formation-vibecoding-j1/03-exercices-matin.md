# 03 — Exercices matin : 5 ameliorations en pair programming

> A distribuer en print A4 a 9h45, apres l'analyse au tableau. Chaque pair choisit 2-3 ameliorations a faire sur leur landing clonee.

## Regles du jeu (5 min de cadrage)

1. **Pair programming** : driver / navigator, switch toutes les **20 min** (timer projete au mur).
2. Vous choisissez **2 a 3 ameliorations** dans la liste ci-dessous (pas obligatoire de tout faire).
3. **Aucune amelioration n'est obligatoire** : si vous avez VOTRE idee, faites-la (mais validez avec le formateur).
4. A 11h30 : code review collective. 2 binomes seront tires au sort pour montrer leur ecran.
5. Si bloque > 10 min : levez la main, formateur 1-to-1.

## Amelioration 1 — HERO : changer le headline

**Effort** : XS (15 min)
**Touche a** : composant Astro
**Concept Claude Code** : usage basique (edit + dev server hot reload)

### Brief

Le Hero actuel a un headline generique. Changez-le pour votre cas perso (brief recu en pre-work).

### Etapes

1. Ouvrir `front/src/components/sections/Hero.astro` (ou equivalent)
2. Demander a Claude :
   ```
   Modifie le headline du Hero pour : "[ton headline]".
   Garde le sub-headline ou propose 3 variantes.
   ```
3. Verifier dans navigateur (port 4321)
4. Tester sur mobile (DevTools responsive)

### Critere de validation

- [ ] Headline visible et lisible mobile + desktop
- [ ] Sub-headline coherent avec le headline
- [ ] Aucune erreur dans le terminal Astro

### Source

[docs/landing-page-best-practices/03-hero-above-the-fold.md](../landing-page-best-practices/03-hero-above-the-fold.md)

## Amelioration 2 — SOCIAL PROOF : ajouter une section "Confiance"

**Effort** : S (30 min)
**Touche a** : composant Astro + design
**Concept Claude Code** : creer un composant from scratch

### Brief

La landing actuelle n'a pas de social proof. C'est le facteur conversion n°1 selon les benchmarks.

Ajoutez une section avec :
- 3 logos clients (placeholders OK : SVG simples ou images Unsplash)
- 1 quote temoignage (peut etre invente, on est en formation)
- 1 KPI ("100+ clients", "5/5 sur G2"...)

### Etapes

1. Demander a Claude :
   ```
   Cree un composant SocialProof.astro avec 3 logos + 1 quote + 1 KPI.
   Style : coherent avec le DS Nopillo (indigo #4033DB, cards translucides, radius 16px).
   Importe-le dans index.astro entre Hero et la section suivante.
   ```
2. Verifier le rendu
3. Ajuster espacement / typographies si besoin

### Critere de validation

- [ ] Section visible entre Hero et section suivante
- [ ] Responsive (stack mobile, grid desktop)
- [ ] Style coherent DS Nopillo
- [ ] Aucune erreur console

### Source

[docs/landing-page-best-practices/05-social-proof-trust.md](../landing-page-best-practices/05-social-proof-trust.md)

## Amelioration 3 — MOBILE : reparer le responsive

**Effort** : S (30 min)
**Touche a** : Tailwind classes + media queries
**Concept Claude Code** : debug visuel

### Brief

Au moins une chose casse en mobile. Trouvez-la et corrigez.

Suspects classiques :
- Header / menu non hamburger
- Hero CTA pas visible
- Form champs trop petits / clavier zoom
- Image hero coupee

### Etapes

1. Ouvrir DevTools → responsive 375x667 (iPhone SE) + 414x896 (iPhone 14 Pro Max)
2. Identifier un probleme visuel
3. Demander a Claude :
   ```
   Sur mobile [375px], [decrire le probleme].
   Corrige dans le composant [nom du composant].
   Verifie qu'on casse pas le desktop.
   ```
4. Verifier mobile + desktop

### Critere de validation

- [ ] Plus de probleme visible sur 375px et 414px
- [ ] Desktop pas casse (1440px OK)
- [ ] Pas de scrollbar horizontale

### Source

[docs/landing-page-best-practices/06-anti-patterns.md](../landing-page-best-practices/06-anti-patterns.md) — "Pas de mobile-first"

## Amelioration 4 — FAVICON : personnalisation

**Effort** : XS (15 min)
**Touche a** : `public/` + `<head>`
**Concept Claude Code** : assets statiques

### Brief

Le favicon par defaut est generique. Remplacez par un favicon perso (votre logo client ou un emoji converti).

### Etapes

1. Generer un favicon :
   - Option A : avoir un logo SVG (votre projet perso)
   - Option B : convertir un emoji via https://favicon.io/emoji-favicons/
   - Option C : demander a Claude un SVG simple (initiale + couleur)
2. Mettre le fichier dans `front/public/favicon.svg` (ou `.ico`)
3. Demander a Claude :
   ```
   Verifie que le Layout.astro reference bien public/favicon.svg
   avec rel="icon" type="image/svg+xml" dans le head.
   ```
4. Verifier dans l'onglet du navigateur

### Critere de validation

- [ ] Favicon perso visible dans l'onglet
- [ ] Fonctionne en mode incognito (cache vide)
- [ ] Pas d'erreur 404 dans Network DevTools

### Source

[Best practices favicon — web.dev](https://web.dev/articles/add-manifest)

## Amelioration 5 — PERFORMANCE : optimiser image hero (LCP)

**Effort** : S (30 min)
**Touche a** : `<Image>` Astro + `loading` attribute
**Concept Claude Code** : Lighthouse + optimisation

### Brief

Le LCP (Largest Contentful Paint) est le truc le plus important pour Google. Image hero non optimisee = LCP > 4s = -50% conversion.

### Etapes

1. Mesurer baseline :
   ```bash
   cd front && npm run build && npm run preview
   ```
   Ouvrir http://localhost:4321 et lancer Lighthouse (DevTools)
   → Noter le LCP actuel
2. Demander a Claude :
   ```
   Optimise l'image hero du composant Hero.astro :
   - Utilise <Image> d'Astro avec dimensions explicites
   - loading="eager" et fetchpriority="high"
   - Format webp avec fallback
   - Compression (quality 80)
   Verifie que c'est pas casse visuellement.
   ```
3. Re-mesurer Lighthouse
4. Comparer LCP avant/apres

### Critere de validation

- [ ] LCP < 2.5s (cible 2s ideal)
- [ ] Lighthouse Performance >= 85
- [ ] Image visuellement identique (qualite OK)
- [ ] `<Image>` utilise (pas `<img>` brut)

### Source

[docs/google-ads/03-landing-page-quality-score.md](../google-ads/03-landing-page-quality-score.md)
[Astro Image — docs Astro](https://docs.astro.build/en/guides/images/)

## Bonus — si vous finissez tout

**Si vous avez fini 3 ameliorations avant 11h15** :

- Lancer `/context-guardian` dans le projet → score affiche
- Lire `.claude/rules/frontend.md` du projet, comprendre comment c'est scope
- Tenter de creer VOTRE premier rule pour le composant SocialProof que vous venez d'ajouter

## Que va-t-on observer en code review (11h30)

Quand 2 binomes presenteront a 11h30, le formateur soulignera :
- **1 point fort** : ce qui est exemplaire (a copier)
- **1 point a ameliorer** : sans juger, en mode "qu'est-ce qu'on aurait pu faire mieux"

Les pairs poseront **2 questions chacun** : "pourquoi vous avez choisi X ?" / "comment vous avez resolu Y ?".

**Objectif** : voir 2-3 variations sur les memes exercices = apprentissage par contraste.

## Sources

- [docs/landing-page-best-practices/](../landing-page-best-practices/) — best practices generales
- [docs/google-ads/](../google-ads/) — Quality Score, LCP, conversion
- [docs/pedagogie-formation/05-techniques-animation.md](../pedagogie-formation/05-techniques-animation.md) — pair programming + code review
