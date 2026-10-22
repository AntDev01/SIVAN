import { useState, useEffect } from 'react'
import Login from './Login.jsx'
import Logo from './Logo.jsx'
import { PERFILES } from './perfiles.js'
import { VISTAS } from './Vistas.jsx'
import { Icono, BotonTema } from './ui.jsx'

export default function App() {
  const [sesion, setSesion] = useState(null)
  const [seccion, setSeccion] = useState(0)
  const [abierto, setAbierto] = useState(true)
  const [tema, setTema] = useState(() => localStorage.getItem('sivan-tema') || 'light')
  useEffect(() => { document.documentElement.dataset.theme = tema; localStorage.setItem('sivan-tema', tema) }, [tema])
  const alternar = () => setTema(tema === 'dark' ? 'light' : 'dark')

  if (!sesion) return <Login tema={tema} alternar={alternar} onEntrar={(s) => { setSesion(s); setSeccion(0) }} />

  const perfil = PERFILES[sesion.rol]
  const [titulo] = perfil.secciones[seccion]
  const Vista = VISTAS[titulo]
  return (
    <div className={'shell' + (abierto ? '' : ' cerrado')}>
      <aside className="side">
        <div className="brand">
          {abierto ? <Logo alto={40} oscuro /> : <Logo icono alto={36} oscuro />}
          <button className="icon-btn toggle" onClick={() => setAbierto(!abierto)} aria-label={abierto ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={abierto}><Icono n="menu" /></button>
        </div>
        <nav className="nav" aria-label="Secciones">
          {perfil.secciones.map(([s, ic], i) => (
            <button key={s} title={s} aria-label={s} className={i === seccion ? 'on' : ''} onClick={() => setSeccion(i)}><Icono n={ic} /><span className="txt">{s}</span></button>
          ))}
        </nav>
        <div className="user">
          <div className="quien"><span className="avatar">{sesion.nombre[0].toUpperCase()}</span><span className="txt"><b>{sesion.nombre}</b><small>{perfil.nombre}</small></span></div>
          <button className="salir" title="Cerrar sesión" onClick={() => setSesion(null)}><Icono n="salir" /><span className="txt">Cerrar sesión</span></button>
        </div>
      </aside>
      <main className="main">
        <div className="topbar">
          <div className="tit"><span className="iso"><Logo icono alto={34} oscuro={tema === 'dark'} /></span><h2>{titulo}</h2></div>
          <div className="acciones">
            <BotonTema tema={tema} alternar={alternar} />
            <button className="icon-btn movil" onClick={() => setSesion(null)} aria-label="Cerrar sesión"><Icono n="salir" /></button>
          </div>
        </div>
        <Vista />
      </main>
    </div>
  )
}
