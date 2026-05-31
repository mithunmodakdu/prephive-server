import { EUserStatus } from "../../../generated/prisma/enums";
import { prisma } from "../../../lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { generateToken } from "../../../utils/jwt";
import { envVars } from "../../../config/env";

const login = async (payload: { email: string; password: string }) => {
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      email: payload.email,
      status: EUserStatus.ACTIVE,
    },
  });

  const isCorrectPassword = await bcrypt.compare(
    payload.password,
    user.password,
  );

  if (!isCorrectPassword) {
    throw new Error("Your password is not correct.");
  }

  const accessToken = generateToken(
    { email: user.email, role: user.role },
    envVars.JWT_ACCESS_SECRET,
    envVars.JWT_ACCESS_EXPIRE_TIME,
  );
  
  const refreshToken = generateToken(
    { email: user.email, role: user.role },
    envVars.JWT_REFRESH_SECRET,
    envVars.JWT_REFRESH_EXPIRE_TIME,
  );

  return {
    accessToken,
    refreshToken,
  };
};

export const AuthService = {
  login,
};
