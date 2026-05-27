import { Request, Response } from "express";
import catchAsync from "../../../utils/catchAsync";
import { UserService } from "./user.service";
import { sendResponse } from "../../../utils/sendResponse";
import httpStatusCodes from "http-status-codes"

const createStudent = catchAsync(
  async(req: Request, res: Response) => {
    const result = await UserService.createStudent(req.body);
    
    sendResponse(res, {
      statusCode: httpStatusCodes.CREATED,
      success: true,
      message: "Your account created successfully as a student.",
      data: result
    })
  }
)

export const UserController = {
  createStudent
}