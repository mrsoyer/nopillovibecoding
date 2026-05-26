# 06 — Stack SaaS Complète : Claude Code + Supabase + Stripe + Vercel

## Vue d'Ensemble

La stack **Claude Code + Supabase + Stripe + Vercel** est devenue le **standard de facto en 2026** pour livrer un SaaS MVP en un week-end. Cette section consolide les meilleures pratiques issues de tutoriels MakerKit, AI Builder Club, Apify et Composio.

## Stack Standard

```
┌──────────────────────────────────────────┐
│  Frontend & SSR :  Next.js 14+ App Router │
│  Styling        :  Tailwind CSS           │
│  Backend        :  Supabase (PG + Auth)   │
│  Payments       :  Stripe (subs + portal) │
│  Hosting        :  Vercel                 │
│  AI Agent       :  Claude Code            │
│  MCP            :  Supabase MCP officiel  │
└──────────────────────────────────────────┘
```

## Configuration Initiale Critique : `CLAUDE.md`

> "CLAUDE.md as the highest-ROI thing you'll write" — MakerKit

Ce fichier doit contenir, dès le démarrage :

1. **Description produit** (1-2 paragraphes)
2. **Architecture rules** (App Router, Server Components, etc.)
3. **File structure attendue** (`app/`, `components/ui/`, `lib/`, `types/`)
4. **Database schema initial**
5. **Coding standards** (TypeScript strict, naming conventions)
6. **Quality gates** (typecheck, lint, tests à passer)

Compléter avec un `SPEC.md` dédié aux features (must-have weekend scope vs nice-to-have).

## Workflow en 4 Phases — Tutoriel AI Builder Club (~8 h, ~12 $ API)

### Phase 1 — Setup & Authentication (2 h)

1. Créer `CLAUDE.md` avec conventions et quality standards
2. Bootstrap projet Next.js + dépendances
3. Implémenter auth email/password Supabase :
   - Pages signup/signin
   - Callback handler OAuth
   - Middleware pour routes `/dashboard/*`

### Phase 2 — Database & Dashboard (2 h)

```sql
-- Migration Supabase : profils utilisateurs
create table profiles (
  id uuid references auth.users primary key,
  full_name text,
  avatar_url text,
  updated_at timestamptz default now()
);

-- RLS : users can only read/update their own profile
alter table profiles enable row level security;

create policy "Users read own profile"
  on profiles for select
  using (auth.uid() = id);

create policy "Users update own profile"
  on profiles for update
  using (auth.uid() = id);
```

Créer fonctions de query typées (Supabase generate types) → dashboard avec navigation, sidebar, welcome message.

### Phase 3 — Stripe Billing (3 h)

- Checkout sessions pour Pro tier ($29/mois)
- Webhook handler pour subscription events (created, updated, deleted)
- Billing portal Stripe
- Pricing page
- Boutons upgrade/manage liés aux opérations Stripe

### Phase 4 — Polish & Deploy (1 h)

- Landing page (hero + features) — voir [05](05-claude-code-landing-page.md)
- Préparer `README.md` env vars
- `npm run build` (vérifier 0 erreur)
- Deploy Vercel
- Rédaction instructions deploy complètes

**Résultat** : SaaS production-ready avec auth, billing, deploy en ~8 h pour ~12 $ d'API.

## Workflow Apify Étendu (15-19 h, avec features AI)

Ajoute aux 4 phases ci-dessus :

### Phase AI (3-4 h) — Features Apify + Claude API

Exemples concrets de features AI :
- **Monitoring prix concurrents** : Apify scrape + Claude analyse
- **Lead research reports** : Scrapers Apify combinés avec analyse Claude API

Note légale : `"Web scraping should comply with each target site's Terms of Service and robots.txt."`

### Phase Tests (1 h) — Vitest

Couverture minimum :
- Routes auth
- Webhook Stripe (signature verification)
- RLS policies (test avec utilisateurs distincts)

### Phase Deploy étendue (1-2 h)

- Vercel CLI plutôt que dashboard
- Custom domain + SSL automatique
- Variables env via Vercel CLI

## Setup Supabase MCP avec Claude Code

Le MCP officiel Supabase **transforme Claude Code en pilote DB par langage naturel**.

### Setup en 4 étapes (Composio)

1. **Accéder à Composio Connect** : `https://connect.composio.dev/`
2. **Activer intégration Supabase** : authentifier avec credentials
3. **Configurer Claude Code/Desktop** :
   - Ouvrir settings
   - Section Connectors
   - "Add custom connector"
   - URL : `https://connect.composio.dev/mcp`
4. **Autoriser** : navigateur s'ouvre, signin Composio

### Setup direct (sans Composio) — recommandé

```json
// ~/.config/claude-code/mcp_settings.json
{
  "mcpServers": {
    "supabase": {
      "command": "npx",
      "args": [
        "-y",
        "@supabase/mcp-server-supabase",
        "--access-token",
        "<YOUR_PERSONAL_ACCESS_TOKEN>"
      ]
    }
  }
}
```

### Exemples de prompts pilotage DB

- `"Create a new table called users with id, name, and email"`
- `"Insert sample data into the users table"`
- `"Fetch all records from the users table"`
- `"Update a user's email based on their id"`
- `"List all RLS policies on the profiles table"`
- `"Run advisor checks for security issues"`

Claude exécute via MCP et retourne résultats structurés.

## Best Practices SaaS avec Claude Code (MakerKit)

### Principe 1 — Reference Code Over Training Data

> "The quality of AI-generated code depends almost entirely on the code it has to reference."

Toujours pointer Claude vers du code existant en pattern. Greenfield = qualité dégradée.

### Principe 2 — PRD-Driven Development

Créer Product Requirements Documents structurés avec **user stories détaillées** plutôt que prompts éparpillés. Permet implémentation séquentielle cohérente.

### Principe 3 — Task Isolation

- Tâches **single-purpose**
- TODO lists oversized = context window saturé = output dégradé
- **Fresh sessions** pour travail complexe (éviter context drift)

### Principe 4 — Code Review Intégré

Après chaque tâche :
```bash
pnpm healthcheck  # type-check + lint
pnpm test         # tests unitaires
pnpm db:check     # migrations valides
```

Utiliser un **agent `@code-quality-reviewer`** pour security, perf, conventions.

### Principe 5 — Rules absolues, pas suggestions

❌ "Consider checking ownership"
✅ "MUST verify `auth.uid() = profile.id` before any update"

> "Tell agents what they MUST do and MUST NOT do. Absolute rules beat suggestions."

### Principe 6 — Skills + Subagents

Dans `.claude/`:
- **Agents** (`/agents/`) : domain-specific reviewers (ex: `billing-reviewer.md`)
- **Skills** (`/skills/`) : patterns réutilisables (auth flow, billing pattern, testing)

Différence : Skills injectent contexte dans la session courante, Agents spawn une session séparée.

## Anti-Patterns SaaS Claude Code

❌ **Trust greenfield AI patterns** — sans reference code, qualité dégradée
❌ **Long conversation sessions** — règles dégradent progressivement
❌ **Skip human architectural review** — code fonctionnel ≠ production-quality
❌ **Vague requirements** → vague implementations
❌ **Allow redundant generated code** — queries inutiles, champs dupliqués (Claude rajoute parfois explicit auth checks déjà gérés par middleware)

## Validation Approach

> "Functional code differs from production-quality code. Review every change, verify architectural decisions, and understand implementations before deployment."

**PRD Refinement** : lire les PRD générés par Claude AVANT impl. Supprimer les redondances que Claude ajoute (ex : auth checks déjà gérés middleware), consolider duplications.

## Coûts Réels

| Tutorial | Durée | Coût API estimé |
|----------|-------|----------------|
| AI Builder Club (SaaS basique) | ~8 h | ~12 $ |
| Apify étendu (avec AI features) | 15-19 h | ~25-40 $ |
| Production polish | +5-10 h | +10-20 $ |

**Total réaliste pour SaaS commercializable** : 20-30 h de travail + 30-60 $ API + 0 $ infra (free tiers).

## Stack Alternative (mention)

Si vous ne voulez pas tout coder vous-même : utiliser un **boilerplate** comme :
- **MakerKit** (`makerkit.dev/next-supabase`) — Next.js Supabase SaaS Boilerplate payant
- **Saas-Kit-supabase** (GitHub) — Template open source Reactjs + Nextjs + Supabase

Puis customiser avec Claude Code.

## Sources

- [Build a Full SaaS App with Claude Code in a Weekend — AI Builder Club](https://www.aibuilderclub.com/blog/build-saas-claude-code-tutorial) — 4 phases, 8h, 12$ API
- [Build a SaaS MVP in a Weekend — Apify](https://use-apify.com/blog/vibe-coding-claude-code-saas-mvp) — 5 phases avec features AI
- [Claude Code Best Practices — MakerKit](https://makerkit.dev/blog/tutorials/claude-code-best-practices) — Patterns + anti-patterns
- [Claude Code: Build a SaaS — MakerKit](https://makerkit.dev/blog/tutorials/claude-code-build-saas) — Tutorial complet
- [Supabase MCP with Claude Code — Composio](https://composio.dev/content/supabase-mcp-with-claude-code) — Setup MCP
- [Managing Supabase projects with Claude Code — DEV.to](https://dev.to/composiodev/managing-supabase-projects-with-claude-code-111h) — Pilotage langage naturel
- [Build Complete Website Claude Code — Substack](https://aiblewmymind.substack.com/p/build-complete-website-claude-code) — End-to-end avec Resend, SEO
- [Saas-Kit-supabase — GitHub](https://github.com/Saas-Starter-Kit/Saas-Kit-supabase) — Boilerplate gratuit
