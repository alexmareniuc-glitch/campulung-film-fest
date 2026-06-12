export default function FilmDetaliu({ film, onBack, favorite, toggleFavorit }) {
  if (!film) return null

  const esteInFavorite = favorite.includes(film.id)

  return (
    <div className="film-detaliu-wrapper">

      <div className="detaliu-hero">
        <img src={film.imagineFull} alt={film.titlu} className="detaliu-hero-img" />
        <div className="detaliu-hero-overlay">
          <button className="detaliu-back" onClick={onBack}>
            ← Înapoi
          </button>
          <div className="detaliu-hero-info">
            <p className="detaliu-eyebrow">{film.sectiune}</p>
            <h1 className="detaliu-titlu">{film.titlu}</h1>
            <div className="detaliu-meta-row">
              <span>{film.regizor}</span>
              <span className="dot">·</span>
              <span>{film.tara}, {film.an}</span>
              <span className="dot">·</span>
              <span>{film.durata}</span>
              <span className="dot">·</span>
              <span className="detaliu-gen">{film.gen}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="detaliu-content">

        {film.descriere && (
          <p className="detaliu-descriere">{film.descriere}</p>
        )}

        <button
          className={`btn-favorit-card ${esteInFavorite ? 'salvat' : ''}`}
          onClick={() => toggleFavorit(film.id)}
        >
          <img src="/src/heart.svg" alt="" className="heart-icon-btn" />
          {esteInFavorite ? 'Salvat' : 'Adaugă la favorite'}
        </button>

        <div className="detaliu-proiectii">
          <h2 className="detaliu-sectiune-titlu">Proiecții</h2>
          <div className="detaliu-proiectii-grid">
            {film.proiectii.map((p, i) => (
              <div key={i} className="detaliu-proiectie-card">
                <p className="detaliu-proiectie-data">{p.zi}, {p.data}</p>
                <p className="detaliu-proiectie-ora">{p.ora}</p>
                <p className="detaliu-proiectie-locatie">📍 {p.locatie}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}