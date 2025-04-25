import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';  // Adjust path if needed
import Home from './Pages/Home'
import EmployeeLogin from './Pages/EmployeeLogin';  
import AdminLogin from './Pages/AdminLogin' ;
function App() {
  return (
    < Router>
          <Navbar />
          <Routes>
                  <Route path="/" element={<Home/>} /> 
                  <Route path="/admin-login" element ={<AdminLogin/>}/>
                  <Route path="/employee-login" element={<EmployeeLogin />} />
                     
          </Routes>  
        </Router>
  );
}

export default App;
