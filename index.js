const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
//require modul
const userController = require("./src/user/user.controller");
const authController = require("./src/auth/auth.controller");
const absenController = require("./src/absen/absen.controller");
const {verifyAdmin,verifyToken} = require("./src/middleware/auth.middleware");
//init app
const app = express();
//init json
app.use(cors());
app.use(cors({
    origin: "https://attendify-blush.vercel.app",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}));
app.use(express.json());

//config dotenv
dotenv.config();
const PORT = process.env.PORT;



app.get("/",(req,res)=>{
    res.send("server berjalan");
});

//route
app.use("/auth",authController);
app.use("/user",verifyAdmin,userController);
app.use("/absen",verifyToken,absenController);

//port
module.exports = app;