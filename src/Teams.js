import React, { useEffect, useState } from "react";

import TeamCard from "./TeamCard";
import TeamHierarchy from "./TeamHierarchy";
import { InputGroup, FormControl, Button, ButtonGroup } from "react-bootstrap";
import { useHttpClient } from "./hooks/http-hook";
import "./Teams.css";

const Teams = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [allTeams, setAllTeams] = useState();
  const [allAffiliates, setAllAffiliates] = useState(null);
  const [loadedTeams, setLoadedTeams] = useState();
  const [showHierarchyView, setShowHierarchyView] = useState(false);
  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const responseData = await sendRequest("http://localhost:5000/teams");
        setAllTeams(responseData.teams);
        setLoadedTeams(responseData.teams);
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
    setLoadedTeams(filteredResults);
  };

  const onFilterAlphabetical = () => {
    const teams = [...loadedTeams];
    setLoadedTeams(teams.sort((a, b) => a.name.localeCompare(b.name)));
  };

  const onFilterEstablished = () => {
    const teams = [...loadedTeams];
    setLoadedTeams(teams.sort((a, b) => a.established - b.established));
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
    }
    setShowHierarchyView(!showHierarchyView);
  };

  return (
    <React.Fragment>
      <Button variant="primary" onClick={onToggleHierarchyView}>
        Toggle
      </Button>
      {isLoading && <div>loading...</div>}
      {!isLoading && loadedTeams && showHierarchyView && (
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
      )}
      {!isLoading && loadedTeams && !showHierarchyView && (
        <React.Fragment>
          <div className="SearchControls">
            <InputGroup className="TeamSearch">
              <InputGroup.Prepend>
                <InputGroup.Text>Team</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl onChange={onNameChange} />
            </InputGroup>
            <ButtonGroup className="SearchButtons">
              <Button onClick={onFilterAlphabetical}>Alphabetical</Button>
              <Button onClick={onFilterEstablished}>Established</Button>
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
