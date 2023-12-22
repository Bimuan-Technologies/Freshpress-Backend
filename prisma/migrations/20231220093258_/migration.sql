/*
  Warnings:

  - You are about to drop the column `password` on the `persons` table. All the data in the column will be lost.
  - Added the required column `hash` to the `persons` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "persons" DROP COLUMN "password",
ADD COLUMN     "hash" TEXT NOT NULL,
ADD COLUMN     "hashedRt" TEXT;
