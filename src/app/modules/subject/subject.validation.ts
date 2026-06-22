import { z } from "zod";

export const CreateSubjectZodSchema = z.object({
  name: z.string().min(1, "Name is required"),
  code: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
});