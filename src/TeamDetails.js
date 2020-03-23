import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

import Map from "./Map";
import { Card } from "react-bootstrap";
import "./TeamDetails.css";

const TeamDetails = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTeam, setSelectedTeam] = useState();
  const teamName = useParams().team;
  const mapRef = useRef();

  useEffect(() => {
    setIsLoading(true);
    const responseData = JSON.parse(sessionStorage.getItem("teams"));
    setSelectedTeam(responseData.teams.find(team => team.url === teamName));
    setIsLoading(false);
  }, [teamName]);

  return (
    <React.Fragment>
      {!isLoading && (
        <div className="Container">
          <div className="C1">
            <Card className="TeamDetailCard">
              <Card.Img
                variant="top"
                className="TeamLogoImage"
                src={require(`./images/${selectedTeam.photo}`)}
                style={{
                  backgroundColor: selectedTeam.color
                }}
              />
            </Card>
          </div>
          <div className="C2">
            <Card className="TeamDetailCard">
              <Card.Header className="TeamDetailCardHeader">
                {selectedTeam.name}
              </Card.Header>
              <Card.Body>
                <p>Established: {selectedTeam.established}</p>
                <p>Stadium: {selectedTeam.stadium}</p>
                <p>Address: {selectedTeam.address}</p>
                <p>Organization: {selectedTeam.league}</p>
                <p>League: {selectedTeam.conference}</p>
                <p>Divison: {selectedTeam.division}</p>
              </Card.Body>
            </Card>
          </div>
          <div className="C3">
            <Card className="TeamDetailCard">
              <Card.Header className="TeamDetailCardHeader">
                Stadium
              </Card.Header>
              <Card.Body>
                <Map
                  lat={selectedTeam.location.latitude}
                  lng={selectedTeam.location.longitude}
                  zoom={14}
                  style={{width: "100%", height: "100%" }}
                />
              </Card.Body>
            </Card>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default TeamDetails;
