import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth-options"
import { getSystemStats, getContainerStats } from "@/lib/docker"
import { getServerInfo, getMonthlySpend } from "@/lib/hetzner"
import { NextResponse } from "next/server"

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  try {
    const [system, containers, servers, spend] = await Promise.allSettled([
      getSystemStats(),
      getContainerStats(),
      getServerInfo(),
      getMonthlySpend(),
    ])

    return NextResponse.json({
      system: system.status === "fulfilled" ? system.value : null,
      containers: containers.status === "fulfilled" ? containers.value : [],
      servers: servers.status === "fulfilled" ? servers.value : [],
      spend: spend.status === "fulfilled" ? spend.value : [],
    })
  } catch (err) {
    console.error("Infrastructure API error:", err)
    return NextResponse.json({ error: "Failed to fetch infrastructure" }, { status: 500 })
  }
}
