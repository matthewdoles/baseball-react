import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Spinner } from 'react-bootstrap';

import ErrorModal from 'shared/ErrorModal';
import Map from 'shared/Map';
import Navigation from 'shared/Navigation';
import TeamDetailsCard from './components/TeamDetailsCard';
import TeamDetailsHeader from './components/TeamDetailsHeader';
import { useHttpClient } from 'hooks/http-hook';
import './index.css';

const TeamDetails = () => {
  const { isLoading, error, sendRequest } = useHttpClient();
  const [allTeams, setAllTeams] = useState(null);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const teamName = useParams().team;
  const [showError, setShowError] = useState();

  const fetchTeam = useCallback(async () => {
    let responseData = JSON.parse(sessionStorage.getItem('teams'));
    if (responseData === null) {
      try {
        responseData = await sendRequest(
          process.env.NODE_ENV === 'development'
            ? 'http://localhost:5000/teams/affiliates'
            : 'https://baseball-affiliates.herokuapp.com/teams/affiliates',
        );
      } catch (error) {
        setShowError(true);
      }
      sessionStorage.setItem('teams', JSON.stringify(responseData));
    }
    setAllTeams(responseData.teams);
    const team = responseData.teams.find((team) => team.url === teamName);
    if (team === undefined) {
      setShowError(true);
    } else {
      setSelectedTeam(team);
    }
  }, [sendRequest, teamName]);

  useEffect(() => {
    fetchTeam();
  }, [fetchTeam]);

  return (
    <>
      <Navigation />
      {isLoading && (
        <div class="pt-5">
          <Spinner animation="border" />
        </div>
      )}
      {error && (
        <ErrorModal
          show={showError}
          title="Error"
          buttonText="Close"
          variant="danger"
          buttonText={'Reload'}
          link={`/team/${teamName}`}
          variant={'btn-danger'}
          onClick={() => setShowError(false)}
          children={
            'Sorry! Trouble loading that team right now. Please reload and try again.'
          }
        />
      )}
      {!isLoading && selectedTeam !== null && (
        <>
          <TeamDetailsHeader allTeams={allTeams} selectedTeam={selectedTeam} />
          <div className="m-auto teamDetailContainer">
            <div className="px-3 pt-3 r1">
              <div className="p-2 teamLogo">
                <Card className="teamDetailCard">
                  <Card.Img
                    variant="top"
                    className="teamLogoImage"
                    src={require(`images/${selectedTeam.photo}`)}
                    style={{
                      backgroundColor: selectedTeam.color,
                    }}
                  />
                </Card>
              </div>
              <div className="p-2 teamDetails">
                <Card className="teamDetailCard">
                  <TeamDetailsCard color={selectedTeam.photoColor}>
                    {selectedTeam.name}
                  </TeamDetailsCard>
                  <Card.Body>
                    <div className="teamDetailsBody">
                      <div className="teamDetailsLeft">
                        <p>
                          <b className="pr-2">Established:</b>
                          {selectedTeam.established}
                        </p>
                        <p>
                          <b className="pr-2">Stadium:</b> {selectedTeam.stadium}
                        </p>
                        <p>
                          <b className="pr-2">Capacity:</b>
                          {selectedTeam.capacity.toLocaleString('en')}
                        </p>
                        <p>
                          <b className="pr-2">Address:</b>
                          {selectedTeam.address}
                        </p>
                      </div>
                      <div className="teamDetailsRight">
                        <p>
                          <b className="pr-2">Organization:</b>
                          {selectedTeam.league}
                        </p>
                        <p>
                          <b className="pr-2">League:</b>
                          {selectedTeam.conference}
                        </p>
                        <p>
                          <b className="pr-2">Divison:</b>
                          {selectedTeam.division}
                        </p>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </div>
            </div>
            <div className="px-3 pt-3 r2">
              <div className="p-2 teamStadium">
                <Card className="teamDetailCard teamDetailStadiun">
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
        </>
      )}
    </>
  );
};

export default TeamDetails;
