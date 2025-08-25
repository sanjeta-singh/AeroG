import React from 'react';
import './AlertCard.css';

const AlertCard = ({ alert }) => (
  <div className="alert-card">
    <h3>{alert.aircraftId}</h3>
    <p><strong>Type:</strong> {alert.type}</p>
    <p><strong>Urgency:</strong> {alert.urgency}</p>
    <p><strong>Flight Status:</strong> {alert.flightStatus}</p>
  </div>
);

export default React.memo(AlertCard); 