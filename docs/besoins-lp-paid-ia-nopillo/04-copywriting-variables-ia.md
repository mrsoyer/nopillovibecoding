# 04 — Copywriting dynamique, variables et prompts IA

## Vue d'ensemble

Le cœur du système : variables capturées via Google Ads ValueTrack + Search Term, injectées dans la LP, transformées par l'IA en copy adapté. Le matching H1 ⇄ Search Term délivre **60 à 70% du lift de conversion** total selon les benchmarks 2026.

## Table des matières

- [Liste exhaustive des variables](#liste-exhaustive-des-variables)
- [Patterns de copywriting par section](#patterns-de-copywriting-par-section)
- [Fallbacks et règles de robustesse](#fallbacks-et-règles-de-robustesse)
- [Prompts IA recommandés](#prompts-iarecommandés)
- [Anti-patterns copywriting](#anti-patterns-copywriting)

## Liste exhaustive des variables

### Variables Google Ads (ValueTrack)

| Variable | Source | Usage LP |
|----------|--------|----------|
| `{keyword}` | KW configuré dans le groupe d'annonce | H1, slug URL, meta title |
| `{searchterm}` | Recherche réelle de l'utilisateur (Broad Match) | H1 (priorité), bloc dynamique |
| `{matchtype}` | exact / phrase / broad | Détermine la stratégie copy |
| `{network}` | search / display / youtube | Adapter format/longueur |
| `{device}` | mobile / desktop / tablet | UX adaptée |
| `{campaign}` | Nom de la campagne | Mapping → variante template |
| `{adgroup}` | Nom du groupe d'annonce | Cible plus fine |
| `{creative}` | ID de l'annonce | Continuité créative (Pmax) |
| `{location}` | Code ville/pays Google | Personnalisation ville |
| `{gclid}` | Click ID Google | Tracking conversion + CAPI |

### Variables business (contextuelles)

| Variable | Source | Usage LP |
|----------|--------|----------|
| `{country}` | Détection IP (Vercel/Cloudflare/JS) | Transcréation expat |
| `{city}` | Géolocalisation (IP ou param) | Mention ville si pertinent |
| `{intent}` | Catégorisation IA du KW/Search Term | Tonalité copy |
| `{regime}` | LMNP / SCI / Pinel | Bloc dynamique |
| `{persona}` | Investisseur débutant / confirmé / expat | Tonalité + témoignages filtrés |

### Variables dynamiques data

| Variable | Source | Usage LP |
|----------|--------|----------|
| `{trustpilot_score}` | API Trustpilot | Bandeau réassurance |
| `{trustpilot_count}` | API Trustpilot | "Sur X avis vérifiés" |
| `{total_savings}` | Base interne Nopillo | "24M€ économisés par nos clients" |
| `{latest_review}` | API Trustpilot | Dernier avis affiché |

## Patterns de copywriting par section

### H1 (élément le plus critique)

**Règle** : le H1 doit reformuler le Search Term de manière à le valider et apporter une réponse.

**Templates** :

```
[Verbe action] [bénéfice quantifié] [contexte KW] [localisation si présente]

Exemples KW Search Exacte :
- KW "expert comptable LMNP" → "Trouvez votre expert-comptable LMNP en 24h pour 599€"
- KW "liasse fiscale 2031" → "Votre liasse fiscale 2031 prête en 15 min"
- KW "télétransmission LMNP" → "Télétransmettez votre liasse LMNP en 3 clics"

Exemples Search Term Broad :
- ST "LMNP vs SCI" → "LMNP ou SCI : lequel choisir pour investir en immobilier ?"
- ST "amortissement appartement Lyon" → "Calculez l'amortissement de votre appartement à Lyon en 2 min"
```

**Contrainte** : insertion KW/Search Term **2-3 fois max** dans la page (H1, premier paragraphe, CTA). Plus = keyword stuffing pénalisé.

### Sous-titre

**Pattern** :

```
[Bénéfice chiffré] [+ rapidité OU + simplicité] [+ preuve]

Exemples :
- "Économisez en moyenne 4 800€ d'impôts/an. Liasse prête en 15 minutes."
- "Déjà 24 millions d'€ économisés par nos clients. Note Trustpilot 4.7/5."
```

### CTA primaire

**Patterns** :

| Intention | Pattern CTA | Exemple |
|-----------|-------------|---------|
| Démarrer | `[Verbe action] ma/mon [bénéfice]` | "Démarrer ma liasse" |
| Simuler | `Simuler [bénéfice]` | "Simuler mon économie d'impôts" |
| Réserver | `Prendre RDV [adjectif]` | "Prendre RDV gratuit avec un expert" |

**Contrainte** : éviter `"Cliquez ici"`, `"En savoir plus"` (vagues).

### Glossaire sémantique

**Pattern de génération** :

```
À partir du KW [KW] et du Search Term [Search Term] :
1. Lister 5-8 termes fiscaux étroitement liés
2. Définir chacun en 2-3 phrases max
3. Lier au bénéfice Nopillo si possible
```

## Fallbacks et règles de robustesse

### Si variable manquante

| Variable manquante | Fallback |
|-------------------|----------|
| `{searchterm}` | Utiliser `{keyword}` |
| `{keyword}` | Utiliser nom de campagne ou template par défaut |
| `{city}` | Ne pas mentionner ville (omission silencieuse) |
| `{country}` | FR par défaut |
| `{trustpilot_score}` | Score statique cache (vieux de < 24h) |
| `{total_savings}` | Valeur statique mise à jour mensuellement |

### Règles de validation IA

Avant publication, valider :

- ✅ H1 contient le KW ou Search Term (ou un mot-clé sémantiquement proche)
- ✅ Aucune information fiscale inventée (montants, taux, dates)
- ✅ Pas de termes interdits (`"garantie"`, `"100% sûr"`, etc. — risque pub trompeuse)
- ✅ Longueur des sections respectée
- ✅ CTA présent et cliquable
- ✅ Mention RGPD dans le formulaire

### Validation humaine

Pour la démo : **review humaine obligatoire** des 5 premières variantes générées avant publication. Risque hallucination fiscale = compliance.

## Prompts IA recommandés

### Prompt H1

```
Tu es expert en copywriting Google Ads pour Nopillo (expert-comptable LMNP).

Context :
- KW Google Ads : {keyword}
- Search Term réel : {searchterm}
- Match Type : {matchtype}
- Ville détectée (si présente) : {city}

Génère 3 propositions de H1 pour la landing page qui :
1. Reformulent le {searchterm} (priorité) ou {keyword} pour valider l'intention
2. Apportent un bénéfice chiffré ou un gain de temps
3. Mentionnent {city} uniquement si pertinent
4. Font 50-80 caractères max
5. Évitent les superlatifs interdits ("le meilleur", "garantie", "100%")

Retourne JSON: { "options": [{"h1": "...", "rationale": "..."}, ...] }
```

### Prompt bloc dynamique (Broad)

```
À partir du Search Term "{searchterm}" :
1. Catégoriser l'intention parmi : comparatif, simulateur, technique, prix, expert
2. Générer un bloc de contenu de 80-120 mots adapté
3. Inclure 1 CTA contextuel

Retourne JSON: { "category": "...", "title": "...", "body": "...", "cta": "..." }
```

### Prompt glossaire

```
Génère 5 définitions de termes fiscaux liés au KW "{keyword}".

Contraintes :
- 2-3 phrases par définition, ton accessible
- Pas de jargon non expliqué
- Lien implicite avec le bénéfice Nopillo

Retourne JSON: { "terms": [{"term": "...", "definition": "..."}, ...] }
```

### Prompt FAQ

```
Génère 5 questions/réponses fréquentes liées au KW "{keyword}".

Contraintes :
- Question en langage naturel (style requête Google)
- Réponse de 2-4 phrases
- Pas d'engagement légal ou fiscal précis (renvoyer vers expert)

Retourne JSON: { "faq": [{"q": "...", "a": "..."}, ...] }
```

## Anti-patterns copywriting

- ❌ **Keyword stuffing** : KW > 3 fois = pénalité ad rank
- ❌ **H1 générique** : "Bienvenue chez Nopillo" ne matche aucun KW
- ❌ **Superlatifs interdits** : "garantie", "le meilleur", "100% sûr" → suspensions Google Ads
- ❌ **Promesses non tenues** : promesse landing ≠ produit réel = bounce + QS dégradé
- ❌ **Texte IA brut non relu** : risque hallucination (chiffres fiscaux, taux)
- ❌ **Variables exposées sans fallback** : risque H1 `"votre {keyword} avec Nopillo"` en prod

## Sources

- [LanderMagic — Dynamic Keyword Insertion High-Converting LP](https://www.landermagic.com/blog/dynamic-keyword-insertion-landing-pages) — Règle 2-3 occurrences max, fallback
- [Apexure — DKI Best Practices 2026](https://www.apexure.com/blog/best-practices-for-creating-google-dynamic-ad-landing-pages) — Lift conversion 60-70% sur H1
- [Karooya — Liste complète ValueTrack parameters](https://www.karooya.com/blog/list-of-all-valuetrack-parameters-in-google-adwords/) — Variables disponibles
- [Adalchemy — DKI for PPC](https://www.adalchemy.ai/dynamic-keyword-insertion) — Patterns copywriting
