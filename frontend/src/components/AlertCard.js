import React, { useMemo } from 'react';
import './AlertCard.css';

const AlertCard = ({ alert, onClick }) => {
  const sevClass = useMemo(() => {
    const u = String(alert?.urgency || '').toLowerCase();
    if (u === 'emergency' || u === 'critical') return 'alert--critical';
    if (u === 'warning') return 'alert--warning';
    return 'alert--info';
  }, [alert?.urgency]);

  return (
    <div className={`alert-card ${sevClass} ${onClick ? 'clickable' : ''}`} onClick={onClick} role={onClick ? 'button' : undefined} tabIndex={onClick ? 0 : undefined}>
      <div className="alert-header">
        <h3>{alert.aircraftId}</h3>
        <span className="alert-badge urgency">{alert.urgency}</span>
      </div>
      <div className="alert-meta">
        <span className="alert-chip">{alert.type}</span>
        <span className="alert-chip">{alert.flightStatus}</span>
      </div>
    </div>
  );
};

export default React.memo(AlertCard); 
