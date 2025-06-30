"use client";

import Link from "next/link";
import { SignedIn, SignedOut } from "@clerk/nextjs";

export default function HomePage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-6">Client Onboarding Portal</h1>
      <SignedIn>
        <div className="space-y-4">
          <p className="text-lg">Welcome! You can start the onboarding process below.</p>
          <Link href="/onboarding" className="btn btn-primary">
            Start Onboarding
          </Link>
        </div>
      </SignedIn>
      <SignedOut>
        <div className="space-y-4">
          <p className="text-lg">Please sign in to access the onboarding portal.</p>
        </div>
      </SignedOut>
    </div>
  );
}

