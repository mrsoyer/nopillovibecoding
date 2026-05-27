import { useState, useRef } from 'react'

type Status = 'idle' | 'sending' | 'sent'

export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle')
  const startedRef = useRef(false)

  function onFocus() {
    startedRef.current = true
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')
    const form = e.currentTarget
    await new Promise(r => setTimeout(r, 600))
    setStatus('sent')
    form.reset()
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

      <p className="text-xs text-zinc-500 leading-relaxed">
        En soumettant ce formulaire, vous acceptez que vos donnees soient traitees par Nopillo
        conformement a notre <a href="/privacy" className="underline">politique de confidentialite</a>.
      </p>
    </form>
  )
}
