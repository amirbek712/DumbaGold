import { useState } from "react";

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

  const S = {
    wrap:    { padding: "24px 16px" },
    title:   { fontSize: 11, fontWeight: 600, color: "#b87800", marginBottom: 14, letterSpacing: 1, textTransform: "uppercase" },
    cartBox: { background: "#fff", border: "0.5px solid #e8d8a0", borderRadius: 16, padding: "15px 16px", marginBottom: 16 },
    cartRow: { display: "flex", justifyContent: "space-between", fontSize: 14, color: "#3c3c43", marginBottom: 6 },
    divider: { height: "0.5px", background: "#e8d8a0", margin: "10px 0" },
    card:    (pop) => ({ background: "#fff", border: pop ? "1.5px solid #c89010" : "0.5px solid #e8d8a0", borderRadius: 18, padding: 18, marginBottom: 16, position: "relative" }),
    popTag:  { position: "absolute", top: -12, left: 18, background: "#c89010", color: "#fff", fontSize: 11, fontWeight: 600, padding: "3px 12px", borderRadius: 20 },
    prodTop: { display: "flex", alignItems: "center", gap: 14 },
    img:     (pop) => ({ width: pop ? 72 : 60, height: pop ? 72 : 60, background: "#fef5d8", borderRadius: "50%", border: "1px solid #d8b840", display: "flex", alignItems: "center", justifyContent: "center", fontSize: pop ? 34 : 28, flexShrink: 0 }),
    counter: { display: "flex", alignItems: "center", marginTop: 14, background: "#f2ede4", borderRadius: 12, border: "0.5px solid #e0d090", overflow: "hidden" },
    cBtn:    (dis) => ({ width: 52, height: 48, background: dis ? "#ede8e0" : "#fef5d8", border: "none", fontSize: 24, color: dis ? "#c8b898" : "#8a5f00", cursor: dis ? "not-allowed" : "pointer", fontFamily: "inherit" }),
    cNum:    { flex: 1, textAlign: "center", fontSize: 19, fontWeight: 600, color: "#1c1c1e", padding: "10px 0" },
    btnGold: { background: "#c89010", color: "#fff", border: "none", borderRadius: 14, padding: "15px 16px", fontSize: 16, fontWeight: 600, cursor: "pointer", width: "100%", marginTop: 12, fontFamily: "inherit" },
    btnDis:  { background: "#e8d8a0", color: "#b09060", border: "none", borderRadius: 14, padding: "15px 16px", fontSize: 16, fontWeight: 600, width: "100%", marginTop: 12, fontFamily: "inherit", cursor: "not-allowed" },
    overlay: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", zIndex: 200, display: "flex", alignItems: "flex-end", justifyContent: "center" },
    sheet:   { background: "#fff", borderRadius: "22px 22px 0 0", padding: "20px 20px 44px", width: "100%", maxWidth: 430 },
    handle:  { width: 36, height: 4, background: "#d1d1d6", borderRadius: 2, margin: "0 auto 20px" },
    label:   { display: "block", fontSize: 11, fontWeight: 600, color: "#8e8e93", marginBottom: 6, letterSpacing: 0.5, textTransform: "uppercase" },
    input:   { width: "100%", padding: "14px 16px", fontSize: 16, fontFamily: "inherit", borderRadius: 12, border: "1px solid #e0d8c8", background: "#faf6ef", color: "#1c1c1e", outline: "none", marginBottom: 14, boxSizing: "border-box" },
    summary: { background: "#faf6ef", border: "0.5px solid #e8d8a0", borderRadius: 12, padding: "12px 14px", marginBottom: 16 },
  };

  return (
    <div>
      <div style={S.wrap}>
        <div style={S.title}>{t.chooseSize}</div>

        {totalItems > 0 && (
          <div style={S.cartBox}>
            <div style={{ fontSize: 15, fontWeight: 700, color: "#1c1c1e", marginBottom: 10 }}>{t.yourOrder}</div>
            {PRODUCTS.map((p) => counts[p.id] > 0 && (
              <div style={S.cartRow} key={p.id}>
                <span>{t.jar} {p.weight} × {counts[p.id]} {t.pcs}</span>
                <span style={{ color: "#b87800", fontWeight: 600 }}>{fmt(p.price * counts[p.id])}</span>
              </div>
            ))}
            <div style={S.divider} />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontSize: 13, color: "#8e8e93" }}>{t.total}</div>
                <div style={{ fontSize: 15, fontWeight: 700, color: "#1c1c1e" }}>{totalItems} {t.pcs}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 13, color: "#8e8e93" }}>{t.sum}</div>
                <div style={{ fontSize: 18, fontWeight: 700, color: "#b87800" }}>{fmt(totalSum)}</div>
              </div>
            </div>
            <button style={S.btnGold} onClick={() => setShowForm(true)}>{t.placeOrder}</button>
          </div>
        )}

        {PRODUCTS.map((p) => (
          <div style={S.card(p.popular)} key={p.id}>
            {p.popular && <div style={S.popTag}>{t.popularTag}</div>}
            <div style={S.prodTop}>
              <div style={S.img(p.popular)}>🫙</div>
              <div>
                <div style={{ fontSize: 18, fontWeight: 700, color: "#1c1c1e" }}>{t.jar} {p.weight}</div>
                <div style={{ fontSize: 12, color: "#8e8e93", marginTop: 3 }}>{p.desc}</div>
                <div style={{ fontSize: 22, color: "#b87800", fontWeight: 700, marginTop: 5 }}>{fmt(p.price)}</div>
              </div>
            </div>
            <div style={S.counter}>
              <button style={S.cBtn(counts[p.id] === 0)} onClick={() => change(p.id, -1)} disabled={counts[p.id] === 0}>−</button>
              <div style={S.cNum}>{counts[p.id]}</div>
              <button style={S.cBtn(false)} onClick={() => change(p.id, 1)}>+</button>
            </div>
            {counts[p.id] > 0
              ? <button style={S.btnGold} onClick={() => setShowForm(true)}>{t.jar} {p.weight} × {counts[p.id]} {t.pcs}</button>
              : <button style={S.btnDis} disabled>{t.chooseQty}</button>
            }
          </div>
        ))}
      </div>

      {showForm && (
        <div style={S.overlay} onClick={(e) => e.target === e.currentTarget && setShowForm(false)}>
          <div style={S.sheet}>
            <div style={S.handle} />
            {sent ? (
              <div style={{ textAlign: "center", padding: "20px 0" }}>
                <div style={{ fontSize: 60, marginBottom: 14 }}>✅</div>
                <div style={{ fontSize: 22, fontWeight: 700, color: "#1c1c1e" }}>{t.successTitle}</div>
                <div style={{ fontSize: 14, color: "#8e8e93", marginTop: 8 }}>{t.successSub}</div>
              </div>
            ) : (
              <>
                <div style={{ fontSize: 20, fontWeight: 700, color: "#1c1c1e", marginBottom: 4 }}>{t.orderTitle}</div>
                <div style={{ fontSize: 13, color: "#8e8e93", marginBottom: 20 }}>{t.orderSub}</div>
                <label style={S.label}>{t.nameLabel}</label>
                <input style={S.input} placeholder={t.namePlaceholder} value={name} onChange={(e) => setName(e.target.value)} />
                <label style={S.label}>{t.phoneLabel}</label>
                <input style={S.input} placeholder={t.phonePlaceholder} type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
                {error && <div style={{ fontSize: 13, color: "#ff3b30", marginBottom: 12 }}>⚠️ {error}</div>}
                <div style={S.summary}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: "#b87800", marginBottom: 8 }}>{t.orderLabel}</div>
                  {PRODUCTS.map((p) => counts[p.id] > 0 && (
                    <div key={p.id} style={{ fontSize: 14, color: "#3c3c43", marginBottom: 4 }}>
                      • {t.jar} {p.weight} × {counts[p.id]} {t.pcs} — <span style={{ color: "#b87800", fontWeight: 600 }}>{fmt(p.price * counts[p.id])}</span>
                    </div>
                  ))}
                  <div style={{ height: "0.5px", background: "#e8d8a0", margin: "8px 0" }} />
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 15, fontWeight: 700, color: "#1c1c1e" }}>
                    <span>{t.total} {totalItems} {t.pcs}</span>
                    <span style={{ color: "#b87800" }}>{fmt(totalSum)}</span>
                  </div>
                </div>
                <button style={S.btnGold} onClick={handleConfirm}>{t.confirmBtn}</button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}