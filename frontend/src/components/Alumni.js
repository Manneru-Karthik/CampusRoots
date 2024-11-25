import React from "react";
import linkedin from "../assets/linkedin.png";
import facebook from "../assets/facebook.png";
import website from "../assets/world-wide-web.png";
import "./Alumni.css";
const Alumni = () => {
  return (
    <div className="project-info-container">
      <div className="project-info">
        <h2>About Alumni Tracking System</h2>
        <p>
          The Alumni Tracking System is a web-based application designed to help
          colleges and the Directorate of Higher Education keep track of their
          alumni. This system allows alumni members to register and update their
          details, enables colleges to verify and authenticate alumni, and
          provides a platform for communication and event management.
        </p>
      </div>
      <div className="social-media-links">
        <h2>Follow Us</h2>
        <div className="icons">
          <a
            href="http://www.theoxford.edu/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={website} alt="Website" />
          </a>

          <a
            href="https://www.facebook.com/collegeoxford"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={facebook} alt="Facebook" />
          </a>
          <a
            href="https://www.linkedin.com/school/the-oxford-college-of-education-1st-phase-j.p.-nagar-bangalore--78./"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={linkedin} alt="LinkedIn" />
          </a>
          {/* Add more social media links as needed */}
        </div>
      </div>
    </div>
  );
};

export default Alumni;