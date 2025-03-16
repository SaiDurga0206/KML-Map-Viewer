import React, { useState } from 'react';

const FileUpload = ({ onFileUpload }) => {
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) {
      setError('No file selected.');
      return;
    }

    // Validate file type
    if (file.type !== 'application/vnd.google-earth.kml+xml' && !file.name.endsWith('.kml')) {
      setError('Please upload a valid KML file.');
      return;
    }

    setError(null); // Clear any previous errors
    onFileUpload(file); // Pass the file to the parent component
  };

  return (
    <div>
      <h2>Upload KML File</h2>
      <input
        type="file"
        accept=".kml"
        onChange={handleFileChange}
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default FileUpload;