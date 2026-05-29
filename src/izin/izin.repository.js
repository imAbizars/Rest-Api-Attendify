const prisma = require("../db/index");

const createIzin = async ({}) => {
    return await prisma.izin.create({
        data:{
            userId,
            keterangan,
            tanggal,
            
        }
    })
} 