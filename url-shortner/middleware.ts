import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const publicRoutes = createRouteMatcher([
  "/",
  "/login(.*)",
  "/register",
  "/api(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  if (!publicRoutes(req)) {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }
});

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"],
};