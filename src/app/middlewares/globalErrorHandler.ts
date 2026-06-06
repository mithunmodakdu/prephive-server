/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import { IErrorSource } from "../../utils/errorHelpers/error.interface";
import AppError from "../../utils/errorHelpers/AppError";
import { envVars } from "../../config/env";
import { handleZodError } from "../../utils/errorHelpers/handleZodError";
import { deleteImageFromCloudinary } from "../../config/cloudinary.config";
import { Prisma } from "../../generated/prisma/client";

export const globalErrorHandler = async(error: any, req: Request, res: Response, next: NextFunction ) => {
  
  if(req.file){
    await deleteImageFromCloudinary(req.file.path);
  }
  
  let statusCode = 500;
  let message = "Something went wrong";
  let errorSources: IErrorSource[] = [];

  if(error.name === "ZodError"){
    const simplifiedError = handleZodError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSources = simplifiedError.errorSources as IErrorSource[];
    error = error.issues;
  }
  
  if(error instanceof Prisma.PrismaClientKnownRequestError){
    if(error.code === "P2002"){
      message = "Duplicate Key Error";
      error = error.meta;
    }

    if(error.code === "P2003"){
      message = "Foreign key constraint failed on the field";
      error = error.meta;
    }

    if(error.code === "P1000"){
      message = "Authentication failed against database server.";
      error = error.meta;
    }

  }

  if(error instanceof Prisma.PrismaClientValidationError){
    message = "Validation Error";
    error = error.message;
  }
  
  if(error instanceof AppError){
    statusCode = error.statusCode;
    message = error.message;
  }
  
  if(error instanceof Error) {
    statusCode = 500;
    message = error.message
  }

  res.status(statusCode).send({
    success: false,
    message,
    errorSources,
    error,
    stack: envVars.NODE_ENV === "development"? error.stack : null
  })
}