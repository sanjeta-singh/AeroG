import React from 'react';
import './AlertCard.css';

const AlertCard = ({ alert }) => (
  <div className="alert-card">
    <h3>{alert.aircraftId}</h3>
    <p>{alert.type}</p>
    <p><strong>Threshold:</strong> {alert.threshold}</p>
    <p><strong>Timestamp:</strong> {alert.timestamp}</p>
  </div>
);

export default React.memo(AlertCard);