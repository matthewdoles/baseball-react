import React, { useEffect } from "react";

import { Navbar, Nav } from "react-bootstrap";
import "./Navigation.css";

const Navigation = props => {
  return (
    <Navbar bg="light" fixed="top" className="Navigation">
      <Navbar.Brand onClick={props.allView}>Baseball Affiliates</Navbar.Brand>
      <Navbar.Collapse>
        <Nav>
          {props.allTeamsActive === true ? (
            <Nav.Link className="ActiveLink" href="/">
              All Teams
            </Nav.Link>
          ) : (
            <Nav.Link href="/">All Teams</Nav.Link>
          )}
          {props.hierarchyActive === true ? (
            <Nav.Link className="ActiveLink" href="/hierarchy">
              Hierarchy
            </Nav.Link>
          ) : (
            <Nav.Link href="/hierarchy">Hierarchy</Nav.Link>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navigation;
