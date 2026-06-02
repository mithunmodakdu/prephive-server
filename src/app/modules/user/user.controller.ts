import { Request, Response } from "express";
import catchAsync from "../../../utils/catchAsync";
import { UserService } from "./user.service";
import { sendResponse } from "../../../utils/sendResponse";
import httpStatusCodes from "http-status-codes";
import pick from "../../../utils/pick";

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const paginationAndSortOptions = pick(req.query, ["page", "limit", "sortBy", "sortOrder"])
  const filters = pick(req.query, ["email", "status", "role"])
  const result = await UserService.getAllUsers(paginationAndSortOptions, filters);

  sendResponse(res, {
    statusCode: httpStatusCodes.OK,
    success: true,
    message: "All users data retrieved successfully.",
    data: result,
  });
});

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

const createTeacher = catchAsync(async (req: Request, res: Response) => {
  const file = req.file;
  const data = req.body;
  const result = await UserService.createTeacher(
    file as Express.Multer.File,
    data,
  );

  sendResponse(res, {
    statusCode: httpStatusCodes.CREATED,
    success: true,
    message: "Your account has been created as Teacher",
    data: result,
  });
});

export const UserController = {
  getAllUsers,
  createAdmin,
  createStudent,
  createTeacher,
};
