
import React from "react";
import "./Gallery.css";

import Navbar2 from "./Navbar2";
const Gallery = () => {
  const photos = [
    "/path-to-photo1.jpg",
    "/path-to-photo2.jpg",
    "/path-to-photo3.jpg",
    // Add more photo paths as needed
  ];

  return (
    <>
      <Navbar2 />
    <div className="gallery-container">
      <h2>College Gallery</h2>
      <div className="gallery-grid">
        {photos.map((photo, index) => (
          <div key={index} className="gallery-item">
            <img src={photo} alt={`College photo ${index + 1}`} />
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default Gallery;