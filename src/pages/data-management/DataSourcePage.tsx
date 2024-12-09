import { useDataConfigByUrl } from '@/hooks/useDataConfigByUrl';
import { title } from '@/components/primitives';
import React from 'react';
import { CreateModal } from './components/CreateModal';
import { Dataset as DatasetDialog } from './dialogs/Dataset';
import { ConfirmationModal } from '@/dialogs/ConfirmationModal';
import { dataTypes } from '@/config/data-management.config';

import { toast } from 'react-toastify'

import { getDatasets, deleteDatasets, downloadDataset, postDataset } from '../../api';
import DefaultLayout from '@/layouts/default';
import { Button, Chip, DateRangePicker, Select, SelectItem, useDisclosure } from '@nextui-org/react';
import { CustomTable } from './components/CustomTable';
import { useColumnConfig } from '@/hooks/useColumnConfig';
import { parseDate, parseDateTime } from '@internationalized/date';
import { formatDate } from '@/utils'
import {getDateTimeLimits} from '@/api'
import CloseIcon from '@/icons/Close'
import { UserContext } from '@/App'

export default function DataSourcesPage() {
  const token = React.useContext(UserContext)

  if (token === null || token === undefined || token === 'undefined' || token === 'null') {
    console.log('token', token)
    return (
        <DefaultLayout>
          <section className='flex flex-col items-center justify-center gap-4 py-8 md:py-10'>
            <div className='inline-block'>
              <h1
                className={title({
                  size: 'sm',
                })}
              >
                Please login to proceed
              </h1>
            </div>
          </section>
        </DefaultLayout>
    )
  }
  const { label, name: dataName } = useDataConfigByUrl();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const DEFAULT_DATA = [ ];

  const RESOLUTION = 0
  const FREQUENCY = 1
  //const { name } = useDataConfigByUrl();

  const { configColumns } = useColumnConfig();

  const [dataSpecs, setDataSpecs] = React.useState<string[]>([
    dataTypes.hourly4.value.resolution,
    dataTypes.hourly4.value.frequency,
  ]);

  const newDatasetTemplate = React.useMemo(() => {
    console.log("Triggered");
    return {
        name: dataName, 
        resolution: +dataSpecs[RESOLUTION], 
        frequency: dataSpecs[FREQUENCY], 
        file: null, 
        time: parseDateTime('2022-01-01T00:00:00')
    }
  }, [dataSpecs, dataName])

  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]))
  const [rows, setRows] = React.useState([]);

  const [period, setPeriod] = React.useState({
    start: parseDate('2019-01-01'),
    end: parseDate('2019-01-10')
  })

  const [dateLimits, setDateLimits] = React.useState({min: "", max: ""})

  const datasetDelete = (datasetIds: string[]) => {
    console.log(datasetIds)
    deleteDatasets(datasetIds)
  }

  const datasetDownload = (dataset) => {
    console.log(dataset)
  }

  React.useEffect(() => {
    const getLimits = async () => {
      try {
        const limits = await getDateTimeLimits(dataName, dataSpecs[RESOLUTION], dataSpecs[FREQUENCY])
        setDateLimits({min: new Date(limits.min), max: new Date(limits.max)})
      }
      catch(e) {
        toast.error(e)
        console.error(e)
      }
    }
    getLimits()
  }, [dataName, dataSpecs])
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getDatasets(
          dataName,
          dataSpecs[RESOLUTION],
          dataSpecs[FREQUENCY],
          period.start.toDate(),
          period.end.toDate(),
          DEFAULT_DATA
        );
        setRows(result);
      } catch (error) {
        console.error('Failed to fetch data', error);
      }
    };

    fetchData();
  }, [dataName, dataSpecs, period]);

  return (
    <DefaultLayout>
      <section className='flex flex-col items-center justify-center gap-4 py-8 md:py-10'>
        <h1 className='text-2xl font-bold text-left w-full'>{dataName}
            <span className='ml-3 mr-1 font-light text-sm italic'>from</span><Chip radius="sm" >{formatDate(dateLimits.min)}</Chip> {"  "} 
            <span className='ml-3 mr-1 font-light text-sm italic'>to</span><Chip radius="sm" >{formatDate(dateLimits.max)}</Chip></h1>
        <div className='flex justify-start gap-2.5 w-full'>
          <Select
            label='Data specs'
            className='max-w-40'
            size='sm'
            defaultSelectedKeys={'all'}
          >
            {Object.keys(dataTypes).map((key) => {
              const item = dataTypes[key as keyof typeof dataTypes];
              return (
                <SelectItem
                  key={key}
                  value={[`${item.value.resolution}`, item.value.frequency]}
                  onClick={() => setDataSpecs([item.value.resolution, item.value.frequency])}
                >
                  {item.label ?? key}
                </SelectItem>
              );
            })}
          </Select>
          {/* <Input
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
          /> */}
          <DateRangePicker
            value={period}
            onChange={(p) => {console.log(p);setPeriod(p)}}
            label='Time duration'
            className='max-w-xs'
            minValue={parseDate('2019-01-01')}
            maxValue={parseDate('2020-12-31')}
            size='sm'
            pageBehavior='single'
            visibleMonths={2}
          />
          <div className='flex-1 flex justify-end gap-2.5 items-center '>
            <DatasetDialog onCreate={(data) => {
                console.log(data);
                postDataset(data.name, data.resolution, data.frequency, data.time, data.file)
            }} dataset={newDatasetTemplate} update={false}/>
            <Button color='danger' onPress={onOpen} variant='light' size='md' isDisabled={selectedKeys.size===0} >
                <CloseIcon />{" "}Remove selected {dataName}
            </Button>
            <ConfirmationModal isOpen={isOpen} onOpenChange={onOpenChange} onOpen={onOpen} userData={{confirmTitle:'Delete datasets'}}
                onYes={() => {
                    console.log(selectedKeys)
                    console.log(rows)
                    datasetDelete(Array.from(selectedKeys).map(key => rows[key].id))
                }
            } />
          </div>
        </div>
        <CustomTable
          selectedKeys={selectedKeys}
          onSelectionChange={setSelectedKeys}
          rows={rows ?? []}
          columns={configColumns}
          onItemDelete={(item) => datasetDelete([item.id])}
          onItemUpdate={(item) => console.log(item)}
          onItemPreview={(item) => console.log(item)}
          onItemDownload={(item) => downloadDataset(item.id)}
        />
      </section>
    </DefaultLayout>
  );
}
