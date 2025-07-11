import React from 'react';
import './Landing.css';

const Landing = () => {
  return (
    <div className="landing">
      <div className="overlay" />
      <header className="navbar">
        <div className="logo">
          <span className="logo-icon">
  <img src="/icon/airplane-travelling-around-earth-svgrepo-com.svg" alt="Plane logo" className="logo-img" />
</span>
          <span className="logo-text">AeroG</span>
        </div>
        <nav className="nav-links">
          <a href="#">Services</a>
          <a href="#">About</a>
          <a href="#">Contact</a>
          <button className="btn sign-in">Sign In</button>
          <button className="btn sign-up">Sign Up</button>
        </nav>
      </header>
      <div className="hero-text">
        <h1>Monitor. Optimize. Elevate.</h1>
      </div>
    </div>
  );
};

export default Landing;
