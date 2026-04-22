-- CreateEnum
CREATE TYPE "ResponseStatus" AS ENUM ('GOING', 'NOT_GOING', 'MAYBE', 'READ_NOT_ANSWERED', 'NOT_READ');

-- CreateTable
CREATE TABLE "events" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "location" VARCHAR(255) NOT NULL,
    "locationOptions" TEXT[],
    "date" TIMESTAMP(3) NOT NULL,
    "dateOptions" TIMESTAMP(3)[],
    "tags" TEXT NOT NULL DEFAULT '',
    "creatorId" UUID NOT NULL,

    CONSTRAINT "events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "eventResponses" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "eventId" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "status" "ResponseStatus" NOT NULL DEFAULT 'NOT_READ',

    CONSTRAINT "eventResponses_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "eventResponses" ADD CONSTRAINT "eventResponses_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "eventResponses" ADD CONSTRAINT "eventResponses_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
