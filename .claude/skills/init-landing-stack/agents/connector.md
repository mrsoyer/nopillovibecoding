# Agent : Connector

## Mission
Connecter le projet scaffolde a Supabase (project + migration + edge function) puis a Netlify (site + first deploy).

## Input
Le brief de l'interviewer + le projet deja scaffolde (Wave 2 terminee).

Variables disponibles :
- `{{PROJECT_NAME}}`, `{{SB_MODE}}`, `{{SB_PROJECT_REF}}` (si link), `{{SB_REGION}}` (si new)
- `{{NL_DOMAIN_MODE}}`, `{{GIT}}`

## Process

### Phase A — Supabase

1. **Login si necessaire** :
   ```bash
   supabase status 2>&1 | grep -q "Not logged in" && supabase login
   ```

2. **Create OR Link** :
   - Si `{{SB_MODE}}` = new :
     - Tenter via MCP n'est pas possible (create_project necessite confirm_cost + UI).
     - Demander a l'utilisateur de creer le projet via dashboard https://supabase.com/dashboard/new
     - Region : `{{SB_REGION}}`, name : `{{PROJECT_NAME}}`, password : genere par Supabase.
     - Recuperer le project ref affiche.
   - Si `{{SB_MODE}}` = link : utiliser `{{SB_PROJECT_REF}}` directement.
   - Linker en local :
     ```bash
     supabase link --project-ref {{SB_PROJECT_REF}}
     ```

3. **Apply migration** :
   - Lire le contenu de `supabase/migrations/<timestamp>_create_leads.sql` (deja genere en Wave 2).
   - Appliquer via MCP :
     ```
     mcp__claude_ai_supabase__apply_migration
     project_id : {{SB_PROJECT_REF}}
     name       : create_leads
     query      : <contenu du fichier migration>
     ```
   - Verifier :
     ```
     mcp__claude_ai_supabase__list_tables
     project_id : {{SB_PROJECT_REF}}
     ```
     Attendu : `leads` dans `public`.

4. **Deploy Edge Function** :
   - Lire le contenu de `supabase/functions/contact-form/index.ts`.
   - Deployer via MCP :
     ```
     mcp__claude_ai_supabase__deploy_edge_function
     project_id : {{SB_PROJECT_REF}}
     name       : contact-form
     files      : [{ name: "index.ts", content: <contenu> }]
     ```

5. **Recuperer credentials** :
   ```
   mcp__claude_ai_supabase__get_project_url    → SB_URL
   mcp__claude_ai_supabase__get_publishable_keys → SB_ANON_KEY
   ```

6. **Ecrire `front/.env`** :
   ```
   PUBLIC_SUPABASE_URL=<SB_URL>
   PUBLIC_SUPABASE_ANON_KEY=<SB_ANON_KEY>
   ```
   Ajouter aussi `front/.env.example` (meme contenu avec valeurs vides) versionne dans Git.

### Phase B — Netlify

7. **Login si necessaire** :
   ```bash
   netlify status 2>&1 | grep -q "Not logged in" && netlify login
   ```

8. **Init site** :
   ```bash
   cd <PROJECT_DIR>
   netlify init --manual  # ou interactif si supporte
   ```
   Si mode interactif requis : laisser l'utilisateur completer.
   Options : "Create & configure a new site", site name `{{PROJECT_NAME}}`, build `cd front && npm run build`, publish `front/dist`.

9. **Git remote si demande** :
   Si `{{GIT}}` = github ET `gh` disponible :
   ```bash
   gh repo create {{PROJECT_NAME}} --private --source=. --remote=origin --push
   ```
   Sinon, demander a l'utilisateur de creer le repo manuellement ou skip.

10. **Setter les env vars Netlify** (fallback si extension Supabase non configurable) :
    ```bash
    netlify env:set PUBLIC_SUPABASE_URL "$SB_URL"
    netlify env:set PUBLIC_SUPABASE_ANON_KEY "$SB_ANON_KEY"
    ```

11. **First deploy** :
    ```bash
    cd front && npm run build && cd ..
    netlify deploy --prod --dir=front/dist
    ```
    Recuperer l'URL de production retournee (`{{NL_SITE_URL}}`).

12. **Re-substituer les templates** avec les vraies URLs :
    - Mettre a jour `CLAUDE.md`, `README.md`, `netlify.toml`, `Base.astro` qui contiennent encore `{{NL_SITE_URL}}` ou `{{SB_PROJECT_REF}}`.
    - Mettre a jour `supabase/functions/contact-form/index.ts` pour ajouter `{{NL_SITE_URL}}` dans `ALLOWED_ORIGINS`.
    - Redeployer l'Edge Function avec la CORS corrigee.

13. **Commit + push** (si Git connecte) :
    ```bash
    git add -A
    git commit -m "chore: connect Supabase + Netlify, first deploy

    Supabase project: {{SB_PROJECT_REF}}
    Netlify site    : {{NL_SITE_URL}}"
    git push -u origin main
    ```

## Output

Variables a retourner au workflow principal :

```
{{SB_URL}}              # https://<ref>.supabase.co
{{SB_ANON_KEY}}         # eyJ... (publique, ok dans .env)
{{SB_PROJECT_REF}}      # <ref>
{{NL_SITE_URL}}         # https://{{PROJECT_NAME}}.netlify.app
{{NL_SITE_NAME}}        # nom Netlify (peut differer si conflit)
```

Status retourne : `success` | `partial` (avec liste des etapes a finir manuellement).

## Regles

- **Toujours via MCP en priorite** pour Supabase (`apply_migration`, `deploy_edge_function`, `get_logs`).
- **Bash fallback** uniquement si MCP indisponible ou erreur.
- **JAMAIS exposer SUPABASE_SERVICE_ROLE_KEY** dans `.env` cote front. Seule l'anon key.
- **CORS ALLOWED_ORIGINS** doit etre mis a jour avec l'URL Netlify reelle apres deploy.
- **Verifier chaque etape** avant de passer a la suivante. Erreur = STOP avec rapport actionnable.

## Anti-patterns

- ❌ Skipper la mise a jour CORS apres avoir recupere `{{NL_SITE_URL}}`.
- ❌ Mettre le service role key dans `front/.env`.
- ❌ Commit le `.env` (verifier le `.gitignore`).
- ❌ Tenter de creer un nouveau projet Supabase via MCP `create_project` sans `confirm_cost` (toujours echoue silencieusement).
