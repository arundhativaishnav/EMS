import Employee from "../Models/Employee.js";
import User from "../Models/User.js";
import bcrypt from "bcrypt";

// No need for multer here anymore

const addemployee = async (req, res) => {
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
            role
        } = req.body;
        console.log("Request body:", req.body);
        const existingUser = await Employee.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists in employee",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        

        const newEmployee = new Employee({
            name,
            email,
            password: hashedPassword,
            role,
            profileImage: req.file ? req.file.filename : "",
            employeeId,
            dob,
            gender,
            maritalStatus,
            designation,
            department,
            salary,
        });

        await newEmployee.save();

        return res.status(201).json({
            success: true,
            message: "Employee added successfully",
            employee: newEmployee,
        });

    } catch (error) {
        console.error("Error adding employee:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

export { addemployee };
