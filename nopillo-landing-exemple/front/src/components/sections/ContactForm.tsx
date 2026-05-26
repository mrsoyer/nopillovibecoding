import { useState, useEffect, useRef } from 'react'
import { submitContactForm } from '../../lib/supabase'
import { readDKI, type DKIContext } from '../../lib/dki'
import { trackFormStart, trackFormSubmit, trackConversion } from '../../lib/tracking'

type Status = 'idle' | 'sending' | 'sent' | 'error'

export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [dki, setDki] = useState<DKIContext | null>(null)
  const startedRef = useRef(false)

  useEffect(() => {
    setDki(readDKI())
  }, [])

  function onFocus() {
    if (!startedRef.current) {
      trackFormStart('contact-main')
      startedRef.current = true
    }
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')
    setErrorMsg('')

    const form = e.currentTarget
    const data = new FormData(form)
    const payload = {
      name: String(data.get('name') || ''),
      email: String(data.get('email') || ''),
      phone: String(data.get('phone') || ''),
      message: String(data.get('message') || ''),
      source: 'landing-home',
      honeypot: String(data.get('website') || ''),
      utm: dki?.utm ?? undefined,
      gclid: dki?.gclid ?? null,
      search_term: dki?.search_term ?? null,
      match_type: dki?.match_type ?? null,
      device: dki?.device ?? null,
      landing_page_url: typeof window !== 'undefined' ? window.location.href : null,
    }

    try {
      const res = await submitContactForm(payload)
      trackFormSubmit('contact-main', dki?.keyword ?? null, dki?.match_type ?? null)
      trackConversion(res.leadId)
      setStatus('sent')
      form.reset()
    } catch (err) {
      console.error('Form submit failed', err)
      setErrorMsg(err instanceof Error ? err.message : 'Erreur inattendue')
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <div className="card-nopillo text-center py-12" style={{ background: 'white' }}>
        <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--color-secondary-500)' }}>
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
          </svg>
        </div>
        <h3 className="text-2xl font-bold mb-2">Merci !</h3>
        <p className="text-zinc-600">
          Vous recevrez votre simulation detaillee sous 24h ouvrees.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} onFocus={onFocus} className="card-nopillo space-y-4" style={{ background: 'white' }} noValidate>
      <h3 className="text-2xl font-bold mb-2">Recevez votre simulation gratuite</h3>
      <p className="text-zinc-600 mb-4">Un expert vous contacte sous 24h pour personnaliser votre cas.</p>

      <div>
        <label htmlFor="name" className="block text-sm font-semibold mb-1">Prenom</label>
        <input
          id="name" name="name" type="text" autoComplete="given-name"
          className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 outline-none transition"
          placeholder="Jean"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-semibold mb-1">Email <span className="text-red-500">*</span></label>
        <input
          id="email" name="email" type="email" required autoComplete="email"
          className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 outline-none transition"
          placeholder="jean@exemple.fr"
        />
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-semibold mb-1">Telephone</label>
        <input
          id="phone" name="phone" type="tel" autoComplete="tel"
          className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 outline-none transition"
          placeholder="06 12 34 56 78"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-semibold mb-1">Votre situation (optionnel)</label>
        <textarea
          id="message" name="message" rows={3}
          className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 outline-none transition resize-none"
          placeholder="1 studio LMNP a Paris, micro-BIC actuellement..."
        />
      </div>

      {/* Honeypot anti-spam, masque visuellement */}
      <input
        type="text" name="website" tabIndex={-1} autoComplete="off"
        style={{ position: 'absolute', left: '-9999px', opacity: 0 }} aria-hidden="true"
      />

      <button
        type="submit"
        disabled={status === 'sending'}
        className="btn btn-primary btn-lg"
        style={{ width: '100%' }}
      >
        {status === 'sending' ? 'Envoi en cours...' : 'Recevoir ma simulation gratuite'}
      </button>

      {status === 'error' && (
        <p role="alert" aria-live="polite" className="text-red-600 text-sm">
          {errorMsg || 'Une erreur est survenue. Reessayez ou contactez-nous a contact@nopillo.fr'}
        </p>
      )}

      <p className="text-xs text-zinc-500 leading-relaxed">
        En soumettant ce formulaire, vous acceptez que vos donnees soient traitees par Nopillo
        conformement a notre <a href="/privacy" className="underline">politique de confidentialite</a>.
      </p>
    </form>
  )
}
