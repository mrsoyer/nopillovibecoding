-- Migration: create_leads
-- Project: nopillo-landing-exemple
-- Purpose: stocker les leads collectes via la landing page

CREATE TABLE IF NOT EXISTS public.leads (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email         text NOT NULL,
  name          text,
  phone         text,
  message       text,
  source        text,
  utm_source    text,
  utm_medium    text,
  utm_campaign  text,
  utm_term      text,
  utm_content   text,
  gclid         text,
  search_term   text,
  match_type    text,
  device        text,
  landing_page_url text,
  hubspot_contact_id text,
  payload       jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at    timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_leads_created_at ON public.leads (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_email ON public.leads (email);
CREATE INDEX IF NOT EXISTS idx_leads_source ON public.leads (source);
CREATE INDEX IF NOT EXISTS idx_leads_utm_term ON public.leads (utm_term);
CREATE INDEX IF NOT EXISTS idx_leads_gclid ON public.leads (gclid);

-- RLS active : aucun acces public par defaut.
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

COMMENT ON TABLE public.leads IS 'Leads collectes via la landing nopillo-landing-exemple. Insertion via Edge Function uniquement.';
COMMENT ON COLUMN public.leads.utm_term IS 'KW Google Ads (= keyword configure)';
COMMENT ON COLUMN public.leads.search_term IS 'Search Term reel pour Broad Match';
COMMENT ON COLUMN public.leads.gclid IS 'Google Click ID pour Offline Conversion Import';
COMMENT ON COLUMN public.leads.hubspot_contact_id IS 'ID du contact HubSpot apres push API';
