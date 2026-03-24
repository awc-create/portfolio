import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth-options"
import { runSSH } from "@/lib/ssh"
import { NextResponse } from "next/server"

async function getDbStats(slug: string) {
  try {
    const envRaw = await runSSH(
      `cat /opt/services/postgres-${slug}/.env 2>/dev/null || echo ""`
    )

    const getEnv = (key: string) => {
      const match = envRaw.match(new RegExp(`^${key}=(.+)$`, "m"))
      return match?.[1]?.trim() ?? ""
    }

    const dbName = getEnv("POSTGRES_DB") || getEnv("DB_NAME") || slug
    const dbUser = getEnv("POSTGRES_USER") || getEnv("DB_USER") || `${slug}_admin`
    const dbPass = getEnv("POSTGRES_PASSWORD") || getEnv("DB_PASSWORD") || ""
    const containerName = `postgres-${slug}-postgres-1`

    const sizeRaw = await runSSH(
      `docker exec -e PGPASSWORD="${dbPass}" ${containerName} psql -U ${dbUser} -d ${dbName} -tAc "SELECT pg_size_pretty(pg_database_size('${dbName}'));" 2>/dev/null`
    )

    const connRaw = await runSSH(
      `docker exec -e PGPASSWORD="${dbPass}" ${containerName} psql -U ${dbUser} -d ${dbName} -tAc "SELECT count(*) FROM pg_stat_activity WHERE datname='${dbName}';" 2>/dev/null`
    )

    const tablesRaw = await runSSH(
      `docker exec -e PGPASSWORD="${dbPass}" ${containerName} psql -U ${dbUser} -d ${dbName} -tAc "SELECT schemaname,tablename,n_live_tup,pg_size_pretty(pg_total_relation_size(quote_ident(tablename)::regclass)),pg_size_pretty(pg_indexes_size(quote_ident(tablename)::regclass)),seq_scan FROM pg_stat_user_tables ORDER BY pg_total_relation_size(quote_ident(tablename)::regclass) DESC LIMIT 20;" 2>/dev/null`
    )

    const tables = tablesRaw
      .split("\n")
      .filter(Boolean)
      .map((line) => {
        const [schema, name, rows, size, indexSize, seqScans] = line.split("|").map((s) => s.trim())
        return { schema, name, rowCount: parseInt(rows) || 0, size, indexSize, seqScans: parseInt(seqScans) || 0 }
      })

    return {
      slug,
      dbName,
      size: sizeRaw.trim(),
      activeConnections: parseInt(connRaw.trim()) || 0,
      tables,
      error: null,
    }
  } catch (err: any) {
    return { slug, dbName: slug, size: null, activeConnections: 0, tables: [], error: err.message }
  }
}

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  try {
    const raw = await runSSH("ls /opt/services/ 2>/dev/null")
    const slugs = raw
      .split("\n")
      .filter((s) => s.startsWith("postgres-") && s !== "postgres")
      .map((s) => s.replace("postgres-", ""))
      .filter(Boolean)

    const databases = await Promise.all(slugs.map(getDbStats))
    return NextResponse.json({ databases })
  } catch (err) {
    console.error("Databases API error:", err)
    return NextResponse.json({ error: "Failed to fetch database stats" }, { status: 500 })
  }
}
