import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';  // Adjust path if needed
import Home from './Pages/Home'
import Login from './Pages/Login'; 
import AdminDashboard from './Pages/Admin-dashboard'
import EmployeeDashboard from './Pages/Employee-dashboard';
import PrivateRoutes from '../utils/PrivateRoutes.JSX';
import RolebasedRoutes from '../utils/RolebasedRoutes.jsx';
import AdminSummary from './components/Dashboard/AdminSummary.jsx';
import DepartmentList from './components/Departments/DepartmentList.jsx';
 

function App() {
  return (
    <Router>
      <Routes>
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
        <Route
          path="/AdminDashboard"
          element={
            <PrivateRoutes>
              <RolebasedRoutes requiredRole={['admin']}>
                <AdminDashboard />
              </RolebasedRoutes>
            </PrivateRoutes>
          }>
            <Route index element={<AdminSummary/>}></Route>
            <Route path="/AdminDashboard/departments" element={<DepartmentList/>}></Route>


          </Route>
        

        <Route path="/EmployeeDashboard" element={<EmployeeDashboard />}></Route> 
      </Routes>
    </Router>
  );
}


export default App;
