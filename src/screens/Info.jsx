export default function Info() {
  return (
    <div className="info-wrapper">

      <div className="info-hero">
        <p className="info-eyebrow">CFF 11 · 2026</p>
        <h1 className="info-titlu">Câmpulung Film Fest</h1>
        <p className="info-subtitlu">Festival internațional de film · 13–16 August 2026 · Câmpulung Moldovenesc, Suceava</p>
      </div>

      <div className="info-continut">

        <div className="info-rand">
          <div className="info-poza-wrapper">
            <img src="/src/0D4A9431.jpg" alt="CFF" className="info-poza" />
          </div>
          <div className="info-sectiune">
            <h2 className="info-sectiune-titlu">Despre Festival</h2>
            <p className="info-text">Câmpulung Film Fest este un festival internațional de film comparativ care oferă publicului din nord-estul României oportunitatea de a se reconecta cu arta cinematografică și de a se întâlni cu tineri realizatori de film din spațiul European și internațional.</p>
            <p className="info-text">Fiecare ediție CFF invită câte trei țări — una din Europa, una din afara ei, plus România — cu proiecții succesive, comparative, pe parcursul zilelor de festival.</p>
          </div>
        </div>

        <div className="info-rand reverse">
          <div className="info-poza-wrapper">
            <img src="/src/0S1A2200.jpg" alt="Cinema Melodia" className="info-poza" />
          </div>
          <div className="info-sectiune">
            <h2 className="info-sectiune-titlu">Locații</h2>
            <div className="info-locatii">
              <div className="info-locatie-card">
                <div className="info-locatie-icon">🎬</div>
                <div>
                  <h3 className="info-locatie-nume">Cinema Melodia</h3>
                  <p className="info-locatie-adresa">Str. Principală, Câmpulung Moldovenesc</p>
                  <p className="info-locatie-desc">Sala principală de proiecții</p>
                </div>
              </div>
              <div className="info-locatie-card">
                <div className="info-locatie-icon">🌳</div>
                <div>
                  <h3 className="info-locatie-nume">Piața Centrală</h3>
                  <p className="info-locatie-adresa">Piața Centrală, Câmpulung Moldovenesc</p>
                  <p className="info-locatie-desc">Proiecții în aer liber</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="info-rand">
          <div className="info-poza-wrapper">
            <img src="/src/0D4A8361.jpg" alt="Program" className="info-poza" />
          </div>
          <div className="info-sectiune">
            <h2 className="info-sectiune-titlu">Program</h2>
            <div className="info-program-grid">
              <div className="info-program-zi">
                <span className="info-program-data">Joi 13 Aug</span>
                <span className="info-program-ore">18:00 – 23:00</span>
              </div>
              <div className="info-program-zi">
                <span className="info-program-data">Vineri 14 Aug</span>
                <span className="info-program-ore">17:00 – 23:00</span>
              </div>
              <div className="info-program-zi">
                <span className="info-program-data">Sâmbătă 15 Aug</span>
                <span className="info-program-ore">16:00 – 24:00</span>
              </div>
              <div className="info-program-zi">
                <span className="info-program-data">Duminică 16 Aug</span>
                <span className="info-program-ore">17:00 – 22:00</span>
              </div>
            </div>
          </div>
        </div>

        <div className="info-rand reverse">
          <div className="info-poza-wrapper">
            <img src="/src/0S1A9254.JPG" alt="Contact" className="info-poza" />
          </div>
          <div className="info-sectiune">
            <h2 className="info-sectiune-titlu">Contact</h2>
            <div className="info-contact-lista">
              <a href="mailto:home@campulungfilmfest.ro" className="info-contact-item">
                <span className="info-contact-label">Email</span>
                <span className="info-contact-valoare">home@campulungfilmfest.ro</span>
              </a>
              <a href="https://www.instagram.com/campulungff" target="_blank" rel="noreferrer" className="info-contact-item">
                <span className="info-contact-label">Instagram</span>
                <span className="info-contact-valoare">@campulungff</span>
              </a>
              <a href="https://www.facebook.com/campulungfilmfest" target="_blank" rel="noreferrer" className="info-contact-item">
                <span className="info-contact-label">Facebook</span>
                <span className="info-contact-valoare">campulungfilmfest</span>
              </a>
              <a href="https://campulungfilmfest.ro" target="_blank" rel="noreferrer" className="info-contact-item">
                <span className="info-contact-label">Website</span>
                <span className="info-contact-valoare">campulungfilmfest.ro</span>
              </a>
            </div>
           <p className="info-organizator">Organizat de Asociația Hasmațuchi</p>
          </div>
        </div>

      </div>
    <div className="info-rand">
  <div className="info-sectiune">
    <h2 className="info-sectiune-titlu">Legal</h2>
    <button className="info-privacy-btn" onClick={() => window.dispatchEvent(new CustomEvent('showPrivacy'))}>
      Politică de Confidențialitate →
    </button>
  </div>
</div>
</div>
  )
}