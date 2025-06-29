GEMINI.md: Components Directory
Purpose
This directory contains reusable UI components for the onboarding form, file uploads, progress bar, success message, and Gemini chatbot.
Tasks
1. Implement Multi-Step Form (MultiStepForm.tsx)

Task: Create a multi-step form with react-hook-form and zod validation.
Instructions:
Update MultiStepForm.tsx:"use client";

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
  files: { url: string; name: string; type: string; size: number }[];
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




Dependencies: src/lib/validateForm.ts, ProgressBar.tsx, UploadField.tsx, /api/form.
Notes:
Ensure accessibility (ARIA labels, focus management).
Test with Jest for form validation.



2. Implement File Upload Component (UploadField.tsx)

Task: Create a drag-and-drop file upload component.
Instructions:
Update UploadField.tsx:"use client";

import { useState } from "react";

type FileData = { url: string; name: string; type: string; size: number };

export default function UploadField({ setFiles }: { setFiles: (files: FileData[]) => void }) {
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (file: File) => {
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: formData });
    const data = await res.json();
    setUploading(false);
    setFiles([{ url: data.url, name: data.name, type: data.type, size: data.size }]);
  };

  return (
    <div className="border-2 border-dashed p-4">
      <input
        type="file"
        onChange={(e) => e.target.files?.[0] && handleUpload(e.target.files[0])}
        disabled={uploading}
        className="file-input"
      />
      {uploading && <p>Uploading...</p>}
    </div>
  );
}




Dependencies: /api/upload.
Notes:
Validate file types (e.g., PDF, images).
Add drag-and-drop support with react-dropzone.



3. Implement Progress Bar (ProgressBar.tsx)

Task: Display form progress.
Instructions:
Update ProgressBar.tsx:"use client";

export default function ProgressBar({ step, totalSteps }: { step: number; totalSteps: number }) {
  const progress = (step / totalSteps) * 100;
  return (
    <div className="w-full bg-gray-200 rounded-full h-2.5">
      <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
      <p className="text-center mt-2">Step {step} of {totalSteps}</p>
    </div>
  );
}




Dependencies: None.
Notes:
Ensure accessibility (ARIA progressbar role).
Test responsiveness with Tailwind.



4. Implement Success Component (Success.tsx)

Task: Show a confirmation message.
Instructions:
Update Success.tsx:"use client";

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




Dependencies: None.
Notes:
Add animation for better UX.
Log success events with winston.



5. Implement Chatbot Component (Chatbot.tsx)

Task: Create a chatbot UI for Gemini interactions.
Instructions:
Create Chatbot.tsx:"use client";

import { useState } from "react";

export default function Chatbot() {
  const [messages, setMessages] = useState<{ user: string; bot: string }[]>([]);
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (!input) return;
    const res = await fetch("/api/gemini", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: input }),
    });
    const { response } = await res.json();
    setMessages([...messages, { user: input, bot: response }]);
    setInput("");
  };

  return (
    <div className="border p-4 mt-4">
      <div className="h-64 overflow-y-auto">
        {messages.map((msg, i) => (
          <div key={i}>
            <p><strong>User:</strong> {msg.user}</p>
            <p><strong>Bot:</strong> {msg.bot}</p>
          </div>
        ))}
      </div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="input w-full mt-2"
        placeholder="Ask a question..."
      />
      <button onClick={handleSend} className="btn btn-primary mt-2">Send</button>
    </div>
  );
}




Dependencies: /api/gemini.
Notes:
Ensure real-time updates with streaming if possible.
Test with Jest for user input handling.



Dependencies

src/lib/validateForm.ts, /api/form, /api/upload, /api/gemini.
react-hook-form@7.59.0, zod@3.25.67, @google/generative-ai.

Notes

Scalability: Modular components support reuse in other flows.
Documentation: Comment props and state for clarity.
Error Handling: Handle API errors in UI with user-friendly messages.
