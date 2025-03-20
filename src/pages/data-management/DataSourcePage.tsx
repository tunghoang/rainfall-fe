import React from 'react';
import { DatasetDialog } from './dialogs/Dataset';

import { ConfirmationModal } from '@/dialogs/ConfirmationModal';
import { CustomTable } from './components/CustomTable';

import { useDataConfigByUrl } from '@/hooks/useDataConfigByUrl';
//import geoblaze from 'geoblaze'
import parseGeoraster from 'georaster'
import { title } from '@/components/primitives';
import { dataTypes } from '@/config/data-management.config';

import { toast } from 'react-toastify'

import { getDatasets, deleteDatasets, downloadDataset, downloadCSV, downloadDatasetRaw, postDataset } from '@/api';
import DefaultLayout from '@/layouts/default';
import { Button, Chip, DateRangePicker, Select, SelectItem, useDisclosure } from '@nextui-org/react';
import { useColumnConfig } from '@/hooks/useColumnConfig';
import { parseDate, parseDateTime } from '@internationalized/date';
import { formatDate, toCanvas } from '@/utils'
import {getDateTimeLimits} from '@/api'
import CloseIcon from '@/icons/Close'
import { UserContext } from '@/App'

export default function DataSourcesPage() {
  const token = React.useContext(UserContext)

  const canvasContainer = React.useRef()
  const [canvasDisplay, setCanvasDisplay] = React.useState('none')
  const today = new Date()

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

  const [loading, setLoading] = React.useState(false)
  const [dataSpecs, setDataSpecs] = React.useState<string[]>([
    dataTypes.daily10.value.resolution,
    dataTypes.daily10.value.frequency,
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

  const [dateLimits, setDateLimits] = React.useState({min: new Date("2019-01-01"), max: new Date("2019-01-10")})

  const datasetDelete = (datasetIds: string[]) => {
    console.log(datasetIds)
    deleteDatasets(datasetIds)
  }

  React.useEffect(() => {
    const getLimits = async () => {
      try {
        const limits = await getDateTimeLimits(dataName, dataSpecs[RESOLUTION], dataSpecs[FREQUENCY])
        const startDate = new Date(limits.min)
        const endDate = new Date(limits.max)
        setDateLimits({min: startDate, max: endDate})

        const d = new Date(startDate)
        d.setDate(d.getDate() + 30)
        if (endDate > d) {
            setPeriod({start: parseDate(formatDate(startDate)), end: parseDate(formatDate(d))})
        }
        else {
            setPeriod({start: parseDate(formatDate(startDate)), end: parseDate(formatDate(endDate))})
        }
      }
      catch(e) {
        toast.error(e)
        console.error(e)
      }
    }
    getLimits()
  }, [dataName, dataSpecs])
  React.useEffect(() => {
    setLoading(true)
    setRows([])
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
        setLoading(false)
        toast.success(`${result.length} records loaded`, {position: 'bottom-right'})
        setRows(result);
      } catch (error) {
        setLoadding(false)
        console.error('Failed to fetch data', error);
      }
    };

    fetchData();
  }, [dataName, dataSpecs, period]);

  return (
    <DefaultLayout>
      <section className='flex flex-col gap-4 py-8 md:py-10'>
        <h1 className='text-3xl font-extrabold text-left text-slate-900 tracking-tight dark:text-slate-200'>{dataName}
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
            minValue={parseDate(formatDate(dateLimits.min))}
            maxValue={parseDate(formatDate(dateLimits.max))}
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
          loadingState={loading}
          selectedKeys={selectedKeys}
          onSelectionChange={setSelectedKeys}
          rows={rows ?? []}
          columns={configColumns}
          onItemDelete={(item) => datasetDelete([item.id])}
          onItemUpdate={(item) => console.log(item)}
          onItemPreview={(item) => {
            console.log(item)
            downloadDatasetRaw(item.id).then(async (response) => {
              if (!response.ok) {
                throw new Error('cannot download data')
              }
              
              const arrayBuf = await response.arrayBuffer();
              const georasterData = await parseGeoraster(arrayBuf)
              console.log(georasterData)
              const canvas = toCanvas(georasterData, { height: georasterData.height, width: georasterData.width });
              canvasContainer.current.textContent = ''
              canvasContainer.current.appendChild(canvas)
              setCanvasDisplay('block')
            }).catch(e => console.error(e))
          }}
          onItemDownload={(item) => downloadDataset(item)}
          onItemCSVDownload={(item) => downloadCSV(item)}
        />
      </section>
      <div className="fixed bg-transparent" style={{top: 20, left:0, bottom: 20, right: 0, display: canvasDisplay}}>
        <div className="inline-block absolute bg-white p-4 border-solid border-1 border-gray-300 drop-shadow-lg" 
            style={{top: '50%', left: '50%', transform: 'translate(-50%, -50%'}} >
          <div className="text-right mb-2">
            <Button className="text-primary" size='sm' variant='light' radius='none' onClick={() => setCanvasDisplay('none')}>Close</Button>
          </div>
          <div className="p-2 bg-green-200">
            <div ref={canvasContainer}></div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}
