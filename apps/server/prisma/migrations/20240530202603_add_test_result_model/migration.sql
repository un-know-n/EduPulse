/*
  Warnings:

  - You are about to drop the column `multipleChoice` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `isCompleted` on the `Test` table. All the data in the column will be lost.
  - You are about to drop the column `mark` on the `Test` table. All the data in the column will be lost.
  - Added the required column `isMultipleChoice` to the `Question` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Test_sectionId_key";

-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Question" DROP COLUMN "multipleChoice",
ADD COLUMN     "isMultipleChoice" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "Test" DROP COLUMN "isCompleted",
DROP COLUMN "mark",
ADD COLUMN     "timeToPass" INTEGER NOT NULL DEFAULT 60000,
ADD COLUMN     "totalAttempts" INTEGER NOT NULL DEFAULT 2;

-- AlterTable
ALTER TABLE "UsersAssignedToCourse" ADD COLUMN     "isFailed" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "isCompleted" SET DEFAULT false;

-- CreateTable
CREATE TABLE "TestResult" (
    "id" TEXT NOT NULL,
    "score" INTEGER NOT NULL DEFAULT 0,
    "isCompleted" BOOLEAN NOT NULL DEFAULT false,
    "currentAttempt" INTEGER NOT NULL,
    "enrollmentId" TEXT NOT NULL,
    "testId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TestResult_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TestResult" ADD CONSTRAINT "TestResult_enrollmentId_fkey" FOREIGN KEY ("enrollmentId") REFERENCES "UsersAssignedToCourse"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestResult" ADD CONSTRAINT "TestResult_testId_fkey" FOREIGN KEY ("testId") REFERENCES "Test"("id") ON DELETE CASCADE ON UPDATE CASCADE;
