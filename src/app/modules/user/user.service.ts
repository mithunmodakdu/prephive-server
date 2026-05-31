import bcrypt from "bcryptjs";
import { envVars } from "../../../config/env";
import { prisma } from "../../../lib/prisma";
import { ICreateAdminPayload, ICreateStudentPayload } from "./user.interface";

const createAdmin = async (
  file: Express.Multer.File,
  payload: ICreateAdminPayload,
) => {
  const { password, admin } = payload;
  const hashedPassword = await bcrypt.hash(
    password,
    Number(envVars.BCRYPT_SALT_ROUND),
  );
  admin.profilePhoto = file?.path;

  const result = await prisma.$transaction(async (tnx) => {
    await tnx.user.create({
      data: {
        email: admin.email,
        password: hashedPassword,
      },
    });

    return await tnx.admin.create({
      data: admin
    })
  });

  return result;
};

const createStudent = async (
  file: Express.Multer.File,
  payload: ICreateStudentPayload,
) => {
  const { password, student } = payload;

  student.profilePhoto = file?.path;

  const hashedPassword = await bcrypt.hash(
    password,
    Number(envVars.BCRYPT_SALT_ROUND),
  );

  const result = await prisma.$transaction(async (tnx) => {
    await tnx.user.create({
      data: {
        email: student.email,
        password: hashedPassword,
      },
    });

    return await tnx.student.create({
      data: student,
    });
  });

  return result;
};

export const UserService = {
  createAdmin,
  createStudent,
};
