import Employee from "../Models/Employee.js";
import User from "../Models/User.js";
import bcrypt from "bcrypt";





    const addEmployee = async (req, res) => {
        try {
        const {
            
            name,
            email,
            employeeId,
            dob,
            gender,
            maritalStatus,
            designation,
            department,
            salary,
            password,
            role,
            image,
        } = req.body;

        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role,
            profileImage: req.file.filename,
        });
        const savedUser = await newUser.save();

        const newEmployee = new Employee({
            userId : savedUser._id,
            employeeId,
            dob,
            gender,
            maritalStatus,
            designation,
            department: department, 
            salary,
        });
        await newEmployee.save();
        return res.status(201).json({ message: "Employee added successfully" });
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
            
        }
    
} 
const getEmployee = async (req, res) => {
    try {
        const employees = await Employee.find().populate('userId', 'name email image').populate('department', 'departmentName').sort({ createdAt: -1 });
        return res.status(200).json({success: true, employees });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "getemployee server error" });
    }
}

export { addEmployee , getEmployee };