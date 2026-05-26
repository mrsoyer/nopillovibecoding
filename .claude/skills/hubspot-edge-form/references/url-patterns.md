# URL Patterns HubSpot

## Patterns d'URL acceptes

Tous les patterns ci-dessous sont supportes. La regex unique extrait `portalId`, `formId`, et `region`.

### 1. New editor (v4, par defaut depuis 2024)

```
https://app-eu1.hubspot.com/forms/26173790/new-editor/107536bf-c2cb-44de-89ea-8c3101f83870
https://app-na1.hubspot.com/forms/12345678/new-editor/abc12345-...
https://app.hubspot.com/forms/12345678/new-editor/abc12345-...
```

Pattern : `https://app(-[a-z]+\d+)?.hubspot.com/forms/{portalId}/new-editor/{formId}`

### 2. Classic editor

```
https://app-eu1.hubspot.com/forms/26173790/107536bf-c2cb-44de-89ea-8c3101f83870/edit
https://app.hubspot.com/forms/12345678/abc12345-.../edit
```

Pattern : `https://app(-[a-z]+\d+)?.hubspot.com/forms/{portalId}/{formId}/edit`

### 3. Form performance (read-only)

```
https://app-eu1.hubspot.com/forms/26173790/107536bf-c2cb-44de-89ea-8c3101f83870/performance
```

### 4. Share URL (publique)

```
https://share.hsforms.com/{shortId}/{formId}
https://share-eu1.hsforms.com/{shortId}/{formId}
```

Note : le `shortId` n'est PAS le portalId. Pour cette URL, demander le portalId via AskUserQuestion.

## Regex unifiee (parse les 3 premiers patterns)

```bash
# Bash
URL="https://app-eu1.hubspot.com/forms/26173790/new-editor/107536bf-c2cb-44de-89ea-8c3101f83870"

# Extract region (group 1, optionnel "-eu1", "-na1", etc.)
REGION=$(echo "$URL" | sed -nE 's|https://app(-[a-z]+[0-9]+)?\.hubspot\.com/forms/.*|\1|p' | sed 's/^-//')
[ -z "$REGION" ] && REGION="us"

# Extract portalId (group apres /forms/)
PORTAL=$(echo "$URL" | sed -nE 's|.*hubspot\.com/forms/([0-9]+)/.*|\1|p')

# Extract formId (UUID v4)
FORM=$(echo "$URL" | grep -oE '[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}')

echo "Region: $REGION | Portal: $PORTAL | Form: $FORM"
```

## Regions HubSpot

| Region | Suffix URL app | API hostname |
|--------|----------------|--------------|
| US (default) | `app.hubspot.com` (pas de suffix) | `api.hsforms.com` |
| EU 1 | `app-eu1.hubspot.com` | `api-eu1.hsforms.com` |
| NA 1 | `app-na1.hubspot.com` | `api-na1.hsforms.com` |
| AU 1 | `app-au1.hubspot.com` | `api-au1.hsforms.com` |

> **Astuce** : meme si tu connais la region, tente d'abord `api.hsforms.com` (US). HubSpot redirige automatiquement (HTTP 307) vers la bonne region pour les forms valides.

## Validation runtime

```ts
function validateInput(portalId: string, formId: string): string | null {
  if (!/^\d{6,12}$/.test(portalId)) {
    return 'Portal ID invalide (attendu : 6-12 chiffres)'
  }
  if (!/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/i.test(formId)) {
    return 'Form ID invalide (attendu : UUID v4)'
  }
  return null
}
```

## Pieges connus

1. **URL avec `?utm_source=...` ou autres params** : la regex avec `{formId}` doit etre suivie de fin de chaine OU `/` OU `?` OU `#`. Utiliser `(?:[/?#]|$)`.

2. **Form supprime / inaccessible** : l'URL parse OK mais `render-definition` retourne 404. Toujours valider via la fetch en Phase 2.

3. **Personal account vs Hub** : le format URL est identique. Aucun parsing different requis.

4. **URL raccourcie hub.co** : pas un format standard HubSpot, ignorer et demander URL complete.
