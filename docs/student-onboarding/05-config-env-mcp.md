# 05 — Configurer .env, .mcp.json, et MCPs Claude Code

## Table des matieres

- [Creer le .env local](#creer-le-env-local)
- [Configurer .mcp.json avec ton projet](#configurer-mcpjson-avec-ton-projet)
- [Authentifier les MCPs dans Claude Code](#authentifier-les-mcps-dans-claude-code)
- [Verifier que tout fonctionne](#verifier-que-tout-fonctionne)

---

## Creer le .env local

Le projet contient un fichier `.env.example` (template). Copie-le et remplis tes vraies valeurs.

```bash
cd nopillo-landing-exemple/front
cp .env.example .env
```

**Windows PowerShell** :
```powershell
Copy-Item .env.example .env
```

Ouvre `front/.env` dans VS Code et remplis :

```bash
PUBLIC_SUPABASE_URL=https://<TON-PROJECT-REF>.supabase.co
PUBLIC_SUPABASE_ANON_KEY=sb_publishable_xxxxxxxxxxxxxxxxxxxx
# ou eyJhbGciOiJIUzI1NiIs... (selon format)

# Optionnels (placeholder OK pour dev local)
PUBLIC_GTM_ID=GTM-XXXXXX
PUBLIC_GA4_MEASUREMENT_ID=G-XXXXXXXXXX
PUBLIC_GOOGLE_ADS_CONVERSION_ID=AW-XXXXXXXXX/XXXXXXXX
```

> **Important** : `.env` est dans `.gitignore` (jamais commit). Si tu vois ton `.env` quand tu fais `git status`, le `.gitignore` est mal configure → STOP, demander au prof.

---

## Configurer .mcp.json avec ton projet

A la racine du projet (PAS dans front/), un fichier `.mcp.json` existe deja avec la config MCPs du prof.

**Tu dois remplacer le `project_ref` Supabase par le tien** :

```bash
cd ..    # remonter a la racine du projet (nopillo-landing-exemple/)
```

Ouvre `.mcp.json` et change `kamazblxybkukpkvznkv` (le prof) en TON project ref :

```json
{
  "mcpServers": {
    "supabase": {
      "type": "http",
      "url": "https://mcp.supabase.com/mcp?project_ref=<TON-PROJECT-REF>"
    },
    "hubspot": {
      "type": "http",
      "url": "https://mcp.hubspot.com/anthropic"
    },
    "webflow": {
      "type": "http",
      "url": "https://mcp.webflow.com/mcp"
    }
  }
}
```

> Alternative en CLI (plus sur) :
> ```bash
> claude mcp remove --scope project supabase
> claude mcp add --scope project --transport http supabase \
>   "https://mcp.supabase.com/mcp?project_ref=<TON-PROJECT-REF>"
> ```

---

## Authentifier les MCPs dans Claude Code

Une fois `.mcp.json` configure, Claude Code te demandera de te connecter via OAuth a chaque MCP **la premiere fois** que tu l'utilises.

### Methode 1 — Lancer la commande `/mcp`

1. Ouvrir Claude Code (dans le terminal ou VS Code)
2. Dans le prompt, taper :
   ```
   /mcp
   ```
3. La liste des MCPs s'affiche avec leur statut :
   - ✅ Connected
   - ⚠️ Needs authentication
   - ❌ Failed to connect

4. Pour chaque MCP "Needs authentication", **selectionner** dans le menu :
   - **Supabase** : browser s'ouvre → login Supabase → "Authorize"
   - **HubSpot** : browser s'ouvre → login HubSpot → autoriser scopes CRM
   - **Webflow** : browser s'ouvre → login Webflow → choisir les sites

5. Apres chaque auth, refaire `/mcp` pour verifier `✓ Connected`.

### Methode 2 — Trigger via une question

Si tu poses une question a Claude qui utilise un MCP (ex: "liste mes tables Supabase"), Claude declenchera l'OAuth automatiquement.

### Ou sont stockes les tokens OAuth ?

| OS | Emplacement |
|----|-------------|
| **Mac** | Keychain (secure) |
| **Windows** | Credential Manager (secure) |
| **Linux** | `~/.config/claude/credentials` |

**Tu ne refais l'OAuth qu'1 seule fois par machine.** Le token est refreshe automatiquement.

---

## Verifier que tout fonctionne

```bash
# Dans le dossier du projet
claude mcp list
```

Attendu (apres OAuth) :

```
supabase: https://mcp.supabase.com/mcp?project_ref=<TON-REF> (HTTP) - ✓ Connected
hubspot:  https://mcp.hubspot.com/anthropic (HTTP) - ✓ Connected (ou Needs auth si pas fait)
webflow:  https://mcp.webflow.com/mcp (HTTP) - ✓ Connected (ou Needs auth si pas fait)
```

Test rapide dans Claude Code :

> "Liste les tables de mon Supabase"

→ Claude doit pouvoir lister la table `leads`.

> "Quel est le statut du form HubSpot ?"

→ Si tu as configure HubSpot, il te repond.

---

## Anti-patterns

- ❌ Commit `.env` dans git → expose tes credentials publiquement. Verifier `.gitignore`.
- ❌ Mettre `SUPABASE_SERVICE_ROLE_KEY` dans `.env` du front → exposee au browser
- ❌ Copier le `project_ref` du prof → tu agis sur SON projet (interdit)
- ❌ Ignorer "Needs authentication" → les MCPs ne fonctionneront pas
- ❌ Re-faire `netlify login` / `supabase login` a chaque session → c'est persistant

---

## Troubleshooting

| Symptome | Solution |
|----------|----------|
| `/mcp` ne montre rien | Verifier que `.mcp.json` existe a la racine du projet |
| MCP "Failed to connect" | URL fausse, verifier le format (HubSpot = `/anthropic`, Webflow = `/mcp`) |
| Browser ne s'ouvre pas pour OAuth | Copier l'URL affichee dans le terminal, coller manuellement |
| OAuth complete mais toujours "Needs auth" | Re-lancer Claude Code (`Cmd+Q` puis re-ouvrir) |
| `PUBLIC_SUPABASE_URL is undefined` au `npm run dev` | `.env` mal place (doit etre dans `front/`, pas a la racine) |

---

## Suivant

→ [06-lancer-dev.md](06-lancer-dev.md) pour faire tourner la landing en local !

## Sources

- [Claude Code MCP Documentation](https://code.claude.com/docs/en/mcp)
- [MCP Authentication Guide (2026)](https://www.truefoundry.com/blog/mcp-authentication-in-claude-code)
- [Astro Environment Variables](https://docs.astro.build/en/guides/environment-variables/)
