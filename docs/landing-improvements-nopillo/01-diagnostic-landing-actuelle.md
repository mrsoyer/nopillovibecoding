# 01 - Diagnostic landing actuelle : pourquoi ca ne fait pas envie

> Pourquoi un decideur Nopillo qui lit la landing aujourd'hui ne se projette pas concretement.

---

## Sections actuelles de la landing (analyse curl /tmp/landing.html)

| # | Section | H2/H3 actuel | Probleme principal |
|---|---|---|---|
| 1 | Hero | "Industrialisez vos landings ads avec Claude Code + Webflow MCP" | Promesse OK mais sans visuel ni preuve immediate |
| 2 | Probleme | "Vos landings ads vous coutent 3 fois trop cher a produire" | OK (bonne accroche) |
| 3 | Methodologie | "4 etapes pour passer de prompt a landing publiee" | **Trop meta** : Enqueter / Cadrer / Capitaliser / Executer = abstrait |
| 4 | 3 formats | "Choisissez le format adapte a votre equipe" | Cards bonnes mais sans differenciation visuelle des outputs |
| 5 | Etude cas | "Une landing par MCP brut : 4.1/10. Avec methode : 8.5+/10." | **Sans visuel before/after**, juste un chiffre abstrait |
| 6 | Preuve methodo | "Une methode appliquee a 16 dossiers, 27 755 lignes capitalisees" | **Brag KPI documentation only**, pas client-facing |
| 7 | FAQ | "Tout ce que vous voulez savoir" | OK |
| 8 | CTA | "Reservez un brief gratuit de 30 minutes" | OK |

**Manque** : tout ce qui est entre "promesse" et "preuve par les KPIs" — c'est-a-dire **le concret du quotidien Nopillo apres formation**.

---

## Probleme 1 — Le meta-discours

### Constat

La section "4 etapes pour passer de prompt a landing publiee" enchaine 4 verbes abstraits :

> "Enqueter / Cadrer / Capitaliser / Executer"
> Sub : "5 doc-maker en parallele sur les concurrents : 5 docs en 10 minutes au lieu de 5 jours."

C'est conceptuellement bon, mais le decideur Nopillo lit "5 doc-maker en parallele" sans visualiser :
- Ce que produit UN `doc-maker` (un fichier markdown ? un dossier ? un livrable ?)
- A quoi sert le livrable (lecture humaine ? consommation par un autre LLM ? import quelque part ?)
- Comment cette doc l'aide concretement quand il fait sa prochaine landing pour un client

Cf. citation `docs/methodologie-documentation-first/02-pipeline-doc-cdc-skill.md` :

```
docs/[sujet]/
├── _index.md              # Index + 3 takeaways
├── 01-overview.md         # Vue ensemble
├── 02-[theme].md
├── ...
└── sources.md             # Sources web consultees
```

**Ca, c'est ce qu'un doc-maker produit.** Mais ce n'est jamais montre dans la landing.

### Anti-pattern : "Vague ou clever headline"

Cf. `docs/landing-page-best-practices/06-anti-patterns.md` anti-pattern 3 :

> **Probleme** : "Welcome to the future of work" / "L'art de coder en mode zen".
> **Impact** : Le visiteur ne comprend pas le produit en 5s = bounce.
> **Correction** : Benefit-driven, specifique, < 12 mots.

La section "Methode" actuelle tombe dans ce piege au niveau micro : chaque etape est headlinee par UN VERBE ABSTRAIT (`Enqueter`, `Cadrer`...) au lieu d'un benefice concret (`Sortir 5 fiches concurrents en 10 min`, `Decouper 30 taches en 7 waves paralleles`).

---

## Probleme 2 — Vocabulaire technique non demystifie

### Mots cles utilises sans explication

| Mot | Occurrences landing | Explique ? |
|---|---|---|
| MCP / Model Context Protocol | 4 | Non |
| Skills (custom Nopillo) | 6 | Non (juste "workflows reutilisables") |
| Documentation-First | 5 | Cite, jamais demontre |
| `/doc-maker`, `/cdc-maker`, `/skill-maker` | 3 | Mentionnes sans demo |
| 16 docs, 27 755 lignes, 6 skills | 3 | Citation KPIs seule |

### Ce que comprend un decideur Nopillo non-dev

> "Webflow + HubSpot + Google Ads + Meta Ads, automatises via le Model Context Protocol."

Pour un dev senior, c'est clair. Pour un CEO/Head of Design Nopillo, ca peut etre lu comme "bla bla technique". Manque la traduction :

> "Tu poses la question 'liste mes 5 campagnes les plus rentables' a Claude, il pulse Google Ads, te repond avec ROAS calcule. Pas de dashboard a ouvrir."

Cf. `docs/google-ads/04-mcp-google-ads.md` ligne 14 :

> "Le **Model Context Protocol (MCP)** permet a Claude (et autres LLMs) d'interagir avec Google Ads en **langage naturel**. Au lieu de naviguer dans les dashboards ou ecrire du code GAQL, tu poses des questions a Claude qui execute les outils MCP."

**Cette phrase devrait etre la dans la landing.** Pas dans une doc interne.

---

## Probleme 3 — Aucune demonstration visuelle de l'output

### Ce qui manque visuellement

| Type de visuel | Present sur la landing ? | Devrait etre la ? |
|---|---|---|
| Screenshot Claude Code en action | Non | OUI section "MCPs" |
| Screenshot d'une landing produite | Non | OUI section "etude de cas" |
| Avant/apres landing We Invest | Non (juste "4.1/10 -> 8.5/10") | OUI section "etude de cas" |
| Diagramme pipeline doc/cdc/skill | Non | OUI section "methode" |
| Capture d'un fichier `.claude/skills/SKILL.md` | Non | OUI section "skills" |
| Tableau MCPs (Webflow, HubSpot, Google Ads, Meta Ads) avec ce qu'ils font | Non | OUI section "MCPs" |
| Logo Nopillo en navbar | Non (audit 3/10 cite) | OUI |
| Illustration isometrique style Nopillo | Non | OUI |

### Anti-pattern : "Critical Info Below the Fold"

Cf. `docs/landing-page-best-practices/06-anti-patterns.md` anti-pattern 4 :

> **Probleme** : Value prop, CTA primaire ou benefits caches sous le scroll.
> **Impact** : Plupart des visiteurs ne scrollent jamais s'ils ne sont pas accroches.

Le visuel hero est ABSENT. Le hero est 100% texte. Cf. `docs/audit-landing-vs-nopillo/_index.md` ecart 8 :

> "Notre landing : AUCUNE illustration. Que des elements textuels (numeros 01/02/03, fleches `→`, checkmarks `✓` et `×` en caracteres unicode dans le pricing). Aucune image."

Resultat : page percue comme **doc technique** au lieu de **produit premium**.

---

## Probleme 4 — Etude de cas non racontee

### Section actuelle

```html
<h2 class="etude-title">Une landing par MCP brut : 4.1/10. Avec methode : 8.5+/10.</h2>
<p class="etude-text-body">La methode Documentation-First aurait evite les 5 defauts en moins de 2 heures de production via les memes outils.</p>
```

C'est tout. **5 defauts** sont mentionnes mais jamais listes. **2h** est cite mais sans timeline. Le client (We Invest, agences immo) n'est meme pas nomme.

### Ce qui devrait etre raconte

Le repo contient `docs/cdc-landing-improvement/` avec un cas reel : agence We Invest France, recrutement mandataires immo, landing genere brut au MCP avec 5 defauts critiques (cf. extraits dans le fichier 07 du present rapport).

**Storytelling manque** :
1. Le brief (recruter 50 mandataires/mois)
2. La generation rapide brut MCP (45 min)
3. Le diagnostic apres : 5 defauts critiques (form absent, message-match faux, pas de tracking...)
4. La meme landing apres methode : 2h, score 8.5/10
5. La timeline visuelle

Cf. `docs/formation-nopillo/04-format-1-jour.md` ligne 60 :

> "**Etude de cas** : presentation de [cdc-landing-improvement] — 'voici ce qui se passe sans methodo : 5 defauts critiques'"

C'est ce que la landing doit ELLE AUSSI montrer pour vendre la formation.

---

## Probleme 5 — DS Nopillo absent (cf. audit existant 3/10)

Cite `docs/audit-landing-vs-nopillo/_index.md` (le rapport est entier dedie a ce probleme) :

| # | Element manquant | Severite |
|---|---|---|
| P0 | Police Futura PT non chargee (CSS la declare, mais aucun script Typekit dans `<head>`) | Critique |
| P0 | `body { font-family: Arial }` au lieu de Futura PT | Critique |
| P0 | Aucun header / navbar / logo Nopillo | Critique |
| P0 | Aucun headband orange `#FFF3DF` (signature Nopillo) | Critique |
| P1 | Footer minimaliste sans liens legaux ni reseaux | Eleve |
| P1 | Boutons CTA radius incoherents (8/10/12/16/24px au lieu de 999px partout) | Moyen |

**Ironie** : la landing est **incoherente avec le DS du client a qui elle est destinee** — ce qui est l'inverse de l'argument "je peux aspirer votre DS en 10 min" que la formation vend.

---

## Probleme 6 — Tone trop "process consultant", manque de FOMO

Quotes actuelles :
- "On est passes de 12h par landing a 3h."
- "Les juniors livrent maintenant la meme qualite que les seniors grace aux skills standardises."
- "Le ROI est tombe sous 2 mois."

Tres bonnes quotes... mais visiblement **placeholders** (cf. `cdc-landing-formation-nopillo/01-specs.md` ligne 142 : "**3 quotes a recolter post-formation (laisser placeholders)**").

Pas de FOMO :
- Pas de "place limitee a 6 participants par session"
- Pas de "prochaine session : du X au Y"
- Pas de "tarif valable jusqu'au Z"
- Pas de "X agences inscrites depuis le lancement"

Cf. `docs/landing-page-best-practices/06-anti-patterns.md` (extrait ligne ~140 sur urgence/scarcite) : la rarete authentique (vraies dates de session, vrais quotas) accelere la decision.

---

## Synthese : la landing actuelle parle a un dev senior deja convaincu

| Public touche actuel | Public cible reel |
|---|---|
| Dev senior qui connait Claude Code + MCP | Decideur Nopillo (CEO/Head of Design) |
| Comprend "skills", "MCPs", "doc-maker" | A entendu parler d'IA, pas forcement de MCP |
| Lit le code et les KPIs documentation | Veut voir une demo ET un avant/apres |
| Pas besoin de demo visuelle | A besoin d'images/screenshots/timeline |

**Le gap** : la landing est **redigee par un dev pour des devs**, mais le persona principal (cf. `cdc-landing-formation-nopillo/01-specs.md` ligne 25) est :

> "**Persona principal** : decideur agence (CEO, Head of Design) avec 2-15 employes qui produit des landings pour des campagnes ads (Google + Meta) et veut accelerer/industrialiser."

Ce decideur a besoin de **voir** ce que la formation va concretement permettre a son equipe de faire — pas de lire des KPIs sur la documentation interne du formateur.

---

## Conclusion

3 manques structurels :

1. **Aucune section "ce que les MCPs font vraiment"** — le decideur ne comprend pas l'outil
2. **Aucune section "skills before/after"** — le decideur ne voit pas le gain quotidien
3. **Aucune preuve visuelle** — le decideur ne se projette pas

Les sections suivantes du present rapport (02 a 07) decrivent ces 6 nouvelles sections + leur contenu pret a coller.

---

## Sources

- `docs/landing-page-best-practices/06-anti-patterns.md` — anti-patterns 3 (vague headline), 4 (info below fold), 1 (multiple goals)
- `docs/audit-landing-vs-nopillo/_index.md` — score visuel 3/10
- `docs/cdc-landing-formation-nopillo/01-specs.md` — persona cible
- `docs/methodologie-documentation-first/02-pipeline-doc-cdc-skill.md` — outputs concrets doc-maker
- `docs/google-ads/04-mcp-google-ads.md` — definition MCP en langage user-facing
