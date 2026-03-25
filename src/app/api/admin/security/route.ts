import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth-options"
import { getFailban, getRecentAuthAttempts } from "@/lib/docker"
import { NextResponse } from "next/server"

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  try {
    const [fail2ban, authAttempts] = await Promise.allSettled([
      getFailban(),
      getRecentAuthAttempts(),
    ])

    return NextResponse.json({
      fail2ban: fail2ban.status === "fulfilled" ? fail2ban.value : null,
      authAttempts: authAttempts.status === "fulfilled" ? authAttempts.value : [],
    })
  } catch (err) {
    console.error("Security API error:", err)
    return NextResponse.json({ error: "Failed to fetch security data" }, { status: 500 })
  }
}
