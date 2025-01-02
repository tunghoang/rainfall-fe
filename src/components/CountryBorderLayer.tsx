import { useEffect, useState } from 'react';
import { SVGOverlay, GeoJSON } from 'react-leaflet';
import { GEOSERVER_TOKEN } from '@/config/constant'

export const CountryBorderLayer = () => {
    const [features, setFeatures] = useState(null);
    const [hoangSa, setHoangSa] = useState(null);
    const [truongSa, setTruongSa] = useState(null);
    const [boundHS, setBoundHS] = useState()
    const [boundTS, setBoundTS] = useState()

    const calcBound = (bbox) => {
        return [ [ bbox[1], bbox[0] ], [ bbox[3], bbox[2] ] ] 
    }

    const getWFS = async (url) => {
        console.log('GEOSERVER', GEOSERVER_TOKEN);
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Basic ' + GEOSERVER_TOKEN
            }
        })
        const data = await response.json()
        return data
    }
    const getCountryFeature = async () => {
        const url = `/geoserver/gadm/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=gadm%3Agadm41_VNM_0&maxFeatures=50&outputFormat=application%2Fjson`
        return getWFS(url)
    }
    const getHoangSa = async () => {
        const url = `/geoserver/gadm/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=gadm%3AHoang_Sa&maxFeatures=50&outputFormat=application%2Fjson`
        return getWFS(url)
    }
    const getTruongSa = async () => {
        const url = `/geoserver/gadm/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=gadm%3ATruong_Sa&maxFeatures=50&outputFormat=application%2Fjson`
        return getWFS(url)
    }
    useEffect(() => {
        Promise.all([getCountryFeature(), getHoangSa(), getTruongSa()]).then((results) => {
            const country = results[0]
            const hoangsa = results[1]
            const truongsa = results[2]
            console.log("Promise all:", country, hoangsa, truongsa )
            setFeatures(country.features)
            setHoangSa(hoangsa.features)
            setTruongSa(truongsa.features)

            setBoundHS(calcBound(hoangsa.bbox))
            setBoundTS(calcBound(truongsa.bbox))

        }).catch(error => {
          console.error('Error fetching country border:', error);
        })
    }, [])
    return <>
        { features && (<GeoJSON className="COUNTRY"
          data={features}
          style={{
            color: 'pink',
            fillOpacity: 0,
            weight: 5,
          }}
        />) }
        { hoangSa && (<GeoJSON className="HOANGSA"
          data={hoangSa}
          style={{
            color: 'gray',
            fillOpacity: 0,
            weight: 2,
          }}
        />) }
        { truongSa && (<GeoJSON className="TRUONGSA"
          data={truongSa}
          style={{
            color: 'gray',
            fillOpacity: 0,
            weight: 2,
          }}
        />) }
        {boundHS && (<SVGOverlay attributes={{overflow: 'visible'}} bounds={boundHS}>
            <text stroke="rgb(80, 100, 142)" x="50%" y="50%" textAnchor="middle">Hoang Sa (Vietnam)</text>
        </SVGOverlay>)}
        {boundTS && (<SVGOverlay attributes={{overflow: 'visible'}} bounds={boundTS}>
            <text stroke="rgb(80, 100, 142)" x="50%" y="50%" textAnchor="middle">Truong Sa (Vietnam)</text>
        </SVGOverlay>)}
        
    </>
}
