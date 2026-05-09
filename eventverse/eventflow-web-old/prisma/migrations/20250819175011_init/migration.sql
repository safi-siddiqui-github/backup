/*
  Warnings:

  - You are about to drop the column `RsvpReminder` on the `Module` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Module" DROP COLUMN "RsvpReminder",
ADD COLUMN     "rsvpReminder" "public"."RsvpReminder";
