# 06 — Workflow Claude Code pour developper une landing de bout en bout

## Sommaire

- [Principe : 4 phases](#principe--4-phases)
- [Phase 1 — Initialisation projet](#phase-1--initialisation-projet)
- [Phase 2 — CLAUDE.md court mais precis](#phase-2--claudemd-court-mais-precis)
- [Phase 3 — Subagents et MCP](#phase-3--subagents-et-mcp)
- [Phase 4 — Verification](#phase-4--verification)
- [Patterns concrets](#patterns-concrets)
- [Anti-patterns a eviter](#anti-patterns-a-eviter)

## Principe : 4 phases

Source : [Claude Code best practices officielles](https://code.claude.com/docs/en/best-practices).

```
Explore (plan mode) → Plan → Implement → Commit
```

**Single highest-leverage practice** : toujours donner a Claude un mecanisme de verification (Lighthouse, tests, screenshots). Sinon il produit du code plausible mais non valide.

## Phase 1 — Initialisation projet

### Option A — Astro + Supabase + Netlify

```bash
mkdir ma-landing && cd ma-landing
claude
```

Premier prompt :

```
Initialise un projet de landing page avec :
- Astro 6 + TypeScript strict
- Tailwind 4 via `npx astro add tailwind`
- Client Supabase JS
- Une Edge Function `contact-form` scaffold
- Un netlify.toml avec NODE_VERSION="22"
- Un CLAUDE.md court (50 lignes max) qui decrit la stack et les conventions

Reference : @docs/stack-landing-claude-code/04-setup-astro-netlify.md
Reference : @docs/stack-landing-claude-code/05-supabase-integration.md
```

Claude va lire les docs de reference et scaffolder en suivant les conventions documentees.

### Option B — Vite + React + Supabase + Netlify

Meme principe, en pointant `@docs/stack-landing-claude-code/03-setup-vite-netlify.md`.

## Phase 2 — CLAUDE.md court mais precis

> Best practice officielle : `CLAUDE.md` court. Les fichiers gonfles font que Claude ignore les vraies regles dans le bruit.

Template recommande pour une landing :

```markdown
# CLAUDE.md

## Stack
- Astro 6 + Tailwind 4 + TypeScript strict
- Supabase (Postgres + Edge Functions Deno)
- Netlify (deploy + extension Supabase pour env vars auto)

## Conventions
- Composants : 1 fichier .astro par section (Hero, Features, Pricing, FAQ, Footer)
- Islands interactifs : .tsx React, hydrater avec `client:visible` par defaut
- Images : composant `<Image>` d'Astro, jamais `<img>` brut
- Form handlers : Supabase Edge Function, jamais d'appel direct DB cote client
- Secrets : `import.meta.env.PUBLIC_*` cote client, `Deno.env.get()` cote function

## Cibles de perf
- Lighthouse Performance >= 95
- LCP < 1.5s
- Bundle JS client < 50 KB

## Commandes utiles
- `npm run dev` : dev server (port 4321)
- `npm run build && npm run preview` : test du build
- `supabase functions serve contact-form` : test Edge Function en local
- `npx lighthouse http://localhost:4321 --view` : audit perf

## A ne pas faire
- Pas de Google Fonts via CDN (self-host les fonts)
- Pas de `client:load` sauf necessite absolue
- Pas de service_role_key cote client
- Pas de form qui appelle Postgres en direct (passer par Edge Function)
```

50 lignes max. Plus tu allonges, moins Claude respectera les regles.

## Phase 3 — Subagents et MCP

### Subagents disponibles dans ce projet

Le framework SYM est installe globalement, donc tu as acces a 47 agents specialises.

Pour une landing Astro + Supabase + Netlify, les plus utiles :

| Agent | Usage |
|-------|-------|
| `sym-frontend` | Architecture frontend (detection stack, plan composants) |
| `sym-fe-ui-react` | Composants React (islands interactifs) |
| `sym-be-edge` | Edge Functions Deno + webhooks |
| `sym-db-sql` | Tables, RLS policies, RPC |
| `sym-db-migration` | Migrations schema |
| `sym-perf` | Optimisation Core Web Vitals |
| `sym-deploy-netlify` | Deploy Netlify configure |
| `sym-test-web` | Tests Playwright + Chrome DevTools MCP |

Exemple de delegation :

```
"Use sym-be-edge to scaffold a contact-form Edge Function with email
validation, honeypot anti-spam, and HubSpot forwarding"
```

### Skills custom installes

Le projet a deja des skills tres pertinents :

| Skill | Usage |
|-------|-------|
| `connect-hubspot-form` | Connecte un form Webflow a HubSpot (GA4 + Pixel + CAPI) |
| `extract-design-system` | Aspire un design system depuis un site existant → tokens DTCG |
| `apply-nopillo-ds` | Applique le DS Nopillo a une page Webflow |
| `landing-google-ads` | Cree une landing optimisee Google Ads (Quality Score 8+) |
| `landing-meta-ads` | Cree une landing optimisee Meta Ads (mobile-first 9:16) |

A invoquer via `/landing-google-ads`, `/extract-design-system`, etc.

### MCP servers utiles

| MCP | Usage pour landings |
|-----|---------------------|
| `Supabase` | apply_migration, deploy_edge_function, generate_typescript_types |
| `Netlify` (a verifier) | Build status, env vars |
| `Webflow` | Pour aspirer un design depuis Webflow |
| `Playwright` | Test du site deploye, screenshots, network |
| `context7` / `find-docs` | Doc a jour de toute lib (Astro, Vite, Tailwind, Supabase) |

## Phase 4 — Verification

Pour qu'une landing tienne ses promesses, Claude doit pouvoir mesurer.

### Lighthouse en boucle

```bash
# Apres chaque modif structurelle
npm run build && npm run preview &
sleep 2
npx lighthouse http://localhost:4321 \
  --only-categories=performance \
  --chrome-flags="--headless" \
  --output=json --output-path=./lighthouse.json

# Claude lit le JSON et itere si Performance < 95
```

Demande type :

```
Lance `npm run build && npm run preview` en background, attends 2s,
lance lighthouse, et corrige le code jusqu'a Performance >= 95.
```

### Tests E2E rapides avec Playwright

Le MCP Playwright est installe. Tu peux demander :

```
Use playwright MCP : navigate http://localhost:4321, take screenshot,
verify hero h1 contains "Ma promesse", click CTA, verify form is visible.
```

### Validation TypeScript

```bash
npx astro check
# ou pour Vite
npx tsc --noEmit
```

## Patterns concrets

### Pattern 1 — Generation d'une section a partir d'un brief

Prompt :

```
Cree un composant `src/components/Pricing.astro` :
- 3 tiers (Starter / Pro / Entreprise)
- Cards alignees, hauteur identique
- CTA "Choisir" qui pointe vers `/checkout?plan=<id>`
- Tier "Pro" mis en avant (border accent, badge "Recommande")
- Mobile-first, stacking vertical < 768px

Reference design : Tailwind UI Pricing > Three tiers with emphasized tier.
Suis les tokens dans `src/styles/global.css`.
Pas de JS au client, composant 100% statique.
```

### Pattern 2 — Refactor pour passer Lighthouse 95

```
Audit `src/pages/index.astro` avec Lighthouse :
1. Build et preview
2. Lance lighthouse, lis le rapport
3. Identifie les 3 plus gros gains (LCP, CLS, TBT)
4. Applique les fixes UN par UN, re-audit apres chaque fix
5. STOP quand Performance >= 95
```

### Pattern 3 — Ajout d'un form connecte a Supabase

```
Ajoute un form de capture lead dans `src/components/ContactForm.tsx` (island React) :
- Champs : email (requis), name (optionnel)
- Honeypot field (anti-spam basique)
- Submission via `supabase.functions.invoke('contact-form', { body })`
- Etats : idle / sending / sent / error avec UI claire
- A11y : labels, aria-live pour les erreurs

Cree aussi la Edge Function `supabase/functions/contact-form/index.ts` :
- Validation email
- Insert dans `leads` (RLS active, service_role_key requise)
- CORS restreint au domaine de prod

Reference : @docs/stack-landing-claude-code/05-supabase-integration.md
```

### Pattern 4 — Deploy review avec PR preview

```
Cree une branche `feat/pricing-v2`, commit les changes, push.
Recupere l'URL preview Netlify depuis la sortie du push,
lance Playwright dessus, prends 3 screenshots (desktop / tablet / mobile),
verifie que le form fonctionne (submit test email).
```

## Anti-patterns a eviter

Issus de [Claude Code best practices](https://code.claude.com/docs/en/best-practices).

| Anti-pattern | Symptome | Fix |
|--------------|----------|-----|
| Kitchen sink session | Claude melange contextes, regresse | `/clear` entre taches sans rapport |
| `CLAUDE.md` bloated | Les vraies regles sont noyees | Couper a 50 lignes max, sortir le detail dans `docs/` |
| Trust-then-verify gap | Code plausible mais casse | Toujours fournir un mecanisme de verif (Lighthouse, Playwright) |
| Infinite exploration | Claude lit 50 fichiers avant d'agir | Scope l'investigation (1 dossier max) ou delegue a un subagent Explore |
| 2 corrections ratees | Boucle de degradation | `/clear` et reformule mieux le prompt initial |
| `client:load` partout | Bundle gonfle | Defaut `client:visible`, audit final avec lighthouse |
| Pas de plan mode | Claude commence a coder sans avoir compris | Pour features > 30min, demander un plan d'abord |

## Workflow type complet (1 demi-journee)

```
1. mkdir landing && cd landing && claude
2. Premier prompt : "Init projet Astro+Tailwind+Supabase+Netlify"
3. Lecture du CLAUDE.md genere, ajustement
4. /plan "Architecture des sections : Hero, Features, Pricing, FAQ, Form"
5. Validation du plan
6. Generation section par section avec verification Lighthouse a chaque
7. Edge Function contact-form + test local
8. supabase db push, supabase functions deploy
9. netlify init && netlify deploy --prod
10. Playwright sur l'URL prod : screenshots + submission test
11. Commit + push, deploy auto
```

## Sources

- [Claude Code best practices officielles](https://code.claude.com/docs/en/best-practices)
- [Claude Code Workflows and Best Practices](https://smart-webtech.com/blog/claude-code-workflows-and-best-practices/)
- [Builder.io — 50 Claude Code Tips](https://www.builder.io/blog/claude-code-tips-best-practices)
