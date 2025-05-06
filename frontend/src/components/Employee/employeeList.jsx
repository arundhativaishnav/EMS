import React from 'react';
import { Link } from 'react-router-dom';

const EmployeeList = () => {
    return (
        <div className='p-6'>
             <div className='text-center'>
                <h3 className='text-2xl font-bold'>Manage Employees</h3>
            </div>
            <div className='flex justify-between items-center my-4'>
                <input type="text" placeholder="Search department here" className='px-4 py-0.5 border' 
                
                />
                <Link to="/AdminDashboard/add-Employee" className='px-4 py-1 bg-blue-600 rounded text-white'>Add New Employee</Link>
            </div>  
        </div>
    );
};

export default EmployeeList;