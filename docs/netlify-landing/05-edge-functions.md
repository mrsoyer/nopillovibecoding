# 05 — Edge Functions : personnalisation au plus pres du visiteur

## Ce que c'est

**Netlify Edge Functions** = code TypeScript / JavaScript execute sur le **runtime Deno au edge**, c'est-a-dire dans le data center le plus proche du visiteur. Latence sous 50 ms.

Difference cle avec les Functions classiques :
- Edge = avant la reponse statique (peut modifier la page servie).
- Functions = endpoint API independant.

Use cases types : geolocation, A/B testing, rewrite d'URLs, personnalisation par cookie, headers dynamiques.

## Setup

### Structure de fichiers

```
netlify/
└── edge-functions/
    ├── hello.ts
    ├── ab-hero.ts
    └── geo-redirect.ts
```

Optionnel : declarer dans `netlify.toml` (sinon detection automatique par fichier) :

```toml
[[edge_functions]]
  function = "ab-hero"
  path     = "/"

[[edge_functions]]
  function = "geo-redirect"
  path     = "/*"
```

### Hello world

```typescript
// netlify/edge-functions/hello.ts
import type { Context } from '@netlify/edge-functions';

export default async (request: Request, context: Context) => {
  return new Response('Hello from edge', {
    headers: { 'content-type': 'text/plain' },
  });
};

export const config = { path: '/hello' };
```

## L'objet Context

Donnees disponibles cote edge sans appel reseau supplementaire :

| Cle | Contenu | Use case |
|-----|---------|----------|
| `context.geo` | `{ country, city, subdivision, timezone, latitude, longitude }` | Redirect, contenu localise |
| `context.cookies` | API cookies (get/set) | A/B test, perso |
| `context.requestId` | UUID unique | Tracking, logs |
| `context.ip` | IP visiteur | Rate limit, analytics |
| `context.next()` | Continue vers la reponse statique | Wrapping pattern |

## Pattern 1 : redirect par geolocation

```typescript
// netlify/edge-functions/geo-redirect.ts
import type { Context } from '@netlify/edge-functions';

export default async (request: Request, context: Context) => {
  const { country } = context.geo;
  const url = new URL(request.url);

  // Redirect FR vers /fr, BE vers /be, sinon /
  if (country?.code === 'FR' && !url.pathname.startsWith('/fr')) {
    return Response.redirect(`${url.origin}/fr${url.pathname}`, 302);
  }
  if (country?.code === 'BE' && !url.pathname.startsWith('/be')) {
    return Response.redirect(`${url.origin}/be${url.pathname}`, 302);
  }

  return context.next();
};

export const config = { path: '/' };
```

## Pattern 2 : A/B testing par cookie (le plus important)

Pattern officiel Netlify : assigner un visiteur a une variante au premier hit, persister en cookie, servir la variante au build.

```typescript
// netlify/edge-functions/ab-hero.ts
import type { Context } from '@netlify/edge-functions';

const COOKIE_NAME = 'ab_hero_variant';
const VARIANTS = ['A', 'B'] as const;

export default async (request: Request, context: Context) => {
  const existing = context.cookies.get(COOKIE_NAME);
  let variant = existing as typeof VARIANTS[number] | undefined;

  if (!variant) {
    variant = Math.random() < 0.5 ? 'A' : 'B';
    context.cookies.set({
      name: COOKIE_NAME,
      value: variant,
      path: '/',
      maxAge: 60 * 60 * 24 * 30, // 30 jours
    });
  }

  // Servir la variante depuis 2 pages statiques pre-buildees
  const url = new URL(request.url);
  if (url.pathname === '/' && variant === 'B') {
    return new URL('/variants/hero-b', url.origin).href
      ? fetch(new URL('/variants/hero-b', url.origin))
      : context.next();
  }

  return context.next();
};

export const config = { path: '/' };
```

### Variante avancee : transformation HTML a la volee

Plutot que de pre-builder 2 pages, transformer la reponse statique avec `HTMLRewriter` :

```typescript
import type { Context } from '@netlify/edge-functions';

export default async (request: Request, context: Context) => {
  const variant = context.cookies.get('ab_hero') ?? (Math.random() < 0.5 ? 'A' : 'B');
  if (!context.cookies.get('ab_hero')) {
    context.cookies.set({ name: 'ab_hero', value: variant, path: '/', maxAge: 2592000 });
  }

  const response = await context.next();

  if (variant === 'B') {
    return new HTMLRewriter()
      .on('[data-ab="hero-title"]', {
        element(el) { el.setInnerContent('Reservez votre demo gratuite'); },
      })
      .on('[data-ab="cta"]', {
        element(el) { el.setInnerContent('Demarrer maintenant'); },
      })
      .transform(response);
  }

  return response;
};

export const config = { path: '/' };
```

## Pattern 3 : personnalisation par UTM

```typescript
// netlify/edge-functions/utm-perso.ts
import type { Context } from '@netlify/edge-functions';

export default async (request: Request, context: Context) => {
  const url = new URL(request.url);
  const source = url.searchParams.get('utm_source');

  const response = await context.next();

  if (source === 'linkedin') {
    return new HTMLRewriter()
      .on('[data-perso="hero-pretitle"]', {
        element(el) { el.setInnerContent('Pour les pros LinkedIn'); },
      })
      .transform(response);
  }

  return response;
};

export const config = { path: '/' };
```

## Pattern 4 : feature flag

```typescript
// netlify/edge-functions/feature-flag.ts
export default async (request: Request, context: Context) => {
  const flagEnabled = Netlify.env.get('FEATURE_NEW_PRICING') === 'true';

  if (!flagEnabled) {
    return context.next();
  }

  const response = await context.next();
  return new HTMLRewriter()
    .on('[data-feature="pricing-block"]', { element(el) { el.removeAndKeepContent(); } })
    .on('[data-feature="pricing-block-v2"]', { element(el) { /* show */ } })
    .transform(response);
};

export const config = { path: '/pricing' };
```

## Limites Edge Functions

- **Runtime Deno** uniquement (pas Node) → libs npm doivent etre compatibles, ou utiliser imports Deno (`https://deno.land/...`).
- **Pas de filesystem persistant** au edge.
- **Timeout** : 50 s par defaut, mais a viser < 1 s pour ne pas degrader TTFB.
- **Memoire** : 512 MB.
- **Pas de package.json** : imports ESM directement.
- **Cold start** : tres rapide (< 50 ms) grace a V8 isolates.

## Test local

```bash
netlify dev
# Edge functions sont chargees automatiquement
curl http://localhost:8888/
```

Pour debug :

```typescript
console.log('Edge log', { country: context.geo.country, requestId: context.requestId });
// Visible dans le terminal netlify dev
```

## Combinaison Astro + Edge

Astro a un adapter `@astrojs/netlify` qui peut SSR au edge :

```javascript
// astro.config.mjs
import netlify from '@astrojs/netlify';

export default defineConfig({
  output: 'server',
  adapter: netlify({ edgeMiddleware: true }),
});
```

Cela transforme automatiquement les pages dynamiques en Edge Functions. Pour Nopillo : a utiliser uniquement si on a vraiment besoin de SSR au edge (rare en landing).

## Bonnes pratiques

- **Privilegier le static + Edge transformation** plutot que SSR complet : meilleur cache, moins de cout.
- **Cookies HTTP only + secure** pour les variantes A/B (eviter manipulation client).
- **Sticky sessions** : une fois assignee, la variante doit rester la meme pour le visiteur (sinon analytics fausses).
- **Tracker la variante en analytics** : envoyer `variant: 'B'` a GA / Matomo / PostHog.
- **Tester localement** avec `netlify dev` avant chaque deploy.
- **Limiter le nombre d'Edge Functions par site** : chaque request peut traverser plusieurs Edge Functions, ca s'accumule.

## A retenir

Les Edge Functions ouvrent des cas d'usage impossibles avec une landing Webflow standard : A/B test serveur (vrais visiteurs uniques bucketes, pas du JS client), perso geo, redirect intelligents, feature flags. Pour Nopillo, c'est l'argument numero 1 quand un client veut **mesurer scientifiquement** des variantes de hero/CTA sur une campagne payante.

## Sources

- [Edge Functions overview - Netlify docs](https://docs.netlify.com/build/edge-functions/overview/) — runtime Deno, Context, limites officielles
- [Edge Functions Explained - Netlify blog](https://www.netlify.com/blog/edge-functions-explained/) — fondamentaux et cas d'usage
- [A/B test CMS authored content with Netlify Edge Functions](https://www.netlify.com/blog/a-b-test-cms-authored-content-netlify-edge-functions/) — pattern A/B cookie + HTMLRewriter
- [Unlock the Power of A/B Testing with Netlify Edge Functions](https://www.netlify.com/resources/webinars/a-b-test-with-netlify-edge-functions/) — webinar pattern complet
- [Edge Functions on Netlify - examples library](https://edge-functions-examples.netlify.app/) — bibliotheque exemples officiels
- [Set up an A/B Test - example](https://edge-functions-examples.netlify.app/example/abtest) — code reference A/B testing
- [Netlify Edge platform](https://www.netlify.com/platform/core/edge/) — positionnement edge GA 2026
