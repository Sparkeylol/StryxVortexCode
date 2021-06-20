-- CreateTable
CREATE TABLE "partners" (
    "id" SERIAL NOT NULL,
    "reps" TEXT[],
    "robloxId" TEXT NOT NULL,
    "discord" TEXT NOT NULL,

    PRIMARY KEY ("id")
);
