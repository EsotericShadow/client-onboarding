GEMINI.md: Source Directory
Purpose
This directory contains the middleware for route protection and is a good place to address project-wide ESLint fixes.
Tasks
1. Implement Clerk Middleware (middleware.ts)

Task: Configure Clerk for authentication to protect onboarding routes.
Instructions:
Update middleware.ts to use Clerk’s authMiddleware:import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: ["/", "/api/upload"],
  protectedRoutes: ["/onboarding", "/onboarding/form", "/onboarding/success"],
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};


Ensure Clerk environment variables are in .env.local.


Dependencies: .env.local with NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY and CLERK_SECRET_KEY.
Notes:
Protect /onboarding/* routes but allow public access to landing and upload API.
Log unauthorized attempts with winston.



2. Fix ESLint Errors

Task: Temporarily disable strict ESLint rules for placeholder code.
Instructions:
Update .eslintrc.json:{
  "extends": [
    "next",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:tailwindcss/recommended",
    "prettier"
  ],
  "rules": {
    "react/no-unescaped-entities": "warn",
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/no-unused-vars": "off",
    "@typescript-eslint/no-empty-object-type": "off"
  }
}


Run pnpm lint to verify no errors.


Dependencies: None.
Notes:
Re-enable rules after implementing real functionality.
Document rule changes in README.md.



Dependencies

@clerk/nextjs@6.23.1 for middleware.
ESLint dependencies (eslint@9.30.0, @typescript-eslint/*).

Notes

Scalability: Middleware supports future routes; add rate limiting if needed.
Documentation: Comment middleware logic for clarity.
Error Handling: Log middleware errors with winston.
