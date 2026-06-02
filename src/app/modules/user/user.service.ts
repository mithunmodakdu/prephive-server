import bcrypt from "bcryptjs";
import { envVars } from "../../../config/env";
import { prisma } from "../../../lib/prisma";
import {
  ICreateAdminPayload,
  ICreateStudentPayload,
  ICreateTeacherPayload,
} from "./user.interface";
import { EUserRole } from "../../../generated/prisma/enums";

const getAllUsers = async ({
  page,
  limit,
  searchTerm,
  sortBy,
  sortOrder
}: {
  page: number;
  limit: number;
  searchTerm?: string;
  sortBy?: string;
  sortOrder?: string
}) => {
  const pageNo = page || 1;
  const limitNumber = limit || 10;
  const skip = (pageNo - 1) * limitNumber;

  const result = await prisma.user.findMany(
    { skip, 
      take: limitNumber,
      where: {
        email: {
          contains: searchTerm,
          mode: "insensitive"
        }
      },
      orderBy: sortBy && sortOrder ? {
        [sortBy]: sortOrder
      } : {
        createdAt: 'desc'
      } 
    }
  );

  return result;
};

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
        role: EUserRole.ADMIN,
      },
    });

    return await tnx.admin.create({
      data: admin,
    });
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

const createTeacher = async (
  file: Express.Multer.File,
  payload: ICreateTeacherPayload,
) => {
  const { password, teacher } = payload;
  const hashedPassword = await bcrypt.hash(
    password,
    Number(envVars.BCRYPT_SALT_ROUND),
  );
  teacher.profilePhoto = file.path;

  const result = await prisma.$transaction(async (tnx) => {
    await tnx.user.create({
      data: {
        email: teacher.email,
        password: hashedPassword,
        role: EUserRole.TEACHER,
      },
    });

    return await tnx.teacher.create({
      data: teacher,
    });
  });

  return result;
};

export const UserService = {
  getAllUsers,
  createAdmin,
  createStudent,
  createTeacher,
};
