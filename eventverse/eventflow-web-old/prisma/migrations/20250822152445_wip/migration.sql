/*
  Warnings:

  - The values [CUSTOM] on the enum `Timezone` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "public"."Timezone_new" AS ENUM ('NONE', 'UTC', 'EASTERN', 'CENTRAL', 'MOUNTAIN', 'PACIFIC', 'ALASKA', 'HAWAII', 'ARGENTINA', 'BRAZIL', 'CHILE', 'LONDON', 'DUBLIN', 'LISBON', 'PARIS', 'BERLIN', 'ROME', 'MADRID', 'AMSTERDAM', 'VIENNA', 'STOCKHOLM', 'OSLO', 'COPENHAGEN', 'HELSINKI', 'ISTANBUL', 'ATHENS', 'MOSCOW', 'LAGOS', 'JOHANNESBURG', 'NAIROBI', 'CAIRO', 'CASABLANCA', 'DUBAI', 'RIYADH', 'TEHRAN', 'JERUSALEM', 'KARACHI', 'DELHI', 'COLOMBO', 'DHAKA', 'BANGKOK', 'SINGAPORE', 'HONGKONG', 'TAIPEI', 'TOKYO', 'SEOUL', 'BEIJING', 'SYDNEY', 'MELBOURNE', 'AUCKLAND', 'FIJI');
ALTER TABLE "public"."ScheduleItem" ALTER COLUMN "timezone" TYPE "public"."Timezone_new" USING ("timezone"::text::"public"."Timezone_new");
ALTER TABLE "public"."ScheduleSession" ALTER COLUMN "timezone" TYPE "public"."Timezone_new" USING ("timezone"::text::"public"."Timezone_new");
ALTER TYPE "public"."Timezone" RENAME TO "Timezone_old";
ALTER TYPE "public"."Timezone_new" RENAME TO "Timezone";
DROP TYPE "public"."Timezone_old";
COMMIT;
