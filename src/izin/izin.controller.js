const express = require("express");
const router = express.Router();
const { createIzin, findIzinUser, findAllIzinUser, updateIzin } = require("./izin.repository");

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
router.get("/semuaIzin",async (req,res) => {
    try{
        const dataSemuaIzin = await findAllIzinUser()
        res.status(200).json({
            message : "data izin berhasil diambil",
            data:dataSemuaIzin
        })
    }catch(error){
        res.status(400).json({message:error.message})
    }    
})
router.patch("/:id", async (req, res) => {
    try {
        const izinId = req.params.id;
        const { status } = req.body;

        if (!["Disetujui", "Ditolak"].includes(status)) {
            return res.status(400).json({ message: "Status tidak valid" });
        }

        const updatedIzin = await updateIzin({ id: izinId, status });

        res.status(200).json({
            message: "Status izin berhasil diperbarui",
            data: updatedIzin
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
module.exports = router;