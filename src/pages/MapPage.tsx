//import { Map } from '@/components/Map';
import { lazy, Suspense } from 'react'
const Map = lazy(() => import('@/components/Map').then(m => ({default: m.Map})));
import MapLayout from '@/layouts/map';

export default function MapPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
        <MapLayout>
          <div style={{height: 'calc(100vh - 44px)'}} className='map-container relative flex w-screen bg-neutral-950 text-black'>
            <Map />
          </div>
        </MapLayout>
    </Suspense>
  );
}
