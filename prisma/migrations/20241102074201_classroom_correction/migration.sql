/*
  Warnings:

  - You are about to drop the column `classCode` on the `classroom` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "classroom" DROP COLUMN "classCode",
ADD COLUMN     "classroomCode" TEXT,
ADD COLUMN     "classroomProfile" TEXT,
ADD COLUMN     "classroomSubject" TEXT;
