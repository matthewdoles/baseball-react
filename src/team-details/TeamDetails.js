import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';

import Map from '../shared/Map';
import Navigation from '../shared/Navigation';
import TeamDetailsNavigation from './components/TeamDetailsNavigation';
import { Card, Modal, Button } from 'react-bootstrap';
import { useHttpClient } from '../hooks/http-hook';
import './TeamDetails.css';

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
      <Modal show={errorModal} onHide={showErrorModal}>
        <Modal.Header closeButton>
          <Modal.Title>Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>Sorry, can't seem to find that team.</Modal.Body>
        <Modal.Footer>
          <Button variant='danger' href='/' onClick={showErrorModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      {!isLoading && selectedTeam !== null && (
        <React.Fragment>
          <Navigation />
          <div className='Container'>
            <TeamDetailsNavigation allTeams={allTeams} selectedTeam={selectedTeam}/>
            <div className='TeamDetails'>
              <div className='C1'>
                <Card className='TeamDetailCard'>
                  <Card.Img
                    variant='top'
                    className='TeamLogoImage'
                    src={require(`../images/${selectedTeam.photo}`)}
                    style={{
                      backgroundColor: selectedTeam.color,
                    }}
                  />
                </Card>
              </div>
              <div className='C2'>
                <Card className='TeamDetailCard'>
                  <Card.Header
                    className='TeamDetailCardHeader'
                    style={{
                      backgroundColor: selectedTeam.photoColor,
                    }}
                  >
                    {selectedTeam.name}
                  </Card.Header>
                  <Card.Body>
                    <div className='DetailsBody'>
                      <div className='DetailsLeft'>
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
                      <div className='DetailsRight'>
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
              <div className='C3'>
                <Card className='TeamDetailCard'>
                  <Card.Header
                    className='TeamDetailCardHeader'
                    style={{
                      backgroundColor: selectedTeam.photoColor,
                      color: 'white',
                      fontSize: '20px',
                    }}
                  >
                    {selectedTeam.stadium}
                  </Card.Header>
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
