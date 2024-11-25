import React, { useState } from "react";
import "./AdminHome.css"; // Optional CSS for styling
import Navbar2 from "./Navbar2"; // Assuming Navbar3 is your navigation bar component

const AdminHome = () => {
  const [data, setData] = useState([]);
  const [viewType, setViewType] = useState(""); // To track whether students or admins are displayed

  const fetchData = async (type) => {
    try {
      const endpoint =
        type === "students"
          ? "https://campusroots.onrender.com/alumnitracking/students"
          : "https://campusroots.onrender.com/alumnitracking/alumnis";

      const response = await fetch(endpoint, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`, // Authorization header
        },
      });

      if (response.ok) {
        const responseData = await response.json();
     
        setData(responseData); // Update the data state with the fetched details
        setViewType(type); // Set viewType to determine the current view
      } else {
        alert("Failed to fetch data. Please try again.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("An error occurred while fetching data.");
    }
  };

  const renderCell = (value) => {
    if (typeof value === "object" && value !== null) {
      return JSON.stringify(value); // Convert nested objects to strings for display
    }
    return value; // Render primitive values as-is
  };

  return (
    <>
   <Navbar2/>
      <div className="admin-home-container">
        <h2>Welcome Admin</h2>
        <div className="button-group">
          <button onClick={() => fetchData("students")}>View Students</button>
          <button onClick={() => fetchData("admins")}>View Admins</button>
        </div>

        <div className="data-display">
          <h3>
            {viewType === "students"
              ? "Student Details"
              : viewType === "admins"
              ? "Admin Details"
              : "Select a category to view details"}
          </h3>
          {data.length > 0 ? (
            <table>
              <thead>
                <tr>
                  {Object.keys(data[0]).map((key) => (
                    <th key={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={index}>
                    {Object.values(item).map((value, idx) => (
                      <td key={idx}>{renderCell(value)}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            viewType && <p>No data available for {viewType}.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminHome;
