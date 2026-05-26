# Nopillo Vibecoding — Atelier Landing Page LMNP

> Repo de l'atelier **vibecoding** Nopillo : construire une landing page LMNP de A à Z avec Claude Code, Astro 6, Supabase et Netlify. Sans toucher au code manuellement, tout est piloté par Claude.

## Pour les étudiants — Démarrage rapide

### Avant l'atelier (J-3, ~20 min)

Suivre le message Slack d'install : [docs/student-onboarding/00-installation-slack.md](docs/student-onboarding/00-installation-slack.md)

Tu installeras :
1. VSCode
2. Claude Code (CLI)
3. Le skill `student-setup` (téléchargé automatiquement)
4. Comptes Supabase + Netlify + (optionnel) HubSpot

### Le jour J (~25 min, automatisé)

Dans VSCode → Claude Code → tape simplement :

```
/student-setup
```

Le skill s'occupe de TOUT, étape par étape :

1. Détecte ton OS (Mac/Windows)
2. Installe Git (si manquant) puis Node.js + Netlify CLI + Supabase CLI
3. Clone ce repo
4. Te demande tes credentials Supabase
5. Configure `.env` + `.mcp.json` + connecte les MCPs (browser OAuth)
6. Déploie les Edge Functions
7. Lance `npm run dev` → landing live sur http://localhost:4321

À la fin : **landing Nopillo fonctionnelle avec ton propre Supabase**.

---

## Stack

- **Frontend** : Astro 6 + Tailwind 4 + React (islands) + TypeScript strict
- **Backend** : Supabase (Postgres + Edge Functions Deno)
- **Infra** : Netlify (déploiement auto)
- **DS** : Nopillo (Adobe Typekit Futura PT, indigo #4033DB, pill CTAs)
- **Tracking** : GTM + GA4 + Google Ads + Consent Mode v2
- **CRM** : HubSpot (optionnel)

## Structure du repo

```
nopillovibecoding/
├── .claude/
│   ├── skills/                   # 11 skills locaux (student-setup, hubspot-edge-form, etc.)
│   └── rules/                    # Rules path-scoped (chargées auto par Claude Code)
├── .mcp.json                     # MCPs : supabase, hubspot, webflow
├── CLAUDE.md                     # Contexte projet pour Claude Code
├── docs/                         # Documentation interne
│   ├── student-onboarding/       # Guide étudiant (8 fichiers, 1300+ lignes)
│   ├── stack-landing-claude-code/
│   ├── design-system-extraction/
│   ├── hubspot/forms-api/
│   └── ...
└── nopillo-landing-exemple/      # LE projet landing
    ├── front/                    # Astro app (npm run dev ici)
    ├── supabase/                 # Migrations + Edge Functions
    └── netlify.toml
```

## Skills locaux disponibles

| Skill | Rôle |
|-------|------|
| `/student-setup` | Setup complet de A à Z (Mac/Windows) |
| `/init-landing-stack` | Bootstrap un nouveau projet landing |
| `/hubspot-edge-form` | Générer une Edge Function pour un form HubSpot |
| `/apply-nopillo-ds` | Appliquer le Design System Nopillo |
| `/extract-design-system` | Extraire le DS d'un site existant |
| `/connect-hubspot-form` | Connecter un form HubSpot à une landing |
| `/rule-maker` | Générer une rule path-scoped |
| `/context-guardian` | Auditer la santé du contexte Claude Code |
| `/doc-maker` | Créer de la doc structurée depuis des recherches web |
| `/cdc-maker` | Créer un cahier des charges structuré |
| `/skill-maker` | Créer un nouveau skill complet |

## Documentation

| Doc | Pour qui |
|-----|----------|
| [docs/student-onboarding/](docs/student-onboarding/) | Étudiants — parcours setup complet |
| [docs/stack-landing-claude-code/](docs/stack-landing-claude-code/) | Justification stack technique |
| [docs/design-system-extraction/nopillo-extracted/](docs/design-system-extraction/nopillo-extracted/) | DS Nopillo (88 tokens CSS) |
| [docs/hubspot/forms-api/](docs/hubspot/forms-api/) | API HubSpot Forms (lecture + submit) |
| [docs/cdc-nopillo-landing-exemple/](docs/cdc-nopillo-landing-exemple/) | CDC du projet exemple |

## Prérequis matériels

- Mac (macOS 12+) OU Windows 10/11
- 8 Go RAM minimum
- 5 Go d'espace disque libre
- Connexion internet stable
- Compte GitHub, Supabase, Netlify (gratuits)

## Liens utiles

- **Documentation Astro** : https://docs.astro.build
- **Documentation Supabase** : https://supabase.com/docs
- **Documentation Netlify** : https://docs.netlify.com
- **Documentation Claude Code** : https://code.claude.com/docs

## Support

- **Pendant la formation** : lever la main ou Slack/Discord du cours
- **Hors formation** : ouvrir une issue sur ce repo
- **Doc complète** : `docs/student-onboarding/07-troubleshooting.md` couvre 25+ erreurs fréquentes

---

**Atelier organisé par Nopillo** · Stack Astro + Supabase + Netlify + Claude Code · 2026
