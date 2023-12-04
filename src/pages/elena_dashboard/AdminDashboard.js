import { React, lazy, useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import axios from 'axios';
import LeafletMapExample from 'pages/tracking_page/LeafletMapExample';
import DateTime from './DateTime';
import CrmStats from 'components/dashboards/crm/CrmStats';
import SaasActiveUser from './SaasActiveUser';
import SaasRevenue from './SaasRevenue';
import SaasConversion from './SaasConversion';
import { activeUser } from './saas';
import WeatherDetails from './WeatherDetails';

// import { buoys } from '../../data/dashboard/buoy';

const DoughnutRoundedChart = lazy(() => import('./DoughnutRoundedChart'));

const StackedHorizontalChart = lazy(() => import('./StackedHorizontalChart'));

const Customers = lazy(() => import('pages/dashboard/table/Customers'));

const AdminDashboard = () => {
  const [center, setCenter] = useState([21.865413583095347, 71.49970380735064]);

  const [zoomLevel, setZoomLevel] = useState(window.innerWidth < 530 ? 6 : 8);

  const [buoysData, setBuoysData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://bmstest.elenageosys.com/dashboard/`
        );
        setBuoysData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = setInterval(async () => {
      try {
        const response = await axios.get(
          `http://bmstest.elenageosys.com/dashboard/`
        );
        console.log(response.data);
        setBuoysData(response.data);
        setCenter([21.865413583095347, 71.49970380735064]);
        setZoomLevel(window.innerWidth < 530 ? 6 : 8);
      } catch (error) {
        console.error(error);
      }
    }, 60000);

    return () => {
      clearInterval(fetchData);
    };
  }, []);

  const date = new Date();
  // alert(date.getHours());

  let gokuAllOK = 0;
  let gokuLowBattery = 0;
  let gokuOutOfRange = 0;
  let gokuLightNotOk = 0;
  let gokuNoData = 0;

  let gokhaAllOK = 0;
  let gokhaLowBattery = 0;
  let gokhaOutOfRange = 0;
  let gokhaLightNotOk = 0;
  let gokhaNoData = 0;

  let zone = new Set();

  // console.log(zone);

  buoysData.forEach(buoyData => {
    zone.add(buoyData.zone);
    // if (zone.has(buoyData.zone)) {
    if (buoyData.zone === [...zone][0]) {
      if (buoyData.light_status === 0) {
        gokuLightNotOk++;
      } else if (buoyData.bt_volt < 12) {
        gokuLowBattery++;
      } else if (!buoyData.geofence_status) {
        gokuOutOfRange++;
      } else {
        gokuAllOK++;
      }
    } else {
      if (buoyData.light_status === 0) {
        gokhaLightNotOk++;
      } else if (buoyData.bt_volt < 12) {
        gokhaLowBattery++;
      } else if (!buoyData.geofence_status) {
        gokhaOutOfRange++;
      } else {
        gokhaAllOK++;
      }
    }
  });
  // const firstElement = [...zone][0];

  // console.log(firstElement);
  // zone.forEach(zoneData => {
  //   console.log(zoneData);
  // });

  const graphData = {
    allOk: gokuAllOK + gokhaAllOK,
    outOfRange: gokuOutOfRange + gokhaOutOfRange,
    lightNotOk: gokuLightNotOk + gokhaLightNotOk,
    lowBattery: gokuLowBattery + gokhaLowBattery,
    noData: gokuNoData + gokhaNoData
  };

  const zondeData = {
    gokuAllOK: gokuAllOK,
    gokuLowBattery: gokuLowBattery,
    gokuOutOfRange: gokuOutOfRange,
    gokuLightNotOk: gokuLightNotOk,
    gokuNoData: gokuNoData,
    gokhaAllOK: gokhaAllOK,
    gokhaLowBattery: gokhaLowBattery,
    gokhaOutOfRange: gokhaOutOfRange,
    gokhaLightNotOk: gokhaLightNotOk,
    gokhaNoData: gokhaNoData
  };

  return (
    <div className="mx-3">
      <div className="text-center mb-3 mt-3">{/* <DateTime /> */}</div>
      <div className="my-3">
        <WeatherDetails data={buoysData} />
      </div>
      {/* <Row className="g-3 my-3">
        <Col md={4} xxl={12}>
          <SaasActiveUser data={activeUser} />
        </Col>
        <Col md={4} xxl={12}>
          <SaasRevenue />
        </Col>
        <Col md={4} xxl={12}>
          <SaasConversion />
        </Col>
      </Row> */}
      <Row className="">
        <Col lg={6} md={12} sm={12} className="mb-2">
          <Row className="ms-2">
            <DoughnutRoundedChart data={graphData} />
          </Row>
          <Row className="mt-3 ms-2">
            <StackedHorizontalChart data={zondeData} />
          </Row>
        </Col>
        <Col lg={6} md={12} sm={12} className="">
          <Customers
            data={buoysData}
            setCenter={center => setCenter(center)}
            setZoomLevel={zoomLevel => setZoomLevel(zoomLevel)}
          />
          {/* <Col lg={6} md={12} sm={12} className="mb-2"></Col> */}
        </Col>
      </Row>
      {/* <Row>
        <Col lg={12} md={12} sm={12}>
          <LeafletMapExample
            data={buoysData}
            center={center}
            zoomLevel={zoomLevel}
          />
        </Col>
      </Row> */}
    </div>
  );
};

export default AdminDashboard;
