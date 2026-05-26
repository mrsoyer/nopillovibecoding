# 04 — Configurer les comptes cloud

## Table des matieres

- [Compte Supabase + nouveau projet](#compte-supabase--nouveau-projet)
- [Recuperer les credentials Supabase](#recuperer-les-credentials-supabase)
- [Compte Netlify](#compte-netlify)
- [HubSpot (optionnel)](#hubspot-optionnel)

---

## Compte Supabase + nouveau projet

### Etape 1 — Creer le compte

1. Aller sur https://supabase.com → "Start your project"
2. Sign up avec **GitHub** (recommande, plus rapide)
3. Verifier l'email recu

### Etape 2 — Creer un nouveau projet

1. Dashboard → "New Project"
2. Remplir :
   - **Name** : `nopillo-landing-mon-prenom` (ex: `nopillo-landing-camille`)
   - **Database password** : generer un mot de passe fort → **LE NOTER QUELQUE PART** (tu en auras besoin si tu veux te connecter en SQL)
   - **Region** : `Europe (West) - eu-west-3` ou `eu-central-1` (Paris/Frankfurt = RGPD ok)
   - **Pricing plan** : Free (suffisant pour le cours)
3. "Create new project" → patienter ~2 min (provisioning)

### Etape 3 — Lier le projet local

Une fois le provisioning fini :

1. Dans le dashboard Supabase, copier le **Project Reference ID** :
   - Settings → General → "Reference ID" (format : 20 chars alphanumeriques, ex: `kamazblxybkukpkvznkv`)

2. Dans ton terminal, dans le dossier du projet clone :

```bash
cd nopillo-landing-exemple
supabase link --project-ref <TON-PROJECT-REF>
```

→ tape ton mot de passe DB quand demande (celui de l'etape 2)

### Etape 4 — Appliquer les migrations

```bash
supabase db push
```

Ca cree la table `leads` (19 colonnes) dans ton projet. Verifier dans le dashboard Supabase → Database → Tables → tu dois voir `leads`.

### Etape 5 — Deployer les Edge Functions

```bash
supabase functions deploy contact-form --no-verify-jwt --project-ref <TON-PROJECT-REF>
supabase functions deploy hubspot-form-submit --no-verify-jwt --project-ref <TON-PROJECT-REF>
```

Verifier dans le dashboard Supabase → Edge Functions → tu dois voir les 2 fonctions deployees.

---

## Recuperer les credentials Supabase

Tu en as besoin pour le `.env` (etape suivante).

### Project URL

Dashboard → Settings → API → "Project URL"
Format : `https://<project-ref>.supabase.co`

### Publishable key (anon key)

Dashboard → Settings → API → "Project API keys"
- **anon / public** : commence par `sb_publishable_...` OU JWT `eyJ...` (selon version)
- → c'est celle que tu mets dans le `.env` (peut etre exposee cote client)

### Service role key (ATTENTION : SECRET)

Dashboard → Settings → API → "Project API keys"
- **service_role** : commence par `eyJ...`
- → **NE JAMAIS** la mettre dans un `.env` ni dans le code client
- Elle est auto-injectee par Supabase dans les Edge Functions, tu n'as rien a faire

### Resume

| Variable | Ou la trouver | Usage |
|----------|---------------|-------|
| `PUBLIC_SUPABASE_URL` | Settings > API > Project URL | `.env` (front) |
| `PUBLIC_SUPABASE_ANON_KEY` | Settings > API > anon/public | `.env` (front) |
| `SUPABASE_SERVICE_ROLE_KEY` | Settings > API > service_role | **NE PAS COPIER** (auto-inject Edge Function) |
| Database password | Note de l'etape 2 | `supabase link` + connexion psql |

---

## Compte Netlify

### Etape 1 — Creer le compte

1. https://www.netlify.com → "Sign up"
2. Sign up avec **GitHub** (recommande)
3. Verifier l'email

### Etape 2 — (Optionnel) Creer un site

Pour le dev local, **pas necessaire** de creer un site Netlify tout de suite. La landing tournera en local sur http://localhost:4321.

Si tu veux deja deployer en prod (pour partager le lien) :

```bash
cd nopillo-landing-exemple
netlify init
# → Suivre les prompts :
#   - Create & configure a new site
#   - Site name : nopillo-landing-tonprenom
#   - Build command : cd front && npm run build
#   - Publish directory : front/dist
```

Sinon, sauter cette etape et continuer.

---

## HubSpot (optionnel)

HubSpot est utilise pour le CRM (push leads automatique). **Optionnel** : la landing tourne sans, les leads vont juste dans Supabase.

Si tu veux activer HubSpot :

1. Creer un compte gratuit sur https://www.hubspot.com (HubSpot CRM Free)
2. Settings → Integrations → Private Apps → "Create app"
3. Scopes : cocher `crm.objects.contacts.read` + `crm.objects.contacts.write`
4. Generer + copier le token (commence par `pat-eu1-...` ou `pat-na1-...`)
5. Ajouter le secret dans Supabase :
   ```bash
   supabase secrets set HUBSPOT_API_KEY=pat-eu1-... --project-ref <TON-PROJECT-REF>
   ```

→ a la prochaine soumission du formulaire, le lead sera aussi pousse dans HubSpot.

---

## Resume des credentials a noter

Tu dois avoir maintenant :

| ID | Exemple | Source |
|----|---------|--------|
| GitHub username | `tonpseudo` | github.com |
| Supabase project ref | `xxxxxxxxxxxxxxxxxxxx` | Supabase Dashboard > Settings |
| Supabase Project URL | `https://xxx.supabase.co` | Supabase Dashboard > Settings > API |
| Supabase anon key | `sb_publishable_xxx` ou `eyJ...` | Supabase Dashboard > Settings > API |
| Supabase DB password | (note perso, jamais commit) | Note de la creation projet |
| Netlify email | `ton@email.com` | netlify.com |
| HubSpot Portal ID (optionnel) | `12345678` | hubspot.com (top right user menu) |
| HubSpot Private App token (optionnel) | `pat-eu1-...` | hubspot.com > Settings > Private Apps |

## Suivant

→ [05-config-env-mcp.md](05-config-env-mcp.md) pour configurer `.env` et `.mcp.json` avec ces credentials.

## Sources

- [Supabase Local Development](https://supabase.com/docs/guides/local-development)
- [Netlify CLI Get Started](https://docs.netlify.com/cli/get-started/)
- [HubSpot Private Apps](https://developers.hubspot.com/docs/apps/legacy-apps/authentication/intro-to-auth)
