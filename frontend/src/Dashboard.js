import React, { useEffect, useMemo, useState } from 'react';
import Sidebar from './components/Sidebar';
import AircraftCard from './components/AircraftCard';
import AlertCard from './components/AlertCard';
import './Dashboard.css';

const AC_WINDOW  = 3;                       // aircraft cards visible
const ALERT_WINDOW = 3;                     // alert cards visible
const POLL_MS      = 1000;                  // poll interval

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  /* ----------  aircraft  ---------- */
  const [aircraftData, setAircraftData] = useState([]);
  const [aircraftPos, setAircraftPos]   = useState(0);

  /* ----------  alerts  ---------- */
  const [alertData, setAlertData] = useState([]);
  const [alertPos, setAlertPos]   = useState(0);

  /* =========================================================
     POLLING – replace data completely so stale cards disappear
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
        setAircraftData(Array.isArray(ac) ? ac : []);
        setAlertData(Array.isArray(al) ? al : []);
      } catch (e) {
        setAircraftData([]);
        setAlertData([]);
      }
    };
    fetchBoth();
    const id = setInterval(fetchBoth, POLL_MS);
    return () => clearInterval(id);
  }, []);

  /* =========================================================
     ROTATION – independent per list
     ========================================================= */
  useEffect(() => {
    if (!aircraftData.length) return;
    const t = setInterval(() => {
      setAircraftPos(prev => (prev + AC_WINDOW) % aircraftData.length);
    }, 1500);
    return () => clearInterval(t);
  }, [aircraftData]);

  useEffect(() => {
    if (!alertData.length) return;
    const t = setInterval(() => {
      setAlertPos(prev => (prev + ALERT_WINDOW) % alertData.length);
    }, 1500);
    return () => clearInterval(t);
  }, [alertData]);

  useEffect(() => { setAircraftPos(0); }, [aircraftData.length]);
  useEffect(() => { setAlertPos(0); }, [alertData.length]);

  /* =========================================================
     SUMMARY – derive from data (kept visible)
     ========================================================= */
  const summary = useMemo(() => ({
    total: aircraftData.length,
    inFlight: aircraftData.filter(a => a.flightStatus === 'IN_FLIGHT').length,
    totalAlerts: alertData.length,
    critical: alertData.filter(a => a.urgency === 'EMERGENCY').length,
  }), [aircraftData, alertData]);

  /* =========================================================
     WINDOWS
     ========================================================= */
  const visibleAircraft =
    aircraftData.length === 0
      ? []
      : Array.from({ length: Math.min(AC_WINDOW, aircraftData.length) }, (_, i) => {
          const idx = (aircraftPos + i) % aircraftData.length;
          return aircraftData[idx];
        });

  const visibleAlerts =
    alertData.length === 0
      ? []
      : Array.from({ length: Math.min(ALERT_WINDOW, alertData.length) }, (_, i) => {
          const idx = (alertPos + i) % alertData.length;
          return alertData[idx];
        });

  return (
    <div className="dashboard-container">
      <Sidebar open={sidebarOpen} onToggle={() => setSidebarOpen(p => !p)} />
      <main className="main-panel" style={{ marginLeft: sidebarOpen ? 260 : 0 }}>
        <h2>Live Dashboard</h2>

        {/* SUMMARY BAR */}
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

        <div className="dashboard-layout">
          <div className="left-column">
            <div className="aircraft-section">
              <h3>Aircraft Fleet</h3>
              <div className="aircraft-grid">
                {visibleAircraft.map(ac => (
                  <AircraftCard key={ac._id} aircraft={ac} />
                ))}
              </div>
            </div>
          </div>

          <div className="right-column">
            <div className="alerts-section">
              <h3>Active Alerts</h3>
              <div className="alerts-container">
                {visibleAlerts.map(al => (
                  <AlertCard key={al._id} alert={al} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
