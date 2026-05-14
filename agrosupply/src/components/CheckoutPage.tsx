// src/components/CheckoutPage.tsx
import type { CartItem } from "../types";
import { toINR } from "../utils/currency";

interface Props {
  cart: CartItem[];
  onBack: () => void;
  onConfirm: () => void;
}

export default function CheckoutPage({ cart, onBack, onConfirm }: Props) {
  const subtotal = cart.reduce((s, c) => s + c.price * c.qty, 0);
  const shipping = subtotal >= 150 ? 0 : 12;
  const total = subtotal + shipping;

  return (
    <div style={{ maxWidth: 760, margin: "40px auto", padding: "0 24px 80px" }}>
      {/* Back */}
      <button
        onClick={onBack}
        style={{ background: "none", border: "none", color: "var(--accent)", fontSize: 14, cursor: "pointer", marginBottom: 24, fontFamily: "'Outfit',sans-serif", display: "flex", alignItems: "center", gap: 6 }}
      >
        ← Back to Shop
      </button>

      <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: 28, fontWeight: 800, color: "var(--text)", marginBottom: 28 }}>
        🧾 Checkout
      </h2>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>

        {/* ── LEFT: Delivery Form ── */}
        <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 14, padding: 24 }}>
          <h3 style={{ fontFamily: "'Syne',sans-serif", fontSize: 16, fontWeight: 700, color: "var(--text)", marginBottom: 20 }}>
            📦 Delivery Details
          </h3>
          {[
            { label: "Full Name",       placeholder: "John Farmer",          type: "text"  },
            { label: "Email Address",   placeholder: "john@farm.com",        type: "email" },
            { label: "Phone Number",    placeholder: "+91 98765 43210",      type: "tel"   },
            { label: "Delivery Address",placeholder: "Village, District...", type: "text"  },
            { label: "City",            placeholder: "Bengaluru",            type: "text"  },
            { label: "PIN Code",        placeholder: "560001",               type: "text"  },
          ].map(({ label, placeholder, type }) => (
            <div key={label} style={{ marginBottom: 14 }}>
              <label style={{ fontSize: 12, color: "var(--muted)", fontWeight: 600, letterSpacing: 0.5, display: "block", marginBottom: 5 }}>
                {label}
              </label>
              <input
                type={type}
                placeholder={placeholder}
                style={{
                  width: "100%", padding: "10px 14px",
                  borderRadius: 8, border: "1px solid var(--border)",
                  background: "var(--surface2)", color: "var(--text)",
                  fontFamily: "'Outfit',sans-serif", fontSize: 14, outline: "none"
                }}
                onFocus={e => (e.currentTarget.style.borderColor = "var(--accent)")}
                onBlur={e => (e.currentTarget.style.borderColor = "var(--border)")}
              />
            </div>
          ))}
        </div>

        {/* ── RIGHT: Order Summary + Payment ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

          {/* Order Summary */}
          <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 14, padding: 24 }}>
            <h3 style={{ fontFamily: "'Syne',sans-serif", fontSize: 16, fontWeight: 700, color: "var(--text)", marginBottom: 16 }}>
              🛒 Order Summary
            </h3>
            {cart.map(item => (
              <div key={item.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: "1px solid var(--border)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 22 }}>{item.icon}</span>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text)" }}>{item.name}</div>
                    <div style={{ fontSize: 11, color: "var(--muted)" }}>Qty: {item.qty} × {toINR(item.price)}</div>
                  </div>
                </div>
                <span style={{ fontSize: 14, fontWeight: 700, color: "var(--accent)" }}>
                  {toINR(item.price * item.qty)}
                </span>
              </div>
            ))}
            <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 6 }}>
              {[
                ["Subtotal", toINR(subtotal)],
                ["Shipping", subtotal >= 150 ? "FREE" : toINR(12)],
              ].map(([l, v]) => (
                <div key={l} style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "var(--muted)" }}>
                  <span>{l}</span>
                  <span style={l === "Shipping" && subtotal >= 150 ? { color: "var(--accent)" } : {}}>{v}</span>
                </div>
              ))}
              <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 10, borderTop: "1px solid var(--border)", marginTop: 4 }}>
                <span style={{ fontFamily: "'Syne',sans-serif", fontSize: 16, fontWeight: 800, color: "var(--text)" }}>Total</span>
                <span style={{ fontFamily: "'Syne',sans-serif", fontSize: 20, fontWeight: 800, color: "var(--accent)" }}>{toINR(total)}</span>
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 14, padding: 24 }}>
            <h3 style={{ fontFamily: "'Syne',sans-serif", fontSize: 16, fontWeight: 700, color: "var(--text)", marginBottom: 16 }}>
              💳 Payment Method
            </h3>
            {["💳 Credit / Debit Card", "📱 UPI / GPay", "🏦 Net Banking", "💵 Cash on Delivery"].map(method => (
              <label key={method} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 0", cursor: "pointer", fontSize: 14, color: "var(--muted)", borderBottom: "1px solid var(--border)" }}>
                <input type="radio" name="payment" style={{ accentColor: "var(--accent)" }} defaultChecked={method.includes("UPI")} />
                {method}
              </label>
            ))}
          </div>

          {/* Confirm Button */}
          <button
            onClick={onConfirm}
            style={{
              width: "100%", padding: 16, borderRadius: 12, border: "none",
              background: "linear-gradient(135deg, #4caf50, #6dde6d)",
              color: "#0d1f0f", fontFamily: "'Syne',sans-serif",
              fontSize: 17, fontWeight: 800, cursor: "pointer",
              letterSpacing: 0.4, transition: "opacity 0.2s"
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = "0.88")}
            onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
          >
            ✅ Confirm Order — {toINR(total)}
          </button>
        </div>
      </div>
    </div>
  );
}