const express = require("express");
const router = express.Router();
const {createUser,getallUser} = require("./user.repository");

router.post("/",async(req,res)=>{
    try{
        const userData = req.body;
        const buatUser = await createUser(userData);
        res.status(200).json({
            data: buatUser,
            message: "user berhasil dibuat",
        });
    }catch(error){
        res.status(400).json({message: error.message});
    };
});

router.get("/",async(req,res)=>{
    try{
        const userData = await getallUser();
        res.status(200).json({
            data: userData,
        })
    }catch(error){
        res.status(400).json({message:error.message});
    };
});
module.exports = router;