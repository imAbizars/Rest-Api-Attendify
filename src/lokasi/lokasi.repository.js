const prisma = require("../db/index");

const createLokasi = async ({ nama, latitude, longtitude, radius }) => {
    // kalau ini lokasi pertama, langsung jadikan aktif
    const jumlahLokasi = await prisma.lokasi.count();
    const isFirst = jumlahLokasi === 0;
    return await prisma.$transaction(async (tx) => {
        const newLokasi = await tx.lokasi.create({
            data:{
                kodeLokasi:"TEMP",
                nama,
                latitude,
                longtitude,
                radius,
                isActive:isFirst
            }
        });
        const updatedLokasi = await tx.lokasi.update({
            where: { id: newLokasi.id },
            data: { kodeLokasi: `LKS-${newLokasi.id}` }
        });

        return updatedLokasi;
    })
    
};

const getAllLokasi = async () => {
    return await prisma.lokasi.findMany({
        orderBy: { createdAt: "asc" },
    });
};

const getLokasiAktif = async () => {
    return await prisma.lokasi.findFirst({
        where: { isActive: true },
    });
};

const setLokasiAktif = async (id) => {
    return await prisma.$transaction([
        prisma.lokasi.updateMany({
            data: { isActive: false },
        }),
        prisma.lokasi.update({
            where: { id: Number(id) },
            data: { isActive: true },
        }),
    ]);
};

const updateLokasi = async (id, { nama, latitude, longtitude, radius }) => {
    return await prisma.lokasi.update({
        where: { id: Number(id) },
        data: { nama, latitude, longtitude, radius },
    });
};

const deleteLokasi = async (id) => {
    const lokasi = await prisma.lokasi.findUnique({
        where: { id: Number(id) },
    });

    if (!lokasi) {
        throw new Error("Lokasi tidak ditemukan");
    }

    await prisma.lokasi.delete({
        where: { id: Number(id) },
    });

    // kalau yang dihapus itu lokasi aktif, jadikan lokasi lain (jika ada) sebagai aktif
    if (lokasi.isActive) {
        const lokasiLain = await prisma.lokasi.findFirst({
            orderBy: { createdAt: "asc" },
        });

        if (lokasiLain) {
            await prisma.lokasi.update({
                where: { id: lokasiLain.id },
                data: { isActive: true },
            });
        }
    }
};

module.exports = {
    createLokasi,
    getAllLokasi,
    setLokasiAktif,
    updateLokasi,
    deleteLokasi,
    getLokasiAktif
};