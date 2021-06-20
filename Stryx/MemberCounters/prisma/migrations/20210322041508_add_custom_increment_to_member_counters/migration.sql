/*
  Warnings:

  - Added the required column `increment` to the `memberCounters` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "memberCounters" ADD COLUMN     "increment" INTEGER NOT NULL;
