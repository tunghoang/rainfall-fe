import { MapContainer, TileLayer } from 'react-leaflet';

export default function FullScreenMapPage() {
  return (
    <div className='relative flex h-screen w-screen bg-neutral-950 text-black'>
      <MapContainer
        center={[14.0583, 108.2772]}
        zoom={6}
        className='flex-1 cursor-crosshair'
        minZoom={5}
        // bounds={vietnamBounds}
        // maxBoundsViscosity={1.0}
      >
        <TileLayer url={'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'} />
      </MapContainer>
    </div>
  );
}
