import React from "react";
import "./Banner.css";
import banner from "../assets/banner.jpg";
const Banner = () => {
  return (
    <div className="banner-slider">
      <img src={banner} alt="Banner 1" className="banner-image" />
    </div>
  );
};

export default Banner;