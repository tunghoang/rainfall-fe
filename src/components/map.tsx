import { LayerGroup, LayersControl, MapContainer, TileLayer, useMapEvent, WMSTileLayer } from 'react-leaflet';

export const Map = ({ zoom = 5 }) => {
  // const [search, setSearch] = useState<string>('');

  // const { mouseData } = useMouseData();

  const vietnamBounds = [
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
  return (
    <MapContainer
      center={[21.028511, 105.804817]}
      zoom={zoom}
      className='flex-1 cursor-crosshair'
      minZoom={7}
      bounds={vietnamBounds}
      maxBoundsViscosity={1.0}
    >
      <TileLayer url={'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'} />
      <LayersControl>
        <LayersControl.Overlay
          name='COVID-19'
          checked={false}
        >
          <LayerGroup>
            <WMSTileLayer
              url='https://data.vietnam.opendevelopmentmekong.net/geoserver/ODVietnam/c8b14875-6ab9-4a3e-99e9-8352f695cd77/wms'
              layers='ODVietnam:c8b14875-6ab9-4a3e-99e9-8352f695cd77'
              format='image/png'
              transparent={true}
              version='1.3.0'
            />
          </LayerGroup>
        </LayersControl.Overlay>
        <LayersControl.Overlay
          name='Economic Zones'
          checked={false}
        >
          <LayerGroup>
            <WMSTileLayer
              url='https://data.opendevelopmentmekong.net/geoserver/ODMekong/vnm_gms_sez_cbez_1/wms'
              layers='ODMekong:vnm_gms_sez_cbez_1'
              format='image/png'
              transparent={true}
              version='1.3.0'
            />
          </LayerGroup>
        </LayersControl.Overlay>
        <LayersControl.Overlay
          name='Soil map'
          checked={true}
        >
          <LayerGroup>
            <WMSTileLayer
              url='https://data.opendevelopmentmekong.net/geoserver/ODVietnam/Soil map/wms'
              layers='ODVietnam:Soil map'
              format='image/png'
              transparent={true}
              version='1.3.0'
            />
          </LayerGroup>
        </LayersControl.Overlay>
      </LayersControl>
      <EnforceBounds />
    </MapContainer>
  );
};
