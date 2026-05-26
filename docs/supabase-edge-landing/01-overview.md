# 01 - Overview : Supabase Edge en 2026

## C'est quoi une Edge Function Supabase

Une **Edge Function** est une fonction serveur :
- ecrite en **TypeScript**
- executee dans le runtime **Deno**
- distribuee sur un **reseau global** de points de presence
- invoquee via une URL HTTP `https://<project>.supabase.co/functions/v1/<nom>`

Elle joue le role d'un mini backend serverless, sans serveur a gerer.

---

## Architecture

D'apres la documentation officielle (`supabase.com/docs/guides/functions/architecture`) :

```
Client -> Global API Gateway -> Edge Runtime (Deno V8 isolate) -> Reponse
                                       |
                                       +-> Postgres / Auth / Storage / API tierce
```

Etapes detaillees :

1. **Request Gateway** : valide le JWT Supabase, applique le rate limiting
2. **Geographic routing** : le gateway determine la geolocalisation via IP et route vers le data center le plus proche (ex : requete depuis Amsterdam routee vers Frankfurt)
3. **Execution** : un nouveau **V8 isolate** est cree par invocation, sandboxe et isole en memoire
4. **Module loading** : le code est livre sous forme de **bundle ESZip** (format Deno compact contenant le graph complet de modules)
5. **Reponse** : retournee au client, logs et metriques persistees

### Cold start vs warm start

- **Cold start** : 200 a 500 ms environ (selon benchmarks 2026)
- **Warm start** : quelques millisecondes (isolate reutilise pour requetes consecutives)

Le format ESZip et l'overhead minimal de Deno gardent meme les cold starts rapides comparativement a AWS Lambda Node.js (1 a 3 sec).

---

## Runtime Deno

### Pourquoi Deno (et pas Node)

Choix officiel Supabase :
- **Securite first** : permissions explicites (`--allow-net`, `--allow-env`)
- **TypeScript natif** : pas de transpilation manuelle
- **Web standards** : `fetch`, `Request`, `Response`, `Deno.serve`
- **Open source** : code portable, executable n'importe ou (Deno Deploy, Cloudflare, self-hosted)

### Compat npm

Depuis Deno 2.x (et Supabase l'a integre depuis fin 2024), on peut importer **n'importe quel module npm** :

```ts
import { Stripe } from "npm:stripe@14"
import { createClient } from "npm:@supabase/supabase-js@2"
import { Hono } from "jsr:@hono/hono"
```

Trois protocoles d'import :
- `npm:` -> registre npm (2 millions de packages)
- `jsr:` -> JavaScript Registry (registre Deno officiel, types-first)
- `https://` -> URL directe (deno.land/x, esm.sh, etc.)

### Limites du runtime

- Pas de filesystem persistent (utiliser Supabase Storage)
- Pas de WebSocket long-running cote serveur (utiliser Supabase Realtime)
- Memoire limitee par invocation (~256 MB selon plan)
- Timeout d'execution : 150 sec en Pro, 60 sec en Free
- Pas d'IP egress statique (impossible de whitelist une IP precise pour appeler une API tierce qui le demanderait)

---

## Cas d'usage typiques

D'apres `supabase.com/edge-functions` et la doc :

| Categorie | Exemples |
|-----------|----------|
| Webhooks | Stripe, GitHub, Twilio, HubSpot |
| API & middleware | REST endpoints, BFF (backend-for-frontend) |
| Personnalisation | A/B test, geo-routing, contenu dynamique |
| AI / ML | Inference OpenAI, Anthropic, Hugging Face |
| Notifications | Envoi email transactionnel, SMS, push |
| Image | OG image generation, resize a la volee |
| CRM sync | Push lead vers HubSpot, Pipedrive, Salesforce |
| Bots | Slack, Discord, Telegram |

Pour Nopillo, les cas centraux sont :
- **Webhook receveur** : formulaire Webflow -> Edge Function -> HubSpot
- **API personnalisation** : landing Astro -> Edge Function -> contenu varie selon UTM/geo
- **Tracking enrichi** : cote serveur sans cookies third-party

---

## Nouveautes 2025-2026

D'apres `supabase.com/blog/supabase-edge-functions-deploy-dashboard-deno-2-1` :

- **Deploy depuis le Dashboard** : plus besoin de Docker / CLI pour des fonctions simples (mais pas de versioning, donc reserver au prototypage)
- **Editeur integre** : syntax highlighting, type-checking pour APIs Deno et Supabase
- **Templates pre-faits** : Stripe webhook, OpenAI integration, etc.
- **Test runner Dashboard** : executer une fonction avec payload custom directement dans l'UI
- **Deno 2.1** : commandes `deno init`, `deno test`, `deno lint` natives
- **Deploy sans Docker** : flag CLI `--use-api` qui passe par l'API publique au lieu du build local

---

## Architecture mentale a retenir

> Une Edge Function = un fichier `.ts` qui exporte un handler. Push, deploy, c'est en ligne globalement. Cold start sub-seconde. Compat npm. Ecrit en TS strict. Logs centralises dans le Dashboard.

C'est tout. Pas de container a gerer, pas de region a choisir au depart, pas de scale config.

---

## Sources

- [Edge Functions - vue generale](https://supabase.com/docs/guides/functions) — definition runtime Deno + invocation HTTP
- [Architecture des Edge Functions](https://supabase.com/docs/guides/functions/architecture) — gateway, V8 isolates, ESZip
- [Page produit Edge Functions](https://supabase.com/edge-functions) — cas d'usage, positionnement
- [Deploy from Dashboard + Deno 2.1](https://supabase.com/blog/supabase-edge-functions-deploy-dashboard-deno-2-1) — nouveautes 2025-2026
- [LogRocket - Edge Functions guide complet](https://blog.logrocket.com/using-edge-functions-supabase-complete-guide/) — benchmarks cold start
- [sources.md](./sources.md) — index complet des references
