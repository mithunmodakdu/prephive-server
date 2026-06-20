import { Request, Response } from "express";
import httpStatusCodes from "http-status-codes";
import catchAsync from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";
import pickQueryOptions from "../../../utils/pickQueryOptions";
import { ScheduleService } from "./schedule.service";
import { scheduleFilterableFields } from "./schedule.constants";

const getAllSchedules = catchAsync(async (req: Request, res: Response) => {
	const paginationAndSortOptions = pickQueryOptions(req.query, [
		"page",
		"limit",
		"sortBy",
		"sortOrder",
	]);
	const searchAndFilterOptions = pickQueryOptions(
		req.query,
		scheduleFilterableFields,
	);
	const result = await ScheduleService.getAllSchedules(
		paginationAndSortOptions,
		searchAndFilterOptions,
	);

	sendResponse(res, {
		statusCode: httpStatusCodes.OK,
		success: true,
		message: "Schedules data retrieved successfully.",
		meta: result.meta,
		data: result.data,
	});
});

const getScheduleById = catchAsync(async (req: Request, res: Response) => {
	const { id } = req.params as { id: string };
	const result = await ScheduleService.getScheduleById(id);

	sendResponse(res, {
		statusCode: httpStatusCodes.OK,
		success: true,
		message: "Schedule data retrieved successfully.",
		data: result,
	});
});

const createSchedule = catchAsync(async (req: Request, res: Response) => {
	const result = await ScheduleService.createSchedule(req.body);

	sendResponse(res, {
		statusCode: httpStatusCodes.CREATED,
		success: true,
		message: "Schedule created successfully.",
		data: result,
	});
});

const updateSchedule = catchAsync(async (req: Request, res: Response) => {
	const { id } = req.params as { id: string };
	const result = await ScheduleService.updateSchedule(id, req.body);

	sendResponse(res, {
		statusCode: httpStatusCodes.OK,
		success: true,
		message: "Schedule updated successfully.",
		data: result,
	});
});

const deleteSchedule = catchAsync(async (req: Request, res: Response) => {
	const { id } = req.params as { id: string };
	const result = await ScheduleService.deleteSchedule(id);

	sendResponse(res, {
		statusCode: httpStatusCodes.OK,
		success: true,
		message: "Schedule deleted successfully.",
		data: result,
	});
});

export const ScheduleController = {
	getAllSchedules,
	getScheduleById,
	createSchedule,
	updateSchedule,
	deleteSchedule,
};
