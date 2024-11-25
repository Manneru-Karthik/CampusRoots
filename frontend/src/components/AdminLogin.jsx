import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    role: "admin",
    username: "",
    password: "",
  });
  
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { username, password, role } = formData;
      const response = await fetch(
        "https://campusroots.onrender.com/alumnitracking/admin/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
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
      sessionStorage.setItem("role","admin");

      navigate("/adminhome");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <h2>Admin Login</h2>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
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
        <input type="hidden" name="role" value="admin" />

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default AdminLogin;