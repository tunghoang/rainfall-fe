import { LayerGroup, LayersControl, MapContainer, TileLayer, useMapEvent, WMSTileLayer } from 'react-leaflet';
import { Slider } from '@nextui-org/slider';
import { useState } from 'react';
import { LatLngBoundsLiteral } from 'leaflet';
import { CustomSlider } from './slider';

const getFeatureInfo = async (lat, lng, layerName, map) => {
  const point = map.latLngToContainerPoint([lat, lng], map.getZoom());
  const size = map.getSize();
  const bounds = map.getBounds();

  const params = {
    request: 'GetFeatureInfo',
    service: 'WMS',
    srs: 'EPSG:4326',
    styles: '',
    version: '1.1.1',
    format: 'image/png',
    transparent: true,
    query_layers: layerName,
    layers: layerName,
    info_format: 'text/html', // Change to 'application/json' if needed
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
    console.log('response:', response);
    console.log('featureInfo:', data);

    // Parse the HTML response
    const parser = new DOMParser();
    const doc = parser.parseFromString(data, 'text/html');

    // Find the value in the table
    const value = doc.querySelector('table.featureInfo tr:nth-child(2) td:nth-child(2)')?.textContent;
    console.log('Extracted value:', value);

    return value;
  } else {
    throw new Error('Failed to fetch feature info');
  }
};

export const Map = ({ zoom = 5 }) => {
  const vietnamBounds: LatLngBoundsLiteral = [
    [8.1790665, 102.14441], // Southwest corner
    [23.393395, 109.46463], // Northeast corner
  ];

  const EnforceBounds = () => {
    const map = useMapEvent('moveend', () => {
      const bounds = map.getBounds();
      if (
        bounds.getSouthWest().lat < vietnamBounds[0][0] ||
        bounds.getSouthWest().lng < vietnamBounds[0][1] ||
        bounds.getNorthEast().lat > vietnamBounds[1][0] ||
        bounds.getNorthEast().lng > vietnamBounds[1][1]
      ) {
        map.panInsideBounds(vietnamBounds, { animate: true });
      }
    });
    return null;
  };

  const [clickedLocation, setClickedLocation] = useState(null);
  const [mousemoveLocation, setMousemoveLocation] = useState(null);
  const [featureInfo, setFeatureInfo] = useState(null);

  const HandleMapMousemove = () => {
    useMapEvent('mousemove', async (event) => {
      const { lat, lng } = event.latlng;
      setMousemoveLocation({ lat, lng });
    });
    return null;
  };

  const HandleMapClick = () => {
    const map = useMapEvent('click', async (event) => {
      const { lat, lng } = event.latlng;
      setClickedLocation({ lat, lng });
      try {
        // const data = await getFeatureInfo(lat, lng, `GeoTIFF:PVOUT_0${stepSlider}`, map);
        // setFeatureInfo(data);
      } catch (error) {
        console.error('Error fetching feature info:', error);
      }
    });
    return null;
  };

  return (
    <>
      <MapContainer
        center={[21.028511, 105.804817]}
        zoom={zoom}
        className='flex-1 cursor-crosshair'
        minZoom={4}
        bounds={vietnamBounds}
        maxBoundsViscosity={1.0}
      >
        <TileLayer url={'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'} />
        {/* <LayersControl>
          <LayersControl.Overlay
            name='PVOUT_up'
            checked={true}
          >
            <LayerGroup key={stepSlider}>
              <WMSTileLayer
                url='http://localhost:8080/geoserver/GeoTIFF/wms'
                layers={`GeoTIFF:PVOUT_0${stepSlider}`}
                format='image/png'
                transparent={true}
                version='1.1.0'
              />
            </LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay
            name='PVOUT_down'
            checked={false}
          >
            <LayerGroup key={10 - stepSlider}>
              <WMSTileLayer
                url='http://localhost:8080/geoserver/GeoTIFF/wms'
                layers={`GeoTIFF:PVOUT_0${10 - stepSlider}`}
                format='image/png'
                transparent={true}
                version='1.1.0'
              />
            </LayerGroup>
          </LayersControl.Overlay>
        </LayersControl> */}
        <EnforceBounds />
        <HandleMapClick />
        <HandleMapMousemove />
        <div className='absolute bottom-0 left-0 w-full z-[1000]'>
          <div className='flex justify-start'>
            <div className='ml-4 p-4 rounded-lg bg-white w-[320px]'>
              <div>
                <p className='text-xl'>Location Data</p>
                <p>Latitude: {mousemoveLocation?.lat ?? '-'}</p>
                <p>Longitude: {mousemoveLocation?.lng ?? '-'}</p>
              </div>
            </div>
            <div className='ml-4 p-4 rounded-lg bg-white w-[320px]'>
              <div>
                <p className='text-xl'>Clicked Data</p>
                <p>GRAY_INDEX: {featureInfo ?? '-'}</p>
              </div>
            </div>
          </div>
          <CustomSlider />
        </div>
      </MapContainer>
    </>
  );
};

export default Map;
