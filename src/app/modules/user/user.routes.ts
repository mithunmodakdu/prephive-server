import express from "express";
import { UserController } from "./user.controller";
import { uploadByMulter } from "../../../config/multer.config";
import { validateRequest } from "../../middlewares/validateRequest";
import { CreateStudentZodSchema } from "./user.validation";

const router = express.Router();

router.post("/create-student", uploadByMulter.single("file"), validateRequest(CreateStudentZodSchema), UserController.createStudent)

export const userRoutes = router;