import MainLayout from 'layouts/CustomMainLayout';
import LeafletMapExample from 'pages/tracking_page/LeafletMapExample';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Col, Row } from 'react-bootstrap';
import Sidebar from './Sidebar';
import NavbarVertical from 'components/navbar/vertical/NavbarVertical';
// import VerticalBar from './VerticalBar';

const Monitoring = () => {
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
        console.log(response.data);
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
        // console.log(response.data);
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

  return (
    <>
      {/* <MainLayout /> */}
      <div className="">
        <Row>
          <Col sm={2} md={3}>
            <Sidebar
              data={buoysData}
              setCenter={center => setCenter(center)}
              setZoomLevel={zoomLevel => setZoomLevel(zoomLevel)}
            />
            {/* <div className="mt-5">
              <NavbarVertical
                data={buoysData}
                setCenter={center => setCenter(center)}
                setZoomLevel={zoomLevel => setZoomLevel(zoomLevel)}
              />
            </div> */}
            {/* <VerticalBar /> */}
          </Col>
          <Col sm={10} md={9}>
            <LeafletMapExample
              data={buoysData}
              center={center}
              zoomLevel={zoomLevel}
            />
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Monitoring;
