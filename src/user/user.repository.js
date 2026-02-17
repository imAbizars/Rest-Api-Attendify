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
};
const findUserById = async(id)=>{
    const userById = await prisma.user.findUnique({
        where : {id}
    });
    return userById;
};
const deleteUser = async(id)=>{
    return await prisma.user.delete({
        where:{id}
    });
};
module.exports = {createUser,getallUser,findUserById,deleteUser}