import { LayerGroup, LayersControl, MapContainer, TileLayer, useMapEvent, WMSTileLayer } from 'react-leaflet';
import { Slider } from '@nextui-org/slider';
import { useState } from 'react';
import { LatLngBoundsLiteral } from 'leaflet';

export const Map = ({ zoom = 5 }) => {
  // const [search, setSearch] = useState<string>('');

  // const { mouseData } = useMouseData();

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

  const [stepSlider, setStepSlider] = useState(1);

  console.log('stepSlider', stepSlider);

  return (
    <>
      <div className='absolute bottom-0 left-0 w-full z-[1000]'>
        <div className='flex justify-center align-middle p-4'>
          <Slider
            label='Time Slider'
            step={1}
            maxValue={10}
            minValue={1}
            value={stepSlider}
            onChange={(value) => {
              if (typeof value === 'number') {
                setStepSlider(value);
              }
            }}
            className='w-[400px] bg-white px-6 py-4 rounded-lg'
          />
        </div>
      </div>
      <MapContainer
        center={[21.028511, 105.804817]}
        zoom={zoom}
        className='flex-1 cursor-crosshair'
        minZoom={4}
        bounds={vietnamBounds}
        maxBoundsViscosity={1.0}
      >
        <TileLayer url={'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'} />
        <LayersControl>
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
        </LayersControl>
        <EnforceBounds />
      </MapContainer>
    </>
  );
};
