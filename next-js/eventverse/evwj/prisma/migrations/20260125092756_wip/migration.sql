/*
  Warnings:

  - You are about to drop the `_EventCategoryToEventModel` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_EventCategoryToEventModel" DROP CONSTRAINT "_EventCategoryToEventModel_A_fkey";

-- DropForeignKey
ALTER TABLE "_EventCategoryToEventModel" DROP CONSTRAINT "_EventCategoryToEventModel_B_fkey";

-- DropTable
DROP TABLE "_EventCategoryToEventModel";

-- CreateTable
CREATE TABLE "EventCategoryAssignment" (
    "eventModelId" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,

    CONSTRAINT "EventCategoryAssignment_pkey" PRIMARY KEY ("eventModelId","categoryId")
);

-- AddForeignKey
ALTER TABLE "EventCategoryAssignment" ADD CONSTRAINT "EventCategoryAssignment_eventModelId_fkey" FOREIGN KEY ("eventModelId") REFERENCES "EventModel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventCategoryAssignment" ADD CONSTRAINT "EventCategoryAssignment_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "EventCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;
