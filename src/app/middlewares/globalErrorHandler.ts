/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import { IErrorSource } from "../../utils/errorHelpers/error.interface";
import AppError from "../../utils/errorHelpers/AppError";
import { envVars } from "../../config/env";

export const globalErrorHandler = (error: any, req: Request, res: Response, next: NextFunction ) => {
  let statusCode = 500;
  let message = "Something went wrong";
  const errorSources: IErrorSource[] = [];

  if(error instanceof AppError){
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