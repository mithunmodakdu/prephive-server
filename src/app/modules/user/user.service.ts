import bcrypt from "bcryptjs";
import { IStudent } from "./user.interface";
import { envVars } from "../../../config/env";

const createStudent = async(payload: IStudent) => {
  const hashedPassword = bcrypt.hash(payload.password, envVars.BCRYPT_SALT_ROUND);
}

export const UserService = {
  createStudent
}