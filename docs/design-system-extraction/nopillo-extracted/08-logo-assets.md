# Logo et Assets — Nopillo

## Sommaire

- [Logo SVG](#logo-svg)
- [Assets CDN Webflow](#assets-cdn-webflow)
- [Iconographie](#iconographie)
- [Illustrations](#illustrations)

---

## Logo SVG

### Source officielle

```
https://cdn.prod.website-files.com/62efb778b7b092165085a6f6/697b6001fbb6f7d4ac9f8c38_nopillo-logo-final.svg
```

Sauvegarde locale : [`assets/nopillo-logo.svg`](assets/nopillo-logo.svg)

### Specs

| Propriete | Valeur |
|-----------|--------|
| **Type** | SVG (vectoriel) |
| **viewBox** | `0 -0.5 81 27` |
| **Dimensions affichees** | 112 × 41 px (declarees), 126 × 41 px (rendues) |
| **Couleur fill** | `#09090B` (toutes les paths) — brand black |
| **Background** | Transparent |
| **Style** | Wordmark "nopillo" — tout en bas-de-casse |
| **Forme** | Lettrage geometrique cursif sur le 'i' avec une vague (signature visuelle) |

### Code SVG complet

```xml
<svg viewBox="0 -0.5 81 27" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- Lettre 'n' -->
  <path d="M11.9693 17.2058V13.8364C11.9693 11.0336 10.0605 9.14961 7.21839 9.14961..." fill="#09090B"/>
  <!-- Lettre 'o' (1ere) -->
  <path d="M20.2775 9.14961C16.5064 9.14961 13.6644 11.8895 13.6644 15.5211..." fill="#09090B"/>
  <!-- Lettre 'o' (derniere) -->
  <path d="M74.3868 9.00695C70.6158 9.00695 67.7737 11.7469 67.7737 15.3784..." fill="#09090B"/>
  <!-- Lettre 'p' -->
  <path d="M35.6645 9.14961C34.3757 9.14961 33.216 9.55661 32.2912 10.3308..." fill="#09090B"/>
  <!-- Point du 'i' -->
  <path d="M44.7621 3.84177C43.4479 3.84177 42.4554 4.81523 42.4554 6.10547..." fill="#09090B"/>
  <!-- Lettre 'i' -->
  <path d="M46.673 9.42654H42.8511V21.6157H46.673V9.42654Z" fill="#09090B"/>
  <!-- Lettres 'll' (avec vague signature) -->
  <path d="M66.578 17.6421C66.5442 17.6673 66.5209 17.682 66.5188 17.6862..." fill="#09090B"/>
</svg>
```

### Caracteristiques de marque

- **Tout minuscule** : "nopillo" — ton accessible, friendly
- **Vague signature sur les 'll'** : differenciation visuelle (path 7 du SVG)
- **Geometrie ronde** : alignée avec Futura PT (font display)
- **Monochrome black** : tres versatile (fond clair / sombre)

### Variantes possibles a creer

Le DS source ne fournit qu'une seule variante. Pour un usage complet, il faudrait creer :

| Variante | Quand utiliser |
|----------|----------------|
| **Black** (fournie) | Backgrounds clairs |
| **White** (a creer) | Backgrounds sombres / indigo-600 |
| **Indigo-600** (a creer) | Variant brand sur fonds neutres |
| **Mark seul** (a creer) | Icone app, favicon, social avatars |

Pour creer ces variantes, dupliquer le SVG et changer le `fill="#09090B"` en :
- White : `fill="#FFFFFF"`
- Indigo : `fill="#4033DB"`

## Assets CDN Webflow

Tous les assets sont hostes sur le CDN Webflow Nopillo :

```
Base URL : https://cdn.prod.website-files.com/62efb778b7b092165085a6f6/
Site ID  : 62efb778b7b092165085a6f6
```

### Format et naming

Pattern observe : `{hashId}_{originalName}.{ext}`

Exemples :
- `697b6001fbb6f7d4ac9f8c38_nopillo-logo-final.svg`
- `697a406f775e8c9cd3f16a0e_arrow-icon.svg`
- `6794efd49097b958603d80dc_isometric-checkmark%201.svg`
- `68a7243c0583f4764ee2b3c7_68a5cc0be78cd5e1fefcf0da_678e1ffc865ec9886b51a539_Subtract1-2.webp`

### Formats utilises

| Type | Frequence | Usage |
|------|-----------|-------|
| `.svg` | ~80% | Icones, illustrations vectorielles |
| `.webp` | ~15% | Photos, captures ecran |
| `.png` | ~5% | Composites avec transparence |
| `.jpeg` | rare | Photos optimisees |

## Iconographie

### Icones detectees dans la nav (dropdown Services)

| Icone | URL | Usage |
|-------|-----|-------|
| Calculator | `6931ab8e47d0ca023600c72b_Calculator.svg` | Logiciel comptabilite |
| ChartPieSlice | `6931ab8e22afffaacaa75a99_ChartPieSlice.svg` | Simulateur |
| CheckFat | `6931ab8eeb66e54ef5849e27_CheckFat.svg` | Eligibilite |
| CalendarBlank | `6931ab8ea0adb3377ff92348_CalendarBlank.svg` | Prendre RDV |
| Book | `6931ae5af3a369b258da50b1_Book.svg` | Livres blancs |
| Television | `6931ae7de975b1d5cf7edd0e_Television.svg` | Webinars |
| Comparator | `69661292acb21ab4dd93a5d6_comparator-icon.svg` | Comparateur LMNP |

**Style detecte** : Phosphor Icons (judging par les noms `Calculator`, `ChartPieSlice`, `CalendarBlank`, etc.) — set d'icones open-source moderne.

**Specs typiques** :
- viewBox : `0 0 22-26 22-26`
- Dimensions : 20-26px
- Style : ligne avec coins arrondis (Phosphor "regular" weight)

### Icones additionnelles

| Element | URL |
|---------|-----|
| Arrow → | `697a406f775e8c9cd3f16a0e_arrow-icon.svg` (16×16) |
| Arrow → variant | `697a43f258d1b8b48f26a467_arrow-icon-900.svg` (16×16) |
| Keyboard arrow right | `6744a940250e33ef447e0802_keyboard_arrow_right.svg` |
| Video play | `65c38c0a5c84f570cd4c6e34_Video.svg` |
| Contact icon | `6745cc416a356cf530760606_contact1.svg` |

### Icones isometriques (signature)

Style figuratif avec illustrations 3D-feel :

| Element | URL | Usage |
|---------|-----|-------|
| Checkmark isometric | `6794efd49097b958603d80dc_isometric-checkmark%201.svg` | Pricing yes (5 instances visibles) |
| Cross isometric | `6794efdb6b3bc7c2b206a7e0_isometric-cross%202.svg` | Pricing no (5 instances) |

**Pattern** : Le DS utilise des **icones isometriques 3D** au lieu d'icones plats pour les comparaisons (oui/non) — donne un cote pedagogique et premium.

## Illustrations

### Illustrations decoratives

| Image | URL pattern | Usage |
|-------|-------------|-------|
| Hero illustration bg | `68a7243c0583f4764ee2b3c7_..._Subtract1-2.webp` (1267×398) | Background hero |
| CTA icons compose | `6782f42ebfedc303888051d5_Group%20625933.png` (80×63) | Composite CTA |
| Group 625942 | `68a5caca366dfaa69c7c75b7_..._Group%20625942-2.svg` (2520×1863) | Illustration vectorielle large |
| Group 625935 | `68a5ca899e0921568ede9078_..._Group%20625935-3.svg` (1021×1154) | Illustration |

**Style observe** :
- **Illustrations 3D figuratives** (calculatrice, charts, billets euros) — style isometrique
- Couleurs des illustrations : indigo, vert mint, blanc, jaune (palette DS respectee)
- Format SVG ou WebP haute resolution

### Photos

Photos clients/ambiances en `.webp` optimisees (ex : `shutterstock_2124234632`).

## Recommandations Pour Reproduction

### Si on doit recreer un DS similaire

1. **Logo** : commander un wordmark all-lowercase Futura-PT inspire (vague signature optionnelle pour singularity)
2. **Icones** : utiliser **Phosphor Icons** (gratuit, [phosphoricons.com](https://phosphoricons.com)) — meme set que Nopillo
3. **Illustrations isometriques** : commissioner ou utiliser packs comme [Storyset](https://storyset.com), [Open Doodles](https://www.opendoodles.com), [Iconscout 3D](https://iconscout.com/3ds)
4. **Photos** : commercialement libres (Unsplash) avec retouche couleur indigo coherent

### Limites legales

⚠️ **Le logo Nopillo est protege**. Ne JAMAIS reutiliser le SVG, les paths, ou la marque "nopillo" dans un autre projet.

Voir [docs/design-system-extraction/06-anti-patterns-legal.md](../06-anti-patterns-legal.md) pour le detail.

## Sources

- Extraction : `document.querySelector('[class*="logo"] img')` + parcours `<img>` et `<svg>`
- Logo telecharge : `curl -o assets/nopillo-logo.svg ...`
- Date : 2026-05-05
