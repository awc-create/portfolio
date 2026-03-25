import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth-options"
import { getSites } from "@/lib/docker"
import { checkAllUptime } from "@/lib/uptime"
import { NextResponse } from "next/server"

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  try {
    const sites = await getSites()
    const slugs = sites.map((s) => s.slug)
    const uptime = await checkAllUptime(slugs)

    const result = sites.map((site) => ({
      ...site,
      uptime: uptime.find((u) => u.slug === site.slug) ?? null,
    }))

    return NextResponse.json(result)
  } catch (err) {
    console.error("Sites API error:", err)
    return NextResponse.json({ error: "Failed to fetch sites" }, { status: 500 })
  }
}
