import { DOMParser } from 'xmldom';

const parseKML = (file) => {
    return new Promise((resolve, reject) => {
      if (!file || !(file instanceof Blob)) {
        reject(new Error('Invalid file. Please upload a valid KML file.'));
        return;
      }
  
      const reader = new FileReader();
      reader.onload = (e) => {
        const kmlText = e.target.result;
        const parser = new DOMParser();
        const kmlDoc = parser.parseFromString(kmlText, 'text/xml');
  
        // Extract data from KML (example: extract Placemark names)
        const placemarks = kmlDoc.getElementsByTagName('Placemark');
        const features = [];
  
        for (let i = 0; i < placemarks.length; i++) {
          const name = placemarks[i].getElementsByTagName('name')[0]?.textContent || 'Unnamed';
          const coordinates = placemarks[i].getElementsByTagName('coordinates')[0]?.textContent || '';
          features.push({
            type: 'Feature',
            properties: { name },
            geometry: {
              type: 'Point', // Adjust based on your KML structure
              coordinates: coordinates.split(',').map(Number),
            },
          });
        }
  
        resolve({
          type: 'FeatureCollection',
          features,
        });
      };
      reader.onerror = (error) => reject(error);
      reader.readAsText(file); // Read the file as text
    });
  };
  
  export default parseKML;