import React from "react";
// Import your CSS file for styling

const Achievements = (props) => {
  return (
    <div className="achievement">
      <div className="circle">
        <img
          src={props.image}
          /*alt={`${name}'s Photo`}*/ className="student-photo"
        />
      </div>
      <div className="achievement-details">
        <h3>{props.name}</h3>
        <p>Graduation Year: {props.graduationYear}</p>
        <p>Achievement: {props.achievement}</p>
      </div>
    </div>
  );
};

export default Achievements;
