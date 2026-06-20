import { Request, Response } from "express";
import httpStatusCodes from "http-status-codes";
import catchAsync from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";
import pickQueryOptions from "../../../utils/pickQueryOptions";
import { BatchService } from "./batch.service";
import { batchFilterableFields } from "./batch.constants";

const getAllBatches = catchAsync(async (req: Request, res: Response) => {
  const paginationAndSortOptions = pickQueryOptions(req.query, [
    "page",
    "limit",
    "sortBy",
    "sortOrder",
  ]);
  const searchAndFilterOptions = pickQueryOptions(
    req.query,
    batchFilterableFields,
  );
  const result = await BatchService.getAllBatches(
    paginationAndSortOptions,
    searchAndFilterOptions,
  );

  sendResponse(res, {
    statusCode: httpStatusCodes.OK,
    success: true,
    message: "Batches data retrieved successfully.",
    meta: result.meta,
    data: result.data,
  });
});

const getBatchById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params as { id: string };
  const result = await BatchService.getBatchById(id);

  sendResponse(res, {
    statusCode: httpStatusCodes.OK,
    success: true,
    message: "Batch data retrieved successfully.",
    data: result,
  });
});

const createBatch = catchAsync(async (req: Request, res: Response) => {
  const result = await BatchService.createBatch(req.body);

  sendResponse(res, {
    statusCode: httpStatusCodes.CREATED,
    success: true,
    message: "Batch created successfully.",
    data: result,
  });
});

const updateBatch = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params as { id: string };
  const result = await BatchService.updateBatch(id, req.body);

  sendResponse(res, {
    statusCode: httpStatusCodes.OK,
    success: true,
    message: "Batch updated successfully.",
    data: result,
  });
});

const deleteBatch = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params as { id: string };
  const result = await BatchService.deleteBatch(id);

  sendResponse(res, {
    statusCode: httpStatusCodes.OK,
    success: true,
    message: "Batch deleted successfully.",
    data: result,
  });
});

export const BatchController = {
  getAllBatches,
  getBatchById,
  createBatch,
  updateBatch,
  deleteBatch,
};