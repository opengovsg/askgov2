/*
  Warnings:

  - Added the required column `updatedAt` to the `Answer` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ScreenState" AS ENUM ('NEW', 'APPROVED', 'REJECTED');

-- AlterTable
ALTER TABLE "Answer" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Question" ADD COLUMN     "screenState" "ScreenState" NOT NULL DEFAULT 'NEW';
