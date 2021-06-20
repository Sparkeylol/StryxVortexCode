-- CreateTable
CREATE TABLE "logs" (
    "id" SERIAL NOT NULL,
    "guildId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "text" TEXT NOT NULL,

    PRIMARY KEY ("id")
);
