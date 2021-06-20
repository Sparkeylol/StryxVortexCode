/*
  Warnings:

  - Added the required column `groupId` to the `memberCounters` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "memberCounters" ADD COLUMN     "groupId" TEXT NOT NULL;
