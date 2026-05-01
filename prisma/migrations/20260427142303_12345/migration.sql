/*
  Warnings:

  - You are about to drop the column `secondFactorSecret` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "secondFactorSecret",
ADD COLUMN     "otpSecret" VARCHAR(255),
ADD COLUMN     "otpVerified" BOOLEAN NOT NULL DEFAULT false;
