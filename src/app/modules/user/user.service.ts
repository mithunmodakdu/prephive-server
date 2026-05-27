import bcrypt from "bcryptjs";
import { IStudent } from "./user.interface";
import { envVars } from "../../../config/env";
import { prisma } from "../../../lib/prisma";

const createStudent = async(payload: IStudent) => {
  const hashedPassword = await bcrypt.hash(payload.password, Number(envVars.BCRYPT_SALT_ROUND));

  const result = await prisma.$transaction(async(tnx) => {
    
    await tnx.user.create({
      data: {
        email: payload.email,
        password: hashedPassword
      }
    })

    return await tnx.student.create({
      data: {
        name: payload.name,
        email: payload.email
      }
    })
  })

  return result;
}

export const UserService = {
  createStudent
}