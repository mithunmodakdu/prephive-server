import { prisma } from "../../../lib/prisma";
import { ICreateSubjectInput } from "./subject.interface";


const createSubject = async (payload: ICreateSubjectInput) => {
  const existingSubject = await prisma.subject.findFirst({
    where: {
      name: payload.name,
    },
  });

  if (existingSubject) {
    throw new Error("Subject already exists");
  }

  const subject = await prisma.subject.create({
    data: {
      name: payload.name,
      code: payload.code,
      description: payload.description,
    },
  });

  return subject;
};

export const SubjectService = {
  createSubject,
};