-- CreateTable
CREATE TABLE "memberCounters" (
    "id" SERIAL NOT NULL,
    "ownerId" TEXT NOT NULL,
    "isEmbed" BOOLEAN NOT NULL DEFAULT false,
    "template" JSONB NOT NULL,
    "goal" INTEGER NOT NULL,
    "current" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);
