const prisma = require("../db/index");
const bcrypt = require("bcryptjs");

//method create
const createUser = async({name,email,password,address,phonenumber,role})=>{
    const hashedPassword = await bcrypt.hash(password,10);
    return await prisma.user.create({
        data:{
            name,
            email,
            password:hashedPassword,
            address,
            phonenumber,
            role,
        }
    });
};
// method find
const getallUser = async()=>{
    const dataUser = await prisma.user.findMany({
        orderBy:{
            createdAt:"desc"
        }
    });
    return dataUser; 
};

const findUserById = async(id)=>{
    const userById = await prisma.user.findUnique({
        where : {id},
        select:{
            email:true,
            name:true,
            phonenumber:true,
            photo : true
        }
        
    });
    return userById;
};


//method delete
const deleteUser = async(id)=>{
    return await prisma.user.delete({
        where:{id}
    });
};

//method update
const editUser = async(id,userData)=>{
    if(userData.password){
        userData.password = await bcrypt.hash(userData.password, 10);
    }
    return await prisma.user.update({
        where:{
            id:parseInt(id),
        },
        data:{
            name:userData.name,
            email:userData.email,
            password:userData.password,
            address:userData.address,
            phonenumber:userData.phonenumber,
            role:userData.role
        }
    })
}

const editPhotoUser = async(id,photoData) =>{
    return await prisma.user.update({
        where:{
            id : parseInt(id)
        },
        data:{
            photo : photoData
        }
    })
}

//method count
const jumlahUser = async()=>{
    const jumlah = await prisma.user.count();
    return jumlah;
}


module.exports = {createUser,getallUser,findUserById,deleteUser,editUser,jumlahUser,editPhotoUser}