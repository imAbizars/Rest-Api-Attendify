-- CreateEnum
CREATE TYPE "StatusAbsen" AS ENUM ('HADIR', 'IZIN', 'SAKIT');

-- CreateTable
CREATE TABLE "Absen" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "tanggal" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "jamMasuk" TIMESTAMP(3),
    "jamKeluar" TIMESTAMP(3),
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "status" "StatusAbsen" NOT NULL DEFAULT 'HADIR',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Absen_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Absen" ADD CONSTRAINT "Absen_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
