-- CreateEnum
CREATE TYPE "TokenType" AS ENUM ('EMAIL_VERIFY_OTP', 'PHONE_VERIFY_OTP', 'PASSWORD_RESET_OTP', 'PASSWORD_RESET_SESSION', 'LOGIN_OTP', 'REFRESH_TOKEN');

-- CreateTable
CREATE TABLE "Token" (
    "id" SERIAL NOT NULL,
    "type" "TokenType",
    "sessionId" TEXT,
    "email" TEXT,
    "tokenHash" TEXT,
    "expiresAt" TIMESTAMP(3),
    "attempts" INTEGER,
    "resendCount" INTEGER,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "deviceName" TEXT,
    "lastUsedAt" TIMESTAMP(3),
    "usedAt" TIMESTAMP(3),
    "userId" INTEGER,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Token_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT,
    "username" TEXT,
    "firstname" TEXT,
    "lastname" TEXT,
    "passwordHash" TEXT,
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

-- CreateIndex
CREATE UNIQUE INDEX "Token_sessionId_key" ON "Token"("sessionId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- AddForeignKey
ALTER TABLE "Token" ADD CONSTRAINT "Token_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
