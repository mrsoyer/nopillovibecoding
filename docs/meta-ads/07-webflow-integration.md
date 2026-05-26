# 07 — Integration Meta Pixel + CAPI dans Webflow

## Table des Matieres

- [Vue d'Ensemble](#vue-densemble)
- [Concepts Cles](#concepts-cles)
- [Patterns Recommandes](#patterns-recommandes)
- [Anti-Patterns](#anti-patterns)
- [Sources](#sources)

## Vue d'Ensemble

Webflow propose une **integration native Meta Pixel** dans Project Settings > Integrations qui couvre les pageviews et events ecommerce. Pour aller plus loin (form submit Lead, CAPI server-side, deduplication), il faut soit du custom code, soit un plugin tiers (PixelFlow, Stape, Shopyflow). Pour Nopillo, le pattern recommande est **plugin PixelFlow** pour la rapidite + custom Pixel snippet pour les events specifiques + CAPI via Stape ou directement via Make/n8n.

## Concepts Cles

### Native Webflow Integration
- Project Settings > Integrations > Meta Pixel.
- Renseigner le Pixel ID.
- Capture automatique : `PageView`, et si Webflow Ecommerce active : `ViewContent`, `AddToCart`, `InitiateCheckout`, `Purchase`.
- Limite : pas de CAPI, pas d'event custom Lead.

### Custom Code via Site Settings
- Project Settings > Custom Code > Head Code = Pixel base snippet.
- Pages > [page] > Custom Code = events specifiques par page.
- Permet ajouter `fbq('track', 'Lead', {value: 50, currency: 'EUR'}, {eventID: 'uuid'})`.

### Plugin PixelFlow (recommande pour Nopillo)
- Webflow App officielle.
- 4 etapes : create account -> install plugin -> add Pixel ID -> publish.
- Track form submits Webflow natif.
- CAPI inclus avec deduplication automatique.
- Bot blocking, multi-pixels, logs JSON.
- Pas de code custom necessaire pour le standard.

### CAPI server-side options
- **PixelFlow** : CAPI managed inclus.
- **Stape.io** : sGTM + CAPI bridge (multi-platforms).
- **Make / n8n / Zapier** : webhook Webflow -> transform -> Meta Graph API POST.
- **Custom backend** : Node/PHP/Python POSTant a `https://graph.facebook.com/v18.0/{pixel_id}/events`.

## Patterns Recommandes

### Setup Standard Nopillo (Pixel + CAPI sur Webflow)

**Etape 1 : Pixel base via Webflow native**
```
Project Settings > Integrations > Meta Pixel > [Pixel ID]
```
Capture PageView automatiquement.

**Etape 2 : Event Lead sur form submit**

Dans Page Settings > Custom Code > Footer Code :
```html
<script>
  document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', function(e) {
      var eventId = 'lead_' + Date.now() + '_' + Math.random().toString(36).slice(2);
      // Stocker pour CAPI server-side
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'lead_submitted',
        eventId: eventId,
        email: form.querySelector('[name="email"]')?.value,
        phone: form.querySelector('[name="phone"]')?.value
      });
      // Pixel client-side
      fbq('track', 'Lead', {
        content_name: form.getAttribute('data-name') || 'Contact',
        currency: 'EUR',
        value: 50.00
      }, { eventID: eventId });
    });
  });
</script>
```

**Etape 3 : Capture fbclid au load**
```html
<script>
  // Capture fbclid depuis URL et stocke en cookie/hidden field
  var params = new URLSearchParams(window.location.search);
  var fbclid = params.get('fbclid');
  if (fbclid) {
    document.cookie = '_fbc=fb.1.' + Date.now() + '.' + fbclid + '; path=/; max-age=' + 60*60*24*90;
  }
  // Inject dans champs caches du form pour passage CRM
  document.querySelectorAll('input[name="fbclid"]').forEach(i => i.value = fbclid || '');
</script>
```

**Etape 4 : CAPI server-side via Make/n8n**

Webflow Form > Webhook -> Make scenario :
1. Receive payload Webflow form.
2. Hash email + phone (SHA256, lowercase pour email).
3. Build CAPI payload avec `event_id` identique a celui passe au Pixel.
4. POST a `https://graph.facebook.com/v18.0/{pixel_id}/events?access_token={token}`.

### Alternative simple : PixelFlow

Si pas d'envie de gerer code custom :
1. Installer PixelFlow Webflow App.
2. Add site + Pixel ID + Access Token CAPI.
3. Tag elements (boutons CTA) avec classes CSS pour declencher events.
4. Form submits trackes automatiquement.
5. CAPI + dedup gerees.

### Webflow Ecommerce (si applicable)

| Event | Auto via integration native |
|-------|----------------------------|
| ViewContent (page produit) | Oui |
| AddToCart | Oui |
| InitiateCheckout | Oui |
| Purchase | Oui |

Pour ajouter CAPI : utiliser webhook Webflow Ecommerce -> backend.

### Test & Validation

1. **Meta Pixel Helper** (extension Chrome) : verifier Pixel fire sur PageView + Lead.
2. **Events Manager > Test Events** : passer le `test_event_code` dans payload pour voir events en temps reel.
3. **Diagnostics tab** : verifier dedup (Browser + Server doivent matcher), EMQ score.
4. **Events Manager > Overview** : trafic Pixel vs CAPI 7 jours.

### Performance Considerations

- Le Pixel snippet pese ~50KB. Charger en async via Webflow native (deja le cas).
- Defer si non critique au-dessus de la fold : `<script defer src="...">`.
- PixelFlow ajoute ~10-30KB selon config.
- Eviter d'empiler plugins : 1 seul gestionnaire CAPI.

## Anti-Patterns

| Anti-pattern | Consequence |
|--------------|-------------|
| Pixel double-installe (native + custom code) | Double PageView, EMQ chute |
| Pas de capture fbclid | Pas de downstream attribution CRM |
| Form submit non tracke (juste action redirect) | Lead jamais envoye a Meta |
| EventID different Pixel vs CAPI | Pas de dedup -> double comptage |
| Hasher email cote client en JS public | Pas de gain (le hash protege le transport, pas la source) ; faire server-side |
| Charger Pixel apres consent uniquement -> pas de PageView pour les acceptes | Verifier ordre Consent -> Pixel init |
| Plugin tiers + custom snippet en parallele | Conflits, events doubles |
| Oublier `currency` sur events value | Reporting fausse, optimisation degradee |

## Stack Recommandee Nopillo

| Besoin client | Stack |
|--------------|-------|
| Landing simple, pas d'ecom | Webflow native Pixel + custom code Lead + Make webhook CAPI |
| Landing ecom Webflow Ecommerce | PixelFlow (auto) |
| Multi-plateformes (Meta + Google + TikTok) | sGTM via Stape.io |
| Client a CRM HubSpot | Native HubSpot CAPI integration + Pixel Webflow |
| Setup ultra-rapide | PixelFlow plugin |

## Sources

- [Embed Meta Pixel on your Webflow site — Webflow Help](https://help.webflow.com/hc/en-us/articles/33961406577171-Embed-Meta-Pixel-on-your-Webflow-site)
- [PixelFlow — Meta Pixel & CAPI for Webflow](https://pixelflow.so/webflow)
- [PixelFlow — FB Conversions API App (Webflow Marketplace)](https://webflow.com/apps/detail/pixelflow-fb-conversions-api-multi-pixel)
- [Meta Pixel & CAPI Integration — Shopyflow Docs](https://www.shopyflow.com/docs-articles/meta-pixel-capi-integration)
- [Track Meta Pixel events on Webflow — BRIX Templates](https://brixtemplates.com/blog/how-to-track-meta-facebook-pixel-events-on-webflow-a-step-by-step-guide)
- [Set up Conversion API on Webflow — Flowradar](https://www.flowradar.com/answer/how-to-set-up-conversion-api-webflow-site-capture-data)
