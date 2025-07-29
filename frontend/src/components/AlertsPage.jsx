import React from 'react';
import AlertCard from '../components/AlertCard'; // Ensure this path is correct

function AlertsPage() {
  const [list, setList] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8087/alerts')
      .then(r => r.json())
      .then(setList);
  }, []);

  return (
    <>
      <h2>Alerts</h2>
      <div className="alert-cards">
        {list.map(a => (
          <AlertCard key={a._id} alert={a} />
        ))}
      </div>
    </>
  );
}

export default AlertsPage;