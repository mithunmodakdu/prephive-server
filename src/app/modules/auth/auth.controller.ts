import { Request, Response } from "express";
import catchAsync from "../../../utils/catchAsync";
import { AuthService } from "./auth.service";
import { sendResponse } from "../../../utils/sendResponse";
import httpStatusCodes from "http-status-codes";

const login = catchAsync(
  async(req: Request, res: Response) => {
    const result = await AuthService.login(req.body);
    const {accessToken, refreshToken, needPasswordChange} = result;

    res.cookie("accessToken", accessToken, {
      secure: true,
      httpOnly: true,
      sameSite: "none",
      maxAge: 1000 * 60 * 60
    });

    res.cookie("refreshToken", refreshToken, {
      secure: true,
      httpOnly: true,
      sameSite: "none",
      maxAge: 1000 * 60 * 60 * 24 * 90
    })

    sendResponse(res, {
      statusCode: httpStatusCodes.OK,
      success: true,
      message: "You have logged in successfully.",
      data: {
        needPasswordChange
      }
    })
  }
)

export const AuthController = {
  login
}