import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  const email = (process.env.ADMIN_EMAIL ?? "adaptiveworkflowconsultancy@gmail.com").trim().toLowerCase()
  const name = (process.env.ADMIN_NAME ?? "Adnan Said").trim()
  const plain = (process.env.ADMIN_PASSWORD ?? "changeme123").trim()
  const hash = await bcrypt.hash(plain, 12)

  await prisma.user.upsert({
    where: { email },
    update: { password: hash, name },
    create: {
      email,
      name,
      password: hash,
      role: "ADMIN",
    },
  })

  console.log(`✅ Admin seeded: ${email}`)
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error("❌ Seed failed:", e)
    prisma.$disconnect()
    process.exit(1)
  })