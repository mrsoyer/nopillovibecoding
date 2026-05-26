# Checks Detail — Queries SQL et Patterns de Verification

## Table des matieres
- [Check 6 — DB Sync queries](#check-6--db-sync)
- [Check 7 — Crons queries](#check-7--crons)
- [Seuils de scoring](#seuils-de-scoring)
- [Auto-fix supportes](#auto-fix-supportes)

---

## Check 6 — DB Sync

### Compter les tables reelles

```sql
SELECT tablename FROM pg_tables WHERE schemaname = 'public' ORDER BY tablename;
```

### Compter les tables dans db-schema.md

Lis `.claude/rules/postgresql/db-schema.md`. Extrais les noms de tables des tableaux markdown.
Pattern : lignes contenant `|` avec des noms de tables en snake_case separes par des virgules.

### Groupes attendus

| Groupe | Tables attendues |
|--------|-----------------|
| Cold email | campaigns, sends, prospects, members, domains, mailboxes, subscription_tokens, send_engine_runs, sender_transitions, daily_orchestration_runs, alert_events |
| G2 Warmup | g2_categories, g2_products, g2_messages, g2_messages_cron_runs, g2_submissions, g2_submission_queue, g2_railway_queue, g2_railway_runs, g2_probe_runs, g2_support_schedule |
| Newsletter | newsletters, newsletter_sends, newsletter_sources, newsletter_templates, newsletter_reply_questions, newsletter_real_replies, newsletter_referrals, newsletter_testimonials, newsletter_ab_tests, newsletter_cross_promos, newsletter_design_inspirations, newsletter_imap_inspirations, newsletter_lead_magnets_deliveries, newsletter_quiz_responses |
| Livres blancs | livres_blancs, livre_blanc_subscriptions, lb_inscriptions, lb_subscription_queue, lb_cron_runs |
| Enrichment | companies, company_personae, email_pattern_cache, debounce_results |
| Personae | personae, personae_templates, lead_magnets |
| Social | social_profiles, social_posts |
| Infra | inbox_messages, mx_reputation, image_proxy_mappings, mascotte_pages, warmup_conversations |
| Materialized | prospect_priority_mv |

---

## Check 7 — Crons

### Lister les cron jobs actifs

```sql
SELECT jobname, schedule, active,
  CASE
    WHEN command LIKE '%functions/v1/%' THEN
      substring(command FROM 'functions/v1/([a-z0-9-]+)')
    ELSE 'rpc_direct'
  END as edge_function
FROM cron.job
WHERE active = true
ORDER BY jobname;
```

### Lister les EF locales

Pattern Glob : `supabase/functions/*/index.ts`
Extraire le nom du dossier parent comme nom d'EF.
Exclure `_shared` (pas une EF).

### Cross-reference

Pour chaque cron → verifier que l'EF cible existe en local.
Pour chaque EF locale nommee `*-cron*`, `*-orchestrator*`, `*-pump*`, `*-audit*` → verifier qu'un cron existe.

---

## Seuils de scoring

| Check | 10/10 | 7/10 | 4/10 | 0/10 |
|-------|-------|------|------|------|
| CLAUDE.md | <= 80 lignes + MCP top+bottom | 81-150 lignes | > 150 lignes | > 200 lignes |
| Rules | 7+ fichiers, 0 path obsolete | 4-6 fichiers | 1-3 fichiers | 0 fichiers |
| Agents | Tous complets | 1 champ manquant | 2+ manquants | Aucun agent |
| .claudeignore | Existe + 3 patterns | Existe + 2 patterns | Existe + 1 pattern | N'existe pas |
| Skills | 100% complets | >= 80% complets | >= 50% complets | < 50% complets |
| DB sync | Ecart 0-2 | Ecart 3-5 | Ecart 6-10 | Ecart > 10 |
| Crons | 0 warnings | 1 warning | 2 warnings | 3+ warnings |
| Settings | <= 30 lignes, 0 secret | 31-50 lignes | > 50 lignes | Secrets trouves |

---

## Auto-fix supportes

| Probleme | Auto-fix | Condition |
|----------|----------|-----------|
| Table DB manquante dans db-schema.md | Ajoute au bon groupe | --fix ou score >= 70 |
| Skill sans `model` | Ajoute `model: sonnet` | --fix ou score >= 70 |
| Path obsolete dans rule | Supprime le path | --fix uniquement |
| .claudeignore pattern manquant | Ajoute le pattern | --fix ou score >= 70 |

**Jamais auto-fixe** (toujours WARNING) :
- CLAUDE.md trop long → necessite decision humaine sur quoi extraire
- Agent avec tools incorrects → necessite validation
- Secrets dans settings → necessite nettoyage manuel attentif
- CLAUDE.md structure (ajout/suppression sections) → trop risque
