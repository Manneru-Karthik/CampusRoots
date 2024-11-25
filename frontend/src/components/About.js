import React from "react";
import CollegePhoto from "../assets/clgphoto.jpg";
// Import your CSS file for styling
import "./About.css";

const About = () => {
  return (
    <div className="about-container">
      <div className="about-info">
        <h2>About Our College</h2>
        <div className="college-photo">
          <img src={CollegePhoto} alt="College Photo" />
        </div>

        <p>
          TOCE was established in the year 2000 at a prime location in
          Bengaluru, the Silicon City of India by “The Children’s Education
          Society”, founded in the year 1974 by a great visionary and a
          philanthropist Late Sri. S Narasa Raju and nurtured by his illustrious
          son Dr. S N V L Narasimha Raju, Chairman, The Oxford Educational
          Institutions. TOCE is one of the renowned technical institutions
          providing quality education in Bengaluru. Institute has
          state-of-the-art facilities and dedicated human resources for
          proficient education with an emphasis on imagination and innovation.
          Our goal is to mould highly skilled technical and management
          professionals with a wide range of analytical, strategic and
          leadership capabilities to meet the global challenges. We endeavour to
          equip our students into world class professionals with both technical
          and management skills along with ethical values, so that they
          contribute effectively to the industry and society. We are proud of
          teaching and non-teaching team, engaging the students in a wide range
          of exciting learning opportunities with innovative ideas for overall
          development.
        </p>
      </div>
    </div>
  );
};

export default About;