import { useState } from 'react';
import { useMapEvent } from 'react-leaflet';

export const LocationDataCard = () => {
  const [mousemoveLocation, setMousemoveLocation] = useState({ lat: 0, lng: 0 });

  const HandleMapMousemove = () => {
    useMapEvent('mousemove', async (event) => {
      const { lat, lng } = event.latlng;
      setMousemoveLocation({ lat, lng });
    });

    return null;
  };

  return (
    <>
      <div className='w-80 min-h-24 ml-4 p-4 mb-4 rounded-lg transparent-base'>
        <div>
          <p className='card-title'>Location Data</p>
          <p className='card-content'>Latitude: {mousemoveLocation?.lat ?? '-'}</p>
          <p className='card-content'>Longitude: {mousemoveLocation?.lng ?? '-'}</p>
        </div>
      </div>
      <HandleMapMousemove />
    </>
  );
};
