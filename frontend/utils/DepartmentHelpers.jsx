import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

 export const columns = [
    {
        name: 'Sr No',
        selector: (row ) => row.srNo
    },
    {
        name: 'Department Name',
        selector: (row) => row.departmentName,
        sortable: true,
    },
    {
        name: 'Action',
        cell: (row) => row.action
    },

]
const DepartmentButtons = ({ dep_id, onDepartmentDelete }) => {
  const navigate = useNavigate();

  const handleDelete = async (id) => {
      const confirmDelete = window.confirm("Are you sure you want to delete this department?");
      if (confirmDelete) {
          try {
              const response = await axios.delete(`http://localhost:5000/api/department/${id}`, {
                  headers: {
                      Authorization: `Bearer ${localStorage.getItem('token')}`
                  }
              });
              
              if (response.data.success) {
                  onDepartmentDelete(id);  // Call the function to update the state
                  console.log("Department deleted successfully"); 
              }
          } catch (error) {
              if (error.response) {
                  toast.error(error.response.data.message, {
                      position: "top-right",
                  });
              } else {
                  toast.error("Server error", {
                      position: "top-right",
                  });
              }
          }
      } 
  };

  return (
      <div className="flex space-x-2">
          <button
              className="px-3 py-1 bg-blue-600 text-white mr-2"
              onClick={() => navigate(`/AdminDashboard/edit-department/${dep_id}`)}
          >
              Edit
          </button>
          <button
              className="px-3 py-1 bg-red-600 text-white"
              onClick={() => handleDelete(dep_id)}
          >
              Delete
          </button>
      </div>
  );
};

export { DepartmentButtons };
