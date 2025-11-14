import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './page/login';
import Register from './page/register';
import EmergencyDoctor from './page/EmergencyDoctors';
import Home from './page/Home';


// App.jsx

function App() {
    return (
        <Router>
            {/* <div className="container">  <-- REMOVE THIS */}
                <Routes>
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/" element={<Home />} />
                    <Route path="/emergency-doctors" element={<EmergencyDoctor />} />
NT
                </Routes>
            {/* </div> <-- AND THIS */}
        </Router>
    );
}

export default App;


// import { Toaster } from "react-hot-toast";
// import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
// import Login from "./page/login";
// import Register from "./page/register";
// import Home from "./page/Home";
// import EmergencyDoctors from "./page/EmergencyDoctors";

// function App() {
//   return (
//     <BrowserRouter>
//       <div>
//         <Toaster position="top-center" />
//         <Routes>
//           <Route path="/login" element={<Login/>} />
//           <Route path="/" element={<Home/>} />
//           <Route path="/register" element={<Register/>}/>
//           <Route path="/emergency-doctors" element={<EmergencyDoctors/>}/>
//         </Routes>
//       </div>
//     </BrowserRouter>
//   );
// }

// export default App;