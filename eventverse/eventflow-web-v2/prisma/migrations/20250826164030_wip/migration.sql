-- CreateEnum
CREATE TYPE "public"."TableShape" AS ENUM ('ROUND', 'RECTANGLE');

-- CreateTable
CREATE TABLE "public"."SeatingTable" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT,
    "description" TEXT,
    "tableShape" "public"."TableShape",
    "moduleId" INTEGER,
    "guestGroupId" INTEGER,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "SeatingTable_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."SeatingChair" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "seatingTableId" INTEGER,
    "guestListId" INTEGER,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "SeatingChair_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SeatingTable_slug_key" ON "public"."SeatingTable"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "SeatingChair_slug_key" ON "public"."SeatingChair"("slug");

-- AddForeignKey
ALTER TABLE "public"."SeatingTable" ADD CONSTRAINT "SeatingTable_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "public"."Module"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."SeatingTable" ADD CONSTRAINT "SeatingTable_guestGroupId_fkey" FOREIGN KEY ("guestGroupId") REFERENCES "public"."GuestGroup"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."SeatingChair" ADD CONSTRAINT "SeatingChair_seatingTableId_fkey" FOREIGN KEY ("seatingTableId") REFERENCES "public"."SeatingTable"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."SeatingChair" ADD CONSTRAINT "SeatingChair_guestListId_fkey" FOREIGN KEY ("guestListId") REFERENCES "public"."GuestList"("id") ON DELETE SET NULL ON UPDATE CASCADE;
