/*
  Warnings:

  - You are about to drop the `Batch` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Subject` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TeacherSchedule` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "TeacherSchedule" DROP CONSTRAINT "TeacherSchedule_batchId_fkey";

-- DropForeignKey
ALTER TABLE "TeacherSchedule" DROP CONSTRAINT "TeacherSchedule_subjectId_fkey";

-- DropForeignKey
ALTER TABLE "TeacherSchedule" DROP CONSTRAINT "TeacherSchedule_teacherId_fkey";

-- DropTable
DROP TABLE "Batch";

-- DropTable
DROP TABLE "Subject";

-- DropTable
DROP TABLE "TeacherSchedule";

-- CreateTable
CREATE TABLE "batches" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "batches_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "teacher_schedules" (
    "id" TEXT NOT NULL,
    "teacherId" TEXT NOT NULL,
    "subjectId" TEXT NOT NULL,
    "batchId" TEXT NOT NULL,
    "dayOfWeek" "EDayOfWeek" NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "fee" DECIMAL(10,2) NOT NULL,
    "room" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "teacher_schedules_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subjects" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "subjects_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "teacher_schedules_teacherId_idx" ON "teacher_schedules"("teacherId");

-- CreateIndex
CREATE INDEX "teacher_schedules_subjectId_idx" ON "teacher_schedules"("subjectId");

-- CreateIndex
CREATE INDEX "teacher_schedules_batchId_idx" ON "teacher_schedules"("batchId");

-- CreateIndex
CREATE UNIQUE INDEX "teacher_schedules_teacherId_subjectId_batchId_dayOfWeek_sta_key" ON "teacher_schedules"("teacherId", "subjectId", "batchId", "dayOfWeek", "startTime");

-- CreateIndex
CREATE UNIQUE INDEX "subjects_code_key" ON "subjects"("code");

-- AddForeignKey
ALTER TABLE "teacher_schedules" ADD CONSTRAINT "teacher_schedules_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "teachers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teacher_schedules" ADD CONSTRAINT "teacher_schedules_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "subjects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teacher_schedules" ADD CONSTRAINT "teacher_schedules_batchId_fkey" FOREIGN KEY ("batchId") REFERENCES "batches"("id") ON DELETE CASCADE ON UPDATE CASCADE;
