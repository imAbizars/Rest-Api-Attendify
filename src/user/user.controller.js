const express = require("express");
const router = express.Router();
const multer = require("multer");
const cloudinary = require("../lib/cloudinary");

const storage = multer.memoryStorage();
const upload = multer({ storage });

const {createUser,getallUser,findUserById, deleteUser, editUser, jumlahUser,editPhotoUser} = require("./user.repository");

//create new user
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

//getalluser
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
router.get("/jumlah",async(req,res)=>{
    try{
        const data = await jumlahUser();
        res.status(200).json({data:data});
    }catch(err){
        res.status(400).json({message:err.message})
    };
});

router.patch("/photo", upload.single("photo"), async (req, res) => {
    try {
        const userId = req.user.id;

        if (!req.file) {
            return res.status(400).json({ message: "Foto tidak ditemukan" });
        }

        // upload ke cloudinary
        const result = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream(
                { folder: "attendify/photos" },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                }
            ).end(req.file.buffer);
        });

        const user = await editPhotoUser(userId, result.secure_url);

        res.status(200).json({
            message: "Foto berhasil diupload",
            photo: user.photo
        });

    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
    }
});
//getuserbyid
router.get("/:id", async (req, res) => {
    try {
        const userId = parseInt(req.params.id);
        const userDataById = await findUserById(userId);

        res.status(200).json({
            data: userDataById
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

//delete user by id
router.delete("/:id", async (req, res) => {
    try {
        const userId = parseInt(req.params.id);

        const userDataById = await findUserById(userId);

        if (!userDataById) {
            return res.status(404).json({ message: "User tidak ditemukan" });
        }

        await deleteUser(userId);

        res.status(200).json({
            message: "User berhasil dihapus"
        });

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
router.patch("/:id",async (req,res) => {
    try{
        const userId = parseInt(req.params.id);
        const userData = req.body

        const userDatabyId = await findUserById(userId);
        if (!userDatabyId) {
            return res.status(404).json({ message: "User tidak ditemukan" });
        }

        const updated = await editUser(userId, userData);
        res.status(200).json({
            data: updated,
            message: "Data berhasil di update"
        });
    }catch(error){
        res.status(400).json({message:error.message});
    }
});


module.exports = router;