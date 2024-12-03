import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const protectedRoutes = ['/dashboard', '/profile', '/api/']
const publicRoutes = ['/', '/signin', '/signup']

export async function middleware(request: NextRequest) {
//   const { pathname } = request.nextUrl

//   const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route))
//   const isPublicRoute = publicRoutes.includes(pathname)

//   if (isPublicRoute) {
//     return NextResponse.next()
//   }

//   if (isProtectedRoute) {
//     const session = request.cookies.get('session')

//     if (!session) {
//       return NextResponse.redirect(new URL('/signin', request.url))
//     }

//     return NextResponse.next()
//   }

  // return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}