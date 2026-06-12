export default function PrivacyPolicy({ onBack }) {
  return (
    <div className="privacy-wrapper">
      <div className="privacy-header">
        <button className="detaliu-back" onClick={onBack}>← Înapoi</button>
      </div>

      <div className="privacy-continut">
        <p className="vot-eyebrow">Câmpulung Film Fest</p>
        <h1 className="privacy-titlu">Politică de Confidențialitate</h1>
        <p className="privacy-data">Ultima actualizare: Iunie 2026</p>

        <div className="privacy-sectiune">
          <h2 className="privacy-subtitlu">1. Cine suntem</h2>
          <p className="privacy-text">Câmpulung Film Fest este organizat de Asociația Hasmătuchi, cu sediul în Câmpulung Moldovenesc, județul Suceava. Această aplicație web este folosită pentru informarea publicului despre programul festivalului, salvarea filmelor favorite și votul pentru Buzduganul de Aur.</p>
        </div>

        <div className="privacy-sectiune">
          <h2 className="privacy-subtitlu">2. Ce date colectăm</h2>
          <p className="privacy-text">Colectăm următoarele date personale:</p>
          <ul className="privacy-lista">
            <li><strong>Adresa de email</strong> — folosită pentru autentificare și trimiterea confirmărilor de vot</li>
            <li><strong>Filmele favorite salvate</strong> — pentru a-ți afișa lista personalizată</li>
            <li><strong>Voturile exprimate</strong> — pentru Buzduganul de Aur, un vot per seară per utilizator</li>
          </ul>
        </div>

        <div className="privacy-sectiune">
          <h2 className="privacy-subtitlu">3. Cum folosim datele</h2>
          <ul className="privacy-lista">
            <li>Autentificarea în aplicație</li>
            <li>Salvarea preferințelor (filme favorite)</li>
            <li>Trimiterea confirmării votului pe email</li>
            <li>Centralizarea voturilor pentru Buzduganul de Aur</li>
            <li>Trimiterea unui newsletter zilnic cu programul filmelor tale favorite (dacă ești înscris)</li>
          </ul>
        </div>

        <div className="privacy-sectiune">
          <h2 className="privacy-subtitlu">4. Stocarea datelor</h2>
          <p className="privacy-text">Datele sunt stocate în Firebase (Google Cloud), cu servere în Europa. Datele sunt păstrate pe durata festivalului și maxim 30 de zile după încheierea acestuia, după care sunt șterse.</p>
        </div>

        <div className="privacy-sectiune">
          <h2 className="privacy-subtitlu">5. Drepturile tale</h2>
          <p className="privacy-text">Ai dreptul să:</p>
          <ul className="privacy-lista">
            <li>Accesezi datele tale personale</li>
            <li>Soliciți ștergerea contului și a datelor asociate</li>
            <li>Te dezabonezi de la emailuri</li>
          </ul>
          <p className="privacy-text">Pentru orice solicitare, contactează-ne la <strong>home@campulungfilmfest.ro</strong></p>
        </div>

        <div className="privacy-sectiune">
          <h2 className="privacy-subtitlu">6. Cookie-uri</h2>
          <p className="privacy-text">Aplicația folosește cookie-uri strict necesare pentru autentificare (Firebase Auth). Nu folosim cookie-uri de tracking sau publicitate.</p>
        </div>

        <div className="privacy-sectiune">
          <h2 className="privacy-subtitlu">7. Contact</h2>
          <p className="privacy-text">Pentru orice întrebări legate de confidențialitate: <strong>home@campulungfilmfest.ro</strong></p>
        </div>

      </div>
    </div>
  )
}