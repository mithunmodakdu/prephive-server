import express from "express";
import { BatchController } from "./batch.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { CreateBatchZodSchema, UpdateBatchZodSchema } from "./batch.validation";
import checkAuth from "../../middlewares/checkAuth";
import { EUserRole } from "../../../generated/prisma/enums";

const router = express.Router();

router.get(
  "/",
  checkAuth(EUserRole.ADMIN, EUserRole.TEACHER, EUserRole.STUDENT),
  BatchController.getAllBatches,
);

router.get(
  "/:id",
  checkAuth(EUserRole.ADMIN, EUserRole.TEACHER, EUserRole.STUDENT),
  BatchController.getBatchById,
);

router.post(
  "/create-batch",
  checkAuth(EUserRole.ADMIN),
  validateRequest(CreateBatchZodSchema),
  BatchController.createBatch,
);

router.patch(
  "/:id",
  checkAuth(EUserRole.ADMIN),
  validateRequest(UpdateBatchZodSchema),
  BatchController.updateBatch,
);

router.delete(
  "/:id",
  checkAuth(EUserRole.ADMIN),
  BatchController.deleteBatch,
);

export const batchRoutes = router;