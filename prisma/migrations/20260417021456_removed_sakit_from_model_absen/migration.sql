/*
  Warnings:

  - The values [SAKIT] on the enum `StatusAbsen` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "StatusAbsen_new" AS ENUM ('HADIR', 'IZIN', 'TERLAMBAT');
ALTER TABLE "Absen" ALTER COLUMN "statusAbsen" DROP DEFAULT;
ALTER TABLE "Absen" ALTER COLUMN "statusAbsen" TYPE "StatusAbsen_new" USING ("statusAbsen"::text::"StatusAbsen_new");
ALTER TYPE "StatusAbsen" RENAME TO "StatusAbsen_old";
ALTER TYPE "StatusAbsen_new" RENAME TO "StatusAbsen";
DROP TYPE "StatusAbsen_old";
ALTER TABLE "Absen" ALTER COLUMN "statusAbsen" SET DEFAULT 'HADIR';
COMMIT;
