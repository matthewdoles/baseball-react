import React, { useState } from 'react';

import { Badge, Navbar, Nav } from 'react-bootstrap';
import ErrorModal from 'shared/ErrorModal';
import './index.css';

const Navigation = ({ allTeamsActive, hierarchyActive }) => {
  const [showModal, setShowModal] = useState();
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
      <Navbar.Collapse className="conatiner-fluid">
        <Nav className="container-fluid">
          {pages.map((page) => (
            <Nav.Link className={page.active ? 'activeLink' : null} href={page.link}>
              {page.name}
            </Nav.Link>
          ))}
          <Nav.Link className="ml-auto" onClick={() => setShowModal(true)}>
            <Badge pill variant="secondary">
              <p className="m-auto disclaimerLogo">?</p>
            </Badge>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
      {showModal && (
        <ErrorModal
          show={showModal}
          title="Disclaimer"
          buttonText="Close"
          onClick={() => setShowModal(false)}
          children={
            'All trademarks and service marks are property of Major League Baseball. Thier use on this site are purely non-profit and recreational.'
          }
        />
      )}
    </Navbar>
  );
};

export default Navigation;
