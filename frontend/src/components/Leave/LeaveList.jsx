import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UseAuth } from '../../context/authcontext';
import axios from 'axios';
import { toast } from 'react-toastify';

const LeaveList = () => {
  const { user } = UseAuth();
  const [leave, setLeave] = useState([]);
  let SrNo = 1;
  const fetchLeaves = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/leave/${user._id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        console.log("Leave fetch response:", response.data);
        console.log("userId :", user._id);
        
        

        if (response.data.success) {
          setLeave(response.data.leaves);
        } else {
          console.log(error.message)
        }
      } catch (error) {
        toast.error(
          error.response?.data?.message || "Failed to fetch leave records."
        );
      }
    };


  useEffect(() => {
    
    if (user?._id) {
      fetchLeaves();
    }
  }, [user]);

  return (
    <div className="p-5">
      {/* Header */}
      <div className="text-center mb-6">
        <h3 className="text-3xl font-bold text-gray-800">Manage Leaves</h3>
      </div>

      {/* Apply Leave Button */}
      <div className="flex justify-end mb-4">
        <Link
          to="/EmployeeDashboard/add-Leave"
          className="px-4 py-2 bg-blue-600 rounded text-white hover:bg-blue-700 transition-colors"
        >
          Apply Leave
        </Link>
      </div>

      {/* Leave Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 shadow-md border border-gray-200 rounded-lg">
          <thead className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
            <tr>
              <th className="px-4 py-3">Sr No.</th>
              <th className="px-4 py-3">Leave Type</th>
              <th className="px-4 py-3">From</th>
              <th className="px-4 py-3">To</th>
              <th className="px-4 py-3">Description</th>
              <th className="px-4 py-3">Applied Date</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-sm">
            {Array.isArray(leave) && leave.length > 0 ? (
              leave.map((item) => (
                <tr key={item._id} className="hover:bg-gray-50">
                  <td className="px-4 py-2">{SrNo++}</td>
                  <td className="px-4 py-2">{item.leaveType}</td>
                  <td className="px-4 py-2">{new Date(item.startDate).toLocaleDateString()}</td>
                  <td className="px-4 py-2">{new Date(item.endDate).toLocaleDateString()}</td>
                  <td className="px-4 py-2">{item.reason}</td>
                  <td className="px-4 py-2">{new Date(item.appliedDate).toLocaleDateString()}</td>
                  <td className="px-4 py-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      item.status === "Approved"
                        ? "bg-green-100 text-green-700"
                        : item.status === "Rejected"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="px-4 py-4 text-center text-gray-500">
                  No leave records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaveList;
