import { EGender } from "../../../generated/prisma/enums";

export interface ICreateAdminPayload {
  password: string;
  admin: {
    email: string;
    name: string;
    profilePhoto?: string;
    contactNumber: string;
  };
}

export interface ICreateStudentPayload {
  password: string;
  student: {
    email: string;
    name: string;
    profilePhoto?: string;
    address?: string;
  };
}

export interface ICreateTeacherPayload {
  password: string;
  teacher: {
    email: string;
    name: string;
    profilePhoto?: string;
    contactNumber: string;
    address?: string;
    experience?: number;
    gender: EGender;
    teachingFee: number;
    qualification: string;
    currentWorkingPlace: string;
    designation: string;
  };
}



