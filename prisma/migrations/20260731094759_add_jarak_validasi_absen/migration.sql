-- AlterTable
ALTER TABLE "Absen" ADD COLUMN     "jarak" DOUBLE PRECISION,
ADD COLUMN     "validasiLokasi" BOOLEAN NOT NULL DEFAULT false;
