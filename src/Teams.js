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
    const teams = [...allTeams];
    const filteredResults = teams.filter(
      team =>
        team.name.toUpperCase().search(event.target.value.toUpperCase()) > -1
    );
    if (selectedLeague !== "League") {
      const leagueFilter = filteredResults.filter(
        team => team.league === selectedLeague
      );
      return setLoadedTeams(leagueFilter);
    }
    setLoadedTeams(filteredResults);
  };

  const onFilterAlphabetical = () => {
    const teams = [...loadedTeams];
    document
      .getElementById("AlphabeticalButton")
      .classList.add("SearchButtonActive");
    document
      .getElementById("EstablishedButton")
      .classList.remove("SearchButtonActive");
    setSelectedFilter("Alphabetical");
    setLoadedTeams(teams.sort((a, b) => a.name.localeCompare(b.name)));
  };

  const onFilterEstablished = () => {
    const teams = [...loadedTeams];
    document
      .getElementById("AlphabeticalButton")
      .classList.remove("SearchButtonActive");
    document
      .getElementById("EstablishedButton")
      .classList.add("SearchButtonActive");
    setSelectedFilter("Established");
    setLoadedTeams(teams.sort((a, b) => a.established - b.established));
  };

  const onFilterLeague = (keyValue, event) => {
    let teams = [...allTeams];
    document
      .getElementById("AlphabeticalButton")
      .classList.add("SearchButtonActive");
    document
      .getElementById("EstablishedButton")
      .classList.remove("SearchButtonActive");
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
      if (document.getElementById("TeamNameInput").value !== "") {
        const searchFilter = teams.filter(
          team =>
            team.name
              .toUpperCase()
              .search(
                document.getElementById("TeamNameInput").value.toUpperCase()
              ) > -1
        );
        if (selectedFilter === "Established") {
          document
            .getElementById("AlphabeticalButton")
            .classList.remove("SearchButtonActive");
          document
            .getElementById("EstablishedButton")
            .classList.add("SearchButtonActive");
          return setLoadedTeams(
            searchFilter.sort((a, b) => a.established - b.established)
          );
        }
        return setLoadedTeams(searchFilter);
      }
      if (selectedFilter === "Established") {
        document
          .getElementById("AlphabeticalButton")
          .classList.remove("SearchButtonActive");
        document
          .getElementById("EstablishedButton")
          .classList.add("SearchButtonActive");
        return setLoadedTeams(
          teams.sort((a, b) => a.established - b.established)
        );
      }
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
    if (document.getElementById("TeamNameInput").value !== "") {
      const searchFilter = filteredTeams.filter(
        team =>
          team.name
            .toUpperCase()
            .search(
              document.getElementById("TeamNameInput").value.toUpperCase()
            ) > -1
      );
      if (selectedFilter === "Established") {
        document
          .getElementById("AlphabeticalButton")
          .classList.remove("SearchButtonActive");
        document
          .getElementById("EstablishedButton")
          .classList.add("SearchButtonActive");
        return setLoadedTeams(
          searchFilter.sort((a, b) => a.established - b.established)
        );
      }
      return setLoadedTeams(searchFilter);
    }
    if (selectedFilter === "Established") {
      document
        .getElementById("AlphabeticalButton")
        .classList.remove("SearchButtonActive");
      document
        .getElementById("EstablishedButton")
        .classList.add("SearchButtonActive");
      return setLoadedTeams(
        filteredTeams.sort((a, b) => a.established - b.established)
      );
    }
    setLoadedTeams(filteredTeams);
  };

  const onFilterDivision = () => {
    const selectedLeagueTeams = allTeams.filter(
      team => team.league === selectedLeague
    );
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
      sortedTeams.push({ name: conference, divisions })
    });
    setDivisionDetails(sortedTeams);
    console.log(sortedTeams);
    setSelectedFilter("Division");
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
