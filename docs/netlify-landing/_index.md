# Netlify pour landings — Stack alternative complete a Webflow

> Documentation de reference pour Nopillo
> Date : 2026-05-05
> Stack cible : Astro + Tailwind + Netlify (Forms, Functions, Edge)

## Pourquoi cette doc

Webflow est l'outil par defaut de Nopillo pour les landings clients. Mais certains projets ont des contraintes qui rendent Webflow sous-optimal :

- Budget limite (Webflow Site Plan + CMS = 25-39 USD/mois/site, x N clients).
- Performance critique (Lighthouse 100, Core Web Vitals strictes pour SEO/Ads).
- Logique custom avancee (A/B test serveur, personnalisation geo, formulaires multi-step avec validation backend).
- Multi-environnements (preview client par branche, rollback instantane, CI/CD complet).
- Integration CRM/marketing complexe (HubSpot, Mailchimp, webhooks custom).

Cette doc cartographie une stack alternative production-ready : **Astro 4 + Tailwind 4 + Netlify Core (Forms, Functions, Edge Functions, Image CDN)**.

## Plan de la documentation

| # | Fichier | Sujet |
|---|---------|-------|
| 01 | [overview.md](./01-overview.md) | Netlify en 2026 pour agences landings |
| 02 | [stack-recommande.md](./02-stack-recommande.md) | Astro + Tailwind + Netlify : pourquoi cette stack |
| 03 | [netlify-forms.md](./03-netlify-forms.md) | Formulaires sans backend, spam, integrations CRM |
| 04 | [netlify-functions.md](./04-netlify-functions.md) | Serverless TypeScript, use cases agency |
| 05 | [edge-functions.md](./05-edge-functions.md) | Personnalisation et A/B test au edge |
| 06 | [deploy-workflow.md](./06-deploy-workflow.md) | CI, branches, preview, rollback |
| 07 | [quand-vs-webflow.md](./07-quand-vs-webflow.md) | Matrice de decision Netlify vs Webflow |
| 08 | [skill-deploy-landing-netlify.md](./08-skill-deploy-landing-netlify.md) | Specs skill Claude Code `/deploy-landing-netlify` |
| -- | [sources.md](./sources.md) | Sources web utilisees |

## TL;DR pour Nopillo

- **Garder Webflow** pour 80 % des landings clients (rapide, designer-friendly, CMS visuel).
- **Basculer sur Astro + Netlify** quand : (1) budget hosting < 5 EUR/mois/site, (2) Lighthouse 100 obligatoire, (3) logique serveur custom, (4) workflow Git/PR avec multi-envs.
- **Skill Claude Code** `/deploy-landing-netlify` pour automatiser le scaffolding + premier deploy en moins de 10 min.

## Public cible

- Equipe technique Nopillo (lead dev, integrateurs).
- Project managers qui doivent arbitrer Webflow vs stack code par projet.
- Auteurs de prompts pour agents Claude Code.

## Statut

Doc vivante, version 1.0. Mises a jour quand l'API Netlify ou les adapters Astro changent.
