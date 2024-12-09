import { title } from '@/components/primitives';
import { useNavigate } from 'react-router-dom';
import DefaultLayout from '@/layouts/default';

export default function AboutPage() {
  const navigate = useNavigate()
  return (
    <DefaultLayout>
      <section className='flex flex-col items-center justify-center gap-4 py-8 md:py-10'>
        <div className='inline-block max-w-lg text-center justify-center'>
          <h1
            className={title({
              color: 'blue',
              size: 'sm',
            })}
          >
            Please login to proceed
          </h1>
        </div>
      </section>
    </DefaultLayout>
  );
}
