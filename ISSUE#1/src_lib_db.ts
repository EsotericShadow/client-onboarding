import { PrismaClient } from "@prisma/client";
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
