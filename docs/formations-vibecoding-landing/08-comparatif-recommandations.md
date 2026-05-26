# 08 — Comparatif Final & Recommandations

## Vue d'Ensemble

Cette section synthétise les choix à faire selon votre **profil**, **budget**, **objectif** et **horizon temps**.

## Recommandations par Profil

### Profil 1 — Entrepreneur sans technique, budget serré

**Objectif** : Lancer un MVP / landing page MVP en quelques jours.

**Stack recommandée** :
- **Outil** : Lovable (Pro 25 $/mois) ou Bolt.new (free)
- **Formation** : Vibecoding Video Series (gratuit) + Elephorm Lovable AI
- **Pour landing page** : Lovable suffit, ou v0 by Vercel
- **Backend si besoin** : Supabase free tier

**Budget total** : ~50 $/mois max
**Horizon** : Live en 1-2 semaines

### Profil 2 — Entrepreneur avec OPCO/CPF

**Objectif** : Compétences pérennes + premier produit.

**Stack recommandée** :
- **Formation** : **IQ Project** (Qualiopi, 8 soirées) → finance par OPCO
- **Outils** : Lovable + Cursor (combo no-code + code)
- **Si budget** : Jedha Product Builder (450 h, financement complet)

**Budget perso** : 0 € (OPCO/CPF couvrent tout)
**Horizon** : 8 soirées → 3 mois

### Profil 3 — Career changer (reconversion)

**Objectif** : Trouver un job ou freelance.

**Stack recommandée** :
- **Formation** : **GDU Campus** (3 mois, RNCP, 1 998 €) — seul RNCP abordable
- **Compléter** : tutoriels MakerKit gratuits, Claude Code
- **Stack tech** : Next.js + Supabase + Stripe (la stack 2026)
- **Bonus international** : Springboard ML Engineering si visée AI Engineer

**Budget** : 1 998 € (CPF/épargne)
**Horizon** : 3-9 mois pour un poste

### Profil 4 — Développeur senior

**Objectif** : Intégrer l'IA dans le workflow quotidien, gagner 40-60 % de temps.

**Stack recommandée** :
- **Formation** : **LBKE Développeur Augmenté** (Eric Burel) ou **Intelligence Academy Code with AI**
- **Daily driver** : Cursor (20 $/mois) ou Windsurf (15 $/mois)
- **Tâches lourdes** : Claude Code + MCP Supabase
- **Skills** : maîtriser CLAUDE.md, agents, skills, subagents

**Budget** : 20-50 $/mois
**Horizon** : Compétences applicables sous 2 semaines

### Profil 5 — Marketeur / Growth

**Objectif** : Itérer rapidement sur landing pages, A/B tester.

**Stack recommandée** :
- **Formation** : **Intelligence Academy Work with AI** (31 h, CPF)
- **Outils** : v0 by Vercel + Vercel Analytics (mesure)
- **Pour landing prod** : Workflow Claude Code 2h ([05](05-claude-code-landing-page.md))
- **Best practices** : maîtriser les 14 éléments + 40 stats ([07](07-conversion-best-practices.md))

**Budget** : 20-50 $/mois (v0 + hosting)
**Horizon** : 1-3 jours par landing variation

### Profil 6 — Équipe corporate (formation rapide)

**Objectif** : Upskill équipe rapidement (workshop court).

**Stack recommandée** :
- **Formation** : **Ambient IT** (2-3 jours intensif inter-entreprises)
- **Suivi** : Intelligence Academy pour individus motivés post-formation
- **Outils déployés équipe** : Cursor (licence team)

**Budget** : variable, financement plan formation entreprise
**Horizon** : 2-3 jours présence + 4 semaines pratique

## Décision : Quel outil principal choisir en 2026 ?

```
Vous codez en JS/TS ? ─── NON ──► Lovable + Bolt.new
                            │
                           OUI
                            │
                            ▼
                  Travaux longs/automatisation ?
                            │
                ┌───────────┴───────────┐
                │                       │
               OUI                     NON
                │                       │
                ▼                       ▼
         Claude Code              Cursor (ou Windsurf
         (avec MCP)               si budget serré)
```

## Décision : Quelle stack pour SaaS en 2026 ?

**Stack standard recommandée** (cf. [06](06-claude-code-supabase-saas.md)) :

```
Frontend  : Next.js 14+ App Router + TypeScript
Styling   : Tailwind CSS
Backend   : Supabase (Postgres + Auth + Storage)
Payments  : Stripe (subs + customer portal)
Email     : Resend
Hosting   : Vercel
AI Coding : Claude Code + Supabase MCP
```

**Alternatives valides** :
- Astro 5 + Cloudflare Pages (pour content-heavy)
- Vue/Nuxt + Supabase (équipes Vue)
- Flutter + Supabase (mobile)

## Comparatif Express : 8 Formations FR

| Formation | Prix | Durée | Cert | Best For |
|-----------|------|-------|------|----------|
| Jedha Product Builder | 7 500 € | 450 h | CPF+OPCO | Pro/avancé all-in |
| GDU Campus | 1 998 € | 3 mois | RNCP | Career change abordable |
| IQ Project | NC | 8 soirées | Qualiopi | Entrepreneurs avec OPCO |
| Intelligence Academy Work | NC | 31 h | CPF+Qualiopi | Non-techs |
| Intelligence Academy Code | NC | Intensif | CPF+Qualiopi | Devs |
| Ambient IT | NC | 2-3 j | — | Corporate |
| Elephorm | NC | Auto | — | Autodidactes FR |
| LBKE | NC | NC | — | Devs Cursor à fond |

## ROI Réaliste

### Coût d'opportunité d'apprendre seul

- **Heures perdues à mal prompter** : 20-50 h
- **Erreurs production** dues à ignorance des best practices : variable
- **Mauvaise stack initiale** : refactor coûteux
- **Pas de network** : isolement entrepreneurial

### Bénéfices d'une formation structurée

- **Réseau** (cohorte) : alumni, recruteurs, partners
- **Méthodologie** : éviter pièges connus (CLAUDE.md, RLS, prompts précis)
- **Certification** : crédibilité commerciale (CPF/RNCP/Qualiopi visibles sur CV)
- **Support post-formation** : mentor, slack alumni, ressources continues

## Roadmap Proposée 2026

### Mois 1 — Découverte (gratuit)

- Vibecoding Video Series (Dix Mille Heures)
- Tutoriel Claude Code Landing Page (Claude Fluent)
- Tester Lovable + Bolt.new free tiers
- **Livrable** : 1 landing page déployée

### Mois 2-3 — Formation structurée

- Choisir UNE formation (selon profil ci-dessus)
- Suivre + faire les projets
- **Livrable** : 1 SaaS MVP fonctionnel

### Mois 4 — Production

- Déployer un projet réel client/perso
- Maîtriser CLAUDE.md, MCP, skills/agents
- A/B tester landing pages
- **Livrable** : Premier revenu (consulting, SaaS, freelance)

### Mois 5-6 — Spécialisation

- Choisir verticale (e-commerce, B2B SaaS, edtech, etc.)
- Devenir expert sur une stack précise
- Construire portfolio public
- **Livrable** : Positionnement marché clair

## Erreurs courantes à éviter

❌ **Multiplier les outils sans en maîtriser un** — choisir Cursor OU Claude Code, pas les deux pour démarrer
❌ **Sauter la phase formation** — perte de 50+ heures à découvrir les patterns gratuits
❌ **Ignorer le CPF/OPCO** — financement souvent à 100 % accessible
❌ **Choisir formation sans Qualiopi** si financement nécessaire
❌ **Faire un MVP sans landing page** — testez d'abord la demande (waitlist)
❌ **Ignorer les best practices conversion** — un MVP sans landing convertissante = 0 €
❌ **Pas de CLAUDE.md** sur projets sérieux — qualité dégradée garantie

## Synthèse en 5 points clés

1. **Choisir une formation Qualiopi** si financement accessible (90 % des cas)
2. **Stack 2026 standard** : Next.js + Supabase + Claude Code + Vercel
3. **Maîtriser le prompting précis** > multiplier les outils
4. **Toujours commencer par la landing page** avant le produit
5. **Mesurer dès le déploiement** (Vercel Analytics, Speed Insights)

## Sources

Voir [sources.md](sources.md) pour la liste consolidée.
