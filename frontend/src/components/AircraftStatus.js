import React, { useEffect, useState } from 'react';
import AircraftCard from './AircraftCard';
import './AircraftStatus.css';

const AircraftStatus = () => {
  const [aircraftData, setAircraftData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8081/aircraft');
        const data = await response.json();
        setAircraftData(data);
      } catch (error) {
        console.error('Error fetching aircraft data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container">
      <h2 className="title">Aircraft Dashboard</h2>
      <div className="aircraft-cards">
        {aircraftData.map(aircraft => (
          <AircraftCard key={aircraft.id} aircraft={aircraft} />
        ))}
      </div>
    </div>
  );
};

export default AircraftStatus;