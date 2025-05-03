import express from "express";
import cors from "cors";
import connectToDB from "./config/configdb.js"
import authRouter from './routes/auth.js'


const app = express();
app.use(cors())
app.use(express.json())
app.use('/api/auth', authRouter)

app.listen(5000 , ()=>{
    console.log("server is running on http://localhost:5000");
    
})