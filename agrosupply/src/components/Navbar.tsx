// src/components/Navbar.tsx
interface NavbarProps {
  cartCount: number;
  onCartOpen: () => void;
  onNavClick: (page: string) => void;
  userName: string;       // ← fix: capital N
  onLogout: () => void;
}

export default function Navbar({ cartCount, onCartOpen, onNavClick }: NavbarProps) {
  return (
    <nav style={{
      height: 64, background: "var(--surface)",
      borderBottom: "1px solid var(--border)",
      display: "flex", alignItems: "center",
      justifyContent: "space-between",
      padding: "0 28px", position: "sticky", top: 0, zIndex: 100
    }}>
      <div style={{ cursor: "pointer" }} onClick={() => onNavClick("home")}>
        <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 22, fontWeight: 800, color: "var(--accent)" }}>
          🌾 AgroSupply
        </div>
        <div style={{ fontSize: 11, color: "var(--muted)", letterSpacing: 2, textTransform: "uppercase" }}>
          Agricultural Inputs Store
        </div>
      </div>

      <div style={{ display: "flex", gap: 6 }}>
        {[
          { label: "📋 Catalog",     page: "catalog"     },
          { label: "🏷️ Bulk Orders", page: "bulk"        },
          { label: "📞 Support",     page: "support"     },
        ].map(({ label, page }) => (
          <button
            key={page}
            onClick={() => onNavClick(page)}
            style={{
              padding: "6px 14px", borderRadius: 6,
              border: "1px solid var(--border)", background: "transparent",
              color: "var(--muted)", fontFamily: "'Outfit',sans-serif",
              fontSize: 13, cursor: "pointer", transition: "all 0.18s"
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.color = "var(--accent)";
              (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--accent)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.color = "var(--muted)";
              (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border)";
            }}
          >
            {label}
          </button>
        ))}
      </div>

      <button
        onClick={onCartOpen}
        style={{
          display: "flex", alignItems: "center", gap: 10,
          padding: "9px 18px", borderRadius: 8,
          border: "1px solid var(--accent)", background: "transparent",
          color: "var(--accent)", fontFamily: "'Outfit',sans-serif",
          fontSize: 14, fontWeight: 600, cursor: "pointer"
        }}
      >
        🛒 Cart
        {cartCount > 0 && (
          <span style={{
            background: "var(--accent2)", color: "#0d1f0f",
            borderRadius: "50%", width: 20, height: 20,
            display: "flex", alignItems: "center",
            justifyContent: "center", fontSize: 11, fontWeight: 700
          }}>{cartCount}</span>
        )}
      </button>
    </nav>
  );
}