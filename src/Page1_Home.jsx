import "./Page1_Home.css";
import logo from "./assets/dumbagold-logo.png";

export default function HomePage({ t, onOrder }) {
  return (
    <div>
      <div className="hero">
        <div className="hero-logo">
          <img src={logo} alt="DumbaGold" />
        </div>
        <div className="brand-name">
          Dumba<span className="brand-gold">GOLD</span>
        </div>
        <div className="hero-tagline">
          100% Qo'y Dumba Yog'i<br />{t.subtitle}
        </div>
        <div className="badge-row">
          {t.badges.map((b) => (
            <span key={b} className="badge">
              {b}
            </span>
          ))}
        </div>
      </div>

      <div className="section">
        <div className="section-title">{t.whyTitle}</div>
        {t.features.map((f) => (
          <div key={f.title} className="feat-card">
            <div className="feat-icon">{f.icon}</div>
            <div>
              <div className="feat-title">{f.title}</div>
              <div className="feat-desc">{f.desc}</div>
            </div>
          </div>
        ))}
        <button className="btn-gold" onClick={onOrder}>
          {t.orderBtn}
        </button>
      </div>
    </div>
  );
}