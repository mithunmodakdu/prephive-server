import httpStatusCodes from "http-status-codes";
import { Prisma } from "../../../generated/prisma/client";
import AppError from "../../../utils/errorHelpers/AppError";
import paginationAndSortHelper, {
  IPaginationAndSortOptions,
} from "../../../utils/paginationAndSortHelper";
import { prisma } from "../../../lib/prisma";
import { batchSearchableFields } from "./batch.constants";
import {
  ICreateBatchPayload,
  IUpdateBatchPayload,
} from "./batch.interface";

const getAllBatches = async (
  paginationAndSortOptions: IPaginationAndSortOptions,
  searchAndFilterOptions: Record<string, unknown>,
) => {
  const { page, limit, skip, sortBy, sortOrder } = paginationAndSortHelper(
    paginationAndSortOptions,
  );
  const { searchTerm } = searchAndFilterOptions;

  const andConditions: Prisma.BatchWhereInput[] = [];

  if (typeof searchTerm === "string" && searchTerm.length > 0) {
    andConditions.push({
      OR: batchSearchableFields.map((field) => ({
        [field]: {
          contains: searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  const whereConditions: Prisma.BatchWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const batches = await prisma.batch.findMany({
    skip,
    take: limit,
    where: whereConditions,
    orderBy: {
      [sortBy]: sortOrder,
    },
  });

  const total = await prisma.batch.count({
    where: whereConditions,
  });

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: batches,
  };
};

const getBatchById = async (id: string) => {
  const batch = await prisma.batch.findUnique({
    where: {
      id,
    },
  });

  if (!batch) {
    throw new AppError(httpStatusCodes.NOT_FOUND, "Batch not found.");
  }

  return batch;
};

const createBatch = async (payload: ICreateBatchPayload) => {
  return await prisma.batch.create({
    data: payload,
  });
};

const updateBatch = async (id: string, payload: IUpdateBatchPayload) => {
  const existingBatch = await prisma.batch.findUnique({
    where: {
      id,
    },
  });

  if (!existingBatch) {
    throw new AppError(httpStatusCodes.NOT_FOUND, "Batch not found.");
  }

  return await prisma.batch.update({
    where: {
      id,
    },
    data: payload,
  });
};

const deleteBatch = async (id: string) => {
  const existingBatch = await prisma.batch.findUnique({
    where: {
      id,
    },
  });

  if (!existingBatch) {
    throw new AppError(httpStatusCodes.NOT_FOUND, "Batch not found.");
  }

  return await prisma.batch.delete({
    where: {
      id,
    },
  });
};

export const BatchService = {
  getAllBatches,
  getBatchById,
  createBatch,
  updateBatch,
  deleteBatch,
};