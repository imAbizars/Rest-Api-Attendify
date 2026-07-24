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
const findAllIzinUser = async()=>{
    return await prisma.izin.findMany({
        orderBy:{
            createdAt:"desc"
        },
        include:{
            user:{
                select:{
                    name:true,
                    jabatan:true,
                    kodeUser:true
                }
            }
        }
    })
}
const createIzin = async ({ userId, tanggalIzin, selesaiIzin, keterangan, status }) => {
    return await prisma.$transaction(async (tx) => {
        const newIzin = await tx.izin.create({
            data: {
                kodeIzin: "TEMP",
                userId,
                tanggalIzin,
                selesaiIzin,
                keterangan,
                status
            }
        });
        const updatedIzin = await tx.izin.update({
            where: { id: newIzin.id },
            data: { kodeIzin: `IZN-${newIzin.id}` }
        });

        return updateIzin;
    });
};

const updateIzin = async ({ id, status }) => {
    return await prisma.izin.update({
        where: { id: Number(id) }, 
        data: { status }
    });
};
module.exports = { createIzin, updateIzin,findIzinUser,findAllIzinUser};