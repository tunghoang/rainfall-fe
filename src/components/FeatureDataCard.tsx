import { useState } from 'react';
import { useMapEvent } from 'react-leaflet';

const getFeatureInfo = async (layerName: string, point: any, size: any, bounds: any) => {
  const params: { [key: string]: any } = {
    request: 'GetFeatureInfo',
    service: 'WMS',
    srs: 'EPSG:4326',
    styles: '',
    version: '1.1.1',
    format: 'image/png',
    transparent: true,
    query_layers: layerName,
    layers: layerName,
    info_format: 'text/html',
    feature_count: 50,
    x: Math.round(point.x),
    y: Math.round(point.y),
    width: size.x,
    height: size.y,
    bbox: `${bounds.getWest()},${bounds.getSouth()},${bounds.getEast()},${bounds.getNorth()}`,
  };

  const url = new URL('http://localhost:8080/geoserver/GeoTIFF/wms');
  Object.keys(params).forEach((key) => url.searchParams.append(key, params[key]));

  const response = await fetch(url.toString());
  if (response.ok) {
    const data = await response.text();

    // Parse the HTML response
    const parser = new DOMParser();
    const doc = parser.parseFromString(data, 'text/html');

    // Find the value in the table
    const value = doc.querySelector('table.featureInfo tr:nth-child(2) td:nth-child(2)')?.textContent;

    return value;
  } else {
    throw new Error('Failed to fetch feature info');
  }
};

export const FeatureDataCard = ({ layerName }: { layerName: string }) => {
  const [featureInfo, setFeatureInfo] = useState<string | null | undefined>(null);

  const HandleMapClick = () => {
    const map = useMapEvent('click', async (event) => {
      const { lat, lng } = event.latlng;
      try {
        const point = map.latLngToContainerPoint([lat, lng]);
        const size = map.getSize();
        const bounds = map.getBounds();

        const data = await getFeatureInfo(layerName, point, size, bounds);
        setFeatureInfo(data);
      } catch (error) {
        console.error('Error fetching feature info:', error);
      }
    });
    return null;
  };

  return (
    <>
      <div className='w-80 min-h-24 ml-4 p-4 rounded-lg transparent-base'>
        <div>
          <p className='card-title'>Clicked Data</p>
          <p className='card-content'>GRAY_INDEX: {featureInfo ?? '-'}</p>
        </div>
      </div>
      <HandleMapClick />
    </>
  );
};
