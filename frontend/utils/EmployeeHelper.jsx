 import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export const columns = [
    {
        name: 'Sr No',
        selector: (row) => row.srNo,
        width : '160px',
        
    },
    {
        name: 'Image',
        selector: (row) => row.profileImage,
        width: '160px',
        
    },
    {
        name: 'Name',
        selector: (row) => row.Name,
        width : '160px',
    
    },
    {
        name: 'Department',
        selector: (row) => row.dep_Name,
        sortable: true,
        width : '160px',
    },
    {
        name: 'Designation',
        selector: (row) => row.designation,
        sortable: true,
        width : '160px',
    },
    {
        name: 'Action',
        cell: (row) => row.action,
        width : '350px',
        
        
    },
];
  export const fetchDepartments = async () => {
    let departments 
    try {
        const response = await axios.get('http://localhost:5000/api/department/department', {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        });

        if (response.data.status === 'success') {
            departments = response.data.departments
            
        }    
    } catch (error) {
        console.error('Error fetching departments:', error);
    }
    return departments
};

//employees for salary department 
 export const fetchEmployees = async (id) => {
  try {
    const response = await axios.get(`http://localhost:5000/api/employee/department/${id}`, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (response.data.status === 'success') {
      return response.data.employees;
    }
  } catch (error) {
    console.error('Error fetching employees:', error);
  }
  return []; // ← return empty array on failure
};


const EmployeeButtons = ({ Id}) => {
    const navigate = useNavigate();

    

    return (
            <div className="flex justify-between items-center w-full max-w-[300px] mx-auto text-cente ">
                <button
                    className="px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                    onClick={() => navigate(`/AdminDashboard/employees/${Id}`)}
                >
                    View
                </button>
                <button
                    className="px-3 py-1 text-xs bg-green-600 text-white rounded hover:bg-green-700 transition"
                    onClick={() => navigate(`/AdminDashboard/employees/edit/${Id}`)}
                >
                    Edit
                </button>
                <button
                    className="px-3 py-1 text-xs bg-yellow-600 text-white rounded hover:bg-yellow-700 transition"
                    onClick={() => navigate(`salary/${Id}`)}
                >
                    Salary
                </button>
                <button
                    className="px-3 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-700 transition"
                    onClick={() =>navigate(`/AdminDasboard/employees/leaves/${Id}`)}
                >
                    Leave
                </button>
            </div>




    );
};

export default EmployeeButtons;
