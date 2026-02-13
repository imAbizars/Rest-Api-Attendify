const prisma = require("../db/index");

const createUser = async({name,email,password,address,phonenumber,role})=>{
    return await prisma.user.create({
        data:{
            name,
            email,
            password,
            address,
            phonenumber,
            role,
        }
    });
};

const getallUser = async()=>{
    const dataUser = await prisma.user.findMany();
    return dataUser; 
} 
module.exports = {createUser,getallUser}