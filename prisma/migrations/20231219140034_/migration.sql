-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'OTHER');

-- CreateEnum
CREATE TYPE "PersonRole" AS ENUM ('CUSTOMER', 'MERCHANT', 'ADMIN');

-- CreateEnum
CREATE TYPE "Subscription" AS ENUM ('FREE', 'BASIC', 'PRO');

-- CreateTable
CREATE TABLE "Person" (
    "id" SERIAL NOT NULL,
    "username" TEXT,
    "password" TEXT,
    "firstName" TEXT,
    "lastName" TEXT,
    "email" TEXT,
    "phoneNumber" TEXT,
    "gender" "Gender",
    "profileImage" TEXT,
    "isSuspended" BOOLEAN NOT NULL DEFAULT false,
    "isKYCDone" BOOLEAN NOT NULL DEFAULT false,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "role" "PersonRole" NOT NULL DEFAULT 'CUSTOMER',
    "subscription" "Subscription" NOT NULL DEFAULT 'FREE',
    "imei" TEXT,
    "businessName" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Person_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Location" (
    "id" SERIAL NOT NULL,
    "shopNo" TEXT,
    "edificeNo" TEXT,
    "streetName" TEXT NOT NULL DEFAULT '',
    "cityTownName" TEXT NOT NULL DEFAULT '',
    "lga" TEXT NOT NULL DEFAULT '',
    "state" TEXT NOT NULL DEFAULT '',
    "zipCode" TEXT,
    "personId" INTEGER NOT NULL,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Person_username_key" ON "Person"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Person_email_key" ON "Person"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Person_phoneNumber_key" ON "Person"("phoneNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Location_personId_key" ON "Location"("personId");

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
