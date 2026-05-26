# 01 — Manifeste : Les 5 principes

> Les 5 principes de la methodologie Documentation-First. A accrocher au mur.

## Le manifeste integral

```
1. ENQUETER avant de coder.
   Si je n'ai pas de doc dans docs/, je lance /doc-maker.

2. CADRER avant de toucher Webflow.
   Si pas de CDC dans docs/[client]/, je lance /cdc-maker.

3. CAPITALISER apres la 2e fois.
   Si je le refais, je lance /skill-maker pour automatiser.

4. EXECUTER via MCP, jamais a la main quand ca peut etre automate.
   Webflow, HubSpot, Ads, tout passe par MCP.

5. VERIFIER chaque output Claude.
   Screenshot + clic sur les CTAs + DevTools.
   Claude se trompe encore, surtout sur le visuel.
```

Source : `docs/formation-nopillo/03-methodologie-formateur.md`.

## Principe 1 — Enqueter avant de coder

### Enonce

> "Si je n'ai pas de doc dans `docs/`, je lance `/doc-maker`."

### Pourquoi c'est important

Coder sans avoir enquete c'est :
- Reinventer la roue (le concurrent a deja resolu le probleme)
- Manquer des bonnes pratiques specifiques au vertical
- Risquer le "blanc" sur des points cles (tracking, accessibilite, RGPD)

Enqueter coute 10-30 min via `/doc-maker`. Re-coder coute 2-3 jours.

### Application concrete

| Avant tache | Verifier docs/ contient |
|-------------|------------------------|
| Landing B2B SaaS | `docs/concurrents-[secteur]/`, `docs/ds-references/` |
| Integration HubSpot | `docs/hubspot/` |
| Setup tracking ads | `docs/google-ads/`, `docs/meta-ads/` |
| Migration tech | `docs/[techno-source]/`, `docs/[techno-cible]/` |

Si manque -> `/doc-maker [sujet]` AVANT de toucher au code.

## Principe 2 — Cadrer avant de toucher

### Enonce

> "Si pas de CDC dans `docs/[client]/`, je lance `/cdc-maker`."

### Pourquoi c'est important

Coder sans CDC c'est :
- Decouvrir le perimetre en cours de route (= depassement budget)
- Pas de waves de paralelisation possible (= 30-50% temps perdu)
- Pas d'assignation executeur (= confusion qui fait quoi)
- Pas de validation client explicite (= retours en boucle)

Le CDC est le contrat tacite : decoupage taches, dependances, executeurs (Claude+MCP, manuel, agent), waves paralleles.

### Application concrete

Voir `docs/cdc-landing-improvement/` : exemple reel de CDC Nopillo.
- 30 taches reparties sur 5 phases
- 7 waves d'execution paralleles
- Chaque tache a son executeur (Webflow MCP, manuel, etc.)
- Validation client a chaque jalon

### Anti-pattern

"Je vais juste faire un truc rapide" sans CDC. Resultat : 3x plus long que prevu.

## Principe 3 — Capitaliser apres la 2e fois

### Enonce

> "Si je le refais, je lance `/skill-maker` pour automatiser."

### Pourquoi c'est important

> "Si vous avez ecrit les memes instructions a Claude deux fois, c'aurait du etre un skill la premiere fois." — Best practices Anthropic

La 1ere fois : on decouvre le workflow.
La 2eme fois : on capitalise en skill `.claude/skills/[nom]/SKILL.md`.
La 3eme fois et + : 1 mot suffit pour declencher.

### Effet de cliquet

Chaque skill capitalise = un capital pour l'equipe :
- Le skill est commit dans le repo
- Tout nouveau dev herite de tous les skills
- L'onboarding est instantane
- La qualite est stable (pas de variation selon qui code)

### Skills Nopillo type a creer

Voir `05-pattern-skills-recurrents.md` pour le detail.

## Principe 4 — Executer via MCP

### Enonce

> "Webflow, HubSpot, Ads, tout passe par MCP."

### Pourquoi c'est important

Faire a la main quand un MCP existe c'est :
- Repetitif et chronophage (15-30 min vs 30 sec)
- Sujet aux erreurs humaines (oubli champ, mauvais setting)
- Non versionnable (impossible a re-jouer)
- Non deleguable (Claude ne peut pas aider)

### MCPs Nopillo a maitriser

| MCP | Usage Nopillo |
|-----|---------------|
| **Webflow** | Pages, CMS, composants, scripts |
| **HubSpot** | Forms, contacts, lifecycle, campaigns |
| **Google Ads** | Campagnes, keywords, conversions |
| **Meta Ads** | Lead forms, audiences |
| **Supabase** | DB, edge functions (option Netlify) |
| **Context7** | Docs libs a jour |

### Cas limite : la main quand mieux

| Cas | Pourquoi main > MCP |
|-----|---------------------|
| Premiere demo client | UI Webflow visuelle pour demonstrer |
| Decision de design rapide | Tester en visu plus rapide qu'en MCP |
| Bug isole une fois | Pas la peine d'industrialiser |

## Principe 5 — Verifier chaque output

### Enonce

> "Screenshot + clic sur les CTAs + DevTools. Claude se trompe encore, surtout sur le visuel."

### Pourquoi c'est important

Claude genere du code "plausible" qui peut etre faux :
- CSS qui s'affiche bizarrement (sans contexte visuel)
- JS qui marche en dev mais casse en prod
- Forms qui ressemblent a fonctionner mais n'envoient rien
- Tracking qui s'install mais ne tracke pas

### Methode de verification minimale

Pour chaque livrable Claude :

1. **Screenshot** : capture visuelle, comparer au design cible
2. **Clic CTAs** : tous les boutons doivent mener au bon endroit
3. **Form test** : remplir + soumettre + verifier en backend (HubSpot)
4. **DevTools Console** : zero erreur JS
5. **DevTools Network** : tracking events bien envoyes (GA4, Meta, GTM)
6. **Lighthouse** : score Performance + Accessibility minimum

> Best Practice Anthropic : "Donner un moyen de verification est la chose a plus haut effet de levier que vous puissiez faire."

### Verification par hooks (avance)

Cf. `docs/cdc-claude-code-audit/04-architecture.md` — Hooks PostToolUse pour automatiser les verifs (lint, typecheck) apres chaque edit.

## Synthese : la chaine de declenchement

```
NOUVEAU PROJET
     |
     v
[1] J'ai docs/ pour ce sujet ?
     | NON --> /doc-maker
     | OUI -> continue
     v
[2] J'ai CDC dans docs/[client]/ ?
     | NON --> /cdc-maker
     | OUI -> continue
     v
[3] Je l'ai deja fait ?
     | OUI 2x+ --> Verifie skill .claude/skills/
     |              Si pas de skill --> /skill-maker
     | OUI 1x   --> Code, capitalise apres
     | NON      --> Code en mode exploration
     v
[4] J'utilise MCP partout ou possible
     v
[5] Je VERIFIE l'output (screenshot, clic, devtools)
     v
LIVRABLE VALIDE
```

## A retenir

- **Documentation-First** = un reflexe a installer (apres 1 mois c'est automatique)
- Les 5 principes se renforcent mutuellement
- Le pipeline est circulaire : chaque execution enrichit la doc/skills

## Sources

- `docs/formation-nopillo/03-methodologie-formateur.md` — Source originale du manifeste
- `docs/cdc-claude-code-audit/03-best-practices.md` — BP officielles Anthropic
- `docs/cdc-claude-code-audit/04-architecture.md` — Architecture Claude Code
