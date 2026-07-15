const express = require("express");
const router = express.Router();
const {findEmailUser,findEmailUserWithPassword, finduserByIdWithPass} = require("../user/user.repository");
const jwt = require("jsonwebtoken");
const {sendresetpassword} = require("../lib/mailer");
const { changePassword } = require("../user/user.repository");
const {verifyToken} = require("../middleware/auth.middleware");
const bcrypt = require("bcryptjs")

router.get("/emailUser",async(req ,res)=>{
    try{
        const {email} = req.query
        const emailUser = await findEmailUser(email);
        if (!emailUser) {
            return res.status(404).json({ message: "Email tidak terdaftar" });
        }

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

router.post("/lupaPassword", async (req, res) => {
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
        console.error("error : ",error)
        res.status(400).json({ message: "Link tidak valid atau sudah expired" });
    }
});

router.post("/gantiPassword", verifyToken, async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;
        const userId = req.user.id;

        const user = await finduserByIdWithPass(userId);
        if (!user) {
            return res.status(404).json({ message: "User tidak ditemukan" });
        }

        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Password lama salah" });
        }

        await changePassword(userId, newPassword);

        res.status(200).json({ message: "Password berhasil diubah" });
    } catch (error) {
        console.error("error : ",error)
        res.status(500).json({ message: error.message });
    }
});
module.exports= router;