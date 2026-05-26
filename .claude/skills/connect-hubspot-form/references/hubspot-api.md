# Mode Custom Form (API directe HubSpot)

Alternative au snippet embed quand le design HubSpot n'est pas acceptable. Le form est entierement Webflow, on POST directement vers HubSpot Forms Submissions API.

## Quand l'utiliser

| Critere | Embed | Custom |
|---|---|---|
| Design HubSpot OK | OK | inutile |
| Branding strict, anim custom | non | OK |
| Validation custom (regex, async) | limite | OK |
| Pas de jQuery / dependence script externe | non | OK |
| Workflow HubSpot natif (notifications email, lifecycle) | OK | OK (form-side) |
| Fields dynamiques conditionnels Webflow | non | OK |

Custom = +1 jour de dev, +1 risque CORS, +1 maintenance. **Default = embed**.

## Endpoint Forms API

```
POST https://api.hsforms.com/submissions/v3/integration/submit/{portalId}/{formId}
Content-Type: application/json
```

PAS d'auth necessaire pour ce endpoint. Le `formId` doit exister dans HubSpot et avoir les fields cibles.

## Payload

```json
{
  "submittedAt": "1714900000000",
  "fields": [
    { "objectTypeId": "0-1", "name": "email",     "value": "jane@example.com" },
    { "objectTypeId": "0-1", "name": "firstname", "value": "Jane" },
    { "objectTypeId": "0-1", "name": "lastname",  "value": "Doe" },
    { "objectTypeId": "0-1", "name": "phone",     "value": "+33612345678" },
    { "objectTypeId": "0-1", "name": "fbclid",    "value": "IwAR..." },
    { "objectTypeId": "0-1", "name": "gclid",     "value": "Cj0KCQ..." }
  ],
  "context": {
    "hutk": "<cookie hubspotutk>",
    "pageUri": "https://site.com/contact",
    "pageName": "Contact"
  },
  "legalConsentOptions": {
    "consent": {
      "consentToProcess": true,
      "text": "I agree to allow Example Co to store and process my personal data.",
      "communications": [
        {
          "value": true,
          "subscriptionTypeId": 999,
          "text": "I agree to receive marketing communications from Example Co."
        }
      ]
    }
  }
}
```

`objectTypeId: "0-1"` = contact. Pour custom object, mettre l'objectTypeId correspondant.

## hubspotutk cookie

Le cookie `hubspotutk` est set par le tracking script HubSpot. Il permet d'attribuer la submission au visitor (analytics + workflows).

```javascript
function getHubspotutk() {
  return document.cookie.split('; ')
    .find(c => c.startsWith('hubspotutk='))?.split('=')[1] || '';
}
```

Inclure le tracking HubSpot site-wide pour qu'il soit dispo :

```html
<!-- Hub Tracking script (a registrer une fois via Webflow MCP data_scripts_tool) -->
<script async defer src="//js-eu1.hs-scripts.com/{{PORTAL_ID}}.js"></script>
```

## Implementation Webflow (custom form)

### HTML form (Webflow Designer)

Construire un form Webflow standard, ajouter les fields email/firstname/etc, intercepter le submit :

```javascript
document.querySelector('form[data-hs-custom]').addEventListener('submit', async (e) => {
  e.preventDefault();

  const fd = new FormData(e.target);
  const eventId = crypto.randomUUID();

  const payload = {
    submittedAt: Date.now().toString(),
    fields: [
      { objectTypeId: '0-1', name: 'email',     value: fd.get('email') },
      { objectTypeId: '0-1', name: 'firstname', value: fd.get('firstname') },
      { objectTypeId: '0-1', name: 'lastname',  value: fd.get('lastname') },
      { objectTypeId: '0-1', name: 'phone',     value: fd.get('phone') },
      { objectTypeId: '0-1', name: 'fbclid',    value: new URLSearchParams(location.search).get('fbclid') || '' },
      { objectTypeId: '0-1', name: 'gclid',     value: new URLSearchParams(location.search).get('gclid') || '' }
    ],
    context: {
      hutk: (document.cookie.split('; ').find(c => c.startsWith('hubspotutk='))?.split('=')[1]) || '',
      pageUri: location.href,
      pageName: document.title
    },
    legalConsentOptions: {
      consent: {
        consentToProcess: true,
        text: 'I agree to allow {{COMPANY}} to store and process my personal data.'
      }
    }
  };

  try {
    const res = await fetch(
      `https://api.hsforms.com/submissions/v3/integration/submit/{{PORTAL_ID}}/{{FORM_ID}}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      }
    );
    if (!res.ok) throw new Error('HubSpot ' + res.status);

    // Tracking dedup (cf. references/tracking-events.md)
    window.dataLayer.push({ event: 'generate_lead', event_id: eventId, /* ... */ });
    if (window.fbq) fbq('track', 'Lead', { /* ... */ }, { eventID: eventId });
    fetch('/api/capi/lead', { method: 'POST', body: JSON.stringify({ event_id: eventId, ...Object.fromEntries(fd) }) });

    // UI confirmation Webflow native
    e.target.style.display = 'none';
    document.querySelector('.w-form-done').style.display = 'block';
  } catch (err) {
    console.error(err);
    document.querySelector('.w-form-fail').style.display = 'block';
  }
});
```

## Alternative : Private App + Contacts CRUD direct

Si on veut bypasser l'API Forms (et perdre les workflows form-side : notifs email, double opt-in, etc.), on peut creer le contact directement via la CRM API. Necessite une **Private App token** cote serveur (jamais cote client).

```
POST /crm/v3/objects/contacts
Authorization: Bearer pat-na1-xxxxxxxxxxxxxxxxxxxxxxxx
Content-Type: application/json

{
  "properties": {
    "email": "jane@example.com",
    "firstname": "Jane",
    "lastname": "Doe",
    "phone": "+33612345678",
    "fbclid": "IwAR...",
    "gclid": "Cj0KCQ...",
    "lifecyclestage": "lead"
  }
}
```

Pour upsert (eviter les doublons) :

```
POST /crm/v3/objects/contacts/batch/upsert
{
  "inputs": [{
    "id": "jane@example.com",
    "idProperty": "email",
    "properties": { "firstname": "Jane", "phone": "+33612345678", "lifecyclestage": "lead" }
  }]
}
```

**Quand utiliser CRUD direct vs Forms API** :

| Critere | Forms API | CRM CRUD |
|---|---|---|
| Workflows HubSpot (notifs email, double opt-in) | OK auto | a recreer via workflows trigger property change |
| Auth | aucune | Private App token (server-only) |
| Endpoint | `api.hsforms.com` | `api.hubapi.com` |
| Doublons | merge automatique sur email | risque sauf upsert |
| Rate limit | tres permissif | 100 req/10s par token |
| Custom properties | doivent exister | doivent exister |

Recommandation par defaut : **Forms API** (plus simple, workflows natifs).

## Custom properties HubSpot a creer

Avant tout, creer ces properties dans HubSpot (Settings -> Properties -> Contact properties) :

| Property | Type | Field type | Pourquoi |
|---|---|---|---|
| `fbclid` | string | text | Capturer Meta click ID pour CAPI downstream |
| `gclid` | string | text | Capturer Google click ID pour Enhanced Conversions for Leads |
| `utm_source` | string | text | Attribution analytics |
| `utm_medium` | string | text | Attribution analytics |
| `utm_campaign` | string | text | Attribution analytics |
| `event_id_lead` | string | text | Trace le UUID du lead initial pour audit |

## CORS

L'API `api.hsforms.com` autorise les POST cross-origin depuis n'importe quel domaine (pas de pre-flight bloquant pour `Content-Type: application/json`). Si erreur CORS : verifier qu'on n'envoie PAS de header custom (Authorization, X-*).

L'API `api.hubapi.com` (CRM) BLOQUE les requetes browser : DOIT passer par un Edge Function ou backend proxy (Authorization header requis).

## Sources

- HubSpot Forms Submissions API : <https://legacydocs.hubspot.com/docs/methods/forms/submit_form_v3>
- HubSpot CRM Contacts API : voir `docs/hubspot/04-api-crm.md`
- HubSpot Auth (Private Apps) : voir `docs/hubspot/03-api-authentication.md`
