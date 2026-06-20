
export enum EDayOfWeek {
  SUNDAY = "SUNDAY",
  MONDAY = "MONDAY",
  TUESDAY = "TUESDAY",
  WEDNESDAY = "WEDNESDAY",
  THURSDAY = "THURSDAY",
  FRIDAY = "FRIDAY",
  SATURDAY = "SATURDAY",
}

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