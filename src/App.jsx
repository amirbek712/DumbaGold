import { useState } from "react";
import "./App.css";
import HomePage from "./Page1_Home";
import OrderPage from "./Page2_Order";
import ContactPage from "./Page3_Contact";
import { LANGS, T } from "./Lang";

export default function App() {
  const [page, setPage] = useState("home");
  const [lang, setLang] = useState("RU");
  const t = T[lang];

  return (
    <div className="app-wrap">

      {/* LANG SWITCHER */}
      <div className="lang-switcher">
        {LANGS.map((l) => (
          <button
            key={l}
            onClick={() => setLang(l)}
            className={`lang-btn${lang === l ? " active" : ""}`}
          >{l}</button>
        ))}
      </div>

      {/* NAV */}
      <nav className="nav">
        {[
          { key: "home",    label: t.home },
          { key: "order",   label: t.order },
          { key: "contact", label: t.contact },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setPage(tab.key)}
            className={`nav-btn${page === tab.key ? " active" : ""}`}
          >{tab.label}</button>
        ))}
      </nav>

      {page === "home"    && <HomePage    t={t} onOrder={() => setPage("order")} />}
      {page === "order"   && <OrderPage   t={t} />}
      {page === "contact" && <ContactPage t={t} />}
    </div>
  );
}