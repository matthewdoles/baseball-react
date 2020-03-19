import React, { useEffect, useState } from "react";

import TeamSearch from "./TeamSearch";
import TeamCard from "./TeamCard";
import TeamHierarchy from "./TeamHierarchy";
import TeamSelection from "./TeamSelection";
import { Button } from "react-bootstrap";
import { useHttpClient } from "./hooks/http-hook";
import "./Teams.css";
import TeamDivision from "./TeamDivision";

const Teams = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [allTeams, setAllTeams] = useState();
  const [allAffiliates, setAllAffiliates] = useState(null);

  const [selectableTeams, setSelectableTeams] = useState(null);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [selectedLeague, setSelectedLeague] = useState("League");
  const [selectedFilter, setSelectedFilter] = useState("Alphabetical");
  const [divisionDetails, setDivisionDetails] = useState();
  const [loadedTeams, setLoadedTeams] = useState();
  const [showHierarchyView, setShowHierarchyView] = useState(false);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const responseData = await sendRequest("http://localhost:5000/teams");
        setAllTeams(responseData.teams);
        setLoadedTeams(responseData.teams);
        const mlbTeams = responseData.teams.filter(
          team => team.league === "MLB"
        );
        setSelectableTeams(mlbTeams);
      } catch (error) {}
    };
    fetchTeams();
  }, [sendRequest]);

  const onNameChange = async event => {
    const filteredResults = nameSearchFilter([...allTeams], event.target.value);
    if (selectedLeague !== "League") {
      const filteredWithLeague = filteredResults.filter(
        team => team.league === selectedLeague
      );
      return setLoadedTeams(filteredWithLeague);
    }
    setLoadedTeams(filteredResults);
  };

  const onFilterAlphabetical = () => {
    setLoadedTeams(alphabeticalFilter([...loadedTeams]));
    setSelectedFilter("Alphabetical");
    applyFilterStyles(true, false, false);
  };

  const onFilterEstablished = () => {
    setLoadedTeams(establishedFilter([...loadedTeams]));
    setSelectedFilter("Established");
    applyFilterStyles(false, true, false);
  };

  const onFilterLeague = (keyValue, event) => {
    let teams = [...allTeams];
    if (keyValue === "All") {
      document
        .getElementById("LeagueDropdown")
        .classList.remove("SearchButtonActive");
      const dropdownItems = Array.from(
        document.getElementsByClassName("LeagueDropdownItem")
      );
      dropdownItems.forEach(el => el.classList.remove("HideLeague"));
      dropdownItems[0].classList.add("HideLeague");
      setSelectedLeague("League");
      const searchValue = document.getElementById("TeamNameInput").value;
      if (searchValue !== "") {
        const searchFilter = nameSearchFilter(teams, searchValue);

        if (selectedFilter === "Established") {
          applyFilterStyles(false, true, false);
          return setLoadedTeams(establishedFilter(searchFilter));
        }
        setSelectedFilter("Alphabetical");
        return setLoadedTeams(searchFilter);
      }
      if (selectedFilter === "Established") {
        applyFilterStyles(false, true, false);
        return setLoadedTeams(establishedFilter(teams));
      }
      applyFilterStyles(true, false, false);
      setSelectedFilter("Alphabetical");
      return setLoadedTeams(allTeams);
    }
    const filteredTeams = teams.filter(team => team.league === keyValue);
    document
      .getElementById("LeagueDropdown")
      .classList.add("SearchButtonActive");
    const dropdownItems = Array.from(
      document.getElementsByClassName("LeagueDropdownItem")
    );
    dropdownItems.forEach(el => el.classList.remove("HideLeague"));
    event.target.classList.add("HideLeague");
    setSelectedLeague(keyValue);
    const searchValue = document.getElementById("TeamNameInput").value;
    if (searchValue !== "") {
      const searchFilter = nameSearchFilter(teams, searchValue);
      if (selectedFilter === "Established") {
        applyFilterStyles(false, true, false);
        return setLoadedTeams(establishedFilter(searchFilter));
      }
      applyFilterStyles(true, false, false);
      setSelectedFilter("Alphabetical");
      return setLoadedTeams(searchFilter);
    }
    if (selectedFilter === "Established") {
      applyFilterStyles(false, true, false);
      return setLoadedTeams(establishedFilter(filteredTeams));
    }
    if (selectedFilter === "Division") {
      applyFilterStyles(false, false, true);
      return setDivisionDetails(sortLeague(keyValue));
    }
    applyFilterStyles(true, false, false);
    setLoadedTeams(filteredTeams);
  };

  const onFilterDivision = () => {
    applyFilterStyles(false, false, true);
    setSelectedFilter("Division");
    setDivisionDetails(sortLeague(selectedLeague));
  };

  // UTIL

  const nameSearchFilter = (teams, value) => {
    return teams.filter(
      team => team.name.toUpperCase().search(value.toUpperCase()) > -1
    );
  };

  const alphabeticalFilter = teams => {
    return teams.sort((a, b) => a.name.localeCompare(b.name));
  };

  const establishedFilter = teams => {
    return teams.sort((a, b) => a.established - b.established);
  };

  const sortLeague = league => {
    const selectedLeagueTeams = allTeams.filter(team => team.league === league);
    const selectedLeagueConferences = [
      ...new Set(selectedLeagueTeams.map(team => team.conference))
    ];
    const selectedLeagueDivisions = [
      ...new Set(selectedLeagueTeams.map(team => team.division))
    ];
    const sortedTeams = [];
    selectedLeagueConferences.forEach(conference => {
      const divisions = [];
      selectedLeagueDivisions.forEach(division => {
        const divisionTeams = selectedLeagueTeams.filter(
          team => team.conference === conference && team.division === division
        );
        if (divisionTeams.length > 0) {
          divisions.push({ name: division, teams: divisionTeams });
        }
      });
      sortedTeams.push({ name: conference, divisions });
    });
    return sortedTeams;
  };

  const applyFilterStyles = (alphabetical, established, division) => {
    const alphabeticalButton = document.getElementById("AlphabeticalButton");
    if (alphabetical) {
      alphabeticalButton.classList.add("SearchButtonActive");
    } else {
      alphabeticalButton.classList.remove("SearchButtonActive");
    }

    const establishedButton = document.getElementById("EstablishedButton");
    if (established) {
      establishedButton.classList.add("SearchButtonActive");
    } else {
      establishedButton.classList.remove("SearchButtonActive");
    }

    const divisionButton = document.getElementById("DivisionButton");
    const teamInput = document.getElementById("TeamNameInput");
    if (divisionButton !== null) {
      if (division) {
        divisionButton.classList.add("SearchButtonActive");
        teamInput.value = "";
        teamInput.disabled = true;
      } else {
        divisionButton.classList.remove("SearchButtonActive");
        teamInput.disabled = false;
      }
    }
  };

  const onToggleHierarchyView = async () => {
    if (allAffiliates === null) {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/teams/affiliates"
        );
        setAllAffiliates(responseData.teams);
        setLoadedTeams(responseData.teams);
      } catch (error) {}
      setShowHierarchyView(true);
    } else if (showHierarchyView) {
      await setShowHierarchyView(false);
      document
        .getElementById("AlphabeticalButton")
        .classList.add("SearchButtonActive");
      setLoadedTeams(allTeams);
    } else {
      setShowHierarchyView(true);
      setLoadedTeams(allAffiliates);
    }
  };

  const onTeamSelected = event => {
    if (selectedTeam !== event.target.getAttribute("value")) {
      const teams = [...allAffiliates];
      if (document.getElementById(selectedTeam) !== null) {
        document.getElementById(selectedTeam).classList.remove("SelectedTeam");
      }
      event.target.classList.add("SelectedTeam");
      setLoadedTeams(
        teams.filter(team => team.name === event.target.getAttribute("value"))
      );
      setSelectedTeam(event.target.getAttribute("value"));
    } else {
      event.target.classList.remove("SelectedTeam");
      setLoadedTeams(allAffiliates);
      setSelectedTeam(null);
    }
  };

  return (
    <React.Fragment>
      <Button variant="primary" onClick={onToggleHierarchyView}>
        Toggle
      </Button>
      {isLoading && <div>loading...</div>}
      {!isLoading && loadedTeams && showHierarchyView && (
        <React.Fragment>
          <TeamSelection
            teams={selectableTeams}
            teamSelected={onTeamSelected}
          />
          <ul className="TeamList">
            {loadedTeams.map(team => (
              <TeamHierarchy
                key={team.id}
                name={team.name}
                logo={"./images/" + team.photo}
                league={team.league}
                affiliates={team.affiliates}
              />
            ))}
          </ul>
        </React.Fragment>
      )}
      {!isLoading && loadedTeams && !showHierarchyView && (
        <React.Fragment>
          <TeamSearch
            nameChange={onNameChange}
            filterAlphabetical={onFilterAlphabetical}
            filterEstablished={onFilterEstablished}
            filterLeague={onFilterLeague}
            filterDivision={onFilterDivision}
            league={selectedLeague}
          />
          {selectedFilter !== "Division" && (
            <ul className="TeamList">
              {loadedTeams.map(team => (
                <TeamCard
                  key={team.id}
                  name={team.name}
                  est={team.established}
                  logo={"./images/" + team.photo}
                  color={team.photoColor}
                />
              ))}
            </ul>
          )}
          {selectedFilter === "Division" && (
            <React.Fragment>
              {divisionDetails.map(conference => {
                return (
                  <TeamDivision
                    conference={conference.name}
                    divisions={conference.divisions}
                    key={conference.name}
                  />
                );
              })}
            </React.Fragment>
          )}
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default Teams;
