import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './Landing';
import Dashboard from './Dashboard';      // ← your original component
import AircraftPage from './pages/AircraftPage';   // optional extra page
import AlertsPage from './pages/AlertsPage';       // optional extra page

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<Dashboard />} /> {/* ← unchanged */}
        <Route path="/aircraft" element={<AircraftPage />} /> {/* optional */}
        <Route path="/alerts" element={<AlertsPage />} />   {/* optional */}
      </Routes>
    </Router>
  );
}

export default App;