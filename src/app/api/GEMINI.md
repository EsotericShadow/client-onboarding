GEMINI.md: API Routes
Purpose
This directory contains API routes for handling form submissions, file uploads, and Gemini chatbot interactions.
Tasks
1. Implement Form Submission API (form/route.ts)

Task: Process form data, validate with zod, store in database, and send admin notification.
Instructions:
Update form/route.ts:import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { validateFormData } from "@/lib/validateForm";
import { Resend } from "resend";
import { logger } from "@/lib/logger";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { success, data, error } = validateFormData(body);
    if (!success) {
      return NextResponse.json({ error }, { status: 400 });
    }

    const submission = await db.submission.create({
      data: {
        clientName: data.clientName,
        email: data.email,
        formData: data,
      },
    });

    await resend.emails.send({
      from: "no-reply@yourdomain.com",
      to: "admin@yourdomain.com",
      subject: "New Client Onboarding Submission",
      html: `<p>New submission from ${data.clientName}</p>`,
    });

    logger.info("Form submission processed", { submissionId: submission.id });
    return NextResponse.json({ id: submission.id }, { status: 200 });
  } catch (err) {
    logger.error("Form submission failed", { error: err });
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}




Dependencies: src/lib/db.ts, src/lib/validateForm.ts, src/lib/logger.ts, Resend API key.
Notes:
Use winston for logging (logger.ts to be created).
Cache responses with Next.js caching.



2. Implement File Upload API (upload/route.ts)

Task: Handle file uploads to Vercel Blob.
Instructions:
Update upload/route.ts:import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { logger } from "@/lib/logger";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const { url } = await put(file.name, file, { access: "public" });
    logger.info("File uploaded", { url, name: file.name });
    return NextResponse.json({ url, name: file.name, type: file.type, size: file.size });
  } catch (err) {
    logger.error("File upload failed", { error: err });
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}




Dependencies: Vercel Blob token, src/lib/logger.ts.
Notes:
Validate file types and sizes.
Log upload events with winston.



3. Implement Gemini API Route (gemini/route.ts)

Task: Create an API route to handle Gemini chatbot requests.
Instructions:
Create gemini/route.ts:import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { logger } from "@/lib/logger";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();
    if (!prompt) {
      return NextResponse.json({ error: "No prompt provided" }, { status: 400 });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const response = await result.response.text();

    logger.info("Gemini response generated", { prompt });
    return NextResponse.json({ response });
  } catch (err) {
    logger.error("Gemini request failed", { error: err });
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}




Dependencies: @google/generative-ai, Gemini API key, src/lib/logger.ts.
Notes:
Use gemini-1.5-flash for cost-efficiency; switch to gemini-1.5-pro for advanced needs.
Implement rate limiting if needed.



Dependencies

src/lib/db.ts, src/lib/validateForm.ts, src/lib/logger.ts.
Environment variables for Resend, Vercel Blob, and Gemini.
@google/generative-ai (install: pnpm add @google/generative-ai).

Notes

Scalability: Use server-side routes for security; cache API responses.
Documentation: Comment API logic and error cases.
Error Handling: Use try-catch and winston logging.
