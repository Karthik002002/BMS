import React, { useEffect, useRef, useState } from 'react';
import { Card, Dropdown } from 'react-bootstrap';
// import CardDropdown from 'components/common/CardDropdown';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import SoftBadge from 'components/common/SoftBadge';
import { Link } from 'react-router-dom';
import AdvanceTableWrapper from 'components/common/advance-table/AdvanceTableWrapper';
import AdvanceTable from 'components/common/advance-table/AdvanceTable';
import { Form } from 'react-bootstrap';
// import { recentPurchaseTableData } from 'data/dashboard/ecom';
// import RecentPurchasesHeader from '../../dashboard/';
// import AdvanceTableFooter from 'components/common/advance-table/AdvanceTableFooter';
import axios from 'axios';
import IconButton from 'components/common/IconButton';
import CustomersTableHeader from '../table/CustomersTableHeader';
import SidebarTableHeader from './SidebarTableHeader';
import { BsXLg } from 'react-icons/bs';
import StatusTabs from './StatusTabs';

const Sidebar = ({ data, setCenter, setZoomLevel }) => {
  const [zoneName, setZoneName] = useState('');
  const recentBuoysTableData = [];

  let zone = new Set();
  data.forEach(buoy => {
    zone.add(buoy.zone);
    // ser_no++;
    if (buoy.zone === zoneName || zoneName === '' || zoneName === 'All') {
      recentBuoysTableData.push({
        // slno: <>{ser_no}</>,
        buoyId: buoy.imei,
        buoyName: <>{buoy.buoy_name}</>,
        batteryVltInt: (
          <div
            className={`bg-${
              buoy.bt_volt > 12 ? 'success' : 'danger'
            } text-white rounded-5 text-center px-2`}
          >
            {buoy.bt_volt}
          </div>
        ),
        lightSensorData: (
          <div
            className={`bg-${
              buoy.light_status === 0
                ? 'danger'
                : buoy.light_status === 1
                ? 'success'
                : 'warning'
            } text-white rounded-5 text-center px-2`}
          >
            {`A : ${buoy.lux1}, S : ${buoy.lux2}`}
          </div>
        ),
        geoFence: 'Inside',
        location: (
          <div
            className={`bg-${
              buoy.geofence_status ? 'success' : 'danger'
            } text-white rounded-5 text-center px-2`}
          >
            {buoy.lat}, {buoy.lon}
          </div>
        ),
        status: (
          <div
            className={`bg-${
              buoy.bt_volt > 12 &&
              buoy.geofence_status &&
              buoy.light_status !== 0
                ? 'success'
                : 'danger'
            } text-white rounded-3 text-center px-2`}
            style={{ minHeight: '20px' }}
          ></div>
        ),
        createdAt: `${buoy.timestamp?.substring(
          8,
          10
        )}:${buoy.timestamp?.substring(10, 12)}:${buoy.timestamp?.substring(
          12,
          14
        )},
        ${buoy.timestamp?.substring(6, 8)}-${buoy.timestamp?.substring(
          4,
          6
        )}-${buoy.timestamp?.substring(2, 4)}`,
        track: (
          <Link
            onClick={() => {
              setCenter([buoy.lat, buoy.lon]);
              setZoomLevel(17);
              if (window.innerWidth <= 768) {
                // Adjust the screen width condition as needed
                window.scroll({
                  top: document.body.offsetHeight,
                  left: 0,
                  behavior: 'smooth'
                });
              }
            }}
          >
            <IconButton
              variant="falcon-default"
              size="sm"
              icon="external-link-alt"
              transform="shrink-3"
            ></IconButton>
          </Link>
        )
      });
    }
  });
  //   console.log(zone);

  let zoneArray = ['All', ...zone];
  // const [zoneData, setZoneData] = useState();
  // console.log(zoneArray);

  //   console.log(zoneArray);
  // console.log(recentBuoysTableData);

  const columns = [
    {
      accessor: 'buoyName'
      // Header: 'Buoy List'
      // headerProps: { className: 'pe-7' }
    },
    {
      accessor: 'status'
    },
    {
      accessor: 'track'
      // Header: 'Track'
    }

    // {
    //   accessor: 'status'
    //   // Header: 'Track'
    // }
  ];

  // console.log(recentBuoysTableData);
  return (
    <div className="h-100 ms-2">
      <AdvanceTableWrapper
        columns={columns}
        data={recentBuoysTableData}
        // selection
        // sortable
        // pagination
        // perPage={11}
        // rowCount={recentBuoysTableData.length}
      >
        <Card>
          <Card.Header>
            <div className="d-flex justify-content-between vehicle-table-header">
              <SidebarTableHeader table />
              <div className="my-3">
                <Form.Select
                  size="sm"
                  //   value={zoneData}
                  onChange={e => {
                    setZoneName(e.target.value);
                  }}
                  style={{ maxWidth: '320px' }}
                  className=""
                >
                  {/* {zone.forEach(zone => console.log(zone))} */}
                  {zoneArray.map((data, index) => (
                    // if(index == 0){

                    // }
                    <option value={data} key={index}>
                      {data}
                    </option>
                  ))}

                  {/* {<option value={zone}>{[...zone[0]]}</option>} */}
                </Form.Select>
              </div>
            </div>
          </Card.Header>
          <Card.Body className="p-0">
            {/* <StatusTabs /> */}
            <AdvanceTable
              table
              headerClassName="bg-200 text-900 text-nowrap align-middle d-none"
              rowClassName="btn-reveal-trigger text-nowrap align-middle"
              tableProps={{
                size: 'sm',
                className: 'fs--1 mb-0 overflow-hidden'
              }}
            />
          </Card.Body>
          {/* <Card.Footer>
            <AdvanceTableFooter
            // rowCount={recentBuoysTableData.length}
            // table
            // rowInfo
            // navButtons
            />
          </Card.Footer> */}
        </Card>
      </AdvanceTableWrapper>
    </div>
  );
};

export default Sidebar;
