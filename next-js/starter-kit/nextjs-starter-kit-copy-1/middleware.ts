import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { UpdateSession } from './lib/session';
import { CreateUpdateCoreCookies } from './core/framework/storage';


// This function can be marked `async` if using `await` inside
export default async function middleware(request: NextRequest) {

  // Core Cookies
  await CreateUpdateCoreCookies();

  // Update / Refresh Session
  // await UpdateSession();

  /*

  // Protected Rotues
  const protectedRoutes = ['/dashboard'];
  const currentPath = request.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(currentPath)

  if (isProtectedRoute) {
    // Check for valid session
    const cookie = (await cookies()).get('session')?.value || '';
    const session = await decrypt(cookie);

    // Redirect Unauth Users
    if (!session?.userId) {
      return NextResponse.redirect(new URL('/login', request.nextUrl))
    }
  }

  */
  // Render Route
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
}