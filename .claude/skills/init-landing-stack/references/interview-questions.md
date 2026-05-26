# Interview Questions — Detail des 6 questions

Les questions sont posees **une a la fois**, avec un default explicite. L'utilisateur peut juste taper Entree pour valider le default.

Si `$ARGUMENTS` contient deja une valeur, skipper la question correspondante.

## Q1 — Nom du projet

```
Q1 : Nom du projet (kebab-case) ?
     [default: <nom du dossier courant>]
> 
```

**Default** : `basename "$PWD" | tr '[:upper:]' '[:lower:]' | sed 's/[^a-z0-9-]/-/g'`

**Validation** : regex `^[a-z][a-z0-9-]{2,40}$` (lettres minuscules, chiffres, tirets, 3-41 chars, commence par lettre).

**Si invalide** : afficher pourquoi, redemander.

**Variable** : `{{PROJECT_NAME}}` — utilisee partout (dossier, repo Git, projet Supabase, site Netlify).

## Q2 — Type de landing

```
Q2 : Type de landing ?
     1) lead-gen (capture leads, defaut)
     2) produit (SaaS, ecommerce, app)
     3) formation (cours, bootcamp)
     4) event (webinar, conference)
> 
```

**Default** : `lead-gen`

**Effet** :
- `lead-gen` : sections [Hero, Bénéfices, Social Proof, Form]
- `produit` : sections [Hero, Features, Pricing, FAQ, CTA]
- `formation` : sections [Hero, Programme, Formateur, Tarifs, Form]
- `event` : sections [Hero, Programme, Speakers, Date, Inscription]

**Variable** : `{{PROJECT_TYPE}}` — utilisee dans le template `index.astro` pour pre-remplir les sections.

## Q3 — Supabase nouveau ou existant

```
Q3 : Supabase : nouveau projet ou link a existant ?
     1) nouveau (defaut, on cree tout depuis zero)
     2) existant (entre le project-ref)
> 
```

**Default** : `nouveau`

**Si "existant"** : sous-question :
```
Q3b : Project ref Supabase ? (ex: abcdefghij)
> 
```
Validation : 20 caracteres alphanumeriques.

**Variable** : `{{SB_MODE}}` (`new` | `link`), `{{SB_PROJECT_REF}}` (si link).

## Q4 — Region Supabase

```
Q4 : Region Supabase ?
     1) eu-west-1 (Paris, defaut RGPD)
     2) eu-central-1 (Frankfurt)
     3) us-east-1 (Virginia)
     4) ap-southeast-1 (Singapour)
> 
```

**Default** : `eu-west-1`

**Skip si Q3 = existant** (region heritee du projet existant).

**Variable** : `{{SB_REGION}}`.

## Q5 — Domaine Netlify

```
Q5 : Domaine Netlify ?
     1) auto (defaut, <project>.netlify.app immediatement)
     2) custom (a configurer apres deploy, etape DNS supplementaire)
> 
```

**Default** : `auto`

**Si "custom"** : sous-question :
```
Q5b : Domaine custom (ex: ma-landing.com) ?
> 
```

**Variable** : `{{NL_DOMAIN_MODE}}` (`auto` | `custom`), `{{CUSTOM_DOMAIN}}` (si custom).

**Note** : meme si custom, le first deploy se fait sur l'URL auto. La configuration DNS est documentee dans le rapport final, pas executee.

## Q6 — Git remote

```
Q6 : Git : connecter a un remote ?
     1) GitHub (defaut, push avec gh CLI si installe)
     2) aucun (juste git local)
> 
```

**Default** : `GitHub` si `gh` est installe ET authentifie (`gh auth status`), sinon `aucun`.

**Variable** : `{{GIT}}` (`github` | `none`).

## Synthese du brief

Apres les 6 questions, afficher :

```
BRIEF VALIDE
─────────────
  Nom         : ma-landing
  Type        : lead-gen
  Framework   : Astro 6 + Tailwind 4 (MVP)
  Supabase    : nouveau projet, region eu-west-1
  Netlify     : domaine auto (ma-landing.netlify.app)
  Git         : GitHub (gh CLI detecte)

DUREE ESTIMEE : 10-12 min execution + 1-2 min OAuth
COUTS         : Free tier Supabase + Netlify (suffisant)

[1] Confirmer et lancer  [2] Modifier une question  [3] Annuler
> 
```

## Regles d'interview

- **Posé une seule question a la fois**. Jamais 2 questions dans un meme message.
- **Default toujours visible** entre crochets. L'utilisateur peut juste appuyer Entree.
- **Validation immediate** : si l'input est invalide, expliquer pourquoi et redemander immediatement.
- **Skip intelligent** :
  - Q4 skip si Q3 = existant
  - Q5b skip si Q5 = auto
  - Q3b skip si Q3 = nouveau
- **Confirmation explicite** avant de lancer la suite. L'utilisateur doit pouvoir reviser sans repartir de zero.
- **Si l'utilisateur dit "tout default"** au debut : appliquer les defaults sans questionner, afficher le brief, demander confirmation.
