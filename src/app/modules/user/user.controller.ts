import { Request, Response } from "express";
import catchAsync from "../../../utils/catchAsync";
import { UserService } from "./user.service";
import { sendResponse } from "../../../utils/sendResponse";
import httpStatusCodes from "http-status-codes"

const createStudent = catchAsync(
  async(req: Request, res: Response) => {
    const file = req.file;
    const data = req.body;

    const result = await UserService.createStudent(file as Express.Multer.File, data);
    
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