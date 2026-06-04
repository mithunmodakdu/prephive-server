/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import AppError from "../../utils/errorHelpers/AppError";
import httpStatusCodes from "http-status-codes";
import { verifyToken } from "../../utils/jwt";
import { envVars } from "../../config/env";
import { JwtPayload } from "jsonwebtoken";
import { prisma } from "../../lib/prisma";
import { EUserStatus } from "../../generated/prisma/enums";

const checkAuth = (...userRoles: string[]) => async(req: Request & {user?: any}, res: Response, next: NextFunction) => {
  try {   
    const accessToken = req.cookies.accessToken || req.headers.authorization;
     
    if(!accessToken){
      throw new AppError(httpStatusCodes.UNAUTHORIZED, "You are not logged in. Please log in.")
    }

    const verifiedToken = verifyToken(accessToken, envVars.JWT_ACCESS_SECRET) as JwtPayload;

    const existedUser = await prisma.user.findUnique({
      where: {
        email: verifiedToken.email,
      }
    })
    
    if(!existedUser){
      throw new AppError(httpStatusCodes.BAD_REQUEST, "You are not signed up. Please create your account.")
    }

    if(existedUser.status === EUserStatus.INACTIVE){
      throw new AppError(httpStatusCodes.BAD_REQUEST, "Your account status is inactive. Please contact with our support team.")
    }

    if(existedUser.status === EUserStatus.DELETED){
      throw new AppError(httpStatusCodes.BAD_REQUEST, "You account is deleted. Please contact with our support team.")
    }

    if(!userRoles.includes(verifiedToken.role)){
      throw new AppError(httpStatusCodes.FORBIDDEN, "This route is forbidden for you.")
    }

    req.user = verifiedToken;
   
    next()
  } catch (error) {
    next(error)
  }
}

export default checkAuth;