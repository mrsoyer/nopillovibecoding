# Integration Snippets — Cote Landing

> Snippets prets a coller dans une landing. Tous capturent le cookie `hubspotutk` quand present, transmettent `pageUri` + `pageName`, et gerent les etats `idle | sending | sent | error`.

## Vanilla JS (HTML form direct)

```html
<form id="contact-form">
  <input type="email" name="email" placeholder="votre@email.fr" required />
  <select name="maturite_du_projet">
    <option value="">Choisissez...</option>
    <option value="Je débute ma réflexion">Je débute ma réflexion</option>
    <!-- autres options selon enums extraits -->
  </select>
  <!-- honeypot anti-spam -->
  <input type="text" name="honeypot" tabindex="-1"
         style="position:absolute;left:-9999px" aria-hidden="true" />
  <button type="submit">Envoyer</button>
  <p class="form-message"></p>
</form>

<script>
const FN_URL = 'https://<ref>.supabase.co/functions/v1/<slug>';

function getCookie(name) {
  const value = '; ' + document.cookie;
  const parts = value.split('; ' + name + '=');
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
}

document.getElementById('contact-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const form = e.target;
  const messageEl = form.querySelector('.form-message');
  const submitBtn = form.querySelector('button[type=submit]');

  submitBtn.disabled = true;
  messageEl.textContent = 'Envoi...';

  const data = Object.fromEntries(new FormData(form));
  const payload = {
    ...data,
    hutk: getCookie('hubspotutk'),
    pageUri: window.location.href,
    pageName: document.title,
  };

  try {
    const res = await fetch(FN_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const result = await res.json();
    if (!result.ok) throw new Error(result.error);
    messageEl.textContent = 'Merci ! Nous vous recontactons sous 24h.';
    form.reset();
  } catch (err) {
    messageEl.textContent = 'Erreur : ' + err.message;
    submitBtn.disabled = false;
  }
});
</script>
```

## React (hook reutilisable)

```tsx
import { useState } from 'react'

const FN_URL = 'https://<ref>.supabase.co/functions/v1/<slug>'

type SubmitStatus = 'idle' | 'sending' | 'sent' | 'error'

export function useHubSpotEdge() {
  const [status, setStatus] = useState<SubmitStatus>('idle')
  const [error, setError] = useState<string | null>(null)

  async function submit(data: Record<string, string>) {
    setStatus('sending')
    setError(null)

    const hutk = document.cookie
      .split('; ')
      .find((row) => row.startsWith('hubspotutk='))
      ?.split('=')[1] ?? null

    try {
      const res = await fetch(FN_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          hutk,
          pageUri: window.location.href,
          pageName: document.title,
        }),
      })
      const result = await res.json()
      if (!result.ok) throw new Error(result.error)
      setStatus('sent')
      return result
    } catch (err) {
      setError(err instanceof Error ? err.message : 'unknown')
      setStatus('error')
      throw err
    }
  }

  return { status, error, submit }
}

// Usage
function ContactForm() {
  const { status, error, submit } = useHubSpotEdge()

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = Object.fromEntries(new FormData(e.currentTarget))
    await submit(data as Record<string, string>).catch(() => {})
  }

  if (status === 'sent') {
    return <p>Merci ! Nous vous recontactons sous 24h.</p>
  }

  return (
    <form onSubmit={onSubmit}>
      <input name="email" type="email" required />
      <select name="maturite_du_projet">
        <option value="">Choisissez...</option>
        <option value="Je débute ma réflexion">Je débute ma réflexion</option>
      </select>
      <input type="text" name="honeypot" tabIndex={-1}
             style={{ position: 'absolute', left: -9999 }} aria-hidden />
      <button type="submit" disabled={status === 'sending'}>
        {status === 'sending' ? 'Envoi...' : 'Envoyer'}
      </button>
      {error && <p role="alert">{error}</p>}
    </form>
  )
}
```

## Astro (island React + form .astro)

```astro
---
// src/components/ContactForm.astro
import ContactFormIsland from './ContactFormIsland.tsx'
---
<section id="contact" class="container py-16">
  <h2>Contactez-nous</h2>
  <ContactFormIsland client:visible />
</section>
```

```tsx
// src/components/ContactFormIsland.tsx
import { useState } from 'react'

const FN_URL = import.meta.env.PUBLIC_HUBSPOT_EDGE_URL!  // configurer dans .env

export default function ContactFormIsland() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')

    const fd = new FormData(e.currentTarget)
    const hutk = document.cookie
      .split('; ').find(r => r.startsWith('hubspotutk='))?.split('=')[1] ?? null

    try {
      const res = await fetch(FN_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...Object.fromEntries(fd),
          hutk,
          pageUri: window.location.href,
          pageName: document.title,
        }),
      })
      const result = await res.json()
      if (!result.ok) throw new Error(result.error)
      setStatus('sent')
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'unknown')
      setStatus('error')
    }
  }

  if (status === 'sent') return <p>Merci ! Vous recevrez une reponse sous 24h.</p>

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <input name="email" type="email" required className="input" />
      {/* ... autres champs */}
      <input type="text" name="honeypot" tabIndex={-1}
             style={{ position: 'absolute', left: -9999 }} aria-hidden />
      <button type="submit" disabled={status === 'sending'} className="btn-primary">
        {status === 'sending' ? 'Envoi...' : 'Envoyer'}
      </button>
      {errorMsg && <p role="alert" className="text-red-600">{errorMsg}</p>}
    </form>
  )
}
```

`.env` :
```
PUBLIC_HUBSPOT_EDGE_URL=https://<ref>.supabase.co/functions/v1/<slug>
```

## Vue 3 (Composition API)

```vue
<script setup lang="ts">
import { ref } from 'vue'

const FN_URL = import.meta.env.VITE_HUBSPOT_EDGE_URL!

const status = ref<'idle' | 'sending' | 'sent' | 'error'>('idle')
const errorMsg = ref<string | null>(null)

async function onSubmit(e: Event) {
  e.preventDefault()
  status.value = 'sending'
  const form = e.target as HTMLFormElement
  const fd = new FormData(form)
  const hutk = document.cookie
    .split('; ').find(r => r.startsWith('hubspotutk='))?.split('=')[1] ?? null

  try {
    const res = await fetch(FN_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...Object.fromEntries(fd),
        hutk,
        pageUri: window.location.href,
        pageName: document.title,
      }),
    })
    const result = await res.json()
    if (!result.ok) throw new Error(result.error)
    status.value = 'sent'
  } catch (err) {
    errorMsg.value = err instanceof Error ? err.message : 'unknown'
    status.value = 'error'
  }
}
</script>

<template>
  <form @submit="onSubmit" v-if="status !== 'sent'">
    <input name="email" type="email" required />
    <!-- ... -->
    <button type="submit" :disabled="status === 'sending'">
      {{ status === 'sending' ? 'Envoi...' : 'Envoyer' }}
    </button>
    <p v-if="errorMsg" role="alert">{{ errorMsg }}</p>
  </form>
  <p v-else>Merci !</p>
</template>
```

## HubSpot tracking snippet (a inclure pour attribution hutk)

Avant `</head>` de chaque page ou la landing :

```html
<script type="text/javascript" id="hs-script-loader" async defer
        src="https://js-{REGION}.hs-scripts.com/{PORTAL_ID}.js"></script>
```

Remplacements :
- `{REGION}` : `eu1`, `na1`, ou `na2` selon le portail
- `{PORTAL_ID}` : ex `26173790`

Sans ce snippet, le cookie `hubspotutk` n'est pas pose → `hutk: null` → attribution cassee (visiteur en "direct traffic").

## Bonus : capture des UTMs

Snippet a executer au load page pour stocker les UTMs dans `sessionStorage` (utile pour les pages multi-step) :

```js
const params = new URLSearchParams(window.location.search)
const utms = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid']
const captured = {}
for (const k of utms) {
  const v = params.get(k)
  if (v) captured[k] = v
}
if (Object.keys(captured).length > 0) {
  sessionStorage.setItem('lead_utms', JSON.stringify(captured))
}
// Re-injecter au submit
const stored = JSON.parse(sessionStorage.getItem('lead_utms') ?? '{}')
const payload = { ...formData, ...stored, hutk, pageUri: window.location.href }
```
