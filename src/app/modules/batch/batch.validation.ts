import { z } from "zod";

export const CreateBatchZodSchema = z.object({
  name: z
    .string({ message: "Batch name must be string" })
    .min(2, { message: "Batch name is too short" })
    .max(100, { message: "Batch name can not exceed 100 characters" }),
  description: z
    .string({ message: "Batch description must be string" })
    .min(2, { message: "Batch description is too short" })
    .max(500, { message: "Batch description can not exceed 500 characters" }),
});