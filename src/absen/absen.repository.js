const prisma = require("../db/index");
const {jumlahUser} = require("../user/user.repository")
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
const findSemuaAbsenHariIni  = async () =>{
    const hariIni = new Date();
    hariIni.setHours(0,0,0,0);
    
    return await prisma.absen.findMany({
        where:{
            createdAt : {gte : hariIni}
        },
        include:{
            user:{
                select:{
                    name:true,
                },
            },
            
        },
        orderBy: { jamMasuk: "desc" }
    });
};

const getStatistikBulanan = async (month, year) => {
    console.log("tipe month:", typeof month, "nilai:", month);
    console.log("tipe year:", typeof year, "nilai:", year);
    
    const m = Number(month);
    const y = Number(year);
    
    console.log("setelah convert - m:", m, "y:", y);
    console.log("isNaN m:", isNaN(m), "isNaN y:", isNaN(y));

    const awalBulan = new Date(y, m- 1, 1);
    awalBulan.setHours(0, 0, 0, 0);
    const akhirBulan = new Date(y, m, 0);
    akhirBulan.setHours(23, 59, 59, 999);
    console.log("awal:", awalBulan, "akhir:", akhirBulan);
    const totalUser = await jumlahUser();

    const data = await prisma.absen.findMany({
        where: {
            createdAt: { gte: awalBulan, lte: akhirBulan }
        },
        select: {
            createdAt: true,
            statusAbsen: true,
        }
    });

    const hariMap = {};
    data.forEach((absen) => {
        const tanggal = new Date(absen.createdAt).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "short",
            timeZone: "Asia/Jakarta"
        });
        if (!hariMap[tanggal]) {
            hariMap[tanggal] = { day: tanggal, hadir: 0, tidak_hadir: 0 };
        }
        hariMap[tanggal].hadir += 1;
    });

    Object.keys(hariMap).forEach((hari) => {
        hariMap[hari].tidak_hadir = Math.max(0, totalUser - hariMap[hari].hadir);
    });

    return Object.values(hariMap);
};
module.exports = { createAbsen, updateJamKeluar, findAbsenHariIni,findSemuaAbsenHariIni,getStatistikBulanan};