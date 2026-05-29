import { EUserStatus } from "../../../generated/prisma/enums"
import { prisma } from "../../../lib/prisma"
import bcrypt from "bcryptjs"

const login = async(payload: {email: string, password: string}) => {
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      email: payload.email,
      status: EUserStatus.ACTIVE
    }
  })

  const isCorrectPassword = await bcrypt.compare(payload.password, user.password);

  if(!isCorrectPassword){
    throw new Error("Your password is not correct.")
  }

}

export const AuthService = {
  login
}