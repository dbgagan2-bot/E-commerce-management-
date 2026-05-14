// src/components/ProductCard.tsx
import { useState } from "react";
import type{ Product } from "../types";
import { toINR } from "../utils/currency";

interface Props {
  product: Product;
  onAddToCart: (p: Product) => void;
  onBuyNow: (p: Product) => void;
}

const CAT_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  "Pesticides":        { bg: "#fff3e0", text: "#c45c00", border: "#f9a03c" },
  "Fertilizers":       { bg: "#e8f5e9", text: "#2e7d32", border: "#66bb6a" },
  "Tools & Equipment": { bg: "#e3f2fd", text: "#1565c0", border: "#42a5f5" },
};

const Stars = ({ rating }: { rating: number }) => (
  <span style={{ color: "#f0a500", fontSize: 12 }}>
    {"★".repeat(Math.floor(rating))}{"☆".repeat(5 - Math.floor(rating))}
  </span>
);

export default function ProductCard({ product, onAddToCart, onBuyNow }: Props) {
  const [expanded, setExpanded] = useState(false);
  const [bought, setBought] = useState(false);
  const cat = CAT_COLORS[product.category];

  const handleBuyNow = () => {
    setBought(true);
    onBuyNow(product);
    setTimeout(() => setBought(false), 2000);
  };

  return (
    <div
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: 14,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        transition: "border-color 0.2s, transform 0.2s",
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLDivElement).style.borderColor = "var(--accent)";
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(-3px)";
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLDivElement).style.borderColor = "var(--border)";
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
      }}
    >
      {/* ── TOP ── */}
      <div style={{ padding: "20px 20px 16px", display: "flex", alignItems: "flex-start", gap: 14, borderBottom: "1px solid var(--border)" }}>
        <div style={{ width: 56, height: 56, borderRadius: 12, background: "var(--surface2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, border: "1px solid var(--border)", flexShrink: 0 }}>
          {product.icon}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <span style={{ display: "inline-block", padding: "3px 8px", borderRadius: 4, fontSize: 10, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase", marginBottom: 5, background: cat.bg, color: cat.text, border: `1px solid ${cat.border}` }}>
            {product.subcategory}
          </span>
          <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 16, fontWeight: 700, color: "var(--text)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {product.name}
          </div>
          <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 2 }}>
            {product.brand} · SKU: {product.sku}
          </div>
        </div>
        {product.badge && (
          <span style={{ padding: "4px 8px", borderRadius: 4, fontSize: 10, fontWeight: 700, background: "var(--accent)", color: "#0d1f0f", flexShrink: 0 }}>
            {product.badge}
          </span>
        )}
      </div>

      {/* ── BODY ── */}
      <div style={{ padding: "14px 20px", flex: 1 }}>
        <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.55, marginBottom: 10, fontWeight: 300 }}>
          {product.description}
        </p>
        <button
          onClick={() => setExpanded(!expanded)}
          style={{ background: "none", border: "none", color: "var(--accent)", fontSize: 12, cursor: "pointer", fontFamily: "'Outfit',sans-serif", fontWeight: 500, marginBottom: 8, padding: 0 }}
        >
          {expanded ? "▲ Hide specs" : "▼ View specs"}
        </button>
        {expanded && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 5, marginBottom: 10 }}>
            {product.specs.map((s, i) => (
              <div key={i} style={{ background: "var(--surface2)", border: "1px solid var(--border)", borderRadius: 6, padding: "6px 8px", fontSize: 11, color: "var(--muted)" }}>
                {s}
              </div>
            ))}
          </div>
        )}
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <Stars rating={product.rating} />
          <span style={{ fontSize: 13, fontWeight: 600, color: "var(--text)" }}>{product.rating}</span>
          <span style={{ fontSize: 12, color: "var(--muted)" }}>({product.reviews})</span>
        </div>
      </div>

      {/* ── PRICE ROW ── */}
      <div style={{ padding: "12px 20px 0", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <span style={{ fontFamily: "'Syne',sans-serif", fontSize: 22, fontWeight: 800, color: "var(--accent)" }}>
            {toINR(product.price)}
          </span>
          <span style={{ fontSize: 12, color: "var(--muted)", marginLeft: 4 }}>/ {product.unit}</span>
          <div style={{ fontSize: 11, marginTop: 2, color: product.inStock < 40 ? "var(--accent2)" : "var(--accent)" }}>
            {product.inStock < 40
              ? `⚠ Only ${product.inStock} left`
              : `✓ In stock (${product.inStock})`}
          </div>
        </div>
        {/* Add to Cart */}
        <button
          onClick={() => onAddToCart(product)}
          style={{
            padding: "9px 16px",
            borderRadius: 8,
            border: "1px solid var(--accent)",
            background: "transparent",
            color: "var(--accent)",
            fontFamily: "'Outfit',sans-serif",
            fontSize: 13,
            fontWeight: 600,
            cursor: "pointer",
            transition: "all 0.18s",
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLButtonElement).style.background = "var(--accent)";
            (e.currentTarget as HTMLButtonElement).style.color = "#0d1f0f";
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLButtonElement).style.background = "transparent";
            (e.currentTarget as HTMLButtonElement).style.color = "var(--accent)";
          }}
        >
          🛒 Add
        </button>
      </div>

      {/* ── BUY NOW BUTTON ── */}
      <div style={{ padding: "10px 20px 16px" }}>
        <button
          onClick={handleBuyNow}
          style={{
            width: "100%",
            padding: "11px",
            borderRadius: 9,
            border: "none",
            background: bought
              ? "#2a5c2a"
              : "linear-gradient(135deg, #4caf50, #6dde6d)",
            color: bought ? "var(--accent)" : "#0d1f0f",
            fontFamily: "'Syne',sans-serif",
            fontSize: 14,
            fontWeight: 800,
            cursor: "pointer",
            letterSpacing: 0.4,
            transition: "all 0.25s",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
          }}
        >
          {bought ? "✅ Order Placed!" : "⚡ Buy Now"}
        </button>
      </div>
    </div>
  );
}