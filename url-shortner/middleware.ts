// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PUBLIC_ROUTES = [
  '/',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/api/urls(.*)',
  '/:slug',
  '/api/webhook'
];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  
  // Bypass auth for public routes
  if (PUBLIC_ROUTES.some(route => {
    const regex = new RegExp(`^${route.replace('*', '.*')}$`);
    return regex.test(path);
  })) {
    return NextResponse.next();
  }

  // Handle auth for protected routes
  const authCookie = req.cookies.get('__session')?.value;
  if (!authCookie) {
    const signInUrl = new URL('/sign-in', req.url);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};