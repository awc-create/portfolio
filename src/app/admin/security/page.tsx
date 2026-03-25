// src/app/admin/security/page.tsx
"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

interface Fail2banData {
  totalBanned: number
  currentlyBanned: number
  bannedIPs: string[]
}

interface SecurityData {
  fail2ban: Fail2banData | null
  authAttempts: string[]
}

export default function SecurityPage() {
  const [data, setData] = useState<SecurityData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/admin/security")
      .then((r) => r.json())
      .then((d: SecurityData) => { setData(d); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  const fail2ban = data?.fail2ban
  const attempts = data?.authAttempts ?? []

  return (
    <>
      <div className="page-header">
        <h1 className="page-title">Security</h1>
        <p className="page-sub">Fail2ban · SSH · UFW · Auth attempts</p>
      </div>

      <div className="page-content">
        {loading ? (
          <div style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)", fontSize: 12 }}>
            Reading security logs...
          </div>
        ) : (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
            <div className="grid-3" style={{ marginBottom: 24 }}>
              <div className="card">
                <div className="card-label">Currently Banned</div>
                <div className="card-value" style={{ color: (fail2ban?.currentlyBanned ?? 0) > 0 ? "var(--amber)" : "var(--green)" }}>
                  {fail2ban?.currentlyBanned ?? 0}
                </div>
                <div className="card-sub">active IP bans (sshd)</div>
              </div>
              <div className="card">
                <div className="card-label">Total Banned</div>
                <div className="card-value">{fail2ban?.totalBanned ?? 0}</div>
                <div className="card-sub">since last restart</div>
              </div>
              <div className="card">
                <div className="card-label">Jail Status</div>
                <div className="card-value" style={{ fontSize: 18 }}>
                  <span className="badge badge-green">● active</span>
                </div>
                <div className="card-sub">sshd jail running</div>
              </div>
            </div>

            {(fail2ban?.bannedIPs?.length ?? 0) > 0 && (
              <div className="card" style={{ marginBottom: 24 }}>
                <div className="card-label" style={{ marginBottom: 12 }}>Banned IPs</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {fail2ban?.bannedIPs.map((ip) => (
                    <span key={ip} style={{ fontFamily: "var(--font-mono)", fontSize: 11, padding: "4px 10px", background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: 4, color: "var(--red)" }}>
                      {ip}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="card" style={{ padding: 0, overflow: "hidden" }}>
              <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.3em", color: "var(--text-muted)", textTransform: "uppercase" }}>Recent Auth Events</span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-muted)" }}>last 24h</span>
              </div>
              <div style={{ padding: "8px 0", maxHeight: 400, overflowY: "auto" }}>
                {attempts.length === 0 ? (
                  <div style={{ padding: "16px 20px", fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-muted)" }}>No recent events</div>
                ) : (
                  attempts.map((line, i) => {
                    const isAccepted = line.toLowerCase().includes("accepted")
                    const isFailed = line.toLowerCase().includes("failed") || line.toLowerCase().includes("invalid")
                    return (
                      <div key={i} style={{ padding: "6px 20px", fontFamily: "var(--font-mono)", fontSize: 11, color: isAccepted ? "var(--green)" : isFailed ? "var(--red)" : "var(--text-muted)", borderBottom: i < attempts.length - 1 ? "1px solid var(--border)" : "none", lineHeight: 1.5, wordBreak: "break-all" }}>
                        {isAccepted ? "✓ " : isFailed ? "✗ " : "· "}{line}
                      </div>
                    )
                  })
                )}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </>
  )
}