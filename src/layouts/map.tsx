import { Navbar } from '@/components/navbar';

export default function MapLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='relative flex flex-col h-full -mt-16'>
      <Navbar wrapperClassName='max-w-full' />
      <main className='container'>{children}</main>
    </div>
  );
}
