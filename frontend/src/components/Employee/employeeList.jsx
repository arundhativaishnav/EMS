import React ,  {useState , useEffect} from 'react';
import { Link } from 'react-router-dom';
import EmployeeButtons from '../../../utils/EmployeeHelper';
import DataTable from 'react-data-table-component';
import { columns } from '../../../utils/EmployeeHelper';
import axios from 'axios';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


const EmployeeList = () => {
    const [Employees, setEmployees] = useState([]);
    const [Emploading, setEmpLoading] = useState(true);

    const fetchEmployees = async () => {
        setEmpLoading(true);
        try {
            const response = await axios.get('http://localhost:5000/api/employee', {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            });
            console.log(response.data);
            if (response.data.success) {
                let SrNo = 1;
                const info = response.data.employees.map((employee) => ({
                    _id: employee._id,
                    srNo: SrNo++,
                    dep_Name: employee.department ? employee.department.departmentName : 'N/A',
                    Name: employee.userId ? employee.userId.name : 'N/A',
                    designation: employee.designation,
                    profileImage:  
                    <img src={`http://localhost:5000/${employee.userId.profileImage}`} alt="Profile" className='w-10 h-10 rounded-full'  />,
                    

                    
                    action: <EmployeeButtons Id={employee._id} />,
                  }));
                  
                setEmployees(info);
                
            }
        } catch (error) {
            console.error('Error fetching departments:', error);
            toast.error('Failed to fetch profile ', {
                position: "top-right",
            });
        } finally {
            setEmpLoading(false);
        }
    };

    useEffect(() => {
        
        fetchEmployees();
    } , []);

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
            <div>
                <DataTable
                    columns={columns}
                    data={Employees}
                    pagination
                   
                    
                />

            </div>
        </div>
    );
};

export default EmployeeList;