/*
  Warnings:

  - The values [MERCHANT] on the enum `PersonRole` will be removed. If these variants are still used in the database, this will fail.
  - The values [PRO] on the enum `Subscription` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `hasSetTransactionPin` on the `profiles` table. All the data in the column will be lost.
  - You are about to drop the `Location` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `bank_accounts` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "PersonRole_new" AS ENUM ('CUSTOMER', 'SERVICE_PROVIDER', 'ADMIN');
ALTER TABLE "profiles" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "profiles" ALTER COLUMN "role" TYPE "PersonRole_new" USING ("role"::text::"PersonRole_new");
ALTER TYPE "PersonRole" RENAME TO "PersonRole_old";
ALTER TYPE "PersonRole_new" RENAME TO "PersonRole";
DROP TYPE "PersonRole_old";
ALTER TABLE "profiles" ALTER COLUMN "role" SET DEFAULT 'CUSTOMER';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "Subscription_new" AS ENUM ('FREE', 'BASIC', 'PREMIUM');
ALTER TABLE "persons" ALTER COLUMN "subscription" DROP DEFAULT;
ALTER TABLE "persons" ALTER COLUMN "subscription" TYPE "Subscription_new" USING ("subscription"::text::"Subscription_new");
ALTER TYPE "Subscription" RENAME TO "Subscription_old";
ALTER TYPE "Subscription_new" RENAME TO "Subscription";
DROP TYPE "Subscription_old";
ALTER TABLE "persons" ALTER COLUMN "subscription" SET DEFAULT 'FREE';
COMMIT;

-- DropForeignKey
ALTER TABLE "Location" DROP CONSTRAINT "Location_personId_fkey";

-- DropForeignKey
ALTER TABLE "bank_accounts" DROP CONSTRAINT "bank_accounts_profile_pk_profile_id_fkey";

-- DropForeignKey
ALTER TABLE "transactions" DROP CONSTRAINT "transactions_profile_pk_profile_id_fkey";

-- AlterTable
ALTER TABLE "profiles" DROP COLUMN "hasSetTransactionPin",
ADD COLUMN     "bio" TEXT;

-- DropTable
DROP TABLE "Location";

-- DropTable
DROP TABLE "bank_accounts";

-- CreateTable
CREATE TABLE "app_settings" (
    "id" SERIAL NOT NULL,
    "settingKey" TEXT NOT NULL,
    "settingValue" TEXT,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "app_settings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "locations" (
    "pk" SERIAL NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "shopNo" TEXT,
    "edificeNo" TEXT,
    "streetName" TEXT,
    "city" TEXT,
    "lga" TEXT,
    "state" TEXT,
    "zipCode" TEXT,
    "personId" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "locations_pkey" PRIMARY KEY ("pk")
);

-- CreateTable
CREATE TABLE "laundry_services" (
    "pk" SERIAL NOT NULL,
    "personId" INTEGER NOT NULL,
    "serviceName" TEXT NOT NULL,
    "description" TEXT,
    "rating" DOUBLE PRECISION,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "laundry_services_pkey" PRIMARY KEY ("pk")
);

-- CreateTable
CREATE TABLE "service_requests" (
    "pk" SERIAL NOT NULL,
    "customer_id" TEXT NOT NULL,
    "provider_id" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "scheduledAt" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "service_requests_pkey" PRIMARY KEY ("pk")
);

-- CreateTable
CREATE TABLE "reviews" (
    "pk" SERIAL NOT NULL,
    "customer_id" TEXT NOT NULL,
    "provider_id" TEXT NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL,
    "comment" TEXT,
    "profile_pk" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "reviews_pkey" PRIMARY KEY ("pk")
);

-- CreateTable
CREATE TABLE "_ProfileToReview" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "app_settings_settingKey_key" ON "app_settings"("settingKey");

-- CreateIndex
CREATE UNIQUE INDEX "locations_personId_key" ON "locations"("personId");

-- CreateIndex
CREATE UNIQUE INDEX "laundry_services_personId_key" ON "laundry_services"("personId");

-- CreateIndex
CREATE UNIQUE INDEX "_ProfileToReview_AB_unique" ON "_ProfileToReview"("A", "B");

-- CreateIndex
CREATE INDEX "_ProfileToReview_B_index" ON "_ProfileToReview"("B");

-- AddForeignKey
ALTER TABLE "locations" ADD CONSTRAINT "locations_personId_fkey" FOREIGN KEY ("personId") REFERENCES "profiles"("pk") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "laundry_services" ADD CONSTRAINT "laundry_services_personId_fkey" FOREIGN KEY ("personId") REFERENCES "profiles"("pk") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProfileToReview" ADD CONSTRAINT "_ProfileToReview_A_fkey" FOREIGN KEY ("A") REFERENCES "profiles"("pk") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProfileToReview" ADD CONSTRAINT "_ProfileToReview_B_fkey" FOREIGN KEY ("B") REFERENCES "reviews"("pk") ON DELETE CASCADE ON UPDATE CASCADE;
