-- CreateEnum
CREATE TYPE "public"."ChairLayout" AS ENUM ('SINGLE', 'GRID');

-- AlterTable
ALTER TABLE "public"."SeatingObject" ADD COLUMN     "chairLayout" "public"."ChairLayout",
ADD COLUMN     "columns" INTEGER,
ADD COLUMN     "rows" INTEGER;
