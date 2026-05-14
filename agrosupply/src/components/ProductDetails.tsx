// src/components/ProductDetails.tsx
import type { Product } from "../types";
import { toINR } from "../utils/currency";

interface Props {
  product: Product;
  onClose: () => void;
  onAddToCart: (p: Product) => void;
  onBuyNow: (p: Product) => void;
}

const CAT_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  "Pesticides":        { bg: "#fff3e0", text: "#c45c00", border: "#f9a03c" },
  "Fertilizers":       { bg: "#e8f5e9", text: "#2e7d32", border: "#66bb6a" },
  "Tools & Equipment": { bg: "#e3f2fd", text: "#1565c0", border: "#42a5f5" },
};

const Stars = ({ rating }: { rating: number }) => (
  <span style={{ color: "#f0a500", fontSize: 14 }}>
    {"★".repeat(Math.floor(rating))}{"☆".repeat(5 - Math.floor(rating))}
  </span>
);

export default function ProductDetails({ product, onClose, onAddToCart, onBuyNow }: Props) {
  const cat = CAT_COLORS[product.category];

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.7)",
        zIndex: 300,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: "var(--surface)",
          borderRadius: 16,
          maxWidth: 600,
          width: "100%",
          maxHeight: "90vh",
          overflowY: "auto",
          position: "relative",
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: 16,
            right: 16,
            background: "none",
            border: "none",
            fontSize: 24,
            cursor: "pointer",
            color: "var(--muted)",
          }}
        >
          ✕
        </button>

        {/* Header */}
        <div style={{ padding: "24px 24px 20px", borderBottom: "1px solid var(--border)" }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
            <div
              style={{
                width: 80,
                height: 80,
                borderRadius: 16,
                background: "var(--surface2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 40,
                border: "1px solid var(--border)",
                flexShrink: 0,
              }}
            >
              {product.icon}
            </div>
            <div style={{ flex: 1 }}>
              <span
                style={{
                  display: "inline-block",
                  padding: "4px 10px",
                  borderRadius: 6,
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: 1,
                  textTransform: "uppercase",
                  marginBottom: 8,
                  background: cat.bg,
                  color: cat.text,
                  border: `1px solid ${cat.border}`,
                }}
              >
                {product.subcategory}
              </span>
              <h2
                style={{
                  fontFamily: "'Syne',sans-serif",
                  fontSize: 24,
                  fontWeight: 800,
                  color: "var(--text)",
                  margin: 0,
                }}
              >
                {product.name}
              </h2>
              <p style={{ fontSize: 14, color: "var(--muted)", margin: "4px 0" }}>
                {product.brand} · SKU: {product.sku}
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 8 }}>
                <Stars rating={product.rating} />
                <span style={{ fontSize: 14, fontWeight: 600, color: "var(--text)" }}>
                  {product.rating}
                </span>
                <span style={{ fontSize: 13, color: "var(--muted)" }}>
                  ({product.reviews} reviews)
                </span>
              </div>
            </div>
            {product.badge && (
              <span
                style={{
                  padding: "6px 12px",
                  borderRadius: 6,
                  fontSize: 12,
                  fontWeight: 700,
                  background: "var(--accent)",
                  color: "#0d1f0f",
                  flexShrink: 0,
                }}
              >
                {product.badge}
              </span>
            )}
          </div>
        </div>

        {/* Body */}
        <div style={{ padding: "20px 24px" }}>
          {/* Price */}
          <div style={{ marginBottom: 20 }}>
            <span
              style={{
                fontFamily: "'Syne',sans-serif",
                fontSize: 28,
                fontWeight: 800,
                color: "var(--accent)",
              }}
            >
              {toINR(product.price)}
            </span>
            <span style={{ fontSize: 14, color: "var(--muted)", marginLeft: 6 }}>
              / {product.unit}
            </span>
            <div
              style={{
                fontSize: 13,
                marginTop: 4,
                color: product.inStock < 40 ? "var(--accent2)" : "var(--accent)",
              }}
            >
              {product.inStock < 40
                ? `⚠ Only ${product.inStock} left`
                : `✓ In stock (${product.inStock})`}
            </div>
          </div>

          {/* Description */}
          <p
            style={{
              fontSize: 15,
              color: "var(--muted)",
              lineHeight: 1.6,
              marginBottom: 20,
            }}
          >
            {product.description}
          </p>

          {/* Usage Instructions */}
          {product.usage && (
            <div style={{ marginBottom: 24 }}>
              <h3
                style={{
                  fontFamily: "'Syne',sans-serif",
                  fontSize: 16,
                  fontWeight: 700,
                  color: "var(--text)",
                  marginBottom: 12,
                }}
              >
                📋 How to Use
              </h3>
              <p
                style={{
                  fontSize: 14,
                  color: "var(--muted)",
                  lineHeight: 1.6,
                  background: "var(--surface2)",
                  padding: "12px 16px",
                  borderRadius: 8,
                  border: "1px solid var(--border)",
                }}
              >
                {product.usage}
              </p>
            </div>
          )}

          {/* Dosage Information */}
          {product.dosage && (
            <div style={{ marginBottom: 24 }}>
              <h3
                style={{
                  fontFamily: "'Syne',sans-serif",
                  fontSize: 16,
                  fontWeight: 700,
                  color: "var(--text)",
                  marginBottom: 12,
                }}
              >
                📏 Dosage & Application
              </h3>
              <div
                style={{
                  fontSize: 14,
                  color: "var(--accent)",
                  fontWeight: 600,
                  background: "var(--surface2)",
                  padding: "12px 16px",
                  borderRadius: 8,
                  border: "1px solid var(--border)",
                }}
              >
                {product.dosage}
              </div>
            </div>
          )}

          {/* Specs */}
          <div style={{ marginBottom: 24 }}>
            <h3
              style={{
                fontFamily: "'Syne',sans-serif",
                fontSize: 16,
                fontWeight: 700,
                color: "var(--text)",
                marginBottom: 12,
              }}
            >
              Specifications
            </h3>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: 8,
              }}
            >
              {product.specs.map((spec, i) => (
                <div
                  key={i}
                  style={{
                    background: "var(--surface2)",
                    border: "1px solid var(--border)",
                    borderRadius: 8,
                    padding: "10px 12px",
                    fontSize: 13,
                    color: "var(--muted)",
                  }}
                >
                  {spec}
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div
            style={{
              display: "flex",
              gap: 12,
              paddingTop: 20,
              borderTop: "1px solid var(--border)",
            }}
          >
            <button
              onClick={() => onAddToCart(product)}
              style={{
                flex: 1,
                padding: "12px 20px",
                borderRadius: 10,
                border: "1px solid var(--accent)",
                background: "transparent",
                color: "var(--accent)",
                fontFamily: "'Outfit',sans-serif",
                fontSize: 15,
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = "var(--accent)";
                (e.currentTarget as HTMLButtonElement).style.color = "#0d1f0f";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                (e.currentTarget as HTMLButtonElement).style.color = "var(--accent)";
              }}
            >
              Add to Cart
            </button>
            <button
              onClick={() => onBuyNow(product)}
              style={{
                flex: 1,
                padding: "12px 20px",
                borderRadius: 10,
                border: "none",
                background: "var(--accent)",
                color: "#0d1f0f",
                fontFamily: "'Syne',sans-serif",
                fontSize: 15,
                fontWeight: 800,
                cursor: "pointer",
                transition: "opacity 0.2s",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.opacity = "0.88")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.opacity = "1")}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}