import React from 'react';
import './AircraftCard.css';

const AircraftCard = ({ aircraft }) => {
  console.log('Aircraft object in card:', aircraft); // Add this line
  
  return (
    <div className="aircraft-card">
      <h3>{aircraft._id}</h3> {/* Add fallback */}
      <p>Engine Temp: {aircraft.engineTemp}°C</p>
      <p>Brake Wear: {aircraft.brakeWear}</p>
      <p>Hydraulic Pressure: {aircraft.hydraulicPressure} psi</p>
      <p>Flight Hours: {aircraft.flightHours} h</p>
      <p>Fuel Efficiency: {aircraft.fuelEfficiency}</p>
      <p>Airspeed: {aircraft.airspeed} knots</p>
      <p>Altitude: {aircraft.altitude} ft</p>
      <p>Outside Temp: {aircraft.outsideTemp}°C</p>
      <p>Failure Label: {aircraft.failureLabel}</p>
    </div>
  );
};

export default React.memo(AircraftCard);