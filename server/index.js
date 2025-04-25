import express from "express";
import cors from "cors";
import connectToDB from "./config/configdb.js"
import authRouter from './routes/auth.js'

connectToDB()
const app = express();
app.use(cors())
app.use(express.json())
app.use('/api/auth', authRouter)

app.listen(3000 , ()=>{
    console.log("server is running on http://localhost:3000");
    
})