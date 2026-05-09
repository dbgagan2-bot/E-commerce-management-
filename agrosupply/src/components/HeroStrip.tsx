// src/components/HeroStrip.tsx
interface HeroStripProps {
  activeCategory: string;
  onCategoryChange: (cat: string) => void;
  categories: string[];
}

const CATEGORY_ICONS: Record<string, string> = {
  "All": "All Products",
  "Pesticides": "🧴 Pesticides",
  "Fertilizers": "🌱 Fertilizers",
  "Tools & Equipment": "🔧 Tools & Equipment",
};

export default function HeroStrip({ activeCategory, onCategoryChange, categories }: HeroStripProps) {
  return (
    <div style={{ background: "linear-gradient(90deg,var(--surface) 0%,#1e3d22 50%,var(--surface) 100%)", borderBottom: "1px solid var(--border)", padding: "28px 28px 0" }}>
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 20, paddingBottom: 24 }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: 3, textTransform: "uppercase", color: "var(--accent)", marginBottom: 8 }}>
            Professional Agricultural Inputs
          </div>
          <h1 style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(28px,4vw,48px)", fontWeight: 800, color: "var(--text)", lineHeight: 1.05 }}>
            Pesticides, Fertilizers<br />&amp; <span style={{ color: "var(--accent)" }}>Farm Equipment</span>
          </h1>
          <p style={{ marginTop: 10, fontSize: 14, color: "var(--muted)", maxWidth: 480, lineHeight: 1.6, fontWeight: 300 }}>
            Source certified crop protection, soil nutrition inputs, and precision farm tools — all in one place.
          </p>
        </div>
        <div style={{ display: "flex", gap: 32 }}>
          {[["500+","Products"],["120+","Brands"],["48h","Delivery"],["ISO","Certified"]].map(([v,l]) => (
            <div key={l} style={{ textAlign: "right" }}>
              <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 26, fontWeight: 800, color: "var(--accent)" }}>{v}</div>
              <div style={{ fontSize: 11, color: "var(--muted)", letterSpacing: 1, textTransform: "uppercase" }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ display: "flex", borderTop: "1px solid var(--border)" }}>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => onCategoryChange(cat)}
            style={{
              padding: "14px 24px", border: "none", background: "transparent",
              color: activeCategory === cat ? "var(--accent)" : "var(--muted)",
              fontFamily: "'Outfit',sans-serif", fontSize: 13, fontWeight: activeCategory === cat ? 600 : 500,
              cursor: "pointer",
              borderBottom: activeCategory === cat ? "2px solid var(--accent)" : "2px solid transparent",
              transition: "all 0.18s"
            }}
          >
            {CATEGORY_ICONS[cat] ?? cat}
          </button>
        ))}
      </div>
    </div>
  );
}