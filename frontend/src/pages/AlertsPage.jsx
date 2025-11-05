import React, { useEffect, useState } from 'react';
import AlertCard from '../components/AlertCard';
import './AlertsPage.css';

const WINDOW  = 2;      // how many alert cards we show
const POLL_MS = 1000;   // poll interval

export default function AlertsPage() {
  const [alerts, setAlerts] = useState([]);
  const [pos, setPos] = useState(0);

  /* =========================================================
     POLL – wipe old data if back-end silent
     ========================================================= */
  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const res  = await fetch('http://localhost:8087/alerts');
        const json = await res.json();
        setAlerts(Array.isArray(json) ? json : []); // empty if nothing
      } catch (e) {
        setAlerts([]); // unreachable → blank
      }
    };

    fetchAlerts();
    const id = setInterval(fetchAlerts, POLL_MS);
    return () => clearInterval(id);
  }, []);

  /* =========================================================
     ROTATION – only when we have data
     ========================================================= */
  useEffect(() => {
    if (!alerts.length) return;
    const t = setInterval(() => {
      setPos(prev => (prev + WINDOW) % alerts.length);
    }, 1500);
    return () => clearInterval(t);
  }, [alerts]);

  /* =========================================================
     VISIBLE SLICE
     ========================================================= */
  const visible =
    alerts.length === 0
      ? []
      : Array.from({ length: WINDOW }, (_, i) => {
          const idx = (pos + i) % alerts.length;
          return alerts[idx];
        });

  return (
    <>
      <h2 className="alerts">Alerts</h2>
      <div className="alert-grid">
        {visible.map(a => (
          <AlertCard key={a._id} alert={a} />
        ))}
      </div>
    </>
  );
}