import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import Navbar from "./Navbar";

const AlumniLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    role: "alumni",
    gmail: "",
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
      const { gmail, password, role } = formData;
      const response = await fetch(
        "https://campusroots.onrender.com/alumnitracking/login",
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
      
      // Redirect to home page
      navigate("/home");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <h2>Alumni Login</h2>
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
        <input type="hidden" name="role" value="alumni" />
        <button type="submit">Login</button>
      </form>
    </div>
    </>
  );
};

export default AlumniLogin;


// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const AlumniLogin = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({ gmail: "", password: "" });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch("http://localhost:5000/alumnitracking/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });
//       const data = await response.json();
//       if (data.token) {
//         localStorage.setItem("token", data.token);
//         navigate("/home"); // Redirect to home after login
//       } else {
//         console.error("Login failed");
//       }
//     } catch (error) {
//       console.error("Error logging in:", error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <h2>Login</h2>
//       <input type="email" name="gmail" placeholder="Email" onChange={handleChange} required />
//       <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
//       <button type="submit">Login</button>
//     </form>
//   );
// };

// export default AlumniLogin;
