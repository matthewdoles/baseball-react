import React from "react";

import { Navbar, Nav } from "react-bootstrap";
import "./Navigation.css";

const Navigation = props => {
  return (
    <Navbar bg="light" fixed="top" className="Navigation">
      <Navbar.Brand onClick={props.allView}>Baseball Affiliates</Navbar.Brand>
      <Navbar.Collapse>
        <Nav>
          <Nav.Link href="/">All Teams</Nav.Link>
          <Nav.Link href="/hierarchy">Hierarchy</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navigation;
