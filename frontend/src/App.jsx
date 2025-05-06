import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './Pages/Home';
import Login from './Pages/Login';
import AdminDashboard from './Pages/Admin-dashboard';
import EmployeeDashboard from './Pages/Employee-dashboard';
import PrivateRoutes from '../utils/PrivateRoutes.JSX';
import RolebasedRoutes from '../utils/RolebasedRoutes.jsx';
import AdminSummary from './components/Dashboard/AdminSummary.jsx';
import DepartmentList from './components/Department/DepartmentList';
import AddDepartment from './components/Department/AddDepartment.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {EditDepartment} from './components/Department/EditDepartment.jsx';
import EmployeeList from './components/Employee/employeeList.jsx';
import AddEmployee from './components/Employee/AddEmployee.jsx';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Route */}
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Home />
            </>
          }
        />
        <Route path="/login" element={<Login />} />

        {/* ✅ Protected Admin Routes */}
        <Route
          path="/AdminDashboard"
          element={
            <PrivateRoutes>
              <RolebasedRoutes requiredRole={['admin']} />
            </PrivateRoutes>
          }
        >
          {/* ✅ Layout with Sidebar */}
          <Route element={<AdminDashboard />}>
            <Route index element={<AdminSummary />} />
            <Route path="departments" element={<DepartmentList />} />
            <Route path="add-department" element={<AddDepartment />} />
            <Route path="edit-department/:id" element={< EditDepartment />} />
            <Route path="employees" element={<EmployeeList />} />
            <Route path="add-Employee" element={<AddEmployee />} />


          </Route>
        </Route>

        {/* Employee route */}
        <Route path="/EmployeeDashboard" element={<EmployeeDashboard />} />
      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default App;
