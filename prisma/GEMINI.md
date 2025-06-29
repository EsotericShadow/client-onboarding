GEMINI.md: Prisma Directory
Purpose
This directory contains Prisma configuration for interacting with a Neon Postgres database, storing client onboarding submissions and file metadata.
Tasks
1. Update schema.prisma

File: prisma/schema.prisma
Task: Ensure the schema is correct and compatible with Neon Postgres. The current schema defines Submission and FileMeta models, which is sufficient, but verify the datasource URL uses environment variables correctly.
Instructions:
Confirm the schema matches:generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Submission {
  id           String   @id @default(cuid())
  createdAt    DateTime @default(now())
  clientName   String
  email        String
  formData     Json
  files        FileMeta[]
}

model FileMeta {
  id           String     @id @default(cuid())
  name         String
  type         String
  url          String
  size         Int
  submissionId String
  submission   Submission @relation(fields: [submissionId], references: [id])
}


Add comments for clarity (e.g., explain Json for flexible form data).


Dependencies: .env.local with valid DATABASE_URL.
Notes:
Ensure Neon credentials are used, not localhost:51214.
Test with npx prisma studio after migration.



2. Run Database Migration

Task: Execute Prisma migration to create database tables.
Instructions:
Update .env.local with Neon’s DATABASE_URL (e.g., postgresql://user:pass@neon-host/dbname).
Run:npx prisma migrate dev --name init




Dependencies: Valid DATABASE_URL.
Notes:
Log errors with winston if migration fails.
Verify tables in Neon dashboard or Prisma Studio.



Dependencies

.env.local with DATABASE_URL.
pnpm with @prisma/client@6.10.1 and prisma@6.10.1.

Notes

Scalability: Neon supports autoscaling; ensure schema supports future fields (e.g., add indexes if needed).
Documentation: Comment schema fields for maintainability.
Error Handling: Catch and log database connection errors.
