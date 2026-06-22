import express from "express";
import { BatchController } from "./batch.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { CreateBatchZodSchema } from "./batch.validation";
import checkAuth from "../../middlewares/checkAuth";
import { EUserRole } from "../../../generated/prisma/enums";

const router = express.Router();


router.post(
  "/create-batch",
  checkAuth(EUserRole.ADMIN),
  validateRequest(CreateBatchZodSchema),
  BatchController.createBatch,
);

export const batchRoutes = router;