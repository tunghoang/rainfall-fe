import {
  TileLayer,
} from 'react-leaflet';
import geoblaze from 'geoblaze'
import parseGeoraster from 'georaster'
import {useState, useMemo, useEffect} from 'react'
import {downloadDatasetRaw2} from '@/api'
import { debounce } from 'lodash'

export const RainDataLayer = ({url, 
        product, resolution, frequency, timeStr, 
        colormap='indra2', 
        mouseLocation, onPrecipitation, 
        selectedLocation, onStatsUpdate,
        stretchRange
}) => {
    const [rainData, setRainData] = useState()
    const layerUrl = useMemo(() => (`/singleband/${product}/${resolution}/${frequency}/${timeStr}/{z}/{x}/{y}.png?colormap=${colormap}&stretch_range=${stretchRange}`), [product, resolution, frequency, timeStr, colormap, stretchRange]) 

    const getLocPrecipitation = debounce((mouseLoc) => {
        try {
            const values = geoblaze.identify(rainData, [mouseLoc.lng, mouseLoc.lat])
            onPrecipitation(values[0])
        }
        catch(e) {
            onPrecipitation(null)
        }
    }, 200)

    useEffect(() => {
        if (!product) {
            console.log("Clear Raindata");
            setRainData(null)
            return
        }
        console.log('timeStr', timeStr)
        downloadDatasetRaw2(product, resolution, frequency, timeStr).then(async (response) => {
            if (!response.ok) {
                throw new Error('Cannot download rain data')
            }
            const arrayBuf = await response.arrayBuffer();
            const georaster = await parseGeoraster(arrayBuf)
            //const georaster = await geoblaze.parse(arrayBuf)

            console.log('arrayBuf', product, timeStr, georaster)
            setRainData(georaster)
        }).catch(e => {
            console.log("clear Raindata");
            setRainData(null)
        })
    }, [product, resolution, frequency, timeStr])

    useEffect(() => {
        if (!rainData) {
            onPrecipitation(null)
            return
        }
        getLocPrecipitation(mouseLocation)
    }, [mouseLocation, rainData])

    useEffect(() => {
        if (!rainData || !selectedLocation) {
            console.log("update stats null")
            onStatsUpdate({})
            return
        }
        console.log("update stats")
        try {
            Promise.all([
                geoblaze.max(rainData, selectedLocation),
                geoblaze.min(rainData, selectedLocation),
                geoblaze.mean(rainData, selectedLocation)
            ]).then( results => {
                console.log(results)
                onStatsUpdate({max:results[0][0], min: results[1][0], mean: results[2][0]})
            }).catch(e => {
                console.error(e)
                onStatsUpdate({})
            })
        }
        catch(e1) {
            console.error(e1)
            onStatsUpdate({})
        }
    }, [rainData, selectedLocation])
    return <>
        <TileLayer style={{zIndex: 39}} className={`rain-data`} opacity={0.6} url={url || layerUrl} />
    </>
}
