-- CreateEnum
CREATE TYPE "public"."SkillLevel" AS ENUM ('ALL', 'BEGINNER', 'INTERMEDIATE', 'ADVANCED');

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

-- CreateIndex
CREATE UNIQUE INDEX "ScheduleSession_slug_key" ON "public"."ScheduleSession"("slug");

-- AddForeignKey
ALTER TABLE "public"."ScheduleSession" ADD CONSTRAINT "ScheduleSession_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "public"."Module"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ScheduleSession" ADD CONSTRAINT "ScheduleSession_scheduleTrackId_fkey" FOREIGN KEY ("scheduleTrackId") REFERENCES "public"."ScheduleTrack"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ScheduleSession" ADD CONSTRAINT "ScheduleSession_scheduleDayId_fkey" FOREIGN KEY ("scheduleDayId") REFERENCES "public"."ScheduleDay"("id") ON DELETE SET NULL ON UPDATE CASCADE;
