const { createAbsen, updateJamKeluar, findAbsenHariIni } = require("./absen.repository");
const { getLokasiAktif } = require("../lokasi/lokasi.repository");
const { getJamMenitJakarta } = require("../utils/waktuJakarta");

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
    const { jam, menit } = getJamMenitJakarta();

    console.log("jam:", jam, "menit:", menit);

    let statusAbsen;
    if (jam < 6) {
        throw new Error("Absen masuk belum dibuka");
    } else if (jam < 8 || (jam === 8 && menit === 0)) {
        statusAbsen = "HADIR";
    } else {
        statusAbsen = "TERLAMBAT";
    }

    console.log("status:", statusAbsen);
    console.log("createAbsen dipanggil dengan:", { userId, latitude, longitude, statusAbsen });

    // Ambil lokasi aktif dari database, bukan hardcode lagi
    const lokasiAktif = await getLokasiAktif();
    if (!lokasiAktif) {
        throw new Error("Lokasi absen belum diatur. Hubungi admin.");
    }

    const jarak = hitungJarak(
        latitude,
        longitude,
        lokasiAktif.latitude,
        lokasiAktif.longtitude
    );

    if (jarak > lokasiAktif.radius) {
        throw new Error(
            `Diluar jangkauan lokasi ${lokasiAktif.nama}, jarak kamu ${Math.round(jarak)} meter (maksimal ${lokasiAktif.radius} meter)`
        );
    }

    const sudahAbsen = await findAbsenHariIni(userId);
    if (sudahAbsen) throw new Error("Kamu sudah absen masuk hari ini");

    return await createAbsen({ userId, latitude, longitude, statusAbsen });
};

// Absen keluar
const absenKeluar = async (userId) => {
    const absenHariIni = await findAbsenHariIni(userId);
    if (!absenHariIni) throw new Error("Kamu belum absen masuk hari ini");
    if (absenHariIni.jamKeluar) throw new Error("Kamu sudah absen keluar hari ini");

    return await updateJamKeluar(absenHariIni.id);
};

module.exports = { absenMasuk, absenKeluar };