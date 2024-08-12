import { Map } from '@/components/Map';
import MapLayout from '@/layouts/map';

export default function MapPage() {
  return (
    <MapLayout>
      <div className='relative flex h-screen w-screen bg-neutral-950 text-black'>
        <Map />
      </div>
    </MapLayout>
  );
}
