# Embed HubSpot Form dans Webflow (via MCP)

Reference pour generer + injecter un form HubSpot avec tracking dedup sur une page Webflow via le serveur MCP Webflow.

## 1. Snippet embed HubSpot (mode standard)

A placer dans la page (ou via Custom Code site-wide en HEAD/BODY) :

```html
<!-- HubSpot Forms loader (un seul par site) -->
<script src="https://js-eu1.hsforms.net/forms/embed/v2.js" defer></script>

<!-- Container du form -->
<div id="hubspot-form-{{FORM_SLUG}}"></div>

<!-- Embed + tracking dedup -->
<script>
(function () {
  function captureClickIds() {
    var p = new URLSearchParams(window.location.search);
    return {
      fbclid: p.get('fbclid') || '',
      gclid: p.get('gclid') || '',
      utm_source: p.get('utm_source') || '',
      utm_medium: p.get('utm_medium') || '',
      utm_campaign: p.get('utm_campaign') || ''
    };
  }

  function loadForm() {
    if (!window.hbspt) { return setTimeout(loadForm, 100); }

    window.hbspt.forms.create({
      portalId: '{{PORTAL_ID}}',
      formId: '{{FORM_ID}}',
      region: 'eu1', // ou 'na1' selon datacenter HubSpot
      target: '#hubspot-form-{{FORM_SLUG}}',

      // Pre-fill hidden fields (creer ces custom properties dans HubSpot)
      onFormReady: function ($form) {
        var ids = captureClickIds();
        Object.keys(ids).forEach(function (k) {
          var input = $form.find('input[name="' + k + '"]');
          if (input.length) input.val(ids[k]);
        });
      },

      onFormSubmit: function ($form) {
        // 1) Generer event_id partage Pixel + CAPI (dedup 48h)
        var eventId = (window.crypto && crypto.randomUUID)
          ? crypto.randomUUID()
          : 'evt_' + Date.now() + '_' + Math.random().toString(36).slice(2);
        window.__lastLeadEventId = eventId;

        var email = $form.find('input[name="email"]').val() || '';
        var phone = $form.find('input[name="phone"]').val() || '';
        var firstname = $form.find('input[name="firstname"]').val() || '';
        var lastname = $form.find('input[name="lastname"]').val() || '';

        // 2) GA4 Enhanced Conversions (push raw, GTM hash en SHA-256)
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: 'generate_lead',
          event_id: eventId,
          user_data: {
            email: email,
            phone_number: phone,
            address: { first_name: firstname, last_name: lastname }
          }
        });

        // 3) Meta Pixel client-side
        if (window.fbq) {
          fbq('track', 'Lead',
            { content_name: 'HubSpot Form', currency: 'EUR', value: 0 },
            { eventID: eventId }
          );
        }

        // 4) Trigger server-side CAPI (meme event_id)
        fetch('/api/capi/lead', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            event_id: eventId,
            email: email,
            phone: phone,
            firstname: firstname,
            lastname: lastname,
            event_source_url: window.location.href,
            click_ids: captureClickIds()
          })
        }).catch(function (e) { console.warn('CAPI lead failed', e); });
      }
    });
  }

  loadForm();
})();
</script>
```

Remplacements obligatoires : `{{PORTAL_ID}}`, `{{FORM_ID}}`, `{{FORM_SLUG}}` (kebab-case), `region` (`eu1` ou `na1`).

## 2. Injection via Webflow MCP

Le projet a le serveur MCP `webflow` configure (cf. `WEBFLOW-MCP.md`). Utiliser ces outils :

### a) Enregistrer le script (inline)

```
Tool: mcp__webflow__data_scripts_tool
Action: register inline script
Body: <script src="https://js-eu1.hsforms.net/forms/embed/v2.js" defer></script>
Name: hubspot-loader
```

### b) Enregistrer le tracking script (separe pour reuse)

```
Tool: mcp__webflow__data_scripts_tool
Action: register inline script
Body: [snippet IIFE ci-dessus, sans la balise loader]
Name: hubspot-form-{{FORM_SLUG}}-tracking
```

### c) Appliquer les scripts a la page cible

```
Tool: mcp__webflow__data_scripts_tool
Action: apply script to page (page URL fournie par user)
Scripts: [hubspot-loader, hubspot-form-{{FORM_SLUG}}-tracking]
Location: footer (apres le DOM)
```

### d) Verifier presence du div container

```
Tool: mcp__webflow__data_pages_tool
Action: get page content
Verify: <div id="hubspot-form-{{FORM_SLUG}}"></div> present
```

Si absent : demander a l'utilisateur d'ajouter un Embed Webflow avec `<div id="hubspot-form-{{FORM_SLUG}}"></div>` a l'emplacement souhaite, OU utiliser `mcp__webflow__de_page_tool` (Designer API + Bridge App requis) pour injecter un Embed.

### e) Publier

```
Tool: mcp__webflow__data_sites_tool
Action: publish site
Targets: webflow.io subdomain (test) puis prod
```

## 3. Datacenter HubSpot (eu1 vs na1)

| Region | URL loader | URL submission API |
|---|---|---|
| EU (eu1) | `https://js-eu1.hsforms.net/forms/embed/v2.js` | `https://api.hsforms.com/submissions/v3/integration/submit/...` |
| US (na1) | `https://js.hsforms.net/forms/v2.js` | `https://api.hsforms.com/submissions/v3/integration/submit/...` |

La portail HubSpot indique le datacenter : URL admin contient `app-eu1.hubspot.com` ou `app.hubspot.com`. Fournir le bon `region` dans `hbspt.forms.create({...})`.

## 4. Checklist post-injection

- [ ] Script loader present 1 seule fois sur le site
- [ ] Script tracking applique sur la page cible uniquement
- [ ] Div container avec ID unique present dans le DOM
- [ ] Custom properties `fbclid`, `gclid`, `utm_*` creees dans HubSpot (Settings -> Properties -> Contact)
- [ ] Site publie (staging puis prod)
- [ ] Test soumission depuis la page live (incognito) : contact apparait dans HubSpot < 30s

## 5. Pieges Webflow

- Webflow strip parfois les scripts inline non-Embed : preferer l'enregistrement via MCP `data_scripts_tool` (Custom Code Manager) plutot que coller dans un Embed visuel.
- L'Embed visuel est limite a 10 000 caracteres : decouper si depassement.
- Designer scripts (via Bridge App) sont independants des Data API scripts. Choisir une seule source.
