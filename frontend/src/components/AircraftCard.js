import React from 'react';
import './AircraftCard.css';

const AircraftCard = ({ aircraft }) => {
  return (
    <div className="aircraft-card">
      <h3>{aircraft.aircraftId}</h3>
      <p>Engine Temp: {aircraft.engineTemp}°C</p>
      <p>Brake Wear: {aircraft.brakeWear}</p>
      <p>Hydraulic Pressure: {aircraft.hydraulicPressure} psi</p>
      <p>Airspeed: {aircraft.airspeed} knots</p>
      <p>Altitude: {aircraft.altitude} feet</p>
      <p>Failure Label: {aircraft.failureLabel}</p>
      <p>Flight Status: {aircraft.flightStatus}</p>
     <p>Location: {aircraft.location}</p>
    </div>
  );
};

export default AircraftCard;