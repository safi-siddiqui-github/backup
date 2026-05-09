/*
  Warnings:

  - The primary key for the `EventCategoryAssignment` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `evnetCategoryId` on the `EventCategoryAssignment` table. All the data in the column will be lost.
  - Added the required column `eventCategoryId` to the `EventCategoryAssignment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "EventCategoryAssignment" DROP CONSTRAINT "EventCategoryAssignment_evnetCategoryId_fkey";

-- AlterTable
ALTER TABLE "EventCategoryAssignment" DROP CONSTRAINT "EventCategoryAssignment_pkey",
DROP COLUMN "evnetCategoryId",
ADD COLUMN     "eventCategoryId" INTEGER NOT NULL,
ADD CONSTRAINT "EventCategoryAssignment_pkey" PRIMARY KEY ("eventModelId", "eventCategoryId");

-- AddForeignKey
ALTER TABLE "EventCategoryAssignment" ADD CONSTRAINT "EventCategoryAssignment_eventCategoryId_fkey" FOREIGN KEY ("eventCategoryId") REFERENCES "EventCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;
