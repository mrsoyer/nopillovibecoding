import { useState } from 'react'
import { trackSimulatorStart, trackSimulatorComplete } from '../../lib/tracking'

type Step = 1 | 2 | 3

export default function Simulator() {
  const [step, setStep] = useState<Step>(1)
  const [revenus, setRevenus] = useState(15000)
  const [regime, setRegime] = useState<'micro' | 'reel' | 'aucun'>('aucun')
  const [started, setStarted] = useState(false)

  function start() {
    if (!started) {
      trackSimulatorStart()
      setStarted(true)
    }
  }

  function compute(): number {
    // Calcul mocke : economie potentielle vs micro-BIC (50% abattement)
    // Regime reel = amortissement ~70% revenus = base imposable ~30%
    const reelBase = revenus * 0.3
    const microBase = revenus * 0.5
    const economie = Math.round((microBase - reelBase) * 0.3) // TMI moyen 30%
    return economie
  }

  function next() {
    if (step === 2) {
      trackSimulatorComplete(compute())
    }
    setStep((s) => (s + 1) as Step)
  }

  return (
    <div className="card-nopillo max-w-2xl mx-auto" style={{ background: 'white' }}>
      <div className="mb-6">
        <div className="flex items-center gap-2 text-sm text-zinc-500 mb-2">
          <span style={{ color: step >= 1 ? 'var(--color-primary-600)' : '#a1a1aa' }}>● Etape {step}/2</span>
        </div>
        <h3 className="text-2xl font-bold">Calculez votre economie</h3>
      </div>

      {step === 1 && (
        <div onFocus={start}>
          <label className="block mb-4">
            <span className="font-semibold mb-2 block">Revenus locatifs annuels (EUR)</span>
            <input
              type="range"
              min="5000"
              max="50000"
              step="500"
              value={revenus}
              onChange={(e) => setRevenus(Number(e.target.value))}
              className="w-full accent-indigo-600"
            />
            <span className="block text-2xl font-bold mt-2" style={{ color: 'var(--color-primary-600)' }}>
              {revenus.toLocaleString('fr-FR')} EUR
            </span>
          </label>

          <fieldset className="mb-6">
            <legend className="font-semibold mb-2">Regime actuel ?</legend>
            <div className="space-y-2">
              {[
                { v: 'aucun', label: 'Je n\'ai pas encore declare' },
                { v: 'micro', label: 'Micro-BIC (abattement 50%)' },
                { v: 'reel', label: 'Regime reel (mais sans expert)' },
              ].map((opt) => (
                <label key={opt.v} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="regime"
                    value={opt.v}
                    checked={regime === opt.v}
                    onChange={(e) => setRegime(e.target.value as typeof regime)}
                    className="accent-indigo-600"
                  />
                  <span>{opt.label}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <button type="button" className="btn-primary w-full" onClick={next}>
            Voir mon economie estimee
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="text-center py-6">
          <p className="text-sm text-zinc-500 mb-2">Avec Nopillo en regime reel, vous economiseriez environ</p>
          <p className="text-5xl font-bold mb-4" style={{ color: 'var(--color-secondary-500)' }}>
            {compute().toLocaleString('fr-FR')} EUR
          </p>
          <p className="text-zinc-600 mb-6">
            par an, soit {(compute() * 5).toLocaleString('fr-FR')} EUR sur 5 ans.
          </p>
          <a href="#contact" className="btn-primary inline-block">
            Recevoir ma simulation detaillee
          </a>
        </div>
      )}
    </div>
  )
}
