const prisma = require("../db/index")
const bcrypt = require("bcryptjs");

const validationLogin = async(email,password)=>{
    const user = await prisma.user.findUnique({where:{email}});
    if(!user)throw new Error("Email tidak terdaftar");

    const isValidPassword = await bcrypt.compare(password,user.password);
    if (!isValidPassword) throw new Error("Password salah");

    return user;

}
module.exports = {validationLogin};