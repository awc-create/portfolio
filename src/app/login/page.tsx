"use client";

import { signIn } from "next-auth/react";
import { useState, Suspense } from "react";
import { motion } from "framer-motion";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl: "/dashboard",
      });
      if (res?.error) {
        setError("Invalid email or password.");
      } else if (res?.url) {
        window.location.href = res.url;
      }
    } catch {
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--bg)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `linear-gradient(rgba(34,197,94,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(34,197,94,0.03) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
          pointerEvents: "none",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={{
          width: "100%",
          maxWidth: 420,
          padding: "0 24px",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div style={{ marginBottom: 48, textAlign: "center" }}>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 28,
              fontWeight: 500,
              color: "var(--green)",
              letterSpacing: "0.2em",
              marginBottom: 4,
            }}
          >
            AWC
          </div>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 9,
              letterSpacing: "0.5em",
              color: "var(--text-muted)",
              textTransform: "uppercase",
            }}
          >
            Internal Platform
          </div>
        </div>

        <div
          style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border)",
            borderRadius: 10,
            padding: 36,
          }}
        >
          <h2 style={{ fontSize: 18, fontWeight: 500, marginBottom: 4 }}>
            Sign in
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: 13, marginBottom: 28 }}>
            AWC Internal Dashboard
          </p>

          <form onSubmit={handleSubmit}>
            {/* Email */}
            <label style={labelStyle}>Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@adaptiveworks.net"
              required
              style={inputStyle}
              onFocus={(e) => (e.target.style.borderColor = "var(--green)")}
              onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
            />

            {/* Password */}
            <label style={labelStyle}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              style={{ ...inputStyle, marginBottom: error ? 16 : 24 }}
              onFocus={(e) => (e.target.style.borderColor = "var(--green)")}
              onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
            />

            {error && (
              <div
                style={{
                  background: "rgba(239,68,68,0.08)",
                  border: "1px solid rgba(239,68,68,0.2)",
                  borderRadius: 6,
                  padding: "10px 14px",
                  color: "var(--red)",
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  marginBottom: 16,
                }}
              >
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                background: loading ? "var(--green-dim)" : "var(--green)",
                color: "var(--bg)",
                border: "none",
                borderRadius: 6,
                padding: "11px 20px",
                fontFamily: "var(--font-mono)",
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: "0.1em",
                cursor: loading ? "not-allowed" : "pointer",
                transition: "background 0.15s",
              }}
            >
              {loading ? "SIGNING IN..." : "SIGN IN →"}
            </button>
          </form>
        </div>

        <div
          style={{
            textAlign: "center",
            marginTop: 24,
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            color: "var(--text-dim)",
            letterSpacing: "0.1em",
          }}
        >
          RESTRICTED ACCESS · AWC INTERNAL
        </div>
      </motion.div>

      <style jsx global>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        :root {
          --bg: #080810;
          --bg-card: #0d0d1a;
          --border: #1a1a35;
          --text: #e2e8f0;
          --text-muted: #4a5568;
          --text-dim: #1e2535;
          --green: #22c55e;
          --green-dim: #14532d;
          --red: #ef4444;
          --font-mono: "IBM Plex Mono", monospace;
          --font-sans: "DM Sans", system-ui, sans-serif;
        }
        @import url("https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@300;400;500&family=DM+Sans:wght@300;400;500&display=swap");
        html, body { background: var(--bg); color: var(--text); font-family: var(--font-sans); }
      `}</style>
    </div>
  );
}

const labelStyle: React.CSSProperties = {
  display: "block",
  fontFamily: "var(--font-mono)",
  fontSize: 10,
  letterSpacing: "0.2em",
  color: "var(--text-muted)",
  textTransform: "uppercase",
  marginBottom: 8,
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  background: "var(--bg)",
  border: "1px solid var(--border)",
  borderRadius: 6,
  padding: "10px 14px",
  color: "var(--text)",
  fontFamily: "var(--font-mono)",
  fontSize: 13,
  outline: "none",
  marginBottom: 16,
  transition: "border-color 0.15s",
};

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
