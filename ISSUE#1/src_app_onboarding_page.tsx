"use client";

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
