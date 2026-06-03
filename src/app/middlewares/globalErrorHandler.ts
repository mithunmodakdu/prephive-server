/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import { IErrorSource } from "../../utils/errorHelpers/error.interface";
import AppError from "../../utils/errorHelpers/AppError";
import { envVars } from "../../config/env";
import { handleZodError } from "../../utils/errorHelpers/handleZodError";

export const globalErrorHandler = (error: any, req: Request, res: Response, next: NextFunction ) => {
  let statusCode = 500;
  let message = "Something went wrong";
  let errorSources: IErrorSource[] = [];

  if(error.name === "ZodError"){
    const simplifiedError = handleZodError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSources = simplifiedError.errorSources as IErrorSource[];
    error = error.issues;
  }else if(error instanceof AppError){
    statusCode = error.statusCode;
    message = error.message;
  }else if(error instanceof Error) {
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