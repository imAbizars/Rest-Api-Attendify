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

const getStatistikBulanan = async () => {
    try {
        const enamBulanLalu = new Date();
        enamBulanLalu.setMonth(enamBulanLalu.getMonth() - 5);
        enamBulanLalu.setDate(1);
        enamBulanLalu.setHours(0, 0, 0, 0);

        console.log("query dari:", enamBulanLalu); // cek tanggal
        const totalUser = await jumlahUser();
        const data = await prisma.absen.findMany({
            where: {
                createdAt: { gte: enamBulanLalu }
            },
            select: {
                createdAt: true,
                statusAbsen: true, 
            }
        });

        console.log("data statistik:", data);

        const bulanMap = {};
        data.forEach((absen) => {
            const bulan = new Date(absen.createdAt).toLocaleString("id-ID", {
                month: "long",
                timeZone: "Asia/Jakarta"
            });
            if (!bulanMap[bulan]) {
                bulanMap[bulan] = { month: bulan, hadir: 0 };
            }
            bulanMap[bulan].hadir += 1;
        });

         Object.keys(bulanMap).forEach((bulan) => {
            bulanMap[bulan].tidak_hadir = totalUser - bulanMap[bulan].hadir;
        });
        return Object.values(bulanMap)
    } catch (err) {
        console.log("error getStatistikBulanan:", err.message); 
        throw err;
    }
};
module.exports = { createAbsen, updateJamKeluar, findAbsenHariIni,findSemuaAbsenHariIni,getStatistikBulanan};