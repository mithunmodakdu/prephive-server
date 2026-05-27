import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";

const createStudent = catchAsync(
  async(req: Request, res: Response) => {
    console.log("studentData:", req.body)
  }
)

export const UserController = {
  createStudent
}