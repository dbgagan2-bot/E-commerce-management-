// src/components/Toast.tsx
interface Props { message: string; }

export default function Toast({ message }: Props) {
  return (
    <div style={{
      position: "fixed", bottom: 28, right: 28,
      background: "var(--surface2)", border: "1px solid var(--accent)",
      color: "var(--text)", padding: "12px 20px", borderRadius: 10,
      fontSize: 13, fontWeight: 500, zIndex: 300,
      boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
      display: "flex", alignItems: "center", gap: 8
    }}>
      <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--accent)" }} />
      {message}
    </div>
  );
}