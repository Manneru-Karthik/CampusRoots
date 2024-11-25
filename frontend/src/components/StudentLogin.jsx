import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const StudentLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    role: "student",
    gmail: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    try {
      const { gmail, password, role } = formData;
      const response = await fetch(
        "http://localhost:5000/alumnitracking/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            gmail,
            password,
            role,
          }),
        }
      );
      if (response.status === 401) {
        alert("Password is incorrect. Please try again.");
        return;
      }
      const responsedata = await response.json();
      sessionStorage.setItem("token",responsedata.token);
      sessionStorage.setItem("role","student");
      // Redirect to home page
      navigate("/home");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <h2>Student Login</h2>
        <input
          type="email"
          name="gmail"
          placeholder="Email"
          value={formData.gmail}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <input type="hidden" name="role" value="student" />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default StudentLogin;