import React from 'react';
import './Sidebar.css';

export default function Sidebar() {
  return (
    <div className="sidebar">
      <h2>AeroG</h2>
      <nav>
        <ul>
          <li className="active">Aircraft</li>
          <li>Alerts</li>
          <li>Maintenance</li>
          <li>Technicians</li>
        </ul>
      </nav>
    </div>
  );
}
