/*
  Warnings:

  - You are about to drop the `SeatingChair` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SeatingTable` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "public"."SeatingType" AS ENUM ('TABLE', 'CHAIR', 'STAGE', 'PODIUM', 'EXIT', 'DANCEFLOOR');

-- DropForeignKey
ALTER TABLE "public"."SeatingChair" DROP CONSTRAINT "SeatingChair_guestListId_fkey";

-- DropForeignKey
ALTER TABLE "public"."SeatingChair" DROP CONSTRAINT "SeatingChair_seatingTableId_fkey";

-- DropForeignKey
ALTER TABLE "public"."SeatingTable" DROP CONSTRAINT "SeatingTable_guestGroupId_fkey";

-- DropForeignKey
ALTER TABLE "public"."SeatingTable" DROP CONSTRAINT "SeatingTable_moduleId_fkey";

-- DropTable
DROP TABLE "public"."SeatingChair";

-- DropTable
DROP TABLE "public"."SeatingTable";

-- CreateTable
CREATE TABLE "public"."SeatingObject" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT,
    "note" TEXT,
    "horizontalAxis" INTEGER,
    "verticalAxis" INTEGER,
    "width" INTEGER,
    "height" INTEGER,
    "tableShape" "public"."TableShape",
    "isActive" BOOLEAN DEFAULT true,
    "moduleId" INTEGER,
    "guestGroupId" INTEGER,
    "parentId" INTEGER,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "SeatingObject_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SeatingObject_slug_key" ON "public"."SeatingObject"("slug");

-- AddForeignKey
ALTER TABLE "public"."SeatingObject" ADD CONSTRAINT "SeatingObject_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "public"."Module"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."SeatingObject" ADD CONSTRAINT "SeatingObject_guestGroupId_fkey" FOREIGN KEY ("guestGroupId") REFERENCES "public"."GuestGroup"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."SeatingObject" ADD CONSTRAINT "SeatingObject_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "public"."SeatingObject"("id") ON DELETE CASCADE ON UPDATE CASCADE;
