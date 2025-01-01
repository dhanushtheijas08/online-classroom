/*
  Warnings:

  - The `maxStudents` column on the `classroom` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "classroom" DROP COLUMN "maxStudents",
ADD COLUMN     "maxStudents" INTEGER;
