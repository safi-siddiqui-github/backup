/*
  Warnings:

  - You are about to drop the column `endDate` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `endTime` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `isMultiDayEvent` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `isRecurringEvent` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `recurringEnd` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `recurringEndDate` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `recurringOccerrence` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `recurringPattern` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `recurringRepeat` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `startTime` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `timezone` on the `Event` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Event" DROP COLUMN "endDate",
DROP COLUMN "endTime",
DROP COLUMN "isMultiDayEvent",
DROP COLUMN "isRecurringEvent",
DROP COLUMN "recurringEnd",
DROP COLUMN "recurringEndDate",
DROP COLUMN "recurringOccerrence",
DROP COLUMN "recurringPattern",
DROP COLUMN "recurringRepeat",
DROP COLUMN "startDate",
DROP COLUMN "startTime",
DROP COLUMN "timezone";

-- AlterTable
ALTER TABLE "public"."ScheduleItem" ADD COLUMN     "timezone" "public"."Timezone";
