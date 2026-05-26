# 02 - Section "Ce que font vraiment les MCPs"

> Section a AJOUTER. Position : APRES "4 etapes pour passer de prompt a landing publiee", AVANT "Choisissez le format".

---

## Pourquoi cette section est P0

Le mot **MCP** apparait 4 fois dans la landing actuelle, **jamais explique**. Le decideur Nopillo n'a aucune idee de ce que ca FAIT.

**Test** : si la landing actuelle s'arretait au mot "MCP", un decideur Nopillo continuerait-il sans cette section ? Reponse honnete : il scroll, il lit "automatises via le Model Context Protocol", il fronce les sourcils, et il quitte ou laisse tomber.

Cette section repond a UNE seule question : **"Concretement, quand je dis a Claude 'fais ca' avec MCP, ca fait quoi ?"**

---

## Headline + sub propose

```
H2 : "Le MCP, en pratique : 4 outils, 4 demos"
Sub : "Au lieu d'ouvrir 4 dashboards, vous parlez a Claude en francais. Voici ce que ca donne sur les 4 plateformes que Nopillo utilise tous les jours."
```

---

## Format : 4 cartes demos

Chaque carte = 1 MCP avec :
- Icone / logo
- Titre
- Question en langage naturel (en italique, comme un prompt)
- Ce que ca fait (verbe d'action + output concret)
- Le gain temps mesure (avant/apres en chiffre)

### Carte 1 — Webflow MCP

```
[Icone Webflow]
                                                                      
Webflow MCP                                                           
                                                                      
"Cree-moi une landing recrutement immobilier avec hero, 3 sections    
benefices, social proof, FAQ et form HubSpot."                        
                                                                      
-> Genere automatiquement la page Webflow complete : sections,        
   composants, styles, breakpoints mobile, slug SEO.                  
                                                                      
   18 categories d'outils dispo : Sites, Pages, CMS, Components,      
   Assets, Variables, Scripts, Webhooks...                            
                                                                      
Avant : 8-15h en Designer Webflow                                     
Apres : 30 min via prompts + verifications                            
```

**Source citation** : `WEBFLOW-MCP.md` ligne 3 :

> "Le MCP Webflow expose **18 categories d'outils** repartis en deux familles : Data API (CMS, pages, assets, scripts) et Designer API (canvas, elements, styles, variables, creation de pages)."

Et ligne 95-96 (exemple prompt CMS) :

> "Cree 10 articles de blog dans la collection `Blog Posts` a partir du fichier `articles.json`, puis publie-les"

**Mockup texte de l'output** (a inclure visuellement sur la carte) :

```
[Webflow Designer]
> Page creee : /lp-recrutement-immo-2026
> Sections inserees : Hero, Benefices x3, Social proof, FAQ, Form
> Components reutilises : Header, Footer, Card-benefice, Form-HubSpot
> Variables appliquees : palette indigo Nopillo (88 tokens)
> Mobile breakpoint : valide a 375px
> Status : draft (publication manuelle apres revue visuelle)
```

---

### Carte 2 — HubSpot MCP

```
[Icone HubSpot]
                                                                      
HubSpot MCP                                                           
                                                                      
"Liste les deals fermes ce mois-ci dans le pipeline 'Enterprise'      
et donne-moi le total + le top 3 par montant."                        
                                                                      
-> Recupere les deals via HubSpot CRM API, calcule, affiche.          
                                                                      
   13 outils dispo : search_crm_objects, manage_crm_objects,          
   get_campaign_analytics, search_owners...                           
                                                                      
Avant : 20 min entre HubSpot et tableur Google Sheet                  
Apres : 15 secondes en chat                                           
```

**Source citation** : `docs/hubspot/09-mcp-remote-server.md` ligne 53-92 :

> "Le serveur expose ~13 tools repartis en 3 familles : CRM Objects (search/get/manage), Properties & Schemas (search/get_properties), Campaigns (get_campaign_analytics, get_campaign_asset_metrics, get_campaign_contacts_by_type), Owners (search_owners), Organisation."

**Cas d'usage Nopillo concret** : connecter un form HubSpot a une page Webflow + tracking GA4/Meta dedupe :

Cf. `.claude/skills/connect-hubspot-form/SKILL.md` ligne 12 :

> "L'utilisateur demande 'connecter form HubSpot Webflow', 'embed HubSpot tracking', 'ajouter form HubSpot avec GA4 et Meta Pixel', 'tracking conversion lead form'..."

**Mockup output** :

```
[Chat Claude Code]
> Pipeline 'Enterprise' identifie (HubSpot ID 0-3, stage 'closedwon')
> 12 deals fermes en mai 2026
> Total : 187 450 EUR
> Top 3 :
>   1. Mandarine SARL  - 38 000 EUR (closed 2026-05-12)
>   2. Atrium Group    - 32 500 EUR (closed 2026-05-04)
>   3. We Invest FR    - 28 900 EUR (closed 2026-05-19)
```

---

### Carte 3 — Google Ads MCP

```
[Icone Google Ads]
                                                                      
Google Ads MCP                                                        
                                                                      
"Quelles sont mes 5 campagnes les plus rentables ce trimestre,        
et quels keywords gaspillent le plus de budget ?"                     
                                                                      
-> Pulse les metrics via GAQL (Google Ads Query Language),            
   calcule ROAS automatiquement, genere recommandations.              
                                                                      
   Tools : list_accessible_customers, search (GAQL),                  
   get_resource_metadata + (selon impl) get_campaign_performance.     
                                                                      
Avant : 1h dans Google Ads UI + Excel                                 
Apres : 30 secondes, output Markdown ou CSV                           
```

**Source citation** : `docs/google-ads/04-mcp-google-ads.md` ligne 14-22 :

> "Le **Model Context Protocol (MCP)** permet a Claude (et autres LLMs) d'interagir avec Google Ads en **langage naturel**. Au lieu de naviguer dans les dashboards ou ecrire du code GAQL, tu poses des questions a Claude qui execute les outils MCP.
>
> **Capacites typiques** :
> - Lister les comptes Google Ads accessibles
> - Analyser performance de campagnes / ad groups / keywords
> - Executer des requetes GAQL personnalisees
> - Generer des rapports CSV/JSON"

**Mockup output** :

```
[Chat Claude Code]
> 5 campagnes Q1 2026 par ROAS :
>   1. Search-Recrutement-Mandataires : ROAS 6.4x  (CPA 38 EUR)
>   2. PMax-Lead-Gen-B2B              : ROAS 5.1x  (CPA 52 EUR)
>   3. Search-LMNP-Diagnostic         : ROAS 4.8x  (CPA 41 EUR)
>   4. Display-Remarketing            : ROAS 3.2x  (CPA 67 EUR)
>   5. PMax-Brand-Awareness           : ROAS 1.8x  (CPA 134 EUR)
>
> Top 3 keywords gaspilleurs (cost > 200 EUR, conv = 0) :
>   - "logiciel comptable lmnp"   - 487 EUR  / 0 conv
>   - "comment declarer lmnp"     - 312 EUR  / 0 conv
>   - "investir immobilier paris" - 298 EUR  / 0 conv
>
> Recommandation : ajouter en negatives + revoir intent match.
```

---

### Carte 4 — Meta Ads MCP

```
[Icone Meta]
                                                                      
Meta Ads MCP (officiel Avril 2026)                                    
                                                                      
"Cree une variante de cette landing pour la pub Reels qui a le        
hook 'tu paies trop d'impots LMNP ?' — adapte format vertical 9:16,   
hook < 1.7s, lead form 4 champs."                                     
                                                                      
-> Adapte la landing : viewport mobile-first, hero compact, form      
   3-5 champs, Pixel + CAPI dedupes par event_id.                     
                                                                      
   Decision Lead Form natif vs Landing externe assistee.              
                                                                      
Avant : 4h adapter + 1h debug Pixel/CAPI                              
Apres : 45 min                                                        
```

**Source citation** : `docs/meta-ads-mcp/_index.md` ligne 26-32 :

> "Le MCP officiel Meta (sortie 29 avril 2026) supprime le besoin d'App Review et de developer app : c'est la voie standard pour Nopillo en 2026."

Et `.claude/skills/landing-meta-ads/SKILL.md` ligne 19-26 :

> "**Mobile-first 9:16 oriented** : 83% trafic mobile, design pense pour vertical viewport en main
> **Hook < 1.7s** : H1 + visuel above-the-fold qui matche le creative ad (message-match strict)
> **Form court 3-5 champs** OU **Meta Lead Form natif**
> **Pixel + CAPI dedupes** via `event_id` (UUID v4 partage), EMQ cible 8+"

**Mockup output** :

```
[Webflow Designer]
> Page creee : /lp-meta-lmnp-reels-2026
> Variante mobile-first 9:16 : viewport 375x812
> Hero compact : H1 8 mots, visuel hook 1.4s loaded
> Form : 4 champs (Email, Tel, Code postal, Bien LMNP oui/non)
> Pixel : event Lead avec event_id UUID v4 + fbclid capture
> CAPI : webhook configure (Make.com), EMQ initial 8.2
> A/B test : variante Lead Form natif Meta cree en parallele
```

---

## Comparatif rapide en bonus

A ajouter sous les 4 cartes (tableau resume) :

| MCP | Outils dispo | Cas d'usage Nopillo | ROI temps |
|---|---|---|---|
| Webflow | 18 categories | Production landings, CMS, scripts tracking | 8-15h -> 30min |
| HubSpot | 13 tools | Forms, contacts, lifecycle, reports campagnes | 20min -> 15s par requete |
| Google Ads | 3-15 (selon impl.) | Reports campagnes, GAQL, optim keywords | 1h -> 30s |
| Meta Ads | Pipeboard 29-31 / Officiel | Lead Forms, Pixel + CAPI dedupes, Reels | 4h -> 45min |

---

## Pourquoi cette section convertit

1. **Demystifie le mot "MCP"** en montrant 4 fois ce que ca fait
2. **Parle en francais** comme le decideur — exemples de prompts qu'il pourrait reellement taper
3. **Montre l'output** sous forme de mockups texte (proxy visuel pour decideur)
4. **Chiffres sur les gains** (avant/apres) pour le decideur ROI
5. **Logos reconnus** (Webflow, HubSpot, Google Ads, Meta) = trust signal
6. **Apres formation, l'equipe sait l'utiliser** = lien implicite vers la formation

---

## CTA fin de section

```
"Decouvrir comment maitriser ces 4 MCPs en 1 a 3 jours"
-> ancre vers section formats
```

---

## Specs Webflow MCP (pour generer la section)

```
Tool : webflow:de_page_tool (Switch active page)
Tool : webflow:element_tool (Create section "section-mcp-demo")
Tool : webflow:element_tool (Create grid 2x2 mobile-stack)
Tool : webflow:element_tool x4 (Create card MCP)
Tool : webflow:style_tool (Apply card translucide #DEDAFF border)
Tool : webflow:variable_tool (Use indigo-600 #4033DB pour titres)

Container 1120px, gap 24px desktop, gap 16px mobile,
Cards : background rgba(255,255,255,0.3), border 1px #DEDAFF,
       shadow 0 1px 10px rgba(0,0,0,0.06), radius 16px,
       padding 32px desktop / 24px mobile
H3 carte : Futura PT 600, 24px, color #09090B
Sub italic prompt : Splinesans, 16px, color #404968
Output mockup : background #09090B, color #DEDAFF, font-family monospace,
                radius 8px, padding 16px
```

---

## Sources

- `WEBFLOW-MCP.md` — 18 categories d'outils Webflow MCP
- `docs/hubspot/09-mcp-remote-server.md` — 13 tools HubSpot MCP
- `docs/google-ads/04-mcp-google-ads.md` — MCP Google Ads + GAQL
- `docs/meta-ads-mcp/_index.md` + `06-setup-claude-code.md` — Meta Ads MCP officiel
- `.claude/skills/connect-hubspot-form/SKILL.md` — cas d'usage form HubSpot
- `.claude/skills/landing-meta-ads/SKILL.md` — cas d'usage landing Meta Ads
