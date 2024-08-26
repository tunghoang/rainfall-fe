import { useDataConfig } from '@/hooks/useDataConfig';
import React from 'react';
import { CreateModal } from './components/CreateModal';
import { DeleteModal } from './components/DeleteModal';
import { dataTypes } from '@/config/data-management.config';

import { getDatasets } from '../../api';
import DefaultLayout from '@/layouts/default';
import { Input, Select, SelectItem } from '@nextui-org/react';
import { SearchIcon } from '@/components/icons';
import { CustomTable } from './components/CustomTable';

export default function DataSourcesPage() {
  const { label, name: dataName } = useDataConfig();
  const DEFAULT_DATA = [
    {
      key: '1',
      datasetName: label,
      description: '',
      resolution: '10 km',
      startTime: '25/08/2024',
      endTime: '25/08/2024',
      isAvailable: true,
      frequency: '1 day',
    },
    {
      key: '2',
      datasetName: label,
      description: '',
      resolution: '10 km',
      startTime: '25/08/2024',
      endTime: '25/08/2024',
      isAvailable: false,
      frequency: '1 day',
    },
    {
      key: '3',
      datasetName: label,
      description: '',
      resolution: '10 km',
      startTime: '25/08/2024',
      endTime: '25/08/2024',
      isAvailable: false,
      frequency: '1 day',
    },
    {
      key: '4',
      datasetName: label,
      description: '',
      resolution: '10 km',
      startTime: '25/08/2024',
      endTime: '25/08/2024',
      isAvailable: false,
      frequency: '1 day',
    },
    {
      key: '5',
      datasetName: label,
      description: '',
      resolution: '10 km',
      startTime: '25/08/2024',
      endTime: '25/08/2024',
      isAvailable: true,
      frequency: '1 day',
    },
    {
      key: '6',
      datasetName: label,
      description: '',
      resolution: '10 km',
      startTime: '25/08/2024',
      endTime: '25/08/2024',
      isAvailable: true,
      frequency: '1 day',
    },
    {
      key: '7',
      datasetName: label,
      description: '',
      resolution: '10 km',
      startTime: '25/08/2024',
      endTime: '25/08/2024',
      isAvailable: true,
      frequency: '1 day',
    },
    {
      key: '8',
      datasetName: label,
      description: '',
      resolution: '10 km',
      startTime: '25/08/2024',
      endTime: '25/08/2024',
      isAvailable: true,
      frequency: '1 day',
    },
    {
      key: '9',
      datasetName: label,
      description: '',
      resolution: '10 km',
      startTime: '25/08/2024',
      endTime: '25/08/2024',
      isAvailable: true,
      frequency: '1 day',
    },
    {
      key: '10',
      datasetName: label,
      description: '',
      resolution: '10 km',
      startTime: '25/08/2024',
      endTime: '25/08/2024',
      isAvailable: true,
      frequency: '1 day',
    },
  ];

  const { name, dataConfig } = useDataConfig();

  const columns = dataConfig.filter((config) => config.isColumn);

  const [page] = React.useState(1);
  const pages = 100;

  const [dataSpecs, setDataSpecs] = React.useState<string[]>([
    `${dataTypes.hourly4.value.resolution}`,
    dataTypes.hourly4.value.frequency,
  ]);

  const [rows, setRows] = React.useState();

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getDatasets(
          dataName,
          Number(dataSpecs[0]),
          dataSpecs[1],
          undefined,
          undefined,
          DEFAULT_DATA
        );
        setRows(result);
      } catch (error) {
        console.error('Failed to fetch data', error);
      }
    };

    fetchData();
  }, [dataName, dataSpecs]);

  return (
    <DefaultLayout>
      <section className='flex flex-col items-center justify-center gap-4 py-8 md:py-10'>
        <h1 className='text-2xl font-bold text-left w-full'>{name}</h1>
        <div className='flex justify-start gap-2.5 w-full'>
          <Select
            label='Select data specs'
            className='max-w-40'
            defaultSelectedKeys={'all'}
          >
            {Object.keys(dataTypes).map((key) => {
              const item = dataTypes[key as keyof typeof dataTypes];
              return (
                <SelectItem
                  key={key}
                  value={[`${item.value.resolution}`, item.value.frequency]}
                  onClick={() => setDataSpecs([item.value.frequency, `${item.value.resolution}`])}
                >
                  {item.label ?? key}
                </SelectItem>
              );
            })}
          </Select>
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
          <div className='flex-1 flex justify-end gap-2.5 items-center '>
            <CreateModal />
            <DeleteModal />
          </div>
        </div>
        <CustomTable
          rows={rows ?? []}
          columns={columns}
          page={page}
          totalPages={pages}
        />
      </section>
    </DefaultLayout>
  );
}
