import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { columns, DepartmentButtons } from '../../../utils/DepartmentHelpers';
import axios from 'axios';

const DepartmentList = () => {
    const [departments, setDepartments] = useState([]);
    const [filteredDepartments, setFilteredDepartments] = useState([]);

    const onDepartmentDelete = (id) => {
        // Update the state to remove the deleted department
        setDepartments((prevDepartments) => 
            prevDepartments.filter(department => department.dep_id !== id)
        );
    };

    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/department/department', {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    }
                });

                if (response.data.status === 'success') {
                    let SrNo = 1;
                    const info = response.data.departments.map((department) => ({
                        dep_id: department._id,
                        srNo: SrNo++,
                        departmentName: department.departmentName,
                        action: <DepartmentButtons dep_id={department._id} onDepartmentDelete={onDepartmentDelete} />,
                    }));
                    setDepartments(info);
                    setFilteredDepartments(info); // Initialize filteredDepartments with all departments
                }    
            } catch (error) {
                console.error('Error fetching departments:', error);
            }
        };

        fetchDepartments();
    }, []);

    const filterDepartments = (e) => {
        const records = departments.filter((department) =>
            department.departmentName.toLowerCase().includes(e.target.value.toLowerCase())
        ); 
        setFilteredDepartments(records);
    }


    return (
        <div className='p-5'>
            <div className='text-center'>
                <h3 className='text-2xl font-bold'>Manage Departments</h3>
            </div>
            <div className='flex justify-between items-center my-4'>
                <input type="text" placeholder="Search department here" className='px-4 py-0.5 border' 
                onChange ={filterDepartments}
                />
                <Link to="/AdminDashboard/add-department" className='px-4 py-1 bg-blue-600 rounded text-white'>Add New Department</Link>
            </div>
            <div className='mt-5'>
                <DataTable
                    columns={columns}
                    data={filteredDepartments}
                    pagination
                />
            </div>
        </div>
    );
};


export default DepartmentList;
