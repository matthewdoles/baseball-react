import React from 'react';

import { Card } from 'react-bootstrap';
import BravesLogo from './images/Braves-Logo.jpg';
import CubsLogo from './images/Cubs-Logo.png';
import RaysLogo from './images/Rays-Logo.png';
import PrincetonLogo from './images/Princeton-Rays.jpg';
import './TeamCard.css';

const TeamCard = props => {
  return (
    <Card className="TeamCard">
      <Card.Img
        variant="top"
        src={require( `${ props.logo }` )}
        style={{
          width: '90%',
          height: '250px',
          padding: '5px',
          margin: 'auto'
        }}
      />
      <Card.Body className="TeamCardBody">
        <Card.Title>{props.name}</Card.Title>
        <Card.Text>Est. {props.est}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default TeamCard;
