/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `EventFeature` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "EventFeature" ADD COLUMN     "slug" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "EventFeature_slug_key" ON "EventFeature"("slug");
