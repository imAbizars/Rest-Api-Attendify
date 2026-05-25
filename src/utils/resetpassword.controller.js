const express = require("express");
const router = express.Router();
const {findEmailUser} = require("../user/user.repository");
const jwt = require("jsonwebtoken");
const {sendresetpassword} = require("../lib/mailer");
const { changePassword } = require("../user/user.repository");


router.get("/emailUser",async(req ,res)=>{
    try{
        const {email} = req.query
        const emailUser = await findEmailUser(email);
        if (!emailUser) {
            return res.status(404).json({ message: "Email tidak terdaftar" });
        }

        // TODO: kirim email reset password di sini (lihat bagian nodemailer)
        const token = jwt.sign(
            {email},
            process.env.JWT_SECRET,
            {expiresIn:"15m"}
        );

        const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;
        await sendresetpassword(email,resetLink);
        
        res.status(200).json({ message: "Link reset password berhasil dikirim" });
    } catch (error) {
        console.error("Error di emailUser:", error);
        res.status(400).json({ message: error.message });
    }
})

router.post("/resetPassword", async (req, res) => {
    try {
        const { token, password } = req.body;

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        const user = await findEmailUser(decoded.email);
        if (!user) {
            return res.status(404).json({ message: "User tidak ditemukan" });
        }
        await changePassword(decoded.email, password);
        
        res.status(200).json({ message: "Password berhasil direset" });
    } catch (error) {
        res.status(400).json({ message: "Link tidak valid atau sudah expired" });
    }
});
module.exports= router;