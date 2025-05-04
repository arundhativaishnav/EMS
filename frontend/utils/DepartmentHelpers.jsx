import { useNavigate } from "react-router-dom";
 export const columns = [
    {
        name: 'Sr No',
        selector: (row ) => row.srNo
    },
    {
        name: 'Department Name',
        selector: (row) => row.departmentName
    },
    {
        name: 'Action',
        cell: (row) => row.action
    },

]
const DepartmentButtons = ({dep_id})=>{
    const navigate = useNavigate();
    
    return(
        <div className='flex space-x-2'>
            <button className="px-3 py-1 bg-blue-600 text-white mr-2"
                onClick={ () => navigate(`/AdminDashboard/edit-department/${dep_id}`) }
            >Edit</button>
            <button className="px-3 py-1 bg-red-600  text-white ">Delete</button> 
        </div>
)}
export { DepartmentButtons };
