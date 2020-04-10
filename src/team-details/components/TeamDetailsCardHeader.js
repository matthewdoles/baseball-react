import React from 'react';
import { Card } from 'react-bootstrap';

import './TeamDetailsCardHeader.css';

const TeamDetailsCardHeader = (props) => {
  return (
    <Card.Header
      className='TeamDetails-CardHeader'
      style={{
        backgroundColor: props.color,
      }}
    >
      {props.children}
    </Card.Header>
  );
};

export default TeamDetailsCardHeader;
