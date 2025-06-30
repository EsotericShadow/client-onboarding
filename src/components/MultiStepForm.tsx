"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "@/lib/validateForm";
import { useState } from "react";
import ProgressBar from "./ProgressBar";
import UploadField from "./UploadField";

type FormData = {
  clientName: string;
  email: string;
  details: string;
  files?: { url: string; name: string; type: string; size: number }[];
};

export default function MultiStepForm() {
  const [step, setStep] = useState(1);
  const { register, handleSubmit, formState: { errors }, setValue } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: { files: [] },
  });

  const onSubmit = async (data: FormData) => {
    const res = await fetch("/api/form", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      window.location.href = "/onboarding/success";
    }
  };

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
      <ProgressBar step={step} totalSteps={3} />
      {step === 1 && (
        <div>
          <input {...register("clientName")} className="input" placeholder="Client Name" />
          {errors.clientName && <p className="text-red-500">{errors.clientName.message}</p>}
          <button type="button" onClick={handleNext} className="btn btn-primary mt-2">Next</button>
        </div>
      )}
      {step === 2 && (
        <div>
          <input {...register("email")} className="input" placeholder="Email" />
          {errors.email && <p className="text-red-500">{errors.email.message}</p>}
          <input {...register("details")} className="input" placeholder="Details" />
          {errors.details && <p className="text-red-500">{errors.details.message}</p>}
          <button type="button" onClick={handleBack} className="btn btn-secondary mt-2">Back</button>
          <button type="button" onClick={handleNext} className="btn btn-primary mt-2">Next</button>
        </div>
      )}
      {step === 3 && (
        <div>
          <UploadField setFiles={(files) => setValue("files", files)} />
          {errors.files && <p className="text-red-500">{errors.files.message}</p>}
          <button type="button" onClick={handleBack} className="btn btn-secondary mt-2">Back</button>
          <button type="submit" className="btn btn-primary mt-2">Submit</button>
        </div>
      )}
    </form>
  );
}
