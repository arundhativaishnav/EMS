import React, { useEffect , useState } from 'react';
import DataTable from 'react-data-table-component';
import {columns , LeaveButtons} from '../../../utils/LeavesHelper';
import axios from 'axios';
import { toast , ToastContainer } from 'react-toastify';
import { UseAuth } from '../../context/authcontext';



const LeaveTable = () => {
  const [leaves, setLeaves] = useState(null);
  const[ filteredLeaves , setFilteredLeaves ] = useState(null);
  const {user} = UseAuth()


  const fetchLeaves = async () =>{
    try {
            const response = await axios.get('http://localhost:5000/api/leave', {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            });
            console.log(response.data);
            
           if (response.data.success) {
                const info = response.data.leaves.map((leave, index) => ({
                  SrNo: index + 1,
                  employeeId: leave.employeeId,             // already string
                  Name: leave.Name,                         // already top-level field
                  leaveType: leave.leaveType,
                  department: leave.department,             // already top-level field
                  days: Math.ceil((new Date(leave.endDate) - new Date(leave.startDate)) / (1000 * 60 * 60 * 24)) + 1,
                  status: leave.status,
                  action: <LeaveButtons Id={leave._id} />,
                }));
                setLeaves(info);
                setFilteredLeaves(info);
              }
              
        } catch (error) {
            console.error('Error fetching departments:', error);
            toast.error('Failed to fetch profile ', {
                position: "top-right",
            });
        }
  }
  useEffect(() =>{
    fetchLeaves()
  } ,[])

  const filterByInput = (e) =>{
    const data = leaves.filter(leave => leave.employeeId.toLowerCase().includes(e.target.value. toLowerCase()) || leave.Name.toLowerCase().includes(e.target.value.toLowerCase()))
    setFilteredLeaves(data)

  }
  const filterByButton = (status) =>{
      const data = leaves.filter((leave) =>
        leave.status.toLowerCase().includes(status.toLowerCase())
    );
      setFilteredLeaves(data)


  }
  return (
    <>
    {filteredLeaves ? (
    <div className='p-6'>
      <div className='text center'>
        <h3 className='text-3xl font-bold text-center'> Manage Leaves</h3>
      </div>
      <div className=' flex justify-between items-center'>
        <input
        type="search"
        placeholder="Search by employeeId"
        className='px-4 py-0.5 border'
        onChange={filterByInput}
        />
        <div className='space-x-3'>
        <button className=' px-2 py-1 bg-blue-600 text-white hover:bg-blue-700'
        onClick={() => filterByButton("Pending")}
        >Pending</button>
        <button className=' px-2 py-1 bg-green-600 text-white hover:bg-green-700'
        onClick={() => filterByButton("Approved")}
        >Approved</button>
        <button className=' px-2 py-1 bg-red-600 text-white hover:bg-red-700'
        onClick={() => filterByButton("Rejected")}
        >Rejected</button>
        </div>

      </div>
      <div className='mt-3'>
      <DataTable 
      columns ={columns}
      data={filteredLeaves} 
      pagination={true}
      />
      </div>
    </div>
    ) : <div>Loading.....</div>}
    </>
  );
};

export default LeaveTable;