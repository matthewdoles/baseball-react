import React from 'react';

import { Navbar, Nav } from 'react-bootstrap';
import './index.css';

const Navigation = ({ allTeamsActive, hierarchyActive }) => {
  const pages = [
    {
      name: 'All Teams',
      active: allTeamsActive,
      link: '/',
    },
    {
      name: 'Hierarchy',
      active: hierarchyActive,
      link: '/hierarchy',
    },
  ];

  return (
    <Navbar bg="light" fixed="top" className="navigation">
      <Navbar.Brand href="/">Baseball Affiliates</Navbar.Brand>
      <Navbar.Collapse>
        <Nav>
          {pages.map((page) => (
            <Nav.Link className={page.active ? 'activeLink' : null} href={page.link}>
              {page.name}
            </Nav.Link>
          ))}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navigation;
