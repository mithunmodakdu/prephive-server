import { EDayOfWeek } from "../../../generated/prisma/enums";

export interface ITeacherSchedule {
  id: string;

  teacherId: string;
  subjectId: string;
  batchId: string;

  dayOfWeek: EDayOfWeek;
  startTime: Date;
  endTime: Date;

  fee: number;

  room?: string | null;

  isActive: boolean;

  createdAt: Date;
  updatedAt: Date;
}

export interface ICreateTeacherScheduleInput {
	teacherId: string;
	subjectId: string;
	batchId: string;
	dayOfWeek: EDayOfWeek;
	startTime: Date;
	endTime: Date;
	fee: number;
	room?: string;
	isActive?: boolean;
}


