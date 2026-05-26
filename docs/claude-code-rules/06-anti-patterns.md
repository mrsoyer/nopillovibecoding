# Anti-Patterns — Erreurs Courantes a Eviter

## Table des Matieres
1. [Anti-patterns CLAUDE.md](#anti-patterns-claude-md)
2. [Anti-patterns rules](#anti-patterns-rules)
3. [Anti-patterns skills](#anti-patterns-skills)
4. [Anti-patterns de structure](#anti-patterns-de-structure)
5. [Anti-patterns de session](#anti-patterns-de-session)

## Anti-patterns CLAUDE.md

### Le CLAUDE.md de 1200 lignes
**Symptome** : Token usage explose (~42K tokens par conversation). Claude commence a ignorer les regles.
**Cause** : Tout est entasse dans CLAUDE.md, sections accumulees, jamais nettoyees.
**Fix** : Audit + classification :
- Universel (~15%) → reste dans CLAUDE.md
- Specifique a un dossier (~60%) → `.claude/rules/[nom].md` avec `paths:`
- Procedure repetable (~15%) → `.claude/skills/[verbe]/SKILL.md`
- Obsolete (~10%) → supprimer

### Les regles negatives en serie
**Symptome** : "Don't use var. Don't use any. Don't use console.log. Don't use eval. Don't use..."
**Cause** : Reaction aux erreurs passees au lieu de directives positives.
**Fix** : Reformuler positif. "Use const/let, strict TypeScript, structured logging."

### La liste exhaustive de fichiers
**Symptome** : CLAUDE.md liste 30 fichiers du projet avec leur role.
**Cause** : Pensee de "documentation README" plaquee sur CLAUDE.md.
**Fix** : Patterns generaux uniquement. Claude peut lire les fichiers.

### Le schema DB inline
**Symptome** : 50 lignes de SQL DDL dans CLAUDE.md.
**Cause** : Volonte de tout avoir "sous les yeux".
**Fix** : `docs/db/schema.md`, link depuis CLAUDE.md via `@docs/db/schema.md` ou simplement mention.

### Les Phases / TODO dans CLAUDE.md
**Symptome** : "Phase 1 : auth. Phase 2 : payments. TODO : refactor..."
**Cause** : Confusion entre etat projet et contexte permanent.
**Fix** : `docs/roadmap.md` ou `docs/todo.md`. Pas dans CLAUDE.md.

## Anti-patterns Rules

### La rule globale qui devrait etre scopee
**Symptome** : `.claude/rules/api-design.md` SANS `paths:` est chargee a chaque session, meme quand tu bosses sur le front.
**Cause** : Oubli du `paths:` frontmatter.
**Fix** : Ajouter `paths: ["supabase/**", "front/src/lib/api/**"]`.

### Le `paths:` qui matche tout
**Symptome** : `paths: ["**/*"]` ou `paths: ["src/**"]` qui match 80% du projet.
**Cause** : Mauvaise comprehension du scoping.
**Fix** : Glob precis. Si la rule s'applique a tout, c'est CLAUDE.md ou une rule globale.

### La rule fourre-tout
**Symptome** : Un fichier `frontend.md` qui couvre styling + perf + a11y + state management.
**Cause** : Refus de splitter.
**Fix** : 1 fichier = 1 sujet. `code-style.md`, `performance.md`, `accessibility.md`.

### La rule sans `paths:` qui contient de la doc
**Symptome** : 200 lignes de tutorial dans `.claude/rules/onboarding.md`.
**Cause** : Confusion rules vs docs.
**Fix** : Sortir dans `docs/`. Une rule = quelques contraintes courtes. Un tutorial = un skill ou docs.

### Le `paths:` non synchronise avec le code
**Symptome** : `paths: ["front/src/components/OldName.tsx"]` mais le fichier a ete renomme.
**Cause** : Pas de revue periodique.
**Fix** : Audit trimestriel des rules. Supprimer celles dont le fichier source n'existe plus.

### Compter sur les `paths:` pour la securite
**Symptome** : Rule contient un secret "scope a un fichier".
**Cause** : Bugs connus (Issue #16299) — `paths:` parfois charge globalement.
**Fix** : JAMAIS de secret dans une rule. Utiliser env vars + hooks pour secrets.

## Anti-patterns Skills

### Description vague
**Symptome** : `description: "Helps with documents"` ou `"Does stuff with files"`.
**Cause** : Pas de comprehension que description = trigger.
**Fix** : Description "pushy", verbe d'action + WHEN explicite :
```yaml
description: "Extract text and tables from PDF files, fill forms, merge documents. Use when working with PDF files or when the user mentions PDFs, forms, or document extraction."
```

### Description en premiere personne
**Symptome** : `description: "I can help you process Excel files"`.
**Cause** : Habitude de chat.
**Fix** : Troisieme personne imperative. `"Processes Excel files and generates reports."`

### Skills > 500 lignes
**Symptome** : SKILL.md qui fait 800 lignes avec toute la doc inline.
**Cause** : Pas de progressive disclosure.
**Fix** : SKILL.md < 500 lignes (cible < 300). Detail dans `references/`, scripts dans `scripts/`.

### References imbriquees (deeply nested)
**Symptome** : SKILL.md → `advanced.md` → `details.md` → contenu reel.
**Cause** : Architecture trop hierarchique.
**Fix** : Tous les references referenceables DIRECTEMENT depuis SKILL.md (1 niveau de profondeur).

### Skills pour faire ce que CLAUDE.md ou rule devrait faire
**Symptome** : `.claude/skills/use-typescript-strict/SKILL.md` qui dit juste "Use strict mode".
**Cause** : Sur-utilisation des skills pour des regles statiques.
**Fix** : C'est une regle, pas une procedure. → `.claude/rules/code-style.md`.

### Slash commands en anti-pattern
**Symptome** : 30 slash commands custom pour des actions simples.
**Cause** : Refus de construire un CLAUDE.md + agent intuitif.
**Fix** : Slash commands = raccourcis personnels, pas remplacement d'un meilleur tooling.

## Anti-patterns de Structure

### `.claude/rules/` confondu avec `docs/`
**Symptome** : Documentation complete (guides, references) dans `.claude/rules/`.
**Cause** : Confusion entre "regles" et "documentation".
**Fix** :
- `.claude/rules/` = regles courtes, scope-able, chargees en contexte
- `docs/` = documentation reference, lue a la demande
- Un guide 200 lignes ? `docs/`. Une contrainte 10 lignes ? `rules/`.

### Skill qui contient ce qui devrait etre dans references/
**Symptome** : SKILL.md inline tout le contenu, pas de `references/` folder.
**Cause** : Refus de split.
**Fix** : SKILL.md = orchestrateur. `references/*.md` = contenu detaille.

### Pas de `_index.md` dans `docs/[sujet]/`
**Symptome** : `docs/api/` avec 10 fichiers sans index. Claude ne sait pas par ou commencer.
**Cause** : Pas de convention.
**Fix** : `_index.md` obligatoire dans chaque dossier de docs/. Liste les fichiers + 1 ligne par fichier.

## Anti-patterns de Session

### La kitchen sink session
**Symptome** : 1 conversation = 5 taches differentes. Contexte pollue.
**Cause** : Pas de `/clear`.
**Fix** : `/clear` entre taches non liees. Contexte propre = decisions meilleures.

### Le correcting over and over
**Symptome** : Claude se trompe, tu corriges 2x, il se trompe encore, tu corriges encore.
**Cause** : Context pollue par les approches echouees.
**Fix** : Apres 2 corrections, `/clear` + reformule le prompt initial avec ce que tu as appris.

### Infinite exploration
**Symptome** : "Investigate" sans scope. Claude lit 100 fichiers.
**Cause** : Pas de delegation a subagent.
**Fix** : Use subagent (Task tool) pour exploration → main context propre.

### Trust-then-verify gap
**Symptome** : Code "plausible" qui ne marche pas en prod (edge cases manques).
**Cause** : Pas de verification.
**Fix** : TOUJOURS fournir un moyen de verifier (test, screenshot, build).

## Anti-patterns Specifiques Landing

### Documenter le HTML semantique
**Symptome** : Rule qui dit "use h1 for title, p for paragraph".
**Cause** : Sur-explication.
**Fix** : Claude le sait deja. Documenter UNIQUEMENT les conventions specifiques au projet.

### Rules pour Tailwind general
**Symptome** : Rule qui re-explique Tailwind.
**Cause** : Confusion entre framework knowledge et conventions projet.
**Fix** : Documenter UNIQUEMENT les tokens custom (`bg-brand-primary`), pas les utilitaires standards.

### Rule edge function sans schema input/output
**Symptome** : Rule generale "this is contact-form function".
**Cause** : Doc trop floue.
**Fix** : Inputs (table), outputs (table), side effects (liste). Sinon ca n'aide pas Claude.

### Pas synchroniser front/back rules
**Symptome** : Rule front dit "field email", rule back dit "field user_email".
**Cause** : Pas de revue cross-rules.
**Fix** : Quand tu touches une rule front/X, verifier la rule back/X correspondante.

## Sources

- [Best practices for Claude Code — Avoid common failure patterns](https://code.claude.com/docs/en/best-practices#avoid-common-failure-patterns)
- [My CLAUDE.md Was Eating 42,000 Tokens](https://medium.com/@cem.karaca/my-claude-md-was-eating-42-000-tokens-per-conversation-heres-how-i-fixed-it-85ffba809bd4) — Anti-patterns CLAUDE.md
- [Skill authoring best practices — Anti-patterns to avoid](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices#anti-patterns-to-avoid)
- [Context Engineering with Claude Code](https://claudefa.st/blog/guide/mechanics/context-engineering) — Failure modes
