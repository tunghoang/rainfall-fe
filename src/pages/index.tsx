import { Link } from '@nextui-org/link';

import DefaultLayout from '@/layouts/default';
import { MapContainer, TileLayer } from 'react-leaflet';
import { Button } from '@nextui-org/button';

export default function IndexPage() {
  return (
    <DefaultLayout>
      <section className='flex flex-col items-center justify-center gap-4 py-8 md:py-10'>
        <div className='relative flex h-[400px] w-[800px] bg-neutral-950 text-black'>
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
        <Link
          target='_blank'
          href='/full-screen-map'
        >
          <Button>Full screen</Button>
        </Link>
      </section>
    </DefaultLayout>
  );
}
