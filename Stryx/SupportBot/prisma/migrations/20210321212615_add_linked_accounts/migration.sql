-- CreateTable
CREATE TABLE "linkedAccounts" (
    "id" SERIAL NOT NULL,
    "robloxId" TEXT NOT NULL,
    "discordId" TEXT NOT NULL,
    "previousRoles" JSONB[],

    PRIMARY KEY ("id")
);
