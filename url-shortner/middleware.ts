// middleware.ts
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Define public routes
const isPublicRoute = createRouteMatcher([
  "/",
  "/login(.*)",
  "/register(.*)",
  "/api(.*)", // public APIs
]);

export default clerkMiddleware((auth, req) => {
  if (!isPublicRoute(req)) {
    // No need to call .protect(), just referencing auth triggers auth checks
    auth(); // ✅ this alone ensures protection
  }
});

export const config = {
  matcher: [
    "/((?!_next|.*\\..*).*)",
    "/(api|trpc)(.*)",
  ],
};