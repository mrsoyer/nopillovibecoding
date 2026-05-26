# 03 — Netlify Forms : capture leads sans backend

## Ce que c'est

**Netlify Forms** detecte automatiquement les formulaires HTML qui ont l'attribut `data-netlify="true"` au build, et capture leurs submissions sans aucun backend a ecrire. Les soumissions sont consultables dans le dashboard Netlify, exportables, et notifiables (email, Slack, webhook, Zapier, HubSpot).

En 2026 : **gratuit illimite** sur tous les plans, avec spam protection inclus.

## Form HTML minimal

```html
<form name="contact" method="POST" data-netlify="true">
  <input type="hidden" name="form-name" value="contact" />
  <label>
    Email :
    <input type="email" name="email" required />
  </label>
  <label>
    Message :
    <textarea name="message" required></textarea>
  </label>
  <button type="submit">Envoyer</button>
</form>
```

**Points cles** :
- `data-netlify="true"` : active la detection au build.
- `name="contact"` : identifiant du form dans le dashboard.
- `<input type="hidden" name="form-name" value="contact" />` : indispensable pour les SPA / Astro.
- Action par defaut : POST vers `/`. Apres submission, redirige vers `/?form-success=true`. Pour redirige custom : `action="/merci"`.

## Form dans Astro

Astro est statique au build → les forms sont detectes nativement, **pas besoin de plugin**.

```astro
---
// src/components/ContactForm.astro
---

<form
  name="lead-landing"
  method="POST"
  action="/merci"
  data-netlify="true"
  netlify-honeypot="bot-field"
  class="space-y-4"
>
  <input type="hidden" name="form-name" value="lead-landing" />

  <p class="hidden">
    <label>Ne pas remplir : <input name="bot-field" /></label>
  </p>

  <label class="block">
    <span class="text-sm font-medium">Email professionnel</span>
    <input
      type="email"
      name="email"
      required
      class="mt-1 block w-full rounded-md border-gray-300"
    />
  </label>

  <label class="block">
    <span class="text-sm font-medium">Entreprise</span>
    <input
      type="text"
      name="company"
      required
      class="mt-1 block w-full rounded-md border-gray-300"
    />
  </label>

  <button
    type="submit"
    class="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
  >
    Recevoir la demo
  </button>
</form>
```

## Spam protection

Tous les forms passent par **Akismet** par defaut. Les submissions flaggees sont separees dans l'onglet "Spam submissions" du dashboard.

Pour renforcer :

### 1. Honeypot (recommande)

Champ cache que les bots remplissent automatiquement, pas les humains.

```html
<form name="contact" method="POST" data-netlify="true" netlify-honeypot="bot-field">
  <p class="hidden">
    <label>Ne pas remplir : <input name="bot-field" /></label>
  </p>
  <!-- ... -->
</form>
```

CSS pour cacher (jamais `display:none` car certains bots intelligents le detectent) :

```css
.hidden { position: absolute; left: -9999px; }
```

### 2. reCAPTCHA 2 Netlify-managed

```html
<form name="contact" method="POST" data-netlify="true" data-netlify-recaptcha="true">
  <!-- champs -->
  <div data-netlify-recaptcha="true"></div>
  <button type="submit">Envoyer</button>
</form>
```

Limite : un seul reCAPTCHA Netlify-managed par page.

### 3. reCAPTCHA 2 custom

Necessaire si plusieurs forms sur la meme page :
1. Creer cles sur https://www.google.com/recaptcha/admin
2. Ajouter env vars Netlify : `SITE_RECAPTCHA_KEY` (Builds + Runtime) et `SITE_RECAPTCHA_SECRET` (Runtime).
3. Charger le script Google + injecter le widget manuellement.

## Soumissions AJAX (forms sans reload)

Pour une UX moderne sans rechargement, utiliser `fetch` avec `FormData` :

```html
<form name="contact" method="POST" data-netlify="true" netlify-honeypot="bot-field">
  <input type="hidden" name="form-name" value="contact" />
  <!-- champs -->
</form>

<script>
  const form = document.querySelector('form[name="contact"]');
  form?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const res = await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(data).toString(),
    });
    if (res.ok) window.location.href = '/merci';
    else alert('Erreur, reessayez');
  });
</script>
```

**Important** : le honeypot et le reCAPTCHA doivent etre inclus dans le `FormData` pour que Netlify les valide.

## Notifications (envoi vers CRM)

### Email simple
Dashboard → Forms → Notifications → "Email notification" → adresse cible.

### Slack
Notification webhook Slack natif, configuration en 2 clics.

### HubSpot via Zapier (pattern recommande)

Netlify ne propose pas d'integration HubSpot **native**. La voie validee est Zapier :

1. **Trigger Zapier** : "New Form Submission in Netlify" (selectionner le site + form).
2. **Action HubSpot** : "Create or Update Contact" (mapper email, firstname, company, etc.).
3. (optionnel) **Action HubSpot** : "Create Deal" si le form qualifie un lead.

Alternatives : Make.com, n8n self-hosted, Pipedream.

### HubSpot direct via Netlify Function (pas de tiers)

Pour eviter Zapier (cout, latence), envoyer directement via une Function :

```typescript
// netlify/functions/lead-to-hubspot.ts
import type { Handler } from '@netlify/functions';

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method not allowed' };
  }

  const data = JSON.parse(event.body || '{}');

  const res = await fetch(
    `https://api.hubapi.com/crm/v3/objects/contacts`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.HUBSPOT_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        properties: {
          email: data.email,
          firstname: data.firstname,
          company: data.company,
          lifecyclestage: 'lead',
        },
      }),
    }
  );

  return {
    statusCode: res.ok ? 200 : 500,
    body: JSON.stringify({ ok: res.ok }),
  };
};
```

Cote front : intercepter le submit, POSTer **a la fois** vers Netlify Forms (pour le dashboard) et vers la Function (pour HubSpot).

## Limites a connaitre

- **Pas de logique conditionnelle** native (champs qui apparaissent selon une reponse) → coder en JS cote client.
- **Pas de multi-step wizard** out-of-the-box → soit JS client, soit framework comme Formik/React Hook Form sur composant React.
- **Fichiers attaches** : OK jusqu'a 8 MB par submission (multipart/form-data).
- **Quota dashboard** : submissions stockees 30 jours par defaut, exportable CSV.

## Checklist deploiement form

- [ ] Form a un attribut `name` unique.
- [ ] `data-netlify="true"` present.
- [ ] Hidden input `form-name` present (obligatoire pour Astro/SPA).
- [ ] Honeypot OU reCAPTCHA configure.
- [ ] Page `/merci` ou redirect post-submit existe.
- [ ] Notification email/Slack/Zapier configuree dans le dashboard.
- [ ] Test envoye depuis preview deploy (le form n'est detecte qu'apres build).
- [ ] Politique RGPD : mention consentement + duree retention 30j Netlify rappelee.

## A retenir

Netlify Forms = la solution la plus rapide pour collecter des leads sur une landing sans backend. Pour un cas usage Nopillo standard (lead capture vers HubSpot), le pattern recommande est : **form Netlify + honeypot + Zapier vers HubSpot**, ou Function TypeScript directe si on veut economiser le Zap.

## Sources

- [Forms spam filters - Netlify docs](https://docs.netlify.com/manage/forms/spam-filters/) — honeypot, Akismet, reCAPTCHA officiels
- [Form submissions - Netlify docs](https://docs.netlify.com/manage/forms/submissions/) — gestion des soumissions et notifications
- [Spam management for Netlify Forms - Netlify blog](https://www.netlify.com/blog/2019/05/21/spam-management-for-netlify-forms/) — patterns honeypot et CSS recommandes
- [Stop spam on Netlify Forms with Zapier and OOPSpam](https://www.oopspam.com/blog/netlify-contactform-spam) — protection avancee contre le spam
- [HubSpot Netlify Integration via Zapier](https://zapier.com/apps/hubspot/integrations/netlify) — pattern Zapier vers HubSpot
- [Formspree on Netlify integrations](https://www.netlify.com/integrations/formspree/) — alternative pour cas avances
- [Netlify Forms spam protection - Support Forums](https://answers.netlify.com/t/netify-form-spam-protection/158755) — retours d'experience communaute
