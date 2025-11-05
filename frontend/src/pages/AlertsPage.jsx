import React, { useEffect, useMemo, useState } from 'react';
import AlertCard from '../components/AlertCard';
import './AlertsPage.css';

const POLL_MS = 1000;

export default function AlertsPage() {
  const [alerts, setAlerts] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const res  = await fetch('http://localhost:8087/alerts');
        const json = await res.json();
        setAlerts(Array.isArray(json) ? json : []);
      } catch (e) {
        setAlerts([]);
      }
    };
    fetchAlerts();
    const id = setInterval(fetchAlerts, POLL_MS);
    return () => clearInterval(id);
  }, []);

  const { emergency, advisory } = useMemo(() => {
    const em = [];
    const ad = [];
    for (const a of alerts) {
      const isEmergency = String(a?.urgency || '').toUpperCase() === 'EMERGENCY';
      (isEmergency ? em : ad).push(a);
    }
    return { emergency: em, advisory: ad };
  }, [alerts]);

  return (
    <div className="alerts-page">
      <h2 className="alerts-title">Alerts</h2>
      <div className="alerts-columns">
        <section className="alerts-col">
          <h3 className="col-title emergency">Emergency</h3>
          <div className="col-list">
            {emergency.map(a => (
              <AlertCard key={a._id} alert={a} onClick={() => setSelected(a)} />
            ))}
          </div>
        </section>
        <section className="alerts-col">
          <h3 className="col-title advisory">Advisory</h3>
          <div className="col-list">
            {advisory.map(a => (
              <AlertCard key={a._id} alert={a} onClick={() => setSelected(a)} />
            ))}
          </div>
        </section>
      </div>

      {selected && (
        <div className="modal-backdrop" onClick={() => setSelected(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h4>{selected.aircraftId}</h4>
              <button className="modal-close" onClick={() => setSelected(null)}>×</button>
            </div>
            <div className="modal-body">
              <div className="modal-row"><span>Type</span><strong>{selected.type}</strong></div>
              <div className="modal-row"><span>Urgency</span><strong>{selected.urgency}</strong></div>
              <div className="modal-row"><span>Status</span><strong>{selected.flightStatus}</strong></div>
              <div className="modal-row"><span>Timestamp</span><strong>{selected.timestamp || selected.time || 'N/A'}</strong></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
