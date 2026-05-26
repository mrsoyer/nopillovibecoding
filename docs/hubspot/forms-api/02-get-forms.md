# 02 — Lire les forms (GET API)

## Table des matieres

- [Endpoints disponibles](#endpoints-disponibles)
- [Schema de reponse](#schema-de-reponse)
- [Types de champs (fieldType)](#types-de-champs-fieldtype)
- [Structure fieldGroups](#structure-fieldgroups)
- [Configuration object](#configuration-object)
- [Exemples](#exemples)

---

## Endpoints disponibles

### Lister tous les forms du portail

```http
GET https://api.hubapi.com/marketing/v3/forms
Authorization: Bearer pat-na1-xxxxxxxxx

Query params :
  limit  (default 100, max 100)
  after  (pagination cursor)
  archived (false par defaut)
```

### Recuperer un form par ID

```http
GET https://api.hubapi.com/marketing/v3/forms/{formId}
Authorization: Bearer pat-na1-xxxxxxxxx
```

`{formId}` = le `formGuid` (UUID v4 affiche dans l'URL HubSpot du form).

> Comment trouver `formId` : dans HubSpot UI → Marketing → Forms → ouvrir le form → l'URL contient `/forms/{formId}/edit`.

---

## Schema de reponse

```json
{
  "id": "d9afc0c5-1234-5678-9abc-def012345678",
  "name": "Contact LMNP - Landing",
  "createdAt": "2026-01-15T10:30:00Z",
  "updatedAt": "2026-04-20T14:22:00Z",
  "archived": false,
  "formType": "hubspot",
  "fieldGroups": [
    {
      "groupType": "default_group",
      "richTextType": "text",
      "fields": [
        {
          "objectTypeId": "0-1",
          "name": "email",
          "label": "Email",
          "required": true,
          "hidden": false,
          "fieldType": "email",
          "defaultValue": "",
          "placeholder": "vous@exemple.fr",
          "validation": {
            "blockedEmailDomains": ["mailinator.com"],
            "useDefaultBlockList": true
          }
        }
      ]
    }
  ],
  "configuration": {
    "language": "fr",
    "createNewContactForNewEmail": false,
    "postSubmitAction": {
      "type": "thank_you_message",
      "value": "Merci !"
    },
    "lifecycleStage": "lead",
    "captchaEnabled": false,
    "recaptchaEnabled": false,
    "notifyContactOwner": true,
    "notifyRecipients": ["email@nopillo.fr"]
  },
  "displayOptions": {
    "renderRawHtml": false,
    "theme": "default_style",
    "submitButtonText": "Envoyer",
    "style": {
      "fontFamily": "Arial, sans-serif",
      "backgroundWidth": "100%"
    },
    "cssClass": "hs-form"
  },
  "legalConsentOptions": {
    "type": "explicit_consent_to_process",
    "consentToProcessText": "J'accepte que mes donnees soient...",
    "communicationConsentText": "J'accepte de recevoir des emails marketing"
  }
}
```

---

## Types de champs (fieldType)

Valeurs possibles pour `fieldType` :

| fieldType | Description | Stockage HubSpot |
|-----------|-------------|------------------|
| `single_line_text` | Texte court | `string` |
| `multi_line_text` | Textarea | `string` |
| `email` | Email avec validation | `string` |
| `phone` | Telephone | `string` |
| `number` | Numerique | `number` |
| `date` | Date picker | `date` |
| `single_checkbox` | Case unique on/off | `enumeration` (bool) |
| `multiple_checkboxes` | Cases multiples | `enumeration` (multi) |
| `radio` | Boutons radio | `enumeration` |
| `dropdown` | Select | `enumeration` |
| `file` | Upload fichier | `file` |
| `hidden` | Champ cache | (any) |
| `rich_text` | Editeur WYSIWYG | `string` |

`objectTypeId` typiques :

| Code | Objet |
|------|-------|
| `0-1` | Contact |
| `0-2` | Company |
| `0-3` | Deal |
| `0-5` | Ticket |
| `0-7` | Product |

---

## Structure fieldGroups

`fieldGroups` est un tableau de groupes. Chaque groupe contient des `fields` qui sont rendus ensemble (souvent visuellement cote-a-cote).

```json
"fieldGroups": [
  {
    "groupType": "default_group",
    "richTextType": "text",
    "richText": "<p>Informations personnelles</p>",
    "fields": [
      { "name": "firstname", "label": "Prenom", "fieldType": "single_line_text" },
      { "name": "lastname",  "label": "Nom",    "fieldType": "single_line_text" }
    ]
  },
  {
    "groupType": "default_group",
    "fields": [
      { "name": "email", "label": "Email", "fieldType": "email", "required": true }
    ]
  }
]
```

`groupType` peut etre :
- `default_group` : groupe standard
- `progressive_profiling` : pour les forms intelligents qui changent les champs selon le visiteur connu

---

## Configuration object

Le bloc `configuration` controle le comportement post-soumission :

| Cle | Type | Description |
|-----|------|-------------|
| `language` | string | ISO 639-1 (`fr`, `en`, `es`) |
| `createNewContactForNewEmail` | boolean | Si `false`, met a jour le contact si email existe |
| `postSubmitAction.type` | enum | `thank_you_message` ou `redirect_url` |
| `postSubmitAction.value` | string | HTML du message OU URL de redirection |
| `lifecycleStage` | string | `subscriber`, `lead`, `mql`, `sql`, `customer` |
| `captchaEnabled` | boolean | reCAPTCHA Enterprise actif |
| `notifyContactOwner` | boolean | Notifier le proprio HubSpot du contact |
| `notifyRecipients` | string[] | Emails a notifier en plus |

---

## Exemples

### curl — lister les forms

```bash
curl -s -H "Authorization: Bearer $HUBSPOT_TOKEN" \
  "https://api.hubapi.com/marketing/v3/forms?limit=100" | jq '.results[] | {id, name, archived}'
```

### Node — recuperer la definition d'un form

```js
const res = await fetch(`https://api.hubapi.com/marketing/v3/forms/${formId}`, {
  headers: { Authorization: `Bearer ${process.env.HUBSPOT_TOKEN}` },
})
const form = await res.json()

// Construire dynamiquement un objet de champs attendus
const expectedFields = form.fieldGroups
  .flatMap(g => g.fields)
  .map(f => ({ name: f.name, required: f.required, type: f.fieldType }))
```

### Deno (Edge Function) — extraire les fields requis pour validation

```ts
const apiKey = Deno.env.get('HUBSPOT_API_KEY')!
const formId = '<formGuid>'

const res = await fetch(`https://api.hubapi.com/marketing/v3/forms/${formId}`, {
  headers: { Authorization: `Bearer ${apiKey}` },
})
const form = await res.json()
const requiredFields = form.fieldGroups
  .flatMap((g: any) => g.fields)
  .filter((f: any) => f.required)
  .map((f: any) => f.name)
```

## Sources

- [HubSpot Forms API v3 reference](https://developers.hubspot.com/docs/reference/api/marketing/forms/v3) — endpoint et schema
- [HubSpot legacy docs - get_forms v2](https://legacydocs.hubspot.com/docs/methods/forms/v2/get_forms) — v2 (redirigee vers v3 sur le nouveau site)
- [HubSpot property field types](https://knowledge.hubspot.com/properties/property-field-types-in-hubspot) — fieldType reference
- [Find your form GUID](https://knowledge.hubspot.com/forms/find-your-form-guid) — comment recuperer le formId
