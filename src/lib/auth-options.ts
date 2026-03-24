import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import type { DefaultSession, NextAuthOptions } from 'next-auth'
import type { JWT } from 'next-auth/jwt'
import Credentials from 'next-auth/providers/credentials'

export const authOptions: NextAuthOptions = {
  session: { strategy: 'jwt' },

  providers: [
    Credentials({
      id: 'credentials',
      name: 'Email & Password',
      credentials: { email: {}, password: {} },
      authorize: async (raw) => {
        if (!raw?.email || !raw?.password) return null
        const user = await prisma.user.findUnique({
          where: { email: (raw.email as string).toLowerCase() }
        })
        if (!user?.password) return null
        const ok = await bcrypt.compare(raw.password as string, user.password)
        if (!ok) return null
        return { id: user.id, name: user.name, email: user.email }
      }
    })
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) token.id = user.id
      return token
    },
    async session({ session, token }) {
      const t = token as JWT & { id?: string }
      if (session.user && t.id) session.user.id = t.id
      return session
    }
  },

  pages: {
    signIn: '/login',
    error: '/login'
  },

  secret: process.env.NEXTAUTH_SECRET
}

declare module 'next-auth' {
  interface Session {
    user: { id: string } & DefaultSession['user']
  }
}