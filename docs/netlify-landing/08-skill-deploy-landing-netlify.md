# 08 — Specs skill Claude Code : `/deploy-landing-netlify`

## Objectif

Skill Claude Code qui scaffold une landing **Astro + Tailwind + Netlify** prete a deployer en moins de **10 minutes**, en suivant les conventions Nopillo.

## Triggers

Le skill se declenche quand :
- L'utilisateur tape `/deploy-landing-netlify`.
- L'utilisateur ecrit : "scaffold une landing Netlify", "nouvelle landing Astro Netlify", "cree une landing Astro Tailwind".
- Mots-cles : `landing`, `astro`, `netlify`, `nouveau site`, `scaffold landing`.

## Inputs

Demandes par le skill au demarrage (interactif) :

| Input | Defaut | Validation |
|-------|--------|------------|
| `client-name` | obligatoire | slug-friendly, lowercase, kebab-case |
| `domain` | optionnel | format domaine valide |
| `template` | `nopillo-base` | `nopillo-base` / `saas` / `event` / `local-biz` |
| `cms` | `none` | `none` / `decap` / `tina` / `sanity` |
| `forms` | `oui` | `oui` / `non` |
| `crm-integration` | `none` | `none` / `hubspot` / `mailchimp` / `brevo` |
| `ab-testing` | `non` | `oui` / `non` |
| `i18n-locales` | `fr` | liste codes locales (`fr,en,es`) |
| `analytics` | `plausible` | `plausible` / `ga4` / `matomo` / `none` |

## Outputs

### Arborescence creee

```
<client-name>/
├── .gitignore
├── .nvmrc                          # node version
├── README.md                       # doc onboarding client
├── package.json
├── tsconfig.json
├── astro.config.mjs
├── tailwind.config.ts
├── netlify.toml                    # config build, headers, redirects, contexts
├── .lighthouserc.json              # seuils CI Lighthouse
├── .github/
│   └── workflows/
│       └── lighthouse.yml          # check perf sur PR
├── public/
│   ├── favicon.svg
│   ├── robots.txt
│   └── og-default.jpg
├── src/
│   ├── components/
│   │   ├── Hero.astro
│   │   ├── Features.astro
│   │   ├── Pricing.astro
│   │   ├── ContactForm.astro
│   │   ├── Footer.astro
│   │   └── Analytics.astro
│   ├── layouts/
│   │   └── Base.astro
│   ├── pages/
│   │   ├── index.astro
│   │   ├── merci.astro
│   │   └── 404.astro
│   ├── styles/
│   │   └── global.css
│   └── content/
│       ├── faq/
│       └── temoignages/
├── netlify/
│   ├── functions/
│   │   └── lead-to-crm.ts          # si CRM choisi
│   └── edge-functions/
│       └── ab-hero.ts              # si A/B active
└── docs/
    ├── onboarding-client.md
    └── workflow-deploy.md
```

### Commandes executees

```bash
# 1. Init projet
npm create astro@latest <client-name> -- --template minimal --typescript strict --git --install --no-add

cd <client-name>

# 2. Integrations Astro
npx astro add tailwind --yes
npx astro add netlify --yes
npx astro add sitemap --yes

# 3. Dependances additionnelles
npm install -D @types/node prettier prettier-plugin-astro prettier-plugin-tailwindcss
npm install @netlify/functions astro-icon

# 4. Init Git + premier commit
git init
git add .
git commit -m "chore: scaffold landing <client-name> via Nopillo skill"

# 5. Lien Netlify (si auth disponible)
netlify init --manual
# ou guide l'utilisateur a creer manuellement
```

## Etapes du skill

### Etape 1 : Pre-flight check

- Verifier `node --version` >= 20.
- Verifier `npm` ou `pnpm` installe.
- Verifier `netlify --version` (si absent : `npm install -g netlify-cli` propose).
- Verifier qu'on est dans un dossier vide ou demander confirmation.

### Etape 2 : Interview interactive

Poser les inputs un par un avec defauts + validation + exemples.

```
> Nom du client (slug, ex: acme-corp) : 
> Domaine final (laisser vide si inconnu, ex: acme.com) : 
> Template ([1] nopillo-base [2] saas [3] event [4] local-biz) : 1
> CMS Git ([1] aucun [2] decap [3] tina [4] sanity) : 1
> Activer Netlify Forms ? (Y/n) : Y
> Integration CRM ([1] aucune [2] hubspot [3] mailchimp [4] brevo) : 2
> Activer A/B testing Edge Functions ? (y/N) : N
> Langues (par defaut fr, ex: fr,en) : fr
> Analytics ([1] plausible [2] ga4 [3] matomo [4] aucun) : 1
```

### Etape 3 : Scaffolding

1. `npm create astro` avec template minimal.
2. Ajouter integrations Tailwind, Netlify, Sitemap, Icon.
3. **Generer fichiers depuis templates Nopillo** (Hero, Features, etc.) en respectant le template choisi.
4. **Generer `netlify.toml`** avec contexts production / deploy-preview / branch-deploy + headers securite + redirect API.
5. **Generer `tailwind.config.ts`** avec design tokens neutres (a customiser plus tard avec design system client).
6. **Generer `ContactForm.astro`** avec :
   - `data-netlify="true"` + honeypot si forms = oui.
   - `action="/merci"`.
   - Bouton avec label adapte au template.
7. **Si CRM** : generer `netlify/functions/lead-to-crm.ts` adapte (HubSpot / Mailchimp / Brevo) + intercepter le submit du form pour POSTer egalement vers la Function.
8. **Si A/B testing** : generer `netlify/edge-functions/ab-hero.ts` avec pattern cookie + transformation HTML.
9. **Si i18n multi-locales** : generer routing `/[locale]/...` + middleware Astro i18n.
10. **Si analytics** : injecter snippet dans `Base.astro`.

### Etape 4 : Lighthouse CI

Generer `.github/workflows/lighthouse.yml` + `.lighthouserc.json` avec seuils :
- Performance >= 0.95
- Accessibility >= 1.0
- Best practices >= 0.95
- SEO >= 0.95

### Etape 5 : Documentation client

Generer `docs/onboarding-client.md` :
- Comment editer le contenu (selon CMS).
- Comment voir les leads (lien dashboard Netlify).
- Comment demander une modif (process Nopillo).
- Liens : preview production, Netlify dashboard, repo GitHub.

Generer `docs/workflow-deploy.md` :
- Branching strategy.
- Comment creer une PR.
- Comment voir une preview.

### Etape 6 : Init Netlify

Si CLI Netlify dispo et user authentifie :
```bash
netlify init
# Guide : "Create & configure a new site"
# Team : Nopillo
# Site name : <client-name>-nopillo
# Build command : npm run build
# Publish directory : dist
```

Sinon, afficher instructions manuelles :
```
1. Crée un repo GitHub : github.com/nopillo/<client-name>
2. git remote add origin git@github.com:nopillo/<client-name>.git && git push -u origin main
3. Va sur app.netlify.com → Add new project → Import → choisir le repo
4. Confirme : build = `npm run build`, publish = `dist`
5. Ajoute les env vars (HUBSPOT_TOKEN, etc.) via Site settings → Environment variables
```

### Etape 7 : Verification finale

- `npm run build` local pour s'assurer que tout compile.
- `netlify dev` pour tester forms + functions + edge.
- Afficher checklist post-scaffold :

```
[OK] Projet cree dans ./<client-name>
[OK] Astro + Tailwind + Netlify configures
[OK] netlify.toml avec headers securite
[OK] Form Netlify avec honeypot
[OK] Function HubSpot pre-cablee (rappel: definir HUBSPOT_TOKEN)
[OK] GitHub Action Lighthouse CI

A FAIRE :
- Editer src/components/Hero.astro avec contenu client
- Configurer design tokens dans tailwind.config.ts
- Ajouter env var HUBSPOT_TOKEN dans Netlify dashboard
- Mapper le domaine custom (acme.com)
- Tester le form depuis la preview deploy
```

## Templates par type de landing

### `nopillo-base`
Hero + Features + Social proof + Pricing + FAQ + Contact + Footer.

### `saas`
Hero + Logos clients + Features tabs + Demo video + Pricing 3 tiers + Comparison table + FAQ + CTA secondaire + Footer.

### `event`
Hero (countdown) + Speakers + Agenda + Tickets + Sponsors + Lieu (map) + FAQ + Footer.

### `local-biz`
Hero + Services + Galerie + Avis Google + Map + Horaires + Contact + Footer.

## Conventions Nopillo embarquees

- **Composants Astro `.astro`** par defaut, pas de React sauf besoin specifique (`client:visible`).
- **Tailwind 4** avec `tailwind.config.ts` typed.
- **Design tokens** dans `src/tokens/colors.ts`, `src/tokens/typography.ts`.
- **Class naming** : pas de @apply, classes inline + `clsx` si conditionnel.
- **Images** : composant `<Image>` Astro + fallback Image CDN Netlify.
- **Forms** : toujours honeypot + page `/merci` + integration CRM via Function (pas via Zapier en first iteration).
- **Headers securite** dans `netlify.toml` (CSP, X-Frame, Referrer-Policy).
- **Lighthouse CI obligatoire** sur PR.
- **Conventional commits** (`feat:`, `fix:`, `chore:`).
- **README** avec sommaire fixe (Setup, Dev local, Deploy, Edit content).

## Exemple invocation

```
User: /deploy-landing-netlify

Claude: 
[Pre-flight check OK]

Je vais scaffold une nouvelle landing pour Nopillo.

Nom du client (slug) : ▮
```

User repond, Claude execute, en 5-8 min le projet est pret a `git push` et a etre lie a Netlify.

## Erreurs gerees

| Erreur | Action |
|--------|--------|
| `node` < 20 | Demande mise a jour, propose `nvm install 20` |
| `netlify` CLI manquant | Propose `npm install -g netlify-cli` |
| Dossier non vide | Demande confirmation OU change de nom |
| `astro add` echoue | Retry 1x puis demande intervention manuelle |
| `npm install` echoue | Affiche log + suggere `rm -rf node_modules && npm install` |

## Metriques de succes du skill

Cible : projet utilisable (build pass + form OK + premier deploy reussi) en **< 10 minutes**.

Mesures :
- Temps total de l'invocation a `git push`.
- Nombre d'interventions manuelles necessaires post-skill.
- Score Lighthouse du premier deploy (>= 95 attendu).

## Roadmap evolution skill

- v1.0 : scaffold de base (cette spec).
- v1.1 : auto-mappage design tokens depuis Figma URL.
- v1.2 : auto-import contenu depuis brief Notion / Google Doc.
- v1.3 : sync bidirectionnelle avec Webflow CMS (lecture collections).
- v2.0 : skill `/migrate-webflow-to-netlify` qui prend une URL Webflow et la migre.

## Localisation du skill

Fichier : `~/.claude/agents/deploy-landing-netlify.md` (agent Claude Code custom format YAML frontmatter).

## A retenir

Ce skill est l'outil cle pour rentabiliser la stack Netlify chez Nopillo : il **divise par 5 le temps de setup** d'un nouveau projet et **garantit les conventions** (perf, securite, integration CRM, CI Lighthouse) sans dependre de la rigueur du dev.

## Sources

- [Get started with Netlify CLI](https://docs.netlify.com/api-and-cli-guides/cli-guides/get-started-with-cli/) — commandes `netlify init`, `dev`, `deploy`
- [astrojs/netlify integration](https://docs.astro.build/en/guides/integrations-guide/netlify/) — `npx astro add netlify` config
- [Deploy your Astro Site to Netlify](https://docs.astro.build/en/guides/deploy/netlify/) — guide officiel scaffolding
- [How to deploy an Astro site - Netlify blog](https://www.netlify.com/blog/how-to-deploy-astro/) — pattern de bootstrapping
- [GitHub - netlify-templates/astro-platform-starter](https://github.com/netlify-templates/astro-platform-starter) — starter officiel reference
- [Astro Landing Page (Astro themes)](https://astro.build/themes/details/astro-landing-page/) — template Tailwind Lighthouse 100
- [Functions overview - Netlify docs](https://docs.netlify.com/build/functions/overview/) — convention `netlify/functions/`
- [Edge Functions overview - Netlify docs](https://docs.netlify.com/build/edge-functions/overview/) — convention `netlify/edge-functions/`
