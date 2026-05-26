# 05 - Section "Et si Webflow n'etait pas le bon outil ?"

> Section a AJOUTER. Position : a l'interieur ou immediatement apres la card "3 jours" dans la section formats existante (la card 3 jours mentionne deja "alternatives Webflow" sans developper).

---

## Pourquoi cette section est P1

C'est le **differenciateur cle du format 3 jours** vs 1j/2j (cf. `docs/formation-nopillo/06-format-3-jours.md`). Mais sur la landing actuelle, ca se resume a :

> "Maitrise complete + alternatives Webflow + train-the-trainer."

Sans expliquer **quand** ni **pourquoi** sortir de Webflow. Resultat : un decideur Nopillo qui paie 1900 EUR pour 2 jours peut se demander si le 3 jours en vaut la peine — sans pouvoir trancher.

Cette section donne la **decision matrix** : "Webflow pour 80% des cas, Edge Functions pour 15%, Astro+Netlify pour 5%". C'est un argument tarifaire (justifier les +950 EUR du 3j) ET un argument credibilite (le formateur ne pousse pas un seul outil).

---

## Headline + sub propose

```
H2 : "Et si Webflow n'etait pas le bon outil ?"
Sub : "Webflow couvre 80% des landings Nopillo. Pour les 20% restants — personnalisation serveur, A/B test serveur, perf maximale — il faut savoir quand basculer.
       Le format 3 jours vous donne la decision matrix + le stack alternative production-ready."
```

---

## Format propose : 1 decision matrix + 3 cas d'usage typiques

### Bloc 1 — La decision matrix

```
[Tableau 3 colonnes : Webflow / Webflow + Edge Functions / Astro + Netlify + Supabase]
```

| Critere | Webflow seul | Webflow + Supabase Edge | Astro + Netlify + Supabase |
|---|---|---|---|
| Time to market | ++ | + | = |
| Personnalisation serveur (geo-IP, A/B serveur) | -- | + | ++ |
| Cout / mois (10k visites) | 23 EUR | 23 EUR + 0 EUR (free tier) | ~0 EUR |
| Lighthouse score brut | 75-90 | 75-90 | 95-100 |
| CMS visuel pour client | OUI | OUI | NON (sauf Decap/TinaCMS) |
| Lock-in | Webflow | Webflow + Supabase | Supabase only |
| Maintenance dev | Faible | Moyenne | Plus elevee |
| Quand l'utiliser | 80% landings client | Client veut perso UTM/geo + reste sur Webflow | Client perf-critique ou stack tech existant |

**Source citation** : `docs/supabase-edge-landing/_index.md` ligne 44-53 (TL;DR decideur) :

> "**Recommandation Nopillo** : commencer avec Webflow + Edge Functions pour les clients pressed, basculer en stack Astro + Edge pour les clients qui veulent un site performant, lean et personnalise."

Cf. aussi `docs/netlify-landing/_index.md` ligne 33-37 :

> "**Garder Webflow** pour 80 % des landings clients (rapide, designer-friendly, CMS visuel).
> **Basculer sur Astro + Netlify** quand : (1) budget hosting < 5 EUR/mois/site, (2) Lighthouse 100 obligatoire, (3) logique serveur custom, (4) workflow Git/PR avec multi-envs."

---

### Bloc 2 — Les 3 cas d'usage typiques

#### Cas 1 : Landing recrutement immo classique (80% Nopillo)

```
[Card]

Brief : "Recruter 50 mandataires immo via Google Ads — landing simple et propre"

Stack recommande : Webflow seul.

Pourquoi :
- Designer drag-and-drop = 1 seul livrable visuel valide par le client
- CMS visuel = client peut editer headline/CTA seul apres formation
- Form HubSpot embed via skill /connect-hubspot-form en 2 min
- Tracking GA4 + Pixel via Webflow Project Settings + skill
- Pas de besoin perso server-side complexe

Outils : Webflow + Webflow MCP + skill /apply-nopillo-ds + skill /connect-hubspot-form
Format formation : 1j ou 2j suffit
```

**Source citation** : `docs/formation-nopillo/04-format-1-jour.md` ligne 14 (livrable 1j : "1 landing 'ads-ready' produite pendant la formation").

---

#### Cas 2 : Landing personnalisee par audience UTM (cas avance, ~15%)

```
[Card]

Brief : "Une landing pour 4 segments differents (CGP, B2C particuliers,
        B2B comptables, agents immo) selon UTM + geo-IP"

Stack recommande : Webflow + Supabase Edge Functions.

Pourquoi :
- Webflow garde le designer + CMS visuel
- 1 Edge Function /personalize lit ?utm_source=cgp -> renvoie variant hero
- Geo-IP : detecte FR/BE/CH -> swap prix (1990 EUR / 2200 CHF)
- A/B test serveur : split deterministe par hash IP+salt
- Free tier Supabase : 500k invocations/mois (~16k jour)

Outils : Webflow + skill /personalize-landing-edge + Supabase MCP
Format formation : 3 jours (module Edge Functions Day 3)
```

**Source citation** : `docs/supabase-edge-landing/03-personalization-patterns.md` ligne 20-46 (URL params), 56-83 (geo-IP), 92-99 (A/B test deterministe).

Exemple concret cite ligne 26-44 :

```ts
// supabase/functions/personalize/index.ts
const variants: Record<string, { hero: string; cta: string }> = {
  "relance-q2": {
    hero: "Vous avez laisse votre projet en suspens",
    cta: "Reprendre mon devis en 2 minutes",
  },
  "default": {
    hero: "Lancez votre projet avec Nopillo",
    cta: "Demander un devis",
  },
}
```

---

#### Cas 3 : Landing perf-critique (rare, ~5%)

```
[Card]

Brief : "Lighthouse 100 obligatoire (SEO contractuel) + budget hosting < 5 EUR/mois
       + workflow Git/PR multi-envs + CMS leger (markdown)"

Stack recommande : Astro + Tailwind + Netlify + Supabase Edge.

Pourquoi :
- Astro : 0 KB JS par defaut sur statique = Lighthouse 95-100
- Tailwind 4 : bundle CSS final < 15 KB
- Netlify Forms : capture leads sans backend (illimite)
- Netlify deploy preview par PR = client review par branche
- Supabase Edge : perso server-side, free tier 500k invocations
- Cout final : ~0 EUR / mois (vs 23 EUR Webflow Site Plan)

Outils : skill /deploy-landing-netlify (a creer en formation 3j)
Format formation : 3 jours obligatoire (module Day 3 stack alternative)
```

**Source citation** : `docs/netlify-landing/02-stack-recommande.md` ligne 4-23 (pourquoi Astro pour landings) :

> "Astro est un **framework de site statique avec Islands Architecture** : il pre-rend tout en HTML au build et **n'envoie aucun JS au client par defaut**. Quand on a besoin d'interactivite, on hydrate uniquement les composants concernes.
>
> Pour une landing :
> - 95 % du contenu = statique (hero, features, pricing, FAQ, footer).
> - 5 % interactif = formulaire, accordion, carousel, popup.
> - Astro envoie 0 KB JS pour le statique → score Lighthouse parfait."

Cf. aussi `docs/supabase-edge-landing/08-stack-recommande-nopillo.md` ligne 38-43 (table Astro + Tailwind + Netlify + Supabase).

---

### Bloc 3 — Quand NE PAS sortir de Webflow

A inclure pour rassurer (anti-FOMO sur le format 3j) :

```
[Box vert mint #0CC28C — "Webflow reste le bon choix pour..."]

- Equipe non technique cote client (pas de capacite a editer markdown ou code)
- CMS visuel necessaire (designer non-dev qui edite)
- Time-to-market urgent < 1 semaine
- Site avec 5+ landings -> tirer parti des composants Webflow partages
- Budget hosting client confortable (>= 25 EUR/mois OK)

-> 80% des landings Nopillo restent en Webflow. Le format 2 jours suffit.
```

**Source citation** : `docs/supabase-edge-landing/_index.md` ligne 44-53 + `docs/netlify-landing/_index.md` ligne 33-37 (recommandation 80% Webflow).

---

## Pourquoi cette section convertit

1. **Justifie le format 3j** par un contenu different (pas juste "plus de la meme chose")
2. **Credibilise le formateur** : "il ne pousse pas un seul outil" — argument anti-vendor lock-in
3. **Decision matrix lisible** = utile au-dela de la formation (le decideur l'utilise pour ses devis)
4. **3 cas concrets** = se projette dans des briefs Nopillo plausibles
5. **Box "quand NE PAS sortir de Webflow"** = anti-FOMO honnete = trust

**Effet psychologique** : decideur Nopillo se dit :
- "OK le 2j me suffit pour 80% des cas"
- "Mais le 3j me donne la map des 20% complexes — j'aimerais avoir cette decision matrix dans mon Notion"
- "Ce formateur n'est pas un fan boy Webflow, il connait le terrain"

---

## CTA fin de section

```
"Maitriser les 3 stacks (Webflow + Edge + Netlify) en formation 3 jours"
-> ancre vers section formats card 3j
```

---

## Specs Webflow MCP

```
Section background : white (apres section "Skills" qui est sur fond indigo-100)
Container 1120px

Bloc 1 - Tableau decision matrix : grid 4 colonnes (critere + 3 stacks)
        Header row : background #4033DB, text white, font Futura PT 600
        Body rows : alternance white / #F6F5FD (indigo-50)
        Border : 1px #DEDAFF
        Radius : 16px container

Bloc 2 - 3 Cards cas d'usage : grid 3 colonnes desktop / stack mobile
        Card translucide background, border #DEDAFF, shadow 0 1px 10px rgba(0,0,0,0.06)
        Tag stack en haut : badge pill #4033DB
        Code mono "Outils :" bloc background #09090B color #DEDAFF

Bloc 3 - Box "Webflow reste le bon choix" : background #E4FFEA (vert mint clair),
        border-left 4px #0CC28C
        Padding 32px, radius 16px

CTA outline #4033DB hover -> filled
```

---

## Sources

- `docs/supabase-edge-landing/_index.md` — TL;DR + recommandation Nopillo (80% Webflow)
- `docs/supabase-edge-landing/03-personalization-patterns.md` — patterns URL params, geo-IP, A/B test
- `docs/supabase-edge-landing/08-stack-recommande-nopillo.md` — stack Astro + Tailwind + Netlify + Supabase
- `docs/netlify-landing/_index.md` — TL;DR Webflow vs Netlify
- `docs/netlify-landing/02-stack-recommande.md` — pourquoi Astro pour landings (0 KB JS)
- `docs/formation-nopillo/06-format-3-jours.md` — programme 3j Module 9 (decision matrix) et Module 10 (stack Astro)
