import { getToken } from 'next-auth/jwt';
import { withAuth, NextRequestWithAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default async function middleware(req: NextRequestWithAuth) {
  const auth = await getToken({ req });
  const authenticated = !!auth;

  console.log(auth?.provider);

  if (req.nextUrl.pathname === '/login') {
    if (authenticated) {
      return NextResponse.redirect(new URL('/', req.url));
    }
  } else {
    if (!authenticated) {
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }

  // Credential protect
  if (
    req.nextUrl.pathname.startsWith('/credential') &&
    auth?.provider !== 'credentials'
  ) {
    return NextResponse.redirect(new URL('/forbidden', req.url));
  }

  // Keycloak protect
  if (
    req.nextUrl.pathname.startsWith('/keycloak') &&
    auth?.provider !== 'keycloak'
  ) {
    return NextResponse.redirect(new URL('/forbidden', req.url));
  }
}

export const config = {
  matcher: ['/', '/credential', '/login', '/keycloak'],
};
