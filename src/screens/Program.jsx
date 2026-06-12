import { useState, useMemo, useEffect, useRef } from 'react'
import { filme } from '../data'
import FilmDetaliu from './FilmDetaliu'

const zile = [
  { id: 0, label: 'Toate' },
  { id: 1, label: 'Joi 13 August' },
  { id: 2, label: 'Vineri 14 August' },
  { id: 3, label: 'Sâmbătă 15 August' },
  { id: 4, label: 'Duminică 16 August' },
]

const toateTarile = ['Toate', 'SUA', 'Germania', 'Islanda', 'România']
const toateSectiunile = ['Toate', 'Periscop', 'Focus Portugalia', 'Focus Brazilia', 'Românești', 'Buzduganul de Aur']

export default function Program({ favorite, toggleFavorit }) {
  const [ziActiva, setZiActiva] = useState(0)
  const [filtruTara, setFiltruTara] = useState('Toate')
  const [filtruSectiune, setFiltruSectiune] = useState('Toate')
  const [filtreDeschise, setFiltreDeschise] = useState(false)
  const [filmSelectat, setFilmSelectat] = useState(null)
  const filtrePanelRef = useRef(null)
  const filtreToggleRef = useRef(null)

  // Închide filtrele când dai click în afară
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        filtrePanelRef.current &&
        !filtrePanelRef.current.contains(e.target) &&
        filtreToggleRef.current &&
        !filtreToggleRef.current.contains(e.target)
      ) {
        setFiltreDeschise(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('touchstart', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleClickOutside)
    }
  }, [])

  // Browser back button + swipe
  useEffect(() => {
    if (filmSelectat) {
      window.history.pushState({ film: true }, '')
    }
    const handlePop = () => {
      if (filmSelectat) setFilmSelectat(null)
    }
    window.addEventListener('popstate', handlePop)
    return () => window.removeEventListener('popstate', handlePop)
  }, [filmSelectat])

  const filmeDupaZi = useMemo(() =>
    filme.filter(f => ziActiva === 0 || f.proiectii.some(p => p.ziId === ziActiva)),
    [ziActiva]
  )

  const tariDisponibile = useMemo(() => {
    const baza = filtruSectiune === 'Toate' ? filmeDupaZi : filmeDupaZi.filter(f => f.sectiune === filtruSectiune)
    return new Set(baza.map(f => f.tara))
  }, [filmeDupaZi, filtruSectiune])

  const sectiuniDisponibile = useMemo(() => {
    const baza = filtruTara === 'Toate' ? filmeDupaZi : filmeDupaZi.filter(f => f.tara === filtruTara)
    return new Set(baza.map(f => f.sectiune))
  }, [filmeDupaZi, filtruTara])

  const filmeFiltrate = useMemo(() =>
    filmeDupaZi.filter(f => {
      const areTara = filtruTara === 'Toate' || f.tara === filtruTara
      const areSectiune = filtruSectiune === 'Toate' || f.sectiune === filtruSectiune
      return areTara && areSectiune
    }),
    [filmeDupaZi, filtruTara, filtruSectiune]
  )

  const proiectiiVizibile = (film) => {
    if (ziActiva === 0) return film.proiectii
    return film.proiectii.filter(p => p.ziId === ziActiva)
  }

  const activeFiltre = filtruTara !== 'Toate' || filtruSectiune !== 'Toate'
  const nrFiltre = (filtruTara !== 'Toate' ? 1 : 0) + (filtruSectiune !== 'Toate' ? 1 : 0)

  if (filmSelectat) {
    return (
      <FilmDetaliu
        film={filmSelectat}
        onBack={() => {
          setFilmSelectat(null)
          window.history.back()
        }}
        favorite={favorite}
        toggleFavorit={toggleFavorit}
      />
    )
  }

  return (
    <div className="program-wrapper">

      <div className="hero-banner">
        <div className="hero-negru">
          <img src="/logo_cff.svg" alt="CFF" className="hero-logo" />
          <p className="hero-data">13–16 August 2026 · Câmpulung Moldovenesc</p>
        </div>
      </div>

      <div className="zile-bara">
        <div className="zile-rand">
          <div className="zile-scroll">
            {zile.map(zi => (
              <button key={zi.id} className={`zi-tab ${ziActiva === zi.id ? 'activ' : ''}`} onClick={() => setZiActiva(zi.id)}>
                {zi.label}
              </button>
            ))}
          </div>
        </div>
        <div className="filtre-rand-mobil">
          <button
            ref={filtreToggleRef}
            className={`filtru-toggle-btn ${filtreDeschise ? 'deschis' : ''} ${nrFiltre > 0 ? 'are-filtre' : ''}`}
            onClick={() => setFiltreDeschise(!filtreDeschise)}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M3 6h18M7 12h10M11 18h2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            Filtre
            {nrFiltre > 0 && <span className="filtru-badge">{nrFiltre}</span>}
          </button>
        </div>
      </div>

      {filtreDeschise && (
        <div className="filtre-panel" ref={filtrePanelRef}>
          <div className="filtre-panel-header">
            <span className="filtre-panel-titlu">Filtrează filmele</span>
            {activeFiltre && (
              <button className="reset-filtre" onClick={() => { setFiltruTara('Toate'); setFiltruSectiune('Toate') }}>
                Resetează tot
              </button>
            )}
          </div>
          <div className="filtru-grup">
            <p className="filtru-label">Țară</p>
            <div className="filtru-optiuni">
              {toateTarile.map(t => {
                const disponibil = t === 'Toate' || tariDisponibile.has(t)
                return (
                  <button key={t} className={`filtru-btn ${filtruTara === t ? 'activ' : ''} ${!disponibil ? 'indisponibil' : ''}`}
                    onClick={() => disponibil && setFiltruTara(t)} disabled={!disponibil}>{t}</button>
                )
              })}
            </div>
          </div>
          <div className="filtru-grup">
            <p className="filtru-label">Secțiune</p>
            <div className="filtru-optiuni">
              {toateSectiunile.map(s => {
                const disponibil = s === 'Toate' || sectiuniDisponibile.has(s)
                return (
                  <button key={s} className={`filtru-btn ${filtruSectiune === s ? 'activ' : ''} ${!disponibil ? 'indisponibil' : ''}`}
                    onClick={() => disponibil && setFiltruSectiune(s)} disabled={!disponibil}>{s}</button>
                )
              })}
            </div>
          </div>
        </div>
      )}

      <div className="rezultate-header">
        <span>{filmeFiltrate.length} {filmeFiltrate.length === 1 ? 'film' : 'filme'}</span>
      </div>

      <div className="filme-lista">
        {filmeFiltrate.map(film => (
          <div key={film.id} className="film-card-mare">
            <div className="film-imagine-wrapper" onClick={() => setFilmSelectat(film)}>
              <img src={film.imagine} alt={film.titlu} className="film-imagine" />
              <div className="film-imagine-hover" />
            </div>
            <div className="film-detalii">
              <p className="film-eyebrow">{film.sectiune}</p>
              <h3 className="film-titlu" onClick={() => setFilmSelectat(film)}>{film.titlu}</h3>
              <p className="film-meta">{film.regizor} · {film.an} · {film.tara}</p>
              <p className="film-durata">{film.durata} · {film.gen}</p>
              <div className="proiectii-lista">
                {proiectiiVizibile(film).map((p, i) => (
                  <div key={i} className="proiectie-row">
                    <span className="proiectie-data">{p.zi}, {p.data}</span>
                    <img src="/Vector.svg" className="proiectie-separator" alt="" />
                    <span className="proiectie-ora">{p.ora}</span>
                    <img src="/Vector.svg" className="proiectie-separator" alt="" />
                    <span className="proiectie-locatie">{p.locatie}</span>
                  </div>
                ))}
              </div>
              <button
                className={`btn-favorit-card ${favorite.includes(film.id) ? 'salvat' : ''}`}
                onClick={() => toggleFavorit(film.id)}
              >
                <img src="/heart.svg" alt="" className="heart-icon-btn" />
                {favorite.includes(film.id) ? 'Salvat' : 'Adaugă la favorite'}
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}