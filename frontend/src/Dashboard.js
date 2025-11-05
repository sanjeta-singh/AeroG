import React, { useEffect, useState } from 'react';
import Sidebar from './components/Sidebar';
import AircraftCard from './components/AircraftCard';
import AlertCard from './components/AlertCard';
import './Dashboard.css';

const AC_WINDOW  = 3;                       // aircraft cards visible
const ALERT_WINDOW = 2;                     // alert cards visible
const POLL_MS      = 1000;                  // poll interval

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  /* ----------  aircraft  ---------- */
  const [aircraftData, setAircraftData] = useState([]);
  const [aircraftPos, setAircraftPos]   = useState(0);

  /* ----------  alerts  ---------- */
  const [alertData, setAlertData] = useState([]);
  const [alertPos, setAlertPos]   = useState(0);

  /* ----------  summary numbers  ---------- */
  const [summary, setSummary] = useState({
    total: 0,
    inFlight: 0,
    totalAlerts: 0,
    critical: 0,
  });

  /* =========================================================
     SINGLE POLLING EFFECT – wipes old data if back-end silent
     ========================================================= */
  useEffect(() => {
    const fetchBoth = async () => {
      try {
        const [acRes, alRes] = await Promise.all([
          fetch('http://localhost:8087/aircraft'),
          fetch('http://localhost:8087/alerts'),
        ]);
        const ac = await acRes.json();
        const al = await alRes.json();

        /*  always use what the server returned (empty array if nothing) */
        const aircraft = Array.isArray(ac) ? ac : [];
        const alerts   = Array.isArray(al) ? al : [];

        setAircraftData(aircraft);
        setAlertData(alerts);

        setSummary({
          total: aircraft.length,
          inFlight: aircraft.filter(a => a.flightStatus === 'IN_FLIGHT').length,
          totalAlerts: alerts.length,
          critical: alerts.filter(a => a.urgency === 'EMERGENCY').length,
        });
      } catch (e) {
        /*  back-end unreachable → wipe everything  */
        setAircraftData([]);
        setAlertData([]);
        setSummary({ total: 0, inFlight: 0, totalAlerts: 0, critical: 0 });
      }
    };

    fetchBoth();               // first call
    const id = setInterval(fetchBoth, POLL_MS);
    return () => clearInterval(id);
  }, []);

  /* =========================================================
     ROTATION TIMERS – run only when we have data
     ========================================================= */
  useEffect(() => {
    if (!aircraftData.length || !alertData.length) return;
    const timer = setInterval(() => {
      setAircraftPos(prev => (prev + AC_WINDOW) % aircraftData.length);
      setAlertPos(prev => (prev + ALERT_WINDOW) % alertData.length);
    }, 1500);
    return () => clearInterval(timer);
  }, [aircraftData, alertData]);

  /* =========================================================
     VISIBLE SLICES (empty when no data)
     ========================================================= */
  const visibleAircraft =
    aircraftData.length === 0
      ? []
      : Array.from({ length: AC_WINDOW }, (_, i) => {
          const idx = (aircraftPos + i) % aircraftData.length;
          return aircraftData[idx];
        });

  const visibleAlerts =
    alertData.length === 0
      ? []
      : Array.from({ length: ALERT_WINDOW }, (_, i) => {
          const idx = (alertPos + i) % alertData.length;
          return alertData[idx];
        });

  /* =========================================================
     RENDER
     ========================================================= */
  return (
    <div className="dashboard-container">
      <Sidebar open={sidebarOpen} onToggle={() => setSidebarOpen(p => !p)} />
      <main className="main-panel" style={{ marginLeft: sidebarOpen ? 260 : 0 }}>
        <h2>Live Dashboard</h2>

        <div className="dashboard-layout">
          {/*  LEFT COLUMN  */}
          <div className="left-column">
            {/*  SUMMARY BAR  */}
            <div className="summary-bar">
              <div className="summary-card">
                <div className="summary-number">{summary.total}</div>
                <div className="summary-label">Total Aircraft</div>
              </div>
              <div className="summary-card">
                <div className="summary-number">{summary.inFlight}</div>
                <div className="summary-label">In Flight</div>
              </div>
              <div className="summary-card">
                <div className="summary-number">{summary.totalAlerts}</div>
                <div className="summary-label">Total Alerts</div>
              </div>
              <div className="summary-card critical">
                <div className="summary-number">{summary.critical}</div>
                <div className="summary-label">Critical</div>
              </div>
            </div>

            {/*  AIRCRAFT CARDS  */}
            <div className="aircraft-section">
              <h3>Aircraft Fleet</h3>
              <div className="aircraft-grid">
                {visibleAircraft.map(ac => (
                  <AircraftCard key={ac._id} aircraft={ac} />
                ))}
              </div>
            </div>
          </div>

          {/*  RIGHT COLUMN  */}
          <div className="right-column">
            <div className="alerts-section">
              <h3>Active Alerts</h3>
              <div className="alerts-container">
                {visibleAlerts.map(al => (
                  <AlertCard key={al._id} alert={al} />
                ))}
              </div>
            </div>

            <div className="services-section">
              <h3>Additional Services</h3>
              <div className="services-placeholder">
                <p>Space reserved for future services</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}