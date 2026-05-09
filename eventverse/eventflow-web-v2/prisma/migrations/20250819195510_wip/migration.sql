/*
  Warnings:

  - You are about to drop the column `date` on the `ScheduleDay` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."ScheduleDay" DROP COLUMN "date",
ADD COLUMN     "day" TIMESTAMP(3);
