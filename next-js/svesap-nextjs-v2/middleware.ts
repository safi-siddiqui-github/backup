import { NextResponse, type NextRequest } from 'next/server';
import { pathConstants } from './constants/pathConstants';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const cookie = request.cookies.get('admin-login');
  const token = cookie ? JSON.parse(cookie.value)?.state?.token : undefined;

  if (!token) {
    return NextResponse.redirect(new URL(pathConstants.login, request.url));
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  // matcher: '/about/:path*',
  // matcher: '/dashboard/:path*',
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    // '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
    '/dashboard',
  ],
};