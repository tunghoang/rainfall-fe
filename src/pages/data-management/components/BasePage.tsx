import DefaultLayout from '@/layouts/default';
import { Input } from '@nextui-org/react';

import { SearchIcon } from '@/components/icons';
import React from 'react';
import { useDataConfig } from '@/hooks/useDataConfig';
import { CustomTable } from './CustomTable';
import { CreateModal } from './CreateModal';
import { DeleteModal } from './DeleteModal';

export default function BasePage({ rows }: { rows: any[] }) {
  const { name, dataConfig } = useDataConfig();

  const columns = dataConfig.filter((config) => config.isColumn);

  const [page] = React.useState(1);
  const pages = 100;

  return (
    <DefaultLayout>
      <section className='flex flex-col items-center justify-center gap-4 py-8 md:py-10'>
        <h1 className='text-2xl font-bold text-left w-full'>{name}</h1>
        <div className='flex justify-between w-full'>
          <Input
            classNames={{
              base: 'max-w-lg',
              mainWrapper: 'h-full',
              input: 'text-small',
              inputWrapper: 'h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20',
            }}
            placeholder='Type to search...'
            size='sm'
            startContent={<SearchIcon size={18} />}
            type='search'
          />
          <div>
            <CreateModal />
            <DeleteModal />
          </div>
        </div>
        <CustomTable
          rows={rows}
          columns={columns}
          page={page}
          totalPages={pages}
        />
      </section>
    </DefaultLayout>
  );
}
