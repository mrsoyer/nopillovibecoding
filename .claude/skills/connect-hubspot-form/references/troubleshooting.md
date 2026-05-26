# Troubleshooting connect-hubspot-form

Erreurs courantes lors du wiring form HubSpot + Webflow + tracking GA4/Meta.

## 1. Le form ne s'affiche pas dans Webflow

| Symptome | Cause | Fix |
|---|---|---|
| Container `<div id="hubspot-form-...">` vide | Script loader pas charge | Verifier console : `window.hbspt` doit exister. Sinon, recharger script `js-eu1.hsforms.net/forms/embed/v2.js` |
| 404 sur loader script | Mauvaise region (eu1 vs na1) | URL admin HubSpot : `app-eu1.*` -> region `eu1`, sinon `na1` |
| Form charge mais blanc | `formId` invalide ou form unpublished | Marketing -> Forms -> verifier statut "Published" + copier formId UUID exact |
| Webflow strip le `<script>` | Custom Code dans un Embed visuel | Utiliser MCP `data_scripts_tool` (Custom Code Manager) au lieu d'un Embed |

## 2. CORS errors

| Symptome | Cause | Fix |
|---|---|---|
| `CORS blocked: api.hsforms.com` | Header custom envoye (Authorization, X-*) | Retirer tous les headers sauf `Content-Type: application/json` |
| `CORS blocked: api.hubapi.com` | Tentative CRUD direct depuis browser | Bypass impossible : passer par Edge Function avec Private App token |
| `CORS blocked: graph.facebook.com` | Appel CAPI cote client | CAPI = serveur uniquement (jamais browser) |
| OPTIONS preflight 405 | Methode CORS non supportee | Utiliser POST simple sans Authorization header (Forms API) |

## 3. Le contact n'apparait pas dans HubSpot

| Symptome | Cause | Fix |
|---|---|---|
| 200 OK mais pas dans Contacts | Email invalide / bounce immediat | Verifier dans Contacts -> filtre "All contacts" + recherche email exact |
| 400 Validation error | Field name incorrect | Comparer noms HubSpot internes (lowercase, snake_case) avec payload |
| 404 form not found | Wrong portalId/formId | Marketing -> Forms -> URL contient `/forms/edit/{formId}` |
| Field manquant dans payload | Field marque "required" cote HubSpot | Inclure le field meme vide ou retirer le required cote HubSpot |
| Custom property `fbclid` ignored | Property pas creee | Settings -> Properties -> Contact -> Create `fbclid` (string/text) |

## 4. Tracking - Double counting

| Symptome | Cause | Fix |
|---|---|---|
| Conversions x2 dans Meta | Pixel + CAPI sans dedup | Verifier `eventID` Pixel === `event_id` CAPI exact (case sensitive, no whitespace) |
| Conversions x2 dans GA4 | GA4 native + GA4 import dans Google Ads | Choisir une seule source : GA4 native pour bidding, import en "Secondary" |
| Lead compte 3 fois | onFormSubmit appele 3 fois | HubSpot embed peut fire onFormSubmit a `onFormReady` + `onFormSubmit` + `onFormSubmitted`. Utiliser SEUL `onFormSubmit` ou flag de garde |

### Fix dedup mismatch

```javascript
// MAUVAIS (uppercase vs lowercase)
fbq('track', 'Lead', {}, { eventID: 'ABC-123' });
// CAPI: event_id: 'abc-123'  -> mismatch

// BON
const eventId = crypto.randomUUID(); // ex: '550e8400-e29b-41d4-a716-446655440000'
fbq('track', 'Lead', {}, { eventID: eventId });
// CAPI: event_id: eventId
```

## 5. Tracking - Events n'arrivent pas

| Symptome | Cause | Fix |
|---|---|---|
| GA4 DebugView vide | DebugView pas active | Tag Assistant Chrome extension OU `?debug_mode=1` URL OU GTM Preview mode |
| Meta Test Events vide | Pas de `test_event_code` | Set `test_event_code` env var sur l'Edge Function |
| Pixel fire mais pas CAPI | Endpoint `/api/capi/lead` 4xx/5xx | Verifier logs serveur, token Meta valide, payload compliant Graph API v21.0 |
| CAPI 400 "Invalid parameter" | `fbp` ou `fbc` hashes par erreur | Envoyer en clair, retirer tout SHA-256 sur `fbp`/`fbc` |
| CAPI 401 Unauthorized | Token expire ou Pixel ID wrong | Events Manager -> CAPI -> Generate access token (system user, pas perso) |

## 6. EMQ score < 6.0

| Cause | Fix |
|---|---|
| Email seul envoye | Ajouter phone hashe + `external_id` (HubSpot contact ID si dispo) |
| `fbp`/`fbc` absents | Verifier que Pixel charge AVANT le form submit (sinon cookies pas set) |
| IP/UA absents cote serveur | Inclure `client_ip_address` + `client_user_agent` dans CAPI payload |
| `action_source` faux | "website" pour leads web, jamais "system_generated" |
| Pas de matching downstream | Quand contact passe MQL/SQL/Customer dans HubSpot -> CAPI event avec fbclid stocke |

## 7. fbclid manquant dans HubSpot

| Cause | Fix |
|---|---|
| Custom property `fbclid` pas creee | Settings -> Properties -> Contact -> Create `fbclid` (single-line text) |
| Field hidden pas dans le form HubSpot | Marketing -> Forms -> editer form -> ajouter field hidden `fbclid` |
| `onFormReady` ne pre-fill pas | Verifier nom exact du field input (case sensitive) |
| URL sans fbclid en test | Tester depuis vrai lien Meta Ads ou ajouter `?fbclid=test123` manuellement |

## 8. HubSpot Workflow ne se trigger pas

| Symptome | Cause | Fix |
|---|---|---|
| Pas d'email auto | Workflow inactif | Workflows -> verifier toggle "On" |
| Workflow trigger mais pas envoi CAPI downstream | Webhook step en "Waiting" | Verifier endpoint URL, secret signature SHA-256 |
| Lifecycle stage pas update | Property pas bien mappee | Form mapping -> verifier `lifecyclestage` mappe a "Lead" |

## 9. Webflow MCP errors

| Symptome | Cause | Fix |
|---|---|---|
| `mcp__webflow__data_scripts_tool` permission denied | OAuth Webflow expire | `/mcp` -> reauth `webflow` |
| Designer tools timeout | Bridge App pas lance | Webflow Designer -> touche `E` -> lancer "Webflow MCP Bridge App" + attendre point vert |
| Script applique mais pas visible sur live | Site pas publie | `mcp__webflow__data_sites_tool` action publish |
| Embed visuel limite a 10K char | Snippet trop long | Decouper en plusieurs scripts via `data_scripts_tool` |

## 10. Consent Mode V2 conflicts

| Symptome | Cause | Fix |
|---|---|---|
| Pixel ne fire jamais en EU | Consent Mode denied par defaut + pas update sur acceptance | Verifier CMP push `consent: 'update'` avec `ad_storage: 'granted'` |
| GA4 events disparaissent | Consent denied bloque tags (Basic mode) | Switch en Advanced Mode pour cookieless pings |
| CAPI fire mais Pixel non | Comportement attendu | OK : CAPI bypass consent, Pixel respecte. Dedup serveur-only fonctionne |

## 11. Validation finale

Si tout semble OK mais conversions pas attribuees apres 72h :

1. Events Manager -> Diagnostics : verifier coverage Lead = "Excellent"
2. EMQ Lead doit etre >= 7.5
3. Dedup rate doit etre >= 50% (Pixel + CAPI ensemble)
4. GA4 -> Reports -> Realtime : event `generate_lead` visible dans 5 sec
5. Google Ads -> Conversions -> Diagnostics : Tag status Active + Enhanced conversions Active
6. HubSpot -> Reports -> Source data : leads attribues a la bonne source UTM

## 12. Recovery rapide

Si tout casse en prod :

```
1. Désactiver le tracking script via Webflow MCP (data_scripts_tool delete)
2. Garder uniquement le HubSpot embed (forms continuent)
3. Re-publier site
4. Investiguer en staging
5. Re-injecter tracking quand fixe
```

Le form HubSpot continue de fonctionner sans le tracking. Les conversions seront enregistrees dans HubSpot mais pas attribuees Meta/Google.
