import { put } from "@vercel/blob";
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
