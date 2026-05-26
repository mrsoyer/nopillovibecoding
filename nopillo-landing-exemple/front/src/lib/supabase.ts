import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = import.meta.env.PUBLIC_SUPABASE_URL
const SUPABASE_ANON_KEY = import.meta.env.PUBLIC_SUPABASE_ANON_KEY

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error('PUBLIC_SUPABASE_URL et PUBLIC_SUPABASE_ANON_KEY requis dans front/.env')
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

export type ContactFormPayload = {
  email: string
  name?: string
  phone?: string
  message?: string
  source?: string
  utm?: {
    source?: string | null
    medium?: string | null
    campaign?: string | null
    term?: string | null
    content?: string | null
  }
  gclid?: string | null
  search_term?: string | null
  match_type?: string | null
  device?: string | null
  landing_page_url?: string | null
  honeypot?: string
}

export type ContactFormResponse = {
  ok: true
  leadId: string
  hubspotContactId: string | null
}

export async function submitContactForm(payload: ContactFormPayload): Promise<ContactFormResponse> {
  const { data, error } = await supabase.functions.invoke('contact-form', { body: payload })
  if (error) throw error
  return data as ContactFormResponse
}
