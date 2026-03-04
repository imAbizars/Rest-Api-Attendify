const express = require("express");
const router = express.Router();
const { absenMasuk, absenKeluar } = require("./absen.service");
const {findAbsenHariIni} = require("./absen.repository.")

// Absen masuk
router.post("/masuk", async (req, res) => {
    try {
        const { latitude, longitude } = req.body;
        const userId = req.user.id;

        if (!latitude || !longitude) {
            return res.status(400).json({ message: "Lokasi tidak ditemukan" });
        }

        const absen = await absenMasuk(userId, latitude, longitude);
        res.status(200).json({ message: "Absen masuk berhasil", data: absen });

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Absen keluar
router.post("/keluar", async (req, res) => {
    try {
        const userId = req.user.id;
        const absen = await absenKeluar(userId);
        res.status(200).json({ message: "Absen keluar berhasil", data: absen });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get("/hari-ini",async(req,res)=>{
    try{
        const userId = req.user.id;
        const absen = await findAbsenHariIni(userId);
        res.status(200).json({ data: absen });
    }catch(err){
        res.status(400).json({message : err.message})
    }
})

module.exports = router;