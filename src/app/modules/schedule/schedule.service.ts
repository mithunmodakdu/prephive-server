import httpStatusCodes from "http-status-codes";
import AppError from "../../../utils/errorHelpers/AppError";
import { prisma } from "../../../lib/prisma";
import { Prisma } from "../../../generated/prisma/client";
import { teacherScheduleMessages } from "./schedule.constants";
import { ICreateTeacherScheduleInput } from "./schedule.interface";



const createTeacherSchedule = async (payload: ICreateTeacherScheduleInput) => {
	const [teacher, subject, batch] = await Promise.all([
		prisma.teacher.findUnique({
			where: {
				id: payload.teacherId,
			},
		}),
		prisma.subject.findUnique({
			where: {
				id: payload.subjectId,
			},
		}),
		prisma.batch.findUnique({
			where: {
				id: payload.batchId,
			},
		}),
	]);

	if (!teacher) {
		throw new AppError(httpStatusCodes.NOT_FOUND, teacherScheduleMessages.teacherNotFound);
	}

	if (!subject) {
		throw new AppError(httpStatusCodes.NOT_FOUND, teacherScheduleMessages.subjectNotFound);
	}

	if (!batch) {
		throw new AppError(httpStatusCodes.NOT_FOUND, teacherScheduleMessages.batchNotFound);
	}

	const teacherSchedule = await prisma.teacherSchedule.create({
		data: {
			teacherId: payload.teacherId,
			subjectId: payload.subjectId,
			batchId: payload.batchId,
			dayOfWeek: payload.dayOfWeek,
			startTime: payload.startTime,
			endTime: payload.endTime,
			fee: new Prisma.Decimal(payload.fee),
			room: payload.room,
			isActive: payload.isActive ?? true,
		},
		include: {
			teacher: true,
			subject: true,
			batch: true,
		},
	});

	return teacherSchedule;
};

export const ScheduleService = {
	createTeacherSchedule,
};
