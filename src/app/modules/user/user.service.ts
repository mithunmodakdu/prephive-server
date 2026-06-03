/* eslint-disable @typescript-eslint/no-explicit-any */
import bcrypt from "bcryptjs";
import { envVars } from "../../../config/env";
import { prisma } from "../../../lib/prisma";
import {
  ICreateAdminPayload,
  ICreateStudentPayload,
  ICreateTeacherPayload,
} from "./user.interface";
import { EUserRole } from "../../../generated/prisma/enums";
import paginationAndSortHelper, {
  IPaginationAndSortOptions,
} from "../../../utils/paginationAndSortHelper";
import { userSearchableFields } from "./user.constants";
import { Prisma } from "../../../generated/prisma/client";


const getAllUsers = async (
  paginationAndSortOptions: IPaginationAndSortOptions,
  searchAndFilterOptions: any,
) => {

  const {page, limit, skip, sortBy, sortOrder } = paginationAndSortHelper(
    paginationAndSortOptions,
  );
  const { searchTerm, ...filterOptions } = searchAndFilterOptions;

  const andConditions: Prisma.UserWhereInput[] = [];

  if (searchTerm) {
    andConditions.push({
      OR: userSearchableFields.map((field) => ({
        [field]: {
          contains: searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  if(Object.keys(filterOptions).length > 0){
    andConditions.push({
      AND: Object.keys(filterOptions).map(key => ({
        [key]: {
          equals: filterOptions[key]
        }
      }))
    })
  }

  const whereConditions : Prisma.UserWhereInput = andConditions.length > 0 ? {
    AND: andConditions
  } : {};

  const users = await prisma.user.findMany({
    skip,
    take: limit,
    where: whereConditions,
    orderBy: {
      [sortBy]: sortOrder,
    },
  });

  const total = await prisma.user.count({
    where: whereConditions
  })

  return {
    meta: {
      page,
      limit,
      total
    },
    data: users
  };
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
