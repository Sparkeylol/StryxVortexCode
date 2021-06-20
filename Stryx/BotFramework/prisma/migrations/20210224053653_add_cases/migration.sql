-- CreateTable
CREATE TABLE "cases" (
    "id" SERIAL NOT NULL,
    "caseId" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "moderator" TEXT NOT NULL,
    "offender" TEXT NOT NULL,
    "type" TEXT NOT NULL,

    PRIMARY KEY ("id")
);
