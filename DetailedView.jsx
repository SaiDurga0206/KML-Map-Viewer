import React from 'react';

// Helper function to calculate the length of LineString or MultiLineString
const calculateLength = (coordinates) => {
  let totalLength = 0;

  // For LineString
  if (Array.isArray(coordinates[0]) && typeof coordinates[0][0] === 'number') {
    for (let i = 1; i < coordinates.length; i++) {
      const [x1, y1] = coordinates[i - 1];
      const [x2, y2] = coordinates[i];
      totalLength += Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    }
  }
  // For MultiLineString
  else if (Array.isArray(coordinates[0][0])) {
    coordinates.forEach((line) => {
      for (let i = 1; i < line.length; i++) {
        const [x1, y1] = line[i - 1];
        const [x2, y2] = line[i];
        totalLength += Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
      }
    });
  }

  return totalLength.toFixed(2); // Return length rounded to 2 decimal places
};

const DetailedView = ({ kmlData }) => {
  // If no KML data is available, return null or a message
  if (!kmlData || !kmlData.features) {
    return <p>No KML data available. Please upload a KML file.</p>;
  }

  return (
    <div>
      <h2>Detailed View</h2>
      <table>
        <thead>
          <tr>
            <th>Element Type</th>
            <th>Total Length</th>
          </tr>
        </thead>
        <tbody>
          {kmlData.features.map((feature, index) => {
            const { type, coordinates } = feature.geometry;
            let length = 'N/A';

            // Calculate length for LineString and MultiLineString
            if (type === 'LineString' || type === 'MultiLineString') {
              length = calculateLength(coordinates);
            }

            return (
              <tr key={index}>
                <td>{type}</td>
                <td>{length}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default DetailedView;