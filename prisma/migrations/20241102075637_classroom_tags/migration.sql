-- AlterTable
ALTER TABLE "classroom" ADD COLUMN     "maxStudents" TEXT;

-- CreateTable
CREATE TABLE "tags" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "classroom_tags" (
    "classroomId" TEXT NOT NULL,
    "tagId" TEXT NOT NULL,

    CONSTRAINT "classroom_tags_pkey" PRIMARY KEY ("classroomId","tagId")
);

-- CreateIndex
CREATE UNIQUE INDEX "tags_name_key" ON "tags"("name");

-- AddForeignKey
ALTER TABLE "classroom_tags" ADD CONSTRAINT "classroom_tags_classroomId_fkey" FOREIGN KEY ("classroomId") REFERENCES "classroom"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "classroom_tags" ADD CONSTRAINT "classroom_tags_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "tags"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
