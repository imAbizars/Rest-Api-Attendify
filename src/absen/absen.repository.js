const prisma = require("../db/index");

const createAbsen = async ({ userId, latitude, longitude,statusAbsen}) => {
    return await prisma.absen.create({
        data: {
            userId,
            latitude,
            longitude,
            jamMasuk: new Date(),
            statusAbsen
        }
    });
};

const updateJamKeluar = async (id) => {
    return await prisma.absen.update({
        where: { id },
        data: { jamKeluar: new Date() }
    });
};

const findAbsenHariIni = async (userId) => {
    const hariIni = new Date();
    hariIni.setHours(0, 0, 0, 0);

    return await prisma.absen.findFirst({
        where: {
            userId,
            tanggal: { gte: hariIni }
        }
    });
};

module.exports = { createAbsen, updateJamKeluar, findAbsenHariIni };