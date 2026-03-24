const HETZNER_API = "https://api.hetzner.cloud/v1"

async function hetznerFetch(path: string) {
  const res = await fetch(`${HETZNER_API}${path}`, {
    headers: {
      Authorization: `Bearer ${process.env.HETZNER_API_TOKEN}`,
      "Content-Type": "application/json",
    },
    next: { revalidate: 300 }, // cache 5 mins
  })
  if (!res.ok) throw new Error(`Hetzner API error: ${res.status}`)
  return res.json()
}

export async function getServerInfo() {
  const data = await hetznerFetch("/servers")
  return data.servers ?? []
}

export async function getServerMetrics(serverId: number) {
  const end = new Date().toISOString()
  const start = new Date(Date.now() - 3600000).toISOString() // last hour
  const data = await hetznerFetch(
    `/servers/${serverId}/metrics?type=cpu,disk,network&start=${start}&end=${end}`
  )
  return data.metrics
}

export async function getCurrentInvoice() {
  try {
    const data = await hetznerFetch("/billing/invoices?page=1&per_page=1")
    return data.invoices?.[0] ?? null
  } catch {
    return null
  }
}

export async function getMonthlySpend() {
  try {
    // Hetzner doesn't have a direct "current month spend" endpoint
    // We use the pricing endpoint + server config to estimate
    const servers = await getServerInfo()
    return servers.map((s: any) => ({
      name: s.name,
      type: s.server_type?.name,
      hourlyPrice: s.server_type?.prices?.[0]?.price_hourly?.gross,
      monthlyPrice: s.server_type?.prices?.[0]?.price_monthly?.gross,
      location: s.datacenter?.location?.name,
      status: s.status,
    }))
  } catch {
    return []
  }
}
