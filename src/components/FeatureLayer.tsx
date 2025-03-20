import { useEffect, useState } from 'react';
import { GeoJSON, useMapEvents } from 'react-leaflet';
import { DEFAULT_ZOOM, MIN_ZOOM_SIZE_DISTRICT_LEVEL, MIN_ZOOM_SIZE_WARD_LEVEL } from '@/config/constant';
import { useDisclosure } from '@nextui-org/react';
//import { LocationDetailModal } from './LocationDetailModal';
import { GEOSERVER_TOKEN } from '@/config/constant'

import { debounce } from 'lodash'
import { createContext } from 'react';

export const GeopolygonLevelContext = createContext({
  geopolygonLevel: 'province',
  setGeopolygonLevel: () => {},
});

export const FeatureLayer = ({bBox, setBBoxFn, zoom, setZoomFn, onHighlightedFeatureChange, selectedFeature, onFeatureSelect}) => {
  const [features, setFeatures] = useState(null);
  const [highlightedFeatureId, setHighlightedFeatureId] = useState(null);

  const [featureDetail, setFeatureDetail] = useState(null);
  const [geopolygonLevel, setGeopolygonLevel] = useState('province');

  const fetchAllFeatures = async ( _zoom, _bBox ) => {
    if (!_bBox || !_zoom) return
    let cql_filter = ''
    if (_zoom < MIN_ZOOM_SIZE_DISTRICT_LEVEL) {
      setGeopolygonLevel('province');
      cql_filter = 'isNull(gid_1)=false%20and%20isNull(gid_2)=true%20and%20isNull(gid_3)=true'
    } 
    else if (_zoom < MIN_ZOOM_SIZE_WARD_LEVEL) {
      setGeopolygonLevel('district');
      cql_filter = 'isNull(gid_1)=false%20and%20isNull(gid_2)=false%20and%20isNull(gid_3)=true'
    }
    else {
      setGeopolygonLevel('ward');
      cql_filter = 'isNull(gid_1)=false%20and%20isNull(gid_2)=false%20and%20isNull(gid_3)=false'
    }
    const url = `/geoserver/gadm/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=gadm%3Aau&maxFeatures=500&outputFormat=application%2Fjson&cql_filter=${cql_filter}%20and%20bbox(the_geom,${_bBox[0][0]},${_bBox[0][1]},${_bBox[1][0]},${_bBox[1][1]})`
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
            Authorization: 'Basic ' + GEOSERVER_TOKEN
        }
      });
      const data = await response.json();

      setFeatures(null);
      setTimeout(() => setFeatures(data.features), 0);
    } catch (error) {
      console.error('Error fetching features:', error);
    }
  }

  const dFetchAllFeatures = debounce(fetchAllFeatures, 500)

  useEffect(() => {
    dFetchAllFeatures(zoom || DEFAULT_ZOOM, bBox);
  }, [zoom, bBox]);

  const defaultStyle = {
    color: 'cyan',
    weight: 1,
    fillOpacity: 0,
  };

  const highlightStyle = {
    color: 'blue',
    weight: 2,
  };
  
  const onEachFeature = (feature: any, layer: any) => {
    layer.on({
      mouseover: () => {
        setHighlightedFeatureId(feature.id)
        onHighlightedFeatureChange(feature)
      },
      mouseout: () => {
        setHighlightedFeatureId(null)
        onHighlightedFeatureChange(null)
      },
      click: () => {
        onFeatureSelect(feature)
        setFeatureDetail(feature);
        //onOpen();
      },
    });
  };
  const updateZoomAndBounds = () => {
      const bounds = map.getBounds()
      setZoomFn(map.getZoom())
      setBBoxFn([[bounds.getWest(),bounds.getSouth()], [bounds.getEast(), bounds.getNorth()]])
  }
  const map = useMapEvents({
    zoomend: updateZoomAndBounds,
    moveend: (e) => {
      const bounds = map.getBounds()
      setBBoxFn([[bounds.getWest(),bounds.getSouth()], [bounds.getEast(), bounds.getNorth()]])
    },
    load: () => {
      updateZoomAndBounds()
    }
  });

  //const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <GeopolygonLevelContext.Provider value={{ geopolygonLevel, setGeopolygonLevel }}>
      {features && (
        <GeoJSON
          data={features}
          style={(feature) => {
            const cStyle = (feature?.id === highlightedFeatureId)?highlightStyle:defaultStyle
            let toReturn = { ...cStyle }
            if(feature?.id === selectedFeature?.id) {
                toReturn.fillOpacity = 0.6
            }
            return toReturn
          }}
          onEachFeature={onEachFeature}
        />
      )}
      {/*<LocationDetailModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        featureDetail={featureDetail}
      />*/}
    </GeopolygonLevelContext.Provider>
  );
};
