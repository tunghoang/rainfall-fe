import { Map } from '@/components/map';

export default function FullScreenMapPage() {
  return (
    <div className='relative flex h-screen w-screen bg-neutral-950 text-black'>
      <Map zoom={8} />
    </div>
  );
}
