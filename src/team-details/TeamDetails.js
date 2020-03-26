import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";

import Map from "../shared/Map";
import { Card, Navbar, Nav } from "react-bootstrap";
import { useHttpClient } from "../hooks/http-hook";
import "./TeamDetails.css";

const TeamDetails = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [selectedTeam, setSelectedTeam] = useState(null);
  const teamName = useParams().team;
  const history = useHistory();

  useEffect(async () => {
    let responseData = JSON.parse(sessionStorage.getItem("teams"));
    if (responseData === null) {
      try {
        responseData = await sendRequest("http://localhost:5000/teams");
        sessionStorage.setItem("teams", JSON.stringify(responseData));
      } catch (error) {}
    }
    const team = responseData.teams.find(team => team.url === teamName);
    if (team === undefined) {
      return history.push("/");
    }
    setSelectedTeam(team);
  }, [teamName, history]);

  return (
    <React.Fragment>
      {!isLoading && selectedTeam !== null && (
        <React.Fragment>
          <Navbar
            style={{
              backgroundColor: selectedTeam.photoColor
            }}
          >
            <Navbar.Collapse>
              <Nav>
                <Nav.Link
                  href="/"
                  style={{
                    color: "white",
                    fontSize: "20px"
                  }}
                >
                  Back
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          <div className="Container">
            <div className="C1">
              <Card className="TeamDetailCard">
                <Card.Img
                  variant="top"
                  className="TeamLogoImage"
                  src={require(`../images/${selectedTeam.photo}`)}
                  style={{
                    backgroundColor: selectedTeam.color
                  }}
                />
              </Card>
            </div>
            <div className="C2">
              <Card className="TeamDetailCard">
                <Card.Header
                  className="TeamDetailCardHeader"
                  style={{
                    backgroundColor: selectedTeam.photoColor
                  }}
                >
                  {selectedTeam.name}
                </Card.Header>
                <Card.Body>
                  <div className="DetailsBody">
                    <div class="DetailsLeft">
                      <p>
                        <b>Established:</b> {selectedTeam.established}
                      </p>
                      <p>
                        <b>Stadium:</b> {selectedTeam.stadium}
                      </p>
                      <p>
                        <b>Capacity:</b>{" "}
                        {selectedTeam.capacity.toLocaleString("en")}
                      </p>
                      <p>
                        <b>Address:</b> {selectedTeam.address}
                      </p>
                    </div>
                    <div class="DetailsRight">
                      <p>
                        <b>Organization:</b> {selectedTeam.league}
                      </p>
                      <p>
                        <b>League:</b> {selectedTeam.conference}
                      </p>
                      <p>
                        <b>Divison:</b> {selectedTeam.division}
                      </p>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </div>
            <div className="C3">
              <Card className="TeamDetailCard">
                <Card.Header
                  className="TeamDetailCardHeader"
                  style={{
                    backgroundColor: selectedTeam.photoColor,
                    color: "white",
                    fontSize: "20px"
                  }}
                >
                  {selectedTeam.stadium}
                </Card.Header>
                <Card.Body>
                  <Map
                    lat={selectedTeam.location.latitude}
                    lng={selectedTeam.location.longitude}
                    zoom={14}
                    style={{ width: "100%", height: "100%" }}
                  />
                </Card.Body>
              </Card>
            </div>
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default TeamDetails;
