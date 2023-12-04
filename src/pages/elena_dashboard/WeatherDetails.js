import React, { useEffect, useState } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import SoftBadge from 'components/common/SoftBadge';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import CountUp from 'react-countup';
import Sun from './Sun';
import { Form } from 'react-bootstrap';
import axios from 'axios';
import weatherIcon from 'assets/img/icons/weather-icon.png';

import { months } from 'data/common';
import Flex from 'components/common/Flex';

const WeatherDetails = ({ data }) => {
  const [lat, setLat] = useState(13);
  const [lon, setLon] = useState(77);
  const [weather, setWeather] = useState();
  useEffect(() => {
    try {
      const getData = async () => {
        const res = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=b1f330e90b4edaeddc159757d63dc9ac`
        );
        console.log(res.data);
        setWeather(res.data);
      };
      getData();
    } catch (err) {
      console.log(err);
    }
  }, [lat, lon]);

  // sunrise;
  let sunRiseDateUTC = new Date(weather ? weather.sys.sunrise * 1000 : ''); // Convert seconds to milliseconds
  sunRiseDateUTC.setUTCHours(sunRiseDateUTC.getUTCHours() + 5);
  sunRiseDateUTC.setUTCMinutes(sunRiseDateUTC.getUTCMinutes() + 30);

  const sunRiseHours = sunRiseDateUTC.getUTCHours();
  const sunRiseMinutes = sunRiseDateUTC.getUTCMinutes();
  const sunRiseSeconds = sunRiseDateUTC.getUTCSeconds();

  let sunRiseTime = `${sunRiseHours}:${sunRiseMinutes}:${sunRiseSeconds}`;
  console.log(sunRiseTime);

  // // sunset
  let sunSetDateUTC = new Date(weather ? weather.sys.sunset * 1000 : ''); // Convert seconds to milliseconds
  sunSetDateUTC.setUTCHours(sunSetDateUTC.getUTCHours() + 5);
  sunSetDateUTC.setUTCMinutes(sunSetDateUTC.getUTCMinutes() + 30);

  const sunSetHours = sunSetDateUTC.getUTCHours();
  const sunSetMinutes = sunSetDateUTC.getUTCMinutes();
  const sunSetSeconds = sunSetDateUTC.getUTCSeconds();

  let sunSetTime = `${sunSetHours}:${sunSetMinutes}:${sunSetSeconds}`;
  console.log(sunSetTime);

  return (
    <>
      {/* <Sun /> */}
      <Card className="h-100">
        {/* <FalconCardHeader /> */}
        <Card.Body className="pt-2">
          <div className="d-flex justify-content-end">
            <Form.Select
              size="sm"
              // value={data}
              onChange={e => {
                setLat(data[e.target.value].lat);
                setLon(data[e.target.value].lon);
              }}
              style={{ maxWidth: '300px' }}
              className="me-2"
            >
              {data.map((data, index) => (
                <option value={index} key={data.id}>
                  {data.buoy_id}
                </option>
              ))}
            </Form.Select>
          </div>
          <Row className="g-0 h-100 align-items-center">
            <Col sm={12} lg={2} md={2} className="text-center">
              {weather && weather.weather && weather.weather[0] && (
                <img
                  src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                  alt="Weather Icon"
                  height={150}
                  width={150}
                />
              )}
            </Col>

            <Col sm={12} lg={3} md={2} className="weather ">
              <div className="mb-2">
                <h4 className="mb-2">Weather</h4>
                <SoftBadge pill className="ms-2 text-wrap">
                  <span className="text-warning"> weather :</span>{' '}
                  {weather ? weather.weather[0].description : ''}
                </SoftBadge>
                {/* <div className="fs--2 fw-semi-bold">
                  <div className="text-warning">condition</div>
                  Precipitation: precipitation
                </div> */}
              </div>
            </Col>
            <Col sm={12} lg={1} md={2} className="wind">
              <div className="mb-2">
                <h4 className="mb-2">Wind</h4>
                <SoftBadge pill className="ms-2 text-wrap">
                  <span className="text-warning"> speed :</span>{' '}
                  {weather ? weather.wind.speed : ''}
                </SoftBadge>
                {/* <div className="fs--2 fw-semi-bold">
                  <div className="text-warning">condition</div>
                  Precipitation: precipitation
                </div> */}
              </div>
            </Col>
            <Col sm={12} lg={4} md={4}>
              <div className="mb-2">
                <h4 className="mb-2">Others</h4>
                <SoftBadge pill className="ms-2 text-wrap">
                  <span className="text-warning"> temp :</span>{' '}
                  {weather ? weather.main.temp : ''}
                </SoftBadge>
                <SoftBadge pill className="ms-2 text-wrap">
                  <span className="text-warning"> pressure :</span>{' '}
                  {weather ? weather.main.pressure : ''}
                </SoftBadge>
                <SoftBadge pill className="ms-2 text-wrap word-padding">
                  <span className="text-warning"> humidity :</span>{' '}
                  {weather ? weather.main.humidity : ''}
                </SoftBadge>
                {/* <div className="fs--2 fw-semi-bold">
                  <div className="text-warning">condition</div>
                  Precipitation: precipitation
                </div> */}
              </div>
            </Col>

            <Col sm={12} lg={3} md={4} className="">
              <div className="sun-details fs-4 fw-normal font-sans-serif text-primary mb-1 lh-1 mb-2">
                <h5>
                  <span className="fs-1 text-warning">Sunrise : </span>
                  <span className="text-primary">
                    {' '}
                    {sunRiseTime}
                    {/* {weather ? weather.sys.sunrise : ''} */}
                  </span>
                </h5>
                <h5>
                  <span className="fs-1 text-warning">Sunset : </span>
                  <span className="text-primary"> {sunSetTime}</span>
                </h5>
              </div>
              {/* <div className="d-flex">
                <div className="fs--1 text-800">
                  {weather ? weather.sys.sunrise : ''} &nbsp;
                </div>
                <div className="fs--1 text-800"></div>
              </div> */}
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </>
  );
};

export default WeatherDetails;
