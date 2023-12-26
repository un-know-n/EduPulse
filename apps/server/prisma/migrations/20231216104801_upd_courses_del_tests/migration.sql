/*
  Warnings:

  - The primary key for the `UsersAssignedToCourse` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `UsersAssignedToCourse` table. All the data in the column will be lost.
  - You are about to drop the column `currentTestId` on the `UsersAssignedToCourse` table. All the data in the column will be lost.
  - You are about to drop the `Answer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Lection` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Module` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Question` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Test` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `purpose` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `timeToPass` to the `Course` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Answer" DROP CONSTRAINT "Answer_questionId_fkey";

-- DropForeignKey
ALTER TABLE "Lection" DROP CONSTRAINT "Lection_moduleId_fkey";

-- DropForeignKey
ALTER TABLE "Module" DROP CONSTRAINT "Module_courseId_fkey";

-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_testId_fkey";

-- DropForeignKey
ALTER TABLE "Test" DROP CONSTRAINT "Test_moduleId_fkey";

-- DropForeignKey
ALTER TABLE "UsersAssignedToCourse" DROP CONSTRAINT "UsersAssignedToCourse_currentTestId_fkey";

-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "image" TEXT,
ADD COLUMN     "purpose" TEXT NOT NULL,
ADD COLUMN     "timeToPass" INTEGER NOT NULL,
ALTER COLUMN "numberOfPeopleEnrolled" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "UsersAssignedToCourse" DROP CONSTRAINT "UsersAssignedToCourse_pkey",
DROP COLUMN "createdAt",
DROP COLUMN "currentTestId",
ADD COLUMN     "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "isCompleted" SET DEFAULT true,
ADD CONSTRAINT "UsersAssignedToCourse_pkey" PRIMARY KEY ("userId", "courseId");

-- DropTable
DROP TABLE "Answer";

-- DropTable
DROP TABLE "Lection";

-- DropTable
DROP TABLE "Module";

-- DropTable
DROP TABLE "Question";

-- DropTable
DROP TABLE "Test";

-- CreateTable
CREATE TABLE "Section" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Section_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lecture" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "sectionId" TEXT NOT NULL,

    CONSTRAINT "Lecture_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Section" ADD CONSTRAINT "Section_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lecture" ADD CONSTRAINT "Lecture_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "Section"("id") ON DELETE CASCADE ON UPDATE CASCADE;
