import React, { useState } from 'react';
import FileUpload from './FileUpload';
import parseKML from './Parsekml';
import MapView from './MapView';
import SummaryView from './SummaryView';
import DetailedView from './DetailedView';

const App = () => {
  const [kmlData, setKmlData] = useState(null);
  const [error, setError] = useState(null);

  const handleFileUpload = async (file) => {
    try {
      const data = await parseKML(file);
      setKmlData(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h1>KML File Viewer</h1>
      <FileUpload onFileUpload={handleFileUpload} />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {kmlData && (
        <>
          <MapView kmlData={kmlData} />
          <SummaryView kmlData={kmlData} />
          <DetailedView kmlData={kmlData} />
        </>
      )}
    </div>
  );
};

export default App;