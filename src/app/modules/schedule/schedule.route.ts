import express from "express";
import { ScheduleController } from "./schedule.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import {
	CreateTeacherScheduleZodSchema,
	UpdateTeacherScheduleZodSchema,
} from "./schedule.validation";
import checkAuth from "../../middlewares/checkAuth";
import { EUserRole } from "../../../generated/prisma/enums";

const router = express.Router();

router.get(
	"/",
	checkAuth(EUserRole.ADMIN, EUserRole.TEACHER, EUserRole.STUDENT),
	ScheduleController.getAllSchedules,
);

router.get(
	"/:id",
	checkAuth(EUserRole.ADMIN, EUserRole.TEACHER, EUserRole.STUDENT),
	ScheduleController.getScheduleById,
);

router.post(
	"/create-schedule",
	checkAuth(EUserRole.ADMIN),
	validateRequest(CreateTeacherScheduleZodSchema),
	ScheduleController.createSchedule,
);

router.patch(
	"/:id",
	checkAuth(EUserRole.ADMIN),
	validateRequest(UpdateTeacherScheduleZodSchema),
	ScheduleController.updateSchedule,
);

router.delete(
	"/:id",
	checkAuth(EUserRole.ADMIN),
	ScheduleController.deleteSchedule,
);

export const scheduleRoutes = router;
