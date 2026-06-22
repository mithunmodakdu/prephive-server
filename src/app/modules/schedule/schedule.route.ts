import express from "express";
import { ScheduleController } from "./schedule.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { CreateTeacherScheduleZodSchema } from "./schedule.validation";
import checkAuth from "../../middlewares/checkAuth";
import { EUserRole } from "../../../generated/prisma/enums";

const router = express.Router();

router.post(
	"/create-teacher-schedule",
	checkAuth(EUserRole.ADMIN),
	validateRequest(CreateTeacherScheduleZodSchema),
	ScheduleController.createTeacherSchedule,
);

export const scheduleRoutes = router;
