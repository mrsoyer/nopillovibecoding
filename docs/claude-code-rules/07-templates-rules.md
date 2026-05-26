# Templates Rules — Exemples Concrets

> Templates et exemples par type de fichier pour le `/skill-maker`. Reference d'execution pour [05-pattern-rules-landing.md](05-pattern-rules-landing.md).

## Table des Matieres
1. [Template generique front](#template-generique-front)
2. [Template generique back](#template-generique-back)
3. [Exemple : page Astro](#exemple-page-astro)
4. [Exemple : island React](#exemple-island-react)
5. [Exemple : edge function](#exemple-edge-function)

## Template Generique Front

Variables a substituer : `{NomComponent}`, `{role}`, `{type}`, `{paths-match}`.

```yaml
---
paths:
  - "front/src/components/{NomComponent}.{astro,tsx}"
---

# {NomComponent} — {role en 3-5 mots}

## Role
{1-3 phrases : pourquoi ce composant existe, ce qu'il fait pour l'utilisateur}

## Type
- {Astro statique | React island | Layout | Page}
- Hydratation : {client:visible | client:load | aucune}

## Structure
{Sous-sections du composant si pertinent}
- Header avec titre H1/H2
- Image illustrative
- 1-2 CTAs (variants)

## Dependances entrantes
{Ou ce composant est utilise}
- Importe par `front/src/pages/index.astro` (section 1)
- Importe par `front/src/pages/pricing.astro` (header)

## Dependances sortantes
{Ce que ce composant importe ou appelle}
- `<Image>` d'Astro depuis `astro:assets`
- Helper `getUTMParams()` depuis `front/src/lib/utm.ts`
- Variable env `HERO_CTA` depuis `front/.env`

## Contraintes
{Regles non negociables}
- LCP element : image hero `loading="eager"`, `fetchpriority="high"`
- Texte CTA via variable env, pas hardcode
- Pas d'animation framer-motion (kill LCP)

## Endpoints / actions
{Si le composant declenche des actions}
- Bouton CTA principal : scroll vers `#contact-form`
- Bouton "En savoir plus" : open modal `<PricingModal />`

## A surveiller
{Pieges courants}
- Si modifier la taille image : mettre a jour `width`/`height` (CLS)
- Si changer le CTA : mettre a jour events GA4 dans `front/src/lib/analytics.ts`
```

## Template Generique Back

```yaml
---
paths:
  - "supabase/functions/{function-name}/**"
---

# Edge function : {function-name}

## Role
{1-3 phrases : ce que cette function fait dans le systeme}

## Endpoint
`POST ${SUPABASE_URL}/functions/v1/{function-name}`

## Inputs attendus
| Champ | Type | Required | Validation |
|-------|------|----------|------------|
| email | string | oui | regex stricte |
| name  | string | oui | 2-80 chars |
| _honey | string | -    | doit etre vide (honeypot) |

## Validations
- Email regex stricte
- Honeypot non-vide -> 200 OK silencieux (anti-spam)
- Rate limit : 5/min/IP (Deno KV)

## Outputs
- `200` : `{ ok: true, id: <uuid> }`
- `400` : `{ error: "validation_failed", details: [...] }`
- `429` : `{ error: "rate_limited" }`
- `500` : `{ error: "internal" }` + `console.error` contexte

## Side effects
- INSERT dans `public.leads`
- Webhook HubSpot (si `HUBSPOT_API_KEY` set)

## Securite
- CORS restreint a `ALLOWED_ORIGINS` (env) — JAMAIS `*` en prod
- `SUPABASE_SERVICE_ROLE_KEY` via `Deno.env.get()` uniquement
- Logs sans email/message (PII)

## Dependances entrantes
- `front/src/components/ContactForm.tsx` (hook useContactForm)

## Dependances sortantes
- Table `public.leads` (INSERT)
- Webhook HubSpot (si env present)
- Deno KV pour rate limiting

## A surveiller
- Si modifier le schema d'input : synchroniser `front/src/types/contact-form.ts`
- Si ajouter un champ obligatoire : migration de `public.leads`
```

## Exemple : Page Astro

Cas reel : `front/src/pages/index.astro` (page d'accueil landing).

```yaml
---
paths:
  - "front/src/pages/index.astro"
---

# Page d'accueil (landing principale)

## Role
Page de conversion principale. Trafic Google Ads + organique.

## Sections (ordre vertical)
1. Hero (LCP)
2. SocialProof (logos clients)
3. Features (3 cards)
4. Pricing (table)
5. FAQ (accordion island)
6. ContactForm (island)
7. Footer

## SEO
- Title : 50-60 chars, mot-cle principal en premier
- Meta description : 150-160 chars
- Schema.org Organization + Product (JSON-LD)
- Canonical : auto-genere

## Performance
- Sections .astro pures sauf FAQ/ContactForm
- Cible Lighthouse Performance ≥ 95
- LCP < 1.5s

## Lien backend
- ContactForm POST vers `/functions/v1/contact-form`
```

## Exemple : Island React

Cas reel : `front/src/components/ContactForm.tsx`.

```yaml
---
paths:
  - "front/src/components/ContactForm.tsx"
---

# ContactForm — formulaire de contact (island)

## Role
Capture des leads. Soumet vers edge function `contact-form`.

## Type
React island, hydratation `client:visible`.

## State
- React Hook Form (resolver Zod)
- Honeypot field `_honey`
- UTM extraction au mount (`getUTMParams()`)

## Endpoint
POST `${PUBLIC_SUPABASE_URL}/functions/v1/contact-form`

## Validation client
Schema Zod identique a la validation serveur :
- email : email valide
- name : 2-80 chars
- message : 10-2000 chars

## Dependances entrantes
- `front/src/pages/index.astro` (section #contact-form)
- `front/src/pages/contact.astro` (page complete)

## Dependances sortantes
- `front/src/lib/utm.ts` (getUTMParams)
- `react-hook-form`, `zod`, `@hookform/resolvers/zod`

## A surveiller
- Si modifier le schema Zod : synchroniser avec edge function `contact-form`
- Honeypot field DOIT rester invisible (CSS) mais present dans le DOM
```

## Exemple : Edge Function

Cas reel : `supabase/functions/contact-form/index.ts` (capture leads).

```yaml
---
paths:
  - "supabase/functions/contact-form/**"
---

# Edge function : contact-form

## Role
Reception des leads depuis ContactForm. Insert + webhook HubSpot optionnel.

## Endpoint
POST `${SUPABASE_URL}/functions/v1/contact-form`

## Inputs attendus
| Champ | Type | Required | Validation |
|-------|------|----------|------------|
| email | string | oui | regex stricte |
| name | string | oui | 2-80 chars |
| message | string | oui | 10-2000 chars |
| utm_source | string | non | - |
| utm_medium | string | non | - |
| utm_campaign | string | non | - |
| _honey | string | -    | doit etre vide (honeypot) |

## Validations
- Email regex stricte
- Honeypot non-vide -> 200 OK silencieux (anti-spam)
- Rate limit : 5/min/IP (Deno KV)

## Outputs
- `200` : `{ ok: true, id: <uuid> }`
- `400` : `{ error: "validation_failed", details: [...] }`
- `429` : `{ error: "rate_limited" }`
- `500` : `{ error: "internal" }` + `console.error` contexte

## Side effects
- INSERT dans `public.leads`
- POST webhook HubSpot (si `HUBSPOT_API_KEY` set)
- Audit log dans `public.audit_log` (creation)

## Securite
- CORS restreint a `ALLOWED_ORIGINS` (env) — JAMAIS `*` en prod
- `SUPABASE_SERVICE_ROLE_KEY` via `Deno.env.get()` uniquement
- Logs sans email/message (PII RGPD)

## Dependances entrantes
- `front/src/components/ContactForm.tsx`
- `front/src/components/NewsletterForm.tsx` (variante avec champ moins)

## Dependances sortantes
- Table `public.leads` (INSERT via service role)
- Webhook HubSpot (si env present)
- Deno KV pour rate limiting

## A surveiller
- Schema d'input = schema Zod cote front (synchroniser les deux)
- Si ajouter un champ obligatoire : migration de `public.leads`
- Si modifier le rate limit : verifier impact campagnes Ads
```

## Pour les Migrations et RPC

Le pattern migration / RPC suit la meme logique. Sections cles :
- **Schema** : tableau colonnes (Colonne, Type, Constraints, Note)
- **RLS Policies** : INSERT / SELECT / UPDATE / DELETE par role (anon, authenticated, service_role)
- **Index** : justifier chaque index par une requete reelle
- **Dependances entrantes** : edge functions / RPC qui touchent la table
- **A surveiller** : compliance RGPD, soft-delete vs hard-delete, ALTER risques

Exemple complet du template migration : voir `init-landing-stack/assets/templates/supabase/migrations/create_leads.sql.tmpl` pour le SQL de reference.

## Sources

- [How Claude remembers your project](https://code.claude.com/docs/en/memory) — Format `.claude/rules/` officiel
- Project actuel : templates `init-landing-stack/assets/templates/claude-rules/{frontend,backend}.md.tmpl`
- [Claude Code Rules Directory](https://claudefa.st/blog/guide/mechanics/rules-directory) — Patterns d'exemples
