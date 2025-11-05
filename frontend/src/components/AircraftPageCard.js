import React from 'react';
import './AircraftPageCard.css';

const AircraftPageCard = ({ aircraft, onCardClick }) => {
  // Calculate health percentage based on engine temp, brake wear, and hydraulic pressure
  const calculateHealth = () => {
    let healthScore = 100;
    
    // Engine temp penalty (threshold: 1185°C)
    if (aircraft.engineTemp > 1000) {
      healthScore -= Math.min(30, (aircraft.engineTemp - 1000) / 6);
    }
    
    // Brake wear penalty (threshold: 0.90)
    if (aircraft.brakeWear > 0.7) {
      healthScore -= Math.min(25, (aircraft.brakeWear - 0.7) * 100);
    }
    
    // Hydraulic pressure penalty (threshold: 2080 psi)
    if (aircraft.hydraulicPressure < 2200) {
      healthScore -= Math.min(25, (2200 - aircraft.hydraulicPressure) / 8);
    }
    
    return Math.max(0, Math.round(healthScore));
  };

  // Calculate flight hours progress (threshold: 4750h)
  const calculateFlightHoursProgress = () => {
    const maxHours = 5000; // Maximum flight hours before maintenance
    return Math.min(100, Math.round((aircraft.flightHours / maxHours) * 100));
  };

  const healthPercentage = calculateHealth();
  const flightHoursProgress = calculateFlightHoursProgress();

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onCardClick) onCardClick(aircraft);
  };

  return (
    <div className="aircraft-page-card" onClick={handleClick}>
      {/* Aircraft ID */}
      <div className="aircraft-page-id">ID: {aircraft.aircraftId}</div>
      
      {/* Health Section */}
      <div className="metric-row">
        <span className="metric-label">Health</span>
        <div 
          className="progress-bar-container" 
          onClick={handleClick}
          style={{ cursor: 'pointer' }}
          title="Click for detailed information"
        >
          <div className="progress-bar">
            <div 
              className="progress-fill health-fill" 
              style={{ width: `${healthPercentage}%` }}
            ></div>
          </div>
        </div>
        <span className="metric-status">{healthPercentage}%</span>
      </div>
      
      {/* Flight Hours Section */}
      <div className="metric-row">
        <span className="metric-label">Flight Hours</span>
        <div 
          className="progress-bar-container" 
          onClick={handleClick}
          style={{ cursor: 'pointer' }}
          title="Click for detailed information"
        >
          <div className="progress-bar">
            <div 
              className="progress-fill flight-hours-fill" 
              style={{ width: `${flightHoursProgress}%` }}
            ></div>
          </div>
        </div>
        <span className="metric-status">{flightHoursProgress}%</span>
      </div>
    </div>
  );
};

export default AircraftPageCard;
