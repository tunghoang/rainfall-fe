import _tr from '@/translation'
import DefaultLayout from '@/layouts/default';
import { RadioGroup, Radio, Button, Card, CardHeader, CardBody, CardFooter, DateRangePicker, Autocomplete, AutocompleteItem } from '@nextui-org/react';
import { formatDate } from '@/utils'
import { parseDate } from '@internationalized/date';
import { useState, useEffect, useMemo, useRef } from 'react'
import { getLocations, analyze, getDateTimeLimits } from '@/api'
import { dataManagementNavItems } from '@/config/data-management.config'
import Plotly from 'plotly.js-dist'
import { toast } from "react-toastify";

export default function DashboardPage() {
  const today = new Date()
  const [period, setPeriod] = useState({
    start: parseDate('2019-01-01'),
    end: parseDate('2019-01-10')
  })

  const [analyzeData, setAnalyzeData] = useState()
  const [level, setLevel] = useState(1)
  const [product, setProduct] = useState()
  const datediff = (first, second) => {        
    return Math.round((second - first) / (1000 * 60 * 60 * 24));
  }
  const dataSize = useMemo(() => {
    return datediff(period.start.toDate(), period.end.toDate())
  }, [period])
  const [gid, setGid] = useState(null)
  const [level1AUs, setLevel1AUs] = useState([])
  const [level2AUs, setLevel2AUs] = useState([])
  const [level3AUs, setLevel3AUs] = useState([])

  const [chartType, setChartType] = useState('line')

  const plotContainer = useRef(null)
  const plotContainer1 = useRef(null)
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
        name: _tr('Rain coverage') + ' (km2)',
        ...options
    }
    renderPlot(plotContainer.current, [maxTrace, avgTrace], _tr('Precipitation ') + '(mm)')
    renderPlot(plotContainer1.current, [coverageTrace], _tr('Rain coverage ') + '(km2)')
  }, [analyzeData, chartType])
  return (
    <DefaultLayout>
      <section className='flex flex-col gap-4 py-8 md:py-10'>
        <h1 className='max-w-lg text-3xl font-extrabold text-slate-900 tracking-tight dark:text-slate-200'>
          {_tr("Statistics on precipitation")} 
        </h1>
        <p>
          Details on precipitation over 3 northen central provinces
        </p>
        <div className="dashboard-content flex gap-8 items-start">
            <div className="selectors" style={{flexBasis: 170}}>
                <DateRangePicker 
                    className="mt-2"
                    classNames={{
                        "base": "width-limit",
                        "label": "text-primary",
                        "inputWrapper": "px-2"
                    }}
                    value={period}
                    onChange={(p) => {console.log(p); setPeriod(p)}}
                    label='Time duration'
                    minValue={parseDate('2019-01-01')}
                    maxValue={parseDate(formatDate(today))}
                    size='sm'
                    pageBehavior='single'
                    visibleMonths={1}
                    variant='faded'
                />
                <Autocomplete variant="faded" size="sm"
                    className="mt-2"
                    aria-label='select product'
                    startContent={<span className='text-tiny text-primary'>Product:</span>}
                    defaultItems={dataManagementNavItems.subItems}
                    onSelectionChange={(product) => {
                        setProduct(product)
                    }}
                >
                    {(item) => <AutocompleteItem key={item.name}>{item.label}</AutocompleteItem>}
                </Autocomplete>
                <Autocomplete variant="faded" size="sm"
                    className="mt-2"
                    aria-label='select province'
                    startContent={<span className='text-tiny text-primary'>Province:</span>}
                    defaultItems={level1AUs}
                    onSelectionChange={(gid) => {
                        setLevel2AUs([])
                        setLevel3AUs([])
                        setLevel(2)
                        setGid(gid)
                    }}
                >
                    {(item) => <AutocompleteItem key={item.gid_1}>{item.name_1}</AutocompleteItem>}
                </Autocomplete>
                <Autocomplete variant="faded" size="sm"
                    className="mt-2"
                    aria-label='select district'
                    startContent={<span className='text-tiny text-primary'>District:</span>}
                    items={level2AUs}
                    onSelectionChange={(gid) => {
                        setLevel3AUs([])
                        setLevel(3)
                        setGid(gid)
                    }}
                >
                    {(item) => <AutocompleteItem key={item.gid_2}>{item.name_2}</AutocompleteItem>}
                </Autocomplete>
                <Autocomplete variant="faded" size="sm"
                    className="mt-2"
                    aria-label='select ward'
                    startContent={<span className='text-tiny text-primary'>Ward:</span>}
                    items={level3AUs}
                    onSelectionChange={(gid) => {
                        setLevel(4)
                        setGid(gid)
                    }}
                >
                    {(item) => <AutocompleteItem key={item.gid_3}>{item.name_3}</AutocompleteItem>}
                </Autocomplete>
                <div className="mt-2 text-right">
                    <Button variant="solid" size="sm" 
                        className="mr-2" color='primary' isDisabled={!product || !gid || dataSize > 100 } 
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
                        setLevel(1);
                        setLevel2AUs([])
                        setLevel3AUs([])
                    }}>{_tr('Reset')}</Button>
                </div>
            </div>
            <div className="grow flex flex-col gap-4">{analyzeData?(<>
                <div className="flex gap-4 h-40">
                    <Card className="grow min-w-40">
                        <CardHeader className="text-tiny text-blue-500">Total rain coverage</CardHeader>
                        <CardBody><div className="text-5xl font-bold my-auto mx-auto">{
                            100 * analyzeData.reduce((total, item) => (total + item[1].nonzeros), 0)
                        }
                        </div></CardBody>
                        <CardFooter>
                            <div className="grow text-right text-sm text-red-700 italic font-serif">km<sup>2</sup></div>
                        </CardFooter>
                    </Card>
                    <Card className="grow min-w-40">
                        <CardHeader className="text-sm text-blue-500">Max on <span className='font-bold'>{
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
                        <CardHeader className="text-sm text-blue-500">{`${_tr('Precipitation')} and ${_tr('Rain Coverage')}`}</CardHeader>
                        <CardBody>
                            <RadioGroup orientation="horizontal" value={chartType} onValueChange={setChartType}>
                                <Radio value="line">Line chart</Radio>
                                <Radio value="bar">Bar chart</Radio>
                            </RadioGroup>
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
