import { useState } from 'react'

export default function Logo({ alto = 48, oscuro = false, icono = false }) {
  const [fallos, setFallos] = useState(0)
  const base = import.meta.env.BASE_URL
  const fuentes = icono ? [base + (oscuro ? 'isotipo-fondo-oscuro.svg' : 'isotipo-fondo-claro.svg'), base + 'isotipo.svg'] : [base + (oscuro ? 'logo-fondo-oscuro.svg' : 'logo-fondo-claro.svg'), base + 'logo.svg']

  if (fallos >= fuentes.length) {
    if (icono) {
      return (
        <svg height={alto} viewBox="0 0 48 48" role="img" aria-label="SIVAN">
          <rect width="48" height="48" rx="12" fill="#0E7490" />
          <path d="M24 11v26M11 24h26" stroke="#fff" strokeWidth="5" strokeLinecap="round" />
        </svg>
      )
    }
    return (
      <svg height={alto} viewBox="0 0 170 48" role="img" aria-label="SIVAN" style={{ maxWidth: '100%' }}>
        <rect width="48" height="48" rx="12" fill="#0E7490" />
        <path d="M24 11v26M11 24h26" stroke="#fff" strokeWidth="5" strokeLinecap="round" />
        <text x="58" y="35" fontSize="32" fontWeight="800" fontFamily="'Plus Jakarta Sans', system-ui, sans-serif" fill="currentColor">SIVAN</text>
      </svg>
    )
  }
  return <img key={fallos} src={fuentes[fallos]} height={alto} alt="SIVAN" style={{ width: 'auto', maxWidth: '100%', display: 'block' }} onError={() => setFallos(fallos + 1)} />
}
