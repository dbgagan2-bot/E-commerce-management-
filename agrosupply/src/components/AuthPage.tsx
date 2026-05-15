// src/components/AuthPage.tsx
import { useState } from "react";

interface Props {
  onLogin: (name: string, email: string) => void;
  onRegister: (name: string, email: string, password: string) => void;
}

export default function AuthPage({ onLogin, onRegister }: Props) {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setError("");
    setInfo("");
    if (!email.includes("@")) return setError("Please enter a valid email address.");
    if (!password) return setError("Please enter your password.");

    if (mode === "register") {
      if (!name.trim()) return setError("Please enter your full name.");
      if (!phone.trim()) return setError("Please enter your phone number.");
      if (password !== confirm) return setError("Passwords do not match.");
      if (password.length < 6) return setError("Password must be at least 6 characters.");

      setLoading(true);
      setTimeout(async () => {
        try {
          await onRegister(name.trim(), email.trim(), password);
          setMode("login");
          setEmail(email.trim());
          setPassword("");
          setConfirm("");
          setPhone("");
          setInfo("Registration successful. Please sign in with your new credentials.");
        } catch (err) {
          setError((err as Error).message || "Registration failed. Please try again.");
        } finally {
          setLoading(false);
        }
      }, 1200);
      return;
    }

    // Login via backend
    setLoading(true);
    setTimeout(async () => {
      try {
        const response = await fetch("/api/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: email.trim(), password }),
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message || "Login failed.");
        }

        const result = await response.json();
        onLogin(result.name, result.email);
      } catch (err) {
        setError((err as Error).message || "Login failed. Please try again.");
      } finally {
        setLoading(false);
      }
    }, 1200);
  };

  const inputStyle = {
    width: "100%",
    padding: "12px 16px",
    borderRadius: 10,
    border: "1px solid var(--border)",
    background: "var(--surface2)",
    color: "var(--text)",
    fontFamily: "'Outfit', sans-serif",
    fontSize: 14,
    outline: "none",
    transition: "border-color 0.18s",
  } as React.CSSProperties;

  const labelStyle = {
    fontSize: 12,
    fontWeight: 600,
    color: "var(--muted)",
    letterSpacing: 0.5,
    display: "block",
    marginBottom: 6,
    textTransform: "uppercase",
  } as React.CSSProperties;

  return (
    <div style={{
      minHeight: "100vh",
      background: "var(--bg)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 24,
      position: "relative",
      overflow: "hidden",
    }}>

      {/* Background decorative circles */}
      <div style={{
        position: "absolute", width: 500, height: 500,
        borderRadius: "50%", top: -150, left: -150,
        background: "radial-gradient(circle, rgba(109,222,109,0.06) 0%, transparent 70%)",
        pointerEvents: "none"
      }} />
      <div style={{
        position: "absolute", width: 400, height: 400,
        borderRadius: "50%", bottom: -100, right: -100,
        background: "radial-gradient(circle, rgba(109,222,109,0.04) 0%, transparent 70%)",
        pointerEvents: "none"
      }} />

      <div style={{
        width: "100%", maxWidth: 460,
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: 20,
        overflow: "hidden",
        boxShadow: "0 24px 80px rgba(0,0,0,0.4)",
        position: "relative", zIndex: 1,
      }}>

        {/* ── TOP BRAND ── */}
        <div style={{
          background: "linear-gradient(135deg, #0d1f0f 0%, #1e3d22 100%)",
          padding: "32px 32px 28px",
          textAlign: "center",
          borderBottom: "1px solid var(--border)"
        }}>
          <div style={{ fontSize: 42, marginBottom: 8 }}>🌾</div>
          <div style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: 28, fontWeight: 800,
            color: "var(--accent)", letterSpacing: -0.5
          }}>
            AgroSupply
          </div>
          <div style={{
            fontSize: 12, color: "var(--muted)",
            letterSpacing: 2, textTransform: "uppercase", marginTop: 4
          }}>
            Agricultural Inputs Store
          </div>
          <div style={{ marginTop: 16, display: "flex", justifyContent: "center", gap: 20 }}>
            {[["🧴", "Pesticides"], ["🌱", "Fertilizers"], ["🔧", "Equipment"]].map(([icon, label]) => (
              <div key={label} style={{ textAlign: "center" }}>
                <div style={{ fontSize: 18 }}>{icon}</div>
                <div style={{ fontSize: 10, color: "var(--muted)", marginTop: 2 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── TAB TOGGLE ── */}
        <div style={{ display: "flex", borderBottom: "1px solid var(--border)" }}>
          <button
            onClick={() => { setMode("login"); setError(""); }}
            style={{
              flex: 1, padding: "14px 0",
              border: "none", background: "transparent",
              fontFamily: "'Syne', sans-serif",
              fontSize: 14, fontWeight: 700,
              cursor: "pointer",
              color: mode === "login" ? "var(--accent)" : "var(--muted)",
              borderBottom: mode === "login" ? "2px solid var(--accent)" : "2px solid transparent",
              transition: "all 0.18s",
              textTransform: "capitalize",
              letterSpacing: 0.5,
            }}
          >
            🔑 Sign In
          </button>
          <button
            onClick={() => { setMode("register"); setError(""); }}
            style={{
              flex: 1, padding: "14px 0",
              border: "none", background: "transparent",
              fontFamily: "'Syne', sans-serif",
              fontSize: 14, fontWeight: 700,
              cursor: "pointer",
              color: mode === "register" ? "var(--accent)" : "var(--muted)",
              borderBottom: mode === "register" ? "2px solid var(--accent)" : "2px solid transparent",
              transition: "all 0.18s",
              textTransform: "capitalize",
              letterSpacing: 0.5,
            }}
          >
            📝 Register
          </button>
        </div>

        {/* ── FORM ── */}
        <div style={{ padding: "28px 32px 32px" }}>

          {/* Welcome text */}
          <div style={{ marginBottom: 24 }}>
            <h2 style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: 22, fontWeight: 800,
              color: "var(--text)", marginBottom: 4
            }}>
              {mode === "login" ? "Welcome back 👋" : "Create your account"}
            </h2>
            <p style={{ fontSize: 13, color: "var(--muted)", fontWeight: 300 }}>
              {mode === "login"
                ? "Sign in to access your farm supply orders."
                : "Join AgroSupply to order certified farm inputs."}
            </p>
          </div>

          {/* Full Name — register only */}
          {mode === "register" && (
            <div style={{ marginBottom: 16 }}>
              <label style={labelStyle}>Full Name</label>
              <input
                type="text"
                placeholder="e.g. Ramesh Kumar"
                value={name}
                onChange={e => setName(e.target.value)}
                style={inputStyle}
                onFocus={e => (e.currentTarget.style.borderColor = "var(--accent)")}
                onBlur={e => (e.currentTarget.style.borderColor = "var(--border)")}
              />
            </div>
          )}

          {/* Email */}
          <div style={{ marginBottom: 16 }}>
            <label style={labelStyle}>Email Address</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              style={inputStyle}
              onFocus={e => (e.currentTarget.style.borderColor = "var(--accent)")}
              onBlur={e => (e.currentTarget.style.borderColor = "var(--border)")}
            />
          </div>

          {/* Phone — register only */}
          {mode === "register" && (
            <div style={{ marginBottom: 16 }}>
              <label style={labelStyle}>Phone Number</label>
              <input
                type="tel"
                placeholder="+91 98765 43210"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                style={inputStyle}
                onFocus={e => (e.currentTarget.style.borderColor = "var(--accent)")}
                onBlur={e => (e.currentTarget.style.borderColor = "var(--border)")}
              />
            </div>
          )}

          {/* Password */}
          <div style={{ marginBottom: 16 }}>
            <label style={labelStyle}>Password</label>
            <input
              type="password"
              placeholder={mode === "login" ? "Enter your password" : "Min. 6 characters"}
              value={password}
              onChange={e => setPassword(e.target.value)}
              style={inputStyle}
              onFocus={e => (e.currentTarget.style.borderColor = "var(--accent)")}
              onBlur={e => (e.currentTarget.style.borderColor = "var(--border)")}
            />
          </div>

          {/* Confirm Password — register only */}
          {mode === "register" && (
            <div style={{ marginBottom: 16 }}>
              <label style={labelStyle}>Confirm Password</label>
              <input
                type="password"
                placeholder="Re-enter password"
                value={confirm}
                onChange={e => setConfirm(e.target.value)}
                style={inputStyle}
                onFocus={e => (e.currentTarget.style.borderColor = "var(--accent)")}
                onBlur={e => (e.currentTarget.style.borderColor = "var(--border)")}
              />
            </div>
          )}

          {/* Forgot password — login only */}
          {mode === "login" && (
            <div style={{ textAlign: "right", marginBottom: 20, marginTop: -8 }}>
              <span style={{ fontSize: 12, color: "var(--accent)", cursor: "pointer", fontWeight: 500 }}>
                Forgot password?
              </span>
            </div>
          )}

          {/* Error message */}
          {error && (
            <div style={{
              background: "rgba(255,107,107,0.1)",
              border: "1px solid rgba(255,107,107,0.3)",
              borderRadius: 8, padding: "10px 14px",
              fontSize: 13, color: "#ff6b6b",
              marginBottom: 16,
              display: "flex", alignItems: "center", gap: 8
            }}>
              ⚠ {error}
            </div>
          )}
          {info && (
            <div style={{
              background: "rgba(76,175,80,0.1)",
              border: "1px solid rgba(76,175,80,0.3)",
              borderRadius: 8, padding: "10px 14px",
              fontSize: 13, color: "#2d6a2d",
              marginBottom: 16,
              display: "flex", alignItems: "center", gap: 8
            }}>
              ✅ {info}
            </div>
          )}

          {/* Submit button */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            style={{
              width: "100%", padding: 15,
              borderRadius: 10, border: "none",
              background: loading
                ? "var(--surface2)"
                : "linear-gradient(135deg, #4caf50, #6dde6d)",
              color: loading ? "var(--muted)" : "#0d1f0f",
              fontFamily: "'Syne', sans-serif",
              fontSize: 16, fontWeight: 800,
              cursor: loading ? "not-allowed" : "pointer",
              transition: "all 0.2s",
              display: "flex", alignItems: "center",
              justifyContent: "center", gap: 8,
              letterSpacing: 0.3,
            }}
          >
            {loading
              ? "⏳ Please wait..."
              : mode === "login"
              ? "🔑 Sign In to AgroSupply"
              : "📝 Create Account"}
          </button>

          {/* Terms — register only */}
          {mode === "register" && (
            <p style={{
              fontSize: 11, color: "var(--muted)",
              textAlign: "center", marginTop: 14, lineHeight: 1.6
            }}>
              By registering you agree to our{" "}
              <span style={{ color: "var(--accent)", cursor: "pointer" }}>Terms of Service</span>
              {" "}and{" "}
              <span style={{ color: "var(--accent)", cursor: "pointer" }}>Privacy Policy</span>
            </p>
          )}

          {/* Switch mode */}
          <p style={{
            textAlign: "center", fontSize: 13,
            color: "var(--muted)", marginTop: 20
          }}>
            {mode === "login" ? "Don't have an account? " : "Already have an account? "}
            <span
              onClick={() => { setMode(mode === "login" ? "register" : "login"); setError(""); }}
              style={{ color: "var(--accent)", cursor: "pointer", fontWeight: 600 }}
            >
              {mode === "login" ? "Register here" : "Sign in"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}