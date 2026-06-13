import { useState, useEffect } from 'react'
import { db } from '../firebase'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import emailjs from '@emailjs/browser'

const EMAILJS_SERVICE = 'cff_service'
const EMAILJS_TEMPLATE = 'template_hj88ha6'
const EMAILJS_PUBLIC_KEY = 'rtvRZqtzc4jXhVMpc'

const SERI = [
  {
    id: 1,
    label: 'Seara 1',
    data: '13 Iunie',
    start: new Date('2026-06-13T00:00:00'),
    end: new Date('2026-06-14T01:00:00'),
    filme: [
      { id: 's1_1', titlu: 'Scurtmetraj 1', regizor: 'Regizor A', tara: 'România', durata: '12 min', descriere: 'Descriere scurtmetraj 1.', imagine: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=800&q=80' },
      { id: 's1_2', titlu: 'Scurtmetraj 2', regizor: 'Regizor B', tara: 'Moldova', durata: '15 min', descriere: 'Descriere scurtmetraj 2.', imagine: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&q=80' },
      { id: 's1_3', titlu: 'Scurtmetraj 3', regizor: 'Regizor C', tara: 'România', durata: '18 min', descriere: 'Descriere scurtmetraj 3.', imagine: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&q=80' },
      { id: 's1_4', titlu: 'Scurtmetraj 4', regizor: 'Regizor D', tara: 'România', durata: '10 min', descriere: 'Descriere scurtmetraj 4.', imagine: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800&q=80' },
      { id: 's1_5', titlu: 'Scurtmetraj 5', regizor: 'Regizor E', tara: 'Ucraina', durata: '22 min', descriere: 'Descriere scurtmetraj 5.', imagine: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800&q=80' },
      { id: 's1_6', titlu: 'Scurtmetraj 6', regizor: 'Regizor F', tara: 'România', durata: '14 min', descriere: 'Descriere scurtmetraj 6.', imagine: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=800&q=80' },
      { id: 's1_7', titlu: 'Scurtmetraj 7', regizor: 'Regizor G', tara: 'Moldova', durata: '16 min', descriere: 'Descriere scurtmetraj 7.', imagine: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&q=80' },
      { id: 's1_8', titlu: 'Scurtmetraj 8', regizor: 'Regizor H', tara: 'România', durata: '11 min', descriere: 'Descriere scurtmetraj 8.', imagine: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&q=80' },
      { id: 's1_9', titlu: 'Scurtmetraj 9', regizor: 'Regizor I', tara: 'România', durata: '19 min', descriere: 'Descriere scurtmetraj 9.', imagine: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800&q=80' },
      { id: 's1_10', titlu: 'Scurtmetraj 10', regizor: 'Regizor J', tara: 'Bulgaria', durata: '13 min', descriere: 'Descriere scurtmetraj 10.', imagine: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800&q=80' },
    ]
  },
  {
    id: 2,
    label: 'Seara 2',
    data: '14 Iunie',
    start: new Date('2026-06-14T00:00:00'),
    end: new Date('2026-06-15T01:00:00'),
    filme: [
      { id: 's2_1', titlu: 'Scurtmetraj 11', regizor: 'Regizor K', tara: 'România', durata: '17 min', descriere: 'Descriere scurtmetraj 11.', imagine: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=800&q=80' },
      { id: 's2_2', titlu: 'Scurtmetraj 12', regizor: 'Regizor L', tara: 'Moldova', durata: '20 min', descriere: 'Descriere scurtmetraj 12.', imagine: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&q=80' },
      { id: 's2_3', titlu: 'Scurtmetraj 13', regizor: 'Regizor M', tara: 'România', durata: '14 min', descriere: 'Descriere scurtmetraj 13.', imagine: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&q=80' },
      { id: 's2_4', titlu: 'Scurtmetraj 14', regizor: 'Regizor N', tara: 'România', durata: '12 min', descriere: 'Descriere scurtmetraj 14.', imagine: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800&q=80' },
      { id: 's2_5', titlu: 'Scurtmetraj 15', regizor: 'Regizor O', tara: 'Serbia', durata: '18 min', descriere: 'Descriere scurtmetraj 15.', imagine: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800&q=80' },
      { id: 's2_6', titlu: 'Scurtmetraj 16', regizor: 'Regizor P', tara: 'România', durata: '15 min', descriere: 'Descriere scurtmetraj 16.', imagine: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=800&q=80' },
      { id: 's2_7', titlu: 'Scurtmetraj 17', regizor: 'Regizor Q', tara: 'Moldova', durata: '11 min', descriere: 'Descriere scurtmetraj 17.', imagine: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&q=80' },
      { id: 's2_8', titlu: 'Scurtmetraj 18', regizor: 'Regizor R', tara: 'România', durata: '23 min', descriere: 'Descriere scurtmetraj 18.', imagine: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&q=80' },
      { id: 's2_9', titlu: 'Scurtmetraj 19', regizor: 'Regizor S', tara: 'România', durata: '16 min', descriere: 'Descriere scurtmetraj 19.', imagine: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800&q=80' },
      { id: 's2_10', titlu: 'Scurtmetraj 20', regizor: 'Regizor T', tara: 'Ungaria', durata: '19 min', descriere: 'Descriere scurtmetraj 20.', imagine: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800&q=80' },
    ]
  }
]

export default function Voteaza({ user }) {
  const [votSeara1, setVotSeara1] = useState(null)
  const [votSeara2, setVotSeara2] = useState(null)
  const [selectatSeara1, setSelectatSeara1] = useState(null)
  const [selectatSeara2, setSelectatSeara2] = useState(null)
  const [loading, setLoading] = useState(true)
  const [trimitere, setTrimitere] = useState(null)
  const [seraraActiva, setSeraraActiva] = useState(1)

  const acum = new Date()

  useEffect(() => {
    const fetchVoturi = async () => {
      if (!user) return
      const ref = doc(db, 'voturi', user.uid)
      const snap = await getDoc(ref)
      if (snap.exists()) {
        setVotSeara1(snap.data().seara1 || null)
        setVotSeara2(snap.data().seara2 || null)
      }
      setLoading(false)
    }
    fetchVoturi()
  }, [user])

  const esteActiva = (seara) => acum >= seara.start && acum <= seara.end
  const esteViitoare = (seara) => acum < seara.start
  const esteTrecuta = (seara) => acum > seara.end

  const handleConfirmare = async (searaId) => {
    const selectat = searaId === 1 ? selectatSeara1 : selectatSeara2
    if (!selectat || !user) return

    const seara = SERI.find(s => s.id === searaId)
    const film = seara.filme.find(f => f.id === selectat)

    setTrimitere(searaId)
    try {
      const ref = doc(db, 'voturi', user.uid)
      const snap = await getDoc(ref)
      const existingData = snap.exists() ? snap.data() : {}

      await setDoc(ref, {
        ...existingData,
        [`seara${searaId}`]: selectat,
        [`seara${searaId}Titlu`]: film.titlu,
        [`seara${searaId}Regizor`]: film.regizor,
        [`seara${searaId}Email`]: user.email,
        [`seara${searaId}Timestamp`]: new Date().toISOString(),
        userEmail: user.email,
      })

      await emailjs.send(
        EMAILJS_SERVICE,
        EMAILJS_TEMPLATE,
        {
          user_email: user.email,
          film_titlu: film.titlu,
          film_regizor: film.regizor,
        },
        EMAILJS_PUBLIC_KEY
      )

      if (searaId === 1) setVotSeara1(selectat)
      else setVotSeara2(selectat)

    } catch (err) {
      console.error('Eroare vot:', err)
    }
    setTrimitere(null)
  }

  if (loading) {
    return (
      <div className="vot-wrapper">
        <div className="vot-hero">
          <p className="vot-eyebrow">CFF 11 · 2026</p>
          <h1 className="vot-titlu">Buzduganul de Aur</h1>
        </div>
        <div className="page-loading">
          <img src="/logo_cff.svg" alt="" className="page-loading-logo" />
        </div>
      </div>
    )
  }

  const searaSelectata = SERI.find(s => s.id === seraraActiva)
  const votSeaara = seraraActiva === 1 ? votSeara1 : votSeara2
  const selectatCurent = seraraActiva === 1 ? selectatSeara1 : selectatSeara2
  const setSelectatCurent = seraraActiva === 1 ? setSelectatSeara1 : setSelectatSeara2
  const activa = esteActiva(searaSelectata)
  const viitoare = esteViitoare(searaSelectata)
  const trecuta = esteTrecuta(searaSelectata)

  return (
    <div className="vot-wrapper">

      <div className="vot-hero">
        <p className="vot-eyebrow">CFF 11 · 2026</p>
        <h1 className="vot-titlu">Buzduganul de Aur</h1>
        <p className="vot-subtitlu">Votează cel mai bun scurtmetraj al fiecărei seri. Un vot per seară, deschis între 21:45 și 01:00.</p>
      </div>

      <div className="vot-seri-tabs">
        {SERI.map(s => (
          <button
            key={s.id}
            className={`vot-seara-tab ${seraraActiva === s.id ? 'activ' : ''} ${esteActiva(s) ? 'deschis' : ''}`}
            onClick={() => setSeraraActiva(s.id)}
          >
            {s.label}
            <span className="vot-seara-data">{s.data}</span>
            {esteActiva(s) && <span className="vot-seara-badge">Deschis</span>}
            {esteViitoare(s) && <span className="vot-seara-badge inactiv">În curând</span>}
            {(s.id === 1 ? votSeara1 : votSeara2) && <span className="vot-seara-badge votat">Votat ✓</span>}
          </button>
        ))}
      </div>

      {votSeaara ? (
        <div className="vot-confirmat">
          <img src="/Vector-3.svg" alt="" className="vot-confirmat-icon" />
          <h2 className="vot-confirmat-titlu">Vot înregistrat!</h2>
          <p className="vot-confirmat-text">Ai votat pentru</p>
          <p className="vot-confirmat-film">
            {searaSelectata.filme.find(f => f.id === votSeaara)?.titlu}
          </p>
          <p className="vot-confirmat-nota">O confirmare a fost trimisă la {user.email}</p>
        </div>
      ) : viitoare ? (
        <div className="vot-status">
          <img src="/Vector-3.svg" alt="" className="vot-status-icon" />
          <p className="vot-status-titlu">Votul nu a început încă</p>
          <p className="vot-status-text">Votul pentru {searaSelectata.label} se deschide pe {searaSelectata.data} la ora 21:45.</p>
        </div>
      ) : trecuta ? (
        <div className="vot-status">
          <p className="vot-status-titlu">Votul s-a închis</p>
          <p className="vot-status-text">Votul pentru {searaSelectata.label} s-a încheiat.</p>
        </div>
      ) : (
        <>
          <div className="vot-lista">
            {searaSelectata.filme.map(film => (
              <div
                key={film.id}
                className={`vot-card ${selectatCurent === film.id ? 'selectat' : ''}`}
                onClick={() => setSelectatCurent(film.id)}
              >
                <div className="vot-card-imagine">
                  <img src={film.imagine} alt={film.titlu} className="vot-imagine" loading="lazy" />
                  <div className="vot-radio">
                    {selectatCurent === film.id && <div className="vot-radio-activ" />}
                  </div>
                </div>
                <div className="vot-card-info">
                  <h3 className="vot-card-titlu">{film.titlu}</h3>
                  <p className="vot-card-meta">{film.regizor} · {film.tara} · {film.durata}</p>
                  <p className="vot-card-descriere">{film.descriere}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="vot-actiune">
            {selectatCurent && (
              <p className="vot-selectat-text">
                Ai selectat: <strong>{searaSelectata.filme.find(f => f.id === selectatCurent)?.titlu}</strong>
              </p>
            )}
            <button
              className={`vot-btn-confirma ${!selectatCurent || trimitere ? 'disabled' : ''}`}
              onClick={() => handleConfirmare(seraraActiva)}
              disabled={!selectatCurent || !!trimitere}
            >
              <img src="/Vector-3.svg" alt="" className="vot-btn-icon" />
              {trimitere === seraraActiva ? 'Se trimite...' : 'Confirmă votul'}
            </button>
            {!selectatCurent && <p className="vot-hint">Selectează un film pentru a vota</p>}
          </div>
        </>
      )}

    </div>
  )
}