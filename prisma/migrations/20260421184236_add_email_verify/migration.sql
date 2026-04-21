-- CreateTable
CREATE TABLE "emailVerification" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "email" TEXT NOT NULL,
    "code" INTEGER NOT NULL,

    CONSTRAINT "emailVerification_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "emailVerification_email_key" ON "emailVerification"("email");
