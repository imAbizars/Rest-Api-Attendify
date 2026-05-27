-- CreateEnum
CREATE TYPE "StatusIzin" AS ENUM ('Diterima', 'Ditolak', 'DalamProses');

-- CreateTable
CREATE TABLE "Izin" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "keterangan" VARCHAR(255) NOT NULL,
    "tanggal" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "status" "StatusIzin" NOT NULL DEFAULT 'Diterima',

    CONSTRAINT "Izin_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Izin" ADD CONSTRAINT "Izin_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
