import { useState } from 'react'
import Logo from './Logo.jsx'
import { Campo, BotonTema } from './ui.jsx'
import { Consulta } from './Vistas.jsx'

const USUARIOS = { master: 'master', centro: 'centro', subregion: 'subregion' }
const TITULOS = { consulta: 'Consulta tu tarjeta de vacunación', login: 'Iniciar sesión', recuperar: 'Recuperar contraseña' }

export default function Login({ onEntrar, tema, alternar }) {
  const [modo, setModo] = useState('consulta')
  const [usuario, setUsuario] = useState('')
  const [clave, setClave] = useState('')
  const [error, setError] = useState('')
  const [aviso, setAviso] = useState('')
  const ir = (m) => { setModo(m); setError(''); setAviso('') }

  const entrar = (e) => {
    e.preventDefault()
    if (!usuario.trim() || !clave.trim()) return setError('Escribe tu usuario y tu clave para continuar.')
    const rol = USUARIOS[usuario.trim().toLowerCase()]
    if (!rol) return setError('Usuario o clave incorrectos.')
    onEntrar({ rol, nombre: usuario.trim() })
  }
  const recuperar = (e) => { e.preventDefault(); setAviso('Si el correo está registrado, te enviamos un enlace para crear una nueva clave.') }

  return (
    <main className="login">
      <div className="bg" aria-hidden="true"><i /><i /></div>
      <div className="login-tema">
        {modo === 'consulta' && <button className="btn btn-sm" onClick={() => ir('login')}>Iniciar sesión</button>}
        <BotonTema tema={tema} alternar={alternar} />
      </div>
      <div className={'carnet' + (modo === 'consulta' ? ' ancho' : '')}>
        <header className="carnet-cab">
          <h1 className="sr">SIVAN</h1>
          <Logo key={String(tema)} alto={76} oscuro={tema === 'dark'} />
          <p>Sistema de Vacunación Nacional</p>
        </header>
        <div className="perforado" />
        <h2>{TITULOS[modo]}</h2>

        {modo === 'consulta' && (<>
          <p className="muted">Escribe tu cédula para ver tus vacunas y recibirlas en tu correo.</p>
          <Consulta />
        </>)}

        {modo === 'login' && (
          <form className="stack" onSubmit={entrar} noValidate>
            <Campo label="Usuario"><input value={usuario} onChange={(e) => setUsuario(e.target.value)} autoComplete="username" /></Campo>
            <Campo label="Clave"><input type="password" value={clave} onChange={(e) => setClave(e.target.value)} autoComplete="current-password" /></Campo>
            {error && <p className="error" role="alert">{error}</p>}
            <button className="btn" type="submit">Entrar</button>
            <button type="button" className="enlace" onClick={() => ir('recuperar')}>¿Olvidaste tu contraseña?</button>
          </form>
        )}

        {modo === 'recuperar' && (
          <form className="stack" onSubmit={recuperar}>
            <p className="muted">Escribe el correo de tu cuenta y te enviaremos un enlace para crear una clave nueva.</p>
            <Campo label="Correo electrónico"><input type="email" required /></Campo>
            {aviso && <p className="ok" role="status">{aviso}</p>}
            <button className="btn" type="submit">Enviar enlace</button>
          </form>
        )}

        {modo !== 'consulta' && (
          <nav className="enlaces" aria-label="Más opciones">
            {modo === 'recuperar' && <button className="enlace" onClick={() => ir('login')}>Iniciar sesión</button>}
            <button className="enlace" onClick={() => ir('consulta')}>Consultar cédula</button>
          </nav>
        )}
      </div>
    </main>
  )
}
