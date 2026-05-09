-- CreateEnum
CREATE TYPE "public"."Timezone" AS ENUM ('NONE', 'UTC', 'EASTERN', 'CENTRAL', 'MOUNTAIN', 'PACIFIC', 'ALASKA', 'HAWAII', 'ARGENTINA', 'BRAZIL', 'CHILE', 'LONDON', 'DUBLIN', 'LISBON', 'PARIS', 'BERLIN', 'ROME', 'MADRID', 'AMSTERDAM', 'VIENNA', 'STOCKHOLM', 'OSLO', 'COPENHAGEN', 'HELSINKI', 'ISTANBUL', 'ATHENS', 'MOSCOW', 'LAGOS', 'JOHANNESBURG', 'NAIROBI', 'CAIRO', 'CASABLANCA', 'DUBAI', 'RIYADH', 'TEHRAN', 'JERUSALEM', 'KARACHI', 'DELHI', 'COLOMBO', 'DHAKA', 'BANGKOK', 'SINGAPORE', 'HONGKONG', 'TAIPEI', 'TOKYO', 'SEOUL', 'BEIJING', 'SYDNEY', 'MELBOURNE', 'AUCKLAND', 'FIJI');

-- CreateEnum
CREATE TYPE "public"."VenueType" AS ENUM ('NONE', 'PHYSICAL', 'VIRTUAL', 'HYBRID', 'CUSTOM');

-- CreateEnum
CREATE TYPE "public"."RecurringPattern" AS ENUM ('NONE', 'DAILY', 'WEEKLY', 'MONTHLY', 'YEARLY', 'CUSTOM');

-- CreateEnum
CREATE TYPE "public"."RecurringEnd" AS ENUM ('NONE', 'WEEKLY', 'AFTEROCCURENCE', 'UNTILDATE', 'CUSTOM');

-- CreateEnum
CREATE TYPE "public"."LaunchStrategy" AS ENUM ('NONE', 'DRAFT', 'SOFT', 'LAUNCH', 'CUSTOM');

-- CreateEnum
CREATE TYPE "public"."Color" AS ENUM ('NONE', 'RED', 'BLUE', 'GREEN', 'PURPLE', 'YELLOW', 'PINK', 'INDIGO', 'ORANGE');

-- CreateEnum
CREATE TYPE "public"."RsvpResponse" AS ENUM ('NONE', 'YESNO', 'YESNOMAYBE', 'CUSTOM');

-- CreateEnum
CREATE TYPE "public"."RsvpPlatform" AS ENUM ('NONE', 'AMAZON', 'TARGET', 'WALMART', 'BEDBATHBEYOND', 'WILLIAMSSONOMA', 'HONEYMOONFUND', 'CUSTOM');

-- CreateEnum
CREATE TYPE "public"."RsvpTemplate" AS ENUM ('NONE', 'DEFAULT', 'FORMAL', 'CASUAL', 'MODERN', 'CUSTOM');

-- CreateEnum
CREATE TYPE "public"."RsvpReminder" AS ENUM ('NONE', 'STANDARD', 'FREQUENT', 'MINIMAL', 'CUSTOM');

-- CreateEnum
CREATE TYPE "public"."ScheduleMode" AS ENUM ('NONE', 'SIMPLE', 'CONFERENCE');

-- CreateEnum
CREATE TYPE "public"."FormFieldTypeEnum" AS ENUM ('TEXT', 'TEXTAREA', 'RADIO', 'SELECT', 'CHECKBOX');

-- CreateEnum
CREATE TYPE "public"."ScheduleAgenda" AS ENUM ('NONE', 'REGISTRATION', 'WELCOME', 'KEYNOTE', 'SESSION', 'WORKSHOP', 'BREAK', 'LUNCH', 'DINNER', 'NETWORKING', 'RECEPTION', 'ENTERTAINMENT', 'CLOSING', 'CHECKOUT', 'TRANSPORTATION', 'CUSTOM');

-- CreateEnum
CREATE TYPE "public"."ScheduleNotification" AS ENUM ('NONE', 'MINUTE5', 'MINUTE10', 'MINUTE15', 'MINUTE30', 'HOUR1', 'HOUR2', 'HOUR4', 'DAY1', 'CUSTOM');

-- CreateEnum
CREATE TYPE "public"."SkillLevel" AS ENUM ('ALL', 'BEGINNER', 'INTERMEDIATE', 'ADVANCED');

-- CreateEnum
CREATE TYPE "public"."SeatingType" AS ENUM ('TABLE', 'CHAIR', 'STAGE', 'PODIUM', 'EXIT', 'DANCEFLOOR');

-- CreateEnum
CREATE TYPE "public"."TableShape" AS ENUM ('ROUND', 'RECTANGLE');

-- CreateEnum
CREATE TYPE "public"."ChairLayout" AS ENUM ('SINGLE', 'GRID');

-- CreateTable
CREATE TABLE "public"."User" (
    "id" SERIAL NOT NULL,
    "clerkId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "firstname" TEXT,
    "lastname" TEXT,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Category" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "parentId" INTEGER,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Event" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT,
    "description" TEXT,
    "isDraft" BOOLEAN DEFAULT false,
    "isPublic" BOOLEAN DEFAULT true,
    "step" INTEGER,
    "isVenueEnabled" BOOLEAN DEFAULT false,
    "venueName" TEXT,
    "venueCapacity" INTEGER,
    "venueFeature" TEXT,
    "venueAddress" TEXT,
    "venueLink" TEXT,
    "venueType" "public"."VenueType",
    "launchStrategy" "public"."LaunchStrategy",
    "hostId" INTEGER,
    "categoryId" INTEGER,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ModuleCategory" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "optionOne" TEXT,
    "optionTwo" TEXT,
    "optionThree" TEXT,
    "price" INTEGER,
    "parentId" INTEGER,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "ModuleCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Module" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "isActive" BOOLEAN DEFAULT true,
    "rsvpDeadline" TIMESTAMP(3),
    "rsvpCapacityLimit" INTEGER,
    "rsvpPlusOneLimit" INTEGER,
    "rsvpAllowPlusOne" BOOLEAN,
    "rsvpEnableWaitlist" BOOLEAN,
    "rsvpCollectDietryInformation" BOOLEAN,
    "rsvpEnableCustomField" BOOLEAN,
    "rsvpPublicRegistration" BOOLEAN,
    "rsvpRequireApproval" BOOLEAN,
    "rsvpAutomaticReminder" BOOLEAN,
    "rsvpGiftName" TEXT,
    "rsvpGiftUrl" TEXT,
    "rsvpGiftDescription" TEXT,
    "rsvpCommunicationMessage" TEXT,
    "rsvpCommunicationSmsNotification" BOOLEAN,
    "rsvpResponse" "public"."RsvpResponse",
    "rsvpPlatform" "public"."RsvpPlatform",
    "rsvpTemplate" "public"."RsvpTemplate",
    "rsvpReminder" "public"."RsvpReminder",
    "scheduleMode" "public"."ScheduleMode",
    "categoryId" INTEGER,
    "eventId" INTEGER,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Module_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."GuestGroup" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT,
    "description" TEXT,
    "memberLimit" INTEGER,
    "moduleId" INTEGER,
    "color" "public"."Color",
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "GuestGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."GuestList" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "plusOne" INTEGER,
    "dietryRestriction" TEXT,
    "note" TEXT,
    "moduleId" INTEGER,
    "guestGroupId" INTEGER,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "GuestList_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."FormFieldType" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT,
    "isRequired" BOOLEAN,
    "placeholder" TEXT,
    "type" "public"."FormFieldTypeEnum",
    "userId" INTEGER,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "FormFieldType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."FormField" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT,
    "isRequired" BOOLEAN,
    "placeholder" TEXT,
    "type" "public"."FormFieldTypeEnum",
    "order" INTEGER,
    "moduleId" INTEGER,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "FormField_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."FormOption" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT,
    "formFieldTypeId" INTEGER,
    "formFieldId" INTEGER,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "FormOption_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ScheduleDay" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT,
    "day" TIMESTAMP(3),
    "moduleId" INTEGER,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "ScheduleDay_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ScheduleItem" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT,
    "description" TEXT,
    "startTime" TEXT,
    "endTime" TEXT,
    "scheduleAgenda" "public"."ScheduleAgenda",
    "scheduleNotification" "public"."ScheduleNotification",
    "notificationMessage" TEXT,
    "timezone" "public"."Timezone",
    "scheduleDayId" INTEGER,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "ScheduleItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ScheduleTrack" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT,
    "description" TEXT,
    "color" "public"."Color",
    "moduleId" INTEGER,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "ScheduleTrack_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ScheduleSession" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT,
    "description" TEXT,
    "scheduleAgenda" "public"."ScheduleAgenda",
    "startTime" TEXT,
    "endTime" TEXT,
    "capacity" INTEGER,
    "skillLevel" "public"."SkillLevel",
    "timezone" "public"."Timezone",
    "location" TEXT,
    "speaker" TEXT,
    "tag" TEXT,
    "moduleId" INTEGER,
    "scheduleTrackId" INTEGER,
    "scheduleDayId" INTEGER,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "ScheduleSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."SeatingObject" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT,
    "note" TEXT,
    "horizontalAxis" INTEGER,
    "verticalAxis" INTEGER,
    "width" INTEGER,
    "height" INTEGER,
    "scale" INTEGER DEFAULT 1,
    "tableShape" "public"."TableShape",
    "seatingType" "public"."SeatingType",
    "chairLayout" "public"."ChairLayout",
    "rows" INTEGER,
    "columns" INTEGER,
    "moduleId" INTEGER,
    "guestGroupId" INTEGER,
    "parentId" INTEGER,
    "guestListId" INTEGER,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "SeatingObject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."SeatingCanvas" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT,
    "body" JSONB,
    "moduleId" INTEGER,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "SeatingCanvas_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_clerkId_key" ON "public"."User"("clerkId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Category_slug_key" ON "public"."Category"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Event_slug_key" ON "public"."Event"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "ModuleCategory_slug_key" ON "public"."ModuleCategory"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Module_slug_key" ON "public"."Module"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Module_categoryId_eventId_key" ON "public"."Module"("categoryId", "eventId");

-- CreateIndex
CREATE UNIQUE INDEX "GuestGroup_slug_key" ON "public"."GuestGroup"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "GuestList_slug_key" ON "public"."GuestList"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "FormFieldType_slug_key" ON "public"."FormFieldType"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "FormField_slug_key" ON "public"."FormField"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "FormOption_slug_key" ON "public"."FormOption"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "ScheduleDay_slug_key" ON "public"."ScheduleDay"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "ScheduleItem_slug_key" ON "public"."ScheduleItem"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "ScheduleTrack_slug_key" ON "public"."ScheduleTrack"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "ScheduleSession_slug_key" ON "public"."ScheduleSession"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "SeatingObject_slug_key" ON "public"."SeatingObject"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "SeatingCanvas_slug_key" ON "public"."SeatingCanvas"("slug");

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
ALTER TABLE "public"."SeatingObject" ADD CONSTRAINT "SeatingObject_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "public"."Module"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."SeatingObject" ADD CONSTRAINT "SeatingObject_guestGroupId_fkey" FOREIGN KEY ("guestGroupId") REFERENCES "public"."GuestGroup"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."SeatingObject" ADD CONSTRAINT "SeatingObject_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "public"."SeatingObject"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."SeatingObject" ADD CONSTRAINT "SeatingObject_guestListId_fkey" FOREIGN KEY ("guestListId") REFERENCES "public"."GuestList"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."SeatingCanvas" ADD CONSTRAINT "SeatingCanvas_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "public"."Module"("id") ON DELETE CASCADE ON UPDATE CASCADE;
