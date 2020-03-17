import React, { useEffect, useState } from "react";

import TeamCard from "./TeamCard";
import TeamHierarchy from "./TeamHierarchy";
import TeamSelection from "./TeamSelection";
import {
  InputGroup,
  FormControl,
  Button,
  ButtonGroup,
  Dropdown,
  DropdownButton
} from "react-bootstrap";
import { useHttpClient } from "./hooks/http-hook";
import "./Teams.css";

const Teams = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [allTeams, setAllTeams] = useState();
  const [allAffiliates, setAllAffiliates] = useState(null);

  const [selectableTeams, setSelectableTeams] = useState(null);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [selectedLeague, setSelectedLeague] = useState("League");
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
      const leagueFilter = filteredResults.filter(team => team.league === selectedLeague);
      return setLoadedTeams(leagueFilter);
    }
    setLoadedTeams(filteredResults);
  };

  const onFilterAlphabetical = () => {
    const teams = [...loadedTeams];
    document.getElementById("AlphabeticalButton").classList.add("SearchButtonActive");
    document.getElementById("EstablishedButton").classList.remove("SearchButtonActive");
    setLoadedTeams(teams.sort((a, b) => a.name.localeCompare(b.name)));
  };

  const onFilterEstablished = () => {
    const teams = [...loadedTeams];
    document.getElementById("AlphabeticalButton").classList.remove("SearchButtonActive");
    document.getElementById("EstablishedButton").classList.add("SearchButtonActive");
    setLoadedTeams(teams.sort((a, b) => a.established - b.established));
  };

  const onFilterLeague = (keyValue, event) => {
    const teams = [...allTeams];
    if (keyValue === "All") {
      document.getElementById("AlphabeticalButton").classList.add("SearchButtonActive");
      document.getElementById("EstablishedButton").classList.remove("SearchButtonActive");
      document.getElementById("LeagueDropdown").classList.remove("SearchButtonActive");
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
        return setLoadedTeams(searchFilter);
      }
      return setLoadedTeams(allTeams);
    }
    const filteredTeams = teams.filter(team => team.league === keyValue);
    if (document.getElementById("TeamNameInput").value !== "") {
      const searchFilter = filteredTeams.filter(
        team =>
          team.name
            .toUpperCase()
            .search(
              document.getElementById("TeamNameInput").value.toUpperCase()
            ) > -1
      );
      return setLoadedTeams(searchFilter);
    }
    document.getElementById("AlphabeticalButton").classList.add("SearchButtonActive");
    document.getElementById("EstablishedButton").classList.remove("SearchButtonActive");
    document.getElementById("LeagueDropdown").classList.add("SearchButtonActive");
    setSelectedLeague(keyValue);
    setLoadedTeams(filteredTeams);
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
      setShowHierarchyView(false);
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
          <div className="SearchControls">
            <InputGroup className="TeamSearch">
              <InputGroup.Prepend>
                <InputGroup.Text>Team</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl onChange={onNameChange} id="TeamNameInput" />
            </InputGroup>
            <ButtonGroup className="SearchButtons">
              <Button onClick={onFilterAlphabetical} id="AlphabeticalButton">Alphabetical</Button>
              <Button onClick={onFilterEstablished} id="EstablishedButton">Established</Button>
              <DropdownButton
                as={ButtonGroup}
                title={selectedLeague}
                id="LeagueDropdown"
                onSelect={onFilterLeague}
              >
                <Dropdown.Item eventKey="All">All</Dropdown.Item>
                <Dropdown.Item eventKey="MLB">MLB</Dropdown.Item>
                <Dropdown.Item eventKey="AAA">AAA</Dropdown.Item>
                <Dropdown.Item eventKey="AA">AA</Dropdown.Item>
                <Dropdown.Item eventKey="A+">A+</Dropdown.Item>
                <Dropdown.Item eventKey="A">A</Dropdown.Item>
                <Dropdown.Item eventKey="SS">SS</Dropdown.Item>
                <Dropdown.Item eventKey="R">R</Dropdown.Item>
              </DropdownButton>
            </ButtonGroup>
          </div>
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
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default Teams;
