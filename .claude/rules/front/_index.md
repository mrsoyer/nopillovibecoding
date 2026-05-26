# Rules Front

Rules path-scoped pour les fichiers `front/src/**` (pages Astro, layouts, composants, islands React).

Chaque rule documente UN element discret du projet et se charge automatiquement quand Claude touche le fichier source correspondant.

## Convention de nommage

| Type source | Nom de fichier rule |
|-------------|---------------------|
| `front/src/pages/{slug}.astro` | `pages-{slug}.md` |
| `front/src/layouts/{nom}.astro` | `layouts-{nom}.md` |
| `front/src/components/{Nom}.astro` | `{nom-kebab}.md` |
| `front/src/components/{Nom}.tsx` | `{nom-kebab}.md` |

## Generer une rule

Utilise le skill `rule-maker` :

```
/rule-maker front/src/components/Hero.astro
```

ou en langage naturel :

```
documente le composant front/src/components/ContactForm.tsx
```

## References

- Templates et patterns : `.claude/skills/rule-maker/references/`
- Doc complete : `docs/claude-code-rules/`
