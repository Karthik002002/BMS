import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Flex from 'components/common/Flex';
import ProfileDropdown from 'components/navbar/top/ProfileDropdown';
import AppContext from 'context/Context';
import DateTime from 'pages/elena_dashboard/DateTime';
import React, { useContext, useState } from 'react';
import { Dropdown, Nav, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import team3 from 'assets/img/team/avatar.png';
import Avatar from 'components/common/Avatar';

const TopNavRightSideNavItem = () => {
  const {
    config: { isDark, isRTL },
    setConfig
  } = useContext(AppContext);

  // var loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));

  return (
    <Nav
      navbar
      className="navbar-nav-icons ms-auto flex-row align-items-center pe-2"
      as="ul"
    >
      <DateTime />
      <Nav.Item as={'li'}>
        <Nav.Link className="px-2 theme-control-toggle">
          <div className="d-flex">
            <OverlayTrigger
              key="left"
              placement={isRTL ? 'bottom' : 'left'}
              overlay={
                <Tooltip style={{ position: 'fixed' }} id="ThemeColor">
                  {isDark ? 'Switch to light theme' : 'Switch to dark theme'}
                </Tooltip>
              }
            >
              {/* <div className="d-flex"> */}
              <div
                className="theme-control-toggle-label me-2 pt-1"
                onClick={() => setConfig('isDark', !isDark)}
              >
                <div className="">
                  <FontAwesomeIcon
                    icon={isDark ? 'sun' : 'moon'}
                    className="fs-0"
                  />
                </div>
              </div>
            </OverlayTrigger>
            <div className="profile-icon theme-control-toggle-label pe-2">
              <div>
                <ProfileDropdown />
              </div>
            </div>
          </div>
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
};

export default TopNavRightSideNavItem;
