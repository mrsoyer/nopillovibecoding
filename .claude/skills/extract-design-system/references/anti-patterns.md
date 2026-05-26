# Anti-patterns & cadre legal — `extract-design-system`

> Pieges techniques, refus juridiques, clause contractuelle. A lire AVANT de lancer le pipeline.

---

## 1. Checklist validation pre-aspiration (5 questions)

Repondre OUI a TOUTES avant de lancer step 1 :

- [ ] Le client n'est pas en concurrence directe avec la source ?
- [ ] On va modifier au moins 3 des 5 elements (palette, typo, layout, iconographie, tonalite) ?
- [ ] On a documente les references dans le brief ?
- [ ] On respecte les fonts (license OK ou alternative gratuite) ?
- [ ] On ne va PAS copier code, assets, copywriting ?

Si NON a 1+ : **REFUSER** ou repositionner avec le client. Ne pas demarrer.

---

## 2. Triggers de refus immediat

Le skill DOIT refuser et alerter dans ces cas :

| Trigger | Action |
|---|---|
| Brief mentionne "clone", "exactement comme", "1:1" | REFUS, exiger reformulation avec adaptations |
| Client meme secteur que source ET tonalite "comme eux" | ALERTE risque concurrence deloyale, demander 3+ modifs majeures |
| Source = site emblematique du secteur (Stripe pour paiement, Linear pour SaaS B2B...) ET client meme secteur | REFUS NET |
| Source utilise font payante ET client veut "exactement la meme" sans budget licence | ALERTE + alternative gratuite |
| Demande inclut "copier le HTML", "telecharger les assets", "reprendre la headline" | REFUS, expliquer que c'est copyright |

---

## 3. Cadre legal en 30 secondes

| Element source | Statut | Action |
|---|---|---|
| Code source HTML/CSS/JS | Copyrighted | NE JAMAIS copier-coller |
| Images, illustrations, photos | Copyrighted | NE JAMAIS reutiliser |
| Texte, copywriting, headlines | Copyrighted | NE JAMAIS reprendre |
| Logos, noms de marque | Trademarked | NE JAMAIS toucher |
| Fonts (Sohne, GT, Tiempos) | Licence specifique | Verifier avant reuse |
| Couleurs et palettes | Non copyrightable | OK extraire |
| Layout general (header/hero/cards/footer) | Non copyrightable | OK s'inspirer |
| Echelles typo et spacing (ratios math) | Non copyrightable | OK reproduire |
| "Look and feel" global | Zone grise | Risque commercial > legal |

**Principe** : extraire des **decisions systemiques** (chiffres, ratios, structures), pas des **expressions creatives** (visuels, code, contenu).

---

## 4. Test des 3 elements (regle Nopillo)

Risque "look and feel" acceptable si on change **3+ elements parmi 5** :

1. Palette principale (couleur brand differente)
2. Famille typographique (font differente, meme si echelle similaire)
3. Layout de la page (sequence de sections differente)
4. Iconographie / illustration (style different)
5. Tonalite / copywriting (voix differente)

Si on n'en change que 1-2 : c'est de la copie. Refus.

---

## 5. Anti-patterns techniques

### 5.1 Copie au pixel

**Symptome** : matcher exactement padding, marge, taille de la source.
**Probleme** : les pixels source sont parfois des accidents historiques, blocage adaptation client, dette technique.
**Reflexe** : extraire le **pattern systemique** (echelle base 4, ratio 1.25), pas les valeurs exactes.

### 5.2 Extraction de TOUS les tokens

**Symptome** : 350 variables Webflow importees.
**Probleme** : Webflow lent, devs perdus, on a copie le bruit avec le signal.
**Reflexe** : curation 60-80 tokens max (cap dur dans le skill).

### 5.3 Reproduction sans comprendre

**Symptome** : copier un pattern parce qu'il "fait pro".
**Probleme** : pattern lie a un contexte (densite Stripe, public Linear). Hors contexte = flop.
**Reflexe** : avant extraction, repondre a "pourquoi ce pattern marche pour eux" et "marche-t-il pour mon client".

### 5.4 Aspiration de fonts proprietaires

**Symptome** : Sohne identifie chez Stripe, on telecharge un Sohne pirate.
**Probleme** : licences 200-2000 euros, risque legal direct (trademark + copyright), risque technique (font pirate finit par etre detectee).
**Reflexe** :
- Verifier sur Fonts in Use, MyFonts, Google Fonts Identifier
- Whitelist payantes : Sohne, GT Walsheim, Tiempos, Suisse, Founders, Apercu
- Alternatives gratuites : Inter remplace Sohne, Source Serif remplace Tiempos, Manrope remplace GT Walsheim
- Si client veut absolument la payante : l'inclure dans le devis avec la licence

### 5.5 Aspiration sans timestamps

**Symptome** : aspiration figee, 6 mois plus tard la source a change, le client est perdu.
**Probleme** : l'aspiration capture un instant, pas un contrat.
**Reflexe** : versionner avec date dans le nom (`linear-2026-05-05.json`), screenshots horodates, rappeler que c'est une reference figee.

---

## 6. Risques concrets pour Nopillo

- **DMCA Takedown** : site client mis offline 24-72h, reputation degradee.
- **Contrefacon (FR)** : Articles L335-2 CPI, jusqu'a 300k euros et 3 ans de prison pour reproduction non autorisee de code/assets.
- **Concurrence deloyale (FR)** : Article 1240 Code Civil, intention de creer la confusion suffit.
- **Parasitisme (FR)** : reprendre la "valeur economique" sans bourse delier, plus facile a prouver.
- **Retroaction sur Nopillo** : si devis mentionne "clone", mails internes prouvent l'intention, pas de modif documentee.

**Protection** : tracer brief + decisions de modification + references etudiees dans `decisions.md` et `adaptations.md`.

---

## 7. Clause contractuelle (a inclure dans tout devis)

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

## 8. TL;DR operationnel

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

## 9. Veille (annual review)

- WIPO : `wipo.int`
- EUIPO : `euipo.europa.eu`
- Code propriete intellectuelle FR : `legifrance.gouv.fr`
- DMCA US : `copyright.gov/dmca/`
- Jurisprudence FR : skill `/doctrine` Claude Code
