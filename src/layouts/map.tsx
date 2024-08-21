import { Navbar } from '@/components/Navbar';

export default function MapLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='relative flex flex-col h-screen'>
      <Navbar />
      {children}
    </div>
  );
}
