import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

export const proxy = async function (request: Request) {
  const token = await getToken({
    req: request as any,
    secret: process.env.AUTH_SECRET,
  });
  const isLoggedIn = !!token;

  const url = new URL(request.url);

  if (url.pathname.startsWith('/dashboard') && !isLoggedIn) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  return NextResponse.next();
};

export const config = {
  matcher: ['/dashboard/:path*'],
};
