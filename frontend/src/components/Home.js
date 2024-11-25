import React, { useEffect, useState } from "react";
import Banner from "./Banner";
import About from "./About";
import StudentAchievement from "./StudentAchievement";
import Alumni from "./Alumni";
import Team from "./Team";
import axios from 'axios';
import Navbar2 from "./Navbar2";
const Home = () => {



    const [data, setData] = useState(null); // State to store fetched data
    const [loading, setLoading] = useState(true); // State to track loading
  
    useEffect(() => {
      const fetchData = async () => {
        const token = sessionStorage.getItem("token"); // Retrieve token from localStorage
        
        try {
          const response = await fetch("https://campusroots.onrender.com/alumnitracking/home", {
            method: "GET",
            headers: {
              "Authorization": `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          });
  
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const result = await response.json(); // Parse the JSON response
          console.log(result);
          sessionStorage.setItem("user", JSON.stringify(result.user));

          // Retrieve and parse it back to an object
          setData(result); // Save the result in the state
        } catch (error) {
          console.error("Error fetching data:", error.message);
        } finally {
          setLoading(false); // Stop loading
        }
      };
  
      fetchData();
    }, []);
  
    return (
      <>
        <Navbar2 />
        <div>
  <p>Welcome</p>
  {data && data.user && data.user.username && (
    <h3 style={{ marginTop: "10px" }}>
      Hello, <strong>{data.user.username}</strong>!
    </h3>
  )}
</div>

  
        <Banner />
        <About />
        <StudentAchievement />
        <Alumni />
        <Team />
      </>
    );
  };
  
  export default Home;
  