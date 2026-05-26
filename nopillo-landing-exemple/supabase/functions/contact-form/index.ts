// Edge Function : contact-form
// Project : nopillo-landing-exemple
// Handles : POST /functions/v1/contact-form
// Body    : { email, name?, phone?, message?, utm?, gclid?, search_term?, match_type?, device?, landing_page_url?, honeypot? }
// Returns : { ok: true, leadId } ou { error: string }

import { createClient } from 'jsr:@supabase/supabase-js@2'

const ALLOWED_ORIGINS = [
  'http://localhost:4321',
  'http://localhost:5173',
  'https://nopillo-landing-exemple.netlify.app',
]

function corsHeaders(origin: string | null): Record<string, string> {
  const allowed = origin && ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0]
  return {
    'Access-Control-Allow-Origin': allowed,
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Max-Age': '86400',
  }
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 254
}

async function pushToHubSpot(lead: Record<string, unknown>): Promise<string | null> {
  const apiKey = Deno.env.get('HUBSPOT_API_KEY')
  if (!apiKey) {
    console.log('HUBSPOT_API_KEY not set, skipping HubSpot push')
    return null
  }

  const [firstname, ...rest] = (lead.name as string | null ?? '').split(' ')
  const lastname = rest.join(' ') || ''

  const properties: Record<string, string> = {
    email: lead.email as string,
    firstname: firstname || '',
    lastname,
    phone: (lead.phone as string | null) ?? '',
    message: (lead.message as string | null) ?? '',
    utm_source: (lead.utm_source as string | null) ?? '',
    utm_campaign: (lead.utm_campaign as string | null) ?? '',
    utm_term: (lead.utm_term as string | null) ?? '',
    utm_content: (lead.utm_content as string | null) ?? '',
    gclid: (lead.gclid as string | null) ?? '',
    search_term: (lead.search_term as string | null) ?? '',
    match_type: (lead.match_type as string | null) ?? '',
    device: (lead.device as string | null) ?? '',
    landing_page_url: (lead.landing_page_url as string | null) ?? '',
  }

  try {
    const res = await fetch('https://api.hubapi.com/crm/v3/objects/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({ properties }),
    })

    if (res.status === 409) {
      // Contact existe deja : update via search + patch
      const searchRes = await fetch('https://api.hubapi.com/crm/v3/objects/contacts/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          filterGroups: [{ filters: [{ propertyName: 'email', operator: 'EQ', value: lead.email }] }],
          limit: 1,
        }),
      })
      const search = await searchRes.json()
      const existingId = search?.results?.[0]?.id
      if (existingId) {
        await fetch(`https://api.hubapi.com/crm/v3/objects/contacts/${existingId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({ properties }),
        })
        return existingId
      }
      return null
    }

    if (!res.ok) {
      const text = await res.text()
      console.error('HubSpot push failed:', res.status, text)
      return null
    }

    const data = await res.json()
    return data.id as string
  } catch (err) {
    console.error('HubSpot push error:', err)
    return null
  }
}

Deno.serve(async (req) => {
  const origin = req.headers.get('origin')
  const headers = { ...corsHeaders(origin), 'Content-Type': 'application/json' }

  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers })
  }

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405, headers })
  }

  try {
    const body = await req.json()
    const {
      email, name, phone, message,
      source, utm, gclid, search_term, match_type, device,
      landing_page_url, honeypot,
    } = body

    if (honeypot) {
      // Trap spam silencieusement
      return new Response(JSON.stringify({ ok: true }), { status: 200, headers })
    }

    if (!email || typeof email !== 'string' || !isValidEmail(email)) {
      return new Response(JSON.stringify({ error: 'Email invalide' }), { status: 400, headers })
    }

    if (name && (typeof name !== 'string' || name.length > 200)) {
      return new Response(JSON.stringify({ error: 'Nom invalide' }), { status: 400, headers })
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    )

    const leadData = {
      email: email.toLowerCase().trim(),
      name: name?.trim() ?? null,
      phone: phone?.trim() ?? null,
      message: message?.trim() ?? null,
      source: source ?? 'landing-home',
      utm_source: utm?.source ?? null,
      utm_medium: utm?.medium ?? null,
      utm_campaign: utm?.campaign ?? null,
      utm_term: utm?.term ?? null,
      utm_content: utm?.content ?? null,
      gclid: gclid ?? null,
      search_term: search_term ?? null,
      match_type: match_type ?? null,
      device: device ?? null,
      landing_page_url: landing_page_url ?? null,
    }

    // 1. Push HubSpot (async, non-bloquant si echec)
    const hubspotContactId = await pushToHubSpot(leadData)

    // 2. Insert Supabase
    const { data, error } = await supabase
      .from('leads')
      .insert({
        ...leadData,
        hubspot_contact_id: hubspotContactId,
        payload: {
          user_agent: req.headers.get('user-agent'),
          referer: req.headers.get('referer'),
        },
      })
      .select('id')
      .single()

    if (error) {
      console.error('Insert error:', error)
      return new Response(JSON.stringify({ error: 'Erreur serveur, reessayez' }), { status: 500, headers })
    }

    return new Response(
      JSON.stringify({ ok: true, leadId: data.id, hubspotContactId }),
      { status: 200, headers },
    )
  } catch (err) {
    console.error('Unexpected error:', err)
    return new Response(JSON.stringify({ error: 'Erreur serveur' }), { status: 500, headers })
  }
})
