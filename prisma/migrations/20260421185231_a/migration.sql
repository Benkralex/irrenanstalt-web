/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `emailVerification` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "emailVerification_code_key" ON "emailVerification"("code");
