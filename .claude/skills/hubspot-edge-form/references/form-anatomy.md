# Anatomie d'un render-definition HubSpot v4

> Structure du JSON retourne par `GET /embed/v4/render-definition/{portalId}/{formId}`. Source : observation directe + endpoint public, mai 2026.

## Structure top-level

```json
{
  "portalId": 26173790,
  "form": {
    "id": "107536bf-c2cb-44de-89ea-8c3101f83870",
    "type": 0,
    "modules": [ /* arbre de modules */ ],
    "logicRules": { /* show/hide conditions */ },
    "lastUpdatedAt": 1769527242894
  },
  "postSubmit": {
    "modules": [ /* what to show after submit */ ]
  },
  "settings": {
    "enabledLiveValidation": true,
    "locale": "FR",
    "shortenForm": false
  },
  "style": { /* CSS theming */ },
  "translations": { /* i18n strings */ },
  "isPublished": true
}
```

## Walk recursif des modules

L'arborescence est imbriquee : `step > row > fieldModule`. Pour extraire tous les champs, walk recursivement :

```ts
type Module = { type: string; id?: number | string; modules?: Module[]; [k: string]: unknown }

function walkFieldModules(modules: Module[]): Module[] {
  const out: Module[] = []
  for (const m of modules) {
    if (isFieldType(m.type)) {
      out.push(m)
    }
    if (Array.isArray(m.modules)) {
      out.push(...walkFieldModules(m.modules))
    }
  }
  return out
}

const FIELD_TYPES = new Set([
  'email', 'single_line_text', 'multi_line_text', 'phone', 'number', 'date',
  'dropdownSelect', 'radio', 'single_checkbox', 'multiple_checkboxes',
  'file', 'rich_text', 'hidden',
])

function isFieldType(t: unknown): boolean {
  return typeof t === 'string' && FIELD_TYPES.has(t)
}
```

> **Skip** : modules `type: "step"`, `"row"`, `"navigationRow"`, `"submitButton"`, `"richText"` ne sont pas des inputs.

## Anatomie d'un field module

### email

```json
{
  "type": "email",
  "id": 3,
  "label": "E-mail",
  "required": false,
  "propertyReference": "0-1/email",
  "description": "",
  "conditionallyHidden": false,
  "triggerDependentRulesOnLoad": false
}
```

### single_line_text / multi_line_text

```json
{
  "type": "single_line_text",
  "id": 5,
  "label": "Prénom",
  "required": true,
  "propertyReference": "0-1/firstname",
  "placeholder": "Jean",
  "description": ""
}
```

### dropdownSelect

```json
{
  "type": "dropdownSelect",
  "id": 2940659449371,
  "label": "Où en êtes-vous ?",
  "required": false,
  "propertyReference": "0-1/maturite_du_projet",
  "options": [
    { "label": "Je débute ma réflexion", "value": "Je débute ma réflexion", "selected": false },
    { "label": "J'ai un projet d'achat", "value": "J'ai un projet d'achat", "selected": false }
  ],
  "placeholder": "",
  "showDropdownSearch": true
}
```

### radio

```json
{
  "type": "radio",
  "id": 7,
  "label": "Civilite",
  "required": true,
  "propertyReference": "0-1/civilite",
  "options": [
    { "label": "M.", "value": "M.", "selected": false },
    { "label": "Mme", "value": "Mme", "selected": false }
  ]
}
```

### single_checkbox

```json
{
  "type": "single_checkbox",
  "id": 9,
  "label": "J'accepte les CGU",
  "required": true,
  "propertyReference": "0-1/cgu_accepted",
  "value": true
}
```

### multiple_checkboxes

```json
{
  "type": "multiple_checkboxes",
  "id": 11,
  "label": "Centres d'interet",
  "required": false,
  "propertyReference": "0-1/interests",
  "options": [
    { "label": "Fiscalite", "value": "Fiscalite" },
    { "label": "Patrimoine", "value": "Patrimoine" }
  ]
}
```

## propertyReference

Format : `{objectTypeId}/{internalName}`.

| objectTypeId | Objet HubSpot |
|--------------|---------------|
| `0-1` | Contact |
| `0-2` | Company |
| `0-3` | Deal |
| `0-5` | Ticket |
| `0-7` | Product |

Le `internalName` (apres le `/`) est le **nom de la property** a envoyer dans le submission payload.

```ts
function parsePropertyRef(ref: string): { objectTypeId: string; name: string } {
  const [objectTypeId, ...rest] = ref.split('/')
  return { objectTypeId, name: rest.join('/') }
}
```

## Logique conditionnelle (logicRules)

```json
{
  "form": {
    "logicRules": {
      "3341624270874": {
        "id": 3341624270874,
        "order": 1,
        "action": { "type": "showElement" },
        "filter": {
          "type": "group",
          "branchType": "or",
          "filters": [{
            "type": "group",
            "branchType": "and",
            "filters": [{
              "type": "filter",
              "moduleId": 2940659449371,
              "propertyReference": "0-1/maturite_du_projet",
              "operation": {
                "type": "enumeration",
                "operator": "isAnyOf",
                "values": ["Je débute ma réflexion", "J'ai une promesse de vente"]
              }
            }]
          }]
        }
      }
    }
  }
}
```

Les fields qui ont `controllingRuleIds` ou `dependentRuleIds` participent a une regle. Lire `conditionallyHidden: true` indique un field cache par defaut.

**Pour l'Edge Function** : ces conditions sont gerees cote front (UI). Server-side, on accepte simplement les valeurs si fournies, on ne re-valide pas la logique.

## Extraction des enums

Pour generer un `as const` TypeScript :

```ts
function extractEnumValues(field: Module): string[] {
  if (!Array.isArray(field.options)) return []
  return field.options
    .map((opt: any) => opt.value)
    .filter((v: unknown): v is string => typeof v === 'string')
}

// Usage
const enumMaturite = extractEnumValues(maturiteField)
// → ["Je débute ma réflexion", "J'ai un projet d'achat", ...]
```

## Cas particuliers

1. **Field cache par defaut (`conditionallyHidden: true`)** : on accepte la value si fournie. Server-side n'a pas a appliquer la logique.

2. **`type: "rich_text"`** : ce n'est PAS un input mais un bloc de texte affiche. Ignorer.

3. **`type: "hidden"`** : un input invisible avec value preset. A respecter mais souvent rempli via JS cote landing.

4. **Field sans `propertyReference`** : ignorer, c'est probablement un module decoratif.

5. **Form multistep** : le top-level `form.modules` contient plusieurs `step`. Walk tous les steps : meme traitement.

6. **`required` peut etre `false` partout** : HubSpot accepte une submission avec aucun champ rempli (mais retourne erreur si validation echoue cote workflow). Toujours exiger au minimum 1 champ dans l'Edge Function.
