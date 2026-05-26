# 06 — Analyse du form du projet vs API HubSpot

> Audit du `ContactForm.tsx` (React island) + Edge Function `contact-form` (Deno) du projet `nopillo-landing-exemple`, croises avec les best practices Forms API.

## Table des matieres

- [Architecture actuelle](#architecture-actuelle)
- [Forces](#forces)
- [Ecarts vs Forms API HubSpot](#ecarts-vs-forms-api-hubspot)
- [Recommandations prioritaires](#recommandations-prioritaires)
- [Migration possible vers Submissions API](#migration-possible-vers-submissions-api)

---

## Architecture actuelle

```
ContactForm.tsx (browser, React)
    │  fetch POST /functions/v1/contact-form
    │  body: { email, name, phone, message, utm, gclid, search_term, ... }
    ▼
Edge Function contact-form (Deno @ Supabase)
    │
    ├─ 1. honeypot trap (silent ok)
    ├─ 2. validate email + name length
    ├─ 3. pushToHubSpot()  ──► POST api.hubapi.com/crm/v3/objects/contacts
    │                          (Contacts API direct, PAS Forms API)
    │                          409 → search + PATCH (upsert manuel)
    │
    └─ 4. INSERT public.leads (Supabase)
              avec hubspot_contact_id
```

**Stack** : React island + Edge Function Deno + Contacts API HubSpot.

---

## Forces

### Securite

- ✅ Token HubSpot UNIQUEMENT cote serveur (Edge Function env var). Jamais expose au browser.
- ✅ Honeypot anti-spam (`name="website"` masque en CSS off-screen).
- ✅ CORS restreint a 3 origines (localhost + prod URL), pas de `*`.
- ✅ Service role key Supabase confinee a l'Edge Function.
- ✅ Validation email regex + longueur cote serveur (defense en profondeur).

### Architecture

- ✅ Double persistance : Supabase (source of truth) + HubSpot (CRM/workflows). Si HubSpot tombe, le lead est sauve.
- ✅ Push HubSpot non-bloquant (`try/catch` interne). Le client recoit toujours `ok: true` si Supabase a insere.
- ✅ Upsert manuel : 409 → search + PATCH. Evite les doublons.
- ✅ Tracking complet capture : UTMs, GCLID, search_term, match_type, device, landing_page_url.
- ✅ Tracking client (`trackFormSubmit`, `trackConversion`) firen apres response succes.

### UX

- ✅ 4 champs visibles seulement (best practice conversion).
- ✅ State machine clean : `idle | sending | sent | error`.
- ✅ ARIA live region pour l'erreur (`role="alert" aria-live="polite"`).
- ✅ `autoComplete` correct sur chaque champ.
- ✅ Bouton disabled pendant `sending`.

---

## Ecarts vs Forms API HubSpot

### 1. ⚠️ N'utilise PAS la Forms API, mais Contacts API

**Code actuel** :
```ts
fetch('https://api.hubapi.com/crm/v3/objects/contacts', {
  method: 'POST',
  body: JSON.stringify({ properties }),
})
```

**Difference** :

| Aspect | Contacts API (actuel) | Forms API (alternatif) |
|--------|-----------------------|------------------------|
| Endpoint | `/crm/v3/objects/contacts` | `/submissions/v3/integration/submit/...` |
| Workflows declenches | Manuellement (workflow sur change property) | **Automatique** (declenches sur form submission) |
| Tracking `hutk` | Non transmis | Transmis via `context.hutk` |
| Attribution HubSpot | "Direct traffic" / API source | Attribuee a la page submit (`pageUri`) |
| Form analytics | Aucune metrique | "X submissions, Y conversions" dans HubSpot UI |
| Dedup | Manuelle (409 + search + PATCH) | Native (HubSpot le gere) |
| Form configurable | Schema cote code | Schema cote HubSpot UI (changer un champ sans deployer) |

**Impact** :
- Les workflows HubSpot bases sur "form submission" ne se declenchent pas.
- L'attribution multi-touch est cassee (pas de `hutk`).
- L'equipe marketing ne voit pas les conversions dans HubSpot UI Forms.

### 2. ❌ Cookie `hubspotutk` jamais capture

**Code actuel** : aucun lecture de cookie.

Le snippet HubSpot tracking n'est meme pas embed dans `Base.astro`. Sans lui, pas de cookie `hubspotutk` pose → l'attribution est cassee meme si on migrait vers Forms API.

### 3. ⚠️ Pas de rate limiting cote client

Le client peut spam-cliquer le bouton (rapide). Le serveur valide mais consomme du quota inutilement.

### 4. ⚠️ Pas de retry sur 429/5xx HubSpot

`pushToHubSpot()` echoue silencieusement et retourne `null`. Le lead est sauve en Supabase mais HubSpot rate. Si c'etait un 429 temporaire, un retry simple aurait sauve la conversion HubSpot.

### 5. ⚠️ `legalConsentOptions` absent du push HubSpot

Le formulaire affiche la mention RGPD (texte visible) mais le consentement n'est pas envoye en structure a HubSpot. RGPD-strict : il faudrait le tracer.

### 6. ⚠️ Split `name` → `firstname` + `lastname` fragile

```ts
const [firstname, ...rest] = (lead.name as string | null ?? '').split(' ')
const lastname = rest.join(' ') || ''
```

"Jean-Claude Van Damme" → firstname="Jean-Claude", lastname="Van Damme" ✓
"Marie Curie" → firstname="Marie", lastname="Curie" ✓
"Madonna" → firstname="Madonna", lastname="" ✓ (acceptable)
"de la Cruz, Maria" → firstname="de", lastname="la Cruz, Maria" ❌

**Solution** : separer les champs en 2 inputs (`firstname` + `lastname`) sur le formulaire, comme la convention HubSpot.

### 7. ⚠️ Pas de logging structure

`console.log` simple. Pas de correlation ID, pas de latency tracking, pas de metric sur hutk-null rate.

---

## Recommandations prioritaires

### P0 — Ajouter le tracking HubSpot snippet + capturer hutk

**Pourquoi** : sans `hutk`, l'attribution est cassee dans HubSpot. Marketing perd la traceabilite.

**Action** :

1. Dans `Base.astro`, ajouter le snippet HubSpot tracking apres GTM :

```html
<script type="text/javascript" id="hs-script-loader" async defer
        src="https://js.hs-scripts.com/{PORTAL_ID}.js"></script>
```

2. Dans `ContactForm.tsx`, capturer le cookie au submit :

```ts
function getCookie(name: string) {
  const value = '; ' + document.cookie
  const parts = value.split('; ' + name + '=')
  if (parts.length === 2) return parts.pop()?.split(';').shift() ?? null
  return null
}

// dans onSubmit
const payload = {
  ...,
  hutk: getCookie('hubspotutk'),
}
```

3. Dans l'Edge Function `pushToHubSpot()`, transmettre `hutk` (necessite de migrer vers Forms API).

### P1 — Migrer vers Forms API Submissions

**Pourquoi** : declenchement automatique des workflows HubSpot + attribution + analytics.

**Action** : remplacer `pushToHubSpot()` par appel a `submit/{portalId}/{formGuid}` :

```ts
async function pushToHubSpotForm(lead: Record<string, unknown>): Promise<string | null> {
  const portalId = Deno.env.get('HUBSPOT_PORTAL_ID')!
  const formGuid = Deno.env.get('HUBSPOT_FORM_ID')!

  const url = `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formGuid}`

  const [firstname, ...rest] = (lead.name as string ?? '').split(' ')
  const lastname = rest.join(' ')

  const body = {
    submittedAt: Date.now(),
    fields: [
      { objectTypeId: '0-1', name: 'email',     value: lead.email },
      { objectTypeId: '0-1', name: 'firstname', value: firstname },
      { objectTypeId: '0-1', name: 'lastname',  value: lastname },
      { objectTypeId: '0-1', name: 'phone',     value: lead.phone ?? '' },
      { objectTypeId: '0-1', name: 'message',   value: lead.message ?? '' },
      { objectTypeId: '0-1', name: 'utm_source',   value: lead.utm_source ?? '' },
      { objectTypeId: '0-1', name: 'utm_campaign', value: lead.utm_campaign ?? '' },
      { objectTypeId: '0-1', name: 'utm_term',     value: lead.utm_term ?? '' },
      { objectTypeId: '0-1', name: 'gclid',     value: lead.gclid ?? '' },
    ],
    context: {
      hutk: lead.hutk as string ?? null,
      pageUri: lead.landing_page_url as string ?? null,
      pageName: 'Nopillo Landing - Expert comptable LMNP',
    },
    legalConsentOptions: {
      consent: {
        consentToProcess: true,
        text: "J'accepte que Nopillo traite mes donnees conformement a la politique de confidentialite.",
      },
    },
  }

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    console.error('HubSpot Form submit failed:', res.status, await res.text())
    return null
  }
  // L'endpoint Forms API ne retourne pas l'ID contact directement, juste inlineMessage ou redirectUri
  return 'submitted'
}
```

**Trade-off** : tu ne recuperes pas l'ID contact directement (la Forms API ne le retourne pas dans la response). Si tu en as besoin, garde une recherche post-submit ou continue avec Contacts API en plus.

### P2 — Ajouter retry exponential backoff sur HubSpot

```ts
async function withRetry<T>(fn: () => Promise<T>, maxRetries = 3): Promise<T> {
  let delay = 1000
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn()
    } catch (err) {
      if (i === maxRetries - 1) throw err
      await new Promise(r => setTimeout(r, delay))
      delay *= 2
    }
  }
  throw new Error('unreachable')
}
```

### P3 — Splitter `firstname` / `lastname` dans le form

Ajouter un champ `lastname` distinct, ou renommer `name` en `lastname` (HubSpot considere `lastname` requis pour les workflows email).

### P4 — Ajouter `legalConsentOptions` au push

Renforcer la conformite RGPD en envoyant explicitement le consentement structure.

### P5 — Logging structure

Remplacer `console.log` par un format JSON normalise :

```ts
console.log(JSON.stringify({
  event: 'hubspot_submit',
  status: res.status,
  latencyMs: Date.now() - start,
  hutkPresent: Boolean(payload.context.hutk),
  emailHash: await sha256(payload.fields.find(f => f.name === 'email').value),
}))
```

---

## Migration possible vers Submissions API

> Detail complet de la migration (architecture cible, env vars, form HubSpot a creer, tests) : voir [06b-migration.md](06b-migration.md).

---

## Resume des actions

| Priorite | Action | Effort | Impact |
|----------|--------|--------|--------|
| **P0** | Embed HubSpot tracking snippet + capturer `hutk` cote client | 30 min | Critique pour attribution |
| **P1** | Migrer vers Forms Submissions API (au lieu de Contacts API) | 2h | Workflows auto + analytics HubSpot |
| **P2** | Retry exponential backoff sur 429/5xx | 30 min | Robustesse |
| **P3** | Splitter `firstname` / `lastname` dans le formulaire | 15 min | Conformite HubSpot conventions |
| **P4** | Ajouter `legalConsentOptions` structure | 15 min | Conformite RGPD stricte |
| **P5** | Logging structure JSON + monitoring | 30 min | Observabilite |

**Total effort** : ~4h pour passer de "ca marche" a "production-grade HubSpot integration".

## Sources

Voir [sources.md](sources.md) — section "Analyse projet" pour les references croisees.
