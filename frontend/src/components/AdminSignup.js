import React, { useState } from "react";
import "./SignupForm.css"; // Ensure you have a CSS file for styles

  import { useNavigate } from "react-router-dom";


const AdminSignup = () => {
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
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
      const { username, password } = formData;
      const response = await fetch(
        "https://campusroots.onrender.com/alumnitracking/admin/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            password,
          }),
        }
      );
      if (response.ok) {
        alert("Admin account created successfully. You can now log in.");
      } else {
        const errorData = await response.json();
        alert(`Signup failed: ${errorData.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error during signup:", error);
      alert("An error occurred during signup. Please try again later.");
    }
  };

  return (
    <div className="signup-container">
      <form onSubmit={handleSubmit}>
        <h2>Admin Sign Up</h2>
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
        <button onClick={() => navigate("/admin-login")}>Sign In</button>

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default AdminSignup;
