import React, { useEffect, useState } from 'react';
import Sidebar from './components/Sidebar';
import AircraftCard from './components/AircraftCard';
import AlertCard from './components/AlertCard';
import { TAIL_NUMBERS } from './utils/tailNumbers';
import './Dashboard.css';

const AC_WINDOW = 3;
const ALERT_WINDOW = 2;

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const [aircraftData, setAircraftData] = useState([]);
  const [aircraftPos, setAircraftPos] = useState(0);

  const [alertData, setAlertData] = useState([]);
  const [alertPos, setAlertPos] = useState(0);

  /* fetch once */
  useEffect(() => {
    fetch('http://localhost:8087/aircraft')
      .then(r => r.json())
      .then(raw =>
        raw.map((d, i) => ({
          ...d,
          aircraftId: TAIL_NUMBERS[i % TAIL_NUMBERS.length]
        }))
      )
      .then(setAircraftData);

    fetch('http://localhost:8087/alerts')
      .then(r => r.json())
      .then(setAlertData);
  }, []);

  /* slide every second */
  useEffect(() => {
    if (!aircraftData.length || !alertData.length) return;
    const timer = setInterval(() => {
      setAircraftPos(prev => (prev + 1) % aircraftData.length);
      setAlertPos(prev => (prev + 1) % alertData.length);
    }, 1000);
    return () => clearInterval(timer);
  }, [aircraftData, alertData]);

  return (
    <div className="dashboard-container">
      <Sidebar open={sidebarOpen} onToggle={() => setSidebarOpen(prev => !prev)} />

      <main 
        className="main-panel" 
        style={{ 
          marginLeft: sidebarOpen ? 260 : 0, // Changed from 240 to 200 to match sidebar width
          transition: 'margin-left 0.3s ease' // Added smooth transition
        }}
      >
        <h2>Live Dashboard</h2>

        {/* 3 aircraft cards */}
        <div className="section">
          <h3>Aircrafts</h3>
          <div className="mini-cards-row">
            {aircraftData.slice(aircraftPos, aircraftPos + 3).map(a => (
              <AircraftCard key={a._id} aircraft={a} />
            ))}
          </div>
        </div>
        
        {/* 2 alert cards */}
        <div className="section">
          <h3>Alerts</h3>
          <div className="mini-cards-row">
            {alertData.slice(alertPos, alertPos + 2).map(a => (
              <AlertCard key={a._id} alert={a} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}