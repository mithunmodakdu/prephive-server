import { Request, Response } from "express";
import catchAsync from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";
import httpStatusCodes from "http-status-codes";
import { BatchService } from "./batch.service";

const createBatch = catchAsync(async (req: Request, res: Response) => {
  const result = await BatchService.createBatch(req.body);

  sendResponse(res, {
    statusCode: httpStatusCodes.CREATED,
    success: true,
    message: "Batch created successfully.",
    data: result,
  });
});

export const BatchController = {
  createBatch
};