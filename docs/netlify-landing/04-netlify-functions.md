# 04 — Netlify Functions : serverless TypeScript

## Ce que c'est

**Netlify Functions** = fonctions serverless deployees automatiquement avec ton site, accessibles en HTTP via `/.netlify/functions/<nom>` (ou via redirect propre `/api/<nom>`).

Runtime AWS Lambda (region `us-east-2` par defaut depuis octobre 2023), support natif TypeScript, JavaScript et Go. Versionnees, deployees et rollback en meme temps que le site.

## Specs techniques

| Type | Timeout | Memoire | Payload req | Payload res |
|------|---------|---------|-------------|-------------|
| Synchronous | 60 s | 1 024 MB | 6 MB | 6 MB (buffered) / 20 MB (streamed) |
| Background | 15 min | 1 024 MB | 256 KB | 256 KB |
| Scheduled (cron) | 60 s | 1 024 MB | n/a | n/a |

Limites binaire : ~ 4.5 MB effectif (overhead Base64).

## Setup TypeScript

### 1. Installer le typage

```bash
npm install --save-dev @netlify/functions
```

### 2. Creer le fichier

Convention : tout fichier `.ts` ou `.js` dans `netlify/functions/` devient une Function nommee d'apres son fichier.

```
netlify/
└── functions/
    ├── hello.ts                 → /.netlify/functions/hello
    ├── subscribe-newsletter.ts  → /.netlify/functions/subscribe-newsletter
    └── webhook-stripe.ts        → /.netlify/functions/webhook-stripe
```

### 3. Signature de base

```typescript
// netlify/functions/hello.ts
import type { Handler, HandlerEvent, HandlerContext } from '@netlify/functions';

export const handler: Handler = async (
  event: HandlerEvent,
  context: HandlerContext
) => {
  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: 'Hello from Nopillo' }),
  };
};
```

Test local :

```bash
netlify dev
# puis
curl http://localhost:8888/.netlify/functions/hello
```

## Pattern POST + JSON parsing

```typescript
// netlify/functions/contact-submit.ts
import type { Handler } from '@netlify/functions';

interface ContactPayload {
  email: string;
  message: string;
  consent: boolean;
}

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method not allowed' };
  }

  let payload: ContactPayload;
  try {
    payload = JSON.parse(event.body ?? '{}');
  } catch {
    return { statusCode: 400, body: 'Invalid JSON' };
  }

  if (!payload.email || !payload.consent) {
    return { statusCode: 422, body: 'Missing fields' };
  }

  // ... logique metier
  return {
    statusCode: 200,
    body: JSON.stringify({ ok: true }),
  };
};
```

## URL propres via redirect

Plutot que `/.netlify/functions/contact-submit`, exposer `/api/contact` :

```toml
# netlify.toml
[[redirects]]
  from = "/api/*"
  to   = "/.netlify/functions/:splat"
  status = 200
```

## Use cases agency Nopillo

### 1. Proxy CRM (HubSpot, Mailchimp, Brevo)

Eviter d'exposer les API keys en client → Function intermediaire.

```typescript
// netlify/functions/lead-create.ts
export const handler: Handler = async (event) => {
  const { email, source } = JSON.parse(event.body || '{}');

  await fetch('https://api.hubapi.com/crm/v3/objects/contacts', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.HUBSPOT_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      properties: { email, source_landing: source, lifecyclestage: 'lead' },
    }),
  });

  return { statusCode: 200, body: JSON.stringify({ ok: true }) };
};
```

### 2. Webhook receiver (Stripe, Calendly, Typeform)

```typescript
// netlify/functions/webhook-stripe.ts
import Stripe from 'stripe';

export const handler: Handler = async (event) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  const sig = event.headers['stripe-signature'];

  try {
    const evt = stripe.webhooks.constructEvent(
      event.body!,
      sig!,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    if (evt.type === 'checkout.session.completed') {
      // declencher email confirmation, MAJ HubSpot, etc.
    }

    return { statusCode: 200, body: 'ok' };
  } catch (err) {
    return { statusCode: 400, body: `Webhook error: ${(err as Error).message}` };
  }
};
```

### 3. PDF generation a la volee

Generer un devis PDF apres soumission form, le stocker, l'envoyer par email.

### 4. Scheduled (cron) : refresh contenu CMS

```typescript
// netlify/functions/refresh-pricing.ts
import type { Config } from '@netlify/functions';

export default async () => {
  const data = await fetch('https://api.client.com/pricing').then(r => r.json());
  // stocker dans Netlify Blob Store ou trigger un rebuild
  await fetch(process.env.NETLIFY_BUILD_HOOK!, { method: 'POST' });
  return new Response('OK');
};

export const config: Config = {
  schedule: '@daily',
};
```

### 5. Background function : envoi email batch

Tache > 60 s (envoyer 1 000 emails post-event) → background function.

```typescript
// netlify/functions/send-newsletter-background.ts
// Suffixe -background = execution async jusqu'a 15 min
export const handler: Handler = async (event) => {
  const subscribers = await fetchSubscribers();
  for (const s of subscribers) {
    await sendEmail(s);
  }
  return { statusCode: 202, body: 'Started' };
};
```

L'appelant recoit immediatement 202 ; la Function continue en arriere-plan.

## Variables d'environnement

Acces via `process.env.MA_VAR`. Definir via :

```bash
# CLI
netlify env:set HUBSPOT_TOKEN "pat-xxx" --scope=functions
netlify env:set HUBSPOT_TOKEN "pat-prod" --context=production
```

Ou dans `netlify.toml` (pour valeurs **non sensibles**) :

```toml
[context.production.environment]
  HUBSPOT_PORTAL = "1234567"

[context.deploy-preview.environment]
  HUBSPOT_PORTAL = "9999999"
```

**Ne jamais** commit de secret dans `netlify.toml` ou `.env`. Utiliser le dashboard / CLI.

## Logs et debug

- Dashboard → Functions → log par invocation (stdout/stderr + duree).
- `netlify functions:log <nom>` en CLI pour stream.
- `netlify dev` reproduit l'environnement local fidelement.

## Cout

Free tier : 125 000 invocations / mois et 100 heures runtime.
Pro tier : 2 000 000 invocations + 1 000 heures.
Au-dela : ~ 25 USD par 500 000 invocations supplementaires.

Pour une landing avec 1 form qui declenche 1 Function par submission : largement dans le free tier.

## Bonnes pratiques Nopillo

- **TypeScript strict** : `tsconfig` avec `"strict": true` au minimum sur `netlify/functions/`.
- **Validation payload** : utiliser Zod ou Valibot pour parser les `event.body`.
- **CORS explicit** : si la Function est appelee depuis un autre domaine, retourner les headers `Access-Control-Allow-*`.
- **Idempotence** : webhooks doivent supporter le rejeu (verifier signature + dedup par event ID).
- **Timeout** : si > 50 s, basculer en `-background` immediatement.
- **Secrets** : 100 % via Netlify env vars, scope `Functions` uniquement quand possible.

## A retenir

Les Functions remplacent **complement** un mini-backend Node/Express pour 90 % des besoins d'une landing : capture lead enrichie, webhooks, integrations CRM, generation PDF, automation. TypeScript first-class, deploy automatique, scaling gere par Netlify.

## Sources

- [Functions overview - Netlify docs](https://docs.netlify.com/build/functions/overview/) — runtime, types, limites officielles
- [Serverless Functions API reference](https://docs.netlify.com/build/functions/api/) — signatures Handler, types officiels
- [Get started with functions](https://docs.netlify.com/build/functions/get-started/) — setup et conventions de fichiers
- [Environment variables and serverless functions](https://docs.netlify.com/build/functions/environment-variables/) — scopes Builds/Functions/Runtime
- [Announcing native TypeScript support for Netlify Functions](https://www.netlify.com/blog/2021/04/19/announcing-native-typescript-support-for-netlify-functions/) — support TS first-class
- [Intro to Serverless Functions - Netlify blog](https://www.netlify.com/blog/intro-to-serverless-functions/) — patterns d'usage typiques
- [Deploy Netlify Functions with TypeScript - DEV Community](https://dev.to/atila/netlify-functions-typescript-3b3i) — tutoriel TypeScript end-to-end
