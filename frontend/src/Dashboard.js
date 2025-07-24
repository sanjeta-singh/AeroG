import { useState } from 'react';
import Sidebar from './components/Sidebar';
import AircraftStatus from './components/AircraftStatus';
import './Dashboard.css';

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="dashboard-container">
      <Sidebar open={sidebarOpen} onToggle={() => setSidebarOpen(prev => !prev)} />

      <div
        className="main-panel"
        style={{ marginLeft: sidebarOpen ? 240 : 0 }}
      >
        <AircraftStatus />
      </div>
    </div>
  );
}