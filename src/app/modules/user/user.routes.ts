import express from "express";
import { UserController } from "./user.controller";
import { uploadByMulter } from "../../../config/multer.config";
import { validateRequest } from "../../middlewares/validateRequest";
import {
  CreateAdminZodSchema,
  CreateStudentZodSchema,
  CreateTeacherZodSchema,
} from "./user.validation";
import checkAuth from "../../middlewares/checkAuth";
import { EUserRole } from "../../../generated/prisma/enums";

const router = express.Router();

router.get("/", checkAuth(EUserRole.ADMIN, EUserRole.STUDENT), UserController.getAllUsers)

router.post(
  "/create-admin",
  uploadByMulter.single("file"),
  validateRequest(CreateAdminZodSchema),
  UserController.createAdmin
);

router.post(
  "/create-student",
  uploadByMulter.single("file"),
  validateRequest(CreateStudentZodSchema),
  UserController.createStudent
);

router.post(
  "/create-teacher",
  uploadByMulter.single("file"),
  validateRequest(CreateTeacherZodSchema),
  UserController.createTeacher
)



export const userRoutes = router;
