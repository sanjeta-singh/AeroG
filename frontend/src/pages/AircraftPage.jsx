import React, { useEffect, useState } from 'react';
import AircraftCard from '../components/AircraftCard';
import './AircraftPage.css';

export default function AircraftPage() {
  const [data, setData] = useState([]);
  const [start, setStart] = useState(0);

  // fetch once
  useEffect(() => {
    fetch('http://localhost:8087/aircraft').then(r => r.json()).then(setData);
  }, []);

  // slide 20 cards every second
  useEffect(() => {
    if (!data.length) return;
    const timer = setInterval(() => {
      setStart(prev => (prev + 1) % data.length);
    }, 1000);
    return () => clearInterval(timer);
  }, [data]);

  const visible = data.slice(start, start + 20);
  return (
    <>
      <h2 className="aircraft">Aircraft</h2>
      <div className="aircraft-grid">
        {visible.map(a => (
          <AircraftCard key={a._id} aircraft={a} />
        ))}
      </div>
    </>
  );
}