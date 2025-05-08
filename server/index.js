import express from "express";
import cors from "cors";
import connectToDB from "./config/configdb.js"
import authRouter from './routes/auth.js'
import departmentRoutes from './routes/departmentRoutes.js'
import employeeRouter from './routes/employee.js'



const app = express();
app.use(cors())
app.use(express.json())
app.use(express.static('public/uploads')) // Serve static files from the 'public' directory
app.use('/api/auth', authRouter)
app.use('/api/department', departmentRoutes)
app.use('/api/employee', employeeRouter)


app.listen(5000 , ()=>{
    console.log("server is running on http://localhost:5000");
    
})