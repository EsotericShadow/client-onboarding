"use client";

import MultiStepForm from "@/components/MultiStepForm";

export default function FormPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Onboarding Form</h1>
      <MultiStepForm />
    </div>
  );
}
