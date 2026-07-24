/*
  Warnings:

  - A unique constraint covering the columns `[kodeIzin]` on the table `Izin` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `kodeIzin` to the `Izin` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Izin" ADD COLUMN     "kodeIzin" TEXT;
UPDATE "Izin" SET "kodeIzin" = 'IZN-' || "id" WHERE "kodeIzin" IS NULL;
ALTER TABLE "Izin" ALTER COLUMN "kodeIzin" SET NOT NULL;
-- CreateIndex
CREATE UNIQUE INDEX "Izin_kodeIzin_key" ON "Izin"("kodeIzin");
