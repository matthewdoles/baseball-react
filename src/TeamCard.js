import React from "react";
import { Link } from "react-router-dom";

import { Card } from "react-bootstrap";
import "./TeamCard.css";

const TeamCard = props => {
  return (
    <Link to={`/team/${props.url}`} className="TeamLink">
      <Card className="TeamCard">
        <Card.Img
          variant="top"
          className="TeamCardImage"
          src={require(`${props.logo}`)}
        />
        <Card.Body className="TeamCardBody">
          <Card.Title>{props.name}</Card.Title>
          <Card.Text>Est. {props.est}</Card.Text>
        </Card.Body>
      </Card>
    </Link>
  );
};

export default TeamCard;
