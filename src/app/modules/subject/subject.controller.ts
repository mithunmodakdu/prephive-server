import { Request, Response } from "express";
import catchAsync from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";
import httpStatusCodes from "http-status-codes";
import { SubjectService } from "./subject.service";


const createSubject = catchAsync(async (req: Request, res: Response) => {
  const result = await SubjectService.createSubject(req.body);

  sendResponse(res, {
    statusCode: httpStatusCodes.CREATED,
    success: true,
    message: "Subject created successfully.",
    data: result,
  });
});

export const SubjectController = {
  createSubject
};