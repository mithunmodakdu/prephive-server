import { z } from "zod";
import { EDayOfWeek } from "../../../generated/prisma/enums";

const dayOfWeekValues = Object.values(EDayOfWeek) as [EDayOfWeek, ...EDayOfWeek[]];

export const CreateTeacherScheduleZodSchema = z
	.object({
		teacherId: z
			.string({ message: "Teacher ID must be string" })
			.regex(
				/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
				{ message: "Teacher ID must be a valid UUID" },
			),

		subjectId: z
			.string({ message: "Subject ID must be string" })
			.regex(
				/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
				{ message: "Subject ID must be a valid UUID" },
			),

		batchId: z
			.string({ message: "Batch ID must be string" })
			.regex(
				/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
				{ message: "Batch ID must be a valid UUID" },
			),

		dayOfWeek: z.enum(dayOfWeekValues, {
			message: "Day of week must be a valid weekday",
		}),

		startTime: z.coerce.date({ message: "Start time must be a valid date" }),

		endTime: z.coerce.date({ message: "End time must be a valid date" }),

		fee: z.coerce
			.number({ message: "Fee must be a number" })
			.min(0, { message: "Fee can not be negative" }),

		room: z
			.string({ message: "Room must be string" })
			.max(100, { message: "Room can not exceed 100 characters" })
			.optional(),

		isActive: z.boolean().optional(),
	})
	.refine((data) => data.endTime > data.startTime, {
		message: "End time must be after start time",
		path: ["endTime"],
	});
