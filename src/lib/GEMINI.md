GEMINI.md: Lib Directory
Purpose
This directory contains utility functions for database interactions, file uploads, form validation, and logging.
Tasks
1. Implement Prisma Client (db.ts)

Task: Initialize Prisma client for Neon Postgres.
Instructions:
Update db.ts:import { PrismaClient } from "@prisma/client";
import { logger } from "./logger";

const prisma = new PrismaClient();

export async function initDb() {
  try {
    await prisma.$connect();
    logger.info("Database connected");
    return prisma;
  } catch (err) {
    logger.error("Database connection failed", { error: err });
    throw err;
  }
}

export const db = prisma;




Dependencies: prisma/schema.prisma, src/lib/logger.ts.
Notes:
Ensure singleton pattern for Prisma client.
Log connection status with winston.



2. Implement File Upload Wrapper (upload.ts)

Task: Wrap Vercel Blob upload logic.
Instructions:
Update upload.ts:import { put } from "@vercel/blob";
import { logger } from "./logger";

export async function uploadFile(file: File) {
  try {
    const { url } = await put(file.name, file, { access: "public" });
    logger.info("File uploaded", { url, name: file.name });
    return { url, name: file.name, type: file.type, size: file.size };
  } catch (err) {
    logger.error("File upload failed", { error: err });
    throw err;
  }
}




Dependencies: Vercel Blob token, src/lib/logger.ts.
Notes:
Validate file types before upload.
Support multiple file uploads if needed.



3. Implement Form Validation (validateForm.ts)

Task: Define zod schema and validation logic.
Instructions:
Update validateForm.ts:import { z } from "zod";

export const formSchema = z.object({
  clientName: z.string().min(1, "Client name is required"),
  email: z.string().email("Invalid email address"),
  details: z.string().min(1, "Details are required"),
  files: z.array(
    z.object({
      url: z.string().url(),
      name: z.string(),
      type: z.string(),
      size: z.number(),
    })
  ).optional(),
});

export function validateFormData(data: unknown) {
  const result = formSchema.safeParse(data);
  if (!result.success) {
    return { success: false, error: result.error.format(), data: null };
  }
  return { success: true, data: result.data, error: null };
}




Dependencies: None.
Notes:
Extend schema for additional fields as needed.
Document validation rules.



4. Implement Logger (logger.ts)

Task: Set up winston for logging.
Instructions:
Create logger.ts:import winston from "winston";

export const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: "logs/error.log", level: "error" }),
    new winston.transports.File({ filename: "logs/combined.log" }),
    new winston.transports.Console(),
  ],
});




Dependencies: winston@3.17.0.
Notes:
Ensure logs are secure (no sensitive data).
Add log rotation for production.



Dependencies

prisma/schema.prisma, @prisma/client@6.10.1.
Vercel Blob token.
zod@3.25.67, winston@3.17.0.

Notes

Scalability: Utilities are modular for reuse.
Documentation: Comment functions for clarity.
Error Handling: Use try-catch and log errors.
