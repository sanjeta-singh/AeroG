import React, { useState, useEffect } from 'react';
import './AircraftDetailModal.css';

const AircraftDetailModal = ({ aircraft, isOpen, onClose }) => {
  const [locationData, setLocationData] = useState(null);

  // Fetch location data when modal opens
  useEffect(() => {
    if (isOpen && aircraft?.location) {
      fetchLocationData(aircraft.location);
    }
  }, [isOpen, aircraft]);

  const fetchLocationData = async (location) => {
    try {
      // For now, using mock data since we don't have a real weather API
      // You can replace this with your actual location/weather API later
      setLocationData({
        name: location,
        main: { temp: 25, humidity: 65 },
        weather: [{ description: 'Partly Cloudy' }],
        wind: { speed: 12 }
      });
    } catch (error) {
      console.log('Location API not available');
    }
  };

  if (!isOpen || !aircraft) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <h2>Aircraft {aircraft.aircraftId}</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>

        <div className="modal-body">
          {/* Top Section - Current Status */}
          <div className="top-section">
            <div className="current-status-panel">
              <div className="status-header">
                <h3>Current Status</h3>
                <div className="status-indicator">
                  {aircraft.flightStatus === 'IN_FLIGHT' ? '🛫 In Flight' : '🛬 On Ground'}
                </div>
              </div>
              
              <div className="status-details">
                <div className="status-item">
                  <span className="label">Engine Temperature</span>
                  <span className="value">{aircraft.engineTemp}°C</span>
                </div>
                <div className="status-item">
                  <span className="label">Brake Wear</span>
                  <span className="value">{(aircraft.brakeWear * 100).toFixed(1)}%</span>
                </div>
                <div className="status-item">
                  <span className="label">Hydraulic Pressure</span>
                  <span className="value">{aircraft.hydraulicPressure} psi</span>
                </div>
                <div className="status-item">
                  <span className="label">Flight Hours</span>
                  <span className="value">{aircraft.flightHours} hours</span>
                </div>
              </div>
            </div>

            <div className="highlights-grid">
              <div className="highlight-card">
                <h4>Fuel Efficiency</h4>
                <div className="highlight-value">{(aircraft.fuelEfficiency * 100).toFixed(1)}%</div>
                <div className="highlight-bar">
                  <div 
                    className="highlight-fill" 
                    style={{ width: `${aircraft.fuelEfficiency * 100}%` }}
                  ></div>
                </div>
              </div>

              <div className="highlight-card">
                <h4>Airspeed</h4>
                <div className="highlight-value">{aircraft.airspeed} knots</div>
                <div className="highlight-bar">
                  <div 
                    className="highlight-fill" 
                    style={{ width: `${(aircraft.airspeed / 1000) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div className="highlight-card">
                <h4>Altitude</h4>
                <div className="highlight-value">{aircraft.altitude} ft</div>
                <div className="highlight-bar">
                  <div 
                    className="highlight-fill" 
                    style={{ width: `${(aircraft.altitude / 50000) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div className="highlight-card">
                <h4>Outside Temp</h4>
                <div className="highlight-value">{aircraft.outsideTemp}°C</div>
                <div className="highlight-bar">
                  <div 
                    className="highlight-fill" 
                    style={{ width: `${Math.abs(aircraft.outsideTemp) / 100 * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="bottom-section">
            <div className="forecast-panel">
              <h3>Flight Data History</h3>
              <div className="forecast-list">
                <div className="forecast-item">
                  <span className="forecast-label">Last Update</span>
                  <span className="forecast-value">{aircraft.timestamp || 'N/A'}</span>
                </div>
                <div className="forecast-item">
                  <span className="forecast-label">Location</span>
                  <span className="forecast-value">{aircraft.location || 'N/A'}</span>
                </div>
                <div className="forecast-item">
                  <span className="forecast-label">Failure Status</span>
                  <span className="forecast-value">{aircraft.failureLabel || 'Normal'}</span>
                </div>
              </div>
            </div>

            <div className="map-panel">
              <h3>Location Information</h3>
              {locationData && (
                <div className="location-details">
                  <div className="location-item">
                    <span className="location-label">City</span>
                    <span className="location-value">{locationData.name}</span>
                  </div>
                  {locationData.main && (
                    <>
                      <div className="location-item">
                        <span className="location-label">Temperature</span>
                        <span className="location-value">{locationData.main.temp}°C</span>
                      </div>
                      <div className="location-item">
                        <span className="location-label">Humidity</span>
                        <span className="location-value">{locationData.main.humidity}%</span>
                      </div>
                    </>
                  )}
                  {locationData.weather && (
                    <div className="location-item">
                      <span className="location-label">Weather</span>
                      <span className="location-value">{locationData.weather[0]?.description}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AircraftDetailModal;
