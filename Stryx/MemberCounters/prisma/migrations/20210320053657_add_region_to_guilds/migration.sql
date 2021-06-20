/*
  Warnings:

  - You are about to drop the column `container` on the `guilds` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "guilds.container_unique";

-- AlterTable
ALTER TABLE "guilds" DROP COLUMN "container",
ADD COLUMN     "region" TEXT NOT NULL DEFAULT E'BHS-1';
