import _tr from '@/translation'
import DefaultLayout from '@/layouts/default';
import { RadioGroup, Tooltip, Radio, Button, Card, CardHeader, CardBody, CardFooter, DateRangePicker, Autocomplete, AutocompleteItem } from '@nextui-org/react';
import { formatDate, datediff, toCSV } from '@/utils'
import { parseDate } from '@internationalized/date';
import { useState, useEffect, useMemo, useRef } from 'react'
import { getLocations, analyze, getDateTimeLimits } from '@/api'
import { dataManagementNavItems } from '@/config/data-management.config'
import InfoIcon from '../icons/Info'
import Plotly from 'plotly.js-dist-min'
import { toast } from "react-toastify";
import {MAX_TIME_RANGE} from '@/config/constant'

export default function DashboardPage() {
  const today = new Date()
  const [period, setPeriod] = useState({
    start: parseDate('2019-01-01'),
    end: parseDate('2019-01-10')
  })

  const [analyzeData, setAnalyzeData] = useState()
  const [level, setLevel] = useState(1)
  const [product, setProduct] = useState()
  const dataSize = useMemo(() => {
    return datediff(period.start.toDate(), period.end.toDate())
  }, [period])
  const [gid, setGid] = useState(null)
  const [gid1, setGid1] = useState(null)
  const [gid2, setGid2] = useState(null)
  const [gid3, setGid3] = useState(null)

  const [level1AUs, setLevel1AUs] = useState([])
  const [level2AUs, setLevel2AUs] = useState([])
  const [level3AUs, setLevel3AUs] = useState([])

  const [chartType, setChartType] = useState('line')

  const plotContainer = useRef(null)
  const plotContainer1 = useRef(null)

  const [plotData, setPlotData] = useState()

  const [tooltipOpen, setTooltipOpen] = useState(false)

  useEffect(() => {
    getLocations(1, gid).then(locations => setLevel1AUs( locations.filter(l => l.name_1 === 'Thanh Hóa' || l.name_1 === 'Nghệ An' || l.name_1 === 'Hà Tĩnh') ))
  }, [])

  useEffect(() => {
    if (!level) return
    if (level === 1) {
        return
    }
    if (level === 4) {
        return;
    }
    else if (level > 1) {
        if (!gid) return
        getLocations(level, gid).then(locations => {
            if (level === 2) setLevel2AUs(locations)
            else if (level === 3) setLevel3AUs(locations)
        })
    }
  }, [level, gid])

  useEffect(() => {
    const getLimits = async () => {
      try {
        const limits = await getDateTimeLimits(product, '10', 'daily')
        console.log('Limits', limits)
        if (limits.max && limits.min) {
            setPeriod({start: parseDate(limits.min.substr(0, 10)), end: parseDate(limits.max.substr(0, 10))})
        }
      }
      catch(e) {
        toast.error(e)
        console.error(e)
      }
    }
    getLimits()
    
  }, [product])

  const plotMode = 'lines+markers'
  const plotType = 'scatter'
  const renderPlot = (domNode, traces, yAxisLabel) => {
    if (domNode) {
        domNode.textContent = '';
        Plotly.newPlot(domNode, traces, {
            showlegend: true,
            legend: {
                orientation: 'h',
                xanchor: "center",
                x: 0.5, y: 1.2
            },
            xaxis: {
                title: {
                    text: _tr('Time')
                },
                showticklabels: true
            },
            yaxis: {
                title: {
                    text: yAxisLabel
                },
                showticklabels: true
            },
            margin: {t: 40}
        }, {displayModeBar: false} )
    }
  }
  useEffect(() => {
    if (!analyzeData) return
    const options = {
        mode: chartType === 'line'?'lines+markers':null,
        barmode: chartType === 'line'?null:'group',
        type: chartType === 'line'?'scatter':'bar'
    }
    const maxTrace = {
        x: analyzeData.map(item => item[0]),
        y: analyzeData.map(item => item[1].max),
        name: _tr('Max precipation') + ' (mm)',
        ...options
    }
    
    const avgTrace = {
        x: analyzeData.map(item => item[0]),
        y: analyzeData.map(item => item[1].avg),
        name: _tr('Average precipation') + ' (mm)',
        ...options
    }

    const coverageTrace = {
        x: analyzeData.map(item => item[0]),
        y: analyzeData.map(item => 100*item[1].nonzeros),
        name: _tr('Rainfall coverage') + ' (km2)',
        ...options
    }

    setPlotData({ maxTrace, avgTrace, coverageTrace })
    renderPlot(plotContainer.current, [maxTrace, avgTrace], _tr('Precipitation') + ' (mm)')
    renderPlot(plotContainer1.current, [coverageTrace], _tr('Rainfall coverage ') + '(km2)')
  }, [analyzeData, chartType])
  return (
    <DefaultLayout>
      <section className='flex flex-col gap-4 py-8 md:py-10'>
        <h1 className='max-w-lg text-3xl font-extrabold text-slate-900 tracking-tight dark:text-slate-200'>
          {_tr("Statistics on precipitation")} 
        </h1>
        <p>
          {_tr('Details on precipitation across three northern-central provinces')}.
        </p>
        <div className="dashboard-content flex gap-8 items-start">
            <div className="selectors" style={{flexBasis: 200}}>
                <Autocomplete variant="faded" size="sm"
                    className="mt-2"
                    aria-label='select product'
                    startContent={<span className='text-tiny text-primary whitespace-nowrap'>{_tr('Product')}:</span>}
                    defaultItems={dataManagementNavItems.subItems.filter(item => item.onDashboard)}
                    selectedKey={product}
                    onSelectionChange={(product) => {
                        setProduct(product)
                    }}
                >
                    {(item) => <AutocompleteItem key={item.name}>{item.label}</AutocompleteItem>}
                </Autocomplete>
                <DateRangePicker 
                    value={period}
                    onChange={(p) => { 
                        if (p) {
                            setPeriod(p) 
                        }
                    }}
                    label={_tr('Time range')}
                    className="mt-2"
                    minValue={parseDate('2019-01-01')}
                    maxValue={parseDate(formatDate(today))}
                    size='sm'
                    pageBehavior='single'
                    visibleMonths={1}
                    variant='faded'
                    classNames={{
                        "base": "width-limit",
                        "label": "text-primary",
                        "inputWrapper": "px-2"
                    }}
                />
                {dataSize > MAX_TIME_RANGE?<div className="text-red-600 text-tiny">{_tr('Time range should not exceed') + " " + MAX_TIME_RANGE}</div>:null}
                <Autocomplete variant="faded" size="sm"
                    className="mt-2"
                    aria-label='select province'
                    startContent={<span className='text-tiny text-primary whitespace-nowrap'>{_tr('Province')}:</span>}
                    defaultItems={level1AUs}
                    selectedKey={gid1}
                    onSelectionChange={(gid) => {
                        setLevel2AUs([])
                        setLevel3AUs([])
                        setLevel(2)
                        setGid(gid)
                        setGid1(gid)
                    }}
                >
                    {(item) => <AutocompleteItem key={item.gid_1}>{item.name_1}</AutocompleteItem>}
                </Autocomplete>
                <Autocomplete variant="faded" size="sm"
                    className="mt-2"
                    aria-label='select district'
                    startContent={<span className='text-tiny text-primary'>{_tr('District')}:</span>}
                    items={level2AUs}
                    selectedKey={gid2}
                    onSelectionChange={(gid) => {
                        setLevel3AUs([])
                        setLevel(3)
                        setGid(gid)
                        setGid2(gid)
                    }}
                >
                    {(item) => <AutocompleteItem key={item.gid_2}>{item.name_2}</AutocompleteItem>}
                </Autocomplete>
                <Autocomplete variant="faded" size="sm"
                    className="mt-2"
                    aria-label='select ward'
                    startContent={<span className='text-tiny text-primary'>{_tr('Ward')}:</span>}
                    items={level3AUs}
                    selectedKey={gid3}
                    onSelectionChange={(gid) => {
                        setLevel(4)
                        setGid(gid)
                        setGid3(gid)
                    }}
                >
                    {(item) => <AutocompleteItem key={item.gid_3}>{item.name_3}</AutocompleteItem>}
                </Autocomplete>
                <div className="mt-2 text-right">
                    <Button variant="solid" size="sm" 
                        className="mr-2" color='primary' isDisabled={!product || !gid || dataSize > MAX_TIME_RANGE } 
                        onClick={async () => {
                            let results = null;
                            try {
                                results = await analyze(product + "_10KM_daily", gid, level - 1, formatDate(period.start.toDate()), formatDate(period.end.toDate()))
                            }
                            catch(e) {
                                toast.error(e.message, { autoClose: 1000 })
                                return;
                            }
                            console.log(results)
                            setAnalyzeData(results)
                        }}
                    >{_tr('Apply')}</Button>
                    <Button variant="flat" size="sm" onClick={() => {
                        setGid(null);
                        setGid1(null);
                        setGid2(null);
                        setGid3(null);
                        setLevel(1);
                        setProduct(null)
                        setLevel2AUs([])
                        setLevel3AUs([])
                    }}>{_tr('Reset')}</Button>
                </div>
            </div>
            <div className="grow flex flex-col gap-4">{analyzeData?(<>
                <div className="flex gap-4 h-40">
                    <Card className="grow min-w-40">
                        <CardHeader className="text-sm text-blue-500">Total rain coverage</CardHeader>
                        <CardBody><div className="text-5xl font-bold my-auto mx-auto">{
                            (100 * analyzeData.reduce((total, item) => (total + item[1].nonzeros), 0) / dataSize).toFixed(1)
                        }
                        </div></CardBody>
                        <CardFooter>
                            <div className="grow text-right text-sm text-red-700 italic font-serif">km<sup>2</sup></div>
                        </CardFooter>
                    </Card>
                    <Card className="grow min-w-40">
                        <CardHeader className="text-sm text-blue-500">Max on<span className='ml-2 font-bold'>{
                            analyzeData.reduce(
                                (accData, item) => ( accData[1] < item[1].max? [item[0], item[1].max]: accData ), [null, -10000]
                            )[0]
                        }</span>
                        </CardHeader>
                        <CardBody><div className="text-5xl font-bold my-auto mx-auto">{
                            analyzeData.reduce((accData, item) => ( accData[1] < item[1].max? [item[0], item[1].max]: accData ), [null, -10000])[1]?.toFixed(2)
                        }</div></CardBody>
                        <CardFooter>
                            <div className="grow text-right text-sm text-red-700 italic font-serif">mm</div>
                        </CardFooter>
                    </Card>

                    <Card className="grow min-w-40">
                        <CardHeader className="text-sm text-blue-500">Average</CardHeader>
                        <CardBody><div className="text-5xl font-bold my-auto mx-auto">{( analyzeData.reduce((total, item) => (total + item[1].avg), 0) / analyzeData.length ).toFixed(2) }</div></CardBody>
                        <CardFooter>
                            <div className="grow text-right text-sm text-red-700 italic font-serif">mm</div>
                        </CardFooter>
                    </Card>
                </div>
                <div className="flex gap-4 h-96" style={{height: 900}}>
                    <Card className="grow">
                        <CardHeader className="text-sm text-blue-500">{`${_tr('Precipitation')} and ${_tr('Rainfall coverage')}`}</CardHeader>
                        <CardBody>
                            <div className="flex justify-between">
                                <div>
                                    <RadioGroup orientation="horizontal" className="inline-flex mr-2" value={chartType} onValueChange={setChartType}>
                                        <Radio value="line">{_tr('Line chart')}</Radio>
                                        <Radio value="bar">{_tr('Bar chart')}</Radio>
                                    </RadioGroup>
                                    <Tooltip content={_tr('Interactive with below charts for inspection, zoom in/out, etc')} isOpen={tooltipOpen} placement='bottom' onOpenChange={(open) => {
                                        if (open) { setTooltipOpen(false); }
                                    }}>
                                        <Button variant="solid" radius='none' isIconOnly size="sm" className="bg-white mr-2 align-middle"
                                            onClick={() => setTooltipOpen(!tooltipOpen)}
                                        >
                                            <InfoIcon size={16} />
                                        </Button>
                                    </Tooltip>
                                </div>
                                {plotData?<Button size='sm' radius='none' variant='bordered' color='primary'
                                    onClick={() => {
                                        console.log("Export to CSV", plotData)
                                        toCSV([
                                            plotData.maxTrace.x, plotData.maxTrace.y,
                                            plotData.avgTrace.x, plotData.avgTrace.y,
                                            plotData.coverageTrace.x, plotData.coverageTrace.y
                                        ], ['datemax', 'max', 'dateavg', 'avg', 'datecoverage', 'coverage'])
                                    }}
                                >CSV</Button>:<div></div>}
                            </div>
                            <div ref={plotContainer} className="h-full bg-default-300">Kakakaka</div>
                            <div ref={plotContainer1} className="h-full mt-2 bg-default-300">Kakakaka</div>
                        </CardBody>
                    </Card>
                </div>
            </>):null}
            </div>
        </div>
      </section>
    </DefaultLayout>
  );
}
