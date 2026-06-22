import { prisma } from "../../../lib/prisma";
import { ICreateBatchPayload } from "./batch.interface";

const createBatch = async (payload: ICreateBatchPayload) => {
  return await prisma.batch.create({
    data: payload,
  });
};

export const BatchService = {
  createBatch
};