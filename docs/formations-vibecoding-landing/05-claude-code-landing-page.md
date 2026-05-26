# 05 — Workflow Claude Code : Landing Page en 2 Heures

## Vue d'Ensemble

Cette section documente le workflow exhaustif pour passer d'un terminal vide à une **landing page déployée en HTTPS** avec capture email, analytics, et OG tags en **2 heures** maximum, en utilisant uniquement Claude Code.

**Source primaire** : [Claude Fluent — Ship a Landing Page in 2 Hours](https://www.claudefluent.com/guides/claude-code-landing-page).

## Stack Non-Négociable

| Layer | Outil | Raison |
|-------|-------|--------|
| Framework | **Next.js** (App Router, TypeScript) | SSR + API routes |
| Styling | **Tailwind CSS** | Pas de combat avec CSS |
| Email | **Resend** (3 000 emails/mois free) | API simple |
| Hosting | **Vercel** | Deploy via `git push` |
| Analytics | **Vercel Analytics + Speed Insights** | Inclus, RGPD-friendly |

## Workflow Détaillé

### Étape 0 — Pré-requis (5 minutes)

```bash
# Vérifier installation
claude --version

# Sinon installer
npm install -g @anthropic-ai/claude-code
```

### Étape 1 — Setup projet (5 minutes)

```bash
mkdir my-landing-page && cd my-landing-page
claude
```

### Étape 2 — Prompt initial (3-4 minutes de génération)

Template de prompt **précis** :

```
Create a Next.js landing page for [PRODUCT NAME] that [ONE-LINE VALUE PROP].

Include:
1. Hero section (headline, subheadline, email capture)
2. "How it works" section (3 steps)
3. Features section (4 feature cards)
4. Social proof/testimonials section
5. Final CTA with email capture
6. Footer with links

Style with Tailwind CSS using [COLOR SCHEME].
Create /api/subscribe endpoint for email collection (local JSON initially).
Use TypeScript and App Router.
```

**Anti-pattern** : "fais-moi une jolie landing pour mon SaaS" → Claude doit deviner, qualité dégradée.

### Étape 3 — Itération design (10-15 minutes)

```bash
npm run dev  # http://localhost:3000
```

Prompts à fort impact à utiliser successivement :

| Symptôme | Prompt à donner |
|----------|----------------|
| Hero générique | `"The hero headline is too generic. Change it to: [TEXTE PRÉCIS]"` |
| Manque d'air | `"Add more breathing room"` (sur la section concernée) |
| Statique | `"Implement subtle scroll animations"` |
| CTA peu visible | `"Increase button contrast"` |
| Hero plat | `"Add gradient mesh background"` |

**Itérations attendues** : 4 à 6 rounds, 30-60 sec chacun.

### Étape 4 — Capture email réelle (15 minutes)

```
Replace local JSON storage with Resend API integration.
API key: [YOUR_KEY] (add as env var)

On email submission:
1. Add to Resend audience "Waitlist"
2. Send confirmation email from [YOUR_EMAIL]
   Subject: "You're on the list"
3. Show success state on form
```

Setup `.env.local` :
```bash
RESEND_API_KEY=re_xxx
```

Ne jamais oublier `.gitignore` pour `.env.local`.

**Alternatives Resend** : Mailchimp, ConvertKit, Supabase (cf. [06](06-claude-code-supabase-saas.md)).

### Étape 5 — Analytics + OG tags (5 minutes — un seul prompt)

```
Add Vercel Analytics and Speed Insights.
Add OpenGraph meta tags and Twitter card.

OG Title: [YOUR TITLE]
OG Description: [YOUR DESCRIPTION]
Generate OG image using @vercel/og with product name
on dark [COLOR] background.
```

Claude génère :
- `app/layout.tsx` avec metadata
- `app/opengraph-image.tsx` (image dynamique)
- `<Analytics />` + `<SpeedInsights />`

### Étape 6 — Déploiement (10 minutes)

**Git push** :
```
Initialize git repo, create .gitignore for Next.js,
push to new GitHub repository.
```
→ Claude Code exécute `gh repo create` puis `git push`.

**Vercel** :
1. Visiter `https://vercel.com/new`
2. Importer le repo GitHub
3. Vercel auto-détecte Next.js
4. Ajouter `RESEND_API_KEY` dans les env vars
5. Custom domain (2 minutes dans Vercel settings)

**Déploiements suivants** : automatiques à chaque `git push` sur `main`.

## Livrables Finaux (après 2 h)

✅ Landing page responsive 5+ sections
✅ Capture email avec confirmation
✅ Analytics tracking
✅ OG tags pro pour partage social
✅ URL HTTPS production
✅ Repo GitHub pour itération

## Patterns Critiques de Succès

### Pattern 1 — Précision contre vague

❌ Vague : `"améliore le hero"`
✅ Précis : `"Change the hero headline to '[TEXTE]', reduce vertical padding to 80px, add 16px between subtitle and CTA"`

### Pattern 2 — Ship at 80%

> "Launch with good-enough design; iterate with real user feedback."

Ne pas viser la perfection avant le live. Le feedback utilisateur priorise mieux que vous.

### Pattern 3 — Mobile-first dès le départ

Toujours inclure dans les prompts : `"ensure mobile responsive at 320px, 768px, 1024px breakpoints"`.

### Pattern 4 — Toujours analytics

Sans données de validation, vous optimisez à l'aveugle.

### Pattern 5 — Discipline de prompting

> Focus sur trois éléments : **what** (le composant fait), **how** (look & feel), **where** (data flows). Never write code yourself; steer Claude Code's execution.

## Anti-Patterns

❌ **Demander tout en un prompt monstre** — Claude perd le focus, livre du moyen partout
❌ **Itérer sans tester en local** — Le prompt next/screenshot doit être basé sur ce que vous voyez
❌ **Oublier `.env.local` dans `.gitignore`** — Risque de leak API keys sur GitHub public
❌ **Pas de section "social proof"** — Diminue conversion de 19-34 % (cf. [07](07-conversion-best-practices.md))
❌ **Mettre en prod sans Speed Insights** — On ne peut pas optimiser ce qu'on ne mesure pas

## Variantes du Workflow

### Variante "Astro" (Léon Furze)

Si content-heavy / blog plutôt que SaaS marketing :

- Framework : **Astro 5** (au lieu de Next.js)
- Styling : CSS scoped + custom properties (sans Tailwind)
- Storage : fichiers TypeScript de data (pas de CMS)
- Hosting : **Cloudflare Pages** (au lieu de Vercel)
- SEO : `@astrojs/sitemap` automatique
- Images : conversion WebP

### Variante "Plus de polish" (8 h au lieu de 2 h)

Pour landing premium :
1. Brand pack : couleurs, fonts, logos en input
2. Run audits parallèles : `"Run simultaneous audits: accessibility, security, fact-checking"`
3. WCAG AA : `"Contrast levels fail accessibility standards; adjust to meet WCAG AA"`
4. Case studies : `"Extract case studies into separate pages with linking cards"`

## Workflow vs résultats

| Effort | Durée | Résultat |
|--------|-------|----------|
| Minimal | 2 h | Landing fonctionnelle, conversion correcte |
| Polish | 4-6 h | Landing pro, animations, accessibilité WCAG AA |
| Premium | 8-12 h | Landing avec pages secondaires, blog, case studies |

## Sources

- [Ship a Landing Page in 2 Hours — Claude Fluent](https://www.claudefluent.com/guides/claude-code-landing-page) — Workflow complet 2h
- [Building Websites with Claude Code — Léon Furze](https://leonfurze.com/2026/02/14/building-websites-with-claude-code/) — Variante Astro/Cloudflare
- [How to Build Landing Pages With Claude Code (No Coding) — Ryan Doser](https://ryandoser.com/claude-code-landing-pages/) — Approche pas-à-pas no-code
- [Claude Code for Web Design — UX Planet (Nick Babich)](https://uxplanet.org/claude-code-for-web-design-338064dbdfc0) — Perspective design
