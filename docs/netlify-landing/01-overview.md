# 01 — Netlify en 2026 pour agences landings

## Ce qu'est Netlify aujourd'hui

Netlify est une plateforme **Jamstack + edge computing** qui combine :

1. **Hosting CDN global** : sites statiques distribues sur edge worldwide.
2. **Build & deploy Git-based** : push → build → deploy automatique.
3. **Netlify Core Primitives** :
   - **Functions** (serverless Node/Deno/Go).
   - **Edge Functions** (Deno au plus proche du visiteur, < 50 ms).
   - **Forms** (capture sans backend).
   - **Image CDN** (resize, format auto WebP/AVIF).
   - **Blob Store** (stockage cle/valeur cote build et runtime).
   - **Identity / Auth** (basique).
4. **Deploy Previews** : URL unique par PR, partageable avec clients.
5. **Netlify Drawer** : feedback visuel client directement sur la preview, sync GitHub/Jira/Trello.

## Ce qui a change en 2026 (vs 2024)

| Feature | Avant | 2026 |
|---------|-------|------|
| Forms | Limite 100/mois free | **Illimite gratuit** avec spam protection |
| Edge Functions | Beta limitee | GA, latence < 50 ms, support framework natif |
| Image CDN | Add-on payant | Inclus, transformations a la volee |
| AI Code Gen | Inexistant | `netlify create` avec prompt naturel + Agent Runners |
| Pricing | Site fee + bandwidth | Pricing simplifie unique avec quotas genereux |
| Drawer collab | Limite | Sync natif Jira / GitHub / Trello / Azure DevOps |

## Pourquoi c'est interessant pour une agence

### 1. Cout par landing tres faible

- Free tier : 100 GB bandwidth/mois, 300 build minutes, Forms illimites, 1 site avec preview.
- Pro tier : ~ 19 USD/mois pour quotas multiples + collaboration agency.
- **Comparaison** : Webflow Site Plan basic = 14-23 USD/mois **par site**. Netlify Pro = 19 USD/mois **pour N sites**.

### 2. Performance par defaut

- HTML pre-rendu + servi depuis CDN = Lighthouse 95-100 sans effort.
- Image CDN + Edge cache = Core Web Vitals dans le vert.
- Astro Tailwind landing achieve "100 sur PageSpeed Insights en Accessibility, Best Practices et SEO, near-perfect en Performance" (source : Astro Landing Page).

### 3. Workflow agency-friendly

- 1 PR = 1 URL preview unique partagee au client : `https://deploy-preview-42--projet-client.netlify.app`.
- Netlify Drawer permet au client de **commenter en live** sur la preview (screenshot, mobile, video) → sync vers GitHub / Jira.
- Rollback instantane (1 clic vers ancien deploy).
- Branches deploys permanents pour staging.

### 4. Stack code = controle total

- Versioning Git de tout (HTML, CSS, contenus, env vars).
- Tests automatises (Lighthouse CI, Playwright).
- Pas de lock-in : migration vers Cloudflare Pages / Vercel / OVH triviale (c'est juste du HTML+JS).

## Limites a connaitre

- **Pas de CMS visuel** par defaut → besoin de TinaCMS, Decap, Sanity, Contentful, ou de coder en Markdown.
- **Pas d'editeur drag-drop** → l'integrateur ecrit du code (Astro/Tailwind).
- **Forms basiques** : pas de logique conditionnelle multi-step out-of-the-box (mais possible avec Functions).
- Latence cold start Functions (~ 100-300 ms premier hit).
- Build minutes limitees free tier (300/mois) → pas un probleme pour une landing simple, mais peut casser un workflow de 50 deploys/jour.

## Modele mental pour l'agence

```
Webflow                          Netlify (+ Astro)
-------                          -----------------
"Je dessine la landing"          "Je code la landing"
Designer-led                     Dev-led
Visual builder                   Editeur + Git
CMS inclus visuel                CMS optionnel (Decap, Tina, Sanity)
Form builder visuel              Form HTML + data-netlify
Tarif par site                   Tarif par compte (multi-sites)
Cycle : design → publish         Cycle : code → PR → preview → merge → deploy
```

## A retenir

Netlify n'est **pas un remplacant 1:1 de Webflow**. C'est une **stack alternative** quand le projet a des contraintes que Webflow ne peut pas servir efficacement (perf extreme, logique serveur, multi-env Git, budget hosting). Pour une landing marketing standard d'un client, Webflow reste plus rapide a livrer.

## Sources

- [Netlify Documentation - homepage](https://docs.netlify.com/) — vue d'ensemble plateforme et primitives 2026
- [Netlify Edge platform](https://www.netlify.com/platform/core/edge/) — positionnement edge computing GA
- [Netlify Functions platform](https://www.netlify.com/platform/core/functions/) — runtime serverless inclus
- [Netlify Review 2026 - Lucky Media](https://www.luckymedia.dev/insights/netlify) — synthese features et changements 2026
- [Netlify Guide 2026 - Codebrand](https://www.codebrand.us/blog/netlify-complete-guide-2026/) — pricing simplifie et quotas Forms illimites
- [Complete Guide to Netlify Pricing and Plans 2026 - Flexprice](https://flexprice.io/blog/complete-guide-to-netlify-pricing-and-plans) — chiffres free vs Pro tier
- [Netlify vs Webflow - Soft Galley 2026](https://www.softgalley.com/compare/netlify-vs-webflow) — comparatif positionnement agences
