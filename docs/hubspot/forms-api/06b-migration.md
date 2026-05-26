# 06b — Migration vers HubSpot Forms Submissions API

> Plan de migration concret pour passer le projet `nopillo-landing-exemple` de l'API Contacts CRM vers la Forms Submissions API. Complement de [06-analyse-form-projet.md](06-analyse-form-projet.md).

## Architecture cible

```
ContactForm.tsx (browser)
    │  POST /functions/v1/contact-form (avec hutk capture)
    ▼
Edge Function (validation + honeypot + dedup)
    │
    ├─ INSERT public.leads (Supabase, source of truth)
    │
    └─ POST submissions/v3/integration/submit/{portalId}/{formGuid}
              │
              └─ HubSpot declenche automatiquement :
                   - Workflow notification proprio (email)
                   - Workflow drip email confirmation lead
                   - Lead scoring (formula HubSpot)
                   - Offline Conversion vers Google Ads (si gclid)
```

## Variables d'env a ajouter

```bash
# Required
supabase secrets set HUBSPOT_PORTAL_ID=12345678 \
  --project-ref kamazblxybkukpkvznkv

supabase secrets set HUBSPOT_FORM_ID=d9afc0c5-... \
  --project-ref kamazblxybkukpkvznkv

# Optional (pour endpoint secure si volume > 50 req/10s par IP)
supabase secrets set HUBSPOT_API_KEY=pat-na1-... \
  --project-ref kamazblxybkukpkvznkv
```

## Form HubSpot a creer (cote UI)

Dans HubSpot UI :

1. **Marketing → Forms → Create form**
2. Type : **Non-HubSpot form** (form embedded for API submission)
3. Nom : `Landing Nopillo - Expert comptable LMNP`
4. Champs visibles a ajouter :

| Field name | Field type | Required |
|------------|------------|----------|
| `email` | Single-line text (email) | Oui |
| `firstname` | Single-line text | Non |
| `lastname` | Single-line text | Non |
| `phone` | Single-line text (phone) | Non |
| `message` | Multi-line text | Non |

5. Hidden fields a ajouter :

| Field name | Type | Source |
|------------|------|--------|
| `utm_source` | Single-line text | URL param |
| `utm_campaign` | Single-line text | URL param |
| `utm_medium` | Single-line text | URL param |
| `utm_term` | Single-line text | URL param (= KW Google Ads) |
| `utm_content` | Single-line text | URL param (= creative) |
| `gclid` | Single-line text | URL param |
| `search_term` | Single-line text | URL param |
| `match_type` | Single-line text | URL param |
| `device` | Single-line text | URL param |
| `landing_page_url` | URL | window.location.href |

6. Configuration :
   - **Language** : `fr`
   - **createNewContactForNewEmail** : `false` (dedup par email)
   - **postSubmitAction** : `thank_you_message` ou `redirect_url`
   - **lifecycleStage** : `lead`
   - **notifyContactOwner** : `true`

7. Workflows a attacher (cote HubSpot UI → Workflows → Create) :
   - **Notification commercial** : email a l'equipe sales sur submit
   - **Email de confirmation** : envoi automatique au lead sous 5 min
   - **Lead scoring** : +20 points sur form submit + variable par UTM source
   - **Google Ads conversion import** : si `gclid` non vide → envoi vers Ads

8. Une fois le form cree, recuperer le `formId` :

```bash
curl -H "Authorization: Bearer $HUBSPOT_TOKEN" \
  "https://api.hubapi.com/marketing/v3/forms?limit=10" \
  | jq '.results[] | select(.name | contains("Nopillo")) | {id, name}'
```

## Modifications code

### 1. `Base.astro` : embed tracking snippet

Ajouter avant la fermeture du `</head>` :

```astro
<!-- HubSpot tracking code (pose le cookie hubspotutk) -->
<script
  type="text/javascript"
  id="hs-script-loader"
  async
  defer
  src={`https://js.hs-scripts.com/${import.meta.env.PUBLIC_HUBSPOT_PORTAL_ID}.js`}
></script>
```

### 2. `ContactForm.tsx` : capturer hutk

```tsx
function getCookie(name: string): string | null {
  const value = '; ' + document.cookie
  const parts = value.split('; ' + name + '=')
  if (parts.length === 2) return parts.pop()?.split(';').shift() ?? null
  return null
}

// Dans onSubmit
const payload = {
  // ...champs existants
  hutk: getCookie('hubspotutk'),
}
```

### 3. Edge Function `contact-form/index.ts` : remplacer pushToHubSpot

```ts
async function submitToHubSpotForm(lead: Record<string, unknown>): Promise<boolean> {
  const portalId = Deno.env.get('HUBSPOT_PORTAL_ID')
  const formId = Deno.env.get('HUBSPOT_FORM_ID')
  if (!portalId || !formId) {
    console.log('HubSpot env not configured, skipping submission')
    return false
  }

  const [firstname, ...rest] = (lead.name as string ?? '').split(' ')
  const lastname = rest.join(' ')

  const url = `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formId}`

  const fields = [
    { objectTypeId: '0-1', name: 'email',          value: lead.email },
    { objectTypeId: '0-1', name: 'firstname',      value: firstname },
    { objectTypeId: '0-1', name: 'lastname',       value: lastname },
    { objectTypeId: '0-1', name: 'phone',          value: lead.phone ?? '' },
    { objectTypeId: '0-1', name: 'message',        value: lead.message ?? '' },
    { objectTypeId: '0-1', name: 'utm_source',     value: lead.utm_source ?? '' },
    { objectTypeId: '0-1', name: 'utm_campaign',   value: lead.utm_campaign ?? '' },
    { objectTypeId: '0-1', name: 'utm_term',       value: lead.utm_term ?? '' },
    { objectTypeId: '0-1', name: 'utm_content',    value: lead.utm_content ?? '' },
    { objectTypeId: '0-1', name: 'gclid',          value: lead.gclid ?? '' },
    { objectTypeId: '0-1', name: 'search_term',    value: lead.search_term ?? '' },
    { objectTypeId: '0-1', name: 'match_type',     value: lead.match_type ?? '' },
    { objectTypeId: '0-1', name: 'device',         value: lead.device ?? '' },
    { objectTypeId: '0-1', name: 'landing_page_url', value: lead.landing_page_url ?? '' },
  ]

  const body = {
    submittedAt: Date.now(),
    fields,
    context: {
      hutk: lead.hutk as string ?? null,
      pageUri: lead.landing_page_url as string ?? null,
      pageName: 'Landing Nopillo - Expert comptable LMNP',
    },
    legalConsentOptions: {
      consent: {
        consentToProcess: true,
        text: "J'accepte que Nopillo traite mes donnees conformement a sa politique de confidentialite.",
      },
    },
  }

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    if (!res.ok) {
      console.error('HubSpot Form submit failed:', res.status, await res.text())
      return false
    }
    return true
  } catch (err) {
    console.error('HubSpot Form submit error:', err)
    return false
  }
}
```

## Tests de migration

### Test 1 — Submission test locale

```bash
curl -X POST "https://kamazblxybkukpkvznkv.supabase.co/functions/v1/contact-form" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test+forms-api-'$(date +%s)'@example.com",
    "name": "Test Migration",
    "hutk": "fake-hutk-for-test",
    "utm_source": "google",
    "utm_term": "expert comptable LMNP",
    "gclid": "test-gclid-123",
    "landing_page_url": "https://nopillo-landing-exemple.netlify.app/"
  }'
```

Attendu : `{"ok": true, "leadId": "..."}`.

### Test 2 — Verifier dans HubSpot UI

1. HubSpot → Contacts → Recents : verifier que le contact apparait
2. Properties affichees : email, firstname, lastname, phone, **et tous les UTMs**
3. **Original Source** doit etre "Form submission" (pas "Direct" ni "API")
4. **Original Source Drill-Down 1** doit contenir le nom du form

### Test 3 — Verifier la submission dans le form

1. HubSpot → Marketing → Forms → "Landing Nopillo - Expert comptable LMNP"
2. Tab "Submissions" : la submission test doit apparaitre
3. Click sur submission : voir tous les fields envoyes + context (`hutk`, `pageUri`)

### Test 4 — Verifier que les workflows fire

1. HubSpot → Workflows → "Notification commercial sur Landing Nopillo"
2. Tab "History" : doit lister le contact test enrolle

### Test 5 — Si `gclid` capture, verif Google Ads

1. Wait 24-48h (HubSpot envoie batch quotidien)
2. Google Ads → Tools → Conversions → Offline conversion imports
3. Verifier qu'une conversion est importee avec le gclid

## Rollback en cas de probleme

```bash
# Revert l'Edge Function
git revert <commit-hash>
cd nopillo-landing-exemple
supabase functions deploy contact-form \
  --no-verify-jwt --project-ref kamazblxybkukpkvznkv

# Le push HubSpot tombe → seul Supabase recoit le lead (degraded but functional)
```

Note : `public.leads` reste intacte avec le service role. Le rollback n'affecte pas le stockage.

## Sources

Voir [sources.md](sources.md).
