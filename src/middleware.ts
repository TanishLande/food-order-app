import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"

// Define public routes (optional, since all routes will be public by default)
const publicRoutes = createRouteMatcher(["/sign-in(.*)", "/sign-up(.*)"]);

// Define protected routes manually (add routes here that require authentication)
const protectedRoutes = createRouteMatcher([
  "/dashboard(.*)", // Example: Protect dashboard routes
  "/profile(.*)",   // Example: Protect profile routes
])

export default clerkMiddleware(async (auth, request) => {
  // Only protect routes explicitly listed in protectedRoutes
  if (protectedRoutes(request)) {
    await auth.protect()
  }
  // No action needed for other routes; they remain public by default
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
}