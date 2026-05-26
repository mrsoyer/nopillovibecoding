# 07 - Webflow vs Supabase Edge : matrice de decision

> Aide concrete pour choisir le bon outil selon le besoin client.

---

## Les deux mondes

### Webflow
Plateforme **no-code** de creation de sites. Excellente pour :
- Le design visuel (interactions, animations, responsive)
- Les CMS de contenu editorial (blog, portfolio, etudes de cas)
- Les formulaires standards (avec integrations natives Mailchimp, Zapier)
- Les redirections, robots.txt, sitemap auto

### Supabase Edge Functions
**Code TypeScript/Deno** execute serverside. Excellent pour :
- Logique conditionnelle complexe
- Calls API tierces (HubSpot, Stripe, OpenAI)
- Personnalisation server-side
- Webhooks et automatisations
- Stockage de donnees (avec Postgres)

**Ce ne sont pas des concurrents directs**. Ce sont des briques complementaires.

---

## Matrice : besoin -> outil

| Besoin client | Webflow seul | Webflow + Edge | Stack alternatif |
|---------------|--------------|----------------|------------------|
| Site vitrine 5-10 pages | OUI | inutile | non necessaire |
| Blog editorial CMS | OUI | inutile | possible |
| Formulaire de contact simple | OUI | inutile | non |
| Formulaire avec push HubSpot | NON (Zapier paye) | **OUI** | OUI |
| Personnalisation par UTM | partiel (script DOM) | **OUI** | OUI |
| Personnalisation par geo-IP | NON | **OUI** | OUI |
| A/B test serveur | NON (client only) | **OUI** | OUI |
| Recommandation produit / IA | NON | **OUI** | OUI |
| Pricing dynamique | NON | **OUI** | OUI |
| Login / espace membre simple | partiel (Memberstack 25 USD/mois) | OUI (Supabase Auth) | OUI |
| E-commerce avance | partiel (Webflow Ecommerce limite) | possible | OUI (Shopify ou custom) |
| App SaaS | NON | NON | **OUI** (Astro/Next + Supabase) |

---

## Forces et faiblesses

### Webflow

**Forces**
- Time to market : 1-2 semaines pour un site complet
- DX visuelle pour designers / chefs de projet non devs
- Hosting + CDN inclus (Webflow CDN AWS Cloudfront)
- SEO solide (controle des metas, balises, sitemap)
- Ecosysteme : Memberstack, Finsweet, Wized

**Faiblesses**
- Code custom limite (Embed iframes, scripts dans `<head>`)
- Backend inexistant
- Vendor lock-in fort : export possible mais limite (CMS notamment)
- Cout par site (23 USD/mois CMS, 39 USD/mois Business)
- Pas de logique conditionnelle serveur

### Supabase Edge

**Forces**
- Backend complet (DB, Auth, Storage, Edge, Realtime)
- TypeScript moderne, excellent DX dev
- Free tier credible pour MVP et petits projets
- Open source, deployable self-hosted
- Compatible avec n'importe quel front

**Faiblesses**
- Demande des competences dev (TypeScript, Deno, SQL)
- Pas de "WYSIWYG"
- Plus de pieces a maintenir (vs un Webflow tout-en-un)
- Cold start ~ 300ms (vs ~ 50ms Webflow render statique)

---

## Cas concrets Nopillo

### Cas 1 : Cabinet de conseil, site presentation

**Contexte** : 8 pages, 1 formulaire contact qui envoie un mail.
**Recommandation** : **Webflow seul.** Forms natifs envoyes par mail, pas besoin d'edge.
**Cout** : 23 USD/mois Webflow CMS + nom de domaine.

### Cas 2 : Startup B2B SaaS, landing avec lead nurturing

**Contexte** : Landing principale + 5 LP par persona, formulaire qui doit creer un contact HubSpot avec scoring + notifier Slack + envoyer email Resend personnalise.
**Recommandation** : **Webflow + Edge Functions.** Webflow heberge, le formulaire POST vers une Edge Function `lead-capture`.
**Cout** : 39 USD/mois Webflow Business + 0 USD/mois Supabase Free + Resend free tier.

### Cas 3 : Marque DTC, e-commerce + landings campagnes

**Contexte** : 20 landings campagnes, A/B test sur le hero, contenu different par pays (FR/BE/CH), tracking conversion server-side (sans cookies third-party).
**Recommandation** : **Webflow + Edge Functions** avec une fonction `context` qui retourne tout. Custom code dans Webflow injecte les variantes.
**Cout** : 39 USD/mois Webflow + 25 USD/mois Supabase Pro (besoin de 24/7).

### Cas 4 : SaaS B2B avec espace client + landing marketing

**Contexte** : Landing publique + dashboard logue + API + emails transactionnels.
**Recommandation** : **Stack alternatif** : landing en Astro deployee Netlify, app en Next.js / React deployee Vercel ou Netlify, backend tout Supabase (DB + Auth + Edge + Storage). Webflow pas pertinent ici.
**Cout** : 0 a 50 USD/mois selon trafic.

### Cas 5 : Agence immobiliere multi-sites

**Contexte** : 12 sites quasi identiques (1 par agence), CMS partage, formulaires qui pushent vers leur CRM Apimo.
**Recommandation** : **Webflow + Edge Functions** pour le push CRM commun. Le code Edge est mutualise sur les 12 sites.
**Cout** : 12 sites Webflow + 1 projet Supabase Pro mutualise.

---

## Decision rapide (questions a poser au client)

1. **Le client a-t-il un dev en interne ou un budget dev recurrent ?**
   - Non -> Webflow seul ou Webflow + Edge gere par Nopillo
   - Oui -> tout est ouvert (stack alternatif credible)

2. **Le contenu doit-il etre modifie souvent par un non-dev ?**
   - Oui -> Webflow CMS (interface editeur excellente)
   - Non -> Astro + Markdown / Sanity peut etre plus performant

3. **Y a-t-il besoin d'integration CRM, paiement, IA, personnalisation ?**
   - Non -> Webflow seul
   - Oui -> Edge Functions obligatoires (qu'on les colle a Webflow ou un stack autre)

4. **Le SEO et les Core Web Vitals sont-ils prioritaires ?**
   - Webflow est bon mais Astro + Tailwind est techniquement superieur (HTML statique pur)

5. **Le projet va-t-il evoluer en application connectee ?**
   - Oui -> demarrer directement sur stack code (Astro/Next + Supabase)
   - Non -> Webflow OK

---

## Migration Webflow -> stack code

Si un client demarre sur Webflow et veut migrer plus tard :
- **Contenu CMS Webflow** : exportable en CSV / API. A re-injecter dans Supabase ou un CMS headless.
- **Design** : refait from scratch (HTML/Tailwind), Webflow exporte du HTML mais le code n'est pas reutilisable proprement.
- **URLs / SEO** : conserver les chemins, faire des redirections 301.
- **Forms** : si deja branche sur Edge Function, **rien a refaire** cote backend. Juste rebrancher le nouveau front.

> Conseil Nopillo : meme sur un projet 100% Webflow, **brancher des le jour 1 les formulaires sur une Edge Function** plutot que sur Webflow Forms natifs. Cela facilite enormement une migration future et evite les couts cachees Memberstack/Zapier.

---

## Recapitulatif

| Profil de projet | Outil principal | Edge Function ? |
|------------------|-----------------|-----------------|
| Vitrine simple | Webflow | Optionnel |
| Lead gen avec CRM | Webflow | **OUI** (lead capture) |
| Multi-langue / multi-pays | Webflow + locales | **OUI** (geo) |
| Personnalisation poussee | Webflow | **OUI** (context API) |
| App SaaS | Astro/Next | **OUI** (full backend) |
| E-commerce simple | Shopify | Optionnel |
| Site editorial complexe | Webflow CMS | Selon integrations |

**Regle simple** : des qu'il y a un appel API tiers en jeu (CRM, paiement, IA, geo), pensez Edge Functions. Le hosting front (Webflow ou autre) reste secondaire.

---

## Sources

- [Page produit Edge Functions](https://supabase.com/edge-functions) — capacites backend code
- [MakersDen - Next.js vs Astro 2025](https://makersden.io/blog/nextjs-vs-astro-in-2025-which-framework-best-for-your-marketing-website) — choix stack marketing
- [Vercel vs Supabase 2026 (UI Bakery)](https://uibakery.io/blog/vercel-vs-supabase) — comparatif vendors
- [Boilerplate Search - Supabase SaaS](https://boilerplatesearch.com/Supabase) — patterns app SaaS vs landing
- [08-stack-recommande-nopillo.md](./08-stack-recommande-nopillo.md) — stack code alternative
- [sources.md](./sources.md) — index complet des references
