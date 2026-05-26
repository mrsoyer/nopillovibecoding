// Edge Function : hubspot-form-submit
// Project   : nopillo-landing-exemple
// Purpose   : forward un formulaire au form HubSpot 107536bf-c2cb-44de-89ea-8c3101f83870
//             (portal 26173790) via HubSpot Forms Submissions API v3.
//
// Endpoint  : POST /functions/v1/hubspot-form-submit
// Body      : { email?, maturite_du_projet?, date_du_projet_estime?, type_de_projet_envisage?,
//               hutk?, pageUri?, pageName? }
// Returns   : { ok: true, hubspotMessage } ou { ok: false, error, details? }
//
// Doc form  : https://app-eu1.hubspot.com/forms/26173790/new-editor/107536bf-c2cb-44de-89ea-8c3101f83870
// Doc API   : @docs/hubspot/forms-api/

const HUBSPOT_PORTAL_ID = '26173790'
const HUBSPOT_FORM_ID = '107536bf-c2cb-44de-89ea-8c3101f83870'
const SUBMIT_URL = `https://api.hsforms.com/submissions/v3/integration/submit/${HUBSPOT_PORTAL_ID}/${HUBSPOT_FORM_ID}`

// CORS : limiter aux origines connues
const ALLOWED_ORIGINS = [
  'http://localhost:4321',
  'http://localhost:5173',
  'https://nopillo-landing-exemple.netlify.app',
]

// Valeurs autorisees pour les dropdowns (extraites du form HubSpot)
const ENUM_MATURITE = [
  'Je débute ma réflexion',
  "J'ai un projet d'achat mais rien de signé",
  "J'ai une promesse de vente",
  "J'ai déjà un bien à louer ou déjà loué",
] as const

const ENUM_DATE = [
  'Moins de 3 mois',
  '3 à 6 mois',
  'Plus de 6 mois',
  'Je ne sais pas',
] as const

const ENUM_TYPE = [
  'LMNP / Meublé',
  'Location nue',
  'SCI',
  'Autre',
  'Je ne sais pas',
] as const

type Payload = {
  email?: string
  maturite_du_projet?: string
  date_du_projet_estime?: string
  type_de_projet_envisage?: string
  hutk?: string
  pageUri?: string
  pageName?: string
  honeypot?: string
}

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

// Le hutk authentique est un hex de 32 chars genere par le tracking code HubSpot.
// On filtre tout ce qui ne ressemble pas pour eviter le rejet INVALID_HUTK.
function sanitizeHutk(hutk: string | null | undefined): string | null {
  if (!hutk || typeof hutk !== 'string') return null
  return /^[a-f0-9]{32}$/i.test(hutk.trim()) ? hutk.trim() : null
}

function validate(body: Payload): string | null {
  if (body.email && !isValidEmail(body.email)) {
    return 'Email invalide'
  }
  if (body.maturite_du_projet && !ENUM_MATURITE.includes(body.maturite_du_projet as typeof ENUM_MATURITE[number])) {
    return `Valeur invalide pour maturite_du_projet. Attendu : ${ENUM_MATURITE.join(' | ')}`
  }
  if (body.date_du_projet_estime && !ENUM_DATE.includes(body.date_du_projet_estime as typeof ENUM_DATE[number])) {
    return `Valeur invalide pour date_du_projet_estime. Attendu : ${ENUM_DATE.join(' | ')}`
  }
  if (body.type_de_projet_envisage && !ENUM_TYPE.includes(body.type_de_projet_envisage as typeof ENUM_TYPE[number])) {
    return `Valeur invalide pour type_de_projet_envisage. Attendu : ${ENUM_TYPE.join(' | ')}`
  }
  // Au moins un champ doit etre renseigne pour avoir du sens
  if (!body.email && !body.maturite_du_projet && !body.type_de_projet_envisage) {
    return 'Aucun champ rempli'
  }
  return null
}

function buildFields(body: Payload) {
  const out: Array<{ objectTypeId: string; name: string; value: string }> = []
  const push = (name: string, value?: string) => {
    if (value && value.trim()) {
      out.push({ objectTypeId: '0-1', name, value: value.trim() })
    }
  }
  push('email', body.email)
  push('maturite_du_projet', body.maturite_du_projet)
  push('date_du_projet_estime', body.date_du_projet_estime)
  push('type_de_projet_envisage', body.type_de_projet_envisage)
  return out
}

async function submitWithRetry(payload: object, maxRetries = 3): Promise<Response> {
  let delay = 800
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    const res = await fetch(SUBMIT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    // Succes ou erreur non-retriable : sortir
    if (res.ok || (res.status >= 400 && res.status < 500 && res.status !== 429)) {
      return res
    }
    // 429 ou 5xx : attendre + retry avec backoff
    const retryAfter = parseInt(res.headers.get('retry-after') ?? '0', 10) * 1000
    await new Promise((r) => setTimeout(r, Math.max(delay, retryAfter)))
    delay *= 2
  }
  // Dernier essai
  return fetch(SUBMIT_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
}

Deno.serve(async (req) => {
  const origin = req.headers.get('origin')
  const headers = { ...corsHeaders(origin), 'Content-Type': 'application/json' }

  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers })
  }

  if (req.method !== 'POST') {
    return new Response(
      JSON.stringify({ ok: false, error: 'Method not allowed' }),
      { status: 405, headers },
    )
  }

  let body: Payload
  try {
    body = await req.json()
  } catch {
    return new Response(
      JSON.stringify({ ok: false, error: 'JSON invalide' }),
      { status: 400, headers },
    )
  }

  // Honeypot anti-spam (silent ok)
  if (body.honeypot) {
    return new Response(JSON.stringify({ ok: true }), { status: 200, headers })
  }

  // Validation
  const validationError = validate(body)
  if (validationError) {
    return new Response(
      JSON.stringify({ ok: false, error: validationError }),
      { status: 400, headers },
    )
  }

  // Construire le payload HubSpot
  const fields = buildFields(body)
  const sanitizedHutk = sanitizeHutk(body.hutk)
  const hubspotPayload = {
    submittedAt: Date.now(),
    fields,
    context: {
      // null plutot qu'un hutk malforme : HubSpot retourne INVALID_HUTK sinon
      hutk: sanitizedHutk,
      pageUri: body.pageUri ?? null,
      pageName: body.pageName ?? null,
      ipAddress: req.headers.get('x-forwarded-for')?.split(',')[0].trim() ?? null,
    },
  }

  // Submit avec retry exponential backoff
  const start = Date.now()
  let res: Response
  try {
    res = await submitWithRetry(hubspotPayload)
  } catch (err) {
    console.error(JSON.stringify({
      event: 'hubspot_submit_network_error',
      err: err instanceof Error ? err.message : String(err),
    }))
    return new Response(
      JSON.stringify({ ok: false, error: 'Erreur reseau HubSpot' }),
      { status: 502, headers },
    )
  }
  const latencyMs = Date.now() - start

  // Reponse HubSpot
  if (res.ok) {
    const data = await res.json().catch(() => ({}))
    console.log(JSON.stringify({
      event: 'hubspot_submit_success',
      status: res.status,
      latencyMs,
      fieldsCount: fields.length,
      hutkPresent: Boolean(body.hutk),
    }))
    return new Response(
      JSON.stringify({
        ok: true,
        hubspotMessage: data.inlineMessage || 'Submission acceptee',
        redirectUri: data.redirectUri ?? null,
      }),
      { status: 200, headers },
    )
  }

  // Erreur HubSpot
  const errorBody = await res.text()
  console.error(JSON.stringify({
    event: 'hubspot_submit_failure',
    status: res.status,
    latencyMs,
    body: errorBody.slice(0, 500),
  }))

  let parsedError: unknown
  try {
    parsedError = JSON.parse(errorBody)
  } catch {
    parsedError = errorBody
  }

  return new Response(
    JSON.stringify({
      ok: false,
      error: `HubSpot a rejete la submission (${res.status})`,
      details: parsedError,
    }),
    { status: res.status === 429 ? 429 : 502, headers },
  )
})
