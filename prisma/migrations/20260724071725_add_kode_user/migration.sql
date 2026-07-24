/*
  Warnings:

  - A unique constraint covering the columns `[kodeUser]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `kodeUser` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- 1. Tambah kolom dulu sebagai nullable (belum ada constraint)
ALTER TABLE "User" ADD COLUMN "kodeUser" TEXT;

-- 2. Backfill data lama pakai id masing-masing, format PGW-{id}
UPDATE "User" SET "kodeUser" = 'PGW-' || "id" WHERE "kodeUser" IS NULL;

-- 3. Baru set jadi NOT NULL
ALTER TABLE "User" ALTER COLUMN "kodeUser" SET NOT NULL;

-- 4. Tambah unique constraint
CREATE UNIQUE INDEX "User_kodeUser_key" ON "User"("kodeUser");
