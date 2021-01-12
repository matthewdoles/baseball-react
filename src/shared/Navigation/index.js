import React, { useEffect } from 'react';

import { Navbar, Nav } from 'react-bootstrap';
import './index.css';

const Navigation = (props) => {
  return (
    <Navbar bg="light" fixed="top" className="navigation">
      <Navbar.Brand onClick={props.allView}>Baseball Affiliates</Navbar.Brand>
      <Navbar.Collapse>
        <Nav>
          <Nav.Link className={props.allTeamsActive ? 'activeLink' : null} href="/">
            All Teams
          </Nav.Link>
          <Nav.Link
            className={props.hierarchyActive ? 'activeLink' : null}
            href="/hierarchy"
          >
            Hierarchy
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navigation;
