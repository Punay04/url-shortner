import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const publicRoutes = createRouteMatcher([
  "/",
  "/login(.*)",
  "/register",
  "/api/public(.*)", // Only truly public API routes
  "/api/webhooks(.*)", // Webhook endpoints
]);

export default clerkMiddleware(async (auth, req) => {
  // Skip middleware for static files and Next.js internals
  if (
    req.nextUrl.pathname.startsWith('/_next') ||
    req.nextUrl.pathname.includes('/favicon.ico') ||
    req.nextUrl.pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  const isPublicRoute = publicRoutes(req);
  
  if (!isPublicRoute) {
    try {
      const { userId } = await auth();
      
      if (!userId) {
        // Handle API routes differently
        if (req.nextUrl.pathname.startsWith('/api/')) {
          return NextResponse.json(
            { error: 'Unauthorized' }, 
            { status: 401 }
          );
        }
        
        // Redirect to login for page routes
        const loginUrl = new URL('/login', req.url);
        loginUrl.searchParams.set('redirect_url', req.url);
        return NextResponse.redirect(loginUrl);
      }
    } catch (error) {
      console.error('Middleware auth error:', error);
      
      if (req.nextUrl.pathname.startsWith('/api/')) {
        return NextResponse.json(
          { error: 'Authentication error' }, 
          { status: 500 }
        );
      }
      
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/webhooks (webhooks)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files
     */
    "/((?!api/webhooks|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};