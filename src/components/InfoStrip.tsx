import { useState, useMemo } from 'react';
import { useMapEvent } from 'react-leaflet';

export const InfoStrip = ({feature, scale, selectedLocation}) => {
  const [mousemoveLocation, setMousemoveLocation] = useState({ lat: 0, lng: 0 });

  const parseGeoJSONProps = (feature) => {
    if (!feature) return '';
    const props = feature.properties
    if (props['type_3']) {
        return `${props['type_3']} ${props['name_3']}, ${props['name_2']}, ${props['name_1']}`
    }
    else if (props['type_2']) {
        return `${props['type_2']} ${props['name_2']}, ${props['name_1']}`
    }
    else if (props['type_1']) {
        return `${props['type_1']} ${props['name_1']}`
    }
    return '';
  }
  const parseFeatureInfo = useMemo(() => {
    parseGeoJSONProps(feature)
  }, [feature])

  const parseSelectedLocationInfo = useMemo(() => {
    parseGeoJSONProps(feature)
  }, [selectedLocation])
  useMapEvent('mousemove', async (event) => {
    const { lat, lng } = event.latlng;
    setMousemoveLocation({ lat, lng });
  });

  return (
    <div className='fixed bottom-0 right-0 z-[45] w-full flex align-middle p-0.5 px-1 transparent-base'>
      {selectedLocation?(<div className='ml-4 bg-blue-600 text-white px-2'>{parseGeoJSONProps(selectedLocation)}</div>):null}
      <div className="grow"></div>
      {feature?(<div className='mr-6'><span className='bg-blue-400 px-1 text-white'>{parseGeoJSONProps(feature)}</span></div>):null}
      <div className='mr-6'>Latitude: <span className='bg-blue-400 px-1 text-white'>{mousemoveLocation?.lat.toFixed(4) ?? '-'}</span></div>
      <div className='mr-6'>Longitude: <span className='bg-blue-400 px-1 text-white'>{mousemoveLocation?.lng.toFixed(4) ?? '-'}</span></div>
      <div className='mr-2 bg-white px-1'>{scale} km</div>
      <div className='w-14 h-1 bg-neutral-600 my-auto'></div>
    </div>
  );
};

