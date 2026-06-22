import express from "express";
import { validateRequest } from "../../middlewares/validateRequest";
import checkAuth from "../../middlewares/checkAuth";
import { EUserRole } from "../../../generated/prisma/enums";
import { SubjectController } from "./subject.controller";
import { CreateSubjectZodSchema } from "./subject.validation";

const router = express.Router();


router.post(
  "/create-subject",
  checkAuth(EUserRole.ADMIN),
  validateRequest(CreateSubjectZodSchema),
  SubjectController.createSubject
);

export const subjectRoutes = router;