import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { validateFormData } from "@/lib/validateForm";
import { Resend } from "resend";
import { logger } from "@/lib/logger";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { success, data, error } = validateFormData(body);
    if (!success || !data) { // Ensure data is not null if success is true
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