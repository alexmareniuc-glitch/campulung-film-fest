import { useState } from 'react'
import { filme as toateFilmele } from '../data'
import FilmDetaliu from './FilmDetaliu'

const zile = [
  { id: 0, label: 'Toate' },
  { id: 1, label: 'Joi 13 Iunie' },
  { id: 2, label: 'Vineri 14 Iunie' },
  { id: 3, label: 'Sâmbătă 15 Iunie' },
  { id: 4, label: 'Duminică 16 Iunie' },
]
export default function Favorite({ favorite, toggleFavorit }) {
  const [ziActiva, setZiActiva] = useState(0)
  const [filmSelectat, setFilmSelectat] = useState(null)

  const filmeFavorite = toateFilmele.filter(f => favorite.includes(f.id))

  const filmeFiltrate = filmeFavorite.filter(film =>
    ziActiva === 0 || film.proiectii.some(p => p.ziId === ziActiva)
  )

  const proiectiiVizibile = (film) => {
    if (ziActiva === 0) return film.proiectii
    return film.proiectii.filter(p => p.ziId === ziActiva)
  }

  if (filmSelectat) {
    return (
      <FilmDetaliu
        film={filmSelectat}
        onBack={() => setFilmSelectat(null)}
        favorite={favorite}
        toggleFavorit={toggleFavorit}
      />
    )
  }

  if (filmeFavorite.length === 0) {
    return (
      <div className="screen">
        <div className="empty-state">
          <img src="/heart.svg" alt="" className="empty-heart-icon" />
          <h3>Niciun film salvat</h3>
          <p>Apasă Adaugă la favorite pe un film din Program.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="program-wrapper">
      <div className="favorite-hero">
        <h2 className="favorite-titlu">Favorite</h2>
        <span className="favorite-count">{filmeFavorite.length} {filmeFavorite.length === 1 ? 'film salvat' : 'filme salvate'}</span>
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
      </div>

      {filmeFiltrate.length === 0 ? (
        <div className="screen">
          <div className="empty-state">
            <img src="/heart.svg" alt="" className="empty-heart-icon" />
            <h3>Niciun film în această zi</h3>
            <p>Nu ai filme favorite în {zile.find(z => z.id === ziActiva)?.label}.</p>
          </div>
        </div>
      ) : (
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
                  className="btn-favorit-card salvat"
                  onClick={() => toggleFavorit(film.id)}
                >
                  <img src="/heart.svg" alt="" className="heart-icon-btn" />
                  Salvat
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}