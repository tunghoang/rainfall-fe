import { Map } from '@/components/map';
import MapLayout from '@/layouts/map';

export default function MapPage() {
  return (
    <MapLayout>
      {/* <section className='flex flex-col items-center justify-center gap-4 py-8 md:py-10'></section> */}
      <div className='relative flex h-screen w-screen bg-neutral-950 text-black'>
        <Map zoom={6} />
      </div>
    </MapLayout>
  );
}
