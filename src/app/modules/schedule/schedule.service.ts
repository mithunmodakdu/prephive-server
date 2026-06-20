import httpStatusCodes from "http-status-codes";
import { Prisma } from "../../../generated/prisma/client";
import AppError from "../../../utils/errorHelpers/AppError";
import paginationAndSortHelper, {
  IPaginationAndSortOptions,
} from "../../../utils/paginationAndSortHelper";
import { prisma } from "../../../lib/prisma";
import {
  ICreateTeacherSchedulePayload,
  IUpdateTeacherSchedulePayload,
} from "./schedule.interface";
import { scheduleSearchableFields } from "./schedule.constants";

const getAllSchedules = async (
  paginationAndSortOptions: IPaginationAndSortOptions,
  searchAndFilterOptions: Record<string, unknown>,
) => {
  const { page, limit, skip, sortBy, sortOrder } = paginationAndSortHelper(
    paginationAndSortOptions,
  );
  const { searchTerm, isActive, ...filterOptions } = searchAndFilterOptions;

  const andConditions: Prisma.TeacherScheduleWhereInput[] = [];

  if (typeof searchTerm === "string" && searchTerm.length > 0) {
    andConditions.push({
      OR: scheduleSearchableFields.map((field) => ({
        [field]: {
          contains: searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  const normalizedIsActive =
    typeof isActive === "string"
      ? isActive === "true"
      : typeof isActive === "boolean"
        ? isActive
        : undefined;

  if (typeof normalizedIsActive === "boolean") {
    andConditions.push({ isActive: { equals: normalizedIsActive } });
  }

  if (Object.keys(filterOptions).length > 0) {
    andConditions.push({
      AND: Object.entries(filterOptions).map(([key, value]) => ({
        [key]: {
          equals: value,
        },
      })),
    });
  }

  const whereConditions: Prisma.TeacherScheduleWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const schedules = await prisma.teacherSchedule.findMany({
    skip,
    take: limit,
    where: whereConditions,
    orderBy: {
      [sortBy]: sortOrder,
    },
    include: {
      teacher: true,
      subject: true,
      batch: true,
    },
  });

  const total = await prisma.teacherSchedule.count({
    where: whereConditions,
  });

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: schedules,
  };
};

const getScheduleById = async (id: string) => {
  const schedule = await prisma.teacherSchedule.findUnique({
    where: {
      id,
    },
    include: {
      teacher: true,
      subject: true,
      batch: true,
    },
  });

  if (!schedule) {
    throw new AppError(httpStatusCodes.NOT_FOUND, "Schedule not found.");
  }

  return schedule;
};

const createSchedule = async (payload: ICreateTeacherSchedulePayload) => {
  return await prisma.teacherSchedule.create({
    data: payload,
    include: {
      teacher: true,
      subject: true,
      batch: true,
    },
  });
};

const updateSchedule = async (
  id: string,
  payload: IUpdateTeacherSchedulePayload,
) => {
  const existingSchedule = await prisma.teacherSchedule.findUnique({
    where: {
      id,
    },
  });

  if (!existingSchedule) {
    throw new AppError(httpStatusCodes.NOT_FOUND, "Schedule not found.");
  }

  return await prisma.teacherSchedule.update({
    where: {
      id,
    },
    data: payload,
    include: {
      teacher: true,
      subject: true,
      batch: true,
    },
  });
};

const deleteSchedule = async (id: string) => {
  const existingSchedule = await prisma.teacherSchedule.findUnique({
    where: {
      id,
    },
  });

  if (!existingSchedule) {
    throw new AppError(httpStatusCodes.NOT_FOUND, "Schedule not found.");
  }

  return await prisma.teacherSchedule.delete({
    where: {
      id,
    },
  });
};

export const ScheduleService = {
  getAllSchedules,
  getScheduleById,
  createSchedule,
  updateSchedule,
  deleteSchedule,
};