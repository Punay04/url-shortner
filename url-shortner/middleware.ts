import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/login(.*)",
  "/register",
  "/api(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) {
    const { userId } = await auth();

    if (!userId) {
      // Not signed in, redirect to login
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }
});
  
export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"],
};