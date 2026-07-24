-- CreateTable
CREATE TABLE "Lokasi" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longtitude" DOUBLE PRECISION NOT NULL,
    "radius" INTEGER NOT NULL,

    CONSTRAINT "Lokasi_pkey" PRIMARY KEY ("id")
);
