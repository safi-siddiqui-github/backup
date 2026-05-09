-- CreateEnum
CREATE TYPE "EventVisibility" AS ENUM ('PUBLIC', 'PRIVATE', 'ORGANIZATION');

-- CreateEnum
CREATE TYPE "EventDateType" AS ENUM ('SINGLE', 'RECURRING');

-- CreateEnum
CREATE TYPE "EventRecurringPattern" AS ENUM ('DAILY', 'WEEKLY', 'MONTHLY', 'YEARLY');

-- CreateEnum
CREATE TYPE "EventRecurringEnd" AS ENUM ('NEVER', 'DATE', 'OCCURRENCES');

-- CreateEnum
CREATE TYPE "EventAgeRestriction" AS ENUM ('ALL', 'FAMILY', 'KIDS', 'TEENS', 'ADULTS', 'ADULTS21');

-- CreateEnum
CREATE TYPE "EventVenueType" AS ENUM ('PHYSICAL', 'VIRTUAL', 'HYBRID');

-- CreateEnum
CREATE TYPE "EventFeatureType" AS ENUM ('NONE', 'SINGLE_WEEK', 'EVERY_WEEK');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT,
    "username" TEXT,
    "firstname" TEXT,
    "lastname" TEXT,
    "password" TEXT,
    "countryCode" TEXT,
    "phone" TEXT,
    "agreedTerms" BOOLEAN,
    "avatar" TEXT,
    "googleId" TEXT,
    "microsoftId" TEXT,
    "facebookId" TEXT,
    "linkedinId" TEXT,
    "appleId" TEXT,
    "emailVerified" BOOLEAN,
    "phoneVerified" BOOLEAN,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OTP" (
    "id" SERIAL NOT NULL,
    "code" INTEGER,
    "expiresAt" TIMESTAMP(3),
    "userId" INTEGER,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "OTP_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Token" (
    "id" SERIAL NOT NULL,
    "encrypted" TEXT,
    "expiresAt" TIMESTAMP(3),
    "isAdmin" BOOLEAN,
    "emailVerified" BOOLEAN,
    "phoneVerified" BOOLEAN,
    "userId" INTEGER,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Token_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventModel" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "slug" TEXT,
    "step" INTEGER,
    "visibility" "EventVisibility" NOT NULL DEFAULT 'PUBLIC',
    "description" TEXT,
    "ageRestriction" "EventAgeRestriction" NOT NULL,
    "userId" INTEGER,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "EventModel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventDay" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "slug" TEXT,
    "eventDateType" "EventDateType",
    "eventDate" TIMESTAMP(3),
    "timezone" TEXT,
    "startTime" TEXT,
    "endTime" TEXT,
    "eventRecurringPattern" "EventRecurringPattern",
    "eventRecurringEnd" "EventRecurringEnd",
    "recurringEndDate" TIMESTAMP(3),
    "recurringEndOccurrences" INTEGER,
    "eventModelId" INTEGER,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "EventDay_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventVenue" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "slug" TEXT,
    "address" TEXT,
    "placeId" TEXT,
    "latitude" DECIMAL(65,30),
    "longitude" DECIMAL(65,30),
    "virtualLink" TEXT,
    "virtualLinkPass" TEXT,
    "venueType" "EventVenueType" NOT NULL DEFAULT 'PHYSICAL',
    "eventModelId" INTEGER,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "EventVenue_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventCategory" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "slug" TEXT,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "EventCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventAsset" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "slug" TEXT,
    "type" TEXT,
    "description" TEXT,
    "size" INTEGER,
    "url" TEXT,
    "eventModelId" INTEGER,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "EventAsset_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventModule" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "slug" TEXT,
    "description" TEXT,
    "price" INTEGER,
    "optionOne" TEXT,
    "optionTwo" TEXT,
    "optionThree" TEXT,
    "parentId" INTEGER,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "EventModule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventModuleActivation" (
    "id" SERIAL NOT NULL,
    "eventModelId" INTEGER,
    "eventModuleId" INTEGER,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "EventModuleActivation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventFeature" (
    "id" SERIAL NOT NULL,
    "eventModelId" INTEGER,
    "featureType" "EventFeatureType" NOT NULL,
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "price" INTEGER,
    "nextBillingDate" TIMESTAMP(3),
    "autoRenew" BOOLEAN,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "EventFeature_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventGuest" (
    "id" SERIAL NOT NULL,
    "slug" TEXT,
    "name" TEXT,
    "role" TEXT,
    "description" TEXT,
    "linkedInUrl" TEXT,
    "twitterUrl" TEXT,
    "websiteUrl" TEXT,
    "eventModelId" INTEGER,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "EventGuest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventFaq" (
    "id" SERIAL NOT NULL,
    "slug" TEXT,
    "question" TEXT,
    "answer" TEXT,
    "eventModelId" INTEGER,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "EventFaq_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_EventCategoryToEventModel" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_EventCategoryToEventModel_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "OTP_userId_key" ON "OTP"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "EventModel_slug_key" ON "EventModel"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "EventDay_slug_key" ON "EventDay"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "EventVenue_slug_key" ON "EventVenue"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "EventCategory_slug_key" ON "EventCategory"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "EventAsset_slug_key" ON "EventAsset"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "EventModule_slug_key" ON "EventModule"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "EventGuest_slug_key" ON "EventGuest"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "EventFaq_slug_key" ON "EventFaq"("slug");

-- CreateIndex
CREATE INDEX "_EventCategoryToEventModel_B_index" ON "_EventCategoryToEventModel"("B");

-- AddForeignKey
ALTER TABLE "OTP" ADD CONSTRAINT "OTP_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Token" ADD CONSTRAINT "Token_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventModel" ADD CONSTRAINT "EventModel_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventDay" ADD CONSTRAINT "EventDay_eventModelId_fkey" FOREIGN KEY ("eventModelId") REFERENCES "EventModel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventVenue" ADD CONSTRAINT "EventVenue_eventModelId_fkey" FOREIGN KEY ("eventModelId") REFERENCES "EventModel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventAsset" ADD CONSTRAINT "EventAsset_eventModelId_fkey" FOREIGN KEY ("eventModelId") REFERENCES "EventModel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventModule" ADD CONSTRAINT "EventModule_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "EventModule"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventModuleActivation" ADD CONSTRAINT "EventModuleActivation_eventModelId_fkey" FOREIGN KEY ("eventModelId") REFERENCES "EventModel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventModuleActivation" ADD CONSTRAINT "EventModuleActivation_eventModuleId_fkey" FOREIGN KEY ("eventModuleId") REFERENCES "EventModule"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventFeature" ADD CONSTRAINT "EventFeature_eventModelId_fkey" FOREIGN KEY ("eventModelId") REFERENCES "EventModel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventGuest" ADD CONSTRAINT "EventGuest_eventModelId_fkey" FOREIGN KEY ("eventModelId") REFERENCES "EventModel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventFaq" ADD CONSTRAINT "EventFaq_eventModelId_fkey" FOREIGN KEY ("eventModelId") REFERENCES "EventModel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventCategoryToEventModel" ADD CONSTRAINT "_EventCategoryToEventModel_A_fkey" FOREIGN KEY ("A") REFERENCES "EventCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventCategoryToEventModel" ADD CONSTRAINT "_EventCategoryToEventModel_B_fkey" FOREIGN KEY ("B") REFERENCES "EventModel"("id") ON DELETE CASCADE ON UPDATE CASCADE;
