const { createAbsen, updateJamKeluar, findAbsenHariIni } = require("./absen.repository.");

const KANTOR_LAT = -6.200000; 
const KANTOR_LNG = 106.816666;
const BATAS_JARAK_METER = 100;

const hitungJarak = (lat1, lng1, lat2, lng2) => {
    const R = 6371000;
    const phi1 = (lat1 * Math.PI) / 180;
    const phi2 = (lat2 * Math.PI) / 180;
    const deltaPhi = ((lat2 - lat1) * Math.PI) / 180;
    const deltaLambda = ((lng2 - lng1) * Math.PI) / 180;

    const a =
        Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
        Math.cos(phi1) * Math.cos(phi2) *
        Math.sin(deltaLambda / 2) * Math.sin(deltaLambda / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
};

// Absen masuk
const absenMasuk = async (userId, latitude, longitude) => {
    const jarak = hitungJarak(latitude, longitude, KANTOR_LAT, KANTOR_LNG);
    if (jarak > BATAS_JARAK_METER) {
        throw new Error(`Diluar jangkauan, jarak kamu ${Math.round(jarak)} meter dari kantor`);
    }

    const sudahAbsen = await findAbsenHariIni(userId);
    if (sudahAbsen) throw new Error("Kamu sudah absen masuk hari ini");

    return await createAbsen({ userId, latitude, longitude });
};

// Absen keluar
const absenKeluar = async (userId) => {
    const absenHariIni = await findAbsenHariIni(userId);
    if (!absenHariIni) throw new Error("Kamu belum absen masuk hari ini");
    if (absenHariIni.jamKeluar) throw new Error("Kamu sudah absen keluar hari ini");

    return await updateJamKeluar(absenHariIni.id);
};
module.exports = { absenMasuk, absenKeluar };