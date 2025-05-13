import React, { useEffect , useState } from 'react';
import DataTable from 'react-data-table-component';
import {columns , LeaveButtons} from '../../../utils/LeavesHelper';
import axios from 'axios';
import { toast , ToastContainer } from 'react-toastify';

const statuses = ['Pending', 'Approved', 'Rejected'];


const LeaveTable = () => {
  const [leaves, setLeaves] = useState(null);


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
                _id: leave._id,
                SrNo: index + 1,
                employeeId: leave.employeeId || 'N/A',
                Name: leave.employeeId?.name || 'N/A',
                leaveType: leave.leaveType,
                department: leave.employeeId?.department?.departmentName || 'N/A',
                days: (new Date(leave.endDate) - new Date(leave.startDate)) / (1000 * 60 * 60 * 24),
                status: leave.status,
                action: <LeaveButtons leaveId={leave._id} />,
              }));
            


                console.log(info);
                setLeaves(info);
                
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
  return (
    <>
    { leaves ? ( 
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4 text-center">Manage Leaves</h2>

      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search By Emp ID"
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
        />

        <div className="space-x-3">
          {statuses.map((status) => (
            <button
              key={status}
              className="px-4 py-2 rounded text-white bg-blue-600 hover:bg-blue-800 transition"
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6 overflow-x-auto">
    <DataTable
      columns={columns}
      data={leaves}
      
      noDataComponent={
        <div className="p-4 text-center text-gray-500">No leaves found</div>
      }
    />
  </div>

      <div className="flex justify-between items-center mt-4 bg-gray-200 px-4 py-2 rounded">
        <div className="flex items-center space-x-2 text-sm text-gray-700">
          <label htmlFor="rowsPerPage" className="whitespace-nowrap">Rows per page:</label>
          <select
            id="rowsPerPage"
            disabled
            className="border border-gray-300 rounded px-2 py-1"
          >
            <option value={10}>10</option>
          </select>
        </div>

        <div className="flex items-center space-x-1 text-gray-700 text-sm">
          <span>1-10 of 0</span>
          <button className="p-1 disabled:text-gray-400" aria-label="First Page">{'|<'}</button>
          <button className="p-1 disabled:text-gray-400" aria-label="Previous Page">{'<'}</button>
          <button className="p-1 disabled:text-gray-400" aria-label="Next Page">{'>'}</button>
          <button className="p-1 disabled:text-gray-400" aria-label="Last Page">{'>|'}</button>
        </div>
      </div>
    </div>
      ) :(<div> Loading......</div>)}
      </>
      
  );
};

export default LeaveTable;