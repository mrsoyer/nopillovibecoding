# 05 — Integration Supabase (DB + Edge Functions) avec Netlify

## Sommaire

- [Architecture cible](#architecture-cible)
- [Etape 1 — Setup Supabase](#etape-1--setup-supabase)
- [Etape 2 — Connecter Netlify via l'extension officielle](#etape-2--connecter-netlify-via-lextension-officielle)
- [Etape 3 — Schema de base de donnees](#etape-3--schema-de-base-de-donnees)
- [Etape 4 — Edge Function pour le formulaire](#etape-4--edge-function-pour-le-formulaire)
- [Etape 5 — Cote client](#etape-5--cote-client)
- [Pieges et bonnes pratiques](#pieges-et-bonnes-pratiques)

## Architecture cible

```
┌──────────────────────────────────────────────────┐
│  Landing (Astro/Vite) hebergee sur Netlify       │
│  - HTML pre-rendu, JS minimal                    │
│  - Formulaire de contact                         │
└────────────────┬─────────────────────────────────┘
                 │ POST /contact
                 ▼
┌──────────────────────────────────────────────────┐
│  Supabase Edge Function (Deno)                   │
│  - Validation                                    │
│  - Anti-spam                                     │
│  - Insertion DB + integrations tierces           │
└────────────────┬─────────────────────────────────┘
                 │
                 ▼
┌──────────────────────────────────────────────────┐
│  Supabase Postgres                               │
│  - Table leads (avec RLS)                        │
│  - Service role uniquement depuis Edge Function  │
└──────────────────────────────────────────────────┘
```

## Etape 1 — Setup Supabase

```bash
# Install Supabase CLI (si pas deja fait)
brew install supabase/tap/supabase

# Login
supabase login

# Init dans ton projet landing
cd ma-landing
supabase init

# Cree un projet sur supabase.com puis link
supabase link --project-ref <project-id>

# Ou cree directement depuis CLI :
# supabase projects create ma-landing --org-id <org-id>
```

## Etape 2 — Connecter Netlify via l'extension officielle

C'est l'etape qui te fait gagner le plus de temps. L'extension Netlify x Supabase :
- Connecte ton projet Netlify a Supabase via OAuth
- Injecte automatiquement les variables d'environnement
- Applique les bons prefixes selon le framework detecte (Astro = `PUBLIC_*`, Next = `NEXT_PUBLIC_*`, Vite = `VITE_*`)

### Installation

1. Va sur ton dashboard Netlify → **Extensions** → chercher "Supabase"
2. Click **Install** (necessite role Team Owner)
3. Sur ton site Netlify → **Project configuration** → **General** → **Supabase**
4. Click **Connect** → OAuth flow Supabase
5. Selectionner le projet Supabase → **Save**

### Resultat

3 variables d'environnement injectees automatiquement, avec les bons prefixes selon le framework :

| Variable | Visibilite | Usage |
|----------|------------|-------|
| `SUPABASE_DATABASE_URL` | Server uniquement | Connexion Postgres directe (rare) |
| `SUPABASE_SERVICE_ROLE_KEY` | Server uniquement | Edge Functions / Netlify Functions |
| `SUPABASE_ANON_KEY` | Public (avec prefix `PUBLIC_*` ou `VITE_*`) | Client Supabase cote browser |
| `SUPABASE_URL` | Public | URL du projet Supabase |

> Chaque membre de l'equipe Netlify doit faire son propre OAuth (auth user-level, pas org-level).

Source : [Netlify Supabase integration docs](https://docs.netlify.com/extend/install-and-use/setup-guides/supabase-integration/).

## Etape 3 — Schema de base de donnees

Migration `supabase/migrations/20260526_create_leads.sql` :

```sql
-- Table des leads collectes via la landing
CREATE TABLE public.leads (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email         text NOT NULL,
  name          text,
  source        text,                 -- "landing-pricing", "landing-home"
  utm_source    text,
  utm_medium    text,
  utm_campaign  text,
  payload       jsonb DEFAULT '{}'::jsonb,
  created_at    timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_leads_created_at ON public.leads (created_at DESC);
CREATE INDEX idx_leads_email ON public.leads (email);

-- RLS activee : aucun acces par defaut
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Seule la service_role peut lire/inserer (= depuis Edge Functions uniquement)
-- Aucune policy = aucun acces depuis le client public
COMMENT ON TABLE public.leads IS 'Leads collectes via les landings. Insertion via Edge Function uniquement.';
```

Apply :

```bash
supabase db push
```

## Etape 4 — Edge Function pour le formulaire

### Scaffolder

```bash
supabase functions new contact-form
```

### Code minimal (Deno)

`supabase/functions/contact-form/index.ts` :

```typescript
import { createClient } from 'jsr:@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',  // restreindre en prod au domaine de la landing
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405, headers: corsHeaders })
  }

  try {
    const { email, name, source, utm } = await req.json()

    // Validation basique
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return new Response(JSON.stringify({ error: 'Email invalide' }), {
        status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    // Anti-spam minimal (honeypot, throttle a ajouter)
    // Si tu integres turnstile/recaptcha, verifier le token ici

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    )

    const { error } = await supabase.from('leads').insert({
      email,
      name: name ?? null,
      source: source ?? 'landing',
      utm_source: utm?.source ?? null,
      utm_medium: utm?.medium ?? null,
      utm_campaign: utm?.campaign ?? null,
      payload: { user_agent: req.headers.get('user-agent') },
    })

    if (error) {
      console.error('Insert error:', error)
      return new Response(JSON.stringify({ error: 'Erreur serveur' }), {
        status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    // Optionnel : POST vers HubSpot/Brevo ici (cf. docs/hubspot/)

    return new Response(JSON.stringify({ ok: true }), {
      status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (err) {
    console.error('Unexpected error:', err)
    return new Response(JSON.stringify({ error: 'Erreur serveur' }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
```

### Variante avec Hono (routing + middleware)

Si tu veux plusieurs endpoints dans une seule fonction :

```typescript
import { Hono } from 'jsr:@hono/hono'
import { cors } from 'jsr:@hono/hono/cors'
import { createClient } from 'jsr:@supabase/supabase-js@2'

const app = new Hono().basePath('/contact-form')

app.use('*', cors())

app.post('/lead', async (c) => {
  const { email } = await c.req.json()
  // ... meme logique que ci-dessus
  return c.json({ ok: true })
})

app.post('/newsletter', async (c) => {
  // autre handler dans la meme fonction
  return c.json({ ok: true })
})

Deno.serve(app.fetch)
```

Source : [Hono Supabase Functions](https://hono.dev/docs/getting-started/supabase-functions).

### Deploy

```bash
# Local dev (port 54321)
supabase start
supabase functions serve contact-form

# Deploy en prod
supabase functions deploy contact-form

# Verifier
supabase functions list
```

Les secrets sont automatiquement disponibles via `Deno.env.get()`. Si tu veux ajouter des secrets custom :

```bash
supabase secrets set HUBSPOT_API_KEY=xxx
```

## Etape 5 — Cote client

### Astro / Vite

`src/lib/supabase.ts` :

```typescript
import { createClient } from '@supabase/supabase-js'

// Pour Astro : import.meta.env.PUBLIC_*
// Pour Vite : import.meta.env.VITE_*
const url = import.meta.env.PUBLIC_SUPABASE_URL ?? import.meta.env.VITE_SUPABASE_URL
const anonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY ?? import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(url, anonKey)
```

### Appel de l'Edge Function

```typescript
async function submitLead(email: string, name?: string) {
  const { data, error } = await supabase.functions.invoke('contact-form', {
    body: {
      email,
      name,
      source: 'landing-home',
      utm: {
        source: new URLSearchParams(location.search).get('utm_source'),
        medium: new URLSearchParams(location.search).get('utm_medium'),
        campaign: new URLSearchParams(location.search).get('utm_campaign'),
      },
    },
  })

  if (error) throw error
  return data
}
```

Alternative en fetch raw (sans supabase-js) :

```typescript
const res = await fetch(`${supabaseUrl}/functions/v1/contact-form`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'apikey': anonKey,
  },
  body: JSON.stringify({ email, name }),
})
```

## Pieges et bonnes pratiques

| Piege | Symptome | Fix |
|-------|----------|-----|
| Service role key exposee cote client | Lecture/ecriture libre par n'importe qui | Utiliser uniquement dans les Edge Functions, jamais dans le bundle client |
| RLS desactivee | N'importe quel client avec anon key peut tout lire | RLS activee + aucune policy = aucun acces public |
| CORS `*` en prod | Toute origine peut appeler l'Edge Function | Restreindre `Access-Control-Allow-Origin` au domaine de la landing |
| Long jobs dans Edge Function | Timeout, cold start visible | Sortir vers background worker (Trigger.dev, Inngest) si > 5s |
| Pas de rate limiting | Spam massif sur le form | Ajouter Turnstile/reCAPTCHA cote client + throttle IP cote function |
| Cold start sur peu de trafic | Latence visible | Acceptable pour un form (1 appel/visite), critique pour autre chose |

## Latence et cout (ordre de grandeur)

| Element | Latence typique | Cout (Free tier Supabase) |
|---------|-----------------|----------------------------|
| Edge Function (warm) | 50-150 ms | 500k invocations/mois inclus |
| Edge Function (cold) | 300-800 ms | meme |
| Insert Postgres | 10-50 ms | 500 MB DB inclus |
| Bandwidth Netlify | <100 ms | 100 GB/mois inclus |

Pour une landing avec quelques milliers de leads/mois, **tu restes dans le free tier des deux cotes**.

## Sources

- [Supabase Edge Functions overview](https://supabase.com/docs/guides/functions)
- [Supabase Edge Functions quickstart](https://supabase.com/docs/guides/functions/quickstart)
- [Netlify x Supabase integration](https://docs.netlify.com/extend/install-and-use/setup-guides/supabase-integration/)
- [Hono on Supabase Functions](https://hono.dev/docs/getting-started/supabase-functions)
- [Supabase Edge Functions in Practice (2026)](https://eastondev.com/blog/en/posts/dev/20260419-supabase-edge-functions/)
