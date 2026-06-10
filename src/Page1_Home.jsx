export default function HomePage({ t, onOrder }) {
  return (
    <div>
      <div style={{ background: "#fff8ee", padding: "44px 24px 32px", textAlign: "center", borderBottom: "0.5px solid #e0cc90" }}>
        <div style={{ width: 120, height: 120, margin: "0 auto 20px", background: "#f5e8c0", borderRadius: "50%", border: "2px solid #d8b840", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 60 }}>
          🫙
        </div>
        <div style={{ fontSize: 38, fontWeight: 700, letterSpacing: -1, color: "#1c1c1e" }}>
          Dumba<span style={{ color: "#b87800" }}>GOLD</span>
        </div>
        <div style={{ fontSize: 14, color: "#8e8e93", marginTop: 8, lineHeight: 1.6 }}>
          100% Qo'y Dumba Yog'i<br />{t.subtitle}
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 18, flexWrap: "wrap" }}>
          {t.badges.map((b) => (
            <span key={b} style={{ background: "#fef5d8", border: "0.5px solid #ddb840", borderRadius: 20, padding: "5px 14px", fontSize: 12, fontWeight: 500, color: "#7a5000" }}>
              {b}
            </span>
          ))}
        </div>
      </div>

      <div style={{ padding: "24px 16px" }}>
        <div style={{ fontSize: 11, fontWeight: 600, color: "#b87800", marginBottom: 14, letterSpacing: 1, textTransform: "uppercase" }}>
          {t.whyTitle}
        </div>
        {t.features.map((f) => (
          <div key={f.title} style={{ background: "#fff", borderRadius: 14, padding: "13px 14px", display: "flex", alignItems: "center", gap: 13, border: "0.5px solid #e8d8a0", marginBottom: 10 }}>
            <div style={{ width: 42, height: 42, background: "#fef5d8", borderRadius: 11, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>
              {f.icon}
            </div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 600, color: "#1c1c1e", letterSpacing: -0.3 }}>{f.title}</div>
              <div style={{ fontSize: 12, color: "#8e8e93", marginTop: 2 }}>{f.desc}</div>
            </div>
          </div>
        ))}
        <button
          onClick={onOrder}
          style={{ background: "#c89010", color: "#fff", border: "none", borderRadius: 14, padding: "15px 16px", fontSize: 16, fontWeight: 600, cursor: "pointer", width: "100%", marginTop: 8, fontFamily: "inherit" }}
        >
          {t.orderBtn}
        </button>
      </div>
    </div>
  );
}