import React from "react";
import Alumni from "./Alumni";
import Team from "./Team";
import { Link } from "react-router-dom";
import "./AlumniSpace.css";
import jobs from "../assets/jobs.jpg";
import events from "../assets/events.jpg";
import Navbar2 from "./Navbar2";



const AlumniSpace = () => {

  return (
    <>
  <Navbar2 />
      <div className="dashboard-section">
        <h2>Job Opportunities</h2>
        <img src={jobs} alt="job photo" />
        <p>Find the perfect job that matches your skills and aspirations</p>
        <Link to="/jobs" className="dashboard-button">
          View Jobs
        </Link>
      </div>
      <div className="dashboard-section">
        <h2>Upcoming Events</h2>
        <img src={events} alt="event photo" />
        <p>Stay updated with the latest events and gatherings.</p>
        <Link to="/events" className="dashboard-button">
          View Events
        </Link>
      </div>
      <Alumni />
      <Team />
    </>
  );
};

export default AlumniSpace;