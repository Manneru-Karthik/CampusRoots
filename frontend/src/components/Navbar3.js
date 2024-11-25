import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar3 = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    const currentTheme = localStorage.getItem("theme");
    if (currentTheme === "dark") {
      setIsDarkTheme(true);
      document.body.classList.add("dark-theme");
    } else {  
      setIsDarkTheme(false);
      document.body.classList.remove("dark-theme");
    }
  }, []);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleThemeToggle = () => {
    setIsDarkTheme(!isDarkTheme);
    if (isDarkTheme) {
      document.body.classList.remove("dark-theme");
      localStorage.setItem("theme", "light");
    } else {
      document.body.classList.add("dark-theme");
      localStorage.setItem("theme", "dark");
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="navbar-logo">
          <img src="/path-to-logo.png" alt="Logo" className="navbar-logo" />
        </Link>
        <Link to="/adminhome" className="navbar-title">
          XAlumni
        </Link>
      </div>
      <div className={`navbar-right ${isMenuOpen ? "active" : ""}`}>
        <Link to="/adminhome" className="navbar-link">
          Home
        </Link>
        <Link to="/alumni-space" className="navbar-link">
          Alumni Space
        </Link>
        <Link to="/gallery" className="navbar-link">
          Gallery
        </Link>
        <Link 
  to="/" 
  onClick={() => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
  }} 
  className="navbar-link"
>
  Logout
</Link>

        <i
          className={`fas ${isDarkTheme ? "fa-sun" : "fa-moon"} theme-toggle`}
          onClick={handleThemeToggle}
        ></i>
      </div>
      <button
        className={`hamburger ${isMenuOpen ? "toggle" : ""}`}
        onClick={handleMenuToggle}
        aria-label="Toggle navigation"
      >
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </button>
    </nav>
  );
};

export default Navbar3;