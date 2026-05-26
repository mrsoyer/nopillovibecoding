# 01 — Overview : Pourquoi Aspirer un Design System

> Quand, pourquoi et avec quel cadre Nopillo "aspire" un DS depuis un site existant.

---

## 1. Le Besoin Nopillo

### 1.1 Trois scenarios recurrents

**Scenario A — Refonte avec reference**
Le client envoie 3-5 URLs de sites qu'il admire (Stripe, Linear, un concurrent prime). Brief : "Je veux ce niveau de finition mais pour MA marque." On doit extraire les patterns systemiques sans cloner.

**Scenario B — Migration vers Webflow**
Le client a un site existant en Next.js, WordPress custom ou Framer. Il veut basculer en Webflow sans perdre la coherence visuelle. On aspire le DS du site source pour le reconstruire en variables Webflow.

**Scenario C — Audit competition**
Le client veut comprendre ce qui rend les sites concurrents "premium" : analyser leur DS revele les choix concrets (echelle typographique modulaire, palette neutre + 1 accent sature, ombres multi-couches) qu'on adapte ensuite.

### 1.2 Ce que "aspirer un DS" veut dire chez Nopillo

| Aspirer (OK) | Copier (NON) |
|---|---|
| Echelle typographique 16/18/24/32/48/64 | Reprendre la police custom payante du site |
| Palette neutre 9 tons + 1 accent | Reprendre les hex exacts du logo client |
| Pattern de carte avec ombre multi-couches | Reprendre le HTML/CSS des cartes |
| Rythme spacing base 4 (4/8/12/16/24/32) | Reprendre les illustrations vectorielles |
| Hierarchie heading H1 96px / H2 64px | Reprendre les copywritings |

---

## 2. Cas d'Usage Concrets

### 2.1 SaaS B2B inspire de Linear

Client : SaaS B2B francais, 10 personnes, leve seed.
Brief : "Identite calme, premium, comme Linear."

Pipeline applique :
1. Aspiration de `linear.app` avec Dembrandt → tokens.json
2. Extraction de la grille typo (Inter Tight, echelle 14/16/18/24/32/48/72)
3. Extraction de la palette (gris froids precis : `#08090A` `#1C1D1F` `#26282B`)
4. Extraction des micro-radius (4px partout, jamais plus)
5. Reconstruction sous-marque client : meme grille, palette adaptee couleurs client (bleu turquoise au lieu du violet Linear), Webflow Variables

Resultat : DS coherent, jamais identique, livre en 2 jours au lieu de 5.

### 2.2 Landing page inspiree de Stripe

Client : startup fintech.
Brief : "Confiance institutionnelle, comme Stripe."

Pipeline :
1. Project Wallace sur `stripe.com` → audit specificite + tokens
2. Identification du pattern "gradient subtil + grand whitespace + typo serif headlines"
3. Extraction echelle spacing 4/8/16/24/32/48/64/96/128
4. Reconstruction Webflow avec Variables + Components custom

### 2.3 E-commerce inspire d'Apple

Client : marque DNVB premium.
Brief : "Aspect produit chirurgical Apple."

Pipeline :
1. designlang sur `apple.com/iphone-15` → 17 fichiers de sortie
2. Recuperation des tokens motion (ease curves, durations)
3. Extraction grille produits (gap precis, ratios image/texte)
4. Reconstruction Webflow Variables + animations IX2

---

## 3. ROI

### 3.1 Sans aspiration de DS

| Etape | Temps |
|---|---|
| Brief + analyse visuelle manuelle | 4h |
| Aller-retours design avec client | 8h |
| Construction DS Webflow from scratch | 12h |
| Iterations sur tokens flous | 6h |
| **Total** | **30h** |

### 3.2 Avec aspiration de DS

| Etape | Temps |
|---|---|
| Aspiration automatisee (Dembrandt + Claude curation) | 1h |
| Validation client sur tokens factuels | 2h |
| Adaptation a l'identite client | 4h |
| Import Webflow Variables (app ou MCP) | 1h |
| Construction composants Webflow MCP | 6h |
| **Total** | **14h** |

**Gain : 53% de temps**, livraison 2x plus rapide, decisions design defendables sur des references concretes.

---

## 4. Conditions de Succes

L'aspiration de DS est efficace SI :

1. **Site source riche en CSS variables** (les sites modernes Stripe/Linear/Vercel le sont)
2. **Site rendu cote client OU avec CSS visible** (pas un site "image only" type Squarespace)
3. **Brief client clair sur ce qui est "inspirant" vs "a reproduire"**
4. **Validation legale faite en amont** (voir [06-anti-patterns-legal.md](./06-anti-patterns-legal.md))
5. **Outils d'aspiration sous controle** (cf [02-outils-extraction.md](./02-outils-extraction.md))

L'aspiration **ne marche pas** ou est sous-optimale SI :

- Site avec CSS minifie sans variables (Tailwind v3 sans config exposee)
- Site protege anti-bot fort (Cloudflare strict)
- Site monopage marketing avec 0 systeme (juste 5 sections one-shot)
- Brief client "je veux exactement comme X" → refus, repositionner

---

## 5. Ethique Nopillo

Trois principes :

1. **Transparence** : on dit toujours au client "voici les references qu'on a etudiees"
2. **Originalite** : tout livrable Nopillo doit etre defendable comme original meme si inspire
3. **Refus assume** : on refuse les briefs "clone Stripe" — on propose "inspire de Stripe pour TON contexte"

---

## Sources

- [Theming with design tokens (Webflow)](https://webflow.com/blog/theming-design-tokens) — cadrage strategique aspiration de DS
- [Using a design system in Webflow](https://help.webflow.com/hc/en-us/articles/41959932025235-Using-a-design-system-in-Webflow) — pourquoi systematiser
- [SaaS marketing sites Figma → Webflow](https://webflow.com/blog/figma-design-system-to-webflow-saas-marketing-sites) — ROI documente sur cas SaaS
- [docs/design-system-extraction/02-outils-extraction.md](./02-outils-extraction.md) — stack outils referencee
- [docs/design-system-extraction/06-anti-patterns-legal.md](./06-anti-patterns-legal.md) — cadre legal et ethique

## Suivant

- [02-outils-extraction.md](./02-outils-extraction.md) — Le stack technique d'extraction
- [06-anti-patterns-legal.md](./06-anti-patterns-legal.md) — Cadre legal precis
