import express from "express";
import cors from "cors";
import "./config/configdb.js"


const app = express();
app.use(cors())
app.use(express.json())

app.listen(3000 , ()=>{
    console.log("server is running on http://localhost:3000");
    
})