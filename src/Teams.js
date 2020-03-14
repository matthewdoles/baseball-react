import React, { useEffect, useState } from "react";

import TeamCard from "./TeamCard";
import TeamListItem from "./TeamListItem";
import { InputGroup, FormControl, Button, ButtonGroup } from "react-bootstrap";
import { useHttpClient } from "./hooks/http-hook";
import "./Teams.css";

const Teams = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [allTeams, setAllTeams] = useState();
  const [loadedTeams, setLoadedTeams] = useState();
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const responseData = await sendRequest("http://localhost:5000/teams");
        setAllTeams(responseData.teams);
        setLoadedTeams(responseData.teams);
      } catch (error) {}
    };
    fetchUsers();
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

  return (
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
      {isLoading && <div>loading...</div>}
      {!isLoading && loadedTeams && (
        <ul className="TeamList">
          {loadedTeams.map(team => (
            <TeamListItem
              key={team.id}
              name={team.name}
              logo={"./images/" + team.photo}
              league={team.league}
            />
          ))}
        </ul>
      )}
      {!isLoading && loadedTeams && (
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
    </React.Fragment>
  );
};

export default Teams;
