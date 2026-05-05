/*
  Warnings:

  - The primary key for the `EventCategoryAssignment` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `categoryId` on the `EventCategoryAssignment` table. All the data in the column will be lost.
  - Added the required column `evnetCategoryId` to the `EventCategoryAssignment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "EventCategoryAssignment" DROP CONSTRAINT "EventCategoryAssignment_categoryId_fkey";

-- AlterTable
ALTER TABLE "EventCategoryAssignment" DROP CONSTRAINT "EventCategoryAssignment_pkey",
DROP COLUMN "categoryId",
ADD COLUMN     "evnetCategoryId" INTEGER NOT NULL,
ADD CONSTRAINT "EventCategoryAssignment_pkey" PRIMARY KEY ("eventModelId", "evnetCategoryId");

-- AddForeignKey
ALTER TABLE "EventCategoryAssignment" ADD CONSTRAINT "EventCategoryAssignment_evnetCategoryId_fkey" FOREIGN KEY ("evnetCategoryId") REFERENCES "EventCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;
