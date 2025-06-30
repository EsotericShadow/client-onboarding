"use client";

import Link from "next/link";

export default function Success() {
  return (
    <div className="text-center">
      <h1 className="text-2xl font-bold">Submission Successful!</h1>
      <p className="mt-4">Thank you for completing the onboarding process.</p>
      <Link href="/" className="btn btn-primary mt-4">Return to Home</Link>
    </div>
  );
}