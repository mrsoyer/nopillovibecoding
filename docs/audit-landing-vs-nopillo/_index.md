# Audit comparatif Landing vs Nopillo.com

> Comparaison entre notre landing https://landingformnopillo.webflow.io et la reference https://www.nopillo.com/
> Date : 2026-05-05
> Auditeur : agent UX/UI senior (analyse code + DOM + DS de reference)
> Methode : WebFetch contenu + curl HTML + analyse CSS chargee + cross-check avec `/Users/thomas/webflowlanding/docs/design-system-extraction/nopillo-extracted/` (tokens deja extraits le meme jour)

---

## Note sur la methodologie

Le MCP Playwright n'etait **pas disponible** dans cet environnement (les outils `mcp__playwright__browser_*` ne sont pas exposes). L'audit a donc ete realise via :

- `WebFetch` pour l'extraction structuree du DOM rendu des deux sites
- `curl` direct pour recuperer le HTML brut et la feuille CSS publiee de notre landing (`landingformnopillo.webflow.shared.1305d024c.css`, 3 100 lignes)
- Le DS de reference Nopillo deja extrait via Playwright le 2026-05-05 (`nopillo-extracted/`)

Aucun screenshot binaire n'a pu etre genere. Les preuves sont des extraits de code reels, pas des captures.

---

## Resume executif

**Score d'alignement global : 3 / 10**

Notre landing reutilise correctement la **palette de couleurs** (`#09090b`, `#4033db`, `#dedaff`...) et **declare** Futura PT dans le CSS, mais elle **ne charge pas la police**, **n'a pas de header/nav**, **pas de headband orange**, **pas de logo Nopillo**, et son **footer est minimaliste**. Visuellement, l'utilisateur arrive sur une page qui :

1. **N'est pas reconnaissable comme Nopillo** (pas de logo, pas de chrome de marque)
2. **Affiche en Arial** au lieu de Futura PT (le `<script src="use.typekit.net/...">` manque dans le `<head>`, donc le fallback `sans-serif` du systeme s'applique partout — meme sur les `h1` qui declarent `futura-pt`)
3. **Ressemble a une page interne** sans navigation, ce qui empeche tout retour vers nopillo.com et casse le branding

### 3 problemes prioritaires

| # | Probleme | Impact |
|---|----------|--------|
| **P0** | Futura PT non chargee : aucun import Typekit dans `<head>` | Le texte s'affiche en Arial / system sans-serif, non aligne marque |
| **P0** | Aucun header / navbar / logo Nopillo | Page non reconnaissable, pas de retour vers le site mere |
| **P0** | Aucun headband orange (`#FFF3DF`) au-dessus du nav | Element signature de la marque absent |

---

## Ecarts identifies (10 sections)

### 1. Logo & Branding

- **Nopillo** : logo SVG `nopillo-logo-final.svg` (`https://cdn.prod.website-files.com/62efb778b7b092165085a6f6/697b6001fbb6f7d4ac9f8c38_nopillo-logo-final.svg`) en haut a gauche du nav
- **Notre landing** : aucun logo image. Le mot "Formation Nopillo" apparait uniquement en pied de page dans `<div class="footer-logo">Formation Nopillo</div>` (texte simple)
- **Ecart** : marque non identifiable au-dessus de la ligne de flottaison
- **Correction concrete** : ajouter dans Webflow un Navbar component avec `<img src="https://cdn.prod.website-files.com/62efb778b7b092165085a6f6/697b6001fbb6f7d4ac9f8c38_nopillo-logo-final.svg" alt="Nopillo" height="32">` linke vers `https://www.nopillo.com/`. L'asset SVG est deja extrait dans `docs/design-system-extraction/nopillo-extracted/assets/`.

### 2. Navbar / Header

- **Nopillo** : header fixed avec dropdowns (Services, Outils, Blog, Tarifs, Ressources), telephone `01 84 80 92 85`, CTA "Calculer mes economies" (indigo) et "Espace client" (lien vers `app.nopillo.com`). Container 1408px, fond blanc, ombre legere
- **Notre landing** : **AUCUN header/nav** dans le HTML. Le `<body>` enchaine directement sur `<section class="section section-hero">`. Les seuls liens d'ancrage sont `#contact` et `#formats` dans la hero
- **Ecart** : aucune chrome de marque, l'utilisateur ne sait pas ou il est ni comment naviguer
- **Correction concrete** : creer un Navbar Webflow positionne `position: sticky; top: 0` avec :
  - Logo Nopillo a gauche (lien vers nopillo.com)
  - Liens centres : "Le constat", "La methode", "Les formats", "FAQ" (ancres internes)
  - CTA droite : "Reserver un brief" (style `.btn-primary-accent`, fond `#4033db`, radius 999px, padding 18px 28px) lie a `#contact`
  - Container 1408px, fond `#FFFFFF`, hauteur ~80px, font-family Futura PT 600

### 3. Headband orange

- **Nopillo** : headband visible au-dessus du navbar, fond `#FFF3DF` (token `--orange-100`), texte "Outil gratuit — LMNP: Testez votre conformite fiscale en 3 min" linke vers `/outils/diagnostic-fiscal-lmnp`. Variante paid utilisee `--lp--orange` (`#FFC192`)
- **Notre landing** : **AUCUN headband**. Aucune trace dans le HTML (`grep -i orange|headband|FFF3DF` retourne 0)
- **Ecart** : element signature visuel de la marque totalement absent
- **Correction concrete** : ajouter un Section Webflow tout en haut du body :
  ```
  <div class="headband" style="background:#FFF3DF; padding:10px 20px; text-align:center; font-family:futura-pt; font-size:14px; font-weight:500; color:#09090B;">
    Formation industrielle landing ads — Premier livrable produit pendant la session
    <a href="#contact" style="margin-left:8px; text-decoration:underline;">Reserver mon brief gratuit</a>
  </div>
  ```
  Le headband doit etre **avant** la navbar, pas apres.

### 4. Footer

- **Nopillo** : footer multi-colonnes :
  - Col 1 "A propos" : Tarifs, Contact, Recrutement, Avis, Experiences, Parrainage, Partenariats, Glossaire, Qui sommes-nous
  - Col 2 "Reseaux sociaux" : LinkedIn, Instagram, TikTok, YouTube, Facebook (icones SVG)
  - Col 3 "Legal" : Politique confidentialite, Mentions legales, CGU, Preferences cookies
- **Notre landing** : footer minimal `<footer class="site-footer">` avec uniquement :
  - Texte "Formation Nopillo"
  - Tagline "Webflow + Claude Code + MCP pour landings ads haute conversion"
  - Meta "Document de presentation interne · Generee via Webflow MCP · 2026"
- **Ecart** : aucun lien legal, aucun lien social, aucun retour vers le site Nopillo principal
- **Correction concrete** : restructurer le footer en grid 4 colonnes (1408px container) :
  - Col 1 : Logo Nopillo (variante blanche sur fond `#09090b`) + tagline
  - Col 2 "Formation" : Le constat, La methode, Les formats, Etude de cas, FAQ
  - Col 3 "Nopillo" : Site principal nopillo.com, Espace client, Tarifs, Contact, Blog
  - Col 4 "Legal" : Mentions legales, CGU, Politique confidentialite, Cookies
  - Bandeau bas : "© 2026 Nopillo · Tous droits reserves" + icones reseaux sociaux

### 5. Typographie

- **Nopillo** : Futura PT (Adobe Typekit, kit `c1b0b72bff15bb9715f23b2ce31c51654439d865`). Charge via :
  ```html
  <script src="https://use.typekit.net/ryo6wbg.js"></script>
  <script>try{Typekit.load();}catch(e){}</script>
  ```
  Variantes 300-800 + italics. H1 = `futura-pt 700 59.2px / 72px`, H2 = `futura-pt 600 56px / 64px`, body = `Futura PT 400 16px / 24px`.
- **Notre landing** : le CSS DECLARE `font-family: futura-pt, sans-serif;` sur `.hero-title`, `.section-title`, `.btn-primary-accent`, etc. **MAIS aucun `<link>` ni `<script>` Typekit dans le `<head>`** (verifie : `grep -i typekit /tmp/landing-raw.html` = 0 resultats). Pire, le selecteur `body` definit `font-family: Arial, sans-serif;` — donc tout le body herite Arial, et meme sur les classes qui declarent futura-pt, le navigateur applique le fallback `sans-serif` du systeme (San Francisco / Segoe UI / Helvetica) car la police nommee n'est jamais chargee.
- **Ecart** : impact visuel **majeur**. Tous les textes de la landing sont en police generique au lieu de Futura PT geometrique. La perception "premium SaaS" de Nopillo est perdue.
- **Correction concrete** : dans Webflow, Project Settings > Custom Code > Head Code, coller :
  ```html
  <link rel="preconnect" href="https://use.typekit.net" crossorigin>
  <link rel="preload" as="style" href="https://use.typekit.net/c1b0b72bff15bb9715f23b2ce31c51654439d865.css">
  <link rel="stylesheet" href="https://use.typekit.net/c1b0b72bff15bb9715f23b2ce31c51654439d865.css">
  ```
  Et changer le CSS body de `font-family: Arial` vers `font-family: "Futura PT", futura-pt, system-ui, sans-serif;`. Note : reutiliser l'auth Typekit officielle Nopillo necessite l'accord juridique (kit lie au domaine nopillo.com). Alternative gratuite : `Inter` via Google Fonts (geometrique sans-serif similaire).

### 6. Couleurs

- **Nopillo** : palette indigo + black + headband orange + accent vert mint
  - `--black` `#09090B` (texte par defaut, 662 elements)
  - `--indigo-600` `#4033DB` (CTA section, brand primary)
  - `--indigo-100` `#DEDAFF` (hero soft, borders cards)
  - `--secondary-600` `#0CC28C` (vert mint highlight)
  - `--orange-100` `#FFF3DF` (headband)
  - Cards : `rgba(255,255,255,0.3)` translucide sur fond indigo
- **Notre landing** : reutilise correctement les hex Nopillo (`#09090b`, `#4033db`, `#dedaff`, `#0cc28c`, `#058376`, `#2d23b7`...). Variables CSS exposees `--_nopillo-ds---indigo-50: #f6f5fd;` etc. **MAIS** :
  - Le orange (`#FFF3DF`) **n'est JAMAIS utilise** (`grep -i FFF3DF /tmp/landing.css` = 0)
  - Le pattern d'alternance "blanc / indigo-100 60% / indigo-100 100% / indigo-600 final" n'est pas applique aux sections
  - Le texte herite `color: #333` du body au lieu de `#09090B` (passe en hierarchie sur les enfants)
- **Ecart** : palette presente mais sous-exploitee, hierarchie chromatique des sections perdue
- **Correction concrete** :
  1. Forcer `body { color: #09090B; }` au lieu de `#333`
  2. Appliquer le pattern d'alternance : section-hero blanc, section-probleme `#DEDAFF`, section-methodo blanc, section-formats `rgba(222,218,255,0.6)`, section-cta `#4033DB` avec texte blanc
  3. Ajouter le headband `#FFF3DF`

### 7. Composants (boutons, cards)

- **Nopillo** :
  - Bouton primaire : fond `#09090B`, texte blanc, **border-radius 999px** (pill shape), padding 18-28px, font Futura PT 500
  - Bouton accent : fond `#4033DB`, texte blanc, radius 999px
  - Cards : bg `rgba(255,255,255,0.3)` translucide, border `1px solid #DEDAFF`, shadow `0 1px 10px rgba(0,0,0,0.06)`, radius 16px
- **Notre landing** :
  - `.btn-primary` : fond `#09090b` blanc OK
  - `.btn-primary-accent` : fond `#4033db`, **radius 999px** (pill) OK
  - **MAIS** d'autres boutons utilisent `border-radius: 8px / 10px / 12px / 16px / 24px` — incoherence
  - Cards : pas de translucide observe, fond plein
- **Ecart** : boutons partiellement alignes, cards trop opaques
- **Correction concrete** :
  1. Standardiser TOUS les boutons CTA sur `border-radius: 999px`
  2. Cards : passer a `background: rgba(255,255,255,0.3); border: 1px solid #DEDAFF; box-shadow: 0 1px 10px rgba(0,0,0,0.06); border-radius: 16px;`
  3. Pour fonctionner, les sections "carte" doivent avoir fond `#DEDAFF` ou `rgba(222,218,255,0.6)` derriere les cards

### 8. Illustrations & Images

- **Nopillo** : illustrations isometriques signatures
  - Hero `Subtract1-2.webp` (forme abstraite isometrique 698x600px)
  - `isometric-checkmark 1.svg` (vert)
  - `isometric-cross 2.svg` (rouge)
  - Icones services : Calculator, ChartPie, CheckFat, CalendarBlank, Book, Television, Comparator (sprites SVG)
  - `Frame 427321381.webp` (visuel how-it-works)
  - 3 photos clients (David Z., Nessim, Marie)
- **Notre landing** : **AUCUNE illustration**. Que des elements textuels (numeros 01/02/03, fleches `→`, checkmarks `✓` et `×` en caracteres unicode dans le pricing). Aucune image.
- **Ecart** : page entierement textuelle, perception "doc technique" au lieu de "produit premium". Manque de respiration visuelle.
- **Correction concrete** :
  1. Hero : ajouter visuel cote droit (illustration isometrique generee sur theme "Claude Code + Webflow", style flat avec accent indigo)
  2. Section "La methode" : remplacer les fleches text par les icones isometriques Nopillo (calculator, checkmark, calendar)
  3. Section "Etude de cas" : ajouter chart illustratif (avant/apres metriques) en SVG style isometrique
  4. Section "Reservez un brief" : photo/avatar du formateur

### 9. Microinteractions

- **Nopillo** : dropdowns hover (Services, Ressources), carousel testimonials, video player YouTube, formulaire interactif "rent range" (4 boutons), tel: link clickable, hover states sur tous les CTAs (probable elevation/opacity)
- **Notre landing** : FAQ expandable (`+` indicators), ancres `#contact`/`#formats`, formulaire de contact basique. Pas de dropdown, pas de carousel, pas de hover state observable.
- **Ecart** : page statique, manque de feedback utilisateur
- **Correction concrete** :
  1. Ajouter hover states sur boutons : `transform: translateY(-2px); box-shadow: 0 8px 20px rgba(64,51,219,0.2);` au hover
  2. Cards de formats : hover `transform: scale(1.02); border-color: #4033DB;`
  3. FAQ : animation smooth open/close avec rotation chevron
  4. Section CTA finale : input email avec validation inline

### 10. Mobile

- **Nopillo** : pages testees responsive (Webflow standard), navbar collapse en burger, hero stack en colonne, headband persiste en haut
- **Notre landing** : CSS contient des breakpoints (`.hero-title { font-size: 44px; }` a tablette, `36px` a mobile detecte). Mais sans nav, sans header, sans headband, le mobile herite des memes manques que le desktop.
- **Ecart** : mobile herite des problemes structurels desktop. Pas de menu mobile possible vu qu'il n'y a pas de menu du tout.
- **Correction concrete** : apres ajout du navbar (#2), configurer le menu mobile Webflow en burger avec :
  - Headband qui reste sticky top
  - Burger qui ouvre overlay full-screen avec liens centres
  - CTA "Reserver" persistant en bas (sticky bottom bar mobile)

---

## Liste priorisee des corrections (par effort/impact)

| Priorite | Correction | Effort | Impact |
|---|---|---|---|
| **P0** | Charger Futura PT via Typekit dans `<head>` (3 lignes Custom Code Webflow) | 5 min | Critique — toute la typo de la marque |
| **P0** | Corriger `body { color: #333 }` -> `#09090B` et `font-family Arial` -> Futura PT | 5 min | Critique — couleur texte et fallback police |
| **P0** | Ajouter Navbar Webflow avec logo Nopillo + 4 liens + CTA accent | 30 min | Eleve — chrome de marque indispensable |
| **P0** | Ajouter Headband orange `#FFF3DF` au-dessus du nav | 10 min | Eleve — element signature visuelle |
| **P1** | Restructurer Footer en 4 colonnes (Formation / Nopillo / Legal / Social) | 30 min | Eleve — credibilite et liens sortants |
| **P1** | Standardiser tous les boutons CTA sur `border-radius: 999px` (pill) | 10 min | Moyen — coherence DS |
| **P1** | Appliquer pattern d'alternance bg sections (blanc / indigo-100 60% / indigo-100 / indigo-600 final) | 20 min | Eleve — rythme visuel |
| **P2** | Ajouter illustration hero (visuel cote droit, style isometrique) | 1-2h | Eleve — perception premium |
| **P2** | Cards translucides : `rgba(255,255,255,0.3) + border #DEDAFF + shadow 0 1px 10px rgba(0,0,0,0.06)` | 15 min | Moyen — finesse visuelle |
| **P2** | Ajouter hover states (transform, box-shadow) sur tous les CTAs et cards | 20 min | Moyen — feedback utilisateur |
| **P3** | Ajouter icones isometriques sur section "La methode" (calculator, calendar, checkmark) | 1h | Moyen — coherence visuelle Nopillo |
| **P3** | Section "Etude de cas" : ajouter chart SVG avant/apres | 2h | Moyen — preuve sociale visuelle |

**Total estime corrections P0+P1** : ~2h de travail Webflow
**Total avec P2+P3** : ~6h

---

## Sources

- HTML brut landing : `/tmp/landing-raw.html` (19 720 octets, 1 ligne, recupere via curl)
- CSS landing publiee : `/tmp/landing.css` (3 100 lignes, `landingformnopillo.webflow.shared.1305d024c.css`)
- HTML brut nopillo : `/tmp/nopillo-raw.html` (512 lignes, recupere via curl)
- DS Nopillo de reference : `/Users/thomas/webflowlanding/docs/design-system-extraction/nopillo-extracted/`
  - `_index.md` : tokens TL;DR
  - `02-tokens-couleurs.md` : palette 88 variables CSS
  - `03-tokens-typographie.md` : Futura PT specs et echelle
  - `05-composants-buttons.md` : specs boutons
  - `06-composants-navbar-footer.md` : specs nav et footer
  - `tokens.css` : variables pretes a coller
  - `assets/` : logo SVG + screenshots Playwright extraits le 2026-05-05
- Aucun screenshot binaire genere (MCP Playwright indisponible dans cette session)

---

## Annexe : preuves de code

### Preuve 1 — Body en Arial dans notre landing CSS
```css
body {
  color: #333;
  background-color: #fff;
  min-height: 100%;
  margin: 0;
  font-family: Arial, sans-serif;   /* devrait etre Futura PT */
}
```
Source : `landingformnopillo.webflow.shared.1305d024c.css` ligne ~120

### Preuve 2 — Aucun script Typekit dans le `<head>`
```bash
$ grep -i typekit /tmp/landing-raw.html
# (aucun resultat)
```
Vs Nopillo :
```html
<script src="https://use.typekit.net/ryo6wbg.js" type="text/javascript"></script>
<script>try{Typekit.load();}catch(e){}</script>
```

### Preuve 3 — Body sans header dans le HTML
Premier element apres `<body>` de notre landing :
```html
<body>
  <section class="section section-hero">
    <div class="container hero-grid">
      <div class="trust-badge">...</div>
      <h1 class="hero-title">Industrialisez vos landings ads...</h1>
```
Aucun `<header>`, aucun `<nav>`, aucun headband.

### Preuve 4 — Couleurs reutilisees correctement
Tous les hex Nopillo sont presents dans le CSS landing :
```
#09090b, #4033db, #2d23b7, #dedaff, #bdb5ff, #5d6b98, #404968,
#7d89b0, #b9c0d4, #dcdfea, #058376, #0cc28c, #db3352, #e4ffea
```
Manquant : `#FFF3DF` (orange headband) et `#FFC192` (orange variant LP).
