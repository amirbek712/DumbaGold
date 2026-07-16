import { useState } from "react";
import "./Page2_Order.css";
import logo from "./assets/dumbagold-logo.png";

const TG_BOT_TOKEN = "8853913484:AAFMASO_O6_RcHd82H4ryf5wMwrO3zUyVdM";
const TG_CHAT_ID   = "600847527";

export default function OrderPage({ t }) {
  const PRODUCTS = t.products;
  const fmt = (n) => n.toLocaleString("ru-RU") + " " + t.currency;

  const initCounts = Object.fromEntries(PRODUCTS.map((p) => [p.id, 0]));
  const [counts,   setCounts]   = useState(initCounts);
  const [showForm, setShowForm] = useState(false);
  const [name,     setName]     = useState("");
  const [phone,    setPhone]    = useState("");
  const [error,    setError]    = useState("");
  const [sent,     setSent]     = useState(false);

  const change = (id, delta) =>
    setCounts((p) => ({ ...p, [id]: Math.max(0, p[id] + delta) }));

  const totalItems = PRODUCTS.reduce((a, p) => a + counts[p.id], 0);
  const totalSum   = PRODUCTS.reduce((a, p) => a + p.price * counts[p.id], 0);

  const handleConfirm = async () => {
    if (!name.trim())  { setError(t.errName);  return; }
    if (!phone.trim()) { setError(t.errPhone); return; }
    setError("");

    let msg = `🛒 *Новый заказ DumbaGold!*\n\n👤 ${t.nameLabel}: ${name}\n📞 ${t.phoneLabel}: ${phone}\n\n📦 ${t.orderLabel}:\n`;
    PRODUCTS.forEach((p) => {
      if (counts[p.id] > 0)
        msg += `• ${t.jar} ${p.weight} × ${counts[p.id]} ${t.pcs} — ${fmt(p.price * counts[p.id])}\n`;
    });
    msg += `\n💰 *${t.total}: ${totalItems} ${t.pcs} — ${fmt(totalSum)}*`;

    try {
      const res = await fetch(`https://api.telegram.org/bot${TG_BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: TG_CHAT_ID, text: msg, parse_mode: "Markdown" }),
      });
      const data = await res.json();
      if (!data.ok) throw new Error(data.description);
    } catch {
      setError(t.errSend);
      return;
    }

    setSent(true);
    setTimeout(() => {
      setSent(false); setShowForm(false);
      setCounts(initCounts); setName(""); setPhone("");
    }, 3000);
  };

  return (
    <div>
      <div className="order-wrap">
        <div className="order-title">{t.chooseSize}</div>

        {totalItems > 0 && (
          <div className="cart-box">
            <div className="cart-title">{t.yourOrder}</div>
            {PRODUCTS.map((p) => counts[p.id] > 0 && (
              <div className="cart-row" key={p.id}>
                <span>{t.jar} {p.weight} × {counts[p.id]} {t.pcs}</span>
                <span className="cart-row-price">{fmt(p.price * counts[p.id])}</span>
              </div>
            ))}
            <div className="divider" />
            <div className="cart-total-row">
              <div>
                <div className="cart-total-label">{t.total}</div>
                <div className="cart-total-value">{totalItems} {t.pcs}</div>
              </div>
              <div>
                <div className="cart-total-sum-label">{t.sum}</div>
                <div className="cart-total-sum-value">{fmt(totalSum)}</div>
              </div>
            </div>
            <button className="btn-gold" onClick={() => setShowForm(true)}>{t.placeOrder}</button>
          </div>
        )}

        {PRODUCTS.map((p) => (
          <div className={`prod-card${p.popular ? " popular" : ""}`} key={p.id}>
            {p.popular && <div className="popular-tag">{t.popularTag}</div>}
            <div className="prod-top">
              <div className={`prod-img${p.popular ? " large" : ""}`}>
                <img src={logo} alt="DumbaGold" />
              </div>
              <div>
                <div className="prod-weight">{t.jar} {p.weight}</div>
                <div className="prod-desc">{p.desc}</div>
                <div className="prod-price">{fmt(p.price)}</div>
              </div>
            </div>
            <div className="counter-row">
              <button className="counter-btn" onClick={() => change(p.id, -1)} disabled={counts[p.id] === 0}>−</button>
              <div className="counter-num">{counts[p.id]}</div>
              <button className="counter-btn" onClick={() => change(p.id, 1)}>+</button>
            </div>
            {counts[p.id] > 0
              ? <button className="btn-gold" onClick={() => setShowForm(true)}>{t.jar} {p.weight} × {counts[p.id]} {t.pcs}</button>
              : <button className="btn-disabled" disabled>{t.chooseQty}</button>
            }
          </div>
        ))}
      </div>

      {showForm && (
        <div className="form-overlay" onClick={(e) => e.target === e.currentTarget && setShowForm(false)}>
          <div className="form-sheet">
            <div className="form-handle" />
            {sent ? (
              <div className="success-box">
                <div className="success-icon">✅</div>
                <div className="success-title">{t.successTitle}</div>
                <div className="success-sub">{t.successSub}</div>
              </div>
            ) : (
              <>
                <div className="form-title">{t.orderTitle}</div>
                <div className="form-sub">{t.orderSub}</div>
                <label className="input-label">{t.nameLabel}</label>
                <input className="input-field" placeholder={t.namePlaceholder} value={name} onChange={(e) => setName(e.target.value)} />
                <label className="input-label">{t.phoneLabel}</label>
                <input className="input-field" placeholder={t.phonePlaceholder} type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
                {error && <div className="form-error">⚠️ {error}</div>}
                <div className="order-summary">
                  <div className="order-summary-title">{t.orderLabel}</div>
                  {PRODUCTS.map((p) => counts[p.id] > 0 && (
                    <div key={p.id} className="order-summary-row">
                      • {t.jar} {p.weight} × {counts[p.id]} {t.pcs} — <span className="order-summary-price">{fmt(p.price * counts[p.id])}</span>
                    </div>
                  ))}
                  <div className="divider" />
                  <div className="order-summary-total">
                    <span>{t.total} {totalItems} {t.pcs}</span>
                    <span className="order-summary-total-value">{fmt(totalSum)}</span>
                  </div>
                </div>
                <button className="btn-gold" onClick={handleConfirm}>{t.confirmBtn}</button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}