"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

function formatBytes(bytes: number): string {
  if (bytes > 1e9) return `${(bytes / 1e9).toFixed(1)} GB`
  if (bytes > 1e6) return `${(bytes / 1e6).toFixed(0)} MB`
  if (bytes > 1e3) return `${(bytes / 1e3).toFixed(0)} KB`
  return `${bytes} B`
}

export default function DatabasesPage() {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [activeDb, setActiveDb] = useState<string | null>(null)

  useEffect(() => {
    fetch("/api/dashboard/databases")
      .then((r) => r.json())
      .then((d) => {
        setData(d)
        setLoading(false)
        if (d?.databases?.length > 0) setActiveDb(d.databases[0].slug)
      })
      .catch(() => setLoading(false))
  }, [])

  const databases = data?.databases ?? []
  const activeData = databases.find((d: any) => d.slug === activeDb)

  return (
    <>
      <div className="page-header">
        <h1 className="page-title">Databases</h1>
        <p className="page-sub">Postgres · PgBouncer · per-site stats</p>
      </div>

      <div className="page-content">
        {loading ? (
          <div style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)", fontSize: 12 }}>
            Querying databases...
          </div>
        ) : databases.length === 0 ? (
          <div style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)", fontSize: 12 }}>
            No database stats available
          </div>
        ) : (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
            {/* DB tabs */}
            <div className="tabs">
              {databases.map((db: any) => (
                <button
                  key={db.slug}
                  className={`tab ${activeDb === db.slug ? "active" : ""}`}
                  onClick={() => setActiveDb(db.slug)}
                >
                  {db.slug}
                </button>
              ))}
            </div>

            {activeData && (
              <>
                {/* Stats row */}
                <div className="grid-4" style={{ marginBottom: 24 }}>
                  <div className="card">
                    <div className="card-label">DB Size</div>
                    <div className="card-value">{activeData.size ?? "—"}</div>
                    <div className="card-sub">{activeData.dbName}</div>
                  </div>
                  <div className="card">
                    <div className="card-label">Active Connections</div>
                    <div className="card-value">{activeData.activeConnections ?? 0}</div>
                    <div className="card-sub">via pgbouncer</div>
                  </div>
                  <div className="card">
                    <div className="card-label">Tables</div>
                    <div className="card-value">{activeData.tables?.length ?? 0}</div>
                    <div className="card-sub">user tables</div>
                  </div>
                  <div className="card">
                    <div className="card-label">Status</div>
                    <div className="card-value" style={{ fontSize: 18, marginTop: 4 }}>
                      <span className={`badge ${activeData.error ? "badge-red" : "badge-green"}`}>
                        {activeData.error ? "● error" : "● healthy"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Tables */}
                {activeData.tables?.length > 0 && (
                  <div className="card" style={{ padding: 0, overflow: "hidden" }}>
                    <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--border)" }}>
                      <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.3em", color: "var(--text-muted)", textTransform: "uppercase" }}>
                        Table Stats
                      </span>
                    </div>
                    <table className="data-table">
                      <thead>
                        <tr>
                          <th>Table</th>
                          <th>Rows (est.)</th>
                          <th>Size</th>
                          <th>Index Size</th>
                          <th>Seq Scans</th>
                        </tr>
                      </thead>
                      <tbody>
                        {activeData.tables.map((t: any) => (
                          <tr key={t.name}>
                            <td style={{ color: "var(--text)" }}>{t.name}</td>
                            <td>{t.rowCount?.toLocaleString() ?? "—"}</td>
                            <td>{t.size ?? "—"}</td>
                            <td style={{ color: "var(--text-muted)" }}>{t.indexSize ?? "—"}</td>
                            <td style={{ color: t.seqScans > 1000 ? "var(--amber)" : "var(--text-muted)" }}>
                              {t.seqScans?.toLocaleString() ?? "—"}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {activeData.error && (
                  <div style={{
                    background: "rgba(239,68,68,0.08)",
                    border: "1px solid rgba(239,68,68,0.2)",
                    borderRadius: 8,
                    padding: "16px 20px",
                    fontFamily: "var(--font-mono)",
                    fontSize: 12,
                    color: "var(--red)",
                  }}>
                    {activeData.error}
                  </div>
                )}
              </>
            )}
          </motion.div>
        )}
      </div>
    </>
  )
}
