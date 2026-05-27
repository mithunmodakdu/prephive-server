import { Request, Response } from "express";
import catchAsync from "../../../utils/catchAsync";
import { UserService } from "./user.service";

const createStudent = catchAsync(
  async(req: Request, res: Response) => {
    const result = await UserService.createStudent(req.body);
    console.log(result)
  }
)

export const UserController = {
  createStudent
}