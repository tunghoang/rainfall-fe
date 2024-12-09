import {downloadDatasetRaw1} from '@/api'
import {useEffect, useState} from 'react'
import { useLeafletContext } from '@react-leaflet/core'
import { formatDate } from '@/utils'
import * as georasterModule from 'georaster'
const parseGeoraster = georasterModule.default
import GeoRasterLayer from '@/lib/georaster-layer-for-leaflet'
export default function({product, resolution, frequency, time, startDate}) {
    const context = useLeafletContext()
    const [layerConfig, setLayerConfig] = useState(null)

    useEffect(() => {
        const doLoad = async () => {
            console.log('doLoad', product, resolution, frequency, time, startDate)
            const adate = new Date(startDate)
            adate.setDate(startDate.getDate() + time)
            console.log(formatDate(adate))
            const response = await downloadDatasetRaw1(product, resolution, frequency, adate)
            const arrayBuffer = await response.arrayBuffer()
            console.log('parseGeoraster', parseGeoraster, georasterModule)
            console.log(arrayBuffer)
            const georaster = await parseGeoraster(arrayBuffer)
            setLayerConfig({
                georaster: georaster,
                opacity: 0.7,
                pixelValuesToColorFn: values => values[0] > 100 ? '#ff0000' : '#0000ff',
                resolution: 64 // optional parameter for adjusting display resolution
            })
        }
        if (product) {
            doLoad()
        }
    }, [product, resolution, frequency, time, startDate])
    useEffect(() => {
        console.log(layerConfig)
        if (layerConfig !== null) {
            console.log(layerConfig)
            const layer = new GeoRasterLayer(layerConfig);
            const container = context.layerContainer || context.map
            container.addLayer(layer)
            return () => container.removeLayer(layer)
        }
    }, [layerConfig])
    return null;
}
