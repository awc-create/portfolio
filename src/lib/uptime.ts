export interface UptimeResult {
  slug: string
  domain: string
  status: "up" | "down" | "slow"
  statusCode: number | null
  responseMs: number | null
  checkedAt: string
}

const SITE_DOMAINS: Record<string, string> = {
  "princefoods": "prince-v.com",
  "drcodezenna": "drcodezenna.com",
  "drethelojo": "drethelojo.com",
  "essentiaagency": "essentiaagency.co.uk",
  "madafmltd": "madafmltd.com",
  "regiofoods": "regiofoods.co.uk",
  "everything-visual": "everything-visual.com",
  "travelwithshego": "travelwithshego.com",
}

export async function checkUptime(slug: string, domain?: string): Promise<UptimeResult> {
  const targetDomain = domain ?? SITE_DOMAINS[slug] ?? `${slug}.com`
  const url = `https://${targetDomain}`
  const start = Date.now()

  try {
    const res = await fetch(url, {
      method: "HEAD",
      signal: AbortSignal.timeout(10000),
      redirect: "follow",
    })
    const responseMs = Date.now() - start

    return {
      slug,
      domain: targetDomain,
      status: responseMs > 3000 ? "slow" : "up",
      statusCode: res.status,
      responseMs,
      checkedAt: new Date().toISOString(),
    }
  } catch {
    return {
      slug,
      domain: targetDomain,
      status: "down",
      statusCode: null,
      responseMs: null,
      checkedAt: new Date().toISOString(),
    }
  }
}

export async function checkAllUptime(slugs: string[]): Promise<UptimeResult[]> {
  return Promise.all(slugs.map((slug) => checkUptime(slug)))
}
