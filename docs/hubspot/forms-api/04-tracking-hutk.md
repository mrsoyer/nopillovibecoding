# 04 — Tracking : cookie hutk + context

## Table des matieres

- [Qu'est-ce que le cookie hubspotutk](#quest-ce-que-le-cookie-hubspotutk)
- [Capturer le cookie cote client](#capturer-le-cookie-cote-client)
- [Le context object dans la submission](#le-context-object-dans-la-submission)
- [Integration avec GA4 + Google Ads](#integration-avec-ga4--google-ads)
- [Problemes connus](#problemes-connus)

---

## Qu'est-ce que le cookie hubspotutk

`hubspotutk` est un cookie first-party pose par le **HubSpot tracking code** sur les pages ou il est embed. Il contient un identifiant unique appele "user token" (~35-40 chars).

### Role

- **Identite cross-page** : memorise le visiteur a travers la session
- **Attribution** : permet d'associer plusieurs soumissions de form au meme contact CRM
- **Deduplication** : evite de creer 2 contacts pour une meme personne

### Pose du cookie

Le cookie est pose automatiquement quand la page contient le snippet :

```html
<!-- Start of HubSpot Embed Code -->
<script type="text/javascript" id="hs-script-loader" async defer
        src="//js.hs-scripts.com/{portalId}.js"></script>
<!-- End of HubSpot Embed Code -->
```

Sans ce snippet, `hubspotutk` n'existe pas → `hutk` sera `null` dans les submissions → le visiteur apparait en "direct traffic" dans HubSpot.

### Specs du cookie

| Attribut | Valeur |
|----------|--------|
| Nom | `hubspotutk` |
| Type | first-party |
| Domain | domaine du site |
| Path | `/` |
| Duree | 13 mois (apres GDPR) |
| HttpOnly | non (lisible en JS) |
| Secure | oui (HTTPS) |
| SameSite | `Lax` |

---

## Capturer le cookie cote client

```js
function getCookie(name) {
  const value = '; ' + document.cookie
  const parts = value.split('; ' + name + '=')
  if (parts.length === 2) return parts.pop().split(';').shift()
  return null
}

const hutk = getCookie('hubspotutk')
// → "abc123def456..." ou null
```

### React hook

```tsx
function useHubspotUtk() {
  const [hutk, setHutk] = useState<string | null>(null)

  useEffect(() => {
    const getCookie = (name: string) => {
      const value = '; ' + document.cookie
      const parts = value.split('; ' + name + '=')
      if (parts.length === 2) return parts.pop()?.split(';').shift() ?? null
      return null
    }
    setHutk(getCookie('hubspotutk'))
  }, [])

  return hutk
}
```

---

## Le context object dans la submission

```json
"context": {
  "hutk": "abc123...",
  "ipAddress": "192.168.1.42",
  "pageUri": "https://nopillo.fr/lp/expert-comptable-lmnp?utm_term=...",
  "pageName": "Expert comptable LMNP - Nopillo",
  "pageId": "12345678",
  "sfdcCampaignId": "701D000000xxx",
  "goToWebinarWebinarKey": "..."
}
```

| Cle | Recommande | Effet |
|-----|------------|-------|
| `hutk` | **Critique** | Lie la submission au visiteur tracke. Sans : direct traffic. |
| `pageUri` | **Critique** | Stocke dans le contact (source de conversion). Permet attribution par page. |
| `pageName` | Recommande | Affiche dans HubSpot UI sur le contact. Aide la lecture. |
| `ipAddress` | Recommande | Sert pour geolocalisation HubSpot (uniquement si capture server-side). |
| `pageId` | Si page HubSpot CMS | Lie la submission a une page du CMS HubSpot. Sinon ignorer. |
| `sfdcCampaignId` | Si Salesforce sync | Push vers campagne SFDC lie. Sinon ignorer. |

---

## Integration avec GA4 + Google Ads

Pattern complet pour traquer une conversion end-to-end :

```js
async function onFormSubmit(formData) {
  // 1. Capturer hutk + UTMs
  const hutk = getCookie('hubspotutk')
  const params = new URLSearchParams(window.location.search)

  const payload = {
    fields: [
      { objectTypeId: '0-1', name: 'email',        value: formData.email },
      { objectTypeId: '0-1', name: 'firstname',    value: formData.firstname },
      // UTMs en hidden fields
      { objectTypeId: '0-1', name: 'utm_source',   value: params.get('utm_source') ?? '' },
      { objectTypeId: '0-1', name: 'utm_campaign', value: params.get('utm_campaign') ?? '' },
      { objectTypeId: '0-1', name: 'utm_term',     value: params.get('utm_term') ?? '' },
      { objectTypeId: '0-1', name: 'gclid',        value: params.get('gclid') ?? '' },
    ],
    context: {
      hutk,
      pageUri: window.location.href,
      pageName: document.title,
    },
  }

  // 2. Submit HubSpot
  const res = await fetch(
    `https://api.hsforms.com/submissions/v3/integration/submit/${PORTAL_ID}/${FORM_ID}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    },
  )
  const data = await res.json()

  // 3. Fire GA4 + Google Ads conversion
  gtag('event', 'form_submit', {
    keyword: params.get('utm_term'),
    match_type: params.get('matchtype'),
  })
  gtag('event', 'conversion', {
    send_to: 'AW-XXXX/abc',
    value: 50,
    currency: 'EUR',
    transaction_id: data.inlineMessage ? `hs-${Date.now()}` : undefined,
  })
}
```

### Workflow HubSpot post-submission

Apres submission, HubSpot peut declencher :

1. **Notification email** au proprio du contact
2. **Workflow drip** (sequence d'emails)
3. **Lead scoring** (calcule sur properties)
4. **Sync vers Google Ads** (Offline Conversion Import si `gclid` present)
5. **Sync Salesforce** (si `sfdcCampaignId`)

Ces workflows sont configures dans HubSpot UI, pas via l'API.

---

## Problemes connus

### Cookie `hubspotutk` absent (null)

**Causes** :
- Le snippet HubSpot tracking n'est pas embed sur la page
- Browser tracking prevention (Safari ITP, Firefox ETP) bloque le cookie
- Adblocker filtre les requetes HubSpot
- Cookie pas encore pose (premier hit, race condition)

**Solutions** :
- Toujours embed le tracking snippet en premier dans le `<head>`
- Attendre `DOMContentLoaded` avant de lire le cookie
- Fallback : accepter `hutk: null` (le contact sera quand meme cree mais en "direct traffic")
- Server-side : si null, capturer l'IP + User-Agent pour scoring

### Multiples contacts crees pour la meme personne

**Cause** : dedup HubSpot se fait par email principalement, pas par `hutk`. Si la meme personne soumet 2 forms avec 2 emails differents, ce sont 2 contacts distincts.

**Solution** : configurer dans HubSpot le `createNewContactForNewEmail: false` dans `configuration` du form.

### `pageUri` tronque (trop long)

HubSpot limite a 1024 chars. Les URLs avec beaucoup d'UTMs peuvent depasser.

**Solution** : tronquer cote client a 1000 chars avant submit.

```js
const pageUri = window.location.href.slice(0, 1000)
```

## Sources

- [HubSpot - Tracking cookies set in browser](https://knowledge.hubspot.com/privacy-and-consent/what-cookies-does-hubspot-set-in-a-visitor-s-browser) — specs cookies
- [HubSpot Community - hutk capture issues 2025](https://community.hubspot.com/t5/APIs-Integrations/Issues-capturing-the-hubspotutk-cookie-in-form-submission-with/m-p/1128469) — troubleshooting recent
- [HubSpot Community - tracking cookie](https://community.hubspot.com/t5/APIs-Integrations/Hubspotutk-Tracking/td-p/835898) — patterns
- [Gravity Forms - hutk troubleshooting](https://docs.gravityforms.com/troubleshooting-the-hubspot-tracking-cookie/) — issues classiques
