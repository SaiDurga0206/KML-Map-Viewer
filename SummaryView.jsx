import React from 'react';

const SummaryView = ({ kmlData }) => {
  // If no KML data is available, return null or a message
  if (!kmlData || !kmlData.features) {
    return <p>No KML data available. Please upload a KML file.</p>;
  }

  // Count the occurrences of each element type
  const elementCounts = {};
  kmlData.features.forEach((feature) => {
    const type = feature.geometry.type;
    elementCounts[type] = (elementCounts[type] || 0) + 1;
  });

  // Convert the counts into an array for rendering
  const elementCountsArray = Object.entries(elementCounts);

  return (
    <div>
      <h2>Summary View</h2>
      <table>
        <thead>
          <tr>
            <th>Element Type</th>
            <th>Count</th>
          </tr>
        </thead>
        <tbody>
          {elementCountsArray.map(([type, count]) => (
            <tr key={type}>
              <td>{type}</td>
              <td>{count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SummaryView;