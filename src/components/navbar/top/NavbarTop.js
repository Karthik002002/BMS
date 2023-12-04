import React, { useContext, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Navbar, Nav } from 'react-bootstrap';
import classNames from 'classnames';
import AppContext from 'context/Context';
import Logo from 'components/common/Logo';
// import SearchBox from './SearchBox';
import NavbarTopDropDownMenus from './NavbarTopDropDownMenus';
import { topNavbarBreakpoint } from 'config';
// import { navbarBreakPoint, topNavbarBreakpoint } from 'config';
// import autoCompleteInitialItem from 'data/autocomplete/autocomplete';
import TopNavRightSideNavItem from './TopNavRightSideNavItem';
import { useLocation } from 'react-router-dom';
import TopBar from 'layouts/TopBar';
import { Link } from 'react-router-dom';
import { navbarBreakPoint } from 'config';

const NavbarTop = () => {
  const {
    config: { navbarPosition, navbarCollapsed },
    setConfig
  } = useContext(AppContext);

  const { pathname } = useLocation();
  const isChat = pathname.includes('chat');

  const [showDropShadow, setShowDropShadow] = useState(false);

  const handleBurgerMenu = () => {
    // (navbarPosition === 'top' || navbarPosition === 'double-top') &&
    setConfig('navbarCollapsed', !navbarCollapsed);
    // (navbarPosition === 'vertical' || navbarPosition === 'combo') &&
    //   setConfig('showBurgerMenu', !showBurgerMenu);
  };

  const setDropShadow = () => {
    const el = document.documentElement;
    if (el.scrollTop > 0) {
      setShowDropShadow(true);
    } else {
      setShowDropShadow(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', setDropShadow);
    return () => window.removeEventListener('scroll', setDropShadow);
  }, []);

  const burgerMenuRef = useRef();

  return (
    <Navbar
      className={classNames('navbar-glass fs--1 navbar-top', {
        // 'navbar-glass-shadow': showDropShadow
        'navbar-glass-shadow': showDropShadow && !isChat
      })}
      expand={
        navbarPosition === 'top'
          ? // navbarPosition === 'top' ||
            // navbarPosition === 'combo' ||
            // navbarPosition === 'double-top'
            topNavbarBreakpoint
          : true
      }
    >
      <NavbarTopElements
        navbarCollapsed={navbarCollapsed}
        // navbarPosition={navbarPosition}
        navbarPosition={'top'}
        handleBurgerMenu={handleBurgerMenu}
        burgerMenuRef={burgerMenuRef}
      />
      {/* )} */}
    </Navbar>
  );
};

const NavbarTopElements = ({
  navbarPosition,
  handleBurgerMenu,
  navbarCollapsed
}) => {
  const burgerMenuRef = useRef();
  return (
    <>
      {/* <div className='d-flex justify-content-evenly'> */}
      <Logo at="navbar-top" width={40} id="topLogo" />

      {navbarPosition === 'top' || navbarPosition === 'combo' ? (
        <Navbar.Collapse in={navbarCollapsed} className="scrollbar pb-lg-0">
          <Nav navbar>
            <NavbarTopDropDownMenus />
          </Nav>
        </Navbar.Collapse>
      ) : (
        <Nav
          navbar
          className={`align-items-center d-none d-${topNavbarBreakpoint}-block`}
          as="ul"
        >
          <Nav.Item as="li">
            <SearchBox autoCompleteItem={autoCompleteInitialItem} />
          </Nav.Item>
        </Nav>
      )}
      <div className="nav-header navbar-nav-icons me-auto mt-2 flex-row align-items-center navbar-nav">
        <h4>Buoy Monitoring System</h4>
      </div>

      <div className="desktop-navbar">
        <Link
          to="/dashboard"
          className="text-white fw-light px-2"
          style={{ fontSize: '16px', textDecoration: 'none' }}
        >
          Dashboard
        </Link>
        <Link
          to="monitoring"
          className="text-white fw-light px-2"
          style={{ fontSize: '16px', textDecoration: 'none' }}
        >
          Monitoring
        </Link>
        <Link
          className="text-white fw-light px-2"
          style={{ fontSize: '16px', textDecoration: 'none' }}
        >
          Report
        </Link>
      </div>
      <TopNavRightSideNavItem />
      <Navbar.Toggle
        ref={burgerMenuRef}
        className={classNames('toggle-icon-wrapper me-md-3 me-2  text-end', {
          'd-lg-none':
            navbarPosition === 'top' || navbarPosition === 'double-top',
          [`d-${navbarBreakPoint}-none`]:
            navbarPosition === 'vertical' || navbarPosition === 'combo'
        })}
        as="div"
      >
        <button
          className="navbar-toggler-humburger-icon btn btn-link d-flex flex-center hamburger-spacing"
          onClick={handleBurgerMenu}
          id="burgerMenu"
        >
          <span className="navbar-toggle-icon">
            <span className="toggle-line" />
          </span>
        </button>
      </Navbar.Toggle>
      {/* </div> */}
    </>
  );
};

NavbarTopElements.propTypes = {
  // navbarPosition: PropTypes.string,
  handleBurgerMenu: PropTypes.func,
  navbarCollapsed: PropTypes.bool
};
export default NavbarTop;
