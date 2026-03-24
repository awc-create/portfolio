import { getToken } from 'next-auth/jwt'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

function withPathname(req: NextRequest, pathname: string): NextResponse {
  return NextResponse.next({
    request: {
      headers: new Headers({
        ...Object.fromEntries(req.headers.entries()),
        'x-pathname': pathname
      })
    }
  })
}

export async function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl

  // Always bypass static/api/auth/login
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api/') ||
    pathname === '/favicon.ico' ||
    pathname === '/login' ||
    pathname === '/login/'
  ) {
    return withPathname(req, pathname)
  }

  // Protect /dashboard
  if (pathname === '/dashboard' || pathname.startsWith('/dashboard/')) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
    if (!token) {
      const url = req.nextUrl.clone()
      url.pathname = '/login'
      url.search = ''
      url.searchParams.set('callbackUrl', `${pathname}${search || ''}`)
      return NextResponse.redirect(url)
    }
  }

  return withPathname(req, pathname)
}

export const config = {
  matcher: ['/((?!_next/|api/|assets/|public/|favicon.ico|robots.txt|sitemap.xml|.*\\..*).*)']
}