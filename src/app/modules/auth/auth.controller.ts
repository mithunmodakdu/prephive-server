import { Request, Response } from "express";
import catchAsync from "../../../utils/catchAsync";
import { AuthService } from "./auth.service";
import { sendResponse } from "../../../utils/sendResponse";
import httpStatusCodes from "http-status-codes";

const login = catchAsync(
  async(req: Request, res: Response) => {
    const result = await AuthService.login(req.body);
    sendResponse(res, {
      statusCode: httpStatusCodes.OK,
      success: true,
      message: "You have logged in successfully.",
      data: result
    })
  }
)

export const AuthController = {
  login
}