import React, { useState } from "react";
import AdminLogin from "./AdminLogin";
import StudentLogin from "./StudentLogin";
import AlumniLogin from "./AlumniLogin";
import "./DualLogin.css";
import Navbar from "./Navbar";

const DualLogin = () => {
  const [activeForm, setActiveForm] = useState("student");

  return (
    <>
    <Navbar />

    <div className="dual-login-container">
      <div className="toggle-buttons">
        <button
          className={`toggle-button ${activeForm === "student" ? "active" : ""}`}
          onClick={() => setActiveForm("student")}
        >
          Student
        </button>
        <button
          className={`toggle-button ${activeForm === "alumni" ? "active" : ""}`}
          onClick={() => setActiveForm("alumni")}
        >
          Alumni
        </button>
        <button
          className={`toggle-button ${activeForm === "admin" ? "active" : ""}`}
          onClick={() => setActiveForm("admin")}
        >
          Admin
        </button>
      </div>
      <div className="login-wrapper">
        {activeForm === "student" && <StudentLogin />}
        {activeForm === "alumni" && <AlumniLogin />}
        {activeForm === "admin" && <AdminLogin />}
      </div>
    </div>
    </>
  );
};

export default DualLogin;