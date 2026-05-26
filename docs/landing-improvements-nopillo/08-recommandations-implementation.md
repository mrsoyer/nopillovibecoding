# 08 - Plan d'action implementation

> Ordre d'insertion + estimation effort + 5 micro-corrections sur les sections existantes.

---

## A - Ordre d'insertion des nouvelles sections

Voici l'ordre actuel de la landing et ou inserer les nouvelles sections :

| Position actuelle | Section actuelle | Action |
|---|---|---|
| 1 | Hero "Industrialisez vos landings ads" | Garder + micro-correction (cf. section B) |
| 2 | Probleme "3 freins" | Garder tel quel |
| 3 | Methode "4 etapes" | Garder + micro-correction |
| **APRES 3** | **NOUVEAU** | **Section 02 — Ce que font vraiment les MCPs** |
| **APRES MCPs** | **NOUVEAU** | **Section 03 — Vos workflows recurrents en 1 mot** |
| **APRES Skills** | **NOUVEAU** | **Section 04 — Aspirer un DS en 10 min** |
| 4 | Choisissez le format | Garder + integrer **Section 05 — Decision matrix** dans card 3j |
| 5 | Etude de cas (4.1/10 -> 8.5/10) | **REFONDRE en Section 07 — We Invest storytelling** |
| 6 | Preuve methodo "16 dossiers" | Garder + reduire (KPIs) |
| **APRES 6** | **NOUVEAU** | **Section 06 — Faites des landings que Google ADORE** |
| 7 | FAQ | Garder + ajouter 2-3 questions (cf. section C) |
| 8 | CTA + Form | Garder + micro-correction |

**Ordre logique** : meta -> demystification (MCPs, skills) -> preuve par DS -> formats -> cas client -> avantage Ads -> FAQ -> CTA.

---

## B - 5 Micro-corrections sur sections existantes

### Micro-correction 1 — Hero : ajouter visuel + modifier sub

**Section** : Hero (ligne 1)

**Texte actuel** :
```
H1 : "Industrialisez vos landings ads avec Claude Code + Webflow MCP"
Sub : "3 formats au choix (1, 2 ou 3 jours). Methode Documentation-First. Premier livrable produit pendant la formation."
```

**Probleme** : sub trop "process". 100% texte hero, aucun visuel.

**Correction** :
```
H1 : (inchange — bon)
Sub : "De 8-15h a 2h par landing. 3 formats (1, 2 ou 3 jours).
       Premier livrable produit pendant la session — Quality Score 8+ predit."
```

Ajouter visuel cote droit (60% texte / 40% visuel) :
- Illustration isometrique style Nopillo (calculator + checkmark + chrono = "production landing en 2h")
- OU screenshot Claude Code en mode chat avec prompt "/landing-google-ads --brief..." -> output mockup

**Effort** : 15 min Webflow MCP + 30 min generation visuel
**Source** : `docs/cdc-landing-formation-nopillo/01-specs.md` ligne 51 (variante hero possible "du prompt a la landing publiee en 2h")

---

### Micro-correction 2 — Methode : remplacer verbes abstraits par benefices concrets

**Section** : "4 etapes pour passer de prompt a landing publiee"

**Cards actuelles** :
```
1. Enqueter -> "5 doc-maker en parallele sur les concurrents : 5 docs en 10 minutes au lieu de 5 jours."
2. Cadrer   -> "Cahier des charges structure : 30 taches reparties en 7 waves paralleles avec executeurs."
3. Capitaliser -> "6 skills custom Nopillo : workflows recurrents transformes en commandes reutilisables."
4. Executer -> "Webflow + HubSpot + Google Ads + Meta Ads, automatises via le Model Context Protocol."
```

**Probleme** : titres sont verbes abstraits, sub-text est OK mais titre doit deja parler benefice.

**Correction** : transformer les titres en **benefice user** :

```
1. "5 fiches concurrents en 10 min"   (et non "Enqueter")
   Sub : "5 doc-maker en parallele. Reutilisables sur le client suivant du meme vertical."

2. "30 taches en 7 waves paralleles"   (et non "Cadrer")
   Sub : "CDC structure. Plus de surprise sur le perimetre. Facturation propre."

3. "6 commandes pour 6 workflows recurrents"   (et non "Capitaliser")
   Sub : "Skills Nopillo capitalises. Onboarding nouveau dev x10 plus rapide."

4. "1 prompt -> Webflow + HubSpot + Ads"   (et non "Executer")
   Sub : "Vous parlez en francais a Claude. MCP Webflow + HubSpot + Google Ads + Meta Ads automatisent."
```

**Effort** : 10 min Webflow MCP (text edit)
**Source** : `docs/landing-page-best-practices/06-anti-patterns.md` anti-pattern 3 (Headline benefit-driven, pas vague)

---

### Micro-correction 3 — Cards 3 formats : ajouter "Skills crees" et "Sortir de Webflow"

**Section** : "Choisissez le format adapte a votre equipe"

**Probleme** : les 3 cards 1j/2j/3j ont des promesses mais pas de differenciation chiffree precise. Le decideur ne sait pas quoi choisir.

**Correction** : ajouter 2 lignes dans chaque card :

| Ligne ajoutee | 1 jour | 2 jours | 3 jours |
|---|---|---|---|
| Skills crees ensemble | 1 | **6** | 6-8 |
| Plateformes ads couvertes | Google | Google + Meta | Google + Meta |
| Sortir de Webflow ? | Non | Non | **Oui (Supabase Edge + Astro/Netlify)** |

**Effort** : 15 min Webflow MCP (ajout 2 lignes table-like par card)
**Source** : `docs/cdc-landing-formation-nopillo/01-specs.md` ligne 99-107 (tableau comparatif specs cards) + `docs/formation-nopillo/04-format-1-jour.md`, `05-format-2-jours.md`, `06-format-3-jours.md`

---

### Micro-correction 4 — Hero CTA : preciser ce qu'on obtient au brief

**Section** : Hero CTA

**Texte actuel** :
```
[Reserver un brief gratuit] [Voir les 3 formats]
```

**Probleme** : "brief gratuit" n'explique pas ce qu'on retire de l'echange.

**Correction** :
```
[Reserver un brief gratuit (30 min)]
Sub-CTA : "On vous propose un mini-audit live d'une de vos landings + reco format + prix."
```

**Effort** : 5 min Webflow MCP
**Source** : `docs/landing-page-best-practices/04-cta-optimization.md` (best practices CTA + reassurance immediate)

---

### Micro-correction 5 — DS Nopillo : appliquer les 4 P0 du audit

**Section** : Globale

Cf. `docs/audit-landing-vs-nopillo/_index.md` :

| # | Correction | Effort |
|---|---|---|
| P0-1 | Charger Futura PT via Typekit (3 lignes Custom Code Webflow) | 5 min |
| P0-2 | Corriger `body { color: #333 }` -> `#09090B` et `font-family Arial` -> Futura PT | 5 min |
| P0-3 | Ajouter Navbar Webflow avec logo Nopillo + 4 liens + CTA accent | 30 min |
| P0-4 | Ajouter Headband orange `#FFF3DF` au-dessus du nav | 10 min |

**Effort total** : 50 min
**Source** : `docs/audit-landing-vs-nopillo/_index.md` ligne 188-203 (priorisation P0/P1/P2/P3)

---

## C - 2 questions a ajouter dans la FAQ

### Question 1 — "C'est quoi exactement un MCP ?"

**Reponse** :
> "MCP = Model Context Protocol. C'est un standard ouvert qui permet a Claude de parler aux outils que vous utilisez deja (Webflow, HubSpot, Google Ads, Meta Ads).
>
> Concretement : au lieu d'ouvrir 4 dashboards, vous tapez 'liste mes 5 campagnes les plus rentables' et Claude vous repond. Ou 'cree-moi une landing recrutement' et il la genere dans Webflow.
>
> En 1 jour de formation, vous etes a l'aise avec le Webflow MCP. En 2 jours, vous maitrisez aussi HubSpot + Google Ads. En 3 jours, vous savez aussi sortir de Webflow vers Supabase Edge / Netlify."

**Source** : `docs/google-ads/04-mcp-google-ads.md` ligne 14 + `docs/hubspot/09-mcp-remote-server.md` (definitions MCP)

---

### Question 2 — "Et si on n'utilise pas HubSpot / Google Ads ?"

**Reponse** :
> "La methode est outil-agnostique. Le pipeline Documentation-First (enqueter -> cadrer -> capitaliser -> executer) marche peu importe les outils.
>
> Si vous utilisez :
> - **Pipedrive ou Salesforce** au lieu de HubSpot : on adapte les skills (`/connect-pipedrive-form`)
> - **TikTok Ads / LinkedIn Ads** au lieu de Meta : meme principe, MCP existent ou en cours
> - **Pas de HubSpot, juste un form Webflow Native** : skill `/setup-form-webflow-native`
>
> En formation, on capitalise les skills sur VOS outils — pas sur les outils generiques."

**Source** : `docs/methodologie-documentation-first/05-pattern-skills-recurrents.md` (14 skills agency type adaptables)

---

## D - Estimation effort total + priorisation

| Action | Section / Fichier | Priorite | Effort |
|---|---|---|---|
| Section MCPs (cf. 02) | Nouvelle section | **P0** | 2h |
| Section Skills (cf. 03) | Nouvelle section | **P0** | 2h |
| Section Aspirer DS (cf. 04) | Nouvelle section | **P0** | 1h |
| Refonte etude de cas We Invest (cf. 07) | Refonte existante | **P1** | 1.5h |
| Section Google Ads (cf. 06) | Nouvelle section | **P1** | 1h |
| Section Quand sortir de Webflow (cf. 05) | Nouvelle dans card 3j formats | **P1** | 45 min |
| Micro-correction 1 (Hero sub + visuel) | Hero | P1 | 45 min |
| Micro-correction 2 (Methode benefices) | Section "4 etapes" | P1 | 10 min |
| Micro-correction 3 (Cards formats lignes ajoutees) | Section formats | P1 | 15 min |
| Micro-correction 4 (CTA hero precision) | Hero | P2 | 5 min |
| Micro-correction 5 (DS Nopillo P0 corrections) | Globale | **P0** | 50 min |
| 2 nouvelles questions FAQ | FAQ | P2 | 15 min |

**Total P0** : 6h (MCPs + Skills + DS Nopillo + Aspirer DS)
**Total P0+P1** : ~9h
**Total P0+P1+P2** : ~10h

---

## E - Ordre d'execution recommande

### Sprint 1 — DS + sections demystification (P0, ~6h)

```
1. Micro-correction 5 (DS Nopillo P0 : Futura PT + Navbar + Headband + body color)
   -> 50 min — DOIT etre fait en premier (sinon les nouvelles sections seront aussi en Arial)

2. Section 02 (MCPs : 4 cartes demos) — 2h

3. Section 03 (Skills : 6 cartes before/after) — 2h

4. Section 04 (Aspirer DS Nopillo en 10 min) — 1h
```

### Sprint 2 — Storytelling + Google Ads (P1, ~3h)

```
5. Section 07 (Refonte We Invest storytelling) — 1.5h

6. Section 06 (Google Ads 3 leviers) — 1h

7. Section 05 (Quand sortir Webflow + decision matrix) — 45 min
```

### Sprint 3 — Polish (P1+P2, ~1.5h)

```
8. Micro-corrections 1-4 (Hero + Methode + Cards formats + CTA) — 1h

9. 2 questions FAQ ajoutees — 15 min

10. Validation finale : Lighthouse + screenshot mobile + clic CTAs + DevTools — 15 min
```

---

## F - Checklist validation post-implementation

Apres avoir applique les ameliorations, valider :

| Item | Methode | Cible |
|---|---|---|
| Score envie / 10 | Test utilisateur (5 decideurs Nopillo) | >= 8/10 |
| Lighthouse Performance Mobile | PageSpeed Insights | >=85 |
| LCP mobile | PageSpeed | < 2.5s |
| Mobile-first 375px | DevTools responsive | Pas de debordement, sticky CTA OK |
| Futura PT chargee | DevTools Network | Typekit script charge, pas de fallback Arial |
| Headband orange | Screenshot top page | Visible avant nav |
| Logo Nopillo navbar | Screenshot top page | Visible + linked vers nopillo.com |
| Tracking GA4 | DebugView | Events `page_view` + `scroll_50` + `cta_click` actifs |
| Form submit | Soumettre test | Contact cree dans HubSpot, GA4 + Pixel + CAPI dedupes |

---

## G - Specs Webflow MCP - sequence d'execution

Pour ajouter les 8 sections au site Webflow via MCP, sequence type :

```
1. webflow:de_page_tool : Switch active page (la page landing actuelle)

2. Pour chaque nouvelle section :
   a. webflow:element_builder : Create section element (structure)
   b. webflow:element_tool : Add headings (H2 + H3)
   c. webflow:element_tool : Add paragraphs (sub + body)
   d. webflow:element_tool : Add tables OR cards grids
   e. webflow:variable_tool : Apply Nopillo variables (couleurs, spacing, radius)
   f. webflow:style_tool : Apply class styles (.section-mcp, .card-mcp, etc.)
   g. webflow:de_component_tool : Reuse existing components (Header, Footer, CTA)

3. webflow:data_pages_tool : Update page settings (SEO description ajustee)

4. webflow:data_sites_tool : Publish site (staging webflow.io d'abord)

5. Validation manuelle : screenshot + clic CTAs + Lighthouse mobile
```

**Source** : `WEBFLOW-MCP.md` (18 categories) + `.claude/skills/landing-google-ads/SKILL.md` workflow.

---

## Sources

- `docs/audit-landing-vs-nopillo/_index.md` — corrections P0/P1 DS Nopillo
- `docs/cdc-landing-formation-nopillo/01-specs.md` — specs detaillees (cards formats, FAQ, sections)
- `docs/landing-page-best-practices/06-anti-patterns.md` — anti-patterns 3 (vague headline) et 4 (info below fold)
- `WEBFLOW-MCP.md` — sequence MCP type pour ajouter sections
- Docs sources de chaque nouvelle section (cf. fichiers 02 a 07)
