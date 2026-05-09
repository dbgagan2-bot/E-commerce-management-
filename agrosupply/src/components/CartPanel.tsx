// src/components/CartPanel.tsx
import type { CartItem } from "../types";

interface Props {
  cart: CartItem[];
  isBuyNow: boolean;
  buyNowProduct: CartItem | null;
  onClose: () => void;
  onUpdateQty: (id: number, delta: number) => void;
  onRemove: (id: number) => void;
  onCheckout: () => void;
}

export default function CartPanel({
  cart, isBuyNow, onClose, onUpdateQty, onRemove, onCheckout
}: Props) {
  const total = cart.reduce((s, c) => s + c.price * c.qty, 0);
  const count = cart.reduce((s, c) => s + c.qty, 0);
  const shipping = total >= 150 ? 0 : 12;

  return (
    <div
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
      style={{
        position: "fixed", inset: 0,
        background: "rgba(0,0,0,0.65)",
        zIndex: 200, display: "flex", justifyContent: "flex-end"
      }}
    >
      <div style={{
        width: "100%", maxWidth: 440, height: "100%",
        background: "var(--surface)",
        borderLeft: "1px solid var(--border)",
        display: "flex", flexDirection: "column"
      }}>

        {/* ── HEADER ── */}
        <div style={{
          padding: 24, borderBottom: "1px solid var(--border)",
          display: "flex", alignItems: "center", justifyContent: "space-between"
        }}>
          <div>
            <span style={{
              fontFamily: "'Syne',sans-serif", fontSize: 20,
              fontWeight: 800, color: "var(--text)"
            }}>
              {isBuyNow ? "⚡ Buy Now" : "🛒 Order Cart"}
            </span>
            {/* Tag showing Buy Now vs Cart */}
            <span style={{
              marginLeft: 10, padding: "3px 10px", borderRadius: 20,
              fontSize: 11, fontWeight: 700,
              background: isBuyNow ? "var(--accent)" : "var(--surface2)",
              color: isBuyNow ? "#0d1f0f" : "var(--muted)",
              border: "1px solid var(--border)"
            }}>
              {isBuyNow ? "Direct Purchase" : `${count} items`}
            </span>
          </div>
          <button
            onClick={onClose}
            style={{
              background: "none", border: "none",
              color: "var(--muted)", fontSize: 22, cursor: "pointer"
            }}
          >✕</button>
        </div>

        {/* ── INFO STRIP for Buy Now ── */}
        {isBuyNow && (
          <div style={{
            background: "#1a3a1d", borderBottom: "1px solid var(--border)",
            padding: "10px 24px", fontSize: 12,
            color: "var(--accent)", display: "flex", alignItems: "center", gap: 8
          }}>
            ⚡ You are purchasing this item directly — your cart is not affected.
          </div>
        )}

        {/* ── ITEMS ── */}
        <div style={{ flex: 1, overflowY: "auto", padding: "16px 24px" }}>
          {cart.length === 0 ? (
            <div style={{ textAlign: "center", padding: "60px 20px", color: "var(--muted)" }}>
              <div style={{ fontSize: 48, marginBottom: 10 }}>📦</div>
              <p style={{ fontSize: 14 }}>
                Your cart is empty.<br />Add products to begin your order.
              </p>
            </div>
          ) : (
            cart.map(item => (
              <div
                key={item.id}
                style={{
                  display: "flex", gap: 12,
                  padding: "14px 0",
                  borderBottom: "1px solid var(--border)",
                  alignItems: "center"
                }}
              >
                {/* Icon */}
                <div style={{
                  width: 52, height: 52, borderRadius: 10,
                  background: "var(--surface2)",
                  border: "1px solid var(--border)",
                  display: "flex", alignItems: "center",
                  justifyContent: "center", fontSize: 28, flexShrink: 0
                }}>
                  {item.icon}
                </div>

                {/* Info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    fontSize: 14, fontWeight: 600, color: "var(--text)",
                    overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap"
                  }}>
                    {item.name}
                  </div>
                  <div style={{ fontSize: 11, color: "var(--muted)", fontFamily: "monospace", marginTop: 2 }}>
                    SKU: {item.sku} · {item.unit}
                  </div>
                  <div style={{ fontSize: 14, color: "var(--accent)", fontWeight: 700, marginTop: 3 }}>
                    <span style={{ fontSize: 11, color: "var(--muted)", fontWeight: 400, marginLeft: 4 }}>
                      
                    </span>
                  </div>
                </div>

                {/* Qty Controls */}
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <button
                    onClick={() => onUpdateQty(item.id, -1)}
                    style={{
                      width: 28, height: 28, borderRadius: 6,
                      border: "1px solid var(--border)",
                      background: "var(--surface2)", color: "var(--accent)",
                      fontSize: 16, cursor: "pointer",
                      display: "flex", alignItems: "center", justifyContent: "center"
                    }}
                  >−</button>

                  <span style={{
                    fontSize: 14, fontWeight: 700,
                    minWidth: 22, textAlign: "center", color: "var(--text)"
                  }}>
                    {item.qty}
                  </span>

                  <button
                    onClick={() => onUpdateQty(item.id, 1)}
                    style={{
                      width: 28, height: 28, borderRadius: 6,
                      border: "1px solid var(--border)",
                      background: "var(--surface2)", color: "var(--accent)",
                      fontSize: 16, cursor: "pointer",
                      display: "flex", alignItems: "center", justifyContent: "center"
                    }}
                  >+</button>

                  <button
                    onClick={() => onRemove(item.id)}
                    style={{
                      background: "none", border: "none",
                      color: "var(--muted)", fontSize: 18,
                      cursor: "pointer", marginLeft: 2,
                      transition: "color 0.15s"
                    }}
                    onMouseEnter={e => (e.currentTarget.style.color = "#ff6b6b")}
                    onMouseLeave={e => (e.currentTarget.style.color = "var(--muted)")}
                  >✕</button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* ── FOOTER ── */}
        {cart.length > 0 && (
          <div style={{
            padding: 24,
            borderTop: "1px solid var(--border)",
            background: "var(--surface2)"
          }}>
            {/* Subtotal */}
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, fontSize: 13, color: "var(--muted)" }}>
              <span>{isBuyNow ? "Item total" : `Subtotal (${count} items)`}</span>
              
            </div>

            {/* Shipping */}
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, fontSize: 13, color: "var(--muted)" }}>
              <span>Shipping</span>
              <span style={total >= 150 ? { color: "var(--accent)" } : {}}>
                {total >= 150 ? "FREE" : "$12.00"}
              </span>
            </div>

            {/* Total */}
            <div style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              marginBottom: 16, paddingTop: 10,
              borderTop: "1px solid var(--border)"
            }}>
              <span style={{ fontSize: 14, color: "var(--text)", fontWeight: 600 }}>Total</span>
              <span style={{
                fontFamily: "'Syne',sans-serif",
                fontSize: 24, fontWeight: 800, color: "var(--accent)"
              }}>
                ${(total + shipping).toFixed(2)}
              </span>
            </div>

            {/* Free shipping nudge */}
            {total < 150 && (
              <p style={{ fontSize: 12, color: "var(--muted)", marginBottom: 12, textAlign: "center" }}>
                Add ${(150 - total).toFixed(2)} more for free shipping
              </p>
            )}

            {/* Checkout Button */}
            <button
              onClick={onCheckout}
              style={{
                width: "100%", padding: 15, borderRadius: 10, border: "none",
                background: isBuyNow
                  ? "linear-gradient(135deg,#4caf50,#6dde6d)"
                  : "var(--accent)",
                color: "#0d1f0f",
                fontFamily: "'Syne',sans-serif",
                fontSize: 16, fontWeight: 800, cursor: "pointer",
                transition: "opacity 0.18s",
                display: "flex", alignItems: "center",
                justifyContent: "center", gap: 8
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = "0.88")}
              onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
            >
              {isBuyNow ? "⚡ Proceed to Buy Now →" : "Proceed to Checkout →"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}