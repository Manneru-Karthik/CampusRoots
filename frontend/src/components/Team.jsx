import React from "react";
import "./Team.css";
import linkedin from "../assets/linkedin.png";
import github from "../assets/github.png";
const Team = () => {
  return (
    <div className="team-container">
      <h2>Meet Our Team</h2>
      <div className="team-members">
        <div className="team-member">
          <h3>Meghanath</h3>
          {/* <p>Project Contribution: Frontend Development</p> */}
          <div className="social-links">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={linkedin} alt="LinkedIn" />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={github} alt="GitHub" />
            </a>
            
          </div>
        </div>
        <div className="team-member">
          <h3>Karthik </h3>
          {/* <p>Project Contribution: Backend Development</p> */}
          <div className="social-links">
            <a
              href="https://linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={linkedin} alt="LinkedIn" />
            </a>
            <a
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={github} alt="GitHub" />
            </a>
          </div>
          
        </div>
       
        <div className="team-member">
          <h3>Jahanvi Gupta</h3>
          {/* <p>Project Contribution: Backend Development</p> */}
          <div className="social-links">
            <a
              href="https://linkedin.com/in"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={linkedin} alt="LinkedIn" />
            </a>
            <a
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={github} alt="GitHub" />
            </a>
          </div>
          
        </div>
        <div className="team-member">
          <h3>Kishore Bajji</h3>
          {/* <p>Project Contribution: Backend Development</p> */}
          <div className="social-links">
            <a
              href="https://linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={linkedin} alt="LinkedIn" />
            </a>
            <a
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={github} alt="GitHub" />
            </a>
          </div>
          
        </div>
        
        {/* Add more team members as needed */}
      </div>
    </div>
  );
};

export default Team;