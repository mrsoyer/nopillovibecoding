---
name: apply-nopillo-ds
description: Applique le DS Nopillo (88 tokens CSS, Tailwind preset, 6 composants Astro, Futura PT) sur projet Astro+Tailwind. Triggers "applique le DS Nopillo", "ajoute le DS Nopillo", "genere les composants Nopillo en Astro".
allowed-tools: Read, Write, Edit, Bash, Glob, Grep
model: sonnet
---

# Apply Nopillo DS — Design System Nopillo pour projet Astro + Tailwind

Tu appliques le design system Nopillo (88 variables CSS extraites de nopillo.com) sur un projet Astro existant. Tu génères les tokens, le preset Tailwind, le snippet Adobe Typekit (Futura PT) et 6 composants `.astro` prêts à l'emploi.

**Stack cible** : Astro 4-6 + Tailwind + (typiquement post `/init-landing-stack`).

**Hors scope** : Webflow (drop dans cette version), génération de pages complètes (uniquement composants atomiques).

## References disponibles

| Fichier | Quand le lire |
|---------|---------------|
| [references/ds-philosophy.md](references/ds-philosophy.md) | Avant de générer : comprendre la tonalité Nopillo (pills 999px, indigo electrique, container 1120px) |
| [references/tokens.md](references/tokens.md) | Phase 2-3 : valeurs exactes (couleurs, typo, spacing, radius, shadows) |
| [references/components-anatomy.md](references/components-anatomy.md) | Phase 5 : specs détaillées des 6 composants |
| [references/checklist-qa.md](references/checklist-qa.md) | Phase 6 : validation finale |

## Pré-requis

1. **Projet Astro** existant (créé typiquement par `/init-landing-stack` ou `npm create astro@latest`)
2. **Tailwind installé** (`@astrojs/tailwind` ou équivalent v4)
3. **Compte Adobe Fonts** accès au kit `c1b0b72bff15bb9715f23b2ce31c51654439d865` (Futura PT) — voir [references/ds-philosophy.md](references/ds-philosophy.md) pour fallback

## Workflow (6 phases)

### Phase 1 — Detect

Détecte la structure du projet :

```bash
# Cherche le dossier Astro racine
if [ -f "front/astro.config.mjs" ]; then ASTRO_DIR="front"
elif [ -f "astro.config.mjs" ]; then ASTRO_DIR="."
else echo "Projet Astro non détecté"; exit 1
fi

# Vérifie Tailwind
grep -q "@astrojs/tailwind\|tailwindcss" "$ASTRO_DIR/package.json" || echo "WARN: Tailwind non détecté"

# Vérifie src/ structure
ls "$ASTRO_DIR/src/components/" "$ASTRO_DIR/src/layouts/" "$ASTRO_DIR/src/styles/" 2>/dev/null
```

**Demander confirmation** à l'utilisateur du dossier détecté avant de modifier. Stocker `$ASTRO_DIR` pour les phases suivantes.

> Pourquoi : un faux positif sur un projet React/Vue casserait sa structure. Mieux confirmer.

### Phase 2 — Install tokens CSS

Copie le fichier de tokens (88 variables CSS) :

```bash
mkdir -p "$ASTRO_DIR/src/styles"
cp .claude/skills/apply-nopillo-ds/assets/tokens.css "$ASTRO_DIR/src/styles/tokens.css"
```

Importe les tokens dans le layout principal (ou crée `global.css`) :

```astro
---
// $ASTRO_DIR/src/layouts/Base.astro (haut du fichier)
import "../styles/tokens.css";
---
```

**Vérifier** : `grep -l "tokens.css" "$ASTRO_DIR/src/layouts/"` doit retourner au moins 1 fichier.

> Pourquoi importer dans le layout : garantit que les `--variables` sont disponibles globalement.

### Phase 3 — Install Tailwind preset

Génère ou injecte le preset Tailwind Nopillo :

```bash
cp .claude/skills/apply-nopillo-ds/assets/tailwind-preset.mjs "$ASTRO_DIR/tailwind.nopillo.preset.mjs"
```

Modifie `$ASTRO_DIR/tailwind.config.mjs` (ou `.cjs`) pour utiliser le preset :

```javascript
import nopilloPreset from './tailwind.nopillo.preset.mjs';

export default {
  presets: [nopilloPreset],
  content: ['./src/**/*.{astro,html,js,ts,jsx,tsx}'],
  // ...autres options projet
};
```

**Si le projet n'utilise pas Tailwind** : SKIP cette phase, prévenir l'utilisateur.

### Phase 4 — Adobe Typekit (Futura PT)

Ajoute le snippet Adobe Fonts dans le `<head>` du layout principal :

```bash
# Lire le snippet
TYPEKIT=$(cat .claude/skills/apply-nopillo-ds/assets/adobe-typekit.html)
```

Édite `$ASTRO_DIR/src/layouts/Base.astro` (ou `Layout.astro`) pour injecter dans `<head>` :

```html
<head>
  <!-- ... -->
  <link rel="stylesheet" href="https://use.typekit.net/c1b0b72bff15bb9715f23b2ce31c51654439d865.css">
  <!-- ... -->
</head>
```

**Anti-pattern** : ne JAMAIS embed `<script>` Adobe (CLS impact). Toujours `<link>`.

> Si pas d'accès Typekit Nopillo : remplacer par `'Futura'` (system fallback) dans tokens.css. La typo sera dégradée mais le DS reste cohérent.

### Phase 5 — Composants Astro

Copie les 6 templates `.astro` (depuis `assets/components/*.astro.tmpl` → renommer en `.astro`) :

```bash
mkdir -p "$ASTRO_DIR/src/components/nopillo"

for tmpl in .claude/skills/apply-nopillo-ds/assets/components/*.astro.tmpl; do
  name=$(basename "$tmpl" .astro.tmpl)
  cp "$tmpl" "$ASTRO_DIR/src/components/nopillo/${name}.astro"
done
```

Composants générés :
- `Button.astro` — 4 variants (primary, secondary, outline, ghost) + 3 sizes
- `Header.astro` — sticky avec headband orange optionnel
- `Footer.astro` — multi-colonnes
- `Hero.astro` — 2 colonnes (texte + visuel), display 60px
- `Card.astro` — translucide avec border indigo-100
- `CtaSection.astro` — fond indigo-600 + CTA blanc

Copie aussi le logo :

```bash
mkdir -p "$ASTRO_DIR/public"
cp .claude/skills/apply-nopillo-ds/assets/logo.svg "$ASTRO_DIR/public/logo-nopillo.svg"
```

**Vérifier** : `ls "$ASTRO_DIR/src/components/nopillo/"` doit lister 6 fichiers `.astro`.

> Pourquoi sous-dossier `nopillo/` : isole les composants DS des composants projet, facilite mise à jour du DS sans casser le projet.

### Phase 6 — Verify

Lance le dev server et vérifie qu'il démarre sans erreur :

```bash
cd "$ASTRO_DIR" && npm run dev > /tmp/astro-dev.log 2>&1 &
DEV_PID=$!
sleep 8

# Vérifier qu'il tourne
if curl -sf http://localhost:4321 > /dev/null; then
  echo "OK : dev server démarré"
else
  echo "FAIL : dev server n'a pas démarré"
  cat /tmp/astro-dev.log
fi

kill $DEV_PID 2>/dev/null
```

Charge [references/checklist-qa.md](references/checklist-qa.md) et passe la checklist :
- Tokens CSS importés dans le layout
- Tailwind preset chargé
- Adobe Typekit `<link>` présent
- 6 composants `nopillo/*.astro` existent
- Logo copié dans `/public`
- `npm run dev` démarre OK
- Page test affiche bien les variables (créer une page démo `/test-ds` optionnelle)

**Rapport final** :

```
APPLY NOPILLO DS : SUCCESS

PROJET DETECTE
  Astro dir   : <ASTRO_DIR>
  Tailwind    : OK / SKIP
  Layout      : Base.astro / Layout.astro

FICHIERS GENERES
  tokens.css                    : src/styles/tokens.css (88 variables)
  tailwind.nopillo.preset.mjs   : injecté dans tailwind.config.mjs
  Adobe Typekit                 : <link> ajouté dans Base.astro
  Composants                    : 6 fichiers .astro dans src/components/nopillo/
  Logo                          : public/logo-nopillo.svg

PROCHAINES ETAPES
  1. cd <ASTRO_DIR> && npm run dev
  2. Importer un composant : import Hero from '@/components/nopillo/Hero.astro'
  3. Créer une page de test pour valider visuellement
  4. (Optionnel) Personnaliser les valeurs Adobe Typekit si compte différent
```

## Règles importantes

- **Confirmation utilisateur avant Phase 2** : aucune modification de fichier projet sans accord
- **Préfixer les composants** dans `src/components/nopillo/` — jamais en racine `src/components/`
- **Tokens CSS source unique** : si conflit avec tokens existants du projet, demander à l'user (override / merge / skip)
- **Pas de modification de `astro.config.mjs`** : risque de casser la config projet
- **Pas de `npm install`** : le skill assume Tailwind déjà installé
- **Anti-pattern** : ne pas inliner les valeurs hex dans les composants — toujours utiliser les variables CSS

## Exemples d'output

### Exemple 1 — Projet propre

```
User: "applique le DS Nopillo à mon projet Astro"

Skill détecte : front/astro.config.mjs
→ Demande confirmation : "ASTRO_DIR = front. OK ?"
→ User : "ok"
→ Phase 2-5 exécutées
→ Rapport final affiché
→ Total : 1m30s
```

### Exemple 2 — Conflit tokens existants

```
User: "ajoute le DS Nopillo"

Skill détecte front/src/styles/tokens.css existant.
→ Affiche diff résumé
→ Demande : "override (recommandé), merge, ou skip ?"
→ User : "merge"
→ Skill suffixe en tokens.nopillo.css et l'import en plus
```

### Exemple 3 — Pas Tailwind

```
User: "applique le DS Nopillo"

Skill détecte projet Astro sans Tailwind.
→ Avertit : "Tailwind non détecté. Le preset sera skip. Tokens CSS + composants Astro fonctionneront mais sans utilities Tailwind. Continuer ?"
→ User : "oui"
→ Phase 3 skip, autres phases OK
```

## Source du DS

Toutes les valeurs proviennent de l'extraction réelle de [nopillo.com](https://www.nopillo.com/) effectuée le 2026-05-05 via Playwright MCP.

Documentation complète et à jour : `docs/design-system-extraction/nopillo-extracted/`.

Identifiants critiques :
- Adobe Typekit kit : `c1b0b72bff15bb9715f23b2ce31c51654439d865`
- Brand black : `#09090B`
- Brand primary (indigo) : `#4033DB`
- Container regular : `1120px`
- Radius card : `16px` / Radius pill : `999px`
- Shadow signature : `0 1px 10px rgba(0, 0, 0, 0.06)`
