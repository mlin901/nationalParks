import React, { useState, useEffect, useRef } from 'react';
import { useQuery } from '@apollo/react-hooks';

import { QUERY_ME } from '../utils/queries';

import Map from 'ol/Map'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import { Icon, Style } from 'ol/style';
import XYZ from 'ol/source/XYZ'
import Point from 'ol/geom/Point';
import {fromLonLat} from 'ol/proj';
import * as ol from "ol";


const MapParks = () => {

  const { loading, data } = useQuery(QUERY_ME);
  let userData = data?.me || [];

  if(!userData?.savedParks) {
    userData = data?.me || [];
  }

  const [ map, setMap ] = useState()
  const [ featuresLayer, setFeaturesLayer ] = useState()

  console.log('||||||//////');
  console.log(userData);

  console.log('||||||//////|||||||/////||||||////');
  console.log(userData.savedParks);

  const mapElement = useRef()
  const mapRef = useRef()
  mapRef.current = map

  const locationArray = []
  if (userData.savedParks) {
  for (let index = 0; index < userData.savedParks.length; index++) {    // ??????
    const varName = userData.savedParks[index].parkName;
    const latitude = parseFloat(userData.savedParks[index].latitude);
      console.log('----- ||||||//////|||||||/////||||||////');
      console.log(parseFloat(userData.savedParks[index].latitude));
    const longitude = parseFloat(userData.savedParks[index].longitude);
      console.log('~~~~ ====== ~~~~~ =====');
      console.log(userData.savedParks[index].longitude);
      console.log(parseFloat(userData.savedParks[index].longitude));
      console.log(Number(userData.savedParks[index].longitude));
    const lonLat = [longitude, latitude];
    const lonLatFrom = fromLonLat(lonLat);
    const entry = new ol.Feature ({   
      geometry: new Point(lonLatFrom),        
      // geometry: new Point(fromLonLat(
      //   [
      //     latitude,
      //     longitude
      //   ]
      // )
      // ),
      name: varName,
    });
    console.log('----- ----- ||||||//////|||||||/////||||||////');
    console.log(entry);
    locationArray.push(entry);
  }
  console.log('-----0 -----0 -------0 ||||||//////|||||||/////||||||////');
  console.log(locationArray);
  } // *(*(*(*(*(*(*()))))))

  // ||||////|||||////||||||
  // const iconFeature = new ol.Feature({             
  //   geometry: new Point([-11794645.148075,5906844.3420342]),
  //   name: 'Popup text',
  // });
  // console.log('-----| -----| -----| ||||||//////|||||||/////||||||////');
  // console.log(iconFeature);

  // ||||////|||||////||||||
  // const rome = new ol.Feature({
  //   geometry: new Point(fromLonLat([12.5, 41.9])),
  // });
  // const london = new ol.Feature({
  //   geometry: new Point(fromLonLat([-0.12755, 51.507222])),
  // });
  // const cities = [rome, london];
  // console.log('-----| -----| -----| ||||||//////|||||||/////||||||////');
  // console.log(cities);

  useEffect( () => {
    if (userData.savedParks) {
    const initalFeaturesLayer = new VectorLayer({
      source: new VectorSource()
    })

    const initialMap = new Map({
      target: mapElement.current,
      layers: [
        
        // USGS Topo
        // new TileLayer({
        //   source: new XYZ({
        //     url: 'https://basemap.nationalmap.gov/arcgis/rest/services/USGSTopo/MapServer/tile/{z}/{y}/{x}',
        //   })
        // }),

        // Google Maps Terrain
        new TileLayer({
          source: new XYZ({
            url: 'http://mt0.google.com/vt/lyrs=p&hl=en&x={x}&y={y}&z={z}',
          })
        }), 

        new VectorLayer({               // |||||||////||||///
          source: new VectorSource({
            // features: locationArray,      // |||||||////||||///
            // features: [iconFeature]           // |||||||////||||///
            // features: [rome, london]           // |||||||////||||///
            // features: cities           // |||||||////||||///
            features: locationArray           // |||||||////||||///
          }),
          style: new Style({
            image: new Icon({
              anchor: [0.5, 46],
              anchorXUnits: 'fraction',
              anchorYUnits: 'pixels',
              src: 'https://openlayers.org/en/latest/examples/data/icon.png'
            })
          })
        }),

        initalFeaturesLayer
        
      ],
      view: new View({
        projection: 'EPSG:3857',
        center: [-11794645.148075,5906844.3420342],  
        zoom: 3.25
        // zoom: 1
      }),
      controls: []
    })

    setMap(initialMap)
    setFeaturesLayer(initalFeaturesLayer)
  } else {// *(*(*(*(*()))))
    return <div></div>
  }
  },[])


  return (      
    <div ref={mapElement} className="map-container"></div>
  ) 

}

export default MapParks;