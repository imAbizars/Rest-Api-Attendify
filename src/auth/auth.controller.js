const express = require("express");
const router = express.Router();
const jwtToken = require("jsonwebtoken")
const {validationLogin} = require("./auth.service");

router.post("/login",async(req,res)=>{
    try{
        const {email,password} = req.body;
        const validUser = await validationLogin(email,password);
        const token = jwtToken.sign(
            { id: validUser.id, email: validUser.email, role: validUser.role },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );
        res.status(200).json({
            message: "Login berhasil",
            token,
            user:{
                nama : validUser.name,
            }
        });
    }catch (error) {
        res.status(400).json({ message: error.message });
    }
})
module.exports = router;
