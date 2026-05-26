# 02 - Setup d'un projet Supabase Edge Functions

## Pre-requis

| Outil | Installation | Pourquoi |
|-------|--------------|----------|
| Supabase CLI | `brew install supabase/tap/supabase` ou `npm i -g supabase` | Init, dev local, deploy |
| Docker (optionnel) | `brew install --cask docker` | Stack Supabase locale complete |
| Deno (optionnel) | `brew install deno` | LSP, lint, format |
| Node 18+ | `brew install node` | Tooling annexe |

Compte Supabase a creer sur https://supabase.com (free tier).

---

## Etape 1 : Init projet local

```bash
$ mkdir nopillo-landing-backend && cd nopillo-landing-backend
$ supabase init
```

Genere :

```
supabase/
├── config.toml          # Config locale (ports, services actives)
├── functions/           # Vos Edge Functions
├── migrations/          # Migrations SQL
└── seed.sql             # Donnees de seed
```

Versionner `supabase/` dans Git, ignorer `.branches/`, `.temp/`.

---

## Etape 2 : Creer une fonction

```bash
$ supabase functions new hello-landing
```

Genere `supabase/functions/hello-landing/index.ts`. Trois patterns possibles :

### Pattern 1 : `Deno.serve` (le plus simple)

```ts
import "jsr:@supabase/functions-js/edge-runtime.d.ts"

Deno.serve(async (req) => {
  const { name } = await req.json()
  return Response.json({ message: `Hello ${name}!` })
})
```

### Pattern 2 : Hono (recommande pour multi-routes)

```ts
import { Hono } from "jsr:@hono/hono"

const app = new Hono().basePath("/hello-landing")
app.get("/ping", (c) => c.text("pong"))
app.post("/lead", async (c) => c.json({ received: await c.req.json() }))

Deno.serve(app.fetch)
```

> Sur Supabase, les routes doivent etre prefixees par le nom de la fonction. `basePath("/hello-landing")` est obligatoire.

### Pattern 3 : `withSupabase` (template Dashboard)

Wrapper qui injecte le client Supabase auto :

```ts
export default {
  fetch: withSupabase({ allow: ['public', 'secret'] }, async (req, ctx) => {
    const { name } = await req.json()
    return Response.json({ message: `Hello ${name}!` })
  }),
}
```

---

## Etape 3 : Dev local

| Commande | Effet |
|----------|-------|
| `supabase start` | Stack locale complete (Postgres + Auth + API + Functions, ~1 GB Docker) |
| `supabase functions serve` | Servir uniquement les Edge Functions (sans Docker complet) |
| `supabase functions serve hello-landing` | Servir une seule fonction |

Premiere execution affiche les URLs locales (`http://127.0.0.1:54321`, Studio sur `:54323`, anon/service_role keys, JWT secret). Hot-reload actif. La fonction tourne sur `http://localhost:54321/functions/v1/hello-landing`.

### Tester avec curl

```bash
$ curl -i -X POST http://127.0.0.1:54321/functions/v1/hello-landing \
    -H "Authorization: Bearer <ANON_KEY_LOCAL>" \
    -H "Content-Type: application/json" \
    -d '{"name":"Nopillo"}'
```

Reponse attendue : `HTTP/1.1 200 OK` + `{"message":"Hello Nopillo!"}`.

---

## Etape 4 : Connecter le projet remote

Creer un projet sur https://supabase.com/dashboard puis :

```bash
$ supabase login
$ supabase projects list
$ supabase link --project-ref <PROJECT_REF>
```

Le `PROJECT_REF` est dans l'URL : `https://supabase.com/dashboard/project/<PROJECT_REF>`.

---

## Etape 5 : Variables d'env (secrets)

Ne JAMAIS commit les secrets. Cote Supabase :

```bash
$ supabase secrets set HUBSPOT_TOKEN=pat-na1-xxxxx
$ supabase secrets set INTERNAL_API_KEY=$(openssl rand -hex 32)
$ supabase secrets list
```

Dans le code :

```ts
const token = Deno.env.get("HUBSPOT_TOKEN")
if (!token) throw new Error("HUBSPOT_TOKEN missing")
```

Pour le dev local, creer `supabase/functions/.env.local` (gitignore) puis :

```bash
$ supabase functions serve --env-file supabase/functions/.env.local
```

---

## Etape 6 : Deploy

| Commande | Effet |
|----------|-------|
| `supabase functions deploy hello-landing` | Deploy une fonction |
| `supabase functions deploy` | Deploy toutes les fonctions |
| `supabase functions deploy hello-landing --use-api` | Bundle cote serveur (sans Docker, plus rapide en CI, depuis 2025) |

Sortie typique : `Deployed Function hello-landing on project <ref>` + URL Dashboard.

---

## Etape 7 : Invoquer la fonction deployee

URL : `https://<PROJECT_REF>.supabase.co/functions/v1/hello-landing`

### Avec fetch ou SDK

```ts
// Option 1 : fetch direct
const r = await fetch("https://<ref>.supabase.co/functions/v1/hello-landing", {
  method: "POST",
  headers: { apikey: "<PUBLISHABLE_KEY>", "Content-Type": "application/json" },
  body: JSON.stringify({ name: "Nopillo" }),
})

// Option 2 : SDK Supabase
import { createClient } from "@supabase/supabase-js"
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
const { data, error } = await supabase.functions.invoke("hello-landing", {
  body: { name: "Nopillo" },
})
```

### Sans verif JWT (fonction publique)

Pour une landing page accessible a tous, dans `supabase/config.toml` :

```toml
[functions.hello-landing]
verify_jwt = false
```

Redeploy. La fonction est appelable sans header `Authorization`.

---

## Etape 8 : Logs et debug

```bash
$ supabase functions logs hello-landing --tail
```

Ou via Dashboard : `Project > Edge Functions > <nom> > Logs`. Logs structures avec `console.log/error`, niveau visible dans le Dashboard.

---

## Etape 9 : CI/CD GitHub Actions

`.github/workflows/deploy-edge.yml` :

```yaml
name: Deploy Edge Functions
on:
  push:
    branches: [main]
    paths: ["supabase/functions/**"]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: supabase/setup-cli@v1
        with: { version: latest }
      - run: supabase functions deploy --project-ref ${{ secrets.SUPABASE_PROJECT_REF }} --use-api
        env:
          SUPABASE_ACCESS_TOKEN: ${{ secrets.SUPABASE_ACCESS_TOKEN }}
```

GitHub Secrets necessaires :
- `SUPABASE_PROJECT_REF` : ref du projet
- `SUPABASE_ACCESS_TOKEN` : genere via https://supabase.com/dashboard/account/tokens

---

## Checklist Nopillo - nouveau projet

- [ ] `supabase init` et commit `supabase/`
- [ ] Creer projet sur supabase.com + `supabase link --project-ref <ref>`
- [ ] Definir secrets via `supabase secrets set`
- [ ] Creer `.env.local` ignore par Git pour dev
- [ ] Premiere fonction avec `verify_jwt = false` si publique
- [ ] Deploy via `--use-api` en CI
- [ ] Workflow GitHub Actions branche
- [ ] Verifier les logs dans le Dashboard

---

## Sources

- [Quickstart Edge Functions (CLI)](https://supabase.com/docs/guides/functions/quickstart) — `supabase init`, `functions new`, `serve`
- [Quickstart Dashboard](https://supabase.com/docs/guides/functions/quickstart-dashboard) — deploy sans CLI
- [Deploy to Production](https://supabase.com/docs/guides/functions/deploy) — flag `--use-api`, secrets
- [Routing (Hono, Express, Oak)](https://supabase.com/docs/guides/functions/routing) — multi-routes pattern
- [CI testing GitHub Actions](https://supabase.com/docs/guides/deployment/ci/testing) — workflow CI
- [sources.md](./sources.md) — index complet des references
