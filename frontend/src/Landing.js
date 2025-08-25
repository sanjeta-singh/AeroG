import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Landing.css';

const Landing = () => {
  const navigate = useNavigate();

  const handleExplore = () => {
    navigate('/dashboard');
  };

  return (
    <div className="landing">
      <div className="overlay" />
      
      <header className="navbar">
  <div className="logo">
    <img
      src="/icon/logo-white.png"
      alt="AeroG Logo"
      className="logo-img"
    />
  <span className="logo-text">AeroG</span>
  </div>
        <nav className="nav-links">
          <a href="#">Services</a>
          <a href="#">About</a>
          <a href="#">Contact</a>
          
          <button className="btn sign-up" onClick={handleExplore}>
            Explore
          </button>
        </nav>
      </header>

      <div className="hero-text">
        <h1>Monitor. Optimize. Elevate.</h1>
      </div>
    </div>
  );
};

export default Landing;
