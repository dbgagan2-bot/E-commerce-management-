// src/components/Toolbar.tsx
interface ToolbarProps {
  search: string;
  onSearch: (v: string) => void;
  sortBy: string;
  onSort: (v: string) => void;
  resultCount: number;
}

export default function Toolbar({ search, onSearch, sortBy, onSort, resultCount }: ToolbarProps) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 28px", gap: 16, flexWrap: "wrap" }}>
      <div style={{ position: "relative", flex: 1, maxWidth: 380 }}>
        <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "var(--muted)", fontSize: 16 }}>🔍</span>
        <input
          value={search}
          onChange={e => onSearch(e.target.value)}
          placeholder="Search by name, brand, SKU, or type..."
          style={{
            width: "100%", padding: "10px 16px 10px 42px",
            borderRadius: 8, border: "1px solid var(--border)",
            background: "var(--surface)", color: "var(--text)",
            fontFamily: "'Outfit',sans-serif", fontSize: 14, outline: "none"
          }}
        />
      </div>
      <span style={{ fontSize: 13, color: "var(--muted)" }}>
        <strong style={{ color: "var(--text)" }}>{resultCount}</strong> products found
      </span>
      <select
        value={sortBy}
        onChange={e => onSort(e.target.value)}
        style={{
          padding: "10px 14px", borderRadius: 8,
          border: "1px solid var(--border)", background: "var(--surface)",
          color: "var(--text)", fontFamily: "'Outfit',sans-serif", fontSize: 13, cursor: "pointer", outline: "none"
        }}
      >
        <option value="popular">Most Popular</option>
        <option value="rating">Highest Rated</option>
        <option value="price-asc">Price: Low → High</option>
        <option value="price-desc">Price: High → Low</option>
      </select>
    </div>
  );
}