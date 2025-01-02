import { useState, useMemo, useEffect } from 'react';
import _tr from '@/translation'

import { useMapEvent } from 'react-leaflet';
import { Button, Divider } from '@nextui-org/react'

import InfoIcon from '../icons/Info'

import { parseDate } from '@internationalized/date';

export const InfoStrip = ({feature, scale, selectedLocation, 
        mouseLocation, onMouseLocationChange, precipitation, timeStr, triggerShowInfo,
        product, statsInfo, onSelectedLocationClick
}) => {

  const [showInfo, setShowInfo] = useState(false)

  const parseGeoJSONProps = (feature) => {
    if (!feature) return '';
    const props = feature.properties
    if (props['type_3']) {
        return `${props['type_3']} ${props['name_3']}, ${props['name_2']}, ${props['name_1']}`
    }
    else if (props['type_2']) {
        return `${props['type_2']} ${props['name_2']}, ${props['name_1']}`
    }
    else if (props['type_1']) {
        return `${props['type_1']} ${props['name_1']}`
    }
    return '';
  }
  const parseFeatureInfo = useMemo(() => {
    parseGeoJSONProps(feature)
  }, [feature])

  const parseSelectedLocationInfo = useMemo(() => {
    parseGeoJSONProps(feature)
  }, [selectedLocation])
  const map = useMapEvent('mousemove', async (event) => {
    const { lat, lng } = event.latlng;
    onMouseLocationChange({ lat, lng });
  });

  useEffect(() => {
    if (triggerShowInfo) {
      setShowInfo(true)
    }
  }, [triggerShowInfo])

  return (<>
    <div className='fixed bottom-0 right-0 z-[45] w-full flex align-middle p-0.5 px-1 transparent-base'>
      {selectedLocation?(
        <div className='ml-4 bg-blue-600 text-white pl-2 pr-1'>
            <span className='mx-2 px-1 cursor-pointer text-yellow-400' 
                style={{backgroundColor: 'rgba(255, 255, 255, 0.3)'}}  
                onClick={() => {
                    onSelectedLocationClick(map, selectedLocation)
                }}
            >{parseGeoJSONProps(selectedLocation)}</span>
            <span className='mx-2'>min: <span className='bg-white text-blue-600 px-1'>{statsInfo?.min?.toFixed(4) ?? 'NA'}</span></span>
            <span className='mx-2'>max: <span className='bg-white text-blue-600 px-1'>{statsInfo?.max?.toFixed(4) ?? 'NA'}</span></span>
            <span className='mx-2'>avg: <span className='bg-white text-blue-600 px-1'>{statsInfo?.mean?.toFixed(4) ?? 'NA'}</span></span>
        </div>
      ):null}
      <div className="grow"></div>
      {feature?(<div className='mr-6'><span className='bg-blue-400 px-1 text-white'>{parseGeoJSONProps(feature)}</span></div>):null}
      <div className='mr-6'>Latitude: <span className='bg-blue-400 px-1 text-white'>{mouseLocation?.lat.toFixed(4) ?? '-'}</span></div>
      <div className='mr-6'>Longitude: <span className='bg-blue-400 px-1 text-white'>{mouseLocation?.lng.toFixed(4) ?? '-'}</span></div>
      <div className='mr-6 text-red-700'>Precipitation: <span className='bg-red-400 px-1 text-white'>{precipitation?.toFixed(4) ?? 'NA'}</span></div>
      <div className='mr-2 bg-white px-1'>{scale} km</div>
      <div className='w-14 h-1 bg-neutral-600 my-auto'></div>
    </div>

    <div className="fixed z-[40]" style={{ top: 125, right: 12, }}>
      {showInfo?(
        <div className="inline-block align-top flex flex-col bg-white min-h-32 p-4 pb-2" style={{minWidth: 350}}>
          {selectedLocation?(<>
                <div className='text-center text-base font-bold text-primary'>{parseGeoJSONProps(selectedLocation)}</div>
                <Divider />
                <div className="text-base"><div className='inline-block min-w-24 text-default-600'>{_tr('Date')}:</div>{timeStr.substring(0, 4)}-{timeStr.substring(4,6)}-{timeStr.substring(6,8)}</div>
                <div className="text-base"><div className='inline-block min-w-24 text-default-600'>{_tr('Source')}:</div>{product}</div>
                <div className="mt-4 text-center italic font-serif text-default-500 pb-0">{_tr('Precipitation')} (mm)</div>
                <Divider />
                <div className="text-base"><div className='inline-block min-w-24 text-default-600'>min:</div><span className=''>{statsInfo?.min?.toFixed(4) ?? 'NA'}</span></div>
                <div className="text-base"><div className='inline-block min-w-24 text-default-600'>max:</div><span className=''>{statsInfo?.max?.toFixed(4) ?? 'NA'}</span></div>
                <div className="text-base"><div className='inline-block min-w-24 text-default-600'>avg:</div><span className=''>{statsInfo?.mean?.toFixed(4) ?? 'NA'}</span></div>
            </>
          ):null}
          <div className="grow"></div>
          <div className="text-right">
              <Button size='sm' variant='light' radius='none' onClick={() => setShowInfo(false)} className="mx-auto">Close</Button>
          </div>
        </div>
      ):(
          <Button className="bg-white" size='sm' variant='solid' 
              isIconOnly radius="none" 
              style={{border: '1px solid'}}
              onClick={() => setShowInfo(true)}
          >
              <InfoIcon size={16}/>
          </Button>
      )}
    </div>
  </>);
};

