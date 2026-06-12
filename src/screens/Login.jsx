import { useState } from 'react'
import { auth } from '../firebase'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'

export default function Login({ onLogin }) {
  const [mod, setMod] = useState('login')
  const [email, setEmail] = useState('')
  const [parola, setParola] = useState('')
  const [eroare, setEroare] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    setEroare('')
    setLoading(true)
    try {
      if (mod === 'login') {
        await signInWithEmailAndPassword(auth, email, parola)
      } else {
        await createUserWithEmailAndPassword(auth, email, parola)
      }
      onLogin()
    } catch (err) {
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
        setEroare('Email sau parolă incorecte.')
      } else if (err.code === 'auth/email-already-in-use') {
        setEroare('Acest email este deja înregistrat.')
      } else if (err.code === 'auth/weak-password') {
        setEroare('Parola trebuie să aibă minim 6 caractere.')
      } else if (err.code === 'auth/invalid-email') {
        setEroare('Adresa de email nu este validă.')
      } else {
        setEroare('A apărut o eroare. Încearcă din nou.')
      }
    }
    setLoading(false)
  }

  return (
    <div className="login-wrapper">
      <div className="login-box">

        <div className="login-logo-wrapper">
          <img src="/src/logo_cff.svg" alt="CFF" className="login-logo" />
        </div>

        <h1 className="login-titlu">
          {mod === 'login' ? 'Intră în cont' : 'Cont nou'}
        </h1>
        <p className="login-subtitlu">
          {mod === 'login'
            ? 'Loghează-te pentru a-ți salva filmele favorite și a vota.'
            : 'Creează un cont pentru a salva favorite și a vota Buzduganul de Aur.'}
        </p>

        <div className="login-form">
          <div className="login-field">
            <label className="login-label">Email</label>
            <input
              type="email"
              className="login-input"
              placeholder="adresa@email.ro"
              value={email}
              onChange={e => setEmail(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSubmit()}
            />
          </div>

          <div className="login-field">
            <label className="login-label">Parolă</label>
            <input
              type="password"
              className="login-input"
              placeholder="minim 6 caractere"
              value={parola}
              onChange={e => setParola(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSubmit()}
            />
          </div>

          {eroare && <p className="login-eroare">{eroare}</p>}

          <button
            className={`login-btn ${loading ? 'loading' : ''}`}
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? 'Se procesează...' : mod === 'login' ? 'Intră în cont' : 'Creează cont'}
          </button>
        </div>

        <button
          className="login-switch"
          onClick={() => { setMod(mod === 'login' ? 'register' : 'login'); setEroare('') }}
        >
          {mod === 'login'
            ? 'Nu ai cont? Înregistrează-te'
            : 'Ai deja cont? Intră în cont'}
        </button>

      </div>
    </div>
  )
}