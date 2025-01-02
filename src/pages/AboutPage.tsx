import { title } from '@/components/primitives';
import { useNavigate } from 'react-router-dom';
import DefaultLayout from '@/layouts/default';

export default function AboutPage() {
  const navigate = useNavigate()
  return (
    <DefaultLayout>
      <section className='flex flex-col gap-4 py-8 md:py-10'>
        <h1 className='max-w-lg text-3xl font-extrabold text-slate-900 tracking-tight dark:text-slate-200'>
          Welcome to Indra project
        </h1>
        <p>
            Indra project is lorem ipsum dolor sit amet
        </p>
      </section>
    </DefaultLayout>
  );
}
