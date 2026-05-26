# 04 — Checklist pre-formation J-7

> A executer 7 jours avant la formation. Garantit que J1 demarre sans frottement technique ou logistique.

## Vue d'ensemble

Cette checklist couvre 4 domaines :
1. **Acces et comptes** (Nopillo + sandbox)
2. **Setup technique participants** (Claude Code + MCP)
3. **Briefs participants** (cas pratiques reels)
4. **Logistique formateur** (salle, materiel, supports)

Chaque ligne a un **owner** (Thomas / Nopillo) et un **statut** (TODO / DONE).

## J-7 : checklist complete

### Section 1 — Acces et comptes

| Item | Owner | Statut |
|------|-------|--------|
| Compte Webflow Workspace partage avec Thomas (role Designer) | Nopillo | |
| Site Webflow "sandbox-formation" cree dans le Workspace | Nopillo | |
| Compte HubSpot accessible (sandbox dev preferable) | Nopillo | |
| Private App HubSpot creee, scopes : crm.objects.contacts.read/write, forms.read | Nopillo | |
| Token Private App genere et partage en secure (Bitwarden / 1Password) | Nopillo | |
| Compte Google Ads accessible (MCC sandbox preferable) | Nopillo | |
| OAuth Composio Google Ads ou setup natif valide | Thomas | |
| Compte Meta Ads accessible (Business Manager) | Nopillo | |
| App Facebook Developer creee + token long-lived | Nopillo | |
| Pixel Meta de test cree (pas le production) | Nopillo | |
| Repo Git Nopillo accessible (GitHub / GitLab) avec branche `formation` | Nopillo | |
| Permissions push sur la branche `formation` accordees aux participants | Nopillo | |

### Section 2 — Setup technique participants (J-7 envoi instructions)

A envoyer en mail J-7 a chaque participant :

| Item | Owner | Statut |
|------|-------|--------|
| Mail "Setup pre-formation" envoye a chaque participant | Thomas | |
| Claude Code installe (verifier `claude --version`) | Participant | |
| Plan Claude Pro/Max actif (pas Free) | Participant | |
| Repertoire `.claude/` initialise dans repo Nopillo | Participant | |
| Webflow MCP configure et teste (`claude mcp list`) | Participant | |
| HubSpot MCP configure (token Private App ajoute) | Participant | |
| Node.js 18+ installe | Participant | |
| Git configure (user.name + user.email) | Participant | |
| Acces VS Code ou IDE prefere | Participant | |
| Ecran externe + clavier (recommande pour pair) | Participant | |

### Section 3 — Briefs participants (cas pratiques reels)

| Item | Owner | Statut |
|------|-------|--------|
| Chaque participant a soumis 1 brief "landing reelle" a faire en J2 | Participant | |
| Briefs valides par Nopillo (proxy client = OK) | Nopillo | |
| Au moins 2 briefs differents pour varier les exos | Nopillo | |
| Brief contient : objectif, cible, USP, CTA, source de trafic ads | Nopillo | |
| Visuels client dispo (logo, photos, brand) pour les briefs | Nopillo | |

### Section 4 — Logistique salle (presentiel)

| Item | Owner | Statut |
|------|-------|--------|
| Salle reservee, capacite suffisante (1 ecran / 2 personnes) | Nopillo | |
| Wifi teste, debit > 50 Mbps, mot de passe partage | Nopillo | |
| Video projecteur + cable HDMI / USB-C | Nopillo | |
| Tableau blanc + marqueurs (3 couleurs minimum) | Nopillo | |
| Multiprises pour 8 postes | Nopillo | |
| Cafe / the / eau dispo en continu | Nopillo | |
| Restauration midi reservee (si all-inclusive) | Nopillo | |
| Climatisation / chauffage testes | Nopillo | |
| Plan B salle si la principale tombe (visio backup) | Thomas | |

### Section 5 — Logistique visio (si distanciel)

| Item | Owner | Statut |
|------|-------|--------|
| Outil visio choisi (Meet / Zoom / Teams) avec breakout rooms | Thomas | |
| Lien invitation envoye J-2 et J-1 (relance) | Thomas | |
| Test technique 30 min J-1 avec chaque participant | Thomas | |
| Slack / Discord workshop cree, participants invites | Thomas | |
| Backup formateur (si bug techno) : autre poste pret | Thomas | |
| Support partage ecran teste (audio + video + ecran) | Thomas | |

### Section 6 — Supports formateur

| Item | Owner | Statut |
|------|-------|--------|
| Slides J1 finalisees et imprimees pour Thomas | Thomas | |
| Slides J2 finalisees et imprimees pour Thomas | Thomas | |
| Repo template formation cree avec branches solutions | Thomas | |
| Prompts pre-ecrits dans `docs/prompts.md` du repo | Thomas | |
| Cheatsheet PDF prete et envoyee a Nopillo (impression J1) | Thomas | |
| Skill check pre-formation envoye et rempli (J-3 deadline) | Thomas | |
| Grille evaluation livrables imprimee | Thomas | |
| NPS form pret (Tally / Typeform), lien teste | Thomas | |
| Convention de stage signee Nopillo (Qualiopi) | Thomas | |
| Feuille emargement preparee | Thomas | |
| Devis paye / acompte recu | Thomas | |

### Section 7 — Communications

| Item | Owner | Statut |
|------|-------|--------|
| Mail J-7 "Pre-requis" envoye | Thomas | |
| Mail J-3 "Recap setup + skill check" envoye | Thomas | |
| Mail J-1 "Demain on commence + adresse / lien visio" envoye | Thomas | |
| Numero de tel Thomas partage aux participants | Thomas | |
| Numero de tel referent Nopillo partage a Thomas | Nopillo | |

## J-3 : verifications critiques

A J-3, refaire un check rapide :

- [ ] Skill check pre rempli par tous (sinon relance)
- [ ] Tous les participants confirment Claude Code installe
- [ ] Briefs personnels recus
- [ ] Comptes sandbox toujours actifs (parfois revoques)
- [ ] Salle / visio confirmee
- [ ] Cheatsheet imprimee chez Nopillo (si presentiel)

## J-1 : ultime verification

- [ ] Test wifi sur place (si presentiel)
- [ ] Backup setup pret (cle USB avec slides + repo zippe)
- [ ] Telephone de Thomas charge
- [ ] Envoi mail "rendez-vous demain 8h45 cafe avant 9h start"
- [ ] Verification meteo et trajet (presentiel)
- [ ] Slack workshop ouvert et lien partage

## J0 : matin avant 9h

- [ ] Arrivee 30 min avant (presentiel) ou 15 min avant (visio)
- [ ] Setup video projecteur teste avec un slide
- [ ] Wifi sur le poste formateur teste
- [ ] Slides J1 chargees et pretes
- [ ] Repo template clone localement et teste
- [ ] Cafe pour soi
- [ ] Energie et sourire prets

## Anti-patterns J-7

| Anti-pattern | Consequence | Fix |
|--------------|-------------|-----|
| Setup participants verifie le matin J1 | 1h de perdu en debug | J-3 verification obligatoire |
| Skill check pas rempli | Pas de delta a la fin (pas de KPI) | Relancer chaque retardataire J-3 |
| Pas de plan B salle / wifi | Catastrophe le jour J | Toujours 1 backup |
| Briefs perso non recus | Pratique generique = baisse de NPS | Bloquer la formation si pas recus |
| Convention Qualiopi non signee | Pas de financement OPCO valide | Signature avant J-7 obligatoire |

## Sources

- `docs/formation-nopillo/05-format-2-jours.md` (section Pre-requis a verifier J-7)
- `docs/pedagogie-formation/07-materiel-pedagogique.md` (Communication post-workshop)
- `docs/pedagogie-formation/06-evaluation.md` (Skill check pre-formation)
