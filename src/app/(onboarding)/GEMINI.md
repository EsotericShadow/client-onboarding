GEMINI.md: Onboarding Route Group
Purpose
This directory contains pages for the onboarding flow: landing page, multi-step form, and success confirmation.
Tasks
1. Implement Landing Page (page.tsx)

Task: Create a welcoming landing page with a call-to-action to start the form.
Instructions:
Update page.tsx:"use client";

import Link from "next/link";
import { SignedIn, SignedOut } from "@clerk/nextjs";

export default function OnboardingLanding() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold">Welcome to Client Onboarding</h1>
      <SignedIn>
        <Link href="/onboarding/form" className="btn btn-primary mt-4">
          Start Onboarding
        </Link>
      </SignedIn>
      <SignedOut>
        <p className="mt-4">Please sign in to start onboarding.</p>
      </SignedOut>
    </div>
  );
}


Use Tailwind CSS for styling.


Dependencies: Clerk authentication (middleware.ts), layout.tsx with <ClerkProvider>.
Notes:
Ensure accessibility (ARIA labels, keyboard navigation).
Log page views with winston.



2. Implement Form Page (form/page.tsx)

Task: Render the multi-step form and chatbot.
Instructions:
Update form/page.tsx:"use client";

import MultiStepForm from "@/components/MultiStepForm";
import Chatbot from "@/components/Chatbot";

export default function FormPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Onboarding Form</h1>
      <MultiStepForm />
      <Chatbot />
    </div>
  );
}




Dependencies: MultiStepForm.tsx, Chatbot.tsx, Clerk authentication.
Notes:
Ensure form is accessible and responsive.
Log form page loads with winston.



3. Implement Success Page (success/page.tsx)

Task: Display a confirmation message.
Instructions:
Update success/page.tsx:"use client";

import Success from "@/components/Success";

export default function SuccessPage() {
  return (
    <div className="container mx-auto p-4">
      <Success />
    </div>
  );
}




Dependencies: Success.tsx, Clerk authentication.
Notes:
Add a link to return to the dashboard.
Log success page views with winston.



Dependencies

src/components/MultiStepForm.tsx, Chatbot.tsx, Success.tsx.
src/middleware.ts for authentication.
Tailwind CSS for styling.

Notes

Scalability: Use route groups for future onboarding flows.
Documentation: Comment JSX for component roles.
Error Handling: Handle auth redirects gracefully.
