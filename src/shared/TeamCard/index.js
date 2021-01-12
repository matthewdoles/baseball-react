import React from 'react';
import { Link } from 'react-router-dom';

import { Card } from 'react-bootstrap';
import './index.css';

const TeamCard = (props) => {
  return (
    <Link to={`/team/${props.url}`} className="teamLink">
      <Card className="teamCard">
        <Card.Img
          variant="top"
          className="teamCardImage"
          src={require(`../../images/${props.photo}`)}
        />
        <Card.Body className="teamCardBody">
          <Card.Title>{props.name}</Card.Title>
          <Card.Text>Est. {props.est}</Card.Text>
        </Card.Body>
      </Card>
    </Link>
  );
};

export default TeamCard;
