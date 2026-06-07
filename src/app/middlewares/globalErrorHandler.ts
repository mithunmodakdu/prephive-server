/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import { IErrorSource } from "../../utils/errorHelpers/error.interface";
import AppError from "../../utils/errorHelpers/AppError";
import { envVars } from "../../config/env";
import { handleZodError } from "../../utils/errorHelpers/handleZodError";
import { deleteImageFromCloudinary } from "../../config/cloudinary.config";
import { Prisma } from "../../generated/prisma/client";
import {
  PrismaClientInitializationError,
  PrismaClientUnknownRequestError,
} from "../../generated/prisma/internal/prismaNamespace";
import httpStatusCodes from "http-status-codes";

export const globalErrorHandler = async (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (req.file) {
    await deleteImageFromCloudinary(req.file.path);
  }

  let statusCode = httpStatusCodes.INTERNAL_SERVER_ERROR;
  let message = "Something went wrong";
  let errorSources: IErrorSource[] = [];

  if (error.name === "ZodError") {
    const simplifiedError = handleZodError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSources = simplifiedError.errorSources as IErrorSource[];
    error = error.issues;
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === "P2002") {
      message = "Duplicate Key Error";
      error = error.meta;
      statusCode = httpStatusCodes.CONFLICT;
    }

    if (error.code === "P2003") {
      message = "Foreign key constraint failed on the field";
      error = error.meta;
      statusCode = httpStatusCodes.BAD_REQUEST;
    }

    if (error.code === "P1000") {
      message = "Authentication failed against database server.";
      error = error.meta;
      statusCode = httpStatusCodes.UNAUTHORIZED;
    }
  } else if (error instanceof PrismaClientUnknownRequestError) {
    message = "Prisma Client Unknown Request Error occurred.";
    error = error.message;
    statusCode = httpStatusCodes.BAD_REQUEST;
  } else if (error instanceof PrismaClientInitializationError) {
    message = "Prisma Client failed to initialize.";
    error = error.message;
    statusCode = httpStatusCodes.BAD_REQUEST;
  } else if (error instanceof Prisma.PrismaClientValidationError) {
    message = "Validation Error";
    error = error.message;
    statusCode = httpStatusCodes.BAD_REQUEST;
  } else if (error instanceof AppError) {
    statusCode = error.statusCode;
    message = error.message;
  } else if (error instanceof Error) {
    statusCode = 500;
    message = error.message;
  }

  res.status(statusCode).send({
    success: false,
    message,
    errorSources,
    error,
    stack: envVars.NODE_ENV === "development" ? error.stack : null,
  });
};
