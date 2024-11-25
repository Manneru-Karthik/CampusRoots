import React, { useState } from "react";
import "./SignupForm.css"; // Add this CSS file for common styles

const StudentSignup = () => {
  const [formData, setFormData] = useState({
    username: "",
    gmail: "",
    usn: "",
    password: "",
    confirmPassword: "",
    currentYear: ""
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
      const { username, gmail, usn, password, confirmPassword, currentYear } =
        formData;
      const response = await fetch(
        "http://localhost:5000/alumnitracking/studentregistration",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            usn,
            gmail,
            password,
            confirmPassword,
            currentYear,
          }),
        }
      );
      if (response.ok) {
        alert("Check your mail for verification");
      }
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="signup-container">
      <form onSubmit={handleSubmit}>
        <h2>Student Sign Up</h2>
        <input
          type="text"
          name="username"
          placeholder="Name"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="gmail"
          placeholder="Email"
          value={formData.gmail}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="usn"
          placeholder="Usn"
          value={formData.usn}
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
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="currentYear"
          placeholder="Current Year"
          value={formData.currentYear}
          onChange={handleChange}
          required
        />
        <input type="hidden" name="role" value="student" />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default StudentSignup;