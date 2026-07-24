/*
  Warnings:

  - A unique constraint covering the columns `[kodeLokasi]` on the table `Lokasi` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `kodeLokasi` to the `Lokasi` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Lokasi" ADD COLUMN     "kodeLokasi" TEXT ;
UPDATE "Lokasi" SET "kodeLokasi" = 'LKS-' || "id" WHERE "kodeLokasi" IS NULL;
ALTER TABLE "Lokasi" ALTER COLUMN "kodeLokasi" SET NOT NULL;
-- CreateIndex
CREATE UNIQUE INDEX "Lokasi_kodeLokasi_key" ON "Lokasi"("kodeLokasi");
