import Sidebar from './components/Sidebar';
import AircraftStatus from './components/AircraftStatus';

import './Dashboard.css';

export default function Dashboard() {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-panel">
        <AircraftStatus />
      </div>
    </div>
  );
}
