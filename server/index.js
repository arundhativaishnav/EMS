import express from "express";
import cors from "cors";
import connectToDB from "./config/configdb.js"
import authRouter from './routes/auth.js'
import departmentRoutes from './routes/departmentRoutes.js'
import employeeRouter from './routes/employee.js'
import SalaryRouter from './routes/SalaryRoute.js'
import LeaveRouter from './routes/LeaveRoute.js'
import path from 'path'

const __dirname = path.dirname(new URL(import.meta.url).pathname); 



const app = express();
app.use(cors())
app.use(express.json())
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

app.use('/api/auth', authRouter)
app.use('/api/department', departmentRoutes)
app.use('/api/employee', employeeRouter)
app.use('/api/salary', SalaryRouter)
app.use('/api/leave', LeaveRouter)


app.listen(5000 , ()=>{
    console.log("server is running on http://localhost:5000");
    
})