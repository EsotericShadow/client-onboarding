GEMINI.md: Master To-Do List for Client Onboarding Portal
Project Overview
This project is a client onboarding portal built with Next.js 15, React 19, TypeScript 5.x, Tailwind CSS, Prisma (Neon Postgres), Vercel Blob, Clerk (authentication), Resend (email notifications), zod (validation), and Google Gemini (AI chatbot for user assistance). The portal features a multi-step form, file uploads, admin notifications, and a Gemini-powered chatbot to guide users during onboarding. The project is deployed on Vercel with GitHub integration, developed on macOS Sequoia 15.5 with pnpm 10.12.4.
Purpose
This file serves as the master to-do list, orchestrating the incremental build of the project. Tasks are grouped by directory and sequenced for efficiency, with checkboxes to track completion. Each directory has its own GEMINI.md file with detailed instructions for implementing scripts. Update this file by checking off tasks as they are completed.
Prerequisites

Environment Setup: Ensure .env.local contains valid credentials for Neon (DATABASE_URL), Vercel Blob (BLOB_READ_WRITE_TOKEN), Resend (RESEND_API_KEY), Clerk (NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY, CLERK_SECRET_KEY), and Gemini (GEMINI_API_KEY).
Dependencies: All dependencies are installed (next@15.3.4, @vercel/blob@1.1.1, @prisma/client@6.10.1, etc.).
Database: Neon Postgres must be accessible (replace localhost:51214 in DATABASE_URL with Neon’s hosted URL).

To-Do List
1. Core Setup and Fixes

 Resolve Prisma Database Connection (prisma/GEMINI.md):
Update DATABASE_URL in .env.local with Neon credentials.
Run npx prisma migrate dev --name init to set up the database.


 Fix ESLint Errors (src/GEMINI.md):
Update .eslintrc.json to disable temporary linting rules for placeholders.


 Configure Environment Variables:
Populate .env.local with all required keys.



2. Authentication (Clerk)

 Implement Clerk Authentication (src/GEMINI.md):
Configure middleware.ts for route protection with Clerk.
Update src/app/layout.tsx to include Clerk’s <ClerkProvider>.



3. Database and API Routes

 Set Up Prisma Client (src/lib/GEMINI.md):
Implement db.ts to initialize Prisma client with Neon.


 Form Submission API (src/app/api/GEMINI.md):
Implement form/route.ts to validate and store form data with Prisma and send Resend notifications.


 File Upload API (src/app/api/GEMINI.md):
Implement upload/route.ts to handle file uploads with Vercel Blob.



4. Form and UI Components

 Multi-Step Form (src/components/GEMINI.md):
Implement MultiStepForm.tsx with react-hook-form and zod validation.


 File Upload Component (src/components/GEMINI.md):
Implement UploadField.tsx to upload files to /api/upload.


 Progress Bar (src/components/GEMINI.md):
Implement ProgressBar.tsx to show form progress.


 Success Page (src/components/GEMINI.md):
Implement Success.tsx for confirmation UI.


 Onboarding Pages (src/app/(onboarding)/GEMINI.md):
Implement page.tsx (landing), form/page.tsx, and success/page.tsx to render components.



5. Email Notifications

 Resend Notifications (src/lib/GEMINI.md):
Implement validateForm.ts to include email notification logic with Resend.



6. Gemini Integration

 Gemini API Route (src/app/api/GEMINI.md):
Create gemini/route.ts to handle Gemini chatbot requests using @google/generative-ai.


 Chatbot Component (src/components/GEMINI.md):
Create Chatbot.tsx to interact with /api/gemini and display responses.


 Integrate Chatbot (src/app/(onboarding)/GEMINI.md):
Add Chatbot.tsx to form/page.tsx for user assistance.



7. Testing and Deployment

 Write Tests (src/components/GEMINI.md, src/lib/GEMINI.md):
Add Jest tests for components and API routes in __tests__.


 Deploy to Vercel:
Push to GitHub and configure Vercel CI/CD with environment variables.



Notes

Efficiency: Tasks are sequenced to resolve dependencies first (e.g., database before API routes, auth before protected routes).
Scalability: Use TypeScript strict mode, modular components, and server-side API routes for security.
Documentation: Each GEMINI.md includes detailed instructions, error handling, and testing guidance.
Error Handling: Implement try-catch in API routes and log with winston.
Progress Tracking: Check off tasks here as Gemini completes them. Use git commit after each major task with descriptive messages.
