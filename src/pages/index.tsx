import { Link } from '@nextui-org/link';

import DefaultLayout from '@/layouts/default';
import { Button } from '@nextui-org/button';
import { Map } from '@/components/map';

export default function IndexPage() {
  return (
    <DefaultLayout>
      <section className='flex flex-col items-center justify-center gap-4 py-8 md:py-10'>
        <div className='relative flex h-[400px] w-[800px] bg-neutral-950 text-black'>
          <Map />
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
