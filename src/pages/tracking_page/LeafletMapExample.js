import React, { useState, useContext, useEffect } from 'react';
import { recentPurchaseTableData } from 'data/dashboard/ecom';
import { useParams } from 'react-router-dom';
// import FalconComponentCard from 'components/common/FalconComponentCard';
import L from 'leaflet';
import 'leaflet.tilelayer.colorfilter';
import 'leaflet/dist/leaflet.css';
import {
  MapContainer,
  TileLayer,
  useMap,
  Marker,
  Tooltip,
  Popup,
  LayerGroup,
  Circle
} from 'react-leaflet';
import AppContext from 'context/Context';
// import MarkerClusterGroup from '@changey/react-leaflet-markercluster';
// import { markers } from 'data/dashboard/projectManagement';
import { toast } from 'react-toastify';
import 'leaflet-rotatedmarker';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import axios from 'axios';
import { divIcon } from 'leaflet';
import buoyNotOk from '../../assets/img/map-marker/buoy-not-ok-icon.png';
import buoyOk from '../../assets/img/map-marker/buoy-ok-icon.png';

const LeafletMapExample = ({ data, center, zoomLevel }) => {
  function LayerComponent() {
    const map = useMap();
    const { config } = useContext(AppContext);
    const { isDark } = config;
    const {
      config: { currentVehicle }
    } = useContext(AppContext);
    var myPositionMarker = null;
    const filter = isDark
      ? [
          'invert:98%',
          'grayscale:69%',
          'bright:89%',
          'contrast:111%',
          'hue:205deg',
          'saturate:1000%'
        ]
      : ['bright:101%', 'contrast:101%', 'hue:23deg', 'saturate:225%'];

    useEffect(() => {
      map.invalidateSize();
    }, [config]);

    useEffect(() => {
      if (map) {
        L.tileLayer
          .colorFilter(
            'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
            {
              attribution: null,
              transparent: true,
              filter: filter
            }
          )
          .addTo(map);
      }
    }, [isDark]);
    // var loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));

    return (
      <>
        <TileLayer
          attribution={null}
          url={'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'}
        />
      </>
    );
  }

  function LeafletMap() {
    const markers = [];
    data.forEach(buoy => {
      // { position: center, popupText: "Red Marker" },
      markers.push({
        position: [buoy.lat, buoy.lon],
        geoFence: [buoy.geofence_lat, buoy.geofence_lon],
        popupText: [
          {
            buoyId: '1',
            buoyName: buoy.buoy_name,
            batteryVltInt: buoy.bt_volt,
            lightSensorData:
              buoy.light_status !== 0 ? (
                <>OK {`A : ${buoy.lux1}, S : ${buoy.lux2}`}</>
              ) : (
                <>Unlit {`A : ${buoy.lux1}, S : ${buoy.lux2}`}</>
              ),
            updatedAt: `${buoy.timestamp?.substring(
              8,
              10
            )}:${buoy.timestamp?.substring(10, 12)}:${buoy.timestamp?.substring(
              12,
              14
            )},
              ${buoy.timestamp?.substring(6, 8)}-${buoy.timestamp?.substring(
              4,
              6
            )}-${buoy.timestamp?.substring(2, 4)}`
          }
        ],
        options: {
          fillColor:
            buoy.bt_volt > 12 && buoy.geofence_status && buoy.light_status !== 0
              ? 'green'
              : 'red',
          color:
            buoy.bt_volt > 12 && buoy.geofence_status && buoy.light_status !== 0
              ? 'green'
              : 'red'
        },
        markerIcons: divIcon({
          className: 'custom-marker-icon',
          html: `<img src="${
            buoy.bt_volt > 12 && buoy.geofence_status && buoy.light_status !== 0
              ? buoyOk
              : buoyNotOk
          }" width="30" height="40" />
          `,
          iconSize: [25, 41],
          iconAnchor: [21, 36],
          popupAnchor: [1, -34]
        })
      });
    });

    return (
      <div className="map-container">
        <MapContainer
          zoom={zoomLevel}
          // minZoom={isRTL ? 1.8 : 1.1}
          // zoomSnap={}

          center={center}
          // center={position}
          radius={200}
          style={{ height: '90vh', width: '100%' }}
        >
          {markers.map((marker, index) => (
            <>
              <Marker
                key={index}
                position={marker.position}
                icon={marker.markerIcons}
              >
                <Popup>
                  <p className="m-0 text-500">
                    Location: {marker.position[0]}, {marker.position[1]}
                  </p>
                  {marker.popupText.map((item, innerIndex) => (
                    <div key={innerIndex}>
                      <p className="m-0 text-500">Buoy Name: {item.buoyName}</p>
                      <p className="m-0 text-500">
                        Battery Voltage : {item.batteryVltInt} V
                      </p>
                      <p className="m-0 text-500">
                        Light : {item.lightSensorData}
                      </p>
                      {/* <p className="m-0 text-500">
                      Light Sensor 2: {item.lightSensorData[1]}
                    </p> */}
                      <p className="m-0 text-500">
                        Updated as at: {item.updatedAt}
                      </p>
                    </div>
                  ))}
                </Popup>
              </Marker>
              <LayerGroup>
                <Circle
                  center={marker.geoFence}
                  // center={[data.geofence_lat, data.geofence_lat ]}
                  pathOptions={marker.options}
                  radius={100}
                />
              </LayerGroup>
            </>
          ))}

          <LayerComponent />
        </MapContainer>
      </div>
    );
  }

  return <LeafletMap />;
};

export default LeafletMapExample;
