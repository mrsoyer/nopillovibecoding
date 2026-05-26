# 01 — Pre-work J-3 (mail + checklist)

> A envoyer **J-3 mati**n a chaque participant inscrit. Relance J-1 matin si pas de retour. Sans pre-work : on perd 1h30 d'install en J0 et la journee s'ecroule.

## Mail a envoyer (template)

```
Objet : [Formation Vibecoding] Pre-work 20 min — a faire avant samedi

Salut [Prenom],

Pour qu'on demarre fort samedi a 9h sans perdre 1h30 d'install,
3 choses a preparer avant (~ 20 min total).

═══════════════════════════════════════
1. INSTALLS (10 min)
═══════════════════════════════════════

a) VSCode
   https://code.visualstudio.com → installer
   Verification : ouvrir VSCode

b) Node.js 18+
   https://nodejs.org → installer LTS
   Verification dans Terminal : node --version
   Doit retourner v18 ou superieur

c) Claude Code (CLI)
   Dans Terminal :
   npm install -g @anthropic-ai/claude-code

   Verification : claude --version
   Doit retourner la version

   → Me renvoyer un screenshot de ces 2 verifications.

═══════════════════════════════════════
2. COMPTES GRATUITS (5 min)
═══════════════════════════════════════

Tous gratuits, OAuth via GitHub possible.

[ ] GitHub : github.com (probablement deja)
[ ] Supabase : supabase.com → Sign in with GitHub
[ ] Netlify : netlify.com → Sign in with GitHub
[ ] HubSpot Free CRM : hubspot.com/products/get-started-free

Pas besoin de configurer quoi que ce soit, juste creer les comptes.

═══════════════════════════════════════
3. TON BRIEF PERSO (5 min)
═══════════════════════════════════════

Decris en 3 lignes max :

- TON cas client reel (ou perso) sur lequel tu veux bosser
  l'apres-midi
- 1 workflow recurrent dans ton metier qui te prend du temps
  (ex: deployer une landing, auditer le SEO, copier des sections,
  traduire du contenu...)

Pas de pression : on l'utilisera comme matiere pour creer
TON skill custom l'apres-midi.

═══════════════════════════════════════

A samedi 9h00 a [LIEU/VISIO].

Si bloque sur l'install : reponds a ce mail, je dispannerai
ce soir ou demain matin.

Thomas
thomas@feaderz.co
```

## Relance J-1 matin

Si pas de screenshot recu J-2 soir :

```
Objet : [Reminder J-1] Tu as bien fait le pre-work ?

Salut [Prenom],

Petit reminder a J-1.

J'ai pas recu ton screenshot "claude --version" → ca veut dire
que je vais devoir te depanner samedi matin et tu vas perdre
1h sur les autres.

Tu peux me le renvoyer maintenant ? Ou m'appeler si bloque
au [TON NUMERO] avant 19h.

A demain,
Thomas
```

## Checklist formateur J-1 soir

Avant de dormir, verifier :

- [ ] Tous les participants ont renvoye screenshot `claude --version`
- [ ] Tous ont au moins repondu sur le brief perso (meme 1 ligne)
- [ ] Salle / lien visio confirme
- [ ] Repo template GitHub accessible (lien teste)
- [ ] Materiel imprime :
  - [ ] [03-exercices-matin.md](03-exercices-matin.md) x N
  - [ ] [04-livrable-skill-pm.md](04-livrable-skill-pm.md) x N
  - [ ] [05-kit-continuation.md](05-kit-continuation.md) x N
  - [ ] [06-grille-skill-check.md](06-grille-skill-check.md) x N (recto-verso : debut/fin)
- [ ] Cle USB de secours avec :
  - [ ] Installer VSCode .dmg / .exe
  - [ ] Installer Node.js .pkg / .msi
  - [ ] Repo template zippe (au cas ou cloning HS)

## Pourquoi ce pre-work est non-negociable

D'apres [docs/pedagogie-formation/02-format-1-jour.md](../pedagogie-formation/02-format-1-jour.md) :

> "Sans pre-work, le J1 perd 1h30 d'install / setup / accounts."

Concretement, sans ce mail :
- 9h00-9h30 : tour de table OK
- 9h30-10h30 : install VSCode + Node + Claude Code (30 min)
- 10h30-11h00 : creation comptes (30 min)
- 11h00 : tu commences enfin la demo prevue a 9h15

→ Tu as perdu 1h45. La journee est foutue.

## Si un participant arrive sans pre-work

Plan B :
- Le binomer avec quelqu'un d'installe
- Pendant le matin il fait spectator + install en parallele
- A 12h00 il doit etre operationnel pour le PM
- Sinon : il prend juste les notes et fait son skill avec un pair

**Ne JAMAIS bloquer le groupe pour 1 personne** (cf. piege 1j "Trop d'ambition").

## Sources

- [docs/pedagogie-formation/02-format-1-jour.md](../pedagogie-formation/02-format-1-jour.md) — pre-work obligatoire
- [docs/formation-nopillo/04-format-1-jour.md](../formation-nopillo/04-format-1-jour.md) — pre-requis a verifier J-7
