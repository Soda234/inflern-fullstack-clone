import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const PROTECTED_PATHS = ['/dashboard', '/profile'];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isProtected = PROTECTED_PATHS.some((p) => pathname.startsWith(p));
  if (!isProtected) return NextResponse.next();

  const token =
    req.cookies.get('authjs.session-token')?.value ??
    req.cookies.get('__Secure-authjs.session-token')?.value;

  if (!token) {
    return NextResponse.redirect(new URL('/signin', req.url));
  }

  try {
    const secretKey = new TextEncoder().encode(process.env.AUTH_SECRET);
    await jwtVerify(token, secretKey);
    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL('/signin', req.url));
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
