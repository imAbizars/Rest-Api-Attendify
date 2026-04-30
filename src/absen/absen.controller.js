const express = require("express");
const router = express.Router();
const { absenMasuk, absenKeluar } = require("./absen.service");
const {findAbsenHariIni,findSemuaAbsenHariIni,getStatistikBulanan,getRiwayatAbsen, findStatistikAbsenUser} = require("./absen.repository");

// Absen masuk
router.post("/masuk", async (req, res) => {
    try {
        const { latitude, longitude } = req.body;
        const userId = req.user.id;

        if (!latitude || !longitude) {
            return res.status(400).json({ message: "Lokasi tidak ditemukan" });
        }

        const absen = await absenMasuk(userId, latitude, longitude);
       
        
        res.status(200).json({ 
            message: absen.status === "TERLAMBAT" ? "Absen berhasil, kamu terlambat" : "Absen berhasil", 
            data: absen 
        });

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

router.get("/semua-absen",async(req,res)=>{
    try{
        const absen = await findSemuaAbsenHariIni();
        res.status(200).json({
            data : absen
        })
    }catch(err){
        res.status(400).json({
            message : err.message
        });
    }
});

router.get("/statistik-absen-user",async(req,res)=>{
    try {
        const userId = req.user.id;
        const statistik = await findStatistikAbsenUser(userId);
        res.status(200).json({
            data : statistik
        })
    } catch (error) {
        res.status(400).json({
            message : error.message
        })
    }
})

router.get("/statistik",async(req,res)=>{
    try{
        const month = parseInt(req.query.month) || new Date().getMonth() + 1;
        const year = parseInt(req.query.year) || new Date().getFullYear();
        console.log("month:", month, "year:", year);
        const data = await getStatistikBulanan(month,year);
        console.log("data:",data);
        res.status(200).json({data});
    }catch(err){
        console.log("error statistik:", err.message);
        res.status(400).json({message:err.message});
    }
});

router.get("/riwayatabsen",async(req,res)=>{
    try{
        const userId = req.user.id
        const month = parseInt(req.query.month) || new Date().getMonth()+1;
        const year = parseInt(req.query.year) || new Date().getFullYear();
        const data = await getRiwayatAbsen(userId,month,year);
        res.status(200).json({data});
    }catch(err){
        res.status(400).json({
            message : err.message
        });
    }
})

module.exports = router;