/*
  Warnings:

  - The primary key for the `EventModuleActivation` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `EventModuleActivation` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `EventModuleActivation` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `EventModuleActivation` table. All the data in the column will be lost.
  - Made the column `eventModelId` on table `EventModuleActivation` required. This step will fail if there are existing NULL values in that column.
  - Made the column `eventModuleId` on table `EventModuleActivation` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "EventModuleActivation" DROP CONSTRAINT "EventModuleActivation_pkey",
DROP COLUMN "createdAt",
DROP COLUMN "id",
DROP COLUMN "updatedAt",
ALTER COLUMN "eventModelId" SET NOT NULL,
ALTER COLUMN "eventModuleId" SET NOT NULL,
ADD CONSTRAINT "EventModuleActivation_pkey" PRIMARY KEY ("eventModelId", "eventModuleId");
