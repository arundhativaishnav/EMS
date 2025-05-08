 import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export const columns = [
    {
        name: 'Sr No',
        selector: (row) => row.srNo,
        
    },
    {
        name: 'Image',
        selector: (row) => row.profileImage,
        
    },
    {
        name: 'Name',
        selector: (row) => row.Name,
    
    },
    {
        name: 'Department',
        selector: (row) => row.dep_Name,
        sortable: true,
    },
    {
        name: 'Designation',
        selector: (row) => row.designation,
        sortable: true,
    },
    {
        name: 'Action',
        cell: (row) => row.action,
        
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
const EmployeeButtons = ({ Id}) => {
    const navigate = useNavigate();

    

    return (
        <div className="flex space-x-3">
            <button
                className="px-1 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors mr-2"
                onClick={() => navigate(`/AdminDashboard/edit-department/${dep_id}`)}
            >
                View
            </button>
            <button
                className="px-1 py-3 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                
            >
                Edit
            </button>
            <button
                className="px-1 py-3 bg-yellow-600 text-white rounded hover:bg-yellow-700 transition-colors"
                
            >
                Salary
            </button>
            <button
                className="px-1 py-3 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                
            >
                Leave
            </button>

        </div>
    );
};

export default EmployeeButtons;
