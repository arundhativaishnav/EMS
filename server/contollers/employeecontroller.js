import Employee from "../Models/Employee.js";
import User from "../Models/User.js";
import path from "path";
import Department from "../Models/Department.js";
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
            phonenumber ,
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
const getEmployees = async (req, res) => {
    try {
        const employees = await Employee.find().populate('userId', 'name email image').populate('department', 'departmentName').sort({ createdAt: -1 });
        return res.status(200).json({success: true, employees });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "getemployee server error" });
    }
}
const getEmployeeById= async (req, res) =>{
    const {id} = req.params;
    try {
      let employee;
      employee = await Employee.findById(id).populate('userId', 'name email image').populate('department', 'departmentName')
      if( !employee){
        employee = await Employee.findOne({ userId: id})
        .populate('userId', {password: 0}).populate('department', 'departmentName')
      }
       
     return res.status(200).json({success: true, employee});
    } catch (error) {
                console.error("Failed to fetch employee:", error.response?.data || error.message || error);
            }
        }
    



const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    // Form fields from req.body (strings only!)
    const {
      name,
      email,
      employeeId,
      phoneNumber,
      dob,
      gender,
      maritalStatus,
      designation,
      department,
      salary,
      password,
      role
    } = req.body;

    const imagePath = req.file ? req.file.filename : null;

    // Update the User part
    const employee = await Employee.findById(id).populate('userId');
    if (!employee) return res.status(404).json({ message: 'Employee not found' });

    const user = employee.userId;

    user.name = name || user.name;
    user.email = email || user.email;
    user.phone = phoneNumber || user.phone;
    user.role = role || user.role;
    if (password) user.password = password; // Only update if a new password is provided

    await user.save();

    // Update the Employee part
    employee.employeeId = employeeId || employee.employeeId;
    employee.dob = dob || employee.dob;
    employee.gender = gender || employee.gender;
    employee.maritalStatus = maritalStatus || employee.maritalStatus;
    employee.designation = designation || employee.designation;
    employee.department = department || employee.department;
    employee.salary = salary || employee.salary;

    if (imagePath) {
      employee.image = imagePath;
    }

    await employee.save();

    res.status(200).json({ message: 'Employee updated successfully', employee });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error during employee update' });
  }
};

const fetchEmployeesByDepId = async (req, res) => {
  try {
    const departmentId = req.params.id;
    const employees = await Employee.find({ department: departmentId });

    return res.status(200).json({
      status: 'success',
      employees
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', message: 'Server error' });
  }
};


export { addEmployee , getEmployees , getEmployeeById , updateEmployee , fetchEmployeesByDepId };