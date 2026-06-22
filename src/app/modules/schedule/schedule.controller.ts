import { Request, Response } from "express";
import catchAsync from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";
import httpStatusCodes from "http-status-codes";
import { ScheduleService } from "./schedule.service";
import { teacherScheduleMessages } from "./schedule.constants";

const createTeacherSchedule = catchAsync(async (req: Request, res: Response) => {
	const result = await ScheduleService.createTeacherSchedule(req.body);

	sendResponse(res, {
		statusCode: httpStatusCodes.CREATED,
		success: true,
		message: teacherScheduleMessages.created,
		data: result,
	});
});

export const ScheduleController = {
	createTeacherSchedule,
};
