/*
  Warnings:

  - You are about to drop the column `photo` on the `Absen` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Absen" DROP COLUMN "photo";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "photo" TEXT;
