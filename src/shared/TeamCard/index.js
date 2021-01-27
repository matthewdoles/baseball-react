import React from 'react';
import { Link } from 'react-router-dom';

import { Card } from 'react-bootstrap';
import './index.css';

const TeamCard = ({ name, est, url, photo }) => {
  return (
    <Link to={`/team/${url}`} className="teamLink">
      <Card className="m-2 teamCard">
        <Card.Img
          variant="top"
          className="p-3 teamCardImage"
          src={require(`images/${photo}`)}
        />
        <Card.Body className="teamCardBody">
          <Card.Title>{name}</Card.Title>
          <Card.Text>Est. {est}</Card.Text>
        </Card.Body>
      </Card>
    </Link>
  );
};

export default TeamCard;
