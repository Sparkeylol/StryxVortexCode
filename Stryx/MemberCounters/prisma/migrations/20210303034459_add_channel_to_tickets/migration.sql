/*
  Warnings:

  - Added the required column `channel` to the `tickets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tickets" ADD COLUMN     "channel" TEXT NOT NULL;
