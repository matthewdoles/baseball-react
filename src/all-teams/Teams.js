import React, { useEffect, useState } from "react";

import Navigation from "../shared/Navigation";
import TeamSearch from "./components/TeamSearch";
import TeamCard from "../shared/TeamCard";
import TeamDivision from "./components/TeamDivision";
import { useHttpClient } from "../hooks/http-hook";
import "./Teams.css";

const Teams = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [allTeams, setAllTeams] = useState();
  const [selectedLeague, setSelectedLeague] = useState("League");
  const [selectedFilter, setSelectedFilter] = useState("Alphabetical");
  const [divisionDetails, setDivisionDetails] = useState();
  const [loadedTeams, setLoadedTeams] = useState();

  useEffect(() => {
    const fetchTeams = async () => {
      let responseData;
      if (sessionStorage.getItem("teams") === null) {
        try {
          responseData = await sendRequest("http://localhost:5000/teams");
          sessionStorage.setItem("teams", JSON.stringify(responseData));
        } catch (error) {}
      } else {
        responseData = JSON.parse(sessionStorage.getItem("teams"));
      }
      setAllTeams(responseData.teams);
      setLoadedTeams(responseData.teams);
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
    if (keyValue === "All") {
      showHiddenLeagueItems(true);
      setSelectedLeague("League");
      return applyFilters([...allTeams], keyValue);
    }

    showHiddenLeagueItems();
    event.target.classList.add("HideLeague");
    setSelectedLeague(keyValue);
    applyFilters(
      [...allTeams].filter(team => team.league === keyValue),
      keyValue
    );
  };

  const onFilterDivision = () => {
    applyFilterStyles(false, false, true);
    setSelectedFilter("Division");
    setDivisionDetails(sortLeagueIntoDivisions(selectedLeague));
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

  const sortLeagueIntoDivisions = league => {
    const selectedLeagueTeams = allTeams.filter(team => team.league === league);
    const selectedLeagueConferences = [
      ...new Set(selectedLeagueTeams.map(team => team.conference))
    ].sort();
    console.log(selectedLeagueConferences);
    const selectedLeagueDivisions = [
      ...new Set(selectedLeagueTeams.map(team => team.division))
    ].sort();

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

  const applyFilters = (teams, league) => {
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
      return setLoadedTeams(establishedFilter(teams));
    }

    if (selectedFilter === "Division" && league !== "All") {
      applyFilterStyles(false, false, true);
      return setDivisionDetails(sortLeagueIntoDivisions(league));
    }

    setSelectedFilter("Alphabetical");
    applyFilterStyles(true, false, false);
    return setLoadedTeams(teams);
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

  const showHiddenLeagueItems = (hideFirst = false) => {
    document
      .getElementById("LeagueDropdown")
      .classList.add("SearchButtonActive");
    const dropdownItems = Array.from(
      document.getElementsByClassName("LeagueDropdownItem")
    );
    dropdownItems.forEach(el => el.classList.remove("HideLeague"));
    if (hideFirst) {
      document
        .getElementById("LeagueDropdown")
        .classList.remove("SearchButtonActive");
      dropdownItems[0].classList.add("HideLeague");
    }
  };

  return (
    <React.Fragment>
      <Navigation />
      {isLoading && <div>loading...</div>}
      {!isLoading && loadedTeams && (
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
                  url={team.url}
                  est={team.established}
                  photo={team.photo}
                  color={team.photoColor}
                />
              ))}
            </ul>
          )}
          {selectedFilter === "Division" &&
            divisionDetails.map(conference => {
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
  );
};

export default Teams;