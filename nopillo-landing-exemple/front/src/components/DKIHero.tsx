import { useEffect, useState } from 'react'
import { readDKI, capitalize, type DKIContext } from '../lib/dki'

export default function DKIHero() {
  const [dki, setDki] = useState<DKIContext | null>(null)

  useEffect(() => {
    setDki(readDKI())
  }, [])

  const keyword = capitalize(dki?.keyword)
  const city = dki?.city

  return (
    <>
      <h1 className="hero-h1">
        <span>Simplifiée.</span>
        <br />
        <span style={{ color: 'var(--color-indigo-600)' }}>Optimisée.</span>
      </h1>
      <p className="hero-subline">
        {keyword
          ? <>Votre <strong>{keyword}</strong>{city && <> à <strong>{city}</strong></>}, en ligne.</>
          : <>Votre déclaration fiscale LMNP.</>
        }
      </p>
      <p className="hero-desc">
        Propriétaire en location meublée non professionnelle ? Économisez en moyenne
        <strong> 4 800 €/an </strong> avec le régime réel. Notre expert-comptable certifié
        prépare et télétransmet votre liasse 2031 — sans paperasse, sans risque.
      </p>

      <style>{`
        .hero-h1 {
          font-family: var(--font-display);
          font-size: clamp(40px, 5vw + 1rem, 68px);
          font-weight: 700;
          line-height: 1.05;
          letter-spacing: -0.02em;
          color: var(--color-brand-black);
          margin: 0 0 20px;
        }
        .hero-subline {
          font-family: var(--font-display);
          font-size: clamp(18px, 1.5vw + 0.5rem, 22px);
          font-weight: 500;
          color: var(--color-brand-black);
          margin: 0 0 16px;
        }
        .hero-desc {
          font-size: clamp(15px, 1vw + 0.4rem, 17px);
          line-height: 1.6;
          color: var(--color-graycool-700, #404968);
          margin: 0;
          max-width: 540px;
        }
      `}</style>
    </>
  )
}
