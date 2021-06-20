/*
  Warnings:

  - Added the required column `moderator` to the `blacklist` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reason` to the `blacklist` table without a default value. This is not possible if the table is not empty.
  - Added the required column `appealStatus` to the `blacklist` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expirationDate` to the `blacklist` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dateIssued` to the `blacklist` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `blacklist` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "blacklist" ADD COLUMN     "moderator" TEXT NOT NULL,
ADD COLUMN     "reason" TEXT NOT NULL,
ADD COLUMN     "appealStatus" TEXT NOT NULL,
ADD COLUMN     "expirationDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "dateIssued" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "type" TEXT NOT NULL;
