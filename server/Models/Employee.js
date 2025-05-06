import mongoose from 'mongoose';
import {Schema} from 'mongoose';

const EmployeeSchema = new mongoose.Schema({
    
    employeeId: {
        type: String,
        required: true,
        unique: true
    },
    dob: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        
        required: true
    },
    maritalStatus: {
        type: String,
        
        required: true
    },
    designation: {
        type: String,
        required: true
    },
    department: {
        type: Schema.Types.ObjectId,
        ref: 'Department',
        required: true
    },
    salary: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

const Employee = mongoose.model('Employee', EmployeeSchema);
export default Employee;