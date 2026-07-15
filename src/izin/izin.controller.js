const express = require("express");
const router = express.Router();
const { createIzin, findIzinUser } = require("./izin.repository");

router.post("/", async (req, res) => {
    try {
        const userId = req.user.id; 
        const { keterangan, tanggalIzin, selesaiIzin, status } = req.body;

        const buatIzin = await createIzin({ userId, tanggalIzin, selesaiIzin, keterangan, status });

        res.status(201).json({
            message: "izin berhasil dibuat",
            data: buatIzin
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get("/izinSaya", async(req,res)=>{
    try{
        const userId = req.user.id
        const dataIzin = await findIzinUser(userId)

        res.status(200).json({
            message:"data izin berhasil dibuat",
            data: dataIzin
        })
    }catch(error){
        res.status(400).json({message:error.message})
    }
})

module.exports = router;