# 06 — Anti-Patterns & Cadre Legal

> Ce qui est legal vs illegal en aspiration de DS. Risques copyright, trademark, "look and feel", DMCA. Regles internes Nopillo.

---

## 1. Le Cadre Legal en 30 Secondes

| Element source | Statut legal | Action Nopillo |
|---|---|---|
| Code source HTML/CSS/JS | **Copyrighted** des sa creation | NE JAMAIS copier-coller |
| Images, photos, illustrations | **Copyrighted** | NE JAMAIS reutiliser |
| Texte, copywriting | **Copyrighted** | NE JAMAIS reprendre |
| Logos, noms de marque | **Trademarked** | NE JAMAIS toucher |
| Fonts (Sohne, GT, Tiempos) | Licence specifique | Verifier la licence avant reuse |
| Couleurs et palettes | **Non copyrightable** seules | OK a extraire (pas de monopole sur un hex) |
| Layout general (header/hero/cards/footer) | **Non copyrightable** | OK a s'inspirer |
| Echelles typographiques (16/24/48...) | **Non copyrightable** (sequence math) | OK a reproduire |
| Echelles spacing (base 4/8) | **Non copyrightable** | OK a reproduire |
| "Look and feel" global | **Zone grise** | Risque commercial > legal |

**Principe de base** : on extrait des **decisions systemiques** (chiffres, ratios, structures), pas des **expressions creatives** (visuels, code, contenu).

---

## 2. Ce qui EST Copyrightable

D'apres la jurisprudence US et UE.

**2.1 Le code source** : > "Web developers write custom code for one client. Therefore, they own the rights to that design." Toute reproduction de code (meme partielle, meme refactoree) sur la base d'un copier-coller initial = infraction.
- INTERDIT : copier HTML d'une section Stripe ou CSS d'un composant Linear pour Webflow
- AUTORISE : reconstruire un composant similaire en partant de zero dans Webflow

**2.2 Les assets visuels** : photos, illustrations, icons, videos, animations Lottie tous copyrighted.
- INTERDIT : telecharger un visuel d'un site source pour le reutiliser
- AUTORISE : s'inspirer d'un style d'illustration et commander une illustration originale

**2.3 Le contenu textuel** : headlines, taglines, copy proteges.
- INTERDIT : reprendre la headline "Made for the people who do" de Linear
- AUTORISE : noter la structure (verbe + benefice court + tonalite) et faire ecrire un copy original

**2.4 Logos et noms de marque** : trademarked. Reproduction = infraction trademark, plus grave que copyright.
- INTERDIT : utiliser le logo d'un site source meme en wireframe ou un nom de marque meme en placeholder

---

## 3. Ce qui n'est PAS Copyrightable

**3.1 Couleurs et palettes** : une couleur (`#0EA5E9`) ne peut pas etre proprietaire. Une palette de 9 couleurs non plus. **Exception** : les couleurs emblematiques peuvent etre protegees comme trademark (Tiffany Blue, T-Mobile Magenta, Cadbury Purple). La palette reste libre, mais l'usage commercial dans le meme secteur peut creer une confusion.
- AUTORISE : extraire toute palette d'un site
- VIGILANCE : si un client veut le bleu Tiffany pour une marque de bijoux, alerter

**3.2 Layout et structure de page** : > "Layout and color schemes cannot be copyrighted." Un site avec hero / 3 cards / pricing / footer = structure ultra-commune, libre.
- AUTORISE : reproduire la sequence "hero centre + grid 3 cols + logos clients + pricing 3 plans + footer 4 cols"
- VIGILANCE : si la structure est tres specifique et reconnaissable (layout asymetrique unique), risque "look and feel"

**3.3 Patterns d'interaction commune** : hover states, transitions standards, scroll triggers — non copyrightable.

**3.4 Echelles math** : une echelle 12/14/16/24/32/48 = sequence mathematique, non protegeable. Idem base spacing 4 ou 8.

---

## 4. La Zone Grise — "Look and Feel"

Le concept "look and feel" = l'impression globale qui rend un site reconnaissable.

> "The 'look and feel' of a website—the immediate impression that makes a website recognizable, easy to use, and deserving of consumer trust—is not adequately protected by copyright, trademark, or any other intellectual property doctrine."

**Cas problematique** : meme si chaque element pris separement est legal a copier, **la combinaison de tous ces elements** peut creer une confusion deloyale.

### 4.1 Indicateurs de risque "look and feel"

Le client risque une action en concurrence deloyale si :

1. Il opere dans le **MEME secteur** que la source
2. Les sites sont **visuellement quasi-identiques** au premier regard
3. Le site source est **emblematique** (Stripe, Apple, Tesla)
4. Il existe une **intention** documentee de copier (mails, briefs)

### 4.2 Cas concrets

| Scenario | Risque | Decision Nopillo |
|---|---|---|
| Client SaaS B2B veut "comme Linear" | Moyen | OK si adaptation forte (couleurs, typo, layout differents) |
| Client e-commerce mode veut "comme Apple Store" | Faible | OK, secteurs differents |
| Client paiement veut "comme Stripe" | ELEVE | REFUS net OR adaptation MAJEURE imposee |
| Client agence veut "comme Studio Bleu" (concurrent direct) | TRES ELEVE | REFUS commercial + ethique |
| Client retail premium veut "comme Hermes" | ELEVE (trademark) | REFUS |

### 4.3 La regle Nopillo

**Test des 3 elements** : si on change 3+ elements parmi les 5 suivants, le risque "look and feel" devient acceptable :

1. Palette principale (couleur brand differente)
2. Famille typographique (font differente, meme si echelle similaire)
3. Layout de la page (sequence de sections differentes)
4. Iconographie / illustration (style different)
5. Tonalite / copywriting (voix differente)

Si on n'en change que 1-2, on est dans la copie. Refus.

---

## 5. Risques Concrets pour Nopillo

### 5.1 DMCA Takedown

> "Under the Digital Millennium Copyright Act (DMCA), copyright holders can send legally binding notices to hosting providers, domain registrars, and search engines demanding the removal of infringing content."

Risque : un site client est mis offline 24-72h le temps de la procedure. Reputation degradee.

### 5.2 Action en contrefacon (Europe)

Code de la propriete intellectuelle (FR) : Articles L335-2 et suivants. Sanctions jusqu'a 300k euros et 3 ans de prison pour reproduction non autorisee. Reservation : applique surtout au code et aux assets, pas aux idees.

### 5.3 Concurrence deloyale (FR)

Si le client est en concurrence directe avec la source : Article 1240 du Code Civil. Pas besoin de prouver le copyright, juste l'intention de creer la confusion.

### 5.4 Action en parasitisme (FR)

Reprendre la "valeur economique" du travail d'autrui sans bourse delier. Plus facile a prouver que la contrefacon.

### 5.5 Risques pour Nopillo en tant qu'agence

Si le client se fait attaquer : retroaction possible vers Nopillo si :
- Devis/brief mentionnent "clone" ou "copie"
- Mails internes prouvent l'intention
- Pas de modification documentee

**Protection** : tracer toujours dans Notion/Linear le brief, les decisions de modification, les references etudiees.

---

## 6. Anti-Patterns Techniques

Au-dela du legal, certaines pratiques sont contre-productives.

### 6.1 La copie au pixel

**Symptome** : on essaie de matcher exactement padding, marge, taille de la source.

**Probleme** :
- Le site source a evolue par iterations sur des annees, ses pixels sont parfois des accidents
- Cela bloque l'adaptation au contexte client
- Cree une dette technique (on s'oblige a respecter un patron rigide)

**Bon reflexe** : extraire le **pattern systemique** (echelle base 4, ratio typo 1.25), pas les valeurs exactes.

### 6.2 L'extraction de TOUS les tokens

**Symptome** : on importe 350 variables Webflow.

**Probleme** :
- Webflow devient lent
- Les developpeurs ne savent plus quelle variable utiliser
- On a copie le bruit en meme temps que le signal

**Bon reflexe** : curation a 60-80 tokens max.

### 6.3 La reproduction sans comprendre

**Symptome** : on copie un pattern parce qu'il "fait pro" sans comprendre pourquoi il marche.

**Probleme** :
- Le pattern est lie a un contexte (densite d'info Stripe, public technique Linear)
- Applique a un autre contexte, il fait flop

**Bon reflexe** : avant d'extraire, repondre a "pourquoi ce pattern marche pour eux" et "est-ce que ca marche pour mon client".

### 6.4 L'aspiration de fonts proprietaires

**Symptome** : on identifie que Stripe utilise Sohne, on telecharge un Sohne pirate.

**Probleme** :
- Sohne, GT Walsheim, Tiempos sont payantes (licences 200-2000 euros)
- Risque legal direct (trademark + copyright)
- Risque technique (font sans licence finit par etre detectee et bloquee)

**Bon reflexe** :
- Verifier la licence sur Fonts in Use, MyFonts, Google Fonts Identifier
- Choisir une font alternative gratuite proche (Inter remplace Sohne, Source Serif remplace Tiempos)
- Si client veut absolument la font payante, l'inclure dans le devis

### 6.5 L'aspiration sans timestamps

**Symptome** : on aspire un site, 6 mois plus tard le site a change, le client demande pourquoi son DS ne ressemble plus.

**Probleme** : l'aspiration capture un instant, pas un contrat.

**Bon reflexe** : versionner avec date dans le nom (`linear-2026-05-05.json`), screenshots horodates, rappeler que c'est une reference figee.

---

## 7. Checklist Validation Avant Aspiration

Avant chaque mission, repondre OUI a ces 5 questions :

- [ ] Le client n'est pas en concurrence directe avec la source ?
- [ ] On va modifier au moins 3 des 5 elements (palette, typo, layout, iconographie, tonalite) ?
- [ ] On a documente les references dans le brief ?
- [ ] On va respecter les fonts (license OK ou alternative gratuite) ?
- [ ] On ne va PAS copier code, assets, copywriting ?

Si NON a 1+ : refus ou repositionnement.

---

## 8. Modele Clause Contractuelle (Devis Nopillo)

A inclure dans tous les devis impliquant aspiration de DS.

> **Clause "Inspiration de Design Systems"**
>
> Le Client peut fournir des references visuelles (sites web, captures d'ecran, moodboards). Nopillo s'engage a :
>
> 1. Etudier ces references comme inspiration pour des decisions systemiques (echelles, palettes, hierarchies)
> 2. NE PAS reproduire de code source, assets graphiques, contenus textuels, marques ou logos issus des sites references
> 3. Adapter substantiellement toute reference au positionnement du Client (palette propre, typographie distincte, layouts originaux)
> 4. Documenter les references etudiees dans le livrable
>
> Le Client garantit que :
>
> 1. Il a le droit d'utiliser toute police, illustration ou contenu qu'il fournit
> 2. Il assume la responsabilite finale du livrable et de sa diffusion publique
> 3. Il s'interdit de demander une copie 1:1 d'un site existant
>
> En cas de litige tiers issu d'une reference imposee par le Client malgre alerte de Nopillo, le Client garantit Nopillo contre toute reclamation.

---

## 9. Ressources Veille

A consulter regulierement (annual review) :

- **WIPO** (proprietes intellectuelles internationales) : `wipo.int`
- **EUIPO** (Europe) : `euipo.europa.eu`
- **Code de la propriete intellectuelle FR** : `legifrance.gouv.fr`
- **DMCA** (US) : `copyright.gov/dmca/`
- Jurisprudence : Doctrine.fr (skill `/doctrine` Claude Code)

---

## 10. TL;DR Operationnel

| Action | Verdict |
|---|---|
| Aspirer une palette de couleurs et l'adapter | OK |
| Aspirer une echelle typo et l'utiliser avec une autre font | OK |
| Aspirer une echelle spacing | OK |
| Reproduire la structure de sections | OK |
| Copier le HTML/CSS d'un composant | NON |
| Telecharger un visuel/illustration | NON |
| Reprendre une headline | NON |
| Utiliser une font payante sans licence | NON |
| Reproduire 1:1 un site concurrent direct | NON |
| Vendre un site qui ressemble visuellement a 90% a la source | NON |

---

## Sources

- [Cloned Website Guide 2025 (Webxloo)](https://webxloo.com/blog/cloned-website-understanding-the-benefits-pitfalls-and-critical-legal-issues-2025-guide.html) — tour d'horizon risques 2025
- [Legalities of Copying Website Design (Thomas Digital)](https://thomasdigital.com/the-legalities-of-copying-a-website-design) — cadre US/UE detaille
- [Is Copying Website Design Legal (Chillybin)](https://www.chillybin.co/copying-website-design-legal-avoid-copyright-issues/) — citations "look and feel"
- [Look and Feel IP Protection (NYU JIPEL)](https://jipel.law.nyu.edu/vol-3-no-2-3-brown/) — analyse academique zone grise
- [Web Design Plagiarism (Webdew)](https://www.webdew.com/blog/web-design-plagiarism) — exemples concrets jurisprudence
- [Website Cloning legal consequences (Chambers)](https://chambers.com/articles/website-cloning-a-business-reality-with-intricate-legal-consequences) — DMCA + concurrence deloyale

## Suivant

- [07-skill-extract-design-system.md](./07-skill-extract-design-system.md) — Skill Claude Code dedie
- [sources.md](./sources.md) — References externes
