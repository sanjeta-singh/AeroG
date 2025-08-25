import React from 'react';
import './AircraftCard.css';

const AircraftCard = ({ aircraft }) => {
  // Map models to multiple images (based on your actual files)
  const aircraftImages = {
    A320: ["/aircrafts/A320.1.png", "/aircrafts/A320.2.png"],
    A350: ["/aircrafts/A350.1.png", "/aircrafts/A350.2.png"],
    B737: ["/aircrafts/B737.1.png", "/aircrafts/B737.2.png"],
    CRJ700: ["/aircrafts/crj7.1.png", "/aircrafts/crj7.2.png"], // lowercase in filenames
    E190: ["/aircrafts/E190.1.png", "/aircrafts/E190.2.png"],
  };

  // Extract model part from aircraftId (e.g. "A320-001" → "A320")
  const model = aircraft.aircraftId.split("-")[0];

  // Normalize CRJ700 because your files are named "crj7"
  let key = model.toUpperCase();
  if (key === "CRJ700") key = "CRJ700";

  // Get images for the aircraft model
  const images = aircraftImages[key] || ["/aircrafts/default.png"];

  // Pick a random image each render
  const aircraftImage = images[Math.floor(Math.random() * images.length)];

  return (
    <div className="aircraft-card">
      {/* Aircraft image */}
      <img 
        src={aircraftImage} 
        alt={aircraft.aircraftId} 
        className="aircraft-image"
      />

      {/* Aircraft details */}
      <h3>{aircraft.aircraftId}</h3>
      <p>Engine Temp: {aircraft.engineTemp}°C</p>
      <p>Brake Wear: {aircraft.brakeWear}</p>
      <p>Hydraulic Pressure: {aircraft.hydraulicPressure} psi</p>
      <p>Airspeed: {aircraft.airspeed} knots</p>
      <p>Altitude: {aircraft.altitude} feet</p>
      <p>Flight Status: {aircraft.flightStatus}</p>
      <p>Location: {aircraft.location}</p>
    </div>
  );
};

export default AircraftCard;
