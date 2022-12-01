import React, { useEffect, useState, useCallback } from 'react';
import { Spinner } from 'react-bootstrap';

import Division from './components/Division';
import ErrorModal from 'shared/ErrorModal';
import Navigation from 'shared/Navigation';
import TeamCard from 'shared/TeamCard';
import TeamSearch from 'shared/TeamSearch';
import { useHttpClient } from 'hooks/http-hook';
import {
  alphabeticalFilter,
  establishedFilter,
  nameSearchFilter,
  sortLeagueIntoDivisions,
} from 'functions/filtering';
import './index.css';

const AllTeams = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [allTeams, setAllTeams] = useState();
  const [loadedTeams, setFilteredTeams] = useState();
  const [selectedLeague, setSelectedLeague] = useState('League');
  const [selectedFilter, setSelectedFilter] = useState('Alphabetical');
  const [divisionDetails, setDivisionDetails] = useState();
  const [showError, setShowError] = useState();

  const fetchTeams = useCallback(async () => {
    let responseData;
    if (sessionStorage.getItem('teams') === null) {
      try {
        responseData = await sendRequest(
          process.env.NODE_ENV === 'development'
            ? 'http://localhost:5000/teams/'
            : 'https://baseball-node.onrender.com/teams',
        );
        sessionStorage.setItem('teams', JSON.stringify(responseData));
      } catch (error) {
        setShowError(true);
      }
    } else {
      responseData = JSON.parse(sessionStorage.getItem('teams'));
    }
    if (responseData) {
      setAllTeams(responseData.teams);
      setFilteredTeams(responseData.teams);
    }
  }, [sendRequest]);

  useEffect(() => {
    fetchTeams();
  }, [fetchTeams]);

  const onNameChange = async (event) => {
    const filteredResults = nameSearchFilter([...allTeams], event.target.value);
    if (selectedLeague !== 'League') {
      const filteredWithLeague = filteredResults.filter(
        (team) => team.league === selectedLeague,
      );
      return setFilteredTeams(filteredWithLeague);
    }
    setFilteredTeams(filteredResults);
  };

  const onFilterAlphabetical = () => {
    setFilteredTeams(alphabeticalFilter([...loadedTeams]));
    setSelectedFilter('Alphabetical');
    applyFilterStyles(true, false, false);
  };

  const onFilterEstablished = () => {
    setFilteredTeams(establishedFilter([...loadedTeams]));
    setSelectedFilter('Established');
    applyFilterStyles(false, true, false);
  };

  const onFilterLeague = (keyValue, event) => {
    if (keyValue === 'All') {
      showHiddenLeagueItems(true);
      setSelectedLeague('League');
      return applyFilters([...allTeams], keyValue);
    }

    showHiddenLeagueItems(false);
    event.target.classList.add('hideLeague');
    setSelectedLeague(keyValue);
    applyFilters(
      [...allTeams].filter((team) => team.league === keyValue),
      keyValue,
    );
  };

  const onFilterDivision = () => {
    applyFilterStyles(false, false, true);
    setSelectedFilter('Division');
    setDivisionDetails(sortLeagueIntoDivisions(allTeams, selectedLeague));
  };

  const applyFilters = (teams, league) => {
    const searchValue = document.getElementById('TeamNameInput').value;
    if (searchValue !== '') {
      const searchFilter = nameSearchFilter(teams, searchValue);
      if (selectedFilter === 'Established') {
        applyFilterStyles(false, true, false);
        return setFilteredTeams(establishedFilter(searchFilter));
      }

      applyFilterStyles(true, false, false);
      setSelectedFilter('Alphabetical');
      return setFilteredTeams(searchFilter);
    }

    if (selectedFilter === 'Established') {
      applyFilterStyles(false, true, false);
      return setFilteredTeams(establishedFilter(teams));
    }

    if (selectedFilter === 'Division' && league !== 'All') {
      applyFilterStyles(false, false, true);
      return setDivisionDetails(sortLeagueIntoDivisions(allTeams, league));
    }

    setSelectedFilter('Alphabetical');
    applyFilterStyles(true, false, false);
    return setFilteredTeams(teams);
  };

  const applyFilterStyles = (alphabetical, established, division) => {
    const alphabeticalButton = document.getElementById('AlphabeticalButton');
    if (alphabetical) {
      alphabeticalButton.classList.add('searchButtonActive');
    } else {
      alphabeticalButton.classList.remove('searchButtonActive');
    }

    const establishedButton = document.getElementById('EstablishedButton');
    if (established) {
      establishedButton.classList.add('searchButtonActive');
    } else {
      establishedButton.classList.remove('searchButtonActive');
    }

    const divisionButton = document.getElementById('DivisionButton');
    const teamInput = document.getElementById('TeamNameInput');
    if (divisionButton !== null) {
      if (division) {
        divisionButton.classList.add('searchButtonActive');
        teamInput.value = '';
        teamInput.disabled = true;
      } else {
        divisionButton.classList.remove('searchButtonActive');
        teamInput.disabled = false;
      }
    }
  };

  const showHiddenLeagueItems = (hideFirst) => {
    document.getElementById('LeagueDropdown').classList.add('searchButtonActive');
    const dropdownItems = Array.from(
      document.getElementsByClassName('leagueDropdownItem'),
    );
    dropdownItems.forEach((el) => el.classList.remove('hideLeague'));
    if (hideFirst) {
      document
        .getElementById('LeagueDropdown')
        .classList.remove('searchButtonActive');
      dropdownItems[0].classList.add('hideLeague');
    }
  };

  return (
    <>
      <Navigation allTeamsActive={true} />
      {isLoading && (
        <div className="pt-5">
          <Spinner animation="border" />
        </div>
      )}
      {error && (
        <ErrorModal
          show={showError}
          title={'Error!'}
          children={
            'Sorry! Trouble loading teams right now. Please reload and try again.'
          }
          buttonText={'Reload'}
          link={'/'}
          variant={'btn-danger'}
          onClick={clearError}
        />
      )}
      {!isLoading && loadedTeams && (
        <div className="pb-3">
          <TeamSearch
            nameChange={onNameChange}
            filterAlphabetical={onFilterAlphabetical}
            filterEstablished={onFilterEstablished}
            filterLeague={onFilterLeague}
            filterDivision={onFilterDivision}
            league={selectedLeague}
          />
          {selectedFilter !== 'Division' && (
            <ul className="teamList">
              {loadedTeams.map((team) => (
                <TeamCard
                  key={team.id}
                  name={team.name}
                  url={team.url}
                  est={team.established}
                  photo={team.photo}
                  color={team.photoColor}
                />
              ))}
            </ul>
          )}
          {selectedFilter === 'Division' &&
            divisionDetails.map((conference) => {
              return (
                <Division
                  conference={conference.name}
                  divisions={conference.divisions}
                  key={conference.name}
                />
              );
            })}
        </div>
      )}
    </>
  );
};

export default AllTeams;
