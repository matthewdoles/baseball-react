import React from 'react';
import { Card } from 'react-bootstrap';

import './index.css';

const TeamDetailsCard = ({ children, color }) => {
  return (
    <Card.Header
      className="header"
      style={{
        backgroundColor: color,
      }}
    >
      {children}
    </Card.Header>
  );
};

export default TeamDetailsCard;
