/*
  Warnings:

  - The `questionType` column on the `question` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "QuestionType" AS ENUM ('MULTIPLE_CHOICE', 'TRUE_FALSE', 'SHORT_ANSWER');

-- AlterTable
ALTER TABLE "question" DROP COLUMN "questionType",
ADD COLUMN     "questionType" "QuestionType" NOT NULL DEFAULT 'MULTIPLE_CHOICE';
