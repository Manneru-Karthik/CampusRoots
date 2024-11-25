import ProtectedRoute from "./ProtectedRoute";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, useSearchParams } from "react-router-dom";

import Home from "./components/Home";
import AlumniSpace from "./components/AlumniSpace";
import Gallery from "./components/Gallery";
import DualSignup from "./components/DualSignup";
import DualLogin from "./components/DualLogin";
import Footer from "./components/Footer";
import CreateJob from "./components/CreateJob";
import Jobs from "./components/Jobs";
import CreateEvent from "./components/CreateEvent";
import Events from "./components/Events";
import AdminLogin from "./components/AdminLogin";
import Login from "./components/AlumniLogin";
import StudentLogin from "./components/StudentLogin";
import "./App.css"; // Import the App.css file
import EmailVerification from "./components/EmailVerification";
import StudentEmailVerification from "./components/StudentEmailVerification";

import AdminSignup from "./components/AdminSignup";
import AdminHome from "./components/AdminHome";

const App = () => {
  // const { isLoggedIn, setIsLoggedIn } = useState(false);

  // // Check login state on initial render from localStorage
  // useEffect(() => {
  //   const token = localStorage.getItem('token');
  //   if (token) {
  //     setIsLoggedIn(true); // User is logged in
  //   } else {
  //     setIsLoggedIn(false); // User is not logged in
  //   }
  // }, []); // Empty dependency array to run only on initial render

  return (
    <Router>
      <div className="app">
        <div className="content">
          <Routes>
          <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} /> 
            <Route path="/dual-signup" element={<DualSignup /> } />
            <Route path="/alumni-login" element={<Login /> } />
            <Route path="/student-login" element={<StudentLogin /> } />
            <Route path="/admin-login" element={<AdminLogin /> } />
            
            <Route path="/adminhome" element={<ProtectedRoute><AdminHome /> </ProtectedRoute>} />
            

            <Route path="/alumni-space" element={<ProtectedRoute><AlumniSpace /> </ProtectedRoute>} />
            <Route path="/gallery" element={<ProtectedRoute><Gallery /></ProtectedRoute>} />
            <Route path="/jobs" element={<ProtectedRoute><Jobs /></ProtectedRoute>} />
            <Route path="/create-job" element={<ProtectedRoute><CreateJob /> </ProtectedRoute>} />
            <Route path="/events" element={<ProtectedRoute><Events /> </ProtectedRoute>} />
            <Route path="/create-event" element={<ProtectedRoute><CreateEvent /> </ProtectedRoute>} />
            <Route path="/" element={<DualLogin />} />
            <Route path="/adminsignup" element={<AdminSignup /> } />
             {/*<Route path="/alumni-home" element={<Home/>} />  */}
            <Route path="/verify-email" element={<EmailVerification/>}/>
            <Route path="/verifystudentemail" element={<StudentEmailVerification/>}/>
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
