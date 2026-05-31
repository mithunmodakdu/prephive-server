import { z } from "zod";

export const CreateAdminZodSchema = z.object({
  password: z
    .string({ message: "Password must be string" })
    .min(8, { message: "Password must have at least 8 characters." })
    .regex(/^(?=.*[A-Z])/, {
      message: "Password must have at least one uppercase letter",
    })
    .regex(/^(?=.*[@#$%!*])/, {
      message: "Password must have at least one special character",
    })
    .regex(/^(?=.*\d)/, {
      message: "Password must have at least one digit",
    }),

  admin: z.object({
    email: z.email(),

    name: z
      .string({ message: "Name must be string" })
      .min(2, {
        message: "Name is too short. It must have minimum 2 characters.",
      })
      .max(50, {
        message: "Name is too long. It must have maximum 50 characters.",
      }),

    contactNumber: z
      .string({ message: "Contact number must be string" })
      .regex(/^(?:\+8801\d{9}|01\d{9})$/, {
        message:
          "Contact number must be valid for Bangladesh.   Format: +8801XXXXXXXXX or 01XXXXXXXXX",
      })
      .optional(),

    profilePhoto: z.string().optional(),
  }),
});

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

export const CreateTeacherZodSchema = z.object({
  password: z
    .string({ message: "Password must be string" })
    .min(8, { message: "Password must have at least 8 characters." })
    .regex(/^(?=.*[A-Z])/, {
      message: "Password must have at least one uppercase letter",
    })
    .regex(/^(?=.*[@#$%!*])/, {
      message: "Password must have at least one special character",
    })
    .regex(/^(?=.*\d)/, {
      message: "Password must have at least one digit",
    }),

  teacher: z.object({
    email: z.email(),

    name: z
      .string({ message: "Name must be string" })
      .min(2, {
        message: "Name is too short. It must have minimum 2 characters.",
      })
      .max(50, {
        message: "Name is too long. It must have maximum 50 characters.",
      }),

    contactNumber: z
      .string({ message: "Contact number must be string" })
      .regex(/^(?:\+8801\d{9}|01\d{9})$/, {
        message:
          "Contact number must be valid for Bangladesh.   Format: +8801XXXXXXXXX or 01XXXXXXXXX",
      })
      .optional(),

    address: z
      .string({ message: "Address must be string" })
      .max(200, {
        message: "Address can not exceed 200 characters",
      })
      .optional(),

    experience: z
      .number({ message: "Experience must be a number" })
      .min(0, {
        message: "Experience can not be negative",
      })
      .optional(),

    gender: z.enum(["MALE", "FEMALE"], {
      message: "Gender must be MALE or FEMALE",
    }),

    teachingFee: z.number({ message: "Teaching fee must be a number" }).min(0, {
      message: "Teaching fee can not be negative",
    }),

    qualification: z
      .string({ message: "Qualification must be string" })
      .min(2, {
        message: "Qualification is too short",
      })
      .max(100, {
        message: "Qualification can not exceed 100 characters",
      }),

    currentWorkingPlace: z
      .string({ message: "Current working place must be string" })
      .min(2, {
        message: "Current working place is too short",
      })
      .max(100, {
        message: "Current working place can not exceed 100 characters",
      }),

    designation: z
      .string({ message: "Designation must be string" })
      .min(2, {
        message: "Designation is too short",
      })
      .max(100, {
        message: "Designation can not exceed 100 characters",
      }),

    profilePhoto: z.string().optional(),
  }),
});
