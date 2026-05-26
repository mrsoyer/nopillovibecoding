# Detection Patterns — Heuristiques pour Identification et Extraction

> Reference d'execution pour les etapes 2 (identification type), 3 (extraction), 5 (contraintes implicites) du workflow `rule-maker`.

## Table des Matieres
1. [Identification du type](#identification-du-type)
2. [Extraction metadonnees front](#extraction-metadonnees-front)
3. [Extraction metadonnees back](#extraction-metadonnees-back)
4. [Contraintes implicites a documenter](#contraintes-implicites-a-documenter)
5. [Naming et placement](#naming-et-placement)

## Identification du Type

Decision sur la base du chemin du fichier source :

| Chemin (glob) | Type | Template |
|---------------|------|----------|
| `front/src/pages/**/*.astro` | Page Astro | templates-front > page |
| `front/src/layouts/**/*.astro` | Layout Astro | templates-front > layout |
| `front/src/components/**/*.astro` | Composant Astro statique | templates-front > component |
| `front/src/components/**/*.tsx` | Island React | templates-front > island |
| `front/src/components/**/*.jsx` | Island React (legacy) | templates-front > island |
| `supabase/functions/*/index.ts` | Edge function | templates-back > edge |
| `supabase/functions/*/handler.ts` | Edge function (handler) | templates-back > edge |

**Hors scope MVP** (rejeter ou demander a l'user de creer manuellement) :
- `supabase/migrations/*.sql` (migrations SQL)
- `supabase/functions/_shared/**` (code partage entre functions)
- `front/src/lib/**` (helpers, pas de UI)

Si chemin non reconnu : demander a l'user "Quel type ?".

## Extraction Metadonnees Front

### Imports → Dependances sortantes

Pattern a matcher :
```
import .* from ['"](.+)['"]
import .* from ['"]astro:(.+)['"]
```

Extraire :
- Imports relatifs (`./Hero.astro`, `../lib/utm`) → composants/helpers internes
- Imports `astro:assets` → utilise `<Image>` ou `<Picture>`
- Imports `react`, `react-dom` → island React confirmation
- Imports library externes (zod, react-hook-form, @supabase/supabase-js) → noter dans Dependances sortantes

### Directives `client:*`

Patterns a matcher dans les fichiers `.astro` :
| Pattern | Signification | Niveau d'hydratation |
|---------|---------------|---------------------|
| `client:load` | Hydrate immediatement au chargement | Aggressif (couteux) |
| `client:visible` | Hydrate quand entre dans le viewport | Standard (defaut recommande) |
| `client:idle` | Hydrate quand le main thread est idle | Conservateur |
| `client:media={query}` | Hydrate si media query matche | Conditionnel |
| `client:only={framework}` | Skip SSR, hydrate cote client | Pour composants non-SSR-able |

Pour les `.tsx`, l'hydratation est definie au point d'import dans le `.astro` parent (pas dans le `.tsx` lui-meme).

### Variables d'env

Pattern a matcher :
- Front (Astro) : `import.meta.env.PUBLIC_(\w+)`
- Front (TSX) : `import.meta.env.PUBLIC_(\w+)` ou `process.env.NEXT_PUBLIC_(\w+)` (rare)

Lister chaque variable env trouvee dans "Dependances sortantes".

### Endpoints appeles (front)

Patterns a matcher pour detecter appels backend :
```
fetch\(['"](.+?)['"]
fetch\(`(.+?)`
supabase\.functions\.invoke\(['"](.+?)['"]
\$\{[^}]+\}/functions/v1/(\w+)
```

Pour chaque endpoint detecte, croiser avec les edge functions existantes (`Glob supabase/functions/*/`) pour documenter la liaison.

## Extraction Metadonnees Back

### Inputs (edge functions)

Patterns a chercher dans `supabase/functions/{name}/index.ts` :

1. **Schema Zod** :
```
const \w+Schema = z\.object\(\{
```
Si trouve : extraire tous les champs avec leur type et contraintes.

2. **Parsing manuel** :
```
const { (.+) } = await req.json\(\)
```
Si trouve : extraire les noms des champs destructures.

3. **Honeypot** :
```
_honey|honeypot|_hp|botfield
```
Si trouve : noter "Anti-spam present".

### Outputs (edge functions)

Patterns a chercher :
```
new Response\(.*?status:\s*(\d+)
return new Response\(JSON\.stringify
```

Lister tous les status codes utilises (200, 400, 401, 403, 429, 500) avec leur signification.

### Variables d'env (back)

Pattern :
```
Deno\.env\.get\(['"](\w+)['"]\)
```

Categories :
- **Auto-injectees Supabase** : `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`
- **Secrets custom** : `HUBSPOT_API_KEY`, `STRIPE_SECRET_KEY`, `RESEND_API_KEY`, etc.
- **Config** : `ALLOWED_ORIGINS`, `RATE_LIMIT_PER_MIN`, etc.

### Side effects (back)

Patterns a chercher :
- INSERT : `\.from\(['"]\w+['"]\)\.insert\(`
- UPDATE : `\.from\(['"]\w+['"]\)\.update\(`
- DELETE : `\.from\(['"]\w+['"]\)\.delete\(`
- RPC : `\.rpc\(['"]\w+['"]\)`
- Webhooks : `fetch\(['"]https://(?!\w+\.supabase\.co)`
- Email : usage Resend, SendGrid, AWS SES

## Contraintes Implicites a Documenter

Pour chaque pattern detecte dans le fichier source, ajouter une contrainte explicite dans la section "Contraintes" de la rule.

### Front

| Pattern detecte | Contrainte a documenter |
|-----------------|------------------------|
| `<Image>` + `loading="eager"` | "LCP-critical, ne pas changer sans audit Lighthouse" |
| `<Image>` + `fetchpriority="high"` | "LCP-critical" |
| `<Image>` + `width` + `height` explicites | "Dimensions explicites pour CLS = 0" |
| `<img>` sans Astro `<Image>` | ANTI-PATTERN : "Utiliser `<Image>` d'Astro" (corriger) |
| `client:load` | "Hydration aggressive, justifier la necessite (kill perfs si non justifie)" |
| `client:visible` | Standard, pas besoin de mention specifique |
| `client:only="react"` | "Skip SSR — verifier impact SEO si contenu critique" |
| Honeypot field | "Anti-spam, ne pas supprimer" |
| Schema Zod + appel API | "Schema Zod doit etre synchronise avec validation serveur" |
| Variables env `PUBLIC_*` | "Variables env exposees au client — JAMAIS de secrets ici" |

### Back

| Pattern detecte | Contrainte a documenter |
|-----------------|------------------------|
| CORS `Access-Control-Allow-Origin: *` | ANTI-PATTERN : "CORS doit etre restreint a `ALLOWED_ORIGINS` (env)" |
| `Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")` | "Service role usage — JAMAIS exposer cote client" |
| Honeypot field | "Anti-spam, ne pas supprimer" |
| Rate limiting (Deno KV) | "Rate limit {X}/min/IP — verifier impact si modifie" |
| Logs avec email/message | ANTI-PATTERN RGPD : "Logs sans PII (email/message)" |
| `SECURITY DEFINER` (si RPC) | "RPC privilegiee, bypass RLS — justifier" |
| Webhook externe sans env-guard | "Webhook conditionnel a env — fallback silencieux ou erreur ?" |
| `try`/`catch` sans `console.error` | ANTI-PATTERN : "Erreurs silencieuses — logger avec contexte" |

## Naming et Placement

### Regles de naming (kebab-case obligatoire)

| Type source | Nom de fichier rule | Exemple |
|-------------|---------------------|---------|
| `front/src/pages/{slug}.astro` | `pages-{slug}.md` | `pages-index.md` |
| `front/src/pages/blog/{slug}.astro` | `pages-blog-{slug}.md` | `pages-blog-article-1.md` |
| `front/src/layouts/{nom}.astro` | `layouts-{nom}.md` | `layouts-base.md` |
| `front/src/components/{NomComponent}.astro` | `{nom-component}.md` | `hero.md` |
| `front/src/components/{NomComponent}.tsx` | `{nom-component}.md` | `contact-form.md` |
| `supabase/functions/{function-name}/index.ts` | `{function-name}.md` | `contact-form.md` |

### Placement

- `.claude/rules/front/` pour : pages, layouts, composants, islands
- `.claude/rules/back/` pour : edge functions

### Conflits de nom

Si une rule existe deja avec le meme nom (`front/contact-form.md` existe et user demande de generer `back/contact-form.md`) :
- C'est OK : les dossiers `front/` et `back/` separent. Pas de conflit.

Si une rule existe deja avec le meme `paths:` (collision exacte) :
- Demander confirmation `--update` (overwrite)
- OU proposer un nom alternatif (`{nom}-v2.md`)

### `paths:` exact

Le `paths:` doit matcher EXACTEMENT le fichier source :

| Fichier source | `paths:` attendu | `paths:` a EVITER |
|----------------|------------------|-------------------|
| `front/src/components/Hero.astro` | `front/src/components/Hero.astro` | `front/src/components/**` (trop large) |
| `front/src/pages/index.astro` | `front/src/pages/index.astro` | `front/src/pages/*.astro` (matche aussi pricing) |
| `supabase/functions/contact-form/index.ts` | `supabase/functions/contact-form/**` | `supabase/functions/**` (toutes les functions) |

**Exception** : pour les edge functions, utiliser `{folder}/**` car les functions ont plusieurs fichiers (index.ts, deno.json, _shared, etc.).
