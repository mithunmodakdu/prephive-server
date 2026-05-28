import bcrypt from "bcryptjs";
import { IStudent } from "./user.interface";
import { envVars } from "../../../config/env";
import { prisma } from "../../../lib/prisma";
import { Request } from "express";

const createStudent = async(req: Request) => {

  const hashedPassword = await bcrypt.hash(req.body.password, Number(envVars.BCRYPT_SALT_ROUND));

  const result = await prisma.$transaction(async(tnx) => {
    
    await tnx.user.create({
      data: {
        email: req.body.student.email,
        password: hashedPassword
      }
    })

    return await tnx.student.create({
      data: {
        name: req.body.student.name,
        email: req.body.student.email,
        address:req.body.student.address,
        profilePhoto: req.file?.path
      }
    })
  })

  return result;
}

export const UserService = {
  createStudent
}