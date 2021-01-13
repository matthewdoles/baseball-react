import React from 'react';
import { Card } from 'react-bootstrap';

import './index.css';

const TeamDetailsCard = (props) => {
  return (
    <Card.Header
      className="header"
      style={{
        backgroundColor: props.color,
      }}
    >
      {props.children}
    </Card.Header>
  );
};

export default TeamDetailsCard;
