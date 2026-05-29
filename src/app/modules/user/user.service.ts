import bcrypt from "bcryptjs";
import { envVars } from "../../../config/env";
import { prisma } from "../../../lib/prisma";
import { ICreateStudentPayload } from "./user.interface";

const createStudent = async(file: Express.Multer.File, payload: ICreateStudentPayload) => {
  const {password, student} = payload;

  student.profilePhoto = file?.path

  const hashedPassword = await bcrypt.hash(password, Number(envVars.BCRYPT_SALT_ROUND));

  const result = await prisma.$transaction(async(tnx) => {
    
    await tnx.user.create({
      data: {
        email: student.email,
        password: hashedPassword
      }
    })

    return await tnx.student.create({
      data: student
    })
  })

  return result;
}

export const UserService = {
  createStudent
}