"use client"

import { signOut } from "next-auth/react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"

const NAV = [
  { href: "/dashboard", label: "Overview", icon: "▦" },
  { href: "/dashboard/infrastructure", label: "Infrastructure", icon: "⬡" },
  { href: "/dashboard/security", label: "Security", icon: "◈" },
  { href: "/dashboard/databases", label: "Databases", icon: "⬟" },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="dash-root">
      <aside className="dash-sidebar">
        <div className="dash-brand">
          <span className="dash-brand-mark">AWC</span>
          <span className="dash-brand-sub">PLATFORM</span>
        </div>

        <nav className="dash-nav">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`dash-nav-item ${pathname === item.href ? "active" : ""}`}
            >
              <span className="dash-nav-icon">{item.icon}</span>
              <span className="dash-nav-label">{item.label}</span>
              {pathname === item.href && (
                <motion.div
                  className="dash-nav-indicator"
                  layoutId="nav-indicator"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </Link>
          ))}
        </nav>

        <div className="dash-sidebar-footer">
          <div className="dash-status-dot" />
          <span className="dash-status-text">edge-app-1 online</span>
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="dash-signout"
          >
            ⏻
          </button>
        </div>
      </aside>

      <main className="dash-main">
        <div className="dash-scanline" />
        {children}
      </main>

      <style jsx global>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --bg: #080810;
          --bg-card: #0d0d1a;
          --bg-hover: #12122a;
          --border: #1a1a35;
          --border-bright: #2a2a50;
          --text: #e2e8f0;
          --text-muted: #4a5568;
          --text-dim: #2d3748;
          --green: #22c55e;
          --green-dim: #14532d;
          --amber: #f59e0b;
          --red: #ef4444;
          --blue: #3b82f6;
          --accent: #6366f1;
          --font-mono: 'IBM Plex Mono', 'Fira Code', 'Courier New', monospace;
          --font-sans: 'DM Sans', system-ui, sans-serif;
        }

        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@300;400;500&family=DM+Sans:wght@300;400;500;600&display=swap');

        html, body { background: var(--bg); color: var(--text); font-family: var(--font-sans); height: 100%; }

        .dash-root {
          display: flex;
          height: 100vh;
          overflow: hidden;
        }

        .dash-sidebar {
          width: 220px;
          min-width: 220px;
          background: var(--bg-card);
          border-right: 1px solid var(--border);
          display: flex;
          flex-direction: column;
          padding: 28px 0;
          position: relative;
          z-index: 10;
        }

        .dash-brand {
          padding: 0 24px 28px;
          border-bottom: 1px solid var(--border);
          margin-bottom: 20px;
        }

        .dash-brand-mark {
          display: block;
          font-family: var(--font-mono);
          font-size: 20px;
          font-weight: 500;
          color: var(--green);
          letter-spacing: 0.15em;
        }

        .dash-brand-sub {
          font-family: var(--font-mono);
          font-size: 9px;
          letter-spacing: 0.4em;
          color: var(--text-muted);
          text-transform: uppercase;
        }

        .dash-nav {
          flex: 1;
          padding: 0 12px;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .dash-nav-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 12px;
          border-radius: 6px;
          text-decoration: none;
          color: var(--text-muted);
          font-size: 13px;
          font-weight: 400;
          letter-spacing: 0.02em;
          position: relative;
          transition: color 0.15s, background 0.15s;
        }

        .dash-nav-item:hover {
          color: var(--text);
          background: var(--bg-hover);
        }

        .dash-nav-item.active {
          color: var(--text);
          background: var(--bg-hover);
        }

        .dash-nav-icon {
          font-size: 14px;
          width: 18px;
          text-align: center;
          opacity: 0.7;
        }

        .dash-nav-indicator {
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 3px;
          height: 20px;
          background: var(--green);
          border-radius: 0 2px 2px 0;
        }

        .dash-sidebar-footer {
          padding: 20px 24px 0;
          border-top: 1px solid var(--border);
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 20px;
        }

        .dash-status-dot {
          width: 6px;
          height: 6px;
          background: var(--green);
          border-radius: 50%;
          box-shadow: 0 0 6px var(--green);
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }

        .dash-status-text {
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--text-muted);
          letter-spacing: 0.05em;
          flex: 1;
        }

        .dash-signout {
          background: none;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
          font-size: 14px;
          padding: 4px;
          transition: color 0.15s;
        }

        .dash-signout:hover { color: var(--red); }

        .dash-main {
          flex: 1;
          overflow-y: auto;
          position: relative;
          background: var(--bg);
        }

        .dash-scanline {
          position: fixed;
          top: 0; left: 220px; right: 0; bottom: 0;
          background: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(255,255,255,0.01) 2px,
            rgba(255,255,255,0.01) 4px
          );
          pointer-events: none;
          z-index: 1;
        }

        .card {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 8px;
          padding: 20px;
        }

        .card-label {
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.3em;
          color: var(--text-muted);
          text-transform: uppercase;
          margin-bottom: 8px;
        }

        .card-value {
          font-size: 28px;
          font-weight: 600;
          color: var(--text);
          letter-spacing: -0.02em;
        }

        .card-sub {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--text-muted);
          margin-top: 4px;
        }

        .badge {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 3px 8px;
          border-radius: 4px;
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        .badge-green { background: var(--green-dim); color: var(--green); border: 1px solid rgba(34,197,94,0.2); }
        .badge-amber { background: rgba(245,158,11,0.1); color: var(--amber); border: 1px solid rgba(245,158,11,0.2); }
        .badge-red { background: rgba(239,68,68,0.1); color: var(--red); border: 1px solid rgba(239,68,68,0.2); }

        .progress-bar {
          height: 4px;
          background: var(--border);
          border-radius: 2px;
          overflow: hidden;
          margin-top: 8px;
        }

        .progress-fill {
          height: 100%;
          border-radius: 2px;
          transition: width 0.6s ease;
        }

        .progress-green { background: var(--green); }
        .progress-amber { background: var(--amber); }
        .progress-red { background: var(--red); }

        .page-header {
          padding: 32px 32px 0;
          margin-bottom: 28px;
        }

        .page-title {
          font-size: 22px;
          font-weight: 500;
          color: var(--text);
          letter-spacing: -0.02em;
        }

        .page-sub {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--text-muted);
          margin-top: 4px;
          letter-spacing: 0.05em;
        }

        .page-content {
          padding: 0 32px 32px;
          position: relative;
          z-index: 2;
        }

        .grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
        .grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
        .grid-2 { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }

        .tabs {
          display: flex;
          gap: 0;
          border-bottom: 1px solid var(--border);
          margin-bottom: 24px;
          overflow-x: auto;
        }

        .tab {
          padding: 10px 16px;
          font-family: var(--font-mono);
          font-size: 11px;
          letter-spacing: 0.1em;
          color: var(--text-muted);
          cursor: pointer;
          border: none;
          background: none;
          border-bottom: 2px solid transparent;
          margin-bottom: -1px;
          white-space: nowrap;
          transition: color 0.15s;
          text-transform: uppercase;
        }

        .tab:hover { color: var(--text); }
        .tab.active { color: var(--green); border-bottom-color: var(--green); }

        .data-table { width: 100%; border-collapse: collapse; }
        .data-table th {
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.2em;
          color: var(--text-muted);
          text-align: left;
          padding: 8px 12px;
          border-bottom: 1px solid var(--border);
          text-transform: uppercase;
        }
        .data-table td {
          padding: 12px 12px;
          font-size: 13px;
          border-bottom: 1px solid var(--border);
          font-family: var(--font-mono);
        }
        .data-table tr:last-child td { border-bottom: none; }
        .data-table tr:hover td { background: var(--bg-hover); }
      `}</style>
    </div>
  )
}