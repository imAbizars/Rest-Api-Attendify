const express = require("express");
const dotenv = require("dotenv");

//require modul
const userController = require("./src/user/user.controller");

//init app
const app = express();
//init json
app.use(express.json());

//config dotenv
dotenv.config();
const PORT = process.env.PORT;



app.get("/",(req,res)=>{
    res.send("server berjalan");
});

//route
app.use("/user",userController);

//port
app.listen(PORT,()=>{
    console.log("server berjalan di port" + PORT);
});
