-- CreateTable
CREATE TABLE "economy" (
    "id" SERIAL NOT NULL,
    "guildId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "cash" INTEGER NOT NULL,
    "bank" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);
