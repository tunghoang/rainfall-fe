import {
  LayerGroup,
  LayersControl,
  MapContainer,
  TileLayer,
  useMapEvent,
  WMSTileLayer,
  ZoomControl,
} from 'react-leaflet';
import { LatLngBoundsLiteral } from 'leaflet';
import { CustomSlider } from './CustomSlider';
import { LocationDataCard } from './LocationDataCard';
import { FeatureDataCard } from './FeatureDataCard';
import { createContext, useEffect, useState, useContext, useMemo } from 'react';
import { dataManagementNavItems } from '@/config/data-management.config'
import { UserContext } from '@/App'
import { formatDate, calcStartDate, calcCurrentDate } from '@/utils'
import { format } from 'date-fns';
import { useSearchParams } from 'react-router-dom'

import {getDateTimeLimits} from '@/api'

import { 
    Button, 
    RadioGroup, Radio,
    Listbox, ListboxItem,
    Divider
} from '@nextui-org/react'

export const SliderContext = createContext<{
  stepSlider: number;
  setStepSlider: React.Dispatch<React.SetStateAction<number>>;
} | null>(null);

const calculateScale = (zoom: number, latitude: number) => {
  const EARTH_CIRCUMFERENCE = 40075000; // in meters
  const scale = (EARTH_CIRCUMFERENCE * Math.cos((latitude * Math.PI) / 180)) / (256 * Math.pow(2, zoom));
  return Math.round(scale);
};

const DEFAULT_ZOOM = 6;
const GEOSERVER_BASE = 'http://localhost:8888/geoserver'

export const Map = () => {
  const token = useContext(UserContext)
  const [endDate, setEndDate] = useState()

  const listLayers = useMemo(() => (
    dataManagementNavItems.subItems.filter( item => ( token?item.onMap:(item.onMap && item.public) ))
  ).map(item => item.name), [token])
  //const listLayers = dataManagementNavItems.subItems.map((item) => item.name);

  const [stepSlider, setStepSlider] = useState(1);
  const [resFreq, setResFreq] = useState('10_daily')
  const [scale, setScale] = useState<number>();
  const [products, setProducts] = useState(new Set([]))
  const [showProductPane, toggleProductPane] = useState(false)

  const resolution = useMemo(() => resFreq.split('_')[0], [resFreq])
  const frequency = useMemo(() => resFreq.split('_')[1], [resFreq])
  const product = useMemo(() => (products.size > 0?Array.from(products)[0]:null), [products])
  const [timeStr, setTimeStr] = useState('20190101080000')
  const layerUrl = useMemo(() => (`/singleband/${product}/${resolution}/${frequency}/${timeStr}/{z}/{x}/{y}.png?colormap=viridis&stretch_range=[0,4]`), [product, resolution, frequency, timeStr]) 

  const vietnamBounds: LatLngBoundsLiteral = [
    [8.1790665, 102.14441],
    [23.393395, 109.46463],
  ];

  const EnforceBounds = () => {
    const map = useMapEvent('moveend', () => {
      const bounds = map.getBounds();
      const zoom = map.getZoom();
      const center = map.getCenter();

      setScale(calculateScale(zoom, center.lat));

      if (
        bounds.getSouthWest().lat < vietnamBounds[0][0] ||
        bounds.getSouthWest().lng < vietnamBounds[0][1] ||
        bounds.getNorthEast().lat > vietnamBounds[1][0] ||
        bounds.getNorthEast().lng > vietnamBounds[1][1]
      ) {
        map.panInsideBounds(vietnamBounds, { animate: true });
      }
    });
    return null;
  };

  const [searchParams, setSearchParams] = useSearchParams()
  const startDateParam = searchParams.get('startDate')
  const endDateParam = useMemo(() => searchParams.get('endDate'), [searchParams])

  useEffect(() => {
    setScale(calculateScale(DEFAULT_ZOOM, 16.028511));
  }, []);

  useEffect(() => {
    if (endDateParam) {
      setEndDate(new Date(endDateParam))
    }
    else if (product !== null) {
      getDateTimeLimits(product, resolution, frequency)
        .then(limits => setEndDate(new Date(limits.max)))
        .catch(e => console.error(e))
    }
  }, [product, resolution, frequency, endDateParam])
  console.log(token);
  return (
    <SliderContext.Provider value={{ stepSlider, setStepSlider }}>
      <MapContainer
        center={[16.028511, 105.804817]}
        className='flex-1 cursor-crosshair'
        zoom={DEFAULT_ZOOM}
        minZoom={6}
        bounds={vietnamBounds}
        maxBoundsViscosity={1.0}
        zoomControl={false}
        attributionControl={false}
      >
        {product?<TileLayer style={{zIndex: 39}} opacity={0.5} url={layerUrl} />:null}
        <TileLayer style={{zIndex: 40}} url={'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'} />
        <ZoomControl position='topleft'/>
        <EnforceBounds />
        <div className='fixed top-10 right-10 z-[45]'>
          <LocationDataCard />
          <FeatureDataCard layerName={`GeoTIFF:PVOUT_0${stepSlider}`} />
        </div>
        <div className='fixed bottom-0 left-0 w-full z-[45]'>
          {products.size===0?(null):(
            <div className='flex mx-auto mb-4 gap-1 w-5/6'>
              <div>
                <Button radius="none" onClick={() => {
                  setSearchParams(params => {
                    if (startDateParam) {
                      let startDate1 = new Date(startDateParam)
                      params.set("endDate", formatDate(startDate1))
                      let d = new Date(startDate1)
                      startDate1.setDate(startDate1.getDate() - 22)
                      params.set("startDate", formatDate(startDate1))
                      return params
                    }
                    let d = new Date(endDate)
                    d.setDate(endDate.getDate() - 2 * 22)
                    params.set("startDate", formatDate(d))
                    d.setDate(endDate.getDate() - 22)
                    params.set("endDate", formatDate(d))
                    return params
                  })
                }} className="rounded-l-md px-2 min-w-0 transparent-base h-full">{"<"}</Button>
              </div>
              <CustomSlider endDate={endDate} startDate={startDateParam}
                onChange={(startDate, steps) => {
                  console.log(startDate, steps)
                  let aDate = new Date(startDate)
                  aDate.setDate(startDate.getDate() + steps - 1)
                  const dayPart = `${aDate.getFullYear()}${String(aDate.getMonth()+1).padStart(2, '0')}${String(aDate.getDate()).padStart(2, '0')}`
                  const timePart = frequency === 'daily'?'000000':`${String(aDate.getHours()).padStart(2, '0')}${String(aDate.getMinutes()).padStart(2, '0')}${String(aDate.getSeconds()).padStart(2, '0')}`
                  const s = dayPart + timePart
                  console.log(s)
                  setTimeStr(s)
                }} 
              />
              <div>
                <Button radius="none" onClick={() => {
                  setSearchParams(params => {
                    params.set("startDate", formatDate(endDate))
                    let d = new Date(endDate)
                    d.setDate(endDate.getDate() + 22)
                    params.set("endDate", formatDate(d))
                    console.log(params)
                    return params
                  })
                }} className="rounded-r-md px-2 min-w-0 transparent-base h-full">{">"}</Button>
              </div>
            </div>
          )}
        </div>
        <div className='fixed bottom-0 right-0 z-[45]'>
          <div className='flex align-middle p-0.5 px-1 transparent-base'>
            <span className='mr-2'>{scale} km</span>
            <div className='w-14 h-1 bg-black my-auto'></div>
          </div>
        </div>
      </MapContainer>
      <div className="fixed z-[45]" style={{ top: 130, left: 10, }}>
          <Button className="bg-white text-gray-700 font-serif mb-1 rounded-sm" size="sm" color='primary' variant='solid' 
            style={{
                boxShadow: '0px 0px 1px 2px rgba(0, 0, 0, 0.2)'
            }}
            onPress={() => {
              toggleProductPane(!showProductPane)
            }}
          >
            {products.size===0?'None':`${Array.from(products)[0]}-${resolution}km-${frequency}`}
          </Button>
          {showProductPane?<div className="w-80 p-4 rounded-md rounded-md bg-white flex flex-col gap-2"
              style={{
                  boxShadow: '0px 0px 1px 2px rgba(0, 0, 0, 0.2)',
                  paddingRight: 0
              }}>
              {/*<RadioGroup 
                  aria-label='res-freq'
                  value={resFreq}
                  onValueChange={setResFreq}
                  orientation="horizontal" 
              >
                  <Radio value="10_daily">D10km</Radio>
                  <Radio value="10_hourly">H10km</Radio>
                  <Radio value="4_hourly">H4km</Radio>
              </RadioGroup>
              <div className="pr-4">
                  <Divider aria-label="divider"/>
              </div>*/}
              <Listbox aria-label="Product list"
                  style={{maxHeight: 450, overflow: 'auto'}}
                  variant="flat"
                  selectionMode="single"
                  selectedKeys={products}
                  onSelectionChange={(v) => {setProducts(v);toggleProductPane(!showProductPane)}}
              >
                 {listLayers?.map(layer => <ListboxItem key={layer}>{layer}</ListboxItem>)}
              </Listbox>
          </div>:null}
      </div>
    </SliderContext.Provider>
  );
};

export default Map;
