import { useState } from 'react'
import { auth } from '../firebase'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth'

export default function Login({ onLogin, onPrivacy }) {
  const [mod, setMod] = useState('login')
  const [email, setEmail] = useState('')
  const [parola, setParola] = useState('')
  const [eroare, setEroare] = useState('')
  const [loading, setLoading] = useState(false)
  const [resetTrimis, setResetTrimis] = useState(false)

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

  const handleReset = async () => {
    if (!email) {
      setEroare('Introdu adresa de email mai întâi.')
      return
    }
    setEroare('')
    setLoading(true)
    try {
      await sendPasswordResetEmail(auth, email)
      setResetTrimis(true)
    } catch (err) {
      if (err.code === 'auth/user-not-found' || err.code === 'auth/invalid-credential') {
        setEroare('Nu există cont cu acest email.')
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
          <img src="/logo_cff.svg" alt="CFF" className="login-logo" />
        </div>

        <h1 className="login-titlu">
          {mod === 'login' ? 'Intră în cont' : mod === 'register' ? 'Cont nou' : 'Resetează parola'}
        </h1>
        <p className="login-subtitlu">
          {mod === 'login'
            ? 'Loghează-te pentru a-ți salva filmele favorite și a vota.'
            : mod === 'register'
            ? 'Creează un cont pentru a salva favorite și a vota Buzduganul de Aur.'
            : 'Introdu emailul și îți trimitem un link de resetare.'}
        </p>

        {resetTrimis ? (
          <div className="login-reset-confirmat">
  <p>✓ Email trimis la <strong>{email}</strong></p>
  <p>Verifică inbox-ul și urmează instrucțiunile.</p>
  <p style={{color: '#666', fontSize: '12px'}}>Dacă nu găsești emailul, verifică folderul Spam.</p>
          </div>
        ) : (
          <>
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

              {mod !== 'reset' && (
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
              )}

              {eroare && <p className="login-eroare">{eroare}</p>}

              <button
                className={`login-btn ${loading ? 'loading' : ''}`}
                onClick={mod === 'reset' ? handleReset : handleSubmit}
                disabled={loading}
              >
                {loading
                  ? 'Se procesează...'
                  : mod === 'login'
                  ? 'Intră în cont'
                  : mod === 'register'
                  ? 'Creează cont'
                  : 'Trimite link de resetare'}
              </button>
            </div>

            {mod === 'login' && (
              <button
                className="login-forgot"
                onClick={() => { setMod('reset'); setEroare('') }}
              >
                Am uitat parola
              </button>
            )}

            {mod === 'reset' ? (
              <button className="login-switch" onClick={() => { setMod('login'); setEroare('') }}>
                Înapoi la login
              </button>
            ) : (
              <button
                className="login-switch"
                onClick={() => { setMod(mod === 'login' ? 'register' : 'login'); setEroare('') }}
              >
                {mod === 'login'
                  ? 'Nu ai cont? Înregistrează-te'
                  : 'Ai deja cont? Intră în cont'}
              </button>
            )}
          </>
        )}

        <button className="login-privacy" onClick={onPrivacy}>
          Politică de Confidențialitate
        </button>

      </div>
    </div>
  )
}