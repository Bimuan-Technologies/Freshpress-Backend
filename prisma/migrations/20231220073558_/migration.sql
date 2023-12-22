/*
  Warnings:

  - The primary key for the `Location` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `cityTownName` on the `Location` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `Location` table. All the data in the column will be lost.
  - You are about to drop the `Person` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "ClientType" AS ENUM ('WEB', 'MOBILE', 'API', 'IOT');

-- CreateEnum
CREATE TYPE "LogType" AS ENUM ('REQUEST', 'BEHAVOURIAL');

-- CreateEnum
CREATE TYPE "PaymentDirection" AS ENUM ('CREDIT', 'DEBIT');

-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('BULK_TRANSFER', 'BILL_PAYMENT', 'FOREIGN_TRANSFER', 'SINGLE_TRANSFER', 'AIRTIME_TOPUP', 'QR_PAYMENT', 'PAYMENT_LINK', 'MOBILE_POS', 'USSD');

-- CreateEnum
CREATE TYPE "TransactionStatus" AS ENUM ('SUCCESS', 'FAILED', 'PENDING');

-- CreateEnum
CREATE TYPE "AddressVerificationStatus" AS ENUM ('SUCCESS', 'FAILED', 'PENDING');

-- CreateEnum
CREATE TYPE "AddressVerificationType" AS ENUM ('Physical', 'Digital');

-- CreateEnum
CREATE TYPE "ProfileSetupProgress" AS ENUM ('REGISTERED', 'PROFILE_SETUP', 'PROFILE_SETUP_AWAITING_OTP', 'LIVENESS_VERIFIED', 'PROFILE_SETUP_COMPLETED', 'ACCOUNT_CREATED', 'AWAITING_ACCOUNT_NUMBER', 'ACCOUNT_NUMBER_RETRIEVED');

-- CreateEnum
CREATE TYPE "DocumentType" AS ENUM ('v_nin', 'bvn', 'tin', 'cac');

-- CreateEnum
CREATE TYPE "document_verification_status" AS ENUM ('PENDING', 'FAILED', 'SUCCESS');

-- DropForeignKey
ALTER TABLE "Location" DROP CONSTRAINT "Location_personId_fkey";

-- AlterTable
ALTER TABLE "Location" DROP CONSTRAINT "Location_pkey",
DROP COLUMN "cityTownName",
DROP COLUMN "id",
ADD COLUMN     "city" TEXT,
ADD COLUMN     "pk" SERIAL NOT NULL,
ALTER COLUMN "streetName" DROP NOT NULL,
ALTER COLUMN "streetName" DROP DEFAULT,
ALTER COLUMN "lga" DROP NOT NULL,
ALTER COLUMN "lga" DROP DEFAULT,
ALTER COLUMN "state" DROP NOT NULL,
ALTER COLUMN "state" DROP DEFAULT,
ADD CONSTRAINT "Location_pkey" PRIMARY KEY ("pk");

-- DropTable
DROP TABLE "Person";

-- CreateTable
CREATE TABLE "audit_log" (
    "pk" SERIAL NOT NULL,
    "log_id" UUID NOT NULL,
    "origin" TEXT,
    "user_id" TEXT,
    "user_email" TEXT,
    "user_agent" TEXT,
    "is_bot" BOOLEAN,
    "client_type" "ClientType",
    "client_ip" TEXT,
    "server_ip" TEXT,
    "server_mac_address" TEXT,
    "endpoint" TEXT,
    "operation_description" TEXT,
    "input_data" TEXT,
    "response" TEXT,
    "meta" JSONB,
    "external_id" TEXT,
    "log_type" "LogType" NOT NULL DEFAULT 'BEHAVOURIAL',
    "date" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "audit_log_pkey" PRIMARY KEY ("pk")
);

-- CreateTable
CREATE TABLE "persons" (
    "pk" SERIAL NOT NULL,
    "person_id" TEXT NOT NULL,
    "password" TEXT,
    "email" TEXT,
    "phone_number" TEXT,
    "has_verified_email" BOOLEAN DEFAULT false,
    "is_blocked" BOOLEAN DEFAULT false,
    "is_locked" BOOLEAN DEFAULT false,
    "locked_reason" TEXT,
    "locked_at" TIMESTAMP(3),
    "password_fail_counter" INTEGER DEFAULT 0,
    "isKYCDone" BOOLEAN NOT NULL DEFAULT false,
    "subscription" "Subscription" NOT NULL DEFAULT 'FREE',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "persons_pkey" PRIMARY KEY ("pk")
);

-- CreateTable
CREATE TABLE "profiles" (
    "pk" SERIAL NOT NULL,
    "profile_id" TEXT NOT NULL,
    "preferred_name" TEXT,
    "first_name" TEXT,
    "last_name" TEXT,
    "other_name" TEXT,
    "email" TEXT,
    "phone_number" TEXT,
    "gender" "Gender",
    "profile_img" TEXT,
    "date_of_birth" TIMESTAMP(3),
    "businessName" TEXT,
    "hasRegisteredBusiness" BOOLEAN DEFAULT false,
    "is_upgraded_account" BOOLEAN DEFAULT false,
    "hasSetTransactionPin" BOOLEAN DEFAULT false,
    "nationality" TEXT,
    "transactionPin" TEXT,
    "role" "PersonRole" NOT NULL DEFAULT 'CUSTOMER',
    "referee_code" TEXT,
    "referral_code" TEXT,
    "person_pk" INTEGER NOT NULL,
    "person_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "has_submited_documents_for_review" BOOLEAN,
    "accepted_terms_and_Conditions" BOOLEAN DEFAULT true,

    CONSTRAINT "profiles_pkey" PRIMARY KEY ("pk")
);

-- CreateTable
CREATE TABLE "bank_accounts" (
    "pk" SERIAL NOT NULL,
    "account_id" TEXT NOT NULL,
    "account_number" TEXT,
    "account_balance" TEXT,
    "account_name" TEXT,
    "customer_id" TEXT,
    "account_limit" INTEGER DEFAULT 1000000,
    "currency" TEXT NOT NULL,
    "reference" TEXT,
    "is_primary_account" BOOLEAN NOT NULL DEFAULT false,
    "profile_pk" INTEGER,
    "profile_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "bank_accounts_pkey" PRIMARY KEY ("pk")
);

-- CreateTable
CREATE TABLE "address_verifications" (
    "pk" SERIAL NOT NULL,
    "verification_id" TEXT NOT NULL,
    "verification_status" "AddressVerificationStatus" NOT NULL DEFAULT 'PENDING',
    "verification_type" "AddressVerificationType" NOT NULL,
    "gps_coordinates" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "images" TEXT[],
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "profile_pk" INTEGER NOT NULL,
    "profile_id" TEXT NOT NULL,

    CONSTRAINT "address_verifications_pkey" PRIMARY KEY ("pk")
);

-- CreateTable
CREATE TABLE "transactions" (
    "pk" SERIAL NOT NULL,
    "transcation_id" TEXT NOT NULL,
    "transaction_amount" TEXT NOT NULL,
    "transaction_status" "TransactionStatus" DEFAULT 'PENDING',
    "transcation_type" "TransactionType" NOT NULL,
    "payment_direction" "PaymentDirection" NOT NULL DEFAULT 'DEBIT',
    "reasonForFailure" TEXT,
    "transaction_date" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "transcation_ref" TEXT,
    "is_ecobank_to_ecobank_transaction" BOOLEAN DEFAULT false,
    "biller_code" TEXT,
    "biller_Id" TEXT,
    "biller_payment_ref" TEXT,
    "product_code" TEXT,
    "currency" TEXT NOT NULL,
    "transaction_title" TEXT,
    "narration" TEXT,
    "bulk_payment_group_id" TEXT,
    "ussd_reference_code" TEXT,
    "qr_code_base64" TEXT,
    "source_account_pk" INTEGER NOT NULL,
    "source_account_id" TEXT NOT NULL,
    "receiver" TEXT,
    "sender" TEXT,
    "senders_bank" TEXT,
    "senders_bank_code" TEXT,
    "senders_account_number" TEXT,
    "senders_phone_number" TEXT,
    "destination_bank" TEXT,
    "destination_bank_code" TEXT,
    "destination_account_number" TEXT,
    "profile_pk" INTEGER,
    "profile_id" TEXT,

    CONSTRAINT "transactions_pkey" PRIMARY KEY ("pk")
);

-- CreateTable
CREATE TABLE "dispute_records" (
    "pk" SERIAL NOT NULL,
    "id" TEXT NOT NULL,
    "case_id" TEXT NOT NULL,
    "case_log" TEXT NOT NULL,
    "case_type" TEXT,
    "case_category" TEXT,
    "case_sub_category" TEXT,
    "description" TEXT,
    "profile_pk" INTEGER NOT NULL,
    "profile_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "dispute_records_pkey" PRIMARY KEY ("pk")
);

-- CreateIndex
CREATE UNIQUE INDEX "audit_log_log_id_key" ON "audit_log"("log_id");

-- CreateIndex
CREATE UNIQUE INDEX "persons_person_id_key" ON "persons"("person_id");

-- CreateIndex
CREATE UNIQUE INDEX "persons_email_key" ON "persons"("email");

-- CreateIndex
CREATE UNIQUE INDEX "persons_phone_number_key" ON "persons"("phone_number");

-- CreateIndex
CREATE UNIQUE INDEX "persons_pk_person_id_key" ON "persons"("pk", "person_id");

-- CreateIndex
CREATE UNIQUE INDEX "profiles_profile_id_key" ON "profiles"("profile_id");

-- CreateIndex
CREATE UNIQUE INDEX "profiles_email_key" ON "profiles"("email");

-- CreateIndex
CREATE UNIQUE INDEX "profiles_phone_number_key" ON "profiles"("phone_number");

-- CreateIndex
CREATE UNIQUE INDEX "profiles_referral_code_key" ON "profiles"("referral_code");

-- CreateIndex
CREATE UNIQUE INDEX "profiles_person_pk_person_id_key" ON "profiles"("person_pk", "person_id");

-- CreateIndex
CREATE UNIQUE INDEX "profiles_pk_profile_id_key" ON "profiles"("pk", "profile_id");

-- CreateIndex
CREATE UNIQUE INDEX "bank_accounts_account_id_key" ON "bank_accounts"("account_id");

-- CreateIndex
CREATE UNIQUE INDEX "bank_accounts_account_number_key" ON "bank_accounts"("account_number");

-- CreateIndex
CREATE UNIQUE INDEX "bank_accounts_pk_account_id_key" ON "bank_accounts"("pk", "account_id");

-- CreateIndex
CREATE UNIQUE INDEX "address_verifications_verification_id_key" ON "address_verifications"("verification_id");

-- CreateIndex
CREATE UNIQUE INDEX "transactions_transcation_id_key" ON "transactions"("transcation_id");

-- CreateIndex
CREATE UNIQUE INDEX "dispute_records_id_key" ON "dispute_records"("id");

-- AddForeignKey
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_person_pk_person_id_fkey" FOREIGN KEY ("person_pk", "person_id") REFERENCES "persons"("pk", "person_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_personId_fkey" FOREIGN KEY ("personId") REFERENCES "profiles"("pk") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bank_accounts" ADD CONSTRAINT "bank_accounts_profile_pk_profile_id_fkey" FOREIGN KEY ("profile_pk", "profile_id") REFERENCES "profiles"("pk", "profile_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "address_verifications" ADD CONSTRAINT "address_verifications_profile_pk_profile_id_fkey" FOREIGN KEY ("profile_pk", "profile_id") REFERENCES "profiles"("pk", "profile_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_profile_pk_profile_id_fkey" FOREIGN KEY ("profile_pk", "profile_id") REFERENCES "profiles"("pk", "profile_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dispute_records" ADD CONSTRAINT "dispute_records_profile_pk_profile_id_fkey" FOREIGN KEY ("profile_pk", "profile_id") REFERENCES "profiles"("pk", "profile_id") ON DELETE RESTRICT ON UPDATE CASCADE;
