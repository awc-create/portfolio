"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

function formatBytes(bytes: number): string {
  if (bytes > 1e9) return `${(bytes / 1e9).toFixed(1)} GB`
  if (bytes > 1e6) return `${(bytes / 1e6).toFixed(0)} MB`
  return `${bytes}B`
}

function formatUptime(seconds: number): string {
  const d = Math.floor(seconds / 86400)
  const h = Math.floor((seconds % 86400) / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  if (d > 0) return `${d}d ${h}h ${m}m`
  if (h > 0) return `${h}h ${m}m`
  return `${m}m`
}

export default function InfrastructurePage() {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/dashboard/infrastructure")
      .then((r) => r.json())
      .then((d) => { setData(d); setLoading(false) })
      .catch(() => setLoading(false))
    const interval = setInterval(() => {
      fetch("/api/dashboard/infrastructure")
        .then((r) => r.json())
        .then(setData)
    }, 30000)
    return () => clearInterval(interval)
  }, [])

  const sys = data?.system
  const servers = data?.servers ?? []
  const spend = data?.spend ?? []

  const memPct = sys ? (sys.memory.used / sys.memory.total) * 100 : 0
  const diskPct = sys ? (sys.disk.used / sys.disk.total) * 100 : 0

  return (
    <>
      <div className="page-header">
        <h1 className="page-title">Infrastructure</h1>
        <p className="page-sub">edge-app-1 · Nuremberg · CCX13</p>
      </div>

      <div className="page-content">
        {loading ? (
          <div style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)", fontSize: 12 }}>
            Fetching system stats...
          </div>
        ) : (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
            {/* System stats */}
            <div className="grid-4" style={{ marginBottom: 24 }}>
              <div className="card">
                <div className="card-label">Memory</div>
                <div className="card-value">{sys ? formatBytes(sys.memory.used) : "—"}</div>
                <div className="card-sub">{sys ? `${memPct.toFixed(0)}% of ${formatBytes(sys.memory.total)}` : "—"}</div>
                <div className="progress-bar">
                  <div
                    className={`progress-fill ${memPct > 80 ? "progress-red" : memPct > 60 ? "progress-amber" : "progress-green"}`}
                    style={{ width: `${memPct}%` }}
                  />
                </div>
              </div>

              <div className="card">
                <div className="card-label">Disk</div>
                <div className="card-value">{sys ? formatBytes(sys.disk.used) : "—"}</div>
                <div className="card-sub">{sys ? `${diskPct.toFixed(0)}% of ${formatBytes(sys.disk.total)}` : "—"}</div>
                <div className="progress-bar">
                  <div
                    className={`progress-fill ${diskPct > 80 ? "progress-red" : diskPct > 60 ? "progress-amber" : "progress-green"}`}
                    style={{ width: `${diskPct}%` }}
                  />
                </div>
              </div>

              <div className="card">
                <div className="card-label">Load Average</div>
                <div className="card-value">{sys ? sys.load.load1.toFixed(2) : "—"}</div>
                <div className="card-sub">
                  {sys ? `5m: ${sys.load.load5.toFixed(2)} · 15m: ${sys.load.load15.toFixed(2)}` : "—"}
                </div>
              </div>

              <div className="card">
                <div className="card-label">Uptime</div>
                <div className="card-value" style={{ fontSize: 20 }}>
                  {sys ? formatUptime(sys.uptime) : "—"}
                </div>
                <div className="card-sub">server uptime</div>
              </div>
            </div>

            {/* Hetzner servers */}
            {servers.length > 0 && (
              <div className="card" style={{ marginBottom: 24, padding: 0, overflow: "hidden" }}>
                <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--border)" }}>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.3em", color: "var(--text-muted)", textTransform: "uppercase" }}>
                    Hetzner Servers
                  </span>
                </div>
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Type</th>
                      <th>Status</th>
                      <th>Location</th>
                      <th>Monthly</th>
                    </tr>
                  </thead>
                  <tbody>
                    {servers.map((s: any) => (
                      <tr key={s.id}>
                        <td style={{ color: "var(--text)" }}>{s.name}</td>
                        <td style={{ color: "var(--text-muted)" }}>{s.server_type?.name}</td>
                        <td>
                          <span className={`badge ${s.status === "running" ? "badge-green" : "badge-red"}`}>
                            ● {s.status}
                          </span>
                        </td>
                        <td style={{ color: "var(--text-muted)" }}>{s.datacenter?.location?.name}</td>
                        <td style={{ color: "var(--green)" }}>
                          €{s.server_type?.prices?.[0]?.price_monthly?.gross ?? "—"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Cost breakdown */}
            {spend.length > 0 && (
              <div className="card">
                <div className="card-label" style={{ marginBottom: 16 }}>Monthly Cost Estimate</div>
                {spend.map((s: any, i: number) => (
                  <div key={i} style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "8px 0",
                    borderBottom: i < spend.length - 1 ? "1px solid var(--border)" : "none"
                  }}>
                    <div>
                      <div style={{ fontSize: 13, color: "var(--text)" }}>{s.name}</div>
                      <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-muted)", marginTop: 2 }}>
                        {s.type} · {s.location}
                      </div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontFamily: "var(--font-mono)", fontSize: 14, color: "var(--green)" }}>
                        €{s.monthlyPrice}
                      </div>
                      <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-muted)" }}>
                        €{s.hourlyPrice}/hr
                      </div>
                    </div>
                  </div>
                ))}
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  paddingTop: 12,
                  marginTop: 4,
                  borderTop: "1px solid var(--border-bright)"
                }}>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-muted)", letterSpacing: "0.2em", textTransform: "uppercase" }}>
                    Total
                  </span>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 16, color: "var(--green)", fontWeight: 500 }}>
                    €{spend.reduce((a: number, s: any) => a + parseFloat(s.monthlyPrice ?? 0), 0).toFixed(2)}
                  </span>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </>
  )
}
