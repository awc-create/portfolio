import { runSSH } from "./ssh"

export interface ContainerStat {
  id: string
  name: string
  slug: string
  cpuPercent: number
  memUsage: number
  memLimit: number
  memPercent: number
  netIn: number
  netOut: number
  status: "running" | "stopped" | "error"
  image: string
}

export interface SiteInfo {
  slug: string
  containers: ContainerStat[]
  status: "healthy" | "degraded" | "down"
}

function parseBytes(str: string): number {
  const units: Record<string, number> = {
    B: 1, kB: 1e3, MB: 1e6, GB: 1e9,
    KiB: 1024, MiB: 1048576, GiB: 1073741824,
  }
  const match = str.match(/^([\d.]+)\s*([A-Za-z]+)$/)
  if (!match) return 0
  return parseFloat(match[1]) * (units[match[2]] ?? 1)
}

export async function getContainerStats(): Promise<ContainerStat[]> {
  const raw = await runSSH(
    `docker stats --no-stream --format '{"id":"{{.ID}}","name":"{{.Name}}","cpu":"{{.CPUPerc}}","mem":"{{.MemUsage}}","memPerc":"{{.MemPerc}}","net":"{{.NetIO}}","image":"{{.Image}}"}'`
  )

  return raw
    .split("\n")
    .filter(Boolean)
    .map((line) => {
      try {
        const d = JSON.parse(line)
        const [memUsed, memTotal] = d.mem.split(" / ")
        const [netIn, netOut] = d.net.split(" / ")
        const slug = d.name.replace(/-app-\d+$/, "").replace(/-web-\d+$/, "")

        return {
          id: d.id,
          name: d.name,
          slug,
          cpuPercent: parseFloat(d.cpu),
          memUsage: parseBytes(memUsed),
          memLimit: parseBytes(memTotal),
          memPercent: parseFloat(d.memPerc),
          netIn: parseBytes(netIn),
          netOut: parseBytes(netOut),
          status: "running" as const,
          image: d.image,
        }
      } catch {
        return null
      }
    })
    .filter(Boolean) as ContainerStat[]
}

export async function getSites(): Promise<SiteInfo[]> {
  const stats = await getContainerStats()

  // Group by slug — only app containers
  const appContainers = stats.filter(
    (c) => c.name.match(/-app-\d+$/) || c.name.match(/-web-\d+$/)
  )

  const siteMap = new Map<string, ContainerStat[]>()
  for (const c of appContainers) {
    if (!siteMap.has(c.slug)) siteMap.set(c.slug, [])
    siteMap.get(c.slug)!.push(c)
  }

  return Array.from(siteMap.entries()).map(([slug, containers]) => ({
    slug,
    containers,
    status:
      containers.every((c) => c.status === "running")
        ? "healthy"
        : containers.some((c) => c.status === "running")
        ? "degraded"
        : "down",
  }))
}

export async function getSystemStats() {
  const [memRaw, diskRaw, uptimeRaw, loadRaw] = await Promise.all([
    runSSH("free -b | awk 'NR==2{print $2,$3,$4}'"),
    runSSH("df -B1 / | awk 'NR==2{print $2,$3,$4}'"),
    runSSH("cat /proc/uptime | awk '{print $1}'"),
    runSSH("cat /proc/loadavg"),
  ])

  const [memTotal, memUsed, memFree] = memRaw.split(" ").map(Number)
  const [diskTotal, diskUsed, diskFree] = diskRaw.split(" ").map(Number)
  const uptimeSeconds = parseFloat(uptimeRaw)
  const [load1, load5, load15] = loadRaw.split(" ").map(parseFloat)

  return {
    memory: { total: memTotal, used: memUsed, free: memFree },
    disk: { total: diskTotal, used: diskUsed, free: diskFree },
    uptime: uptimeSeconds,
    load: { load1, load5, load15 },
  }
}

export async function getFailban() {
  try {
    const raw = await runSSH("fail2ban-client status sshd 2>/dev/null")
    const bannedMatch = raw.match(/Banned IP list:\s*(.+)/i)
    const totalMatch = raw.match(/Total banned:\s*(\d+)/i)
    const currentMatch = raw.match(/Currently banned:\s*(\d+)/i)

    return {
      totalBanned: parseInt(totalMatch?.[1] ?? "0"),
      currentlyBanned: parseInt(currentMatch?.[1] ?? "0"),
      bannedIPs: bannedMatch?.[1]?.trim().split(/\s+/).filter(Boolean) ?? [],
    }
  } catch {
    return { totalBanned: 0, currentlyBanned: 0, bannedIPs: [] }
  }
}

export async function getRecentAuthAttempts() {
  try {
    const raw = await runSSH(
      "journalctl -u ssh --since '24 hours ago' --no-pager | grep -i 'failed\\|invalid\\|accepted' | tail -20 2>/dev/null || grep -i 'failed\\|invalid\\|accepted' /var/log/auth.log | tail -20 2>/dev/null"
    )
    return raw.split("\n").filter(Boolean).slice(-20)
  } catch {
    return []
  }
}
