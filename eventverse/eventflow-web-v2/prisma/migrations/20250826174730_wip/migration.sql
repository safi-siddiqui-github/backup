/*
  Warnings:

  - You are about to drop the column `description` on the `SeatingTable` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."SeatingTable" DROP COLUMN "description",
ADD COLUMN     "note" TEXT;
