import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {

  // Allow access to the home page without a token
  if (request.nextUrl.pathname === '/') {
    return NextResponse.next();
  }

  const token = request.cookies.get('session')?.value

  // If there is no token, redirect to the home page
  if (!token) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};