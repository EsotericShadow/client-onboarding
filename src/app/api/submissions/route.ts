import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { logger } from "@/lib/logger";

export async function GET(req: NextRequest) {
  const { userId } = await auth();

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const origin = req.headers.get("origin");
  const allowedOrigins = ["http://localhost:3000", "https://evergreenwebsolutions.ca"];

  if (origin && !allowedOrigins.includes(origin)) {
    return new NextResponse("Forbidden", { status: 403 });
  }

  try {
    const submissions = await db.submission.findMany({
      include: {
        files: true, // Include related FileMeta records
      },
    });

    const headers = new Headers({
      "Content-Type": "application/json",
    });

    if (origin) {
      headers.set("Access-Control-Allow-Origin", origin);
      headers.set("Access-Control-Allow-Methods", "GET, OPTIONS");
      headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
    }

    logger.info("Submissions fetched successfully");
    return new NextResponse(JSON.stringify(submissions), { status: 200, headers });
  } catch (error) {
    logger.error("Failed to fetch submissions", { error });
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function OPTIONS(req: NextRequest) {
  const origin = req.headers.get("origin");
  const allowedOrigins = ["http://localhost:3000", "https://evergreenwebsolutions.ca"];

  const headers = new Headers({
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Max-Age": "86400",
  });

  if (origin && allowedOrigins.includes(origin)) {
    headers.set("Access-Control-Allow-Origin", origin);
  } else if (origin) {
    return new NextResponse("Forbidden", { status: 403 });
  }

  return new NextResponse(null, { status: 204, headers });
}
