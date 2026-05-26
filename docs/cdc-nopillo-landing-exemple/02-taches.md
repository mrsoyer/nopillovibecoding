# 02 — Tâches, dépendances et waves d'exécution

## Table des matières

- [Vue d'ensemble](#vue-densemble)
- [Tableau complet des tâches](#tableau-complet-des-tâches)
- [Dépendances ASCII](#dépendances-ascii)
- [Waves d'exécution](#waves-dexécution)
- [Chemin critique](#chemin-critique)

---

## Vue d'ensemble

| Métrique | Valeur |
|----------|--------|
| Total tâches | 32 |
| Phases | 6 |
| Tâches parallélisables | 18 |
| Chemin critique | 8 tâches séquentielles |
| Effort estimé | 4h30 (dont 10 min automatisé) |

---

## Tableau complet des tâches

### Phase 0 — Bootstrap (init-landing-stack)

| ID | Tâche | Executeur | Dépend de | Livrable | Priorité |
|----|-------|-----------|-----------|----------|----------|
| 0.1 | Lancer `/init-landing-stack nopillo-landing-exemple lead-gen` | Skill `init-landing-stack` | — | Dossier projet créé, Astro installé, Supabase migré, Netlify déployé | P0 |
| 0.2 | Valider post-scaffold : `front/package.json` + `supabase/config.toml` + `netlify.toml` + deploy HTTP 200 | Skill `init-landing-stack` (phase 6) | 0.1 | Rapport verif + URL Netlify live | P0 |
| 0.3 | Récupérer les variables : `NETLIFY_URL`, `SB_URL`, `SB_ANON_KEY`, `SB_PROJECT_REF` | Manuel (rapport init-landing-stack) | 0.2 | `.env` rempli, variables notées | P0 |

### Phase 1 — Design System Nopillo → Tailwind

| ID | Tâche | Executeur | Dépend de | Livrable | Priorité |
|----|-------|-----------|-----------|----------|----------|
| 1.1 | Configurer tokens Tailwind 4 (@theme) : couleurs, typo Inter, spacing, radius | Claude Code direct | 0.2 | `front/src/styles/tokens.css` + `tailwind.config.mjs` mis à jour | P0 |
| 1.2 | Créer composants Astro de base : `Button.astro`, `Card.astro`, `Container.astro` | Claude Code direct | 1.1 | 3 composants dans `front/src/components/ui/` | P0 |
| 1.3 | Créer layout `Base.astro` : head (meta, fonts Inter, GTM snippet), nav minimaliste, footer | Claude Code direct | 1.1 | `front/src/layouts/Base.astro` | P0 |
| 1.4 | Vérification visuelle : `npm run dev` + screenshot `http://localhost:4321` | Manuel | 1.2 + 1.3 | Tokens visibles, page blanche propre | P1 |

### Phase 2 — Sections landing page

| ID | Tâche | Executeur | Dépend de | Livrable | Priorité |
|----|-------|-----------|-----------|----------|----------|
| 2.1 | Section S1 — Hero : layout 2 colonnes, H1 statique fallback, sous-titre, CTAs pill, bandeau réassurance, image WebP placeholder | Claude Code direct | 1.2 + 1.3 | `front/src/components/Hero.astro` | P0 |
| 2.2 | Section S2 — Bandeau confiance : logos SVG placeholders défilement horizontal | Claude Code direct | 1.2 | `front/src/components/TrustBand.astro` | P1 |
| 2.3 | Section S3 — Bloc problème/solution : 3 cards translucides, statique fallback `expert comptable LMNP` | Claude Code direct | 1.2 | `front/src/components/ProblemSolution.astro` | P0 |
| 2.4 | Section S4 — Simulateur fiscal (mocké) : 2 étapes slider + radio + résultat scripté | Claude Code direct | 1.2 | `front/src/components/Simulator.tsx` (React island) | P1 |
| 2.5 | Section S5 — Testimonials : 3 cards photo + nom + citation + stars | Claude Code direct | 1.2 | `front/src/components/Testimonials.astro` | P0 |
| 2.6 | Section S6 — Widget Trustpilot : TrustBox iframe lazy | Claude Code direct | 1.3 | `front/src/components/Trustpilot.astro` | P1 |
| 2.7 | Section S7 — Glossaire sémantique : 6 définitions LMNP, accordéon JS, Schema.org DefinedTerm | Claude Code direct | 1.2 | `front/src/components/Glossaire.astro` | P0 |
| 2.8 | Section S9 — FAQ : 6 Q&A, accordéon, Schema.org FAQPage | Claude Code direct | 1.2 | `front/src/components/FAQ.astro` | P0 |
| 2.9 | Assembler `front/src/pages/index.astro` : importer et ordonner les 9 sections | Claude Code direct | 2.1→2.8 | `index.astro` complet avec toutes les sections | P0 |

### Phase 3 — DKI (contenu dynamique par KW)

| ID | Tâche | Executeur | Dépend de | Livrable | Priorité |
|----|-------|-----------|-----------|----------|----------|
| 3.1 | Créer `DKIProvider.tsx` : lit URL params (`utm_term`, `searchterm`, `matchtype`, `device`, `gclid`), expose via Context | Claude Code direct | 0.2 | `front/src/components/DKIProvider.tsx` | P0 |
| 3.2 | Intégrer DKI dans Hero : `<h1>` remplacé si `{keyword}` présent, `client:load` | Claude Code direct | 3.1 + 2.1 | `Hero.tsx` hydraté avec DKI | P0 |
| 3.3 | Pré-remplir champs cachés formulaire depuis DKI context | Claude Code direct | 3.1 + 4.1 | Champs UTM auto-remplis au submit | P0 |

### Phase 4 — Formulaire + HubSpot + Supabase Edge Function

| ID | Tâche | Executeur | Dépend de | Livrable | Priorité |
|----|-------|-----------|-----------|----------|----------|
| 4.1 | Créer section S8 formulaire : 4 champs visibles + champs cachés + honeypot + RGPD mention | Claude Code direct | 1.2 | `front/src/components/ContactForm.tsx` | P0 |
| 4.2 | Étendre Edge Function `contact-form` : ajouter appel HubSpot Contacts API après insert Supabase | Skill `connect-hubspot-form` OU Claude Code direct | 0.2 | Edge Function déployée avec push HubSpot + variables secrets configurées |P0 |
| 4.3 | Configurer secrets Supabase : `HUBSPOT_API_KEY` + `HUBSPOT_PORTAL_ID` (via MCP ou dashboard) | Manuel + Claude Code direct | 4.2 | Secrets présents dans projet Supabase |P0 |

### Phase 5 — Tracking GA4 + Google Ads + GTM

| ID | Tâche | Executeur | Dépend de | Livrable | Priorité |
|----|-------|-----------|-----------|----------|----------|
| 5.1 | Intégrer GTM snippet dans `Base.astro` + Consent Mode v2 (denied par défaut) | Claude Code direct | 1.3 | GTM actif sur toutes les pages | P0 |
| 5.2 | Créer `useTracking.ts` hook : fonctions `trackCTAClick`, `trackSimulatorStart`, `trackSimulatorComplete`, `trackFormStart`, `trackFormSubmit`, `trackConversion` | Claude Code direct | 5.1 | `front/src/lib/tracking.ts` | P0 |
| 5.3 | Brancher tracking sur les composants : CTA (2.1), Simulateur (2.4), Formulaire (4.1) | Claude Code direct | 5.2 + 2.1 + 2.4 + 4.1 | Events GA4 fires sur interactions | P0 |
| 5.4 | Implémenter conversion Google Ads dans callback form_submit réussi | Claude Code direct | 5.2 + 4.1 | `gtag('event', 'conversion', {...})` après success EdgeFn | P0 |

### Phase 6 — Performance et validation

| ID | Tâche | Executeur | Dépend de | Livrable | Priorité |
|----|-------|-----------|-----------|----------|----------|
| 6.1 | Optimiser image hero : créer WebP placeholder < 200KB, `fetchpriority="high"`, width/height explicites | Claude Code direct | 2.1 | Image hero optimisée, LCP < 2s en dev |P0 |
| 6.2 | Déployer sur Netlify + test form submission en production | Skill `init-landing-stack` (phase 6) ou `netlify deploy --prod` | 4.2 + 5.4 | URL prod live, lead test créé dans Supabase + HubSpot | P0 |
| 6.3 | Valider checklist conversion : [07-conversion-checklist.md](../stack-landing-claude-code/07-conversion-checklist.md) + Lighthouse ≥ 95 + LCP < 2s + form submit OK | Manuel + Lighthouse CLI | 6.2 | Rapport validation avec scores | P0 |

---

## Dépendances ASCII

```
P0 : Bootstrap
 0.1 → 0.2 → 0.3
              │
              ├─────────────────────────────┐
              ▼                             ▼
P1 : DS Nopillo                     P4 : Formulaire
 1.1 → 1.2 → 1.3 → (1.4 manuel)     4.1 (dépend 1.2)
  │
  ├──────────────────────────────────────────────┐
  ▼                                              ▼
P2 : Sections (parallèles entre elles)    P5 : Tracking
 2.1  2.2  2.3  2.4  2.5  2.6  2.7  2.8    5.1 → 5.2 → 5.3 → 5.4
       └──────────────────────────────┘
                      │
                      ▼
                    2.9 (assemblage)
                      │
P3 : DKI              │
 3.1 → 3.2 → 3.3 ────┤
                      │
                      ▼
               4.2 → 4.3 (HubSpot EF)
                      │
                      ▼
P6 : Validation
 6.1 → 6.2 → 6.3
```

---

## Waves d'exécution

### Wave 0 — Bootstrap automatisé (10-12 min)

**Séquentiel** — init-landing-stack crée tout :
```
0.1 → 0.2 → 0.3
```

### Wave 1 — Design System (30 min)

**Séquentiel** — base nécessaire à tout le reste :
```
1.1 → 1.2 + 1.3 (parallèle)
```

### Wave 2 — Sections + DKI + Formulaire (parallèles, 2h)

**Toutes indépendantes entre elles** après Wave 1 :

```
Bloc A (sections contenu) :
  2.1 + 2.2 + 2.3 + 2.4 + 2.5 + 2.6 + 2.7 + 2.8

Bloc B (DKI provider) :
  3.1

Bloc C (formulaire) :
  4.1

Bloc D (tracking) :
  5.1 → 5.2
```

### Wave 3 — Assemblage + Intégrations (45 min)

**Séquentiel** — dépend de Wave 2 complète :
```
2.9 (assemblage index.astro)
  │
  ├── 3.2 + 3.3 (DKI dans Hero + Form)
  ├── 5.3 + 5.4 (tracking branché)
  └── 4.2 + 4.3 (Edge Function HubSpot)
```

### Wave 4 — Performance + Validation finale (30 min)

```
6.1 (image WebP) → 6.2 (deploy prod) → 6.3 (checklist + Lighthouse)
```

---

## Chemin critique

8 tâches séquentielles impossibles à paralléliser :

```
0.1 → 0.2 → 1.1 → 1.2 → 2.1 → 2.9 → 6.2 → 6.3
(Bootstrap) (DS) (Hero) (Assemblage) (Deploy) (Valide)
```

**Durée chemin critique** : ~2h30 (dont 10 min automatisé)

---

## Executeurs par type

| Type | Tâches | Count |
|------|--------|-------|
| Skill `init-landing-stack` | 0.1, 0.2, 6.2 | 3 |
| Skill `connect-hubspot-form` | 4.2 (optionnel) | 1 |
| Claude Code direct | 1.1→1.3, 2.1→2.9, 3.1→3.3, 4.1, 4.3, 5.1→5.4, 6.1 | 25 |
| Manuel | 0.3, 1.4, 4.3 (secrets), 6.3 | 4 |

> Note sur 4.2 : si le skill `connect-hubspot-form` existe et est fonctionnel, le déléguer. Sinon Claude Code implémente directement l'extension de l'Edge Function.
