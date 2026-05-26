# Tracking Events GA4 + Meta Pixel + CAPI dedupliques

Reference des events a fire au moment du form HubSpot submit, avec dedup `event_id` partage Pixel/CAPI et Enhanced Conversions GA4.

## Architecture event_id

```
[Browser]
  Form submit
    -> generate event_id (UUID v4)
    -> dataLayer.push (GA4 generate_lead + user_data)
    -> fbq('track', 'Lead', {...}, { eventID: event_id })
    -> POST /api/capi/lead { event_id, email, ... }
                                |
                                v
                         [Server (Edge Function)]
                                |
                                v
                       Meta Graph API CAPI
                       event_id partage -> Meta dedup 48h
```

## 1. GA4 — Enhanced Conversions

### Event de base

```javascript
dataLayer.push({
  event: 'generate_lead',
  event_id: eventId, // partage Pixel/CAPI
  user_data: {
    email: 'jane@example.com',          // raw, GTM hash SHA-256
    phone_number: '+33612345678',       // E.164
    address: {
      first_name: 'Jane',
      last_name: 'Doe'
    }
  },
  form_id: '{{FORM_ID}}',
  form_name: 'HubSpot Contact'
});
```

### GTM config

1. Tag : "Google Analytics: GA4 Event"
2. Configuration tag : ton GA4 config tag
3. Event name : `generate_lead`
4. User-provided data section :
   - email -> `{{DLV - user_data.email}}`
   - phone_number -> `{{DLV - user_data.phone_number}}`
   - address.first_name -> `{{DLV - user_data.address.first_name}}`
   - address.last_name -> `{{DLV - user_data.address.last_name}}`
5. Trigger : Custom Event = `generate_lead`
6. GTM hash en SHA-256 automatique avant envoi.

### Marquer comme conversion

GA4 -> Admin -> Events -> `generate_lead` -> toggle "Mark as conversion".

## 2. Meta Pixel — Client-side

### Snippet base (HEAD du site)

```html
<script>
!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){
n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];
t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window,document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '{{PIXEL_ID}}');
fbq('track', 'PageView');
</script>
```

### Lead event avec eventID

```javascript
fbq('track', 'Lead', {
  content_name: 'HubSpot Form',
  content_category: 'lead-gen',
  currency: 'EUR',
  value: 0
}, {
  eventID: eventId // CRITIQUE pour dedup avec CAPI
});
```

## 3. Meta CAPI — Server-side

### Endpoint Edge Function (template)

`/api/capi/lead` (Vercel, Cloudflare Worker, Supabase Edge Function) :

```typescript
import crypto from 'node:crypto';

const PIXEL_ID = process.env.META_PIXEL_ID!;
const CAPI_TOKEN = process.env.META_CAPI_ACCESS_TOKEN!;
const TEST_CODE = process.env.META_TEST_EVENT_CODE; // optionnel, debug

const sha256 = (s: string) =>
  crypto.createHash('sha256').update(s.trim().toLowerCase()).digest('hex');

export async function POST(req: Request) {
  const body = await req.json();
  const { event_id, email, phone, firstname, lastname, event_source_url, click_ids } = body;

  // Cookies fbp/fbc cote browser -> a passer dans le POST initial.
  // Si pas dispo cote serveur, le client doit les inclure.
  const fbp = req.headers.get('x-fbp') || body.fbp;
  const fbc = req.headers.get('x-fbc') || body.fbc;

  const ua = req.headers.get('user-agent') || '';
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim()
          || req.headers.get('cf-connecting-ip')
          || '';

  const phoneE164 = (phone || '').replace(/[^\d]/g, ''); // sans +

  const payload = {
    data: [{
      event_name: 'Lead',
      event_time: Math.floor(Date.now() / 1000),
      event_id, // SAME comme Pixel client
      action_source: 'website',
      event_source_url,
      user_data: {
        em: email ? sha256(email) : undefined,
        ph: phoneE164 ? sha256(phoneE164) : undefined,
        fn: firstname ? sha256(firstname) : undefined,
        ln: lastname ? sha256(lastname) : undefined,
        fbp,                       // JAMAIS hashe
        fbc,                       // JAMAIS hashe
        client_ip_address: ip,
        client_user_agent: ua
      },
      custom_data: {
        currency: 'EUR',
        value: 0,
        content_name: 'HubSpot Form',
        ...(click_ids?.gclid ? { gclid: click_ids.gclid } : {}),
        ...(click_ids?.utm_source ? { utm_source: click_ids.utm_source } : {})
      }
    }],
    ...(TEST_CODE ? { test_event_code: TEST_CODE } : {})
  };

  const res = await fetch(
    `https://graph.facebook.com/v21.0/${PIXEL_ID}/events?access_token=${CAPI_TOKEN}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    }
  );

  return Response.json(await res.json(), { status: res.status });
}
```

### fbp / fbc cote browser

Les cookies `_fbp` et `_fbc` sont set par le Pixel. Les recuperer cote client AVANT le fetch :

```javascript
function getCookie(name) {
  return document.cookie.split('; ')
    .find(c => c.startsWith(name + '='))?.split('=')[1] || '';
}
const fbp = getCookie('_fbp');
const fbc = getCookie('_fbc'); // rempli si fbclid present dans URL
// ... ajouter fbp/fbc au body du fetch /api/capi/lead
```

## 4. Hashing rules (recap)

| Param | Hash ? | Format |
|---|---|---|
| `em` (email) | SHA-256 | lowercase, trimmed |
| `ph` (phone) | SHA-256 | E.164 sans `+` (ex: `33612345678`) |
| `fn`/`ln` | SHA-256 | lowercase, trimmed |
| `external_id` | SHA-256 | string user id |
| **`fbp`** | **JAMAIS** | `fb.1.<timestamp>.<random>` |
| **`fbc`** | **JAMAIS** | `fb.1.<timestamp>.<fbclid>` |
| `client_ip_address` | jamais | brut |
| `client_user_agent` | jamais | brut |

## 5. Test deduplication

1. Ouvrir Meta Events Manager -> Pixel -> **Test Events** tab.
2. Recuperer le `test_event_code` (`TEST12345`).
3. Set la variable d'env `META_TEST_EVENT_CODE=TEST12345`.
4. Soumettre form sur la page Webflow live.
5. Verifier dans Test Events :
   - Source : "Browser" + "Server" pour le **meme** `event_id`.
   - Status : "Deduplicated" (badge gris).
6. Si "Not deduplicated" : event_id different cote Pixel vs CAPI -> verifier le partage.

## 6. EMQ cible

Lead form : EMQ >= 7.5. Verifier dans Events Manager -> Diagnostics apres 48h.

Levers :
- Envoyer email ET phone hashes (pas que email).
- fbp + fbc presents (depend du Pixel charge avant submit).
- IP + UA cote serveur.
- Pousser external_id (HubSpot contact ID si dispo apres creation).

## 7. HubSpot Workflow downstream (CRM-side)

Pour envoyer des CAPI events sur les transitions de stage (MQL -> SQL -> Customer), creer un workflow HubSpot qui call l'Edge Function avec l'`event_name` approprie (`Purchase`, `CompleteRegistration`, `SubmitApplication`) ET le `fbclid` stocke dans la custom property.
