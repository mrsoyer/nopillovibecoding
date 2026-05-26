# Composants — Navbar et Footer Nopillo

## Sommaire

- [Navbar (header fixed)](#navbar-header-fixed)
- [Headband annonce (top bar)](#headband-annonce-top-bar)
- [Footer multi-colonnes](#footer-multi-colonnes)

---

## Navbar (header fixed)

### Specs structurelles

```css
.navbar {
  position: fixed;
  background-color: #FFFFFF;
  height: 144px;                /* avec headband (~40px) + nav (~80px) */
  padding: 0;
  box-shadow: none;             /* aucune shadow */
  backdrop-filter: none;
  border-radius: 0;
  width: 100%;
  z-index: 100;                 /* deduit (Webflow standard) */
}

.navbar-container {
  max-width: 1408px;            /* container plus large que le reste du site */
  width: 1312px;
  margin: 0 auto;
}
```

**Note** : Le DS choisit `position: fixed` (pas `sticky`), donc la nav reste tjrs visible. Hauteur totale ~144px (incluant headband orange annonce).

### Anatomie (gauche → droite)

```
┌────────────────────────────────────────────────────────────────┐
│ [Logo]  [Services▼] [Outils] [Blog] [Tarifs] [Ressources▼]     │
│                                          [CTA Black] [Outline] │
└────────────────────────────────────────────────────────────────┘
```

| Element | Specs |
|---------|-------|
| **Logo** | SVG noir, 112×41 px (rendu 126×41 effectif) |
| **Liens menu** | Futura PT, 16px, weight 600, color black |
| **Dropdowns** | Items : Logiciel comptabilite, Simulateur, Tester eligibilite, Prendre RDV, Livres blancs, Webinars, Comparateur LMNP |
| **CTA primary** | "Calculer mes economies" (pill black) |
| **CTA secondary** | "Espace client" (pill outline) |

### Liens de navigation observes

Liens visibles sur la nav :
- **Services** ▼ (dropdown avec : Logiciel comptabilite, Simulateur, Tester eligibilite, Prendre RDV)
- **Outils** → `/modeles`
- **Blog** → `/blog`
- **Tarifs** → `/offre-lmnp-tarif`
- **Ressources** ▼ (dropdown avec : Livres blancs, Webinars, Comparateur LMNP)

### Style des liens

```css
.navbar_link {
  font-family: futura-pt, sans-serif;
  font-size: 16px;
  font-weight: 600;             /* demi */
  color: #09090B;
  padding: 0 16px;              /* ou similaire */
  transition: all 0.3s ease;
}

.navbar_link:hover {
  /* Webflow gere via interaction JS */
}
```

### Dropdowns

Les dropdowns sont des `.wrapper_dropdown-navbar.w-inline-block` avec :
- Items presentes en grille (4 colonnes pour Services)
- Chaque item a une icone (Calculator, ChartPieSlice, CheckFat, CalendarBlank, Book, Television...)
- Icones sont des SVG hostes sur Webflow CDN

### Mobile

Classe `mobile-button` indique un menu burger mobile. Pas extrait en detail ici (necessite resize viewport).

## Headband Annonce (top bar)

Visible au-dessus de la nav principale :

```css
.navbar_headband-link.is-headband.background-color-orange {
  background-color: #FFF3DF;     /* --orange-100 */
  color: #09090B;
  padding: 8px 16px;
  font-family: futura-pt, sans-serif;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

/* Variant paid pages (nopillo.com clients) */
.navbar_headband-link.is-headband.background-color-orange.is-paid {
  background-color: #FFC192;     /* --lp--orange (plus sature) */
}
```

**Contenu type** :
> ✅ Outil gratuit — LMNP : Votre declaration est-elle conforme ? Obtenez votre score de risque fiscal en 3 minutes. **En savoir plus →**

**Pattern** :
- Emoji ✅ ou ⚡ comme prefixe
- "Outil gratuit —" ou "Nouveau —" en italic/bold
- Description en regular
- "En savoir plus →" en lien indigo en fin

## Footer Multi-Colonnes

### Structure detectee

```html
<footer class="footer_component is-new">
  <!-- 5-6 colonnes de liens -->
</footer>
```

### Categories de liens

Le footer regroupe ~25 liens organises (deduits des href) :

#### Colonne 1 — Produit
- Tarifs (`/offre-lmnp-tarif`)
- (probablement) Logiciel, Simulateur, Comparateur

#### Colonne 2 — Ressources
- Avis clients (`/avis-client`)
- Ils racontent leur experience
- Glossaire (`/glossaire-lmnp-fiscalite`)

#### Colonne 3 — Entreprise
- Qui sommes-nous (`/qui-sommes-nous`)
- On recrute (Welcome to the Jungle externe)
- Contact (`/contact-clients`)

#### Colonne 4 — Communaute
- Newsletter S'inscrire (`/newsletter`)
- Parrainage (`/programme-parrainage`)
- Devenez partenaire (`/partenariats`)

#### Colonne 5 — Reseaux sociaux
- Linkedin
- Instagram
- TikTok
- YouTube
- Facebook

#### Colonne 6 — Legal
- Politique de confidentialite
- Mentions legales
- CGU
- Preferences cookies

### Styles deduits

```css
.footer_component {
  background-color: transparent;     /* sur fond page */
  color: #09090B;
  padding: 80px 0;                   /* deduit */
}

.titles_link-footer {                /* class detectee */
  font-family: futura-pt, sans-serif;
  font-weight: 600;
  font-size: 16px;
  color: #09090B;
}

/* Liens footer */
.footer_link {
  font-family: futura-pt, sans-serif;
  font-weight: 400;
  font-size: 14px;                   /* probable */
  color: #5D6B98;                    /* graycool500 muted */
}
```

## Pattern d'Implementation Webflow Variables

Pour reproduire dans Webflow Variables / autre projet :

```css
/* Tokens de composition */
:root {
  --header-height: 80px;
  --header-bg: var(--white);
  --header-z-index: 100;
  --header-fixed: fixed;

  --headband-height: 40px;
  --headband-bg: var(--orange-100);
  --headband-padding: 8px 16px;

  --footer-padding-y: 80px;
  --footer-bg: var(--white);
  --footer-link-color: var(--graycool500);
  --footer-link-color-hover: var(--black);
}
```

## Sources

- Extraction : `document.querySelector('nav, [role="navigation"], [class*="navbar"]')` + `footer`
- Date : 2026-05-05
- Capture : `assets/navbar.png`
