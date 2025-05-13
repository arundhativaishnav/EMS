import Leave from "../Models/Leave.js"
import Employee from "../Models/Employee.js"
import User from "../Models/User.js"




const AddLeave = async (req, res) => {
  try {
    const { userId, leaveType, startDate, endDate, reason } = req.body;

    // ✅ Find the employee document for the user
    const employee = await Employee.findOne({ userId });

    if (!employee) {
      return res.status(404).json({ success: false, message: 'Employee not found' });
    }

    // ✅ Use employee._id in leave
    const newLeave = new Leave({
      employeeId: employee._id,
      leaveType,
      startDate,
      endDate,
      reason,
      status: 'Pending',
      appliedDate: new Date()
    });

    await newLeave.save();

    return res.status(201).json({
      success: true,
      message: 'Leave added successfully',
      data: newLeave
    });

  } catch (error) {
    console.error('Error adding leave:', error.message);
    return res.status(500).json({ success: false, message: 'Server Error' });
  }
};

const getLeaves = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findOne({ userId: id })
    const leaves = await Leave.find({ employeeId: employee._id })
    return res.status(200).json({
      success: true,
      leaves
    })
  } catch (error) {
    console.error('Error in getSalary:', error);
    return res.status(500).json({
      success: false,
      message: 'Error occurred while fetching salary',
      error,
    });
  }
};




export {AddLeave , getLeaves };