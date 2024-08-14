import {
  LayerGroup,
  LayersControl,
  MapContainer,
  TileLayer,
  useMapEvent,
  WMSTileLayer,
  ZoomControl,
} from 'react-leaflet';
import { LatLngBoundsLiteral } from 'leaflet';
import { CustomSlider } from './CustomSlider';
import { LocationDataCard } from './LocationDataCard';
import { FeatureDataCard } from './FeatureDataCard';
import { createContext, useEffect, useState } from 'react';

export const SliderContext = createContext<{
  stepSlider: number;
  setStepSlider: React.Dispatch<React.SetStateAction<number>>;
} | null>(null);

const calculateScale = (zoom: number, latitude: number) => {
  const EARTH_CIRCUMFERENCE = 40075000; // in meters
  const scale = (EARTH_CIRCUMFERENCE * Math.cos((latitude * Math.PI) / 180)) / (256 * Math.pow(2, zoom));
  return Math.round(scale);
};

const DEFAULT_ZOOM = 6;

export const Map = () => {
  const [stepSlider, setStepSlider] = useState(1);
  const [scale, setScale] = useState<number>();

  const vietnamBounds: LatLngBoundsLiteral = [
    [8.1790665, 102.14441],
    [23.393395, 109.46463],
  ];

  const EnforceBounds = () => {
    const map = useMapEvent('moveend', () => {
      const bounds = map.getBounds();
      const zoom = map.getZoom();
      const center = map.getCenter();

      setScale(calculateScale(zoom, center.lat));

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

  useEffect(() => {
    setScale(calculateScale(DEFAULT_ZOOM, 16.028511));
  }, []);

  return (
    <SliderContext.Provider value={{ stepSlider, setStepSlider }}>
      <MapContainer
        center={[16.028511, 105.804817]}
        className='flex-1 cursor-crosshair'
        zoom={DEFAULT_ZOOM}
        minZoom={6}
        bounds={vietnamBounds}
        maxBoundsViscosity={1.0}
        zoomControl={false}
        attributionControl={false}
      >
        <TileLayer url={'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'} />
        <ZoomControl position='topleft' />
        <LayersControl position='topleft'>
          <LayersControl.Overlay
            name='PVOUT'
            checked={true}
          >
            <LayerGroup key={stepSlider}>
              <WMSTileLayer
                url='http://localhost:8080/geoserver/GeoTIFF/wms'
                layers={`GeoTIFF:PVOUT_0${1 + (stepSlider % 6)}`}
                format='image/png'
                transparent={true}
                version='1.1.0'
              />
            </LayerGroup>
          </LayersControl.Overlay>
        </LayersControl>
        <EnforceBounds />
        <div className='absolute top-10 right-10 z-[1000]'>
          <LocationDataCard />
          <FeatureDataCard layerName={`GeoTIFF:PVOUT_0${stepSlider}`} />
        </div>
        <div className='absolute bottom-0 left-0 w-full z-[1000]'>
          <CustomSlider />
        </div>
        <div className='absolute bottom-0 right-0 z-[1000]'>
          <div className='flex align-middle p-0.5 px-1 transparent-base'>
            <span className='mr-2'>{scale} km</span>
            <div className='w-14 h-1 bg-black my-auto'></div>
          </div>
        </div>
      </MapContainer>
    </SliderContext.Provider>
  );
};

export default Map;
