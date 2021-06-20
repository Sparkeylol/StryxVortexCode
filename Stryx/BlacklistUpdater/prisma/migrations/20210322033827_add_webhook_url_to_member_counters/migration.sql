/*
  Warnings:

  - Added the required column `webhookUrl` to the `memberCounters` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "memberCounters" ADD COLUMN     "webhookUrl" TEXT NOT NULL;
