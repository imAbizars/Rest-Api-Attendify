const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const userController = require("./src/user/user.controller");
const authController = require("./src/auth/auth.controller");
const absenController = require("./src/absen/absen.controller");
const { verifyAdmin, verifyToken } = require("./src/middleware/auth.middleware");

dotenv.config();

const app = express();

app.use(cors({
    origin: "https://attendify-blush.vercel.app",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}));

app.use(express.json());

app.get("/", (req, res) => {
    res.send("server berjalan");
});

app.use("/auth", authController);
app.use("/user", verifyAdmin, userController);
app.use("/absen", verifyToken, absenController);

module.exports = app;