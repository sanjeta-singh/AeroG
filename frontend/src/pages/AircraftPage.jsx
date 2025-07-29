import React, { useEffect, useState } from 'react';
import AircraftCard from '../components/AircraftCard';
import { TAIL_NUMBERS } from '../utils/tailNumbers';
import './AircraftPage.css';

const WINDOW = 20;

export default function AircraftPage() {
  const [data, setData] = useState([]);
  const [start, setStart] = useState(0);

  // fetch once
  useEffect(() => {
    fetch('http://localhost:8087/aircraft')
      .then(r => r.json())
      .then(raw =>
        raw.map((d, i) => ({
          ...d,
          aircraftId: TAIL_NUMBERS[i % TAIL_NUMBERS.length]
        }))
      )
      .then(setData);
  }, []);

  // slide window every second
  useEffect(() => {
    if (!data.length) return;
    const timer = setInterval(() => {
      setStart(prev => (prev + 1) % data.length);
    }, 1000);
    return () => clearInterval(timer);
  }, [data]);

  const visible = [...data, ...data].slice(start, start + WINDOW);
  return (
    <>
      <h2 className="aircraft">Aircraft</h2>
      <div className="aircraft-grid">
        {visible.map((a, i) => (
          <AircraftCard key={`${a._id}-${i}`} aircraft={a} />
        ))}
      </div>
    </>
  );
}