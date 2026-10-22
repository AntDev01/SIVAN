import { useState } from 'react'
import { Tabla, Campo, Insignia } from './ui.jsx'

const CEDULA_DEMO = '32922274'
const PERSONA = { nombre: 'Carlos Antón', nac: '29/03/2007', sangre: 'O+',
  vacunas: [['Fiebre amarilla', 'FA-2291', '04/02/2023', 'CDI Los Próceres'], ['Hepatitis B', 'HB-1180', '18/06/2023', 'Hospital Central'], ['Influenza', 'IN-7765', '09/10/2025', 'Módulo San José']] }

export function Consulta() {
  const [ced, setCed] = useState('')
  const [res, setRes] = useState(null)
  const [env, setEnv] = useState(false)
  const [letra, setLetra] = useState('V')
  const buscar = (e) => {
    e.preventDefault()
    setEnv(false)
    const t = ced.trim()
    if (!t) return setRes('vacio')
    if (!/^[ve][-\s]?\d[\d.]*$/i.test(t)) return setRes('formato')
    setLetra(/^e/i.test(t) ? 'E' : 'V')
    setRes(t.replace(/\D/g, '') === CEDULA_DEMO ? 'ok' : 'nada')
  }
  return (
    <div className="stack">
      <form className="buscar" onSubmit={buscar}>
        <input value={ced} onChange={(e) => setCed(e.target.value)} placeholder="Cédula (inicia con V o E)" aria-label="Cédula" />
        <button className="btn" type="submit">Consultar</button>
      </form>
      {res === 'vacio' && <p className="error" role="alert">Escribe una cédula para consultar.</p>}
      {res === 'formato' && <p className="error" role="alert">La cédula debe iniciar con V o E, seguida de los números.</p>}
      {res === 'nada' && <p className="error" role="alert">No hay ninguna persona registrada con esa cédula.</p>}
      {res === 'ok' && (
        <section className="panel stack">
          <div><h3>{PERSONA.nombre}</h3><p className="muted">Cédula {letra}-{CEDULA_DEMO.replace(/\B(?=(\d{3})+(?!\d))/g, '.')} · Nació el {PERSONA.nac} · Sangre {PERSONA.sangre}</p></div>
          <Tabla cols={['Vacuna', 'Lote', 'Fecha', 'Centro']} filas={PERSONA.vacunas} />
          <button className="btn" onClick={() => setEnv(true)}>Enviar al correo</button>
          {env && <p className="ok" role="status">Enviado a m***@correo.com.</p>}
        </section>
      )}
    </div>
  )
}

function Formulario({ campos, boton, ok }) {
  const [hecho, setHecho] = useState(false)
  return (
    <form className="form" onSubmit={(e) => { e.preventDefault(); setHecho(true) }}>
      {campos.map((c) => (
        <Campo key={c.l} label={c.l}>
          {c.op ? <select required>{c.op.map((o) => <option key={o}>{o}</option>)}</select> : <input type={c.t || 'text'} required />}
        </Campo>
      ))}
      <button className="btn" type="submit">{boton}</button>
      {hecho && <p className="ok" role="status">{ok}</p>}
    </form>
  )
}

const Interruptor = ({ on, cambiar, nombre }) => (
  <button role="switch" aria-checked={on} aria-label={nombre} className={'sw' + (on ? ' on' : '')} onClick={cambiar}><i /></button>
)

function Panel() {
  const stats = [['Personas registradas', '12.480'], ['Dosis aplicadas', '38.215'], ['Certificados emitidos', '3.942'], ['Solicitudes pendientes', '57']]
  const barras = [['Fiebre amarilla', 82], ['Tétanos', 79], ['Hepatitis B', 74], ['COVID-19', 68], ['Influenza', 61]]
  return (
    <div className="stack">
      <div className="stats">{stats.map(([t, v]) => <div className="panel" key={t}><p className="muted">{t}</p><strong className="num">{v}</strong></div>)}</div>
      <section className="panel stack"><h3>Personas inmunizadas por vacuna</h3>
        {barras.map(([n, p]) => <div className="barra" key={n}><span>{n}</span><div><b style={{ width: p + '%' }} /></div><span>{p}%</span></div>)}
      </section>
    </div>
  )
}

const BIT = [['Pedro', '15/10/26 3:00 pm', 'Eliminó', 'Vacunas, ID 8', 'Registro duplicado'], ['Ana Rivas', '15/10/26 2:20 pm', 'Editó', 'Centro de salud, ID 3', 'Cambió la parroquia'],
  ['Luis Mora', '14/10/26 11:05 am', 'Desactivó', 'Vacuna Fiebre amarilla', 'Lote vencido'], ['Pedro', '14/10/26 9:40 am', 'Creó', 'Centro de salud, ID 12', 'Nuevo módulo']]
function Bitacora() {
  const [q, setQ] = useState('')
  const filas = BIT.filter((r) => r.join(' ').toLowerCase().includes(q.toLowerCase()))
  return (
    <div className="stack">
      <input className="busca" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar por usuario, acción o registro" aria-label="Buscar en la bitácora" />
      {filas.length ? <Tabla cols={['Usuario', 'Fecha y hora', 'Acción', 'Registro', 'Observación']} filas={filas} /> : <p className="muted">No hay movimientos que coincidan.</p>}
    </div>
  )
}

const CENTROS = [['CDI Los Próceres', 'CDI', 'Miranda', 'Sucre', 'Petare'], ['Hospital Central', 'Hospital', 'Distrito Capital', 'Libertador', 'Catedral'],
  ['Módulo San José', 'Módulo', 'Carabobo', 'Valencia', 'San José'], ['Seguro Social Maracay', 'Seguro Social', 'Aragua', 'Girardot', 'Madre María']]
function Centros() {
  const [q, setQ] = useState('')
  return (
    <div className="stack">
      <div className="buscar"><input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar por estado, municipio o parroquia" aria-label="Buscar centros" /><button className="btn">Nuevo centro</button></div>
      <Tabla cols={['Centro', 'Tipo', 'Estado', 'Municipio', 'Parroquia']} filas={CENTROS.filter((r) => r.join(' ').toLowerCase().includes(q.toLowerCase()))} />
    </div>
  )
}

function Catalogo() {
  const [v, setV] = useState({ 'Fiebre amarilla': true, 'Hepatitis B': true, Influenza: true, Tétanos: true })
  const [x, setX] = useState({ Respiratorio: true, Heces: true, Orina: true, Físico: true, VDRL: true, VIH: true, Citológico: true })
  const lista = (t, o, set) => (
    <section className="panel stack"><h3>{t}</h3>
      {Object.entries(o).map(([n, on]) => <div className="fila" key={n}><span>{n}{!on && <em className="muted"> (desactivada)</em>}</span><Interruptor on={on} nombre={n} cambiar={() => set({ ...o, [n]: !on })} /></div>)}
    </section>
  )
  return <div className="dos">{lista('Vacunas', v, setV)}{lista('Exámenes', x, setX)}</div>
}

function RegPersona() {
  return <section className="panel"><Formulario boton="Guardar persona" ok="Persona registrada correctamente." campos={[{ l: 'Nombres' }, { l: 'Apellidos' }, { l: 'Cédula' }, { l: 'Fecha de nacimiento', t: 'date' }, { l: 'Tipo de sangre', op: ['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'] }, { l: 'Dirección' }]} /></section>
}
function RegVacuna() {
  return <section className="panel"><Formulario boton="Guardar vacuna" ok="Vacuna registrada en la tarjeta de la persona." campos={[{ l: 'Cédula' }, { l: 'Vacuna', op: ['Fiebre amarilla', 'Hepatitis B', 'Influenza', 'Tétanos'] }, { l: 'Lote' }, { l: 'Fecha de vacunación', t: 'date' }, { l: 'Estado' }, { l: 'Municipio' }, { l: 'Parroquia' }]} /></section>
}

function Solicitudes() {
  const [f, setF] = useState([['V-32.922.274', 'Carlos Antón', 'Pendiente', ''], ['V-9.876.543', 'José Rondón', 'Pendiente', ''], ['V-15.222.111', 'Carla Díaz', 'Aprobada', 'Certificado enviado al correo'], ['V-20.111.222', 'Luis Pérez', 'Rechazada', 'Faltan exámenes: VDRL y orina']])
  const set = (i, e, m) => setF(f.map((r, j) => (j === i ? [r[0], r[1], e, m] : r)))
  const filas = f.map((r, i) => [r[0], r[1], <Insignia estado={r[2]} />, r[3] || '—',
    r[2] === 'Pendiente' ? <span className="acc"><button className="mini" onClick={() => set(i, 'Aprobada', 'Certificado enviado al correo')}>Aprobar</button><button className="mini mala" onClick={() => set(i, 'Rechazada', 'Faltan exámenes por completar')}>Rechazar</button></span> : '—'])
  return <Tabla cols={['Cédula', 'Solicitante', 'Estado', 'Nota', 'Acciones']} filas={filas} />
}

const EX = { Respiratorio: [{ l: 'Radiografía de tórax', op: ['Normal', 'Alterada'] }, { l: 'Observaciones' }], Heces: [{ l: 'Parásitos', op: ['No se observan', 'Presentes'] }, { l: 'Observaciones' }],
  Orina: [{ l: 'Aspecto', op: ['Normal', 'Turbio'] }, { l: 'Proteínas', op: ['Negativo', 'Positivo'] }], Físico: [{ l: 'Peso (kg)', t: 'number' }, { l: 'Talla (cm)', t: 'number' }, { l: 'Presión arterial' }],
  VDRL: [{ l: 'Resultado', op: ['No reactivo', 'Reactivo'] }], VIH: [{ l: 'Resultado', op: ['No reactivo', 'Reactivo'] }], Citológico: [{ l: 'Resultado', op: ['Negativo', 'Anormal'] }, { l: 'Fecha de toma', t: 'date' }] }
function Examenes() {
  const [t, setT] = useState('Respiratorio')
  return (
    <section className="panel stack">
      <Campo label="Tipo de examen"><select value={t} onChange={(e) => setT(e.target.value)}>{Object.keys(EX).map((k) => <option key={k}>{k}</option>)}</select></Campo>
      {t === 'Citológico' && <p className="muted">Solo se solicita a mujeres.</p>}
      <Formulario key={t} boton="Guardar examen" ok="Examen registrado." campos={[{ l: 'Cédula' }, ...EX[t]]} />
    </section>
  )
}

function Certificados() {
  const [env, setEnv] = useState({})
  const datos = [['C-0041', 'Carla Díaz', '15/10/26'], ['C-0040', 'Pedro Salas', '14/10/26'], ['C-0039', 'Ana Rivas', '12/10/26']]
  return <Tabla cols={['Certificado', 'Persona', 'Emitido', 'Acciones']} filas={datos.map(([c, n, d]) => [c, n, d,
    <span className="acc"><button className="mini">Ver historial</button><button className="mini" onClick={() => setEnv({ ...env, [c]: 1 })}>{env[c] ? 'Enviado' : 'Enviar al correo'}</button></span>])} />
}

function Usuarios() {
  const [u, setU] = useState([['Pedro Salas', 'Máster', '—', true], ['Ana Rivas', 'Centro de salud', 'Hospital Central', true], ['Luis Mora', 'Subregión de salud', 'Subregión Capital', false]])
  const [form, setForm] = useState(false)
  const [msg, setMsg] = useState('')
  const crear = (e) => {
    e.preventDefault()
    const d = new FormData(e.target)
    setU([...u, [d.get('nombre'), d.get('perfil'), d.get('lugar') || '—', true]])
    setMsg('Usuario creado. La clave temporal se envió a ' + d.get('correo') + '.')
    setForm(false)
  }
  const alt = (i) => setU(u.map((r, j) => (j === i ? [r[0], r[1], r[2], !r[3]] : r)))
  return (
    <div className="stack">
      <div className="buscar">
        <p className="muted" style={{ flex: 1 }}>Solo el Máster crea las cuentas. La persona recibe una clave temporal y debe cambiarla al entrar.</p>
        <button className="btn" onClick={() => setForm(!form)}>{form ? 'Cancelar' : 'Nuevo usuario'}</button>
      </div>
      {msg && <p className="ok" role="status">{msg}</p>}
      {form && (
        <section className="panel"><form className="form" onSubmit={crear}>
          <Campo label="Nombres y apellidos"><input name="nombre" required /></Campo>
          <Campo label="Cédula"><input name="cedula" required /></Campo>
          <Campo label="Correo electrónico"><input name="correo" type="email" required /></Campo>
          <Campo label="Perfil"><select name="perfil"><option>Centro de salud</option><option>Subregión de salud</option><option>Máster</option></select></Campo>
          <Campo label="Centro o ubicación asignada"><input name="lugar" /></Campo>
          <button className="btn" type="submit">Crear usuario</button>
        </form></section>
      )}
      <Tabla cols={['Usuario', 'Perfil', 'Ubicación', 'Estado', 'Acciones']} filas={u.map((r, i) => [r[0], r[1], r[2], <Insignia estado={r[3] ? 'Activo' : 'Inactivo'} />,
        <span className="acc"><button className="mini" onClick={() => alt(i)}>{r[3] ? 'Desactivar' : 'Activar'}</button><button className="mini">Restablecer clave</button></span>])} />
    </div>
  )
}

export const VISTAS = { Panel, Usuarios, Bitácora: Bitacora, 'Centros de salud': Centros, 'Vacunas y exámenes': Catalogo, 'Consultar cédula': Consulta,
  'Registrar persona': RegPersona, 'Registrar vacuna': RegVacuna, Solicitudes, Exámenes: Examenes, Certificados }
