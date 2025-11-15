import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './page/login';
import Register from './page/register';
import EmergencyDoctor from './page/EmergencyDoctors';
import Home from './page/Home';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/home" element={<Home />} />  {/* Changed from "/" to "/home" */}
                <Route path="/emergency-doctors" element={<EmergencyDoctor />} />
                <Route path="/" element={<Navigate to="/login" replace />} />  {/* Redirect root to login */}
                <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
        </Router>
    );
}
 
export default App;