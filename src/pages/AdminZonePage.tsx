import DefaultLayout from '@/layouts/default';
import { Iframe } from '@/components/Iframe'

export default function AdminZonePage() {
  return (
    <DefaultLayout>
      <section className='flex flex-col'>
        <Iframe url="https://google.com" />
      </section>
    </DefaultLayout>
  );
}
