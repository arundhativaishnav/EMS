import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { columns, DepartmentButtons } from '../../../utils/DepartmentHelpers';
import axios from 'axios';

const DepartmentList = () => {
    const [departments, setDepartments] = useState([]);

    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/department/department', {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    }
                });
                
                console.log("API response:", response);  // Log the response for debugging

                if (response.data.status === 'success') {
                    let SrNo = 1;
                    const info = response.data.departments.map((department) => ({
                        dep_id: department._id,
                        srNo: SrNo++,
                        departmentName: department.departmentName,
                        action: <DepartmentButtons dep_id ={department._id} />
                    }));
                    setDepartments(info);

                    response.data.departments.forEach((department) => {
                        console.log("Department:", department);  // Log each department for debugging
                    })
                
                    
                }    
            } catch (error) {
                console.error('Error fetching departments:', error);
            }
        }

        fetchDepartments();
    }, []);

    return (
        <div className='p-5'>
            <div className='text-center'>
                <h3 className='text-2xl font-bold'>Manage Departments</h3>
            </div>
            <div className='flex justify-between items-center my-4'>
                <input type="text" placeholder="Search department here  " className='px-4 py-0.5 border' />
                <Link to="/AdminDashboard/add-department" className='px-4 py-1 bg-blue-600 rounded text-white '>Add New Department</Link>
            </div>
            <div className='mt-5'>
                <DataTable
                    columns={columns}
                    data={departments}  // Use the mapped data here
                />
            </div>
        </div>
    );
};

export default DepartmentList;
