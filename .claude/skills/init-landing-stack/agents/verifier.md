# Agent : Verifier

## Mission
Verifier que le bootstrap complet a reussi : URL prod accessible, Lighthouse OK, form submission OK, insert verifie dans Supabase. Produire le rapport final structure.

## Input
- `{{NL_SITE_URL}}` : URL Netlify de prod
- `{{SB_URL}}` : URL Supabase
- `{{SB_ANON_KEY}}` : anon key
- `{{SB_PROJECT_REF}}` : project ref
- `{{PROJECT_NAME}}`, `{{NL_SITE_NAME}}`

## Process

### Check 1 — HTTP + Lighthouse

```bash
bash .claude/skills/init-landing-stack/scripts/verify-deploy.sh {{NL_SITE_URL}} 85
```

Lire le code de sortie :
- 0 : OK
- 1 : HTTP != 200 → STOP, debug avec `netlify deploy --prod` logs
- 2 : Lighthouse < 85 → WARNING (pas bloquant pour un projet fresh), noter score
- 3 : argument manquant (bug du skill, ne devrait pas arriver)

Recuperer le score Lighthouse pour le rapport.

### Check 2 — Test submission form

```bash
bash .claude/skills/init-landing-stack/scripts/test-form-submission.sh {{SB_URL}} {{SB_ANON_KEY}}
```

Lire le code de sortie :
- 0 : form OK
- != 0 : STOP, debug avec MCP `mcp__claude_ai_supabase__get_logs` (service: edge-function, function: contact-form)

### Check 3 — Verifier insert via MCP

```
mcp__claude_ai_supabase__execute_sql
project_id : {{SB_PROJECT_REF}}
query      : SELECT count(*) as n FROM public.leads WHERE source = 'skill-init'
```

Attendu : `n >= 1` (au moins le lead de test).

Si 0 : malgre le 200 du form, l'insert n'a pas eu lieu. Debug :
1. Logs Edge Function
2. Verifier RLS policies (devrait etre service_role bypass)
3. Verifier que `SUPABASE_SERVICE_ROLE_KEY` est bien injectee dans la fonction

### Check 4 — Context-guardian (suggestion utilisateur)

Le skill ne peut pas executer context-guardian automatiquement (c'est un autre skill). Suggerer a l'utilisateur :

```
Pour verifier la sante du contexte Claude Code :
cd <PROJECT_DIR> && claude
> verifie le contexte
```

Cible : score >= 60/80 pour un projet fresh.

### Check 5 — Generer le rapport final

Format obligatoire :

```
═══════════════════════════════════════════════════════════
  INIT LANDING STACK : SUCCESS
═══════════════════════════════════════════════════════════

PROJET
  Nom         : {{PROJECT_NAME}}
  Dossier     : <chemin absolu>
  Stack       : Astro 6 + Tailwind 4 + Supabase + Netlify
  Git remote  : <github.com/user/{{PROJECT_NAME}} ou aucun>

URLS
  Production    : {{NL_SITE_URL}}
  Dashboard NL  : https://app.netlify.com/sites/{{NL_SITE_NAME}}
  Dashboard SB  : https://app.supabase.com/project/{{SB_PROJECT_REF}}

VERIFICATIONS
  ✓ HTTP 200            : OK
  ✓ Lighthouse Perf     : <score> / 100
  ✓ Form submission     : OK (test lead insere)
  ✓ Insert DB verified  : <count> lead(s) en base

DUREE TOTALE   : <minutes> min
COUTS ESTIMES  : free tier Supabase + Netlify

PROCHAINES ETAPES
  1. cd <PROJECT_DIR> && cd front && npm run dev
  2. Editer front/src/components/Hero.astro pour ta promesse
  3. Personnaliser front/src/pages/index.astro (sections)
  4. (Optionnel) tape "verifie le contexte" pour audit context-guardian
  5. (Optionnel) /connect-hubspot-form si HubSpot
  6. (Optionnel) /landing-google-ads ou /landing-meta-ads pour optimisation

DOC UTILE
  - Checklist mise en prod : docs/stack-landing-claude-code/07-conversion-checklist.md
  - Patterns Edge Functions : docs/stack-landing-claude-code/05-supabase-integration.md
═══════════════════════════════════════════════════════════
```

Si l'un des checks 1-3 est en WARNING ou ERROR : adapter le titre :
- `INIT LANDING STACK : PARTIAL` si warnings
- `INIT LANDING STACK : ERROR` si erreurs bloquantes (et lister les fixes)

## Regles

- **Tous les checks avant rapport** : ne pas afficher SUCCESS si l'un a foire.
- **Rapport structure** : meme format toujours, l'utilisateur doit pouvoir comparer entre projets.
- **Lighthouse 85 minimum** : seuil bas car le projet est fresh (peu de contenu). Pour optimiser plus tard.
- **Insert verifie via MCP** : c'est la preuve que le form fonctionne vraiment, pas juste le 200 HTTP.
- **Pas de suggestion stupide** : si Q7 = none, ne pas suggerer `/connect-hubspot-form`.

## Anti-patterns

- ❌ Rapport SUCCESS si le form n'insere pas (200 OK trompeur).
- ❌ Skipper check 3 (insert DB) — sans ca, on ne sait pas si la fonction marche vraiment.
- ❌ Suggerer tous les skills disponibles meme non pertinents (bruit).
- ❌ Pas de duree totale dans le rapport — l'utilisateur veut savoir.
