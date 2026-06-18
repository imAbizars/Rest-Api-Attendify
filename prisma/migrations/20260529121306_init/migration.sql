/*
  Warnings:

  - You are about to drop the column `tanggal` on the `Izin` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Izin" DROP COLUMN "tanggal",
ADD COLUMN     "selesaiIzin" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "tanggalIzin" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
