# Rules Back

Rules path-scoped pour les fichiers `supabase/**` (edge functions Supabase).

Chaque rule documente UNE edge function et se charge automatiquement quand Claude touche les fichiers de la function correspondante.

## Convention de nommage

| Type source | Nom de fichier rule |
|-------------|---------------------|
| `supabase/functions/{function-name}/**` | `{function-name}.md` |

## Generer une rule

Utilise le skill `rule-maker` :

```
/rule-maker supabase/functions/contact-form/index.ts
```

ou en langage naturel :

```
documente l'edge function contact-form
```

## References

- Template : `.claude/skills/rule-maker/references/templates-back.md`
- Doc complete : `docs/claude-code-rules/`
