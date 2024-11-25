import React, { useState } from "react";
import "./SignupForm.css"; // Add this CSS file for common styles

const AlumniSignup = () => {
  const [formData, setFormData] = useState({
    username: "",
    gmail: "",
    password: "",
    year: "",
    confirmPassword: "",
    expertise: "",
    currentRole: "",
    achievements: "",
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
      const { username, gmail, year, password, confirmPassword,expertise,currentRole,achievements } = formData;
      const response = await fetch(
        "https://campusroots.onrender.com/alumnitracking/alumniregistration",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            year,
            gmail,
            password,
            confirmPassword,
            expertise,currentRole,achievements,
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
        <h2>Alumni Sign Up</h2>
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
          name="year"
          placeholder="Batch ex: 2021-2025"
          value={formData.year}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="expertise"
          placeholder="Expertise/Experience"
          value={formData.expertise}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="currentRole"
          placeholder="Current Role"
          value={formData.currentRole}
          onChange={handleChange}
          required
        />
        <textarea
          name="achievements"
          placeholder="Achievements"
          value={formData.achievements}
          onChange={handleChange}
          required
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default AlumniSignup;