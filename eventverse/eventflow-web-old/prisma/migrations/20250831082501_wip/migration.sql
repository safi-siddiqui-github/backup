-- AlterTable
ALTER TABLE "public"."SeatingObject" ADD COLUMN     "guestListId" INTEGER;

-- AddForeignKey
ALTER TABLE "public"."SeatingObject" ADD CONSTRAINT "SeatingObject_guestListId_fkey" FOREIGN KEY ("guestListId") REFERENCES "public"."GuestList"("id") ON DELETE CASCADE ON UPDATE CASCADE;
