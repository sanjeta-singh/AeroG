import React, { useEffect, useState } from 'react';
import AlertCard from '../components/AlertCard';
import './AlertsPage.css';

const WINDOW = 20;

export default function AlertsPage() {
  const [data, setData] = useState([]);
  const [start, setStart] = useState(0);

  useEffect(() => {
    fetch('http://localhost:8087/alerts')
      .then(r => r.json())
      .then(setData);
  }, []);

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
      <h2 className="alerts">Alerts</h2>
      <div className="alert-grid">
        {visible.map((a, i) => (
          <AlertCard key={`${a._id}-${i}`} alert={a} />
        ))}
      </div>
    </>
  );
}