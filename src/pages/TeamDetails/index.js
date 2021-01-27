import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';

import Map from 'shared/Map';
import ErrorModal from 'shared/ErrorModal';
import Navigation from 'shared/Navigation';
import TeamDetailsHeader from './components/TeamDetailsHeader';
import TeamDetailsCard from './components/TeamDetailsCard';
import { Card } from 'react-bootstrap';
import { useHttpClient } from 'hooks/http-hook';
import './index.css';

const TeamDetails = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [allTeams, setAllTeams] = useState(null);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [errorModal, setErrorModal] = useState(false);
  const teamName = useParams().team;

  const showErrorModal = () => setErrorModal(true);

  const fetchTeam = useCallback(async () => {
    let responseData = JSON.parse(sessionStorage.getItem('teams'));
    if (responseData === null) {
      try {
        responseData = await sendRequest('http://localhost:5000/teams');
      } catch (error) {}
      sessionStorage.setItem('teams', JSON.stringify(responseData));
    }
    setAllTeams(responseData.teams);
    const team = responseData.teams.find((team) => team.url === teamName);
    if (team === undefined) {
      showErrorModal(true);
    } else {
      setSelectedTeam(team);
    }
  }, [sendRequest, teamName]);

  useEffect(() => {
    fetchTeam();
  }, [fetchTeam]);

  return (
    <React.Fragment>
      <ErrorModal
        show={errorModal}
        title="Error"
        buttonText="Close"
        variant="danger"
        link="/"
        onClick={showErrorModal}
      >
        Sorry, can't seem to find that team.
      </ErrorModal>
      {!isLoading && selectedTeam !== null && (
        <React.Fragment>
          <Navigation />
          <div className="Container">
            <TeamDetailsHeader allTeams={allTeams} selectedTeam={selectedTeam} />
            <div className="Row1">
              <div className="C1">
                <Card className="TeamDetailCard">
                  <Card.Img
                    variant="top"
                    className="TeamLogoImage"
                    src={require(`images/${selectedTeam.photo}`)}
                    style={{
                      backgroundColor: selectedTeam.color,
                    }}
                  />
                </Card>
              </div>
              <div className="C2">
                <Card className="TeamDetailCard">
                  <TeamDetailsCard color={selectedTeam.photoColor}>
                    {selectedTeam.name}
                  </TeamDetailsCard>
                  <Card.Body>
                    <div className="DetailsBody">
                      <div className="DetailsLeft">
                        <p>
                          <b>Established:</b> {selectedTeam.established}
                        </p>
                        <p>
                          <b>Stadium:</b> {selectedTeam.stadium}
                        </p>
                        <p>
                          <b>Capacity:</b>{' '}
                          {selectedTeam.capacity.toLocaleString('en')}
                        </p>
                        <p>
                          <b>Address:</b> {selectedTeam.address}
                        </p>
                      </div>
                      <div className="DetailsRight">
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
            </div>
            <div className="Row2">
              <div className="C4">
                <Card className="TeamDetailCard TeamDetailStadiun">
                  <TeamDetailsCard color={selectedTeam.photoColor}>
                    {selectedTeam.stadium}
                  </TeamDetailsCard>
                  <Card.Body>
                    <Map
                      lat={selectedTeam.location.latitude}
                      lng={selectedTeam.location.longitude}
                      zoom={14}
                      style={{ width: '100%', height: '100%' }}
                    />
                  </Card.Body>
                </Card>
              </div>
            </div>
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default TeamDetails;
