# 06 — Lancer la landing en local

## Etape finale : voir la landing tourner sur ton ordinateur.

## Etape 1 — Installer les dependances npm

```bash
cd nopillo-landing-exemple/front
npm install
```

Patiente 1-3 minutes. Tu devrais voir defiler des packages, puis a la fin :

```
added 215 packages in 45s
```

**Erreur "EACCES" ou "permission denied"** ? Mac : essayer `sudo npm install` (mais c'est anti-pattern, plutot setup nvm). Windows : ouvrir PowerShell en admin.

## Etape 2 — Lancer le dev server

```bash
npm run dev
```

Tu devrais voir :

```
  astro  v6.3.7 ready in 487 ms

  ┃ Local    http://localhost:4321/
  ┃ Network  use --host to expose

22:34:12 watching for file changes...
```

## Etape 3 — Ouvrir dans le browser

Clique sur `http://localhost:4321/` (ou tape l'URL dans Chrome/Firefox).

Tu dois voir la landing Nopillo avec :
- Headband orange "Outil gratuit"
- Logo "nopillo"
- Hero "Simplifiee. Optimisee."
- Quiz a droite
- Section StatsBar (24M EUR / 12000 / 95%)
- Et toutes les autres sections jusqu'au footer

## Etape 4 — Tester le formulaire (verification end-to-end)

1. Scroller jusqu'a la section "Recevez votre simulation gratuite"
2. Remplir :
   - Prenom : Test
   - Email : test@example.com (ou ton vrai email)
3. Cliquer "Recevoir ma simulation gratuite"
4. Tu dois voir : **"Merci !"** + message de confirmation

Verifier que le lead est bien en DB :

```bash
# Dans un autre terminal, depuis nopillo-landing-exemple/
supabase db query "SELECT * FROM public.leads ORDER BY created_at DESC LIMIT 1"
```

OU dans Claude Code :
> "Liste les 3 derniers leads de mon Supabase"

OU dans le dashboard Supabase :
- Supabase Dashboard → Table Editor → `leads` → tu dois voir ton lead test

---

## DKI (Dynamic Keyword Insertion) — Bonus

Le projet supporte les URL params Google Ads. Teste :

```
http://localhost:4321/?utm_term=expert+comptable+LMNP&searchterm=expert+comptable+LMNP+Paris
```

Le H1 doit afficher :
- "Votre **Expert Comptable LMNP** a **Paris**, en ligne."

## Hot reload

Edite n'importe quel fichier dans `front/src/` → la page se recharge automatiquement.

Essaie : ouvrir `front/src/components/sections/Hero.astro`, changer "Calculer mes economies" en autre chose, sauvegarder → la page se met a jour en < 1s.

## Arreter le dev server

Dans le terminal : `Ctrl+C` (Mac & Windows).

---

## Lancer le build prod (verification)

```bash
npm run build
```

Tu dois voir :

```
22:34:30 [build] Complete!
22:34:30 [build] 1 page(s) built in 1.10s
```

Le build genere `front/dist/`. Pour le tester :

```bash
npm run preview
```

→ http://localhost:4321/ avec le build optimise (plus rapide que dev).

---

## Resume etat final

A la fin de cette etape, tu dois avoir :

- ✅ `npm install` reussi (`node_modules/` existe)
- ✅ `npm run dev` lance le serveur sur http://localhost:4321
- ✅ La page s'affiche correctement (toutes les sections)
- ✅ Le formulaire submit OK et insere dans TON Supabase
- ✅ Hot reload fonctionne quand tu edites
- ✅ `npm run build` reussit en < 5s

## Si quelque chose ne marche pas

→ [07-troubleshooting.md](07-troubleshooting.md) avec les erreurs frequentes.

## Suivant (apres la landing)

Tu peux maintenant :
- Editer les sections (`front/src/components/sections/*`)
- Changer les tokens DS (`front/src/styles/tokens.css`)
- Ajouter de nouvelles pages dans `front/src/pages/`
- Demander a Claude Code de t'aider via les MCPs configures

## Sources

- [Astro CLI Reference](https://docs.astro.build/en/reference/cli-reference/)
- [Astro Connection Refused fix](https://markaicode.com/errors/astro-connection-refused-error-fix/)
