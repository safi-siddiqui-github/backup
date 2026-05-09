-- DropForeignKey
ALTER TABLE "public"."Category" DROP CONSTRAINT "Category_parentId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Event" DROP CONSTRAINT "Event_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Event" DROP CONSTRAINT "Event_hostId_fkey";

-- DropForeignKey
ALTER TABLE "public"."FormField" DROP CONSTRAINT "FormField_moduleId_fkey";

-- DropForeignKey
ALTER TABLE "public"."FormFieldType" DROP CONSTRAINT "FormFieldType_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."FormOption" DROP CONSTRAINT "FormOption_formFieldId_fkey";

-- DropForeignKey
ALTER TABLE "public"."FormOption" DROP CONSTRAINT "FormOption_formFieldTypeId_fkey";

-- DropForeignKey
ALTER TABLE "public"."GuestGroup" DROP CONSTRAINT "GuestGroup_moduleId_fkey";

-- DropForeignKey
ALTER TABLE "public"."GuestList" DROP CONSTRAINT "GuestList_guestGroupId_fkey";

-- DropForeignKey
ALTER TABLE "public"."GuestList" DROP CONSTRAINT "GuestList_moduleId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Module" DROP CONSTRAINT "Module_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Module" DROP CONSTRAINT "Module_eventId_fkey";

-- DropForeignKey
ALTER TABLE "public"."ModuleCategory" DROP CONSTRAINT "ModuleCategory_parentId_fkey";

-- DropForeignKey
ALTER TABLE "public"."ScheduleDay" DROP CONSTRAINT "ScheduleDay_moduleId_fkey";

-- DropForeignKey
ALTER TABLE "public"."ScheduleItem" DROP CONSTRAINT "ScheduleItem_scheduleDayId_fkey";

-- DropForeignKey
ALTER TABLE "public"."ScheduleSession" DROP CONSTRAINT "ScheduleSession_moduleId_fkey";

-- DropForeignKey
ALTER TABLE "public"."ScheduleSession" DROP CONSTRAINT "ScheduleSession_scheduleDayId_fkey";

-- DropForeignKey
ALTER TABLE "public"."ScheduleSession" DROP CONSTRAINT "ScheduleSession_scheduleTrackId_fkey";

-- DropForeignKey
ALTER TABLE "public"."ScheduleTrack" DROP CONSTRAINT "ScheduleTrack_moduleId_fkey";

-- DropForeignKey
ALTER TABLE "public"."SeatingChair" DROP CONSTRAINT "SeatingChair_guestListId_fkey";

-- DropForeignKey
ALTER TABLE "public"."SeatingChair" DROP CONSTRAINT "SeatingChair_seatingTableId_fkey";

-- DropForeignKey
ALTER TABLE "public"."SeatingTable" DROP CONSTRAINT "SeatingTable_guestGroupId_fkey";

-- DropForeignKey
ALTER TABLE "public"."SeatingTable" DROP CONSTRAINT "SeatingTable_moduleId_fkey";

-- AddForeignKey
ALTER TABLE "public"."Category" ADD CONSTRAINT "Category_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "public"."Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Event" ADD CONSTRAINT "Event_hostId_fkey" FOREIGN KEY ("hostId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Event" ADD CONSTRAINT "Event_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "public"."Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ModuleCategory" ADD CONSTRAINT "ModuleCategory_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "public"."ModuleCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Module" ADD CONSTRAINT "Module_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "public"."ModuleCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Module" ADD CONSTRAINT "Module_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "public"."Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."GuestGroup" ADD CONSTRAINT "GuestGroup_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "public"."Module"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."GuestList" ADD CONSTRAINT "GuestList_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "public"."Module"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."GuestList" ADD CONSTRAINT "GuestList_guestGroupId_fkey" FOREIGN KEY ("guestGroupId") REFERENCES "public"."GuestGroup"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."FormFieldType" ADD CONSTRAINT "FormFieldType_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."FormField" ADD CONSTRAINT "FormField_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "public"."Module"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."FormOption" ADD CONSTRAINT "FormOption_formFieldTypeId_fkey" FOREIGN KEY ("formFieldTypeId") REFERENCES "public"."FormFieldType"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."FormOption" ADD CONSTRAINT "FormOption_formFieldId_fkey" FOREIGN KEY ("formFieldId") REFERENCES "public"."FormField"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ScheduleDay" ADD CONSTRAINT "ScheduleDay_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "public"."Module"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ScheduleItem" ADD CONSTRAINT "ScheduleItem_scheduleDayId_fkey" FOREIGN KEY ("scheduleDayId") REFERENCES "public"."ScheduleDay"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ScheduleTrack" ADD CONSTRAINT "ScheduleTrack_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "public"."Module"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ScheduleSession" ADD CONSTRAINT "ScheduleSession_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "public"."Module"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ScheduleSession" ADD CONSTRAINT "ScheduleSession_scheduleTrackId_fkey" FOREIGN KEY ("scheduleTrackId") REFERENCES "public"."ScheduleTrack"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ScheduleSession" ADD CONSTRAINT "ScheduleSession_scheduleDayId_fkey" FOREIGN KEY ("scheduleDayId") REFERENCES "public"."ScheduleDay"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."SeatingTable" ADD CONSTRAINT "SeatingTable_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "public"."Module"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."SeatingTable" ADD CONSTRAINT "SeatingTable_guestGroupId_fkey" FOREIGN KEY ("guestGroupId") REFERENCES "public"."GuestGroup"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."SeatingChair" ADD CONSTRAINT "SeatingChair_seatingTableId_fkey" FOREIGN KEY ("seatingTableId") REFERENCES "public"."SeatingTable"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."SeatingChair" ADD CONSTRAINT "SeatingChair_guestListId_fkey" FOREIGN KEY ("guestListId") REFERENCES "public"."GuestList"("id") ON DELETE CASCADE ON UPDATE CASCADE;
