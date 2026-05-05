/*
  Warnings:

  - You are about to drop the column `linkeninId` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "linkeninId",
ADD COLUMN     "linkedinId" TEXT;
