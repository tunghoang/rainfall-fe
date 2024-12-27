import { Map } from '@/components/Map';
import MapLayout from '@/layouts/map';

export default function MapPage() {
  return (
    <MapLayout>
      <div style={{height: 'calc(100vh - 44px)'}} className='map-container relative flex w-screen bg-neutral-950 text-black'>
        <Map />
      </div>
    </MapLayout>
  );
}
