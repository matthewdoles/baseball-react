import React, { useCallback, useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';

import ErrorModal from 'shared/ErrorModal';
import Navigation from 'shared/Navigation';
import TeamHierarchy from './components/TeamHierarchy';
import TeamSelection from './components/TeamSelection';
import TeamSearch from 'shared/TeamSearch';
import { useHttpClient } from 'hooks/http-hook';
import './index.css';

const Hierarchy = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [allAffiliates, setAllAffiliates] = useState(null);
  const [selectableTeams, setSelectableTeams] = useState(null);
  const [selectedTeam, setSelectedTeam] = useState('MLB');
  const [filteredTeams, setFilteredTeams] = useState();
  const [showError, setShowError] = useState();

  const fetchTeams = useCallback(async () => {
    let responseData;
    if (sessionStorage.getItem('affiliates') === null) {
      try {
        responseData = await sendRequest(
          process.env.NODE_ENV === 'development'
            ? 'http://localhost:5000/teams/affiliates'
            : 'https://baseball-affiliates.herokuapp.com/teams/affiliates',
        );
        sessionStorage.setItem('affiliates', JSON.stringify(responseData));
      } catch (error) {
        setShowError(true);
      }
    } else {
      responseData = JSON.parse(sessionStorage.getItem('affiliates'));
    }
    if (responseData) {
      setAllAffiliates(responseData.teams);
      setFilteredTeams(responseData.teams);
      setSelectableTeams(responseData.teams.filter((team) => team.league === 'MLB'));
    }
  }, [sendRequest]);

  useEffect(() => {
    fetchTeams();
  }, [fetchTeams]);

  const onTeamSelected = (event) => {
    const teamLogo = document.getElementById(selectedTeam);
    if (
      selectedTeam !== event.target.getAttribute('value') &&
      event.target.getAttribute('value') !== 'MLB'
    ) {
      const teams = [...allAffiliates];
      if (document.getElementById(selectedTeam) !== null) {
        teamLogo.classList.remove('selectedTeam');
      }
      event.target.classList.add('selectedTeam');
      setFilteredTeams(
        teams.filter((team) => team.name === event.target.getAttribute('value')),
      );
      setSelectedTeam(event.target.getAttribute('value'));
    } else {
      teamLogo.classList.remove('selectedTeam');
      document.getElementById('MLB').classList.add('selectedTeam');
      setFilteredTeams(allAffiliates);
      setSelectedTeam('MLB');
    }
  };

  const onNameChange = async (event) => {
    const filteredResults = allAffiliates.filter(
      (team) =>
        team.name.toUpperCase().search(event.target.value.toUpperCase()) > -1,
    );
    setFilteredTeams(filteredResults);
  };

  return (
    <>
      <Navigation hierarchyActive={true} />
      {isLoading && (
        <div class="pt-5">
          <Spinner animation="border" />
        </div>
      )}
      {error && (
        <ErrorModal
          show={showError}
          title={'Error!'}
          children={
            <p>
              Sorry! Trouble loading teams right now. Please reload and try again.
            </p>
          }
          buttonText={'Reload'}
          link={'/hierarchy'}
          variant={'btn-danger'}
          onClick={clearError}
        />
      )}
      {!isLoading && filteredTeams && selectableTeams && (
        <>
          <div className="teamSearchContainer">
            <TeamSearch nameChange={onNameChange} />
          </div>
          <TeamSelection teams={selectableTeams} teamSelected={onTeamSelected} />
          <ul className="m-auto p-0 hierarchyList">
            {filteredTeams.map((team) => (
              <TeamHierarchy
                key={team.id}
                name={team.name}
                photo={team.photo}
                league={team.league}
                affiliates={team.affiliates}
                url={team.url}
              />
            ))}
          </ul>
        </>
      )}
    </>
  );
};

export default Hierarchy;
