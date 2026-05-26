# Sources consultees

Recherche effectuee le 2026-05-26 via 6 WebSearch + 5 WebFetch paralleles.

## Documentation officielle HubSpot

| URL | Usage dans la doc |
|-----|-------------------|
| [Forms API v3 reference](https://developers.hubspot.com/docs/reference/api/marketing/forms/v3) | 01-overview, 02-get-forms |
| [Forms API v2 reference (legacy)](https://developers.hubspot.com/docs/reference/api/marketing/forms/v2) | 02-get-forms (fields legacy) |
| [Get a list of forms endpoint](https://developers.hubspot.com/docs/api-reference/marketing-forms-v3/forms/get-marketing-v3-forms-) | 02-get-forms |
| [Submit form v3 secure endpoint](https://developers.hubspot.com/docs/api-reference/legacy/forms-v3-legacy/post-submissions-v3-integration-secure-submit-portalId-formGuid) | 03-submit-form |
| [Announcing Forms API v3 Developer Preview](https://developers.hubspot.com/changelog/announcing-forms-api-v3-developer-preview-is-now-available) | 01-overview (versions) |
| [Validation change to Forms API submission](https://developers.hubspot.com/changelog/validation-change-to-the-forms-api-submission-endpoints) | 05-best-practices |
| [Forms submission rate limits announcement](https://developers.hubspot.com/changelog/announcing-forms-submission-rate-limits) | 05-best-practices |
| [Additional rate limit protection for Form Submissions API](https://developers.hubspot.com/changelog/additional-rate-limit-protection-being-added-to-form-submissions-api) | 05-best-practices (IP-based) |
| [API usage guidelines and limits](https://developers.hubspot.com/docs/developer-tooling/platform/usage-guidelines) | 05-best-practices |

## Knowledge base HubSpot

| URL | Usage |
|-----|-------|
| [Cookies set in visitor's browser](https://knowledge.hubspot.com/privacy-and-consent/what-cookies-does-hubspot-set-in-a-visitor-s-browser) | 04-tracking-hutk |
| [Find your form GUID](https://knowledge.hubspot.com/forms/find-your-form-guid) | 02-get-forms |
| [Property field types in HubSpot](https://knowledge.hubspot.com/properties/property-field-types-in-hubspot) | 02-get-forms |

## Community HubSpot (issues recents)

| URL | Usage |
|-----|-------|
| [Issues capturing hubspotutk in form submission API (Apr 2025)](https://community.hubspot.com/t5/APIs-Integrations/Issues-capturing-the-hubspotutk-cookie-in-form-submission-with/m-p/1128469) | 04-tracking-hutk (problemes connus) |
| [Passing the hubspot tracking cookie with form API](https://community.hubspot.com/t5/APIs-Integrations/Passing-the-hubspot-tracking-cookie-with-form-api/m-p/332651) | 04-tracking-hutk |
| [Fill and submit forms using Private App](https://community.hubspot.com/t5/APIs-Integrations/fill-and-submit-forms-using-Private-App/m-p/736785) | 01-overview, 03-submit-form (auth) |
| [Hubspotutk tracking](https://community.hubspot.com/t5/APIs-Integrations/Hubspotutk-Tracking/td-p/835898) | 04-tracking-hutk |
| [Form API submission does not set tracking cookie](https://community.hubspot.com/t5/APIs-Integrations/Form-API-submission-does-not-set-tracking-cookie/td-p/270197) | 04-tracking-hutk |
| [Rate limits API confusion](https://community.hubspot.com/t5/APIs-Integrations/Rate-limits-API/m-p/1002704) | 05-best-practices |
| [Confused about HubSpot API rate limits and inconsistent responses](https://community.hubspot.com/t5/APIs-Integrations/Confused-about-HubSpot-API-rate-limits-and-inconsistent/td-p/1236557) | 05-best-practices |

## Tutoriels tiers

| URL | Usage |
|-----|-------|
| [Robert Ainslie - HubSpot Forms API gist (JavaScript complete)](https://gist.github.com/robertainslie/b110b8275beee1b27255c4d6e2ba2e8c) | 03-submit-form (code complet JS) |
| [Kevin Leary - Using HubSpot API to Submit Forms](https://www.kevinleary.net/blog/using-hubspot-api-to-submit-forms/) | 03-submit-form (Bearer + scopes) |
| [Acciyo - Mastering HubSpot Form Submission via API](https://www.acciyo.com/mastering-hubspot-form-submission-via-api-your-ultimate-guide/) | 03-submit-form (best practices) |
| [Reform - Ultimate Guide to HubSpot API Error Handling](https://www.reform.app/blog/ultimate-guide-to-hubspot-api-error-handling) | 05-best-practices (retry patterns) |
| [Reform - Custom API Integration with HubSpot Security Guide](https://www.reform.app/blog/custom-api-integration-hubspot-security-guide) | 03-submit-form (securite) |
| [Scopious Digital - HubSpot API Rate Limits in Production](https://www.scopiousdigital.com/blog/hubspot-api-rate-limits-production) | 05-best-practices (monitoring) |
| [MoldStud - HubSpot API rate limits guide](https://moldstud.com/articles/p-a-developers-guide-to-hubspot-rest-api-rate-limits-and-usage) | 05-best-practices |
| [HubSpot Developer Blog - Private vs Public Apps](https://developers.hubspot.com/blog/hubspot-integration-choosing-private-public-hubspot-apps) | 01-overview (auth modes) |

## Convergences observees (faits etablis cites 3+ fois)

1. **`hubspotutk` est crucial pour l'attribution** : cite par doc officielle + community (4 threads) + Robert Ainslie gist + Gravity Forms docs
2. **Endpoint public n'a pas d'auth** mais limite a 50 req/10s par IP : cite par doc rate-limits + Acciyo + Kevin Leary
3. **Bearer token JAMAIS cote client** : cite par doc auth + 3 tutoriels tiers + community
4. **Retry exponential backoff sur 429** : cite par Reform + MoldStud + Scopious
5. **`legalConsentOptions` necessaire RGPD** : cite par doc officielle + Acciyo

## Divergences notees

- **Limites rate exactes pour auth secure** : entre 100 et 200 req/10s selon tier (Free/Starter/Pro/Enterprise/API-Addon). Doc officielle ambiguie, mais le changelog d'annonce des tiered limits clarifie.
- **Format error 429** : `application/json` standard ou `text/plain; charset=UTF-8` avec code 1015 selon endpoint. Best : detecter par status, pas par body.

## Analyse projet

Pour [06-analyse-form-projet.md](06-analyse-form-projet.md), audit croise des fichiers du projet :

- `nopillo-landing-exemple/front/src/components/sections/ContactForm.tsx`
- `nopillo-landing-exemple/supabase/functions/contact-form/index.ts`
- `nopillo-landing-exemple/front/src/layouts/Base.astro` (verif tracking snippet manquant)
