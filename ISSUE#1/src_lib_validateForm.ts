import { z } from "zod";

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
