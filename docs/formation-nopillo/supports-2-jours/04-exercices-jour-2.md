# 04 — Exercices JOUR 2 (6 exercices)

> 6 exercices encadres J2 avec consigne, livrable, criteres reussite, duree. Couvrent les 4 modules J2 : HubSpot, Google Ads, Meta Ads, Workflow d'equipe.

## Vue d'ensemble J2

| # | Exercice | Module | Duree | Format |
|---|----------|--------|-------|--------|
| 5.1 | Quiz pair recap J1 | Recap | 10 min | Pair |
| 5.2 | Co-construction `/connect-hubspot-form` | M5 HubSpot | 30 min | Plenary + pair |
| 5.3 | Embed form HubSpot sur landing J1 | M5 HubSpot | 25 min | Pair |
| 6.1 | Co-construction `/setup-tracking-ads` | M6 Google | 25 min | Plenary + pair |
| 6.2 | Connecter MCP Google + 1 conversion | M6 Google | 17 min | Pair |
| 7.1 | Co-construction `/landing-meta-ads` | M7 Meta | 25 min | Plenary + pair |
| 7.2 | Variante landing Meta Ads | M7 Meta | 16 min | Pair |
| 8.1 | Push skills J1+J2 dans repo Git Nopillo | M8 Workflow | 25 min | Solo + review |

## Exercice 5.1 — Quiz pair recap J1

### Consigne

En binome, chacun pose 5 questions sur J1 a son partenaire. Themes obligatoires :
1. Le manifeste Doc-First (5 principes)
2. Les 18 categories MCP Webflow
3. La difference Wave 1 / Wave 2 dans un CDC
4. L'anatomie d'un skill Claude Code
5. La rule of two pour creer un skill

### Livrable

Score interne : nb de bonnes reponses / 10.

### Criteres reussite

- [ ] Chaque binome a fait l'exercice
- [ ] Score moyen > 7/10 (sinon revoir pendant J2)
- [ ] Au moins 1 question complementaire posee au formateur

### Duree

10 min

### Format

Pair, sans intervention formateur

### Sources

- `docs/pedagogie-formation/05-techniques-animation.md`
- `docs/pedagogie-formation/03-format-2-jours.md` (recap interactif J2)

## Exercice 5.2 — Co-construction skill `/connect-hubspot-form`

### Consigne

En plenary, construire le SKILL.md du skill `/connect-hubspot-form` :
- Inputs : portalId HubSpot, formId, page Webflow target
- Etapes :
  1. Recuperer le form HubSpot via MCP
  2. Generer le code embed
  3. Inserer le code dans la page Webflow via MCP
  4. Configurer events GA4 + Pixel sur form_submit
  5. Tester (envoi reel + verif contact cree)
- Outputs : URL preview + lien contact HubSpot

### Livrable

Dossier `.claude/skills/connect-hubspot-form/` committed.

### Criteres reussite

- [ ] Skill committed
- [ ] Test reussi : 1 contact cree dans HubSpot suite a un envoi de form
- [ ] Events GA4 visibles en DebugView
- [ ] SKILL.md complet

### Duree

30 min (incl. demo)

### Format

Plenary 12 min + pair 18 min

### Sources

- `docs/hubspot/04-api-crm.md`
- `docs/hubspot/09-mcp-remote-server.md`
- `docs/formation-nopillo/05-format-2-jours.md` (Module 5)

## Exercice 5.3 — Embed form HubSpot sur landing J1

### Consigne

Sur la landing produite en J1 (Exo 4.2 `/landing-google-ads`), ajouter un form HubSpot via le skill `/connect-hubspot-form` qu'on vient de construire. Tester un envoi reel.

### Livrable

Landing J1 avec form HubSpot fonctionnel + 1 contact test cree dans HubSpot + events GA4 detectes.

### Criteres reussite

- [ ] Form embed visible dans la landing
- [ ] Submit du form -> contact cree dans HubSpot dans les 30 sec
- [ ] Event GA4 `form_submit` visible en DebugView
- [ ] Event Pixel Lead visible si Pixel configure

### Duree

25 min

### Format

Pair, chacun sur sa landing

### Sources

- `docs/hubspot/04-api-crm.md`
- `docs/google-ads/07-conversion-tracking.md`
- `docs/formation-nopillo/05-format-2-jours.md` (Module 5 exercice ligne 119)

## Exercice 6.1 — Co-construction skill `/setup-tracking-ads`

### Consigne

Construire le skill `/setup-tracking-ads` qui setup l'ensemble du tracking ads sur une landing :
- GA4 (GTM + events conversion)
- Meta Pixel (browser side)
- Meta CAPI (server side via Edge Function ou CDP)
- Google Ads enhanced conversions
- Consent Mode V2 (CMP detecte automatiquement)

### Livrable

Skill `.claude/skills/setup-tracking-ads/` committed avec SKILL.md complet + helpers.

### Criteres reussite

- [ ] Skill committed
- [ ] Test reussi : tous les events detectes en DebugView (GA4) + Events Manager (Meta) + Conversion debugger (Google)
- [ ] Consent V2 actif et respecte (test avec opt-out)

### Duree

25 min

### Format

Plenary 10 min + pair 15 min

### Sources

- `docs/google-ads/07-conversion-tracking.md`
- `docs/google-ads/06-automation-scripts.md`
- `docs/meta-ads/`
- `docs/formation-nopillo/05-format-2-jours.md` (Module 6)

## Exercice 6.2 — Connecter MCP Google Ads + generer 1 conversion

### Consigne

1. Connecter le MCP Google Ads (Composio ou Cohnen) au compte sandbox
2. Lister les campagnes existantes via prompt Claude
3. Sur la landing J1 (avec form HubSpot connecte), declencher 1 conversion test
4. Verifier que la conversion remonte dans Google Ads (sandbox)

### Livrable

Capture ecran de la conversion remontee dans Google Ads sandbox + log Claude des prompts utilises.

### Criteres reussite

- [ ] MCP Google Ads connecte (validation `claude mcp list`)
- [ ] Liste des campagnes affichee sans erreur (10+ campagnes attendues)
- [ ] Conversion test visible dans Google Ads dans les 24h (souvent 1-2h en sandbox)

### Duree

17 min

### Format

Pair

### Sources

- `docs/google-ads/04-mcp-google-ads.md`
- `docs/formation-nopillo/05-format-2-jours.md` (Module 6 exercice ligne 136)

## Exercice 7.1 — Co-construction skill `/landing-meta-ads`

- **Consigne** : skill `/landing-meta-ads` produit variante landing : hero vertical-first 9:16, hook < 1.7s, message-match creative, form Lead embed ou Lead Form natif, Pixel + CAPI dedupe
- **Livrable** : `.claude/skills/landing-meta-ads/` committed
- **Criteres** : variante < 5 min, vertical OK, hook visible sans scroll iPhone 12
- **Duree** : 25 min (10 plenary + 15 pair)
- **Sources** : `docs/meta-ads/`, `docs/meta-ads-mcp/`, `docs/formation-nopillo/05-format-2-jours.md`

## Exercice 7.2 — Variante landing Meta Ads sur le brief perso

- **Consigne** : sur le brief perso (pre-work), produire variante Meta Ads via skill 7.1, comparer cote a cote avec Google Ads J1
- **Livrable** : 2 landings (Google vs Meta) + memo 3 differences
- **Criteres** : Meta produite, hook < 1.7s verifie iPhone simule, memo ecrit, Lighthouse mobile > 80
- **Duree** : 16 min (pair)

### Format

Pair

### Sources

- `docs/meta-ads/`
- `docs/formation-nopillo/05-format-2-jours.md` (Module 7 exercice ligne 152)

## Exercice 8.1 — Push skills J1+J2 dans repo Git Nopillo

### Consigne

Sur la branche `formation` du repo Nopillo :
1. Verifier les 6 skills crees (3 J1 + 3 J2) sont dans `.claude/skills/`
2. Renommer / ajuster selon convention Nopillo (prefixes : apply-, landing-, audit-, connect-, setup-)
3. Ecrire un README.md global dans `.claude/skills/README.md` qui liste les 6 skills
4. Faire un commit avec message conforme convention
5. Push + ouvrir une PR vers main
6. Demander a un binome de review

### Livrable

PR ouverte avec 6 skills + README global. PR review par un autre binome.

### Criteres reussite

- [ ] 6 skills presents dans le repo
- [ ] README global liste tous les skills avec description courte
- [ ] PR ouverte avec description structuree
- [ ] PR review (au moins 1 commentaire constructif d'un binome)

### Duree

25 min

### Format

Solo (chacun pousse depuis son poste) + review pair

### Sources

- `docs/cdc-claude-code-audit/04-architecture.md`
- `docs/formation-nopillo/03-methodologie-formateur.md`
- `docs/formation-nopillo/05-format-2-jours.md` (Module 8 exercice ligne 167)

## Bilan + indicateurs + sources

Bilan J2 par binome : form HubSpot connecte, skill `/setup-tracking-ads` teste, 1 conversion sandbox Google Ads, variante Meta Ads, 6 skills pushed via PR.

Exemple commit message convention Nopillo (Exo 8.1) :

```bash
git commit -m "feat(skills): add /connect-hubspot-form skill v1.0.0

- Embed form HubSpot in Webflow page
- Configure GA4 + Pixel events on form_submit
- Tested on landing-google-ads template"
```

Pieges : (a) scope HubSpot Private App verifie J-7, (b) Composio + Cohnen tous deux setup pour Google, (c) Pixel TEST utilise (pas production), (d) Exo 7.2 en homework si pas fini.

Indicateurs reussite J2 : 100% PR ouverte, 100% form HubSpot OK, 80% tracking complet, 80% variante Meta.

## Sources

- `docs/formation-nopillo/05-format-2-jours.md`
- `docs/pedagogie-formation/05-techniques-animation.md`
- `docs/pedagogie-formation/06-evaluation.md`
