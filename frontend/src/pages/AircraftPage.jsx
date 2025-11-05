import React, { useEffect, useState } from 'react';
import AircraftPageCard from '../components/AircraftPageCard';
import AircraftDetailModal from '../components/AircraftDetailModal';
import './AircraftPage.css';

export default function AircraftPage() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedModel, setSelectedModel] = useState('All Models');
  const [selectedAircraft, setSelectedAircraft] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // fetch once
  useEffect(() => {
    fetch('http://localhost:8087/aircraft').then(r => r.json()).then(setData);
  }, []);

  // Filter data based on search and model selection
  useEffect(() => {
    let filtered = data;
    
    // Filter by search term (aircraft ID)
    if (searchTerm) {
      filtered = filtered.filter(aircraft => 
        aircraft.aircraftId.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filter by model
    if (selectedModel !== 'All Models') {
      filtered = filtered.filter(aircraft => 
        aircraft.aircraftId.startsWith(selectedModel)
      );
    }
    
    setFilteredData(filtered);
  }, [data, searchTerm, selectedModel]);

  // Get unique models for dropdown
  const getUniqueModels = () => {
    const models = [...new Set(data.map(aircraft => aircraft.aircraftId.split('-')[0]))];
    return ['All Models', ...models];
  };

  const handleCardClick = (aircraft) => {
    console.log('handleCardClick called with:', aircraft);
    setSelectedAircraft(aircraft);
    setIsModalOpen(true);
    console.log('Modal should now be open:', true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedAircraft(null);
  };

  return (
    <div className="aircraft-page">
      {/* Header Section */}
      <div className="aircraft-header">
        <div className="search-section">
          <div className="search-container">
            <div className="search-icon"></div>
            <input
              type="text"
              placeholder="Search aircraft..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
        </div>
        
        <div className="filter-section">
          <select 
            value={selectedModel} 
            onChange={(e) => setSelectedModel(e.target.value)}
            className="model-filter"
          >
            {getUniqueModels().map(model => (
              <option key={model} value={model}>{model}</option>
            ))}
          </select>
        </div>
        
        {/* Test button for debugging */}
        <button 
          onClick={() => {
            console.log('Test button clicked');
            if (filteredData.length > 0) {
              handleCardClick(filteredData[0]);
            }
          }}
          style={{ padding: '8px 16px', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
        >
          Test Modal
        </button>
      </div>

      {/* Aircraft Cards - Vertical Stack */}
      <div className="aircraft-vertical-stack">
        {filteredData.map(aircraft => (
          <AircraftPageCard 
            key={aircraft._id} 
            aircraft={aircraft} 
            onCardClick={handleCardClick}
          />
        ))}
      </div>

      {/* Aircraft Detail Modal */}
      <AircraftDetailModal
        aircraft={selectedAircraft}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </div>
  );
}