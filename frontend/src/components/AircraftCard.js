import React, { useMemo } from 'react';
import './AircraftCard.css';

const AircraftCard = ({ aircraft }) => {
  /* 1.  same image map  */
  const aircraftImages = {
    A320: ["/aircrafts/A320.1.png", "/aircrafts/A320.2.png"],
    A350: ["/aircrafts/A350.1.png", "/aircrafts/A350.2.png"],
    B737: ["/aircrafts/B737.1.png", "/aircrafts/B737.2.png"],
    CRJ700: ["/aircrafts/crj7.1.png", "/aircrafts/crj7.2.png"],
    E190: ["/aircrafts/E190.1.png", "/aircrafts/E190.2.png"],
  };

  /* 2.  stable key for this aircraft  */
  const model = aircraft.aircraftId.split("-")[0].toUpperCase();
  const key   = model === "CRJ700" ? "CRJ700" : model;

  /* 3.  pick image ONLY when aircraft row changes  */
  const aircraftImage = useMemo(() => {
    const imgs = aircraftImages[key] || ["/aircrafts/default.png"];
    return imgs[Math.floor(Math.random() * imgs.length)];
  }, [key, aircraft._id]); // <-- only recalculate when row changes

  return (
    <div className="aircraft-card">
      <img src={aircraftImage} alt={aircraft.aircraftId} className="aircraft-image" />
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