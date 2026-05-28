import { z } from "zod";

export const CreateStudentZodSchema = z.object({
  password: z
    .string({ message: "Password must be string" })
    .min(8, { message: "Password must have at least 8 characters." })
    .regex(/^(?=.*[A-Z])/, {
      message: "Password must have at least one uppercase letter",
    })
    .regex(/^(?=.*[@#$%!*])/, {
      message: "Password must have at least one special character",
    })
    .regex(/^(?=.*\d)/, { message: "Password must have at least one digit" }),

  student: z.object({
    email: z.email(),

    name: z
      .string({ message: "Name must be string" })
      .min(2, {
        message: "Name is too short. It must have minimum 2 characters.",
      })
      .max(50, {
        message: "Name is too long. It must have maximum 50 characters.",
      }),

    address: z
      .string({ message: "Address must be string" })
      .max(200, { message: "Address can not exceed 200 characters" })
      .optional(),
  }),
});
