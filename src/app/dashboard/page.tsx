"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface Site {
  slug: string
  status: "healthy" | "degraded" | "down"
  containers: Array<{
    name: string
    cpuPercent: number
    memUsage: number
    memLimit: number
    memPercent: number
    status: string
  }>
  uptime: {
    domain: string
    status: "up" | "down" | "slow"
    statusCode: number | null
    responseMs: number | null
  } | null
}

function formatBytes(bytes: number): string {
  if (bytes > 1e9) return `${(bytes / 1e9).toFixed(1)}GB`
  if (bytes > 1e6) return `${(bytes / 1e6).toFixed(0)}MB`
  if (bytes > 1e3) return `${(bytes / 1e3).toFixed(0)}KB`
  return `${bytes}B`
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { cls: string; label: string; dot: string }> = {
    healthy: { cls: "badge-green", label: "healthy", dot: "●" },
    up: { cls: "badge-green", label: "up", dot: "●" },
    degraded: { cls: "badge-amber", label: "degraded", dot: "◐" },
    slow: { cls: "badge-amber", label: "slow", dot: "◑" },
    down: { cls: "badge-red", label: "down", dot: "○" },
    stopped: { cls: "badge-red", label: "stopped", dot: "○" },
  }
  const s = map[status] ?? map.down
  return <span className={`badge ${s.cls}`}>{s.dot} {s.label}</span>
}

function AllSitesView({ sites }: { sites: Site[] }) {
  const totalMem = sites.reduce((acc, s) =>
    acc + s.containers.reduce((a, c) => a + c.memUsage, 0), 0)

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
      {/* Summary row */}
      <div className="grid-4" style={{ marginBottom: 24 }}>
        <div className="card">
          <div className="card-label">Total Sites</div>
          <div className="card-value">{sites.length}</div>
          <div className="card-sub">{sites.filter(s => s.status === "healthy").length} healthy</div>
        </div>
        <div className="card">
          <div className="card-label">Memory Used</div>
          <div className="card-value">{formatBytes(totalMem)}</div>
          <div className="card-sub">across all containers</div>
        </div>
        <div className="card">
          <div className="card-label">Uptime</div>
          <div className="card-value">{sites.filter(s => s.uptime?.status === "up").length}/{sites.length}</div>
          <div className="card-sub">sites responding</div>
        </div>
        <div className="card">
          <div className="card-label">Incidents</div>
          <div className="card-value" style={{ color: sites.some(s => s.status === "down") ? "var(--red)" : "var(--green)" }}>
            {sites.filter(s => s.status === "down").length}
          </div>
          <div className="card-sub">sites down</div>
        </div>
      </div>

      {/* Sites table */}
      <div className="card" style={{ padding: 0, overflow: "hidden" }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>Site</th>
              <th>Status</th>
              <th>Domain</th>
              <th>Response</th>
              <th>Memory</th>
              <th>CPU</th>
            </tr>
          </thead>
          <tbody>
            {sites.map((site) => {
              const totalSiteMem = site.containers.reduce((a, c) => a + c.memUsage, 0)
              const avgCpu = site.containers.reduce((a, c) => a + c.cpuPercent, 0) / (site.containers.length || 1)
              return (
                <tr key={site.slug}>
                  <td style={{ color: "var(--text)", fontWeight: 500 }}>
                    {site.slug}
                  </td>
                  <td><StatusBadge status={site.status} /></td>
                  <td style={{ color: "var(--text-muted)" }}>
                    {site.uptime?.domain ?? "—"}
                  </td>
                  <td style={{ color: site.uptime?.status === "slow" ? "var(--amber)" : "var(--text-muted)" }}>
                    {site.uptime?.responseMs ? `${site.uptime.responseMs}ms` : "—"}
                  </td>
                  <td>{formatBytes(totalSiteMem)}</td>
                  <td style={{ color: avgCpu > 50 ? "var(--amber)" : "var(--text-muted)" }}>
                    {avgCpu.toFixed(2)}%
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </motion.div>
  )
}

function SiteDetailView({ site }: { site: Site }) {
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
      {/* Site header */}
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
        <div>
          <h2 style={{ fontSize: 20, fontWeight: 500, letterSpacing: "-0.02em" }}>{site.slug}</h2>
          {site.uptime?.domain && (
            <a
              href={`https://${site.uptime.domain}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-muted)", textDecoration: "none" }}
            >
              {site.uptime.domain} ↗
            </a>
          )}
        </div>
        <StatusBadge status={site.status} />
        {site.uptime && <StatusBadge status={site.uptime.status} />}
      </div>

      {/* Stats cards */}
      <div className="grid-3" style={{ marginBottom: 24 }}>
        <div className="card">
          <div className="card-label">HTTP Status</div>
          <div className="card-value" style={{ color: site.uptime?.statusCode === 200 ? "var(--green)" : "var(--red)" }}>
            {site.uptime?.statusCode ?? "—"}
          </div>
          <div className="card-sub">{site.uptime?.responseMs ? `${site.uptime.responseMs}ms response` : "unreachable"}</div>
        </div>
        <div className="card">
          <div className="card-label">Memory</div>
          <div className="card-value">
            {formatBytes(site.containers.reduce((a, c) => a + c.memUsage, 0))}
          </div>
          <div className="card-sub">
            {site.containers.length} container{site.containers.length !== 1 ? "s" : ""}
          </div>
        </div>
        <div className="card">
          <div className="card-label">Avg CPU</div>
          <div className="card-value">
            {(site.containers.reduce((a, c) => a + c.cpuPercent, 0) / (site.containers.length || 1)).toFixed(2)}%
          </div>
          <div className="card-sub">across all containers</div>
        </div>
      </div>

      {/* Containers */}
      <div className="card" style={{ padding: 0, overflow: "hidden" }}>
        <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--border)" }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.3em", color: "var(--text-muted)", textTransform: "uppercase" }}>
            Containers
          </span>
        </div>
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Status</th>
              <th>CPU</th>
              <th>Memory</th>
              <th>Mem %</th>
            </tr>
          </thead>
          <tbody>
            {site.containers.map((c) => (
              <tr key={c.name}>
                <td style={{ color: "var(--text)" }}>{c.name}</td>
                <td><StatusBadge status={c.status} /></td>
                <td style={{ color: c.cpuPercent > 50 ? "var(--amber)" : "var(--text-muted)" }}>
                  {c.cpuPercent.toFixed(2)}%
                </td>
                <td>{formatBytes(c.memUsage)}</td>
                <td>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 100 }}>
                    <div className="progress-bar" style={{ flex: 1 }}>
                      <div
                        className={`progress-fill ${c.memPercent > 80 ? "progress-red" : c.memPercent > 60 ? "progress-amber" : "progress-green"}`}
                        style={{ width: `${Math.min(c.memPercent, 100)}%` }}
                      />
                    </div>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-muted)", minWidth: 36 }}>
                      {c.memPercent.toFixed(1)}%
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  )
}

export default function DashboardPage() {
  const [sites, setSites] = useState<Site[]>([])
  const [activeTab, setActiveTab] = useState("all")
  const [loading, setLoading] = useState(true)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  async function fetchSites() {
    try {
      const res = await fetch("/api/dashboard/sites")
      if (res.ok) {
        const data = await res.json()
        setSites(data)
        setLastUpdated(new Date())
      }
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSites()
    const interval = setInterval(fetchSites, 30000)
    return () => clearInterval(interval)
  }, [])

  const activeSite = sites.find((s) => s.slug === activeTab)

  return (
    <>
      <div className="page-header">
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
          <div>
            <h1 className="page-title">Overview</h1>
            <p className="page-sub">
              {lastUpdated
                ? `Last updated ${lastUpdated.toLocaleTimeString()} · auto-refresh 30s`
                : "Loading..."}
            </p>
          </div>
          <button
            onClick={fetchSites}
            style={{
              background: "none",
              border: "1px solid var(--border)",
              color: "var(--text-muted)",
              padding: "6px 14px",
              borderRadius: 4,
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              cursor: "pointer",
              letterSpacing: "0.1em",
              transition: "all 0.15s",
            }}
          >
            ↻ REFRESH
          </button>
        </div>
      </div>

      <div className="page-content">
        {loading ? (
          <div style={{ display: "flex", alignItems: "center", gap: 12, color: "var(--text-muted)", fontFamily: "var(--font-mono)", fontSize: 12 }}>
            <div style={{ width: 8, height: 8, background: "var(--green)", borderRadius: "50%", animation: "pulse 1s infinite" }} />
            Connecting to edge-app-1...
          </div>
        ) : (
          <>
            {/* Tabs */}
            <div className="tabs">
              <button
                className={`tab ${activeTab === "all" ? "active" : ""}`}
                onClick={() => setActiveTab("all")}
              >
                All Sites ({sites.length})
              </button>
              {sites.map((site) => (
                <button
                  key={site.slug}
                  className={`tab ${activeTab === site.slug ? "active" : ""}`}
                  onClick={() => setActiveTab(site.slug)}
                >
                  <span style={{
                    display: "inline-block",
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: site.status === "healthy" ? "var(--green)" : site.status === "degraded" ? "var(--amber)" : "var(--red)",
                    marginRight: 6,
                    verticalAlign: "middle",
                  }} />
                  {site.slug}
                </button>
              ))}
            </div>

            {/* Tab content */}
            <AnimatePresence mode="wait">
              {activeTab === "all" ? (
                <AllSitesView key="all" sites={sites} />
              ) : activeSite ? (
                <SiteDetailView key={activeTab} site={activeSite} />
              ) : null}
            </AnimatePresence>
          </>
        )}
      </div>
    </>
  )
}
