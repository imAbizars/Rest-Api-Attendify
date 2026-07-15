const prisma = require("../db/index");

const findIzinUser = async(userId)=>{
    return await prisma.izin.findMany({
        where:{
            userId
        },
        orderBy:{
            createdAt: "asc"
        }
    })
} 
const createIzin = async ({ userId, tanggalIzin, selesaiIzin, keterangan, status }) => {
    return await prisma.izin.create({
        data: {
            userId,
            keterangan,
            tanggalIzin,
            selesaiIzin,
            status,
        }
    });
};

const updateIzin = async ({ id, status }) => {
    return await prisma.izin.update({
        where: { id },
        data: { status }
    });
};

module.exports = { createIzin, updateIzin,findIzinUser };