/*
  Warnings:

  - The values [Diterima,DalamProses] on the enum `StatusIzin` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "StatusIzin_new" AS ENUM ('Disetujui', 'Ditolak', 'Diproses');
ALTER TABLE "Izin" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Izin" ALTER COLUMN "status" TYPE "StatusIzin_new" USING ("status"::text::"StatusIzin_new");
ALTER TYPE "StatusIzin" RENAME TO "StatusIzin_old";
ALTER TYPE "StatusIzin_new" RENAME TO "StatusIzin";
DROP TYPE "StatusIzin_old";
ALTER TABLE "Izin" ALTER COLUMN "status" SET DEFAULT 'Diproses';
COMMIT;

-- AlterTable
ALTER TABLE "Izin" ALTER COLUMN "status" SET DEFAULT 'Diproses';
