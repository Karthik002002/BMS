import React, { useEffect, useRef, useState } from 'react';
import { Card, Dropdown } from 'react-bootstrap';
// import CardDropdown from 'components/common/CardDropdown';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import SoftBadge from 'components/common/SoftBadge';
import { Link } from 'react-router-dom';
import AdvanceTableWrapper from 'components/common/advance-table/AdvanceTableWrapper';
import AdvanceTable from 'components/common/advance-table/AdvanceTable';
// import { recentPurchaseTableData } from 'data/dashboard/ecom';
// import RecentPurchasesHeader from '../../dashboard/';
// import AdvanceTableFooter from 'components/common/advance-table/AdvanceTableFooter';
import CustomersTableHeader from './CustomersTableHeader';
import axios from 'axios';
import IconButton from 'components/common/IconButton';

const Customers = ({ data, setCenter, setZoomLevel }) => {
  const recentBuoysTableData = [];

  data.forEach(buoy => {
    // ser_no++;
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
          to="/monitoring"
          onClick={() => {
            setCenter([buoy.lat, buoy.lon]);
            setZoomLevel(17);
            window.scroll({
              top: document.body.offsetHeight,
              left: 0,
              behavior: 'smooth'
            });
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
  });

  const columns = [
    {
      accessor: 'buoyName',
      Header: 'Name'
      // headerProps: { className: 'pe-7' }
    },
    {
      accessor: 'batteryVltInt',
      Header: 'Battery(V)'
    },
    {
      accessor: 'lightSensorData',
      Header: 'Light'
    },

    {
      accessor: 'location',
      Header: 'Location'
    },
    {
      accessor: 'createdAt',
      Header: 'Updated As At'
    },
    {
      accessor: 'track',
      Header: 'Track'
    }
  ];

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
            <CustomersTableHeader table />
          </Card.Header>
          <Card.Body className="p-0">
            <AdvanceTable
              table
              headerClassName="bg-200 text-900 text-nowrap align-middle"
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

export default Customers;
