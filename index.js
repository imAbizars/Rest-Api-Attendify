const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
const app = express();

const userController = require("./src/user/user.controller");
const authController = require("./src/auth/auth.controller");
const absenController = require("./src/absen/absen.controller");
const { verifyAdmin, verifyToken } = require("./src/middleware/auth.middleware");


 app.use(cors({
    origin: [
        "https://attendify-blush.vercel.app",
        "http://localhost:5173"
    ],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}));

app.use(express.json());

app.get("/", (req, res) => {
    res.send("server berjalan");
});

app.use("/auth", authController);
app.use("/user", verifyToken, userController);
app.use("/absen", verifyToken, absenController);

if (process.env.NODE_ENV !== "production") {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log("server berjalan di port " + PORT);
    });
}
module.exports = app;