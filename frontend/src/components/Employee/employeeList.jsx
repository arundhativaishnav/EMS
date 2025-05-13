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
                   <img
                    src={`http://localhost:5000/uploads/${employee.userId.profileImage || 'default-profile.png'}`}
                    alt="Profile"
                    className="w-10 h-10 rounded-full"
                    />,
                    action: <EmployeeButtons Id={employee._id} />,
                  }));
                console.log(info);

                  
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
       <div className="p-5">
  {/* Header */}
  <div className="text-center mb-6">
    <h3 className="text-3xl font-bold text-gray-800">Manage Employees</h3>
  </div>

  {/* Search + Add Button */}
  <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
    <input
      type="text"
      placeholder="Search employee here"
      className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-1/2"
       // Make sure this function is defined
    />
    <Link
      to="/AdminDashboard/add-Employee"
      className="px-4 py-2 bg-blue-600 rounded text-white hover:bg-blue-700 transition-colors text-center w-full sm:w-auto"
    >
      Add New Employee
    </Link>
  </div>

  {/* Data Table */}
  <div className="bg-white rounded-2xl shadow-lg p-6 overflow-x-auto">
    <DataTable
      columns={columns}
      data={Employees}
      pagination
      responsive
      highlightOnHover
      noDataComponent={
        <div className="p-4 text-center text-gray-500">No employees found</div>
      }
    />
  </div>
</div>


    );
};

export default EmployeeList;