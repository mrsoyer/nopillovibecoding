# 04 — Livrable PM : Crea TON skill custom

> Brief a distribuer en print A4 a 14h30, juste apres la theorie. 2h pour creer 1 skill. C'est LE livrable de la journee : ils repartent avec un artefact perso dans `.claude/skills/`.

## La promesse

A la fin de la journee, tu auras **ton skill custom** dans `.claude/skills/[nom]/` que tu pourras :
- Reutiliser dans tous tes futurs projets
- Montrer a ton boss / equipe comme un livrable concret
- Faire evoluer dans tes sessions coaching J+7 / J+14

## Step 1 — Identifier TON workflow (15 min, en solo)

**Question** : quel workflow tu fais **regulierement** dans ton metier qui te prend du temps et que tu pourrais industrialiser ?

Reprends ton brief perso envoye en pre-work, et complete cette grille :

```
┌────────────────────────────────────────────────────┐
│ NOM (1 verbe en kebab-case)                        │
│ ex: deploy-staging, audit-lcp, translate-fr        │
│                                                    │
│ → _______________________________________________  │
├────────────────────────────────────────────────────┤
│ TRIGGER (quand l'utiliser ?)                       │
│ ex: "deploy", "audit perf", "traduire en anglais"  │
│                                                    │
│ → _______________________________________________  │
├────────────────────────────────────────────────────┤
│ INPUT (ce que l'user fournit)                      │
│ ex: rien / un chemin / un texte                    │
│                                                    │
│ → _______________________________________________  │
├────────────────────────────────────────────────────┤
│ OUTPUT (ce que l'user recoit)                      │
│ ex: rapport markdown, fichier modifie, deploy URL  │
│                                                    │
│ → _______________________________________________  │
├────────────────────────────────────────────────────┤
│ ETAPES (5-8 max)                                   │
│ 1. _______________________________________________ │
│ 2. _______________________________________________ │
│ 3. _______________________________________________ │
│ 4. _______________________________________________ │
│ 5. _______________________________________________ │
└────────────────────────────────────────────────────┘
```

**Si bloque** : le formateur passe en 1-to-1 pour t'aider a cadrer.

## 12 idees de skills (si tu n'as pas d'idee)

| Skill | Verbe | Ce qu'il fait |
|---|---|---|
| `audit-lcp` | auditer | Lance Lighthouse + propose 3 optimisations |
| `deploy-staging` | deployer | Deploie branche staging Netlify + smoke test |
| `clone-section` | cloner | Duplique une section avec variations contenu |
| `add-faq` | ajouter | Ajoute une FAQ a partir d'une liste questions |
| `translate-fr-en` | traduire | Traduit composants FR → EN |
| `scan-broken-links` | scanner | Trouve `href="#"` ou URLs cassees |
| `generate-favicon` | generer | Cree favicon a partir d'un emoji ou initiale |
| `add-section` | ajouter | Ajoute section type (testimonials, FAQ, pricing) |
| `seo-audit` | auditer | Verifie meta, schema.org, sitemap, robots |
| `mobile-check` | tester | Tour des breakpoints (375, 768, 1024, 1440) |
| `form-validator` | valider | Verifie tous les forms ont validation client + serveur |
| `dx-improve` | ameliorer | Ajoute eslint, prettier, husky a un projet |

**Choisis-en UN qui te parle.** Pas le plus ambitieux. Le plus utile **pour toi demain**.

## Step 2 — Generer le squelette du skill (15 min)

Dans le terminal du projet, demander a Claude :

```
Cree un skill custom dans .claude/skills/[nom]/SKILL.md avec :

- name: [ton nom kebab-case]
- description: [decrire ce qu'il fait + "Use when X, Y, Z" avec 3 triggers explicites]
- allowed-tools: [Read, Write, Edit, Bash, et eventuellement mcp__claude_ai_supabase__*]
- model: sonnet
- effort: low|medium|high

Le skill doit avoir [N] etapes :
1. [etape 1]
2. [etape 2]
...

Pour chaque etape : commande exacte, verification, gestion d'erreur.

Cree aussi un dossier `references/` vide pour mes notes futures.
```

Claude te genere le fichier. **NE LE LANCE PAS ENCORE**.

## Step 3 — Tester le skill EN VRAI (45 min)

C'est ici qu'on voit si ton skill est bien concu.

1. **Lancer le skill** dans la conversation Claude Code :
   ```
   /[ton-nom-de-skill]
   ```
   ou en langage naturel : "audit la performance LCP"

2. **Observer** : Claude execute les etapes ? Manque-t-il des verifications ? Trop d'etapes ?

3. **Iterer** : modifier `SKILL.md` pour :
   - Ajouter des verifications manquantes
   - Clarifier les etapes ambigues
   - Decouper les etapes trop longues
   - Ajouter gestion d'erreur

4. **Re-tester** : relancer le skill, voir si le comportement est ameliore.

**Cycle** : test → ajuste → re-test. Au moins 3 iterations.

## Step 4 — Ecrire un test cas concret (15 min)

Documente **1 cas reel** ou tu lances ton skill.

Ajouter en bas de `SKILL.md` :

```markdown
## Exemple d'utilisation

User : "audit la performance de la page d'accueil"

Skill execute :
1. cd front && npm run build → OK (12s)
2. npm run preview → port 4322
3. lighthouse http://localhost:4322 → Performance 78
4. Identification 3 issues :
   - LCP : 3.2s (image hero 800ko)
   - Bundle JS : 120ko (au-dela du seuil 50ko)
   - CLS : 0.15 (hero shift au load)
5. Output : docs/audit-2026-05-26.md

Resultat : audit complet en 90s, vs 15-20 min manuel.
```

Sans cas concret, ton skill reste theorique.

## Step 5 — Preparer demo (10 min, optionnel pour code review)

Si tu veux presenter ton skill a 16h30 :

- Avoir ton terminal pret avec le projet ouvert
- Pouvoir lancer le skill en 1 commande
- 3 points a souligner :
  - Pourquoi tu l'as fait (le pain point)
  - Comment ca fonctionne (les etapes cles)
  - Le gain de temps mesure

## Criteres de validation (autocheck)

Avant 16h30 (code review), verifie :

- [ ] **Frontmatter complet** : name, description (avec triggers !), allowed-tools, model
- [ ] **Description avec "Use when X, Y, Z"** : 3 triggers explicites
- [ ] **5-8 etapes** : pas 2, pas 20
- [ ] **Etape = action concrete** : pas "Reflechir a X" mais "Lancer commande X"
- [ ] **Verifications integrees** : chaque etape a une condition de succes
- [ ] **Gestion erreur** : que se passe-t-il si l'etape 3 echoue ?
- [ ] **1 exemple concret** documente en bas
- [ ] **Teste sur 1 vrai cas** au moins 1x
- [ ] **Place dans `.claude/skills/[nom]/SKILL.md`**

## Anti-patterns frequents (a eviter)

| Anti-pattern | Symptome | Fix |
|---|---|---|
| Description vague | Claude ne declenche pas le skill | Ajouter triggers explicites |
| Trop d'etapes | Claude perd le fil mi-skill | Decouper en 2 skills |
| Pas de verification | Skill echoue silencieusement | Ajouter `verification:` apres chaque etape |
| Allowed-tools = * | Skill peut tout faire, dangereux | Lister precisement les tools |
| Pas de cas concret | Skill reste theorique | Documenter 1 exemple reel |
| Skill = generique | Reutilise jamais | Le rendre specifique a TON workflow |

## Sources d'inspiration

Va voir ces skills existants pour comprendre la structure :

- [.claude/skills/context-guardian/SKILL.md](../../nopillo-landing-exemple/.claude/skills/context-guardian/SKILL.md) — skill simple bien documente
- [.claude/skills/init-landing-stack/SKILL.md](../../.claude/skills/init-landing-stack/SKILL.md) — skill avance (10-12 min execution)
- [.claude/skills/apply-nopillo-ds/SKILL.md](../../.claude/skills/apply-nopillo-ds/SKILL.md) — skill de transformation
- [docs/claude-code-rules/04-skills-vs-rules.md](../claude-code-rules/04-skills-vs-rules.md) — theorie skills

## Sources

- [docs/cdc-skill-init-landing/](../cdc-skill-init-landing/) — CDC d'un skill complet
- [Skill authoring best practices](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices)
