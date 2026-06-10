import { useState } from "react";
import HomePage from "./Page1_Home";
import OrderPage from "./Page2_Order";
import ContactPage from "./Page3_Contact";
import { LANGS, T } from "./Lang";

export default function App() {
  const [page, setPage] = useState("home");
  const [lang, setLang] = useState("RU");
  const t = T[lang];

  return (
    <div style={{ fontFamily: "-apple-system, 'SF Pro Display', BlinkMacSystemFont, 'Helvetica Neue', sans-serif", background: "#f2ede4", minHeight: "100vh", maxWidth: 430, margin: "0 auto" }}>

      {/* LANG SWITCHER */}
      <div style={{ display: "flex", justifyContent: "flex-end", gap: 4, padding: "8px 16px 0", background: "rgba(255,248,235,0.95)" }}>
        {LANGS.map((l) => (
          <button
            key={l}
            onClick={() => setLang(l)}
            style={{
              padding: "4px 11px", fontSize: 11, fontWeight: 700,
              borderRadius: 20, border: "1px solid",
              borderColor: lang === l ? "#c89010" : "#e0cc90",
              background: lang === l ? "#c89010" : "transparent",
              color: lang === l ? "#fff" : "#a08040",
              cursor: "pointer", fontFamily: "inherit", letterSpacing: 0.5,
            }}
          >{l}</button>
        ))}
      </div>

      {/* NAV */}
      <nav style={{ display: "flex", background: "rgba(255,248,235,0.95)", borderBottom: "0.5px solid #e0cc90", position: "sticky", top: 0, zIndex: 100 }}>
        {[
          { key: "home",    label: t.home },
          { key: "order",   label: t.order },
          { key: "contact", label: t.contact },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setPage(tab.key)}
            style={{
              flex: 1, textAlign: "center", padding: "11px 4px 10px",
              fontSize: 12, fontWeight: page === tab.key ? 600 : 400,
              cursor: "pointer", color: page === tab.key ? "#8a5f00" : "#aca090",
              background: "none", border: "none",
              borderBottom: page === tab.key ? "2px solid #c89010" : "2px solid transparent",
              transition: "all 0.2s", fontFamily: "inherit",
            }}
          >{tab.label}</button>
        ))}
      </nav>

      {page === "home"    && <HomePage    t={t} onOrder={() => setPage("order")} />}
      {page === "order"   && <OrderPage   t={t} />}
      {page === "contact" && <ContactPage t={t} />}
    </div>
  );
}