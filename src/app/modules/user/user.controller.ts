import { Request, Response } from "express";
import catchAsync from "../../../utils/catchAsync";
import { UserService } from "./user.service";
import { sendResponse } from "../../../utils/sendResponse";
import httpStatusCodes from "http-status-codes";

const createAdmin = catchAsync(async (req: Request, res: Response) => {
  const file = req.file;
  const data = req.body;
  const result = await UserService.createAdmin(
    file as Express.Multer.File,
    data,
  );
  
  sendResponse(res, {
    statusCode: httpStatusCodes.CREATED,
    success: true,
    message: "Your account has been created as admin",
    data: result,
  });
});

const createStudent = catchAsync(async (req: Request, res: Response) => {
  const file = req.file;
  const data = req.body;

  const result = await UserService.createStudent(
    file as Express.Multer.File,
    data,
  );

  sendResponse(res, {
    statusCode: httpStatusCodes.CREATED,
    success: true,
    message: "Your account created successfully as a student.",
    data: result,
  });
});

const createTeacher = catchAsync(
  async(req: Request, res: Response) => {
    const file = req.file;
    const data = req.body;
    const result = await UserService.createTeacher(file as Express.Multer.File, data);

    sendResponse(res, {
      statusCode: httpStatusCodes.CREATED,
      success: true,
      message: "Your account has been created as Teacher",
      data: result
    })
  }
)

export const UserController = {
  createAdmin,
  createStudent,
  createTeacher
};
