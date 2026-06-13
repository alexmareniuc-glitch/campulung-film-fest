import { useState, useEffect } from 'react'
import './App.css'
import { auth, db } from './firebase'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import Program from './screens/Program'
import Favorite from './screens/Favorite'
import Voteaza from './screens/Voteaza'
import Info from './screens/Info'
import Login from './screens/Login'
import PrivacyPolicy from './screens/PrivacyPolicy'

export default function App() {
  const [ecranActiv, setEcranActiv] = useState('program')
  const [favorite, setFavorite] = useState([])
  const [user, setUser] = useState(null)
  const [loadingAuth, setLoadingAuth] = useState(true)
const [darkMode, setDarkMode] = useState(true)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light')
  }, [darkMode])
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      setUser(u)
      if (u) {
        const ref = doc(db, 'users', u.uid)
        const snap = await getDoc(ref)
        if (snap.exists()) {
          setFavorite(snap.data().favorite || [])
        }
      } else {
        setFavorite([])
      }
      setLoadingAuth(false)
    })
    return unsub
  }, [])

  const toggleFavorit = async (id) => {
    const nou = favorite.includes(id)
      ? favorite.filter(x => x !== id)
      : [...favorite, id]
    setFavorite(nou)
    if (user) {
      await setDoc(doc(db, 'users', user.uid), { favorite: nou }, { merge: true })
    }
  }

  if (loadingAuth) {
return (
  <div className="loading-screen">
    <img src="/Vector-2.svg" alt="CFF" className="loading-logo page-loading-logo" />
  </div>
)
  }

  if (showPrivacy) {
    return <PrivacyPolicy onBack={() => setShowPrivacy(false)} />
  }

  if (!user) {
    return <Login onLogin={() => {}} onPrivacy={() => setShowPrivacy(true)} />
  }

  const ecrane = {
    program: <Program favorite={favorite} toggleFavorit={toggleFavorit} />,
    favorite: <Favorite favorite={favorite} toggleFavorit={toggleFavorit} />,
    voteaza: <Voteaza user={user} />,
    info: <Info />,
  }

  return (
    <div className="app">

      <div className="top-bar">
  <img src="/logo_cff.svg" alt="CFF" className="top-bar-logo" />
  <div className="top-bar-right">
    <button className="theme-toggle" onClick={() => setDarkMode(!darkMode)} title="Schimbă tema">
      {darkMode ? '☀️' : '🌙'}
    </button>
    <button className="logout-btn" onClick={() => signOut(auth)}>
      Ieși din cont
    </button>
  </div>
</div>

      <main className="content">
        {ecrane[ecranActiv]}
      </main>

      <nav className="bottom-nav">
        <button className={ecranActiv === 'program' ? 'activ' : ''} onClick={() => setEcranActiv('program')}>
          <img src="/Vector-1.svg" className="nav-svg" alt="" />
          <span>Program</span>
        </button>
        <button className={ecranActiv === 'favorite' ? 'activ' : ''} onClick={() => setEcranActiv('favorite')}>
          <div className="nav-heart-wrapper">
            <img src="/heart.svg" className="nav-svg nav-heart-svg" alt="" />
            {favorite.length > 0 && (
              <span className="nav-counter">{favorite.length}</span>
            )}
          </div>
          <span>Favorite</span>
        </button>
        <button className={ecranActiv === 'voteaza' ? 'activ' : ''} onClick={() => setEcranActiv('voteaza')}>
          <img src="/Vector-3.svg" className="nav-svg" alt="" />
          <span>Votează</span>
        </button>
        <button className={ecranActiv === 'info' ? 'activ' : ''} onClick={() => setEcranActiv('info')}>
          <img src="/Vector-2.svg" className="nav-svg" alt="" />
          <span>Info</span>
        </button>
      </nav>
    </div>
  )
}