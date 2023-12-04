// import React, { useContext } from 'react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// import AppContext from 'context/Context';

const NavbarTopDropDownMenus = () => {
  const [isOpen, setIsOpen] = useState(false);

  const closeSidebar = () => {
    setIsOpen(false);
  };
  // const {
  //   config: { navbarCollapsed, showBurgerMenu },
  //   setConfig
  // } = useContext(AppContext);

  // const handleDropdownItemClick = () => {
  //   if (navbarCollapsed) {
  //     setConfig('navbarCollapsed', !navbarCollapsed);
  //   }
  //   if (showBurgerMenu) {
  //     setConfig('showBurgerMenu', !showBurgerMenu);
  //   }
  // };

  return (
    <>
      <div className={`mob-navbar ${isOpen ? 'open' : ''}`}>
        <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
          <li className="nav-item" onClick={closeSidebar}>
            <Link
              to="/dashboard"
              className=""
              // style={{ fontSize: '16px', textDecoration: 'none' }}
            >
              Dashboard
            </Link>{' '}
          </li>

          <li onClick={closeSidebar}>
            <Link
              to="monitoring"
              className=""
              // style={{ fontSize: '16px', textDecoration: 'none' }}
            >
              Monitoring
            </Link>{' '}
          </li>

          <li onClick={closeSidebar}>
            <Link
              className=""
              // style={{ fontSize: '16px', textDecoration: 'none' }}
            >
              Report
            </Link>
          </li>
        </ul>
      </div>
    </>
    // <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
    //   <li className="nav-item">
    //     <Link className="nav-link" to="/dashboard">
    //       Dashboard
    //     </Link>
    //   </li>
    //   <li className="nav-item">
    //     <Link className="nav-link" to="/bus-tracking">
    //       Track Your Vehicles
    //     </Link>
    //   </li>
    //   <li className="nav-item">
    //     <Link className="nav-link" to="#">
    //       Report Generation{' '}
    //     </Link>
    //   </li>
    //   <li className="nav-item">
    //     <Link className="nav-link" to="#">
    //       Resource Management{' '}
    //     </Link>
    //   </li>
    //   <li className="nav-item">
    //     <Link className="nav-link" to="/">
    //       Login/Sign Up{' '}
    //     </Link>
    //   </li>
    // </ul>
  );
};

export default NavbarTopDropDownMenus;
