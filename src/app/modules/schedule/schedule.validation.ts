import { z } from "zod";
import { EDayOfWeek } from "./schedule.interface";

const DayOfWeekValues = Object.values(EDayOfWeek) as [string, ...string[]];

const createTeacherScheduleSchemaShape = {
  teacherId: z
    .string({ message: "Teacher id must be string" })
    .uuid({ message: "Teacher id must be a valid uuid" }),
  subjectId: z
    .string({ message: "Subject id must be string" })
    .uuid({ message: "Subject id must be a valid uuid" }),
  batchId: z
    .string({ message: "Batch id must be string" })
    .uuid({ message: "Batch id must be a valid uuid" }),
  dayOfWeek: z.enum(DayOfWeekValues, {
    message: "Day of week must be a valid weekday",
  }),
  startTime: z
    .string({ message: "Start time must be string" })
    .datetime({ message: "Start time must be a valid ISO datetime string" })
    .transform((value) => new Date(value)),
  endTime: z
    .string({ message: "End time must be string" })
    .datetime({ message: "End time must be a valid ISO datetime string" })
    .transform((value) => new Date(value)),
  fee: z
    .number({ message: "Fee must be a number" })
    .min(0, { message: "Fee can not be negative" }),
  room: z
    .string({ message: "Room must be string" })
    .max(100, { message: "Room can not exceed 100 characters" })
    .optional(),
  isActive: z.boolean({ message: "isActive must be boolean" }).optional(),
};

export const CreateTeacherScheduleZodSchema = z.object(createTeacherScheduleSchemaShape);

export const UpdateTeacherScheduleZodSchema = z
  .object({
    teacherId: createTeacherScheduleSchemaShape.teacherId.optional(),
    subjectId: createTeacherScheduleSchemaShape.subjectId.optional(),
    batchId: createTeacherScheduleSchemaShape.batchId.optional(),
    dayOfWeek: createTeacherScheduleSchemaShape.dayOfWeek.optional(),
    startTime: createTeacherScheduleSchemaShape.startTime.optional(),
    endTime: createTeacherScheduleSchemaShape.endTime.optional(),
    fee: createTeacherScheduleSchemaShape.fee.optional(),
    room: createTeacherScheduleSchemaShape.room,
    isActive: createTeacherScheduleSchemaShape.isActive,
  })
  .strict();