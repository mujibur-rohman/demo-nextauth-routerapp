import { withAuth, NextRequestWithAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req: NextRequestWithAuth) {
    // console.log('middle', req.nextUrl.pathname);
    // console.log('token', req.nextauth.token?.provider);

    // Credential protect
    if (
      req.nextUrl.pathname.startsWith('/credential') &&
      req.nextauth.token?.provider !== 'credentials'
    ) {
      return NextResponse.redirect(new URL('/forbidden', req.url));
    }

    // Keycloak protect
    if (
      req.nextUrl.pathname.startsWith('/keycloak') &&
      req.nextauth.token?.provider !== 'keycloak'
    ) {
      return NextResponse.redirect(new URL('/forbidden', req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        // console.log('callback', token);
        return Boolean(token);
      },
    },
  }
);

export const config = { matcher: ['/keycloak', '/credential', '/'] };
