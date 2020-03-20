import React from "react";

import { Navbar, Nav } from "react-bootstrap";
import "./Navigation.css";

const Navigation = props => {
  return (
    <Navbar bg="light" fixed="top" className="Navigation">
      <Navbar.Brand href="#home">Baseball Affiliates</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link onClick={props.allView}>Home</Nav.Link>
          <Nav.Link onClick={props.hierarchyView}>Hierarchy</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navigation;
