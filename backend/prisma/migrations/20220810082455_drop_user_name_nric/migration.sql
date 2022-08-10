/*
  Warnings:

  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `nric` on the `User` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "User_nric_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "name",
DROP COLUMN "nric";
