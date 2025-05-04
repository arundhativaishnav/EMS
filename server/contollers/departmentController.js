import Department from "../models/department.js ";
import mongoose from "mongoose";


const getDepartments = async (req, res) => {
        try {
            const departments = await Department.find();
            return res.status(200).json({
                status: "success",
                departments: departments
            })
        } catch (error) {
            return res.status(500).json({
                status: "failed",
                message: "get department  server error",
            })
        }
}
const adddepartment = async (req, res) => {
    try {
        const { departmentName, description } = req.body;
        if (!departmentName || !description) {
            return res.status(400).json({
                success: false,
                message: "Please fill all the fields",
            });
        }
        const newDepartment = new Department({
            departmentName,
            description,
        });
        await newDepartment.save();
        res.status(201).json({
            success: true,
            message: "Department added successfully",
        });
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}
const editDepartments = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({
                status: "failed",
                message: "Invalid department ID",
            });
        }
        const department = await Department.findById(id);
        
        if (!department) {
            return res.status(404).json({
                status: "failed",
                message: "Department not found",
            });
        }
        return res.status(200).json({
            status: "success",
            department
        })
    

    } catch (error) {
        return res.status(500).json({
            status: "failed",
            message: "get department  server error",
        })
    }
}
export {adddepartment  , getDepartments , editDepartments}
