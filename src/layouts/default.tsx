export default function DefaultLayout({ children }: { children: React.ReactNode }) {
  return <main className='relative container mx-auto max-w-7xl px-6 flex-grow'>{children}</main>;
}
